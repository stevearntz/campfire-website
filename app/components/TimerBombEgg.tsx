"use client";

import { useRef, useCallback } from "react";

export default function TimerBombEgg({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Only trigger on the icon image
    const img = (e.target as HTMLElement).closest("img");
    if (!img) return;

    // The card is the wrapper rendered by contents — find the actual card div
    const card = containerRef.current?.querySelector(".rounded-2xl") as HTMLElement;
    if (!card) return;

    // Prevent re-trigger
    if (card.querySelector("[data-timer-bomb]")) return;

    // Position countdown inside the card
    card.style.position = "relative";

    const numEl = document.createElement("div");
    numEl.setAttribute("data-timer-bomb", "");
    Object.assign(numEl.style, {
      position: "absolute",
      top: "12px",
      left: "16px",
      fontSize: "64px",
      fontWeight: "900",
      fontFamily: "system-ui, sans-serif",
      color: "#FF2020",
      lineHeight: "1",
      zIndex: "10",
      transition: "transform 0.15s",
    });
    card.appendChild(numEl);

    let count = 5;
    numEl.textContent = String(count);

    const tick = setInterval(() => {
      count--;
      if (count > 0) {
        numEl.textContent = String(count);
        numEl.style.transform = "scale(1.3)";
        setTimeout(() => { numEl.style.transform = "scale(1)"; }, 150);
      } else {
        clearInterval(tick);
        numEl.remove();
        explode(card);
      }
    }, 1000);
  }, []);

  return (
    <div ref={containerRef} className="contents" onClick={handleClick}>
      {children}
    </div>
  );
}

function explode(card: HTMLElement) {
  const rect = card.getBoundingClientRect();

  // Flash over just the card
  const flash = document.createElement("div");
  Object.assign(flash.style, {
    position: "fixed",
    left: rect.left + "px",
    top: rect.top + "px",
    width: rect.width + "px",
    height: rect.height + "px",
    background: "rgba(255, 200, 50, 0.8)",
    borderRadius: "16px",
    zIndex: "51",
    pointerEvents: "none",
    transition: "opacity 0.4s",
  });
  document.body.appendChild(flash);
  setTimeout(() => { flash.style.opacity = "0"; }, 50);
  setTimeout(() => flash.remove(), 500);

  // Shard container
  const shardContainer = document.createElement("div");
  Object.assign(shardContainer.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "50",
    overflow: "hidden",
  });
  document.body.appendChild(shardContainer);

  // Split card into fragments
  const fragCount = 6;
  for (let i = 0; i < fragCount; i++) {
    const frag = document.createElement("div");
    const clipTop = (i / fragCount) * 100;
    const clipBottom = ((i + 1) / fragCount) * 100;

    Object.assign(frag.style, {
      position: "fixed",
      left: rect.left + "px",
      top: rect.top + "px",
      width: rect.width + "px",
      height: rect.height + "px",
      background: "#F7F6F7",
      borderRadius: "16px",
      border: "1px solid #e5e7eb",
      clipPath: `polygon(0% ${clipTop}%, 100% ${clipTop}%, 100% ${clipBottom}%, 0% ${clipBottom}%)`,
      transition: "transform 1.2s cubic-bezier(0.25, 0, 0.6, 1), opacity 1.2s ease-out",
      zIndex: "50",
    });

    // Clone card content into fragment
    const clone = card.cloneNode(true) as HTMLElement;
    // Remove the timer bomb marker from clone
    clone.querySelector("[data-timer-bomb]")?.remove();
    Object.assign(clone.style, {
      width: "100%",
      height: "100%",
      margin: "0",
      position: "static",
    });
    frag.appendChild(clone);
    shardContainer.appendChild(frag);

    // Random trajectory
    const angle = Math.random() * Math.PI * 2;
    const dist = 200 + Math.random() * 500;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - 150;
    const rot = (Math.random() - 0.5) * 720;

    requestAnimationFrame(() => {
      frag.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
      frag.style.opacity = "0";
    });
  }

  // Hide original card
  card.style.transition = "opacity 0.1s";
  card.style.opacity = "0";

  // Debris particles centered on the card
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    const size = 4 + Math.random() * 8;
    const colors = ["#6E3FCC", "#9D88ED", "#EE81DD", "#F5C542", "#FF6B35"];
    Object.assign(p.style, {
      position: "fixed",
      left: cx + (Math.random() - 0.5) * rect.width * 0.6 + "px",
      top: cy + (Math.random() - 0.5) * rect.height * 0.6 + "px",
      width: size + "px",
      height: size + "px",
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      background: colors[Math.floor(Math.random() * colors.length)],
      zIndex: "52",
      pointerEvents: "none",
      transition: "transform 1.5s cubic-bezier(0.15, 0, 0.5, 1), opacity 1.5s ease-out",
    });
    shardContainer.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const dist = 150 + Math.random() * 400;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const rot = (Math.random() - 0.5) * 1080;

    requestAnimationFrame(() => {
      p.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
      p.style.opacity = "0";
    });
  }

  // Restore card after animation
  setTimeout(() => {
    shardContainer.remove();
    card.style.transition = "opacity 0.6s";
    card.style.opacity = "1";
  }, 2000);
}
