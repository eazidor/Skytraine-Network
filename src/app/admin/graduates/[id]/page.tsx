import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EditGraduateForm } from "@/components/admin/EditGraduateForm";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function AdminGraduateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let graduate = null;
  try {
    graduate = await prisma.graduate.findUnique({
      where: { id },
      include: {
        applications: {
          include: { opportunity: true },
          orderBy: { appliedDate: "desc" },
        },
        placements: {
          include: { opportunity: true },
        },
      },
    });
  } catch {
    graduate = null;
  }

  if (!graduate) notFound();

  const edge = {
    fullName: graduate.fullName,
    trade: graduate.trade,
    whatsapp: graduate.whatsapp,
    location: graduate.location,
    experience: graduate.experience,
    certifications: graduate.certifications,
    cvFile: graduate.cvFile,
    availability: graduate.availability,
    notes: graduate.notes,
  };

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/graduates" className="text-sm text-brand-700 hover:underline">
          ← Graduates
        </Link>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink-950">
          {graduate.fullName}
        </h1>
        <p className="text-sm text-ink-500">{graduate.trade}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-ink-950">Profile</h2>
          <EditGraduateForm graduateId={graduate.id} graduate={edge} />
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-ink-950">Applications</h2>
            <div className="space-y-3">
              {graduate.applications.map((a) => (
                <Link
                  key={a.id}
                  href={`/admin/opportunities/${a.opportunity.opportunityId}`}
                  className="block rounded-lg border border-ink-100 p-3 transition hover:border-brand-200 hover:bg-brand-50"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-ink-900">{a.opportunity.positionTitle}</p>
                    <span className="text-xs text-ink-400">
                      {APPLICATION_STATUS_LABELS[a.status]}
                    </span>
                  </div>
                  <p className="text-xs text-ink-500">
                    {a.opportunity.companyName} · {a.opportunity.opportunityId}
                  </p>
                </Link>
              ))}
              {graduate.applications.length === 0 && (
                <p className="text-sm text-ink-400">No applications yet.</p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-ink-950">Placements</h2>
            <div className="space-y-3">
              {graduate.placements.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/opportunities/${p.opportunity.opportunityId}`}
                  className="block rounded-lg border border-green-200 bg-green-50 p-3"
                >
                  <p className="font-medium text-green-900">
                    {p.employer} — {p.position}
                  </p>
                  <p className="text-xs text-green-700">
                    {p.opportunity.opportunityId} · Confirmed{" "}
                    {new Date(p.confirmedDate).toLocaleDateString("en-NG")}
                  </p>
                </Link>
              ))}
              {graduate.placements.length === 0 && (
                <p className="text-sm text-ink-400">No placements yet.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
