import { ImageResponse } from "next/og";

/**
 * Dynamically-generated favicon.
 *
 * Next.js serves this at `/icon-<hash>` and automatically emits a matching
 * `<link rel="icon">` tag. The next.config.ts rewrite makes /favicon.ico
 * return this content too, so old bookmark scrapers and social-preview bots
 * that request /favicon.ico by name get a 200 with a real image.
 *
 * The existing `public/images/logo.png` is 1.45 MB — far too heavy to serve
 * as a favicon. Once a properly-sized PNG (< 100 KB) exists, replace this
 * generated icon with the static asset.
 */
export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 44,
          background: "#0B0F19",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#5ABB4A",
          fontWeight: 800,
          letterSpacing: -2,
          borderRadius: 12,
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
