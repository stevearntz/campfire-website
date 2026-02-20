"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import allSessions from "@/app/data/sessions.json";
import { spawnEmbers } from "@/app/lib/embers";

// Only show sessions that have their own illustration
const sessions = allSessions.filter((s) => s.image !== null);

const AUTOPLAY_S = 7;
const RING_R = 16;
const RING_C = 2 * Math.PI * RING_R;

const GHOST_SESSION = {
  name: "The Art of Finding Easter Eggs",
  desc: "A masterclass in curiosity, persistence, and clicking things you probably shouldn\u2019t. Congratulations \u2014 you found it. Now go lead something.",
  image: null as string | null,
};

export default function ContentShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const [ghostMode, setGhostMode] = useState(false);
  const lastDotClicks = useRef<number[]>([]);
  const s = ghostMode ? GHOST_SESSION : sessions[active];

  // Easter egg: type "fire" on keyboard to spawn embers
  useEffect(() => {
    const word = "fire";
    let pos = 0;
    function onKey(e: KeyboardEvent) {
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;
      if (e.key === word[pos]) {
        pos++;
        if (pos === word.length) { spawnEmbers(); pos = 0; }
      } else {
        pos = e.key === word[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-advance every AUTOPLAY_S seconds; resets on any slide change
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % sessions.length);
    }, AUTOPLAY_S * 1000);
    return () => clearTimeout(timer);
  }, [active, paused, tick]);

  const togglePause = () => {
    if (paused) setTick((t) => t + 1); // restart ring animation on unpause
    setPaused((p) => !p);
  };

  return (
    <>
    <style>{`@keyframes ring-fill{from{stroke-dashoffset:${RING_C}}to{stroke-dashoffset:0}}`}</style>
    <div className="rounded-2xl overflow-hidden border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2fr]">
        {/* Left: Text */}
        <div
          className="p-8 md:px-10 flex flex-col justify-center"
          style={{ backgroundColor: "#403955", paddingTop: "3rem", paddingBottom: "3rem" }}
        >
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: "#9D88ED" }}>
            All Campfire Sessions
          </p>
          <h3 className="text-3xl md:text-[2.2rem] font-bold text-white leading-snug mb-4" style={{ maxWidth: "340px" }}>
            {s.name}
          </h3>
          <p className="text-white/70 text-base leading-relaxed">
            {s.desc}
          </p>
        </div>

        {/* Right: Illustration + navigation below */}
        <div
          className="flex flex-col"
          style={{ backgroundColor: "#2f2745" }}
        >
          {/* Image area */}
          <div className="relative flex-1 p-6 md:px-8 pt-8 pb-4">
            {ghostMode && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg m-6 md:mx-8"
                style={{ background: "linear-gradient(135deg, #6E3FCC 0%, #EE81DD 100%)" }}>
                <p className="text-white/80 text-lg font-medium px-10 text-center max-w-md">
                  {GHOST_SESSION.desc}
                </p>
              </div>
            )}
            <div className="grid w-full">
              {sessions.map((session, i) => (
                <div
                  key={session.name}
                  className="col-start-1 row-start-1 transition-opacity duration-500 ease-in-out flex items-center"
                  style={{
                    opacity: i === active ? 1 : 0,
                    pointerEvents: i === active ? "auto" : "none",
                  }}
                  aria-hidden={i !== active}
                >
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={session.image!}
                      alt={session.name}
                      width={1600}
                      height={900}
                      className="absolute inset-0 w-full h-full object-cover"
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                    {/* Session title */}
                    <h4
                      className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 text-white font-extrabold leading-[0.95]"
                      style={{
                        fontSize: "clamp(1.875rem, 5.6vw, 4.375rem)",
                        maxWidth: "75%",
                      }}
                    >
                      {session.name}
                    </h4>
                    {/* Campfire logo */}
                    <Image
                      src="/campfire-logo.webp"
                      alt="Campfire"
                      width={1862}
                      height={396}
                      className="absolute bottom-4 right-4 md:bottom-5 md:right-6 h-5 md:h-6 w-auto brightness-0 invert"
                      style={{ filter: "brightness(0) invert(1) drop-shadow(0 1px 4px rgba(0,0,0,0.3))" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation — below illustration */}
          <div className="flex items-center gap-3 px-6 md:px-8 pb-6 pt-2">
            {/* Controls: prev / pause / next */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActive((active - 1 + sessions.length) % sessions.length)}
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
                style={{ borderColor: "#9D88ED40", color: "#9D88ED" }}
                aria-label="Previous slide"
              >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10 3L5 8L10 13" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

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

              <button
                onClick={() => setActive((active + 1) % sessions.length)}
                className="relative w-9 h-9 rounded-full flex items-center justify-center"
                style={{ color: "#9D88ED" }}
                aria-label="Next slide"
              >
                {/* Track ring (faint) */}
                <svg className="absolute inset-0" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r={RING_R} fill="none" stroke="#9D88ED" strokeWidth="2" opacity="0.25" />
                </svg>
                {/* Animated progress ring */}
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
                      animationName: "ring-fill",
                      animationDuration: `${AUTOPLAY_S}s`,
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

            {/* Dots — fill remaining space */}
            <div className="flex-1 flex flex-col items-center gap-2">
              {(() => {
                const total = sessions.length;
                const rows = total > 20 ? 2 : 1;
                const perRow = Math.ceil(total / rows);
                return Array.from({ length: rows }, (_, r) => (
                  <div key={r} className="flex gap-2 justify-center">
                    {sessions.slice(r * perRow, (r + 1) * perRow).map((_, j) => {
                      const i = r * perRow + j;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setActive(i);
                            if (i === sessions.length - 1) {
                              const now = Date.now();
                              lastDotClicks.current.push(now);
                              lastDotClicks.current = lastDotClicks.current.filter((t) => now - t < 1000);
                              if (lastDotClicks.current.length >= 3) {
                                lastDotClicks.current = [];
                                setGhostMode(true);
                                setPaused(true);
                                spawnEmbers();
                                setTimeout(() => { setGhostMode(false); setPaused(false); }, 5000);
                              }
                            }
                          }}
                          className="w-2.5 h-2.5 rounded-full transition-all cursor-pointer"
                          style={{
                            backgroundColor: i === active ? "#9D88ED" : "rgba(157, 136, 237, 0.3)",
                          }}
                          aria-label={`Session ${i + 1}`}
                        />
                      );
                    })}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
