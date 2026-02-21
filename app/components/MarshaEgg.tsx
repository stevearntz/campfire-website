"use client";

import Image from "next/image";
import { useRef } from "react";

function spawnMarsha(yTop: number, yBottom: number) {
  // Inject bounce keyframe once
  if (!document.getElementById("marsha-keyframes")) {
    const s = document.createElement("style");
    s.id = "marsha-keyframes";
    s.textContent = `
      @keyframes marsha-bounce {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-16px) rotate(8deg); }
        50% { transform: translateY(0) rotate(0deg); }
        75% { transform: translateY(-16px) rotate(-8deg); }
      }
    `;
    document.head.appendChild(s);
  }

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "49",
    overflow: "hidden",
  });
  document.body.appendChild(container);

  const count = 3 + Math.floor(Math.random() * 3); // 3-5 Marshas
  const vw = window.innerWidth;
  const gap = yBottom - yTop;

  for (let i = 0; i < count; i++) {
    const marshaSize = 40 + Math.random() * 25;
    const goingRight = Math.random() < 0.5;
    const dur = 6 + Math.random() * 4;
    const delay = i * 0.6 + Math.random() * 0.4;
    const verticalPos = Math.max(0, Math.random() * (gap - marshaSize));
    const bounceSpeed = 0.35 + Math.random() * 0.2;

    const startX = goingRight ? -marshaSize - 10 : vw + 10;
    const endX = goingRight ? vw + 10 : -marshaSize - 10;

    // Outer: horizontal travel
    const outer = document.createElement("div");
    Object.assign(outer.style, {
      position: "absolute",
      left: `${startX}px`,
      top: `${yTop + verticalPos}px`,
      transition: `left ${dur}s ease-in-out ${delay}s`,
      opacity: "0",
    });

    // Inner: bounce + wobble
    const inner = document.createElement("div");
    Object.assign(inner.style, {
      width: `${marshaSize}px`,
      height: `${marshaSize}px`,
      animation: `marsha-bounce ${bounceSpeed}s ease-in-out infinite`,
    });

    // Image
    const img = document.createElement("img");
    img.src = "/marsha.webp";
    img.alt = "Marsha the marshmallow";
    Object.assign(img.style, {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      transform: goingRight ? "none" : "scaleX(-1)",
    });

    inner.appendChild(img);
    outer.appendChild(inner);
    container.appendChild(outer);

    requestAnimationFrame(() => {
      outer.style.opacity = "1";
      outer.style.left = `${endX}px`;
    });
  }

  setTimeout(() => container.remove(), 10000);
}

export default function MarshaEgg() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // The section this image lives in
    const section = containerRef.current.closest("section");
    // ProductShowcase is the previous sibling section
    const prevSection = section?.previousElementSibling;
    const yTop = prevSection
      ? prevSection.getBoundingClientRect().bottom
      : rect.top - 100;
    const yBottom = rect.top;
    spawnMarsha(yTop, yBottom);
  };

  return (
    <div
      ref={containerRef}
      className="ml-auto w-[50%] max-w-[900px] cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src="/campfire.webp"
        alt="Campfire session with participants collaborating"
        width={800}
        height={600}
        className="w-full h-auto object-cover rounded-2xl"
      />
    </div>
  );
}
