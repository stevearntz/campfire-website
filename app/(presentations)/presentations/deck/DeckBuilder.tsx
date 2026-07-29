"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "../../_components/Icon";
import { BEAT_COLOR } from "../../_data/course";

export interface BuilderSlide {
  id: number;
  position: number;
  beat: string | null;
  actionTitle: string;
  speakerNote: string;
  supportNote: string | null;
}

function beatClass(beat: string | null) {
  return (beat && BEAT_COLOR[beat]) || "text-cf-gray-400";
}

export default function DeckBuilder({
  presentationId,
  deckTitle,
  spine,
  initialSlides,
}: {
  presentationId: number;
  deckTitle: string | null;
  spine: string | null;
  initialSlides: BuilderSlide[];
}) {
  const [slides, setSlides] = useState<BuilderSlide[]>(initialSlides);
  const [selected, setSelected] = useState(0);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cur = slides[selected];

  function scheduleSave(slide: BuilderSlide) {
    setSaveState("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/presentations/slide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            presentationId,
            slideId: slide.id,
            actionTitle: slide.actionTitle,
            speakerNote: slide.speakerNote,
          }),
        });
        setSaveState(res.ok ? "saved" : "idle");
      } catch {
        setSaveState("idle");
      }
    }, 800);
  }

  function edit(patch: Partial<BuilderSlide>) {
    setSlides((prev) => {
      const next = prev.map((s, i) =>
        i === selected ? { ...s, ...patch } : s,
      );
      scheduleSave(next[selected]);
      return next;
    });
  }

  const saveLabel =
    saveState === "saving"
      ? "Saving…"
      : saveState === "saved"
        ? "Saved"
        : "All changes saved";

  return (
    <div className="flex h-full min-h-0 min-w-[1080px] flex-col">
      {/* Top bar */}
      <div className="flex flex-none items-center justify-between border-b border-cf-gray-100 bg-white px-8 py-[18px]">
        <div>
          <div className="text-[11px] font-bold tracking-[0.16em] text-cf-gray-500 uppercase">
            Deck builder
          </div>
          <div className="mt-[5px] text-[20px] font-bold text-cf-indigo-700">
            {deckTitle || "Untitled presentation"}
          </div>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="text-[13px] text-cf-gray-400">{saveLabel}</span>
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
            Story spine{spine ? ` · ${spine}` : ""}
          </div>
          <div className="flex flex-col gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelected(i)}
                className={`w-full overflow-hidden rounded-lg border-2 bg-white text-left ${
                  i === selected ? "border-cf-purple-600" : "border-cf-gray-200"
                }`}
              >
                <div className="flex aspect-[16/9] flex-col justify-between bg-cf-gray-50 p-2">
                  <div className="text-[8px] leading-[1.3] font-bold text-cf-indigo-700">
                    {s.actionTitle || "Untitled slide"}
                  </div>
                  <div className="h-[3px] w-[60%] rounded-[2px] bg-cf-gray-200" />
                </div>
                <div className="flex items-center justify-between border-t border-cf-gray-100 px-2 py-[6px]">
                  <span className="text-[10px] font-bold text-cf-gray-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.beat && (
                    <span
                      className={`text-[9px] font-bold tracking-[0.08em] uppercase ${beatClass(s.beat)}`}
                    >
                      {s.beat}
                    </span>
                  )}
                </div>
              </button>
            ))}
            <div className="rounded-lg border border-dashed border-cf-gray-300 p-[14px] text-center text-[12px] font-semibold text-cf-gray-400">
              + Add slide
            </div>
          </div>
        </div>

        {/* Centre — slide canvas + editors */}
        <div className="overflow-y-auto bg-cf-purple-050 p-8">
          <div className="mx-auto max-w-[760px]">
            {/* Slide preview card */}
            <div className="flex aspect-[16/9] flex-col rounded-xl bg-white px-[48px] py-[44px] shadow-xl">
              {cur.beat && (
                <div
                  className={`text-[11px] font-bold tracking-[0.16em] uppercase ${beatClass(cur.beat)}`}
                >
                  {cur.beat}
                </div>
              )}
              <div className="mt-[14px] text-[30px] leading-[1.2] font-bold tracking-[-0.01em] text-pretty text-cf-indigo-700">
                {cur.actionTitle || "Say the claim of this slide…"}
              </div>
              {cur.supportNote && (
                <div className="mt-auto max-w-[300px] text-[13px] leading-[1.55] text-cf-gray-500">
                  {cur.supportNote}
                </div>
              )}
            </div>

            {/* Editors */}
            <div className="mt-5 rounded-xl border border-cf-gray-100 bg-white px-6 py-[22px]">
              <div className="text-[11px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
                Action title — say the claim, not the topic
              </div>
              <textarea
                value={cur.actionTitle}
                onChange={(e) => edit({ actionTitle: e.target.value })}
                className="mt-[10px] min-h-[60px] w-full resize-y rounded-[10px] border border-cf-gray-200 px-[14px] py-3 text-[17px] leading-[1.5] font-semibold text-cf-indigo-700"
              />
              <div className="mt-5 text-[11px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
                Speaker note · what you say out loud
              </div>
              <textarea
                value={cur.speakerNote}
                onChange={(e) => edit({ speakerNote: e.target.value })}
                className="mt-[10px] min-h-[80px] w-full resize-y rounded-[10px] border border-cf-gray-200 px-[14px] py-3 text-[15px] leading-[1.6] text-cf-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Right rail — slide coach + vertical logic */}
        <div className="overflow-y-auto border-l border-cf-gray-100 bg-white p-6">
          <div className="flex items-center gap-[9px]">
            <Icon name="auto_awesome" className="text-[19px] text-cf-purple-600" />
            <div className="text-[12px] font-bold tracking-[0.14em] text-cf-purple-700 uppercase">
              Slide coach
            </div>
          </div>
          <div className="mt-[18px] rounded-[10px] border border-dashed border-cf-gray-200 bg-cf-gray-50 px-4 py-[18px] text-[13px] leading-[1.6] text-cf-gray-500">
            Coach checks — claim strength, chart-to-message fit, one-idea-per-slide
            — appear here as you refine your titles. (Coming in a later module.)
          </div>

          {/* Vertical logic */}
          <div className="mt-7 border-t border-cf-gray-100 pt-[22px]">
            <div className="text-[11px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
              Vertical logic
            </div>
            <div className="mt-2 text-[13px] leading-[1.6] text-cf-gray-500">
              Read your titles top to bottom — do they carry the argument?
            </div>
            <div className="mt-3 flex flex-col gap-[9px]">
              {slides.map((s, i) => (
                <div
                  key={s.id}
                  className={`flex gap-[9px] text-[12px] leading-[1.5] ${
                    i === selected ? "text-cf-indigo-700" : "text-cf-gray-500"
                  }`}
                >
                  <span className="flex-none font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>{s.actionTitle || "Untitled slide"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
