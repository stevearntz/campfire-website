import type { Metadata } from "next";
import EffectiveOrgClient from "./EffectiveOrgClient";

export const metadata: Metadata = {
  title: "Leadership Development for the AI Era | Campfire",
  description:
    "Your capacity is increasing. Make it count. Campfire helps organizations turn increased individual capacity into organizational effectiveness through better alignment and leadership.",
  openGraph: {
    title: "Leadership Development for the AI Era | Campfire",
    description:
      "Effectiveness = Capacity x Alignment / Coordination Cost. Campfire helps growing companies build the leadership habits that turn capacity into outcomes.",
    type: "website",
  },
};

export default function EffectiveOrgPage() {
  return <EffectiveOrgClient />;
}
