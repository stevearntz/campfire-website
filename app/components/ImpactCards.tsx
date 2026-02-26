"use client";

import { useCallback, useRef } from "react";

/* ───────── 1. Clock — Time Rewind ─────────
   Page rapidly scrolls to the top and back, like rewinding a tape */
function triggerRewind() {
  const startY = window.scrollY;
  if (startY < 50) return; // nothing to rewind
  const duration = 600;
  const start = performance.now();

  function tick(now: number) {
    const t = Math.min((now - start) / duration, 1);
    // Ease: fast up, pause, fast back
    let scroll: number;
    if (t < 0.45) {
      // Scroll up (ease-out)
      const p = t / 0.45;
      scroll = startY * (1 - p * p);
    } else if (t < 0.55) {
      scroll = 0;
    } else {
      // Scroll back down (ease-in)
      const p = (t - 0.55) / 0.45;
      scroll = startY * p * p;
    }
    window.scrollTo(0, scroll);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ───────── 2. Arrows — Elastic Stretch ─────────
   The whole page stretches outward like an elastic band, then snaps back */
function triggerElasticStretch() {
  const id = "elastic-stretch-keyframes";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes elastic-snap {
        0% { transform: scale(1); }
        20% { transform: scale(1.06, 1.12); }
        35% { transform: scale(1.12, 1.06); }
        50% { transform: scale(1.08, 1.10); }
        60% { transform: scale(0.97, 0.95); }
        72% { transform: scale(1.03, 1.02); }
        84% { transform: scale(0.99, 1.01); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(s);
  }
  const html = document.documentElement;
  html.style.overflow = "hidden";
  html.style.transformOrigin = "center center";
  html.style.animation = "elastic-snap 1s cubic-bezier(0.22, 1, 0.36, 1) forwards";
  html.addEventListener(
    "animationend",
    () => {
      html.style.animation = "";
      html.style.overflow = "";
      html.style.transformOrigin = "";
    },
    { once: true }
  );
}

/* ───────── 3. Rocket — Icon Launch ─────────
   A rocket flies up from the card with a particle trail */
function triggerRocketLaunch(cardEl: HTMLElement) {
  const id = "rocket-launch-keyframes";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes rocket-fly {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        60% { transform: translateY(-90vh) scale(1.3); opacity: 1; }
        100% { transform: translateY(-110vh) scale(0.5); opacity: 0; }
      }
      @keyframes rocket-particle {
        0% { transform: translateY(0) scale(1); opacity: 0.8; }
        100% { transform: translateY(40px) scale(0); opacity: 0; }
      }
    `;
    document.head.appendChild(s);
  }

  const rect = cardEl.getBoundingClientRect();
  const rocketX = rect.left + 24;
  const rocketY = rect.top + 12;

  // Flying rocket emoji
  const rocket = document.createElement("div");
  Object.assign(rocket.style, {
    position: "fixed",
    left: `${rocketX}px`,
    top: `${rocketY}px`,
    fontSize: "28px",
    zIndex: "999",
    pointerEvents: "none",
    animation: "rocket-fly 1.2s ease-in forwards",
  });
  rocket.textContent = "🚀";
  document.body.appendChild(rocket);

  // Particle trail
  let count = 0;
  const interval = setInterval(() => {
    if (count++ > 15) {
      clearInterval(interval);
      return;
    }
    const p = document.createElement("div");
    const rRect = rocket.getBoundingClientRect();
    Object.assign(p.style, {
      position: "fixed",
      left: `${rRect.left + 6 + (Math.random() - 0.5) * 12}px`,
      top: `${rRect.bottom}px`,
      width: `${4 + Math.random() * 6}px`,
      height: `${4 + Math.random() * 6}px`,
      borderRadius: "50%",
      background: `hsl(${20 + Math.random() * 30}, 90%, ${55 + Math.random() * 20}%)`,
      pointerEvents: "none",
      zIndex: "998",
      animation: `rocket-particle ${0.4 + Math.random() * 0.3}s ease-out forwards`,
    });
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }, 60);

  setTimeout(() => rocket.remove(), 1400);
}

/* ───────── 4. Chat Bubbles — Office Phrases ─────────
   Speech bubbles with funny workplace phrases float up */
function triggerChatBubbles() {
  const phrases = [
    "Let's circle back on that...",
    "Per my last email...",
    "Can I give you some feedback?",
    "We need to talk.",
    "Great question!",
    "Let's take this offline.",
    "I have a quick question...",
    "Just to piggyback on that...",
    "Can everyone see my screen?",
    "You're on mute.",
    "Let's put a pin in that.",
    "Synergy!",
  ];

  const id = "chat-bubble-keyframes";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes bubble-float {
        0% { transform: translateY(0) scale(0.5); opacity: 0; }
        15% { transform: translateY(-20px) scale(1); opacity: 1; }
        85% { opacity: 1; }
        100% { transform: translateY(-180px) scale(0.9); opacity: 0; }
      }
    `;
    document.head.appendChild(s);
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const count = 5 + Math.floor(Math.random() * 3);
  const used = new Set<number>();

  for (let i = 0; i < count; i++) {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * phrases.length);
    } while (used.has(idx) && used.size < phrases.length);
    used.add(idx);

    const bubble = document.createElement("div");
    Object.assign(bubble.style, {
      position: "fixed",
      left: `${60 + Math.random() * (vw - 280)}px`,
      top: `${100 + Math.random() * (vh - 250)}px`,
      background: "white",
      color: "#374151",
      fontSize: "14px",
      fontWeight: "500",
      padding: "10px 16px",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      zIndex: "999",
      pointerEvents: "none",
      whiteSpace: "nowrap",
      animation: `bubble-float ${2.5 + Math.random()}s ease-out ${i * 0.3}s both`,
    });
    bubble.textContent = phrases[idx];
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), (2.5 + 1 + i * 0.3) * 1000 + 500);
  }
}

/* ───────── 5. Lightning — Flash + Shake ─────────
   Screen flashes bright white with a shake effect like thunder */
function triggerLightning() {
  const id = "lightning-keyframes";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes lightning-shake {
        0%, 100% { transform: translate(0, 0); }
        10% { transform: translate(-3px, 1px); }
        20% { transform: translate(3px, -2px); }
        30% { transform: translate(-2px, 3px); }
        40% { transform: translate(2px, -1px); }
        50% { transform: translate(-1px, 2px); }
        60% { transform: translate(3px, 0px); }
        70% { transform: translate(-2px, -1px); }
        80% { transform: translate(1px, 2px); }
        90% { transform: translate(-1px, -2px); }
      }
    `;
    document.head.appendChild(s);
  }

  // Flash overlay
  const flash = document.createElement("div");
  Object.assign(flash.style, {
    position: "fixed",
    inset: "0",
    background: "white",
    zIndex: "9999",
    pointerEvents: "none",
    opacity: "0.9",
    transition: "opacity 0.15s ease-out",
  });
  document.body.appendChild(flash);

  // Second flash
  setTimeout(() => {
    flash.style.opacity = "0";
    setTimeout(() => {
      flash.style.opacity = "0.6";
      setTimeout(() => {
        flash.style.opacity = "0";
        setTimeout(() => flash.remove(), 300);
      }, 80);
    }, 100);
  }, 80);

  // Shake the body
  document.body.style.animation = "lightning-shake 0.4s ease-in-out";
  document.body.addEventListener(
    "animationend",
    () => {
      document.body.style.animation = "";
    },
    { once: true }
  );

  // Lightning bolt SVG
  const bolt = document.createElement("div");
  const vw = window.innerWidth;
  const x = vw * 0.3 + Math.random() * vw * 0.4;
  Object.assign(bolt.style, {
    position: "fixed",
    top: "0",
    left: `${x - 30}px`,
    width: "60px",
    height: "50vh",
    zIndex: "9998",
    pointerEvents: "none",
    opacity: "1",
    transition: "opacity 0.5s ease-out",
  });
  bolt.innerHTML = `<svg viewBox="0 0 60 400" fill="none" style="width:100%;height:100%">
    <path d="M30 0 L22 140 L38 150 L18 400 L32 200 L20 190 L35 60 Z" fill="rgba(110,63,204,0.6)" />
    <path d="M30 0 L24 130 L36 140 L22 400 L34 210 L22 200 L33 70 Z" fill="rgba(255,255,255,0.8)" />
  </svg>`;
  document.body.appendChild(bolt);
  setTimeout(() => {
    bolt.style.opacity = "0";
    setTimeout(() => bolt.remove(), 600);
  }, 300);
}

/* ───────── 6. Chart — Zen Confetti ─────────
   Gentle confetti of tiny check marks and sparkles — celebrating
   performance without the burnout (calm, not chaotic) */
function triggerZenConfetti() {
  const id = "zen-confetti-keyframes";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes zen-fall {
        0% { transform: translateY(-20px) rotate(0deg) scale(0); opacity: 0; }
        10% { transform: translateY(0) rotate(10deg) scale(1); opacity: 1; }
        90% { opacity: 0.8; }
        100% { transform: translateY(85vh) rotate(180deg) scale(0.6); opacity: 0; }
      }
    `;
    document.head.appendChild(s);
  }

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "998",
    overflow: "hidden",
  });
  document.body.appendChild(container);

  const pieces = ["✓", "✦", "·", "♦", "○"];
  const colors = ["#6E3FCC", "#9D88ED", "#EE81DD", "#4CAF50", "#FFB74D"];
  const vw = window.innerWidth;
  const count = 30;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    Object.assign(piece.style, {
      position: "absolute",
      left: `${Math.random() * vw}px`,
      top: "0",
      fontSize: `${10 + Math.random() * 14}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      pointerEvents: "none",
      animation: `zen-fall ${3 + Math.random() * 2}s ease-in-out ${i * 0.12}s both`,
    });
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    container.appendChild(piece);
  }

  setTimeout(() => container.remove(), 8000);
}

/* ───────── Card data ───────── */
const impacts = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Talent teams save time and reduce administrative burden",
    trigger: () => {},
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
    text: "Programs scale without adding headcount",
    trigger: () => {},
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    text: "Managers show up with greater clarity and confidence",
    trigger: (el: HTMLElement) => triggerRocketLaunch(el),
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    text: "Difficult conversations happen earlier and more effectively",
    trigger: () => triggerChatBubbles(),
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    text: "Teams align around goals and accountability",
    trigger: () => {},
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    text: "Performance improves without burning people out",
    trigger: () => triggerZenConfetti(),
  },
];

export default function ImpactCards() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cooldowns = useRef<Set<number>>(new Set());

  const handleClick = useCallback((i: number) => {
    if (cooldowns.current.has(i)) return;
    cooldowns.current.add(i);
    impacts[i].trigger(cardRefs.current[i]!);
    // Cooldown to prevent spam
    setTimeout(() => cooldowns.current.delete(i), 2000);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
      {impacts.map((item, i) => (
        <div
          key={item.text}
          ref={(el) => { cardRefs.current[i] = el; }}
          onClick={() => handleClick(i)}
          className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 cursor-pointer hover:shadow-md transition-shadow select-none"
        >
          <div className="text-[#6E3FCC] shrink-0 mt-0.5">
            {item.icon}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}
