/**
 * Best-effort extraction of the originating client IP from a request.
 *
 * Checks the headers set by common proxies/CDNs (Vercel, Cloudflare, generic
 * reverse proxies) in priority order. Falls back to a sentinel so the rate
 * limiter still has a stable bucket even when no IP is available.
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;

  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  const candidates = [
    headers.get("x-real-ip"),
    headers.get("cf-connecting-ip"),
    headers.get("x-vercel-forwarded-for"),
  ];

  for (const value of candidates) {
    if (value && value.trim()) return value.trim();
  }

  return "unknown";
}
