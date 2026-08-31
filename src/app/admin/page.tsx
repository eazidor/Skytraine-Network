import { prisma } from "@/lib/prisma";
import Link from "next/link";

type Card = {
  label: string;
  value: number;
  href: string;
  accent?: boolean;
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    newSubmissions,
    underReview,
    verified,
    activeMatches,
    applications,
    placements,
    rewardsPayable,
    rewardsPaid,
    totalOpportunities,
    totalGraduates,
  ] = await Promise.all([
    prisma.opportunity.count({ where: { status: "SUBMITTED" } }),
    prisma.opportunity.count({ where: { status: "UNDER_REVIEW" } }),
    prisma.opportunity.count({ where: { status: "VERIFIED" } }),
    prisma.match.count(),
    prisma.application.count({ where: { status: { not: "WITHDRAWN" } } }),
    prisma.placement.count(),
    prisma.reward.count({ where: { status: "PAYABLE" } }),
    prisma.reward.count({ where: { status: "PAID" } }),
    prisma.opportunity.count(),
    prisma.graduate.count(),
  ]);

  const cards: Card[] = [
    { label: "New submissions", value: newSubmissions, href: "/admin/opportunities?filter=SUBMITTED" },
    { label: "Under review", value: underReview, href: "/admin/opportunities?filter=UNDER_REVIEW" },
    { label: "Verified", value: verified, href: "/admin/opportunities?filter=VERIFIED" },
    { label: "Active matches", value: activeMatches, href: "/admin/opportunities?filter=MATCHED" },
    { label: "Applications", value: applications, href: "/admin/opportunities?filter=APPLICATION_SUBMITTED" },
    { label: "Placements", value: placements, href: "/admin/opportunities?filter=PLACEMENT_CONFIRMED" },
    { label: "Rewards payable", value: rewardsPayable, href: "/admin/rewards?filter=PAYABLE", accent: true },
    { label: "Rewards paid", value: rewardsPaid, href: "/admin/rewards?filter=PAID" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink-950">Dashboard</h1>
        <p className="text-sm text-ink-500">
          {totalOpportunities} opportunities · {totalGraduates} graduates
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`rounded-2xl border p-5 shadow-sm transition hover:shadow ${
              card.accent ? "border-accent-300 bg-accent-50" : "border-ink-100 bg-white"
            }`}
          >
            <p
              className={`text-3xl font-extrabold ${
                card.accent ? "text-accent-600" : "text-brand-700"
              }`}
            >
              {card.value}
            </p>
            <p className="mt-1 text-sm font-medium text-ink-600">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          href="/admin/opportunities"
          className="rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          View all opportunities
        </Link>
        <Link
          href="/admin/graduates"
          className="rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-800 transition hover:bg-ink-100"
        >
          Manage graduates
        </Link>
      </div>
    </div>
  );
}
