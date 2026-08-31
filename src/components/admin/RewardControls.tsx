"use client";

import { useActionState, useState } from "react";
import { markRewardPaid, resetRewardToPayable } from "@/app/admin/actions";
import { REWARD_STATUS_LABELS } from "@/lib/constants";
import type { RewardStatus } from "@/generated/prisma/client";

const initialState: { error?: string } = {};

export function RewardControls({
  rewardId,
  opportunityId,
  status,
  paidAt,
  paymentReference,
  paymentNotes,
}: {
  rewardId: string;
  opportunityId: string;
  status: RewardStatus;
  paidAt: Date | null;
  paymentReference: string | null;
  paymentNotes: string | null;
}) {
  const [state, formAction, pending] = useActionState(
    markRewardPaid.bind(null, rewardId),
    initialState
  );
  const [busyReset, setBusyReset] = useState(false);

  return (
    <div className="space-y-3">
      <div>
        <span className="text-xs font-medium text-ink-500">Status</span>
        <p className="text-lg font-semibold text-ink-900">
          {REWARD_STATUS_LABELS[status]}
        </p>
      </div>

      {status === "PAYABLE" && (
        <form action={formAction} className="space-y-2">
          {state.error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {state.error}
            </div>
          )}
          <input
            name="paymentReference"
            type="text"
            placeholder="Payment reference (e.g. transfer ref)"
            className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <input
            name="paymentNotes"
            type="text"
            placeholder="Payment notes (optional)"
            className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
          >
            {pending ? "…" : "Mark as paid"}
          </button>
        </form>
      )}

      {status === "PAID" && (
        <>
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            {paidAt && (
              <p>
                Paid on{" "}
                <span className="font-semibold">
                  {new Date(paidAt).toLocaleDateString("en-NG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            )}
            {paymentReference && <p>Reference: {paymentReference}</p>}
            {paymentNotes && <p className="text-green-700">Notes: {paymentNotes}</p>}
          </div>
          <button
            onClick={async () => {
              setBusyReset(true);
              await resetRewardToPayable(rewardId, opportunityId);
              setBusyReset(false);
            }}
            disabled={busyReset}
            className="rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition hover:bg-ink-100 disabled:opacity-60"
          >
            {busyReset ? "…" : "Reset to payable"}
          </button>
        </>
      )}
    </div>
  );
}
