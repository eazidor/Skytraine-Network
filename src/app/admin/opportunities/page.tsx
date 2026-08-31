import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { StatusBadge, RewardBadge } from "@/components/StatusBadge";
import {
  OPPORTUNITY_STATUS_FLOW,
  OPPORTUNITY_STATUS_LABELS,
  REWARD_STATUS_LABELS,
} from "@/lib/constants";
import type { OpportunityStatus, RewardStatus } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminOpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const statusFilter = (OPPORTUNITY_STATUS_FLOW as string[]).includes(filter ?? "")
    ? (filter as OpportunityStatus)
    : undefined;
  const rewardFilter = (Object.keys(REWARD_STATUS_LABELS) as string[]).includes(filter ?? "")
    ? (filter as RewardStatus)
    : undefined;

  const opportunities = await prisma.opportunity.findMany({
    where: statusFilter ? { status: statusFilter } : rewardFilter ? { rewardStatus: rewardFilter } : undefined,
    include: {
      contributor: true,
      reward: true,
    },
    orderBy: { submittedAt: "desc" },
  });

  const counts = await prisma.opportunity.groupBy({
    by: ["status"],
    _count: { _all: true },
  });
  const countMap: Record<string, number> = {};
  for (const c of counts) countMap[c.status] = c._count._all;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink-950">Opportunities</h1>
        <p className="text-sm text-ink-500">All submitted opportunities</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Link
          href="/admin/opportunities"
          className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
            !statusFilter && !rewardFilter
              ? "border-brand-700 bg-brand-700 text-white"
              : "border-ink-200 bg-white text-ink-600 hover:bg-ink-100"
          }`}
        >
          All ({opportunities.length})
        </Link>
        {OPPORTUNITY_STATUS_FLOW.map((s) => (
          <Link
            key={s}
            href={`/admin/opportunities?filter=${s}`}
            className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
              statusFilter === s
                ? "border-brand-700 bg-brand-700 text-white"
                : "border-ink-200 bg-white text-ink-600 hover:bg-ink-100"
            }`}
          >
            {OPPORTUNITY_STATUS_LABELS[s]}
            {countMap[s] ? ` (${countMap[s]})` : ""}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-ink-100 text-sm">
            <thead className="bg-ink-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Position</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Company</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Contributor</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Submitted</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Reward</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {opportunities.map((o) => (
                <tr key={o.id} className="transition hover:bg-ink-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/opportunities/${o.opportunityId}`}
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      {o.opportunityId}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink-900">{o.positionTitle}</div>
                    <div className="text-xs text-ink-400">{o.tradeRequired}</div>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{o.companyName}</td>
                  <td className="px-4 py-3 text-ink-600">{o.contributor.fullName}</td>
                  <td className="px-4 py-3 text-xs text-ink-500">
                    {new Date(o.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-4 py-3">
                    {o.reward ? <RewardBadge status={o.reward.status} /> : <span className="text-xs text-ink-300">—</span>}
                  </td>
                </tr>
              ))}
              {opportunities.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-ink-400">
                    No opportunities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
