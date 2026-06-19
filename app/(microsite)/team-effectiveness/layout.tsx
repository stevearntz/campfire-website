import type { Metadata } from "next";
import SiteNav from "./_components/SiteNav";
import SiteFooter from "./_components/SiteFooter";

const OG_DESC =
  "Your team is working hard. Why does progress feel slow? Take the 2-minute execution diagnostic — see your real execution score and the fastest lever.";

// Applies to all /team-effectiveness/* pages (pages still override their own title/description).
export const metadata: Metadata = {
  openGraph: {
    type: "website",
    siteName: "Campfire",
    title: "Team Effectiveness Sprint",
    description: OG_DESC,
    images: [{ url: "/og-sprint.png", width: 1200, height: 630, alt: "Campfire Team Effectiveness Sprint — your 300 people execute like 90" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Effectiveness Sprint",
    description: OG_DESC,
    images: ["/og-sprint.png"],
  },
};

export default function TeamEffectivenessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-16">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
