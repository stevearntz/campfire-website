"use client";

import { useState, FormEvent } from "react";
import { trackEvent } from "@/app/lib/analytics";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      trackEvent("newsletter_subscribe", { location: "cta_banner" });
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="animate-fade-in text-center">
        <div className="inline-flex items-center gap-3 bg-white/15 rounded-full px-6 py-3">
          <svg className="w-5 h-5 text-green-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span className="text-white font-semibold text-sm">
            Check your email to confirm your subscription
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <div className="flex w-full max-w-md rounded-lg overflow-hidden shadow-lg">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            aria-label="Email address"
            className="flex-1 px-5 py-3.5 text-sm text-gray-900 bg-white outline-none placeholder:text-gray-400 min-w-0"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3.5 text-sm font-semibold leading-none text-white hover:opacity-90 transition-opacity uppercase tracking-wide shrink-0 disabled:opacity-70"
            style={{ backgroundColor: "#E055CB" }}
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </div>
      </form>
      {status === "error" && (
        <p className="text-red-300 text-sm text-center mt-3">{errorMsg}</p>
      )}
    </div>
  );
}
