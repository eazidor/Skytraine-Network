import { SubmitForm } from "@/components/SubmitForm";
import { Logo } from "@/components/Logo";
import Link from "next/link";

export const metadata = {
  title: "Submit an Opportunity",
};

export default function SubmitPage() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Logo />
          <Link
            href="/"
            className="text-sm font-medium text-ink-600 transition hover:text-ink-950"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-ink-50 py-12">
        <div className="mx-auto max-w-2xl px-5">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
              Skytraine Opportunity Network
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
              Submit an Opportunity
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-ink-600">
              Share a genuine employment opportunity you&apos;ve encountered.
              We&apos;ll review it and match a suitable Skytraine graduate.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-accent-200 bg-accent-50 p-5">
            <p className="text-sm leading-relaxed text-ink-800">
              <span className="font-semibold text-ink-950">Your reward:</span>{" "}
              If this opportunity results in a{" "}
              <span className="font-semibold">successful placement</span> of a
              Skytraine graduate, the person who submitted the opportunity will
              receive{" "}
              <span className="font-semibold text-accent-700">₦20,000</span>.
            </p>
          </div>

          <SubmitForm />
        </div>
      </main>

      <footer className="border-t border-ink-100 bg-ink-950 py-8 text-center text-sm text-ink-300">
        © {new Date().getFullYear()} Skytraine International Ltd. All rights reserved.
      </footer>
    </>
  );
}
