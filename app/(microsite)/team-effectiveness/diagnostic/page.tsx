import type { Metadata } from "next";
import Placeholder from "../_components/Placeholder";

export const metadata: Metadata = {
  title: "The Diagnostic",
  description:
    "See how your team really executes. A short, research-backed assessment that shows exactly where capacity is leaking.",
};

export default function DiagnosticPage() {
  return <Placeholder eyebrow="Part 1 · The Diagnostic" title="The Diagnostic" />;
}
