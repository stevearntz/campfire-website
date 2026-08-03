import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ALL_ITEM_KEYS } from "@/app/(main)/ypo-tool/lib/behaviors";
import { getInviteByToken } from "@/app/(main)/ypo-tool/lib/rounds";

function peerCookieName(token: string) {
  return `ypo_peer_${token}`;
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    const { token } = await params;

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    // Get response ID from cookie
    const cookieStore = await cookies();
    const responseId = cookieStore.get(peerCookieName(token))?.value;
    if (!responseId) {
      return NextResponse.json({ error: "No active session" }, { status: 400 });
    }

    // Validate invite + round still open + response
    const invite = await getInviteByToken(sql, token);
    if (!invite) {
      return NextResponse.json({ error: "Invalid link" }, { status: 404 });
    }
    if (invite.closed) {
      return NextResponse.json(
        { error: "This assessment has closed.", code: "round_closed" },
        { status: 410 },
      );
    }

    const response = await sql`
      SELECT id, status FROM ypo_peer_response
      WHERE id = ${parseInt(responseId, 10)} AND invite_id = ${invite.id}
      LIMIT 1
    `;
    if (response.length === 0) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }
    if (response[0].status === "complete") {
      return NextResponse.json({ success: true });
    }

    // Verify all 12 answers present
    const answers = await sql`
      SELECT item_key FROM ypo_peer_answer
      WHERE peer_response_id = ${response[0].id}
    `;
    const answered = new Set(answers.map((a) => a.item_key));
    const missing = ALL_ITEM_KEYS.filter((k) => !answered.has(k));

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing responses: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    await sql`
      UPDATE ypo_peer_response
      SET status = 'complete', completed_at = NOW()
      WHERE id = ${response[0].id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Peer complete error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
