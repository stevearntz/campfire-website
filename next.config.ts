import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "media.beehiiv.com" },
      { hostname: "*.beehiiv.com" },
      { hostname: "beehiiv-images-production.s3.amazonaws.com" },
    ],
  },
};

export default nextConfig;
