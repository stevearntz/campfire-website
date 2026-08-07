import { NextRequest, NextResponse } from "next/server";
import {
  getRoom,
  getTally,
  getMyVote,
  getVoterCount,
  getWinners,
} from "../../../awards/_lib/db";
import { TOTAL_AWARDS } from "../../../awards/_data/awards";
import { isHostKey } from "../_host";

// Polled ~every 1.2s by phones and the host console — never cache.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const voter = searchParams.get("voter")?.trim() || "";
  const wantHost = searchParams.get("host") === "1";
  const hostOk = wantHost && isHostKey(searchParams.get("key"));

  try {
    const room = await getRoom();
    const [voterCount, winners] = await Promise.all([
      getVoterCount(room.currentAward),
      getWinners(),
    ]);
    const myVote = voter ? await getMyVote(voter, room.currentAward) : null;
    // Tallies are host-only, so live vote counts don't bias voters mid-round.
    const tally = hostOk ? await getTally(room.currentAward) : null;

    return NextResponse.json({
      currentAward: room.currentAward,
      phase: room.phase,
      totalAwards: TOTAL_AWARDS,
      voterCount,
      myVote,
      winners,
      tally,
    });
  } catch (err) {
    console.error("[awards/state]", err);
    return NextResponse.json({ error: "state_failed" }, { status: 500 });
  }
}
