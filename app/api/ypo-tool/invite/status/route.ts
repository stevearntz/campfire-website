import { NextResponse } from "next/server";
import { getSession } from "@/app/ypo-tool/lib/auth";
import { MIN_PEERS } from "@/app/ypo-tool/lib/behaviors";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    const invite = await sql`
      SELECT id FROM ypo_peer_invite
      WHERE user_id = ${session.user.id}
      LIMIT 1
    `;

    if (invite.length === 0) {
      return NextResponse.json({
        respondedCount: 0,
        pendingCount: 0,
        raters: [],
        canViewAggregate: false,
      });
    }

    const responses = await sql`
      SELECT rater_name, status FROM ypo_peer_response
      WHERE invite_id = ${invite[0].id}
      ORDER BY created_at ASC
    `;

    const respondedCount = responses.filter((r) => r.status === "complete").length;
    const pendingCount = responses.filter((r) => r.status === "in_progress").length;

    return NextResponse.json({
      respondedCount,
      pendingCount,
      raters: responses.map((r) => ({
        name: r.rater_name || null,
        status: r.status,
      })),
      canViewAggregate: respondedCount >= MIN_PEERS,
    });
  } catch (error) {
    console.error("Invite status error:", error);
    return NextResponse.json({
      respondedCount: 0,
      pendingCount: 0,
      raters: [],
      canViewAggregate: false,
      _fallback: true,
    });
  }
}
