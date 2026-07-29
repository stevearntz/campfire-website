"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "../../_components/Icon";

const DIRECTIONS = [
  { key: "A", label: "A · Take studio" },
  { key: "B", label: "B · Guided run" },
  { key: "C", label: "C · The circle" },
] as const;

export function Rehearse() {
  const [dir, setDir] = useState<"A" | "B" | "C">("A");

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

          <div className="mt-[22px] rounded-2xl border border-dashed border-cf-gray-200 bg-white px-8 py-14 text-center">
            <Icon name="videocam" className="text-[40px] text-cf-purple-300" />
            <div className="mt-3 text-[18px] font-bold text-cf-indigo-700">
              No takes yet
            </div>
            <p className="mx-auto mt-2 max-w-[440px] text-[15px] leading-[1.6] text-cf-gray-500">
              Record your first run and you&apos;ll get an honest readout — words
              per minute, filler words, pauses, and where you sped up. Solo,
              low-stakes, repeatable.
            </p>
            <button
              type="button"
              className="mt-6 rounded-lg bg-cf-purple-600 px-5 py-3 text-[13px] font-bold tracking-[0.12em] text-white uppercase"
            >
              Record a take
            </button>
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

          <div className="mt-[22px] rounded-2xl border border-dashed border-cf-gray-200 bg-white px-8 py-14 text-center">
            <Icon
              name="dashboard_customize"
              className="text-[40px] text-cf-purple-300"
            />
            <div className="mt-3 text-[18px] font-bold text-cf-indigo-700">
              Build your deck first
            </div>
            <p className="mx-auto mt-2 max-w-[440px] text-[15px] leading-[1.6] text-cf-gray-500">
              The guided run walks your slides with per-beat time targets and a
              teleprompter. Add your presentation and draft a few slides, then
              come back.
            </p>
            <Link
              href="/presentations/deck"
              className="mt-6 inline-block rounded-lg bg-cf-purple-600 px-5 py-3 text-[13px] font-bold tracking-[0.12em] text-white uppercase"
            >
              Go to the builder
            </Link>
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

          <div className="mt-[22px] rounded-2xl border border-dashed border-cf-gray-200 bg-white px-8 py-14 text-center">
            <Icon name="forum" className="text-[40px] text-cf-purple-300" />
            <div className="mt-3 text-[18px] font-bold text-cf-indigo-700">
              Nothing to review yet
            </div>
            <p className="mx-auto mt-2 max-w-[440px] text-[15px] leading-[1.6] text-cf-gray-500">
              Record a take in Take studio, then share it here to collect
              timestamped comments from your coach and a peer against a shared
              rubric.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
