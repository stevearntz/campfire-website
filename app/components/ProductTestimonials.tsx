"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Testimonial {
  quote: string;
  attribution: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "This is an incredible space to collaborate with peers, and understand how we can better apply the lessons we\u2019re learning. I\u2019m getting a lot out of these sessions.",
    attribution: "Participant from Cotopaxi",
  },
  {
    quote:
      "I appreciated the share boards because it caused less anxiety for me to share my thoughts on the topic.",
    attribution: "Participant from Dermalogica",
  },
  {
    quote:
      "I was really impressed by the Campfire Platform, how seamlessly the session flowed, and the ability to have a genuine conversation.",
    attribution: "Participant from Community Event",
  },
  {
    quote:
      "This was a great session. I love writing in the Campfire journal and sharing in break-out groups. I hope to apply this more in my interactions as a manager.",
    attribution: "Participant from Dermalogica",
  },
  {
    quote:
      "I really loved the breakout sessions and the ability to self-reflect and get anonymous feedback.",
    attribution: "Participant from Dermalogica",
  },
  {
    quote:
      "Really cool platform & great content! Very kind safe place to have open discussions.",
    attribution: "Participant from Enveda",
  },
  {
    quote:
      "This was my first campfire experience and it was just what I needed to become a better communicator. This was a great space to share perspectives and thoughts.",
    attribution: "Participant from Enveda",
  },
  {
    quote:
      "The time flew! Great facilitation. Good activities. Flexible adaptation, perfect time-keeping. The Campfire App is quite powerful. I couldn\u2019t fault this training in any way.",
    attribution: "Participant from Dermalogica",
  },
  {
    quote:
      "Good session as always! Love the engaging activities and thoughtful discussions. I\u2019ll be signing up for more!",
    attribution: "Participant from Nuvel",
  },
];

const CARD_WIDTH = 570;
const GAP = 17;
const AUTOPLAY_S = 7;
const RING_R = 14;
const RING_C = 2 * Math.PI * RING_R;
const COUNT = testimonials.length;

// Triple the array so we can scroll infinitely in both directions
const looped = [...testimonials, ...testimonials, ...testimonials];

export default function ProductTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(COUNT); // start at second set
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const resettingRef = useRef(false);

  // On mount, scroll to the start of the second set (no animation)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = COUNT * (CARD_WIDTH + GAP);
    }
  }, []);

  const updateIndex = useCallback(() => {
    if (resettingRef.current || !scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / (CARD_WIDTH + GAP));
    setActiveIndex(idx);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateIndex, { passive: true });
    return () => el.removeEventListener("scroll", updateIndex);
  }, [updateIndex]);

  // Silent reset when scrolling into the first or third set
  useEffect(() => {
    if (resettingRef.current) return;
    const el = scrollRef.current;
    if (!el) return;

    if (activeIndex < COUNT) {
      // Scrolled into first set — jump to same position in second set
      resettingRef.current = true;
      const mapped = activeIndex + COUNT;
      el.scrollLeft = mapped * (CARD_WIDTH + GAP);
      setActiveIndex(mapped);
      requestAnimationFrame(() => { resettingRef.current = false; });
    } else if (activeIndex >= COUNT * 2) {
      // Scrolled into third set — jump to same position in second set
      resettingRef.current = true;
      const mapped = activeIndex - COUNT;
      el.scrollLeft = mapped * (CARD_WIDTH + GAP);
      setActiveIndex(mapped);
      requestAnimationFrame(() => { resettingRef.current = false; });
    }
  }, [activeIndex]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      scrollTo(activeIndex + 1);
    }, AUTOPLAY_S * 1000);
    return () => clearTimeout(timer);
  }, [activeIndex, paused, tick]);

  const handleEnter = () => setPaused(true);
  const handleLeave = () => {
    setPaused(false);
    setTick((t) => t + 1);
  };

  const scrollTo = (index: number) => {
    scrollRef.current?.scrollTo({
      left: index * (CARD_WIDTH + GAP),
      behavior: "smooth",
    });
  };

  // Which dot is active (0..COUNT-1)
  const dotIndex = ((activeIndex % COUNT) + COUNT) % COUNT;

  return (
    <>
      <style>{`@keyframes testimonial-ring{from{stroke-dashoffset:${RING_C}}to{stroke-dashoffset:0}}`}</style>
      <div>
        <p className="text-sm font-bold tracking-wider uppercase text-white/40 text-center mb-10">
          What Participants Are Saying
        </p>

        <div
          ref={scrollRef}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onTouchStart={handleEnter}
          onTouchEnd={handleLeave}
          className="flex gap-[17px] overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {looped.map((t, i) => (
            <div
              key={i}
              className="snap-start shrink-0 rounded-xl px-8 pb-8 flex flex-col"
              style={{
                paddingTop: "75px",
                width: "570px",
                height: "435px",
                backgroundColor: "#ffffff",
              }}
            >
              <span className="block font-[family-name:var(--font-spartan)] font-light" style={{ color: "#C864E6", fontSize: "180px", lineHeight: "0.6", marginBottom: "-50px" }}>
                &ldquo;
              </span>
              <p className="text-gray-800 text-2xl leading-relaxed mb-3">
                {t.quote}
              </p>
              <p className="text-lg font-semibold text-gray-400">
                &ndash;{t.attribution}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer"
            style={{ borderColor: "#9D88ED", borderWidth: "0.83px", color: "#9D88ED" }}
            aria-label="Previous testimonial"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M7.5 2.5L4 6L7.5 9.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  // Find nearest version of this index
                  const offset = i - dotIndex;
                  scrollTo(activeIndex + offset);
                }}
                className="w-2.5 h-2.5 rounded-full transition-colors cursor-pointer"
                style={{
                  backgroundColor: i === dotIndex ? "#9D88ED" : "#1C1334",
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              scrollTo(activeIndex + 1);
              setTick((t) => t + 1);
            }}
            className="relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
            style={{ color: "#9D88ED" }}
            aria-label="Next testimonial"
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
                  animationName: "testimonial-ring",
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
    </>
  );
}
