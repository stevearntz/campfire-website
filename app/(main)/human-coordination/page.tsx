import type { Metadata } from "next";
import HumanCoordinationClient from "./HumanCoordinationClient";

export const metadata: Metadata = {
  title: "Human Coordination Systems | Campfire",
  description:
    "Campfire helps organizations create shared understanding, reduce strategy drift, and turn change into coordinated execution through scalable, psychologically safe conversation systems.",
  openGraph: {
    title: "Human Coordination Systems | Campfire",
    description:
      "Move faster without fragmenting. Campfire creates human coordination systems for organizations navigating rapid change.",
    type: "website",
  },
};

export default function HumanCoordinationPage() {
  return <HumanCoordinationClient />;
}
