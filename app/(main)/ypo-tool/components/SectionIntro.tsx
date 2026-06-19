"use client";

import type { Circle } from "../lib/behaviors";

export default function SectionIntro({
  circle,
  sectionNumber,
  onBegin,
}: {
  circle: Circle;
  sectionNumber: number;
  onBegin: () => void;
}) {
  const initial = circle.title[0];

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row">
      {/* Left pane */}
      <div
        className="relative w-full md:w-[42%] flex flex-col justify-between p-8 md:p-12 min-h-[280px] md:min-h-0"
        style={{ background: circle.wash }}
      >
        <div className="flex items-center justify-between">
          <span
            className="font-bold uppercase"
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              color: circle.colorDark,
              opacity: 0.7,
            }}
          >
            Campfire
          </span>
          <span
            className="font-bold"
            style={{ fontSize: 13, color: circle.colorDark, opacity: 0.6 }}
          >
            Section {sectionNumber} of 4
          </span>
        </div>
        <div
          className="w-[84px] h-[84px] rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold mt-auto"
          style={{ background: circle.color }}
        >
          {initial}
        </div>
      </div>

      {/* Right pane */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24">
        <p
          className="font-bold uppercase mb-4"
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            color: circle.colorDark,
          }}
        >
          Activating Behavior
        </p>

        <h2
          className="font-extrabold mb-4"
          style={{
            fontSize: "clamp(40px, 5vw, 62px)",
            lineHeight: 1.05,
            color: "#1E2A4A",
          }}
        >
          {circle.title}
        </h2>

        <p
          className="mb-6"
          style={{ fontSize: 21, lineHeight: 1.5, color: "#636B7C" }}
        >
          {circle.tagline}
        </p>

        <p
          className="mb-10"
          style={{ fontSize: 15, lineHeight: 1.6, color: "#A8A2B3" }}
        >
          Three quick statements. Answer honestly — there&apos;s no neutral.
        </p>

        <button
          onClick={onBegin}
          className="self-start font-bold uppercase transition-opacity hover:opacity-90"
          style={{
            height: 54,
            borderRadius: 14,
            background: circle.color,
            color: "#fff",
            fontSize: 14,
            letterSpacing: "0.08em",
            padding: "0 32px",
          }}
        >
          Begin {circle.title} &rarr;
        </button>
      </div>
    </div>
  );
}
