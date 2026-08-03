"use client";

import JourneyTracker, { type JourneyStep } from "./JourneyTracker";

/**
 * The oriented landing a returning member sees instead of being silently
 * redirected. Shows the live three-step journey with exactly one "active"
 * focus step, so someone coming back mid-flow (or days later, waiting on
 * peers) immediately sees where they are and what's next.
 */
export default function HomeDashboard({
  firstName,
  answeredCount,
  isComplete,
  peerTotal,
  peerResponded,
  canCompare,
  onStart,
  onResults,
  onInvite,
  onCompare,
}: {
  firstName: string;
  answeredCount: number;
  isComplete: boolean;
  peerTotal: number;
  peerResponded: number;
  canCompare: boolean;
  onStart: () => void;
  onResults: () => void;
  onInvite: () => void;
  onCompare: () => void;
}) {
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

  const subhead = !isComplete
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

        <JourneyTracker steps={[step1, step2, step3]} />
      </div>
    </div>
  );
}
