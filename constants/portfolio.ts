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

export type PortfolioMetric = {
  value: string;
  label: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  subtitle: string;
  category: PortfolioCategory;
  year: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
  tech: string[];
  metrics: PortfolioMetric[];
  cover: string;
  gallery: string[];
  accent: string;
  featured: boolean;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "nexa-commerce",
    title: "NexaCommerce",
    subtitle: "Headless commerce platform",
    category: "E-Commerce",
    year: "2025",
    tagline: "A composable storefront engineered for scale.",
    description:
      "An enterprise commerce platform processing fifty-thousand transactions a day with real-time inventory, edge personalization and an AI-powered recommendation layer.",
    challenge:
      "Legacy monolith bottlenecked at peak traffic, with stale inventory and a checkout that lost customers at scale.",
    solution:
      "We rebuilt the storefront on a headless edge architecture with event-driven inventory sync, a unified content layer and an ML personalization engine trained on session intent.",
    outcome:
      "Sub-second page loads worldwide, a redesigned checkout converting at industry-leading rates, and a system that scales linearly on every promotional spike.",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Vercel"],
    metrics: [
      { value: "+340%", label: "Conversion rate" },
      { value: "50K", label: "Daily transactions" },
      { value: "0.8s", label: "Median page load" },
    ],
    cover: "/portfolio/nexa-commerce-cover.jpg",
    gallery: [
      "/portfolio/nexa-commerce-1.jpg",
      "/portfolio/nexa-commerce-2.jpg",
    ],
    accent: "text-primary",
    featured: true,
  },
  {
    id: "medi-track",
    title: "MediTrack",
    subtitle: "Autonomous clinical scheduling agent",
    category: "Agentic AI",
    year: "2025",
    tagline: "An AI agent that runs a clinic's calendar without breaking stride.",
    description:
      "A multi-step reasoning agent that books, reschedules and routes patients across providers, integrated with EHR systems and a soft-voice phone interface.",
    challenge:
      "Front-desk teams were drowning in scheduling, no-shows were over 22%, and provider utilization sat below 60%.",
    solution:
      "We orchestrated a LangGraph agent over GPT-4 with secure EHR tool calls, intent classification, and a fallback escalation path to human staff.",
    outcome:
      "Patient wait times cut by sixty percent and provider utilization above ninety, with a seven-figure annual saving in administrative overhead.",
    tech: ["LangGraph", "GPT-4", "FastAPI", "Twilio", "HIPAA"],
    metrics: [
      { value: "-60%", label: "Patient wait time" },
      { value: "92%", label: "Provider utilization" },
      { value: "24/7", label: "Coverage" },
    ],
    cover: "/portfolio/medi-track-cover.jpg",
    gallery: ["/portfolio/medi-track-1.jpg"],
    accent: "text-primary",
    featured: true,
  },
  {
    id: "fin-vault",
    title: "FinVault",
    subtitle: "B2B fintech command center",
    category: "UI/UX Design",
    year: "2024",
    tagline: "A dashboard that turns financial complexity into clarity.",
    description:
      "A ground-up redesign of a B2B treasury platform — full design system, refined data visualizations, and an information architecture rebuilt around the operator's day.",
    challenge:
      "Operators wrangled six tools to close a single workflow; the original UI hid critical signals behind dense tables.",
    solution:
      "We ran deep contextual research, rebuilt the navigation around task flows, and shipped a tokenized design system with accessible data viz primitives.",
    outcome:
      "Task completion improved forty-five percent, onboarding time halved, and the design system now powers four downstream products.",
    tech: ["Figma", "Design Tokens", "Storybook", "WCAG AA"],
    metrics: [
      { value: "+45%", label: "Task completion" },
      { value: "-52%", label: "Onboarding time" },
      { value: "4", label: "Products powered" },
    ],
    cover: "/portfolio/fin-vault-cover.jpg",
    gallery: ["/portfolio/fin-vault-1.jpg"],
    accent: "text-primary",
    featured: true,
  },
  {
    id: "urban-nest",
    title: "UrbanNest",
    subtitle: "Real estate discovery, reimagined",
    category: "Mobile Apps",
    year: "2024",
    tagline: "An app that turns house-hunting into a cinematic experience.",
    description:
      "A cross-platform property discovery app with augmented-reality room visualization, intelligent search and a mortgage simulator built natively into the flow.",
    challenge:
      "Buyers were toggling between five disconnected apps to evaluate a property, and listings felt static and impersonal.",
    solution:
      "We shipped a React Native app with ARKit-powered room previews, semantic search over listings, and a guided financing module.",
    outcome:
      "Twenty-five thousand active users in the first week of launch and a four-point-eight star rating across both stores.",
    tech: ["React Native", "ARKit", "Node.js", "MongoDB"],
    metrics: [
      { value: "25K+", label: "Active users (wk 1)" },
      { value: "4.8", label: "Store rating" },
      { value: "3.1x", label: "Session depth" },
    ],
    cover: "/portfolio/urban-nest-cover.jpg",
    gallery: ["/portfolio/urban-nest-1.jpg"],
    accent: "text-primary",
    featured: false,
  },
  {
    id: "greenleaf-seo",
    title: "GreenLeaf",
    subtitle: "SEO overhaul for a sustainability SaaS",
    category: "SEO & Marketing",
    year: "2024",
    tagline: "From page six to number one in under four months.",
    description:
      "A full-spectrum technical and editorial SEO program — site architecture, content engine and authority building — for a fast-growing sustainability platform.",
    challenge:
      "Organic visibility stagnated despite consistent publishing; the technical foundation leaked link equity and crawl budget.",
    solution:
      "We rebuilt the information architecture, shipped a structured content engine, and ran a programmatic internal-link and backlink campaign.",
    outcome:
      "Number-one rankings across forty high-intent keywords and a six-fold increase in qualified organic pipeline.",
    tech: ["Technical SEO", "GA4", "Ahrefs", "Schema.org"],
    metrics: [
      { value: "#1", label: "On 40+ keywords" },
      { value: "6x", label: "Organic pipeline" },
      { value: "+212%", label: "Domain rating" },
    ],
    cover: "/portfolio/greenleaf-cover.jpg",
    gallery: ["/portfolio/greenleaf-1.jpg"],
    accent: "text-primary",
    featured: false,
  },
  {
    id: "lex-ai",
    title: "LexAI",
    subtitle: "Multi-agent legal review system",
    category: "Agentic AI",
    year: "2025",
    tagline: "Five hundred contracts a day, reviewed at senior-associate accuracy.",
    description:
      "A crew of cooperating agents that ingest, classify, redline and summarize legal contracts, plugged directly into a firm's document management system.",
    challenge:
      "Junior teams spent eighty percent of their week on low-leverage contract review with inconsistent risk flagging.",
    solution:
      "We orchestrated specialized CrewAI agents — extractor, redliner, risk scorer, summarizer — coordinated by a supervisor with human-in-the-loop checkpoints.",
    outcome:
      "Ninety-four percent accuracy versus senior associates and a ten-fold throughput increase per reviewer.",
    tech: ["CrewAI", "Claude API", "Python", "PostgreSQL"],
    metrics: [
      { value: "94%", label: "Accuracy" },
      { value: "500/day", label: "Documents reviewed" },
      { value: "10x", label: "Throughput" },
    ],
    cover: "/portfolio/lex-ai-cover.jpg",
    gallery: ["/portfolio/lex-ai-1.jpg"],
    accent: "text-primary",
    featured: false,
  },
  {
    id: "swift-shop",
    title: "SwiftShop",
    subtitle: "Mobile-first commerce",
    category: "E-Commerce",
    year: "2024",
    tagline: "One-tap commerce that customers actually love.",
    description:
      "A mobile-native commerce experience with one-tap checkout, loyalty rewards and a personalized feed powered by on-device ML.",
    challenge:
      "Cart abandonment topped seventy percent on mobile and the brand's existing app felt like a webview port.",
    solution:
      "A native Flutter rebuild with a native checkout stack, on-device personalization, and a loyalty layer woven through the journey.",
    outcome:
      "A four-point-nine star rating in three months and a fifty-eight percent lift in mobile revenue per user.",
    tech: ["Flutter", "Firebase", "Shopify API", "ML Kit"],
    metrics: [
      { value: "4.9", label: "App Store" },
      { value: "+58%", label: "Mobile ARPU" },
      { value: "-42%", label: "Abandonment" },
    ],
    cover: "/portfolio/swift-shop-cover.jpg",
    gallery: ["/portfolio/swift-shop-1.jpg"],
    accent: "text-primary",
    featured: false,
  },
  {
    id: "pulse-media",
    title: "PulseMedia",
    subtitle: "Integrated growth campaign",
    category: "SEO & Marketing",
    year: "2024",
    tagline: "A ninety-day campaign that compounded across every channel.",
    description:
      "A coordinated paid, organic and lifecycle campaign that turned a single product launch into a sustained growth engine.",
    challenge:
      "A standout product was struggling to break through in a noisy category and channels were siloed.",
    solution:
      "We aligned messaging across paid, organic and CRM, built a creative testing loop, and routed signals into a unified attribution model.",
    outcome:
      "2.3 million impressions, an eighteen percent qualified lead conversion, and a payback period under two months.",
    tech: ["Meta Ads", "Google Ads", "HubSpot", "GA4"],
    metrics: [
      { value: "2.3M", label: "Impressions" },
      { value: "18%", label: "Lead CVR" },
      { value: "<2mo", label: "Payback" },
    ],
    cover: "/portfolio/pulse-media-cover.jpg",
    gallery: ["/portfolio/pulse-media-1.jpg"],
    accent: "text-primary",
    featured: false,
  },
  {
    id: "build-track",
    title: "BuildTrack",
    subtitle: "Construction SaaS at enterprise scale",
    category: "Web Development",
    year: "2025",
    tagline: "The operating system three hundred contractors run their day on.",
    description:
      "A construction-management platform with Gantt orchestration, resource allocation, subcontractor portals and a real-time field interface.",
    challenge:
      "Field teams were stuck on whiteboards and spreadsheets while the office ran a different stack — coordination broke daily.",
    solution:
      "A unified web and mobile platform with role-tuned interfaces, offline-first field tooling and an analytics layer for executives.",
    outcome:
      "Three hundred enterprise contractors onboarded in year one and a sixty-three percent drop in project overrun.",
    tech: ["React", "D3.js", "Django", "AWS"],
    metrics: [
      { value: "300+", label: "Enterprise clients" },
      { value: "-63%", label: "Project overrun" },
      { value: "99.99%", label: "Uptime" },
    ],
    cover: "/portfolio/build-track-cover.jpg",
    gallery: ["/portfolio/build-track-1.jpg"],
    accent: "text-primary",
    featured: false,
  },
];

export const PORTFOLIO_IMPACT = [
  {
    value: "+312%",
    label: "Average conversion lift",
    detail: "Across launched commerce and SaaS surfaces in the last 18 months.",
  },
  {
    value: "0.9s",
    label: "Median LCP shipped",
    detail: "Edge-rendered, image-optimized, instrumented from day one.",
  },
  {
    value: "10x",
    label: "Operational throughput",
    detail: "Where agentic AI replaced repetitive human routing work.",
  },
  {
    value: "99.99%",
    label: "Production uptime",
    detail: "Across enterprise systems we've built and continue to operate.",
  },
  {
    value: "40+",
    label: "First-page rankings",
    detail: "Earned organically through technical and editorial SEO programs.",
  },
  {
    value: "4.9",
    label: "Average app rating",
    detail: "Across the mobile experiences we've shipped this year.",
  },
];

export const PORTFOLIO_QUOTES = [
  {
    quote:
      "Axenity is the only team we trust with the surfaces our customers actually touch.",
    author: "Maya Okonkwo",
    role: "VP Product, NexaCommerce",
  },
  {
    quote:
      "They shipped a working agent in the time most agencies needed to write a proposal.",
    author: "Daniel Reyes",
    role: "Head of Operations, MediTrack",
  },
  {
    quote:
      "The redesign didn't just look better — it changed how our team works.",
    author: "Priya Shankar",
    role: "Chief Product Officer, FinVault",
  },
];

export const PORTFOLIO_TECH_NODES = [
  { label: "Next.js", x: 18, y: 28 },
  { label: "React", x: 35, y: 14 },
  { label: "TypeScript", x: 56, y: 22 },
  { label: "Node.js", x: 78, y: 16 },
  { label: "Tailwind", x: 88, y: 42 },
  { label: "Framer Motion", x: 72, y: 58 },
  { label: "AI Agents", x: 50, y: 50 },
  { label: "APIs", x: 28, y: 60 },
  { label: "Automation", x: 14, y: 74 },
  { label: "Cloud", x: 40, y: 82 },
  { label: "Databases", x: 66, y: 78 },
];
