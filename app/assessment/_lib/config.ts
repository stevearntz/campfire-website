/* =========================================================================
   Attune — Organizational Assessment prototype
   ONE editable config file. Almost everything you'll want to tweak lives
   here: password, copy, questions, levels, scale, simulation dials,
   presets, thresholds, callouts, and brand colors.

   This is a PROTOTYPE. No backend, no database. The dashboard is populated
   with SIMULATED respondents generated client-side from the config below.
   ========================================================================= */

/* -------------------------------------------------------------------------
   Password gate — NOT real security. This is a hardcoded, client-visible
   password just to keep the prototype lightly gated. Do not treat as auth.
   ------------------------------------------------------------------------- */
export const PASSWORD = "attune";
export const UNLOCK_KEY = "attune_unlocked"; // sessionStorage flag

/* -------------------------------------------------------------------------
   Brand — the Attune "Cultivated Intelligence" system (NOT Campfire's).
   Tokens lifted from the Attune design brief. Fonts (Cormorant Garamond
   display + Inter body) are loaded in app/assessment/layout.tsx and exposed
   as CSS variables; `serif`/`sans` below reference them with fallbacks.
   ------------------------------------------------------------------------- */
export const BRAND = {
  wordmark: "Attune",

  // Primary
  green: "#234236", // --forest-700, grounding / primary
  greenSoft: "#2F5544", // --forest-600, hover / softer forest
  greenDeep: "#1C3329", // --forest-800
  cream: "#F3F0EA", // --stone-100, warm paper / text-on-forest
  creamDeep: "#E9E4DA", // --stone-200, surface fill (bar tracks)
  surface: "#FBFAF7", // --stone-50, card fill
  ink: "#2D2F33", // --ink-800, body text (never pure black)
  inkStrong: "#1E2023", // --ink-900
  inkSoft: "#4A4D52", // --ink-600, muted
  inkSubtle: "#7C7F85", // --ink-400
  line: "#DAD3C5", // --stone-300, hairline border
  lineStrong: "#C3BAA8", // --stone-400

  // Secondary / accents
  copper: "#A56A43", // human warmth — eyebrows, link hover, low end of scale
  gold: "#D2B75F", // --soft-gold, light/emergence, mid of scale
  moss: "#6B8263", // growth
  river: "#557B8C", // the only "blue" — focus ring
  onForestMuted: "#A9BEB2", // --text-on-forest-muted

  // Type — reference the CSS vars set by the route layout.
  serif: 'var(--font-attune-serif), "Cormorant Garamond", Georgia, serif',
  sans: 'var(--font-attune-sans), Inter, -apple-system, "Segoe UI", sans-serif',
};

/* -------------------------------------------------------------------------
   Copy — top-level strings. Rewrite freely.
   ------------------------------------------------------------------------- */
export const COPY = {
  explainerTitle: "Attune",
  explainerTagline: "How cared for do people feel at work?",
  explainerBody:
    "A short, anonymous read on how supported people feel across your organization — from the executive team to the front line. Takes about 3–4 minutes.",
  explainerMeta: "~3–4 minutes · Anonymous",
  getStarted: "Get started",
  viewDashboardLink: "View org dashboard →",
  levelPrompt: "Which best describes your role?",
  levelSub: "Your answers are anonymous. This just helps us group the results.",
  confirmationTitle: "Thank you.",
  confirmationBody:
    "Your response is in. Next you'll see how the organization reads as a whole — rolled up and segmented by level.",
  seeResults: "See the organization's results →",
  dashboardEyebrow: "Organization dashboard",
  reset: "Reset",
  regenerate: "Regenerate sample data",
};

/* -------------------------------------------------------------------------
   Levels — seniority order, most senior first. `count` is how many
   simulated respondents sit at each level (pyramid distribution, ~60 total).
   ------------------------------------------------------------------------- */
export type LevelId = "ceo" | "exec" | "senior" | "director" | "manager" | "ic";

export const LEVELS: { id: LevelId; label: string; count: number }[] = [
  { id: "ceo", label: "CEO", count: 1 },
  { id: "exec", label: "Executive team", count: 5 },
  { id: "senior", label: "Senior leader", count: 8 },
  { id: "director", label: "Director", count: 12 },
  { id: "manager", label: "Manager", count: 15 },
  { id: "ic", label: "Individual contributor", count: 19 },
]; // total = 60

/* -------------------------------------------------------------------------
   Tiers — the three-layer "stack" plus the single north-star item.
   ------------------------------------------------------------------------- */
export type TierId = "foundation" | "management" | "attunement" | "northstar";

export const TIERS: { id: TierId; name: string; heading: string }[] = [
  { id: "foundation", name: "Foundation", heading: "Tier 1 — Foundation" },
  { id: "management", name: "Management", heading: "Tier 2 — Management practices" },
  { id: "attunement", name: "Attunement", heading: "Tier 3 — Attunement" },
];
export const NORTHSTAR: TierId = "northstar";

/* Which tiers show as the three "stack" bars (excludes north-star). */
export const STACK_TIERS: TierId[] = ["foundation", "management", "attunement"];

/* -------------------------------------------------------------------------
   Questions — first-draft wording. We will rewrite constantly; this is the
   one place to do it. 17 items: 4 + 6 + 6 + 1.
   ------------------------------------------------------------------------- */
export type Question = { id: string; tier: TierId; label: string };

export const QUESTIONS: Question[] = [
  // Tier 1 — Foundation
  { id: "f1", tier: "foundation", label: "I know where we're going and what we're working toward." },
  { id: "f2", tier: "foundation", label: "I know what my part is — and the people around me would describe it the same way." },
  { id: "f3", tier: "foundation", label: "I have the time and resources to do my work well." },
  { id: "f4", tier: "foundation", label: "I'm trusted with the space to do great work." },

  // Tier 2 — Management practices
  { id: "m1", tier: "management", label: "I trust the people I work with, and I feel trusted." },
  { id: "m2", tier: "management", label: "I get clear, honest feedback." },
  { id: "m3", tier: "management", label: "Important information is shared openly with me." },
  { id: "m4", tier: "management", label: "The work I do is recognized." },
  { id: "m5", tier: "management", label: "I get to use my strengths in my work." },
  { id: "m6", tier: "management", label: "When someone says they'll do something to help, they follow through." },

  // Tier 3 — Attunement
  { id: "a1", tier: "attunement", label: "Someone here sees me as a person, not just a role." },
  { id: "a2", tier: "attunement", label: "The people I work with know that my personal context matters." },
  { id: "a3", tier: "attunement", label: "I feel genuinely listened to." },
  { id: "a4", tier: "attunement", label: "When I'm struggling, I have someone here who supports me." },
  { id: "a5", tier: "attunement", label: "The people I work with remember what matters to me." },
  { id: "a6", tier: "attunement", label: "I feel like I belong here." },

  // North-star (shown last)
  { id: "ns1", tier: "northstar", label: "The people I work with genuinely care about me as a human." },
];

/* -------------------------------------------------------------------------
   Scale — shared 1–5 for every question.
   ------------------------------------------------------------------------- */
export const SCALE: { value: number; label: string }[] = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly agree" },
];

/* -------------------------------------------------------------------------
   Simulation dials — how the fake org is drawn around the answers.
   Keep these small; they set the "feel". See _lib/simulate.ts for how
   they're used.
   ------------------------------------------------------------------------- */
export const SIM = {
  // Seniority gradient magnitude (points of the 1–5 scale per level-step).
  // Higher = starker exec-vs-frontline gap. Centered so the ORG-WIDE average
  // stays close to the respondent's own answers.
  levelGradient: 0.32,

  // Per-response random wobble (std-dev, in scale points). Higher = messier.
  noise: 0.55,

  // Fallback baseline if the dashboard is opened without taking the survey.
  neutralBaseline: 3.3,
};

/* -------------------------------------------------------------------------
   Demo presets — optional. Each overrides the generated org with a story
   you can summon on demand. A preset just sets a per-tier baseline and a
   gradient; the survey-anchored org stays the primary/default behavior.
   ------------------------------------------------------------------------- */
export type Preset = {
  id: string;
  label: string;
  blurb: string;
  // Baseline score (1–5) for each tier — the org center before gradient+noise.
  tierBaseline: Record<TierId, number>;
  // Overrides SIM.levelGradient for this story.
  gradient: number;
};

export const PRESETS: Preset[] = [
  {
    id: "healthy",
    label: "Healthy",
    blurb: "Strong across the stack, small gaps between levels.",
    tierBaseline: { foundation: 4.4, management: 4.3, attunement: 4.2, northstar: 4.3 },
    gradient: 0.12,
  },
  {
    id: "gap",
    label: "Big level gap",
    blurb: "Execs feel well cared-for; the front line doesn't.",
    tierBaseline: { foundation: 3.8, management: 3.6, attunement: 3.4, northstar: 3.5 },
    gradient: 0.7, // exaggerated — the most sellable picture
  },
  {
    id: "weaktop",
    label: "Strong base, weak top",
    blurb: "Foundation & management high, attunement low.",
    tierBaseline: { foundation: 4.3, management: 4.1, attunement: 2.6, northstar: 2.8 },
    gradient: 0.3,
  },
  {
    id: "shaky",
    label: "Shaky foundation",
    blurb: "Foundation low, so nothing above it holds.",
    tierBaseline: { foundation: 2.4, management: 2.8, attunement: 2.9, northstar: 2.7 },
    gradient: 0.3,
  },
];

/* -------------------------------------------------------------------------
   Thresholds + callout copy — all editable. Scores are on the 1–5 scale.
   ------------------------------------------------------------------------- */
export const THRESHOLDS = {
  strong: 4.0, // at/above → "strong"
  weak: 3.0, // below → "needs attention"
};

// Short, human callout strings. Functions so they can fold in live numbers.
export const CALLOUTS = {
  weakestTier: (tierName: string, score: number) =>
    `${tierName} is the weakest tier across the org (${score.toFixed(1)}/5). The base may be holding — the top isn't.`,
  levelGap: (highLabel: string, lowLabel: string, gap: number) =>
    `${lowLabel}s feel the least cared for — a ${gap.toFixed(1)}-point gap below ${highLabel}.`,
  strongTier: (tierName: string, score: number) =>
    `${tierName} is your strongest layer (${score.toFixed(1)}/5).`,
};

/* Labels used under the north-star headline based on the org-wide score. */
export const READING_BANDS: { min: number; label: string }[] = [
  { min: 4.3, label: "Deeply cared for" },
  { min: 3.7, label: "Cared for" },
  { min: 3.0, label: "Mixed" },
  { min: 2.3, label: "Running low" },
  { min: 0, label: "Depleted" },
];
