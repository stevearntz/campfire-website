import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";
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

    // Return existing invite or create new
    const existing = await sql`
      SELECT id, token, created_at FROM ypo_peer_invite
      WHERE user_id = ${session.user.id}
      LIMIT 1
    `;

    if (existing.length > 0) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://getcampfire.com";
      return NextResponse.json({
        token: existing[0].token,
        url: `${baseUrl}/rate/${existing[0].token}`,
      });
    }

    const token = generateToken();
    await sql`
      INSERT INTO ypo_peer_invite (user_id, token)
      VALUES (${session.user.id}, ${token})
    `;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://getcampfire.com";
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
