import type { BehaviorScores, CategoryAverages, Category } from "./constants";
import { CATEGORY_ORDER, SCALE_POINTS } from "./constants";

function average(arr: number[]): number {
  return parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2));
}

export function calculateAverages(scores: BehaviorScores): CategoryAverages {
  return {
    joy: average(scores.joy),
    trust: average(scores.trust),
    power: average(scores.power),
    partnership: average(scores.partnership),
  };
}

export function getStrongestCategory(averages: CategoryAverages): Category {
  return CATEGORY_ORDER.reduce((best, cat) =>
    averages[cat] > averages[best] ? cat : best,
  );
}

export function getWeakestCategory(averages: CategoryAverages): Category {
  return CATEGORY_ORDER.reduce((weakest, cat) =>
    averages[cat] < averages[weakest] ? cat : weakest,
  );
}

export function getOverallAverage(averages: CategoryAverages): number {
  const values = CATEGORY_ORDER.map((c) => averages[c]);
  return average(values);
}

export function validateScores(scores: unknown): scores is BehaviorScores {
  if (!scores || typeof scores !== "object") return false;
  const s = scores as Record<string, unknown>;
  for (const category of CATEGORY_ORDER) {
    const arr = s[category];
    if (!Array.isArray(arr) || arr.length !== 3) return false;
    for (const val of arr) {
      if (typeof val !== "number" || !Number.isInteger(val) || val < 1 || val > SCALE_POINTS)
        return false;
    }
  }
  return true;
}
