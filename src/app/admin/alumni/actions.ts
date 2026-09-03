"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { AlumniApplicationStatus } from "@/generated/prisma/client";

type ActionResult = { error?: string };

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/admin/login");
  return session.user.id;
}

export async function activateAlumniApplication(
  applicationId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const monthsStr = (formData.get("supportMonths") as string) || "6";
  const months = Number.parseInt(monthsStr, 10) || 6;
  const start = new Date();
  const end = new Date(start);
  end.setMonth(end.getMonth() + months);

  await prisma.alumniApplication.update({
    where: { applicationId },
    data: {
      status: "ACTIVE",
      activeSupportStart: start,
      activeSupportEnd: end,
    },
  });

  revalidatePath(`/admin/alumni/${applicationId}`);
  revalidatePath("/admin/alumni");
  revalidatePath("/admin");
  return {};
}

export async function updateAlumniApplicationStatus(
  applicationId: string,
  toStatus: AlumniApplicationStatus
) {
  await requireAdmin();

  const data: Parameters<typeof prisma.alumniApplication.update>[0]["data"] = {
    status: toStatus,
  };
  if (toStatus === "PLACED") {
    data.placementStatus = "Placed";
  }
  if (toStatus === "EXPIRED") {
    data.activeSupportEnd = new Date();
  }

  await prisma.alumniApplication.update({
    where: { applicationId },
    data,
  });

  revalidatePath(`/admin/alumni/${applicationId}`);
  revalidatePath("/admin/alumni");
  revalidatePath("/admin");
}

export async function saveAlumniNotes(
  applicationId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const notes = (formData.get("notes") as string) ?? "";
  await prisma.alumniApplication.update({
    where: { applicationId },
    data: { notes },
  });
  revalidatePath(`/admin/alumni/${applicationId}`);
  return {};
}

export async function updatePlacementStatus(
  applicationId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const placementStatus = (formData.get("placementStatus") as string) ?? "";
  await prisma.alumniApplication.update({
    where: { applicationId },
    data: { placementStatus },
  });
  revalidatePath(`/admin/alumni/${applicationId}`);
  revalidatePath("/admin/alumni");
  return {};
}
