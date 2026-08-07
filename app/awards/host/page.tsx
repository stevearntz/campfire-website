import type { Metadata } from "next";
import HostConsole from "../_components/HostConsole";

export const metadata: Metadata = {
  title: "Campfire Superlatives — Host Console",
  robots: { index: false, follow: false },
};

export default function AwardsHostPage() {
  return <HostConsole />;
}
