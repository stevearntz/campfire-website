import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";
import { resolveRound } from "@/app/(main)/ypo-tool/lib/rounds";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    // An explicit ?round=ID (owned) lets a member view a past round read-only;
    // otherwise fall back to their current round.
    const roundParam = new URL(request.url).searchParams.get("round");
    const assessment = await resolveRound(
      sql,
      session.user.id,
      roundParam ? parseInt(roundParam, 10) : null,
    );

    if (!assessment) {
      return NextResponse.json({ assessment: null, responses: {} });
    }
    const responses = await sql`
      SELECT item_key, value FROM ypo_response
      WHERE assessment_id = ${assessment.id}
    `;

    let feedback: Record<string, string> = {};
    try {
      const fb = await sql`
        SELECT circle_key, text FROM ypo_self_feedback
        WHERE assessment_id = ${assessment.id}
      `;
      feedback = Object.fromEntries(fb.map((f) => [f.circle_key, f.text]));
    } catch {
      feedback = {};
    }

    return NextResponse.json({
      assessment,
      responses: Object.fromEntries(responses.map((r) => [r.item_key, r.value])),
      feedback,
    });
  } catch (error) {
    console.error("Assessment current error:", error);
    return NextResponse.json({ assessment: null, responses: {}, _fallback: true });
  }
}
