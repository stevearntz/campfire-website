import { NextResponse } from "next/server";
import { CIRCLES } from "@/app/(main)/ypo-tool/lib/behaviors";
import { getInviteByToken } from "@/app/(main)/ypo-tool/lib/rounds";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    const { token } = await params;

    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.POSTGRES_URL!);

    const invite = await getInviteByToken(sql, token);

    if (!invite) {
      return NextResponse.json({ error: "Invalid link" }, { status: 404 });
    }

    const firstName = invite.name
      ? invite.name.split(" ")[0]
      : invite.email.split("@")[0];

    // Round closed — the link no longer collects responses.
    if (invite.closed) {
      return NextResponse.json({ closed: true, rateeFirstName: firstName });
    }

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
