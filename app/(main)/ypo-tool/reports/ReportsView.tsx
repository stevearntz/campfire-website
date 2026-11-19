"use client";

import { useEffect, useState } from "react";
import type { TeamAggregate, CircleAgg } from "./lib/aggregate";

const SELF = "#6E3FCC";
const PEER = "#E055CB";

const SECTIONS = [
  { id: "overview", label: "Where the group stands" },
  { id: "behaviors", label: "The twelve behaviors" },
];

// ── Radar geometry (Joy top, Trust right, Power bottom, Partnership left) ──
const SIZE = 300;
const CXY = SIZE / 2;
const RAD = SIZE / 2 - 54;
const ANGLES = [-90, 0, 90, 180];
const rad = (d: number) => (d * Math.PI) / 180;
const xy = (ang: number, r: number): [number, number] => [
  CXY + r * Math.cos(rad(ang)),
  CXY + r * Math.sin(rad(ang)),
];
const poly = (vals: number[]) =>
  vals.map((v, i) => xy(ANGLES[i], Math.max(v / 18, 0.02) * RAD).join(",")).join(" ");
const ring = (scale: number) => ANGLES.map((a) => xy(a, scale * RAD).join(",")).join(" ");

function gapLabel(gap: number): { text: string; color: string; bg: string } {
  if (gap >= 0.5) return { text: "Team rates itself higher", color: "#B23B9F", bg: "#FBEEF8" };
  if (gap <= -0.5) return { text: "Peers rate higher", color: "#1F8A8A", bg: "#E9F6F6" };
  return { text: "In step", color: "#636B7C", bg: "#F3F1F8" };
}

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ height: 8, borderRadius: 4, background: "#EEE9F6", overflow: "hidden" }}>
      <div style={{ width: `${(value / 18) * 100}%`, height: "100%", background: color, borderRadius: 4 }} />
    </div>
  );
}

function Dot({ pos, color }: { pos: number; color: string }) {
  return (
    <div
      style={{
        position: "absolute", top: 3, left: `${pos}%`, transform: "translateX(-50%)",
        width: 12, height: 12, borderRadius: "50%", background: color,
        border: "2px solid #fff", boxShadow: `0 0 0 1px ${color}`,
      }}
    />
  );
}
function BehaviorTrack({ self, peer, showSelf }: { self: number; peer: number; showSelf: boolean }) {
  const pos = (v: number) => ((Math.max(1, Math.min(6, v)) - 1) / 5) * 100;
  const s = pos(self), p = pos(peer);
  const lo = Math.min(s, p), hi = Math.max(s, p);
  return (
    <div style={{ position: "relative", height: 18, padding: "0 6px" }}>
      <div style={{ position: "relative", height: "100%" }}>
        <div style={{ position: "absolute", top: 8, left: 0, right: 0, height: 2, background: "#EEE9F6", borderRadius: 2 }} />
        {showSelf && (
          <div style={{ position: "absolute", top: 8, left: `${lo}%`, width: `${hi - lo}%`, height: 2, background: "#D9D2EA" }} />
        )}
        <Dot pos={p} color={PEER} />
        {showSelf && <Dot pos={s} color={SELF} />}
      </div>
    </div>
  );
}

function Switch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      style={{
        width: 36, height: 20, borderRadius: 999, flex: "none",
        background: on ? SELF : "#D9D2EA", position: "relative", transition: "background .15s",
      }}
    >
      <span
        style={{
          position: "absolute", top: 2, left: on ? 18 : 2, width: 16, height: 16,
          borderRadius: "50%", background: "#fff", transition: "left .15s",
          boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
        }}
      />
    </button>
  );
}

function ValueCard({ c, showSelf }: { c: CircleAgg; showSelf: boolean }) {
  const g = gapLabel(c.gap);
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#fff", border: "1px solid #EEE9F6", boxShadow: "0 14px 30px -26px rgba(28,19,52,0.35)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: c.color, display: "inline-block" }} />
        <span className="font-extrabold" style={{ fontSize: 18, color: "#1E2A4A" }}>{c.title}</span>
        {showSelf && (
          <span
            className="ml-auto font-bold uppercase"
            style={{ fontSize: 10.5, letterSpacing: "0.04em", color: g.color, background: g.bg, padding: "4px 9px", borderRadius: 999 }}
          >
            {g.text}
          </span>
        )}
      </div>

      {showSelf && (
        <>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold" style={{ fontSize: 12.5, color: SELF }}>You (self)</span>
            <span className="font-extrabold tabular-nums" style={{ fontSize: 14, color: "#1E2A4A" }}>
              {c.selfSum.toFixed(1)} <span style={{ color: "#A8A2B3", fontWeight: 400 }}>/ 18</span>
            </span>
          </div>
          <div className="mb-3"><Bar value={c.selfSum} color={SELF} /></div>
        </>
      )}

      <div className="flex items-center justify-between mb-1.5">
        <span className="font-bold" style={{ fontSize: 12.5, color: PEER }}>Peers</span>
        <span className="font-extrabold tabular-nums" style={{ fontSize: 14, color: "#1E2A4A" }}>
          {c.peerSum.toFixed(1)} <span style={{ color: "#A8A2B3", fontWeight: 400 }}>/ 18</span>
        </span>
      </div>
      <div className={showSelf ? "mb-3" : ""}><Bar value={c.peerSum} color={PEER} /></div>

      {showSelf && (
        <div style={{ fontSize: 12.5, color: "#636B7C" }}>
          Gap{" "}
          <span className="font-bold tabular-nums" style={{ color: "#1E2A4A" }}>
            {c.gap > 0 ? "+" : ""}{c.gap.toFixed(1)}
          </span>
        </div>
      )}
    </div>
  );
}

export default function ReportsView({ data }: { data: TeamAggregate }) {
  const { coverage, circles } = data;
  const [showSelf, setShowSelf] = useState(true);
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const selfPts = poly(circles.map((c) => c.selfSum));
  const peerPts = poly(circles.map((c) => c.peerSum));
  const sectionStyle = { scrollMarginTop: 120 } as const;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-12 md:pt-16">
        <p className="font-bold uppercase mb-3" style={{ fontSize: 11, letterSpacing: "0.14em", color: "#6E3FCC" }}>
          Activating Behaviors · Team Reports
        </p>
        <h1 className="font-extrabold mb-3" style={{ fontSize: "clamp(28px, 4.5vw, 42px)", lineHeight: 1.05, color: "#1E2A4A" }}>
          Where the group stands
        </h1>
        <div
          className="flex flex-wrap gap-x-6 gap-y-1 rounded-xl px-4 py-3 mb-8"
          style={{ background: "#F8F6FB", border: "1px solid #EEE9F6", fontSize: 13.5, color: "#636B7C" }}
        >
          <span><b style={{ color: "#1E2A4A" }}>{coverage.members}</b> members</span>
          <span><b style={{ color: "#1E2A4A" }}>{coverage.peerResponses}</b> peer responses</span>
          <span>avg <b style={{ color: "#1E2A4A" }}>{coverage.avgPeers}</b> peers / member</span>
          <span className="ml-auto" style={{ color: "#A8A2B3" }}>as of {coverage.asOf}</span>
        </div>
      </div>

      {/* Sticky section nav + toggle */}
      <div
        className="sticky z-30 border-b"
        style={{ top: 64, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(6px)", borderColor: "#EEE9F6" }}
      >
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-5" style={{ height: 48, overflowX: "auto" }}>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => jump(s.id)}
              className="whitespace-nowrap transition-colors"
              style={{ fontSize: 13, fontWeight: active === s.id ? 700 : 500, color: active === s.id ? "#6E3FCC" : "#636B7C" }}
            >
              {s.label}
            </button>
          ))}
          <label className="ml-auto flex items-center gap-2 whitespace-nowrap" style={{ cursor: "pointer" }}>
            <Switch on={showSelf} onChange={setShowSelf} />
            <span style={{ fontSize: 12.5, fontWeight: 600, color: showSelf ? "#1E2A4A" : "#A8A2B3" }}>
              Compare to self
            </span>
          </label>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* ── Report 1 — Team Scorecard ── */}
        <section id="overview" style={sectionStyle} className="pt-12">
          <h2 className="font-extrabold mb-1" style={{ fontSize: 22, color: "#1E2A4A" }}>The four values</h2>
          <p className="mb-8" style={{ fontSize: 15.5, color: "#636B7C", lineHeight: 1.6, maxWidth: 640 }}>
            {showSelf
              ? "How the cohort scores itself versus how peers score them, across Joy, Trust, Power, and Partnership. Each value is a sum out of 18. Where the two pull apart is where the conversation lives."
              : "How peers score the cohort across Joy, Trust, Power, and Partnership — each a sum out of 18. Turn on “Compare to self” to see it against the group’s self-view."}
          </p>

          <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
            <div>
              <svg viewBox={`-54 -6 ${SIZE + 108} ${SIZE + 12}`} width="100%" style={{ maxWidth: 320 }}>
                {[1 / 3, 2 / 3, 1].map((s) => (
                  <polygon key={s} points={ring(s)} fill="none" stroke="#EEE9F6" strokeWidth={1} />
                ))}
                {ANGLES.map((a, i) => {
                  const [x, y] = xy(a, RAD);
                  return <line key={i} x1={CXY} y1={CXY} x2={x} y2={y} stroke="#EEE9F6" strokeWidth={1} />;
                })}
                <polygon points={peerPts} fill="rgba(224,85,203,0.10)" stroke={PEER} strokeWidth={2} strokeDasharray="5 4" />
                {showSelf && (
                  <polygon points={selfPts} fill="rgba(110,63,204,0.14)" stroke={SELF} strokeWidth={2.5} />
                )}
                {circles.map((c, i) => {
                  const [lx, ly] = xy(ANGLES[i], RAD + 22);
                  return (
                    <text key={c.key} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={12} fontWeight={700} fill={c.color}>
                      {c.title}
                    </text>
                  );
                })}
              </svg>
              <div className="flex items-center gap-4 mt-1 justify-center" style={{ fontSize: 12.5, color: "#636B7C" }}>
                {showSelf && (
                  <span className="flex items-center gap-1.5">
                    <svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke={SELF} strokeWidth="2.5" /></svg>
                    Self
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke={PEER} strokeWidth="2.5" strokeDasharray="4 3" /></svg>
                  Peers
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {circles.map((c) => <ValueCard key={c.key} c={c} showSelf={showSelf} />)}
            </div>
          </div>
        </section>

        {/* ── Report 2 — Behavior breakdown ── */}
        <section id="behaviors" style={sectionStyle} className="mt-20 pt-10" >
          <div style={{ borderTop: "1px solid #EEE9F6" }} className="pt-10">
            <h2 className="font-extrabold mb-1" style={{ fontSize: 22, color: "#1E2A4A" }}>
              Inside each value — the twelve behaviors
            </h2>
            <p className="mb-6" style={{ fontSize: 15.5, color: "#636B7C", lineHeight: 1.6, maxWidth: 640 }}>
              Each value is three specific behaviors, on the 1–6 rating scale. Watch for the behaviors
              pulling a value up or down{showSelf ? " — and where self and peers pull apart" : ""}.
            </p>
            <div className="flex items-center gap-5 mb-8" style={{ fontSize: 12.5, color: "#636B7C" }}>
              {showSelf && (
                <span className="flex items-center gap-1.5">
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: SELF, display: "inline-block" }} /> Self
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: PEER, display: "inline-block" }} /> Peers
              </span>
              <span style={{ color: "#A8A2B3" }}>scale 1–6</span>
            </div>

            <div className="grid gap-8">
              {circles.map((c) => (
                <div key={c.key}>
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ width: 11, height: 11, borderRadius: "50%", background: c.color, display: "inline-block" }} />
                    <span className="font-extrabold" style={{ fontSize: 16, color: "#1E2A4A" }}>{c.title}</span>
                  </div>
                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #EEE9F6" }}>
                    {c.behaviors.map((b, i) => (
                      <div
                        key={b.key}
                        className="grid items-center gap-x-4 gap-y-2 px-4 py-3"
                        style={{
                          gridTemplateColumns: "minmax(0,1fr) 160px 108px",
                          borderTop: i ? "1px solid #F4F1F9" : "none",
                          background: i % 2 ? "#FCFBFE" : "#fff",
                        }}
                      >
                        <p style={{ fontSize: 14, color: "#1E2A4A", lineHeight: 1.45 }}>{b.text}</p>
                        <BehaviorTrack self={b.selfMean} peer={b.peerMean} showSelf={showSelf} />
                        <div className="text-right tabular-nums" style={{ fontSize: 12.5 }}>
                          {showSelf && (
                            <>
                              <span style={{ color: SELF, fontWeight: 700 }}>{b.selfMean.toFixed(1)}</span>
                              <span style={{ color: "#C9C4D4" }}> · </span>
                            </>
                          )}
                          <span style={{ color: PEER, fontWeight: 700 }}>{b.peerMean.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <p className="mt-16" style={{ fontSize: 12.5, color: "#A8A2B3", lineHeight: 1.5, maxWidth: 640 }}>
          A snapshot of where the group stands now: each person’s most recent response counts (a
          member’s latest self-assessment, each rater’s latest rating). Each member is weighted
          equally — their peer score is the average of their own peers, so someone with ten raters
          doesn’t outweigh someone with two. Real YPO members only; test accounts excluded.
        </p>
      </div>
    </div>
  );
}
