import type { Metadata } from "next";
import EffectiveOrgV2Client from "./EffectiveOrgV2Client";

export const metadata: Metadata = {
  title: "Organizational Effectiveness for the AI Era | Campfire",
  description:
    "Organizations are moving faster than their people can stay aligned. Campfire helps leaders increase clarity, align strategically, and reduce coordination costs so strategy becomes execution.",
  openGraph: {
    title: "Organizational Effectiveness for the AI Era | Campfire",
    description:
      "Turn strategy into coordinated execution. Campfire builds the clarity, alignment, and coordination that growing organizations need.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Campfire — Turn strategy into coordinated execution" }],
  },
};

export default function EffectiveOrgV2Page() {
  return <EffectiveOrgV2Client />;
}
