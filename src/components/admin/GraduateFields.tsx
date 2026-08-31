"use client";

const inputCls =
  "block w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";

export function GraduateFields({ graduate }: { graduate?: Record<string, string | null> }) {
  return (
    <>
      <div>
        <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-ink-800">
          Full name <span className="text-red-500">*</span>
        </label>
        <input id="fullName" name="fullName" type="text" required defaultValue={graduate?.fullName ?? ""} className={inputCls} />
      </div>
      <div>
        <label htmlFor="trade" className="mb-1.5 block text-sm font-medium text-ink-800">
          Trade / specialization <span className="text-red-500">*</span>
        </label>
        <input id="trade" name="trade" type="text" required defaultValue={graduate?.trade ?? ""} placeholder="e.g. Welding" className={inputCls} />
      </div>
      <div>
        <label htmlFor="whatsapp" className="mb-1.5 block text-sm font-medium text-ink-800">
          Phone / WhatsApp
        </label>
        <input id="whatsapp" name="whatsapp" type="text" defaultValue={graduate?.whatsapp ?? ""} className={inputCls} />
      </div>
      <div>
        <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-ink-800">
          Location
        </label>
        <input id="location" name="location" type="text" defaultValue={graduate?.location ?? ""} className={inputCls} />
      </div>
      <div>
        <label htmlFor="experience" className="mb-1.5 block text-sm font-medium text-ink-800">
          Experience
        </label>
        <textarea id="experience" name="experience" rows={2} defaultValue={graduate?.experience ?? ""} placeholder="Experience summary" className={inputCls} />
      </div>
      <div>
        <label htmlFor="certifications" className="mb-1.5 block text-sm font-medium text-ink-800">
          Certifications
        </label>
        <input id="certifications" name="certifications" type="text" defaultValue={graduate?.certifications ?? ""} className={inputCls} />
      </div>
      <div>
        <label htmlFor="cvFile" className="mb-1.5 block text-sm font-medium text-ink-800">
          CV / file link
        </label>
        <input id="cvFile" name="cvFile" type="text" defaultValue={graduate?.cvFile ?? ""} placeholder="Link to CV or file" className={inputCls} />
      </div>
      <div>
        <label htmlFor="availability" className="mb-1.5 block text-sm font-medium text-ink-800">
          Availability
        </label>
        <input id="availability" name="availability" type="text" defaultValue={graduate?.availability ?? ""} placeholder="e.g. Immediately available" className={inputCls} />
      </div>
      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-ink-800">
          Notes
        </label>
        <textarea id="notes" name="notes" rows={2} defaultValue={graduate?.notes ?? ""} className={inputCls} />
      </div>
    </>
  );
}
