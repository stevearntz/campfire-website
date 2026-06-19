import type { Metadata } from "next";
import Placeholder from "../_components/Placeholder";

export const metadata: Metadata = {
  title: "The Facilitated Workshop",
  description:
    "Turn the findings into alignment. A facilitated working session where your team aligns on what matters most and tackles what's holding execution back.",
};

export default function WorkshopPage() {
  return <Placeholder eyebrow="Part 2 · The Workshop" title="The Facilitated Workshop" />;
}
