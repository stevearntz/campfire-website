import Image from "next/image";
import TrackedLink from "@/app/components/TrackedLink";
import TrajectoryChart from "./TrajectoryChart";
import SampleRoadmapCard from "./SampleRoadmapCard";

const CALC = "/team-effectiveness/calculator";
const CALENDLY = "https://calendly.com/getcampfire/";
const HUB = "/team-effectiveness";
const WORKSHOP = "/team-effectiveness/workshop";
const SECTION_PX = "clamp(24px, 6vw, 80px)";

// Framework accents
const CLARITY = "#F59E2C";
const ALIGNMENT = "#6E3FCC";

const PIECES = [
  {
    title: "Key findings",
    body: "A plain-language summary of where execution is strong, where it's leaking, and why.",
  },
  {
    title: "Recommended focus areas",
    body: "The two or three levers that will move the needle most — not a laundry list.",
  },
  {
    title: "90-day next steps",
    body: "Specific, sequenced actions with owners — so momentum doesn't fade after the workshop.",
  },
];

const WORKSHOPS = [
  {
    powers: "Powers Day 30",
    name: "Clarity Workshop",
    body: "The leadership team re-states the strategy, priorities and the outcomes that matter — so every team works from one definition of done.",
    room: "Leadership team",
    moves: "Strategic clarity",
    accent: CLARITY,
  },
  {
    powers: "Powers Day 60",
    name: "Manager Alignment Workshop",
    body: "The managers who run the work get on the same page — clear decision rights, cleaner handoffs, and a shared rhythm that cuts coordination drag.",
    room: "People managers",
    moves: "Alignment & coordination",
    accent: ALIGNMENT,
  },
];

function Eyebrow({ children, color = "#9D88ED" }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="text-[12px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color }}>
      {children}
    </p>
  );
}

export default function RoadmapClient() {
  return (
    <>
      {/* ───────── 1. HERO — light ───────── */}
      <section
        style={{
          background: "#F8F5FC",
          paddingTop: "clamp(56px, 8vw, 96px)",
          paddingBottom: "clamp(56px, 8vw, 96px)",
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center" style={{ maxWidth: 1100 }}>
          <div>
            <Eyebrow color="#6E3FCC">Part 3 · The Roadmap</Eyebrow>
            <h1
              className="font-extrabold"
              style={{ fontSize: "clamp(36px, 5.4vw, 56px)", lineHeight: 1.07, letterSpacing: "-0.02em", color: "#1E2A4A" }}
            >
              A clear plan for the <span style={{ color: "#6E3FCC" }}>next 90 days.</span>
            </h1>
            <p
              className="mt-6"
              style={{ maxWidth: 560, fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.6, color: "#636B7C" }}
            >
              You don&apos;t leave with a slide deck that gathers dust. You leave with a practical, sequenced plan — the key findings, the focus areas that matter, and the specific next steps for the next quarter.
            </p>
            <div className="flex gap-3 flex-wrap mt-9">
              <TrackedLink
                href={CALENDLY}
                external
                eventName="roadmap_cta"
                eventParams={{ cta: "book_sprint", location: "roadmap_hero" }}
                className="text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px] transition-colors"
                style={{ background: "#E055CB" }}
              >
                Book the sprint →
              </TrackedLink>
              <TrackedLink
                href={CALC}
                eventName="calc_cta"
                eventParams={{ cta: "start_diagnostic", location: "roadmap_hero" }}
                className="text-[14px] font-semibold px-7 py-4 rounded-[10px] border transition-colors hover:bg-white"
                style={{ borderColor: "#E3DCF5", color: "#1E2A4A" }}
              >
                Start with the diagnostic
              </TrackedLink>
            </div>
            <p className="mt-6 text-[13px]" style={{ color: "#9B96A6" }}>
              Delivered after the workshop · yours to keep
            </p>
          </div>

          <div className="relative mx-auto w-full" style={{ maxWidth: 420 }}>
            <Image
              src="/kite.webp"
              alt="A kite climbing — the trajectory of a team that's found its lift"
              width={840}
              height={840}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* ───────── 2. WHAT'S IN YOUR ROADMAP — white ───────── */}
      <section className="bg-white" style={{ paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-12" style={{ maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#6E3FCC">What&apos;s In Your Roadmap</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              Findings, focus, and the next steps.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PIECES.map((p, i) => (
              <div
                key={p.title}
                className="rounded-[16px] border p-7"
                style={{ borderColor: "#F1EEF8", background: "#FCFBFE" }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-full font-extrabold text-white mb-5"
                  style={{ width: 40, height: 40, background: "#6E3FCC", fontSize: 17 }}
                >
                  {i + 1}
                </span>
                <h3 className="text-[18px] font-bold mb-2" style={{ color: "#1E2A4A" }}>
                  {p.title}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "#636B7C" }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 3. THE 90-DAY TRAJECTORY — dark (signature visual) ───────── */}
      <section className="relative overflow-hidden" style={{ background: "#1C1334", paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
        <div className="relative mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-12" style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow>The 90-Day Trajectory</Eyebrow>
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.12 }}>
              Watch the number move.
            </h2>
            <p className="mt-4 mx-auto" style={{ maxWidth: 600, fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              Each phase targets a different lever. As clarity, alignment and coordination improve, your effective capacity climbs — the same number the diagnostic gives you.
            </p>
          </div>

          <TrajectoryChart />
        </div>
      </section>

      {/* ───────── 4. THE WORKSHOPS THAT MOVE IT — light ───────── */}
      <section style={{ background: "#F8F5FC", paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-12" style={{ maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#6E3FCC">The Workshops That Move It</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              Two sessions do the heavy lifting.
            </h2>
            <p className="mt-4 mx-auto" style={{ maxWidth: 600, fontSize: "clamp(16px, 2vw, 18px)", color: "#636B7C", lineHeight: 1.6 }}>
              Two facilitated sessions do the heavy lifting — one to set the direction, one to align the managers who run it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WORKSHOPS.map((w) => (
              <div
                key={w.name}
                className="relative rounded-[18px] border bg-white p-7 md:p-8 flex flex-col"
                style={{ borderColor: "#F1EEF8" }}
              >
                <div className="absolute top-0 left-0 h-full w-1 rounded-l-[18px]" style={{ background: w.accent }} />
                <p className="text-[12px] font-bold tracking-[0.14em] uppercase mb-3" style={{ color: w.accent === ALIGNMENT ? "#6E3FCC" : w.accent }}>
                  {w.powers}
                </p>
                <h3 className="font-extrabold mb-3" style={{ fontSize: 22, color: "#1E2A4A", lineHeight: 1.18 }}>
                  {w.name}
                </h3>
                <p className="text-[15px] leading-relaxed mb-6" style={{ color: "#636B7C" }}>
                  {w.body}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-3 mb-7">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase mb-0.5" style={{ color: "#9B96A6" }}>
                      In the room
                    </p>
                    <p className="text-[14px] font-semibold" style={{ color: "#1E2A4A" }}>{w.room}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase mb-0.5" style={{ color: "#9B96A6" }}>
                      Moves
                    </p>
                    <p className="text-[14px] font-semibold" style={{ color: "#1E2A4A" }}>{w.moves}</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <TrackedLink
                    href={WORKSHOP}
                    eventName="roadmap_cta"
                    eventParams={{ cta: "learn_more_workshop", location: "roadmap_workshops", workshop: w.name }}
                    className="text-[14px] font-bold transition-colors"
                    style={{ color: "#6E3FCC" }}
                  >
                    Learn more →
                  </TrackedLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. WHAT YOU RECEIVE (SAMPLE ROADMAP) — white ───────── */}
      <section className="bg-white" style={{ paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-12" style={{ maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#B23B9F">What You Receive</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              Your roadmap, on one page.
            </h2>
          </div>
          <SampleRoadmapCard />
        </div>
      </section>

      {/* ───────── 6. CLOSING CTA — dark ───────── */}
      <section className="relative overflow-hidden" style={{ background: "#1C1334", paddingTop: "clamp(72px, 10vw, 128px)", paddingBottom: "clamp(72px, 10vw, 128px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }} />
        <div className="relative mx-auto text-center" style={{ maxWidth: 640 }}>
          <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(28px, 4.4vw, 44px)", lineHeight: 1.1 }}>
            A plan you&apos;ll actually use.
          </h2>
          <p className="mx-auto mt-5" style={{ maxWidth: 540, fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
            It all starts with the diagnostic. Get your number, then we build the path.
          </p>
          <div className="mt-9">
            <TrackedLink
              href={CALC}
              eventName="calc_cta"
              eventParams={{ cta: "see_diagnostic", location: "roadmap_closing" }}
              className="inline-block text-white text-[14px] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-[10px]"
              style={{ background: "#E055CB" }}
            >
              See the diagnostic →
            </TrackedLink>
          </div>
          <div className="mt-8">
            <TrackedLink
              href={HUB}
              eventName="te_hub_click"
              eventParams={{ label: "back_to_hub", location: "roadmap_closing" }}
              className="text-[14px] font-semibold transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              ← Back to the Team Effectiveness Sprint
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
