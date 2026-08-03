"use client";

export type StepStatus = "done" | "active" | "upcoming" | "locked";

export interface JourneyStep {
  n: number;
  title: string;
  body: string;
  status: StepStatus;
  cta?: { label: string; onClick: () => void };
}

/**
 * The three-step macro tracker for the Activating Behaviors journey
 * (rate yourself → invite peers → see it side by side). Used both as a
 * read-only roadmap on the first-run Welcome and as the live, actionable
 * dashboard a returning member lands on.
 */
export default function JourneyTracker({ steps }: { steps: JourneyStep[] }) {
  return (
    <div className="space-y-4">
      {steps.map((s) => (
        <StepCard key={s.n} step={s} />
      ))}
    </div>
  );
}

function StepCard({ step }: { step: JourneyStep }) {
  const isActive = step.status === "active";
  const isDone = step.status === "done";
  const isLocked = step.status === "locked";
  const muted = step.status === "upcoming" || isLocked;

  return (
    <div
      className="relative rounded-2xl p-5 md:p-6 transition-all"
      style={{
        background: isActive ? "#F8F6FB" : "#fff",
        border: `1px solid ${isActive ? "#D9CCF2" : "#EEE9F6"}`,
        boxShadow: isActive ? "0 0 0 3px rgba(157,136,237,0.12)" : "none",
        opacity: isLocked ? 0.72 : 1,
      }}
    >
      <div className="flex items-start gap-4">
        {/* Status marker */}
        <div
          className="flex items-center justify-center rounded-full flex-shrink-0 font-extrabold"
          style={{
            width: 40,
            height: 40,
            background: isDone ? "#1F8A5B" : isActive ? "#6E3FCC" : "#F3EFFA",
            color: isDone || isActive ? "#fff" : "#B7B2C0",
            fontSize: 15,
          }}
        >
          {isDone ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : isLocked ? (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          ) : (
            step.n
          )}
        </div>

        {/* Text + optional action */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className="font-bold"
              style={{ fontSize: 17, color: muted ? "#8B93A3" : "#1E2A4A" }}
            >
              {step.title}
            </h3>
            {isDone && (
              <span
                className="font-bold uppercase rounded-full px-2 py-0.5"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.08em",
                  color: "#1F8A5B",
                  background: "rgba(31,138,91,0.1)",
                }}
              >
                Done
              </span>
            )}
          </div>
          <p
            className="mt-0.5"
            style={{ fontSize: 14.5, lineHeight: 1.55, color: muted ? "#A8A2B3" : "#636B7C" }}
          >
            {step.body}
          </p>

          {step.cta && (
            <button
              onClick={step.cta.onClick}
              className="mt-3 font-bold uppercase transition-opacity hover:opacity-90"
              style={{
                height: 42,
                borderRadius: 11,
                background: isActive ? "#6E3FCC" : "transparent",
                border: isActive ? "none" : "1px solid #E7E3EE",
                color: isActive ? "#fff" : "#636B7C",
                fontSize: 13,
                letterSpacing: "0.07em",
                padding: isActive ? "0 22px" : "0 18px",
              }}
            >
              {step.cta.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
