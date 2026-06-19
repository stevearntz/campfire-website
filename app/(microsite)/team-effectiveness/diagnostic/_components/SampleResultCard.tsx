import TrackedLink from "@/app/components/TrackedLink";

const CALC = "/team-effectiveness/calculator";

/**
 * Static "Sample"-labeled replica of the live results card.
 * Numbers are the verified set: 300 → 90 · 0.30× · −70% · Ceiling 540 ·
 * Clarity 70% · Alignment 60% · Coordination 2.5× · lever Today 90 → 135 (+50%).
 * This is a mock, NOT the live component — keep the numbers in sync with Inc 0.
 */
export default function SampleResultCard() {
  return (
    <div
      className="relative mx-auto rounded-[24px] border bg-white overflow-hidden"
      style={{ maxWidth: 720, borderColor: "#F1EEF8", boxShadow: "0 24px 60px rgba(28,19,52,0.10)" }}
    >
      {/* "Sample" ribbon */}
      <div
        className="absolute top-5 right-5 text-[11px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full"
        style={{ background: "#F3EFFE", color: "#6E3FCC" }}
      >
        Sample
      </div>

      {/* ── Score hero ── */}
      <div
        className="relative px-7 pt-10 pb-9 text-center"
        style={{ background: "linear-gradient(160deg, #1C1334 0%, #2A1B52 100%)" }}
      >
        <p className="text-[12px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "#9D88ED" }}>
          Your Execution Score
        </p>
        <p className="text-[15px]" style={{ color: "rgba(255,255,255,0.7)" }}>
          Your employees execute like
        </p>
        <p
          className="font-extrabold mt-2 flex items-center justify-center gap-3 flex-wrap"
          style={{ lineHeight: 1, letterSpacing: "-0.02em" }}
        >
          <span style={{ fontSize: "clamp(44px, 9vw, 68px)", color: "rgba(255,255,255,0.4)" }}>300</span>
          <span style={{ fontSize: "clamp(32px, 6vw, 48px)", color: "rgba(255,255,255,0.45)" }}>→</span>
          <span style={{ fontSize: "clamp(56px, 11vw, 88px)", color: "#fff" }}>90</span>
        </p>
        <p
          className="mx-auto mt-5 text-[15px] leading-relaxed"
          style={{ maxWidth: 460, color: "rgba(255,255,255,0.78)" }}
        >
          You&apos;re leaving significant capacity on the table. Execution drift is real.
        </p>
        <div
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full text-[13px] font-semibold"
          style={{ background: "rgba(224,85,203,0.16)", color: "#F0A9E4" }}
        >
          <span>Execution multiplier: 0.30x</span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>·</span>
          <span>−70% vs headcount</span>
        </div>
      </div>

      {/* ── Breakdown ── */}
      <div className="px-7 py-8">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 rounded-[14px] border px-5 py-4" style={{ borderColor: "#F1EEF8", background: "#FCFBFE" }}>
            <p className="text-[12px] font-bold tracking-[0.14em] uppercase" style={{ color: "#9B96A6" }}>
              Capacity Ceiling
            </p>
            <p className="font-extrabold mt-1" style={{ fontSize: 30, color: "#1E2A4A", lineHeight: 1 }}>
              540
            </p>
            <p className="text-[13px] mt-1.5" style={{ color: "#9B96A6" }}>
              300 people × 1.8 AI multiplier.
            </p>
          </div>

          <Metric label="Clarity" value="70%" accent="#F59E2C" />
          <Metric label="Alignment" value="60%" accent="#6E3FCC" />
          <div className="col-span-2">
            <Metric label="Coordination Cost" value="2.5x" accent="#E055CB" />
          </div>
        </div>

        {/* ── Biggest lever ── */}
        <div
          className="mt-6 rounded-[16px] border px-6 py-6"
          style={{ borderColor: "rgba(224,85,203,0.25)", background: "#FDF5FB" }}
        >
          <p className="text-[12px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: "#E055CB" }}>
            Your Biggest Lever
          </p>
          <h4 className="font-extrabold text-[20px] mb-2" style={{ color: "#1E2A4A" }}>
            Coordination is the constraint.
          </h4>
          <p className="text-[15px] leading-relaxed" style={{ color: "#636B7C" }}>
            Cut the friction and you free capacity you already have — no new hires.
          </p>
          <div className="flex items-center gap-4 mt-5 flex-wrap">
            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: "#9B96A6" }}>
                Today
              </p>
              <p className="font-extrabold text-[28px]" style={{ color: "#9B96A6", lineHeight: 1 }}>
                90
              </p>
            </div>
            <span className="text-[22px]" style={{ color: "#E055CB" }}>→</span>
            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: "#E055CB" }}>
                Improved
              </p>
              <p className="font-extrabold text-[28px] flex items-baseline gap-2" style={{ color: "#1E2A4A", lineHeight: 1 }}>
                135
                <span className="text-[15px] font-bold" style={{ color: "#16A34A" }}>+50%</span>
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="mt-7 text-center">
          <TrackedLink
            href={CALC}
            eventName="te_cta"
            eventParams={{ cta: "start_diagnostic", location: "diagnostic_sample" }}
            className="inline-block text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px]"
            style={{ background: "#E055CB" }}
          >
            Get your number →
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-[14px] border px-5 py-4" style={{ borderColor: "#F1EEF8", background: "#FCFBFE" }}>
      <p className="text-[12px] font-bold tracking-[0.14em] uppercase" style={{ color: "#9B96A6" }}>
        {label}
      </p>
      <p className="font-extrabold mt-1" style={{ fontSize: 30, color: accent, lineHeight: 1 }}>
        {value}
      </p>
    </div>
  );
}
