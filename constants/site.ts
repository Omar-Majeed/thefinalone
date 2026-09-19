export const SITE_CONFIG = {
  name: "Axenity",
  tagline: "Building Intelligent Experiences",
  description:
    "Axenity is a premium digital agency delivering modern web development, UI/UX design, AI-powered solutions, automation, SEO, mobile applications, and scalable digital experiences.",
  // Canonicals and discovery files always identify the public site, including
  // in local and preview builds. They must never inherit a localhost URL.
  url: "https://www.axenity.com",
  keywords: [
    "Axenity",
    "web development",
    "UI UX design",
    "AI solutions",
    "SEO services",
    "mobile apps",
    "digital agency",
    "automation",
    "SaaS development",
  ],
  themeColor: "#0B0F19",
  icon: "/images/logo.png",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
