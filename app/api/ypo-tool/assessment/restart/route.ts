import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";

/**
 * POST — start a clean retake.
 * Behavior (by request): latest attempt wins, and prior INCOMPLETE attempts
 * are cleared. Completed attempts are kept as history. This deletes any
 * in-progress assessments (cascade clears their responses + self-feedback),
 * then creates one fresh in-progress assessment.
 */
export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    // Clear prior incomplete attempts (responses + feedback cascade on delete).
    await sql`
      DELETE FROM ypo_assessment
      WHERE user_id = ${session.user.id} AND status = 'in_progress'
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
