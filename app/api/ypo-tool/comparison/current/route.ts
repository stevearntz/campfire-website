import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";
import { CIRCLES, MIN_PEERS } from "@/app/(main)/ypo-tool/lib/behaviors";
import { getCurrentRound, getRoundInvite } from "@/app/(main)/ypo-tool/lib/rounds";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    // Self and peer scores must come from the SAME round.
    const round = await getCurrentRound(sql, session.user.id);

    let selfScores: Record<string, number> | null = null;

    if (round && round.status === "complete") {
      const selfResponses = await sql`
        SELECT item_key, value FROM ypo_response
        WHERE assessment_id = ${round.id}
      `;
      if (selfResponses.length === 12) {
        const byKey: Record<string, number> = {};
        for (const r of selfResponses) byKey[r.item_key] = r.value;

        selfScores = {};
        for (const circle of CIRCLES) {
          selfScores[circle.key] = circle.items.reduce(
            (acc, item) => acc + (byKey[item.key] || 0),
            0,
          );
        }
      }
    }

    // ── Peer aggregate (same round) ──
    const invite = round ? await getRoundInvite(sql, round.id) : null;

    if (!invite) {
      return NextResponse.json(
        { error: "No peer invite found", code: "no_peers" },
        { status: 409 },
      );
    }

    const completedAnswers = await sql`
      SELECT pr.id AS response_id, pa.item_key, pa.value
      FROM ypo_peer_response pr
      JOIN ypo_peer_answer pa ON pa.peer_response_id = pr.id
      WHERE pr.invite_id = ${invite.id} AND pr.status = 'complete'
    `;

    // Group by peer
    const byPeer = new Map<number, Record<string, number>>();
    for (const row of completedAnswers) {
      if (!byPeer.has(row.response_id)) byPeer.set(row.response_id, {});
      byPeer.get(row.response_id)![row.item_key] = row.value;
    }

    const peerCount = byPeer.size;

    if (peerCount < MIN_PEERS) {
      return NextResponse.json(
        {
          error: `Need at least ${MIN_PEERS} peer responses`,
          code: "insufficient_peers",
          peerCount,
        },
        { status: 409 },
      );
    }

    // Compute peer averages (mean of per-peer sums per circle)
    const peerScores: Record<string, number> = {};
    for (const circle of CIRCLES) {
      const peerSums: number[] = [];
      for (const answers of byPeer.values()) {
        const sum = circle.items.reduce(
          (acc, item) => acc + (answers[item.key] || 0),
          0,
        );
        peerSums.push(sum);
      }
      peerScores[circle.key] =
        Math.round(
          (peerSums.reduce((a, b) => a + b, 0) / peerSums.length) * 10,
        ) / 10;
    }

    return NextResponse.json({
      self: selfScores,
      peer: peerScores,
      peerCount,
    });
  } catch (error) {
    console.error("Comparison current error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 },
    );
  }
}
