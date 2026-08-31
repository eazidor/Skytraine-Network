"use client";

import { useActionState } from "react";
import { updateApplication } from "@/app/admin/actions";
import { APPLICATION_STATUS_FLOW, APPLICATION_STATUS_LABELS } from "@/lib/constants";
import type { ApplicationStatus } from "@/generated/prisma/client";

const initialState: { error?: string } = {};

export function ApplicationForm({
  applicationId,
  opportunityId,
  status,
}: {
  applicationId: string;
  opportunityId: string;
  status: ApplicationStatus;
}) {
  const [state, formAction, pending] = useActionState(
    updateApplication.bind(null, applicationId, opportunityId),
    initialState
  );

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-2">
      <div className="min-w-[160px] flex-1">
        <label className="mb-1 block text-xs font-medium text-ink-500">Status</label>
        <select
          name="status"
          defaultValue={status}
          className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        >
          {APPLICATION_STATUS_FLOW.map((s) => (
            <option key={s} value={s}>
              {APPLICATION_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
      <div className="min-w-[180px] flex-1">
        <label className="mb-1 block text-xs font-medium text-ink-500">Notes</label>
        <input
          name="notes"
          type="text"
          placeholder="Notes (optional)"
          className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60"
      >
        {pending ? "…" : "Update"}
      </button>
      {state.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
