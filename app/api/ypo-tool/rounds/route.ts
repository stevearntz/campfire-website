import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";

/**
 * GET — all of the member's assessment rounds, newest first, with a summary
 * for each (self status + completed peer count). `active` is the single open
 * round (closed_at IS NULL), or null when the member has no round collecting.
 */
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    const rows = await sql`
      SELECT
        a.id,
        a.title,
        a.status,
        a.created_at,
        a.closed_at,
        (
          SELECT count(*)::int
          FROM ypo_peer_response pr
          JOIN ypo_peer_invite pi ON pi.id = pr.invite_id
          WHERE pi.assessment_id = a.id AND pr.status = 'complete'
        ) AS peer_count
      FROM ypo_assessment a
      WHERE a.user_id = ${session.user.id}
      ORDER BY a.created_at DESC
    `;

    const rounds = rows.map((r) => ({
      id: r.id,
      title: r.title as string | null,
      status: r.status as "in_progress" | "complete",
      startedAt: r.created_at,
      closedAt: r.closed_at,
      selfComplete: r.status === "complete",
      peerCount: r.peer_count as number,
      open: r.closed_at == null,
    }));

    const active = rounds.find((r) => r.open) ?? null;

    return NextResponse.json({ active, rounds });
  } catch (error) {
    console.error("Rounds list error:", error);
    return NextResponse.json({ active: null, rounds: [], _fallback: true });
  }
}
