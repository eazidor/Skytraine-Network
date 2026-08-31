import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminGraduatesPage() {
  const graduates = await prisma.graduate.findMany({
    include: {
      _count: {
        select: {
          applications: true,
          placements: true,
        },
      },
    },
    orderBy: { fullName: "asc" },
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-950">Graduates</h1>
          <p className="text-sm text-ink-500">{graduates.length} graduates</p>
        </div>
        <Link
          href="/admin/graduates/new"
          className="rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          Add graduate
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-ink-100 text-sm">
            <thead className="bg-ink-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Trade</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Location</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">WhatsApp</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Applications</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-600">Placements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {graduates.map((g) => (
                <tr key={g.id} className="transition hover:bg-ink-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/graduates/${g.id}`}
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      {g.fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{g.trade}</td>
                  <td className="px-4 py-3 text-ink-600">{g.location ?? "—"}</td>
                  <td className="px-4 py-3 text-ink-600">{g.whatsapp ?? "—"}</td>
                  <td className="px-4 py-3 text-ink-600">{g._count.applications}</td>
                  <td className="px-4 py-3 text-ink-600">{g._count.placements}</td>
                </tr>
              ))}
              {graduates.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-ink-400">
                    No graduates yet. Add your first Skytraine graduate.
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
