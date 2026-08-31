import Link from "next/link";
import { Logo } from "@/components/Logo";

const process = [
  { title: "Submit an opportunity", desc: "Share the genuine opportunity you've encountered. It takes a couple of minutes." },
  { title: "We verify it", desc: "Our team reviews every submission to confirm it's genuine and legitimate." },
  { title: "We match a suitable graduate", desc: "We connect the opportunity with a skilled Skytraine graduate." },
  { title: "The graduate applies", desc: "The matched graduate applies to the opportunity." },
  { title: "Successful placement", desc: "A successful placement is confirmed." },
  { title: "You receive ₦20,000", desc: "You receive a ₦20,000 reward." },
];

export default function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink-600 sm:flex">
            <a href="#how-it-works" className="transition hover:text-ink-950">How it works</a>
            <a href="#reward" className="transition hover:text-ink-950">Reward</a>
          </nav>
          <Link
            href="/submit"
            className="inline-flex items-center justify-center rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-ink-950 shadow-sm transition hover:bg-accent-400"
          >
            Submit an Opportunity
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-300">
              Skytraine Opportunity Network
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Know about a genuine opportunity for a{" "}
              <span className="text-accent-400">skilled worker?</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
              Submit it to the Skytraine Opportunity Network. If your submitted
              opportunity results in a Skytraine graduate being successfully
              placed, you receive{" "}
              <span className="font-semibold text-white">₦20,000</span>.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center rounded-lg bg-accent-500 px-6 py-3.5 text-base font-semibold text-ink-950 shadow-lg transition hover:bg-accent-400"
              >
                Submit an Opportunity
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink-300">
              No account needed. We&apos;ll keep you updated via WhatsApp.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm font-medium text-ink-200">Your reward</span>
              <span className="inline-flex items-center rounded-full bg-accent-500/15 px-3 py-1 text-xs font-semibold text-accent-300">
                Per successful placement
              </span>
            </div>
            <div className="py-8 text-center">
              <p className="text-6xl font-extrabold tracking-tight text-accent-400">
                ₦20,000
              </p>
              <p className="mt-3 text-ink-200">
                for every successful placement of a Skytraine graduate
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-ink-950/40 p-4 text-sm text-ink-200">
              Clear and simple — if your opportunity leads to a graduate being
              placed, you&apos;re paid ₦20,000.
            </div>
          </div>
        </div>
      </section>

      <section id="reward" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            Get rewarded for sharing opportunities
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            We connect talented, trained Skytraine graduates with legitimate
            employment opportunities. When an opportunity you submit results in
            a graduate being hired - and we confirm the successful placement - you get paid.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
            <p className="text-4xl">🔍</p>
            <h3 className="mt-4 text-lg font-semibold text-ink-950">Every submission is verified</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              We review each opportunity before it&apos;s matched, so you can
              trust the work being done is real.
            </p>
          </div>
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
            <p className="text-4xl">👷</p>
            <h3 className="mt-4 text-lg font-semibold text-ink-950">Real skilled graduates</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              We manually match each opportunity to a suitable Skytraine
              graduate.
            </p>
          </div>
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
            <p className="text-4xl">💰</p>
            <h3 className="mt-4 text-lg font-semibold text-ink-950">Tracked to placement</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              The reward is linked to the original person who submitted the
              opportunity and tracked through to payment.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-ink-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink-600">
            A simple, transparent six-step process from submission to reward.
          </p>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-xl border border-ink-100 bg-white p-6 shadow-sm"
              >
                <span className="absolute -top-3 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold text-ink-950">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="overflow-hidden rounded-2xl bg-brand-700 text-white">
          <div className="flex flex-col items-center gap-6 px-6 py-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Have a genuine opportunity to share?
            </h2>
            <p className="max-w-xl text-brand-100">
              Know about a job opening, vacancy, or hiring need you trust?
              Submit it now and earn ₦20,000 when a Skytraine graduate is
              successfully placed.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center justify-center rounded-lg bg-accent-500 px-6 py-3.5 text-base font-semibold text-ink-950 shadow-lg transition hover:bg-accent-400"
            >
              Submit an Opportunity
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-100 bg-ink-950 py-10 text-ink-300">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm sm:flex-row">
          <Logo dark />
          <p>© {new Date().getFullYear()} Skytraine International Ltd. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
