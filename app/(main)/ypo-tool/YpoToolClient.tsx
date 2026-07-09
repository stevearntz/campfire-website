"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { YpoUser } from "./lib/constants";
import MagicLinkForm from "./components/MagicLinkForm";
import AppHeader from "./components/AppHeader";
import IntroScreen from "./components/IntroScreen";

type View = "loading" | "auth" | "intro";

/**
 * Entry route (/ypo-tool). Handles sign-in, then routes the member to the
 * right screen: a completed member goes to /results, an in-progress one to
 * /assessment, and a fresh member sees the intro (which captures their name
 * and starts the assessment).
 */
export default function YpoToolClient() {
  const router = useRouter();
  const [view, setView] = useState<View>("loading");
  const [user, setUser] = useState<YpoUser | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // Surface error params from the magic-link redirect
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

  /** After auth, send the member to the correct screen. */
  const routeMember = useCallback(async () => {
    try {
      const cur = await fetch("/api/ypo-tool/assessment/current").then((r) => r.json());
      const assessment = cur.assessment;
      if (assessment && assessment.status === "complete") {
        router.replace("/ypo-tool/results");
        return;
      }
      if (assessment && Object.keys(cur.responses || {}).length > 0) {
        router.replace("/ypo-tool/assessment");
        return;
      }
      setView("intro");
    } catch {
      setView("intro");
    }
  }, [router]);

  // Check session on mount
  useEffect(() => {
    fetch("/api/ypo-tool/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          routeMember();
        } else {
          setView("auth");
        }
      })
      .catch(() => setView("auth"));
  }, [routeMember]);

  /** Dev-only bypass: create a real session so the routed flow authenticates. */
  const handleBypassAuth = useCallback(
    async (email: string) => {
      try {
        const res = await fetch("/api/ypo-tool/auth/dev-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          routeMember();
        }
      } catch {
        // dev only — ignore
      }
    },
    [routeMember],
  );

  /** From the intro: persist name, ensure an assessment row, begin. */
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
        // best-effort
      }
      try {
        await fetch("/api/ypo-tool/assessment", { method: "POST" });
      } catch {
        // best-effort — assessment page will find-or-create
      }
      router.push("/ypo-tool/assessment");
    },
    [router],
  );

  if (view === "loading") {
    return (
      <div className="min-h-screen bg-[#1C1334] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#9D88ED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (view === "auth") {
    const isDev = process.env.NODE_ENV === "development";
    return (
      <MagicLinkForm
        error={authError}
        onBypassAuth={isDev ? handleBypassAuth : undefined}
      />
    );
  }

  // intro
  return (
    <div className="min-h-screen bg-white">
      <AppHeader email={user?.email} />
      <IntroScreen
        initialName={user?.name || ""}
        onStart={handleStartAssessment}
      />
    </div>
  );
}
