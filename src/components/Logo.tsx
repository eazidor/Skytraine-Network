import Link from "next/link";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <rect x="1" y="1" width="38" height="38" rx="9" className="fill-brand-700" />
        <path
          d="M11 27 V17 L15 21 L20 14 L25 21 L29 17 V27 Z"
          className="fill-accent-400"
        />
      </svg>
      <span
        className={`text-lg font-bold leading-tight tracking-tight ${
          dark ? "text-white" : "text-ink-950"
        }`}
      >
        Skytraine
        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-500">
          Alumni Network
        </span>
      </span>
    </Link>
  );
}
