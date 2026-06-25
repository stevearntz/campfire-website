import type { Metadata } from "next";
import ModelContent from "./_components/ModelContent";

const OG_DESC =
  "Why more capacity is making organizations less effective — a Campfire point of view on execution, alignment, and the AI era.";

export const metadata: Metadata = {
  title: "The Model",
  description: OG_DESC,
  openGraph: {
    type: "website",
    siteName: "Campfire",
    title: "Effectiveness in the AI Era",
    description: OG_DESC,
    images: [{ url: "/og-model.png", width: 1200, height: 630, alt: "The Anatomy of Team Effectiveness — a model for effectiveness in the AI era" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Effectiveness in the AI Era",
    description: OG_DESC,
    images: ["/og-model.png"],
  },
};

export default function TheModelPage() {
  return <ModelContent />;
}
