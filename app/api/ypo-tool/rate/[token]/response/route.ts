import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ALL_ITEM_KEYS } from "@/app/(main)/ypo-tool/lib/behaviors";

const VALID_KEYS = new Set(ALL_ITEM_KEYS);

function peerCookieName(token: string) {
  return `ypo_peer_${token}`;
}

/** Check for existing response via cookie — does NOT create */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    const { token } = await params;

    const cookieStore = await cookies();
    const existingId = cookieStore.get(peerCookieName(token))?.value;

    if (!existingId) {
      return NextResponse.json({ exists: false });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    const invite = await sql`
      SELECT id FROM ypo_peer_invite WHERE token = ${token} LIMIT 1
    `;
    if (invite.length === 0) {
      return NextResponse.json({ exists: false });
    }

    const existing = await sql`
      SELECT id, status FROM ypo_peer_response
      WHERE id = ${parseInt(existingId, 10)} AND invite_id = ${invite[0].id}
      LIMIT 1
    `;
    if (existing.length === 0) {
      return NextResponse.json({ exists: false });
    }

    const answers = await sql`
      SELECT item_key, value FROM ypo_peer_answer
      WHERE peer_response_id = ${existing[0].id}
    `;

    return NextResponse.json({
      exists: true,
      responseId: existing[0].id,
      status: existing[0].status,
      answers: Object.fromEntries(answers.map((a) => [a.item_key, a.value])),
    });
  } catch (error) {
    console.error("Peer response check error:", error);
    return NextResponse.json({ exists: false });
  }
}

/** Create a new response (or return existing if cookie present) */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    const { token } = await params;
    const body = await request.json().catch(() => ({}));
    const raterName = (body.raterName as string)?.trim()?.slice(0, 200) || null;

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    // Validate invite
    const invite = await sql`
      SELECT id FROM ypo_peer_invite WHERE token = ${token} LIMIT 1
    `;
    if (invite.length === 0) {
      return NextResponse.json({ error: "Invalid link" }, { status: 404 });
    }

    // Check for existing response via cookie
    const cookieStore = await cookies();
    const existingId = cookieStore.get(peerCookieName(token))?.value;

    if (existingId) {
      const existing = await sql`
        SELECT id, status FROM ypo_peer_response
        WHERE id = ${parseInt(existingId, 10)} AND invite_id = ${invite[0].id}
        LIMIT 1
      `;
      if (existing.length > 0) {
        // Return existing response + saved answers
        const answers = await sql`
          SELECT item_key, value FROM ypo_peer_answer
          WHERE peer_response_id = ${existing[0].id}
        `;
        return NextResponse.json({
          responseId: existing[0].id,
          status: existing[0].status,
          answers: Object.fromEntries(answers.map((a) => [a.item_key, a.value])),
        });
      }
    }

    // Create new response
    const created = await sql`
      INSERT INTO ypo_peer_response (invite_id, rater_name)
      VALUES (${invite[0].id}, ${raterName})
      RETURNING id, status
    `;

    // Set cookie to tie this browser to this response
    const res = NextResponse.json({
      responseId: created[0].id,
      status: created[0].status,
      answers: {},
    });
    res.cookies.set(peerCookieName(token), String(created[0].id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return res;
  } catch (error) {
    console.error("Peer response create error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
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

    // Validate invite + response ownership
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
    const { itemKey, value } = body;

    if (!itemKey || !VALID_KEYS.has(itemKey)) {
      return NextResponse.json({ error: "Invalid item key" }, { status: 400 });
    }
    if (typeof value !== "number" || !Number.isInteger(value) || value < 1 || value > 6) {
      return NextResponse.json({ error: "Value must be 1-6" }, { status: 400 });
    }

    await sql`
      INSERT INTO ypo_peer_answer (peer_response_id, item_key, value)
      VALUES (${response[0].id}, ${itemKey}, ${value})
      ON CONFLICT (peer_response_id, item_key)
      DO UPDATE SET value = ${value}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Peer answer upsert error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
