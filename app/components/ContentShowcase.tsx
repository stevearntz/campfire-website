"use client";

import { useState } from "react";
import Image from "next/image";

const slides = [
  {
    label: "All Campfire Sessions",
    headline: "Strategic Thinking",
    description:
      "From giving feedback to strategic thinking to managing change\u2014our library covers the topics your leaders face every day. Mix and match, or let us build something custom.",
    image: "/content-catalog.webp",
    alt: "Campfire content catalog showing leadership workshop topics with illustrated cards",
  },
  {
    label: "All Campfire Sessions",
    headline: "Candid Communication",
    description:
      "Communicate with others in a straightforward, clear way, while also inviting the perspectives of the other person.",
    image: "/product-screen-shadow.webp",
    alt: "Campfire live session platform showing participants in a facilitated workshop",
  },
  {
    label: "All Campfire Sessions",
    headline: "Coaching Essentials",
    description:
      "Develop the skills to become effective coaches: tools and techniques to guide meaningful and supportive conversations.",
    image: "/analytics.webp",
    alt: "Campfire analytics dashboard showing engagement and participation data",
  },
];

export default function ContentShowcase() {
  const [active, setActive] = useState(0);
  const s = slides[active];

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2fr]">
        {/* Left: Text + navigation */}
        <div
          className="p-8 md:px-10 flex flex-col justify-between"
          style={{ backgroundColor: "#403955", paddingTop: "calc(3.5rem + 25px)", paddingBottom: "calc(3.5rem + 25px)" }}
        >
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase mb-4 mt-6" style={{ color: "#9D88ED" }}>
              {s.label}
            </p>
            <h3 className="text-2xl md:text-[1.75rem] font-bold text-white leading-snug" style={{ maxWidth: "280px" }}>
              {s.headline}
            </h3>
            <p className="mt-4 text-white/70 text-sm leading-relaxed" style={{ maxWidth: "280px" }}>
              {s.description}
            </p>
          </div>

          {/* Carousel navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setActive((active - 1 + slides.length) % slides.length)}
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: "#9D88ED40", color: "#9D88ED" }}
              aria-label="Previous slide"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 3L5 8L10 13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="w-2.5 h-2.5 rounded-full transition-all"
                  style={{ backgroundColor: i === active ? "#9D88ED" : "rgba(157, 136, 237, 0.3)" }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActive((active + 1) % slides.length)}
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: "#9D88ED40", color: "#9D88ED" }}
              aria-label="Next slide"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 3L11 8L6 13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div
          className="relative flex flex-col p-6 md:px-8"
          style={{ backgroundColor: "#2f2745", paddingTop: "calc(3rem + 25px)", paddingBottom: "calc(3rem + 25px)" }}
        >
          <div className="grid w-full flex-1">
            {slides.map((slide, i) => (
              <div
                key={slide.headline}
                className="col-start-1 row-start-1 transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: i === active ? 1 : 0,
                  pointerEvents: i === active ? "auto" : "none",
                }}
                aria-hidden={i !== active}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  width={1600}
                  height={900}
                  className="w-full h-auto object-contain rounded-lg"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
