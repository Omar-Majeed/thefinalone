export type PortfolioItem = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  result: string;
};

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

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    title: "NexaCommerce Platform",
    category: "Web Development",
    description:
      "A headless e-commerce solution handling 50K+ daily transactions with real-time inventory sync and AI-powered recommendations.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    image: "https://picsum.photos/seed/nexa/800/500",
    result: "340% increase in conversion rate",
  },
  {
    title: "MediTrack AI Assistant",
    category: "Agentic AI",
    description:
      "Autonomous medical scheduling agent that reduced patient wait times by 60% using multi-step reasoning and EHR integration.",
    tags: ["LangGraph", "GPT-4", "FastAPI", "React"],
    image: "https://picsum.photos/seed/medi/800/500",
    result: "60% reduction in wait times",
  },
  {
    title: "UrbanNest Real Estate App",
    category: "Mobile Apps",
    description:
      "Cross-platform property discovery app with AR room visualization and mortgage calculator serving 25K+ active users.",
    tags: ["React Native", "ARKit", "Node.js", "MongoDB"],
    image: "https://picsum.photos/seed/urban/800/500",
    result: "25K+ active users",
  },
  {
    title: "GreenLeaf SEO Overhaul",
    category: "SEO & Marketing",
    description:
      "Full-spectrum SEO strategy that took an organic SaaS brand from page 6 to position #1 across 40+ high-intent keywords in 4 months.",
    tags: ["Technical SEO", "Content Strategy", "GA4", "Ahrefs"],
    image: "https://picsum.photos/seed/greenleaf/800/500",
    result: "#1 ranking on 40+ keywords",
  },
  {
    title: "FinVault Dashboard",
    category: "UI/UX Design",
    description:
      "B2B fintech dashboard redesign improving task completion rate by 45% through user research, prototyping, and design system creation.",
    tags: ["Figma", "Design System", "User Research", "Accessibility"],
    image: "https://picsum.photos/seed/finvault/800/500",
    result: "45% better task completion",
  },
  {
    title: "SwiftShop Mobile",
    category: "E-Commerce",
    description:
      "Mobile-first e-commerce experience with one-tap checkout, loyalty rewards, and personalized feeds — 4.9★ on App Store.",
    tags: ["Flutter", "Firebase", "Shopify API", "ML Kit"],
    image: "https://picsum.photos/seed/swiftshop/800/500",
    result: "4.9★ App Store rating",
  },
  {
    title: "LexAI Legal Agent",
    category: "Agentic AI",
    description:
      "Multi-agent system for contract review and risk flagging, processing 500+ documents daily with 94% accuracy vs senior associates.",
    tags: ["CrewAI", "Claude API", "Python", "PostgreSQL"],
    image: "https://picsum.photos/seed/lexai/800/500",
    result: "94% accuracy, 500 docs/day",
  },
  {
    title: "PulseMedia Growth Campaign",
    category: "SEO & Marketing",
    description:
      "Integrated digital campaign across paid, organic, and social channels generating 2.3M impressions and 18% lead conversion.",
    tags: ["Meta Ads", "Google Ads", "HubSpot", "Analytics"],
    image: "https://picsum.photos/seed/pulse/800/500",
    result: "2.3M impressions, 18% CVR",
  },
  {
    title: "BuildTrack Pro",
    category: "Web Development",
    description:
      "Construction project management SaaS with Gantt charts, resource allocation, and contractor portals serving 300+ enterprise clients.",
    tags: ["React", "D3.js", "Django", "AWS"],
    image: "https://picsum.photos/seed/buildtrack/800/500",
    result: "300+ enterprise clients",
  },
];
