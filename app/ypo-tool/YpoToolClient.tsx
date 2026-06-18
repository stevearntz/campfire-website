"use client";

import { useState, useEffect, useCallback } from "react";
import type { YpoUser } from "./lib/constants";
import MagicLinkForm from "./components/MagicLinkForm";

type View = "loading" | "auth" | "home";

export default function YpoToolClient() {
  const [view, setView] = useState<View>("loading");
  const [user, setUser] = useState<YpoUser | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

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
    // Clean up URL
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
          setView("home");
        } else {
          setView("auth");
        }
      })
      .catch(() => {
        setView("auth");
      });
  }, []);

  const handleLogout = useCallback(async () => {
    await fetch("/api/ypo-tool/auth/logout", { method: "POST" });
    setUser(null);
    setView("auth");
  }, []);

  if (view === "loading") {
    return (
      <div className="min-h-screen bg-[#1C1334] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#9D88ED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (view === "auth") {
    return <MagicLinkForm error={authError} />;
  }

  // Authenticated home — placeholder for Design to fill
  return (
    <div className="min-h-screen bg-[#F8F5FC]">
      {/* Sticky header */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold tracking-[0.1em] uppercase text-[#6E3FCC]">
              Activating Behaviors
            </p>
            <p className="text-xs text-gray-400">
              Signed in as {user?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main content area — placeholder for assessment flow */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-[#1C1334] mb-4">
          Welcome, {user?.name || user?.email?.split("@")[0]}
        </h1>
        <p className="text-lg text-gray-500 mb-12">
          Choose an assessment to get started.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Self-assessment card */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
            <div
              className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white font-bold text-lg"
              style={{ background: "#6E3FCC" }}
            >
              S
            </div>
            <h2 className="text-xl font-bold text-[#1C1334] mb-2">
              Self-Assessment
            </h2>
            <p className="text-sm text-gray-500">
              Rate yourself across Joy, Trust, Power, and Partnership.
              Identify your strength and growth area.
            </p>
          </div>

          {/* Peer assessment card */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
            <div
              className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white font-bold text-lg"
              style={{ background: "#E055CB" }}
            >
              P
            </div>
            <h2 className="text-xl font-bold text-[#1C1334] mb-2">
              Peer Assessment
            </h2>
            <p className="text-sm text-gray-500">
              Rate a colleague and share specific feedback with
              observations and encouragement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
