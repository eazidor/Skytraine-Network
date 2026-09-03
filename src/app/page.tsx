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
      <header className="sticky top-0 z-30 border-b border-green-900/10 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-green-700 sm:flex">
            <a href="#how-it-works" className="transition hover:text-green-900">How it works</a>
            <a href="#reward" className="transition hover:text-green-900">Reward</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-green-900/10 bg-brand-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center rounded border border-green-800/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-700">
              Skytraine Alumni Network
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-black sm:text-5xl lg:text-6xl">
              Stay Connected Beyond Your{" "}
              <span className="text-green-700">Training</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">
              The Skytraine Alumni Network connects people who have trained with
              Skytraine, helping graduates stay connected with Skytraine, fellow
              alumni, and opportunities beyond the classroom.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center text-3xl font-bold tracking-tight text-green-700 sm:text-4xl">
            What can you do?
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded border border-green-700/20 bg-white shadow-sm">
              <div className="border-b border-green-700/10 bg-green-700/5 px-6 py-4">
                <h3 className="text-lg font-bold text-green-700">Apply to the Alumni Network</h3>
              </div>
              <div className="px-6 py-6">
                <p className="text-lg font-semibold text-ink-900">Looking for work?</p>
                <p className="mt-2 text-ink-700 leading-relaxed">
                  Apply to the Skytraine Alumni Network to be considered for
                  relevant employment opportunities.
                </p>
                <p className="mt-3 text-sm text-ink-500">
                  There is no application fee. The Alumni Network is a benefit
                  of training with Skytraine.
                </p>
                <Link
                  href="/apply"
                  className="mt-6 inline-flex items-center justify-center rounded border border-green-800 bg-green-700 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-800"
                >
                  Apply to the Alumni Network
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded border border-green-700/20 bg-white shadow-sm">
              <div className="border-b border-green-700/10 bg-green-700/5 px-6 py-4">
                <h3 className="text-lg font-bold text-green-700">Submit an Opportunity</h3>
              </div>
              <div className="px-6 py-6">
                <p className="text-lg font-semibold text-ink-900">Know about a genuine opportunity for a skilled worker?</p>
                <p className="mt-2 text-ink-700 leading-relaxed">
                  Submit it to the Skytraine Alumni Network. If your submitted
                  opportunity results in a Skytraine graduate being successfully
                  placed, you receive{" "}
                  <span className="font-bold text-green-700">₦20,000</span>.
                </p>
                <p className="mt-3 text-sm text-ink-500">
                  No account needed. We&apos;ll keep you updated via WhatsApp.
                </p>
                <Link
                  href="/submit"
                  className="mt-6 inline-flex items-center justify-center rounded border border-green-800 bg-green-700 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-800"
                >
                  Submit an Opportunity
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reward" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-green-700 sm:text-4xl">
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

      <section id="how-it-works" className="bg-brand-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center text-3xl font-bold tracking-tight text-green-700 sm:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink-600">
            The Alumni Network connects Skytraine graduates with genuine opportunities. Here is the process from submission to reward.
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

      <footer className="border-t border-ink-800 bg-ink-950 py-10 text-ink-300">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm sm:flex-row">
          <Logo dark />
          <p>© {new Date().getFullYear()} Skytraine International Ltd. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
