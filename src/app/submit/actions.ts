"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";

const submitSchema = z.object({
  contributorName: z.string().trim().min(2, "Please enter your full name."),
  contributorWhatsapp: z
    .string()
    .trim()
    .min(7, "Please enter a valid WhatsApp number.")
    .max(20, "Please enter a valid WhatsApp number."),
  companyName: z.string().trim().min(2, "Please enter the company name."),
  positionTitle: z.string().trim().min(2, "Please enter the job / position title."),
  tradeRequired: z.string().trim().min(2, "Please enter the skill or trade required."),
  workersRequired: z.coerce
    .number()
    .int()
    .min(1, "At least 1 worker is required.")
    .max(999, "That number seems too large."),
  location: z.string().trim().min(2, "Please enter a location."),
  description: z.string().trim().min(10, "Please describe the opportunity."),
  requirements: z.string().trim().optional().or(z.literal("")),
  applicationDetails: z.string().trim().min(3, "Please provide application / contact details."),
  deadline: z.string().trim().optional().or(z.literal("")),
  sourceLink: z.string().trim().optional().or(z.literal("")),
  additionalInfo: z.string().trim().optional().or(z.literal("")),
});

export type SubmitState = {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

async function generateOpportunityId(): Promise<string> {
  for (let attempt = 0; attempt < 20; attempt++) {
    const count = await prisma.opportunity.count();
    const seq = count + 1;
    const id = `OPP-${String(seq).padStart(4, "0")}`;
    const exists = await prisma.opportunity.findUnique({
      where: { opportunityId: id },
    });
    if (!exists) return id;
  }
  return `OPP-${Date.now().toString().slice(-6)}`;
}

export async function submitOpportunity(
  _prev: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  const raw = {
    contributorName: formData.get("contributorName"),
    contributorWhatsapp: formData.get("contributorWhatsapp"),
    companyName: formData.get("companyName"),
    positionTitle: formData.get("positionTitle"),
    tradeRequired: formData.get("tradeRequired"),
    workersRequired: formData.get("workersRequired"),
    location: formData.get("location"),
    description: formData.get("description"),
    requirements: formData.get("requirements"),
    applicationDetails: formData.get("applicationDetails"),
    deadline: formData.get("deadline"),
    sourceLink: formData.get("sourceLink"),
    additionalInfo: formData.get("additionalInfo"),
  };

  const parsed = submitSchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;

  try {
    let contributor = await prisma.contributor.findUnique({
      where: { whatsapp: data.contributorWhatsapp },
    });
    if (!contributor) {
      contributor = await prisma.contributor.create({
        data: {
          fullName: data.contributorName,
          whatsapp: data.contributorWhatsapp,
        },
      });
    }

    const opportunityId = await generateOpportunityId();

    const opportunity = await prisma.opportunity.create({
      data: {
        opportunityId,
        contributorId: contributor.id,
        companyName: data.companyName,
        positionTitle: data.positionTitle,
        tradeRequired: data.tradeRequired,
        workersRequired: data.workersRequired,
        location: data.location,
        description: data.description,
        requirements: data.requirements || null,
        applicationDetails: data.applicationDetails,
        deadline: data.deadline || null,
        sourceLink: data.sourceLink || null,
        additionalInfo: data.additionalInfo || null,
        status: "SUBMITTED",
        rewardStatus: "NOT_ELIGIBLE",
        statusHistory: {
          create: {
            toStatus: "SUBMITTED",
            note: "Opportunity submitted by contributor.",
          },
        },
      },
    });

    redirect(`/submitted/${opportunity.opportunityId}`);
  } catch (e) {
    if (e instanceof Error && "digest" in e && (e as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) {
      throw e;
    }
    console.error("submitOpportunity error:", e);
    return { error: "Something went wrong. Please try again." };
  }
}
