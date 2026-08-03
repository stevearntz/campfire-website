"use client";

import { CIRCLES } from "../lib/behaviors";

export interface TrendRound {
  id: number;
  label: string;
  self: Record<string, number>;
  peer: Record<string, number> | null;
}

const PEER_COLOR = "#E055CB";
const W = 280;
const H = 150;
const PAD = { t: 16, r: 14, b: 28, l: 28 };

function xAt(i: number, n: number): number {
  if (n <= 1) return W / 2;
  return PAD.l + (i / (n - 1)) * (W - PAD.l - PAD.r);
}

function yAt(v: number): number {
  return PAD.t + (1 - v / 18) * (H - PAD.t - PAD.b);
}

/**
 * Cross-round progress: one mini line-chart per circle. Solid line (in the
 * circle's color) is the member's self-view over time; dashed pink is the
 * peer average. Y axis is the 0–18 circle-sum scale.
 */
export default function TrendChart({ rounds }: { rounds: TrendRound[] }) {
  const n = rounds.length;

  return (
    <div>
      <div className="flex items-center gap-5 mb-6" style={{ fontSize: 12.5, color: "#636B7C" }}>
        <span className="flex items-center gap-2">
          <svg width="22" height="10">
            <line x1="0" y1="5" x2="22" y2="5" stroke="#1E2A4A" strokeWidth="2.5" />
          </svg>
          You
        </span>
        <span className="flex items-center gap-2">
          <svg width="22" height="10">
            <line
              x1="0"
              y1="5"
              x2="22"
              y2="5"
              stroke={PEER_COLOR}
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />
          </svg>
          Peers
        </span>
        <span style={{ color: "#A8A2B3" }}>Each circle scored 0–18</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
        {CIRCLES.map((circle) => {
          const selfPts = rounds.map((r, i) => ({ x: xAt(i, n), y: yAt(r.self[circle.key] ?? 0) }));
          const peerIdx = rounds
            .map((r, i) => ({ i, v: r.peer ? r.peer[circle.key] : null }))
            .filter((p) => p.v != null) as { i: number; v: number }[];
          const peerPts = peerIdx.map((p) => ({ x: xAt(p.i, n), y: yAt(p.v) }));

          return (
            <div key={circle.key}>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="inline-block rounded-full"
                  style={{ width: 9, height: 9, background: circle.color }}
                />
                <span className="font-bold" style={{ fontSize: 14, color: "#1E2A4A" }}>
                  {circle.title}
                </span>
              </div>
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ overflow: "visible" }}>
                {/* Y gridlines at 0 / 9 / 18 */}
                {[0, 9, 18].map((g) => (
                  <g key={g}>
                    <line
                      x1={PAD.l}
                      y1={yAt(g)}
                      x2={W - PAD.r}
                      y2={yAt(g)}
                      stroke="#F0ECF7"
                      strokeWidth="1"
                    />
                    <text x={PAD.l - 6} y={yAt(g) + 3} textAnchor="end" fontSize="9" fill="#C9C4D4">
                      {g}
                    </text>
                  </g>
                ))}

                {/* Peer (dashed) */}
                {peerPts.length > 1 && (
                  <polyline
                    fill="none"
                    stroke={PEER_COLOR}
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={peerPts.map((p) => `${p.x},${p.y}`).join(" ")}
                  />
                )}
                {peerPts.map((p, i) => (
                  <circle key={`p${i}`} cx={p.x} cy={p.y} r="3" fill={PEER_COLOR} />
                ))}

                {/* Self (solid, circle color) */}
                {selfPts.length > 1 && (
                  <polyline
                    fill="none"
                    stroke={circle.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={selfPts.map((p) => `${p.x},${p.y}`).join(" ")}
                  />
                )}
                {selfPts.map((p, i) => (
                  <circle key={`s${i}`} cx={p.x} cy={p.y} r="3.5" fill={circle.color} />
                ))}

                {/* X labels (round dates) */}
                {rounds.map((r, i) => (
                  <text
                    key={r.id}
                    x={xAt(i, n)}
                    y={H - 8}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#A8A2B3"
                  >
                    {r.label}
                  </text>
                ))}
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}
