"use client";

import { useState } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/campfire visual.png",
    alt: "Campfire live session platform showing participants in a workshop on Leading Through Change",
    label: "The Experience",
    headline: "Live, interactive sessions on a purpose-built platform",
    description:
      "Every Campfire workshop is delivered live with expert facilitation, breakout discussions, journaling, and real-time collaboration\u2014designed to keep every participant engaged and connected.",
  },
  {
    image: "/content.png",
    alt: "Campfire content library showing 40+ leadership workshop topics including Constructive Conflict, Preventing Burnout, and Decision Making",
    label: "The Content",
    headline: "40+ ready-to-run sessions across every leadership challenge",
    description:
      "From giving feedback to strategic thinking to managing change\u2014our library covers the topics your leaders face every day. Mix and match, or let us build something custom.",
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const s = slides[active];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            See what{" "}
            <span className="text-[#6E3FCC]">Campfire looks like</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            A purpose-built platform and curated content library designed for
            live leadership development.
          </p>
        </div>

        <div className="bg-[#F5F4F1] rounded-2xl border border-gray-100 overflow-hidden">
          {/* Image area — fixed aspect ratio */}
          <div className="relative bg-white">
            <div className="grid">
              {slides.map((slide, i) => (
                <div
                  key={slide.label}
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
                    width={1200}
                    height={600}
                    className="w-full h-auto object-contain"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Caption area */}
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#6E3FCC] tracking-wider uppercase mb-2">
                  {s.label}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                  {s.headline}
                </h3>
                <p className="mt-3 text-gray-500 text-sm leading-relaxed max-w-xl">
                  {s.description}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4 md:pt-2 shrink-0">
                <button
                  onClick={() =>
                    setActive(
                      (active - 1 + slides.length) % slides.length
                    )
                  }
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#6E3FCC] hover:border-[#6E3FCC]/30 transition-colors"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M10 3L5 8L10 13"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === active
                          ? "bg-[#6E3FCC] scale-110"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setActive((active + 1) % slides.length)
                  }
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#6E3FCC] hover:border-[#6E3FCC]/30 transition-colors"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M6 3L11 8L6 13"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
