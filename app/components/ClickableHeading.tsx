"use client";

import { useRef } from "react";
import { spawnEmbers } from "@/app/lib/embers";

export default function ClickableHeading({
  children,
  clicks = 3,
  className,
}: {
  children: React.ReactNode;
  clicks?: number;
  className?: string;
}) {
  const timestamps = useRef<number[]>([]);

  function handleClick() {
    const now = Date.now();
    timestamps.current.push(now);
    timestamps.current = timestamps.current.filter((t) => now - t < 1500);
    if (timestamps.current.length >= clicks) {
      timestamps.current = [];
      spawnEmbers();
    }
  }

  return (
    <span onClick={handleClick} className={className} style={{ cursor: "default" }}>
      {children}
    </span>
  );
}
