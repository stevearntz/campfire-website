import type { Metadata } from "next";
import YpoPage from "./YpoPage";

export const metadata: Metadata = {
  title: "Offsite Recap | Campfire",
  description:
    "From reactive to strategic — how a team redefined their identity and built a system for becoming trusted, strategic partners.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <YpoPage />;
}
