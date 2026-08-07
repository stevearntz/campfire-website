import { NextRequest, NextResponse } from "next/server";
import { getRoom, castVote } from "../../../awards/_lib/db";
import { NOMINEE_NAMES } from "../../../awards/_data/nominees";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { voterName?: string; awardNo?: number; nominee?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const voterName = (body.voterName || "").trim();
  const awardNo = Number(body.awardNo);
  const nominee = (body.nominee || "").trim();

  if (!voterName) {
    return NextResponse.json({ error: "no_name" }, { status: 400 });
  }
  if (!NOMINEE_NAMES.includes(nominee)) {
    return NextResponse.json({ error: "unknown_nominee" }, { status: 400 });
  }

  try {
    const room = await getRoom();
    // Only accept a vote for the award that's actually open right now.
    if (room.phase !== "voting" || room.currentAward !== awardNo) {
      return NextResponse.json(
        { error: "voting_closed", currentAward: room.currentAward, phase: room.phase },
        { status: 409 },
      );
    }
    await castVote(voterName, awardNo, nominee);
    return NextResponse.json({ ok: true, myVote: nominee });
  } catch (err) {
    console.error("[awards/vote]", err);
    return NextResponse.json({ error: "vote_failed" }, { status: 500 });
  }
}
