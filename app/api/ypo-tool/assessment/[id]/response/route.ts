import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";
import { ALL_ITEM_KEYS } from "@/app/(main)/ypo-tool/lib/behaviors";

const VALID_KEYS = new Set(ALL_ITEM_KEYS);

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
    const { itemKey, value } = body;

    if (!itemKey || !VALID_KEYS.has(itemKey)) {
      return NextResponse.json({ error: "Invalid item key" }, { status: 400 });
    }
    if (typeof value !== "number" || !Number.isInteger(value) || value < 1 || value > 6) {
      return NextResponse.json({ error: "Value must be 1-6" }, { status: 400 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    // Verify ownership
    const owned = await sql`
      SELECT id FROM ypo_assessment
      WHERE id = ${assessmentId} AND user_id = ${session.user.id}
    `;
    if (owned.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Upsert response
    await sql`
      INSERT INTO ypo_response (assessment_id, item_key, value)
      VALUES (${assessmentId}, ${itemKey}, ${value})
      ON CONFLICT (assessment_id, item_key)
      DO UPDATE SET value = ${value}, answered_at = NOW()
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Response upsert error:", error);
    // Graceful fallback — client uses localStorage
    return NextResponse.json({ success: true, _fallback: true });
  }
}
