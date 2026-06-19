import type { Metadata } from "next";
import PeerRatingClient from "./PeerRatingClient";

export const metadata: Metadata = {
  title: "Share Your Perspective | Campfire",
  description: "Rate a colleague on the Activating Behaviors framework.",
  robots: { index: false, follow: false },
};

export default async function PeerRatePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <PeerRatingClient token={token} />;
}
