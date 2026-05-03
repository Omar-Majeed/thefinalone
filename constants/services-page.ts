import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Database,
  Globe,
  Megaphone,
  Palette,
  Search,
  Server,
  Smartphone,
} from "lucide-react";

export type ServiceItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type ProcessItem = {
  title: string;
  description: string;
};

export const SERVICES_PAGE_ITEMS: ServiceItem[] = [
  {
    title: "Web Development",
    description:
      "Custom marketing sites, platforms, and web apps built for performance, security, and long-term scale.",
    href: "/services/web-development",
    icon: Globe,
  },
  {
    title: "Backend & API Development",
    description:
      "Scalable backend systems and secure APIs that support complex workflows, integrations, and future growth.",
    href: "/services/backend-api-development",
    icon: Server,
  },
  {
    title: "Mobile App Development",
    description:
      "Native-feeling mobile products for iOS and Android with stable architecture and a smooth release rhythm.",
    href: "/services/mobile-app-development",
    icon: Smartphone,
  },
  {
    title: "SEO Optimization",
    description:
      "Technical SEO, site structure, and performance improvements that help the right audience find you faster.",
    href: "#service-inquiry",
    icon: Search,
  },
  {
    title: "Digital Marketing",
    description:
      "Campaign strategy, landing pages, and analytics systems designed to turn attention into qualified demand.",
    href: "#service-inquiry",
    icon: Megaphone,
  },
  {
    title: "AI Integration",
    description:
      "Practical AI features, workflow automations, and copilots that reduce manual effort without adding noise.",
    href: "#service-inquiry",
    icon: Bot,
  },
  {
    title: "Web Scraping",
    description:
      "Reliable data collection pipelines that transform public web data into usable business intelligence.",
    href: "#service-inquiry",
    icon: Database,
  },
  {
    title: "UI/UX Design",
    description:
      "Interfaces, design systems, and user journeys that feel polished, intuitive, and ready to convert.",
    href: "#service-inquiry",
    icon: Palette,
  },
];

export const SERVICES_PROCESS: ProcessItem[] = [
  {
    title: "Discover",
    description:
      "We align on your goals, users, constraints, and the fastest path to measurable impact.",
  },
  {
    title: "Design",
    description:
      "We shape the experience, architecture, and delivery plan before the build moves forward.",
  },
  {
    title: "Develop",
    description:
      "We build in focused sprints with attention to quality, performance, and maintainability.",
  },
  {
    title: "Launch",
    description:
      "We deploy with confidence, monitor results, and set the next phase of growth up properly.",
  },
];