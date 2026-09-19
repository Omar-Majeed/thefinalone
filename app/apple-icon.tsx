import { ImageResponse } from "next/og";

/**
 * Dynamically-generated apple-touch-icon.
 *
 * Next.js serves this at `/apple-icon-<hash>` and emits the matching
 * `<link rel="apple-touch-icon">` tag for iOS home-screen use. Replace with a
 * static asset (public/apple-touch-icon.png at 180x180) once a proper icon
 * asset exists.
 */
export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: "#0B0F19",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#5ABB4A",
          fontWeight: 800,
          letterSpacing: -4,
          borderRadius: 32,
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
