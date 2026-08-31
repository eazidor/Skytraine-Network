import { OPPORTUNITY_STATUS_LABELS, REWARD_STATUS_LABELS } from "@/lib/constants";

const statusStyles: Record<string, string> = {
  SUBMITTED: "bg-sky-50 text-sky-700 border-sky-200",
  UNDER_REVIEW: "bg-amber-50 text-amber-700 border-amber-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
  VERIFIED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  MATCHED: "bg-violet-50 text-violet-700 border-violet-200",
  APPLICATION_SUBMITTED: "bg-indigo-50 text-indigo-700 border-indigo-200",
  INTERVIEW: "bg-cyan-50 text-cyan-700 border-cyan-200",
  PLACEMENT_CONFIRMED: "bg-green-50 text-green-700 border-green-200",
  CLOSED: "bg-ink-50 text-ink-500 border-ink-200",
};

const rewardStyles: Record<string, string> = {
  NOT_ELIGIBLE: "bg-ink-50 text-ink-500 border-ink-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  PAYABLE: "bg-orange-50 text-orange-700 border-orange-200",
  PAID: "bg-green-50 text-green-700 border-green-200",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        statusStyles[status] ?? "bg-ink-50 text-ink-600 border-ink-200"
      }`}
    >
      {OPPORTUNITY_STATUS_LABELS[status as keyof typeof OPPORTUNITY_STATUS_LABELS] ?? status}
    </span>
  );
}

export function RewardBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        rewardStyles[status] ?? "bg-ink-50 text-ink-600 border-ink-200"
      }`}
    >
      {REWARD_STATUS_LABELS[status as keyof typeof REWARD_STATUS_LABELS] ?? status}
    </span>
  );
}
