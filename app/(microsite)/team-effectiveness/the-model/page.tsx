import type { Metadata } from "next";
import Placeholder from "../_components/Placeholder";

export const metadata: Metadata = {
  title: "The Model",
  description:
    "Why more capacity is making organizations less effective — a Campfire point of view on execution, alignment, and the AI era.",
};

export default function TheModelPage() {
  return <Placeholder eyebrow="The Model · a Campfire point of view" title="The Model" />;
}
