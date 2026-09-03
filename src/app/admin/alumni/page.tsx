import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AlumniStatusBadge } from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminAlumniPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;

  const validFilters = ["SUBMITTED", "ACTIVE", "EXPIRED", "PLACED", "SUSPENDED"];
  const activeFilter = filter && validFilters.includes(filter) ? filter : undefined;

  const applications = await prisma.alumniApplication.findMany({
    where: activeFilter ? { status: activeFilter as never } : undefined,
    orderBy: { submittedAt: "desc" },
  });

  const counts = await prisma.alumniApplication.groupBy({
    by: ["status"],
    _count: true,
  });
  const countMap: Record<string, number> = {};
  for (const c of counts) countMap[c.status] = c._count;

  const filters = ["SUBMITTED", "ACTIVE", "EXPIRED", "PLACED", "SUSPENDED"] as const;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink-950">Alumni Applications</h1>
        <p className="text-sm text-ink-500">{applications.length} applications</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/alumni"
          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
            !activeFilter
              ? "border-brand-200 bg-brand-50 text-brand-700"
              : "border-ink-200 bg-white text-ink-600 hover:bg-ink-50"
          }`}
        >
          All ({Object.values(countMap).reduce((a, b) => a + b, 0)})
        </Link>
        {filters.map((f) => (
          <Link
            key={f}
            href={`/admin/alumni?filter=${f}`}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              activeFilter === f
                ? "border-brand-200 bg-brand-50 text-brand-700"
                : "border-ink-200 bg-white text-ink-600 hover:bg-ink-50"
            }`}
          >
            {f.charAt(0) + f.slice(1).toLowerCase()} ({countMap[f] ?? 0})
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-ink-100 text-sm">
            <thead className="bg-ink-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Applicant</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Trade</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Location</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Employment status</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Application status</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Support end</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Placement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {applications.map((a) => (
                <tr key={a.id} className="transition hover:bg-ink-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/alumni/${a.applicationId}`}
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      {a.fullName}
                    </Link>
                    <p className="text-xs text-ink-400">{a.applicationId}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{a.trade}</td>
                  <td className="px-4 py-3 text-ink-600">{a.location}</td>
                  <td className="px-4 py-3 text-ink-600">{a.currentEmploymentStatus}</td>
                  <td className="px-4 py-3">
                    <AlumniStatusBadge status={a.status} />
                  </td>
                  <td className="px-4 py-3 text-ink-600">
                    {a.activeSupportEnd
                      ? new Date(a.activeSupportEnd).toLocaleDateString("en-NG")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-ink-600">{a.placementStatus ?? "—"}</td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-ink-400">
                    No Alumni Network applications yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
