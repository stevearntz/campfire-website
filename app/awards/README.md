# Campfire Superlatives — live voting game

A screen-shared, play-along awards game for a live Zoom. The host drives a
console; everyone else joins on a computer, types a game code + their name, and
votes from the list of 41 people for each of the 25 awards. Recreates the look
of the "Campfire Awards.pdf" certificate deck.

## The two screens

| Screen | URL | Who |
| --- | --- | --- |
| **Host console** | `/awards/host?key=<HOST_KEY>` | You. Screen-share this. |
| **Voter** | `/awards` | Everyone. They enter the game code + name. |

**Host flow per award:** Open voting → (Voting timer runs, tallies come in live)
→ Close voting → Crown the leader (or click any name / "Crown anyone" for ties &
narrative picks) → the certificate fills in with the winner's name → the
Storytelling prompt + timer appear → Next. After award 25, "Next" (or "Jump to
finale") rolls the Wall of Winners.

Voters only ever see the current award and their own locked-in pick — live
tallies are **host-only**, so the room isn't biased mid-vote.

## Config

- **Game code:** `CAMPFIRE` — edit `_data/config.ts`.
- **Host key:** `AWARDS_HOST_KEY` env var; falls back to `campfire-host` if unset.
  Set it in Vercel to lock down the control routes for the live event.
- **Awards / nominees:** `_data/awards.ts` (titles + the 6-color rotation,
  derived from award number) and `_data/nominees.ts` (the 41 people).
- **Awarded date** shown on the certificate: `_components/Certificate.tsx`.

## Data & reset

State lives in Neon (`POSTGRES_URL`), tables `award_room`, `award_votes`,
`award_winners`, created lazily on first request (no migration to run). Both
screens poll `/api/awards/state` every ~1.2s — no websockets.

**Reset before the real event:** the host console has a "Reset game" link, or
`POST /api/awards/control {"key":"…","action":"reset"}`. This wipes all votes +
winners and returns the room to the lobby.

## Notes

- Hidden + `noindex`, no nav link (like `/eggs`). Lives at top-level `app/awards`
  (not `(main)`) so it renders full-screen without the marketing Navbar/Footer.
- Single global room — one event at a time. Fine for an all-hands; would need a
  room-code column to run two games at once.
