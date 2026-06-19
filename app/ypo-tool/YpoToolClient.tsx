"use client";

import { useState, useEffect, useCallback } from "react";
import type { YpoUser } from "./lib/constants";
import type { Responses } from "./lib/behaviors";
import MagicLinkForm from "./components/MagicLinkForm";
import AssessmentFlow from "./components/AssessmentFlow";
import Results from "./components/Results";
import InvitePeers from "./components/InvitePeers";
import ComparisonView from "./components/ComparisonView";

type View = "loading" | "auth" | "assessment" | "results" | "invite" | "comparison";

const STORAGE_KEY = "ypo_assessment_responses";

export default function YpoToolClient() {
  const [view, setView] = useState<View>("loading");
  const [user, setUser] = useState<YpoUser | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [responses, setResponses] = useState<Responses>({});
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

  /** After auth, load or create assessment from DB */
  const loadAssessment = useCallback(async () => {
    try {
      // GET /api/ypo-tool/assessment — finds existing or creates new
      const res = await fetch("/api/ypo-tool/assessment");
      if (!res.ok) throw new Error("Failed to load assessment");
      const data = await res.json();

      const dbResponses: Responses = data.responses || {};
      const dbId: number = data.assessment?.id || 0;
      const dbStatus: string = data.assessment?.status || "in_progress";

      setAssessmentId(dbId);

      // Merge: DB responses take priority, then localStorage
      const local = loadSavedResponses() || {};
      const merged = { ...local, ...dbResponses };
      setResponses(merged);

      // Sync any localStorage-only answers up to DB
      if (dbId > 0) {
        for (const key of Object.keys(local)) {
          if (dbResponses[key] == null && local[key] != null) {
            fetch(`/api/ypo-tool/assessment/${dbId}/response`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ itemKey: key, value: local[key] }),
            }).catch(() => {});
          }
        }
      }

      if (dbStatus === "complete" || Object.keys(merged).length === 12) {
        setView("results");
      } else {
        setView("assessment");
      }
    } catch {
      // DB not available — fall back to localStorage
      const saved = loadSavedResponses();
      if (saved && Object.keys(saved).length === 12) {
        setResponses(saved);
        setView("results");
      } else {
        setView("assessment");
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

  const handleRestart = useCallback(async () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setResponses({});
    setAssessmentId(null);

    // Create a fresh assessment in DB
    try {
      // We need a new assessment — the old one is complete.
      // The GET/POST endpoint returns existing in_progress or creates new.
      // Since the old one is complete, it will create a new one.
      const res = await fetch("/api/ypo-tool/assessment", { method: "POST" });
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

function loadSavedResponses(): Responses | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
