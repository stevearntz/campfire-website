/* =========================================================================
   Attune — client-side org simulation + scoring.
   Generates ~60 simulated respondents from a seed, then rolls them up across
   TWO axes: level (CEO → IC) and department. All the dials live in config.ts
   (SIM, LEVELS, DEPARTMENTS, PRESETS); this file is the math.
   ========================================================================= */

import {
  LEVELS,
  DEPARTMENTS,
  QUESTIONS,
  STACK_TIERS,
  SIM,
  PRESETS,
  type LevelId,
  type DeptId,
  type TierId,
  type Preset,
} from "./config";

export type SimResponse = {
  level: LevelId;
  department: DeptId;
  answers: Record<string, number>;
};

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
   Rank 0 = most senior (LEVELS[0]). Senior levels get a positive bump and
   frontline a negative one, CENTERED on the count-weighted mean rank so the
   org-wide average stays put on the respondent's own answers.
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

/* ---- department spread -------------------------------------------------
   Each department's `bias` scaled by `spread`, centered on the headcount-
   weighted mean bias so the org-wide average is preserved (same idea as the
   seniority gradient, just on the department axis).
   ------------------------------------------------------------------------ */
export function deptAdjustments(spread: number): Record<DeptId, number> {
  const totalW = DEPARTMENTS.reduce((s, d) => s + d.weight, 0);
  const meanBias = DEPARTMENTS.reduce((s, d) => s + d.weight * d.bias, 0) / totalW;
  const adj = {} as Record<DeptId, number>;
  DEPARTMENTS.forEach((d) => {
    adj[d.id] = spread * (d.bias - meanBias);
  });
  return adj;
}

/* Pick a department by headcount weight, deterministically from `rng`. */
function makeDeptPicker(rng: () => number): () => DeptId {
  const total = DEPARTMENTS.reduce((s, d) => s + d.weight, 0);
  return () => {
    let r = rng() * total;
    for (const d of DEPARTMENTS) {
      r -= d.weight;
      if (r <= 0) return d.id;
    }
    return DEPARTMENTS[DEPARTMENTS.length - 1].id;
  };
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
export function seedFromAnswers(anchor: SimResponse | null, salt: number): OrgSeed {
  const perItem: Record<string, number> = {};
  QUESTIONS.forEach((q) => {
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
  const levelAdj = levelAdjustments(seed.gradient);
  const deptAdj = deptAdjustments(SIM.deptSpread);
  const pickDept = makeDeptPicker(rng);
  const out: SimResponse[] = [];

  LEVELS.forEach((level) => {
    // If the real respondent sits at this level, reserve one slot for them.
    const reserve = seed.anchor && seed.anchor.level === level.id ? 1 : 0;
    for (let k = 0; k < level.count - reserve; k++) {
      const dept = pickDept();
      const answers: Record<string, number> = {};
      QUESTIONS.forEach((q) => {
        const raw =
          seed.perItem[q.id] + levelAdj[level.id] + deptAdj[dept] + gauss(rng) * seed.noise;
        answers[q.id] = clamp(Math.round(raw), 1, 5);
      });
      out.push({ level: level.id, department: dept, answers });
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

/** Average of a tier's items across a set of responses. */
function tierMean(responses: SimResponse[], tier: TierId): number {
  const ids = itemsInTier(tier);
  const scores: number[] = [];
  responses.forEach((r) => ids.forEach((id) => scores.push(r.answers[id])));
  return avg(scores);
}

/** Overall "health" for a set of responses = average across all four tiers. */
const ALL_TIERS: TierId[] = [...STACK_TIERS, "northstar"];
function groupHealth(responses: SimResponse[]): number {
  return avg(ALL_TIERS.map((t) => tierMean(responses, t)));
}

/** Org-wide tier average. */
export function tierScore(responses: SimResponse[], tier: TierId): number {
  return tierMean(responses, tier);
}

/** Overall org-wide health score. */
export function overallScore(responses: SimResponse[]): number {
  return groupHealth(responses);
}

/** North-star ("cared for") score per level, in seniority order. */
export function northstarByLevel(
  responses: SimResponse[],
): { level: LevelId; label: string; score: number; n: number }[] {
  return LEVELS.map((l) => {
    const rs = responses.filter((r) => r.level === l.id);
    return { level: l.id, label: l.label, score: tierMean(rs, "northstar"), n: rs.length };
  });
}

export type DeptRollup = {
  id: DeptId;
  label: string;
  n: number;
  health: number; // overall across tiers
  caredFor: number; // north-star
  cells: { tier: TierId; score: number }[]; // for the dept × tier heatmap
};

/** Per-department rollup (health + cared-for + tier cells), busiest first. */
export function byDepartment(responses: SimResponse[]): DeptRollup[] {
  return DEPARTMENTS.map((d) => {
    const rs = responses.filter((r) => r.department === d.id);
    return {
      id: d.id,
      label: d.label,
      n: rs.length,
      health: groupHealth(rs),
      caredFor: tierMean(rs, "northstar"),
      cells: STACK_TIERS.map((t) => ({ tier: t, score: tierMean(rs, t) })),
    };
  })
    .filter((d) => d.n > 0)
    .sort((a, b) => b.health - a.health);
}

export type OrgSummary = {
  count: number;
  overall: number;
  northstar: number; // org-wide "cared for"
  stack: { tier: TierId; name: string; score: number }[];
  byLevel: ReturnType<typeof northstarByLevel>;
  heatmap: { level: LevelId; label: string; cells: { tier: TierId; score: number }[] }[];
  departments: DeptRollup[];
  weakestTier: { tier: TierId; name: string; score: number };
  strongestTier: { tier: TierId; name: string; score: number };
  biggestGap: { highLabel: string; lowLabel: string; gap: number };
  deptGap: { highLabel: string; lowLabel: string; gap: number };
};

/** One call → everything the dashboard needs. */
export function summarize(responses: SimResponse[]): OrgSummary {
  const stack = STACK_TIERS.map((t) => {
    const name =
      t === "foundation" ? "Foundation" : t === "management" ? "Management" : "Attunement";
    return { tier: t, name, score: tierMean(responses, t) };
  });

  const sortedTiers = [...stack].sort((a, b) => a.score - b.score);
  const weakestTier = sortedTiers[0];
  const strongestTier = sortedTiers[sortedTiers.length - 1];

  const byLevel = northstarByLevel(responses);
  const levelsWith = byLevel.filter((l) => l.n > 0);
  const levelHigh = levelsWith.reduce((a, b) => (b.score > a.score ? b : a), levelsWith[0]);
  const levelLow = levelsWith.reduce((a, b) => (b.score < a.score ? b : a), levelsWith[0]);

  const heatmap = LEVELS.map((l) => ({
    level: l.id,
    label: l.label,
    cells: STACK_TIERS.map((t) => ({
      tier: t,
      score: tierMean(responses.filter((r) => r.level === l.id), t),
    })),
  }));

  const departments = byDepartment(responses);
  // departments is sorted by health desc, so [0] is healthiest, last is most strained.
  const deptHigh = departments[0];
  const deptLow = departments[departments.length - 1];

  return {
    count: responses.length,
    overall: groupHealth(responses),
    northstar: tierMean(responses, "northstar"),
    stack,
    byLevel,
    heatmap,
    departments,
    weakestTier,
    strongestTier,
    biggestGap: { highLabel: levelHigh.label, lowLabel: levelLow.label, gap: levelHigh.score - levelLow.score },
    deptGap: { highLabel: deptHigh.label, lowLabel: deptLow.label, gap: deptHigh.health - deptLow.health },
  };
}
