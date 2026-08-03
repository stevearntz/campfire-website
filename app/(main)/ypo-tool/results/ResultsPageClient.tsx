"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMember } from "../lib/useMember";
import AppHeader from "../components/AppHeader";
import Results from "../components/Results";

function Spinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-[#9D88ED] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function ResultsPageClient() {
  const router = useRouter();
  // ?round=ID views a specific past round read-only; absent = current round.
  const [roundId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("round");
  });
  const { loading, user, responses, feedback, assessment } = useMember(roundId);

  const readOnly = !!roundId && assessment?.closed_at != null;
  const answered = Object.keys(responses).length;
  const isDone = assessment?.status === "complete" || answered === 12;

  useEffect(() => {
    if (loading) return;
    if (!assessment) {
      router.replace("/ypo-tool");
      return;
    }
    // Only bounce into the assessment flow for the CURRENT round, never history.
    if (!roundId && assessment.status !== "complete" && answered < 12) {
      router.replace("/ypo-tool/assessment");
    }
  }, [loading, assessment, answered, roundId, router]);

  if (loading || !assessment) return <Spinner />;
  if (!roundId && !isDone) return <Spinner />;

  const handleRestart = async () => {
    try {
      localStorage.removeItem("ypo_assessment_responses");
    } catch {}
    try {
      await fetch("/api/ypo-tool/assessment/restart", { method: "POST" });
    } catch {}
    router.push("/ypo-tool/assessment");
  };

  return (
    <div className="min-h-screen bg-white">
      <AppHeader email={user?.email} crumb={readOnly ? "Past round" : "Your results"} />
      {readOnly && (
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <div
            className="rounded-xl px-4 py-3"
            style={{ background: "#F8F6FB", border: "1px solid #EEE9F6", fontSize: 13.5, color: "#636B7C" }}
          >
            You’re viewing a past round. It’s closed, so it’s read-only.
          </div>
        </div>
      )}
      <Results
        responses={responses}
        selfFeedback={feedback}
        readOnly={readOnly}
        onCompare={() => router.push(`/ypo-tool/compare?round=${roundId}`)}
        onRestart={handleRestart}
        onInvitePeers={() => router.push("/ypo-tool/invite")}
      />
    </div>
  );
}
