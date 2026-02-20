"use client";

import { useEffect, useCallback } from "react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function KonamiCode() {
  const spawnEmbers = useCallback(() => {
    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "fixed",
      inset: "0",
      pointerEvents: "none",
      zIndex: "99999",
      overflow: "hidden",
    });
    document.body.appendChild(container);

    if (!document.getElementById("ember-keyframes")) {
      const style = document.createElement("style");
      style.id = "ember-keyframes";
      style.textContent =
        "@keyframes ember-rise{0%{transform:translateY(0) scale(1);opacity:0.9}100%{transform:translateY(-110vh) scale(0.3);opacity:0}}";
      document.head.appendChild(style);
    }

    for (let i = 0; i < 50; i++) {
      const ember = document.createElement("div");
      const x = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = 2 + Math.random() * 3;
      const size = 4 + Math.random() * 8;
      const hue = 15 + Math.random() * 30;
      const light = 50 + Math.random() * 20;
      Object.assign(ember.style, {
        position: "absolute",
        bottom: "-20px",
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `hsl(${hue}, 100%, ${light}%)`,
        opacity: "0.9",
        animation: `ember-rise ${duration}s ${delay}s ease-out forwards`,
      });
      container.appendChild(ember);
    }

    setTimeout(() => container.remove(), 7000);
  }, []);

  useEffect(() => {
    let pos = 0;
    function onKey(e: KeyboardEvent) {
      if (e.key === SEQUENCE[pos]) {
        pos++;
        if (pos === SEQUENCE.length) {
          spawnEmbers();
          pos = 0;
        }
      } else {
        pos = e.key === SEQUENCE[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [spawnEmbers]);

  return null;
}
