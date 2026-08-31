import LoginForm from "@/components/LoginForm";
import { Logo } from "@/components/Logo";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-ink-950 px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Logo dark />
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white p-6 shadow-2xl">
          <h1 className="text-xl font-bold text-ink-950">Admin sign in</h1>
          <p className="mt-1 text-sm text-ink-500">
            Sign in to manage the Opportunity Network.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-ink-400">
          Skytraine Opportunity Network — Admin
        </p>
      </div>
    </div>
  );
}
