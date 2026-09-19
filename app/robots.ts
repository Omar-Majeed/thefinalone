import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";

/**
 * Serves /robots.txt at build time using the public site's canonical origin.
 *
 * We do not name-list AI crawlers here — the default `Allow: /` is the
 * broadest allow and covers GPTBot / ClaudeBot / PerplexityBot / Applebot-
 * Extended. Add an explicit `Disallow` block only when you want to opt one out.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep Next.js scripts, styles, and optimized images crawlable.
        disallow: ["/api/", "/private/"],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url.replace(/^https?:\/\//, ""),
  };
}
