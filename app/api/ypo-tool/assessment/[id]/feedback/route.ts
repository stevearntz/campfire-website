import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";
import { CIRCLES } from "@/app/(main)/ypo-tool/lib/behaviors";

const VALID_CIRCLES = new Set(CIRCLES.map((c) => c.key));

/** Upsert one open-ended self-feedback answer for the current assessment. */
export async function PUT(
  request: Request,
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

    const body = await request.json();
    const circleKey = body.circleKey as string;
    const text = ((body.text as string) || "").slice(0, 2000);

    if (!circleKey || !VALID_CIRCLES.has(circleKey)) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    const owned = await sql`
      SELECT id FROM ypo_assessment
      WHERE id = ${assessmentId} AND user_id = ${session.user.id}
    `;
    if (owned.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await sql`
      INSERT INTO ypo_self_feedback (assessment_id, circle_key, text)
      VALUES (${assessmentId}, ${circleKey}, ${text})
      ON CONFLICT (assessment_id, circle_key)
      DO UPDATE SET text = ${text}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Self feedback upsert error:", error);
    return NextResponse.json({ success: true, _fallback: true });
  }
}
