# Calculator Reskin — Spec vs. Live Code DIFF

Generated comparison only. **No code changed.** Target = `calculator_handoff/PROMPT.md` + token block in `calculator-reference.html`. Current = live `development`/`main` (in sync).

**Files referenced**
- `ECC` = `app/(main)/execution/ExecutionCalculatorClient.tsx` (the diagnostic; shared by `/execution` and `/team-effectiveness/calculator`)
- `NAV` = `app/(microsite)/team-effectiveness/_components/SiteNav.tsx` (micro-site two-tier header)
- `CFG` = `next.config.ts`

> **Headline:** the **steps 1–4 card reskin is already ~95% to spec** — it was built from this same package in PRs #178/#179. The remaining gaps are (a) the **header tokens** don't match the spec, (b) a **deliberate viewport-fit pass** (PR #179) shrank several of the spec's fixed paddings, and (c) the **header CTA is intentionally hidden** on the diagnostic route per your earlier instruction — which directly contradicts the spec. Those three are your calls; everything else is cosmetic S-effort polish.

---

## Comparison table

| Area | Current (live code) | Target (spec) | Match? | Effort | Notes / Decision |
|---|---|---|---|---|---|
| **Two-tier header — exists?** | Yes, on micro-site routes via `NAV` (utility strip + sticky white nav). **Not** on `/execution` (uses global `Navbar` from main layout). | Page-wide two-tier chrome above the calculator on every step. | 🟡 | M | Exists for `/team-effectiveness/calculator`. `/execution` shows the **main site nav**, not this header. Decision: do we care about `/execution` chrome, or redirect it away (see redirects row)? |
| **Utility bar** | bg `#F4F2F8`; padding `7px clamp(20px,5vw,56px)`; link `14px`?no → `fontSize:12 / #8A8499`; text `← getcampfire.com` → `/` (`NAV:41,47`) | bg `#F1EFF5`, border-bottom `#ECEAF2`, padding `11px clamp(20px,5vw,80px)`; link `14px / 500 / #8C8895`; → marketing home | 🟡 | S | Off on bg hex, padding, link size/color. Link target `/` vs spec "`/team-effectiveness` or marketing home". All trivial. |
| **Main nav bar** | padding `16px clamp(20px,5vw,56px)`, **no fixed height**; logo `h-7` = **28px**; links `14px / 600`, gap `34`; hover `#6E3FCC` (`NAV:74,78,89`) | height **88px**, padding `0 clamp(20px,5vw,80px)`; logo **30px**; links **17px** / 600, gap `clamp(22,3vw,44)` | 🟡 | S | Links/logo slightly smaller; no locked 88px height. Labels + hover already correct. |
| **Header pink CTA** | **Hidden on the diagnostic route** (`hideCta = pathname.startsWith('/team-effectiveness/calculator')`, `NAV:36,101,153`). Elsewhere: `#E055CB`, `12px / 700 / 0.08em`, padding `12px 22px`, radius 8. | **Present** on every calculator step: `#E055CB`, `13px / 700 / 0.12em`, padding `14px 26px`, radius 8, "START THE DIAGNOSTIC". | ⚠️ | S | **Conflict — your call.** You explicitly asked to remove it on page 0 + in-flow; the spec (and its mockups) show it. Token deltas are trivial; the presence question is the real decision. |
| **Page bg + card shell** | bg `#F9F5FD` (`ECC:497`); card `maxWidth:1137`, `borderRadius:10`, no shadow (`ECC:505-507`) | bg `#F9F5FD`; card `1137px`, radius `10px`, no shadow | ✅ | — | Exact. |
| **Card padding** | `clamp(28px,4.5vh,64px) clamp(24px,6vw,96px)` (`ECC:508`) | `clamp(40px,5vw,80px) clamp(28px,7vw,110px)` | ⚠️ | S | **Deliberate deviation (PR #179).** Vertical reduced + switched to `vh` to fit viewport; horizontal slightly tighter. Restoring spec values risks overflow. Decision below. |
| **Min-height / viewport fit** | Outer wrapper `minHeight: calc(100vh - 92px)`, flex-centered (`ECC:499-500`) | Not specified — card flows at natural height. | ⚠️ | S | **Your feature request, not in spec.** The `92px` is tuned to the micro-site nav; on `/execution` (64px navbar) it leaves extra bottom space. |
| **Eyebrow row + step counter** | flex space-between; `clamp(14px,1.6vw,18px) / 500 / 0.08em / uppercase / #97949D`; "Step n of 4" (`ECC:514-517`) | `18px / 500 / 0.08em / uppercase / #97949D` | 🟡 | S | Only diff: font is responsive `clamp(14→18)` vs fixed `18`. Intentional for small screens. |
| **Progress bar** | track `#EAE9EB` h6 r5; full gradient `90deg #6E3FCC 0% / #C35AFF 33% / #E463A4 66% / #FF9900 100%`; gray cover from `left:{pct}%` (`ECC:160-166`) | identical (grad + cover technique, 25/50/75/100%) | ✅ | — | Exact, incl. the reveal technique. |
| **Section title** | `clamp(28px,3.4vw,44px) / 800 / -0.015em / #262F56`, margin `clamp(20px,3.2vh,38px) 0 6px` (`ECC:526`) | `clamp(30px,4vw,44px) / 800 / -0.015em`, margin `40px 0 8px` | 🟡 | S | Min size 28 vs 30; top margin reduced to `vh` (viewport-fit). Caps + weight match. |
| **Subtitle** | `18px / 500 / #97949D` (`ECC:530`); per-step copy preserved | `18px / 500 / #97949D`; question steps = "Rate each statement from 1…5." | ✅ | — | Matches. |
| **Coordination friction note** | inline `#B23B9F` "Here, higher scores mean more friction." (`ECC:533-535`) | small `#B23B9F` note on coordination | ✅ | — | Exact hex + intent. |
| **Divider hairline** | `1px #EAE9EB`, `marginTop clamp(14px,2.2vh,24px)` (`ECC:542`) | `1px #EAE9EB` | ✅ | — | Color exact; spacing is `vh` (viewport-fit). |
| **Step 1 — size chips** | `50/200/500/1,000/3,000`; chip `18px`, pad `9px 18px`, r4, min-w49, border `0.7px #EAE9EB`, `#97949D/500`; sel `#6E3FCC/#fff/700` (`ECC:558-575`) | identical chips + states | ✅ | — | Exact. |
| **Step 1 — "Other" input** | `width:96`, pad `9px 12px`, r4, border `0.7px #EAE9EB`, `18px`; shows value only when headcount isn't a preset (`ECC:577-584`) | `96px`, same border/radius; holds any non-preset value | ✅ | — | Exact incl. preset/Other logic. |
| **Step 1 — AI rows (copy/order/mult)** | Minimal 1.0 · Exploring 1.3 · Actively using 1.8 · Deeply embedded 2.5 (`ECC:11-16`) | Minimal 1.0 · Exploring 1.3 · Actively Using 1.8 · Deeply Embedded 2.5 | ✅ | — | Order + multipliers exact. Casing "Actively using"/"Deeply embedded" vs spec title-case — cosmetic only. |
| **Step 1 — AI row style** | row `max-w520`, pad `13px 16px`, r4, border `0.7px #EAE9EB`, `18px`; bold label + "—"; sel `#6E3FCC/#fff` (`ECC:589-610`) | identical | ✅ | — | Exact. |
| **Question dot scale** | dot `clamp(36px,4.4vw,41px)`, `16px/700`; unselected `#F7F6F7`/`#AAA7AE`; selected `linear-gradient(135deg,#6E3FCC,#C35AFF)` + `0 4px 12px rgba(150,70,220,.35)` (`ECC:125-145`) | identical | ✅ | — | Exact. Dot gap `9` vs spec `clamp(8,1.4vw,16)`; scale gap `12` vs `clamp(10,2vw,20)` — trivial. |
| **Scale labels** | "Strongly Disagree" / "Strongly Agree", `16px/600/#AAA7AE`, scale `padding-left:36` (`ECC:147-151`) | same | ✅ | — | Exact. On very narrow screens the row `flex-wrap`s (added for mobile). |
| **Focus pill (4th statement)** | `index===3` → "Focus" `10.5px/700/0.12em/uppercase`, `#C35AFF` on `#FAF1FC`, r999, pad `4px 10px` (`ECC:108-127`) | identical pill on the 4th (Focus) statement | ✅ | — | Exact tokens. Appears on Q4 of clarity/alignment/coordination. |
| **Footer Back btn** | white, `inset 0 0 0 1px #AAA7AE, 0 2px 2px rgba(16,24,40,.15)`, `#525057`, `16px/700/0.16em/uppercase`, pad `16px 28px`, r4 (`ECC:195-203`) | identical | ✅ | — | Exact. |
| **Footer Next btn + disabled** | `#6E3FCC` / disabled `#D9D2E8` (no shadow, not-allowed); `16px/700/0.16em`; r4; shadow `0 2px 2px rgba(16,24,40,.15)`; "{label} →"; last = "See your results" (`ECC:205-219, 649`) | identical, last reads "See your results →" | ✅ | — | Exact. |
| **Fonts** | League Spartan via `next/font` (`app/layout.tsx:2,8`), CSS var `--font-spartan` | production "Spartan MB"; reference falls back to League Spartan | 🟡 | M | Project has **no Spartan MB** asset; everything renders in League Spartan today. Decision: source/license Spartan MB, or accept League Spartan. |
| **Route wiring** | `/team-effectiveness/calculator` (micro-site shell) + `/execution` (main layout) both render `ECC` (`calculator/page.tsx`, `execution/page.tsx`) | both routes serve the diagnostic | ✅ | — | Both live. |
| **`/sprint` redirect** | `{/sprint → /team-effectiveness, permanent:false}` (`CFG:14`) | planned | ✅ | — | Present (temporary 307). |
| **`/execution` redirect** | **None** — `/execution` is a real page with the main navbar. | "`/execution → /team-effectiveness/calculator` already planned" | ❌ | S | Decision: redirect `/execution` (kills the duplicate + the main-nav-chrome problem), or keep it as a standalone entry? |
| **Intro hero (step 0)** | Lighthouse illustration hero (`/diagnostic-hero.webp`), eyebrow/headline/subhead/purple CTA (`ECC:337-396` region) | Package's `04-intro-hero.png` shows the **old** purple equation hero | ⚠️ | — | Out of scope for steps 1–4, but flagging: the package's intro is **superseded** by the lighthouse design you sent separately. Don't "restore" it from this package. |
| **Results (step 5)** | Unchanged `ResultsView` | "unchanged in structure" | ✅ | — | Untouched. |

---

## Conflicts / risks — **your decisions**

1. **Header CTA presence (⚠️).** Spec + mockups show "START THE DIAGNOSTIC" in the nav on every step. You told me to hide it on page 0 and in-flow, and it's currently hidden on the whole `/team-effectiveness/calculator` route. **These cannot both be true.** Current code honors *you*, not the spec. Confirm you want it to stay hidden (then the spec row is intentionally rejected), or specify where it should reappear.
2. **Viewport-fit vs. pixel-perfect padding (⚠️).** PR #179 (your "make the questions fit the viewport" request) replaced the spec's fixed paddings — card `40/80`, title margin `40 0 8`, qrow `30 0` — with smaller `vh`-based clamps and a `min-height: calc(100vh - 92px)` wrapper. Restoring exact spec values would make the 4-question steps **taller than the viewport again** on laptops. You can't have both literal-spec spacing *and* guaranteed fit. Current code prioritizes fit. Decide which wins; if "fit," the spec's padding rows stay intentionally divergent.
3. **`/execution` has the wrong chrome.** Because `/execution` renders under the **main** layout, it shows the global `Navbar`, not the two-tier header — and no viewport offset tuning (the `92px` is wrong there). Cleanest fix is redirecting `/execution → /team-effectiveness/calculator` (matches the spec's "planned redirect") so there's one canonical diagnostic. Otherwise `/execution` will always look different.
4. **No logic at risk.** Every gap above is markup/tokens. None of the proposed changes touch `AI_OPTIONS`, the question arrays, `computeResults`, or `ResultsView`. The reskin is safe from the math.

## Open questions for me

- **A.** Header CTA: keep hidden on the diagnostic (current), or restore per spec? If restore — on page 0 too, or only steps 1–4?
- **B.** Spacing philosophy: lock to the spec's pixel paddings, or keep the viewport-fit clamps? (Recommend: keep fit, accept the documented deltas.)
- **C.** `/execution`: redirect to the canonical micro-site route, or keep as a second standalone page?
- **D.** Fonts: do we acquire/ship **Spartan MB**, or is League Spartan acceptable as the production face? (Affects more than this page.)
- **E.** "← getcampfire.com" target — leave at `/` (current) or point at `/team-effectiveness`?
- **F.** Header tokens (utility/nav sizes, CTA padding): worth matching exactly, or is "close enough" fine given the header isn't the focus?

## Suggested sequencing

- **Chunk 1 — decisions only (no code):** answer A–D above. They gate everything else.
- **Chunk 2 — header tokens (S, low-risk):** align `NAV` utility/nav/logo/link/CTA values to spec (utility `#F1EFF5`/11px, links 17px, logo 30px, nav 88px, CTA `13px/0.12em/14px26px`). Pure cosmetics on the micro-site header. Pairs with decision F (and A for the CTA).
- **Chunk 3 — route canonicalization (S):** if approved, add `/execution → /team-effectiveness/calculator` redirect in `CFG`; drop the now-dead `/execution` chrome concern. Resolves conflict #3.
- **Chunk 4 — spacing reconciliation (S):** only if you choose "lock to spec" in B — restore the literal paddings and instead solve overflow another way (e.g. scale dimension content down). If you choose "keep fit," this chunk is a no-op and we just annotate the deltas as intentional.
- **Chunk 5 — fonts (M, cross-cutting):** only if D = "ship Spartan MB" — add the font face in `app/layout.tsx` and swap the variable. Affects the whole site, so do it last and deliberately.
- **Chunk 6 — trivia (S):** casing on AI labels, dot/scale gap clamps, eyebrow font lock — batch these last if you want literal parity; otherwise skip.
