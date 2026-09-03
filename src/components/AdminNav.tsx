"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/opportunities", label: "Opportunities" },
  { href: "/admin/graduates", label: "Graduates" },
  { href: "/admin/alumni", label: "Alumni" },
  { href: "/admin/rewards", label: "Rewards" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-1.5 sm:px-6">
      {links.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition ${
              active
                ? "bg-brand-50 text-brand-700"
                : "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
