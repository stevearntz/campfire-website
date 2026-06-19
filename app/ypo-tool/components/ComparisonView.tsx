"use client";

import { useState, useEffect } from "react";
import { CIRCLES, circleSum, type Responses } from "../lib/behaviors";
import RadarChart from "./RadarChart";

interface ComparisonData {
  self: Record<string, number>;
  peer: Record<string, number>;
  peerCount: number;
}

const GAP_THRESHOLD = 0.10;

export default function ComparisonView({
  responses,
  onBack,
}: {
  responses: Responses;
  onBack: () => void;
}) {
  const [data, setData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Self scores from local responses
  const selfScores: Record<string, number> = {};
  for (const circle of CIRCLES) {
    selfScores[circle.key] = circleSum(circle, responses);
  }

  // Strength/growth picks (pre-filled from self, overridable)
  const selfSums = CIRCLES.map((c) => selfScores[c.key]);
  const defaultStrengthIdx = selfSums.indexOf(Math.max(...selfSums));
  const defaultGrowthIdx = selfSums.indexOf(Math.min(...selfSums));

  const [strengthPick, setStrengthPick] = useState(CIRCLES[defaultStrengthIdx].key);
  const [growthPick, setGrowthPick] = useState(CIRCLES[defaultGrowthIdx].key);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/ypo-tool/comparison/current");
        if (res.status === 409) {
          setError("Not enough peer responses yet.");
          setLoading(false);
          return;
        }
        if (!res.ok) {
          setError("Could not load comparison data.");
          setLoading(false);
          return;
        }
        const json = await res.json();
        setData(json);
      } catch {
        setError("Could not load comparison data.");
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#9D88ED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-white flex items-center justify-center px-6">
        <div className="text-center" style={{ maxWidth: 480 }}>
          <h2
            className="font-extrabold mb-3"
            style={{ fontSize: 24, color: "#1E2A4A" }}
          >
            {error || "Something went wrong"}
          </h2>
          <button
            onClick={onBack}
            className="mt-4 font-bold uppercase"
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
    );
  }

  const peerScores = data.peer;
  const peerCount = data.peerCount;

  // Gap analysis: d = selfSum/18 - peerAvg/18
  const gaps = CIRCLES.map((c) => ({
    key: c.key,
    title: c.title,
    color: c.color,
    d: selfScores[c.key] / 18 - (peerScores[c.key] || 0) / 18,
  }));

  // Blind spot: largest positive d >= threshold
  const positiveGaps = gaps.filter((g) => g.d >= GAP_THRESHOLD);
  const blindSpot = positiveGaps.length > 0
    ? positiveGaps.reduce((a, b) => (a.d > b.d ? a : b))
    : null;

  // Hidden strength: most negative d <= -threshold
  const negativeGaps = gaps.filter((g) => g.d <= -GAP_THRESHOLD);
  const hiddenStrength = negativeGaps.length > 0
    ? negativeGaps.reduce((a, b) => (a.d < b.d ? a : b))
    : null;

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
              color: "#A8A2B3",
            }}
          >
            Self vs. Peer &middot; Private to you
          </p>

          <h1
            className="font-extrabold mb-3"
            style={{
              fontSize: "clamp(28px, 4vw, 38px)",
              lineHeight: 1.1,
              color: "#1E2A4A",
            }}
          >
            Where you line up
          </h1>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "#636B7C",
              maxWidth: 640,
            }}
          >
            Your self-view in purple, your peers&apos; aggregated read in pink.
            The gaps are where the conversation lives.
          </p>
        </div>

        {/* Radar + Insight stack */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-12">
          {/* Radar (fixed left) */}
          <div className="flex-shrink-0">
            {/* Legend */}
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block rounded-sm"
                  style={{ width: 16, height: 4, background: "#6E3FCC" }}
                />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1E2A4A" }}>
                  You
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block rounded-sm"
                  style={{ width: 16, height: 4, background: "#E055CB" }}
                />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1E2A4A" }}>
                  Peers &middot; avg of {peerCount}
                </span>
              </div>
            </div>

            <RadarChart responses={responses} peerScores={peerScores} />
          </div>

          {/* Right — Insight stack */}
          <div className="flex-1 space-y-6">
            {/* Gap cards — side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Blind spot card */}
              <div
                className="relative rounded-2xl px-5 py-4"
                style={{
                  background: "#F8F6FB",
                  border: "1px solid #EEE9F6",
                }}
              >
                <div
                  className="absolute left-0 top-4 bottom-4 rounded-full"
                  style={{
                    width: 4,
                    background: blindSpot?.color || "#E7E3EE",
                  }}
                />
                <div className="pl-3">
                  <p
                    className="font-bold uppercase mb-1"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      color: "#B23B9F",
                    }}
                  >
                    Possible Blind Spot
                  </p>
                  <h3
                    className="font-extrabold mb-1"
                    style={{ fontSize: 20, color: "#1E2A4A" }}
                  >
                    {blindSpot?.title || "In sync"}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.5, color: "#636B7C" }}>
                    {blindSpot
                      ? "You rate yourself higher here than your peers do."
                      : "You and your peers see this about the same."}
                  </p>
                </div>
              </div>

              {/* Hidden strength card */}
              <div
                className="relative rounded-2xl px-5 py-4"
                style={{
                  background: "#F8F6FB",
                  border: "1px solid #EEE9F6",
                }}
              >
                <div
                  className="absolute left-0 top-4 bottom-4 rounded-full"
                  style={{
                    width: 4,
                    background: hiddenStrength?.color || "#E7E3EE",
                  }}
                />
                <div className="pl-3">
                  <p
                    className="font-bold uppercase mb-1"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      color: "#1F8A5B",
                    }}
                  >
                    Hidden Strength
                  </p>
                  <h3
                    className="font-extrabold mb-1"
                    style={{ fontSize: 20, color: "#1E2A4A" }}
                  >
                    {hiddenStrength?.title || "In sync"}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.5, color: "#636B7C" }}>
                    {hiddenStrength
                      ? "Your peers rate you higher than you rate yourself."
                      : "You and your peers see this about the same."}
                  </p>
                </div>
              </div>
            </div>

            {/* Per-circle breakdown */}
            <div className="space-y-3 pt-2">
              {CIRCLES.map((circle) => {
                const selfVal = selfScores[circle.key];
                const peerVal = peerScores[circle.key] || 0;
                const selfPct = Math.round((selfVal / 18) * 100);
                const peerPct = Math.round((peerVal / 18) * 100);

                return (
                  <div key={circle.key} className="flex items-center gap-3">
                    <span
                      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: circle.color }}
                    />
                    <span
                      className="font-bold flex-shrink-0"
                      style={{ fontSize: 13, color: "#1E2A4A", width: 90 }}
                    >
                      {circle.title}
                    </span>

                    {/* Stacked bars */}
                    <div className="flex-1 space-y-1">
                      {/* Self bar */}
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: "#F1EEF6" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${selfPct}%`,
                            background: circle.color,
                          }}
                        />
                      </div>
                      {/* Peer bar */}
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: "#F1EEF6" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${peerPct}%`,
                            background: circle.color,
                            opacity: 0.45,
                          }}
                        />
                      </div>
                    </div>

                    {/* Numbers */}
                    <div
                      className="flex-shrink-0 text-right"
                      style={{ width: 100 }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 700, color: circle.colorDark }}>
                        You {selfVal}{" "}
                        <span style={{ fontWeight: 400, color: "#A8A2B3" }}>/ 18</span>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#E055CB" }}>
                        Peers {peerVal.toFixed(1)}{" "}
                        <span style={{ fontWeight: 400, color: "#A8A2B3" }}>/ 18</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Conversation bridge */}
        <div
          className="rounded-2xl p-8 mb-10"
          style={{ background: "#F8F6FB", border: "1px solid #EEE9F6" }}
        >
          <h2
            className="font-extrabold mb-3"
            style={{ fontSize: 22, color: "#1E2A4A" }}
          >
            Take this into your conversation.
          </h2>
          <p
            className="mb-6"
            style={{
              fontSize: 15,
              lineHeight: 1.65,
              color: "#636B7C",
              maxWidth: 560,
            }}
          >
            Pick one <strong>strength</strong> to keep leaning on and one{" "}
            <strong>growth area</strong> to work — that&apos;s what you&apos;ll
            bring to your accountability partner before August.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
            {/* Strength pick */}
            <div>
              <label
                className="block font-bold uppercase mb-2"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  color: "#1F8A5B",
                }}
              >
                Strength to lean on
              </label>
              <select
                value={strengthPick}
                onChange={(e) => setStrengthPick(e.target.value)}
                className="w-full outline-none transition-all cursor-pointer"
                style={{
                  height: 44,
                  borderRadius: 12,
                  background: "#fff",
                  border: "1px solid #EEE9F6",
                  color: "#1E2A4A",
                  fontSize: 15,
                  fontWeight: 700,
                  padding: "0 14px",
                }}
              >
                {CIRCLES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Growth pick */}
            <div>
              <label
                className="block font-bold uppercase mb-2"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  color: "#B23B9F",
                }}
              >
                Growth area to work
              </label>
              <select
                value={growthPick}
                onChange={(e) => setGrowthPick(e.target.value)}
                className="w-full outline-none transition-all cursor-pointer"
                style={{
                  height: 44,
                  borderRadius: 12,
                  background: "#fff",
                  border: "1px solid #EEE9F6",
                  color: "#1E2A4A",
                  fontSize: 15,
                  fontWeight: 700,
                  padding: "0 14px",
                }}
              >
                {CIRCLES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-[#EEE9F6]">
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
            Back to your results
          </button>

          <button
            onClick={() => alert("Download summary is coming soon.")}
            className="font-bold uppercase transition-colors"
            style={{
              height: 54,
              borderRadius: 14,
              background: "transparent",
              border: "1px solid #E7E3EE",
              color: "#A8A2B3",
              fontSize: 14,
              letterSpacing: "0.08em",
              padding: "0 28px",
            }}
          >
            Download summary
          </button>
        </div>
      </div>
    </div>
  );
}
