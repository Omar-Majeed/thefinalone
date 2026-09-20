/**
 * Blog metadata — one entry per published post.
 *
 * Post BODY content lives in components/blog/posts/<slug>.tsx as its own
 * React component so we can freely mix headings, callouts, code blocks,
 * and other prose primitives without needing a markdown runtime. Metadata
 * here (title, author, dates, tags, relations) feeds the index page,
 * detail-page hero, sitemap, and Article JSON-LD.
 */

export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** URL of a profile page (LinkedIn / GitHub / owned page). Never invented. */
  profileUrl?: string;
};

export const AUTHORS: Record<string, Author> = {
  "muhammad-omar": {
    id: "muhammad-omar",
    name: "Muhammad Omar",
    role: "Co-Founder & CEO",
    bio: "Co-Founder and CEO of Axenity. Writes about the engineering, product, and hiring decisions behind the builds we ship.",
  },
};

export type BlogTag =
  | "AI"
  | "Backend"
  | "Web Development"
  | "Mobile"
  | "SEO"
  | "Product"
  | "Case Study";

export type BlogPostMeta = {
  slug: string;
  title: string;
  /** One-line teaser used on the index card and meta description. */
  description: string;
  authorId: keyof typeof AUTHORS;
  publishedDate: string; // ISO 8601
  updatedDate?: string;   // ISO 8601 — omit if never edited
  readTimeMinutes: number;
  tags: BlogTag[];
  /** Related service page — used for the "Working on this?" callout at post end. */
  relatedServicePath?: string;
  /** Related portfolio project — deep-links the case study we drew on. */
  relatedProjectSlug?: string;
  /** Path to hero image under /public/blog/. Optional — falls back to OG card. */
  coverImage?: string;
};

/**
 * Posts newest-first. Each entry ships alongside a
 * components/blog/posts/<slug>.tsx body component.
 */
export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "ai-booking-agent-tyre-shop",
    title:
      "We built an AI booking agent for a tyre shop. Here's the architecture, cost, and what almost broke it.",
    description:
      "A production walkthrough of the LLM-backed booking agent we built for Tyre Express — how it ingests requests, checks technician availability, auto-assigns jobs, and the two design decisions that saved us from a very expensive month.",
    authorId: "muhammad-omar",
    publishedDate: "2026-09-22",
    readTimeMinutes: 9,
    tags: ["AI", "Backend", "Case Study"],
    relatedServicePath: "/services/ai-integration",
    relatedProjectSlug: "tyre-express",
  },
  {
    slug: "pwa-vs-native-app-for-restaurants",
    title:
      "PWA vs native app for restaurants: what we chose for Philliez and why.",
    description:
      "Most restaurants don't need an App Store presence — they need a URL you can send by text. Here's the decision framework we used for Philliez and why the answer was a mobile-first Progressive Web App.",
    authorId: "muhammad-omar",
    publishedDate: "2026-09-22",
    readTimeMinutes: 7,
    tags: ["Mobile", "Product", "Case Study"],
    relatedServicePath: "/services/mobile-app-development",
    relatedProjectSlug: "philliez",
  },
];
