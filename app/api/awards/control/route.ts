import { NextRequest, NextResponse } from "next/server";
import {
  getRoom,
  setRoom,
  setWinner,
  clearWinner,
  getTally,
  getWinners,
  resetGame,
  type Phase,
} from "../../../awards/_lib/db";
import { TOTAL_AWARDS } from "../../../awards/_data/awards";
import { isHostKey } from "../_host";

export const dynamic = "force-dynamic";

type Action =
  | "open" // open voting on the current award
  | "close" // stop accepting votes
  | "reveal" // crown a winner + show the certificate
  | "reopen" // undo a reveal, back to voting
  | "next" // advance to the next award, voting open
  | "prev" // back up one award, voting open
  | "goto" // jump to a specific award
  | "finish" // roll credits
  | "reset"; // wipe everything back to the lobby

export async function POST(req: NextRequest) {
  let body: {
    key?: string;
    action?: Action;
    winner?: string;
    awardNo?: number;
    phase?: Phase;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  if (!isHostKey(body.key)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  try {
    const room = await getRoom();
    const cur = room.currentAward;

    switch (body.action) {
      case "open":
        await setRoom(cur, "voting");
        break;
      case "close":
        await setRoom(cur, "closed");
        break;
      case "reveal": {
        const winner = (body.winner || "").trim();
        if (!winner) {
          return NextResponse.json({ error: "no_winner" }, { status: 400 });
        }
        await setWinner(cur, winner);
        await setRoom(cur, "revealed");
        break;
      }
      case "reopen":
        await clearWinner(cur);
        await setRoom(cur, "voting");
        break;
      case "next":
        if (cur >= TOTAL_AWARDS) await setRoom(cur, "done");
        else await setRoom(cur + 1, "voting");
        break;
      case "prev":
        await setRoom(Math.max(cur - 1, 1), "voting");
        break;
      case "goto": {
        const n = Number(body.awardNo);
        if (!Number.isFinite(n)) {
          return NextResponse.json({ error: "bad_award" }, { status: 400 });
        }
        await setRoom(n, body.phase || "voting");
        break;
      }
      case "finish":
        await setRoom(cur, "done");
        break;
      case "reset":
        await resetGame();
        break;
      default:
        return NextResponse.json({ error: "unknown_action" }, { status: 400 });
    }

    const [next, tally, winners] = await Promise.all([
      getRoom(),
      getTally((await getRoom()).currentAward),
      getWinners(),
    ]);
    return NextResponse.json({ ...next, tally, winners });
  } catch (err) {
    console.error("[awards/control]", err);
    return NextResponse.json({ error: "control_failed" }, { status: 500 });
  }
}
