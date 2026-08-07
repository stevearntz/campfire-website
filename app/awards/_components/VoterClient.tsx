"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NOMINEES } from "../_data/nominees";
import { awardByNo, colorForAward } from "../_data/awards";
import { GAME_CODE } from "../_data/config";
import { fireConfetti } from "../_lib/confetti";
import { Certificate } from "./Certificate";

type Phase = "lobby" | "voting" | "closed" | "revealed" | "done";

interface State {
  currentAward: number;
  phase: Phase;
  totalAwards: number;
  voterCount: number;
  myVote: string | null;
  winners: { awardNo: number; winner: string }[];
}

const NAME_KEY = "campfire_awards_voter";
const DARK = "#1C1334";

export default function VoterClient() {
  const [name, setName] = useState<string | null>(null);
  const [state, setState] = useState<State | null>(null);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const lastAward = useRef<number | null>(null);

  // Restore a saved name so a refresh doesn't kick you out of the game.
  // (Client-only localStorage read on mount — intentional post-hydration set.)
  useEffect(() => {
    const saved = localStorage.getItem(NAME_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setName(saved);
  }, []);

  const poll = useCallback(async () => {
    if (!name) return;
    try {
      const res = await fetch(
        `/api/awards/state?voter=${encodeURIComponent(name)}`,
        { cache: "no-store" },
      );
      if (!res.ok) return;
      const data: State = await res.json();
      setState(data);
      // When the host moves to a new award, drop the old selection.
      if (lastAward.current !== data.currentAward) {
        lastAward.current = data.currentAward;
        setMyVote(data.myVote);
        setFilter("");
      } else if (data.myVote) {
        setMyVote(data.myVote);
      }
    } catch {
      /* transient — next tick retries */
    }
  }, [name]);

  useEffect(() => {
    if (!name) return;
    // Async fetch loop; setState only fires after await, never synchronously.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    poll();
    const id = setInterval(poll, 1200);
    return () => clearInterval(id);
  }, [name, poll]);

  // Confetti on each reveal, so it pops on the voter's screen too.
  const prevPhase = useRef<Phase | null>(null);
  useEffect(() => {
    if (state && state.phase === "revealed" && prevPhase.current !== "revealed") {
      fireConfetti(colorForAward(state.currentAward).accent);
    }
    prevPhase.current = state?.phase ?? null;
  }, [state]);

  async function castVote(nominee: string) {
    if (!name || !state || state.phase !== "voting") return;
    setMyVote(nominee); // optimistic
    setError(null);
    try {
      const res = await fetch("/api/awards/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voterName: name,
          awardNo: state.currentAward,
          nominee,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (body.error === "voting_closed") {
          setError("Voting just closed for this one.");
          poll();
        } else {
          setError("Couldn't record that vote — try again.");
        }
        setMyVote(null);
      }
    } catch {
      setError("Network hiccup — try again.");
      setMyVote(null);
    }
  }

  /* ── Join gate ─────────────────────────────────────────────── */
  if (!name) {
    return <JoinGate onJoin={(n) => {
      localStorage.setItem(NAME_KEY, n);
      setName(n);
    }} />;
  }

  const award = state ? awardByNo(state.currentAward) : undefined;
  const color = colorForAward(state?.currentAward ?? 1);

  return (
    <main
      className="min-h-screen px-4 py-8 text-white sm:px-6"
      style={{ backgroundColor: DARK }}
    >
      <div className="mx-auto max-w-3xl">
        {/* header */}
        <div className="mb-6 flex items-center justify-between text-sm">
          <span className="font-semibold tracking-wide" style={{ color: color.accent }}>
            {state && state.phase !== "lobby" && state.phase !== "done"
              ? `Award ${state.currentAward} of ${state.totalAwards}`
              : "Campfire Superlatives"}
          </span>
          <button
            onClick={() => {
              localStorage.removeItem(NAME_KEY);
              setName(null);
            }}
            className="text-white/50 underline-offset-4 hover:text-white hover:underline"
          >
            {name} · switch
          </button>
        </div>

        {!state && <p className="text-white/60">Connecting…</p>}

        {state?.phase === "lobby" && (
          <Centered
            emoji="🔥"
            title="You're in!"
            sub="Hang tight — the host will kick off the first award any second now."
          />
        )}

        {state?.phase === "done" && (
          <Finale winners={state.winners} />
        )}

        {state && (state.phase === "voting" || state.phase === "closed") && award && (
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              {award.preamble ?? "Presented in recognition of being"}
            </div>
            <h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl">
              {award.title}
            </h1>

            {state.phase === "closed" ? (
              <div
                className="rounded-xl border p-5 text-center"
                style={{ borderColor: color.accent, backgroundColor: `${color.accent}18` }}
              >
                <p className="text-lg font-semibold">Voting closed 🥁</p>
                <p className="mt-1 text-white/70">
                  {myVote ? <>You voted for <b>{myVote}</b>.</> : "You didn't get a vote in this round."}
                </p>
                <p className="mt-1 text-sm text-white/50">Envelope, please…</p>
              </div>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <input
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter names…"
                    className="w-full max-w-xs rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                  />
                  <span className="shrink-0 text-sm text-white/50">
                    {state.voterCount} vote{state.voterCount === 1 ? "" : "s"} in
                  </span>
                </div>

                {error && (
                  <p className="mb-2 text-sm text-rose-300">{error}</p>
                )}

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {NOMINEES.filter((n) =>
                    n.name.toLowerCase().includes(filter.trim().toLowerCase()),
                  ).map((n) => {
                    const selected = myVote === n.name;
                    return (
                      <button
                        key={n.name}
                        onClick={() => castVote(n.name)}
                        className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition"
                        style={
                          selected
                            ? { borderColor: color.accent, backgroundColor: color.accent, color: "#fff" }
                            : { borderColor: "rgba(255,255,255,0.14)", backgroundColor: "rgba(255,255,255,0.04)" }
                        }
                      >
                        <span className="font-medium leading-tight">{n.name}</span>
                        {selected && <span aria-hidden>✓</span>}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-center text-sm text-white/50">
                  {myVote ? (
                    <>Locked in for <b className="text-white">{myVote}</b>. Tap another name to change it.</>
                  ) : (
                    "Tap a name to cast your vote."
                  )}
                </p>
              </>
            )}
          </div>
        )}

        {state?.phase === "revealed" && award && (
          <div>
            <p className="mb-3 text-center text-sm uppercase tracking-[0.25em] text-white/50">
              And the award goes to…
            </p>
            <Certificate no={state.currentAward} winner={winnerFor(state, state.currentAward)} />
            <p className="mt-4 text-center text-white/70">
              {myVote ? (
                myVote === winnerFor(state, state.currentAward)
                  ? "🎯 You called it!"
                  : <>You voted for <b className="text-white">{myVote}</b>.</>
              ) : (
                "Get ready — next award coming up."
              )}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function winnerFor(state: State, no: number): string | null {
  return state.winners.find((w) => w.awardNo === no)?.winner ?? null;
}

function Centered({ emoji, title, sub }: { emoji: string; title: string; sub: string }) {
  return (
    <div className="mt-16 text-center">
      <div className="text-5xl">{emoji}</div>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-white/60">{sub}</p>
    </div>
  );
}

function Finale({ winners }: { winners: { awardNo: number; winner: string }[] }) {
  const sorted = [...winners].sort((a, b) => a.awardNo - b.awardNo);
  return (
    <div className="text-center">
      <div className="text-5xl">🏕️</div>
      <h1 className="mt-4 text-3xl font-bold">Congratulations to all of you</h1>
      <p className="mt-2 text-white/60">
        Twenty-five awards, one team, and a very long list of things worth remembering.
      </p>
      <ul className="mx-auto mt-8 max-w-md space-y-2 text-left">
        {sorted.map((w) => {
          const a = awardByNo(w.awardNo);
          const c = colorForAward(w.awardNo);
          return (
            <li
              key={w.awardNo}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            >
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold"
                style={{ backgroundColor: c.accent }}
              >
                {w.awardNo}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm text-white/60">{a?.title}</span>
                <span className="font-semibold">{w.winner}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Join gate ───────────────────────────────────────────────── */
function JoinGate({ onJoin }: { onJoin: (name: string) => void }) {
  const [code, setCode] = useState("");
  const [who, setWho] = useState("");
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().toUpperCase() !== GAME_CODE.toUpperCase()) {
      setErr("That code doesn't match. Check with the host.");
      return;
    }
    if (!who.trim()) {
      setErr("Add your name so we know who's voting.");
      return;
    }
    onJoin(who.trim());
  }

  return (
    <main
      className="grid min-h-screen place-items-center px-4 text-white"
      style={{ backgroundColor: DARK }}
    >
      <form onSubmit={submit} className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="text-4xl">🔥</div>
          <h1 className="mt-3 text-2xl font-bold">Campfire Superlatives</h1>
          <p className="mt-1 text-sm text-white/60">The First &amp; Final Annual. Enter to vote.</p>
        </div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/50">
          Game code
        </label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoCapitalize="characters"
          placeholder="CAMPFIRE"
          className="mb-4 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 tracking-[0.2em] text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
        />
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/50">
          Your name
        </label>
        <input
          value={who}
          onChange={(e) => setWho(e.target.value)}
          placeholder="First Last"
          className="mb-4 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
        />
        {err && <p className="mb-3 text-sm text-rose-300">{err}</p>}
        <button
          type="submit"
          className="w-full rounded-lg py-3 font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#E055CB" }}
        >
          Join the game
        </button>
      </form>
    </main>
  );
}
