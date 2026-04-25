import type { LucideIcon } from "lucide-react";
import { Server, LayoutTemplate, Brain, TrendingUp } from "lucide-react";

export type Service = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    title: "Backend & API Development",
    description:
      "Robust, scalable services and APIs engineered for performance, security, and long-term maintainability.",
    href: "/services/backend",
    icon: Server,
  },
  {
    title: "Web Application Development",
    description:
      "Modern, accessible web apps built with the latest frameworks for speed, polish, and reliability.",
    href: "/services/web-development",
    icon: LayoutTemplate,
  },
  {
    title: "AI Integration & Automation",
    description:
      "Embed intelligent workflows and automations into your product with production-grade AI pipelines.",
    href: "/services/ai-integration",
    icon: Brain,
  },
  {
    title: "SEO & Digital Growth",
    description:
      "Data-driven SEO and growth strategies that turn visibility into measurable, sustained revenue.",
    href: "/services/seo",
    icon: TrendingUp,
  },
];
