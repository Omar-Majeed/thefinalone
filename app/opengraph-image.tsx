import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/constants/site";

/**
 * Dynamically-generated Open Graph card.
 *
 * Next.js serves this at `/opengraph-image-<hash>.png` and automatically
 * emits `<meta property="og:image">` for every route that doesn't override
 * it. 1200×630 is the aspect ratio Facebook, LinkedIn, Slack, WhatsApp,
 * iMessage, and X (as `summary_large_image`) all render prominently.
 *
 * Replace with a designed static PNG at `public/og/default.png` (or a
 * `app/opengraph-image.png` static asset) once the brand card is finalised.
 */
export const runtime = "edge";
export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(90,187,74,0.18), transparent 65%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(90,187,74,0.08), transparent 60%), #0B0F19",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        {/* Top row — brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#0B0F19",
              border: "2px solid #5ABB4A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5ABB4A",
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            A
          </div>
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "white",
              letterSpacing: -1,
            }}
          >
            {SITE_CONFIG.name}
          </span>
        </div>

        {/* Middle — main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#5ABB4A",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Digital Agency
          </span>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            {SITE_CONFIG.tagline}
          </div>
        </div>

        {/* Bottom row — url + capabilities strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.55)",
              fontWeight: 500,
            }}
          >
            {SITE_CONFIG.url.replace(/^https?:\/\//, "")}
          </span>
          <span
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.4)",
              fontWeight: 500,
            }}
          >
            Web · Mobile · AI · SEO
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
