"use client";

import { Turnstile } from "@marsidev/react-turnstile";

/**
 * Thin wrapper around the Cloudflare Turnstile widget.
 *
 * Renders nothing (and surfaces a console warning) when the site key is not
 * configured so local builds without Turnstile credentials still compile and
 * run — the server will reject submissions that arrive without a valid token.
 */
export function TurnstileWidget({
  onVerify,
  onExpire,
  className,
}: {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[turnstile] NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set — widget hidden.",
      );
    }
    return null;
  }

  return (
    <div className={className}>
      <Turnstile
        siteKey={siteKey}
        onSuccess={onVerify}
        onExpire={onExpire}
        onError={onExpire}
        options={{ theme: "auto", size: "flexible" }}
      />
    </div>
  );
}
