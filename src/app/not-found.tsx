import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-brand-50 px-5 py-24 text-center">
      <p className="text-6xl font-extrabold text-green-700">404</p>
      <h1 className="mt-3 text-xl font-bold text-ink-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-ink-600">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded border border-green-800 bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
      >
        Return home
      </Link>
    </main>
  );
}
