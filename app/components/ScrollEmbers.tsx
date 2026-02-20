"use client";

import { useEffect, useRef } from "react";
import { spawnEmbers } from "@/app/lib/embers";

export default function ScrollEmbers() {
  const hitBottom = useRef(0);
  const fired = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (fired.current) return;
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      const atTop = window.scrollY < 100;

      if (atBottom) hitBottom.current = Date.now();
      if (atTop && hitBottom.current && Date.now() - hitBottom.current < 5000) {
        spawnEmbers();
        fired.current = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
