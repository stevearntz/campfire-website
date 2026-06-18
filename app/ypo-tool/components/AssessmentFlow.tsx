"use client";

// Placeholder — Design will define the full assessment UI.
// This component will handle the multi-step flow:
// Step 0: Mode selection (self vs peer)
// Steps 1-4: Rate behaviors in each category (Joy, Trust, Power, Partnership)
// Step 5: Pick strength + growth area (self) or add observation/encouragement (peer)
// Step 6: Results

export default function AssessmentFlow({
  mode,
  onComplete,
  onBack,
}: {
  mode: "self" | "peer";
  onComplete: () => void;
  onBack: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <p className="text-sm font-bold tracking-[0.15em] uppercase text-[#6E3FCC] mb-4">
        {mode === "self" ? "Self-Assessment" : "Peer Assessment"}
      </p>
      <h2 className="text-2xl font-bold text-[#1C1334] mb-4">
        Assessment flow coming from Design
      </h2>
      <p className="text-gray-500 mb-8">
        This component will be built from Claude Design prompts.
      </p>
      <button
        onClick={onBack}
        className="text-sm text-[#6E3FCC] hover:underline"
      >
        Back to mode selection
      </button>
    </div>
  );
}
