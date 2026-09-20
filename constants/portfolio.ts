/**
 * Portfolio — six real client projects, all live and shippable.
 *
 * Every entry below is a verifiable production build for a real Australian
 * business (five NSW, one QLD). No fabricated companies, no invented metrics.
 * Categories are multi-tag so a single project can populate more than one
 * capability filter — e.g. Tyre Express is both a Web Development build and
 * an Agentic AI engagement.
 */

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Web Development",
  "Mobile Apps",
  "Agentic AI",
  "SEO & Marketing",
  "UI/UX Design",
  "E-Commerce",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export type PortfolioProject = {
  /** URL slug — becomes /portfolio/<slug>. */
  slug: string;
  /** Real client business name. */
  clientName: string;
  /** How the project is named on the portfolio card. */
  productName: string;
  /** Human-readable industry label. */
  industry: string;
  /** City + state code. */
  location: string;
  /**
   * All categories this project satisfies. First entry is the primary
   * ("headline") category shown on the card. Every entry participates in
   * the /portfolio filter so one project can surface under multiple tabs.
   */
  categories: PortfolioCategory[];
  /** Broad service type — one of the four labels shown on the card. */
  serviceType: "Website" | "Mobile App" | "E-commerce" | "Landing Page";
  /** Year we shipped it. */
  year: string;
  /** One-sentence teaser used on the portfolio grid card. */
  shortDescription: string;
  /** Two-to-three sentence summary used on the detail page hero. */
  longDescription: string;
  /** Three-to-five real, buildable features that shipped. */
  keyFeatures: string[];
  /** Stack we used to ship it. */
  techStack: string[];
  /** Single hero screenshot per project. */
  screenshot: {
    src: string;
    alt: string;
    orientation: "desktop" | "mobile";
  };
  /**
   * Live deployment URL — stored for internal reference and Service schema
   * only. Never rendered as a clickable link to keep visitors on Axenity's
   * portfolio.
   */
  liveUrl: string;
  /** True for the single featured hero card on the portfolio grid. */
  featured: boolean;
  /** Tailwind text-color class used as the project's accent. */
  accent: string;
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: "ammoun-sweets",
    clientName: "Ammoun Sweets",
    productName: "Ammoun Sweets — Bass Hill",
    industry: "Restaurant & Dessert",
    location: "Bass Hill, NSW",
    categories: ["Web Development", "E-Commerce", "UI/UX Design", "SEO & Marketing"],
    serviceType: "E-commerce",
    year: "2025",
    shortDescription:
      "Editorial dessert brand for a Lebanese sweets shop on the Hume Highway, with online ordering and a catering funnel.",
    longDescription:
      "Deep forest-green and warm gold visual identity, arched hero photography, integrated online ordering, catering & events enquiry, and a photography gallery. Built to convert Bass Hill's sweet-tooth traffic into online orders instead of drop-ins alone — while giving the brand the editorial feel of a specialty patisserie, not a takeaway.",
    keyFeatures: [
      "Deep forest-green + gold editorial visual identity",
      "Integrated online ordering with catalogue imagery",
      "Catering & events enquiry funnel with date + guest count",
      "Photography gallery tuned for social + Google Images discovery",
      "Directions + trading-hours block for foot-traffic follow-through",
    ],
    techStack: ["Next.js", "Tailwind CSS"],
    screenshot: {
      src: "/portfolio/ammoun-sweets/cover.webp",
      alt: "Ammoun Sweets — editorial Lebanese dessert brand, hero with arched pistachio pastry photograph",
      orientation: "desktop",
    },
    liveUrl: "https://ammoun-sweets.vercel.app/",
    featured: true,
    accent: "text-emerald-500",
  },
  {
    slug: "tyre-express",
    clientName: "Tyre Express",
    productName: "Tyre Express + AI Booking Agent",
    industry: "Auto Service",
    location: "South Granville, NSW",
    categories: ["Agentic AI", "Web Development", "E-Commerce", "UI/UX Design"],
    serviceType: "Website",
    year: "2025",
    shortDescription:
      "Tyre & wheel-alignment workshop with a search-by-size storefront and an internal AI agent that auto-assigns bookings to free technicians.",
    longDescription:
      "Customer-facing product catalogue with a search-by-tyre-size flow, quote request, sticky CALL CTA, and a real Google-reviews trust strip. Behind the scenes, an AI booking agent ingests every appointment request, checks live technician availability, and auto-assigns the next-free worker — so front-desk staff never manually route bookings and no request goes uncovered.",
    keyFeatures: [
      "Search-by-tyre-size storefront with car → tyre catalogue",
      "AI booking agent — ingests requests, checks technician availability, auto-assigns",
      "Quote request funnel with vehicle detail capture",
      "Sticky CALL CTA persistent across every breakpoint",
      "Live Google reviews strip for local trust",
    ],
    techStack: ["Next.js", "Tailwind CSS", "LLM Agent", "PostgreSQL"],
    screenshot: {
      src: "/portfolio/tyre-express/cover.webp",
      alt: "Tyre Express — South Granville tyre workshop, hero with 'Premium Tyres. Properly Fitted.' headline",
      orientation: "desktop",
    },
    liveUrl: "https://tyreexpress-work.vercel.app/",
    featured: false,
    accent: "text-orange-500",
  },
  {
    slug: "qazi",
    clientName: "Qazi Marriage Celebrant",
    productName: "Qazi Marriage Celebrant",
    industry: "Religious & Legal Services",
    location: "Sydney, NSW",
    categories: ["Web Development", "UI/UX Design", "SEO & Marketing"],
    serviceType: "Website",
    year: "2025",
    shortDescription:
      "Editorial-luxury site for Sydney's authorised Islamic Nikah & legal marriage celebrant.",
    longDescription:
      "Warm serif brand identity, mosque-silhouette hero, and clearly explained services help Google disambiguate the specific 'Islamic Nikah Sydney' intent and route the right couples straight to a booking enquiry. Every content block is written to answer a pre-hire question so browsers don't need to leave.",
    keyFeatures: [
      "Editorial serif typography + warm cream/gold palette",
      "Structured content targeting 'Islamic Nikah Sydney' search intent",
      "Booking enquiry flow with celebrant availability capture",
      "Trust-forward layout surfacing real celebrant credentials",
      "Mobile-optimised for late-night couple browsing",
    ],
    techStack: ["Next.js", "Tailwind CSS"],
    screenshot: {
      src: "/portfolio/qazi/cover.webp",
      alt: "Qazi Marriage Celebrant — Sydney Islamic Nikah celebrant hero with mosque silhouette",
      orientation: "desktop",
    },
    liveUrl: "https://www.qazi.com.au/",
    featured: false,
    accent: "text-amber-500",
  },
  {
    slug: "philliez",
    clientName: "Philliez",
    productName: "Philliez — Mobile-First PWA",
    industry: "Restaurant / American Comfort Food",
    location: "Chester Hill, NSW",
    categories: ["Mobile Apps", "Web Development", "E-Commerce", "UI/UX Design"],
    serviceType: "Mobile App",
    year: "2025",
    shortDescription:
      "Mobile-first Progressive Web App for a Chester Hill cheesesteak spot — app-like ordering, in the browser.",
    longDescription:
      "Dark app-style UI with a persistent bottom-nav bar (Menu / Directions / Order), integrated online ordering, geo-locator for directions, and a personality-forward voice ('Philly sauce is spicy'). Feels like a native ordering app but without the App Store download friction — installable as a PWA and shareable via one link.",
    keyFeatures: [
      "App-like bottom-nav (Menu / Directions / Order) persistent on scroll",
      "Mobile-first dark UI with brand-forward voice",
      "Integrated online ordering with menu categories",
      "Directions + Google-reviews trust strip",
      "Installable as a PWA — no App Store submission needed",
    ],
    techStack: ["Next.js", "Tailwind CSS", "PWA"],
    screenshot: {
      src: "/portfolio/philliez/cover.webp",
      alt: "Philliez — Chester Hill Philly cheesesteak PWA, mobile hero with 'Home of the Philly Cheesesteak' headline",
      orientation: "mobile",
    },
    liveUrl: "https://philliez.vercel.app/",
    featured: false,
    accent: "text-red-500",
  },
  {
    slug: "aladdin-shawarma",
    clientName: "Aladdin Shawarma",
    productName: "Aladdin Shawarma — Blacktown",
    industry: "Restaurant / Quick-Service",
    location: "Blacktown, NSW",
    categories: ["E-Commerce", "Web Development", "Mobile Apps", "UI/UX Design"],
    serviceType: "E-commerce",
    year: "2025",
    shortDescription:
      "Playful, mobile-first ordering site for Blacktown's Middle Eastern kitchen — 'Home of the Magic Carpet.'",
    longDescription:
      "Distinctive dark + gold brand system, a live menu carousel with real prices, integrated ordering, catering funnel, and a pickup/delivery selector. Turns a busy shopfront brand into a mobile-first ordering channel with the same personality customers get in-store.",
    keyFeatures: [
      "'Home of the Magic Carpet' branded card carousel",
      "Live menu carousel showing real per-item prices",
      "Integrated ordering with pickup / delivery selector",
      "Catering enquiry with event date + guest count",
      "Trust strip surfacing Google rating + trading hours",
    ],
    techStack: ["Next.js", "Tailwind CSS"],
    screenshot: {
      src: "/portfolio/aladdin-shawarma/cover.webp",
      alt: "Aladdin Shawarma — Blacktown Middle-Eastern kitchen hero with menu carousel and 'Home of the Magic Carpet' headline",
      orientation: "desktop",
    },
    liveUrl: "https://aladdinshawarma.vercel.app/",
    featured: false,
    accent: "text-amber-400",
  },
  {
    slug: "hohmanns",
    clientName: "Hohmanns Plumbing Services",
    productName: "Hohmanns Plumbing — Rockhampton",
    industry: "Trade Services (Plumbing & Gasfitting)",
    location: "Rockhampton, QLD",
    categories: ["Web Development", "UI/UX Design", "SEO & Marketing"],
    serviceType: "Website",
    year: "2025",
    shortDescription:
      "Direct-call trade website for a Rockhampton plumber & gasfitter — every path leads to a phone call in one click.",
    longDescription:
      "Conversion-focused single-page site with a sticky call CTA in the header, hero + services + enquiry form, real business address embedded, and a mobile-first responsive layout. Built for tradies-on-phones searching for local help who don't want to fill out a long form.",
    keyFeatures: [
      "Sticky (07) call-CTA in the header on every scroll position",
      "Mobile-first responsive layout tuned for one-thumb browsing",
      "Enquiry form with fast reply-by-email routing",
      "Local-SEO metadata for the Rockhampton service area",
      "Real business address embedded for Google Maps discovery",
    ],
    techStack: ["Next.js", "Tailwind CSS"],
    screenshot: {
      src: "/portfolio/hohmanns/cover.webp",
      alt: "Hohmanns Plumbing Services — Rockhampton plumber & gasfitter hero with sticky call CTA",
      orientation: "desktop",
    },
    liveUrl: "https://plumberwork-nine.vercel.app/",
    featured: false,
    accent: "text-teal-500",
  },
];

/**
 * Legacy export names — some existing components import these. Kept as
 * aliases so the migration to PORTFOLIO_PROJECTS can happen incrementally.
 * New code should reference PORTFOLIO_PROJECTS directly.
 */
export const PORTFOLIO_ITEMS = PORTFOLIO_PROJECTS;
export type PortfolioItem = PortfolioProject;
