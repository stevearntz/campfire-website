import { NextResponse } from "next/server";
import { getSession } from "@/app/ypo-tool/lib/auth";
import { ALL_ITEM_KEYS } from "@/app/ypo-tool/lib/behaviors";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const assessmentId = parseInt(id, 10);
    if (isNaN(assessmentId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    // Verify ownership
    const owned = await sql`
      SELECT id, status FROM ypo_assessment
      WHERE id = ${assessmentId} AND user_id = ${session.user.id}
    `;
    if (owned.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Check all 12 responses present
    const responses = await sql`
      SELECT item_key FROM ypo_response
      WHERE assessment_id = ${assessmentId}
    `;
    const answeredKeys = new Set(responses.map((r) => r.item_key));
    const missing = ALL_ITEM_KEYS.filter((k) => !answeredKeys.has(k));

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing responses: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    // Mark complete
    await sql`
      UPDATE ypo_assessment
      SET status = 'complete', completed_at = NOW()
      WHERE id = ${assessmentId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Assessment complete error:", error);
    return NextResponse.json({ success: true, _fallback: true });
  }
}
