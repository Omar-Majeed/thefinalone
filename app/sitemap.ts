import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";

/**
 * Sitemap contains 13 real routes.
 *   - /services/ui-ux is intentionally excluded (it is 308 redirected to
 *     /services/ui-ux-design via next.config.ts).
 *   - /services/backend is intentionally excluded (it never existed as a real
 *     page; also 308 redirected to /services/backend-api-development).
 *
 * Only published pages belong here. Omit lastModified until actual content
 * revision dates are available; a new build does not mean every page changed.
 */
const ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "about", changeFrequency: "monthly", priority: 0.7 },
  { path: "services", changeFrequency: "monthly", priority: 0.9 },
  { path: "services/web-development", changeFrequency: "monthly", priority: 0.8 },
  { path: "services/backend-api-development", changeFrequency: "monthly", priority: 0.8 },
  { path: "services/mobile-app-development", changeFrequency: "monthly", priority: 0.8 },
  { path: "services/ui-ux-design", changeFrequency: "monthly", priority: 0.8 },
  { path: "services/ai-integration", changeFrequency: "monthly", priority: 0.8 },
  { path: "services/digital-marketing", changeFrequency: "monthly", priority: 0.8 },
  { path: "services/seo", changeFrequency: "monthly", priority: 0.8 },
  { path: "services/web-scraping", changeFrequency: "monthly", priority: 0.8 },
  { path: "portfolio", changeFrequency: "weekly", priority: 0.7 },
  { path: "contact", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url.replace(/\/$/, "");

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: path ? `${base}/${path}` : base,
    changeFrequency,
    priority,
  }));
}
