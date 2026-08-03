"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMember } from "../lib/useMember";
import AppHeader from "../components/AppHeader";
import ComparisonView from "../components/ComparisonView";

function Spinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-[#9D88ED] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function ComparePageClient() {
  const router = useRouter();
  // ?round=ID compares a specific past round; absent = current round.
  const [roundId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("round");
  });
  const { loading, user, responses, assessment } = useMember(roundId);

  useEffect(() => {
    if (!loading && !assessment) router.replace("/ypo-tool");
  }, [loading, assessment, router]);

  if (loading) return <Spinner />;

  const firstName = user?.name
    ? user.name.split(" ")[0]
    : user?.email?.split("@")[0];

  return (
    <div className="min-h-screen bg-white">
      <AppHeader email={user?.email} crumb={roundId ? "Past comparison" : "Comparison"} />
      <ComparisonView
        responses={responses}
        rateeFirstName={firstName}
        roundId={roundId}
        onBack={() =>
          router.push(roundId ? `/ypo-tool/results?round=${roundId}` : "/ypo-tool/results")
        }
      />
    </div>
  );
}
