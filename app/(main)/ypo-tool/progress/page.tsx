import type { Metadata } from "next";
import ProgressPageClient from "./ProgressPageClient";

export const metadata: Metadata = {
  title: "Your Progress · Activating Behaviors",
  robots: { index: false, follow: false },
};

export default function ProgressPage() {
  return <ProgressPageClient />;
}
