"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ALL_ITEM_KEYS } from "./lib/behaviors";
import type { YpoUser } from "./lib/constants";
import MagicLinkForm from "./components/MagicLinkForm";
import AppHeader from "./components/AppHeader";
import IntroScreen from "./components/IntroScreen";
import HomeDashboard from "./components/HomeDashboard";

type View = "loading" | "auth" | "welcome" | "home";

interface Journey {
  answeredCount: number;
  isComplete: boolean;
  peerTotal: number;
  peerResponded: number;
  canCompare: boolean;
}

/**
 * Entry route (/ypo-tool). Handles sign-in, then shows the member an oriented
 * landing: a first-run Welcome (captures name, starts the assessment) for new
 * members, or a live Home dashboard — showing where they are across the
 * rate → invite → compare journey — for anyone who has already started.
 */
export default function YpoToolClient() {
  const router = useRouter();
  const [view, setView] = useState<View>("loading");
  const [user, setUser] = useState<YpoUser | null>(null);
  const [journey, setJourney] = useState<Journey | null>(null);
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

  /** Load the member's journey state and land them on Welcome or Home. */
  const loadHome = useCallback(async () => {
    try {
      const [cur, invite] = await Promise.all([
        fetch("/api/ypo-tool/assessment/current").then((r) => r.json()),
        fetch("/api/ypo-tool/invite/status")
          .then((r) => r.json())
          .catch(() => ({})),
      ]);

      const assessment = cur.assessment;
      // No assessment row yet → brand-new member sees the Welcome.
      if (!assessment) {
        setView("welcome");
        return;
      }

      const responses = cur.responses || {};
      setJourney({
        answeredCount: ALL_ITEM_KEYS.filter((k) => responses[k] != null).length,
        isComplete: assessment.status === "complete",
        peerTotal: (invite.raters || []).length,
        peerResponded: invite.respondedCount || 0,
        canCompare: !!invite.canViewAggregate,
      });
      setView("home");
    } catch {
      setView("welcome");
    }
  }, []);

  // Check session on mount
  useEffect(() => {
    fetch("/api/ypo-tool/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          loadHome();
        } else {
          setView("auth");
        }
      })
      .catch(() => setView("auth"));
  }, [loadHome]);

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
          loadHome();
        }
      } catch {
        // dev only — ignore
      }
    },
    [loadHome],
  );

  /** From the Welcome: persist name, ensure an assessment row, begin. */
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

  const firstName = (user?.name || "").trim().split(/\s+/)[0] || "";

  if (view === "home" && journey) {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader email={user?.email} />
        <HomeDashboard
          firstName={firstName}
          answeredCount={journey.answeredCount}
          isComplete={journey.isComplete}
          peerTotal={journey.peerTotal}
          peerResponded={journey.peerResponded}
          canCompare={journey.canCompare}
          onStart={() => router.push("/ypo-tool/assessment")}
          onResults={() => router.push("/ypo-tool/results")}
          onInvite={() => router.push("/ypo-tool/invite")}
          onCompare={() => router.push("/ypo-tool/compare")}
        />
      </div>
    );
  }

  // welcome (first run)
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
