import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";

/**
 * POST — start a fresh assessment round.
 * Closes the member's current open round (kept as history, along with its
 * self-assessment and any peer responses collected against its link) and
 * opens a new empty round. This preserves the one-open-round-per-user
 * invariant and the historical record used for progress tracking.
 */
export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    // Close whatever round is currently open (does not delete it or its peers).
    await sql`
      UPDATE ypo_assessment
      SET closed_at = NOW()
      WHERE user_id = ${session.user.id} AND closed_at IS NULL
    `;

    const created = await sql`
      INSERT INTO ypo_assessment (user_id) VALUES (${session.user.id})
      RETURNING id, status, created_at
    `;

    return NextResponse.json({ assessment: created[0], responses: {}, feedback: {} });
  } catch (error) {
    console.error("Assessment restart error:", error);
    return NextResponse.json({
      assessment: { id: 0, status: "in_progress" },
      responses: {},
      feedback: {},
      _fallback: true,
    });
  }
}
