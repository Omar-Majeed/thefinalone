import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Sliding-window limiter: 5 submissions per IP per hour.
 *
 * The limiter is created lazily and only when both Upstash environment
 * variables are present. In environments where Redis is not configured (e.g.
 * local development) {@link checkRateLimit} fails open so the form stays
 * usable, while production deployments with credentials enforce the limit.
 */
let limiter: Ratelimit | null = null;
let initialized = false;

function getLimiter(): Ratelimit | null {
  if (initialized) return limiter;
  initialized = true;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn(
      "[ratelimit] Upstash not configured — rate limiting is disabled.",
    );
    return null;
  }

  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    analytics: true,
    prefix: "axenity:contact",
  });

  return limiter;
}

export interface RateLimitResult {
  success: boolean;
  /** Seconds until the limit resets, when known. */
  retryAfterSeconds?: number;
}

/**
 * Check whether the given identifier (typically the client IP) is within the
 * allowed request budget. Fails open if Upstash is unavailable.
 */
export async function checkRateLimit(
  identifier: string,
): Promise<RateLimitResult> {
  const rl = getLimiter();
  if (!rl) return { success: true };

  try {
    const { success, reset } = await rl.limit(identifier);
    if (success) return { success: true };

    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((reset - Date.now()) / 1000),
    );
    return { success: false, retryAfterSeconds };
  } catch (error) {
    // Never block a genuine user because the limiter backend hiccuped.
    console.error("[ratelimit] Limiter error — failing open:", error);
    return { success: true };
  }
}
