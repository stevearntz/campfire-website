import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Campfire — Flexible Leadership Development",
    short_name: "Campfire",
    description:
      "Flexible leadership development designed for modern, growing teams.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#6E3FCC",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
