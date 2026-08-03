import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";

/**
 * POST — close the member's open round. Its link stops collecting peers and
 * the round moves to history (its self-assessment and peer responses are kept).
 * Does NOT open a new round — the member starts one explicitly. 409 if nothing
 * is open.
 */
export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    const closed = await sql`
      UPDATE ypo_assessment
      SET closed_at = NOW()
      WHERE user_id = ${session.user.id} AND closed_at IS NULL
      RETURNING id
    `;

    if (closed.length === 0) {
      return NextResponse.json(
        { error: "No open round to close", code: "no_open_round" },
        { status: 409 },
      );
    }

    return NextResponse.json({ closedRoundId: closed[0].id });
  } catch (error) {
    console.error("Round close error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
