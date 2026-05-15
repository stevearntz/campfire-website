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
      <section className="relative overflow-hidden bg-[#1C1334]">
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
          {/* Warm overlay to blend illustration with brand palette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,19,52,0.35) 0%, rgba(28,19,52,0.1) 30%, rgba(28,19,52,0.0) 50%, rgba(28,19,52,0.15) 80%, rgba(28,19,52,0.6) 100%)",
            }}
          />
        </div>

        {/* Left text overlay gradient — readability for headline */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(28,19,52,0.75) 0%, rgba(28,19,52,0.55) 30%, rgba(28,19,52,0.15) 55%, transparent 70%)",
          }}
        />

        {/* Atmospheric glow */}
        <div className="absolute inset-0 pointer-events-none hero-atmosphere" />

        {/* Lighthouse glow effect */}
        <div
          className="absolute pointer-events-none hero-lighthouse-glow"
          style={{
            top: "12%",
            right: "22%",
            width: "200px",
            height: "200px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-28 md:pt-36 lg:pt-40 pb-48 md:pb-56 lg:pb-64">
          <div className="max-w-[520px]">
            <p className="text-xs md:text-sm font-bold tracking-[0.18em] uppercase mb-6 hero-fade-in"
               style={{ color: "#E87D3E" }}>
              Strategic Alignment
            </p>

            <h1
              className="text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] leading-[1.08] mb-7 text-white hero-fade-in-delay-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Clarity leads.
              <br />
              Alignment follows.
              <br />
              <span className="hero-accent-text">Progress together.</span>
            </h1>

            <p className="text-base md:text-[1.125rem] font-light text-white/60 leading-relaxed max-w-[440px] mb-8 hero-fade-in-delay-2">
              When your organization is aligned on what matters most, teams
              move with confidence, decisions get easier, and you achieve
              more&mdash;together.
            </p>

            <div className="hero-fade-in-delay-3">
              <Link
                href="https://calendly.com/getcampfire/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-button inline-flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded-full text-base transition-all duration-300"
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

        {/* Bottom gradient for value strip overlap */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(28,19,52,0.7) 100%)",
          }}
        />
      </section>

      {/* ════════ VALUE STRIP — floating card overlapping hero ════════ */}
      <section className="relative z-20 -mt-20 md:-mt-16 pb-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl shadow-black/8 border border-[#E5E0DA]/50 px-6 py-6 md:px-10 md:py-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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
        @keyframes heroGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
        @keyframes atmosphereShift {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.08; }
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
          background: linear-gradient(135deg, #E87D3E 0%, #D4603A 60%, #C04838 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-lighthouse-glow {
          background: radial-gradient(circle, rgba(255, 210, 140, 0.3) 0%, rgba(255, 180, 100, 0.1) 40%, transparent 70%);
          animation: heroGlow 5s ease-in-out infinite;
        }

        .hero-atmosphere {
          background: radial-gradient(ellipse at 70% 20%, rgba(232, 125, 62, 0.06) 0%, transparent 50%);
          animation: atmosphereShift 20s ease-in-out infinite;
        }

        .hero-cta-button {
          background: linear-gradient(135deg, #E87D3E 0%, #D4603A 50%, #C04838 100%);
          box-shadow: 0 4px 20px rgba(232, 125, 62, 0.3);
        }
        .hero-cta-button:hover {
          box-shadow: 0 8px 32px rgba(232, 125, 62, 0.45);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
