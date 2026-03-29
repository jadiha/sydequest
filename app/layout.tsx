import type { Metadata, Viewport } from "next";
import { Special_Elite } from "next/font/google";
import "./globals.css";

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SydeQuest ✦",
  description: "go do things. explore. let your brain expand.",
};

export const viewport: Viewport = {
  themeColor: "#fde8f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`antialiased ${specialElite.variable}`}>{children}</body>
    </html>
  );
}
