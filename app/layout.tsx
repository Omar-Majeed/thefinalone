import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { SITE_CONFIG } from "@/constants/site";
import CookiePreferences from "@/components/cookies/CookiePreferences";
import ChatWidget from "@/components/chat/ChatWidget";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  /* ── Title ──────────────────────────────────────────────────────── */
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s — ${SITE_CONFIG.name}`,
  },

  /* ── Core SEO ──────────────────────────────────────────────────── */
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  metadataBase: new URL(SITE_CONFIG.url),

  /* ── Favicon & Icons ───────────────────────────────────────────── */
  icons: {
    icon: [
      { url: SITE_CONFIG.icon, type: "image/png", sizes: "any" },
    ],
    shortcut: SITE_CONFIG.icon,
    apple: [
      { url: SITE_CONFIG.icon, type: "image/png", sizes: "180x180" },
    ],
  },

  /* ── Open Graph ────────────────────────────────────────────────── */
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    images: [
      {
        url: SITE_CONFIG.icon,
        width: 512,
        height: 512,
        alt: `${SITE_CONFIG.name} logo`,
      },
    ],
    locale: "en_US",
  },

  /* ── Twitter / X ───────────────────────────────────────────────── */
  twitter: {
    card: "summary",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.icon],
  },

  /* ── Misc ──────────────────────────────────────────────────────── */
  applicationName: SITE_CONFIG.name,
  appleWebApp: {
    capable: true,
    title: SITE_CONFIG.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: SITE_CONFIG.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar />
        {children}
        <CookiePreferences />
        <ChatWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
