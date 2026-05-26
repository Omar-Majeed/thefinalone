import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    icons: [
      {
        src: SITE_CONFIG.icon,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: SITE_CONFIG.icon,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    start_url: "/",
    display: "standalone",
    background_color: SITE_CONFIG.themeColor,
    theme_color: SITE_CONFIG.themeColor,
  };
}
