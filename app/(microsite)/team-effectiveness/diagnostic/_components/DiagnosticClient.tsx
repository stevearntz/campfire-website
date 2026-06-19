import Image from "next/image";
import TrackedLink from "@/app/components/TrackedLink";
import SampleResultCard from "./SampleResultCard";

const CALC = "/team-effectiveness/calculator";
const HUB = "/team-effectiveness";
const MODEL = "/team-effectiveness/the-model";
const SECTION_PX = "clamp(24px, 6vw, 80px)";

const FORCES = [
  {
    label: "Clarity",
    color: "#F59E2C",
    body: "Whether people know the priorities and why they matter.",
  },
  {
    label: "Alignment",
    color: "#6E3FCC",
    body: "Whether every team's plan adds up to the same plan.",
  },
  {
    label: "Coordination Cost",
    color: "#E055CB",
    body: "The drag of meetings, rework and politics to move work.",
  },
  {
    label: "AI Multiplier",
    color: "#9D88ED",
    body: "How much AI is raising your capacity ceiling.",
  },
];

function Eyebrow({ children, color = "#9D88ED" }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="text-[12px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color }}>
      {children}
    </p>
  );
}

export default function DiagnosticClient() {
  return (
    <>
      {/* ───────── 1. HERO — dark ───────── */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          background: "#1C1334",
          minHeight: "clamp(520px, calc(100vh - 64px), 760px)",
          paddingTop: 48,
          paddingBottom: 48,
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "url(/purple-topo-tall.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.13 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(110% 80% at 50% 0%, rgba(110,63,204,0.32), rgba(28,19,52,0) 62%)" }}
        />
        <div className="relative mx-auto text-center" style={{ maxWidth: 760 }}>
          <Image
            src="/binoculars.webp"
            alt=""
            width={200}
            height={200}
            className="w-16 h-16 object-contain mx-auto mb-6"
          />
          <Eyebrow>Part 1 · The Diagnostic</Eyebrow>
          <h1
            className="font-extrabold text-white"
            style={{ fontSize: "clamp(38px, 5.6vw, 60px)", lineHeight: 1.06, letterSpacing: "-0.02em" }}
          >
            See how your team
            <br />
            <span style={{ color: "#9D88ED" }}>really executes.</span>
          </h1>
          <p
            className="mx-auto mt-6"
            style={{ maxWidth: 620, fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}
          >
            A short, research-backed assessment. In about two minutes it measures the forces that actually drive execution — clarity, alignment, coordination cost, and the AI multiplier — and shows you exactly where capacity is leaking.
          </p>
          <div className="flex gap-3 justify-center flex-wrap mt-9">
            <TrackedLink
              href={CALC}
              eventName="te_cta"
              eventParams={{ cta: "start_diagnostic", location: "diagnostic_hero" }}
              className="text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px]"
              style={{ background: "#E055CB" }}
            >
              Start the diagnostic →
            </TrackedLink>
            <TrackedLink
              href="#sample"
              eventName="te_link"
              eventParams={{ label: "see_sample", location: "diagnostic_hero" }}
              className="text-white text-[14px] font-semibold px-7 py-4 rounded-[10px] border transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              See a sample result
            </TrackedLink>
          </div>
          <p className="mt-6 text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            ~2 minutes · 12 questions · private to you
          </p>
        </div>
      </section>

      {/* ───────── 2. SCORE TEASER — white ───────── */}
      <section
        className="bg-white"
        style={{ paddingTop: "clamp(56px, 8vw, 96px)", paddingBottom: "clamp(56px, 8vw, 96px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}
      >
        <div className="mx-auto text-center" style={{ maxWidth: 640 }}>
          <Eyebrow color="#6E3FCC">Your Execution Score</Eyebrow>
          <p className="text-[16px]" style={{ color: "#636B7C" }}>
            Your employees execute like
          </p>
          <p
            className="font-extrabold mt-3 flex items-center justify-center gap-4 flex-wrap"
            style={{ lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            <span style={{ fontSize: "clamp(52px, 12vw, 96px)", color: "#C9C2D9" }}>300</span>
            <span style={{ fontSize: "clamp(36px, 8vw, 64px)", color: "#C9C2D9" }}>→</span>
            <span style={{ fontSize: "clamp(64px, 15vw, 120px)", color: "#1E2A4A" }}>90</span>
          </p>
          <a
            href="#sample"
            className="inline-flex flex-col items-center gap-1 mt-8 text-[13px] font-semibold tracking-[0.08em] uppercase"
            style={{ color: "#6E3FCC" }}
          >
            See how
            <span className="animate-bounce text-[20px] leading-none">↓</span>
          </a>
        </div>
      </section>

      {/* ───────── 3. WHAT IT MEASURES — light ───────── */}
      <section
        style={{ background: "#F8F5FC", paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}
      >
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-12" style={{ maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#6E3FCC">What It Measures</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              Four forces, one honest number.
            </h2>
            <div className="mt-5">
              <TrackedLink
                href={MODEL}
                eventName="te_link"
                eventParams={{ label: "read_the_model", location: "diagnostic_measures" }}
                className="text-[14px] font-semibold inline-flex items-center gap-1"
                style={{ color: "#6E3FCC" }}
              >
                Read the research behind the model →
              </TrackedLink>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FORCES.map((f) => (
              <div
                key={f.label}
                className="relative rounded-[16px] border bg-white p-7 overflow-hidden"
                style={{ borderColor: "#F1EEF8" }}
              >
                <span className="absolute left-0 top-0 bottom-0 w-1" style={{ background: f.color }} />
                <h3 className="text-[19px] font-extrabold mb-2" style={{ color: f.color }}>
                  {f.label}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "#636B7C" }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 4. SAMPLE RESULT — white ───────── */}
      <section
        id="sample"
        className="bg-white scroll-mt-20"
        style={{ paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}
      >
        <div className="mx-auto" style={{ maxWidth: 760 }}>
          <div className="text-center mb-10" style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#B23B9F">What You&apos;ll See</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              Here&apos;s what your results look like.
            </h2>
          </div>
          <SampleResultCard />
        </div>
      </section>

      {/* ───────── 5. CLOSING CTA — dark ───────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#1C1334", paddingTop: "clamp(72px, 10vw, 128px)", paddingBottom: "clamp(72px, 10vw, 128px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "url(/pink-topo-bg.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.18 }}
        />
        <div className="relative mx-auto text-center" style={{ maxWidth: 640 }}>
          <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(28px, 4.4vw, 44px)", lineHeight: 1.1 }}>
            Two minutes to your execution score.
          </h2>
          <p className="mx-auto mt-5" style={{ maxWidth: 520, fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
            No sign-up to start. Your results are private to you.
          </p>
          <div className="mt-9">
            <TrackedLink
              href={CALC}
              eventName="te_cta"
              eventParams={{ cta: "start_diagnostic", location: "diagnostic_closing" }}
              className="inline-block text-white text-[14px] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-[10px]"
              style={{ background: "#E055CB" }}
            >
              Start the diagnostic →
            </TrackedLink>
          </div>
          <div className="mt-8">
            <TrackedLink
              href={HUB}
              eventName="te_link"
              eventParams={{ label: "back_to_hub", location: "diagnostic_closing" }}
              className="text-[14px] font-semibold inline-flex items-center gap-1"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              ← Back to the Team Effectiveness Sprint
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
