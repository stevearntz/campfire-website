import type { Metadata } from "next";
import HubClient from "./_components/HubClient";

export const metadata: Metadata = {
  title: "Team Effectiveness Sprint",
  description:
    "Turn team friction into forward momentum. Campfire helps teams identify what's getting in the way — clarity, alignment, coordination — and create a practical path forward.",
};

export default function TeamEffectivenessHub() {
  return <HubClient />;
}
