import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StatusBadge, RewardBadge } from "@/components/StatusBadge";
import {
  APPLICATION_STATUS_LABELS,
  REJECTION_REASON_LABELS,
  OPPORTUNITY_STATUS_LABELS,
} from "@/lib/constants";
import { OpportunityStatusControls } from "@/components/admin/OpportunityStatusControls";
import { NotesForm } from "@/components/admin/NotesForm";
import { MatchForm } from "@/components/admin/MatchForm";
import { ApplicationForm } from "@/components/admin/ApplicationForm";
import { PlacementConfirm } from "@/components/admin/PlacementConfirm";
import { RewardControls } from "@/components/admin/RewardControls";
import { RemoveMatchButton } from "@/components/admin/RemoveMatchButton";

export const dynamic = "force-dynamic";

export default async function AdminOpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let opportunity = null;
  try {
    opportunity = await prisma.opportunity.findUnique({
      where: { opportunityId: id },
      include: {
        contributor: true,
        statusHistory: {
          include: { changedBy: true },
          orderBy: { changedAt: "asc" },
        },
        matches: {
          include: {
            graduate: true,
          },
          orderBy: { matchedDate: "desc" },
        },
        applications: {
          include: { graduate: true },
          orderBy: { appliedDate: "desc" },
        },
        placements: {
          include: { graduate: true },
        },
        reward: {
          include: { contributor: true, placement: { include: { graduate: true } } },
        },
      },
    });
  } catch {
    opportunity = null;
  }

  if (!opportunity) {
    notFound();
  }

  const graduates = await prisma.graduate.findMany({
    orderBy: { fullName: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/opportunities"
            className="text-sm text-brand-700 hover:underline"
          >
            ← Opportunities
          </Link>
          <h1 className="mt-1 flex flex-wrap items-center gap-3 text-2xl font-bold tracking-tight text-ink-950">
            {opportunity.opportunityId}
            <StatusBadge status={opportunity.status} />
            {opportunity.reward && <RewardBadge status={opportunity.reward.status} />}
          </h1>
          <p className="text-sm text-ink-500">
            {opportunity.positionTitle} · {opportunity.companyName}
          </p>
        </div>
        <div className="text-sm text-ink-500">
          Submitted {new Date(opportunity.submittedAt).toLocaleString("en-NG")}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-ink-950">Opportunity</h2>
            <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              <Info label="Company" value={opportunity.companyName} />
              <Info label="Position" value={opportunity.positionTitle} />
              <Info label="Skill / trade" value={opportunity.tradeRequired} />
              <Info label="Workers required" value={String(opportunity.workersRequired)} />
              <Info label="Location" value={opportunity.location} />
              <Info
                label="Deadline"
                value={opportunity.deadline ?? "Not provided"}
              />
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-ink-500">Description</dt>
                <dd className="mt-1 whitespace-pre-wrap text-ink-900">
                  {opportunity.description}
                </dd>
              </div>
              {opportunity.requirements && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-ink-500">Requirements</dt>
                  <dd className="mt-1 whitespace-pre-wrap text-ink-900">
                    {opportunity.requirements}
                  </dd>
                </div>
              )}
              <Info label="Application / contact" value={opportunity.applicationDetails} />
              {opportunity.sourceLink && (
                <Info
                  label="Source / link"
                  value={opportunity.sourceLink}
                  link={opportunity.sourceLink}
                />
              )}
              {opportunity.additionalInfo && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-ink-500">Additional information</dt>
                  <dd className="mt-1 whitespace-pre-wrap text-ink-900">
                    {opportunity.additionalInfo}
                  </dd>
                </div>
              )}
            </dl>
          </section>

          <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-ink-950">Verification</h2>
            <OpportunityStatusControls
              opportunityId={opportunity.opportunityId}
              status={opportunity.status}
            />
            {opportunity.status === "REJECTED" && (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {opportunity.rejectionReason && (
                  <p>
                    Reason:{" "}
                    <span className="font-semibold">
                      {REJECTION_REASON_LABELS[opportunity.rejectionReason]}
                    </span>
                  </p>
                )}
                {opportunity.rejectionNote && <p className="mt-1">{opportunity.rejectionNote}</p>}
              </div>
            )}
            {opportunity.verifiedAt && (
              <p className="mt-3 text-xs text-emerald-700">
                Verified on{" "}
                {new Date(opportunity.verifiedAt).toLocaleString("en-NG")}
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-ink-950">Internal notes</h2>
            <NotesForm
              opportunityId={opportunity.opportunityId}
              initialNotes={opportunity.internalNotes}
            />
          </section>

          <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink-950">Matched graduates</h2>
              {(opportunity.status === "VERIFIED" || opportunity.status === "MATCHED") && (
                <span className="text-xs text-ink-400">Opportunity is {OPPORTUNITY_STATUS_LABELS[opportunity.status]}</span>
              )}
            </div>

            {opportunity.status !== "VERIFIED" && opportunity.status !== "MATCHED" && (
              <p className="mb-4 rounded-lg border border-ink-100 bg-ink-50 px-3 py-2 text-sm text-ink-500">
                This opportunity must be verified before graduates can be matched.
              </p>
            )}

            {(opportunity.status === "VERIFIED" || opportunity.status === "MATCHED") && (
              <div className="mb-5 rounded-xl border border-violet-200 bg-violet-50 p-4">
                <p className="mb-2 text-sm font-medium text-violet-900">Assign a graduate</p>
                <MatchForm
                  opportunityId={opportunity.opportunityId}
                  graduates={graduates}
                />
              </div>
            )}

            <div className="space-y-3">
              {opportunity.matches.map((m) => (
                <div
                  key={m.id}
                  className="flex items-start justify-between rounded-lg border border-ink-100 p-3"
                >
                  <div>
                    <p className="font-medium text-ink-900">{m.graduate.fullName}</p>
                    <p className="text-xs text-ink-500">
                      {m.graduate.trade}
                      {m.graduate.location ? ` · ${m.graduate.location}` : ""}
                    </p>
                    {m.adminNotes && <p className="mt-1 text-sm text-ink-600">{m.adminNotes}</p>}
                    <p className="mt-1 text-xs text-ink-400">
                      Matched {new Date(m.matchedDate).toLocaleDateString("en-NG")}
                    </p>
                  </div>
                  <RemoveMatchButton matchId={m.id} graduateName={m.graduate.fullName} />
                </div>
              ))}
              {opportunity.matches.length === 0 && (
                <p className="text-sm text-ink-400">No graduates matched yet.</p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-ink-950">Applications</h2>
            <div className="space-y-4">
              {opportunity.applications.map((a) => (
                <div key={a.id} className="rounded-lg border border-ink-100 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-medium text-ink-900">{a.graduate.fullName}</p>
                    <span className="rounded-full border border-ink-200 bg-ink-50 px-2.5 py-0.5 text-xs font-medium text-ink-600">
                      {APPLICATION_STATUS_LABELS[a.status]}
                    </span>
                  </div>
                  {a.notes && <p className="mb-2 text-sm text-ink-600">{a.notes}</p>}
                  <ApplicationForm
                    applicationId={a.id}
                    opportunityId={opportunity.opportunityId}
                    status={a.status}
                  />
                </div>
              ))}
              {opportunity.applications.length === 0 && (
                <p className="text-sm text-ink-400">No applications yet.</p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-ink-950">Placement</h2>
            <PlacementConfirm
              opportunityId={opportunity.opportunityId}
              graduates={opportunity.matches.map((m) => ({
                id: m.graduateId,
                fullName: m.graduate.fullName,
              }))}
              companyName={opportunity.companyName}
              positionTitle={opportunity.positionTitle}
            />
            {opportunity.placements.length > 0 && (
              <div className="mt-4 space-y-3">
                {opportunity.placements.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-900"
                  >
                    <p className="font-semibold">
                      {p.employer} — {p.position}
                    </p>
                    <p className="text-green-700">{p.graduate.fullName}</p>
                    <p className="mt-1 text-xs text-green-700">
                      Confirmed {new Date(p.confirmedDate).toLocaleDateString("en-NG")}
                    </p>
                    {p.notes && <p className="mt-1 text-green-700">{p.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-ink-950">Contributor</h2>
            <dl className="space-y-3 text-sm">
              <Info label="Full name" value={opportunity.contributor.fullName} />
              <Info label="WhatsApp" value={opportunity.contributor.whatsapp} />
              <Info
                label="Submitted"
                value={new Date(opportunity.submittedAt).toLocaleString("en-NG")}
              />
            </dl>
          </section>

          <section className="rounded-2xl border border-orange-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-ink-950">Reward</h2>
            {opportunity.reward ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-500">Amount</span>
                  <span className="text-lg font-bold text-ink-900">
                    ₦{opportunity.reward.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-500">Status</span>
                  <RewardBadge status={opportunity.reward.status} />
                </div>
                {opportunity.reward.becamePayableAt && (
                  <p className="text-xs text-ink-500">
                    Payable since{" "}
                    {new Date(opportunity.reward.becamePayableAt).toLocaleDateString("en-NG")}
                  </p>
                )}
                <RewardControls
                  rewardId={opportunity.reward.id}
                  opportunityId={opportunity.opportunityId}
                  status={opportunity.reward.status}
                  paidAt={opportunity.reward.paidAt}
                  paymentReference={opportunity.reward.paymentReference}
                  paymentNotes={opportunity.reward.paymentNotes}
                />
              </div>
            ) : (
              <p className="text-sm text-ink-500">
                No reward yet. Confirming a placement will create a ₦20,000
                reward automatically.
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-ink-950">Status history</h2>
            <ol className="relative space-y-4 border-l border-ink-200 pl-5">
              {opportunity.statusHistory.map((h) => (
                <li key={h.id} className="relative">
                  <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-white bg-brand-600" />
                  <p className="text-sm font-medium text-ink-900">
                    {OPPORTUNITY_STATUS_LABELS[h.toStatus]}
                  </p>
                  <p className="text-xs text-ink-500">
                    {new Date(h.changedAt).toLocaleString("en-NG")}
                    {h.changedBy ? ` · ${h.changedBy.name}` : ""}
                  </p>
                  {h.note && <p className="mt-0.5 text-xs text-ink-600">{h.note}</p>}
                </li>
              ))}
              {opportunity.statusHistory.length === 0 && (
                <li className="text-sm text-ink-400">No status changes recorded.</li>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
  link,
}: {
  label: string;
  value: string;
  link?: string;
}) {
  return (
    <div>
      <dt className="text-sm font-medium text-ink-500">{label}</dt>
      <dd className="mt-0.5 text-ink-900">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
