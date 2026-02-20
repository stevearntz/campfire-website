"use client";

import { useEffect } from "react";
import { spawnEmbers } from "@/app/lib/embers";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function KonamiCode() {
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
  }, []);

  return null;
}
