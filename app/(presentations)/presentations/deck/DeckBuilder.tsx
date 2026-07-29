"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "../../_components/Icon";
import { SLIDES, BEAT_COLOR } from "../../_data/course";

const BARS = [
  { label: "'23", h: "38%", color: "bg-cf-purple-100" },
  { label: "'24", h: "52%", color: "bg-cf-purple-200" },
  { label: "'25", h: "74%", color: "bg-cf-purple-400" },
  { label: "'26", h: "100%", color: "bg-cf-pink-400" },
];

interface SlideEdit {
  title?: string;
  note?: string;
}

export default function DeckBuilder() {
  const [selected, setSelected] = useState(3);
  const [edits, setEdits] = useState<Record<number, SlideEdit>>({});

  const titleOf = (i: number) => edits[i]?.title ?? SLIDES[i].title;
  const noteOf = (i: number) => edits[i]?.note ?? SLIDES[i].note;

  const cur = SLIDES[selected];
  const curTitle = titleOf(selected);
  const curNote = noteOf(selected);

  const setTitle = (value: string) =>
    setEdits((prev) => ({
      ...prev,
      [selected]: { ...prev[selected], title: value },
    }));

  const setNote = (value: string) =>
    setEdits((prev) => ({
      ...prev,
      [selected]: { ...prev[selected], note: value },
    }));

  return (
    <div className="flex h-full min-h-0 min-w-[1080px] flex-col">
      {/* Top bar */}
      <div className="flex flex-none items-center justify-between border-b border-cf-gray-100 bg-white px-8 py-[18px]">
        <div>
          <div className="text-[11px] font-bold tracking-[0.16em] text-cf-gray-500 uppercase">
            Deck builder · Module 05 exercise
          </div>
          <div className="mt-[5px] text-[20px] font-bold text-cf-indigo-700">
            The manager gap is quietly costing us our best people
          </div>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="text-[13px] text-cf-gray-400">Saved just now</span>
          <Link
            href="/presentations/rehearse"
            className="rounded-lg bg-cf-purple-600 px-5 py-3 text-[13px] font-bold tracking-[0.12em] text-white uppercase"
          >
            Rehearse this
          </Link>
        </div>
      </div>

      {/* Three panes */}
      <div className="grid flex-1 grid-cols-[minmax(180px,212px)_minmax(0,1fr)_minmax(260px,320px)] overflow-hidden">
        {/* Left rail — story spine */}
        <div className="overflow-y-auto border-r border-cf-gray-100 bg-white px-[14px] py-4">
          <div className="px-[6px] pb-[10px] text-[11px] font-bold tracking-[0.14em] text-cf-gray-400 uppercase">
            Story spine · SCQA
          </div>
          <div className="flex flex-col gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.n}
                type="button"
                onClick={() => setSelected(i)}
                className={`w-full overflow-hidden rounded-lg border-2 bg-white text-left ${
                  i === selected
                    ? "border-cf-purple-600"
                    : "border-cf-gray-200"
                }`}
              >
                <div className="flex aspect-[16/9] flex-col justify-between bg-cf-gray-50 p-2">
                  <div className="text-[8px] leading-[1.3] font-bold text-cf-indigo-700">
                    {titleOf(i)}
                  </div>
                  <div className="h-[3px] w-[60%] rounded-[2px] bg-cf-gray-200" />
                </div>
                <div className="flex items-center justify-between border-t border-cf-gray-100 px-2 py-[6px]">
                  <span className="text-[10px] font-bold text-cf-gray-400">
                    {s.n}
                  </span>
                  <span
                    className={`text-[9px] font-bold tracking-[0.08em] uppercase ${BEAT_COLOR[s.beat]}`}
                  >
                    {s.beat}
                  </span>
                </div>
              </button>
            ))}
            <div className="cursor-pointer rounded-lg border border-dashed border-cf-gray-300 p-[14px] text-center text-[12px] font-semibold text-cf-gray-500">
              + Add slide
            </div>
          </div>
        </div>

        {/* Centre — slide canvas + editors */}
        <div className="overflow-y-auto bg-cf-purple-050 p-8">
          <div className="mx-auto max-w-[760px]">
            {/* Slide preview card */}
            <div className="flex aspect-[16/9] flex-col rounded-xl bg-white px-[48px] py-[44px] shadow-xl">
              <div
                className={`text-[11px] font-bold tracking-[0.16em] uppercase ${BEAT_COLOR[cur.beat]}`}
              >
                {cur.beat}
              </div>
              <div className="mt-[14px] text-[30px] leading-[1.2] font-bold tracking-[-0.01em] text-pretty text-cf-indigo-700">
                {curTitle}
              </div>
              <div className="mt-auto flex items-end gap-6">
                <div className="flex h-[150px] flex-1 items-stretch gap-[10px]">
                  {BARS.map((bar) => (
                    <div
                      key={bar.label}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-[6px]"
                    >
                      <div className="text-[11px] font-bold text-cf-gray-500">
                        {bar.label}
                      </div>
                      <div
                        className={`w-full rounded-t-[4px] ${bar.color}`}
                        style={{ height: bar.h }}
                      />
                    </div>
                  ))}
                </div>
                <div className="w-[200px] text-[13px] leading-[1.55] text-cf-gray-500">
                  {cur.support}
                </div>
              </div>
            </div>

            {/* Editors */}
            <div className="mt-5 rounded-xl border border-cf-gray-100 bg-white px-6 py-[22px]">
              <div className="text-[11px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
                Action title — say the claim, not the topic
              </div>
              <textarea
                value={curTitle}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-[10px] min-h-[60px] w-full resize-y rounded-[10px] border border-cf-gray-200 px-[14px] py-3 text-[17px] leading-[1.5] font-semibold text-cf-indigo-700"
              />
              <div className="mt-5 text-[11px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
                Speaker note · what you say out loud
              </div>
              <textarea
                value={curNote}
                onChange={(e) => setNote(e.target.value)}
                className="mt-[10px] min-h-[80px] w-full resize-y rounded-[10px] border border-cf-gray-200 px-[14px] py-3 text-[15px] leading-[1.6] text-cf-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Right rail — slide coach */}
        <div className="overflow-y-auto border-l border-cf-gray-100 bg-white p-6">
          <div className="flex items-center gap-[9px]">
            <Icon
              name="auto_awesome"
              className="text-[19px] text-cf-purple-600"
            />
            <div className="text-[12px] font-bold tracking-[0.14em] text-cf-purple-700 uppercase">
              Slide coach
            </div>
          </div>

          <div className="mt-[18px] flex flex-col gap-[14px]">
            <div className="rounded-[10px] border border-cf-meadow-200 bg-cf-meadow-50 px-4 py-[14px]">
              <div className="flex items-start gap-[9px]">
                <Icon
                  name="check_circle"
                  className="mt-[1px] text-[17px] text-cf-meadow-700"
                />
                <div className="text-[14px] leading-[1.55] text-cf-gray-700">
                  <strong>Title states a claim.</strong> A reader who only sees
                  titles gets your argument.
                </div>
              </div>
            </div>
            <div className="rounded-[10px] border border-cf-canary-200 bg-cf-canary-50 px-4 py-[14px]">
              <div className="flex items-start gap-[9px]">
                <Icon
                  name="warning"
                  className="mt-[1px] text-[17px] text-cf-canary-700"
                />
                <div className="text-[14px] leading-[1.55] text-cf-gray-700">
                  <strong>Chart may not match the message.</strong> You&apos;re
                  claiming a change over time — a line beats grouped columns
                  here. (TVMA: Time → line.)
                </div>
              </div>
            </div>
            <div className="rounded-[10px] border border-cf-gray-200 bg-cf-gray-50 px-4 py-[14px]">
              <div className="flex items-start gap-[9px]">
                <Icon
                  name="info"
                  className="mt-[1px] text-[17px] text-cf-gray-500"
                />
                <div className="text-[14px] leading-[1.55] text-cf-gray-700">
                  <strong>One idea per slide.</strong> Your note covers two —
                  consider splitting the cost figure onto its own slide.
                </div>
              </div>
            </div>
          </div>

          {/* Vertical logic */}
          <div className="mt-7 border-t border-cf-gray-100 pt-[22px]">
            <div className="text-[11px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
              Vertical logic
            </div>
            <div className="mt-2 text-[13px] leading-[1.6] text-cf-gray-500">
              Titles read in sequence:
            </div>
            <div className="mt-3 flex flex-col gap-[9px]">
              {SLIDES.map((s, i) => (
                <div
                  key={s.n}
                  className={`flex gap-[9px] text-[12px] leading-[1.5] ${
                    i === selected
                      ? "text-cf-indigo-700"
                      : "text-cf-gray-500"
                  }`}
                >
                  <span className="flex-none font-bold">{s.n}</span>
                  <div>{titleOf(i)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Intent check */}
          <div className="mt-[26px] rounded-[10px] bg-cf-purple-050 p-4">
            <div className="text-[13px] leading-[1.6] text-cf-purple-700">
              <strong>Checked against your intent:</strong> does this slide move
              “training is a nice-to-have we can defer”?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
