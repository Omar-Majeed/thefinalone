import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";

/**
 * Absolute canonical URL for a given path.
 *
 * Next.js `metadataBase` alone does NOT emit `<link rel="canonical">` — you
 * must set `alternates.canonical` explicitly per page. This helper keeps
 * every page consistent and points them at the production origin.
 *
 * Example:
 *   export const metadata: Metadata = {
 *     title: "Services",
 *     alternates: canonical("/services"),
 *   };
 */
export function canonical(path: string): NonNullable<Metadata["alternates"]> {
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  const normalisedPath =
    !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return {
    canonical: normalisedPath ? `${base}${normalisedPath}` : base,
  };
}
