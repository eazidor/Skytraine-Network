import LoginForm from "@/components/LoginForm";
import { Logo } from "@/components/Logo";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-brand-50 px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mt-8 rounded border border-green-900/10 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold text-green-700">Admin sign in</h1>
          <p className="mt-1 text-sm text-ink-500">
            Sign in to manage the Alumni Network.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-ink-500">
          Skytraine Alumni Network — Admin
        </p>
      </div>
    </div>
  );
}
