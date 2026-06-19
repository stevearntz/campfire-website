import type { Metadata } from "next";
import WorkshopClient from "./_components/WorkshopClient";

export const metadata: Metadata = {
  title: "The Facilitated Workshop",
  description:
    "Turn the findings into alignment. A facilitated working session where your team reviews the diagnostic, aligns on what matters most, and tackles what's holding execution back.",
};

export default function WorkshopPage() {
  return <WorkshopClient />;
}
