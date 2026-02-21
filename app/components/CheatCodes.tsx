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

function campfireEmojis() {
  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed", inset: "0", pointerEvents: "none", zIndex: "99999", overflow: "hidden",
  });
  document.body.appendChild(container);
  for (let i = 0; i < 40; i++) {
    const emoji = document.createElement("div");
    const x = Math.random() * 100;
    const delay = Math.random() * 1.5;
    const duration = 2 + Math.random() * 2.5;
    const size = 20 + Math.random() * 20;
    emoji.textContent = "🏕️🔥"[Math.random() < 0.5 ? 0 : 1] === "🏕" ? "🏕️" : "🔥";
    Object.assign(emoji.style, {
      position: "absolute", bottom: "-40px", left: `${x}%`,
      fontSize: `${size}px`,
      animation: `ember-rise ${duration}s ${delay}s ease-out forwards`,
    });
    container.appendChild(emoji);
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
    action: campfireEmojis,
  },
  {
    sequence: ["6", "7"],
    action: rock67,
  },
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
