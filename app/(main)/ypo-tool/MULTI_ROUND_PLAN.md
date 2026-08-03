# YPO Tool — Multiple Assessment Rounds (build spec)

Status: **shipped (Phases 1–5)** · Author: Steve + Claude · Aug 2026

Phases 1–3 (data model, round-scoped backend, dashboard round management),
Phase 4 (view a past round read-only), and Phase 5 (cross-round progress
trend) are all built, verified against Neon, and merged to production.

## Goal

Let a member run the assessment **more than once over time**. Each *round* has a
start date, its own shareable peer link, and its own pool of peer responses. A
member can **close** a round (its link stops collecting) and **start a new one**
later. Over multiple rounds we can **track progress** (how self- and peer-views
move).

## Decisions (locked)

1. **New link per round.** Each round mints its own invite token. A closed
   round's link shows a "this assessment has closed" screen.
2. **One open round at a time.** A member must close the current round before
   starting a new one. Enforced in the DB with a partial unique index.
3. **Rounds first, trend next.** Ship the round model + close/start + history +
   round-scoped results/compare first. Add the cross-round progress chart as a
   fast follow.

## Model — the `ypo_assessment` row *is* the round

Reuse the existing per-user, timestamped `ypo_assessment` row as the round
container. One round = one self-assessment + one invite link + its peer pool.

Two distinct states live on the row:
- `status` (`in_progress` | `complete`) — whether the **self**-assessment is done.
- `closed_at` (NULL = open) — whether the **round** is still collecting peers.

`created_at` is the round's **start date**. `title` is an optional human label
("Q3 2026").

### Schema changes (migration `002_assessment_rounds.sql`)

Additive columns + a constraint swap. Fully backfillable; no data loss.

```sql
-- Round fields on the assessment
ALTER TABLE ypo_assessment
  ADD COLUMN IF NOT EXISTS closed_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS title     VARCHAR(120);

-- Scope invites to a round (was one-per-user)
ALTER TABLE ypo_peer_invite
  ADD COLUMN IF NOT EXISTS assessment_id INTEGER
    REFERENCES ypo_assessment(id) ON DELETE CASCADE;
```

### Backfill (existing members → "Round 1")

Order matters. Draft — finalize against a prod snapshot in Phase 1.

```sql
-- 1. Close every assessment EXCEPT each user's most-recent one.
--    (Historical retakes become past/closed rounds; newest stays open.)
UPDATE ypo_assessment a
SET closed_at = COALESCE(a.completed_at, a.created_at)
WHERE a.closed_at IS NULL
  AND a.id <> (
    SELECT b.id FROM ypo_assessment b
    WHERE b.user_id = a.user_id
    ORDER BY b.created_at DESC LIMIT 1
  );

-- 2. Attach each existing invite to that user's current (open) round.
UPDATE ypo_peer_invite pi
SET assessment_id = a.id
FROM (
  SELECT DISTINCT ON (user_id) id, user_id
  FROM ypo_assessment ORDER BY user_id, created_at DESC
) a
WHERE pi.user_id = a.user_id AND pi.assessment_id IS NULL;

-- 3. Swap the constraint: one invite per ROUND, not per user.
DROP INDEX IF EXISTS idx_ypo_peer_invite_user;
CREATE UNIQUE INDEX IF NOT EXISTS idx_ypo_peer_invite_assessment
  ON ypo_peer_invite(assessment_id);

-- 4. Enforce "one open round per user".
CREATE UNIQUE INDEX IF NOT EXISTS idx_ypo_assessment_one_open
  ON ypo_assessment(user_id) WHERE closed_at IS NULL;
```

Migration risks to check first (Phase 1, step 0):
- Users with **multiple open** `ypo_assessment` rows (step 1 must resolve to
  exactly one open per user before the partial index is created).
- **Orphan invites** whose user has no assessment row (create a placeholder
  round, or delete if no peer responses).
- Whether to attach peers to the most-recent row vs most-recent **complete**
  row when the newest is an incomplete retake.

## Backend

### Re-scope (query by the round's invite, not by user)
- `invite/route.ts` — create/return the invite for the **active open round**.
- `invite/status`, `comparison/current`, `peer-aggregate`, `peer-responses` —
  resolve the invite via `assessment_id` of the target round (default: active).
- `rate/[token]/route.ts` + `response` + `complete` + `feedback` — unchanged
  keying (still via token → invite), **plus** a closed-round guard.

### New behavior — closed-round guard
`rate/[token]` routes check the round's `closed_at`. If set: `GET` returns
`{ closed: true, memberName }`; `POST`/`PUT`/complete reject with `410 round_closed`.

### New endpoints
- `GET  /api/ypo-tool/rounds` — list rounds for the user:
  `[{ id, title, startedAt, closedAt, status, selfComplete, peerCount }]`.
- `POST /api/ypo-tool/rounds/close` — set `closed_at` on the active round
  (confirm on the client). Idempotent.
- `POST /api/ypo-tool/rounds/start` — guard "no open round exists", then create
  a new `ypo_assessment` (+ mint invite lazily on first invite fetch). Returns
  the new round id. Rejects `409 round_open` if one is already open.

### Retire / repurpose
`assessment/restart` (delete-in-progress-and-recreate) is superseded by
close + start. Fold its callers into the new endpoints, then remove it.

## Frontend

1. **Dashboard** (`YpoToolClient` home): active round as today, **plus**
   - a **"Close this round"** action (confirm → link stops collecting), and
   - a **Past rounds** list (date, label, peer count) linking to each round's
     read-only results/compare.
   When no round is open → primary CTA **"Start a new assessment."**
2. **Results & Comparison become round-scoped** — accept a round id (default
   active); past rounds render read-only. Route shape: `/ypo-tool/results?round=ID`
   (or `/ypo-tool/rounds/[id]/...`), TBD in Phase 4.
3. **Peer rate page** — closed-round screen ("This assessment has closed —
   reach out to {name} for a new link").

## Phase 5 (fast follow) — Progress / trend

A **Progress** view across rounds: per circle, plot self and peer scores over
time (round start dates on the x-axis). Surfaces movement — e.g. a shrinking
self-vs-peer gap, or a circle trending up. Needs ≥2 rounds to be meaningful;
show an empty state until then.

## Phasing / task list

- **Phase 1 — Data.** Inspect prod data; finalize + run `002` migration and
  backfill; add columns to `schema.sql`. Verify one open round per user.
- **Phase 2 — Backend.** Re-scope the 8 invite/comparison/peer routes to the
  round; add closed-round guard; add `rounds` list/close/start; retire restart.
- **Phase 3 — Dashboard.** Close/start actions + past-rounds list + no-open-round
  CTA.
- **Phase 4 — Round-scoped views.** Results/Compare accept a round id; past
  rounds read-only.
- **Phase 5 — Progress trend.** Cross-round chart + empty state.
- **Phase 6 — Peer closed-state.** Rate page closed screen.

Each phase ships independently behind normal PR flow.
