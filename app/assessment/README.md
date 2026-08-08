# Attune — Organizational Assessment (prototype)

A self-contained prototype at **`/assessment`**. Measures how "cared for" people
feel at work across three tiers, taken by everyone from the CEO to the front
line, and rolls up into an **org-level dashboard segmented by level**. The
headline insight is the gap between the top and the bottom.

**This is a prototype.** No backend, no database, no real auth. The dashboard is
populated with **simulated respondents generated client-side** from an editable
config, so we can iterate on the questions and the report fast. Real data
collection gets wired up later.

## Where to edit

Almost everything lives in **`_lib/config.ts`**:

- `PASSWORD` — the gate password (`attune`). **Not real security** — it's
  client-visible; just a light gate. Unlock is stored in `sessionStorage`.
- `COPY` — all top-level screen copy.
- `LEVELS` — roles + how many simulated respondents sit at each (pyramid, ~60).
- `DEPARTMENTS` — the second segmentation axis. Each has a `weight` (relative
  headcount) and a `bias` (~-1..+1 story dial: how the team reads vs. the org).
  Rewrite to match a real customer's org.
- `QUESTIONS` — the 17 items (Foundation ×4, Management ×6, Attunement ×6,
  north-star ×1). Rewrite freely.
- `SCALE` — the shared 1–5 scale.
- `SIM` — simulation dials: `levelGradient` (seniority gap magnitude),
  `deptSpread` (how far departments diverge), `noise`, `neutralBaseline`
  (fallback when no survey is taken).
- `PRESETS` — the demo stories (Healthy / Big level gap / Strong base, weak top /
  Shaky foundation). Each just sets a per-tier baseline + gradient.
- `THRESHOLDS`, `CALLOUTS`, `READING_BANDS` — the dashboard's copy + banding.
- `BRAND` — the Attune "Cultivated Intelligence" tokens (forest / stone / copper
  / gold …). Fonts (Cormorant Garamond display + Inter body) load in
  `layout.tsx`. Swap these for the licensed tokens/fonts when available.

## How the simulated org works (`_lib/simulate.ts`)

The respondent is treated as **one representative pulse**. Their per-item answers
become the org baseline; each simulated respondent at level _L_ in department _D_
gets `answer[i] + levelAdjustment(L) + deptAdjustment(D) + gaussianNoise`, clamped
to 1–5. Both the seniority gradient and the department spread are **centered on
their weighted means**, so the org-wide average stays close to the respondent's
own answers — only the _shape_ (top vs. bottom, team vs. team) shifts.
Departments are assigned across the pool by `weight`. The respondent's own
response is folded into the pool.

- Open the dashboard straight from the explainer → neutral mid-range org.
- **Regenerate sample data** re-draws the noise around the _same_ baseline.
- Presets override the anchored org with a canned story (clearly separated).

## Files

- `page.tsx` — route entry (renders `AttuneApp`).
- `layout.tsx` — fonts + `noindex` metadata + page surface.
- `_components/AttuneApp.tsx` — screen flow: gate → explainer → level →
  department → survey → confirmation → dashboard, plus reset.
- `_components/Dashboard.tsx` — the rollup (health headline, stack, gap-by-level,
  tier × level heatmap, **by-department bars, tier × department heatmap**,
  callouts, preset switcher).
- `_components/ui.tsx` — shared atoms (wordmark, eyebrow, button).
- `_lib/config.ts` — all editable content + tokens.
- `_lib/simulate.ts` — org generation + rollup math.
- `_lib/scale-color.ts` — 1–5 → color for bars + heatmap.
