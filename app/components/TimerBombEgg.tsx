"use client";

import { useRef, useCallback } from "react";

export default function TimerBombEgg({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Only trigger on the icon image
    const img = (e.target as HTMLElement).closest("img");
    if (!img) return;

    const section = containerRef.current?.closest("section");
    if (!section) return;

    // Prevent re-trigger
    if (section.querySelector("[data-timer-bomb]")) return;

    const sectionRect = section.getBoundingClientRect();

    // Countdown overlay — fixed, positioned over the section
    const overlay = document.createElement("div");
    overlay.setAttribute("data-timer-bomb", "");
    Object.assign(overlay.style, {
      position: "fixed",
      left: sectionRect.left + "px",
      top: sectionRect.top + "px",
      width: sectionRect.width + "px",
      height: sectionRect.height + "px",
      pointerEvents: "none",
      zIndex: "50",
    });
    document.body.appendChild(overlay);

    // Countdown number
    const numEl = document.createElement("div");
    Object.assign(numEl.style, {
      position: "absolute",
      top: "24px",
      left: "32px",
      fontSize: "72px",
      fontWeight: "900",
      fontFamily: "system-ui, sans-serif",
      color: "#FF2020",
      textShadow: "0 0 20px rgba(255,32,32,0.6), 0 0 40px rgba(255,32,32,0.3)",
      lineHeight: "1",
      opacity: "0",
      transition: "opacity 0.15s",
    });
    overlay.appendChild(numEl);

    let count = 5;
    numEl.textContent = String(count);
    numEl.style.opacity = "1";

    const tick = setInterval(() => {
      count--;
      if (count > 0) {
        numEl.textContent = String(count);
        // Pulse effect
        numEl.style.transform = "scale(1.3)";
        setTimeout(() => { numEl.style.transform = "scale(1)"; }, 150);
      } else {
        clearInterval(tick);
        numEl.style.opacity = "0";
        explode(section, overlay);
      }
    }, 1000);
  }, []);

  return (
    <div ref={containerRef} className="contents" onClick={handleClick}>
      {children}
    </div>
  );
}

function explode(section: HTMLElement, overlay: HTMLElement) {
  // Flash
  const flash = document.createElement("div");
  Object.assign(flash.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(255, 200, 50, 0.7)",
    zIndex: "51",
    pointerEvents: "none",
    transition: "opacity 0.4s",
  });
  document.body.appendChild(flash);
  setTimeout(() => { flash.style.opacity = "0"; }, 50);
  setTimeout(() => flash.remove(), 500);

  // Get all direct children of the section's content area to shatter
  const contentWrapper = section.querySelector(".grid") as HTMLElement;
  if (!contentWrapper) return;

  const cards = Array.from(contentWrapper.children) as HTMLElement[];
  // Also grab the heading/description above
  const textCenter = section.querySelector(".text-center") as HTMLElement;

  // Collect all elements to shatter
  const targets: HTMLElement[] = [];
  if (textCenter) targets.push(textCenter);
  targets.push(...cards);

  // Create shards from each element
  const shardContainer = document.createElement("div");
  Object.assign(shardContainer.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "50",
    overflow: "hidden",
  });
  document.body.appendChild(shardContainer);

  // Hide originals and create flying copies
  const origRects: { el: HTMLElement; rect: DOMRect }[] = [];
  for (const el of targets) {
    origRects.push({ el, rect: el.getBoundingClientRect() });
  }

  // Create fragments for each element
  for (const { el, rect } of origRects) {
    // Split each element into ~4 fragments
    const fragCount = 4;
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
        background: getComputedStyle(el).background || "#F7F6F7",
        borderRadius: "8px",
        clipPath: `polygon(0% ${clipTop}%, 100% ${clipTop}%, 100% ${clipBottom}%, 0% ${clipBottom}%)`,
        transition: "transform 1.2s cubic-bezier(0.25, 0, 0.6, 1), opacity 1.2s ease-out",
        zIndex: "50",
      });

      // Clone inner content
      const clone = el.cloneNode(true) as HTMLElement;
      Object.assign(clone.style, {
        width: "100%",
        height: "100%",
        margin: "0",
      });
      frag.appendChild(clone);
      shardContainer.appendChild(frag);

      // Random trajectory
      const angle = Math.random() * Math.PI * 2;
      const dist = 300 + Math.random() * 600;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 200; // bias upward
      const rot = (Math.random() - 0.5) * 720;

      requestAnimationFrame(() => {
        frag.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
        frag.style.opacity = "0";
      });
    }

    // Hide original
    el.style.transition = "opacity 0.1s";
    el.style.opacity = "0";
  }

  // Spawn debris particles
  const particleCount = 40;
  const sectionRect = section.getBoundingClientRect();
  const cx = sectionRect.left + sectionRect.width / 2;
  const cy = sectionRect.top + sectionRect.height / 2;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("div");
    const size = 4 + Math.random() * 8;
    const colors = ["#6E3FCC", "#9D88ED", "#EE81DD", "#F5C542", "#FF6B35"];
    Object.assign(p.style, {
      position: "fixed",
      left: cx + (Math.random() - 0.5) * 100 + "px",
      top: cy + (Math.random() - 0.5) * 60 + "px",
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
    const dist = 200 + Math.random() * 500;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const rot = (Math.random() - 0.5) * 1080;

    requestAnimationFrame(() => {
      p.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
      p.style.opacity = "0";
    });
  }

  // Restore everything after animation
  setTimeout(() => {
    shardContainer.remove();
    overlay.remove();
    for (const { el } of origRects) {
      el.style.transition = "opacity 0.6s";
      el.style.opacity = "1";
    }
  }, 2000);
}
