import type { LucideIcon } from "lucide-react";
import { Code2, Zap, ShieldCheck } from "lucide-react";

export type Pillar = {
  id: string;
  title: string;
  icon: LucideIcon;
  points: string[];
};

export const WHY_CHOOSE_US_PILLARS: Pillar[] = [
  {
    id: "engineering",
    title: "Engineering Quality",
    icon: Code2,
    points: ["Clean architecture", "Scalable systems", "Maintainable code"],
  },
  {
    id: "speed",
    title: "Speed & Execution",
    icon: Zap,
    points: ["Fast turnaround", "Agile workflow", "Efficient delivery"],
  },
  {
    id: "reliability",
    title: "Reliability",
    icon: ShieldCheck,
    points: ["Stable performance", "Secure systems", "Long-term support"],
  },
];

export const WHY_CHOOSE_US_COPY = {
  eyebrow: "Why Choose Us",
  heading: "Built for performance. Designed for growth.",
  subheading: "We create scalable, reliable, and high-impact digital solutions.",
  paragraphs: [
    "We partner with teams that care about the details — shipping products that look sharp, run fast, and hold up under real-world pressure.",
    "From first sketch to long-term iteration, our focus stays on outcomes: clean systems, quick decisions, and work you can actually rely on.",
  ],
  ctaLabel: "Let's Build Together",
  ctaHref: "#contact",
} as const;
