import type { Metadata } from "next";
import SiteNav from "./_components/SiteNav";
import SiteFooter from "./_components/SiteFooter";

const OG_DESC =
  "As work speeds up and priorities shift, teams lose clarity, alignment, and momentum. Campfire helps teams identify what's getting in the way and create a practical path forward.";

// Applies to all /team-effectiveness/* pages (pages still override their own title/description).
export const metadata: Metadata = {
  openGraph: {
    type: "website",
    siteName: "Campfire",
    title: "Team Effectiveness Sprint",
    description: OG_DESC,
    images: [{ url: "/og-sprint.png", width: 1200, height: 630, alt: "Campfire Team Effectiveness Sprint" }],
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
      <main id="main-content">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
