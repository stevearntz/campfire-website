"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── value strip data ─── */

const VALUE_ITEMS = [
  {
    label: "Shared Direction",
    description: "Align on priorities that drive results.",
    color: "#6E3FCC",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <path d="M12 3V5" />
        <path d="M12 19V21" />
        <path d="M3 12H5" />
        <path d="M19 12H21" />
      </svg>
    ),
  },
  {
    label: "Connected Teams",
    description: "Break down silos and move as one.",
    color: "#E87D3E",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="8" r="2.5" />
        <circle cx="16" cy="8" r="2.5" />
        <circle cx="12" cy="16" r="2.5" />
        <path d="M10 9.5L11 14" />
        <path d="M14 9.5L13 14" />
        <path d="M10.5 8H13.5" />
      </svg>
    ),
  },
  {
    label: "Confident Decisions",
    description: "Make better calls with clarity and context.",
    color: "#2D9F5C",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5L10.5 15L16 9.5" />
      </svg>
    ),
  },
  {
    label: "Stronger Impact",
    description: "Multiply momentum and achieve more together.",
    color: "#6E3FCC",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 18L9 13L13 16L20 6" />
        <path d="M16 6H20V10" />
      </svg>
    ),
  },
];

/* ─── component ─── */

export default function StrategicAlignmentHero() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (imageRef.current) {
          imageRef.current.style.transform = `translateY(${window.scrollY * 0.08}px)`;
        }
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ════════ HERO ════════ */}
      <section className="relative overflow-hidden bg-white">
        {/* Full-bleed illustration as the scene */}
        <div
          ref={imageRef}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/hero-image-strategy.png"
            alt="Lighthouse guiding sailboats across calm waters at sunset, representing strategic alignment bringing teams together"
            fill
            className="object-cover object-[center_30%]"
            priority
            sizes="100vw"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-20 lg:pt-24 pb-44 md:pb-56 lg:pb-64">
          <div className="max-w-2xl">
            <p className="text-xs md:text-sm font-bold tracking-[0.18em] uppercase mb-6 hero-fade-in"
               style={{ color: "#E87D3E" }}>
              Strategic Alignment
            </p>

            <h1
              className="text-[3rem] md:text-[4rem] lg:text-[5rem] leading-[1.08] mb-7 text-[#1C1334] hero-fade-in-delay-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Clarity leads.
              <br />
              Alignment follows.
              <br />
              <span className="hero-accent-text">Progress together.</span>
            </h1>

            <p className="text-base md:text-lg text-[#3D3550] leading-relaxed max-w-[460px] mb-8 hero-fade-in-delay-2">
              When your organization is aligned on what matters most, teams
              move with confidence, decisions get easier, and you achieve
              more&mdash;together.
            </p>

            <div className="hero-fade-in-delay-3">
              <Link
                href="https://calendly.com/getcampfire/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-button inline-flex items-center gap-2.5 text-white font-bold px-9 py-4 rounded-full text-lg transition-all duration-300"
              >
                Build Strategic Alignment
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 9H14" />
                  <path d="M9 4L14 9L9 14" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ VALUE STRIP — floating card overlapping hero ════════ */}
      <section className="relative z-20 -mt-20 md:-mt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl shadow-black/8 border border-[#E5E0DA]/50 px-8 py-7 md:px-12 md:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {VALUE_ITEMS.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3.5 hero-fade-in"
                  style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${item.color}12`,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1C1334] leading-snug">
                      {item.label}
                    </p>
                    <p className="text-xs text-[#6B7370] leading-relaxed mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inline keyframes */}
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-fade-in {
          animation: heroFadeIn 0.9s ease-out both;
        }
        .hero-fade-in-delay-1 {
          animation: heroFadeIn 0.9s ease-out 0.15s both;
        }
        .hero-fade-in-delay-2 {
          animation: heroFadeIn 0.9s ease-out 0.3s both;
        }
        .hero-fade-in-delay-3 {
          animation: heroFadeIn 0.9s ease-out 0.45s both;
        }

        .hero-accent-text {
          background: linear-gradient(90deg, #E87D3E 0%, #C04838 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-cta-button {
          background: #E055CB;
          box-shadow: 0 4px 20px rgba(224, 85, 203, 0.3);
        }
        .hero-cta-button:hover {
          background: #d44bbc;
          box-shadow: 0 8px 32px rgba(224, 85, 203, 0.45);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
