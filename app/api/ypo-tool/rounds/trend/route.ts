import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";
import { CIRCLES } from "@/app/(main)/ypo-tool/lib/behaviors";

/**
 * GET — per-round self and peer circle scores over time, oldest → newest, for
 * rounds whose self-assessment is complete. Powers the cross-round progress
 * trend. Self = circle sum (3–18); peer = mean of per-peer circle sums.
 */
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    const rounds = await sql`
      SELECT id, title, created_at, closed_at
      FROM ypo_assessment
      WHERE user_id = ${session.user.id} AND status = 'complete'
      ORDER BY created_at ASC
    `;

    if (rounds.length === 0) {
      return NextResponse.json({ rounds: [] });
    }

    const ids = rounds.map((r) => r.id);

    // Self responses across all these rounds.
    const selfRows = await sql`
      SELECT assessment_id, item_key, value
      FROM ypo_response
      WHERE assessment_id = ANY(${ids})
    `;
    const selfByRound = new Map<number, Record<string, number>>();
    for (const r of selfRows) {
      if (!selfByRound.has(r.assessment_id)) selfByRound.set(r.assessment_id, {});
      selfByRound.get(r.assessment_id)![r.item_key] = r.value;
    }

    // Completed peer answers across all these rounds, grouped by round + peer.
    const peerRows = await sql`
      SELECT pi.assessment_id, pr.id AS response_id, pa.item_key, pa.value
      FROM ypo_peer_invite pi
      JOIN ypo_peer_response pr ON pr.invite_id = pi.id AND pr.status = 'complete'
      JOIN ypo_peer_answer pa ON pa.peer_response_id = pr.id
      WHERE pi.assessment_id = ANY(${ids})
    `;
    // round → (peerResponseId → answers)
    const peerByRound = new Map<number, Map<number, Record<string, number>>>();
    for (const r of peerRows) {
      if (!peerByRound.has(r.assessment_id)) peerByRound.set(r.assessment_id, new Map());
      const byPeer = peerByRound.get(r.assessment_id)!;
      if (!byPeer.has(r.response_id)) byPeer.set(r.response_id, {});
      byPeer.get(r.response_id)![r.item_key] = r.value;
    }

    const result = rounds.map((round) => {
      const selfAnswers = selfByRound.get(round.id) || {};
      const self: Record<string, number> = {};
      for (const c of CIRCLES) {
        self[c.key] = c.items.reduce((acc, i) => acc + (selfAnswers[i.key] || 0), 0);
      }

      const byPeer = peerByRound.get(round.id);
      let peer: Record<string, number> | null = null;
      const peerCount = byPeer ? byPeer.size : 0;
      if (byPeer && peerCount > 0) {
        peer = {};
        for (const c of CIRCLES) {
          const sums: number[] = [];
          for (const answers of byPeer.values()) {
            sums.push(c.items.reduce((acc, i) => acc + (answers[i.key] || 0), 0));
          }
          peer[c.key] = Math.round((sums.reduce((a, b) => a + b, 0) / sums.length) * 10) / 10;
        }
      }

      return {
        id: round.id,
        title: round.title as string | null,
        startedAt: round.created_at,
        closedAt: round.closed_at,
        self,
        peer,
        peerCount,
      };
    });

    return NextResponse.json({ rounds: result });
  } catch (error) {
    console.error("Rounds trend error:", error);
    return NextResponse.json({ rounds: [], _fallback: true });
  }
}
