import type { NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Assessment-round helpers.
 *
 * A "round" is a `ypo_assessment` row. It is OPEN while `closed_at IS NULL`
 * (its invite link still collects peers) and CLOSED once set. At most one open
 * round per user (enforced by idx_ypo_assessment_one_open). Each round owns one
 * invite link (idx_ypo_peer_invite_assessment).
 */
export type Sql = NeonQueryFunction<false, false>;

export interface RoundRow {
  id: number;
  status: "in_progress" | "complete";
  title: string | null;
  created_at: string;
  completed_at: string | null;
  closed_at: string | null;
}

/** The user's currently-open round (closed_at IS NULL), or null. */
export async function getActiveRound(sql: Sql, userId: number): Promise<RoundRow | null> {
  const rows = (await sql`
    SELECT id, status, title, created_at, completed_at, closed_at
    FROM ypo_assessment
    WHERE user_id = ${userId} AND closed_at IS NULL
    ORDER BY created_at DESC
    LIMIT 1
  `) as RoundRow[];
  return rows[0] ?? null;
}

/**
 * The round to READ for results/comparison: the open round if any, else the
 * most recently closed. Null if the user has no rounds at all.
 */
export async function getCurrentRound(sql: Sql, userId: number): Promise<RoundRow | null> {
  const rows = (await sql`
    SELECT id, status, title, created_at, completed_at, closed_at
    FROM ypo_assessment
    WHERE user_id = ${userId}
    ORDER BY (closed_at IS NULL) DESC, created_at DESC
    LIMIT 1
  `) as RoundRow[];
  return rows[0] ?? null;
}

/** A specific round, but only if it belongs to the given user (else null). */
export async function getRoundById(
  sql: Sql,
  userId: number,
  roundId: number,
): Promise<RoundRow | null> {
  const rows = (await sql`
    SELECT id, status, title, created_at, completed_at, closed_at
    FROM ypo_assessment
    WHERE id = ${roundId} AND user_id = ${userId}
    LIMIT 1
  `) as RoundRow[];
  return rows[0] ?? null;
}

/**
 * Resolve the round a member is asking to view: an explicit, owned `roundId`
 * if given and valid, otherwise their current round. Null if neither exists.
 */
export async function resolveRound(
  sql: Sql,
  userId: number,
  roundId?: number | null,
): Promise<RoundRow | null> {
  if (roundId) {
    const owned = await getRoundById(sql, userId, roundId);
    if (owned) return owned;
  }
  return getCurrentRound(sql, userId);
}

/** The invite row for a specific round, or null if not minted yet. */
export async function getRoundInvite(
  sql: Sql,
  assessmentId: number,
): Promise<{ id: number; token: string } | null> {
  const rows = (await sql`
    SELECT id, token FROM ypo_peer_invite
    WHERE assessment_id = ${assessmentId}
    LIMIT 1
  `) as { id: number; token: string }[];
  return rows[0] ?? null;
}

export interface InviteByToken {
  id: number;
  userId: number;
  name: string | null;
  email: string;
  /** True when the round this invite belongs to has been closed to peers. */
  closed: boolean;
}

/** Resolve an invite by its public token, including its round's closed state. */
export async function getInviteByToken(
  sql: Sql,
  token: string,
): Promise<InviteByToken | null> {
  const rows = (await sql`
    SELECT pi.id, pi.user_id, u.name, u.email, a.closed_at
    FROM ypo_peer_invite pi
    JOIN ypo_users u ON u.id = pi.user_id
    JOIN ypo_assessment a ON a.id = pi.assessment_id
    WHERE pi.token = ${token}
    LIMIT 1
  `) as {
    id: number;
    user_id: number;
    name: string | null;
    email: string;
    closed_at: string | null;
  }[];
  const r = rows[0];
  if (!r) return null;
  return { id: r.id, userId: r.user_id, name: r.name, email: r.email, closed: r.closed_at != null };
}
