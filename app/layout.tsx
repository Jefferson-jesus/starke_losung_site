import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/site.config";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });
const isProduction = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.defaultUrl),
  title: {
    default: "STARKE LOSUNG",
    template: "%s"
  },
  description: "Premium websites and digital growth agency.",
  openGraph: {
    title: "STARKE LOSUNG",
    description: "Premium websites and digital growth agency.",
    siteName: "STARKE LOSUNG",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "STARKE LOSUNG",
    description: "Premium websites and digital growth agency."
  },
  robots: isProduction
    ? {
        index: true,
        follow: true
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
          "max-snippet": -1,
          "max-image-preview": "none",
          "max-video-preview": -1
        }
      }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}