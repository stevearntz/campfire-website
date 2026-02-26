"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

const dances = [
  {
    name: "bounce-spin",
    keyframes: `@keyframes dc-bounce-spin {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-6px) rotate(15deg); }
      50% { transform: translateY(0) rotate(0deg); }
      75% { transform: translateY(-6px) rotate(-15deg); }
    }`,
    animation: "dc-bounce-spin 0.4s ease-in-out 4",
  },
  {
    name: "wiggle",
    keyframes: `@keyframes dc-wiggle {
      0%, 100% { transform: translateX(0) rotate(0deg); }
      20% { transform: translateX(-3px) rotate(-10deg); }
      40% { transform: translateX(3px) rotate(10deg); }
      60% { transform: translateX(-2px) rotate(-6deg); }
      80% { transform: translateX(2px) rotate(6deg); }
    }`,
    animation: "dc-wiggle 0.5s ease-in-out 3",
  },
  {
    name: "jump",
    keyframes: `@keyframes dc-jump {
      0%, 100% { transform: translateY(0) scaleY(1); }
      15% { transform: translateY(2px) scaleY(0.85) scaleX(1.1); }
      30% { transform: translateY(-10px) scaleY(1.1) scaleX(0.9); }
      50% { transform: translateY(0) scaleY(0.9) scaleX(1.05); }
      65% { transform: translateY(-5px) scaleY(1.05); }
      80% { transform: translateY(0) scaleY(0.95); }
    }`,
    animation: "dc-jump 0.6s ease-in-out 3",
  },
  {
    name: "spin",
    keyframes: `@keyframes dc-spin {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.1); }
      100% { transform: rotate(360deg) scale(1); }
    }`,
    animation: "dc-spin 0.6s ease-in-out 2",
  },
  {
    name: "jelly",
    keyframes: `@keyframes dc-jelly {
      0%, 100% { transform: scaleX(1) scaleY(1); }
      15% { transform: scaleX(1.15) scaleY(0.85); }
      30% { transform: scaleX(0.9) scaleY(1.1); }
      45% { transform: scaleX(1.08) scaleY(0.92); }
      60% { transform: scaleX(0.95) scaleY(1.05); }
      75% { transform: scaleX(1.03) scaleY(0.97); }
    }`,
    animation: "dc-jelly 0.7s ease-in-out 2",
  },
];

export default function DancingCarlos() {
  const [dancing, setDancing] = useState(false);
  const [currentDance, setCurrentDance] = useState("");
  const [injected, setInjected] = useState(false);

  const injectKeyframes = useCallback(() => {
    if (injected) return;
    const style = document.createElement("style");
    style.id = "dc-dance-keyframes";
    style.textContent = dances.map((d) => d.keyframes).join("\n");
    document.head.appendChild(style);
    setInjected(true);
  }, [injected]);

  const handleClick = useCallback(() => {
    if (dancing) return;
    injectKeyframes();
    const dance = dances[Math.floor(Math.random() * dances.length)];
    setCurrentDance(dance.animation);
    setDancing(true);
    const duration = parseFloat(dance.animation.match(/[\d.]+s/)?.[0] ?? "1") * 1000;
    const iterations = parseInt(dance.animation.match(/(\d+)$/)?.[1] ?? "3");
    setTimeout(() => {
      setDancing(false);
      setCurrentDance("");
    }, duration * iterations + 100);
  }, [dancing, injectKeyframes]);

  return (
    <div
      className="aspect-square rounded-xl overflow-hidden mb-3 bg-gradient-to-b from-[#E8E0F4] to-[#D4C8E8] flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <div
        style={{ animation: dancing ? currentDance : "none" }}
      >
        <Image
          src="/marsha.webp"
          alt="Carlos Feliciano-Barba"
          width={400}
          height={400}
          className="w-3/5 h-auto drop-shadow-md mx-auto"
        />
      </div>
    </div>
  );
}
