import type { TeamAggregate, CircleAgg } from "./lib/aggregate";

const SELF = "#6E3FCC";
const PEER = "#E055CB";

// ── Radar geometry (Joy top, Trust right, Power bottom, Partnership left) ──
const SIZE = 300;
const CXY = SIZE / 2;
const RAD = SIZE / 2 - 54;
const ANGLES = [-90, 0, 90, 180];
const rad = (d: number) => (d * Math.PI) / 180;
const xy = (ang: number, r: number): [number, number] => [
  CXY + r * Math.cos(rad(ang)),
  CXY + r * Math.sin(rad(ang)),
];
const poly = (vals: number[]) =>
  vals.map((v, i) => xy(ANGLES[i], Math.max(v / 18, 0.02) * RAD).join(",")).join(" ");
const ring = (scale: number) => ANGLES.map((a) => xy(a, scale * RAD).join(",")).join(" ");

function gapLabel(gap: number): { text: string; color: string; bg: string } {
  if (gap >= 0.5) return { text: "Team rates itself higher", color: "#B23B9F", bg: "#FBEEF8" };
  if (gap <= -0.5) return { text: "Peers rate higher", color: "#1F8A8A", bg: "#E9F6F6" };
  return { text: "In step", color: "#636B7C", bg: "#F3F1F8" };
}

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ height: 8, borderRadius: 4, background: "#EEE9F6", overflow: "hidden" }}>
      <div style={{ width: `${(value / 18) * 100}%`, height: "100%", background: color, borderRadius: 4 }} />
    </div>
  );
}

function ValueCard({ c }: { c: CircleAgg }) {
  const g = gapLabel(c.gap);
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#fff", border: "1px solid #EEE9F6", boxShadow: "0 14px 30px -26px rgba(28,19,52,0.35)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: c.color, display: "inline-block" }} />
        <span className="font-extrabold" style={{ fontSize: 18, color: "#1E2A4A" }}>{c.title}</span>
        <span
          className="ml-auto font-bold uppercase"
          style={{ fontSize: 10.5, letterSpacing: "0.04em", color: g.color, background: g.bg, padding: "4px 9px", borderRadius: 999 }}
        >
          {g.text}
        </span>
      </div>

      <div className="flex items-center justify-between mb-1.5">
        <span className="font-bold" style={{ fontSize: 12.5, color: SELF }}>You (self)</span>
        <span className="font-extrabold tabular-nums" style={{ fontSize: 14, color: "#1E2A4A" }}>
          {c.selfSum.toFixed(1)} <span style={{ color: "#A8A2B3", fontWeight: 400 }}>/ 18</span>
        </span>
      </div>
      <div className="mb-3"><Bar value={c.selfSum} color={SELF} /></div>

      <div className="flex items-center justify-between mb-1.5">
        <span className="font-bold" style={{ fontSize: 12.5, color: PEER }}>Peers</span>
        <span className="font-extrabold tabular-nums" style={{ fontSize: 14, color: "#1E2A4A" }}>
          {c.peerSum.toFixed(1)} <span style={{ color: "#A8A2B3", fontWeight: 400 }}>/ 18</span>
        </span>
      </div>
      <div className="mb-3"><Bar value={c.peerSum} color={PEER} /></div>

      <div style={{ fontSize: 12.5, color: "#636B7C" }}>
        Gap{" "}
        <span className="font-bold tabular-nums" style={{ color: "#1E2A4A" }}>
          {c.gap > 0 ? "+" : ""}{c.gap.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

export default function ReportsView({ data }: { data: TeamAggregate }) {
  const { coverage, circles } = data;
  const selfPts = poly(circles.map((c) => c.selfSum));
  const peerPts = poly(circles.map((c) => c.peerSum));

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <p className="font-bold uppercase mb-3" style={{ fontSize: 11, letterSpacing: "0.14em", color: "#6E3FCC" }}>
          Activating Behaviors · Team Reports
        </p>
        <h1 className="font-extrabold mb-3" style={{ fontSize: "clamp(28px, 4.5vw, 42px)", lineHeight: 1.05, color: "#1E2A4A" }}>
          Where the group stands
        </h1>

        {/* Coverage strip */}
        <div
          className="flex flex-wrap gap-x-6 gap-y-1 rounded-xl px-4 py-3 mb-12"
          style={{ background: "#F8F6FB", border: "1px solid #EEE9F6", fontSize: 13.5, color: "#636B7C" }}
        >
          <span><b style={{ color: "#1E2A4A" }}>{coverage.members}</b> members</span>
          <span><b style={{ color: "#1E2A4A" }}>{coverage.peerResponses}</b> peer responses</span>
          <span>avg <b style={{ color: "#1E2A4A" }}>{coverage.avgPeers}</b> peers / member</span>
          <span className="ml-auto" style={{ color: "#A8A2B3" }}>as of {coverage.asOf}</span>
        </div>

        {/* Report 1 — Team Scorecard */}
        <h2 className="font-extrabold mb-1" style={{ fontSize: 22, color: "#1E2A4A" }}>The four values</h2>
        <p className="mb-8" style={{ fontSize: 15.5, color: "#636B7C", lineHeight: 1.6, maxWidth: 640 }}>
          How the cohort scores itself versus how peers score them, across Joy, Trust, Power, and
          Partnership. Each value is a sum out of 18. Where the two pull apart is where the
          conversation lives.
        </p>

        <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
          {/* Radar */}
          <div>
            <svg viewBox={`-54 -6 ${SIZE + 108} ${SIZE + 12}`} width="100%" style={{ maxWidth: 320 }}>
              {[1 / 3, 2 / 3, 1].map((s) => (
                <polygon key={s} points={ring(s)} fill="none" stroke="#EEE9F6" strokeWidth={1} />
              ))}
              {ANGLES.map((a, i) => {
                const [x, y] = xy(a, RAD);
                return <line key={i} x1={CXY} y1={CXY} x2={x} y2={y} stroke="#EEE9F6" strokeWidth={1} />;
              })}
              <polygon points={peerPts} fill="rgba(224,85,203,0.10)" stroke={PEER} strokeWidth={2} strokeDasharray="5 4" />
              <polygon points={selfPts} fill="rgba(110,63,204,0.14)" stroke={SELF} strokeWidth={2.5} />
              {circles.map((c, i) => {
                const [lx, ly] = xy(ANGLES[i], RAD + 22);
                return (
                  <text key={c.key} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                    fontSize={12} fontWeight={700} fill={c.color}>
                    {c.title}
                  </text>
                );
              })}
            </svg>
            <div className="flex items-center gap-4 mt-1 justify-center" style={{ fontSize: 12.5, color: "#636B7C" }}>
              <span className="flex items-center gap-1.5">
                <svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke={SELF} strokeWidth="2.5" /></svg>
                Self
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke={PEER} strokeWidth="2.5" strokeDasharray="4 3" /></svg>
                Peers
              </span>
            </div>
          </div>

          {/* Value cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {circles.map((c) => <ValueCard key={c.key} c={c} />)}
          </div>
        </div>

        <p className="mt-12" style={{ fontSize: 12.5, color: "#A8A2B3", lineHeight: 1.5, maxWidth: 640 }}>
          Each member is weighted equally — a member’s peer score is the average of their own peers,
          so someone with ten raters doesn’t outweigh someone with two. Real YPO members only; test
          accounts excluded.
        </p>
      </div>
    </div>
  );
}
