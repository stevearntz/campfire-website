# YPO Activating Behaviors Assessment Tool

## What This Is

A self-assessment and peer-feedback tool for YPO members built on the "Activating Behaviors" framework. Members rate themselves on 12 behavioral statements across four categories (Joy, Trust, Power, Partnership) plus an open-ended note per section, then invite peers to rate them. Results show a radar chart comparing self-perception vs. peer perception, gap analysis, and a fully-attributed per-peer drill-in.

Live at `/ypo-tool`. Peer rating at `/rate/[token]`.

> **Transparency, not anonymity (July 2026).** By YPO's request, all anonymity was removed. Every peer response is attributed by name, the member can drill into each peer's individual ratings and notes, and results unlock as soon as **one** peer completes (`MIN_PEERS = 1`). Peer name is now **required**. See "Changelog — July 2026 demo" at the bottom.

---

## Framework

Four categories ("circles"), 3 behaviors each, 12 total. Rated on a 6-point Likert scale (1 = Strongly disagree, 6 = Strongly agree). No neutral midpoint by design.

| Circle | Color | Key | Example behavior |
|---|---|---|---|
| Joy | `#F59E2C` | `joy1-3` | "I bring a constructive, hopeful attitude when we hit challenges." |
| Trust | `#6E3FCC` | `trust1-3` | "I follow through on the commitments I make." |
| Power | `#E055CB` | `power1-3` | "I move work forward proactively rather than waiting." |
| Partnership | `#30B7B7` | `part1-3` | "I create room for others to succeed." |

Scoring: sum per circle (3-18), not mean. Displayed as `X / 18`.

Source of truth for all items: `app/ypo-tool/lib/behaviors.ts`. Do not modify without a matching Design drop.

---

## User Flows

### Self-Assessment
1. Visit `/ypo-tool` → magic-link auth (email must be `@ypo.org` or `@getcampfire.com`)
2. 4 section intros → 3 questions each → results with radar chart
3. Results show strongest and weakest circle, with "Invite Peers" CTA

### Peer Rating
1. Authenticated member gets a shareable link (`/rate/[token]`)
2. Peer visits link (no auth required), optionally enters name, rates 12 statements
3. Peer wording is third-person ("This person brings..." or "Steve brings...")
4. Each browser gets a unique response via cookie (`ypo_peer_{token}`)

### Self vs. Peer Comparison
1. Requires `MIN_PEERS = 3` completed peer responses (anonymity threshold)
2. Dual-layer radar chart: solid purple (self) + dashed pink (peer average)
3. Gap analysis: blind spots (self > peer by 0.10+) and hidden strengths (peer > self)

---

## Architecture

### File Structure

```
app/ypo-tool/
├── page.tsx                    # Server component (metadata, noindex)
├── YpoToolClient.tsx           # Main client shell — manages all views
├── README.md                   # This file
├── lib/
│   ├── behaviors.ts            # CIRCLES array, item text, scoring helpers
│   ├── constants.ts            # Types, FRAMEWORK object, email validation
│   ├── db.ts                   # Neon Postgres queries (users, sessions, rate limits)
│   ├── auth.ts                 # Cookie-based session helpers
│   ├── email.ts                # Resend magic-link email
│   └── schema.sql              # Full DB schema
├── components/
│   ├── MagicLinkForm.tsx       # Email input + magic link request
│   ├── AssessmentFlow.tsx      # Multi-step assessment (intro → questions → complete)
│   ├── SectionIntro.tsx        # Full-bleed section intro screen
│   ├── QuestionScreen.tsx      # 3-question view with progress rail
│   ├── ScaleInput.tsx          # 6-point Likert scale selector
│   ├── ProgressRail.tsx        # 12-segment progress bar
│   ├── RadarChart.tsx          # SVG 4-axis radar (supports dual polygon overlay)
│   ├── Results.tsx             # Results view with radar + strength/growth
│   ├── InvitePeers.tsx         # Invite link + rater status (polls every 15s)
│   └── ComparisonView.tsx      # Self vs. peer radar + gap analysis

app/rate/
└── [token]/
    ├── page.tsx                # Server component (noindex)
    └── PeerRatingClient.tsx    # Full peer rating flow (no auth required)

app/api/ypo-tool/
├── auth/
│   ├── send/route.ts           # POST: validate email, rate-limit, send magic link
│   ├── verify/route.ts         # GET: consume token, create session, redirect
│   ├── me/route.ts             # GET: return current user or null
│   └── logout/route.ts         # POST: destroy session, clear cookie
├── assessment/
│   ├── route.ts                # GET/POST: find or create in-progress assessment
│   ├── current/route.ts        # GET: latest assessment (any status)
│   └── [id]/
│       ├── response/route.ts   # PUT: upsert individual answer
│       └── complete/route.ts   # POST: mark assessment complete
├── invite/
│   ├── route.ts                # POST: create or return peer invite token
│   └── status/route.ts         # GET: rater list + completion counts
├── peer-aggregate/route.ts     # GET: aggregated peer scores (gated by MIN_PEERS)
├── comparison/
│   └── current/route.ts        # GET: self sums + peer averages for radar
└── rate/[token]/
    ├── route.ts                # GET: ratee info for peer rating page
    ├── response/route.ts       # GET: check existing | POST: create | PUT: save answer
    └── complete/route.ts       # POST: mark peer response complete
```

### Database (Neon Postgres)

All tables prefixed `ypo_`. Schema in `lib/schema.sql` (plus the open-ended
feedback tables added by `lib/migrations/001`).

| Table | Purpose |
|---|---|
| `ypo_users` | Email-verified users. Domain constraint: `@ypo.org` or `@getcampfire.com` |
| `ypo_auth_tokens` | Single-use magic link tokens (15-min expiry) |
| `ypo_sessions` | Cookie-based sessions (30-day expiry) |
| `ypo_rate_limits` | Per-email rate limiting (3 magic links/hour) |
| `ypo_assessment` | Normalized self-assessment (one row per assessment) |
| `ypo_response` | Individual self-assessment answers (one row per item) |
| `ypo_peer_invite` | One invite token per user (12-char base64url) |
| `ypo_peer_response` | One row per peer rater (cookie-tracked) |
| `ypo_peer_answer` | Individual peer answers (one row per item per rater) |

The self-assessment flow uses the normalized `ypo_assessment` + `ypo_response`
tables. An older JSONB `ypo_assessments` table (plus its `db.ts` helpers,
`scoring.ts`, and the `/api/ypo-tool/assessments` + `share/[token]` routes)
was removed in the July 2026 cleanup — it had no live callers. `behaviors.ts`
is the single source of truth for the framework and scoring. The `ypo_assessments`
table may still exist in the DB; it is no longer touched by application code.

### Auth

- Magic-link only — no passwords, no OAuth
- `Resend` sends branded HTML email with verify link
- Token consumed atomically (SQL `UPDATE ... WHERE used_at IS NULL`)
- Session stored as `ypo_session` httpOnly cookie + DB row
- Dev bypass: in `NODE_ENV === "development"`, entering any allowed email skips the magic link and goes straight to assessment

### Data Persistence

- Self-assessment: saved to DB on each answer (`PUT /api/ypo-tool/assessment/{id}/response`), localStorage as backup
- On login, DB responses take priority → localStorage fills gaps → any localStorage-only answers sync up to DB
- Peer responses: saved to DB on each answer via PUT, cookie tracks which response belongs to which browser

### Attribution (formerly "Privacy")

- Peer responses are **fully attributed** — the member sees each peer's name, their individual per-item ratings, and their open-ended notes (`GET /api/ypo-tool/peer-responses`, rendered as the drill-in in `ComparisonView`)
- Results unlock once `MIN_PEERS = 1` peer completes (the old 3-peer anonymity threshold is gone)
- Peer name is **required** (`POST /api/ypo-tool/rate/[token]/response` returns `400 name_required` without it)

---

## Environment Variables

Required in `.env.local` (already configured in Vercel):

```
POSTGRES_URL=<Neon connection string>
RESEND_API_KEY=<Resend API key>
NEXT_PUBLIC_BASE_URL=http://localhost:3000  (or production URL)
```

Pull from Vercel: `npx vercel env pull .env.local`

---

## Database Setup

If starting fresh (new Neon database):

1. Create a Neon Postgres database in the Vercel dashboard and link it to the project
2. Run the full schema from `app/ypo-tool/lib/schema.sql` in the Neon SQL Editor
3. Pull env vars: `npx vercel env pull .env.local`

The current production database is already set up and populated.

---

## Dev Commands

```bash
npm run dev      # localhost:3000 — auth bypass enabled
npm run build    # Verify production build passes
npm run lint     # ESLint
```

No test framework configured. Manual testing via the flows described above.

---

## Key Design Decisions

1. **6-point scale, no midpoint** — forces a lean toward agree/disagree
2. **Sum scoring (X/18), not mean** — per Design drop 03b
3. **MIN_PEERS = 1** — results unlock as soon as one peer completes (was 3; anonymity removed July 2026)
4. **Cookie-based peer tracking** — each browser = one response, no auth required for peers
5. **Name is required for peers** — every response is attributed (was optional pre-July-2026)
6. **Third-person peer wording** — "This person follows through..." with name substitution if ratee's first name is available
7. **Gap threshold = 0.10** — differences below this are not flagged as blind spots or hidden strengths
8. **Single source of truth** — `behaviors.ts` owns the framework and scoring; the old JSONB assessment path was removed (July 2026)

---

## What's Built and Working

- [x] Magic-link auth (Resend email, @ypo.org + @getcampfire.com)
- [x] Self-assessment flow (4 sections, 12 questions, save-as-you-go)
- [x] Results view (radar chart, strength/growth identification)
- [x] Peer invite flow (shareable link, copy button, rater status polling)
- [x] Public peer rating page (no auth, cookie-tracked, name optional)
- [x] Self vs. peer comparison (dual-layer radar, gap analysis)
- [x] DB persistence (self-assessment tied to user email, peer responses tracked)
- [x] Dev auth bypass (skip magic link in development)
- [x] Production deployment (Vercel, Neon Postgres, Resend)

---

## Known Issues / Future Work

- **No session cleanup cron**: Expired sessions and tokens accumulate in DB. A periodic cleanup query would help.
- **No email notification to ratee**: When peers complete their rating, the ratee isn't notified. Could send a Resend email when peer count reaches MIN_PEERS.
- **No share flow**: A read-only "share my results" view was removed in the July 2026 cleanup (it was an unwired placeholder). If revived, build it on the normalized `ypo_assessment` tables.
- **Retake flow** (updated July 2026): latest attempt wins; incomplete attempts are cleared by `POST /assessment/restart`. Completed attempts remain in `ypo_assessment` as history but aren't surfaced in the UI yet.
- **Mobile polish**: Functional but could benefit from more responsive refinement on the radar chart and comparison view.

---

## Auth / magic-link — how it works & gotchas

Flow: `MagicLinkForm` POSTs to `/api/ypo-tool/auth/send` → validates domain
(`isValidYpoEmail`, `@ypo.org` or `@getcampfire.com`) → rate-limits (3/email/hr) →
`upsertUser` → `createAuthToken` (15-min TTL) → `sendMagicLink` (Resend). The email
link points at `GET /api/ypo-tool/auth/verify?token=…` → `validateAuthToken` →
`createSessionRecord` → sets session cookie → redirects to `/ypo-tool`.

**Error surfacing:** the verify route redirects with `?error=…`; `YpoToolClient` maps it
to the message shown on `MagicLinkForm`. `missing_token` / `invalid_token`
("link expired or already used") / `verification_failed` ("Sign-in failed. Please try again.").
In **development, auth is bypassed** (`onBypassAuth`) — you won't exercise the real email
path locally; test magic links against the Vercel preview/prod.

### Fixed 2026-06: corporate inboxes couldn't log in

Real `@ypo.org` users hit "Sign-in failed." Two compounding bugs:

1. **Single-use token burned by email link-scanners.** Corporate mail security (Outlook
   Safe Links / Mimecast / Proofpoint) pre-fetches every URL in an email to vet it. That
   automated **GET hit `/auth/verify` and consumed the one-time token** before the human
   clicked, so the real click found it already used → failure. **Fix:** `validateAuthToken`
   (renamed from `consumeAuthToken`) now accepts **any unexpired token — multi-use within
   the 15-min window** (`SET used_at = COALESCE(used_at, NOW())`, no `used_at IS NULL`
   guard). Stamps first-touch for audit but never blocks. Tradeoff (accepted): the link is
   replayable for 15 min.
2. **`redirect()` inside a `try/catch`.** `redirect()` throws `NEXT_REDIRECT`; the catch
   swallowed it and rewrote every failure to `verification_failed`, masking the real reason.
   **Fix:** verify computes an `outcome` inside the try and calls `redirect()` once,
   **outside** the try/catch. (General rule: never `redirect()` inside a try that catches all.)

If login still fails after this: check `RESEND_API_KEY` + `POSTGRES_URL` are set in the
target Vercel env, and that the user requests a **fresh** link (old ones expire in 15 min).
The gold-standard hardening (deferred) is a **confirm-click interstitial page** — the email
link opens a page with a "Sign in" button that POSTs to consume the token; GET scanners
can't trigger it, which would let us return to strict single-use.

---

## Design Drops Applied

| Drop | What it did |
|---|---|
| 03b-patch | Changed scoring from mean/6 to sum/18, fixed radar label clipping |
| 04 | Added peer invite flow, public rating page, aggregation backend |
| 05 | Added self vs. peer comparison with dual-layer radar and gap analysis |

Design drops come as markdown prompts with specific code changes. The authoritative item text lives in `behaviors.ts`.

---

## Changelog — July 2026 demo

Shipped ahead of the YPO directors demo. Theme: **remove anonymity, add open-ended feedback, make retakes predictable.**

**Anonymity removed (full attribution)**
- `MIN_PEERS` → `1` in `behaviors.ts` (all gating endpoints read this constant).
- New `GET /api/ypo-tool/peer-responses` — returns each peer's name, per-item answers, and notes.
- `ComparisonView` gains a "What each peer said" drill-in: expandable named cards showing each peer's 12 ratings (with scale labels) and their section notes.
- Peer name is now **required** (`rate/[token]/response` POST rejects blank names; `PeerRatingClient` intro validates).
- Anonymity copy stripped from `InvitePeers`, `ComparisonView`, `PeerRatingClient`, `Results`.

**Open-ended feedback per section (`#6`)**
- Migration `lib/migrations/001_open_ended_feedback.sql` adds `ypo_peer_feedback` and `ypo_self_feedback` (one row per circle per response/assessment). **Additive, already run against prod Neon.**
- Save endpoints: `PUT /api/ypo-tool/rate/[token]/feedback` (peer), `PUT /api/ypo-tool/assessment/[id]/feedback` (self). Both tolerate the table being absent.
- Prompts live on each circle in `behaviors.ts` (`circle.feedback.self` / `.peer`). Textareas render after each section's 3 questions in both flows; optional; flushed on Continue + blur.
- Self notes surface in `Results` ("Your notes"); peer notes surface in the drill-in and preload on resume.

**Predictable retake / multi-use (`#7`)**
- Behavior: **latest attempt wins; prior incomplete attempts are cleared.** Completed attempts are kept as history.
- `loadAssessment` now reads `/assessment/current` (latest, any status) instead of find-or-create — fixes the old bug where a completed member who refreshed got a blank new attempt instead of their results.
- New `POST /api/ypo-tool/assessment/restart` deletes in-progress rows (cascades responses + self-feedback) and creates one fresh assessment. Wired to the Results "Restart" button.

**Intro screen + required name (`#1`, `#3`)**
- New `intro` view in `YpoToolClient` explains the flow (rate yourself → invite peers → see it side by side) and **requires** the member's name before starting. Name persists via `POST /api/ypo-tool/profile` → `ypo_users.name`.

**Scroll fix (`#2`)**
- Question content padding `py-10` → `pt-10 pb-36` so the (now taller) content clears the `sticky bottom-0` footer.
- Section changes use `window.scrollTo({top:0})` instead of `scrollIntoView` (which aligned the target under the sticky 64px navbar). Applied to both `AssessmentFlow` and `PeerRatingClient`.

**Auth:** unchanged this round (the June 2026 magic-link fix already handles corporate link-scanners).

New API routes: `peer-responses`, `assessment/restart`, `profile`, `rate/[token]/feedback`, `assessment/[id]/feedback`.
New tables: `ypo_peer_feedback`, `ypo_self_feedback` (schema in `schema.sql` #11/#12, migration in `lib/migrations/001`).
