"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";

const applySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  whatsapp: z
    .string()
    .trim()
    .min(7, "Please enter a valid WhatsApp number.")
    .max(20, "Please enter a valid WhatsApp number."),
  email: z.string().trim().email("Please enter a valid email address."),
  trade: z.string().trim().min(2, "Please enter your trade."),
  skills: z.string().trim().min(2, "Please describe your skills."),
  yearsOfExperience: z.string().trim().min(1, "Please enter your years of experience."),
  location: z.string().trim().min(2, "Please enter your location."),
  preferredWorkLocation: z.string().trim().min(2, "Please enter your preferred work location."),
  certifications: z.string().trim().optional().or(z.literal("")),
  currentEmploymentStatus: z.string().trim().min(2, "Please enter your current employment status."),
  cvFile: z.string().trim().optional().or(z.literal("")),
});

export type ApplyState = {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

async function generateApplicationId(): Promise<string> {
  for (let attempt = 0; attempt < 20; attempt++) {
    const count = await prisma.alumniApplication.count();
    const seq = count + 1;
    const id = `ALN-${String(seq).padStart(4, "0")}`;
    const exists = await prisma.alumniApplication.findUnique({
      where: { applicationId: id },
    });
    if (!exists) return id;
  }
  return `ALN-${Date.now().toString().slice(-6)}`;
}

export async function submitAlumniApplication(
  _prev: ApplyState,
  formData: FormData
): Promise<ApplyState> {
  const raw = {
    fullName: formData.get("fullName"),
    whatsapp: formData.get("whatsapp"),
    email: formData.get("email"),
    trade: formData.get("trade"),
    skills: formData.get("skills"),
    yearsOfExperience: formData.get("yearsOfExperience"),
    location: formData.get("location"),
    preferredWorkLocation: formData.get("preferredWorkLocation"),
    certifications: formData.get("certifications"),
    currentEmploymentStatus: formData.get("currentEmploymentStatus"),
    cvFile: formData.get("cvFile"),
  };

  const parsed = applySchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;

  try {
    const applicationId = await generateApplicationId();

    await prisma.alumniApplication.create({
      data: {
        applicationId,
        fullName: data.fullName,
        whatsapp: data.whatsapp,
        email: data.email,
        trade: data.trade,
        skills: data.skills,
        yearsOfExperience: data.yearsOfExperience,
        location: data.location,
        preferredWorkLocation: data.preferredWorkLocation,
        certifications: data.certifications || null,
        currentEmploymentStatus: data.currentEmploymentStatus,
        cvFile: data.cvFile || null,
        status: "SUBMITTED",
      },
    });

    redirect(`/applied/${applicationId}`);
  } catch (e) {
    if (e instanceof Error && "digest" in e && (e as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) {
      throw e;
    }
    console.error("submitAlumniApplication error:", e);
    return { error: "Something went wrong. Please try again." };
  }
}
