import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Skytraine Opportunity Network",
    template: "%s | Skytraine Opportunity Network",
  },
  description:
    "Submit legitimate employment opportunities and connect skilled Skytraine graduates. ₦20,000 reward for every successful placement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-[100dvh] flex-col">{children}</body>
    </html>
  );
}
