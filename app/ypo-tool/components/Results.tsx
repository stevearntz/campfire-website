"use client";

import type { AssessmentRecord } from "../lib/constants";

// Placeholder — Design will define the full results UI.
// This component will display:
// - Visual profile across 4 categories (radar chart or bar chart)
// - Strength and growth area highlighted
// - Reflection questions based on growth area
// - Circles framework reference (Control / Influence / Concern)
// - For peer: share link generation

export default function Results({
  assessment,
  onNewAssessment,
}: {
  assessment: AssessmentRecord;
  onNewAssessment: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <p className="text-sm font-bold tracking-[0.15em] uppercase text-[#6E3FCC] mb-4">
        Results
      </p>
      <h2 className="text-2xl font-bold text-[#1C1334] mb-4">
        Results view coming from Design
      </h2>
      <p className="text-gray-500 mb-8">
        Assessment ID: {assessment.id} | Type: {assessment.type}
      </p>
      <button
        onClick={onNewAssessment}
        className="text-sm text-[#6E3FCC] hover:underline"
      >
        Start a new assessment
      </button>
    </div>
  );
}
