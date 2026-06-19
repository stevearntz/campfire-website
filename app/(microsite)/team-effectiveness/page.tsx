import type { Metadata } from "next";
import Placeholder from "./_components/Placeholder";

export const metadata: Metadata = {
  title: "Team Effectiveness Sprint",
  description:
    "Your team is working hard. Why does progress feel slow? A focused sprint to find what's slowing you down — with a practical plan to move forward.",
};

export default function TeamEffectivenessHub() {
  return <Placeholder eyebrow="Team Effectiveness Sprint" title="The Sprint" />;
}
