"use client";

import Image from "next/image";

function generateBoltPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  segments: number
): string {
  const points: [number, number][] = [[startX, startY]];
  const dx = (endX - startX) / segments;
  const dy = (endY - startY) / segments;

  for (let i = 1; i < segments; i++) {
    const jitterX = (Math.random() - 0.5) * 120;
    const jitterY = (Math.random() - 0.5) * 30;
    points.push([startX + dx * i + jitterX, startY + dy * i + jitterY]);
  }
  points.push([endX, endY]);

  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
}

function strikeLightning() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "49",
  });
  document.body.appendChild(container);

  // White flash
  const flash = document.createElement("div");
  Object.assign(flash.style, {
    position: "absolute",
    inset: "0",
    background: "rgba(255,255,255,0.3)",
    opacity: "1",
    transition: "opacity 0.4s ease-out",
  });
  container.appendChild(flash);
  setTimeout(() => { flash.style.opacity = "0"; }, 80);

  // Lightning bolt SVG
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", `${vw}`);
  svg.setAttribute("height", `${vh}`);
  svg.style.position = "absolute";
  svg.style.inset = "0";

  const startX = vw * 0.55;
  const startY = 0;
  const endX = vw * 0.15;
  const endY = vh * 0.85;

  // Main bolt
  const mainPath = generateBoltPath(startX, startY, endX, endY, 8);

  // Glow layer
  const glow = document.createElementNS("http://www.w3.org/2000/svg", "path");
  glow.setAttribute("d", mainPath);
  glow.setAttribute("fill", "none");
  glow.setAttribute("stroke", "rgba(180,160,255,0.6)");
  glow.setAttribute("stroke-width", "12");
  glow.setAttribute("stroke-linecap", "round");
  glow.setAttribute("stroke-linejoin", "round");
  glow.setAttribute("filter", "blur(6px)");
  svg.appendChild(glow);

  // Core bolt
  const bolt = document.createElementNS("http://www.w3.org/2000/svg", "path");
  bolt.setAttribute("d", mainPath);
  bolt.setAttribute("fill", "none");
  bolt.setAttribute("stroke", "white");
  bolt.setAttribute("stroke-width", "4");
  bolt.setAttribute("stroke-linecap", "round");
  bolt.setAttribute("stroke-linejoin", "round");
  svg.appendChild(bolt);

  // Small branch
  const midIdx = 4;
  const mainPoints = mainPath.split(/[ML]/).filter(Boolean).map((s) => {
    const [x, y] = s.split(",").map(Number);
    return [x, y] as [number, number];
  });
  if (mainPoints[midIdx]) {
    const [bx, by] = mainPoints[midIdx];
    const branchPath = generateBoltPath(bx, by, bx - 80 - Math.random() * 60, by + 80 + Math.random() * 60, 3);
    const branch = document.createElementNS("http://www.w3.org/2000/svg", "path");
    branch.setAttribute("d", branchPath);
    branch.setAttribute("fill", "none");
    branch.setAttribute("stroke", "rgba(255,255,255,0.7)");
    branch.setAttribute("stroke-width", "2");
    branch.setAttribute("stroke-linecap", "round");
    branch.setAttribute("stroke-linejoin", "round");
    svg.appendChild(branch);
  }

  container.appendChild(svg);

  // Fade out the whole thing
  Object.assign(svg.style, {
    opacity: "1",
    transition: "opacity 0.5s ease-out",
  });
  setTimeout(() => { svg.style.opacity = "0"; }, 300);
  setTimeout(() => container.remove(), 1200);
}

export default function LightningEgg() {
  return (
    <button
      onClick={strikeLightning}
      className="cursor-pointer shrink-0"
      style={{ background: "none", border: "none", padding: 0 }}
      aria-label="Lightning bolt"
    >
      <Image
        src="/offline_bolt.webp"
        alt="Lightning bolt"
        width={40}
        height={40}
        className="w-[40px] h-[40px] object-contain brightness-0 invert"
      />
    </button>
  );
}
