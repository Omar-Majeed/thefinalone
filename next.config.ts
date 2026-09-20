import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  // Load the Node sanitizer natively so jsdom's worker files are not bundled
  // into the contact route and executed as part of its initialization.
  serverExternalPackages: ["isomorphic-dompurify"],
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /**
   * Permanent redirects for legacy / mis-named routes.
   *
   * Next.js evaluates redirects before routing, so these fire even though the
   * legacy `app/services/ui-ux/page.tsx` file still exists on disk. The file
   * is intentionally kept for now — its unique pricing tiers and "24hr
   * Response / Satisfaction Guaranteed" trust strip are worth porting into
   * `/services/ui-ux-design` before deletion (Phase 3 follow-up).
   *
   * `/services/backend` never existed as a real route — the homepage used to
   * link there in error. Redirecting to the actual page catches stale external
   * links and bookmarks.
   */
  async redirects() {
    return [
      {
        source: "/services/ui-ux",
        destination: "/services/ui-ux-design",
        permanent: true,
      },
      {
        source: "/services/backend",
        destination: "/services/backend-api-development",
        permanent: true,
      },
    ];
  },

  /**
   * Rewrite so /favicon.ico returns the dynamically-generated icon at 200
   * (rather than 404). Modern browsers pick up <link rel="icon"> from HTML,
   * but old bookmark scrapers and some social-preview bots still request
   * /favicon.ico by name.
   */
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icon",
      },
    ];
  },

  /**
   * Security headers applied site-wide.
   *
   *   X-Content-Type-Options: nosniff       stop MIME-sniffing exploits
   *   X-Frame-Options: SAMEORIGIN           block clickjacking iframes
   *   Referrer-Policy                       don't leak full URL cross-origin
   *   Permissions-Policy                    disable APIs we don't use
   *
   * CSP is intentionally omitted here — Vercel Analytics, Cloudflare
   * Turnstile, Google Fonts, and the Next.js runtime all need explicit
   * allow-list entries, so introducing one requires a report-only phase
   * plus a real audit of every third-party asset. Handled separately.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
