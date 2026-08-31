import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Logo } from "@/components/Logo";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Opportunity Submitted",
};

export default async function SubmittedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let opportunity = null;
  try {
    opportunity = await prisma.opportunity.findUnique({
      where: { opportunityId: id },
      include: { contributor: true },
    });
  } catch {
    opportunity = null;
  }

  if (!opportunity) {
    notFound();
  }

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

      <main className="flex flex-1 items-center justify-center bg-brand-50 py-16">
        <div className="mx-auto max-w-xl px-5">
          <div className="overflow-hidden rounded border border-green-700/20 bg-white shadow-sm">
            <div className="bg-green-700/10 px-6 py-6 text-center">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-700/15 text-3xl">
                <span className="text-green-700">✓</span>
              </div>
              <h1 className="mt-4 text-2xl font-bold text-green-700">
                Opportunity submitted successfully
              </h1>
            </div>
            <div className="p-6 sm:p-8">
              <div className="rounded border border-green-700/15 bg-green-700/10 p-5 text-center">
                <p className="text-sm font-medium text-ink-500">Your Opportunity ID</p>
                <p className="mt-1 text-3xl font-extrabold tracking-tight text-green-700">
                  {opportunity.opportunityId}
                </p>
                <p className="mt-2 text-xs text-ink-400">
                  Submitted on{" "}
                  {new Date(opportunity.submittedAt).toLocaleDateString("en-NG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <p className="mt-6 text-center leading-relaxed text-ink-600">
                We&apos;ll keep you updated on the progress of this opportunity
                via WhatsApp at{" "}
                <span className="font-medium text-ink-900">
                  {opportunity.contributor.whatsapp}
                </span>
                .
              </p>

              <div className="mt-6 rounded border border-green-700/15 bg-green-700/10 p-4 text-center text-sm text-ink-800">
                If this opportunity results in a successful placement, you&apos;ll
                earn a <span className="font-semibold text-green-700">₦20,000</span> reward.
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/submit"
                  className="inline-flex flex-1 items-center justify-center rounded border border-green-700 bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-brand-50"
                >
                  Submit another opportunity
                </Link>
                <Link
                  href="/"
                  className="inline-flex flex-1 items-center justify-center rounded border border-green-800 bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  Return home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
