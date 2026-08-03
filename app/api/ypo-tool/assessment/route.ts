import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";
import { ALL_ITEM_KEYS } from "@/app/(main)/ypo-tool/lib/behaviors";

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Dynamic import to avoid crash when DB not configured
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    // Return the member's OPEN round (any status) or create a fresh one.
    // Scoping to closed_at IS NULL keeps us within the one-open-round-per-user
    // constraint and lets a member resume an in-progress round.
    const existing = await sql`
      SELECT id, status, created_at, completed_at
      FROM ypo_assessment
      WHERE user_id = ${session.user.id} AND closed_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (existing.length > 0) {
      const responses = await sql`
        SELECT item_key, value FROM ypo_response
        WHERE assessment_id = ${existing[0].id}
      `;
      let feedback: Record<string, string> = {};
      try {
        const fb = await sql`
          SELECT circle_key, text FROM ypo_self_feedback
          WHERE assessment_id = ${existing[0].id}
        `;
        feedback = Object.fromEntries(fb.map((f) => [f.circle_key, f.text]));
      } catch {
        feedback = {};
      }
      return NextResponse.json({
        assessment: existing[0],
        responses: Object.fromEntries(responses.map((r) => [r.item_key, r.value])),
        feedback,
      });
    }

    // Create new
    const created = await sql`
      INSERT INTO ypo_assessment (user_id) VALUES (${session.user.id})
      RETURNING id, status, created_at
    `;

    return NextResponse.json({
      assessment: created[0],
      responses: {},
    });
  } catch (error) {
    console.error("Assessment create error:", error);
    // Return a stub so the client can work without DB
    return NextResponse.json({
      assessment: { id: 0, status: "in_progress" },
      responses: {},
      _fallback: true,
    });
  }
}

// Alias: GET returns the same as POST (find or create)
export { POST as GET };

// Export valid item keys for validation
export const VALID_KEYS = new Set(ALL_ITEM_KEYS);
