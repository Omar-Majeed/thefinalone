import Link from "next/link";
import { SITE_CONFIG } from "@/constants/site";

/**
 * Breadcrumb trail + matching BreadcrumbList JSON-LD.
 *
 * Emits both the visible navigation aid and the Schema.org structured data
 * Google uses to render breadcrumb rich results. Both are derived from the
 * same `path` prop so they cannot drift apart.
 *
 * Usage on any non-home page:
 *   <Breadcrumb path="/services/backend-api-development" />
 *
 * Add new routes to ROUTE_LABELS below so their trail label is human-
 * readable (rather than kebab-cased from the URL).
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
  const lastIndex = trail.length - 1;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trailToJsonLd(trail)) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="border-b border-white/5 bg-background/95 backdrop-blur-sm"
      >
        <ol className="container flex flex-wrap items-center gap-x-2 gap-y-1 px-6 py-3 text-xs text-white/50 sm:text-sm">
          {trail.map((crumb, i) => {
            const isLast = i === lastIndex;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="font-medium text-white/80">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-primary"
                  >
                    {crumb.label}
                  </Link>
                )}
                {!isLast && (
                  <span aria-hidden className="text-white/25">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
