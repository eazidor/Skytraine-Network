"use client";

import { useActionState } from "react";
import { submitOpportunity, type SubmitState } from "@/app/submit/actions";

const initialState: SubmitState = {};

function Field({
  label,
  name,
  required = false,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
        {required ? (
          <span className="ml-1 text-red-500">*</span>
        ) : (
          <span className="ml-1 font-normal text-ink-400">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

const inputCls =
  "block w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 shadow-sm placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";
const textareaCls =
  "block w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 shadow-sm placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";

export function SubmitForm() {
  const [state, formAction, pending] = useActionState(submitOpportunity, initialState);
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="mt-6">
      {state.error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="space-y-8">
        <section className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-ink-950">
            Contributor information
          </h2>
          <div className="space-y-4">
            <Field label="Full name" name="contributorName" required error={fe.contributorName?.[0]}>
              <input
                id="contributorName"
                name="contributorName"
                type="text"
                autoComplete="name"
                placeholder="e.g. Adaeze Okafor"
                required
                className={inputCls}
              />
            </Field>
            <Field
              label="WhatsApp phone number"
              name="contributorWhatsapp"
              required
              hint="We'll use this to keep you updated on your submission via WhatsApp."
              error={fe.contributorWhatsapp?.[0]}
            >
              <input
                id="contributorWhatsapp"
                name="contributorWhatsapp"
                type="tel"
                autoComplete="tel"
                placeholder="e.g. 0801 234 5678"
                required
                className={inputCls}
              />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-ink-950">
            Opportunity information
          </h2>
          <div className="space-y-4">
            <Field label="Company name" name="companyName" required error={fe.companyName?.[0]}>
              <input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="e.g. XYZ Construction Ltd."
                required
                className={inputCls}
              />
            </Field>
            <Field label="Job / position title" name="positionTitle" required error={fe.positionTitle?.[0]}>
              <input
                id="positionTitle"
                name="positionTitle"
                type="text"
                placeholder="e.g. Pipeline Welder"
                required
                className={inputCls}
              />
            </Field>
            <Field
              label="Skill / trade required"
              name="tradeRequired"
              required
              hint="e.g. Welding, Crane Operation, Solar Inverter, Truck Driving"
              error={fe.tradeRequired?.[0]}
            >
              <input
                id="tradeRequired"
                name="tradeRequired"
                type="text"
                placeholder="e.g. Welding"
                required
                className={inputCls}
              />
            </Field>
            <Field label="Number of workers required" name="workersRequired" required error={fe.workersRequired?.[0]}>
              <input
                id="workersRequired"
                name="workersRequired"
                type="number"
                min={1}
                placeholder="1"
                required
                className={inputCls}
              />
            </Field>
            <Field label="Location" name="location" required error={fe.location?.[0]}>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="City, State / work site"
                required
                className={inputCls}
              />
            </Field>
            <Field label="Job description" name="description" required error={fe.description?.[0]}>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe the role, responsibilities and what the job involves."
                required
                className={textareaCls}
              />
            </Field>
            <Field label="Requirements / qualifications" name="requirements" error={fe.requirements?.[0]}>
              <textarea
                id="requirements"
                name="requirements"
                rows={3}
                placeholder="Experience, certifications, or skills required (if known)."
                className={textareaCls}
              />
            </Field>
            <Field
              label="Application / contact details"
              name="applicationDetails"
              required
              hint="Email, phone, or how the graduate should apply."
              error={fe.applicationDetails?.[0]}
            >
              <input
                id="applicationDetails"
                name="applicationDetails"
                type="text"
                placeholder="e.g. hr@xyz.com or 0802 345 6789"
                required
                className={inputCls}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Application deadline" name="deadline" error={fe.deadline?.[0]}>
                <input
                  id="deadline"
                  name="deadline"
                  type="text"
                  placeholder="e.g. 30 Sep 2026"
                  className={inputCls}
                />
              </Field>
              <Field label="Source / link" name="sourceLink" error={fe.sourceLink?.[0]}>
                <input
                  id="sourceLink"
                  name="sourceLink"
                  type="text"
                  placeholder="https://..."
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Additional information" name="additionalInfo" error={fe.additionalInfo?.[0]}>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={2}
                placeholder="Anything else we should know (optional)."
                className={textareaCls}
              />
            </Field>
          </div>
        </section>
      </div>

      <div className="mt-6 rounded-xl border border-ink-200 bg-ink-50 p-4 text-sm leading-relaxed text-ink-700">
        <p className="font-medium text-ink-900">
          Before you submit
        </p>
        <p className="mt-1">
          By submitting this opportunity, you confirm that the information
          provided is genuine to the best of your knowledge. If this opportunity
          results in a successful placement of a Skytraine graduate, the person
          who submitted the opportunity will receive{" "}
          <span className="font-semibold">₦20,000</span>.
        </p>
        <p className="mt-2">
          We will keep you updated on the progress of your submission via
          WhatsApp.
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-accent-500 px-6 py-3.5 text-base font-semibold text-ink-950 shadow-sm transition hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit Opportunity"}
      </button>
    </form>
  );
}
