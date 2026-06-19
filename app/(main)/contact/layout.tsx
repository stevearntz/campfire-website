import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Campfire — Let's Talk About Your Team",
  description: "Get in touch with Campfire to explore flexible leadership development for your organization. Book a call or send us a message.",
  openGraph: {
    title: "Contact Campfire — Let's Talk About Your Team",
    description: "Get in touch with Campfire to explore flexible leadership development for your organization.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
