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
  CONSTRAINT ypo_users_email_domain CHECK (email LIKE '%@ypo.org')
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
