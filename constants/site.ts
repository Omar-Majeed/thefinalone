export const SITE_CONFIG = {
  name: "The Final One",
  description: "Professional software house.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
