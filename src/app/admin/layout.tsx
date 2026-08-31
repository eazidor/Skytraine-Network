import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminNav } from "@/components/AdminNav";
import { SignOutButton } from "@/components/SignOutButton";

export const metadata = {
  title: "Admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-ink-50">
      <header className="sticky top-0 z-30 border-b border-ink-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 font-bold text-white">
              S
            </span>
            <div className="leading-tight">
              <p className="font-bold text-ink-950">Skytraine Admin</p>
              <p className="text-xs text-ink-500">Opportunity Network</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {session?.user ? (
              <>
                <span className="hidden text-sm text-ink-600 sm:block">
                  {session.user.name ?? session.user.email}
                </span>
                <SignOutButton />
              </>
            ) : null}
          </div>
        </div>
        <div className="border-t border-ink-100">
          <AdminNav />
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  );
}
