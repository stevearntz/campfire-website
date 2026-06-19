"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   STATIC CONTENT
   ═══════════════════════════════════════════════════════════════════ */

const PAINS = [
  {
    id: "drift",
    name: "Strategy drift",
    headline:
      "The priority you announced isn't the priority that's being worked on.",
    body: "Three weeks after the all-hands, every team has a slightly different read on what 'top priority' means. The deck is the same. The interpretation isn't. Drift is what happens between announcement and execution — and it compounds.",
    quote:
      "We aligned. Twice. And we still ended the quarter with four teams optimising for different things.",
    who: "VP People, Series-D fintech",
  },
  {
    id: "frag",
    name: "Fragmented execution",
    headline:
      "Speed without shared meaning is just velocity in different directions.",
    body: "Each team is moving faster on its own. The cross-functional surface area — where the actual work lives — is where things fall apart. More tools, more rituals, more channels. Less coherence.",
    quote:
      "Every team has its own version of 'done.' We don't have a coordination problem; we have a meaning problem.",
    who: "Director of Operations, healthcare",
  },
  {
    id: "fric",
    name: "Cross-functional friction",
    headline: "The handoff is where the strategy actually breaks.",
    body: "Product, engineering, GTM, ops — each is operating from a slightly different read of the same plan. The friction shows up in re-work, in escalations, in shipped things nobody is proud of. The fix isn't another doc; it's structured conversation between the right people.",
    quote:
      "We don't have a roadmap problem. We have a 'who decides what in the seams' problem.",
    who: "CPO, mid-market SaaS",
  },
  {
    id: "trans",
    name: "Manager translation failure",
    headline:
      "If managers can't translate it, it isn't strategy. It's an announcement.",
    body: "Your managers are the translation layer between leadership intent and team-level action. When they don't have the language, the frame, or the practice to translate, the strategy stays on the slide. Most leadership training treats them like learners. They need to be treated like operators.",
    quote:
      "My managers nod in the leadership meeting and then improvise in their own 1:1s. I can't scale that.",
    who: "CEO, 480-person Series-C",
  },
  {
    id: "ai",
    name: "AI-enabled chaos",
    headline:
      "AI is making your fast teams faster than your slow systems can absorb.",
    body: "AI compresses production cycles. It doesn't compress understanding cycles. Teams ship more, decide faster, change direction more often — and the social systems that used to keep everyone roughly together can't keep up. The bottleneck moved.",
    quote: "We're shipping three times as much. Half of it nobody asked for.",
    who: "VP Engineering, B2B SaaS",
  },
  {
    id: "fat",
    name: "Change fatigue",
    headline:
      "Your people aren't tired of change. They're tired of incoherent change.",
    body: "Change fatigue is rarely about volume. It's about meaning. When change after change arrives without a coherent through-line, people stop investing in adoption. The cure isn't fewer initiatives — it's fewer disconnected ones.",
    quote:
      "It's not the number of things we're rolling out. It's that none of them seem to know about each other.",
    who: "Chief of Staff, professional services",
  },
];

const PILLARS = [
  {
    num: "01",
    h: "Shared understanding.",
    p: "Most organizations don't lack information — they lack shared interpretation. We help leaders, managers, and teams arrive at the same read of the same priority, so the work after the meeting goes the same direction the meeting did.",
  },
  {
    num: "02",
    h: "Managerial coherence.",
    p: "Managers are the translation layer. We give them the language, the frames, and the live practice to turn change into team-level conversations and commitments — at scale, without depending on a single facilitator.",
  },
  {
    num: "03",
    h: "Coordinated execution.",
    p: "Conversation is the mechanism, not the goal. Every loop ends in a behavior, a commitment, or a decision someone can be held to. We instrument the result so you can see drift early — and reset before it compounds.",
  },
];

const STEPS = [
  {
    n: 1,
    h: "Clarify the priority.",
    p: "Find the one or two things that, if everyone read them the same way, would change behavior next week.",
  },
  {
    n: 2,
    h: "Translate through managers.",
    p: "Give managers the frames, prompts, and live practice to carry it into their teams in their own voice.",
  },
  {
    n: 3,
    h: "Facilitate structured conversations.",
    p: "Short, repeatable team conversations on the Campfire platform — psychologically safe, behaviorally useful.",
  },
  {
    n: 4,
    h: "Reinforce behaviors.",
    p: "The work after the conversation is the work. We close the loop on commitments and surface what's actually changing.",
  },
  {
    n: 5,
    h: "Sense drift, adjust.",
    p: "Light-touch instrumentation tells you where understanding is slipping, who needs support, and where to reset.",
  },
];

const OFFERS = [
  {
    id: "sprint",
    pill: "For leadership teams",
    num: "01",
    h: "Strategic Coherence Sprint",
    blurb:
      "A 3-week facilitated sprint for the leadership team to clarify the top priority, surface drift risks, and define the behaviors needed for consistent execution across the org.",
    bullets: [
      "Two 90-minute leadership working sessions on the Campfire platform",
      "Live drift-risk mapping with the leaders' own context",
      'A shared, behaviorally specific definition of "what good looks like"',
      "A one-page coherence brief for downstream managers",
    ],
    pair: [
      ["Format", "Hybrid \u00B7 live + async"],
      ["Best for", "Leadership team of 6\u201314"],
    ],
  },
  {
    id: "translate",
    pill: "For managers",
    num: "02",
    h: "Manager Translation System",
    blurb:
      "A repeatable system that helps managers translate strategy and change into team-level conversations, behaviors, and commitments — without needing a facilitator in the room.",
    bullets: [
      "Reusable conversation templates managers run with their own teams",
      "Live calibration cohorts so managers translate consistently",
      "A short field guide tied to your actual leadership framework",
      "Light instrumentation to surface drift before it compounds",
    ],
    pair: [
      ["Format", "Cohort + self-serve"],
      ["Best for", "20\u2013200 managers"],
    ],
  },
  {
    id: "ai",
    pill: "For AI rollouts",
    num: "03",
    h: "AI Adoption Coordination Lab",
    blurb:
      "A structured conversation and reinforcement system to help teams align around AI adoption — clarify expectations, surface anxieties, and reduce the confusion that quietly kills adoption.",
    bullets: [
      "Team-level conversations on what AI is — and isn't — for here",
      "Manager prompts for the second-month moment when novelty fades",
      "Decision rubrics for the choices nobody wants to put in policy",
      "Pulse signal so leaders see adoption reality, not adoption theatre",
    ],
    pair: [
      ["Format", "8-week structured lab"],
      ["Best for", "Teams 200\u20135,000"],
    ],
  },
  {
    id: "xfn",
    pill: "For cross-functional friction",
    num: "04",
    h: "Cross-Functional Coordination Lab",
    blurb:
      "A facilitated system for reducing silos, surfacing the friction nobody wants to name, and improving execution across teams who keep handing things off badly.",
    bullets: [
      "Joint sessions between the teams who actually share the seam",
      "Surfacing the implicit decisions that cause re-work",
      "Shared commitments with names, dates, and named owners",
      "A 30-day check-in baked into the system, not a calendar reminder",
    ],
    pair: [
      ["Format", "6-week joint cohort"],
      ["Best for", "2\u20135 functions sharing a seam"],
    ],
  },
];

const MIDDLE_ROWS = [
  {
    what: "Enterprise software",
    verdict:
      "Scalable. But cold. Coordination without humans rarely sticks.",
  },
  {
    what: "Strategy consulting",
    verdict:
      "Strategic. But heavy, slow, and ends when the engagement ends.",
  },
  {
    what: "Leadership training",
    verdict:
      "Useful. But disconnected from the execution it's supposed to enable.",
  },
  {
    what: "Engagement platforms",
    verdict:
      "Easy to roll out. Often shallow. Rarely changes how decisions get made.",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   SVG DIAGRAM COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

const C = {
  navy: "#1C1334",
  indigo: "#1E2A4A",
  purple600: "#6E3FCC",
  purple400: "#A07EE3",
  purple300: "#9D88ED",
  purple100: "#E1D8F3",
  purple050: "#F8F5FC",
  pink: "#E055CB",
  pinkLite: "#EE80DD",
  warm: "#FFC28A",
  warmHot: "#F59E2C",
  gray200: "#E5E7EB",
  gray400: "#9CA3AF",
  gray500: "#636B7C",
};

function HeroDiagram() {
  return (
    <div className="w-full max-w-[540px] mx-auto lg:mx-0" aria-hidden="true">
      <svg viewBox="0 0 540 540" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="hd-fire" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C.warm} stopOpacity="1" />
            <stop offset="35%" stopColor={C.warmHot} stopOpacity="0.55" />
            <stop offset="65%" stopColor={C.pink} stopOpacity="0.18" />
            <stop offset="100%" stopColor={C.purple600} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hd-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C.purple300} stopOpacity="0.5" />
            <stop offset="60%" stopColor={C.purple300} stopOpacity="0.08" />
            <stop offset="100%" stopColor={C.purple300} stopOpacity="0" />
          </radialGradient>
          <filter id="hd-blur">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        <circle cx="270" cy="270" r="240" fill="url(#hd-glow)" />

        <g className="hd-loops" fill="none" strokeLinecap="round">
          <circle cx="270" cy="270" r="92" stroke={C.purple300} strokeOpacity="0.55" strokeWidth="1" strokeDasharray="2 6" />
          <circle cx="270" cy="270" r="140" stroke={C.purple300} strokeOpacity="0.42" strokeWidth="1" strokeDasharray="3 8" />
          <circle cx="270" cy="270" r="190" stroke={C.purple300} strokeOpacity="0.28" strokeWidth="1" strokeDasharray="2 10" />
          <circle cx="270" cy="270" r="240" stroke={C.purple300} strokeOpacity="0.16" strokeWidth="1" strokeDasharray="2 12" />
        </g>

        <g className="hd-fire">
          <circle cx="270" cy="270" r="80" fill="url(#hd-fire)" filter="url(#hd-blur)" />
          <circle cx="270" cy="270" r="34" fill="url(#hd-fire)" />
          <circle cx="270" cy="270" r="14" fill={C.warm} opacity="0.95" />
        </g>

        <g stroke={C.purple300} strokeOpacity="0.55" strokeLinecap="round" fill="none">
          <line x1="50" y1="60" x2="120" y2="92" strokeWidth="1.4" strokeDasharray="2 4" />
          <line x1="78" y1="105" x2="148" y2="78" strokeWidth="1.1" strokeDasharray="2 4" />
          <line x1="35" y1="155" x2="92" y2="142" strokeWidth="1.4" strokeDasharray="2 4" />
          <line x1="120" y1="38" x2="158" y2="120" strokeWidth="1.1" strokeDasharray="2 4" />
        </g>
        <g fill={C.purple300}>
          <circle cx="50" cy="60" r="3.5" />
          <circle cx="120" cy="92" r="3" opacity="0.75" />
          <circle cx="78" cy="105" r="3" opacity="0.85" />
          <circle cx="148" cy="78" r="2.5" opacity="0.7" />
          <circle cx="35" cy="155" r="3.5" />
          <circle cx="92" cy="142" r="2.5" opacity="0.7" />
          <circle cx="120" cy="38" r="3" opacity="0.85" />
          <circle cx="158" cy="120" r="2.5" opacity="0.7" />
        </g>

        <g stroke={C.warm} strokeOpacity="0.85" strokeLinecap="round" fill="none">
          <line x1="380" y1="430" x2="470" y2="430" strokeWidth="2" />
          <line x1="385" y1="455" x2="475" y2="455" strokeWidth="2" />
          <line x1="390" y1="480" x2="480" y2="480" strokeWidth="2" />
          <line x1="395" y1="505" x2="485" y2="505" strokeWidth="2" />
          <polyline points="465,425 472,430 465,435" strokeWidth="2" />
          <polyline points="470,450 477,455 470,460" strokeWidth="2" />
          <polyline points="475,475 482,480 475,485" strokeWidth="2" />
          <polyline points="480,500 487,505 480,510" strokeWidth="2" />
        </g>

        <g>
          {[
            { x: 460, y: 130, type: "frag" as const },
            { x: 90, y: 380, type: "frag" as const },
            { x: 470, y: 270, type: "mid" as const },
            { x: 80, y: 220, type: "mid" as const },
            { x: 270, y: 60, type: "mid" as const },
            { x: 270, y: 480, type: "coh" as const },
            { x: 410, y: 460, type: "coh" as const },
            { x: 150, y: 470, type: "coh" as const },
          ].map((n, i) => {
            const fill =
              n.type === "coh"
                ? C.warm
                : n.type === "mid"
                  ? C.purple300
                  : C.purple400;
            return (
              <g key={i}>
                <circle cx={n.x} cy={n.y} r="11" fill="rgba(255,255,255,0.06)" stroke={fill} strokeOpacity="0.4" strokeWidth="1" />
                <circle cx={n.x} cy={n.y} r="4" fill={fill} />
                <line
                  x1={n.x} y1={n.y}
                  x2={270 + (n.x - 270) * 0.32}
                  y2={270 + (n.y - 270) * 0.32}
                  stroke={fill} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 5" strokeLinecap="round"
                />
              </g>
            );
          })}
        </g>

        <path
          d="M 110 110 Q 240 260 430 430"
          fill="none" stroke={C.warm} strokeOpacity="0.32" strokeWidth="1.5" strokeDasharray="1 6" strokeLinecap="round"
        />

        <g fontFamily="var(--font-spartan), League Spartan, sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="2" fill="rgba(255,255,255,0.5)">
          <text x="44" y="200" textAnchor="start">FRAGMENTED</text>
          <text x="384" y="402" textAnchor="start">COHERENT</text>
        </g>
      </svg>

      <style>{`
        .hd-fire { transform-origin: 270px 270px; animation: hd-pulse 5.5s ease-in-out infinite; }
        @keyframes hd-pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.04); opacity: 0.92; } }
        .hd-loops circle:nth-child(1) { animation: hd-spin 50s linear infinite; transform-origin: 270px 270px; }
        .hd-loops circle:nth-child(2) { animation: hd-spin 80s linear infinite reverse; transform-origin: 270px 270px; }
        .hd-loops circle:nth-child(3) { animation: hd-spin 110s linear infinite; transform-origin: 270px 270px; }
        .hd-loops circle:nth-child(4) { animation: hd-spin 150s linear infinite reverse; transform-origin: 270px 270px; }
        @keyframes hd-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .hd-fire, .hd-loops circle { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function PillarSharedUnderstanding() {
  return (
    <svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-auto">
      <defs>
        <radialGradient id="su-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.warm} stopOpacity="1" />
          <stop offset="100%" stopColor={C.warmHot} stopOpacity="0.7" />
        </radialGradient>
      </defs>
      <g opacity="0.85">
        <circle cx="92" cy="78" r="48" fill={C.purple600} fillOpacity="0.16" stroke={C.purple600} strokeOpacity="0.6" strokeWidth="1" />
        <circle cx="148" cy="78" r="48" fill={C.purple600} fillOpacity="0.16" stroke={C.purple600} strokeOpacity="0.6" strokeWidth="1" />
        <circle cx="120" cy="120" r="48" fill={C.purple600} fillOpacity="0.16" stroke={C.purple600} strokeOpacity="0.6" strokeWidth="1" />
      </g>
      <circle cx="120" cy="92" r="14" fill="url(#su-core)" />
      <circle cx="120" cy="92" r="6" fill={C.warm} />
      <g stroke={C.purple300} strokeOpacity="0.5" strokeDasharray="2 4" strokeWidth="1" fill="none">
        <line x1="92" y1="78" x2="120" y2="92" />
        <line x1="148" y1="78" x2="120" y2="92" />
        <line x1="120" y1="120" x2="120" y2="92" />
      </g>
    </svg>
  );
}

function PillarManagerialCoherence() {
  return (
    <svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-auto">
      <g>
        <circle cx="120" cy="30" r="14" fill="none" stroke={C.purple600} strokeWidth="1.2" strokeOpacity="0.7" />
        <circle cx="120" cy="30" r="6" fill={C.purple600} />
      </g>
      <g stroke={C.warm} strokeWidth="1.2" strokeLinecap="round" fill="none">
        <line x1="120" y1="44" x2="60" y2="86" strokeDasharray="3 4" opacity="0.75" />
        <line x1="120" y1="44" x2="120" y2="86" strokeDasharray="3 4" opacity="0.75" />
        <line x1="120" y1="44" x2="180" y2="86" strokeDasharray="3 4" opacity="0.75" />
      </g>
      <g>
        {[60, 120, 180].map((x) => (
          <g key={x}>
            <rect x={x - 18} y="86" width="36" height="22" rx="6" fill={C.warm} opacity="0.18" stroke={C.warm} strokeWidth="1.2" />
            <circle cx={x} cy="97" r="3" fill={C.warm} />
          </g>
        ))}
      </g>
      <g stroke={C.purple300} strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round">
        {[60, 120, 180].map((x) => (
          <g key={x}>
            <line x1={x} y1="108" x2={x - 18} y2="138" />
            <line x1={x} y1="108" x2={x} y2="138" />
            <line x1={x} y1="108" x2={x + 18} y2="138" />
          </g>
        ))}
      </g>
      <g fill={C.purple300}>
        {[60, 120, 180].map((x) => (
          <g key={x}>
            <circle cx={x - 18} cy="142" r="3.5" />
            <circle cx={x} cy="142" r="3.5" />
            <circle cx={x + 18} cy="142" r="3.5" />
          </g>
        ))}
      </g>
      <g fontFamily="var(--font-spartan), League Spartan, sans-serif" fontSize="8" fontWeight="700" letterSpacing="1.5" fill={C.gray400}>
        <text x="120" y="170" textAnchor="middle">TRANSLATION LAYER</text>
      </g>
    </svg>
  );
}

function PillarCoordinatedExecution() {
  return (
    <svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-auto">
      <g stroke={C.purple600} strokeWidth="2" fill="none" strokeLinecap="round">
        {[40, 60, 80, 100, 120, 140].map((y, i) => {
          const len = 120 + (i % 3) * 14;
          const x1 = 50;
          const x2 = x1 + len;
          return (
            <g key={y} opacity={0.5 + i * 0.08}>
              <line x1={x1} y1={y} x2={x2} y2={y} />
              <polyline points={`${x2 - 8},${y - 5} ${x2},${y} ${x2 - 8},${y + 5}`} />
            </g>
          );
        })}
      </g>
      <path
        d="M 195 40 Q 220 95 195 150"
        stroke={C.warm} strokeWidth="1.5" strokeDasharray="2 5" fill="none" strokeLinecap="round" opacity="0.8"
      />
      <polyline points="190,148 195,152 200,148" stroke={C.warm} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <g fontFamily="var(--font-spartan), League Spartan, sans-serif" fontSize="8" fontWeight="700" letterSpacing="1.5" fill={C.gray400}>
        <text x="120" y="170" textAnchor="middle">IN SYNC, ADJUSTING</text>
      </g>
    </svg>
  );
}

function MiddleVisual() {
  return (
    <svg viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-auto max-w-[400px] mx-auto">
      <defs>
        <radialGradient id="mv-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.warm} stopOpacity="1" />
          <stop offset="60%" stopColor={C.purple600} stopOpacity="0.55" />
          <stop offset="100%" stopColor={C.purple600} stopOpacity="0" />
        </radialGradient>
      </defs>

      <path d="M 60 280 A 170 170 0 0 1 400 280" fill="none" stroke={C.gray200} strokeWidth="2" />

      <g stroke={C.gray200} strokeWidth="2" strokeLinecap="round">
        {Array.from({ length: 9 }).map((_, i) => {
          const t = i / 8;
          const angle = Math.PI * (1 - t);
          const x = 230 + Math.cos(angle) * 170;
          const y = 280 - Math.sin(angle) * 170;
          const x2 = 230 + Math.cos(angle) * 158;
          const y2 = 280 - Math.sin(angle) * 158;
          return <line key={i} x1={x} y1={y} x2={x2} y2={y2} />;
        })}
      </g>

      <g fontFamily="var(--font-spartan), League Spartan, sans-serif" fontWeight="700" fontSize="11" letterSpacing="2.4" fill={C.gray400}>
        <text x="50" y="306" textAnchor="start">COLD</text>
        <text x="50" y="320" textAnchor="start">&amp; SCALABLE</text>
        <text x="410" y="306" textAnchor="end">WARM</text>
        <text x="410" y="320" textAnchor="end">&amp; HEAVY</text>
      </g>

      <circle cx="230" cy="110" r="60" fill="url(#mv-core)" />
      <circle cx="230" cy="110" r="14" fill={C.warm} />
      <line x1="230" y1="124" x2="230" y2="275" stroke={C.purple600} strokeWidth="2" strokeLinecap="round" />
      <circle cx="230" cy="280" r="6" fill={C.purple600} />

      <g>
        <circle cx="84" cy="232" r="9" fill="none" stroke={C.gray400} strokeWidth="1.4" />
        <text x="84" y="262" textAnchor="middle" fontFamily="var(--font-spartan)" fontSize="11" fontWeight="600" fill={C.gray500}>Enterprise SW</text>
      </g>
      <g>
        <circle cx="376" cy="232" r="9" fill="none" stroke={C.gray400} strokeWidth="1.4" />
        <text x="376" y="262" textAnchor="middle" fontFamily="var(--font-spartan)" fontSize="11" fontWeight="600" fill={C.gray500}>Consulting</text>
      </g>
      <g>
        <circle cx="155" cy="160" r="7" fill="none" stroke={C.gray400} strokeWidth="1.2" />
        <text x="155" y="146" textAnchor="middle" fontFamily="var(--font-spartan)" fontSize="11" fontWeight="600" fill={C.gray500}>L&amp;D</text>
      </g>
      <g>
        <circle cx="305" cy="160" r="7" fill="none" stroke={C.gray400} strokeWidth="1.2" />
        <text x="305" y="146" textAnchor="middle" fontFamily="var(--font-spartan)" fontSize="11" fontWeight="600" fill={C.gray500}>Engagement</text>
      </g>

      <g fontFamily="var(--font-spartan), League Spartan, sans-serif" fontWeight="800" letterSpacing="-0.01em">
        <text x="230" y="346" textAnchor="middle" fontSize="22" fill={C.indigo}>Campfire</text>
        <text x="230" y="368" textAnchor="middle" fontSize="11" letterSpacing="3" fontWeight="700" fill={C.purple600}>THE RARE MIDDLE</text>
      </g>
    </svg>
  );
}

function ThanksFire() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-24 h-24 mx-auto">
      <defs>
        <radialGradient id="tf-g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.warm} stopOpacity="1" />
          <stop offset="55%" stopColor={C.warmHot} stopOpacity="0.45" />
          <stop offset="100%" stopColor={C.purple600} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke={C.purple300} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 6" />
      <circle cx="60" cy="60" r="42" fill="none" stroke={C.purple300} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 5" />
      <circle cx="60" cy="60" r="28" fill="url(#tf-g)" />
      <circle cx="60" cy="60" r="10" fill={C.warm} />
    </svg>
  );
}

const PILLAR_GLYPHS = [PillarSharedUnderstanding, PillarManagerialCoherence, PillarCoordinatedExecution];

/* ═══════════════════════════════════════════════════════════════════
   SECTION NAV (scrollspy sub-nav below global Navbar)
   ═══════════════════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { id: "problem", label: "The problem" },
  { id: "what", label: "What it is" },
  { id: "how", label: "How it works" },
  { id: "offers", label: "Offerings" },
  { id: "why", label: "Why Campfire" },
];

function SectionNav({
  active,
  onScrollTo,
  onOpenForm,
}: {
  active: string;
  onScrollTo: (id: string) => void;
  onOpenForm: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const navScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-scroll the nav when active section changes (scrollspy or tap)
  useEffect(() => {
    const container = navScrollRef.current;
    if (!container) return;
    const index = NAV_ITEMS.findIndex((item) => item.id === active);
    if (index < 0) return;
    // First item: scroll all the way home
    if (index === 0) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    const tab = container.children[index] as HTMLElement | null;
    if (!tab) return;
    container.scrollTo({
      left: tab.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });
  }, [active]);

  const handleNavTap = (id: string) => {
    onScrollTo(id);
  };

  return (
    <nav
      className={`fixed top-[64px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/60 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center h-[44px]">
        <div
          ref={navScrollRef}
          className="flex items-center gap-5 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleNavTap(item.id)}
              className={`text-[13px] font-semibold whitespace-nowrap transition-colors shrink-0 ${
                active === item.id
                  ? "text-[#6E3FCC]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="hidden lg:block shrink-0 pr-5 pl-4">
          <button
            onClick={onOpenForm}
            className="text-[13px] font-semibold text-white bg-[#E055CB] hover:bg-[#d040b8] px-4 py-1.5 rounded-md transition-colors whitespace-nowrap"
          >
            Book a conversation
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function HumanCoordinationClient() {
  // Scrollspy
  const [active, setActive] = useState("top");

  useEffect(() => {
    const ids = ["problem", "what", "how", "offers", "why"];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top =
      id === "top"
        ? 0
        : el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  // Pain tabs
  const [activePain, setActivePain] = useState(PAINS[0].id);
  const painTabsRef = useRef<HTMLDivElement>(null);

  const selectPain = (id: string, index: number) => {
    setActivePain(id);
    // On mobile, scroll the tab list so the tapped tab aligns to the left edge
    const container = painTabsRef.current;
    if (!container) return;
    const tab = container.children[index] as HTMLElement | null;
    if (!tab) return;
    container.scrollTo({
      left: tab.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });
  };

  // Offer cards
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [interested, setInterested] = useState<Set<string>>(() => new Set());

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    challenge: "",
    note: "",
  });
  const [formState, setFormState] = useState<"idle" | "submitting" | "thanks">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formTimestamp = useRef(Date.now());

  const markInterested = (id: string) => {
    setInterested((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    const offerToChallenge: Record<string, string> = {
      sprint: "drift",
      translate: "managers",
      ai: "ai",
      xfn: "xfn",
    };
    const challenge = offerToChallenge[id];
    if (challenge && !form.challenge) {
      setForm((f) => ({ ...f, challenge }));
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required.";
    if (!form.email.trim()) e.email = "Required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = "Doesn't look quite right.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setFormState("submitting");

    // Build message from optional fields
    const parts: string[] = [];
    if (form.role) parts.push(`Role: ${form.role}`);
    if (form.challenge) parts.push(`Challenge: ${form.challenge}`);
    if (form.note) parts.push(`Note: ${form.note}`);
    if (interested.size > 0) {
      const labels = OFFERS.filter((o) => interested.has(o.id)).map((o) => o.h);
      parts.push(`Interested in: ${labels.join(", ")}`);
    }
    parts.push("[Source: Human Coordination Systems page]");

    const nameParts = form.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: form.email,
          company: form.company,
          message: parts.join("\n"),
          _t: formTimestamp.current,
        }),
      });
    } catch {
      // Fail silently — still show thank-you
    }

    setFormState("thanks");
    setTimeout(() => {
      const el = document.getElementById("booking");
      if (el)
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 30,
          behavior: "smooth",
        });
    }, 40);
  };

  const onReset = () => {
    setFormState("idle");
    setForm({ name: "", email: "", company: "", role: "", challenge: "", note: "" });
    setErrors({});
    formTimestamp.current = Date.now();
  };

  const onJoinBooking = () => {
    scrollTo("booking");
    setTimeout(() => {
      const el = document.getElementById("r-name");
      if (el) el.focus({ preventScroll: true });
    }, 600);
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const pain = PAINS.find((p) => p.id === activePain) || PAINS[0];

  return (
    <>
      <SectionNav active={active} onScrollTo={scrollTo} onOpenForm={onJoinBooking} />

      {/* ─── HERO ─── */}
      <section id="top" className="relative bg-[#1C1334] overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(/purple-topo.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-28 md:pt-36 lg:pt-40 pb-16 md:pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-5">
                The human coordination system
              </p>
              <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[4rem] font-extrabold leading-[1.05] tracking-tight text-white mb-6">
                Move faster<br />
                without <em className="not-italic text-[#E055CB]">fragmenting.</em>
              </h1>
              <p className="text-lg md:text-xl text-white/65 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Campfire helps organizations create <strong className="text-white/90">shared understanding</strong>, reduce strategy drift, and turn change into coordinated execution — through scalable, psychologically safe conversation systems.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start mb-10">
                <button
                  onClick={onJoinBooking}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#E055CB] hover:bg-[#d040b8] rounded-lg transition-colors"
                >
                  Book a conversation
                  <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollTo("how")}
                  className="inline-flex items-center px-6 py-3.5 text-base font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors"
                >
                  See how it works
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-white/45 justify-center lg:justify-start">
                <div>
                  <span className="font-semibold text-white/60 block">Built for</span>
                  Leaders navigating rapid change
                </div>
                <div>
                  <span className="font-semibold text-white/60 block">Used in</span>
                  6,000+ sessions delivered
                </div>
                <div>
                  <span className="font-semibold text-white/60 block">Trusted by</span>
                  Cotopaxi, Dermalogica, Cricut, Plusgrade
                </div>
              </div>
            </div>
            <div className="flex-1 hidden lg:block">
              <HeroDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM / PAIN TABS ─── */}
      <section id="problem" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              The problem we keep hearing
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-5">
              Organizations are operationally <em className="not-italic text-[#6E3FCC]">faster,</em> but socially fragmented.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              AI is helping teams move faster than ever. But speed without shared understanding creates drift. Leaders announce priorities, managers interpret them differently, teams move in different directions — and execution becomes inconsistent.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Tab list */}
            <div ref={painTabsRef} className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:w-72 shrink-0 pb-2 lg:pb-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" role="tablist" aria-label="Coordination pains">
              {PAINS.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={p.id === activePain}
                  onClick={() => selectPain(p.id, i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left whitespace-nowrap lg:whitespace-normal transition-all shrink-0 ${
                    p.id === activePain
                      ? "bg-[#F8F5FC] border border-[#6E3FCC]/20 text-[#1C1334]"
                      : "bg-gray-50 border border-transparent text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xs font-bold text-[#6E3FCC]/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold">{p.name}</span>
                  <svg className="w-3 h-3 ml-auto shrink-0" viewBox="0 0 10 10" fill="none">
                    <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div className="flex-1 bg-[#F8F5FC] rounded-2xl p-8 md:p-10" role="tabpanel">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/50 mb-4">
                Pain {"\u00B7"} {PAINS.findIndex((p) => p.id === pain.id) + 1} of 6
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-[#1C1334] mb-4 leading-snug">
                {pain.headline}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                {pain.body}
              </p>
              <div className="border-l-4 border-[#6E3FCC]/30 pl-5 py-2">
                <p className="text-base italic text-[#1C1334]/80 leading-relaxed">
                  &ldquo;{pain.quote}&rdquo;
                  <span className="block text-sm text-gray-500 mt-2 not-italic">
                    — {pain.who}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INSIGHT ─── */}
      <section className="py-20 md:py-28 bg-[#F8F5FC]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-5">
            The insight
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-6">
            The new challenge is <em className="not-italic text-[#6E3FCC]">coordinated meaning</em> at scale.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-5">
            Most organizations do not lack information. They lack <em className="not-italic font-semibold text-[#1C1334]">shared understanding.</em> The work now is helping people interpret priorities together, challenge ideas productively, reinforce behaviors consistently, and coordinate through change — without bolting on another tool, another all-hands, or another framework nobody reads.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            The humanity is not separate from the operational value. The humanity <em className="not-italic font-semibold text-[#1C1334]">is</em> the mechanism.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#6E3FCC]">
            <span className="w-2 h-2 rounded-full bg-[#6E3FCC]" />
            The Campfire point of view.
          </div>
        </div>
      </section>

      {/* ─── WHAT IT IS / PILLARS ─── */}
      <section id="what" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              What Campfire does
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-5">
              Campfire creates <em className="not-italic text-[#6E3FCC]">human coordination systems.</em>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Three things, run as one system: shared understanding of the priority, managerial coherence in how it gets carried, and coordinated execution that actually moves.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PILLARS.map((p, i) => {
              const Glyph = PILLAR_GLYPHS[i];
              return (
                <article key={p.num} className="bg-[#F8F5FC] rounded-2xl p-8">
                  <div className="w-full max-w-[180px] mx-auto mb-6">
                    <Glyph />
                  </div>
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/50 mb-2">
                    Pillar {p.num}
                  </p>
                  <h3 className="text-xl font-bold text-[#1C1334] mb-3">{p.h}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.p}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" className="py-20 md:py-28 bg-[#1C1334]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-4">
              How the system works
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-white mb-5">
              A system, <em className="not-italic text-[#E055CB]">not a workshop series.</em>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Five linked steps, run as a loop. Each one ends in something observable — a clarified priority, a manager who can translate it, a conversation that ended in a commitment, a behavior reinforced, a drift signal you can act on.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-[#6E3FCC]/40 via-[#9D88ED]/30 to-[#6E3FCC]/40" />

            <div className="grid md:grid-cols-5 gap-6 md:gap-4 relative">
              {STEPS.map((s) => (
                <div key={s.n} className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#6E3FCC] flex items-center justify-center text-white text-sm font-bold mb-4 relative z-10">
                    {s.n}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{s.h}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{s.p}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-10 text-sm text-[#9D88ED]/70">
              <svg viewBox="0 0 14 14" fill="none" className="w-4 h-4">
                <path d="M3 7c0-2 1.5-3.5 4-3.5S11 5 11 7M11 7l-2-2M11 7l2-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>The loop runs continuously. Drift signals trigger the next clarification.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OFFERINGS ─── */}
      <section id="offers" className="py-20 md:py-28 bg-[#F8F5FC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              How it shows up
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-5">
              Four ways Campfire <em className="not-italic text-[#6E3FCC]">runs in your org.</em>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Run one. Run all four. Each is a complete, instrumented system — not a workshop, not a deck, not a one-off. Mark the ones that fit your reality and we&apos;ll start there.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {OFFERS.map((o) => {
              const isExpanded = expanded.has(o.id);
              const isInterested = interested.has(o.id);
              return (
                <article
                  key={o.id}
                  className={`bg-white rounded-2xl p-8 border-2 transition-colors ${
                    isInterested
                      ? "border-[#6E3FCC]/30"
                      : "border-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs font-bold text-[#6E3FCC]/40 mb-1">{o.num}</p>
                      <span className="inline-block text-xs font-semibold bg-[#F8F5FC] text-[#6E3FCC] px-3 py-1 rounded-full">
                        {o.pill}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#1C1334] mb-3">{o.h}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{o.blurb}</p>

                  {/* Expandable details */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? "max-h-[600px] opacity-100 mb-4" : "max-h-0 opacity-0"
                    }`}
                    aria-hidden={!isExpanded}
                  >
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/50 mb-3">
                      What&apos;s in it
                    </p>
                    <ul className="space-y-2 mb-5">
                      {o.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FCC]/40 mt-1.5 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-8">
                      {o.pair.map(([k, v]) => (
                        <div key={k}>
                          <p className="text-xs font-bold tracking-[0.1em] uppercase text-gray-400 mb-1">
                            {k}
                          </p>
                          <p className="text-sm text-[#1C1334] font-medium">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => toggleExpand(o.id)}
                      className="flex items-center gap-1.5 text-sm font-medium text-[#6E3FCC] hover:text-[#5a2fb3] transition-colors"
                    >
                      {isExpanded ? "Show less" : "Learn more"}
                      <svg
                        viewBox="0 0 10 10"
                        fill="none"
                        className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      >
                        <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => markInterested(o.id)}
                      className={`ml-auto flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                        isInterested
                          ? "bg-[#6E3FCC] text-white"
                          : "bg-[#F8F5FC] text-[#6E3FCC] hover:bg-[#ede5f9]"
                      }`}
                    >
                      {isInterested ? (
                        <>
                          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6.5l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Interested
                        </>
                      ) : (
                        "I'm interested"
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── WHY CAMPFIRE / THE RARE MIDDLE ─── */}
      <section id="why" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              Why Campfire
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-5">
              The <em className="not-italic text-[#6E3FCC]">rare middle.</em>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Most categories optimise for one extreme. Campfire deliberately sits between them — psychologically safe facilitation, scalable relational experience, behavioral reinforcement, and operational simplicity.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1 space-y-3">
              {MIDDLE_ROWS.map((r) => (
                <div key={r.what} className="flex items-start gap-4 bg-gray-50 rounded-xl p-5">
                  <p className="text-sm font-bold text-[#1C1334] w-40 shrink-0">{r.what}</p>
                  <p className="text-sm text-gray-500 leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                    {r.verdict}
                  </p>
                </div>
              ))}
              <div className="flex items-start gap-4 bg-[#F8F5FC] rounded-xl p-5 border border-[#6E3FCC]/15">
                <p className="text-sm font-bold text-[#6E3FCC] w-40 shrink-0">Campfire</p>
                <p className="text-sm text-[#1C1334] leading-relaxed flex items-start gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FCC] mt-1.5 shrink-0" />
                  Psychologically safe, scalable, behaviorally reinforcing, operationally light.
                </p>
              </div>
            </div>
            <div className="flex-1 hidden lg:block">
              <MiddleVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOOKING FORM / THANK YOU ─── */}
      <section id="booking" className="py-20 md:py-28 bg-[#1C1334]">
        <div className="max-w-6xl mx-auto px-6">
          {formState === "thanks" ? (
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="flex-1">
                <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-4">
                  You&apos;re booked
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-white mb-5">
                  A short conversation, <em className="not-italic text-[#E055CB]">soon.</em>
                </h2>
                <p className="text-lg text-white/60 leading-relaxed mb-8">
                  Thank you. Here&apos;s what to expect from the next 30 minutes — and from the work that follows.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED] mt-2 shrink-0" />
                    <p className="text-white/70">
                      <strong className="text-white/90">30-minute first call.</strong> No pitch. We listen first — the priority you&apos;re carrying, the drift you&apos;re seeing, the manager layer you&apos;re trying to scale.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED] mt-2 shrink-0" />
                    <p className="text-white/70">
                      <strong className="text-white/90">Tailored plan inside a week.</strong> You leave the call with a specific recommendation — which system fits, what it looks like, what it costs.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED] mt-2 shrink-0" />
                    <p className="text-white/70">
                      <strong className="text-white/90">No surprises.</strong> Fixed-fee engagements. Real outcomes. Easy to start, easy to stop.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
                <div className="bg-white rounded-2xl p-8 text-center">
                  <ThanksFire />
                  <h3 className="text-2xl font-bold text-[#1C1334] mt-5 mb-3">
                    Thank you.<br />We&apos;ll be in <em className="not-italic text-[#6E3FCC]">touch.</em>
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    We&apos;ll reach out within one business day to schedule your call — at a time that&apos;s easy for you.
                  </p>
                  <div className="space-y-3 text-left mb-6">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#F8F5FC] text-[#6E3FCC] flex items-center justify-center text-xs font-bold shrink-0">1</span>
                      <span className="text-sm text-gray-600">
                        You&apos;ll get a short note from <strong className="text-[#1C1334]">Reed Pickering</strong> at Campfire.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#F8F5FC] text-[#6E3FCC] flex items-center justify-center text-xs font-bold shrink-0">2</span>
                      <span className="text-sm text-gray-600">Pick a 30-minute slot that works for you.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#F8F5FC] text-[#6E3FCC] flex items-center justify-center text-xs font-bold shrink-0">3</span>
                      <span className="text-sm text-gray-600">Walk away with a specific plan — or don&apos;t. No pressure.</span>
                    </div>
                  </div>
                  <button
                    onClick={onReset}
                    className="text-sm font-medium text-[#6E3FCC] hover:text-[#5a2fb3] transition-colors"
                  >
                    &larr; Back to the page
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="flex-1">
                <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-4">
                  Book a conversation
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-white mb-5">
                  See what coordinated <em className="not-italic text-[#E055CB]">execution looks like</em> in your org.
                </h2>
                <p className="text-lg text-white/60 leading-relaxed mb-8">
                  A short, specific call. You share the priority you&apos;re carrying and the drift you&apos;re seeing; we share which system fits, what it looks like, and what it costs. You leave with a real recommendation — not a follow-up sequence.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED] mt-2 shrink-0" />
                    <p className="text-white/70">
                      <strong className="text-white/90">30 minutes, no pitch.</strong> We listen first. You&apos;ll know in the first ten minutes whether this is the right fit.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED] mt-2 shrink-0" />
                    <p className="text-white/70">
                      <strong className="text-white/90">Tailored plan in a week.</strong> Which system, what scope, fixed fee, named team. Or a clear &ldquo;not now.&rdquo;
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED] mt-2 shrink-0" />
                    <p className="text-white/70">
                      <strong className="text-white/90">Quiet by default.</strong> What you share stays between us. No marketing, no surprise emails.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
                <div className="bg-white rounded-2xl p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#1C1334] mb-1">
                      Book a 30-minute conversation
                    </h3>
                    <p className="text-sm text-gray-500">
                      Five quick fields. We&apos;ll be back to you within one business day.
                    </p>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onSubmit();
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="r-name" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                          Name <span className="text-[#E055CB]">*</span>
                        </label>
                        <input
                          id="r-name"
                          value={form.name}
                          onChange={set("name")}
                          placeholder="Maya Ellsworth"
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-colors focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC]/20 ${
                            errors.name ? "border-red-400" : "border-gray-200"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="r-email" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                          Work email <span className="text-[#E055CB]">*</span>
                        </label>
                        <input
                          id="r-email"
                          type="email"
                          value={form.email}
                          onChange={set("email")}
                          placeholder="maya@yourcompany.com"
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-colors focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC]/20 ${
                            errors.email ? "border-red-400" : "border-gray-200"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="r-company" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                          Company
                        </label>
                        <input
                          id="r-company"
                          value={form.company}
                          onChange={set("company")}
                          placeholder="Halyard Health"
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none transition-colors focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC]/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="r-role" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                          Role
                        </label>
                        <input
                          id="r-role"
                          value={form.role}
                          onChange={set("role")}
                          placeholder="VP People &amp; Talent"
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none transition-colors focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC]/20"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="r-challenge" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                          Which challenge is most relevant right now?
                        </label>
                        <select
                          id="r-challenge"
                          value={form.challenge}
                          onChange={set("challenge")}
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none transition-colors focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC]/20 bg-white"
                        >
                          <option value="">Pick the one closest to your reality...</option>
                          <option value="drift">Strategy drift</option>
                          <option value="ai">AI adoption</option>
                          <option value="managers">Manager inconsistency</option>
                          <option value="xfn">Cross-functional friction</option>
                          <option value="fatigue">Change fatigue</option>
                          <option value="other">Something else (tell us below)</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="r-note" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                          Anything you&apos;d want us to know?{" "}
                          <span className="normal-case tracking-normal font-medium text-gray-400">(optional)</span>
                        </label>
                        <textarea
                          id="r-note"
                          value={form.note}
                          onChange={set("note")}
                          placeholder="One or two sentences is plenty."
                          rows={3}
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none transition-colors focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC]/20 resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-[#E055CB] hover:bg-[#d040b8] rounded-lg transition-colors disabled:opacity-60"
                      >
                        {formState === "submitting" ? "Sending..." : "Book the conversation"}
                        <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      We never share your details. You can opt out of follow-ups at any time.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
