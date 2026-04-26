export type CaseStudyMetric = {
  trend?: "up" | "down" | "neutral";
  /** e.g. "37%", "2x", "1M+" */
  value: string;
  /** e.g. "transaction failures" */
  label: string;
};

export type CaseStudyTestimonial = {
  logo: string;
  industry: string;
  techStack: string[];
  quote: string;
  clientName: string;
  clientRole: string;
  metrics: CaseStudyMetric[];
};

export const CASE_STUDY_TESTIMONIALS: CaseStudyTestimonial[] = [
  {
    logo: "Northbridge Capital",
    industry: "Fintech · Payments",
    techStack: ["Java", "Spring Boot", "Kafka", "Redis", "PostgreSQL"],
    quote:
      "They re-architected our settlement engine end to end. What used to be a fragile nightly batch is now a real-time pipeline our team actually trusts.",
    clientName: "Daniel Whitfield",
    clientRole: "CTO",
    metrics: [
      { trend: "down", value: "37%", label: "transaction failures" },
      { trend: "up", value: "2x", label: "API performance" },
      { trend: "neutral", value: "1M+", label: "transactions per day" },
    ],
  },
  {
    logo: "Helix Health",
    industry: "Healthcare · SaaS",
    techStack: ["Next.js", "Node.js", "AWS", "PostgreSQL"],
    quote:
      "We needed enterprise reliability without an enterprise team. They delivered a HIPAA-ready platform that scales cleanly and is genuinely easy to maintain.",
    clientName: "Priya Natarajan",
    clientRole: "VP Engineering",
    metrics: [
      { trend: "down", value: "62%", label: "page load time" },
      { trend: "up", value: "4.8/5", label: "clinician NPS" },
      { trend: "neutral", value: "99.99%", label: "uptime SLA" },
    ],
  },
  {
    logo: "Atlas Commerce",
    industry: "E-commerce · Platform",
    techStack: ["Next.js", "TypeScript", "Stripe", "Vercel"],
    quote:
      "Pragmatic, senior, and obsessed with clarity. They shipped a checkout rebuild in six weeks that lifted conversion meaningfully on the very first deploy.",
    clientName: "Marcus Reyes",
    clientRole: "Head of Product",
    metrics: [
      { trend: "up", value: "38%", label: "checkout conversion" },
      { trend: "down", value: "$9k/mo", label: "infrastructure cost" },
      { trend: "up", value: "98+", label: "Lighthouse score" },
    ],
  },
];
