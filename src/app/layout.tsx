import type { Metadata } from "next";
import localFont from "next/font/local";
import { SonnerToaster } from "@/components/ui/sonner";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Nextjs Supabase Auth Kit",
  description: "bytaesu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable}`}>
        <main>{children}</main>
        <SonnerToaster />
      </body>
    </html>
  );
}
