"use client";

import { useState, useEffect } from "react";
import { spawnEmbers } from "@/app/lib/embers";

export default function EasterEggCard() {
  const [revealed, setRevealed] = useState(false);
  const [fading, setFading] = useState(false);

  const color = "#6E3FCC";
  const colorLight = "#9D88ED";

  useEffect(() => {
    if (!revealed) return;
    const fadeTimer = setTimeout(() => setFading(true), 3000);
    const hideTimer = setTimeout(() => {
      setRevealed(false);
      setFading(false);
    }, 5000);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, [revealed]);

  return (
    <div
      className="rounded-xl overflow-hidden relative cursor-pointer hidden lg:block"
      style={{ minHeight: revealed ? undefined : "100%" }}
      onClick={() => {
        if (!revealed) {
          setRevealed(true);
          spawnEmbers();
        }
      }}
    >
      {revealed ? (
        <div
          className="bg-white rounded-xl p-4 overflow-hidden relative h-full"
          style={{
            animation: fading ? "fade-out 2s ease-in forwards" : "fade-in 0.4s ease-out",
          }}
        >
          <style>{`@keyframes fade-in{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}@keyframes fade-out{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(0.95)}}`}</style>
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ background: `linear-gradient(to bottom, ${colorLight}, ${color})` }}
          />
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-gray-900">Easter egg hunt</h4>
            <span
              className="text-[11.5px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ml-2"
              style={{ backgroundColor: colorLight + "B3", color: color }}
            >
              8 eggs
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            You found one! There are hidden surprises tucked into every page of this site. Keep clicking, typing, and exploring.
          </p>
        </div>
      ) : (
        <div className="h-full" />
      )}
    </div>
  );
}
