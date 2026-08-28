import type { Metadata } from "next";
import YpoEventsPage from "./YpoEventsPage";

export const metadata: Metadata = {
  title: "Global Events Offsite Recap | Campfire",
  description:
    "From purpose to behaviors — how the YPO Global Events leadership team defined what they exist for, what they're trying to accomplish, and how they'll work together to get there.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <YpoEventsPage />;
}
