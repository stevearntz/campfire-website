"use client";

import { useCallback, useRef } from "react";

function spawnVine() {
  // Inject keyframes once
  if (!document.getElementById("vine-keyframes")) {
    const s = document.createElement("style");
    s.id = "vine-keyframes";
    s.textContent = `
      @keyframes vine-grow {
        0% { clip-path: inset(100% 0 0 0); }
        100% { clip-path: inset(0 0 0 0); }
      }
      @keyframes vine-leaf-pop {
        0% { transform: scale(0) rotate(-20deg); opacity: 0; }
        60% { transform: scale(1.15) rotate(5deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
    `;
    document.head.appendChild(s);
  }

  // Ensure a persistent container exists
  let container = document.getElementById("vine-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "vine-container";
    Object.assign(container.style, {
      position: "fixed",
      bottom: "0",
      left: "0",
      right: "0",
      height: "100vh",
      pointerEvents: "none",
      zIndex: "48",
      overflow: "hidden",
    });
    document.body.appendChild(container);
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const x = 40 + Math.random() * (vw - 80);
  const vineHeight = vh * (0.3 + Math.random() * 0.45);
  const growDuration = 2 + Math.random() * 1.5;
  const swayDir = Math.random() < 0.5 ? 1 : -1;
  const curvature = 15 + Math.random() * 25;

  // Build SVG vine
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "120");
  svg.setAttribute("height", String(Math.ceil(vineHeight + 40)));
  Object.assign(svg.style, {
    position: "absolute",
    bottom: "0",
    left: `${x - 60}px`,
    animation: `vine-grow ${growDuration}s ease-out forwards`,
  });

  // Stem path — gentle S-curve
  const midY = vineHeight / 2;
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const d = `M60,${vineHeight + 20} C${60 + swayDir * curvature},${midY + vineHeight * 0.15} ${60 - swayDir * curvature},${midY - vineHeight * 0.15} 60,20`;
  path.setAttribute("d", d);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", `hsl(${125 + Math.random() * 20}, ${55 + Math.random() * 15}%, ${30 + Math.random() * 15}%)`);
  path.setAttribute("stroke-width", String(2.5 + Math.random() * 1.5));
  path.setAttribute("stroke-linecap", "round");
  svg.appendChild(path);

  // Leaves along the stem
  const leafCount = 3 + Math.floor(Math.random() * 4);
  for (let li = 0; li < leafCount; li++) {
    const t = 0.15 + (li / leafCount) * 0.7;
    const ly = vineHeight + 20 - t * vineHeight;
    const leafSide = ((li % 2 === 0 ? 1 : -1) * swayDir);
    // Approximate x position along the curve
    const bezX = 60 + swayDir * curvature * Math.sin(t * Math.PI) * (t < 0.5 ? 1 : -1) * 0.5;
    const lx = bezX + leafSide * (8 + Math.random() * 6);

    const leaf = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    leaf.setAttribute("cx", String(lx));
    leaf.setAttribute("cy", String(ly));
    leaf.setAttribute("rx", String(5 + Math.random() * 4));
    leaf.setAttribute("ry", String(3 + Math.random() * 2));
    leaf.setAttribute("fill", `hsl(${120 + Math.random() * 25}, ${50 + Math.random() * 20}%, ${35 + Math.random() * 20}%)`);
    leaf.setAttribute("transform", `rotate(${leafSide * (20 + Math.random() * 30)}, ${lx}, ${ly})`);
    leaf.style.animation = `vine-leaf-pop 0.4s ease-out ${growDuration * t + 0.3}s both`;
    svg.appendChild(leaf);
  }

  // Small flower/bud at the top
  const bud = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  bud.setAttribute("cx", "60");
  bud.setAttribute("cy", "18");
  bud.setAttribute("r", String(3 + Math.random() * 2));
  bud.setAttribute("fill", `hsl(${[330, 45, 280, 15, 200][Math.floor(Math.random() * 5)]}, 65%, 60%)`);
  bud.style.animation = `vine-leaf-pop 0.5s ease-out ${growDuration + 0.2}s both`;
  svg.appendChild(bud);

  container.appendChild(svg);

  // Fade out after a while
  setTimeout(() => {
    svg.style.transition = "opacity 2s ease-out";
    svg.style.opacity = "0";
    setTimeout(() => svg.remove(), 2000);
  }, 12000);
}

export default function GrowingVines({ children }: { children: React.ReactNode }) {
  const lastClick = useRef(0);

  const handleClick = useCallback(() => {
    // Debounce rapid clicks
    const now = Date.now();
    if (now - lastClick.current < 200) return;
    lastClick.current = now;
    spawnVine();
  }, []);

  return (
    <span
      onClick={handleClick}
      className="cursor-pointer"
      style={{ color: "#6E3FCC" }}
    >
      {children}
    </span>
  );
}
