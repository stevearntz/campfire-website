"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const AUTOPLAY_S = 7;
const RING_R = 16;
const RING_C = 2 * Math.PI * RING_R;

interface Feature {
  title: string;
  subtitle: string;
  paragraphs: string[];
  result: string;
  image: string;
}

const features: Feature[] = [
  {
    title: "Safety First",
    subtitle: "SAFE TO SPEAK YOUR MIND.",
    paragraphs: [
      "We built anonymous share activities so every voice can enter the room \u2014 quickly and without social risk.",
      "Research consistently shows that when people aren\u2019t worried about how they\u2019ll be perceived, they\u2019re more honest and more willing to engage.",
    ],
    result:
      "Candid insights, balanced contribution, and conversations that feel real.",
    image: "/safety-first.webp",
  },
  {
    title: "Everyone\u2019s Invited",
    subtitle: "THINK BEFORE YOU SPEAK.",
    paragraphs: [
      "Before each breakout, participants pause to reflect and write, creating space for every voice \u2014 not just those who process out loud.",
      "Research shows that processing first leads to deeper thinking and more inclusive conversations.",
    ],
    result:
      "Richer discussion, more balanced voices, and insights that go further.",
    image: "/everyones-invited.webp",
  },
  {
    title: "Guided Conversations",
    subtitle: "KEEP THE FOCUS ON WHAT MATTERS.",
    paragraphs: [
      "Discussion prompts travel with participants into their breakout rooms \u2014 no toggling or guesswork.",
      "Research on cognitive load shows that clear structure improves focus and participation. When expectations are visible, groups stay aligned.",
    ],
    result:
      "Stronger breakouts, deeper engagement, and fewer facilitator interruptions.",
    image: "/guided-conversations.webp",
  },
  {
    title: "Designed for Presence",
    subtitle: "LESS FRICTION. MORE FACILITATION.",
    paragraphs: [
      "Slides, activities, and script notes are built into the platform, positioned for natural delivery and steady eye contact.",
      "Juggling tools pulls attention away from the room. Simpler experiences help facilitators be more present and confident.",
    ],
    result:
      "Smoother delivery, focus on connection, and facilitation that feels natural \u2014 even for beginners.",
    image: "/designed-for-presence.webp",
  },
];

export default function ProductFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const feature = features[activeIndex];

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, AUTOPLAY_S * 1000);
    return () => clearTimeout(timer);
  }, [activeIndex, paused, tick]);

  const togglePause = () => {
    if (paused) setTick((t) => t + 1);
    setPaused((p) => !p);
  };

  return (
    <>
    <style>{`@keyframes ring-fill{from{stroke-dashoffset:${RING_C}}to{stroke-dashoffset:0}}`}</style>
    <div className="rounded-2xl overflow-hidden border border-white/10 mx-auto" style={{ maxWidth: "1475px", maxHeight: "900px" }}>
      <div className="grid grid-cols-1 md:grid-cols-[445px_1fr]">
        {/* Left: Text */}
        <div
          className="px-8 md:px-10 flex flex-col justify-start"
          style={{
            backgroundColor: "#403955",
            paddingTop: "150px",
            paddingBottom: "150px",
            minHeight: "360px",
          }}
        >
          <div>
            <h3
              className="text-3xl md:text-[1.9rem] font-bold text-white leading-snug mb-4"
              style={{ maxWidth: "340px" }}
            >
              {feature.title}
            </h3>
            <p
              className="text-xl font-semibold tracking-wider uppercase mb-16"
              style={{ color: "#9D88ED" }}
            >
              {feature.subtitle}
            </p>
            {feature.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-white/90 text-[1.4rem] leading-relaxed mb-6"
              >
                {p}
              </p>
            ))}
            <p className="text-white/90 text-[1.4rem] leading-relaxed">
              <span className="font-bold">The Result: </span>
              {feature.result}
            </p>
          </div>
        </div>

        {/* Right: Screenshot area + navigation */}
        <div
          className="flex flex-col px-6 md:px-8"
          style={{
            backgroundColor: "#2f2745",
            paddingTop: "150px",
            paddingBottom: "150px",
          }}
        >
          <div className="grid w-full flex-1">
            {features.map((f, i) => (
              <div
                key={i}
                className="col-start-1 row-start-1 transition-opacity duration-500 ease-in-out flex items-center"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  pointerEvents: i === activeIndex ? "auto" : "none",
                }}
                aria-hidden={i !== activeIndex}
              >
                <div className="relative w-full aspect-[2023/1295] rounded-lg overflow-hidden">
                  <Image
                    src={f.image}
                    alt={f.title}
                    width={2023}
                    height={1295}
                    className="absolute inset-0 w-full h-full object-cover"
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() =>
                setActiveIndex(
                  (activeIndex - 1 + features.length) % features.length
                )
              }
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer"
              style={{ borderColor: "#9D88ED", borderWidth: "0.83px", color: "#9D88ED" }}
              aria-label="Previous feature"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 3L5 8L10 13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-2">
              {features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="w-2.5 h-2.5 rounded-full transition-all cursor-pointer"
                  style={{
                    backgroundColor:
                      i === activeIndex
                        ? "#9D88ED"
                        : "#1C1334",
                  }}
                  aria-label={`Feature ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setActiveIndex((activeIndex + 1) % features.length)
              }
              className="relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
              style={{ color: "#9D88ED" }}
              aria-label="Next feature"
            >
              <svg className="absolute inset-0" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r={RING_R} fill="none" stroke="#9D88ED" strokeWidth="0.83" opacity="0.4" />
              </svg>
              <svg key={`${activeIndex}-${tick}`} className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r={RING_R}
                  fill="none"
                  stroke="#9D88ED"
                  strokeWidth="0.83"
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
              <svg className="relative w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 3L11 8L6 13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
