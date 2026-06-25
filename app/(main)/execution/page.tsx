import type { Metadata } from "next";
import ExecutionCalculatorClient from "./ExecutionCalculatorClient";

export const metadata: Metadata = {
  title: "Execution Calculator | Campfire",
  description:
    "How effectively is your organization executing? Take a 2-minute research-backed diagnostic to find out whether your people are compounding — or canceling each other out.",
  openGraph: {
    title: "Execution Calculator | Campfire",
    description:
      "Find out if your 300 employees execute like 30 — or 3,000. A research-backed diagnostic based on systems theory, coordination theory, and Brooks' Law.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Campfire Execution Calculator" }],
  },
};

export default function ExecutionPage() {
  return <ExecutionCalculatorClient />;
}
