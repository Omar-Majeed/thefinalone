export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Backend & API Development", href: "/services/backend-api-development" },
      { label: "Mobile App Development", href: "/services/mobile-app-development" },
      { label: "SEO", href: "/services/seo" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "AI Services Integration", href: "/services/ai-integration" },
      { label: "Web Scraping", href: "/services/web-scraping" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
];
