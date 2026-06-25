import type { Metadata } from "next";
import ExecutionCalculatorClient from "@/app/(main)/execution/ExecutionCalculatorClient";

export const metadata: Metadata = {
  title: "The Diagnostic — Execution Calculator",
  description:
    "See how your team really executes. A short, research-backed diagnostic that shows exactly where capacity is leaking — in about two minutes.",
};

// Renders the existing calculator inside the micro-site shell (SiteNav + SiteFooter).
// Increment 3 reskins this in place and adds the focus-bonus / AI-callout surfaces + analytics.
export default function CalculatorPage() {
  return <ExecutionCalculatorClient />;
}
