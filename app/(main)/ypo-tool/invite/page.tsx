import type { Metadata } from "next";
import InvitePageClient from "./InvitePageClient";

export const metadata: Metadata = {
  title: "Invite Peers · Activating Behaviors",
  robots: { index: false, follow: false },
};

export default function InvitePage() {
  return <InvitePageClient />;
}
