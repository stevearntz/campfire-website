# Team Effectiveness Micro-site + Execution Diagnostic

Continuity doc for the `/team-effectiveness` marketing micro-site and the shared
Execution / Team-Effectiveness diagnostic. Read this before touching either —
several non-obvious decisions and shared-component gotchas live here.

---

## What this is

A standalone marketing micro-site selling Campfire's **Team Effectiveness Sprint**
(Diagnostic → Workshop → Roadmap), plus a self-serve **diagnostic** (the "Execution
Calculator") that scores how effectively a team executes. Built inside the existing
`campfire-website` Next.js repo, isolated via a route group.

- **Hub:** `/team-effectiveness`
- **Diagnostic:** `/team-effectiveness/calculator` (a.k.a. "the calculator")
- **The Model (POV):** `/team-effectiveness/the-model`
- **Case Studies:** `/team-effectiveness/case-studies` (+ `[slug]`)
- **Workshop / Roadmap / Diagnostic explainer pages:** `/team-effectiveness/{workshop,roadmap,diagnostic}`
- **Alias of the diagnostic:** `/execution` (main site, different chrome — see gotchas)

There is also an **outbound/targeting brief** for sales/Cowork at
`~/Dropbox/Mac/Downloads/team-effectiveness-outbound-brief.md` (ICP, triggers,
anonymized proof points, messaging angles). Regenerate from the live site if copy drifts.

---

## Route-group architecture (important)

Two route groups under `app/`:

- `app/(main)/` — all original marketing pages + the global `Navbar`/`Footer`
  (`app/(main)/layout.tsx`). **`/execution` and `/ypo-tool` live here.**
- `app/(microsite)/team-effectiveness/` — its own `layout.tsx` wrapping every
  micro-site page with `SiteNav` + `SiteFooter` (NOT the global navbar).

Route groups are invisible in URLs. **Import gotcha:** files moved into route groups
must use the `@/app/*` alias (not relative `../`), and anything pointing at moved code
must use the full grouped path, e.g. `@/app/(main)/ypo-tool/lib/*`.

---

## The shared diagnostic component (read this twice)

`app/(main)/execution/ExecutionCalculatorClient.tsx` (`ECC`) is **ONE component
rendered at BOTH** `/execution` and `/team-effectiveness/calculator`. There are **no
props** distinguishing the two routes — any change to a step affects both.

- `/team-effectiveness/calculator/page.tsx` → renders `ECC` inside the micro-site shell
  (two-tier `SiteNav`).
- `/execution/page.tsx` → renders `ECC` inside the **main** layout (global 64px navbar).

**Consequence:** the diagnostic's chrome differs by route. The micro-site gets the
intended two-tier header; `/execution` gets the generic site nav. The viewport-fit
math (`calc(100vh - 92px)`, below) is tuned to the micro-site nav, so on `/execution`
the card has a little extra bottom room. If we ever want one canonical diagnostic, the
planned move is to **redirect `/execution → /team-effectiveness/calculator`** (not done
— it's a live page today). `/sprint → /team-effectiveness` redirect IS in `next.config.ts`.

### ECC step machine
- `step === 0` → **intro hero** (lighthouse illustration, below)
- `step === 1` → org questions (headcount + AI adoption)
- `step === 2..4` → Clarity / Alignment / Coordination question sets (dot scale)
- `step === 5` → `ResultsView` (score hero, AI callout, equation breakdown, Foundational Move, research, CTA)

### Math / logic — DO NOT CHANGE during reskins
`AI_OPTIONS`, the three `*_QS` question arrays, `HEADCOUNT_PRESETS`, `computeResults`,
and `ResultsView`'s numbers are the source of truth. The equation:
`Execution = (Clarity × Alignment) / Coordination Cost`, then
`Effective headcount = headcount × AI_multiplier × Execution`. Each dimension's 4th
question is the **Focus throughline** (folds into that dimension's average; it is NOT a
4th equation term). All reskins this session were markup/CSS only.

---

## Design language

### Micro-site palette
Purple `#6E3FCC` / `#5B34AB`, accent `#9D88ED`, lavender `#B8A4F2`, dark `#1C1334`,
pink CTA `#E055CB`. Ink/navy text `#262F56`, muted `#97949D` / `#636B7C`.
Framework palette (equation terms): **Clarity `#C77DEC`, Alignment `#EE80DD`,
Coordination `#F7A83D`, Capacity white.**

> Note a palette split: the **micro-site equation** (`EquationBlock`) uses the violet/
> pink/amber framework palette, but the **diagnostic results** (`focusBars`, `weakestColor`)
> still use the older Clarity `#F59E2C` / Alignment `#6E3FCC` / Coordination `#E055CB`
> mapping, kept internally consistent within the results page. Don't "fix" one in isolation.

### EquationBlock
`app/(microsite)/team-effectiveness/_components/EquationBlock.tsx` — the shared fraction
(`Clarity × Alignment / Coordination Cost × Capacity`). Props: `variant` light|dark,
`result`, `showCapacity`, `resultColor`, `stackResult`, `size` default|md|lg. Reused on
hub, The Model, etc. Keep the three identical.

### Diagnostic intro hero (step 0)
Full-bleed **lighthouse + rowboats illustration** (`/public/diagnostic-hero.webp`,
~96KB, 2400px wide, converted from a ChatGPT-generated PNG via
`cwebp -q 80 -resize 2400 0`). Eyebrow "Team Effectiveness Diagnostic" → white headline
"How effectively is your team executing?" → subhead "Do your 300 employees execute like
30… or 3,000?" → "Take this 2-minute diagnostic to find out." → purple `#8B6FD6` CTA
"Start the diagnostic". Subtle top vignette for legibility. (Replaced an older
equation-block intro; the `calculator_handoff` package's `04-intro-hero.png` is the
**superseded** version — don't restore it.)

### Diagnostic steps 1–4 (the card reskin)
Built from the `calculator_handoff/` design package (PROMPT.md + token block in
`calculator-reference.html`). Exact tokens:
- Page field `#F9F5FD`; centered **white card** `max-width 1137px`, `radius 10`, no shadow.
- Eyebrow row (step label left, "Step n of 4" right): `18px / 500 / 0.08em / uppercase / #97949D`.
- **Progress bar:** full 4-color gradient `linear-gradient(90deg,#6E3FCC 0%,#C35AFF 33%,
  #E463A4 66%,#FF9900 100%)` revealed up to step% via a gray `#EAE9EB` cover div
  (25/50/75/100%). `height 6, radius 5`.
- Title `clamp(30,4vw,44) / 800 / -0.015em / #262F56`; subtitle `18 / 500 / #97949D`;
  coordination keeps its `#B23B9F` "more friction" note.
- **Step 1:** size chips `50/200/500/1,000/3,000` (sel `#6E3FCC` white) + "Other:" 96px
  input; AI rows stacked `max-w 520`, bold label + em-dash, sel `#6E3FCC` white. AI order/
  multipliers: Minimal 1.0 · Exploring 1.3 · Actively using 1.8 · Deeply embedded 2.5.
- **Dot scale** (`ScaleInput`): 5 numbered dots `clamp(36,4.4vw,41)`; unselected `#F7F6F7`/
  `#AAA7AE`; selected `linear-gradient(135deg,#6E3FCC,#C35AFF)` white + glow. The 4th (Focus)
  statement gets a pill: `Focus` `10.5px/700/0.12em`, `#C35AFF` on `#FAF1FC`.
- **Footer** (`StepNav`): outlined **Back** (`inset 0 0 0 1px #AAA7AE` + shadow, `#525057`)
  and purple **Next** (`#6E3FCC`, disabled `#D9D2E8`), `16px/700/0.16em/uppercase`, radius 4.
  Last step reads "See your results →".

### Viewport-fit (deliberate deviation from the spec)
Per an explicit ask, each step **sizes to the viewport** so all four questions + buttons
fit without scrolling: outer wrapper `min-height: calc(100vh - 92px)`, vertically centered
card, and all vertical rhythm converted to **`vh`-aware clamps** (card padding, title
margin, qrow padding `clamp(12px,2.1vh,26px)`, StepNav margin, etc.). This **intentionally
overrides** the package's fixed pixel paddings (card `40/80`, qrow `30 0`, title `40 0 8`).
You can't have literal-spec spacing AND guaranteed fit — fit wins. Falls back to scrolling
on very short viewports rather than clipping.

### Results "Foundational Move" section
The §5 focus-projection block in `ResultsView` (dark `#1C1334`). Restyled this session:
pill eyebrow, gradient "all three" headline, gradient-bordered before→after hero stat
with a `+gain%` pill, glowing lift bars (per-term color dot + delta pill), and a
side-by-side "improving weakest alone (+leverPct%) vs investing in focus (+focusGain%)"
comparison. All data bindings unchanged (`r.effectiveHeadcount`, `r.focusTo`, `r.focusGain`,
`focusBars`, `weakestLabel/weakestColor`, `r.leverPct`).

---

## Header (SiteNav) decisions

`app/(microsite)/team-effectiveness/_components/SiteNav.tsx` — two-tier: utility strip
("← getcampfire.com") + sticky white nav (The Sprint / The Model / Case Studies) + pink
pill CTA "Start the diagnostic".

- **The CTA is intentionally HIDDEN on the diagnostic route** (`hideCta =
  pathname.startsWith('/team-effectiveness/calculator')`) — per Steve, it's redundant on
  page 0 (where it's the prominent CTA) and once you're inside the flow. **This contradicts
  the design package's mockups, on purpose.** Don't "restore" it from the spec.
- Header token values (utility bg `#F4F2F8`, links 14px, logo `h-7`) are slightly off the
  package spec (`#F1EFF5`, 17px, 30px, locked 88px height) — cosmetic, not yet aligned.

---

## Analytics taxonomy

- Canonical calculator events (from the equation spec): `calc_start` / `calc_step` /
  `calc_complete` / `calc_cta`.
- Micro-site: `te_cta` (`cta: start_diagnostic | book_call | see_diagnostic`) and
  `te_link` (`label`, `location`).
- Fire via `TrackedLink` (`@/app/components/TrackedLink`) or `trackEvent`
  (`@/app/lib/analytics`; params are `Record<string,string>`).

---

## The `calculator_handoff/` package + DIFF

`calculator_handoff/` (repo root) holds the design spec used for the steps 1–4 reskin:
`PROMPT.md` (target spec), `calculator-reference.html` (static reference; **exact tokens
in the `<style>` comment block**), `reference/*.png`. `DIFF.md` is a spec-vs-live
comparison report. **Open decisions recorded there, already decided this session:**
- Header CTA: **kept hidden** on the diagnostic (rejecting the spec). ✅ decided
- Spacing: **keep viewport-fit clamps**, accept the documented deltas from spec. ✅ decided
- `/execution`: redirect-to-canonical still **not done** (open).
- Fonts: project ships **League Spartan**, spec references "Spartan MB" (no such asset). Open.

---

## Deploy workflow (every change ships continuously)

1. Work on `development` (Vercel auto-deploys a preview).
2. `git commit` (messages end with `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`).
3. `gh pr create --base main --head development` → `gh pr merge <#> --merge`.
4. `git checkout development && git pull origin main && git push origin development` to resync.
5. `npm run build` must pass before shipping. No test framework.

Image rule: PNG → WebP via `cwebp -q 80` (or `-q 85` for textured/backgrounds); OG images
stay PNG at 1200×630.

---

## Building from designs (how Steve hands off)

- **Screenshots** work great and are the default — `ECC`/micro-site were largely built
  this way; exact hexes get eyeballed then fine-tuned.
- **Figma link** can be read via the claude.ai Figma connector, but it must be connected
  on the claude.ai side first (Settings → Connectors); it often doesn't surface in Claude
  Code's `/mcp` until a session restart. Don't rabbit-hole — fall back to a screenshot.
- **Raw `.fig`** files can't be opened directly — ask for a Figma link or PNG export.
- Design "packages" arrive as zips (PROMPT.md + reference HTML w/ token block + PNGs).
  Lift exact values from the reference HTML's `<style>` comment.

---

## Key decisions made (session of 2026-06)

1. Diagnostic intro (step 0) = lighthouse illustration hero (replaced equation intro).
2. Steps 1–4 reskinned to the lavender-card design; **logic untouched**.
3. **Viewport-fit** spacing chosen over literal-spec paddings.
4. Header "Start the diagnostic" CTA **hidden on the diagnostic route**.
5. "Foundational Move" results section restyled.
6. Both decisions in DIFF.md (CTA hidden, viewport-fit) locked in.

## Open / future
- Redirect `/execution → /team-effectiveness/calculator` (canonicalize the diagnostic).
- Align `SiteNav` header tokens to the package spec (cosmetic).
- Decide on Spartan MB vs League Spartan (cross-site).
- Real person names still appear in some case-study **page bodies** (cards are genericized).
- 6 missing session illustrations + OG/SEO pre-launch gates (see project memory).
