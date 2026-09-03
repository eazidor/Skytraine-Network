import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Skytraine Alumni Network",
    template: "%s | Skytraine Alumni Network",
  },
  description:
    "The Skytraine Alumni Network connects people who have trained with Skytraine. Apply to stay connected and be considered for opportunities, or submit a genuine employment opportunity and earn ₦20,000 for a successful placement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.variable}>
      <body className="flex min-h-[100dvh] flex-col">{children}</body>
    </html>
  );
}
