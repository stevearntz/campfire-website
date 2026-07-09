import type { Metadata } from "next";
import ComparePageClient from "./ComparePageClient";

export const metadata: Metadata = {
  title: "Self vs. Peer · Activating Behaviors",
  robots: { index: false, follow: false },
};

export default function ComparePage() {
  return <ComparePageClient />;
}
