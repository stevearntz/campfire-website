import type { Metadata } from "next";
import AssessmentPageClient from "./AssessmentPageClient";

export const metadata: Metadata = {
  title: "Self-Assessment · Activating Behaviors",
  robots: { index: false, follow: false },
};

export default function AssessmentPage() {
  return <AssessmentPageClient />;
}
