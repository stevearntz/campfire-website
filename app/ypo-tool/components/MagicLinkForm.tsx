"use client";

import { useState } from "react";

const CIRCLE_COLORS = [
  { label: "Joy", color: "#F59E2C" },
  { label: "Trust", color: "#6E3FCC" },
  { label: "Power", color: "#E055CB" },
  { label: "Partnership", color: "#30B7B7" },
];

export default function MagicLinkForm({
  error: initialError,
  onBypassAuth,
}: {
  error?: string | null;
  onBypassAuth?: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<
    "idle" | "sending" | "sent" | "error" | "rate_limited"
  >(initialError ? "error" : "idle");
  const [errorMsg, setErrorMsg] = useState(initialError || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();

    if (!trimmed) {
      setErrorMsg("Use your @ypo.org email.");
      setState("error");
      return;
    }

    if (!trimmed.endsWith("@ypo.org")) {
      setErrorMsg("Use your @ypo.org email.");
      setState("error");
      return;
    }

    // Bypass auth — skip email, go straight to authenticated state
    if (onBypassAuth) {
      onBypassAuth(trimmed);
      return;
    }

    setState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/ypo-tool/auth/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.status === 429) {
        setState("rate_limited");
        setErrorMsg("Too many requests. Try again in a bit.");
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong.");
        setState("error");
        return;
      }

      setState("sent");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  };

  const isDisabled = state === "sending" || !email.trim();

  return (
    <div className="relative min-h-screen bg-[#1C1334] flex flex-col">
      {/* Topo background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/purple-topo-tall.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.42,
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 w-full">
        <div
          className="mx-auto flex items-center justify-end"
          style={{ maxWidth: 1400, padding: "24px clamp(24px, 6vw, 96px) 0" }}
        >
          <span
            className="font-bold uppercase"
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            YPO Marcoms
          </span>
        </div>
      </div>

      {/* Hero content */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-center mx-auto w-full"
        style={{
          maxWidth: 1400,
          padding: "0 clamp(24px, 6vw, 96px)",
        }}
      >
        {/* Eyebrow */}
        <p
          className="font-bold uppercase mb-6"
          style={{
            fontSize: 12,
            letterSpacing: "0.18em",
            color: "#9D88ED",
          }}
        >
          JOY &middot; TRUST &middot; POWER &middot; PARTNERSHIP
        </p>

        {/* H1 */}
        <h1
          className="font-extrabold mb-6"
          style={{
            fontSize: "clamp(40px, 6vw, 60px)",
            lineHeight: 1.06,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="text-white">How are you showing up?</span>
          <br />
          <span style={{ color: "#9D88ED" }}>
            Find out — then ask the people you work with.
          </span>
        </h1>

        {/* Subhead */}
        <p
          className="mb-10"
          style={{
            fontSize: 19,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.82)",
            maxWidth: 600,
          }}
        >
          A 3-minute read on the behaviors that activate this team. Rate
          yourself, then invite a few peers. You&apos;ll see where you line
          up — and where your blind spots are.
        </p>

        {/* Magic link form */}
        {state === "sent" ? (
          <div className="mb-8" style={{ maxWidth: 600 }}>
            <div
              className="flex items-start gap-3 rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <svg
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#9D88ED"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Check your inbox. We sent a sign-in link to{" "}
                  <strong className="text-white">{email}</strong> — it expires
                  in 15 minutes.
                </p>
                <button
                  onClick={() => {
                    setState("idle");
                    setEmail("");
                    setErrorMsg("");
                  }}
                  className="mt-3 text-[#9D88ED] hover:underline"
                  style={{ fontSize: 14 }}
                >
                  Use a different email
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mb-3" style={{ maxWidth: 600 }}>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="ypo-email"
                type="email"
                placeholder="you@ypo.org"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error" || state === "rate_limited") {
                    setState("idle");
                    setErrorMsg("");
                  }
                }}
                className="flex-1 outline-none transition-all"
                style={{
                  height: 56,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "#fff",
                  fontSize: 16,
                  padding: "0 18px",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#9D88ED";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(157,136,237,0.25)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                autoComplete="email"
                autoFocus
              />
              <button
                type="submit"
                disabled={isDisabled}
                className="font-bold uppercase transition-all disabled:cursor-not-allowed"
                style={{
                  height: 56,
                  borderRadius: 12,
                  background: "#E055CB",
                  color: "#fff",
                  fontSize: 14,
                  letterSpacing: "0.1em",
                  padding: "0 28px",
                  opacity: isDisabled ? 0.55 : 1,
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isDisabled)
                    e.currentTarget.style.background = "#DD66E5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#E055CB";
                }}
              >
                {state === "sending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    SENDING&hellip;
                  </span>
                ) : (
                  "EMAIL ME A LINK"
                )}
              </button>
            </div>

            {/* Helper / error text */}
            <p
              className="mt-3"
              style={{
                fontSize: 13.5,
                color:
                  state === "error" || state === "rate_limited"
                    ? "#FFC28A"
                    : "rgba(255,255,255,0.55)",
              }}
            >
              {errorMsg ||
                "We\u2019ll email a secure sign-in link. YPO members only."}
            </p>
          </form>
        )}

        {/* Meta row */}
        <div
          className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-4"
          style={{ fontSize: 13.5, color: "rgba(255,255,255,0.7)" }}
        >
          {CIRCLE_COLORS.map((c, i) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <span
                className="inline-block rounded-full"
                style={{
                  width: 9,
                  height: 9,
                  background: c.color,
                }}
              />
              {c.label}
              {i < CIRCLE_COLORS.length - 1 && (
                <span className="ml-1">&nbsp;</span>
              )}
            </span>
          ))}
          <span style={{ color: "rgba(255,255,255,0.35)" }}>&middot;</span>
          <span>12 behaviors</span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>&middot;</span>
          <span>6-point scale</span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>&middot;</span>
          <span>~3 min</span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>&middot;</span>
          <span>private to you</span>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="relative z-10 h-16" />
    </div>
  );
}
