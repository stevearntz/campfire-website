-- YPO Activating Behaviors Assessment Tool — Database Schema
-- Run via Neon dashboard or psql CLI
-- All tables prefixed ypo_ to avoid conflicts

-- 1. Users
CREATE TABLE ypo_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(254) UNIQUE NOT NULL,
  name VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT ypo_users_email_domain CHECK (email LIKE '%@ypo.org' OR email LIKE '%@getcampfire.com')
);

CREATE INDEX idx_ypo_users_email ON ypo_users(email);

-- 2. Magic link tokens
CREATE TABLE ypo_auth_tokens (
  id SERIAL PRIMARY KEY,
  token VARCHAR(36) UNIQUE NOT NULL,
  email VARCHAR(254) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ypo_auth_tokens_token ON ypo_auth_tokens(token);
CREATE INDEX idx_ypo_auth_tokens_email ON ypo_auth_tokens(email);

-- 3. Sessions
CREATE TABLE ypo_sessions (
  id SERIAL PRIMARY KEY,
  session_token VARCHAR(64) UNIQUE NOT NULL,
  user_id INTEGER NOT NULL REFERENCES ypo_users(id) ON DELETE CASCADE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ypo_sessions_token ON ypo_sessions(session_token);
CREATE INDEX idx_ypo_sessions_user_id ON ypo_sessions(user_id);

-- 4. Assessments
CREATE TABLE ypo_assessments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES ypo_users(id) ON DELETE CASCADE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('self', 'peer')),

  -- Peer target
  target_name VARCHAR(200),

  -- Scores: { joy: [1-6, 1-6, 1-6], trust: [...], power: [...], partnership: [...] }
  scores JSONB NOT NULL,

  -- Precomputed category averages
  joy_avg DECIMAL(3,2),
  trust_avg DECIMAL(3,2),
  power_avg DECIMAL(3,2),
  partnership_avg DECIMAL(3,2),

  -- Self-assessment picks
  strength_category VARCHAR(20),
  strength_behavior INTEGER CHECK (strength_behavior BETWEEN 0 AND 2),
  growth_category VARCHAR(20),
  growth_behavior INTEGER CHECK (growth_behavior BETWEEN 0 AND 2),

  -- Peer feedback
  observation TEXT,
  encouragement TEXT,

  -- Sharing
  share_token VARCHAR(36) UNIQUE,
  view_count INTEGER DEFAULT 0,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ypo_assessments_user_id ON ypo_assessments(user_id);
CREATE INDEX idx_ypo_assessments_share_token ON ypo_assessments(share_token);
CREATE INDEX idx_ypo_assessments_type ON ypo_assessments(type);

-- 5. Rate limits
CREATE TABLE ypo_rate_limits (
  id SERIAL PRIMARY KEY,
  identifier VARCHAR(254) NOT NULL,
  action VARCHAR(50) NOT NULL,
  count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT ypo_rate_limits_unique UNIQUE (identifier, action)
);

CREATE INDEX idx_ypo_rate_limits_lookup ON ypo_rate_limits(identifier, action);

-- 6. Assessment (normalized, per Design increment 3)
CREATE TABLE ypo_assessment (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES ypo_users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'complete')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_ypo_assessment_user_id ON ypo_assessment(user_id);
CREATE INDEX idx_ypo_assessment_status ON ypo_assessment(user_id, status);

-- 7. Individual responses (one row per answered item)
CREATE TABLE ypo_response (
  id SERIAL PRIMARY KEY,
  assessment_id INTEGER NOT NULL REFERENCES ypo_assessment(id) ON DELETE CASCADE,
  item_key VARCHAR(20) NOT NULL,
  value INTEGER NOT NULL CHECK (value BETWEEN 1 AND 6),
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT ypo_response_unique UNIQUE (assessment_id, item_key)
);

CREATE INDEX idx_ypo_response_assessment ON ypo_response(assessment_id);

-- 8. Peer invite (one active link per member)
CREATE TABLE ypo_peer_invite (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES ypo_users(id) ON DELETE CASCADE,
  token VARCHAR(20) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_ypo_peer_invite_user ON ypo_peer_invite(user_id);
CREATE INDEX idx_ypo_peer_invite_token ON ypo_peer_invite(token);

-- 9. Peer response (one row per rater)
CREATE TABLE ypo_peer_response (
  id SERIAL PRIMARY KEY,
  invite_id INTEGER NOT NULL REFERENCES ypo_peer_invite(id) ON DELETE CASCADE,
  rater_name VARCHAR(200),
  rater_email VARCHAR(254),
  status VARCHAR(20) NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'complete')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_ypo_peer_response_invite ON ypo_peer_response(invite_id);

-- 10. Peer answers (one row per item per rater)
CREATE TABLE ypo_peer_answer (
  id SERIAL PRIMARY KEY,
  peer_response_id INTEGER NOT NULL REFERENCES ypo_peer_response(id) ON DELETE CASCADE,
  item_key VARCHAR(20) NOT NULL,
  value INTEGER NOT NULL CHECK (value BETWEEN 1 AND 6),
  CONSTRAINT ypo_peer_answer_unique UNIQUE (peer_response_id, item_key)
);

CREATE INDEX idx_ypo_peer_answer_response ON ypo_peer_answer(peer_response_id);
