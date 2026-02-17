"use client";

import { useState } from "react";
import Image from "next/image";
import allSessions from "@/app/data/sessions.json";

// Only show sessions that have their own illustration
const sessions = allSessions.filter((s) => s.image !== null);

export default function ContentShowcase() {
  const [active, setActive] = useState(0);
  const s = sessions[active];

  return (
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
          <div className="flex items-center justify-center gap-4 px-6 pb-6 pt-2">
            <button
              onClick={() => setActive((active - 1 + sessions.length) % sessions.length)}
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors shrink-0"
              style={{ borderColor: "#9D88ED40", color: "#9D88ED" }}
              aria-label="Previous slide"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 3L5 8L10 13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-1.5 flex-wrap justify-center max-w-[360px]">
              {sessions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: i === active ? "#9D88ED" : "rgba(157, 136, 237, 0.3)",
                  }}
                  aria-label={`Session ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActive((active + 1) % sessions.length)}
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors shrink-0"
              style={{ borderColor: "#9D88ED40", color: "#9D88ED" }}
              aria-label="Next slide"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 3L11 8L6 13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
