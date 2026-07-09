import type { Metadata } from "next";
import ResultsPageClient from "./ResultsPageClient";

export const metadata: Metadata = {
  title: "Your Results · Activating Behaviors",
  robots: { index: false, follow: false },
};

export default function ResultsPage() {
  return <ResultsPageClient />;
}
