import { neon } from "@neondatabase/serverless";
import { calculateAverages } from "./scoring";
import type {
  AssessmentInput,
  AssessmentRecord,
  BehaviorScores,
  YpoUser,
} from "./constants";

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

export async function consumeAuthToken(
  token: string,
): Promise<{ email: string } | null> {
  const sql = getDb();
  const rows = await sql`
    UPDATE ypo_auth_tokens
    SET used_at = NOW()
    WHERE token = ${token}
      AND expires_at > NOW()
      AND used_at IS NULL
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

/* ═══ Assessments ═══ */

function mapAssessmentRow(row: Record<string, unknown>): AssessmentRecord {
  return {
    id: row.id as number,
    userId: row.user_id as number,
    type: row.type as "self" | "peer",
    targetName: (row.target_name as string) || undefined,
    scores: row.scores as BehaviorScores,
    averages: {
      joy: parseFloat(String(row.joy_avg)),
      trust: parseFloat(String(row.trust_avg)),
      power: parseFloat(String(row.power_avg)),
      partnership: parseFloat(String(row.partnership_avg)),
    },
    strength:
      row.strength_category
        ? {
            category: row.strength_category as AssessmentRecord["strength"] extends undefined ? never : NonNullable<AssessmentRecord["strength"]>["category"],
            behaviorIndex: row.strength_behavior as number,
          }
        : undefined,
    growth:
      row.growth_category
        ? {
            category: row.growth_category as AssessmentRecord["growth"] extends undefined ? never : NonNullable<AssessmentRecord["growth"]>["category"],
            behaviorIndex: row.growth_behavior as number,
          }
        : undefined,
    observation: (row.observation as string) || undefined,
    encouragement: (row.encouragement as string) || undefined,
    shareToken: (row.share_token as string) || undefined,
    viewCount: (row.view_count as number) || 0,
    createdAt: String(row.created_at),
  };
}

export async function createAssessment(
  userId: number,
  input: AssessmentInput,
): Promise<AssessmentRecord> {
  const sql = getDb();
  const averages = calculateAverages(input.scores);

  if (input.type === "self") {
    const rows = await sql`
      INSERT INTO ypo_assessments (
        user_id, type, scores,
        joy_avg, trust_avg, power_avg, partnership_avg,
        strength_category, strength_behavior,
        growth_category, growth_behavior
      ) VALUES (
        ${userId}, 'self', ${JSON.stringify(input.scores)},
        ${averages.joy}, ${averages.trust}, ${averages.power}, ${averages.partnership},
        ${input.strength.category}, ${input.strength.behaviorIndex},
        ${input.growth.category}, ${input.growth.behaviorIndex}
      )
      RETURNING *
    `;
    return mapAssessmentRow(rows[0]);
  } else {
    const shareToken = crypto.randomUUID();
    const rows = await sql`
      INSERT INTO ypo_assessments (
        user_id, type, target_name, scores,
        joy_avg, trust_avg, power_avg, partnership_avg,
        observation, encouragement, share_token
      ) VALUES (
        ${userId}, 'peer', ${input.targetName},
        ${JSON.stringify(input.scores)},
        ${averages.joy}, ${averages.trust}, ${averages.power}, ${averages.partnership},
        ${input.observation}, ${input.encouragement}, ${shareToken}
      )
      RETURNING *
    `;
    return mapAssessmentRow(rows[0]);
  }
}

export async function getUserAssessments(
  userId: number,
): Promise<AssessmentRecord[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM ypo_assessments
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
  return rows.map(mapAssessmentRow);
}

export async function getAssessmentById(
  id: number,
  userId: number,
): Promise<AssessmentRecord | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM ypo_assessments
    WHERE id = ${id} AND user_id = ${userId}
  `;
  if (rows.length === 0) return null;
  return mapAssessmentRow(rows[0]);
}

export async function getAssessmentByShareToken(
  token: string,
): Promise<AssessmentRecord | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM ypo_assessments
    WHERE share_token = ${token}
  `;
  if (rows.length === 0) return null;

  await sql`
    UPDATE ypo_assessments
    SET view_count = view_count + 1
    WHERE id = ${rows[0].id}
  `;

  return mapAssessmentRow(rows[0]);
}
