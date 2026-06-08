/**
 * Centralised design tokens + copy for the transactional emails.
 *
 * Keeping these in one place means both templates stay perfectly on-brand and
 * there are no hardcoded hex values scattered across the JSX.
 */
export const EMAIL_BRAND = {
  name: "Axenity",
  tagline: "Building Intelligent Experiences",
  domain: "axenity.com",
  url: "https://axenity.com",
  contactEmail: "info@axenity.com",
  colors: {
    background: "#0B0F19",
    surface: "#111726",
    surfaceMuted: "#0E1320",
    border: "rgba(255,255,255,0.08)",
    borderStrong: "rgba(90,187,74,0.35)",
    accent: "#5ABA4A",
    accentSoft: "rgba(90,187,74,0.12)",
    text: "#E5E7EB",
    textMuted: "#9CA3AF",
    textFaint: "#6B7280",
    heading: "#FFFFFF",
    white: "#FFFFFF",
  },
  fontStack:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
} as const;
