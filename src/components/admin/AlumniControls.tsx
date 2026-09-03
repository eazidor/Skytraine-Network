"use client";

import { useActionState } from "react";
import {
  activateAlumniApplication,
  saveAlumniNotes,
  updateAlumniApplicationStatus,
  updatePlacementStatus,
} from "@/app/admin/alumni/actions";
import {
  ALUMNI_APPLICATION_STATUS_FLOW,
  ALUMNI_APPLICATION_STATUS_LABELS,
} from "@/lib/constants";
import type { AlumniApplicationStatus } from "@/generated/prisma/client";

const initialState: { error?: string } = {};

export function AlumniStatusForm({
  applicationId,
  status,
}: {
  applicationId: string;
  status: AlumniApplicationStatus;
}) {
  return (
    <form
      action={(fd) => updateAlumniApplicationStatus(applicationId, fd.get("status") as AlumniApplicationStatus)}
      className="flex flex-wrap items-end gap-2"
    >
      <div className="min-w-[200px] flex-1">
        <label className="mb-1 block text-xs font-medium text-ink-500">Status</label>
        <select
          name="status"
          defaultValue={status}
          className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        >
          {ALUMNI_APPLICATION_STATUS_FLOW.map((s) => (
            <option key={s} value={s}>
              {ALUMNI_APPLICATION_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
      >
        Update
      </button>
    </form>
  );
}

export function ActivateAlumniForm({
  applicationId,
  disabled,
}: {
  applicationId: string;
  disabled?: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    activateAlumniApplication.bind(null, applicationId),
    initialState
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex flex-wrap items-end gap-2">
        <div className="min-w-[160px] flex-1">
          <label className="mb-1 block text-xs font-medium text-ink-500">
            Active support period
          </label>
          <select
            name="supportMonths"
            defaultValue="6"
            className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            <option value="6">6 months</option>
            <option value="3">3 months</option>
            <option value="12">12 months</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={pending || disabled}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
        >
          {pending ? "…" : "Activate"}
        </button>
      </div>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}

export function AlumniNotesForm({ applicationId, notes }: { applicationId: string; notes?: string | null }) {
  const [state, formAction, pending] = useActionState(
    saveAlumniNotes.bind(null, applicationId),
    initialState
  );

  return (
    <form action={formAction} className="space-y-3">
      <textarea
        name="notes"
        defaultValue={notes ?? ""}
        rows={3}
        placeholder="Internal notes…"
        className="block w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save notes"}
        </button>
        {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      </div>
    </form>
  );
}

export function PlacementStatusForm({
  applicationId,
  placementStatus,
}: {
  applicationId: string;
  placementStatus?: string | null;
}) {
  const [state, formAction, pending] = useActionState(
    updatePlacementStatus.bind(null, applicationId),
    initialState
  );

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-2">
      <div className="min-w-[200px] flex-1">
        <label className="mb-1 block text-xs font-medium text-ink-500">
          Placement status
        </label>
        <select
          name="placementStatus"
          defaultValue={placementStatus ?? ""}
          className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        >
          <option value="">—</option>
          <option value="Not placed">Not placed</option>
          <option value="Placed">Placed</option>
        </select>
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
