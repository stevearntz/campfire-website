import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "media.beehiiv.com" },
      { hostname: "*.beehiiv.com" },
    ],
  },
};

export default nextConfig;
