"use client";

import { useState, useEffect } from "react";

/**
 * A single step in the showcase carousel.
 * `accent` is a hex string driving the eyebrow + the right-panel gradient.
 */
export type Slide = {
  eyebrow?: string;
  title: string;
  paragraph: string;
  accent?: string;
};

const RING_R = 16;
const RING_C = 2 * Math.PI * RING_R;
const DEFAULT_ACCENT = "#9D88ED";

/**
 * StepShowcase — a self-contained, props-driven slide player.
 *
 * Left text panel (#403955) cross-fades between slides; right visual panel
 * (#2f2745) shows an accent gradient. Autoplays every `autoMs`, loops, pauses
 * on any interaction, and exposes prev / pause / next controls with a circular
 * SVG progress ring plus dot pagination. No hardcoded data — pass `slides`.
 */
export default function StepShowcase({
  slides,
  autoMs = 7000,
}: {
  slides: Slide[];
  autoMs?: number;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);

  const total = slides.length;
  const secs = autoMs / 1000;

  // Auto-advance; resets on any slide change. `tick` forces a restart on unpause.
  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % total);
    }, autoMs);
    return () => clearTimeout(timer);
  }, [active, paused, tick, autoMs, total]);

  const go = (i: number) => {
    setActive(((i % total) + total) % total);
    setPaused(true); // pause-on-interaction
  };

  const togglePause = () => {
    if (paused) setTick((t) => t + 1); // restart ring animation on unpause
    setPaused((p) => !p);
  };

  if (total === 0) return null;

  return (
    <>
      <style>{`@keyframes step-ring-fill{from{stroke-dashoffset:${RING_C}}to{stroke-dashoffset:0}}`}</style>
      <div className="rounded-2xl overflow-hidden border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr]">
          {/* Left: cross-fading text */}
          <div
            className="relative overflow-hidden flex"
            style={{ backgroundColor: "#403955", minHeight: 340 }}
          >
            <div className="grid w-full">
              {slides.map((slide, i) => {
                const accent = slide.accent || DEFAULT_ACCENT;
                return (
                  <div
                    key={i}
                    className="col-start-1 row-start-1 flex flex-col justify-center transition-opacity duration-500 ease-in-out p-8 md:p-10 lg:p-12"
                    style={{
                      opacity: i === active ? 1 : 0,
                      pointerEvents: i === active ? "auto" : "none",
                    }}
                    aria-hidden={i !== active}
                  >
                    {slide.eyebrow && (
                      <p
                        className="text-[12px] font-bold tracking-[0.18em] uppercase mb-4"
                        style={{ color: accent }}
                      >
                        {slide.eyebrow}
                      </p>
                    )}
                    <h3
                      className="font-bold text-white leading-snug mb-4"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                    >
                      {slide.title}
                    </h3>
                    <p
                      className="text-[15px] md:text-base leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {slide.paragraph}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: visual panel + controls */}
          <div className="flex flex-col" style={{ backgroundColor: "#2f2745" }}>
            {/* Visual area — accent gradient that cross-fades */}
            <div className="relative flex-1 p-6 md:p-8 pb-4">
              <div className="grid w-full h-full" style={{ minHeight: 220 }}>
                {slides.map((slide, i) => {
                  const accent = slide.accent || DEFAULT_ACCENT;
                  return (
                    <div
                      key={i}
                      className="col-start-1 row-start-1 transition-opacity duration-500 ease-in-out"
                      style={{
                        opacity: i === active ? 1 : 0,
                        pointerEvents: i === active ? "auto" : "none",
                      }}
                      aria-hidden={i !== active}
                    >
                      <div
                        className="relative w-full h-full rounded-xl overflow-hidden flex items-end p-6 md:p-8"
                        style={{
                          minHeight: 220,
                          background: `linear-gradient(135deg, ${accent}, #EE81DD)`,
                        }}
                      >
                        <span
                          className="absolute font-extrabold leading-none select-none"
                          style={{
                            top: -8,
                            right: 8,
                            fontSize: "clamp(7rem, 16vw, 12rem)",
                            color: "rgba(255,255,255,0.16)",
                          }}
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        <h4
                          className="relative text-white font-extrabold leading-[1.05]"
                          style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.4rem)", maxWidth: "85%" }}
                        >
                          {slide.title}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls row */}
            <div className="flex items-center gap-3 px-6 md:px-8 pb-6 pt-2">
              <div className="flex items-center gap-2 shrink-0">
                {/* Prev */}
                <button
                  onClick={() => go(active - 1)}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
                  style={{ borderColor: "#9D88ED40", color: "#9D88ED" }}
                  aria-label="Previous slide"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 3L5 8L10 13" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Pause / play */}
                <button
                  onClick={togglePause}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
                  style={{ borderColor: "#9D88ED40", color: "#9D88ED" }}
                  aria-label={paused ? "Play" : "Pause"}
                >
                  {paused ? (
                    <svg className="w-4 h-4 ml-0.5" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M4 2.5L13 8L4 13.5V2.5Z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                      <rect x="3" y="2.5" width="3.5" height="11" rx="0.75" />
                      <rect x="9.5" y="2.5" width="3.5" height="11" rx="0.75" />
                    </svg>
                  )}
                </button>

                {/* Next + progress ring */}
                <button
                  onClick={() => go(active + 1)}
                  className="relative w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ color: "#9D88ED" }}
                  aria-label="Next slide"
                >
                  {/* Track ring (faint) */}
                  <svg className="absolute inset-0" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r={RING_R} fill="none" stroke="#9D88ED" strokeWidth="2" opacity="0.25" />
                  </svg>
                  {/* Animated progress ring — keyed so it restarts each slide / unpause */}
                  <svg key={`${active}-${tick}`} className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r={RING_R}
                      fill="none"
                      stroke="#9D88ED"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={RING_C}
                      strokeDashoffset={RING_C}
                      style={{
                        animationName: "step-ring-fill",
                        animationDuration: `${secs}s`,
                        animationTimingFunction: "linear",
                        animationFillMode: "forwards",
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  </svg>
                  {/* Arrow */}
                  <svg className="relative w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 3L11 8L6 13" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Dots */}
              <div className="flex-1 flex items-center justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className="w-2.5 h-2.5 rounded-full transition-all cursor-pointer"
                    style={{
                      backgroundColor: i === active ? "#9D88ED" : "rgba(157, 136, 237, 0.3)",
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === active}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
