import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IAM Home Health Care Services LLC - Licensed Home Health Care (RSA-02989)",
  description: "Licensed home health care services (RSA-02989) providing compassionate and personalized care for your loved ones in Maryland.",
  keywords: "home health, healthcare, nursing, elderly care, home care services, RSA license, Maryland home health",
  openGraph: {
    title: "IAM Home Health Care Services LLC - Licensed Home Health Care",
    description: "Licensed home health care services (RSA-02989) providing compassionate and personalized care for your loved ones in Maryland.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}
