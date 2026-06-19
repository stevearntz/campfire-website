import type { Metadata } from "next";
import ClarityMomentumClient from "./ClarityMomentumClient";

export const metadata: Metadata = {
  title: "Create Clarity and Momentum | Campfire",
  description:
    "Organizations are moving faster than their people can stay aligned. Campfire helps leaders create clarity, align around priorities, and reduce execution drift during periods of change.",
  openGraph: {
    title: "Create Clarity and Momentum | Campfire",
    description:
      "Create clarity and momentum as work speeds up. Campfire helps leaders align around priorities and reduce execution drift.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Campfire — Create clarity and momentum as work speeds up" }],
  },
};

export default function ClarityMomentumPage() {
  return <ClarityMomentumClient />;
}
