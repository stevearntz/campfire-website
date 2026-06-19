"use client";

import { useState, useEffect, useCallback } from "react";
import type { YpoUser } from "./lib/constants";
import type { Responses } from "./lib/behaviors";
import MagicLinkForm from "./components/MagicLinkForm";
import AssessmentFlow from "./components/AssessmentFlow";
import Results from "./components/Results";

type View = "loading" | "auth" | "assessment" | "results";

const STORAGE_KEY = "ypo_assessment_responses";

export default function YpoToolClient() {
  const [view, setView] = useState<View>("loading");
  const [user, setUser] = useState<YpoUser | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [responses, setResponses] = useState<Responses>({});

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

  // Check session on mount
  useEffect(() => {
    fetch("/api/ypo-tool/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          // Check if there are saved responses (completed assessment)
          const saved = loadSavedResponses();
          if (saved && Object.keys(saved).length === 12) {
            setResponses(saved);
            setView("results");
          } else {
            setView("assessment");
          }
        } else {
          setView("auth");
        }
      })
      .catch(() => {
        setView("auth");
      });
  }, []);

  const handleBypassAuth = useCallback((email: string) => {
    setUser({ id: 0, email, name: email.split("@")[0] });
    // Check for saved progress
    const saved = loadSavedResponses();
    if (saved && Object.keys(saved).length === 12) {
      setResponses(saved);
      setView("results");
    } else {
      setView("assessment");
    }
  }, []);

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
    setView("results");
  }, []);

  const handleRestart = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setResponses({});
    setView("assessment");
  }, []);

  if (view === "loading") {
    return (
      <div className="min-h-screen bg-[#1C1334] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#9D88ED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (view === "auth") {
    return <MagicLinkForm error={authError} onBypassAuth={handleBypassAuth} />;
  }

  if (view === "results") {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
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
                {user?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs transition-colors"
              style={{ color: "#A8A2B3" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#636B7C")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#A8A2B3")}
            >
              Sign out
            </button>
          </div>
        </div>
        <Results responses={responses} onRestart={handleRestart} />
      </div>
    );
  }

  // Assessment flow
  return (
    <div className="min-h-screen bg-white">
      <AssessmentFlow onComplete={handleComplete} />
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
