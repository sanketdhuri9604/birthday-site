import type { Metadata, Viewport } from "next";
import "./globals.css";
import { birthdayData } from "@/data/birthdayData";

export const metadata: Metadata = {
  title: birthdayData.siteTitle,
  description: birthdayData.tagline,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0c1b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}