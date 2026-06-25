"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { trackEvent } from "@/app/lib/analytics";
import TrackedLink from "@/app/components/TrackedLink";

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════ */

const AI_OPTIONS = [
  { key: "minimal", label: "Minimal", desc: "We're not really using AI tools yet", multiplier: 1.0 },
  { key: "exploring", label: "Exploring", desc: "Some teams are experimenting", multiplier: 1.3 },
  { key: "active", label: "Actively using", desc: "Most teams use AI tools regularly", multiplier: 1.8 },
  { key: "embedded", label: "Deeply embedded", desc: "AI is core to how we work", multiplier: 2.5 },
] as const;

// The 4th item in every dimension is the focus question (the Focus throughline).
// Focus is NOT a 4th equation term — it folds into each dimension's average.
const CLARITY_QS = [
  "Leaders clearly articulate priorities and expected outcomes.",
  "Employees understand the strategy and how their work connects to it.",
  "When priorities shift, the reason and expected impact are communicated clearly.",
  "We focus on a few clear priorities and actively say no to the rest.",
];

const ALIGNMENT_QS = [
  "Team priorities clearly connect to company strategy.",
  "Managers consistently translate strategy into day-to-day actions.",
  "Cross-functional teams are aligned on shared goals and trade-offs.",
  "Teams pull toward the same handful of priorities, not each pursuing their own list.",
];

// These are framed negatively — high score = more friction = bad
const COORDINATION_QS = [
  "Teams spend significant time in meetings just to stay aligned.",
  "Work frequently gets duplicated or reworked due to miscommunication.",
  "Cross-team handoffs and decisions regularly create bottlenecks.",
  "Meetings and effort get pulled in too many directions instead of the priorities that matter most.",
];

const HEADCOUNT_PRESETS = [50, 200, 500, 1000, 3000];

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════════ */

function useAnimatedCounter(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const prevTarget = useRef(0);

  useEffect(() => {
    const from = prevTarget.current;
    prevTarget.current = target;
    let start: number | null = null;
    let raf: number;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

/* ═══════════════════════════════════════════════════════════════════
   SCALE INPUT
   ═══════════════════════════════════════════════════════════════════ */

function ScaleInput({
  question,
  value,
  onChange,
  index,
}: {
  question: string;
  value: number;
  onChange: (v: number) => void;
  index: number;
}) {
  const isFocus = index === 3; // the 4th statement is the Focus throughline
  return (
    <div style={{ padding: "clamp(12px, 2.1vh, 26px) 0", borderBottom: "1px solid #EAE9EB" }}>
      {/* statement */}
      <div
        className="flex items-start"
        style={{ gap: 8, fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 600, color: "#262F56", lineHeight: 1.3 }}
      >
        <span style={{ flex: "none" }}>{index + 1}.</span>
        <span>
          {question}
          {isFocus && (
            <span
              className="inline-block align-middle uppercase"
              style={{
                marginLeft: 10,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#C35AFF",
                background: "#FAF1FC",
                borderRadius: 999,
                padding: "4px 10px",
                position: "relative",
                top: -2,
              }}
            >
              Focus
            </span>
          )}
        </span>
      </div>
      {/* scale */}
      <div className="flex items-center flex-wrap" style={{ paddingLeft: 36, marginTop: "clamp(10px, 1.5vh, 18px)", gap: 12 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: "#AAA7AE", whiteSpace: "nowrap" }}>Strongly Disagree</span>
        <div className="flex items-center" style={{ gap: 9 }}>
          {[1, 2, 3, 4, 5].map((n) => {
            const on = value === n;
            return (
              <button
                key={n}
                onClick={() => onChange(n)}
                className="inline-flex items-center justify-center transition-all duration-200"
                style={{
                  width: "clamp(36px, 4.4vw, 41px)",
                  height: "clamp(36px, 4.4vw, 41px)",
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 700,
                  background: on ? "linear-gradient(135deg, #6E3FCC, #C35AFF)" : "#F7F6F7",
                  color: on ? "#fff" : "#AAA7AE",
                  boxShadow: on ? "0 4px 12px rgba(150,70,220,0.35)" : "none",
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
        <span style={{ fontSize: 16, fontWeight: 600, color: "#AAA7AE", whiteSpace: "nowrap" }}>Strongly Agree</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PROGRESS BAR — full 4-color gradient revealed up to the step %
   ═══════════════════════════════════════════════════════════════════ */

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = (step / total) * 100;
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 6, borderRadius: 5, background: "#EAE9EB" }}>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, #6E3FCC 0%, #C35AFF 33%, #E463A4 66%, #FF9900 100%)" }}
      />
      <div
        className="absolute top-0 bottom-0 right-0 transition-all duration-500 ease-out"
        style={{ left: `${pct}%`, background: "#EAE9EB" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STEP NAV — shared Back / Next footer
   ═══════════════════════════════════════════════════════════════════ */

function StepNav({
  onBack,
  onNext,
  nextDisabled,
  nextLabel,
}: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled: boolean;
  nextLabel: string;
}) {
  const typo = {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    padding: "16px 28px",
    borderRadius: 4,
    whiteSpace: "nowrap" as const,
  };
  return (
    <div className="flex items-center justify-between" style={{ marginTop: "clamp(22px, 3.2vh, 44px)" }}>
      <button
        onClick={onBack}
        className="transition-opacity hover:opacity-80"
        style={{ ...typo, background: "#fff", color: "#525057", boxShadow: "inset 0 0 0 1px #AAA7AE, 0 2px 2px rgba(16,24,40,.15)" }}
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="transition-opacity hover:opacity-90"
        style={{
          ...typo,
          background: nextDisabled ? "#D9D2E8" : "#6E3FCC",
          color: "#fff",
          boxShadow: nextDisabled ? "none" : "0 2px 2px rgba(16,24,40,.15)",
          cursor: nextDisabled ? "not-allowed" : "pointer",
        }}
      >
        {nextLabel} →
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MATH
   ═══════════════════════════════════════════════════════════════════ */

/*
   THE CAMPFIRE EQUATION:
   Execution = (Clarity × Alignment) / Coordination Cost

   Where:
   - Clarity (0.2–1.0): shared understanding of priorities, direction, and outcomes
   - Alignment (0.2–1.0): teams pulling in the same direction, strategy translated at every level
   - Coordination Cost (1.0–3.0): friction — meetings, rework, re-clarification, handoffs

   Effective Headcount = Headcount × AI_Multiplier × (Clarity × Alignment / Coordination_Cost)

   This means:
   - Perfect scores: 300 × 2.5 × (1.0 × 1.0 / 1.0) = 750 → "your 300 execute like 750"
   - Terrible scores: 300 × 1.0 × (0.2 × 0.2 / 3.0) = 4 → "your 300 execute like 4"
   - This matches the whiteboard model from the POV research (Ackoff, Malone, Brooks)
*/

function computeResults(
  headcount: number,
  aiIdx: number,
  clarity: number[],
  alignment: number[],
  coordination: number[],
) {
  const aiMult = aiIdx >= 0 ? AI_OPTIONS[aiIdx].multiplier : 1.0;
  const aiKey = aiIdx >= 0 ? AI_OPTIONS[aiIdx].key : "minimal";
  const rawCapacity = headcount * aiMult;

  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

  // Clarity & Alignment: higher answers = better. Map [1,5] → [0.2, 1.0]
  const toFactor = (a: number) => 0.2 + 0.8 * (a - 1) / 4;

  // Coordination Cost: higher answers = more friction (bad). Map [1,5] → [1.0, 3.0]
  const toCost = (a: number) => 1.0 + 2.0 * (a - 1) / 4;

  const avgClarity = avg(clarity);
  const avgAlignment = avg(alignment);
  const avgCoordination = avg(coordination);

  const cF = toFactor(avgClarity);          // Clarity: 0.2–1.0
  const aF = toFactor(avgAlignment);        // Alignment: 0.2–1.0
  const ccF = toCost(avgCoordination);      // Coordination Cost: 1.0–3.0

  // The Campfire equation
  const executionMultiplier = (cF * aF) / ccF;
  const effective = rawCapacity * executionMultiplier;
  const effectiveHC = Math.round(effective);

  // Identify biggest drag — normalize all to a 0–1 "health" scale for comparison
  const coordHealth = 1 / ccF; // 0.33–1.0, higher is better
  const allNearMax = cF >= 0.95 && aF >= 0.95 && ccF <= 1.05;

  const weakest: string = allNearMax ? "none"
    : cF <= aF && cF <= coordHealth ? "clarity"
    : aF <= coordHealth ? "alignment"
    : "coordination";

  // What-if: improve weakest dimension, always guaranteeing an increase
  const improved = (() => {
    if (weakest === "none") return effectiveHC; // already at peak
    // Use additive boost for clarity/alignment, reductive for coordination cost
    const iC = weakest === "clarity" ? Math.min(1.0, cF + 0.15) : cF;
    const iA = weakest === "alignment" ? Math.min(1.0, aF + 0.15) : aF;
    const iCC = weakest === "coordination" ? Math.max(1.0, ccF - 0.5) : ccF;
    const result = Math.round(rawCapacity * (iC * iA) / iCC);
    // Safety net: always show improvement
    return Math.max(result, effectiveHC + Math.max(1, Math.round(effectiveHC * 0.1)));
  })();

  // Single-lever lift % (vs current) — for the focus-bonus contrast line
  const leverPct = Math.round((improved / effectiveHC - 1) * 100);

  /* ── §5: Focus throughline read ── */
  // Uses the 4th answer (focus question) of each dimension. Coordination's is
  // inverted (6 − answer) so higher = healthier focus, like the others.
  const fcC = clarity[3] || 0;
  const fcA = alignment[3] || 0;
  const fcoR = coordination[3] || 0;
  const fcoInv = fcoR ? 6 - fcoR : 0;
  const focusRaw = (fcC + fcA + fcoInv) / 3; // 1–5

  /* ── §5: Focus-bonus projection ── */
  const D = 0.7;
  const fCl = toFactor(Math.min(5, avgClarity + D));
  const fAl = toFactor(Math.min(5, avgAlignment + D));
  const fCo = toCost(Math.max(1, avgCoordination - D));
  const focusToRaw = Math.round((rawCapacity * (fCl * fAl)) / fCo);
  const focusTo = Math.max(focusToRaw, effectiveHC); // floor at current
  const focusGain = Math.round((focusTo / effectiveHC - 1) * 100);

  /* ── §6: AI callout ── */
  const ratioVal = effectiveHC / headcount;
  const highAI = aiMult >= 1.8;
  const lowAI = aiMult <= 1.3;
  const healthy = ratioVal >= 1.0;
  const survivesPct = rawCapacity ? Math.round((effectiveHC / rawCapacity) * 100) : 0;

  return {
    headcount,
    aiMultiplier: aiMult,
    aiKey,
    rawCapacity: Math.round(rawCapacity),
    clarityScore: cF,
    alignmentScore: aF,
    coordinationCost: ccF,
    executionMultiplier,
    effectiveHeadcount: effectiveHC,
    ratio: ratioVal,
    weakest,
    improved,
    leverPct,
    // Focus throughline
    focusRaw,
    focusClarity: fcC,
    focusAlignment: fcA,
    focusCoordInv: fcoInv,
    // Focus bonus
    focusTo,
    focusGain,
    focusFromClarity: cF,
    focusToClarity: fCl,
    focusFromAlignment: aF,
    focusToAlignment: fAl,
    focusFromCoordCost: ccF,
    focusToCoordCost: fCo,
    // AI callout
    highAI,
    lowAI,
    healthy,
    survivesPct,
  };
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

type Step = 0 | 1 | 2 | 3 | 4 | 5;

export default function ExecutionCalculatorClient() {
  const [step, setStep] = useState<Step>(0);
  const [headcount, setHeadcount] = useState("");
  const [aiIdx, setAiIdx] = useState(-1);
  const [clarity, setClarity] = useState([0, 0, 0, 0]);
  const [alignment, setAlignment] = useState([0, 0, 0, 0]);
  const [coordination, setCoordination] = useState([0, 0, 0, 0]);

  const topRef = useRef<HTMLDivElement>(null);

  const STEP_LABELS: Record<number, string> = {
    1: "Your organization",
    2: "Clarity",
    3: "Alignment",
    4: "Coordination",
    5: "Results",
  };

  const goTo = useCallback((s: Step) => {
    setStep((prev) => {
      // §7 analytics — fire on the forward transition only
      if (prev === 0 && s === 1) {
        trackEvent("calc_start", {
          route: typeof window !== "undefined" ? window.location.pathname : "",
        });
      } else if (s > prev && s >= 2 && s <= 5) {
        trackEvent("calc_step", {
          step: String(s),
          stepLabel: STEP_LABELS[s] ?? "",
        });
      }
      return s;
    });
    // On step change, only scroll UP to the top — never nudge the page down.
    setTimeout(() => {
      if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hc = parseInt(headcount) || 0;
  const canAdvanceOrg = hc > 0 && aiIdx >= 0;
  const canAdvanceClarity = clarity.every((v) => v > 0);
  const canAdvanceAlignment = alignment.every((v) => v > 0);
  const canAdvanceCoord = coordination.every((v) => v > 0);

  const results = step === 5 ? computeResults(hc, aiIdx, clarity, alignment, coordination) : null;

  const setQ = (arr: number[], setArr: React.Dispatch<React.SetStateAction<number[]>>, idx: number, val: number) => {
    const next = [...arr];
    next[idx] = val;
    setArr(next);
  };

  /* ─── STEP 0: INTRO ─── */
  if (step === 0) {
    return (
      <section
        className="relative bg-[#1C1334] overflow-hidden flex justify-center min-h-[clamp(640px,calc(100vh-64px),940px)]"
        style={{
          backgroundImage: "url(/diagnostic-hero.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        {/* subtle top vignette so the eyebrow/headline stay legible over the sky */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,13,40,0.45) 0%, rgba(20,13,40,0.12) 30%, rgba(20,13,40,0) 55%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 md:pt-24 lg:pt-28 text-center">
          <p className="text-xs md:text-sm font-bold tracking-[0.22em] uppercase text-[#9D88ED] mb-7">
            Team Effectiveness Diagnostic
          </p>
          <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.25rem] font-extrabold leading-[1.05] tracking-tight text-white mb-7">
            How effectively is your
            <br />
            team executing?
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-[640px] mx-auto mb-12 leading-relaxed">
            Do your 300 employees execute like 30&hellip; or 3,000?
          </p>
          <p className="text-base md:text-lg text-white/60 mb-6">
            Take this 2-minute diagnostic to find out.
          </p>
          <button
            onClick={() => goTo(1)}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-[0.08em] uppercase text-white bg-[#8B6FD6] hover:bg-[#7B5FC6] rounded-lg transition-colors shadow-[0_16px_40px_-18px_rgba(139,111,214,0.9)]"
          >
            Start the diagnostic
            <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>
    );
  }

  /* ─── STEP 5: RESULTS ─── */
  if (step === 5 && results) {
    return <ResultsView results={results} onRestart={() => goTo(0)} topRef={topRef} />;
  }

  /* ─── STEPS 1–4: DIAGNOSTIC ─── */
  const stepLabel =
    step === 1 ? "Your organization" : step === 2 ? "Clarity" : step === 3 ? "Alignment" : "Coordination";
  const stepTitle =
    step === 1
      ? "Tell us about your organization."
      : step === 2
      ? "How clear is your strategic direction?"
      : step === 3
      ? "How aligned is your organization?"
      : "How much coordination friction exists?";
  const canNext =
    step === 1 ? canAdvanceOrg : step === 2 ? canAdvanceClarity : step === 3 ? canAdvanceAlignment : canAdvanceCoord;
  const isPresetHc = HEADCOUNT_PRESETS.map(String).includes(headcount);
  const qNumStyle = {
    fontSize: "clamp(20px, 2.3vw, 24px)",
    fontWeight: 700,
    color: "#262F56",
    lineHeight: 1.3,
  } as const;

  return (
    <div ref={topRef} style={{ background: "#F9F5FD" }}>
      <div
        className="flex justify-center items-center"
        style={{ minHeight: "calc(100vh - 92px)", padding: "clamp(20px, 3vh, 44px) clamp(16px, 4vw, 48px)" }}
      >
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: 1137,
            background: "#fff",
            borderRadius: 10,
            padding: "clamp(28px, 4.5vh, 64px) clamp(24px, 6vw, 96px)",
          }}
        >
          {/* eyebrow row */}
          <div
            className="flex items-center justify-between"
            style={{ fontSize: "clamp(14px, 1.6vw, 18px)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#97949D" }}
          >
            <span>{stepLabel}</span>
            <span>Step {step} of 4</span>
          </div>

          {/* progress */}
          <div style={{ marginTop: 12 }}>
            <ProgressBar step={step} total={4} />
          </div>

          {/* title + subtitle */}
          <h2 style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 800, letterSpacing: "-0.015em", color: "#262F56", margin: "clamp(20px, 3.2vh, 38px) 0 6px" }}>
            {stepTitle}
          </h2>
          <p style={{ fontSize: 18, fontWeight: 500, color: "#97949D" }}>
            {step === 1 ? (
              "Two quick questions to set the baseline."
            ) : step === 4 ? (
              <>
                Rate each statement from 1 (strongly disagree) to 5 (strongly agree).{" "}
                <span style={{ color: "#B23B9F" }}>Here, higher scores mean more friction.</span>
              </>
            ) : (
              "Rate each statement from 1 (strongly disagree) to 5 (strongly agree)."
            )}
          </p>

          <div style={{ height: 1, background: "#EAE9EB", marginTop: "clamp(14px, 2.2vh, 24px)" }} />

          {/* ─── STEP 1: ORG INFO ─── */}
          {step === 1 && (
            <div>
              {/* Q1 — headcount */}
              <div style={{ marginTop: "clamp(18px, 2.8vh, 36px)" }}>
                <div className="flex items-start" style={{ gap: 8, ...qNumStyle }}>
                  <span style={{ flex: "none" }}>1.</span>
                  <span>How many employees does your organization have?</span>
                </div>
                <div className="flex flex-wrap items-center" style={{ gap: 10, marginTop: 18, paddingLeft: 28 }}>
                  {HEADCOUNT_PRESETS.map((n) => {
                    const sel = headcount === String(n);
                    return (
                      <button
                        key={n}
                        onClick={() => setHeadcount(String(n))}
                        className="transition-colors"
                        style={{
                          fontSize: 18,
                          fontWeight: sel ? 700 : 500,
                          padding: "9px 18px",
                          borderRadius: 4,
                          minWidth: 49,
                          border: "0.7px solid #EAE9EB",
                          background: sel ? "#6E3FCC" : "#fff",
                          color: sel ? "#fff" : "#97949D",
                        }}
                      >
                        {n.toLocaleString()}
                      </button>
                    );
                  })}
                  <span style={{ fontSize: 18, fontWeight: 500, color: "#615E66", marginLeft: 6 }}>Other:</span>
                  <input
                    type="number"
                    min="1"
                    value={isPresetHc ? "" : headcount}
                    onChange={(e) => setHeadcount(e.target.value)}
                    className="outline-none focus:border-[#6E3FCC]"
                    style={{ width: 96, padding: "9px 12px", borderRadius: 4, border: "0.7px solid #EAE9EB", fontSize: 18, color: "#262F56" }}
                  />
                </div>
              </div>

              {/* Q2 — AI adoption */}
              <div style={{ marginTop: "clamp(20px, 3vh, 40px)" }}>
                <div className="flex items-start" style={{ gap: 8, ...qNumStyle }}>
                  <span style={{ flex: "none" }}>2.</span>
                  <span>How would you describe AI adoption across your org?</span>
                </div>
                <div className="flex flex-col" style={{ gap: 12, marginTop: 18, paddingLeft: 28, maxWidth: 520 }}>
                  {AI_OPTIONS.map((opt, i) => {
                    const sel = aiIdx === i;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => setAiIdx(i)}
                        className="text-left transition-colors"
                        style={{
                          padding: "13px 16px",
                          borderRadius: 4,
                          border: "0.7px solid #EAE9EB",
                          background: sel ? "#6E3FCC" : "#fff",
                          fontSize: 18,
                          color: sel ? "#fff" : "#262F56",
                        }}
                      >
                        <span style={{ fontWeight: 700 }}>{opt.label} —</span>{" "}
                        <span style={{ color: sel ? "rgba(255,255,255,0.85)" : "#615E66" }}>{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <StepNav onBack={() => goTo(0)} onNext={() => canNext && goTo(2)} nextDisabled={!canNext} nextLabel="Next" />
            </div>
          )}

          {/* ─── STEP 2: CLARITY ─── */}
          {step === 2 && (
            <div>
              {CLARITY_QS.map((q, i) => (
                <ScaleInput key={q} question={q} value={clarity[i]} onChange={(v) => setQ(clarity, setClarity, i, v)} index={i} />
              ))}
              <StepNav onBack={() => goTo(1)} onNext={() => canNext && goTo(3)} nextDisabled={!canNext} nextLabel="Next" />
            </div>
          )}

          {/* ─── STEP 3: ALIGNMENT ─── */}
          {step === 3 && (
            <div>
              {ALIGNMENT_QS.map((q, i) => (
                <ScaleInput key={q} question={q} value={alignment[i]} onChange={(v) => setQ(alignment, setAlignment, i, v)} index={i} />
              ))}
              <StepNav onBack={() => goTo(2)} onNext={() => canNext && goTo(4)} nextDisabled={!canNext} nextLabel="Next" />
            </div>
          )}

          {/* ─── STEP 4: COORDINATION ─── */}
          {step === 4 && (
            <div>
              {COORDINATION_QS.map((q, i) => (
                <ScaleInput key={q} question={q} value={coordination[i]} onChange={(v) => setQ(coordination, setCoordination, i, v)} index={i} />
              ))}
              <StepNav onBack={() => goTo(3)} onNext={() => canNext && goTo(5)} nextDisabled={!canNext} nextLabel="See your results" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   RESULTS VIEW
   ═══════════════════════════════════════════════════════════════════ */

interface Results {
  headcount: number;
  aiMultiplier: number;
  aiKey: string;
  rawCapacity: number;
  clarityScore: number;
  alignmentScore: number;
  coordinationCost: number;
  executionMultiplier: number;
  effectiveHeadcount: number;
  ratio: number;
  weakest: string;
  improved: number;
  leverPct: number;
  // Focus throughline (§5 read)
  focusRaw: number;
  focusClarity: number;
  focusAlignment: number;
  focusCoordInv: number;
  // Focus bonus (§5 projection)
  focusTo: number;
  focusGain: number;
  focusFromClarity: number;
  focusToClarity: number;
  focusFromAlignment: number;
  focusToAlignment: number;
  focusFromCoordCost: number;
  focusToCoordCost: number;
  // AI callout (§6)
  highAI: boolean;
  lowAI: boolean;
  healthy: boolean;
  survivesPct: number;
}

function ResultsView({
  results,
  onRestart,
  topRef,
}: {
  results: Results;
  onRestart: () => void;
  topRef: React.RefObject<HTMLDivElement | null>;
}) {
  const animatedHC = useAnimatedCounter(results.effectiveHeadcount, 2200);
  const [copied, setCopied] = useState(false);
  const r = results;

  // §7: calc_complete fires exactly once on results render — the headline KPI.
  const completeFired = useRef(false);
  useEffect(() => {
    if (completeFired.current) return;
    completeFired.current = true;
    trackEvent("calc_complete", {
      headcount: String(r.headcount),
      aiKey: r.aiKey,
      ratio: r.ratio.toFixed(2),
      effectiveHeadcount: String(r.effectiveHeadcount),
      weakest: r.weakest,
    });
  }, [r.headcount, r.aiKey, r.ratio, r.effectiveHeadcount, r.weakest]);

  const copyText = `${r.headcount.toLocaleString()} employees & ${r.effectiveHeadcount.toLocaleString()} effective capacity`;

  const handleCopy = useCallback(() => {
    trackEvent("calc_cta", { cta: "copy_score" });
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [copyText]);

  const handleRetake = useCallback(() => {
    trackEvent("calc_cta", { cta: "retake" });
    onRestart();
  }, [onRestart]);

  const clamp01pct = (v: number) => Math.max(0, Math.min(100, Math.round(((v - 1) / 4) * 100)));

  const narrative = (() => {
    if (r.ratio >= 1.5) return "AI and alignment are compounding. You're a force multiplier.";
    if (r.ratio >= 1.0) return "You're getting more from your people than headcount alone. Alignment is working.";
    if (r.ratio >= 0.5) return "You're leaving significant capacity on the table. Execution drift is real.";
    if (r.ratio >= 0.2) return "Most effort is being absorbed by friction and misalignment.";
    return "Your organization is fighting itself. People are working hard but canceling each other out.";
  })();

  const weakestLabel = r.weakest === "clarity" ? "Clarity" : r.weakest === "alignment" ? "Alignment" : "Coordination cost";
  const weakestColor = r.weakest === "clarity" ? "#F59E2C" : r.weakest === "alignment" ? "#6E3FCC" : "#E055CB";

  // Identify strengths — anything above a "good" threshold
  const strengths: { label: string; color: string; message: string }[] = [];
  if (r.clarityScore >= 0.7)
    strengths.push({
      label: "Clarity",
      color: "#F59E2C",
      message: r.clarityScore >= 0.9
        ? "Your leadership team has built strong strategic clarity. People understand what matters and why — that's the foundation everything else builds on."
        : "Strategic direction is reasonably clear across the organization. People have a solid sense of priorities, which gives alignment something real to anchor to.",
    });
  if (r.alignmentScore >= 0.7)
    strengths.push({
      label: "Alignment",
      color: "#6E3FCC",
      message: r.alignmentScore >= 0.9
        ? "Teams are well-aligned around shared priorities. Strategy is being translated consistently across levels — individual effort is adding up, not pulling apart."
        : "Your organization has meaningful alignment across teams. Managers are translating strategy into action with reasonable consistency.",
    });
  if (r.coordinationCost <= 1.5)
    strengths.push({
      label: "Coordination",
      color: "#E055CB",
      message: r.coordinationCost <= 1.1
        ? "Coordination friction is remarkably low. Teams are moving together without excessive meetings, rework, or re-clarification — that's rare and valuable."
        : "Coordination costs are being managed well. Teams aren't losing too much energy to friction, handoffs, or redundant communication.",
    });

  // Bar widths (relative to max possible: headcount × aiMultiplier)
  const maxPossible = r.headcount * r.aiMultiplier;
  const effectiveBarPct = Math.min(Math.round((r.effectiveHeadcount / maxPossible) * 100), 100);
  const improvedBarPct = Math.min(Math.round((r.improved / maxPossible) * 100), 100);

  /* ── §6: AI callout variant ── */
  const aiCallout = (() => {
    if (r.highAI && !r.healthy)
      return {
        accent: "#F2618E",
        eyebrow: "AI is amplifying the friction",
        title: "You turned the multiplier up — into a system that's leaking it.",
        body: `Only about ${r.survivesPct}% of the capacity you're paying for survives the trip to real output. AI raised the ceiling, but clarity, alignment, and coordination decide how much becomes real — and right now they're amplifying rework, not output. More AI on top of this would scale the leak, not the work.`,
      };
    if (r.highAI && r.healthy)
      return {
        accent: "#2BB673",
        eyebrow: "AI is compounding",
        title: "Your system can absorb the multiplier.",
        body: "You've raised throughput with AI and your execution variables are healthy enough to convert it — so the multiplier compounds instead of fragmenting. Each unit of added capacity is landing as real output. Keep clarity, alignment, and coordination tight as you scale and AI keeps paying off.",
      };
    if (r.lowAI && r.healthy)
      return {
        accent: "#F59E2C",
        eyebrow: "The multiplier is still on the table",
        title: "You execute well — without much AI yet.",
        body: "Your system already converts headcount into output efficiently, and you've barely turned on the AI multiplier. That's the rare setup where adding capacity compounds instead of fragments — the window to lead is open. Raise the ceiling deliberately and your execution will carry it.",
      };
    return {
      accent: "#F59E2C",
      eyebrow: "Don't pour AI on this yet",
      title: "Adding AI now would amplify the friction first.",
      body: `You haven't leaned hard on AI yet — and that's the right instinct for now. With ${weakestLabel.toLowerCase()} as your weakest link, more capacity would mostly scale the rework. Fix the weakest link first, then the multiplier lands on a system that can hold it.`,
    };
  })();

  /* ── §5: Focus throughline read variant ── */
  const focusHead = (() => {
    if (r.focusRaw >= 4.2) return "Focus is sharp — and it's compounding the other three.";
    if (r.focusRaw >= 3.2) return "Focus is mostly holding the three together.";
    if (r.focusRaw >= 2.2) return "Focus is starting to diffuse across all three.";
    return "Focus is the hidden drain beneath all three.";
  })();
  const focusLead =
    "Focus isn't a separate score — it's the thread running through the equation: a few clear priorities inside Clarity, the same priorities across teams inside Alignment, and effort that stays pointed inside Coordination.";
  const focusTail = (() => {
    if (r.focusRaw >= 4.2)
      return "Right now that thread is taut — and because the equation multiplies, sharp focus lifts every term at once.";
    if (r.focusRaw >= 3.2)
      return "Right now it's mostly intact, but a few priorities are competing for the same attention. Tightening it is the cheapest way to move all three terms together.";
    if (r.focusRaw >= 2.2)
      return "Right now it's fraying — attention is split across too many priorities, and that drift shows up in every term below.";
    return "Right now that thread is the quiet drain: scattered priorities are pulling Clarity, Alignment, and Coordination down together. Restore it and all three recover at once.";
  })();

  /* ── §5: Focus-bonus lift bars ── */
  const focusBars = [
    {
      label: "Clarity",
      color: "#F59E2C",
      sub: "Fewer, sharper priorities to point at.",
      fromPct: Math.round(r.focusFromClarity * 100),
      toPct: Math.round(r.focusToClarity * 100),
    },
    {
      label: "Alignment",
      color: "#6E3FCC",
      sub: "The same priorities across every team.",
      fromPct: Math.round(r.focusFromAlignment * 100),
      toPct: Math.round(r.focusToAlignment * 100),
    },
    {
      // Coordination is a cost — show as health (lower cost = more bar). Track is 1.0–3.0×.
      label: "Coordination",
      color: "#E055CB",
      sub: "Less effort lost just staying in sync.",
      fromPct: Math.round(((3 - r.focusFromCoordCost) / 2) * 100),
      toPct: Math.round(((3 - r.focusToCoordCost) / 2) * 100),
    },
  ].map((b) => {
    const delta = b.toPct - b.fromPct;
    return { ...b, deltaStr: delta > 0 ? `+${delta} pts` : "At ceiling" };
  });

  return (
    <div ref={topRef}>
      {/* ─── HERO RESULT ─── */}
      <section className="relative bg-[#1C1334] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative max-w-4xl mx-auto px-6 pt-12 md:pt-16 pb-10 md:pb-14 text-center">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-6">
            Your execution score
          </p>
          <p className="text-lg text-white/50 mb-2">
            Your <span className="text-white font-semibold">{r.headcount.toLocaleString()}</span> employees execute like
          </p>
          <p className="text-[5rem] md:text-[7rem] lg:text-[9rem] font-extrabold leading-none tracking-tight mb-4"
            style={{
              background: r.ratio >= 1 ? "linear-gradient(135deg, #9D88ED, #E055CB)" : r.ratio >= 0.5 ? "linear-gradient(135deg, #F59E2C, #E055CB)" : "linear-gradient(135deg, #E055CB, #ef4444)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {animatedHC.toLocaleString()}
          </p>
          <p className="text-lg md:text-xl text-white/60 max-w-lg mx-auto mb-3 leading-relaxed">
            {narrative}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mt-4">
            <span className="text-sm text-white/40">Execution multiplier:</span>
            <span className="text-sm font-bold" style={{
              color: r.executionMultiplier >= 0.5 ? "#9D88ED" : r.executionMultiplier >= 0.2 ? "#F59E2C" : "#E055CB",
            }}>
              {r.executionMultiplier.toFixed(2)}x
            </span>
            <span className="text-sm text-white/30">|</span>
            <span className="text-sm text-white/40">{r.ratio >= 1 ? "+" : ""}{Math.round((r.ratio - 1) * 100)}% vs headcount</span>
          </div>
          <div className="mt-6">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M3 11V3a1.5 1.5 0 011.5-1.5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Copy score
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ─── AI CALLOUT (§6) ─── */}
      <section className="bg-white py-11 md:py-[60px]">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="rounded-3xl bg-[#F8F5FC] px-6 py-6 md:px-8 md:py-7"
            style={{ border: `1px solid ${aiCallout.accent}33` }}
          >
            <p
              className="text-xs font-bold tracking-[0.16em] uppercase mb-2"
              style={{ color: aiCallout.accent }}
            >
              {aiCallout.eyebrow}
            </p>
            <h3 className="text-lg md:text-xl font-extrabold text-[#1C1334] mb-3 leading-snug">
              {aiCallout.title}
            </h3>
            <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">
              {aiCallout.body}
            </p>
          </div>
        </div>
      </section>

      {/* ─── EQUATION BREAKDOWN ─── */}
      <section className="py-16 md:py-24 bg-[#F8F5FC]">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
            Your equation
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1334] mb-4">
            Here&apos;s how the math breaks down.
          </h2>

          {/* Equation summary */}
          <div className="bg-white rounded-2xl p-6 mb-10">
            <div className="flex flex-wrap items-center justify-center gap-2 text-center">
              <div className="px-3 py-2">
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-0.5">Effective output</p>
                <p className="text-xl font-extrabold text-[#1C1334]">{r.effectiveHeadcount.toLocaleString()}</p>
              </div>
              <span className="text-xl font-bold text-gray-300">=</span>
              <div className="px-3 py-2 bg-gray-50 rounded-lg">
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-0.5">Capacity</p>
                <p className="text-xl font-extrabold text-[#1C1334]">{r.rawCapacity.toLocaleString()}</p>
              </div>
              <span className="text-xl font-bold text-gray-300">&times;</span>
              <div className="px-4 py-3 bg-gray-50 rounded-lg">
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-0.5">Execution</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-[#F59E2C]">{(r.clarityScore).toFixed(2)}</span>
                  <span className="text-sm font-bold text-gray-300">&times;</span>
                  <span className="text-lg font-extrabold text-[#6E3FCC]">{(r.alignmentScore).toFixed(2)}</span>
                  <span className="text-sm font-bold text-gray-300">/</span>
                  <span className="text-lg font-extrabold text-[#E055CB]">{(r.coordinationCost).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Variable cards */}
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {/* Capacity */}
            <div className="bg-white rounded-2xl p-6 sm:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-bold tracking-[0.12em] uppercase text-gray-400 mb-1">Capacity</p>
                  <p className="text-xs text-gray-400">Headcount &times; AI effectiveness</p>
                </div>
                <p className="text-3xl font-extrabold text-[#1C1334]">{r.rawCapacity.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <span className="font-semibold text-[#1C1334]">{r.headcount.toLocaleString()}</span> people
                <span className="text-gray-300">&times;</span>
                <span className="font-semibold text-[#1C1334]">{r.aiMultiplier}x</span> AI multiplier
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                This is your theoretical maximum &mdash; the total workforce output if every person were fully aligned, fully clear on priorities, and operating with zero coordination friction. It&apos;s the ceiling. How close you get depends on the execution variables below.
              </p>
            </div>

            {/* Clarity */}
            <div className="bg-white rounded-2xl p-6" style={{ borderTopWidth: "3px", borderTopColor: "#F59E2C" }}>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#F59E2C] mb-1">Clarity</p>
              <p className="text-3xl font-extrabold text-[#1C1334]">{Math.round(r.clarityScore * 100)}%</p>
              <p className="text-xs text-gray-400 mt-1 mb-3">Shared understanding of priorities and direction</p>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="h-full rounded-full" style={{ width: `${r.clarityScore * 100}%`, background: "#F59E2C" }} />
              </div>
            </div>

            {/* Alignment */}
            <div className="bg-white rounded-2xl p-6" style={{ borderTopWidth: "3px", borderTopColor: "#6E3FCC" }}>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#6E3FCC] mb-1">Alignment</p>
              <p className="text-3xl font-extrabold text-[#1C1334]">{Math.round(r.alignmentScore * 100)}%</p>
              <p className="text-xs text-gray-400 mt-1 mb-3">Teams pulling in the same direction</p>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="h-full rounded-full" style={{ width: `${r.alignmentScore * 100}%`, background: "#6E3FCC" }} />
              </div>
            </div>

            {/* Coordination Cost */}
            <div className="bg-white rounded-2xl p-6 sm:col-span-2" style={{ borderTopWidth: "3px", borderTopColor: "#E055CB" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#E055CB] mb-1">Coordination Cost</p>
                  <p className="text-xs text-gray-400 mt-1">Friction from meetings, rework, and re-clarification</p>
                </div>
                <p className="text-3xl font-extrabold text-[#1C1334]">{r.coordinationCost.toFixed(1)}x</p>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-3">
                <div className="h-full rounded-full" style={{ width: `${((r.coordinationCost - 1) / 2) * 100}%`, background: "#E055CB" }} />
              </div>
              <p className="text-[10px] text-gray-400 mt-2">1.0x = minimal friction &middot; 3.0x = severe friction</p>
            </div>
          </div>

          {/* Visual bar comparison */}
          <div className="bg-white rounded-2xl p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-[#1C1334]">Potential capacity</p>
                <p className="text-sm font-bold text-gray-400">{Math.round(maxPossible).toLocaleString()}</p>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full">
                <div className="h-full rounded-full bg-gray-200" style={{ width: "100%" }} />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-[#1C1334]">Current effective execution</p>
                <p className="text-sm font-bold" style={{ color: r.ratio >= 0.5 ? "#6E3FCC" : "#E055CB" }}>{r.effectiveHeadcount.toLocaleString()}</p>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full">
                <div className="h-full rounded-full" style={{ width: `${effectiveBarPct}%`, background: r.ratio >= 0.5 ? "#6E3FCC" : "#E055CB" }} />
              </div>
            </div>
            {r.weakest !== "none" && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-[#1C1334]">
                    If you improved <span style={{ color: weakestColor }}>{weakestLabel.toLowerCase()}</span>
                  </p>
                  <p className="text-sm font-bold text-[#9D88ED]">{r.improved.toLocaleString()}</p>
                </div>
                <div className="w-full h-4 bg-gray-100 rounded-full">
                  <div className="h-full rounded-full bg-[#9D88ED]" style={{ width: `${improvedBarPct}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── FOCUS THROUGHLINE (§5 read) ─── */}
      <section className="relative bg-[#1C1334] overflow-hidden py-16 md:py-24">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(/purple-topo-tall.webp)", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative max-w-3xl mx-auto px-6">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#EE80DD] mb-4">
            The Throughline
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-5 leading-snug">
            {focusHead}
          </h2>
          <p className="text-base md:text-lg text-white/60 leading-relaxed mb-10">
            {focusLead} {focusTail}
          </p>

          <div className="space-y-5">
            {[
              { label: "In Clarity", v: r.focusClarity },
              { label: "In Alignment", v: r.focusAlignment },
              { label: "In Coordination", v: r.focusCoordInv },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-white/80">{row.label}</p>
                  <p className="text-sm font-bold text-white/50">{row.v}/5</p>
                </div>
                <div className="w-full h-3 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${clamp01pct(row.v)}%`, background: "#EE80DD" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT'S WORKING ─── */}
      {strengths.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              What&apos;s working
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1334] mb-8">
              {strengths.length === 3
                ? "All three variables are in strong shape."
                : strengths.length === 2
                ? "Two of three variables are working for you."
                : `${strengths[0].label} is a real strength.`}
            </h2>
            <div className={`grid gap-5 ${strengths.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {strengths.map((s) => (
                <div key={s.label} className="bg-[#F8F5FC] rounded-2xl p-6" style={{ borderTopWidth: "3px", borderTopColor: s.color }}>
                  <p className="text-xs font-bold tracking-[0.12em] uppercase mb-2" style={{ color: s.color }}>
                    {s.label}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.message}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── BIGGEST LEVER ─── */}
      <section className={`py-16 md:py-24 ${strengths.length > 0 ? "bg-[#F8F5FC]" : "bg-white"}`}>
        <div className="max-w-3xl mx-auto px-6">
          {r.weakest === "none" ? (
            <>
              <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
                Your execution profile
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1334] mb-5">
                You&apos;re operating at peak execution efficiency.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Clarity, alignment, and coordination cost are all in strong shape. Your organization is converting headcount into effective output with minimal friction. The challenge now is sustaining this as the organization grows and conditions change.
              </p>
              <div className="bg-[#F8F5FC] rounded-2xl p-8">
                <p className="text-base text-gray-600">
                  Your execution multiplier of <strong className="text-[#6E3FCC]">{r.executionMultiplier.toFixed(2)}x</strong> means you&apos;re getting {Math.round(r.executionMultiplier * 100)}% of your potential capacity. That&apos;s rare — most organizations operate between 5–30% of their theoretical capacity.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
                Your biggest lever
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1334] mb-5">
                <span style={{ color: weakestColor }}>{weakestLabel}</span> is your biggest opportunity.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {r.weakest === "clarity" && "Clarity is the constraint. When priorities and expected outcomes aren't articulated sharply, every downstream decision inherits the ambiguity — and effort scatters. Tightening this is the highest-leverage move you can make."}
                {r.weakest === "alignment" && "Alignment is the constraint. Strategy may be clear at the top, but it's not translating into coordinated action across teams. Closing the gap between intent and execution is where your capacity comes back."}
                {r.weakest === "coordination" && "Coordination cost is the constraint. Too much energy is spent staying in sync — meetings, rework, bottlenecked handoffs. Reducing that friction frees capacity you already have without adding a single hire."}
              </p>
              <div className="bg-[#F8F5FC] rounded-2xl p-8">
                <p className="text-base text-gray-600 mb-2">
                  By improving{" "}
                  <strong style={{ color: weakestColor }}>{weakestLabel.toLowerCase()}</strong>{" "}
                  to a high-performing level, your effective execution would go from:
                </p>
                <p className="text-2xl font-extrabold text-[#1C1334]">
                  {r.effectiveHeadcount.toLocaleString()}{" "}
                  <span className="text-gray-300 mx-2">&rarr;</span>{" "}
                  <span style={{ color: weakestColor }}>{r.improved.toLocaleString()}</span>
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  That&apos;s a {Math.round(((r.improved - r.effectiveHeadcount) / r.effectiveHeadcount) * 100)}% increase in effective execution capacity.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ─── BONUS · THE FOUNDATIONAL MOVE (§5 projection) ─── */}
      <section className="relative bg-[#1C1334] overflow-hidden py-20 md:py-28">
        <div
          className="absolute inset-0 opacity-[0.14] pointer-events-none"
          style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(80% 55% at 50% 0%, rgba(224,85,203,0.18), rgba(28,19,52,0) 70%)" }}
        />
        <div className="relative max-w-3xl mx-auto px-6">
          {/* eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 rounded-full mb-6"
            style={{ border: "1px solid rgba(238,128,221,0.4)", background: "rgba(238,128,221,0.08)", padding: "7px 16px" }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 999, background: "#EE80DD" }} />
            <span className="text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase text-[#EE80DD]">
              Bonus · The Foundational Move
            </span>
          </div>

          <h2 className="text-3xl md:text-[2.5rem] font-extrabold text-white leading-[1.1] mb-5">
            Most levers move one variable.
            <br />
            Focus moves{" "}
            <span
              style={{
                background: "linear-gradient(100deg, #C77DEC, #EE80DD, #F7A83D)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              all three.
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/55 leading-relaxed mb-10 max-w-xl">
            Because execution <em className="not-italic text-white/90 font-semibold">multiplies</em> clarity, alignment, and coordination together, one foundational investment in focus compounds across every term at once — not just the weakest link.
          </p>

          {/* HERO before → after (gradient-bordered) */}
          <div
            className="relative rounded-[22px] mb-10"
            style={{ padding: 1.5, background: "linear-gradient(120deg, rgba(199,125,236,0.6), rgba(238,128,221,0.5), rgba(247,168,61,0.5))" }}
          >
            <div className="rounded-[21px] px-6 py-7 md:px-10 md:py-8" style={{ background: "#241A40" }}>
              <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-4 md:gap-x-9 text-center">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/40 mb-1.5">Today</p>
                  <p className="text-4xl md:text-5xl font-extrabold text-white tabular-nums leading-none">
                    {r.effectiveHeadcount.toLocaleString()}
                  </p>
                </div>
                <svg className="w-7 h-7 text-white/25 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: "rgba(238,128,221,0.75)" }}>
                    With focus invested
                  </p>
                  <p className="text-4xl md:text-5xl font-extrabold tabular-nums leading-none" style={{ color: "#EE80DD" }}>
                    {r.focusTo.toLocaleString()}
                  </p>
                </div>
                <span
                  className="text-sm font-extrabold text-white rounded-full"
                  style={{ background: "linear-gradient(100deg, #8B3FD4, #C04CC6, #E055CB)", padding: "8px 16px", boxShadow: "0 8px 22px -8px rgba(224,85,203,0.8)" }}
                >
                  +{r.focusGain}%
                </span>
              </div>
            </div>
          </div>

          {/* Three lift bars */}
          <div className="space-y-6 mb-10">
            {focusBars.map((b) => (
              <div key={b.label}>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span style={{ width: 10, height: 10, borderRadius: 999, background: b.color }} />
                    <p className="text-sm md:text-[15px] font-bold text-white">{b.label}</p>
                  </div>
                  <p
                    className="text-xs font-bold rounded-full"
                    style={{ color: b.color, background: `${b.color}1f`, padding: "3px 10px" }}
                  >
                    {b.deltaStr}
                  </p>
                </div>
                <div className="relative w-full rounded-full overflow-hidden" style={{ height: 10, background: "rgba(255,255,255,0.08)" }}>
                  {/* current */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${Math.max(0, Math.min(100, b.fromPct))}%`, background: "rgba(255,255,255,0.18)" }}
                  />
                  {/* projected */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.max(0, Math.min(100, b.toPct))}%`,
                      background: `linear-gradient(90deg, ${b.color}cc, ${b.color})`,
                      boxShadow: `0 0 16px ${b.color}66`,
                    }}
                  />
                </div>
                <p className="text-xs text-white/40 mt-2">{b.sub}</p>
              </div>
            ))}
          </div>

          {r.weakest !== "none" && (
            <div className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5">
                <div className="rounded-2xl px-5 py-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-xs text-white/45 mb-1.5 leading-snug">Improving {weakestLabel.toLowerCase()} alone</p>
                  <p className="text-2xl md:text-3xl font-extrabold tabular-nums" style={{ color: weakestColor }}>+{r.leverPct}%</p>
                </div>
                <div
                  className="rounded-2xl px-5 py-4"
                  style={{ background: "linear-gradient(120deg, rgba(238,128,221,0.16), rgba(199,125,236,0.1))", border: "1px solid rgba(238,128,221,0.35)" }}
                >
                  <p className="text-xs mb-1.5 leading-snug" style={{ color: "rgba(238,128,221,0.85)" }}>Investing in focus</p>
                  <p className="text-2xl md:text-3xl font-extrabold tabular-nums text-[#EE80DD]">+{r.focusGain}%</p>
                </div>
              </div>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                Focus moves all three terms at once — that gap is <strong className="text-white">the equation compounding.</strong>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── RESEARCH ─── */}
      <section className={`py-16 md:py-24 ${strengths.length > 0 ? "bg-white" : "bg-[#F8F5FC]"}`}>
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
            The research behind the model
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1334] mb-10">
            This isn&apos;t a guess. It&apos;s a pattern.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className={`${strengths.length > 0 ? "bg-[#F8F5FC]" : "bg-white"} rounded-2xl p-6`}>
              <p className="text-3xl font-extrabold text-[#F59E2C] mb-3">28%</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                of executives say their company&apos;s strategy is being well executed.
              </p>
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400">McKinsey / Strategy& Surveys</p>
            </div>
            <div className={`${strengths.length > 0 ? "bg-[#F8F5FC]" : "bg-white"} rounded-2xl p-6`}>
              <p className="text-3xl font-extrabold text-[#6E3FCC] mb-3">95%</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                of employees don&apos;t fully understand their organization&apos;s strategy.
              </p>
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400">Kaplan & Norton, HBR</p>
            </div>
            <div className={`${strengths.length > 0 ? "bg-[#F8F5FC]" : "bg-white"} rounded-2xl p-6`}>
              <p className="text-3xl font-extrabold text-[#E055CB] mb-3">n(n-1)/2</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Communication channels grow exponentially with headcount. At 300 people, that&apos;s 44,850 potential channels of miscommunication.
              </p>
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400">Brooks&apos; Law, The Mythical Man-Month</p>
            </div>
          </div>

          <div className={`mt-8 ${strengths.length > 0 ? "bg-[#F8F5FC]" : "bg-white"} rounded-2xl p-6`}>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-[#1C1334]">The AI-era insight:</strong>{" "}
              AI increases the throughput of each individual node in the network. But unless alignment improves proportionally, the organization fragments faster. As Russell Ackoff observed: &ldquo;The performance of a system is not the sum of the performance of its parts.&rdquo; Increasing individual capacity without increasing strategic coherence can decrease organizational effectiveness.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 md:py-24 bg-[#1C1334]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-4">
            Go deeper
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-5">
            Get a free 20-minute{" "}
            <em className="not-italic text-[#E055CB]">alignment teardown.</em>
          </h2>
          <p className="text-base text-white/50 leading-relaxed mb-10 max-w-lg mx-auto">
            We&apos;ll walk through your equation — where clarity, alignment, or coordination cost is creating the biggest drag — and what high-performing organizations do differently.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <TrackedLink
              href="https://calendly.com/getcampfire/"
              external
              eventName="calc_cta"
              eventParams={{ cta: "book_teardown" }}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#E055CB] hover:bg-[#d040b8] rounded-lg transition-colors"
            >
              Book a teardown
              <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </TrackedLink>
            <div className="flex items-center gap-4">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white/50 hover:text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M3 11V3a1.5 1.5 0 011.5-1.5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Copy score
                  </>
                )}
              </button>
              <button
                onClick={handleRetake}
                className="text-sm font-semibold text-white/40 hover:text-white/70 transition-colors"
              >
                Retake
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
