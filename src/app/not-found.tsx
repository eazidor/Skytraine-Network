import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-ink-50 px-5 py-24 text-center">
      <p className="text-6xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-3 text-xl font-bold text-ink-950">Page not found</h1>
      <p className="mt-2 max-w-sm text-ink-600">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-accent-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-accent-400"
      >
        Return home
      </Link>
    </main>
  );
}
