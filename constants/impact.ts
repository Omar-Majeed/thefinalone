export type Metric = {
  id: string;
  /** Numeric target to animate to (ignored when `static` is provided). */
  value?: number;
  /** Decimal places to display (default: 0). */
  decimals?: number;
  /** Trailing text appended after the number, e.g. "+", "%", "M+". */
  suffix?: string;
  /** Static text shown instead of a count-up (e.g. "24/7"). */
  static?: string;
  label: string;
};

import { METRICS } from "./metrics";

export const IMPACT_METRICS: Metric[] = [
  { id: "projects", value: METRICS.projectsDelivered, suffix: "+",  label: "Projects Delivered" },
  { id: "uptime",   value: METRICS.systemUptimePct,   decimals: 1, suffix: "%",  label: "System Uptime" },
  { id: "users",    value: METRICS.usersImpactedM,                 suffix: "M+", label: "Users Impacted" },
  { id: "support",  static: "24/7", label: "Support & Monitoring" },
];

export const IMPACT_COPY = {
  eyebrow: "Our Impact",
  heading: "Numbers that speak for themselves",
  subheading: "Delivering measurable results across projects and platforms.",
} as const;
