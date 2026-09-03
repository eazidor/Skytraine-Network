import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AlumniStatusBadge } from "@/components/StatusBadge";
import {
  ActivateAlumniForm,
  AlumniNotesForm,
  AlumniStatusForm,
  PlacementStatusForm,
} from "@/components/admin/AlumniControls";

export const dynamic = "force-dynamic";

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-ink-400">{label}</dt>
      <dd className="mt-0.5 text-ink-900">{value || "—"}</dd>
    </div>
  );
}

export default async function AdminAlumniDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let application = null;
  try {
    application = await prisma.alumniApplication.findUnique({
      where: { applicationId: id },
    });
  } catch {
    application = null;
  }

  if (!application) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/alumni" className="text-sm text-brand-700 hover:underline">
          ← Alumni Applications
        </Link>
        <div className="mt-1 flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-ink-950">
            {application.fullName}
          </h1>
          <AlumniStatusBadge status={application.status} />
        </div>
        <p className="text-sm text-ink-500">
          {application.applicationId} · {application.trade}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-ink-950">Applicant</h2>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Row label="Full name" value={application.fullName} />
              <Row label="WhatsApp" value={application.whatsapp} />
              <Row label="Email" value={application.email} />
              <Row label="Location" value={application.location} />
              <Row label="Submitted" value={new Date(application.submittedAt).toLocaleDateString("en-NG")} />
            </dl>
          </section>

          <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-ink-950">Skills &amp; experience</h2>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Row label="Trade" value={application.trade} />
              <Row label="Skills" value={application.skills} />
              <Row label="Years of experience" value={application.yearsOfExperience} />
              <Row label="Certifications" value={application.certifications} />
              <Row label="Current employment status" value={application.currentEmploymentStatus} />
              <Row label="Preferred work location" value={application.preferredWorkLocation} />
            </dl>
            {application.cvFile && (
              <p className="mt-4">
                <a
                  href={application.cvFile}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-brand-700 underline"
                >
                  View CV / portfolio
                </a>
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-ink-950">Internal notes</h2>
            <AlumniNotesForm applicationId={application.applicationId} notes={application.notes} />
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-ink-950">Application status</h2>
            <AlumniStatusForm
              applicationId={application.applicationId}
              status={application.status}
            />
          </section>

          <section className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-ink-950">Active support</h2>
            <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink-400">Start</p>
                <p className="mt-0.5 text-ink-900">
                  {application.activeSupportStart
                    ? new Date(application.activeSupportStart).toLocaleDateString("en-NG")
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink-400">End</p>
                <p className="mt-0.5 text-ink-900">
                  {application.activeSupportEnd
                    ? new Date(application.activeSupportEnd).toLocaleDateString("en-NG")
                    : "—"}
                </p>
              </div>
            </div>
            <ActivateAlumniForm
              applicationId={application.applicationId}
              disabled={application.status === "ACTIVE" || application.status === "PLACED"}
            />
            {application.activeSupportEnd && application.status === "ACTIVE" && (
              <p className="mt-3 text-xs text-ink-500">
                When active support expires, the graduate remains an alumnus and
                can apply again for active support later.
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-ink-950">Placement &amp; success fee</h2>
            <PlacementStatusForm
              applicationId={application.applicationId}
              placementStatus={application.placementStatus}
            />
            <p className="mt-4 text-xs leading-relaxed text-ink-500">
              The graduate pays ₦20,000 only after Skytraine successfully places
              them and they complete their first month of work.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
