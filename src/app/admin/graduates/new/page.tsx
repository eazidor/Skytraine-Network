import Link from "next/link";
import { CreateGraduateForm } from "@/components/admin/CreateGraduateForm";

export default function AdminNewGraduatePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <Link href="/admin/graduates" className="text-sm text-brand-700 hover:underline">
          ← Graduates
        </Link>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink-950">
          Add graduate
        </h1>
      </div>
      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
        <CreateGraduateForm />
      </div>
    </div>
  );
}
