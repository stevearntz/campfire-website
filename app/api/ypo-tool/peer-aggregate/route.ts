import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";
import { CIRCLES, MIN_PEERS } from "@/app/(main)/ypo-tool/lib/behaviors";

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
      return NextResponse.json({ ready: false, n: 0 });
    }

    // Get all completed peer responses with their answers
    const completedResponses = await sql`
      SELECT pr.id AS response_id, pa.item_key, pa.value
      FROM ypo_peer_response pr
      JOIN ypo_peer_answer pa ON pa.peer_response_id = pr.id
      WHERE pr.invite_id = ${invite[0].id} AND pr.status = 'complete'
    `;

    // Group answers by response_id
    const byPeer = new Map<number, Record<string, number>>();
    for (const row of completedResponses) {
      if (!byPeer.has(row.response_id)) byPeer.set(row.response_id, {});
      byPeer.get(row.response_id)![row.item_key] = row.value;
    }

    const n = byPeer.size;

    if (n < MIN_PEERS) {
      return NextResponse.json({ ready: false, n });
    }

    // Compute per-circle aggregate: mean of per-peer sums → /18 scale
    const byCircle: Record<string, { mean18: number }> = {};

    for (const circle of CIRCLES) {
      const peerSums: number[] = [];
      for (const answers of byPeer.values()) {
        const sum = circle.items.reduce((acc, item) => acc + (answers[item.key] || 0), 0);
        peerSums.push(sum);
      }
      const mean = peerSums.reduce((a, b) => a + b, 0) / peerSums.length;
      byCircle[circle.key] = { mean18: Math.round(mean * 10) / 10 };
    }

    return NextResponse.json({ ready: true, n, byCircle });
  } catch (error) {
    console.error("Peer aggregate error:", error);
    return NextResponse.json({ ready: false, n: 0, _fallback: true });
  }
}
