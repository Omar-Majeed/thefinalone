/**
 * CountUp
 *
 * Historically this component started at 0 and animated up on scroll. That
 * caused the target number to be absent from the SSR HTML, which meant
 * JS-less crawlers (GPTBot, PerplexityBot, ClaudeBot) and Google's rendered
 * snapshot could cite "0" as the site's stat. The truth in the DOM matters
 * more than the count-up flourish, so this now renders the target number
 * directly. Visual attention comes from typography size and the framer-motion
 * whileInView entrance animations already present on the wrapping cards.
 *
 * Props are kept identical to preserve every call site.
 */

type Props = {
  to: number;
  suffix?: string;
  /** Retained for API compatibility; no longer used. */
  durationMs?: number;
  className?: string;
};

export function CountUp({ to, suffix = "", className }: Props) {
  return (
    <span className={className}>
      {to}
      {suffix}
    </span>
  );
}
