/* Map a 1–5 score onto the Attune palette: rust (low) → cream (mid) → green
   (high), with gold near the upper-mid. Used by the heatmap + bar fills. */
import { BRAND } from "./config";

function hexToRgb(h: string) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
}
function mix(a: string, b: string, t: number) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

// Low → high runs copper (human warmth, needs attention) → soft-gold →
// forest (grounded, strong). All Attune tokens; solid fills, no gradients.
const HIGH = "#3D6B57"; // --forest-500

/** Continuous fill color for a score (1–5). */
export function scoreColor(score: number): string {
  const t = Math.max(0, Math.min(1, (score - 1) / 4)); // 0..1
  if (t < 0.5) return mix(BRAND.copper, BRAND.gold, t / 0.5);
  return mix(BRAND.gold, HIGH, (t - 0.5) / 0.5);
}

/** Fraction 0–1 for bar widths on the 1–5 scale. */
export const scoreFraction = (score: number) => Math.max(0, Math.min(1, (score - 1) / 4));

/** Readable text color to sit on top of a scoreColor cell. */
export function textOn(score: number): string {
  const t = Math.max(0, Math.min(1, (score - 1) / 4));
  // Mid-range (cream/gold) wants dark ink; the rust & green ends want cream.
  return t > 0.34 && t < 0.62 ? BRAND.ink : BRAND.cream;
}
