"use client";

import { useState } from "react";
import { Icon } from "../../_components/Icon";

const DIRECTIONS = [
  { key: "A", label: "A · Take studio" },
  { key: "B", label: "B · Guided run" },
  { key: "C", label: "C · The circle" },
] as const;

const paceBars = [
  { label: "1", h: "48%", c: "bg-cf-meadow-400" },
  { label: "2", h: "56%", c: "bg-cf-meadow-400" },
  { label: "3", h: "52%", c: "bg-cf-meadow-400" },
  { label: "4", h: "92%", c: "bg-cf-ladybug-500" },
  { label: "5", h: "64%", c: "bg-cf-canary-500" },
  { label: "6", h: "58%", c: "bg-cf-meadow-400" },
  { label: "7", h: "70%", c: "bg-cf-canary-500" },
  { label: "8", h: "96%", c: "bg-cf-ladybug-500" },
];

const beats = [
  {
    label: "Situation",
    actual: "3:10 / 3:00",
    color: "text-cf-meadow-600",
    bar: "bg-cf-meadow-600",
    w: "52%",
  },
  {
    label: "Complication",
    actual: "6:44 / 5:00",
    color: "text-cf-ladybug-600",
    bar: "bg-cf-ladybug-600",
    w: "100%",
  },
  {
    label: "Question",
    actual: "1:20 / 2:00",
    color: "text-cf-canary-600",
    bar: "bg-cf-canary-600",
    w: "33%",
  },
  {
    label: "Answer",
    actual: "—  / 6:00",
    color: "text-cf-gray-300",
    bar: "bg-cf-gray-300",
    w: "0%",
  },
  {
    label: "The ask",
    actual: "—  / 4:00",
    color: "text-cf-gray-300",
    bar: "bg-cf-gray-300",
    w: "0%",
  },
];

const SELF_CHECKS = [
  "I said the ask out loud, in one sentence, without hedging.",
  "I paused after the number instead of filling the silence.",
  "I could see the moment the room's belief moved.",
  "I finished inside 20 minutes without cutting the close.",
];

const rubric = [
  { label: "Clarity of the ask", score: "3 / 5", filled: 3 },
  { label: "Strength of the spine", score: "4 / 5", filled: 4 },
  { label: "Evidence that lands", score: "4 / 5", filled: 4 },
  { label: "Pace & presence", score: "3 / 5", filled: 3 },
  { label: "Handling the room", score: "2 / 5", filled: 2 },
];

const commentPins = [
  { left: "22%", color: "bg-cf-coach-rose-500" },
  { left: "52%", color: "bg-cf-purple-400" },
  { left: "78%", color: "bg-cf-coach-rose-500" },
];

export function Rehearse() {
  const [dir, setDir] = useState<"A" | "B" | "C">("A");
  const [selfChecks, setSelfChecks] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  return (
    <div className="px-12 pt-9 pb-[70px]">
      <div className="text-[12px] font-bold tracking-[0.18em] text-cf-purple-600 uppercase">
        Rehearsal studio
      </div>
      <h1 className="mt-3 text-[38px] leading-[1.15] font-bold tracking-[-0.015em] text-cf-indigo-700">
        Say it out loud, three different ways
      </h1>
      <p className="mt-3 max-w-[640px] text-[18px] leading-[1.6] text-cf-gray-500">
        Three feedback flows, three different kinds of truth. Pick one to
        compare — I&apos;d love to know which shape feels right before we build
        it out.
      </p>

      <div className="mt-[26px] inline-flex gap-1 rounded-[10px] border border-cf-gray-200 bg-white p-1">
        {DIRECTIONS.map((d) => (
          <button
            key={d.key}
            onClick={() => setDir(d.key)}
            className={`cursor-pointer rounded-[7px] px-[18px] py-[11px] text-[13px] font-bold ${
              dir === d.key
                ? "bg-cf-indigo-1100 text-white"
                : "text-cf-gray-500"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Direction A */}
      {dir === "A" && (
        <div className="mt-[26px]">
          <div className="flex items-baseline gap-[14px]">
            <span className="rounded-full bg-cf-purple-600 px-3 py-[6px] text-[12px] font-extrabold tracking-[0.1em] text-white">
              A
            </span>
            <div className="text-[22px] font-bold text-cf-indigo-700">
              Take studio — record, then read the machine&apos;s honest notes
            </div>
          </div>
          <p className="mt-2 max-w-[640px] text-[16px] leading-[1.6] text-cf-gray-500">
            Solo, low stakes, repeatable. Best for the first two runs, when the
            problems are mechanical.
          </p>
          <div className="mt-[22px] grid grid-cols-[1.4fr_1fr] items-start gap-6">
            {/* Left column */}
            <div>
              <div className="topo-pattern relative aspect-[16/9] overflow-hidden rounded-2xl bg-cf-indigo-1100">
                <div className="absolute inset-0 z-[1] grid place-items-center">
                  <div className="text-center">
                    <Icon name="person" className="text-[44px] text-white/50" />
                    <div className="mt-[10px] text-[14px] text-white/60">
                      Camera preview
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 left-0 z-[2] flex items-center gap-[14px] bg-gradient-to-t from-black/60 to-transparent px-[18px] py-4">
                  <div className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-cf-ladybug-600">
                    <Icon
                      name="fiber_manual_record"
                      className="text-[22px] text-white"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="h-1 rounded-[2px] bg-white/25">
                      <div className="h-full w-[38%] rounded-[2px] bg-white" />
                    </div>
                  </div>
                  <div className="font-mono text-[13px] text-white">
                    07:41 / 20:00
                  </div>
                </div>
                <div className="absolute top-[14px] right-[14px] z-[2] w-[180px] rounded-lg bg-cf-indigo-1100/80 px-3 py-[10px]">
                  <div className="text-[9px] font-bold tracking-[0.12em] text-cf-purple-300 uppercase">
                    Slide 4 of 8
                  </div>
                  <div className="mt-[5px] text-[11px] leading-[1.4] text-white">
                    Half of them have never managed before
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-cf-gray-100 bg-white p-6">
                <div className="flex items-center justify-between">
                  <div className="text-[17px] font-bold text-cf-indigo-700">
                    Take 2 · readout
                  </div>
                  <span className="text-[12px] text-cf-gray-400">
                    18:42 · yesterday
                  </span>
                </div>
                <div className="mt-[18px] grid grid-cols-4 gap-[14px]">
                  <div className="rounded-[10px] bg-cf-meadow-50 p-[14px]">
                    <div className="text-[24px] font-extrabold text-cf-meadow-700">
                      148
                    </div>
                    <div className="mt-[3px] text-[11px] font-bold tracking-[0.1em] text-cf-gray-500 uppercase">
                      wpm
                    </div>
                  </div>
                  <div className="rounded-[10px] bg-cf-canary-50 p-[14px]">
                    <div className="text-[24px] font-extrabold text-cf-canary-700">
                      11
                    </div>
                    <div className="mt-[3px] text-[11px] font-bold tracking-[0.1em] text-cf-gray-500 uppercase">
                      fillers
                    </div>
                  </div>
                  <div className="rounded-[10px] bg-cf-purple-050 p-[14px]">
                    <div className="text-[24px] font-extrabold text-cf-purple-600">
                      6
                    </div>
                    <div className="mt-[3px] text-[11px] font-bold tracking-[0.1em] text-cf-gray-500 uppercase">
                      pauses used
                    </div>
                  </div>
                  <div className="rounded-[10px] bg-cf-ladybug-50 p-[14px]">
                    <div className="text-[24px] font-extrabold text-cf-ladybug-600">
                      0:38
                    </div>
                    <div className="mt-[3px] text-[11px] font-bold tracking-[0.1em] text-cf-gray-500 uppercase">
                      on the ask
                    </div>
                  </div>
                </div>
                <div className="mt-[22px]">
                  <div className="text-[11px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
                    Pace across the deck
                  </div>
                  <div className="mt-3 flex h-[76px] items-stretch gap-[6px]">
                    {paceBars.map((p) => (
                      <div
                        key={p.label}
                        className="flex h-full flex-1 flex-col items-center justify-end gap-[5px]"
                      >
                        <div
                          className={`w-full flex-none rounded-[3px] ${p.c}`}
                          style={{ height: p.h }}
                        />
                        <div className="text-[9px] text-cf-gray-400">
                          {p.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-[22px] rounded-[10px] bg-cf-purple-050 px-[18px] py-4">
                  <div className="text-[15px] leading-[1.6] text-cf-indigo-700">
                    <strong>The pattern:</strong> you speed up whenever
                    you&apos;re about to ask for something. Slides 4 and 8 are
                    40% faster than your baseline. Say the ask, then stop talking
                    for two full seconds.
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-cf-gray-100 bg-white p-[22px]">
                <div className="text-[12px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
                  Transcript · flagged
                </div>
                <div className="mt-[14px] text-[14px] leading-[1.75] text-cf-gray-600">
                  …so{" "}
                  <span className="rounded bg-cf-canary-100 px-1">um</span> what
                  we&apos;re seeing is that{" "}
                  <span className="rounded bg-cf-canary-100 px-1">
                    basically
                  </span>{" "}
                  half of these managers are first-timers, and{" "}
                  <span className="rounded bg-cf-canary-100 px-1">you know</span>{" "}
                  the data says their teams turn over at almost twice the rate…
                </div>
                <div className="mt-4 text-[13px] leading-[1.6] text-cf-gray-500">
                  Your top three: <strong>um</strong> (5),{" "}
                  <strong>basically</strong> (3), <strong>you know</strong> (3).
                </div>
              </div>
              <div className="rounded-2xl border border-cf-gray-100 bg-white p-[22px]">
                <div className="text-[12px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
                  Your takes
                </div>
                <div className="mt-[14px] flex flex-col gap-3">
                  <div className="flex items-center gap-3 border-b border-cf-gray-100 pb-3">
                    <Icon
                      name="play_circle"
                      className="text-[20px] text-cf-purple-600"
                    />
                    <div>
                      <div className="text-[14px] font-semibold text-cf-indigo-700">
                        Take 2
                      </div>
                      <div className="text-[12px] text-cf-gray-500">
                        18:42 · 11 fillers
                      </div>
                    </div>
                    <span className="ml-auto text-[12px] font-bold text-cf-meadow-700">
                      Best
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon
                      name="play_circle"
                      className="text-[20px] text-cf-gray-400"
                    />
                    <div>
                      <div className="text-[14px] font-semibold text-cf-gray-600">
                        Take 1
                      </div>
                      <div className="text-[12px] text-cf-gray-500">
                        23:10 · 26 fillers
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="topo-pattern relative overflow-hidden rounded-2xl bg-cf-indigo-1100 p-[22px]">
                <div className="relative z-[1]">
                  <div className="text-[11px] font-bold tracking-[0.14em] text-cf-purple-300 uppercase">
                    Then
                  </div>
                  <div className="mt-[10px] text-[15px] leading-[1.6] text-white">
                    Send your best take to Dana, or open it for peer comments in
                    flow C.
                  </div>
                  <button className="mt-4 cursor-pointer rounded-lg bg-white px-[18px] py-[11px] text-[12px] font-bold tracking-[0.12em] text-cf-purple-600 uppercase">
                    Share take 2
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Direction B */}
      {dir === "B" && (
        <div className="mt-[26px]">
          <div className="flex items-baseline gap-[14px]">
            <span className="rounded-full bg-cf-pink-400 px-3 py-[6px] text-[12px] font-extrabold tracking-[0.1em] text-white">
              B
            </span>
            <div className="text-[22px] font-bold text-cf-indigo-700">
              Guided run — a metronome, not a report card
            </div>
          </div>
          <p className="mt-2 max-w-[640px] text-[16px] leading-[1.6] text-cf-gray-500">
            Feedback arrives while you&apos;re talking: per-slide time targets, a
            teleprompter you can turn off, and a nudge when you drift. Ends in
            self-assessment, not a score.
          </p>
          <div className="mt-[22px] grid grid-cols-[1.5fr_1fr] items-start gap-6">
            {/* Left panel */}
            <div className="topo-pattern relative overflow-hidden rounded-2xl bg-cf-indigo-1100 p-7">
              <div className="relative z-[1]">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold tracking-[0.16em] text-cf-purple-300 uppercase">
                    Slide 4 of 8 · complication
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <span className="text-[12px] text-white/60">
                      target 2:00
                    </span>
                    <span className="font-mono text-[20px] font-bold text-cf-warm-300">
                      2:34
                    </span>
                  </div>
                </div>
                <div className="mt-5 text-[26px] leading-[1.3] font-bold text-white">
                  Half of them have never managed before
                </div>
                <div className="mt-[26px] rounded-xl border border-white/14 bg-white/7 px-6 py-[22px]">
                  <div className="text-[10px] font-bold tracking-[0.16em] text-white/50 uppercase">
                    Teleprompter
                  </div>
                  <div className="mt-3 text-[19px] leading-[1.65] text-white/55">
                    We promoted our strongest individual contributors, which was
                    the right call.
                  </div>
                  <div className="mt-2 text-[21px] leading-[1.6] font-semibold text-white">
                    Seventeen of the thirty-four have never had a direct report
                    before. <span className="text-cf-warm-300">[ pause ]</span>
                  </div>
                  <div className="mt-2 text-[19px] leading-[1.65] text-white/40">
                    And we handed them a team in the middle of a reorg.
                  </div>
                </div>
                <div className="mt-[22px] flex items-center gap-[14px]">
                  <div className="h-[6px] flex-1 overflow-hidden rounded-[3px] bg-white/16">
                    <div
                      className="h-full w-[44%]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right,var(--color-cf-purple-300),var(--color-cf-pink-300))",
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/14">
                      <Icon name="pause" className="text-[20px] text-white" />
                    </div>
                    <div className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/14">
                      <Icon
                        name="skip_next"
                        className="text-[20px] text-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-start gap-[10px] rounded-[10px] border border-cf-warm-300/35 bg-cf-warm-300/14 px-4 py-[14px]">
                  <Icon
                    name="speed"
                    className="mt-[1px] text-[18px] text-cf-warm-300"
                  />
                  <div className="text-[14px] leading-[1.55] text-white/90">
                    You&apos;re 34 seconds over on this beat. The next slide
                    carries your argument — leave it room.
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-cf-gray-100 bg-white p-[22px]">
                <div className="text-[12px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
                  Beat budget · 20 min
                </div>
                <div className="mt-4 flex flex-col gap-[11px]">
                  {beats.map((b) => (
                    <div key={b.label}>
                      <div className="flex justify-between text-[13px] text-cf-gray-600">
                        <span className="font-semibold">{b.label}</span>
                        <span className={`font-bold ${b.color}`}>
                          {b.actual}
                        </span>
                      </div>
                      <div className="mt-[6px] h-[6px] overflow-hidden rounded-[3px] bg-cf-gray-100">
                        <div
                          className={`h-full rounded-[3px] ${b.bar}`}
                          style={{ width: b.w }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-cf-gray-100 bg-white p-[22px]">
                <div className="text-[12px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
                  After the run · you assess
                </div>
                <div className="mt-4 flex flex-col gap-[13px]">
                  {SELF_CHECKS.map((label, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        setSelfChecks((prev) =>
                          prev.map((v, idx) => (idx === i ? !v : v)),
                        )
                      }
                      className="flex cursor-pointer items-start gap-[10px] text-[14px] leading-[1.5] text-cf-gray-600"
                    >
                      <Icon
                        name={
                          selfChecks[i]
                            ? "check_box"
                            : "check_box_outline_blank"
                        }
                        className={`mt-[1px] text-[19px] ${
                          selfChecks[i]
                            ? "text-cf-purple-600"
                            : "text-cf-gray-300"
                        }`}
                      />
                      <div>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Direction C */}
      {dir === "C" && (
        <div className="mt-[26px]">
          <div className="flex items-baseline gap-[14px]">
            <span className="rounded-full bg-cf-coach-rose-600 px-3 py-[6px] text-[12px] font-extrabold tracking-[0.1em] text-white">
              C
            </span>
            <div className="text-[22px] font-bold text-cf-indigo-700">
              The circle — humans, timestamped
            </div>
          </div>
          <p className="mt-2 max-w-[640px] text-[16px] leading-[1.6] text-cf-gray-500">
            Post a take, get comments pinned to the moment they happened. Async
            from a peer, then live with your coach against the same rubric.
          </p>
          <div className="mt-[22px] grid grid-cols-[1.5fr_1fr] items-start gap-6">
            {/* Left card */}
            <div className="rounded-2xl border border-cf-gray-100 bg-white p-6">
              <div className="topo-pattern relative aspect-[16/9] overflow-hidden rounded-xl bg-cf-indigo-1100">
                <div className="absolute inset-0 z-[1] grid place-items-center">
                  <Icon
                    name="play_circle"
                    className="text-[50px] text-white/55"
                  />
                </div>
                <div className="absolute right-0 bottom-0 left-0 z-[2] bg-gradient-to-t from-black/65 to-transparent px-4 py-[14px]">
                  <div className="relative h-[5px] rounded-[3px] bg-white/25">
                    <div className="absolute top-0 bottom-0 left-0 w-[52%] rounded-[3px] bg-white" />
                    {commentPins.map((pin, i) => (
                      <div
                        key={i}
                        className={`absolute top-[-4px] h-[13px] w-[13px] rounded-full border-2 border-white ${pin.color}`}
                        style={{ left: pin.left }}
                      />
                    ))}
                  </div>
                  <div className="mt-[10px] flex justify-between font-mono text-[12px] text-white/75">
                    <span>09:42</span>
                    <span>Take 2 · shared with 2 people</span>
                    <span>18:42</span>
                  </div>
                </div>
              </div>
              <div className="mt-[22px] flex flex-col gap-4">
                <div className="flex gap-[13px]">
                  <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full bg-cf-coach-rose-500 text-[12px] font-extrabold text-white">
                    DR
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-[9px]">
                      <span className="text-[14px] font-bold text-cf-indigo-700">
                        Dana
                      </span>
                      <span className="rounded bg-cf-rose-50 px-[7px] py-[3px] font-mono text-[11px] font-bold text-cf-coach-rose-600">
                        04:12
                      </span>
                      <span className="text-[12px] text-cf-gray-400">coach</span>
                    </div>
                    <div className="mt-[6px] text-[15px] leading-[1.6] text-cf-gray-600">
                      This is the strongest moment in the whole run and you
                      apologize right before it. Cut “I know this is a lot” and
                      just give us the number.
                    </div>
                  </div>
                </div>
                <div className="flex gap-[13px]">
                  <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full bg-cf-purple-400 text-[12px] font-extrabold text-white">
                    MK
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-[9px]">
                      <span className="text-[14px] font-bold text-cf-indigo-700">
                        Marcus
                      </span>
                      <span className="rounded bg-cf-purple-050 px-[7px] py-[3px] font-mono text-[11px] font-bold text-cf-purple-600">
                        09:48
                      </span>
                      <span className="text-[12px] text-cf-gray-400">peer</span>
                    </div>
                    <div className="mt-[6px] text-[15px] leading-[1.6] text-cf-gray-600">
                      I lost the thread here — I couldn&apos;t tell if the pilot
                      was the recommendation or one option among several. As a
                      finance person I want the number before the story.
                    </div>
                    <div className="mt-[10px] flex gap-2">
                      <span className="cursor-pointer text-[12px] font-semibold text-cf-purple-600">
                        Reply
                      </span>
                      <span className="cursor-pointer text-[12px] font-semibold text-cf-gray-400">
                        Mark addressed
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-[13px] border-t border-cf-gray-100 pt-4">
                  <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full bg-cf-purple-300 text-[12px] font-extrabold text-cf-indigo-1100">
                    CM
                  </div>
                  <input
                    placeholder="Reply at 09:48…"
                    className="flex-1 rounded-lg border border-cf-gray-200 px-[14px] py-3 text-[15px] text-cf-indigo-700"
                  />
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-cf-gray-100 bg-white p-[22px]">
                <div className="text-[12px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
                  Shared rubric
                </div>
                <div className="mt-4 flex flex-col gap-[14px]">
                  {rubric.map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between text-[13px]">
                        <span className="font-semibold text-cf-gray-600">
                          {r.label}
                        </span>
                        <span className="font-bold text-cf-indigo-700">
                          {r.score}
                        </span>
                      </div>
                      <div className="mt-[6px] flex gap-1">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-[6px] flex-1 rounded-[3px] ${
                              i < r.filled
                                ? "bg-cf-purple-500"
                                : "bg-cf-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-[18px] border-t border-cf-gray-100 pt-4 text-[13px] leading-[1.6] text-cf-gray-500">
                  Peer and coach score the same five lines. Where they disagree
                  is usually the interesting part.
                </div>
              </div>
              <div className="rounded-2xl border border-cf-purple-100 bg-cf-purple-050 p-[22px]">
                <div className="text-[12px] font-bold tracking-[0.14em] text-cf-purple-700 uppercase">
                  Live session
                </div>
                <div className="mt-[10px] text-[16px] font-bold text-cf-indigo-700">
                  Dry run with Dana
                </div>
                <div className="mt-1 text-[14px] text-cf-gray-500">
                  Aug 20 · 10:00 AM · 45 min
                </div>
                <div className="mt-[14px] text-[14px] leading-[1.6] text-cf-gray-600">
                  Agenda auto-built from open comments: the ask placement, the
                  finance objection, slide 4 pacing.
                </div>
                <button className="mt-4 cursor-pointer rounded-lg bg-cf-purple-600 px-5 py-3 text-[12px] font-bold tracking-[0.12em] text-white uppercase">
                  Join session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
