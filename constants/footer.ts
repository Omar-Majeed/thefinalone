export type FooterLink = { label: string; href: string };

export const FOOTER_NAV: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
];

export const FOOTER_SERVICES: FooterLink[] = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile Apps", href: "/services/mobile-app-development" },
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "AI Integration", href: "/services/ai-integration" },
  { label: "SEO / Marketing", href: "/services/seo" },
];

export const FOOTER_CONTACT = {
  email: "contact@axenity.com",
  phone: "+1 (555) 010-2026",
  location: "Remote · Worldwide",
} as const;

export const FOOTER_SOCIALS: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "X", href: "https://x.com" },
];

export const FOOTER_LEGAL: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export const FOOTER_COPY = {
  tagline: "Building scalable digital solutions for modern businesses.",
} as const;
