"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <h4 className="text-white font-semibold text-sm mb-2">
        Subscribe to our newsletter
      </h4>
      <p className="text-sm mb-4">Get weekly insights on leadership.</p>
      {status === "success" ? (
        <p className="text-sm text-green-400">{message}</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex items-stretch gap-0 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              className="flex-1 min-w-0 px-3 py-2 text-xs text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 px-4 text-xs font-semibold text-white bg-[#6E3FCC] hover:bg-[#5B34AB] transition-colors uppercase tracking-wide disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
          {status === "error" && (
            <p className="text-sm text-red-400 mt-2">{message}</p>
          )}
        </>
      )}
    </div>
  );
}
