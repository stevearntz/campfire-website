import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CIRCLES } from "@/app/(main)/ypo-tool/lib/behaviors";

const VALID_CIRCLES = new Set(CIRCLES.map((c) => c.key));

function peerCookieName(token: string) {
  return `ypo_peer_${token}`;
}

/** Upsert one open-ended feedback answer for the current peer response. */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    const { token } = await params;

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    const cookieStore = await cookies();
    const responseId = cookieStore.get(peerCookieName(token))?.value;
    if (!responseId) {
      return NextResponse.json({ error: "No active session" }, { status: 400 });
    }

    const invite = await sql`
      SELECT id FROM ypo_peer_invite WHERE token = ${token} LIMIT 1
    `;
    if (invite.length === 0) {
      return NextResponse.json({ error: "Invalid link" }, { status: 404 });
    }

    const response = await sql`
      SELECT id, status FROM ypo_peer_response
      WHERE id = ${parseInt(responseId, 10)} AND invite_id = ${invite[0].id}
      LIMIT 1
    `;
    if (response.length === 0) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }
    if (response[0].status === "complete") {
      return NextResponse.json({ error: "Already completed" }, { status: 400 });
    }

    const body = await request.json();
    const circleKey = body.circleKey as string;
    const text = ((body.text as string) || "").slice(0, 2000);

    if (!circleKey || !VALID_CIRCLES.has(circleKey)) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    await sql`
      INSERT INTO ypo_peer_feedback (peer_response_id, circle_key, text)
      VALUES (${response[0].id}, ${circleKey}, ${text})
      ON CONFLICT (peer_response_id, circle_key)
      DO UPDATE SET text = ${text}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Peer feedback upsert error:", error);
    // Non-fatal — ratings still save even if feedback can't.
    return NextResponse.json({ success: true, _fallback: true });
  }
}
