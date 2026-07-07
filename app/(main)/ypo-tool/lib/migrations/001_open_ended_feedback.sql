-- Migration 001 — Open-ended feedback per section (Design: YPO demo, July 2026)
-- Additive only. Safe to run repeatedly (IF NOT EXISTS).
-- One free-text answer per circle (joy/trust/power/part) per response.

-- Peer feedback: one row per rater per circle
CREATE TABLE IF NOT EXISTS ypo_peer_feedback (
  id SERIAL PRIMARY KEY,
  peer_response_id INTEGER NOT NULL REFERENCES ypo_peer_response(id) ON DELETE CASCADE,
  circle_key VARCHAR(20) NOT NULL,
  text TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT ypo_peer_feedback_unique UNIQUE (peer_response_id, circle_key)
);

CREATE INDEX IF NOT EXISTS idx_ypo_peer_feedback_response
  ON ypo_peer_feedback(peer_response_id);

-- Self feedback: one row per assessment per circle
CREATE TABLE IF NOT EXISTS ypo_self_feedback (
  id SERIAL PRIMARY KEY,
  assessment_id INTEGER NOT NULL REFERENCES ypo_assessment(id) ON DELETE CASCADE,
  circle_key VARCHAR(20) NOT NULL,
  text TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT ypo_self_feedback_unique UNIQUE (assessment_id, circle_key)
);

CREATE INDEX IF NOT EXISTS idx_ypo_self_feedback_assessment
  ON ypo_self_feedback(assessment_id);
