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

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  tags: string[];
  image: string;
  result: string;
  resultValue: string;
  resultLabel: string;
  featured: boolean;
  accentColor: string;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "nexa-commerce",
    title: "NexaCommerce Platform",
    category: "Web Development",
    description:
      "Headless e-commerce handling 50K+ daily transactions with real-time inventory sync and AI-powered product recommendations.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    image: "https://picsum.photos/seed/nexa/1200/750",
    result: "340% increase in conversion rate",
    resultValue: "340%",
    resultLabel: "conversion increase",
    featured: true,
    accentColor: "bg-primary-500",
  },
  {
    id: "medi-track",
    title: "MediTrack AI Assistant",
    category: "Agentic AI",
    description:
      "Autonomous medical scheduling agent reducing patient wait times by 60% using multi-step reasoning and EHR integration.",
    tags: ["LangGraph", "GPT-4", "FastAPI", "React"],
    image: "https://picsum.photos/seed/medi/1200/750",
    result: "60% reduction in wait times",
    resultValue: "60%",
    resultLabel: "wait time reduction",
    featured: false,
    accentColor: "bg-blue-500",
  },
  {
    id: "urban-nest",
    title: "UrbanNest Real Estate App",
    category: "Mobile Apps",
    description:
      "Cross-platform property discovery with AR room visualization and mortgage calculator — 25K+ active users at launch.",
    tags: ["React Native", "ARKit", "Node.js", "MongoDB"],
    image: "https://picsum.photos/seed/urban/1200/750",
    result: "25K+ active users",
    resultValue: "25K+",
    resultLabel: "active users",
    featured: false,
    accentColor: "bg-orange-500",
  },
  {
    id: "greenleaf-seo",
    title: "GreenLeaf SEO Overhaul",
    category: "SEO & Marketing",
    description:
      "Full-spectrum SEO strategy taking a SaaS brand from page 6 to #1 across 40+ high-intent keywords in under 4 months.",
    tags: ["Technical SEO", "Content Strategy", "GA4", "Ahrefs"],
    image: "https://picsum.photos/seed/greenleaf/1200/750",
    result: "#1 ranking on 40+ keywords",
    resultValue: "#1",
    resultLabel: "Google ranking",
    featured: false,
    accentColor: "bg-green-600",
  },
  {
    id: "fin-vault",
    title: "FinVault Dashboard",
    category: "UI/UX Design",
    description:
      "B2B fintech dashboard redesign improving task completion 45% through deep user research, prototyping, and a full design system.",
    tags: ["Figma", "Design System", "User Research", "Accessibility"],
    image: "https://picsum.photos/seed/finvault/1200/750",
    result: "45% better task completion",
    resultValue: "45%",
    resultLabel: "task completion lift",
    featured: false,
    accentColor: "bg-purple-500",
  },
  {
    id: "swift-shop",
    title: "SwiftShop Mobile",
    category: "E-Commerce",
    description:
      "Mobile-first commerce with one-tap checkout, loyalty rewards, and personalized feeds. Rated 4.9★ on App Store within 3 months.",
    tags: ["Flutter", "Firebase", "Shopify API", "ML Kit"],
    image: "https://picsum.photos/seed/swiftshop/1200/750",
    result: "4.9★ App Store rating",
    resultValue: "4.9★",
    resultLabel: "App Store rating",
    featured: false,
    accentColor: "bg-pink-500",
  },
  {
    id: "lex-ai",
    title: "LexAI Legal Agent",
    category: "Agentic AI",
    description:
      "Multi-agent contract review system processing 500+ documents daily with 94% accuracy vs senior associates.",
    tags: ["CrewAI", "Claude API", "Python", "PostgreSQL"],
    image: "https://picsum.photos/seed/lexai/1200/750",
    result: "94% accuracy, 500 docs/day",
    resultValue: "94%",
    resultLabel: "review accuracy",
    featured: false,
    accentColor: "bg-indigo-500",
  },
  {
    id: "pulse-media",
    title: "PulseMedia Growth Campaign",
    category: "SEO & Marketing",
    description:
      "Integrated campaign across paid, organic, and social generating 2.3M impressions and 18% lead conversion in 90 days.",
    tags: ["Meta Ads", "Google Ads", "HubSpot", "Analytics"],
    image: "https://picsum.photos/seed/pulse/1200/750",
    result: "2.3M impressions, 18% CVR",
    resultValue: "2.3M",
    resultLabel: "impressions generated",
    featured: false,
    accentColor: "bg-red-500",
  },
  {
    id: "build-track",
    title: "BuildTrack Pro",
    category: "Web Development",
    description:
      "Construction SaaS with Gantt charts, resource allocation, and contractor portals — adopted by 300+ enterprise clients.",
    tags: ["React", "D3.js", "Django", "AWS"],
    image: "https://picsum.photos/seed/buildtrack/1200/750",
    result: "300+ enterprise clients",
    resultValue: "300+",
    resultLabel: "enterprise clients",
    featured: false,
    accentColor: "bg-yellow-600",
  },
];
