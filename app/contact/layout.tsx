import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Book a Call",
  description:
    "Schedule a conversation with the Campfire team. Learn how we can help your managers build leadership skills at scale. No pitch deck, no pressure.",
  openGraph: {
    title: "Contact Us — Book a Call",
    description:
      "Schedule a conversation with the Campfire team about leadership development for your organization.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
