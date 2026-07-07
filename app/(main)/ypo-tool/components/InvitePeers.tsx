"use client";

import { useState, useEffect, useCallback } from "react";

interface Rater {
  name: string | null;
  status: "in_progress" | "complete";
}

export default function InvitePeers({
  onBack,
  onViewComparison,
}: {
  onBack: () => void;
  onViewComparison: () => void;
}) {
  const [inviteUrl, setInviteUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [raters, setRaters] = useState<Rater[]>([]);
  const [respondedCount, setRespondedCount] = useState(0);
  const [canViewAggregate, setCanViewAggregate] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/ypo-tool/invite/status");
      const data = await res.json();
      setRaters(data.raters || []);
      setRespondedCount(data.respondedCount || 0);
      setCanViewAggregate(data.canViewAggregate || false);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    async function init() {
      try {
        // Create or get invite
        const res = await fetch("/api/ypo-tool/invite", { method: "POST" });
        const data = await res.json();
        setInviteUrl(data.url || "");
      } catch {
        // ignore
      }
      await fetchStatus();
      setLoading(false);
    }
    init();
  }, [fetchStatus]);

  // Poll status every 15s
  useEffect(() => {
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = inviteUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const totalCount = raters.length;

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#9D88ED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-10">
          <p
            className="font-bold uppercase mb-4"
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "#6E3FCC",
            }}
          >
            Invite Peers
          </p>

          <h1
            className="font-extrabold mb-3"
            style={{
              fontSize: "clamp(28px, 4vw, 38px)",
              lineHeight: 1.1,
              color: "#1E2A4A",
            }}
          >
            Bring in your peers
          </h1>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "#636B7C",
              maxWidth: 640,
            }}
          >
            Share one link. Each peer rates the same 12 behaviors about you and
            leaves a short note in each area. You&apos;ll see every response —
            with their name attached.
          </p>
        </div>

        {/* Two columns */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-12">
          {/* Left — Your private link */}
          <div className="flex-1">
            <p
              className="font-bold uppercase mb-3"
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "#636B7C",
              }}
            >
              Your Private Link
            </p>

            <div
              className="flex items-center gap-3 rounded-xl p-4 mb-3"
              style={{
                background: "#F8F6FB",
                border: "1px solid #EEE9F6",
              }}
            >
              {/* Lock icon */}
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#A8A2B3"
                strokeWidth={2}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>

              <span
                className="flex-1 truncate select-all"
                style={{ fontSize: 14, color: "#636B7C" }}
              >
                {inviteUrl}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="font-bold uppercase transition-all"
              style={{
                height: 44,
                borderRadius: 12,
                background: copied ? "#1F8A5B" : "#6E3FCC",
                color: "#fff",
                fontSize: 13,
                letterSpacing: "0.08em",
                padding: "0 24px",
              }}
            >
              {copied ? "Copied \u2713" : "Copy link"}
            </button>

            <p
              className="mt-4"
              style={{ fontSize: 13.5, lineHeight: 1.6, color: "#A8A2B3" }}
            >
              Aim for 3–6 peers for a balanced read. You&apos;ll see each
              peer&apos;s name, ratings, and notes.
            </p>
          </div>

          {/* Right — Responses */}
          <div className="flex-1">
            <p
              className="font-bold uppercase mb-3"
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "#636B7C",
              }}
            >
              Responses &middot; {respondedCount} of {totalCount || "—"}
            </p>

            {raters.length === 0 ? (
              <div
                className="rounded-xl p-6 text-center"
                style={{
                  background: "#F8F6FB",
                  border: "1px solid #EEE9F6",
                }}
              >
                <p style={{ fontSize: 14, color: "#A8A2B3" }}>
                  No responses yet. Share your link to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {raters.map((rater, i) => {
                  const name = rater.name || "Unnamed peer";
                  const initials = name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);
                  const isComplete = rater.status === "complete";

                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{
                        background: "#F8F6FB",
                        border: "1px solid #EEE9F6",
                      }}
                    >
                      {/* Avatar */}
                      <div
                        className="flex items-center justify-center rounded-full flex-shrink-0 font-bold"
                        style={{
                          width: 34,
                          height: 34,
                          background: "#F3EFFA",
                          color: "#6E3FCC",
                          fontSize: 12,
                        }}
                      >
                        {initials}
                      </div>

                      {/* Name */}
                      <span
                        className="flex-1 font-medium"
                        style={{ fontSize: 14, color: "#1E2A4A" }}
                      >
                        {name}
                      </span>

                      {/* Status chip */}
                      <span
                        className="font-bold uppercase rounded-full px-3 py-1"
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.08em",
                          color: isComplete ? "#1F8A5B" : "#B7B2C0",
                          background: isComplete
                            ? "rgba(31,138,91,0.1)"
                            : "rgba(183,178,192,0.15)",
                        }}
                      >
                        {isComplete ? "Responded" : "Pending"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {!canViewAggregate && totalCount > 0 && (
              <p
                className="mt-3"
                style={{ fontSize: 13, color: "#A8A2B3" }}
              >
                Waiting for at least one peer to finish. Results unlock as soon
                as someone completes.
              </p>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-[#EEE9F6]">
          <button
            onClick={onViewComparison}
            disabled={!canViewAggregate}
            className="font-bold uppercase transition-opacity disabled:cursor-not-allowed"
            style={{
              height: 54,
              borderRadius: 14,
              background: canViewAggregate ? "#6E3FCC" : "#E7E3EE",
              color: canViewAggregate ? "#fff" : "#A8A2B3",
              fontSize: 14,
              letterSpacing: "0.08em",
              padding: "0 32px",
              opacity: canViewAggregate ? 1 : 0.7,
            }}
            title={
              canViewAggregate
                ? undefined
                : "Available once a peer completes their response"
            }
          >
            See peer feedback &rarr;
          </button>

          <button
            onClick={onBack}
            className="font-bold uppercase transition-colors"
            style={{
              height: 54,
              borderRadius: 14,
              background: "transparent",
              border: "1px solid #E7E3EE",
              color: "#636B7C",
              fontSize: 14,
              letterSpacing: "0.08em",
              padding: "0 28px",
            }}
          >
            Back to results
          </button>
        </div>
      </div>
    </div>
  );
}
