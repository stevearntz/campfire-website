import TrackedLink from "@/app/components/TrackedLink";
import EquationBlock from "./EquationBlock";
import ChallengeCard from "./ChallengeCard";
import PartCard from "./PartCard";

const CALC = "/team-effectiveness/calculator";
const SECTION_PX = "clamp(24px, 6vw, 80px)";

const CHALLENGES = [
  {
    accent: "#F59E2C",
    title: "The team is working hard, but progress feels slower than it should.",
    points: ["Too many competing priorities", "Lack of focus", "Difficulty turning plans into action"],
  },
  {
    accent: "#6E3FCC",
    title: "Communication and coordination are breaking down.",
    points: ["Information isn't flowing effectively", "Teams are working in silos", "Cross-functional work feels difficult"],
  },
  {
    accent: "#E055CB",
    title: "The same issues keep resurfacing — and never fully resolve.",
    points: ["Decisions aren't sticking", "Accountability is unclear", "Leaders keep revisiting the same conversations"],
  },
  {
    accent: "#9D88ED",
    title: "The team is navigating change on several fronts at once.",
    points: ["New strategy or priorities", "Growth, restructuring, or AI adoption", "New leaders or evolving responsibilities"],
  },
];

const TERMS = [
  { label: "Clarity", micro: "Foundation", color: "#F59E2C", body: "Shared understanding of what we're solving — at every level of the org." },
  { label: "Alignment", micro: "Multiplier", color: "#6E3FCC", body: "Every team's plan adds up to the same plan, with trade-offs agreed." },
  { label: "Coordination Cost", micro: "Drag", color: "#E055CB", body: "The drag of meetings, rework and politics needed to move work forward." },
];

const PARTS = [
  { step: 1, name: "Team Effectiveness Diagnostic", illo: "/binoculars.webp", href: "/team-effectiveness/diagnostic", desc: "A short assessment to understand how the team is currently functioning and identify the biggest opportunities for improvement." },
  { step: 2, name: "Facilitated Workshop", illo: "/carry-load.webp", href: "/team-effectiveness/workshop", desc: "A virtual or in-person workshop to review findings, align on priorities, and address the team's most important challenges." },
  { step: 3, name: "Team Roadmap", illo: "/kite.webp", href: "/team-effectiveness/roadmap", desc: "A practical summary of key findings, recommended focus areas, and next steps for the next 90 days." },
];

const OUTCOMES = [
  "Greater clarity and focus",
  "Better communication",
  "Stronger accountability",
  "Faster decision-making",
  "Improved collaboration",
  "More consistent execution",
];

function Eyebrow({ children, color = "#9D88ED" }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="text-[12px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color }}>
      {children}
    </p>
  );
}

export default function HubClient() {
  return (
    <>
      {/* ───────── 1. HERO — dark ───────── */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{ background: "#1C1334", minHeight: "clamp(560px, calc(100vh - 64px), 820px)", paddingTop: 48, paddingBottom: 48, paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "url(/purple-topo-tall.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.13 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(110% 80% at 50% 0%, rgba(110,63,204,0.32), rgba(28,19,52,0) 62%)" }}
        />
        <div className="relative mx-auto text-center" style={{ maxWidth: 780 }}>
          <Eyebrow>Team Effectiveness Sprint</Eyebrow>
          <h1
            className="font-extrabold text-white"
            style={{ fontSize: "clamp(38px, 5.6vw, 60px)", lineHeight: 1.06, letterSpacing: "-0.02em" }}
          >
            Your team is working hard.
            <br />
            <span style={{ color: "#9D88ED" }}>Why does progress feel slow?</span>
          </h1>
          <p
            className="mx-auto mt-6"
            style={{ maxWidth: 600, fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}
          >
            When priorities shift, teams grow, or AI accelerates the pace, communication and coordination quietly break down — and the cracks show faster than ever. A focused sprint to find what&apos;s slowing you down, with a practical plan to move forward.
          </p>
          <div className="flex gap-3 justify-center flex-wrap mt-9">
            <TrackedLink
              href={CALC}
              eventName="calc_cta"
              eventParams={{ cta: "start_diagnostic", location: "hub_hero" }}
              className="text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px] transition-colors"
              style={{ background: "#E055CB" }}
            >
              Start the diagnostic →
            </TrackedLink>
            <TrackedLink
              href="#included"
              eventName="te_hub_click"
              eventParams={{ label: "how_it_works", location: "hub_hero" }}
              className="text-white text-[14px] font-semibold px-7 py-4 rounded-[10px] border transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              How it works
            </TrackedLink>
          </div>
          <p className="mt-6 text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            2-minute diagnostic · private to you · no sign-up to start
          </p>
        </div>
      </section>

      {/* ───────── 2. CHALLENGES — white ───────── */}
      <section className="bg-white" style={{ paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <div className="text-center mb-12" style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#B23B9F">Sound Familiar?</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              Common challenges we help teams address.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
            {CHALLENGES.map((c) => (
              <ChallengeCard key={c.title} accent={c.accent} title={c.title} points={c.points} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 3. THE PATTERN / EQUATION — dark ───────── */}
      <section className="relative overflow-hidden" style={{ background: "#1C1334", paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
        <div className="relative mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-12" style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow>The Pattern</Eyebrow>
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.12 }}>
              The execution equation.
            </h2>
            <p className="mt-4" style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              Every organization is silently solving for this. Most aren&apos;t naming it.
            </p>
          </div>

          <div className="rounded-[20px] border px-6 py-10 md:py-12" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)" }}>
            <EquationBlock variant="dark" />
            <p className="text-center mx-auto mt-7" style={{ maxWidth: 560, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>
              Then scale it by capacity — your people × the AI they wield. AI raises the ceiling; only execution turns it into output.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {TERMS.map((t) => (
              <div key={t.label}>
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {t.micro}
                </p>
                <h3 className="text-[18px] font-bold mb-2" style={{ color: t.color === "#6E3FCC" ? "#9D88ED" : t.color }}>
                  {t.label}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {t.body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center flex-wrap mt-12">
            <TrackedLink
              href={CALC}
              eventName="calc_cta"
              eventParams={{ cta: "start_diagnostic", location: "hub_equation" }}
              className="text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px]"
              style={{ background: "#E055CB" }}
            >
              Take the diagnostic →
            </TrackedLink>
            <TrackedLink
              href="/team-effectiveness/the-model"
              eventName="te_hub_click"
              eventParams={{ label: "read_the_model", location: "hub_equation" }}
              className="text-white text-[14px] font-semibold px-7 py-4 rounded-[10px] border transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              Read the full model
            </TrackedLink>
          </div>

          <p className="text-center mx-auto mt-10" style={{ maxWidth: 560, fontSize: "clamp(16px, 2.2vw, 20px)", lineHeight: 1.5, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
            <span style={{ color: "#9D88ED" }}>&ldquo;Your 300 employees execute like 90.&rdquo;</span> See your number in two minutes.
          </p>
        </div>
      </section>

      {/* ───────── 4. WHAT'S INCLUDED — light ───────── */}
      <section id="included" className="scroll-mt-20" style={{ background: "#F8F5FC", paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <div className="text-center mb-12" style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#6E3FCC">The Execution Sprint</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              Three parts. One clear path forward.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PARTS.map((p) => (
              <PartCard key={p.step} step={p.step} name={p.name} illo={p.illo} desc={p.desc} href={p.href} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. OUTCOMES — white ───────── */}
      <section className="bg-white" style={{ paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-12" style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#B23B9F">What Changes</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              What your team walks away with.
            </h2>
            <p className="mt-4" style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "#636B7C", lineHeight: 1.6 }}>
              Not a report that gathers dust — concrete shifts in how the team works, decides, and executes together.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 mx-auto" style={{ maxWidth: 880 }}>
            {OUTCOMES.map((o) => (
              <div key={o} className="flex items-center gap-3 rounded-[12px] border px-4 py-3.5" style={{ borderColor: "#F1EEF8", background: "#FCFBFE" }}>
                <span className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: "#F3EFFE" }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5l3.5 3.5L13 5" stroke="#6E3FCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[16px] font-medium" style={{ color: "#1E2A4A" }}>{o}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 6. INVESTMENT — light ───────── */}
      <section style={{ background: "#F8F5FC", paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto text-center" style={{ maxWidth: 640 }}>
          <Eyebrow color="#6E3FCC">Investment</Eyebrow>
          <p className="text-[15px] font-semibold" style={{ color: "#9B96A6" }}>Starts at</p>
          <p className="font-extrabold" style={{ fontSize: "clamp(48px, 9vw, 76px)", color: "#1E2A4A", lineHeight: 1 }}>
            $5k
          </p>
          <p className="mx-auto mt-5" style={{ maxWidth: 520, fontSize: "clamp(16px, 2vw, 18px)", color: "#636B7C", lineHeight: 1.6 }}>
            Depending on team size and scope. Includes the diagnostic, the facilitated workshop, and your 90-day roadmap.
          </p>
          <div className="mt-8">
            <TrackedLink
              href={CALC}
              eventName="calc_cta"
              eventParams={{ cta: "start_diagnostic", location: "hub_investment" }}
              className="inline-block text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px]"
              style={{ background: "#E055CB" }}
            >
              Start with the diagnostic →
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ───────── 7. CLOSING CTA — dark ───────── */}
      <section className="relative overflow-hidden" style={{ background: "#1C1334", paddingTop: "clamp(72px, 10vw, 128px)", paddingBottom: "clamp(72px, 10vw, 128px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(/pink-topo-bg.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.18 }} />
        <div className="relative mx-auto text-center" style={{ maxWidth: 640 }}>
          <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(28px, 4.4vw, 44px)", lineHeight: 1.1 }}>
            See what&apos;s slowing your team down.
          </h2>
          <p className="mx-auto mt-5" style={{ maxWidth: 540, fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
            Start with the two-minute diagnostic. You&apos;ll see your team&apos;s effective capacity — and the fastest lever to grow it.
          </p>
          <div className="mt-9">
            <TrackedLink
              href={CALC}
              eventName="calc_cta"
              eventParams={{ cta: "start_diagnostic", location: "hub_closing" }}
              className="inline-block text-white text-[14px] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-[10px]"
              style={{ background: "#E055CB" }}
            >
              Start the diagnostic →
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
