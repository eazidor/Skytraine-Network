"use client";

import { useActionState } from "react";
import { saveInternalNotes } from "@/app/admin/actions";

const initialState: { error?: string } = {};

export function NotesForm({
  opportunityId,
  initialNotes,
}: {
  opportunityId: string;
  initialNotes: string | null;
}) {
  const [state, formAction, pending] = useActionState(
    saveInternalNotes.bind(null, opportunityId),
    initialState
  );

  return (
    <form action={formAction} className="space-y-2">
      {state?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      )}
      <textarea
        name="internalNotes"
        rows={3}
        defaultValue={initialNotes ?? ""}
        placeholder="Internal notes (visible to admins only)"
        className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-800 transition hover:bg-ink-100 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save notes"}
      </button>
    </form>
  );
}
