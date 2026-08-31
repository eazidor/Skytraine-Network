"use client";

import { useState } from "react";
import { updateOpportunityStatus } from "@/app/admin/actions";
import { REJECTION_REASONS, REJECTION_REASON_LABELS } from "@/lib/constants";
import type { OpportunityStatus } from "@/generated/prisma/client";

export function OpportunityStatusControls({
  opportunityId,
  status,
}: {
  opportunityId: string;
  status: OpportunityStatus;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(next: OpportunityStatus) {
    setBusy(next);
    setError(null);
    try {
      await updateOpportunityStatus(opportunityId, next);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(null);
    }
  }

  async function reject(formData: FormData) {
    setBusy("REJECTED");
    setError(null);
    try {
      await updateOpportunityStatus(opportunityId, "REJECTED", formData);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      {error && (
        <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {status === "SUBMITTED" && (
          <button
            onClick={() => run("UNDER_REVIEW")}
            disabled={busy !== null}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:opacity-60"
          >
            {busy === "UNDER_REVIEW" ? "…" : "Mark Under Review"}
          </button>
        )}
        {(status === "UNDER_REVIEW" || status === "SUBMITTED") && (
          <>
            <button
              onClick={() => run("VERIFIED")}
              disabled={busy !== null}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              {busy === "VERIFIED" ? "…" : "Verify"}
            </button>
            <button
              onClick={() => setRejectOpen((v) => !v)}
              disabled={busy !== null}
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
            >
              Reject
            </button>
          </>
        )}
      </div>

      {rejectOpen && (
        <form action={reject} className="mt-3 space-y-2 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">Reject this opportunity</p>
          <div>
            <label className="mb-1 block text-xs font-medium text-red-700">Reason</label>
            <select
              name="rejectionReason"
              required
              className="block w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <option value="">Select a reason…</option>
              {REJECTION_REASONS.map((r) => (
                <option key={r} value={r}>
                  {REJECTION_REASON_LABELS[r]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-red-700">Notes (optional)</label>
            <textarea
              name="rejectionNote"
              rows={2}
              className="block w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy !== null}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {busy === "REJECTED" ? "…" : "Confirm rejection"}
            </button>
            <button
              type="button"
              onClick={() => setRejectOpen(false)}
              className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
