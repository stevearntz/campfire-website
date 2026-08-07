"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NOMINEES } from "../_data/nominees";
import { colorForAward, TOTAL_AWARDS } from "../_data/awards";
import { GAME_CODE } from "../_data/config";
import { fireConfetti } from "../_lib/confetti";
import { Certificate } from "./Certificate";

type Phase = "lobby" | "voting" | "closed" | "revealed" | "done";
interface Tally { nominee: string; count: number }
interface Winner { awardNo: number; winner: string }
interface State {
  currentAward: number;
  phase: Phase;
  totalAwards: number;
  voterCount: number;
  winners: Winner[];
  tally: Tally[] | null;
}

const DARK = "#1C1334";
const KEY_STORE = "campfire_awards_hostkey";

export default function HostConsole() {
  const [hostKey, setHostKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [state, setState] = useState<State | null>(null);
  const [crownPick, setCrownPick] = useState("");
  const [busy, setBusy] = useState(false);

  // Pull the key from ?key=… (or a prior session) so the host lands ready.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("key");
    const saved = fromUrl || sessionStorage.getItem(KEY_STORE);
    if (saved) {
      sessionStorage.setItem(KEY_STORE, saved);
      setHostKey(saved);
    }
  }, []);

  const poll = useCallback(async () => {
    if (!hostKey) return;
    try {
      const res = await fetch(
        `/api/awards/state?host=1&key=${encodeURIComponent(hostKey)}`,
        { cache: "no-store" },
      );
      if (res.ok) setState(await res.json());
    } catch {
      /* retry next tick */
    }
  }, [hostKey]);

  useEffect(() => {
    if (!hostKey) return;
    poll();
    const id = setInterval(poll, 1200);
    return () => clearInterval(id);
  }, [hostKey, poll]);

  // Fire confetti once each time an award transitions into "revealed".
  const prevPhase = useRef<Phase | null>(null);
  useEffect(() => {
    if (state && state.phase === "revealed" && prevPhase.current !== "revealed") {
      fireConfetti(colorForAward(state.currentAward).accent);
    }
    prevPhase.current = state?.phase ?? null;
  }, [state]);

  const control = useCallback(
    async (action: string, extra: Record<string, unknown> = {}) => {
      if (!hostKey || busy) return;
      setBusy(true);
      try {
        const res = await fetch("/api/awards/control", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: hostKey, action, ...extra }),
        });
        if (res.ok) {
          const data = await res.json();
          setState((s) => (s ? { ...s, ...data } : s));
        }
      } finally {
        setBusy(false);
        poll();
      }
    },
    [hostKey, busy, poll],
  );

  if (!hostKey) {
    return (
      <main className="grid min-h-screen place-items-center px-4 text-white" style={{ backgroundColor: DARK }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!keyInput.trim()) return;
            sessionStorage.setItem(KEY_STORE, keyInput.trim());
            setHostKey(keyInput.trim());
          }}
          className="w-full max-w-sm text-center"
        >
          <div className="text-4xl">🎛️</div>
          <h1 className="mt-3 text-2xl font-bold">Host Console</h1>
          <p className="mt-1 mb-5 text-sm text-white/60">Enter the host key to run the show.</p>
          <input
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="host key"
            className="mb-4 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
          />
          <button className="w-full rounded-lg py-3 font-semibold" style={{ backgroundColor: "#E055CB" }}>
            Enter
          </button>
          <p className="mt-3 text-xs text-white/40">Tip: open <code>/awards/host?key=…</code> to skip this.</p>
        </form>
      </main>
    );
  }

  const color = colorForAward(state?.currentAward ?? 1);
  const winner = state?.winners.find((w) => w.awardNo === state.currentAward)?.winner ?? null;
  const tally = state?.tally ?? [];
  const maxCount = Math.max(1, ...tally.map((t) => t.count));
  const leader = tally[0]?.nominee ?? null;

  return (
    <main className="min-h-screen px-4 py-6 text-white sm:px-6" style={{ backgroundColor: DARK }}>
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* ── Left: certificate + join ──────────────────────────── */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold tracking-wide" style={{ color: color.accent }}>
              {state?.phase === "done"
                ? "Finale"
                : `Award ${state?.currentAward ?? 1} of ${TOTAL_AWARDS}`}
            </span>
            <PhaseBadge phase={state?.phase} accent={color.accent} />
          </div>

          {state?.phase === "done" ? (
            <FinaleCard winners={state.winners} />
          ) : (
            <div className={state?.phase === "revealed" ? "animate-[pop_.5s_ease-out]" : ""}>
              <Certificate no={state?.currentAward ?? 1} winner={winner} />
            </div>
          )}

          {/* join instructions — big for the screen-share */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center">
            <span className="text-white/60">Play along at</span>
            <span className="text-lg font-bold">getcampfire.com/awards</span>
            <span className="text-white/60">code</span>
            <span className="rounded-md px-2 py-1 text-lg font-bold tracking-[0.2em]" style={{ backgroundColor: color.accent }}>
              {GAME_CODE}
            </span>
            <span className="w-full text-sm text-white/50">{state?.voterCount ?? 0} vote{state?.voterCount === 1 ? "" : "s"} in this round</span>
          </div>
        </div>

        {/* ── Right: timers + tally + controls ──────────────────── */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <Timer label="Voting" seconds={60} accent={color.accent} />
            <Timer label="Storytelling" seconds={90} accent={color.accent} />
          </div>

          {/* live tally */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">Live tally</h3>
              {leader && state?.phase !== "revealed" && (
                <button
                  onClick={() => control("reveal", { winner: leader })}
                  disabled={busy}
                  className="rounded-md px-2.5 py-1 text-xs font-bold text-white disabled:opacity-50"
                  style={{ backgroundColor: color.accent }}
                >
                  👑 Crown leader
                </button>
              )}
            </div>
            {tally.length === 0 ? (
              <p className="py-4 text-center text-sm text-white/40">No votes yet.</p>
            ) : (
              <ul className="space-y-1.5">
                {tally.map((t) => (
                  <li key={t.nominee}>
                    <button
                      onClick={() => control("reveal", { winner: t.nominee })}
                      disabled={busy}
                      className="group relative block w-full overflow-hidden rounded-md text-left disabled:opacity-60"
                      title="Click to crown"
                    >
                      <span
                        className="absolute inset-y-0 left-0 rounded-md transition-all"
                        style={{ width: `${(t.count / maxCount) * 100}%`, backgroundColor: `${color.accent}55` }}
                      />
                      <span className="relative flex items-center justify-between px-3 py-1.5 text-sm">
                        <span className="font-medium">{t.nominee}</span>
                        <span className="tabular-nums text-white/70">{t.count}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* crown anyone (ties / narrative picks) */}
            <div className="mt-3 flex gap-2">
              <select
                value={crownPick}
                onChange={(e) => setCrownPick(e.target.value)}
                className="min-w-0 flex-1 rounded-md border border-white/15 bg-[#241a44] px-2 py-1.5 text-sm text-white"
              >
                <option value="">Crown anyone…</option>
                {NOMINEES.map((n) => (
                  <option key={n.name} value={n.name}>{n.name}</option>
                ))}
              </select>
              <button
                onClick={() => crownPick && control("reveal", { winner: crownPick })}
                disabled={!crownPick || busy}
                className="rounded-md border border-white/20 px-3 py-1.5 text-sm font-semibold disabled:opacity-40"
              >
                👑
              </button>
            </div>
          </div>

          {/* controls */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="grid grid-cols-2 gap-2">
              {state?.phase === "lobby" || state?.phase === "closed" || state?.phase === "voting" ? (
                <Ctl onClick={() => control("open")} disabled={busy} accent={color.accent} full>
                  ▶ Open voting
                </Ctl>
              ) : null}
              {state?.phase === "voting" && (
                <Ctl onClick={() => control("close")} disabled={busy}>⏸ Close voting</Ctl>
              )}
              {state?.phase === "revealed" && (
                <Ctl onClick={() => control("reopen")} disabled={busy}>↩ Reopen</Ctl>
              )}
              <Ctl onClick={() => control("prev")} disabled={busy}>← Prev</Ctl>
              <Ctl onClick={() => control("next")} disabled={busy} accent={color.accent}>Next →</Ctl>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <button
                onClick={() => control("finish")}
                disabled={busy}
                className="text-xs text-white/50 hover:text-white"
              >
                Jump to finale
              </button>
              <button
                onClick={() => {
                  if (confirm("Reset the entire game? This wipes all votes and winners.")) control("reset");
                }}
                disabled={busy}
                className="text-xs text-rose-300/70 hover:text-rose-300"
              >
                Reset game
              </button>
            </div>
          </div>

          {/* storytelling prompt */}
          {state?.phase === "revealed" && winner && (
            <div className="rounded-xl border p-4 text-center" style={{ borderColor: color.accent, backgroundColor: `${color.accent}18` }}>
              <p className="text-sm uppercase tracking-wide text-white/60">Storytelling</p>
              <p className="mt-1 text-lg font-semibold">
                Who&apos;s got a story about why <span style={{ color: color.accent }}>{winner}</span> earned this?
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes pop{0%{transform:scale(.94);opacity:.4}60%{transform:scale(1.02)}100%{transform:scale(1);opacity:1}}`}</style>
    </main>
  );
}

function PhaseBadge({ phase, accent }: { phase?: Phase; accent: string }) {
  const map: Record<Phase, string> = {
    lobby: "Lobby",
    voting: "Voting open",
    closed: "Voting closed",
    revealed: "Revealed",
    done: "Done",
  };
  if (!phase) return null;
  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-semibold"
      style={{ backgroundColor: phase === "voting" ? accent : "rgba(255,255,255,0.1)" }}
    >
      {map[phase]}
    </span>
  );
}

function Ctl({
  children,
  onClick,
  disabled,
  accent,
  full,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  accent?: string;
  full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${full ? "col-span-2" : ""}`}
      style={accent ? { backgroundColor: accent, color: "#fff" } : { backgroundColor: "rgba(255,255,255,0.08)", color: "#fff" }}
    >
      {children}
    </button>
  );
}

/* Client-side countdown — the host drives these; they don't sync to voters. */
function Timer({ label, seconds, accent }: { label: string; seconds: number; accent: string }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const [base, setBase] = useState(seconds);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            setRunning(false);
            try {
              const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
              const ac = new Ctx();
              const o = ac.createOscillator();
              const g = ac.createGain();
              o.connect(g); g.connect(ac.destination);
              o.frequency.value = 660; g.gain.value = 0.05;
              o.start(); o.stop(ac.currentTime + 0.25);
            } catch { /* audio optional */ }
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  const mm = Math.floor(remaining / 60);
  const ss = remaining % 60;
  const done = remaining === 0;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
      <div className="text-xs font-semibold uppercase tracking-wide text-white/50">{label}</div>
      <div
        className={`my-1 text-4xl font-bold tabular-nums ${done ? "animate-pulse" : ""}`}
        style={{ color: done ? "#F87171" : running ? accent : "#fff" }}
      >
        {mm}:{String(ss).padStart(2, "0")}
      </div>
      <div className="flex items-center justify-center gap-1.5">
        <button
          onClick={() => setRunning((r) => !r)}
          className="rounded-md px-2.5 py-1 text-xs font-semibold"
          style={{ backgroundColor: running ? "rgba(255,255,255,0.12)" : accent }}
        >
          {running ? "Pause" : remaining === 0 ? "Done" : "Start"}
        </button>
        <button
          onClick={() => { setRunning(false); setRemaining(base); }}
          className="rounded-md bg-white/10 px-2.5 py-1 text-xs"
        >
          Reset
        </button>
        <select
          value={base}
          onChange={(e) => { const v = Number(e.target.value); setBase(v); setRemaining(v); setRunning(false); }}
          className="rounded-md border border-white/15 bg-[#241a44] px-1.5 py-1 text-xs text-white"
        >
          {[30, 45, 60, 90, 120, 180].map((s) => (
            <option key={s} value={s}>{s < 60 ? `${s}s` : `${s / 60}m`}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function FinaleCard({ winners }: { winners: Winner[] }) {
  const sorted = [...winners].sort((a, b) => a.awardNo - b.awardNo);
  return (
    <div className="rounded-xl p-8 text-center" style={{ backgroundColor: "#241a44" }}>
      <div className="text-4xl">🏕️</div>
      <h2 className="mt-3 text-3xl font-bold">Congratulations to all of you</h2>
      <p className="mt-1 text-white/60">Twenty-five awards, one team, a very long list of things worth remembering.</p>
      <div className="mt-6 grid grid-cols-1 gap-1.5 text-left sm:grid-cols-2">
        {sorted.map((w) => {
          const c = colorForAward(w.awardNo);
          return (
            <div key={w.awardNo} className="flex items-center gap-2 rounded-md bg-white/5 px-2.5 py-1.5">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold" style={{ backgroundColor: c.accent }}>
                {w.awardNo}
              </span>
              <span className="truncate text-sm font-semibold">{w.winner}</span>
            </div>
          );
        })}
      </div>
      {winners.length === 0 && <p className="mt-4 text-white/40">No winners recorded yet.</p>}
    </div>
  );
}
