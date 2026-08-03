import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";
import { getActiveRound, getRoundInvite } from "@/app/(main)/ypo-tool/lib/rounds";
import crypto from "crypto";

function generateToken(): string {
  return crypto.randomBytes(9).toString("base64url"); // 12 chars, URL-safe
}

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    // Invites belong to the member's open round — no open round, no link.
    const active = await getActiveRound(sql, session.user.id);
    if (!active) {
      return NextResponse.json(
        { error: "No open assessment round", code: "no_open_round" },
        { status: 409 },
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://getcampfire.com";

    // Return this round's existing invite, or mint one for it.
    const existing = await getRoundInvite(sql, active.id);
    if (existing) {
      return NextResponse.json({
        token: existing.token,
        url: `${baseUrl}/rate/${existing.token}`,
      });
    }

    const token = generateToken();
    await sql`
      INSERT INTO ypo_peer_invite (user_id, assessment_id, token)
      VALUES (${session.user.id}, ${active.id}, ${token})
    `;

    return NextResponse.json({
      token,
      url: `${baseUrl}/rate/${token}`,
    });
  } catch (error) {
    console.error("Invite create error:", error);
    // Fallback for demo mode (no DB)
    const fallbackToken = "demo-" + Math.random().toString(36).slice(2, 10);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://getcampfire.com";
    return NextResponse.json({
      token: fallbackToken,
      url: `${baseUrl}/rate/${fallbackToken}`,
      _fallback: true,
    });
  }
}
