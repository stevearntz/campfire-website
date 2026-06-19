/**
 * Static "Sample"-labeled one-page roadmap card.
 * Numbers are the verified set (Inc 0): Clarity 70% · Alignment 60% ·
 * Coordination 2.5x. This is a marketing mock, not a live deliverable —
 * keep the numbers in sync with the calculator math.
 */

const CLARITY = "#F59E2C";
const ALIGNMENT = "#6E3FCC";
const COORDINATION = "#E055CB";

const FINDINGS = [
  { label: "Clarity", value: "70%", note: "a strength to build on.", accent: CLARITY },
  { label: "Alignment", value: "60%", note: "your binding constraint.", accent: ALIGNMENT },
  { label: "Coordination", value: "2.5x", note: "high friction, fixable.", accent: COORDINATION },
];

const FOCUS = [
  "Connect every team's plan to the strategy",
  "Cut the coordination drag in half",
];

const PLAN = [
  { day: "Day 30", title: "Fix the clarity gaps.", body: "Re-state priorities and expected outcomes across teams.", driver: "Clarity Workshop" },
  { day: "Day 60", title: "Tighten the handoffs.", body: "Redesign meetings and decision rights to cut drag.", driver: "Manager Alignment Workshop" },
  { day: "Day 90", title: "Lock in the rhythm.", body: "Make it the default and re-measure the gain.", driver: null },
];

export default function SampleRoadmapCard() {
  return (
    <div
      className="relative mx-auto rounded-[24px] border bg-white overflow-hidden"
      style={{ maxWidth: 760, borderColor: "#F1EEF8", boxShadow: "0 24px 60px rgba(28,19,52,0.10)" }}
    >
      {/* "Sample" ribbon */}
      <div
        className="absolute top-5 right-5 text-[11px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full"
        style={{ background: "#F3EFFE", color: "#6E3FCC" }}
      >
        Sample
      </div>

      {/* ── Header ── */}
      <div className="px-7 pt-9 pb-7" style={{ borderBottom: "1px solid #F1EEF8" }}>
        <p className="text-[12px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "#9D88ED" }}>
          Team Effectiveness Roadmap
        </p>
        <h3 className="font-extrabold" style={{ fontSize: "clamp(20px, 3vw, 26px)", color: "#1E2A4A", lineHeight: 1.18 }}>
          A focused 90-day plan
        </h3>
        <p className="text-[14px] mt-2" style={{ color: "#9B96A6" }}>
          Prepared from your diagnostic · reviewed in the workshop
        </p>
      </div>

      <div className="px-7 py-8">
        {/* ── Key findings ── */}
        <p className="text-[12px] font-bold tracking-[0.14em] uppercase mb-3" style={{ color: "#9B96A6" }}>
          Key findings
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {FINDINGS.map((f) => (
            <div key={f.label} className="rounded-[14px] border px-5 py-4" style={{ borderColor: "#F1EEF8", background: "#FCFBFE" }}>
              <p className="text-[12px] font-bold tracking-[0.12em] uppercase" style={{ color: "#9B96A6" }}>
                {f.label}
              </p>
              <p className="font-extrabold mt-1" style={{ fontSize: 28, color: f.accent, lineHeight: 1 }}>
                {f.value}
              </p>
              <p className="text-[13px] mt-1.5" style={{ color: "#636B7C" }}>
                {f.note}
              </p>
            </div>
          ))}
        </div>

        {/* ── Focus areas ── */}
        <p className="text-[12px] font-bold tracking-[0.14em] uppercase mb-3" style={{ color: "#9B96A6" }}>
          Focus areas
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {FOCUS.map((item, i) => (
            <div key={item} className="flex items-start gap-3 rounded-[14px] border px-5 py-4" style={{ borderColor: "#F1EEF8", background: "#FCFBFE" }}>
              <span
                className="shrink-0 inline-flex items-center justify-center rounded-full font-extrabold text-white"
                style={{ width: 26, height: 26, background: "#6E3FCC", fontSize: 13 }}
              >
                {i + 1}
              </span>
              <span className="text-[15px] font-medium" style={{ color: "#1E2A4A", lineHeight: 1.4 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* ── 90-day plan ── */}
        <p className="text-[12px] font-bold tracking-[0.14em] uppercase mb-3" style={{ color: "#9B96A6" }}>
          90-day plan
        </p>
        <div className="flex flex-col gap-3">
          {PLAN.map((row) => (
            <div key={row.day} className="rounded-[14px] border px-5 py-4" style={{ borderColor: "#F1EEF8", background: "#FCFBFE" }}>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-[13px] font-extrabold tracking-[0.08em] uppercase" style={{ color: "#6E3FCC" }}>
                  {row.day}
                </span>
                <span className="text-[16px] font-bold" style={{ color: "#1E2A4A" }}>{row.title}</span>
              </div>
              <p className="text-[14px] mt-1.5" style={{ color: "#636B7C", lineHeight: 1.5 }}>
                {row.body}
                {row.driver && (
                  <span className="font-semibold" style={{ color: "#9B96A6" }}>
                    {" "}({row.driver})
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
