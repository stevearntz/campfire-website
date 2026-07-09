"use client";

import { useEffect } from "react";
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
  const { loading, user, responses, feedback, assessment } = useMember();

  const answered = Object.keys(responses).length;
  const isDone = assessment?.status === "complete" || answered === 12;

  useEffect(() => {
    if (loading) return;
    if (!assessment) {
      router.replace("/ypo-tool");
      return;
    }
    // Started but not finished → back to the assessment.
    if (assessment.status !== "complete" && answered < 12) {
      router.replace("/ypo-tool/assessment");
    }
  }, [loading, assessment, answered, router]);

  if (loading || !assessment || !isDone) return <Spinner />;

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
      <AppHeader email={user?.email} />
      <Results
        responses={responses}
        selfFeedback={feedback}
        onRestart={handleRestart}
        onInvitePeers={() => router.push("/ypo-tool/invite")}
      />
    </div>
  );
}
