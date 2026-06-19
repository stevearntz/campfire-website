import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    // Find most recent assessment (in-progress or complete)
    const rows = await sql`
      SELECT id, status, created_at, completed_at
      FROM ypo_assessment
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (rows.length === 0) {
      return NextResponse.json({ assessment: null, responses: {} });
    }

    const assessment = rows[0];
    const responses = await sql`
      SELECT item_key, value FROM ypo_response
      WHERE assessment_id = ${assessment.id}
    `;

    return NextResponse.json({
      assessment,
      responses: Object.fromEntries(responses.map((r) => [r.item_key, r.value])),
    });
  } catch (error) {
    console.error("Assessment current error:", error);
    return NextResponse.json({ assessment: null, responses: {}, _fallback: true });
  }
}
