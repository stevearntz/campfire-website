import type { Metadata } from "next";
import Placeholder from "../_components/Placeholder";

export const metadata: Metadata = {
  title: "The Team Roadmap",
  description:
    "A clear plan for the next 90 days — key findings, the focus areas that matter, and the specific next steps for the quarter ahead.",
};

export default function RoadmapPage() {
  return <Placeholder eyebrow="Part 3 · The Roadmap" title="The Team Roadmap" />;
}
