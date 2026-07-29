-- "Tell It So It Moves" presentations course — LEARNER-DATA schema.
--
-- Course CONTENT (modules, lessons, quiz, templates, rubric, coaching
-- curriculum, the sample deck) lives in code at _data/course.ts. This
-- database holds ONLY per-learner data, so a brand-new learner simply has
-- no rows here — that absence IS the empty state.
--
-- All tables prefixed `pres_` to coexist with the ypo_* tables in the same
-- Neon database. Everything is additive and idempotent (CREATE ... IF NOT
-- EXISTS), so re-running is safe. Apply via the Neon dashboard/psql, or:
--   node app/(presentations)/_lib/apply-schema.mjs
--
-- Slice 1 (this file) covers the six screens' core data. Takes / analyses /
-- comments / rubric scores / coaching sessions (rehearsal "circle" + coach)
-- land in a later migration.

-- 1. Learners. Magic-link auth + allowlist arrive in a later slice; until
--    then a stubbed dev learner is used (see _lib/learner.ts).
CREATE TABLE IF NOT EXISTS pres_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(254) UNIQUE NOT NULL,
  name VARCHAR(200),
  role VARCHAR(20) NOT NULL DEFAULT 'learner' CHECK (role IN ('learner', 'coach', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_pres_users_email ON pres_users(email);

-- 2. Enrollment — one per learner (single course for now).
CREATE TABLE IF NOT EXISTS pres_enrollments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES pres_users(id) ON DELETE CASCADE,
  coach_name VARCHAR(200),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_pres_enrollments_user ON pres_enrollments(user_id);

-- 3. Per-lesson progress. lesson_key references a content-defined lesson
--    (e.g. "01" for a module, or "01:worksheet"); the meaning lives in code.
CREATE TABLE IF NOT EXISTS pres_progress (
  id SERIAL PRIMARY KEY,
  enrollment_id INTEGER NOT NULL REFERENCES pres_enrollments(id) ON DELETE CASCADE,
  lesson_key VARCHAR(60) NOT NULL,
  state VARCHAR(20) NOT NULL DEFAULT 'not_started' CHECK (state IN ('not_started', 'in_progress', 'done')),
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT pres_progress_unique UNIQUE (enrollment_id, lesson_key)
);
CREATE INDEX IF NOT EXISTS idx_pres_progress_enrollment ON pres_progress(enrollment_id);

-- 4. The learner's real presentation (their deck).
CREATE TABLE IF NOT EXISTS pres_presentations (
  id SERIAL PRIMARY KEY,
  enrollment_id INTEGER NOT NULL REFERENCES pres_enrollments(id) ON DELETE CASCADE,
  title TEXT,
  mode VARCHAR(30),
  spine VARCHAR(30),
  audience TEXT,
  duration_min INTEGER,
  source VARCHAR(20) NOT NULL DEFAULT 'own' CHECK (source IN ('own', 'case_study')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pres_presentations_enrollment ON pres_presentations(enrollment_id);

-- 5. Slides within a presentation.
CREATE TABLE IF NOT EXISTS pres_slides (
  id SERIAL PRIMARY KEY,
  presentation_id INTEGER NOT NULL REFERENCES pres_presentations(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  beat VARCHAR(30),
  action_title TEXT,
  speaker_note TEXT,
  support_note TEXT,
  visual_kind VARCHAR(30),
  visual_data JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pres_slides_presentation ON pres_slides(presentation_id);

-- 6. Worksheets — one per module (DO / THINK / FEEL / evidence + mode).
CREATE TABLE IF NOT EXISTS pres_worksheets (
  id SERIAL PRIMARY KEY,
  enrollment_id INTEGER NOT NULL REFERENCES pres_enrollments(id) ON DELETE CASCADE,
  module_slug VARCHAR(20) NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'reviewed')),
  submitted_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT pres_worksheets_unique UNIQUE (enrollment_id, module_slug)
);
CREATE INDEX IF NOT EXISTS idx_pres_worksheets_enrollment ON pres_worksheets(enrollment_id);

-- 7. Quiz attempts — one per module knowledge check.
CREATE TABLE IF NOT EXISTS pres_quiz_attempts (
  id SERIAL PRIMARY KEY,
  enrollment_id INTEGER NOT NULL REFERENCES pres_enrollments(id) ON DELETE CASCADE,
  lesson_key VARCHAR(60) NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  score INTEGER,
  attempted_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT pres_quiz_attempts_unique UNIQUE (enrollment_id, lesson_key)
);
CREATE INDEX IF NOT EXISTS idx_pres_quiz_attempts_enrollment ON pres_quiz_attempts(enrollment_id);

-- 8. Journal entries. Private by default; shared with coach on request.
CREATE TABLE IF NOT EXISTS pres_journal_entries (
  id SERIAL PRIMARY KEY,
  enrollment_id INTEGER NOT NULL REFERENCES pres_enrollments(id) ON DELETE CASCADE,
  module_slug VARCHAR(20),
  body TEXT NOT NULL DEFAULT '',
  shared_with_coach BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pres_journal_enrollment ON pres_journal_entries(enrollment_id);
