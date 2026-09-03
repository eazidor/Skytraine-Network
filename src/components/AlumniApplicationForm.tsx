"use client";

import { useActionState } from "react";
import { submitAlumniApplication, type ApplyState } from "@/app/apply/actions";

const initialState: ApplyState = {};

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

export function AlumniApplicationForm() {
  const [state, formAction, pending] = useActionState(submitAlumniApplication, initialState);
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="mt-6">
      {state.error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="space-y-8">
        <section className="rounded border border-green-900/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-green-700">
            Personal information
          </h2>
          <div className="space-y-4">
            <Field label="Full name" name="fullName" required error={fe.fullName?.[0]}>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="e.g. Adaeze Okafor"
                required
                className={inputCls}
              />
            </Field>
            <Field
              label="WhatsApp phone number"
              name="whatsapp"
              required
              hint="We'll contact you via WhatsApp about your application."
              error={fe.whatsapp?.[0]}
            >
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                placeholder="e.g. 0801 234 5678"
                required
                className={inputCls}
              />
            </Field>
            <Field label="Email" name="email" required error={fe.email?.[0]}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="e.g. adaeze@example.com"
                required
                className={inputCls}
              />
            </Field>
            <Field label="Location" name="location" required error={fe.location?.[0]}>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Lagos, Nigeria"
                required
                className={inputCls}
              />
            </Field>
          </div>
        </section>

        <section className="rounded border border-green-900/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-green-700">
            Skills and experience
          </h2>
          <div className="space-y-4">
            <Field label="Trade" name="trade" required hint="e.g. Welding, Crane Operation, Solar Inverter" error={fe.trade?.[0]}>
              <input
                id="trade"
                name="trade"
                type="text"
                placeholder="e.g. Welding"
                required
                className={inputCls}
              />
            </Field>
            <Field label="Skills" name="skills" required hint="List your key skills" error={fe.skills?.[0]}>
              <input
                id="skills"
                name="skills"
                type="text"
                placeholder="e.g. TIG welding, pipe fitting, blueprint reading"
                required
                className={inputCls}
              />
            </Field>
            <Field label="Years of experience" name="yearsOfExperience" required error={fe.yearsOfExperience?.[0]}>
              <input
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="text"
                placeholder="e.g. 3 years"
                required
                className={inputCls}
              />
            </Field>
            <Field label="Certifications" name="certifications" error={fe.certifications?.[0]}>
              <input
                id="certifications"
                name="certifications"
                type="text"
                placeholder="e.g. AWS Certified Welder, BOSIET"
                className={inputCls}
              />
            </Field>
          </div>
        </section>

        <section className="rounded border border-green-900/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-green-700">
            Employment preferences
          </h2>
          <div className="space-y-4">
            <Field
              label="Current employment status"
              name="currentEmploymentStatus"
              required
              hint="e.g. Employed, Unemployed, Freelancing"
              error={fe.currentEmploymentStatus?.[0]}
            >
              <input
                id="currentEmploymentStatus"
                name="currentEmploymentStatus"
                type="text"
                placeholder="e.g. Unemployed"
                required
                className={inputCls}
              />
            </Field>
            <Field label="Preferred work location" name="preferredWorkLocation" required error={fe.preferredWorkLocation?.[0]}>
              <input
                id="preferredWorkLocation"
                name="preferredWorkLocation"
                type="text"
                placeholder="e.g. Lagos, Port Harcourt, Anywhere in the World"
                required
                className={inputCls}
              />
            </Field>
            <Field
              label="CV / portfolio link"
              name="cvFile"
              hint="Share a link to your CV or portfolio (Google Drive, Dropbox, etc.)"
              error={fe.cvFile?.[0]}
            >
              <input
                id="cvFile"
                name="cvFile"
                type="text"
                placeholder="https://..."
                className={inputCls}
              />
            </Field>
          </div>
        </section>
      </div>

      <div className="mt-6 rounded-xl border border-ink-200 bg-ink-50 p-4 text-sm leading-relaxed text-ink-700">
        <p className="font-medium text-ink-900">
          Before you apply
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>
            The Alumni Network is a benefit of training with Skytraine.
          </li>
          <li>
            There is no application fee.
          </li>
          <li>
            Active employment support operates for 6 months from activation.
          </li>
          <li>
            You remain part of the Alumni Network after those 6 months.
          </li>
          <li>
            You can apply again for active employment support later if needed.
          </li>
          <li>
            Employment is not guaranteed.
          </li>
          <li>
            If Skytraine successfully places you and you complete your first
            month of work, a ₦20,000 success-fee applies.
          </li>
        </ul>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex w-full items-center justify-center rounded border border-green-800 bg-green-700 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
