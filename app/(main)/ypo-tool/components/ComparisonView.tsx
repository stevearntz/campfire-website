"use client";

import { useState, useEffect, useRef } from "react";
import {
  CIRCLES,
  circleSum,
  peerItemText,
  peerFeedbackText,
  type Responses,
} from "../lib/behaviors";
import { SCALE_LABELS } from "../lib/constants";
import RadarChart from "./RadarChart";

interface ComparisonData {
  self: Record<string, number>;
  peer: Record<string, number>;
  peerCount: number;
}

interface PeerDetail {
  id: number;
  name: string | null;
  status: "in_progress" | "complete";
  completedAt: string | null;
  answers: Record<string, number>;
  feedback: Record<string, string>;
}

const GAP_THRESHOLD = 0.10;

export default function ComparisonView({
  responses,
  onBack,
  rateeFirstName,
  roundId,
}: {
  responses: Responses;
  onBack: () => void;
  rateeFirstName?: string;
  /** When set, compare a specific past round instead of the current one. */
  roundId?: string | null;
}) {
  const [data, setData] = useState<ComparisonData | null>(null);
  const [peers, setPeers] = useState<PeerDetail[]>([]);
  // Peer cards are expanded by default so results are visible on arrival;
  // clicking a name collapses/expands that peer.
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Deep-link support: /compare?peer=<id> scrolls to and highlights that
  // peer's card (e.g. clicking a name on the invite screen). Read once from
  // the URL at init so no synchronous setState-in-effect is needed.
  const [focusPeerId] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const p = new URLSearchParams(window.location.search).get("peer");
    return p && !Number.isNaN(Number(p)) ? Number(p) : null;
  });
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const peerRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

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
    const q = roundId ? `?round=${encodeURIComponent(roundId)}` : "";
    async function load() {
      try {
        const res = await fetch(`/api/ypo-tool/comparison/current${q}`);
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

        // Fetch attributed per-peer detail (names, individual answers, notes)
        try {
          const detailRes = await fetch(`/api/ypo-tool/peer-responses${q}`);
          if (detailRes.ok) {
            const detail = await detailRes.json();
            const list: PeerDetail[] = detail.peers || [];
            setPeers(list);
            // Expand every peer by default so results are visible immediately.
            setOpenIds(new Set(list.map((p) => p.id)));
          }
        } catch {
          // detail is best-effort; aggregate still renders
        }
      } catch {
        setError("Could not load comparison data.");
      }
      setLoading(false);
    }
    load();
  }, [roundId]);

  // Once peers are loaded, scroll the deep-linked peer into view (expanded,
  // with a brief highlight that fades).
  useEffect(() => {
    if (focusPeerId == null || peers.length === 0) return;
    if (!peers.some((p) => p.id === focusPeerId)) return;
    setOpenIds((prev) => new Set(prev).add(focusPeerId));
    setHighlightId(focusPeerId);
    const scrollT = setTimeout(() => {
      peerRefs.current
        .get(focusPeerId)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
    const fadeT = setTimeout(() => setHighlightId(null), 2800);
    return () => {
      clearTimeout(scrollT);
      clearTimeout(fadeT);
    };
  }, [focusPeerId, peers]);

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

  // Self-Concept: how your self-view calibrates against your peers'. Rather
  // than going blank when there's no blind spot, it always says something
  // true — you over-rate somewhere, you're modest, or you're right in step.
  const joinCircles = (arr: string[]) =>
    arr.length <= 1
      ? arr[0] || ""
      : arr.length === 2
        ? `${arr[0]} and ${arr[1]}`
        : `${arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
  const underratedTitles = negativeGaps.map((g) => g.title);
  const selfConcept = blindSpot
    ? {
        title: blindSpot.title,
        body: "You rate yourself higher here than your peers do — a possible blind spot.",
        barColor: blindSpot.color,
      }
    : underratedTitles.length > 0
      ? {
          title: "Modest self-view",
          body: `Your peers rated you higher than you rated yourself — on ${joinCircles(underratedTitles)}.`,
          barColor: "#E055CB",
        }
      : {
          title: "Right in step",
          body: "You see yourself much as your peers do.",
          barColor: "#E7E3EE",
        };

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
            Self vs. Peer &middot; Full transparency
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
              {/* Self-Concept card */}
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
                    background: selfConcept.barColor,
                  }}
                />
                <div className="pl-3">
                  <p
                    className="font-bold uppercase mb-1"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      color: "#6E3FCC",
                    }}
                  >
                    Self-Concept
                  </p>
                  <h3
                    className="font-extrabold mb-1"
                    style={{ fontSize: 20, color: "#1E2A4A" }}
                  >
                    {selfConcept.title}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.5, color: "#636B7C" }}>
                    {selfConcept.body}
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

        {/* Individual peer responses — full attribution */}
        <div className="mb-12">
          <h2
            className="font-extrabold mb-1"
            style={{ fontSize: 22, color: "#1E2A4A" }}
          >
            What each peer said
          </h2>
          <p
            className="mb-6"
            style={{ fontSize: 15, lineHeight: 1.6, color: "#636B7C", maxWidth: 620 }}
          >
            Every response is attributed. Expand a name to see their individual
            ratings and notes.
          </p>

          {peers.length === 0 ? (
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: "#F8F6FB", border: "1px solid #EEE9F6" }}
            >
              <p style={{ fontSize: 14, color: "#A8A2B3" }}>
                No individual responses to show yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {peers.map((peer) => {
                const name = peer.name || "Unnamed peer";
                const initials = name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);
                const isOpen = openIds.has(peer.id);
                const answeredCount = Object.keys(peer.answers).length;

                const isHighlighted = highlightId === peer.id;

                return (
                  <div
                    key={peer.id}
                    ref={(el) => {
                      peerRefs.current.set(peer.id, el);
                    }}
                    className="rounded-2xl overflow-hidden transition-all duration-500"
                    style={{
                      background: "#fff",
                      border: `1px solid ${isHighlighted ? "#9D88ED" : "#EEE9F6"}`,
                      boxShadow: isHighlighted
                        ? "0 0 0 3px rgba(157,136,237,0.28)"
                        : "none",
                      scrollMarginTop: 120,
                    }}
                  >
                    {/* Header row */}
                    <button
                      onClick={() =>
                        setOpenIds((prev) => {
                          const next = new Set(prev);
                          if (next.has(peer.id)) next.delete(peer.id);
                          else next.add(peer.id);
                          return next;
                        })
                      }
                      className="w-full flex items-center gap-3 px-5 py-4 text-left cursor-pointer transition-colors hover:bg-[#FAF8FD]"
                    >
                      <div
                        className="flex items-center justify-center rounded-full flex-shrink-0 font-bold"
                        style={{
                          width: 36,
                          height: 36,
                          background: "#F3EFFA",
                          color: "#6E3FCC",
                          fontSize: 13,
                        }}
                      >
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className="font-bold block truncate"
                          style={{ fontSize: 15, color: "#1E2A4A" }}
                        >
                          {name}
                        </span>
                        <span style={{ fontSize: 12.5, color: "#A8A2B3" }}>
                          {peer.status === "complete"
                            ? "Completed all 12"
                            : `In progress · ${answeredCount} of 12`}
                        </span>
                      </div>
                      <span
                        className="flex-shrink-0 font-bold uppercase"
                        style={{ fontSize: 10, letterSpacing: "0.1em", color: "#6E3FCC" }}
                      >
                        {isOpen ? "Hide" : "Show"}
                      </span>
                      <svg
                        className="w-5 h-5 flex-shrink-0 transition-transform"
                        style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#6E3FCC"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </button>

                    {/* Expanded detail */}
                    {isOpen && (
                      <div
                        className="px-5 pb-5 pt-1 space-y-6"
                        style={{ borderTop: "1px solid #F1EEF6" }}
                      >
                        {CIRCLES.map((circle) => {
                          const note = peer.feedback[circle.key];
                          return (
                            <div key={circle.key} className="pt-4">
                              <div className="flex items-center gap-2 mb-3">
                                <span
                                  className="inline-block w-2.5 h-2.5 rounded-full"
                                  style={{ background: circle.color }}
                                />
                                <span
                                  className="font-bold uppercase"
                                  style={{
                                    fontSize: 11,
                                    letterSpacing: "0.1em",
                                    color: circle.colorDark,
                                  }}
                                >
                                  {circle.title}
                                </span>
                              </div>

                              <div className="space-y-2.5">
                                {circle.items.map((item) => {
                                  const v = peer.answers[item.key];
                                  return (
                                    <div
                                      key={item.key}
                                      className="flex items-start justify-between gap-4"
                                    >
                                      <span
                                        style={{
                                          fontSize: 14,
                                          lineHeight: 1.45,
                                          color: "#636B7C",
                                        }}
                                      >
                                        {peerItemText(item, rateeFirstName)}
                                      </span>
                                      <span
                                        className="flex-shrink-0 font-bold text-right"
                                        style={{
                                          fontSize: 13,
                                          color: v ? circle.colorDark : "#C9C4D4",
                                          minWidth: 118,
                                        }}
                                      >
                                        {v ? `${v} · ${SCALE_LABELS[v - 1]}` : "—"}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>

                              {note && (
                                <div
                                  className="mt-3 rounded-xl p-3.5"
                                  style={{ background: circle.wash }}
                                >
                                  <p
                                    className="font-bold uppercase mb-1"
                                    style={{
                                      fontSize: 9.5,
                                      letterSpacing: "0.12em",
                                      color: circle.colorDark,
                                    }}
                                  >
                                    {peerFeedbackText(circle, rateeFirstName)}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: 14,
                                      lineHeight: 1.55,
                                      color: "#1E2A4A",
                                    }}
                                  >
                                    “{note}”
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
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
