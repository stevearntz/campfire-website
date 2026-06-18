import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/app/ypo-tool/lib/auth";

export const metadata: Metadata = {
  title: "Shared Assessment — Activating Behaviors",
  robots: { index: false, follow: false },
};

export default async function SharedAssessmentPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const session = await getSession();
  const { token } = await params;

  if (!session) {
    // Not authenticated — redirect to sign-in, then back here
    redirect(`/ypo-tool?redirect=/ypo-tool/share/${token}`);
  }

  // Fetch shared assessment on the client side via the API
  return <SharedAssessmentClient token={token} />;
}

// Thin client wrapper that fetches and displays the shared assessment
function SharedAssessmentClient({ token }: { token: string }) {
  // This will be a "use client" component in the future.
  // For now, render a placeholder that the client component will replace.
  return (
    <div className="min-h-screen bg-[#F8F5FC]">
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-sm font-bold tracking-[0.15em] uppercase text-[#6E3FCC] mb-4">
          Shared Assessment
        </p>
        <h2 className="text-2xl font-bold text-[#1C1334] mb-4">
          Peer assessment view coming from Design
        </h2>
        <p className="text-gray-500">Share token: {token}</p>
      </div>
    </div>
  );
}
