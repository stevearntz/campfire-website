import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { presentationsEnabled } from "./_lib/flag";
import { Sidebar } from "./_components/Sidebar";
import { getCurrentLearner, initials } from "./_lib/learner";

export const metadata: Metadata = {
  title: "Tell It So It Moves — Storytelling & Presentations",
  description:
    "A self-paced storytelling and presentations course. Ten modules, one real presentation, four coaching sessions.",
  robots: { index: false, follow: false },
};

// Per-learner data is read on every request — never statically prerender.
export const dynamic = "force-dynamic";

export default async function PresentationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!presentationsEnabled()) notFound();

  const { user } = await getCurrentLearner();
  const displayName = user.name ?? user.email.split("@")[0];

  return (
    <>
      {/* Material Symbols Rounded (filled) — UI icons for this section only.
          Loaded per-section via <link> so the icon font isn't pulled site-wide;
          next/font doesn't carry the Material Symbols variable icon axes. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0&display=swap"
      />
      <div className="flex h-screen overflow-hidden bg-cf-purple-050 text-cf-gray-700">
        <Sidebar
          displayName={displayName}
          initialsText={initials(user)}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </>
  );
}
