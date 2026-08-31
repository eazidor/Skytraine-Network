"use client";

import { useActionState } from "react";
import { confirmPlacement } from "@/app/admin/actions";

const initialState: { error?: string } = {};

export function PlacementConfirm({
  opportunityId,
  graduates,
  companyName,
  positionTitle,
}: {
  opportunityId: string;
  graduates: { id: string; fullName: string }[];
  companyName: string;
  positionTitle: string;
}) {
  const [state, formAction, pending] = useActionState(
    confirmPlacement.bind(null, opportunityId),
    initialState
  );

  return (
    <form action={formAction} className="space-y-2">
      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      )}
      <p className="text-sm text-ink-600">
        Records a successful placement, sets the opportunity to{" "}
        <span className="font-semibold">Placement Confirmed</span> and credits
        the original contributor a{" "}
        <span className="font-semibold">₦20,000</span> reward.
      </p>
      <select
        name="graduateId"
        required
        className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      >
        <option value="">Select the placed graduate…</option>
        {graduates.map((g) => (
          <option key={g.id} value={g.id}>
            {g.fullName}
          </option>
        ))}
      </select>
      <div className="grid gap-2 sm:grid-cols-2">
        <input
          name="employer"
          type="text"
          defaultValue={companyName}
          placeholder="Employer / company"
          className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <input
          name="position"
          type="text"
          defaultValue={positionTitle}
          placeholder="Position"
          className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <input
        name="notes"
        type="text"
        placeholder="Notes (optional)"
        className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
      >
        {pending ? "Recording…" : "Confirm placement"}
      </button>
    </form>
  );
}
