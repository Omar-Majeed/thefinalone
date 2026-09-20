/**
 * Canonical metric values used across the site.
 *
 * BEFORE THIS FILE EXISTED, the same claim was stated in three or four
 * different files with three or four different numbers — 50+ vs 120+
 * projects, 2+ vs 8+ years, "48h" vs "24h" vs "one business day" for the
 * response promise. Search engines and buyers compare these; keeping one
 * source of truth prevents the site from contradicting itself.
 *
 * ── HOW TO USE ─────────────────────────────────────────────────────────
 * Import METRICS or the pre-formatted RESPONSE_TIME copy in every file
 * that displays these numbers. Do NOT hard-code the same values elsewhere.
 *
 *   import { METRICS, RESPONSE_TIME } from "@/constants/metrics";
 *   const projects = METRICS.projectsDelivered;   // 120
 *   const copy     = RESPONSE_TIME.prose;         // "one business day"
 *
 * ── HOW TO UPDATE ──────────────────────────────────────────────────────
 * Update the numeric fields here. Every consuming component picks up the
 * new value on next build. Grep for hard-coded duplicates before adding
 * a new metric anywhere else:
 *
 *   grep -rEn '(120|94|8)\s*\+?%?h?' components/ app/ constants/
 */

export const METRICS = {
  /** Total client projects delivered — appears on /about, /contact, /portfolio, home Impact */
  projectsDelivered: 120,

  /** Years the agency has been building — appears on /about and derives 2016 below */
  yearsOfCraft: 8,

  /** Year the agency started (used in "Since 2016" copy) */
  yearsSince: 2016,

  /** Percentage of clients who return for the next project */
  clientRetentionPct: 94,

  /** Lab Lighthouse Performance target — surfaced as an aspiration, not a live measurement */
  lighthousePerfTargetPct: 99.9,

  /** Advertised system uptime for platforms we run — home Impact section */
  systemUptimePct: 99.9,

  /** Users touched by shipped products, in millions — home Impact section */
  usersImpactedM: 1,

  /** Number of core technologies the team ships production code in */
  technologies: 6,

  /** Home TrustSection headline — "Scalable Systems" percentage */
  scalableSystemsPct: 100,

  /** Average first response time in hours (business hours) */
  avgFirstResponseHours: 24,
} as const;

/**
 * Human-readable response-time copy. Use the `prose` form in narrative
 * paragraphs and the `stat` form in metric grids. Both must always describe
 * the same duration as METRICS.avgFirstResponseHours.
 */
export const RESPONSE_TIME = {
  hours: METRICS.avgFirstResponseHours,
  prose: "one business day",
  stat: `${METRICS.avgFirstResponseHours}h`,
} as const;

export type Metrics = typeof METRICS;
