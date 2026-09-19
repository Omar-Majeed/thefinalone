import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { SITE_CONFIG } from "@/constants/site";
import { FOOTER_CONTACT } from "@/constants/footer";
import CookiePreferences from "@/components/cookies/CookiePreferences";
import ChatWidget from "@/components/chat/ChatWidget";
import { Analytics } from "@vercel/analytics/next";

/**
 * Site-wide JSON-LD. Two @graph nodes:
 *   1. Organization — canonical business identity for search / knowledge panels.
 *      `sameAs` is intentionally empty until real, verified profile URLs exist
 *      (LinkedIn Company page, GitHub org, X handle). Do NOT paste platform
 *      homepages here — Google validates that the linked profile actually
 *      belongs to this org, and fake sameAs entries can hurt more than help.
 *   2. WebSite — the site entity, links back to the Organization by @id.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}${SITE_CONFIG.icon}`,
        width: 1024,
        height: 1024,
      },
      email: FOOTER_CONTACT.email,
      telephone: `+61${FOOTER_CONTACT.phone.replace(/^0/, "")}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Harris Park",
        addressRegion: "NSW",
        addressCountry: "AU",
      },
      description: SITE_CONFIG.description,
      // sameAs: add verified profile URLs here once created:
      //   e.g. ["https://www.linkedin.com/company/axenity",
      //         "https://github.com/axenity",
      //         "https://x.com/axenity"]
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
      inLanguage: "en-AU",
    },
  ],
};

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
  // Handled by app/icon.tsx and app/apple-icon.tsx via Next.js file
  // conventions — they auto-emit the correct <link> tags and generate
  // small, appropriately-sized images. The old approach pointed every icon
  // slot at public/images/logo.png (1.45 MB) which was too heavy.

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
        width: 1024,
        height: 1024,
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={inter.variable}>
        <Navbar />
        {children}
        <CookiePreferences />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
