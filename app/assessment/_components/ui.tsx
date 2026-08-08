"use client";

/* Shared Attune UI atoms — wordmark, eyebrow, buttons, shell. Kept tiny and
   token-driven so the whole prototype reads as one system. */

import { BRAND } from "../_lib/config";

/** "Attune" in the display serif with a copper period. */
export function Wordmark({ size = "text-2xl" }: { size?: string }) {
  return (
    <span
      className={size}
      style={{ fontFamily: BRAND.serif, fontWeight: 500, color: BRAND.green, letterSpacing: "-0.01em" }}
    >
      {BRAND.wordmark}
      <span style={{ color: BRAND.copper }}>.</span>
    </span>
  );
}

/** Copper uppercase eyebrow with a short hairline rule to its left. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span aria-hidden style={{ width: 44, height: 1, backgroundColor: BRAND.copper, opacity: 0.6 }} />
      <span
        className="text-[0.75rem] uppercase"
        style={{ letterSpacing: "0.14em", color: BRAND.copper }}
      >
        {children}
      </span>
    </span>
  );
}

/** Pill button. Primary = forest fill / stone text. Secondary = hairline on paper. */
export function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const base =
    "rounded-full px-7 py-3 text-sm transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none";
  if (variant === "secondary") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${base} border hover:border-[color:var(--h)] ${className}`}
        style={{ borderColor: BRAND.lineStrong, color: BRAND.ink, ["--h" as string]: BRAND.copper }}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} hover:brightness-110 active:scale-[0.98] ${className}`}
      style={{ backgroundColor: BRAND.green, color: BRAND.cream }}
    >
      {children}
    </button>
  );
}

/** Fixed top-left wordmark that sits over the survey screens. */
export function TopWordmark() {
  return (
    <div className="pointer-events-none absolute left-6 top-6 z-10 sm:left-8 sm:top-8">
      <Wordmark size="text-xl" />
    </div>
  );
}
