import { neon } from "@neondatabase/serverless";
import type { YpoUser } from "./constants";

function getDb() {
  const url = process.env.POSTGRES_URL;
  if (!url) throw new Error("POSTGRES_URL environment variable is not set");
  return neon(url);
}

/* ═══ Users ═══ */

export async function upsertUser(email: string): Promise<YpoUser> {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO ypo_users (email)
    VALUES (${email.toLowerCase()})
    ON CONFLICT (email) DO UPDATE SET last_login_at = NOW()
    RETURNING id, email, name
  `;
  const row = rows[0];
  return { id: row.id, email: row.email, name: row.name };
}

export async function getUserById(id: number): Promise<YpoUser | null> {
  const sql = getDb();
  const rows = await sql`SELECT id, email, name FROM ypo_users WHERE id = ${id}`;
  if (rows.length === 0) return null;
  return { id: rows[0].id, email: rows[0].email, name: rows[0].name };
}

export async function updateUserName(
  id: number,
  name: string,
): Promise<YpoUser | null> {
  const sql = getDb();
  const rows = await sql`
    UPDATE ypo_users SET name = ${name} WHERE id = ${id}
    RETURNING id, email, name
  `;
  if (rows.length === 0) return null;
  return { id: rows[0].id, email: rows[0].email, name: rows[0].name };
}

/* ═══ Auth Tokens ═══ */

export async function createAuthToken(email: string): Promise<string> {
  const sql = getDb();
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  await sql`
    INSERT INTO ypo_auth_tokens (token, email, expires_at)
    VALUES (${token}, ${email.toLowerCase()}, ${expiresAt.toISOString()})
  `;
  return token;
}

// Multi-use until expiry: any valid, unexpired token validates — even if it
// was already touched. This tolerates corporate email link-scanners that
// pre-fetch the magic link (a GET) before the human clicks; a single-use
// token would otherwise be burned by the scanner and lock the user out.
// We still stamp first-touch time for auditing, but never block on it.
export async function validateAuthToken(
  token: string,
): Promise<{ email: string } | null> {
  const sql = getDb();
  const rows = await sql`
    UPDATE ypo_auth_tokens
    SET used_at = COALESCE(used_at, NOW())
    WHERE token = ${token}
      AND expires_at > NOW()
    RETURNING email
  `;
  if (rows.length === 0) return null;
  return { email: rows[0].email };
}

/* ═══ Sessions ═══ */

export async function createSessionRecord(userId: number): Promise<string> {
  const sql = getDb();
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const sessionToken = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  await sql`
    INSERT INTO ypo_sessions (session_token, user_id, expires_at)
    VALUES (${sessionToken}, ${userId}, ${expiresAt.toISOString()})
  `;
  return sessionToken;
}

export async function getSessionByToken(
  sessionToken: string,
): Promise<{ userId: number; expiresAt: string } | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT user_id, expires_at
    FROM ypo_sessions
    WHERE session_token = ${sessionToken}
      AND expires_at > NOW()
  `;
  if (rows.length === 0) return null;
  // Update last activity
  await sql`
    UPDATE ypo_sessions SET last_activity_at = NOW()
    WHERE session_token = ${sessionToken}
  `;
  return {
    userId: rows[0].user_id,
    expiresAt: rows[0].expires_at,
  };
}

export async function deleteSession(sessionToken: string): Promise<void> {
  const sql = getDb();
  await sql`DELETE FROM ypo_sessions WHERE session_token = ${sessionToken}`;
}

/* ═══ Rate Limits ═══ */

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

  // Clean old entries
  await sql`
    DELETE FROM ypo_rate_limits
    WHERE window_start < ${windowStart}
  `;

  const rows = await sql`
    SELECT count, window_start
    FROM ypo_rate_limits
    WHERE identifier = ${identifier} AND action = ${action}
  `;

  if (rows.length === 0) {
    await sql`
      INSERT INTO ypo_rate_limits (identifier, action, count)
      VALUES (${identifier}, ${action}, 1)
    `;
    return { allowed: true };
  }

  const { count, window_start } = rows[0];
  if (count >= maxAttempts) {
    const windowEnd = new Date(
      new Date(window_start).getTime() + windowMinutes * 60 * 1000,
    );
    const retryAfterSeconds = Math.ceil(
      (windowEnd.getTime() - Date.now()) / 1000,
    );
    return { allowed: false, retryAfterSeconds: Math.max(retryAfterSeconds, 1) };
  }

  await sql`
    UPDATE ypo_rate_limits
    SET count = count + 1
    WHERE identifier = ${identifier} AND action = ${action}
  `;
  return { allowed: true };
}

/* ═══ Legacy JSONB assessments (ypo_assessments) removed ═══
   The live self-assessment flow uses the normalized ypo_assessment /
   ypo_response tables, queried directly in the route handlers. The old
   JSONB path (createAssessment/getUserAssessments/getAssessmentById/
   getAssessmentByShareToken + the scoring helpers) had no live callers
   and was deleted. See git history if it ever needs to come back. */

