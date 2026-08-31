import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { RewardBadge } from "@/components/StatusBadge";
import { REWARD_FLOW, REWARD_STATUS_LABELS } from "@/lib/constants";
import type { RewardStatus } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminRewardsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const statusFilter = (REWARD_FLOW as string[]).includes(filter ?? "")
    ? (filter as RewardStatus)
    : undefined;

  const rewards = await prisma.reward.findMany({
    where: statusFilter ? { status: statusFilter } : undefined,
    include: {
      contributor: true,
      opportunity: true,
      placement: { include: { graduate: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink-950">Rewards</h1>
        <p className="text-sm text-ink-500">
          ₦20,000 per successful placement, tracked to the original contributor
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Link
          href="/admin/rewards"
          className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
            !statusFilter ? "border-brand-700 bg-brand-700 text-white" : "border-ink-200 bg-white text-ink-600 hover:bg-ink-100"
          }`}
        >
          All ({rewards.length})
        </Link>
        {REWARD_FLOW.map((s) => (
          <Link
            key={s}
            href={`/admin/rewards?filter=${s}`}
            className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
              statusFilter === s ? "border-brand-700 bg-brand-700 text-white" : "border-ink-200 bg-white text-ink-600 hover:bg-ink-100"
            }`}
          >
            {REWARD_STATUS_LABELS[s]}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-ink-100 text-sm">
            <thead className="bg-ink-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Opportunity</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Contributor</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Placement</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Payable since</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Paid on</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {rewards.map((r) => (
                <tr key={r.id} className="transition hover:bg-ink-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/opportunities/${r.opportunity.opportunityId}`}
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      {r.opportunity.opportunityId}
                    </Link>
                    <div className="text-xs text-ink-400">{r.opportunity.positionTitle}</div>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{r.contributor.fullName}</td>
                  <td className="px-4 py-3 font-semibold text-ink-900">
                    ₦{r.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <RewardBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-ink-600">
                    {r.placement
                      ? `${r.placement.graduate.fullName} — ${r.placement.employer}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-500">
                    {r.becamePayableAt
                      ? new Date(r.becamePayableAt).toLocaleDateString("en-NG")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-500">
                    {r.paidAt ? new Date(r.paidAt).toLocaleDateString("en-NG") : "—"}
                  </td>
                </tr>
              ))}
              {rewards.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-ink-400">
                    No rewards found.
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
