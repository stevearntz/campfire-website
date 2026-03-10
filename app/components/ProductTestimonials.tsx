"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Testimonial {
  quote: string;
  attribution: string;
}

// TODO: Add/replace with real participant quotes
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
      "The structure of the sessions keeps everyone engaged \u2014 not just the loudest voices in the room.",
    attribution: "Participant from Enveda",
  },
  {
    quote:
      "I love that I can share my thoughts anonymously. It takes the pressure off and lets me be more honest.",
    attribution: "Participant from Plusgrade",
  },
  {
    quote:
      "These sessions have completely changed how our team communicates. The conversations are deeper and more productive.",
    attribution: "Participant from Cotopaxi",
  },
  {
    quote:
      "The breakout rooms are my favorite part. You get to hear perspectives you\u2019d never encounter in your usual meetings.",
    attribution: "Participant from Dermalogica",
  },
  {
    quote:
      "Our facilitators love using Campfire. The tools make it easy to run sessions that actually matter.",
    attribution: "Participant from Plusgrade",
  },
];

const CARD_WIDTH = 570;
const GAP = 17;
const AUTOPLAY_S = 7;

export default function ProductTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = useCallback(() => {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / (CARD_WIDTH + GAP));
    setActiveIndex(Math.min(idx, testimonials.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateIndex, { passive: true });
    return () => el.removeEventListener("scroll", updateIndex);
  }, [updateIndex]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      const next = (activeIndex + 1) % testimonials.length;
      scrollTo(next);
    }, AUTOPLAY_S * 1000);
    return () => clearTimeout(timer);
  }, [activeIndex, paused]);

  // Pause on hover/touch
  const handleEnter = () => setPaused(true);
  const handleLeave = () => setPaused(false);

  const scrollTo = (index: number) => {
    scrollRef.current?.scrollTo({
      left: index * (CARD_WIDTH + GAP),
      behavior: "smooth",
    });
  };

  return (
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
        {testimonials.map((t, i) => (
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
          onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
          className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer"
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
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="w-2 h-2 rounded-full transition-colors cursor-pointer"
            style={{
              backgroundColor: i === activeIndex ? "#9D88ED" : "#1C1334",
            }}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
        <button
          onClick={() =>
            scrollTo(Math.min(testimonials.length - 1, activeIndex + 1))
          }
          className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer"
          style={{ borderColor: "#9D88ED", borderWidth: "0.83px", color: "#9D88ED" }}
          aria-label="Next testimonial"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M4.5 2.5L8 6L4.5 9.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
