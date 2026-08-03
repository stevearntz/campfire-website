-- 002: Assessment rounds
-- The ypo_assessment row becomes the "round" container: one round =
-- one self-assessment + one invite link + its own pool of peer responses.
-- A round is OPEN while closed_at IS NULL, CLOSED once set. One open round
-- per user; each round mints its own invite link.
--
-- DESTRUCTIVE: wipes existing assessment + peer data (approved — no backfill).
-- Additive column/constraint changes below are safe to re-run.

-- 1. Reset assessment + peer data so the new constraints apply cleanly.
TRUNCATE ypo_peer_answer, ypo_peer_feedback, ypo_peer_response, ypo_peer_invite,
         ypo_response, ypo_self_feedback, ypo_assessment
  RESTART IDENTITY CASCADE;

-- 2. Round fields on the assessment (created_at = start date).
ALTER TABLE ypo_assessment
  ADD COLUMN IF NOT EXISTS closed_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS title     VARCHAR(120);

-- 3. Scope invites to a round (was one-per-user). Table is empty post-truncate,
--    so NOT NULL is safe.
ALTER TABLE ypo_peer_invite
  ADD COLUMN IF NOT EXISTS assessment_id INTEGER NOT NULL
    REFERENCES ypo_assessment(id) ON DELETE CASCADE;

-- 4. One invite per ROUND (replaces the old one-invite-per-user unique index).
DROP INDEX IF EXISTS idx_ypo_peer_invite_user;
CREATE UNIQUE INDEX IF NOT EXISTS idx_ypo_peer_invite_assessment
  ON ypo_peer_invite(assessment_id);

-- 5. Enforce "one open round per user" (partial unique index over open rounds).
CREATE UNIQUE INDEX IF NOT EXISTS idx_ypo_assessment_one_open
  ON ypo_assessment(user_id) WHERE closed_at IS NULL;
