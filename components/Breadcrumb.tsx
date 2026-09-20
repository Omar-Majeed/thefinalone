import { SITE_CONFIG } from "@/constants/site";

/**
 * BreadcrumbList JSON-LD only — no visible nav.
 *
 * Google uses the structured data to render breadcrumb rich results in the
 * SERP even when the page itself doesn't show a visible breadcrumb trail.
 * The visible strip was deliberately dropped to keep the site's clean
 * hero-forward layout intact; the SEO benefit stays.
 *
 * ── Usage (unchanged) ──────────────────────────────────────────────────
 *   <Breadcrumb path="/services/backend-api-development" />
 *
 * ── If you ever want the visible trail back ────────────────────────────
 * See the git history of this file — commit b8190f0 added the light-
 * themed <nav aria-label="Breadcrumb"> element. Re-instate it here and
 * every consuming page picks it up automatically.
 */

const ROUTE_LABELS: Record<string, string> = {
  "": "Home",
  about: "About",
  contact: "Contact",
  portfolio: "Portfolio",
  services: "Services",
  "services/web-development": "Web Development",
  "services/backend-api-development": "Backend & API Development",
  "services/mobile-app-development": "Mobile App Development",
  "services/ui-ux-design": "UI/UX Design",
  "services/ai-integration": "AI Integration",
  "services/digital-marketing": "Digital Marketing",
  "services/seo": "SEO",
  "services/web-scraping": "Web Scraping",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  blog: "Blog",
  // Portfolio detail slugs → friendly names.
  "portfolio/ammoun-sweets": "Ammoun Sweets",
  "portfolio/tyre-express": "Tyre Express",
  "portfolio/qazi": "Qazi Marriage Celebrant",
  "portfolio/philliez": "Philliez",
  "portfolio/aladdin-shawarma": "Aladdin Shawarma",
  "portfolio/hohmanns": "Hohmanns Plumbing Services",
  // Blog post slugs → short human-readable labels.
  "blog/ai-booking-agent-tyre-shop": "AI booking agent for a tyre shop",
  "blog/pwa-vs-native-app-for-restaurants":
    "PWA vs native app for restaurants",
};

interface Crumb {
  label: string;
  href: string;
}

function buildTrail(path: string): Crumb[] {
  const normalised = path.replace(/^\/+|\/+$/g, "");
  if (!normalised) return [{ label: "Home", href: "/" }];

  const segments = normalised.split("/");
  const trail: Crumb[] = [{ label: "Home", href: "/" }];

  for (let i = 0; i < segments.length; i++) {
    const partial = segments.slice(0, i + 1).join("/");
    const label =
      ROUTE_LABELS[partial] ??
      segments[i]
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");
    trail.push({ label, href: `/${partial}` });
  }

  return trail;
}

function trailToJsonLd(trail: Crumb[]) {
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: crumb.href === "/" ? base : `${base}${crumb.href}`,
    })),
  };
}

export function Breadcrumb({ path }: { path: string }) {
  const trail = buildTrail(path);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(trailToJsonLd(trail)) }}
    />
  );
}
