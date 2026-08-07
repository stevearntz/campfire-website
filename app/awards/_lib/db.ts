import { neon } from "@neondatabase/serverless";
import { TOTAL_AWARDS } from "../_data/awards";

/**
 * State + votes for the live Campfire Superlatives game. One global "room"
 * (a single all-hands event), no auth — just a host key on the control routes.
 * Raw-SQL / neon(POSTGRES_URL) pattern, matching the YPO + presentations tools.
 *
 * Schema is created lazily (CREATE TABLE IF NOT EXISTS) on first touch, which
 * keeps this self-contained for a one-off event — no migration step to run.
 */

function getDb() {
  const url = process.env.POSTGRES_URL;
  if (!url) throw new Error("POSTGRES_URL environment variable is not set");
  return neon(url);
}

export type Phase = "lobby" | "voting" | "closed" | "revealed" | "done";

export interface RoomState {
  currentAward: number; // 1..TOTAL_AWARDS
  phase: Phase;
}

export interface TallyRow {
  nominee: string;
  count: number;
}

export interface WinnerRow {
  awardNo: number;
  winner: string;
}

let schemaReady = false;

async function ensureSchema() {
  if (schemaReady) return;
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS award_room (
      id            INT PRIMARY KEY DEFAULT 1,
      current_award INT NOT NULL DEFAULT 1,
      phase         TEXT NOT NULL DEFAULT 'lobby',
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS award_votes (
      id         BIGSERIAL PRIMARY KEY,
      voter_key  TEXT NOT NULL,
      voter_name TEXT NOT NULL,
      award_no   INT  NOT NULL,
      nominee    TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (voter_key, award_no)
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS award_winners (
      award_no   INT PRIMARY KEY,
      winner     TEXT NOT NULL,
      decided_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    INSERT INTO award_room (id, current_award, phase)
    VALUES (1, 1, 'lobby')
    ON CONFLICT (id) DO NOTHING
  `;
  schemaReady = true;
}

function normKey(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function getRoom(): Promise<RoomState> {
  await ensureSchema();
  const sql = getDb();
  const rows = await sql`SELECT current_award, phase FROM award_room WHERE id = 1`;
  const r = rows[0];
  return { currentAward: r.current_award, phase: r.phase as Phase };
}

export async function setRoom(
  currentAward: number,
  phase: Phase,
): Promise<RoomState> {
  await ensureSchema();
  const clamped = Math.min(Math.max(currentAward, 1), TOTAL_AWARDS);
  const sql = getDb();
  const rows = await sql`
    UPDATE award_room
    SET current_award = ${clamped}, phase = ${phase}, updated_at = NOW()
    WHERE id = 1
    RETURNING current_award, phase
  `;
  const r = rows[0];
  return { currentAward: r.current_award, phase: r.phase as Phase };
}

export async function castVote(
  voterName: string,
  awardNo: number,
  nominee: string,
): Promise<void> {
  await ensureSchema();
  const sql = getDb();
  await sql`
    INSERT INTO award_votes (voter_key, voter_name, award_no, nominee, updated_at)
    VALUES (${normKey(voterName)}, ${voterName.trim()}, ${awardNo}, ${nominee}, NOW())
    ON CONFLICT (voter_key, award_no) DO UPDATE SET
      nominee = EXCLUDED.nominee,
      voter_name = EXCLUDED.voter_name,
      updated_at = NOW()
  `;
}

export async function getTally(awardNo: number): Promise<TallyRow[]> {
  await ensureSchema();
  const sql = getDb();
  const rows = await sql`
    SELECT nominee, COUNT(*)::int AS count
    FROM award_votes
    WHERE award_no = ${awardNo}
    GROUP BY nominee
    ORDER BY count DESC, nominee ASC
  `;
  return rows.map((r) => ({ nominee: r.nominee, count: r.count }));
}

export async function getMyVote(
  voterName: string,
  awardNo: number,
): Promise<string | null> {
  await ensureSchema();
  const sql = getDb();
  const rows = await sql`
    SELECT nominee FROM award_votes
    WHERE voter_key = ${normKey(voterName)} AND award_no = ${awardNo}
  `;
  return rows.length > 0 ? rows[0].nominee : null;
}

export async function getVoterCount(awardNo: number): Promise<number> {
  await ensureSchema();
  const sql = getDb();
  const rows = await sql`
    SELECT COUNT(*)::int AS count FROM award_votes WHERE award_no = ${awardNo}
  `;
  return rows[0].count;
}

export async function setWinner(
  awardNo: number,
  winner: string,
): Promise<void> {
  await ensureSchema();
  const sql = getDb();
  await sql`
    INSERT INTO award_winners (award_no, winner, decided_at)
    VALUES (${awardNo}, ${winner}, NOW())
    ON CONFLICT (award_no) DO UPDATE SET winner = EXCLUDED.winner, decided_at = NOW()
  `;
}

export async function clearWinner(awardNo: number): Promise<void> {
  await ensureSchema();
  const sql = getDb();
  await sql`DELETE FROM award_winners WHERE award_no = ${awardNo}`;
}

export async function getWinners(): Promise<WinnerRow[]> {
  await ensureSchema();
  const sql = getDb();
  const rows = await sql`
    SELECT award_no, winner FROM award_winners ORDER BY award_no ASC
  `;
  return rows.map((r) => ({ awardNo: r.award_no, winner: r.winner }));
}

/** Full reset — wipe votes + winners, return the room to the lobby. */
export async function resetGame(): Promise<void> {
  await ensureSchema();
  const sql = getDb();
  await sql`DELETE FROM award_votes`;
  await sql`DELETE FROM award_winners`;
  await sql`UPDATE award_room SET current_award = 1, phase = 'lobby', updated_at = NOW() WHERE id = 1`;
}
