"use client";

import { useState } from "react";
import JourneyTracker, { type JourneyStep } from "./JourneyTracker";

export interface PastRound {
  id: number;
  title: string | null;
  startedAt: string;
  closedAt: string | null;
  selfComplete: boolean;
  peerCount: number;
  open: boolean;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

/**
 * The oriented landing a returning member sees. With an OPEN round it shows the
 * live rate → invite → compare journey plus a "close this round" control. With
 * no open round it invites the member to start a new one. Closed rounds are
 * listed as history so progress across rounds is visible at a glance.
 */
export default function HomeDashboard({
  firstName,
  hasActive,
  answeredCount,
  isComplete,
  peerTotal,
  peerResponded,
  canCompare,
  pastRounds,
  onStart,
  onResults,
  onInvite,
  onCompare,
  onClose,
  onStartNew,
  onViewRound,
  onProgress,
}: {
  firstName: string;
  hasActive: boolean;
  answeredCount: number;
  isComplete: boolean;
  peerTotal: number;
  peerResponded: number;
  canCompare: boolean;
  pastRounds: PastRound[];
  onStart: () => void;
  onResults: () => void;
  onInvite: () => void;
  onCompare: () => void;
  onClose: () => void;
  onStartNew: () => void;
  onViewRound: (id: number) => void;
  /** Provided once the member has ≥2 rounds — links to the progress trend. */
  onProgress?: () => void;
}) {
  const [confirmingClose, setConfirmingClose] = useState(false);

  // ── Step 1: Rate yourself ──────────────────────────────────────
  const step1: JourneyStep = isComplete
    ? {
        n: 1,
        title: "Rate yourself",
        body: "Your self-view is ready.",
        status: "done",
        cta: { label: "View your results", onClick: onResults },
      }
    : answeredCount > 0
      ? {
          n: 1,
          title: "Rate yourself",
          body: `${answeredCount} of 12 answered — pick up where you left off.`,
          status: "active",
          cta: { label: "Continue", onClick: onStart },
        }
      : {
          n: 1,
          title: "Rate yourself",
          body: "12 statements across four areas, plus a short note in each.",
          status: "active",
          cta: { label: "Start", onClick: onStart },
        };

  // ── Step 2: Invite peers ───────────────────────────────────────
  let step2: JourneyStep;
  if (!isComplete) {
    step2 = {
      n: 2,
      title: "Invite your peers",
      body: "Unlocks once you finish your self-assessment.",
      status: "locked",
    };
  } else if (peerResponded > 0) {
    step2 = {
      n: 2,
      title: "Invite your peers",
      body: `${peerResponded} of ${peerTotal} ${peerTotal === 1 ? "peer has" : "peers have"} responded.`,
      status: "done",
      cta: { label: "Manage invites", onClick: onInvite },
    };
  } else {
    step2 = {
      n: 2,
      title: "Invite your peers",
      body:
        peerTotal === 0
          ? "Share one link so peers can rate you."
          : `${peerTotal} ${peerTotal === 1 ? "peer" : "peers"} invited — waiting on responses.`,
      status: "active",
      cta: { label: peerTotal === 0 ? "Invite peers" : "Manage invites", onClick: onInvite },
    };
  }

  // ── Step 3: See it side by side ────────────────────────────────
  const step3: JourneyStep = canCompare
    ? {
        n: 3,
        title: "See it side by side",
        body: "Your self-view and your peers, on one radar.",
        status: "active",
        cta: { label: "See comparison", onClick: onCompare },
      }
    : {
        n: 3,
        title: "See it side by side",
        body: isComplete
          ? "Unlocks when your first peer responds."
          : "Unlocks after peers weigh in.",
        status: "locked",
      };

  const subhead = !hasActive
    ? "Start a new round whenever you’re ready for a fresh read."
    : !isComplete
      ? "Pick up your self-assessment where you left off."
      : canCompare
        ? "Your peers have started weighing in — see how it compares."
        : "Your self-view is in. Now bring in your peers.";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">
        <p
          className="font-bold uppercase mb-4"
          style={{ fontSize: 11, letterSpacing: "0.14em", color: "#6E3FCC" }}
        >
          Activating Behaviors
        </p>
        <h1
          className="font-extrabold mb-3"
          style={{ fontSize: "clamp(26px, 4vw, 36px)", lineHeight: 1.1, color: "#1E2A4A" }}
        >
          {firstName ? `Welcome back, ${firstName}.` : "Welcome back."}
        </h1>
        <p
          className="mb-10"
          style={{ fontSize: 17, lineHeight: 1.6, color: "#636B7C", maxWidth: 560 }}
        >
          {subhead}
        </p>

        {hasActive ? (
          <>
            <JourneyTracker steps={[step1, step2, step3]} />

            {/* Close the current round */}
            <div className="mt-8 pt-6" style={{ borderTop: "1px solid #EEE9F6" }}>
              {!confirmingClose ? (
                <button
                  onClick={() => setConfirmingClose(true)}
                  className="transition-colors"
                  style={{ fontSize: 13.5, color: "#A8A2B3" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#636B7C")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#A8A2B3")}
                >
                  Close this round
                </button>
              ) : (
                <div
                  className="rounded-xl p-4"
                  style={{ background: "#F8F6FB", border: "1px solid #EEE9F6" }}
                >
                  <p className="mb-3" style={{ fontSize: 13.5, color: "#636B7C", lineHeight: 1.55 }}>
                    Closing stops your peer link from collecting and moves this
                    round to your history. You can start a new one afterward.
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onClose}
                      className="font-bold uppercase transition-opacity hover:opacity-90"
                      style={{
                        height: 40,
                        borderRadius: 10,
                        background: "#6E3FCC",
                        color: "#fff",
                        fontSize: 12.5,
                        letterSpacing: "0.06em",
                        padding: "0 20px",
                      }}
                    >
                      Close round
                    </button>
                    <button
                      onClick={() => setConfirmingClose(false)}
                      style={{ fontSize: 13.5, color: "#A8A2B3", padding: "0 12px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* No open round — offer to start a new one */
          <div
            className="rounded-2xl p-6 mb-2"
            style={{ background: "#F8F6FB", border: "1px solid #EEE9F6" }}
          >
            <h3 className="font-bold mb-1" style={{ fontSize: 17, color: "#1E2A4A" }}>
              Start a new assessment
            </h3>
            <p className="mb-4" style={{ fontSize: 14.5, color: "#636B7C", lineHeight: 1.55 }}>
              Rate yourself again and invite a fresh round of peer feedback.
              Your past rounds stay saved below.
            </p>
            <button
              onClick={onStartNew}
              className="font-bold uppercase transition-opacity hover:opacity-90"
              style={{
                height: 50,
                borderRadius: 12,
                background: "#6E3FCC",
                color: "#fff",
                fontSize: 13,
                letterSpacing: "0.07em",
                padding: "0 28px",
              }}
            >
              Start a new round →
            </button>
          </div>
        )}

        {/* History — closed rounds */}
        {pastRounds.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <p
                className="font-bold uppercase"
                style={{ fontSize: 11, letterSpacing: "0.12em", color: "#A8A2B3" }}
              >
                Past rounds
              </p>
              {onProgress && (
                <button
                  onClick={onProgress}
                  className="font-bold uppercase transition-opacity hover:opacity-80"
                  style={{ fontSize: 11, letterSpacing: "0.06em", color: "#6E3FCC" }}
                >
                  See progress →
                </button>
              )}
            </div>
            <div className="space-y-2">
              {pastRounds.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onViewRound(r.id)}
                  className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-left transition-colors"
                  style={{ background: "#FBFAFD", border: "1px solid #F0ECF7" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F1FB")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#FBFAFD")}
                >
                  <div>
                    <div className="font-bold" style={{ fontSize: 14.5, color: "#1E2A4A" }}>
                      {r.title || `Round · ${formatDate(r.startedAt)}`}
                    </div>
                    <div style={{ fontSize: 12.5, color: "#A8A2B3", marginTop: 1 }}>
                      {r.selfComplete ? "Self-assessment complete" : "Self-assessment incomplete"}
                      {" · "}
                      {r.peerCount} {r.peerCount === 1 ? "peer" : "peers"}
                      {r.closedAt ? ` · closed ${formatDate(r.closedAt)}` : ""}
                    </div>
                  </div>
                  <span
                    className="font-bold uppercase flex-shrink-0 ml-3"
                    style={{ fontSize: 11, letterSpacing: "0.06em", color: "#6E3FCC" }}
                  >
                    View →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
