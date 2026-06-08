const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

/**
 * Verify a Cloudflare Turnstile token server-side.
 *
 * Returns `true` only when Cloudflare confirms the token is valid. Any network
 * error, missing secret, or rejection resolves to `false` so the caller can
 * safely treat the request as unverified.
 *
 * @param token  The token produced by the client-side widget.
 * @param remoteIp  The visitor IP, used by Cloudflare for additional scoring.
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[turnstile] TURNSTILE_SECRET_KEY is not configured.");
    return false;
  }

  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", token);
  if (remoteIp) body.append("remoteip", remoteIp);

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[turnstile] Verification request failed:", res.status);
      return false;
    }

    const data = (await res.json()) as TurnstileVerifyResponse;
    if (!data.success) {
      console.warn("[turnstile] Token rejected:", data["error-codes"]);
    }
    return data.success === true;
  } catch (error) {
    console.error("[turnstile] Verification threw:", error);
    return false;
  }
}
