"use client";

import { useState } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/content-catalog.webp",
    alt: "Campfire content catalog showing 50+ leadership workshop topics with illustrated cards",
    label: "Content",
    headline: "40+ ready-to-run sessions across every leadership challenge",
    description:
      "From giving feedback to strategic thinking to managing change\u2014our library covers the topics your leaders face every day. Mix and match, or let us build something custom.",
    cta: "See Full Library",
    ctaHref: "https://tools.getcampfire.com/courses",
  },
  {
    image: "/product-screen-shadow.webp",
    alt: "Campfire live session platform showing participants in a facilitated workshop",
    label: "Experience",
    headline: "Live, interactive sessions on a purpose-built platform",
    description:
      "Every Campfire workshop is delivered live with expert facilitation, breakout discussions, journaling, and real-time collaboration\u2014designed to keep every participant engaged and connected.",
    cta: "Explore Campfire",
    ctaHref: "https://tools.getcampfire.com/courses",
  },
  {
    image: "/analytics.webp",
    alt: "Campfire analytics and reporting dashboard showing participation and engagement data",
    label: "Insights",
    headline: "Analytics and reporting that prove impact",
    description:
      "Track participation, engagement, and satisfaction across your organization. See which sessions resonate most, monitor completion rates, and share results with leadership\u2014all in one dashboard.",
    cta: "Explore Campfire",
    ctaHref: "https://tools.getcampfire.com/courses",
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const s = slides[active];

  return (
    <section className="py-20 bg-[#1C1334]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            See the magic of Campfire
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            A purpose-built platform and curated content library designed to
            support your leaders and amplify your impact.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr]">
            {/* Left: Text + navigation */}
            <div
              className="p-8 md:px-10 flex flex-col justify-between"
              style={{ backgroundColor: "#403955", paddingTop: "calc(2.5rem + 25px)", paddingBottom: "calc(2.5rem + 25px)" }}
            >
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase mb-4" style={{ color: "#9D88ED" }}>
                  {s.label}
                </p>
                <h3 className="text-2xl md:text-[1.75rem] font-bold text-white leading-snug" style={{ maxWidth: "280px" }}>
                  {s.headline}
                </h3>
                <p className="mt-4 text-white/70 text-sm leading-relaxed" style={{ maxWidth: "280px" }}>
                  {s.description}
                </p>
              </div>

              {/* Carousel navigation — centered */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() =>
                    setActive(
                      (active - 1 + slides.length) % slides.length
                    )
                  }
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
                  style={{ borderColor: "#9D88ED40", color: "#9D88ED" }}
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
                      className="w-2.5 h-2.5 rounded-full transition-all"
                      style={{
                        backgroundColor: i === active ? "#9D88ED" : "rgba(157, 136, 237, 0.3)",
                      }}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setActive((active + 1) % slides.length)
                  }
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
                  style={{ borderColor: "#9D88ED40", color: "#9D88ED" }}
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

            {/* Right: Image */}
            <div
              className="relative flex flex-col p-6 md:px-8"
              style={{ backgroundColor: "#2f2745", paddingTop: "calc(2rem + 25px)", paddingBottom: "calc(2rem + 25px)" }}
            >
              <div className="grid w-full flex-1">
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
                      width={1600}
                      height={900}
                      className="w-full h-auto object-contain rounded-lg"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>

              {/* CTA inside the right panel */}
              <div className="text-center mt-6">
                <a
                  href={s.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-7 py-3.5 text-sm font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
                >
                  {s.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
