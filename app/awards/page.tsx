import type { Metadata } from "next";
import VoterClient from "./_components/VoterClient";

// Hidden, internal live-event tool — keep it out of search + nav (like /eggs).
export const metadata: Metadata = {
  title: "Campfire Superlatives — Live Voting",
  robots: { index: false, follow: false },
};

export default function AwardsPage() {
  return <VoterClient />;
}
