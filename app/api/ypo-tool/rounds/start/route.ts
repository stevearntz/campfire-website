import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";
import { getActiveRound } from "@/app/(main)/ypo-tool/lib/rounds";

/**
 * POST — open a fresh round. One open round per user: if one is already open,
 * returns 409 (the member must close it first). Returns the new round.
 */
export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    const active = await getActiveRound(sql, session.user.id);
    if (active) {
      return NextResponse.json(
        { error: "A round is already open", code: "round_open", roundId: active.id },
        { status: 409 },
      );
    }

    const created = await sql`
      INSERT INTO ypo_assessment (user_id) VALUES (${session.user.id})
      RETURNING id, status, created_at
    `;

    return NextResponse.json({ assessment: created[0] });
  } catch (error) {
    console.error("Round start error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
