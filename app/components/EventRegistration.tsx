"use client";

import { useState, FormEvent } from "react";

interface Props {
  eventId: string;
  eventName: string;
}

export default function EventRegistration({ eventId, eventName }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "already" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus(data.alreadyRegistered ? "already" : "success");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success" || status === "already") {
    return (
      <div className="mt-5 animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5">
          <svg
            className="w-4 h-4 text-green-600 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          <span className="text-green-800 font-semibold text-sm">
            {status === "already"
              ? "You're already registered!"
              : `You're in! See you at ${eventName}.`}
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC] transition-colors"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          className="px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC] transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center justify-center px-6 h-10 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide disabled:opacity-70 shrink-0"
        >
          {status === "loading" ? "Registering..." : "Register"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
      )}
    </form>
  );
}
