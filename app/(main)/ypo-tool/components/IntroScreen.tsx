"use client";

import { useState } from "react";

/**
 * Landing/onboarding for the signed-in member: explains the flow and captures
 * a required name before the self-assessment starts.
 */
export default function IntroScreen({
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
