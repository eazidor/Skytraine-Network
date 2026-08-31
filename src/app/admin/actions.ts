"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ApplicationStatus, OpportunityStatus, RejectionReason } from "@/generated/prisma/client";

type ActionResult = { error?: string };

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/admin/login");
  return session.user.id;
}

async function recordStatusChange(
  opportunityId: string,
  changedById: string,
  fromStatus: OpportunityStatus | undefined,
  toStatus: OpportunityStatus,
  note?: string
) {
  await prisma.opportunityStatusChange.create({
    data: {
      opportunityId,
      changedById,
      fromStatus: fromStatus ?? undefined,
      toStatus,
      note,
    },
  });
}

export async function updateOpportunityStatus(
  opportunityId: string,
  toStatus: OpportunityStatus,
  formData?: FormData
) {
  const adminId = await requireAdmin();

  const opp = await prisma.opportunity.findUnique({
    where: { opportunityId },
    include: { reward: true },
  });
  if (!opp) throw new Error("Opportunity not found");

  const fromStatus = opp.status as OpportunityStatus;

  if (toStatus === "REJECTED") {
    const reason = formData?.get("rejectionReason") as RejectionReason | null;
    const note = (formData?.get("rejectionNote") as string) || undefined;
    await prisma.opportunity.update({
      where: { id: opp.id },
      data: {
        status: "REJECTED",
        rejectedAt: new Date(),
        rejectionReason: reason ?? undefined,
        rejectionNote: note,
      },
    });
    await recordStatusChange(opp.id, adminId, fromStatus, "REJECTED", note);
  } else {
    await prisma.opportunity.update({
      where: { id: opp.id },
      data: {
        status: toStatus,
        ...(toStatus === "VERIFIED"
          ? { verifiedBy: adminId, verifiedAt: new Date() }
          : {}),
      },
    });
    await recordStatusChange(opp.id, adminId, fromStatus, toStatus);
  }

  revalidatePath(`/admin/opportunities/${opportunityId}`);
  revalidatePath("/admin/opportunities");
  revalidatePath("/admin");
}

export async function saveInternalNotes(
  opportunityId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const notes = (formData.get("internalNotes") as string) ?? "";
  await prisma.opportunity.update({
    where: { opportunityId },
    data: { internalNotes: notes },
  });
  revalidatePath(`/admin/opportunities/${opportunityId}`);
  return {};
}

export async function addMatch(
  opportunityId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const adminId = await requireAdmin();
  const graduateId = formData.get("graduateId") as string;
  const adminNotes = (formData.get("adminNotes") as string) || undefined;

  if (!graduateId) return { error: "Select a graduate." };

  const opp = await prisma.opportunity.findUnique({ where: { opportunityId } });
  if (!opp) return { error: "Opportunity not found." };
  if (opp.status !== "VERIFIED" && opp.status !== "MATCHED") {
    return { error: "Only verified opportunities can be matched." };
  }

  await prisma.match.upsert({
    where: { opportunityId_graduateId: { opportunityId: opp.id, graduateId } },
    update: {},
    create: {
      opportunityId: opp.id,
      graduateId,
      matchedById: adminId,
      adminNotes,
      applications: {
        create: {
          opportunityId: opp.id,
          graduateId,
        },
      },
    },
  });

  if (opp.status !== "MATCHED") {
    await prisma.opportunity.update({
      where: { id: opp.id },
      data: { status: "MATCHED" },
    });
    await recordStatusChange(opp.id, adminId, opp.status as OpportunityStatus, "MATCHED");
  }

  revalidatePath(`/admin/opportunities/${opportunityId}`);
  revalidatePath("/admin/opportunities");
  revalidatePath("/admin");
  return {};
}

export async function removeMatch(matchId: string) {
  await requireAdmin();
  await prisma.application.deleteMany({ where: { matchId } });
  await prisma.match.delete({ where: { id: matchId } });
  revalidatePath("/admin/opportunities");
}

export async function updateApplication(
  applicationId: string,
  opportunityId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const adminId = await requireAdmin();
  const status = formData.get("status") as ApplicationStatus;
  const notes = (formData.get("notes") as string) || undefined;

  const app = await prisma.application.update({
    where: { id: applicationId },
    data: { status, notes },
    include: { opportunity: true },
  });

  const opp = app.opportunity;

  const statusToOpStatus: Partial<Record<ApplicationStatus, OpportunityStatus>> = {
    NOT_STARTED: "MATCHED",
    SUBMITTED: "APPLICATION_SUBMITTED",
    INTERVIEW: "INTERVIEW",
    SHORTLISTED: "APPLICATION_SUBMITTED",
    REJECTED: "MATCHED",
    SELECTED: "MATCHED",
    WITHDRAWN: "MATCHED",
  };
  const newOpStatus = statusToOpStatus[status];

  if (newOpStatus && opp.status !== newOpStatus) {
    await prisma.opportunity.update({
      where: { id: opp.id },
      data: { status: newOpStatus },
    });
    await recordStatusChange(opp.id, adminId, opp.status as OpportunityStatus, newOpStatus);
  }

  revalidatePath(`/admin/opportunities/${opportunityId}`);
  revalidatePath("/admin");
  return {};
}

export async function confirmPlacement(
  opportunityId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const adminId = await requireAdmin();
  const graduateId = formData.get("graduateId") as string;
  const employer = (formData.get("employer") as string) || undefined;
  const position = (formData.get("position") as string) || undefined;
  const notes = (formData.get("notes") as string) || undefined;

  if (!graduateId) return { error: "Select a graduate." };

  const opp = await prisma.opportunity.findUnique({
    where: { opportunityId },
    include: { contributor: true, reward: true },
  });
  if (!opp) return { error: "Opportunity not found." };

  const existingPlacement = await prisma.placement.findFirst({
    where: { opportunityId: opp.id, graduateId },
  });

  let application = await prisma.application.findFirst({
    where: { opportunityId: opp.id, graduateId },
  });
  if (!application) {
    application = await prisma.application.create({
      data: {
        opportunityId: opp.id,
        graduateId,
        status: "SELECTED",
      },
    });
  }

  const placement = existingPlacement
    ? await prisma.placement.update({
        where: { id: existingPlacement.id },
        data: {
          employer: employer ?? opp.companyName,
          position: position ?? opp.positionTitle,
          notes,
          applicationId: application.id,
        },
      })
    : await prisma.placement.create({
        data: {
          opportunityId: opp.id,
          graduateId,
          employer: employer ?? opp.companyName,
          position: position ?? opp.positionTitle,
          notes,
          applicationId: application.id,
        },
      });

  if (opp.status !== "PLACEMENT_CONFIRMED") {
    await prisma.opportunity.update({
      where: { id: opp.id },
      data: { status: "PLACEMENT_CONFIRMED" },
    });
    await recordStatusChange(opp.id, adminId, opp.status as OpportunityStatus, "PLACEMENT_CONFIRMED");
  }

  if (opp.reward) {
    await prisma.reward.update({
      where: { id: opp.reward.id },
      data: {
        status: "PAYABLE",
        amount: 20000,
        becamePayableAt: new Date(),
        contributorId: opp.contributorId,
        placementId: placement.id,
      },
    });
  } else {
    await prisma.reward.create({
      data: {
        opportunityId: opp.id,
        contributorId: opp.contributorId,
        placementId: placement.id,
        amount: 20000,
        status: "PAYABLE",
        becamePayableAt: new Date(),
      },
    });
  }

  revalidatePath(`/admin/opportunities/${opportunityId}`);
  revalidatePath("/admin/opportunities");
  revalidatePath("/admin/rewards");
  revalidatePath("/admin");
  return {};
}

export async function markRewardPaid(
  rewardId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const paymentReference = (formData.get("paymentReference") as string) || undefined;
  const paymentNotes = (formData.get("paymentNotes") as string) || undefined;

  await prisma.reward.update({
    where: { id: rewardId },
    data: {
      status: "PAID",
      paidAt: new Date(),
      paymentReference,
      paymentNotes,
    },
  });

  const reward = await prisma.reward.findUnique({ where: { id: rewardId } });
  if (reward) {
    revalidatePath(`/admin/opportunities/${reward.opportunityId}`);
  }
  revalidatePath("/admin/rewards");
  revalidatePath("/admin");
  return {};
}

export async function resetRewardToPayable(rewardId: string, opportunityId: string) {
  await requireAdmin();
  await prisma.reward.update({
    where: { id: rewardId },
    data: { status: "PAYABLE", paidAt: null, paymentReference: null, paymentNotes: null },
  });
  revalidatePath(`/admin/opportunities/${opportunityId}`);
  revalidatePath("/admin/rewards");
}
