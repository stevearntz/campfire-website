"use client";

import { useState, useEffect, useCallback } from "react";
import type { YpoUser } from "./lib/constants";
import type { Responses } from "./lib/behaviors";
import MagicLinkForm from "./components/MagicLinkForm";
import AssessmentFlow from "./components/AssessmentFlow";
import Results from "./components/Results";
import InvitePeers from "./components/InvitePeers";
import ComparisonView from "./components/ComparisonView";

type View =
  | "loading"
  | "auth"
  | "intro"
  | "assessment"
  | "results"
  | "invite"
  | "comparison";

const STORAGE_KEY = "ypo_assessment_responses";

/** Derive a display first name from a user's name or email. */
function firstNameOf(user: YpoUser | null): string {
  if (!user) return "";
  if (user.name) return user.name.split(" ")[0];
  return user.email.split("@")[0];
}

export default function YpoToolClient() {
  const [view, setView] = useState<View>("loading");
  const [user, setUser] = useState<YpoUser | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [responses, setResponses] = useState<Responses>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [assessmentId, setAssessmentId] = useState<number | null>(null);

  // Check for error params from magic link redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    if (error === "invalid_token") {
      setAuthError("This link has expired or was already used. Please request a new one.");
    } else if (error === "missing_token") {
      setAuthError("Invalid sign-in link. Please request a new one.");
    } else if (error === "verification_failed") {
      setAuthError("Sign-in failed. Please try again.");
    }
    if (error) {
      window.history.replaceState({}, "", "/ypo-tool");
    }
  }, []);

  /**
   * After auth, load the member's LATEST assessment (any status) and route:
   *  - complete           → results
   *  - in-progress w/ data → resume the assessment
   *  - none / fresh        → intro screen (explain + capture name)
   * "Latest attempt wins" — we never resurrect an old completed attempt over a
   * newer in-progress one.
   */
  const loadAssessment = useCallback(async () => {
    try {
      // /assessment/current returns the most recent assessment; it does NOT create one.
      const res = await fetch("/api/ypo-tool/assessment/current");
      if (!res.ok) throw new Error("Failed to load assessment");
      const data = await res.json();

      const dbResponses: Responses = data.responses || {};
      const dbFeedback: Record<string, string> = data.feedback || {};
      const assessment = data.assessment;
      const dbId: number = assessment?.id || 0;
      const dbStatus: string = assessment?.status || "";

      setFeedback(dbFeedback);

      // Merge: DB responses take priority, then localStorage
      const local = loadSavedResponses() || {};
      const merged = { ...local, ...dbResponses };
      setResponses(merged);
      setAssessmentId(dbId || null);

      if (assessment && dbStatus === "complete") {
        setView("results");
        return;
      }

      // Resume an in-progress attempt that already has answers.
      if (dbId > 0 && Object.keys(merged).length > 0) {
        // Sync any localStorage-only answers up to DB
        for (const key of Object.keys(local)) {
          if (dbResponses[key] == null && local[key] != null) {
            fetch(`/api/ypo-tool/assessment/${dbId}/response`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ itemKey: key, value: local[key] }),
            }).catch(() => {});
          }
        }
        setView("assessment");
        return;
      }

      // Nothing started yet → intro.
      setView("intro");
    } catch {
      // DB not available — fall back to localStorage
      const saved = loadSavedResponses();
      if (saved && Object.keys(saved).length === 12) {
        setResponses(saved);
        setView("results");
      } else {
        setView("intro");
      }
    }
  }, []);

  // Check session on mount
  useEffect(() => {
    fetch("/api/ypo-tool/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          loadAssessment();
        } else {
          setView("auth");
        }
      })
      .catch(() => {
        setView("auth");
      });
  }, [loadAssessment]);

  const handleBypassAuth = useCallback((email: string) => {
    setUser({ id: 0, email, name: email.split("@")[0] });
    loadAssessment();
  }, [loadAssessment]);

  const handleLogout = useCallback(async () => {
    try {
      await fetch("/api/ypo-tool/auth/logout", { method: "POST" });
    } catch {
      // DB not connected
    }
    setUser(null);
    setView("auth");
  }, []);

  const handleComplete = useCallback((r: Responses) => {
    setResponses(r);
    // Also save to localStorage as backup
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
    } catch {}
    setView("results");
  }, []);

  /** From the intro: persist the member's name, ensure an assessment row, begin. */
  const handleStartAssessment = useCallback(
    async (name: string) => {
      try {
        const res = await fetch("/api/ypo-tool/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) setUser(data.user);
        }
      } catch {
        // Name persist is best-effort; keep going.
      }

      let id = assessmentId;
      if (!id || id <= 0) {
        try {
          const res = await fetch("/api/ypo-tool/assessment", { method: "POST" });
          if (res.ok) {
            const data = await res.json();
            id = data.assessment?.id || null;
            setAssessmentId(id);
          }
        } catch {
          // fall through — assessment saves are best-effort
        }
      }
      setView("assessment");
    },
    [assessmentId],
  );

  /**
   * Retake. Latest attempt wins; prior INCOMPLETE attempts are cleared server-side.
   * Skips the intro (the member is already named).
   */
  const handleRestart = useCallback(async () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setResponses({});
    setFeedback({});
    setAssessmentId(null);

    try {
      const res = await fetch("/api/ypo-tool/assessment/restart", {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setAssessmentId(data.assessment?.id || null);
      }
    } catch {}

    setView("assessment");
  }, []);

  const handleInvitePeers = useCallback(() => {
    setView("invite");
  }, []);

  const handleBackToResults = useCallback(() => {
    setView("results");
  }, []);

  const handleViewComparison = useCallback(() => {
    setView("comparison");
  }, []);

  if (view === "loading") {
    return (
      <div className="min-h-screen bg-[#1C1334] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#9D88ED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (view === "auth") {
    const isDev = process.env.NODE_ENV === "development";
    return <MagicLinkForm error={authError} onBypassAuth={isDev ? handleBypassAuth : undefined} />;
  }

  if (view === "intro") {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader email={user?.email} onLogout={handleLogout} />
        <IntroScreen
          initialName={user?.name || ""}
          onStart={handleStartAssessment}
        />
      </div>
    );
  }

  if (view === "invite") {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader email={user?.email} onLogout={handleLogout} />
        <InvitePeers
          onBack={handleBackToResults}
          onViewComparison={handleViewComparison}
        />
      </div>
    );
  }

  if (view === "comparison") {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader email={user?.email} onLogout={handleLogout} />
        <ComparisonView
          responses={responses}
          onBack={handleBackToResults}
          rateeFirstName={firstNameOf(user)}
        />
      </div>
    );
  }

  if (view === "results") {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader email={user?.email} onLogout={handleLogout} />
        <Results
          responses={responses}
          selfFeedback={feedback}
          onRestart={handleRestart}
          onInvitePeers={handleInvitePeers}
        />
      </div>
    );
  }

  // Assessment flow
  return (
    <div className="min-h-screen bg-white">
      <AssessmentFlow
        onComplete={handleComplete}
        initialResponses={responses}
        initialFeedback={feedback}
        assessmentId={assessmentId ?? undefined}
      />
    </div>
  );
}

function AppHeader({ email, onLogout }: { email?: string; onLogout: () => void }) {
  return (
    <div className="sticky top-[64px] z-40 bg-white border-b border-[#EEE9F6]">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="font-bold uppercase"
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "#6E3FCC",
            }}
          >
            Activating Behaviors
          </span>
          <span style={{ fontSize: 13, color: "#A8A2B3" }}>
            {email}
          </span>
        </div>
        <button
          onClick={onLogout}
          className="text-xs transition-colors"
          style={{ color: "#A8A2B3" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#636B7C")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#A8A2B3")}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

function IntroScreen({
  initialName,
  onStart,
}: {
  initialName: string;
  onStart: (name: string) => void;
}) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const steps: { n: string; title: string; body: string }[] = [
    {
      n: "1",
      title: "Rate yourself",
      body: "12 quick statements across four areas — Joy, Trust, Power, and Partnership — plus a short note in each.",
    },
    {
      n: "2",
      title: "Invite your peers",
      body: "Share one link. Each peer rates the same behaviors about you and adds their own notes.",
    },
    {
      n: "3",
      title: "See it side by side",
      body: "Your self-view lands next to every peer's response — with their name — so you can spot gaps and start the conversation.",
    },
  ];

  const handleSubmit = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    setSubmitting(true);
    onStart(name.trim());
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <p
          className="font-bold uppercase mb-4"
          style={{ fontSize: 11, letterSpacing: "0.14em", color: "#6E3FCC" }}
        >
          Activating Behaviors
        </p>
        <h1
          className="font-extrabold mb-4"
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            lineHeight: 1.1,
            color: "#1E2A4A",
          }}
        >
          A clear read on how you show up — and how your peers see it.
        </h1>
        <p
          className="mb-10"
          style={{ fontSize: 17, lineHeight: 1.65, color: "#636B7C", maxWidth: 640 }}
        >
          This self-assessment takes about five minutes. It&apos;s the starting
          point for a candid, side-by-side conversation with the peers you work
          most closely with. Here&apos;s how it works:
        </p>

        <div className="space-y-5 mb-10">
          {steps.map((s) => (
            <div key={s.n} className="flex items-start gap-4">
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0 font-extrabold"
                style={{
                  width: 36,
                  height: 36,
                  background: "#F3EFFA",
                  color: "#6E3FCC",
                  fontSize: 15,
                }}
              >
                {s.n}
              </div>
              <div>
                <h3
                  className="font-bold mb-0.5"
                  style={{ fontSize: 17, color: "#1E2A4A" }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: "#636B7C" }}>
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: "#F8F6FB", border: "1px solid #EEE9F6" }}
        >
          <label
            htmlFor="member-name"
            className="block mb-2 font-bold"
            style={{ fontSize: 14, color: "#1E2A4A" }}
          >
            Your name
          </label>
          <p className="mb-3" style={{ fontSize: 13.5, color: "#636B7C" }}>
            Every assessment is attributed — your results are tied to your name.
          </p>
          <input
            id="member-name"
            type="text"
            placeholder="First and last name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error && e.target.value.trim()) setError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            className="w-full outline-none transition-all"
            style={{
              height: 48,
              borderRadius: 12,
              background: "#fff",
              border: `1px solid ${error ? "#E0555B" : "#EEE9F6"}`,
              color: "#1E2A4A",
              fontSize: 16,
              padding: "0 16px",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#9D88ED";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(157,136,237,0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = error ? "#E0555B" : "#EEE9F6";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          {error && (
            <p className="mt-2" style={{ fontSize: 13, color: "#E0555B" }}>
              Please enter your name to begin.
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="font-bold uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{
            height: 54,
            borderRadius: 14,
            background: "#6E3FCC",
            color: "#fff",
            fontSize: 14,
            letterSpacing: "0.08em",
            padding: "0 36px",
          }}
        >
          {submitting ? "Starting…" : "Start self-assessment →"}
        </button>
      </div>
    </div>
  );
}

function loadSavedResponses(): Responses | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
