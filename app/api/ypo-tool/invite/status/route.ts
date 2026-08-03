import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";
import { MIN_PEERS } from "@/app/(main)/ypo-tool/lib/behaviors";
import { getCurrentRound, getRoundInvite } from "@/app/(main)/ypo-tool/lib/rounds";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    // Rater status for the member's current round.
    const round = await getCurrentRound(sql, session.user.id);
    const invite = round ? await getRoundInvite(sql, round.id) : null;

    if (!invite) {
      return NextResponse.json({
        respondedCount: 0,
        pendingCount: 0,
        raters: [],
        canViewAggregate: false,
      });
    }

    const responses = await sql`
      SELECT id, rater_name, status FROM ypo_peer_response
      WHERE invite_id = ${invite.id}
      ORDER BY created_at ASC
    `;

    const respondedCount = responses.filter((r) => r.status === "complete").length;
    const pendingCount = responses.filter((r) => r.status === "in_progress").length;

    return NextResponse.json({
      respondedCount,
      pendingCount,
      raters: responses.map((r) => ({
        id: r.id,
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
