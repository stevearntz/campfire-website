"use client";

import { useEffect, useRef } from "react";
import { spawnEmbers } from "@/app/lib/embers";

function showToast(text: string, color: string) {
  const toast = document.createElement("div");
  toast.textContent = text;
  Object.assign(toast.style, {
    position: "fixed",
    top: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "12px 24px",
    borderRadius: "8px",
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#fff",
    background: color,
    zIndex: "99999",
    opacity: "0",
    transition: "opacity 0.3s",
    pointerEvents: "none",
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = "1"; });
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

function godMode() {
  showToast("GOD MODE ACTIVATED", "#DAA520");
  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    background: "radial-gradient(circle, rgba(218,165,32,0.3) 0%, transparent 70%)",
    zIndex: "99998",
    pointerEvents: "none",
    opacity: "1",
    transition: "opacity 1.5s",
  });
  document.body.appendChild(overlay);
  setTimeout(() => { overlay.style.opacity = "0"; }, 100);
  setTimeout(() => overlay.remove(), 2000);
  spawnEmbers();
}

function barrelRoll() {
  showToast("DO A BARREL ROLL!", "#2563EB");
  document.documentElement.style.transition = "transform 2s ease-in-out";
  document.documentElement.style.transform = "rotate(360deg)";
  setTimeout(() => {
    document.documentElement.style.transition = "";
    document.documentElement.style.transform = "";
  }, 2100);
  spawnEmbers();
}

function bloodCode() {
  showToast("ABACABB — BLOOD CODE ENABLED", "#DC2626");
  const flash = document.createElement("div");
  Object.assign(flash.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(220, 38, 38, 0.4)",
    zIndex: "99998",
    pointerEvents: "none",
    opacity: "1",
    transition: "opacity 0.6s",
  });
  document.body.appendChild(flash);
  setTimeout(() => { flash.style.opacity = "0"; }, 50);
  setTimeout(() => flash.remove(), 800);
  spawnEmbers();
}

// — Love escalation state —
let loveCount = 0;
let loveTimer: ReturnType<typeof setTimeout> | null = null;

function loveEscalation() {
  loveCount++;
  if (loveTimer) clearTimeout(loveTimer);
  loveTimer = setTimeout(() => { loveCount = 0; }, 4000);

  if (loveCount >= 5) {
    heartFireworks();
    loveCount = 0;
    return;
  }

  // Hearts grow each repetition
  const sizeBase = [20, 30, 45, 60][loveCount - 1];
  const sizeRange = [20, 25, 30, 40][loveCount - 1];
  const count = [25, 35, 45, 55][loveCount - 1];

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed", inset: "0", pointerEvents: "none", zIndex: "99999", overflow: "hidden",
  });
  document.body.appendChild(container);
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    const x = Math.random() * 100;
    const delay = Math.random() * 1.5;
    const duration = 2 + Math.random() * 2.5;
    const size = sizeBase + Math.random() * sizeRange;
    el.textContent = "💜";
    Object.assign(el.style, {
      position: "absolute", bottom: "-40px", left: `${x}%`,
      fontSize: `${size}px`,
      animation: `ember-rise ${duration}s ${delay}s ease-out forwards`,
    });
    container.appendChild(el);
  }
  setTimeout(() => container.remove(), 6000);
  spawnEmbers();
}

function heartFireworks() {
  // Inject firework keyframes if not present
  if (!document.getElementById("heart-firework-keyframes")) {
    const style = document.createElement("style");
    style.id = "heart-firework-keyframes";
    style.textContent = `
      @keyframes heart-launch{
        0%{transform:translate(-50%,-50%) scale(0.2);opacity:1}
        70%{opacity:1}
        100%{transform:translate(var(--hx),var(--hy)) scale(1);opacity:1}
      }
      @keyframes heart-pop{
        0%{transform:scale(1);opacity:1}
        50%{transform:scale(1.8);opacity:1}
        100%{transform:scale(0);opacity:0}
      }
      @keyframes heart-scatter{
        0%{transform:translate(0,0) scale(1);opacity:1}
        80%{opacity:0.8}
        100%{transform:translate(var(--sx),var(--sy)) scale(0.3);opacity:0}
      }
      @keyframes heart-glow{
        0%{opacity:0;transform:translate(-50%,-50%) scale(0.5)}
        30%{opacity:0.6;transform:translate(-50%,-50%) scale(1.2)}
        100%{opacity:0;transform:translate(-50%,-50%) scale(2.5)}
      }
      @keyframes heart-flash{
        0%{opacity:0.7}
        100%{opacity:0}
      }
    `;
    document.head.appendChild(style);
  }

  // Big purple flash
  const flash = document.createElement("div");
  Object.assign(flash.style, {
    position: "fixed", inset: "0", zIndex: "99998", pointerEvents: "none",
    background: "radial-gradient(circle, rgba(110,63,204,0.6) 0%, rgba(157,136,237,0.3) 40%, transparent 70%)",
    animation: "heart-flash 1.2s ease-out forwards",
  });
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 1400);

  // Expanding glow ring
  const glow = document.createElement("div");
  Object.assign(glow.style, {
    position: "fixed", top: "50%", left: "50%",
    width: "400px", height: "400px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(110,63,204,0.7), rgba(157,136,237,0.3), transparent)",
    zIndex: "99999", pointerEvents: "none",
    animation: "heart-glow 1.5s ease-out forwards",
  });
  document.body.appendChild(glow);
  setTimeout(() => glow.remove(), 1800);

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed", inset: "0", pointerEvents: "none", zIndex: "99999", overflow: "hidden",
  });
  document.body.appendChild(container);

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  // Phase 1: Launch big hearts outward from center
  const shellCount = 24;
  for (let i = 0; i < shellCount; i++) {
    const angle = (Math.PI * 2 * i) / shellCount + (Math.random() - 0.5) * 0.3;
    const dist = 150 + Math.random() * 250;
    const hx = Math.cos(angle) * dist;
    const hy = Math.sin(angle) * dist;
    const size = 35 + Math.random() * 25;
    const launchDur = 0.5 + Math.random() * 0.3;
    const delay = Math.random() * 0.15;

    const el = document.createElement("div");
    el.textContent = "💜";
    Object.assign(el.style, {
      position: "absolute", top: "50%", left: "50%",
      fontSize: `${size}px`,
      "--hx": `${hx}px`, "--hy": `${hy}px`,
      animation: `heart-launch ${launchDur}s ${delay}s ease-out forwards`,
      opacity: "0",
    } as Record<string, string>);
    container.appendChild(el);

    // Phase 2: Each big heart pops and shatters into smaller hearts
    const popTime = (launchDur + delay) * 1000;
    setTimeout(() => {
      // Pop animation on the shell heart
      el.style.animation = "none";
      const landed = el.getBoundingClientRect();
      const lx = landed.left + landed.width / 2;
      const ly = landed.top + landed.height / 2;
      el.style.position = "fixed";
      el.style.left = `${lx}px`;
      el.style.top = `${ly}px`;
      el.style.transform = "translate(-50%,-50%)";
      el.style.animation = `heart-pop 0.3s ease-out forwards`;

      // Spawn child hearts scattering from this position
      const children = 6 + Math.floor(Math.random() * 5);
      for (let j = 0; j < children; j++) {
        const child = document.createElement("div");
        const cAngle = Math.random() * Math.PI * 2;
        const cDist = 60 + Math.random() * 140;
        const sx = Math.cos(cAngle) * cDist;
        const sy = Math.sin(cAngle) * cDist;
        const cSize = 10 + Math.random() * 18;
        const cDur = 0.6 + Math.random() * 0.8;
        const cDelay = Math.random() * 0.15;
        child.textContent = "💜";
        Object.assign(child.style, {
          position: "fixed", left: `${lx}px`, top: `${ly}px`,
          fontSize: `${cSize}px`,
          transform: "translate(-50%,-50%)",
          "--sx": `${sx}px`, "--sy": `${sy}px`,
          animation: `heart-scatter ${cDur}s ${cDelay}s ease-out forwards`,
        } as Record<string, string>);
        container.appendChild(child);
      }
    }, popTime);
  }

  // Phase 3: Delayed second ring — bigger, further, also shatters
  setTimeout(() => {
    const ring2 = 16;
    for (let i = 0; i < ring2; i++) {
      const angle = (Math.PI * 2 * i) / ring2 + Math.PI / ring2;
      const dist = 250 + Math.random() * 300;
      const hx = Math.cos(angle) * dist;
      const hy = Math.sin(angle) * dist;
      const size = 28 + Math.random() * 20;
      const launchDur = 0.6 + Math.random() * 0.3;

      const el = document.createElement("div");
      el.textContent = "💜";
      Object.assign(el.style, {
        position: "absolute", top: "50%", left: "50%",
        fontSize: `${size}px`,
        "--hx": `${hx}px`, "--hy": `${hy}px`,
        animation: `heart-launch ${launchDur}s ease-out forwards`,
        opacity: "0",
      } as Record<string, string>);
      container.appendChild(el);

      setTimeout(() => {
        el.style.animation = "none";
        const landed = el.getBoundingClientRect();
        const lx = landed.left + landed.width / 2;
        const ly = landed.top + landed.height / 2;
        el.style.position = "fixed";
        el.style.left = `${lx}px`;
        el.style.top = `${ly}px`;
        el.style.transform = "translate(-50%,-50%)";
        el.style.animation = `heart-pop 0.25s ease-out forwards`;

        const children = 4 + Math.floor(Math.random() * 4);
        for (let j = 0; j < children; j++) {
          const child = document.createElement("div");
          const cAngle = Math.random() * Math.PI * 2;
          const cDist = 40 + Math.random() * 100;
          const child_sx = Math.cos(cAngle) * cDist;
          const child_sy = Math.sin(cAngle) * cDist;
          const cSize = 8 + Math.random() * 14;
          const cDur = 0.5 + Math.random() * 0.7;
          child.textContent = "💜";
          Object.assign(child.style, {
            position: "fixed", left: `${lx}px`, top: `${ly}px`,
            fontSize: `${cSize}px`,
            transform: "translate(-50%,-50%)",
            "--sx": `${child_sx}px`, "--sy": `${child_sy}px`,
            animation: `heart-scatter ${cDur}s ease-out forwards`,
          } as Record<string, string>);
          container.appendChild(child);
        }
      }, launchDur * 1000);
    }
  }, 300);

  setTimeout(() => container.remove(), 5000);
  spawnEmbers();
}

function floatEmojis(emojis: string | string[], count = 30) {
  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed", inset: "0", pointerEvents: "none", zIndex: "99999", overflow: "hidden",
  });
  document.body.appendChild(container);
  const emojiList = Array.isArray(emojis) ? emojis : [emojis];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    const x = Math.random() * 100;
    const delay = Math.random() * 1.5;
    const duration = 2 + Math.random() * 2.5;
    const size = 20 + Math.random() * 20;
    el.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
    Object.assign(el.style, {
      position: "absolute", bottom: "-40px", left: `${x}%`,
      fontSize: `${size}px`,
      animation: `ember-rise ${duration}s ${delay}s ease-out forwards`,
    });
    container.appendChild(el);
  }
  setTimeout(() => container.remove(), 6000);
  spawnEmbers();
}

function rock67() {
  const rocks = 6 + Math.round(Math.random()); // 6 or 7
  const el = document.documentElement;
  el.style.transformOrigin = "50% 50vh";
  el.style.transition = "transform 0.35s ease-in-out";
  let i = 0;
  const dirs = [1, -1];
  function sway() {
    if (i >= rocks) {
      el.style.transform = "";
      setTimeout(() => { el.style.transition = ""; el.style.transformOrigin = ""; }, 400);
      return;
    }
    el.style.transform = `rotate(${dirs[i % 2] * 1.2}deg)`;
    i++;
    setTimeout(sway, 350);
  }
  sway();
}

function noClip() {
  showToast("NOCLIP — CLIPPING DISABLED", "#8B5CF6");
  const main = document.querySelector("main");
  if (main) {
    main.style.transition = "transform 2s ease-in-out, opacity 2s ease-in-out";
    main.style.transform = "translateY(-40px)";
    main.style.opacity = "0.4";
    setTimeout(() => {
      main.style.transform = "";
      main.style.opacity = "";
      setTimeout(() => { main.style.transition = ""; }, 500);
    }, 2000);
  }
  spawnEmbers();
}

type Cheat = {
  sequence: string[];
  action: () => void;
};

const CHEATS: Cheat[] = [
  {
    sequence: ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"],
    action: () => spawnEmbers(),
  },
  {
    sequence: ["i", "d", "d", "q", "d"],
    action: godMode,
  },
  {
    sequence: ["b", "a", "r", "r", "e", "l"],
    action: barrelRoll,
  },
  {
    sequence: ["a", "b", "a", "c", "a", "b", "b"],
    action: bloodCode,
  },
  {
    sequence: ["n", "o", "c", "l", "i", "p"],
    action: noClip,
  },
  {
    sequence: ["c", "a", "m", "p", "f", "i", "r", "e"],
    action: () => floatEmojis(["🏕️", "🔥"], 40),
  },
  {
    sequence: ["6", "7"],
    action: rock67,
  },
  // Emoji triggers — one word per Campfire platform emoji
  { sequence: ["t", "h", "i", "n", "k"], action: () => floatEmojis("🤔") },
  { sequence: ["l", "o", "l"], action: () => floatEmojis("😂") },
  { sequence: ["s", "m", "i", "l", "e"], action: () => floatEmojis("😄") },
  { sequence: ["w", "o", "w"], action: () => floatEmojis("🤩") },
  { sequence: ["y", "i", "k", "e", "s"], action: () => floatEmojis("😬") },
  { sequence: ["c", "r", "y"], action: () => floatEmojis("😭") },
  { sequence: ["f", "l", "e", "x"], action: () => floatEmojis("💪") },
  { sequence: ["y", "e", "s"], action: () => floatEmojis("👍") },
  { sequence: ["n", "o", "p", "e"], action: () => floatEmojis("👎") },
  { sequence: ["b", "r", "a", "v", "o"], action: () => floatEmojis("👏") },
  { sequence: ["l", "u", "c", "k"], action: () => floatEmojis("🤞") },
  { sequence: ["t", "h", "a", "n", "k", "s"], action: () => floatEmojis("🙏") },
  { sequence: ["h", "o", "o", "r", "a", "y"], action: () => floatEmojis("🙌") },
  { sequence: ["l", "o", "v", "e"], action: loveEscalation },
  { sequence: ["p", "a", "r", "t", "y"], action: () => floatEmojis("🎉") },
  { sequence: ["h", "u", "n", "d", "r", "e", "d"], action: () => floatEmojis("💯") },
  { sequence: ["f", "i", "r", "e"], action: () => floatEmojis("🔥") },
  { sequence: ["a", "l", "a", "r", "m"], action: () => floatEmojis("⏰") },
  { sequence: ["i", "d", "e", "a"], action: () => floatEmojis("💡") },
  { sequence: ["l", "a", "u", "n", "c", "h"], action: () => floatEmojis("🚀") },
];

export default function CheatCodes() {
  const positions = useRef<number[]>(CHEATS.map(() => 0));

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const key = e.key;

      for (let i = 0; i < CHEATS.length; i++) {
        const cheat = CHEATS[i];
        const pos = positions.current[i];

        if (key === cheat.sequence[pos]) {
          positions.current[i] = pos + 1;
          if (positions.current[i] === cheat.sequence.length) {
            cheat.action();
            positions.current[i] = 0;
          }
        } else {
          positions.current[i] = key === cheat.sequence[0] ? 1 : 0;
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
