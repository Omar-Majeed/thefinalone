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

export const IMPACT_METRICS: Metric[] = [
  { id: "projects", value: 50, suffix: "+", label: "Projects Delivered" },
  { id: "uptime", value: 99.9, decimals: 1, suffix: "%", label: "System Uptime" },
  { id: "users", value: 1, suffix: "M+", label: "Users Impacted" },
  { id: "support", static: "24/7", label: "Support & Monitoring" },
];

export const IMPACT_COPY = {
  eyebrow: "Our Impact",
  heading: "Numbers that speak for themselves",
  subheading: "Delivering measurable results across projects and platforms.",
} as const;
