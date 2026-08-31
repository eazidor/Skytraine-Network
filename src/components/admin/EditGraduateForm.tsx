"use client";

import { useActionState } from "react";
import { updateGraduate } from "@/app/admin/graduates/actions";
import { GraduateFields } from "@/components/admin/GraduateFields";

const initialState: { error?: string } = {};

export function EditGraduateForm({
  graduateId,
  graduate,
}: {
  graduateId: string;
  graduate: Record<string, string | null>;
}) {
  const [state, formAction, pending] = useActionState(
    updateGraduate.bind(null, graduateId),
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}
      <GraduateFields graduate={graduate} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
