"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════ */

const AI_OPTIONS = [
  { label: "Minimal", desc: "We're not really using AI tools yet", multiplier: 1.0 },
  { label: "Exploring", desc: "Some teams are experimenting", multiplier: 1.3 },
  { label: "Actively using", desc: "Most teams use AI tools regularly", multiplier: 1.8 },
  { label: "Deeply embedded", desc: "AI is core to how we work", multiplier: 2.5 },
];

const CLARITY_QS = [
  "Leaders clearly articulate priorities and expected outcomes.",
  "Employees understand the strategy and how their work connects to it.",
  "When priorities shift, the reason and expected impact are communicated clearly.",
];

const ALIGNMENT_QS = [
  "Team priorities clearly connect to company strategy.",
  "Managers consistently translate strategy into day-to-day actions.",
  "Cross-functional teams are aligned on shared goals and trade-offs.",
];

// These are framed negatively — high score = more friction = bad
const COORDINATION_QS = [
  "Teams spend significant time in meetings just to stay aligned.",
  "Work frequently gets duplicated or reworked due to miscommunication.",
  "Cross-team handoffs and decisions regularly create bottlenecks.",
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
  color,
  index,
}: {
  question: string;
  value: number;
  onChange: (v: number) => void;
  color: string;
  index: number;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <p className="text-sm font-semibold text-[#1C1334] mb-4 leading-relaxed">
        <span className="text-gray-400 mr-2">{index + 1}.</span>
        {question}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-gray-400 w-16 text-right shrink-0 hidden sm:block">Strongly<br />disagree</span>
        <div className="flex gap-2 flex-1 justify-center">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => onChange(n)}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full text-sm font-bold transition-all duration-200"
              style={{
                background: value === n ? color : "#F3F4F6",
                color: value === n ? "#fff" : "#9CA3AF",
                transform: value === n ? "scale(1.15)" : "scale(1)",
                boxShadow: value === n ? `0 4px 12px ${color}40` : "none",
              }}
            >
              {n}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-gray-400 w-16 shrink-0 hidden sm:block">Strongly<br />agree</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PROGRESS BAR
   ═══════════════════════════════════════════════════════════════════ */

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = (step / total) * 100;
  return (
    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${pct}%`, background: "linear-gradient(90deg, #F59E2C, #6E3FCC, #E055CB)" }}
      />
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
  const rawCapacity = headcount * aiMult;

  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

  // Clarity & Alignment: higher answers = better. Map [1,5] → [0.2, 1.0]
  const toFactor = (a: number) => 0.2 + 0.8 * (a - 1) / 4;

  // Coordination Cost: higher answers = more friction (bad). Map [1,5] → [1.0, 3.0]
  const toCost = (a: number) => 1.0 + 2.0 * (a - 1) / 4;

  const cF = toFactor(avg(clarity));        // Clarity: 0.2–1.0
  const aF = toFactor(avg(alignment));      // Alignment: 0.2–1.0
  const ccF = toCost(avg(coordination));    // Coordination Cost: 1.0–3.0

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

  return {
    headcount,
    aiMultiplier: aiMult,
    rawCapacity: Math.round(rawCapacity),
    clarityScore: cF,
    alignmentScore: aF,
    coordinationCost: ccF,
    executionMultiplier,
    effectiveHeadcount: effectiveHC,
    ratio: effectiveHC / headcount,
    weakest,
    improved,
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
  const [clarity, setClarity] = useState([0, 0, 0]);
  const [alignment, setAlignment] = useState([0, 0, 0]);
  const [coordination, setCoordination] = useState([0, 0, 0]);

  const topRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((s: Step) => {
    setStep(s);
    // Scroll to top of assessment area
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
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
      <section className="relative bg-[#1C1334] overflow-hidden min-h-[calc(100vh-64px)]">
        <div
          className="absolute inset-0 opacity-15"
          style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative max-w-4xl mx-auto px-6 pt-28 md:pt-36 lg:pt-44 pb-20 md:pb-28 text-center">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-6">
            Execution calculator
          </p>
          <h1 className="text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] font-extrabold leading-[1.08] tracking-tight text-white mb-6">
            How effectively is your
            <br />
            <span className="text-[#E055CB]">organization executing?</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-[640px] mx-auto mb-4 leading-relaxed">
            Most organizations assume output equals headcount. But research in systems theory, coordination theory, and organizational behavior shows something different:
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 max-w-lg mx-auto mb-8">
            <p className="text-base md:text-lg text-white/80 font-medium leading-relaxed">
              Execution ={" "}
              <span className="text-[#F59E2C]">Clarity</span>
              {" "}&times;{" "}
              <span className="text-[#9D88ED]">Alignment</span>
              {" "}/{" "}
              <span className="text-[#E055CB]">Coordination Cost</span>
            </p>
          </div>
          <p className="text-base text-white/40 max-w-[560px] mx-auto mb-10 leading-relaxed">
            Do your 300 employees execute like 30? Or like 3,000?
            <br />
            Take this 2-minute assessment to find out.
          </p>
          <button
            onClick={() => goTo(1)}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#E055CB] hover:bg-[#d040b8] rounded-lg transition-colors"
          >
            Start the assessment
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

  /* ─── STEPS 1–4: ASSESSMENT ─── */
  return (
    <div ref={topRef}>
      {/* Header bar */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400">
              {step === 1 && "Your organization"}
              {step === 2 && "Clarity"}
              {step === 3 && "Alignment"}
              {step === 4 && "Coordination"}
            </p>
            <p className="text-xs text-gray-400">Step {step} of 4</p>
          </div>
          <ProgressBar step={step} total={4} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {/* ─── STEP 1: ORG INFO ─── */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1334] mb-2">
              Tell us about your organization.
            </h2>
            <p className="text-base text-gray-500 mb-10">Two quick questions to set the baseline.</p>

            {/* Headcount */}
            <div className="mb-10">
              <label htmlFor="hc" className="block text-sm font-bold text-[#1C1334] mb-3">
                How many employees does your organization have?
              </label>
              <input
                id="hc"
                type="number"
                min="1"
                value={headcount}
                onChange={(e) => setHeadcount(e.target.value)}
                placeholder="e.g. 300"
                className="w-full max-w-xs px-4 py-3 text-lg border border-gray-200 rounded-lg outline-none transition-colors focus:border-[#6E3FCC] focus:ring-2 focus:ring-[#6E3FCC]/20"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {HEADCOUNT_PRESETS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setHeadcount(String(n))}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      headcount === String(n)
                        ? "bg-[#6E3FCC] text-white border-[#6E3FCC]"
                        : "bg-white text-gray-500 border-gray-200 hover:border-[#6E3FCC]/40"
                    }`}
                  >
                    {n.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* AI adoption */}
            <div className="mb-10">
              <p className="text-sm font-bold text-[#1C1334] mb-3">
                How would you describe AI adoption across your org?
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {AI_OPTIONS.map((opt, i) => (
                  <button
                    key={opt.label}
                    onClick={() => setAiIdx(i)}
                    className={`text-left px-5 py-4 rounded-xl border-2 transition-all ${
                      aiIdx === i
                        ? "border-[#6E3FCC] bg-[#F8F5FC]"
                        : "border-gray-100 bg-white hover:border-gray-200"
                    }`}
                  >
                    <p className={`text-sm font-bold ${aiIdx === i ? "text-[#6E3FCC]" : "text-[#1C1334]"}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => goTo(0)}
                className="px-5 py-3 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => canAdvanceOrg && goTo(2)}
                disabled={!canAdvanceOrg}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-[#6E3FCC] hover:bg-[#5a2fb3] rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
                <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: CLARITY ─── */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1334] mb-2">
              How clear is your strategic direction?
            </h2>
            <p className="text-base text-gray-500 mb-10">Rate each statement from 1 (strongly disagree) to 5 (strongly agree).</p>

            {CLARITY_QS.map((q, i) => (
              <ScaleInput
                key={q}
                question={q}
                value={clarity[i]}
                onChange={(v) => setQ(clarity, setClarity, i, v)}
                color="#F59E2C"
                index={i}
              />
            ))}

            <div className="flex items-center gap-3 mt-10">
              <button onClick={() => goTo(1)} className="px-5 py-3 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                Back
              </button>
              <button
                onClick={() => canAdvanceClarity && goTo(3)}
                disabled={!canAdvanceClarity}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-[#6E3FCC] hover:bg-[#5a2fb3] rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
                <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: ALIGNMENT ─── */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1334] mb-2">
              How aligned is your organization?
            </h2>
            <p className="text-base text-gray-500 mb-10">Rate each statement from 1 (strongly disagree) to 5 (strongly agree).</p>

            {ALIGNMENT_QS.map((q, i) => (
              <ScaleInput
                key={q}
                question={q}
                value={alignment[i]}
                onChange={(v) => setQ(alignment, setAlignment, i, v)}
                color="#6E3FCC"
                index={i}
              />
            ))}

            <div className="flex items-center gap-3 mt-10">
              <button onClick={() => goTo(2)} className="px-5 py-3 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                Back
              </button>
              <button
                onClick={() => canAdvanceAlignment && goTo(4)}
                disabled={!canAdvanceAlignment}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-[#6E3FCC] hover:bg-[#5a2fb3] rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
                <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: COORDINATION ─── */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1334] mb-2">
              How much coordination friction exists?
            </h2>
            <p className="text-base text-gray-500 mb-10">Rate each statement. Here, higher scores mean <strong>more friction</strong> in your organization.</p>

            {COORDINATION_QS.map((q, i) => (
              <ScaleInput
                key={q}
                question={q}
                value={coordination[i]}
                onChange={(v) => setQ(coordination, setCoordination, i, v)}
                color="#E055CB"
                index={i}
              />
            ))}

            <div className="flex items-center gap-3 mt-10">
              <button onClick={() => goTo(3)} className="px-5 py-3 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                Back
              </button>
              <button
                onClick={() => canAdvanceCoord && goTo(5)}
                disabled={!canAdvanceCoord}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-[#E055CB] hover:bg-[#d040b8] rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                See your results
                <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}
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
  rawCapacity: number;
  clarityScore: number;
  alignmentScore: number;
  coordinationCost: number;
  executionMultiplier: number;
  effectiveHeadcount: number;
  ratio: number;
  weakest: string;
  improved: number;
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

  const copyText = `${r.headcount.toLocaleString()} employees & ${r.effectiveHeadcount.toLocaleString()} effective capacity`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [copyText]);

  const narrative = (() => {
    if (r.ratio >= 1.5) return "AI and alignment are compounding. You're a force multiplier.";
    if (r.ratio >= 1.0) return "You're getting more from your people than headcount alone. Alignment is working.";
    if (r.ratio >= 0.5) return "You're leaving significant capacity on the table. Execution drift is real.";
    if (r.ratio >= 0.2) return "Most effort is being absorbed by friction and misalignment.";
    return "Your organization is fighting itself. People are working hard but canceling each other out.";
  })();

  const weakestLabel = r.weakest === "clarity" ? "Clarity" : r.weakest === "alignment" ? "Alignment" : "Coordination cost";
  const weakestColor = r.weakest === "clarity" ? "#F59E2C" : r.weakest === "alignment" ? "#6E3FCC" : "#E055CB";

  const pctOfMax = Math.round(r.executionMultiplier * 100);

  // Bar widths (relative to max possible: headcount × aiMultiplier)
  const maxPossible = r.headcount * r.aiMultiplier;
  const effectiveBarPct = Math.min(Math.round((r.effectiveHeadcount / maxPossible) * 100), 100);
  const improvedBarPct = Math.min(Math.round((r.improved / maxPossible) * 100), 100);

  return (
    <div ref={topRef}>
      {/* ─── HERO RESULT ─── */}
      <section className="relative bg-[#1C1334] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative max-w-4xl mx-auto px-6 pt-28 md:pt-36 pb-20 md:pb-28 text-center">
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
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="font-semibold text-[#1C1334]">{r.headcount.toLocaleString()}</span> people
                <span className="text-gray-300">&times;</span>
                <span className="font-semibold text-[#1C1334]">{r.aiMultiplier}x</span> AI multiplier
              </div>
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

      {/* ─── BIGGEST LEVER ─── */}
      <section className="py-16 md:py-24 bg-white">
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
                {r.weakest === "clarity" && "Your people are working without a shared understanding of what matters. When clarity is low, alignment and coordination are just organized confusion. Improving clarity is the foundation everything else depends on."}
                {r.weakest === "alignment" && "Teams are pulling in different directions. Strategy exists, but it's being interpreted differently at every level. Improving alignment means helping managers translate priorities consistently — so individual effort adds up instead of pulling apart."}
                {r.weakest === "coordination" && "Your teams are spending too much energy just staying coordinated. Meetings, rework, re-clarification, and handoff friction are absorbing capacity that should go toward outcomes. Reducing coordination cost is the fastest way to unlock execution speed."}
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

      {/* ─── RESEARCH ─── */}
      <section className="py-16 md:py-24 bg-[#F8F5FC]">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
            The research behind the model
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1334] mb-10">
            This isn&apos;t a guess. It&apos;s a pattern.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6">
              <p className="text-3xl font-extrabold text-[#F59E2C] mb-3">28%</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                of executives say their company&apos;s strategy is being well executed.
              </p>
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400">McKinsey / Strategy& Surveys</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <p className="text-3xl font-extrabold text-[#6E3FCC] mb-3">95%</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                of employees don&apos;t fully understand their organization&apos;s strategy.
              </p>
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400">Kaplan & Norton, HBR</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <p className="text-3xl font-extrabold text-[#E055CB] mb-3">n(n-1)/2</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Communication channels grow exponentially with headcount. At 300 people, that&apos;s 44,850 potential channels of miscommunication.
              </p>
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400">Brooks&apos; Law, The Mythical Man-Month</p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-2xl p-6">
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
            <a
              href="https://calendly.com/getcampfire/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#E055CB] hover:bg-[#d040b8] rounded-lg transition-colors"
            >
              Book a teardown
              <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
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
                onClick={onRestart}
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
