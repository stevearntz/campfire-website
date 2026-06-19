import type { Metadata } from "next";
import DiagnosticClient from "./_components/DiagnosticClient";

export const metadata: Metadata = {
  title: "The Diagnostic",
  description:
    "See how your team really executes. A short, research-backed assessment that measures clarity, alignment, coordination cost, and the AI multiplier — and shows exactly where capacity is leaking.",
};

export default function DiagnosticPage() {
  return <DiagnosticClient />;
}
