"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

const dances = [
  // 1: Bounce & spin
  {
    name: "bounce-spin",
    keyframes: `@keyframes mm-bounce-spin {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-6px) rotate(15deg); }
      50% { transform: translateY(0) rotate(0deg); }
      75% { transform: translateY(-6px) rotate(-15deg); }
    }`,
    animation: "mm-bounce-spin 0.4s ease-in-out 4",
  },
  // 2: Wiggle side to side
  {
    name: "wiggle",
    keyframes: `@keyframes mm-wiggle {
      0%, 100% { transform: translateX(0) rotate(0deg); }
      20% { transform: translateX(-3px) rotate(-10deg); }
      40% { transform: translateX(3px) rotate(10deg); }
      60% { transform: translateX(-2px) rotate(-6deg); }
      80% { transform: translateX(2px) rotate(6deg); }
    }`,
    animation: "mm-wiggle 0.5s ease-in-out 3",
  },
  // 3: Jump up excitedly
  {
    name: "jump",
    keyframes: `@keyframes mm-jump {
      0%, 100% { transform: translateY(0) scaleY(1); }
      15% { transform: translateY(2px) scaleY(0.85) scaleX(1.1); }
      30% { transform: translateY(-10px) scaleY(1.1) scaleX(0.9); }
      50% { transform: translateY(0) scaleY(0.9) scaleX(1.05); }
      65% { transform: translateY(-5px) scaleY(1.05); }
      80% { transform: translateY(0) scaleY(0.95); }
    }`,
    animation: "mm-jump 0.6s ease-in-out 3",
  },
  // 4: Spin in place
  {
    name: "spin",
    keyframes: `@keyframes mm-spin {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.1); }
      100% { transform: rotate(360deg) scale(1); }
    }`,
    animation: "mm-spin 0.6s ease-in-out 2",
  },
  // 5: Jelly wobble
  {
    name: "jelly",
    keyframes: `@keyframes mm-jelly {
      0%, 100% { transform: scaleX(1) scaleY(1); }
      15% { transform: scaleX(1.15) scaleY(0.85); }
      30% { transform: scaleX(0.9) scaleY(1.1); }
      45% { transform: scaleX(1.08) scaleY(0.92); }
      60% { transform: scaleX(0.95) scaleY(1.05); }
      75% { transform: scaleX(1.03) scaleY(0.97); }
    }`,
    animation: "mm-jelly 0.7s ease-in-out 2",
  },
];

export default function DancingMarshmallows() {
  const [dancing, setDancing] = useState<Set<number>>(new Set());
  const [injected, setInjected] = useState(false);

  const injectKeyframes = useCallback(() => {
    if (injected) return;
    const style = document.createElement("style");
    style.id = "mm-dance-keyframes";
    style.textContent = dances.map((d) => d.keyframes).join("\n");
    document.head.appendChild(style);
    setInjected(true);
  }, [injected]);

  const handleClick = useCallback(
    (i: number) => {
      if (dancing.has(i)) return;
      injectKeyframes();
      setDancing((prev) => new Set(prev).add(i));
      // Remove after animation completes
      const duration = parseFloat(dances[i].animation.match(/[\d.]+s/)?.[0] ?? "1") * 1000;
      const iterations = parseInt(dances[i].animation.match(/(\d+)$/)?.[1] ?? "3");
      setTimeout(() => {
        setDancing((prev) => {
          const next = new Set(prev);
          next.delete(i);
          return next;
        });
      }, duration * iterations + 100);
    },
    [dancing, injectKeyframes]
  );

  return (
    <div className="mt-8 flex justify-center">
      {dances.map((dance, i) => (
        <div
          key={i}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/40 bg-[#FFF5ED]/30 backdrop-blur-sm overflow-hidden cursor-pointer"
          style={{ marginLeft: i > 0 ? "-8px" : "0" }}
          onClick={() => handleClick(i)}
        >
          <div
            className="flex items-end justify-center w-full h-full"
            style={{
              animation: dancing.has(i) ? dance.animation : "none",
            }}
          >
            <Image
              src="/marsha.webp"
              alt=""
              width={80}
              height={80}
              className="opacity-80 mb-[2px]"
              style={{ width: "65%", height: "auto" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
