import { neon } from "@neondatabase/serverless";

/**
 * Learner-data access for the presentations course. Course content lives in
 * code (_data/course.ts); this only touches per-learner rows in Neon.
 * Follows the YPO tool's raw-SQL pattern (app/(main)/ypo-tool/lib/db.ts).
 */
function getDb() {
  const url = process.env.POSTGRES_URL;
  if (!url) throw new Error("POSTGRES_URL environment variable is not set");
  return neon(url);
}

/* ═══ Types ═══ */

export type Role = "learner" | "coach" | "admin";

export interface PresUser {
  id: number;
  email: string;
  name: string | null;
  role: Role;
}

export interface Enrollment {
  id: number;
  userId: number;
  coachName: string | null;
  startedAt: string;
  completedAt: string | null;
}

export type ProgressState = "not_started" | "in_progress" | "done";

export interface ProgressRow {
  lessonKey: string;
  state: ProgressState;
  completedAt: string | null;
}

export interface Presentation {
  id: number;
  title: string | null;
  mode: string | null;
  spine: string | null;
  audience: string | null;
  durationMin: number | null;
  source: "own" | "case_study";
}

export interface Slide {
  id: number;
  position: number;
  beat: string | null;
  actionTitle: string | null;
  speakerNote: string | null;
  supportNote: string | null;
  visualKind: string | null;
  visualData: unknown;
}

export type WorksheetStatus = "draft" | "submitted" | "reviewed";

export interface Worksheet {
  moduleSlug: string;
  data: Record<string, unknown>;
  status: WorksheetStatus;
  submittedAt: string | null;
  updatedAt: string;
}

export interface QuizAttempt {
  lessonKey: string;
  answers: Record<string, number>;
  score: number | null;
}

export interface JournalEntry {
  id: number;
  moduleSlug: string | null;
  body: string;
  sharedWithCoach: boolean;
  createdAt: string;
}

/* ═══ Users & enrollment (stubbed sign-in for now) ═══ */

export async function ensureUser(
  email: string,
  name: string | null,
  role: Role = "learner",
): Promise<PresUser> {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO pres_users (email, name, role, last_seen_at)
    VALUES (${email.toLowerCase()}, ${name}, ${role}, NOW())
    ON CONFLICT (email) DO UPDATE SET
      last_seen_at = NOW(),
      role = ${role},
      name = COALESCE(pres_users.name, EXCLUDED.name)
    RETURNING id, email, name, role
  `;
  const r = rows[0];
  return { id: r.id, email: r.email, name: r.name, role: r.role as Role };
}

export async function ensureEnrollment(
  userId: number,
  coachName: string | null,
): Promise<Enrollment> {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO pres_enrollments (user_id, coach_name)
    VALUES (${userId}, ${coachName})
    ON CONFLICT (user_id) DO UPDATE SET user_id = EXCLUDED.user_id
    RETURNING id, user_id, coach_name, started_at, completed_at
  `;
  const r = rows[0];
  return {
    id: r.id,
    userId: r.user_id,
    coachName: r.coach_name,
    startedAt: String(r.started_at),
    completedAt: r.completed_at ? String(r.completed_at) : null,
  };
}

export async function getUserById(id: number): Promise<PresUser | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, email, name, role FROM pres_users WHERE id = ${id}
  `;
  if (rows.length === 0) return null;
  const r = rows[0];
  return { id: r.id, email: r.email, name: r.name, role: r.role as Role };
}

/* ═══ Auth: allowlist, tokens, sessions, rate limits (YPO pattern) ═══ */

export async function isAllowlisted(
  email: string,
): Promise<{ role: Role; name: string | null } | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT role, name FROM pres_allowed_emails
    WHERE email = ${email.trim().toLowerCase()} AND revoked_at IS NULL
  `;
  if (rows.length === 0) return null;
  return { role: rows[0].role as Role, name: rows[0].name };
}

export async function createAuthToken(email: string): Promise<string> {
  const sql = getDb();
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  await sql`
    INSERT INTO pres_auth_tokens (token, email, expires_at)
    VALUES (${token}, ${email.trim().toLowerCase()}, ${expiresAt})
  `;
  return token;
}

// Multi-use until expiry: tolerates corporate link-scanners that pre-fetch the
// magic link (a GET) before the human clicks. Stamps first-touch for audit.
export async function validateAuthToken(
  token: string,
): Promise<{ email: string } | null> {
  const sql = getDb();
  const rows = await sql`
    UPDATE pres_auth_tokens
    SET used_at = COALESCE(used_at, NOW())
    WHERE token = ${token} AND expires_at > NOW()
    RETURNING email
  `;
  return rows.length > 0 ? { email: rows[0].email } : null;
}

export async function createSessionRecord(userId: number): Promise<string> {
  const sql = getDb();
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const sessionToken = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const expiresAt = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000,
  ).toISOString();
  await sql`
    INSERT INTO pres_sessions (session_token, user_id, expires_at)
    VALUES (${sessionToken}, ${userId}, ${expiresAt})
  `;
  return sessionToken;
}

export async function getSessionByToken(
  sessionToken: string,
): Promise<{ userId: number } | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT user_id FROM pres_sessions
    WHERE session_token = ${sessionToken} AND expires_at > NOW()
  `;
  if (rows.length === 0) return null;
  await sql`
    UPDATE pres_sessions SET last_activity_at = NOW()
    WHERE session_token = ${sessionToken}
  `;
  return { userId: rows[0].user_id };
}

export async function deleteSession(sessionToken: string): Promise<void> {
  const sql = getDb();
  await sql`DELETE FROM pres_sessions WHERE session_token = ${sessionToken}`;
}

export async function checkRateLimit(
  identifier: string,
  action: string,
  maxAttempts: number,
  windowMinutes: number,
): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
  const sql = getDb();
  const windowStart = new Date(
    Date.now() - windowMinutes * 60 * 1000,
  ).toISOString();
  await sql`DELETE FROM pres_rate_limits WHERE window_start < ${windowStart}`;
  const rows = await sql`
    SELECT count, window_start FROM pres_rate_limits
    WHERE identifier = ${identifier} AND action = ${action}
  `;
  if (rows.length === 0) {
    await sql`
      INSERT INTO pres_rate_limits (identifier, action, count)
      VALUES (${identifier}, ${action}, 1)
    `;
    return { allowed: true };
  }
  const { count, window_start } = rows[0];
  if (count >= maxAttempts) {
    const windowEnd = new Date(
      new Date(window_start).getTime() + windowMinutes * 60 * 1000,
    );
    const retryAfterSeconds = Math.max(
      Math.ceil((windowEnd.getTime() - Date.now()) / 1000),
      1,
    );
    return { allowed: false, retryAfterSeconds };
  }
  await sql`
    UPDATE pres_rate_limits SET count = count + 1
    WHERE identifier = ${identifier} AND action = ${action}
  `;
  return { allowed: true };
}

/* ═══ Reads (return empty/null for a fresh learner) ═══ */

export async function getProgress(
  enrollmentId: number,
): Promise<ProgressRow[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT lesson_key, state, completed_at
    FROM pres_progress
    WHERE enrollment_id = ${enrollmentId}
  `;
  return rows.map((r) => ({
    lessonKey: r.lesson_key,
    state: r.state as ProgressState,
    completedAt: r.completed_at ? String(r.completed_at) : null,
  }));
}

export async function getPresentation(
  enrollmentId: number,
): Promise<Presentation | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, title, mode, spine, audience, duration_min, source
    FROM pres_presentations
    WHERE enrollment_id = ${enrollmentId}
    ORDER BY created_at DESC
    LIMIT 1
  `;
  if (rows.length === 0) return null;
  const r = rows[0];
  return {
    id: r.id,
    title: r.title,
    mode: r.mode,
    spine: r.spine,
    audience: r.audience,
    durationMin: r.duration_min,
    source: r.source as "own" | "case_study",
  };
}

export async function getSlides(presentationId: number): Promise<Slide[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, position, beat, action_title, speaker_note, support_note, visual_kind, visual_data
    FROM pres_slides
    WHERE presentation_id = ${presentationId}
    ORDER BY position ASC
  `;
  return rows.map((r) => ({
    id: r.id,
    position: r.position,
    beat: r.beat,
    actionTitle: r.action_title,
    speakerNote: r.speaker_note,
    supportNote: r.support_note,
    visualKind: r.visual_kind,
    visualData: r.visual_data,
  }));
}

export async function getWorksheet(
  enrollmentId: number,
  moduleSlug: string,
): Promise<Worksheet | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT module_slug, data, status, submitted_at, updated_at
    FROM pres_worksheets
    WHERE enrollment_id = ${enrollmentId} AND module_slug = ${moduleSlug}
  `;
  if (rows.length === 0) return null;
  const r = rows[0];
  return {
    moduleSlug: r.module_slug,
    data: r.data,
    status: r.status as WorksheetStatus,
    submittedAt: r.submitted_at ? String(r.submitted_at) : null,
    updatedAt: String(r.updated_at),
  };
}

export async function getWorksheets(
  enrollmentId: number,
): Promise<Worksheet[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT module_slug, data, status, submitted_at, updated_at
    FROM pres_worksheets
    WHERE enrollment_id = ${enrollmentId}
  `;
  return rows.map((r) => ({
    moduleSlug: r.module_slug,
    data: r.data,
    status: r.status as WorksheetStatus,
    submittedAt: r.submitted_at ? String(r.submitted_at) : null,
    updatedAt: String(r.updated_at),
  }));
}

export async function getQuizAttempt(
  enrollmentId: number,
  lessonKey: string,
): Promise<QuizAttempt | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT lesson_key, answers, score
    FROM pres_quiz_attempts
    WHERE enrollment_id = ${enrollmentId} AND lesson_key = ${lessonKey}
  `;
  if (rows.length === 0) return null;
  const r = rows[0];
  return { lessonKey: r.lesson_key, answers: r.answers, score: r.score };
}

export async function getJournalEntries(
  enrollmentId: number,
): Promise<JournalEntry[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, module_slug, body, shared_with_coach, created_at
    FROM pres_journal_entries
    WHERE enrollment_id = ${enrollmentId}
    ORDER BY created_at DESC
  `;
  return rows.map((r) => ({
    id: r.id,
    moduleSlug: r.module_slug,
    body: r.body,
    sharedWithCoach: r.shared_with_coach,
    createdAt: String(r.created_at),
  }));
}

export async function getModuleJournal(
  enrollmentId: number,
  moduleSlug: string,
): Promise<string> {
  const sql = getDb();
  const rows = await sql`
    SELECT body FROM pres_journal_entries
    WHERE enrollment_id = ${enrollmentId} AND module_slug = ${moduleSlug}
    ORDER BY updated_at DESC
    LIMIT 1
  `;
  return rows.length > 0 ? rows[0].body : "";
}

/* ═══ Writes ═══ */

export async function upsertWorksheet(
  enrollmentId: number,
  moduleSlug: string,
  data: Record<string, unknown>,
  submit: boolean,
): Promise<void> {
  const sql = getDb();
  const status = submit ? "submitted" : "draft";
  await sql`
    INSERT INTO pres_worksheets (enrollment_id, module_slug, data, status, submitted_at, updated_at)
    VALUES (
      ${enrollmentId}, ${moduleSlug}, ${JSON.stringify(data)}, ${status},
      ${submit ? new Date().toISOString() : null}, NOW()
    )
    ON CONFLICT (enrollment_id, module_slug) DO UPDATE SET
      data = EXCLUDED.data,
      status = EXCLUDED.status,
      submitted_at = COALESCE(EXCLUDED.submitted_at, pres_worksheets.submitted_at),
      updated_at = NOW()
  `;
}

export async function upsertQuizAttempt(
  enrollmentId: number,
  lessonKey: string,
  answers: Record<string, number>,
  score: number,
): Promise<void> {
  const sql = getDb();
  await sql`
    INSERT INTO pres_quiz_attempts (enrollment_id, lesson_key, answers, score, attempted_at)
    VALUES (${enrollmentId}, ${lessonKey}, ${JSON.stringify(answers)}, ${score}, NOW())
    ON CONFLICT (enrollment_id, lesson_key) DO UPDATE SET
      answers = EXCLUDED.answers,
      score = EXCLUDED.score,
      attempted_at = NOW()
  `;
}

export async function saveModuleJournal(
  enrollmentId: number,
  moduleSlug: string,
  body: string,
): Promise<void> {
  const sql = getDb();
  const updated = await sql`
    UPDATE pres_journal_entries
    SET body = ${body}, updated_at = NOW()
    WHERE enrollment_id = ${enrollmentId} AND module_slug = ${moduleSlug}
    RETURNING id
  `;
  if (updated.length === 0) {
    await sql`
      INSERT INTO pres_journal_entries (enrollment_id, module_slug, body)
      VALUES (${enrollmentId}, ${moduleSlug}, ${body})
    `;
  }
}

export async function setProgress(
  enrollmentId: number,
  lessonKey: string,
  state: ProgressState,
): Promise<void> {
  const sql = getDb();
  const completedAt = state === "done" ? new Date().toISOString() : null;
  await sql`
    INSERT INTO pres_progress (enrollment_id, lesson_key, state, completed_at, updated_at)
    VALUES (${enrollmentId}, ${lessonKey}, ${state}, ${completedAt}, NOW())
    ON CONFLICT (enrollment_id, lesson_key) DO UPDATE SET
      state = EXCLUDED.state,
      completed_at = EXCLUDED.completed_at,
      updated_at = NOW()
  `;
}

export async function createPresentation(
  enrollmentId: number,
  fields: {
    title: string | null;
    mode: string | null;
    spine: string | null;
    audience: string | null;
    durationMin: number | null;
    source: "own" | "case_study";
  },
): Promise<Presentation> {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO pres_presentations (enrollment_id, title, mode, spine, audience, duration_min, source)
    VALUES (
      ${enrollmentId}, ${fields.title}, ${fields.mode}, ${fields.spine},
      ${fields.audience}, ${fields.durationMin}, ${fields.source}
    )
    RETURNING id, title, mode, spine, audience, duration_min, source
  `;
  const r = rows[0];
  return {
    id: r.id,
    title: r.title,
    mode: r.mode,
    spine: r.spine,
    audience: r.audience,
    durationMin: r.duration_min,
    source: r.source as "own" | "case_study",
  };
}

export async function insertSlides(
  presentationId: number,
  slides: {
    position: number;
    beat: string | null;
    actionTitle: string | null;
    speakerNote: string | null;
    supportNote: string | null;
  }[],
): Promise<void> {
  const sql = getDb();
  for (const s of slides) {
    await sql`
      INSERT INTO pres_slides (presentation_id, position, beat, action_title, speaker_note, support_note)
      VALUES (${presentationId}, ${s.position}, ${s.beat}, ${s.actionTitle}, ${s.speakerNote}, ${s.supportNote})
    `;
  }
}

export async function updateSlideById(
  slideId: number,
  fields: { actionTitle: string; speakerNote: string },
): Promise<void> {
  const sql = getDb();
  await sql`
    UPDATE pres_slides
    SET action_title = ${fields.actionTitle}, speaker_note = ${fields.speakerNote}, updated_at = NOW()
    WHERE id = ${slideId}
  `;
}

/** Ownership guard: does this presentation belong to this enrollment? */
export async function presentationOwnedBy(
  presentationId: number,
  enrollmentId: number,
): Promise<boolean> {
  const sql = getDb();
  const rows = await sql`
    SELECT 1 FROM pres_presentations
    WHERE id = ${presentationId} AND enrollment_id = ${enrollmentId}
  `;
  return rows.length > 0;
}
