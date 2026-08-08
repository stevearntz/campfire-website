/* =========================================================================
   Attune — client-side org simulation + scoring.
   Generates ~60 simulated respondents from a seed, then rolls them up.
   All the dials live in config.ts (SIM, LEVELS, PRESETS); this file is the
   math that turns those dials into an org.
   ========================================================================= */

import {
  LEVELS,
  QUESTIONS,
  STACK_TIERS,
  SIM,
  PRESETS,
  type LevelId,
  type TierId,
  type Preset,
} from "./config";

export type SimResponse = { level: LevelId; answers: Record<string, number> };

/* ---- tiny deterministic RNG so results are stable per seed ------------- */
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashStr(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
// Standard normal via Box–Muller.
function gauss(rng: () => number) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

/* ---- seniority gradient ------------------------------------------------
   Rank 0 = most senior (LEVELS[0]). We give senior levels a positive bump
   and frontline a negative one, CENTERED on the count-weighted mean rank so
   the org-wide average stays put on the respondent's own answers.
   ------------------------------------------------------------------------ */
export function levelAdjustments(gradient: number): Record<LevelId, number> {
  const N = LEVELS.reduce((s, l) => s + l.count, 0);
  const weightedMeanRank = LEVELS.reduce((s, l, i) => s + l.count * i, 0) / N;
  const adj = {} as Record<LevelId, number>;
  LEVELS.forEach((l, i) => {
    adj[l.id] = gradient * (weightedMeanRank - i);
  });
  return adj;
}

/* ---- the seed the org is drawn from ----------------------------------- */
export type OrgSeed = {
  perItem: Record<string, number>; // baseline score (1–5) per question id
  gradient: number;
  noise: number;
  salt: number; // bump to redraw the noise around the same baseline
  anchor?: SimResponse; // the real respondent, folded into the pool
};

/* Build a seed from the respondent's answers (the primary/default path). */
export function seedFromAnswers(
  anchor: SimResponse | null,
  salt: number,
): OrgSeed {
  const perItem: Record<string, number> = {};
  QUESTIONS.forEach((q) => {
    // Treat the respondent as a representative pulse: their own item scores
    // are the org baseline. No survey taken → neutral mid-range fallback.
    perItem[q.id] = anchor ? anchor.answers[q.id] : SIM.neutralBaseline;
  });
  return {
    perItem,
    gradient: SIM.levelGradient,
    noise: SIM.noise,
    salt,
    anchor: anchor ?? undefined,
  };
}

/* Build a seed from a demo preset (overrides the answer-anchored org). */
export function seedFromPreset(preset: Preset, salt: number): OrgSeed {
  const perItem: Record<string, number> = {};
  QUESTIONS.forEach((q) => {
    perItem[q.id] = preset.tierBaseline[q.tier];
  });
  return { perItem, gradient: preset.gradient, noise: SIM.noise, salt };
}

export function getPreset(id: string | null): Preset | null {
  return PRESETS.find((p) => p.id === id) ?? null;
}

/* ---- generate the org -------------------------------------------------- */
export function generateOrg(seed: OrgSeed): SimResponse[] {
  const rng = mulberry32(
    hashStr(JSON.stringify(seed.perItem)) ^ Math.imul(seed.salt + 1, 2654435761),
  );
  const adj = levelAdjustments(seed.gradient);
  const out: SimResponse[] = [];

  LEVELS.forEach((level) => {
    // If the real respondent sits at this level, reserve one slot for them.
    const reserve = seed.anchor && seed.anchor.level === level.id ? 1 : 0;
    for (let k = 0; k < level.count - reserve; k++) {
      const answers: Record<string, number> = {};
      QUESTIONS.forEach((q) => {
        const raw = seed.perItem[q.id] + adj[level.id] + gauss(rng) * seed.noise;
        answers[q.id] = clamp(Math.round(raw), 1, 5);
      });
      out.push({ level: level.id, answers });
    }
  });

  if (seed.anchor) out.push(seed.anchor);
  return out;
}

/* =========================================================================
   Rollups — everything the dashboard reads.
   ========================================================================= */
const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

const itemsInTier = (tier: TierId) => QUESTIONS.filter((q) => q.tier === tier).map((q) => q.id);

/** Org-wide average for a tier (across all respondents × all items in it). */
export function tierScore(responses: SimResponse[], tier: TierId): number {
  const ids = itemsInTier(tier);
  const scores: number[] = [];
  responses.forEach((r) => ids.forEach((id) => scores.push(r.answers[id])));
  return avg(scores);
}

/** Tier average within a single level. */
export function tierScoreByLevel(
  responses: SimResponse[],
  tier: TierId,
  level: LevelId,
): number {
  const ids = itemsInTier(tier);
  const scores: number[] = [];
  responses
    .filter((r) => r.level === level)
    .forEach((r) => ids.forEach((id) => scores.push(r.answers[id])));
  return avg(scores);
}

/** North-star ("cared for") score per level, in seniority order. */
export function northstarByLevel(
  responses: SimResponse[],
): { level: LevelId; label: string; score: number; n: number }[] {
  return LEVELS.map((l) => {
    const rs = responses.filter((r) => r.level === l.id);
    return {
      level: l.id,
      label: l.label,
      score: avg(rs.map((r) => r.answers.ns1)),
      n: rs.length,
    };
  });
}

/** Overall score = average across the three stack tiers + north-star. */
export function overallScore(responses: SimResponse[]): number {
  const tiers: TierId[] = [...STACK_TIERS, "northstar"];
  return avg(tiers.map((t) => tierScore(responses, t)));
}

export type OrgSummary = {
  count: number;
  overall: number;
  northstar: number; // org-wide "cared for"
  stack: { tier: TierId; name: string; score: number }[];
  byLevel: ReturnType<typeof northstarByLevel>;
  heatmap: { level: LevelId; label: string; cells: { tier: TierId; score: number }[] }[];
  weakestTier: { tier: TierId; name: string; score: number };
  strongestTier: { tier: TierId; name: string; score: number };
  biggestGap: { highLabel: string; lowLabel: string; gap: number };
};

/** One call → everything the dashboard needs. */
export function summarize(responses: SimResponse[]): OrgSummary {
  const stack = STACK_TIERS.map((t) => {
    const name = t === "foundation" ? "Foundation" : t === "management" ? "Management" : "Attunement";
    return { tier: t, name, score: tierScore(responses, t) };
  });

  const sorted = [...stack].sort((a, b) => a.score - b.score);
  const weakestTier = sorted[0];
  const strongestTier = sorted[sorted.length - 1];

  const byLevel = northstarByLevel(responses);
  const withScores = byLevel.filter((l) => l.n > 0);
  const high = withScores.reduce((a, b) => (b.score > a.score ? b : a), withScores[0]);
  const low = withScores.reduce((a, b) => (b.score < a.score ? b : a), withScores[0]);

  const heatmap = LEVELS.map((l) => ({
    level: l.id,
    label: l.label,
    cells: STACK_TIERS.map((t) => ({ tier: t, score: tierScoreByLevel(responses, t, l.id) })),
  }));

  return {
    count: responses.length,
    overall: overallScore(responses),
    northstar: tierScore(responses, "northstar"),
    stack,
    byLevel,
    heatmap,
    weakestTier,
    strongestTier,
    biggestGap: { highLabel: high.label, lowLabel: low.label, gap: high.score - low.score },
  };
}
