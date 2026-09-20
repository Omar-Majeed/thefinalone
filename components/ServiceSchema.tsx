import { SITE_CONFIG } from "@/constants/site";

/**
 * Emits Service JSON-LD on a service detail page.
 *
 * Complements the site-wide Organization + WebSite graph in app/layout.tsx.
 * Google uses this to disambiguate what a page is *about* (a service Axenity
 * provides) rather than treating it as generic marketing copy.
 *
 * ── Usage ──────────────────────────────────────────────────────────────
 *   <ServiceSchema
 *     name="Web Development"
 *     serviceType="Web Development"
 *     description="Build fast, scalable, and modern web applications..."
 *     path="/services/web-development"
 *   />
 *
 * The `name` is what shows up in a knowledge panel or a rich result. The
 * `serviceType` is the schema.org classification token — usually the same
 * string. `areaServed` is fixed to Australia since the business claims
 * Harris Park, NSW as its location; update if the market widens.
 */

interface ServiceSchemaProps {
  name: string;
  serviceType?: string;
  description: string;
  path: string;
}

export function ServiceSchema({
  name,
  serviceType,
  description,
  path,
}: ServiceSchemaProps) {
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  const normalisedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${base}${normalisedPath}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType: serviceType ?? name,
    description,
    url,
    provider: { "@id": `${base}/#organization` },
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    // The service is offered to businesses. audienceType helps Google
    // classify commercial intent (B2B services vs consumer offerings).
    audience: {
      "@type": "BusinessAudience",
      audienceType: "SMBs and product teams",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
