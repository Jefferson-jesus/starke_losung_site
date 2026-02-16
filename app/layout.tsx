import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { siteConfig } from "@/site.config";
import { SITE_MODE_COOKIE, resolveSiteMode } from "@/lib/site-mode";

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

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const initialMode = resolveSiteMode(cookieStore.get(SITE_MODE_COOKIE)?.value) || siteConfig.mode.default;

  return (
    <html lang="en" suppressHydrationWarning data-mode={initialMode}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}