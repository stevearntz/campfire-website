"use client";

import { useEffect, useState } from "react";
import {
  PASSWORD,
  UNLOCK_KEY,
  BRAND,
  COPY,
  LEVELS,
  QUESTIONS,
  SCALE,
  TIERS,
  NORTHSTAR,
  type LevelId,
  type TierId,
} from "../_lib/config";
import type { SimResponse } from "../_lib/simulate";
import { Wordmark, Eyebrow, Button, TopWordmark } from "./ui";
import Dashboard from "./Dashboard";

type Screen = "gate" | "explainer" | "level" | "survey" | "done" | "dashboard";

const tierLabel = (t: TierId) =>
  t === NORTHSTAR ? "The north star" : TIERS.find((x) => x.id === t)?.name ?? t;

export default function AttuneApp() {
  const [screen, setScreen] = useState<Screen>("gate");
  const [level, setLevel] = useState<LevelId | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [qIndex, setQIndex] = useState(0);
  const [anchor, setAnchor] = useState<SimResponse | null>(null);
  const [locked, setLocked] = useState(false); // debounce auto-advance

  // Restore the (not-real-security) unlock flag from this session. Reading a
  // platform API (sessionStorage) after mount is the legitimate effect case;
  // the single skip-ahead is intentional, not a cascading render.
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(UNLOCK_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScreen("explainer");
    }
  }, []);

  function reset() {
    setLevel(null);
    setAnswers({});
    setQIndex(0);
    setAnchor(null);
    setScreen("explainer");
  }

  function answer(value: number) {
    if (locked) return;
    const q = QUESTIONS[qIndex];
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    setLocked(true);
    // Calm auto-advance — ideas land one at a time.
    window.setTimeout(() => {
      if (qIndex + 1 >= QUESTIONS.length) {
        setScreen("done");
      } else {
        setQIndex((i) => i + 1);
      }
      setLocked(false);
    }, 280);
  }

  function goBack() {
    if (qIndex === 0) {
      setScreen("level");
    } else {
      setQIndex((i) => i - 1);
    }
  }

  function finishToDashboard() {
    if (level) setAnchor({ level, answers });
    setScreen("dashboard");
  }

  return (
    <div className="relative">
      <Motion />
      {screen === "gate" && (
        <Gate
          onUnlock={() => {
            sessionStorage.setItem(UNLOCK_KEY, "1");
            setScreen("explainer");
          }}
        />
      )}

      {screen === "explainer" && (
        <Explainer
          onStart={() => setScreen("level")}
          onDashboard={() => {
            setAnchor(null);
            setScreen("dashboard");
          }}
        />
      )}

      {screen === "level" && (
        <LevelSelect
          onPick={(l) => {
            setLevel(l);
            setQIndex(0);
            setScreen("survey");
          }}
        />
      )}

      {screen === "survey" && (
        <Survey
          index={qIndex}
          selected={answers[QUESTIONS[qIndex].id]}
          onAnswer={answer}
          onBack={goBack}
        />
      )}

      {screen === "done" && <Done onSee={finishToDashboard} />}

      {screen === "dashboard" && <Dashboard anchor={anchor} onReset={reset} />}
    </div>
  );
}

/* ======================================================================= */
/* Screens                                                                 */
/* ======================================================================= */

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-20">
      <TopWordmark />
      <div className="attn-emerge w-full max-w-[640px]">{children}</div>
    </div>
  );
}

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) onUnlock();
    else setError(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={submit} className="attn-emerge w-full max-w-[380px] text-center">
        <div className="mb-8 flex justify-center">
          <Wordmark size="text-4xl" />
        </div>
        <input
          autoFocus
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          className="w-full rounded-full border px-5 py-3 text-center text-sm outline-none transition-all"
          style={{
            borderColor: error ? BRAND.copper : BRAND.lineStrong,
            backgroundColor: BRAND.surface,
            color: BRAND.ink,
          }}
        />
        {error && (
          <p className="mt-3 text-sm" style={{ color: BRAND.copper }}>
            That’s not it. Try again.
          </p>
        )}
        <div className="mt-6">
          <Button type="submit">Enter</Button>
        </div>
      </form>
    </div>
  );
}

function Explainer({
  onStart,
  onDashboard,
}: {
  onStart: () => void;
  onDashboard: () => void;
}) {
  return (
    <Shell>
      <div className="text-center">
        <Eyebrow>{COPY.explainerTagline}</Eyebrow>
        <h1
          className="mt-6 text-5xl leading-[1.05] sm:text-6xl"
          style={{ fontFamily: BRAND.serif, fontWeight: 400, color: BRAND.green }}
        >
          How <span style={{ fontStyle: "italic" }}>cared for</span> do people feel at work?
        </h1>
        <p
          className="mx-auto mt-6 max-w-[46ch] text-lg leading-relaxed"
          style={{ color: BRAND.inkSoft }}
        >
          {COPY.explainerBody}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <Button onClick={onStart} className="px-10">
            {COPY.getStarted}
          </Button>
          <button
            onClick={onDashboard}
            className="text-sm underline-offset-4 transition-colors hover:underline"
            style={{ color: BRAND.copper }}
          >
            {COPY.viewDashboardLink}
          </button>
        </div>
        <p className="mt-10 text-xs uppercase tracking-[0.14em]" style={{ color: BRAND.inkSubtle }}>
          {COPY.explainerMeta}
        </p>
      </div>
    </Shell>
  );
}

function LevelSelect({ onPick }: { onPick: (l: LevelId) => void }) {
  return (
    <Shell>
      <div>
        <Eyebrow>Your role</Eyebrow>
        <h2
          className="mt-5 text-3xl sm:text-4xl"
          style={{ fontFamily: BRAND.serif, fontWeight: 400, color: BRAND.green }}
        >
          {COPY.levelPrompt}
        </h2>
        <p className="mt-3 text-sm" style={{ color: BRAND.inkSoft }}>
          {COPY.levelSub}
        </p>
        <div className="mt-8 space-y-3">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => onPick(l.id)}
              className="group flex w-full items-center justify-between rounded-[14px] border px-5 py-4 text-left transition-all duration-200 hover:border-[color:var(--h)] hover:shadow-[0_2px_8px_rgba(35,66,54,0.07)]"
              style={
                {
                  borderColor: BRAND.line,
                  backgroundColor: BRAND.surface,
                  "--h": BRAND.green,
                } as React.CSSProperties
              }
            >
              <span style={{ color: BRAND.ink }}>{l.label}</span>
              <span
                className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ color: BRAND.copper }}
              >
                →
              </span>
            </button>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function Survey({
  index,
  selected,
  onAnswer,
  onBack,
}: {
  index: number;
  selected?: number;
  onAnswer: (v: number) => void;
  onBack: () => void;
}) {
  const q = QUESTIONS[index];
  const pct = ((index + 1) / QUESTIONS.length) * 100;

  return (
    <>
      {/* progress bar */}
      <div className="fixed inset-x-0 top-0 z-20 h-1" style={{ backgroundColor: BRAND.creamDeep }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            backgroundColor: BRAND.green,
            transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
          }}
        />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-6 py-20">
        <TopWordmark />
        <div className="w-full max-w-[640px]">
          <div className="mb-8 flex items-center justify-between">
            <Eyebrow>{tierLabel(q.tier)}</Eyebrow>
            <span
              className="text-xs uppercase tracking-[0.14em]"
              style={{ color: BRAND.inkSubtle }}
            >
              {index + 1} of {QUESTIONS.length}
            </span>
          </div>

          {/* the question — re-keyed so it emerges on change */}
          <div key={q.id} className="attn-emerge">
            <h2
              className="text-3xl leading-[1.15] sm:text-4xl"
              style={{ fontFamily: BRAND.serif, fontWeight: 400, color: BRAND.green }}
            >
              {q.label}
            </h2>

            <div className="mt-8 space-y-2.5">
              {SCALE.map((opt) => {
                const active = selected === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => onAnswer(opt.value)}
                    className="flex w-full items-center gap-4 rounded-[14px] border px-5 py-4 text-left transition-all duration-200 hover:border-[color:var(--h)]"
                    style={
                      {
                        borderColor: active ? BRAND.green : BRAND.line,
                        backgroundColor: active ? BRAND.green : BRAND.surface,
                        color: active ? BRAND.cream : BRAND.ink,
                        "--h": BRAND.green,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm"
                      style={{
                        border: `1px solid ${active ? BRAND.cream : BRAND.lineStrong}`,
                        color: active ? BRAND.cream : BRAND.inkSoft,
                        fontFamily: BRAND.serif,
                      }}
                    >
                      {opt.value}
                    </span>
                    <span className="text-[0.95rem]">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={onBack}
              className="text-sm transition-colors hover:text-[color:var(--h)]"
              style={{ color: BRAND.inkSoft, ["--h" as string]: BRAND.copper }}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Done({ onSee }: { onSee: () => void }) {
  return (
    <Shell>
      <div className="text-center">
        <Eyebrow>Response received</Eyebrow>
        <h2
          className="mt-6 text-5xl sm:text-6xl"
          style={{ fontFamily: BRAND.serif, fontWeight: 400, color: BRAND.green }}
        >
          {COPY.confirmationTitle}
        </h2>
        <p
          className="mx-auto mt-5 max-w-[44ch] text-lg leading-relaxed"
          style={{ color: BRAND.inkSoft }}
        >
          {COPY.confirmationBody}
        </p>
        <div className="mt-10">
          <Button onClick={onSee} className="px-9">
            {COPY.seeResults}
          </Button>
        </div>
      </div>
    </Shell>
  );
}

/* Scoped keyframes — everything emerges (fade + gentle grow), never bounces.
   Respects prefers-reduced-motion. */
function Motion() {
  return (
    <style>{`
      @keyframes attnEmerge {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: none; }
      }
      .attn-emerge { animation: attnEmerge 340ms cubic-bezier(0.22,0.61,0.36,1) both; }
      @media (prefers-reduced-motion: reduce) {
        .attn-emerge { animation: none; }
      }
    `}</style>
  );
}
