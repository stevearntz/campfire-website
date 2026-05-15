"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── value strip data ─── */

const VALUE_ITEMS = [
  {
    label: "Shared Direction",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 8L20 32" />
        <path d="M12 16L20 8L28 16" />
        <circle cx="20" cy="20" r="14" strokeDasharray="4 3" opacity="0.4" />
      </svg>
    ),
  },
  {
    label: "Connected Teams",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="14" r="3" />
        <circle cx="28" cy="14" r="3" />
        <circle cx="20" cy="28" r="3" />
        <path d="M14.5 16L18 26" />
        <path d="M25.5 16L22 26" />
        <path d="M15 14H25" />
      </svg>
    ),
  },
  {
    label: "Confident Decisions",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="20" cy="20" r="14" />
        <circle cx="20" cy="20" r="7" opacity="0.5" />
        <circle cx="20" cy="20" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Stronger Impact",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="20" cy="20" r="5" />
        <circle cx="20" cy="20" r="10" opacity="0.5" />
        <circle cx="20" cy="20" r="15" opacity="0.25" />
      </svg>
    ),
  },
];

/* ─── component ─── */

export default function StrategicAlignmentHero() {
  const illustrationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (illustrationRef.current) {
          const scrollY = window.scrollY;
          illustrationRef.current.style.transform = `translateY(${scrollY * 0.12}px)`;
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
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "90vh" }}
      >
        {/* Background: warm sunset gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(155deg, #1C1334 0%, #2D1B4E 20%, #4E2A6E 40%, #6E3FCC 55%, #8B5DA8 68%, #B87DA0 80%, #D4A0B9 92%, #E8C4B8 100%)",
          }}
        />

        {/* Topo texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/clear-topo.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.08,
          }}
        />

        {/* Atmospheric glow layer */}
        <div className="absolute inset-0 pointer-events-none hero-atmosphere" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* LEFT: Text content */}
            <div className="max-w-[540px]">
              <p className="text-sm font-semibold tracking-[0.14em] uppercase text-white/40 mb-8 hero-fade-in">
                Campfire Signal
              </p>

              <h1
                className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] leading-[1.15] mb-8 text-white hero-fade-in-delay-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Clarity leads.
                <br />
                Alignment follows.
                <br />
                <span className="hero-accent-text">Progress together.</span>
              </h1>

              <div className="space-y-4 mb-10 hero-fade-in-delay-2">
                <p className="text-base md:text-lg font-light text-white/55 leading-relaxed">
                  When your organization is aligned on what matters most, teams
                  move with confidence, decisions get easier, and you achieve
                  more&mdash;together.
                </p>
                <p className="text-base md:text-lg font-semibold text-white/75 leading-relaxed">
                  One direction. Greater impact.
                </p>
              </div>

              <div className="hero-fade-in-delay-3">
                <Link
                  href="https://calendly.com/getcampfire/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-button inline-block text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300"
                >
                  Build Strategic Alignment
                </Link>
              </div>
            </div>

            {/* RIGHT: Illustration */}
            <div
              ref={illustrationRef}
              className="relative flex justify-center lg:justify-end will-change-transform"
            >
              <div className="relative hero-float">
                {/* Lighthouse glow */}
                <div className="absolute -top-4 right-[28%] w-40 h-40 hero-glow pointer-events-none z-10" />

                <Image
                  src="/hero-image-strategy.png"
                  alt="Lighthouse guiding sailboats across calm waters at sunset, representing strategic alignment bringing teams together"
                  width={800}
                  height={534}
                  className="w-full h-auto max-w-[420px] md:max-w-[500px] lg:max-w-[580px] rounded-2xl"
                  priority
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 60vw, 580px"
                />

                {/* Water reflection shimmer */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none hero-water-shimmer rounded-b-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #F8F5FC 100%)",
          }}
        />
      </section>

      {/* ════════ VALUE STRIP ════════ */}
      <section className="relative z-10 bg-[#F8F5FC] pt-4 pb-14 md:pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {VALUE_ITEMS.map((item, i) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center gap-3 hero-fade-in"
                style={{ animationDelay: `${0.6 + i * 0.1}s` }}
              >
                <div className="w-10 h-10 text-[#6E3FCC]/70">{item.icon}</div>
                <p className="text-sm font-bold text-[#1C1334] tracking-wide">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inline keyframes */}
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes heroGlow {
          0%, 100% { opacity: 0.25; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes atmosphereShift {
          0%, 100% { opacity: 0.06; }
          33% { opacity: 0.1; }
          66% { opacity: 0.04; }
        }
        @keyframes waterShimmer {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.15; }
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
          background: linear-gradient(135deg, #E8A0C0 0%, #D4A0B9 40%, #C9A0D4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-float {
          animation: heroFloat 8s ease-in-out infinite;
        }

        .hero-glow {
          background: radial-gradient(circle, rgba(255, 200, 140, 0.35) 0%, rgba(232, 160, 192, 0.15) 40%, transparent 70%);
          animation: heroGlow 5s ease-in-out infinite;
          left: 50%;
          top: 0;
          transform: translate(-50%, -50%);
        }

        .hero-atmosphere {
          background: radial-gradient(ellipse at 75% 25%, rgba(232, 125, 62, 0.07) 0%, transparent 55%),
                      radial-gradient(ellipse at 25% 75%, rgba(110, 63, 204, 0.05) 0%, transparent 55%);
          animation: atmosphereShift 20s ease-in-out infinite;
        }

        .hero-water-shimmer {
          background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
          animation: waterShimmer 6s ease-in-out infinite;
        }

        .hero-cta-button {
          background: linear-gradient(135deg, #E87D3E 0%, #D4603A 50%, #C04838 100%);
          box-shadow: 0 4px 20px rgba(232, 125, 62, 0.25);
        }
        .hero-cta-button:hover {
          box-shadow: 0 8px 32px rgba(232, 125, 62, 0.4);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
