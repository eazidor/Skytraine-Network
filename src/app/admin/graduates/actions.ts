"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/admin/login");
  return session.user.id;
}

export async function createGraduate(prev: { error?: string }, formData: FormData) {
  await requireAdmin();
  const fullName = (formData.get("fullName") as string)?.trim();
  if (!fullName || fullName.length < 2) return { error: "Full name is required." };
  const trade = (formData.get("trade") as string)?.trim();
  if (!trade || trade.length < 2) return { error: "Trade or specialization is required." };

  await prisma.graduate.create({
    data: {
      fullName,
      trade,
      whatsapp: (formData.get("whatsapp") as string)?.trim() || undefined,
      location: (formData.get("location") as string)?.trim() || undefined,
      experience: (formData.get("experience") as string)?.trim() || undefined,
      certifications: (formData.get("certifications") as string)?.trim() || undefined,
      cvFile: (formData.get("cvFile") as string)?.trim() || undefined,
      availability: (formData.get("availability") as string)?.trim() || undefined,
      notes: (formData.get("notes") as string)?.trim() || undefined,
    },
  });

  revalidatePath("/admin/graduates");
  redirect("/admin/graduates");
}

export async function updateGraduate(graduateId: string, prev: { error?: string }, formData: FormData) {
  await requireAdmin();
  const fullName = (formData.get("fullName") as string)?.trim();
  if (!fullName || fullName.length < 2) return { error: "Full name is required." };
  const trade = (formData.get("trade") as string)?.trim();
  if (!trade || trade.length < 2) return { error: "Trade or specialization is required." };

  await prisma.graduate.update({
    where: { id: graduateId },
    data: {
      fullName,
      trade,
      whatsapp: (formData.get("whatsapp") as string)?.trim() || undefined,
      location: (formData.get("location") as string)?.trim() || undefined,
      experience: (formData.get("experience") as string)?.trim() || undefined,
      certifications: (formData.get("certifications") as string)?.trim() || undefined,
      cvFile: (formData.get("cvFile") as string)?.trim() || undefined,
      availability: (formData.get("availability") as string)?.trim() || undefined,
      notes: (formData.get("notes") as string)?.trim() || undefined,
    },
  });

  revalidatePath(`/admin/graduates/${graduateId}`);
  redirect(`/admin/graduates/${graduateId}`);
}
