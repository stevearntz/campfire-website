import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";

/**
 * GET — every peer response for the signed-in member, fully attributed.
 * Anonymity has been removed by request: the member sees WHO gave each
 * response, each peer's individual per-item ratings, and their open-ended
 * feedback. Includes both complete and in-progress responses (in-progress
 * are flagged so the UI can label them).
 */
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
      return NextResponse.json({ peers: [] });
    }

    const responses = await sql`
      SELECT id, rater_name, rater_email, status, created_at, completed_at
      FROM ypo_peer_response
      WHERE invite_id = ${invite[0].id}
      ORDER BY completed_at ASC NULLS LAST, created_at ASC
    `;

    if (responses.length === 0) {
      return NextResponse.json({ peers: [] });
    }

    const responseIds = responses.map((r) => r.id);

    const answers = await sql`
      SELECT peer_response_id, item_key, value
      FROM ypo_peer_answer
      WHERE peer_response_id = ANY(${responseIds})
    `;

    // Feedback table is additive (migration 001) — tolerate its absence.
    let feedbackRows: { peer_response_id: number; circle_key: string; text: string }[] = [];
    try {
      feedbackRows = (await sql`
        SELECT peer_response_id, circle_key, text
        FROM ypo_peer_feedback
        WHERE peer_response_id = ANY(${responseIds})
      `) as typeof feedbackRows;
    } catch {
      feedbackRows = [];
    }

    const answersByResponse = new Map<number, Record<string, number>>();
    for (const a of answers) {
      if (!answersByResponse.has(a.peer_response_id)) {
        answersByResponse.set(a.peer_response_id, {});
      }
      answersByResponse.get(a.peer_response_id)![a.item_key] = a.value;
    }

    const feedbackByResponse = new Map<number, Record<string, string>>();
    for (const f of feedbackRows) {
      if (!f.text) continue;
      if (!feedbackByResponse.has(f.peer_response_id)) {
        feedbackByResponse.set(f.peer_response_id, {});
      }
      feedbackByResponse.get(f.peer_response_id)![f.circle_key] = f.text;
    }

    const peers = responses.map((r) => ({
      id: r.id,
      name: r.rater_name || null,
      email: r.rater_email || null,
      status: r.status as "in_progress" | "complete",
      completedAt: r.completed_at,
      answers: answersByResponse.get(r.id) || {},
      feedback: feedbackByResponse.get(r.id) || {},
    }));

    return NextResponse.json({ peers });
  } catch (error) {
    console.error("Peer responses error:", error);
    return NextResponse.json({ peers: [], _fallback: true });
  }
}
