"use client";

import { useActionState } from "react";
import { addMatch } from "@/app/admin/actions";

const initialState: { error?: string } = {};

export function MatchForm({
  opportunityId,
  graduates,
}: {
  opportunityId: string;
  graduates: { id: string; fullName: string; trade: string }[];
}) {
  const [state, formAction, pending] = useActionState(
    addMatch.bind(null, opportunityId),
    initialState
  );

  return (
    <form action={formAction} className="space-y-2">
      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      )}
      <select
        name="graduateId"
        required
        className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      >
        <option value="">Select a graduate…</option>
        {graduates.map((g) => (
          <option key={g.id} value={g.id}>
            {g.fullName} — {g.trade}
          </option>
        ))}
      </select>
      <input
        name="adminNotes"
        type="text"
        placeholder="Admin notes (optional)"
        className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
      >
        {pending ? "Adding…" : "Assign graduate"}
      </button>
    </form>
  );
}
