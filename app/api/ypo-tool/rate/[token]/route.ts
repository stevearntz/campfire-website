import { NextResponse } from "next/server";
import { CIRCLES } from "@/app/(main)/ypo-tool/lib/behaviors";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    const { token } = await params;

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    const invite = await sql`
      SELECT pi.id, u.name, u.email
      FROM ypo_peer_invite pi
      JOIN ypo_users u ON u.id = pi.user_id
      WHERE pi.token = ${token}
      LIMIT 1
    `;

    if (invite.length === 0) {
      return NextResponse.json({ error: "Invalid link" }, { status: 404 });
    }

    const user = invite[0];
    const firstName = user.name
      ? user.name.split(" ")[0]
      : user.email.split("@")[0];

    const items = CIRCLES.flatMap((c) =>
      c.items.map((item) => ({
        key: item.key,
        text: item.peerText.replace(/^This person/, firstName),
        circle: c.key,
      })),
    );

    return NextResponse.json({ rateeFirstName: firstName, items });
  } catch (error) {
    console.error("Rate token lookup error:", error);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
