/**
 * The 90-day trajectory — the page's signature visual.
 * A gradient line chart climbing across four verified data points:
 *   Today 90 · Day 30 → 110 · Day 60 → 132 · Day 90 → 155
 * Inline SVG (gradient stroke + area fill + node dots). No chart library.
 * Keep the four data points exact.
 */

// Framework accents
const CLARITY = "#F59E2C";
const ALIGNMENT = "#6E3FCC";
const COORDINATION = "#E055CB";

type Point = {
  label: string;
  value: number;
  phase?: string;
  lever?: string;
  driver?: string;
  accent: string;
};

const POINTS: Point[] = [
  { label: "Today", value: 90, accent: "#9D88ED" },
  { label: "Day 30", value: 110, phase: "Clarity", lever: "Fix the clarity gaps.", driver: "Clarity Workshop", accent: CLARITY },
  { label: "Day 60", value: 132, phase: "Coordination", lever: "Tighten the handoffs.", driver: "Manager Alignment Workshop", accent: COORDINATION },
  { label: "Day 90", value: 155, phase: "Rhythm", lever: "Lock in the rhythm.", driver: "Coaching cadence", accent: ALIGNMENT },
];

// SVG viewBox geometry
const VB_W = 720;
const VB_H = 340;
const PAD_L = 56;
const PAD_R = 40;
const PAD_T = 40;
const PAD_B = 56;

const PLOT_W = VB_W - PAD_L - PAD_R;
const PLOT_H = VB_H - PAD_T - PAD_B;

// Scale: a little headroom below the floor and above the peak.
const Y_MIN = 80;
const Y_MAX = 160;

function x(i: number) {
  return PAD_L + (PLOT_W * i) / (POINTS.length - 1);
}
function y(v: number) {
  return PAD_T + PLOT_H * (1 - (v - Y_MIN) / (Y_MAX - Y_MIN));
}

const coords = POINTS.map((p, i) => ({ ...p, cx: x(i), cy: y(p.value) }));
const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.cx.toFixed(1)} ${c.cy.toFixed(1)}`).join(" ");
const areaPath =
  `M ${coords[0].cx.toFixed(1)} ${(VB_H - PAD_B).toFixed(1)} ` +
  coords.map((c) => `L ${c.cx.toFixed(1)} ${c.cy.toFixed(1)}`).join(" ") +
  ` L ${coords[coords.length - 1].cx.toFixed(1)} ${(VB_H - PAD_B).toFixed(1)} Z`;

const GRID_VALUES = [90, 110, 130, 150];

export default function TrajectoryChart() {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 760 }}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        role="img"
        aria-label="A line chart showing effective capacity climbing from 90 today to 110 at Day 30, 132 at Day 60, and 155 at Day 90."
        className="w-full h-auto"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="traj-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9D88ED" />
            <stop offset="40%" stopColor={CLARITY} />
            <stop offset="72%" stopColor={COORDINATION} />
            <stop offset="100%" stopColor="#C9B6FF" />
          </linearGradient>
          <linearGradient id="traj-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(157,136,237,0.30)" />
            <stop offset="100%" stopColor="rgba(157,136,237,0)" />
          </linearGradient>
        </defs>

        {/* horizontal gridlines + y labels */}
        {GRID_VALUES.map((v) => (
          <g key={v}>
            <line
              x1={PAD_L}
              y1={y(v)}
              x2={VB_W - PAD_R}
              y2={y(v)}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
            />
            <text
              x={PAD_L - 14}
              y={y(v) + 4}
              textAnchor="end"
              fill="rgba(255,255,255,0.4)"
              fontSize={13}
              fontWeight={600}
            >
              {v}
            </text>
          </g>
        ))}

        {/* area fill */}
        <path d={areaPath} fill="url(#traj-fill)" />

        {/* climbing line */}
        <path
          d={linePath}
          fill="none"
          stroke="url(#traj-stroke)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* nodes + value chips + x labels */}
        {coords.map((c) => (
          <g key={c.label}>
            <circle cx={c.cx} cy={c.cy} r={9} fill="#1C1334" stroke={c.accent} strokeWidth={3.5} />
            <text
              x={c.cx}
              y={c.cy - 20}
              textAnchor="middle"
              fill="#fff"
              fontSize={19}
              fontWeight={800}
            >
              {c.value}
            </text>
            <text
              x={c.cx}
              y={VB_H - PAD_B + 26}
              textAnchor="middle"
              fill="rgba(255,255,255,0.7)"
              fontSize={13}
              fontWeight={700}
            >
              {c.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Phase legend — the lever + the driver behind each climb */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        {POINTS.filter((p) => p.phase).map((p) => (
          <div
            key={p.label}
            className="rounded-[14px] border p-5"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-block rounded-full" style={{ width: 10, height: 10, background: p.accent }} />
              <p className="text-[12px] font-bold tracking-[0.12em] uppercase" style={{ color: p.accent === ALIGNMENT ? "#9D88ED" : p.accent }}>
                {p.label} · {p.phase}
              </p>
            </div>
            <p className="text-[16px] font-bold mb-1.5" style={{ color: "#fff" }}>
              {p.lever}
            </p>
            <p className="text-[13px] font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
              {p.driver}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
