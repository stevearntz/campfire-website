"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMember } from "../lib/useMember";
import AssessmentFlow from "../components/AssessmentFlow";

function Spinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-[#9D88ED] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function AssessmentPageClient() {
  const router = useRouter();
  const { loading, responses, feedback, assessment } = useMember();

  useEffect(() => {
    if (loading) return;
    // No assessment at all → send back to intro (to capture name + create one).
    if (!assessment) {
      router.replace("/ypo-tool");
      return;
    }
    // Already done → results.
    if (assessment.status === "complete") {
      router.replace("/ypo-tool/results");
    }
  }, [loading, assessment, router]);

  if (loading || !assessment || assessment.status === "complete") {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-white">
      <AssessmentFlow
        onComplete={() => router.push("/ypo-tool/results")}
        initialResponses={responses}
        initialFeedback={feedback}
        assessmentId={assessment.id}
      />
    </div>
  );
}
