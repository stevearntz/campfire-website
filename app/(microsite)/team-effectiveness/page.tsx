import type { Metadata } from "next";
import HubClient from "./_components/HubClient";

export const metadata: Metadata = {
  title: "Team Effectiveness Sprint",
  description:
    "Your team is working hard. Why does progress feel slow? A focused sprint to find what's slowing you down — with a practical plan to move forward.",
};

export default function TeamEffectivenessHub() {
  return <HubClient />;
}
