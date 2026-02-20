"use client";

import { useEffect } from "react";
import { spawnEmbers } from "@/app/lib/embers";

export default function TypeTrigger({ word }: { word: string }) {
  useEffect(() => {
    let pos = 0;
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === word[pos]) {
        pos++;
        if (pos === word.length) {
          spawnEmbers();
          pos = 0;
        }
      } else {
        pos = e.key === word[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [word]);

  return null;
}
