import { AlumniApplicationForm } from "@/components/AlumniApplicationForm";
import { Logo } from "@/components/Logo";
import Link from "next/link";

export const metadata = {
  title: "Apply to the Alumni Network",
};

export default function ApplyPage() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-green-900/10 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Logo />
          <Link
            href="/"
            className="text-sm font-medium text-green-700 transition hover:text-green-900"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-brand-50 py-12">
        <div className="mx-auto max-w-2xl px-5">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              Skytraine Alumni Network
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-green-700 sm:text-4xl">
              Looking for work?
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-ink-700">
              Apply to the Skytraine Alumni Network to stay connected and be
              considered for relevant employment opportunities.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded border border-green-900/15 bg-white p-5">
            <p className="text-sm leading-relaxed text-ink-800">
              <span className="font-semibold text-green-700">Important:</span>{" "}
              There is no application fee. The Alumni Network is a benefit of
              training with Skytraine. Active employment support operates for 6
              months. You remain an alumnus permanently and can reapply for
              active support later.
            </p>
          </div>

          <AlumniApplicationForm />
        </div>
      </main>

      <footer className="border-t border-ink-800 bg-ink-950 py-8 text-center text-sm text-ink-300">
        © {new Date().getFullYear()} Skytraine International Ltd. All rights reserved.
      </footer>
    </>
  );
}
