import type { Metadata } from "next";
import YpoToolClient from "./YpoToolClient";

export const metadata: Metadata = {
  title: "YPO Activating Behaviors Assessment",
  description:
    "Self and peer assessment tool for the Activating Behaviors framework.",
  robots: { index: false, follow: false },
};

export default function YpoToolPage() {
  return <YpoToolClient />;
}
