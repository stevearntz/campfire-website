import TrackedLink from "@/app/components/TrackedLink";
import EquationBlock from "./EquationBlock";
import PartCard from "./PartCard";

const CALC = "/team-effectiveness/calculator";
const CALENDLY = "https://calendly.com/getcampfire/";
const SECTION_PX = "clamp(24px, 6vw, 80px)";

const CHALLENGES = [
  {
    challenge: "Progress feels slower than it should",
    looksLike: "Too many priorities, lack of focus, difficulty turning plans into action",
  },
  {
    challenge: "Communication and coordination break down",
    looksLike: "Information gets stuck, teams work in silos, cross-functional work becomes harder",
  },
  {
    challenge: "The same issues keep resurfacing",
    looksLike: "Decisions don't stick, accountability is unclear, the same conversations keep happening",
  },
  {
    challenge: "The team is being asked to adapt quickly",
    looksLike: "New priorities, growth, restructuring, new leaders, changing expectations",
  },
];

const TERMS = [
  { label: "Clarity", micro: "Foundation", color: "#F59E2C", body: "A shared understanding of priorities, expectations, and outcomes." },
  { label: "Alignment", micro: "Multiplier", color: "#6E3FCC", body: "People and teams moving in the same direction." },
  { label: "Coordination Cost", micro: "Drag", color: "#E055CB", body: "The time and effort spent on meetings, handoffs, and rework." },
];

const PARTS = [
  { step: 1, name: "Identify the factors impacting performance", illo: "/binoculars.webp", href: "/team-effectiveness/diagnostic", desc: "Use a short diagnostic to understand where clarity, alignment, and coordination may be breaking down." },
  { step: 2, name: "Align on priorities and opportunities", illo: "/carry-load.webp", href: "/team-effectiveness/workshop", desc: "A virtual or in-person workshop to review findings, align on priorities, and address the team's most important challenges." },
  { step: 3, name: "Get a clear plan to move forward", illo: "/kite.webp", href: "/team-effectiveness/roadmap", desc: "Receive a practical roadmap with key findings, recommended focus areas, and clear next steps tailored to your team's needs." },
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
        className="relative overflow-hidden text-center"
        style={{ background: "#1C1334", paddingTop: "clamp(72px, 11vw, 132px)", paddingBottom: "clamp(72px, 11vw, 132px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "url(/purple-topo-tall.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.14 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(115% 85% at 50% 0%, rgba(110,63,204,0.34) 0%, rgba(28,19,52,0) 60%)" }}
        />
        <div className="relative mx-auto text-center" style={{ maxWidth: 820 }}>
          <Eyebrow>Team Effectiveness Sprint</Eyebrow>
          <h1
            className="font-extrabold text-white"
            style={{ fontSize: "clamp(38px, 6vw, 62px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Turn team friction into{" "}
            <span style={{ color: "#E055CB" }}>forward momentum</span>
          </h1>
          <p
            className="mx-auto"
            style={{ maxWidth: 660, marginTop: 26, fontSize: "clamp(17px, 2vw, 20px)", lineHeight: 1.6, color: "rgba(255,255,255,0.82)" }}
          >
            As work speeds up and priorities shift, teams often lose clarity, alignment, and momentum. Campfire helps teams identify what&apos;s getting in the way and create a practical path forward.
          </p>
          <div className="flex flex-wrap justify-center" style={{ gap: 14, marginTop: 38 }}>
            <TrackedLink
              href={CALC}
              eventName="te_cta"
              eventParams={{ cta: "start_diagnostic", location: "hub_hero" }}
              className="text-white text-[14px] font-bold tracking-[0.1em] uppercase rounded-[8px] whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ background: "#E055CB", padding: "17px 32px" }}
            >
              Get your team effectiveness score →
            </TrackedLink>
            <TrackedLink
              href={CALENDLY}
              external
              eventName="te_cta"
              eventParams={{ cta: "book_call", location: "hub_hero" }}
              className="text-[14px] font-bold tracking-[0.1em] uppercase rounded-[8px] transition-opacity hover:opacity-90"
              style={{ background: "#ffffff", color: "#1E2A4A", padding: "17px 32px" }}
            >
              Talk with our team
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ───────── 2. CHALLENGES — white ───────── */}
      <section className="bg-white" style={{ paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-12" style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#B23B9F">Sound Familiar?</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              The challenges slowing teams down
            </h2>
            <p className="mt-4" style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "#636B7C", lineHeight: 1.6 }}>
              If your team is experiencing one or more of these challenges, you&apos;re not alone. The good news? They&apos;re solvable.
            </p>
          </div>

          {/* Two-column table: Challenge / What it often looks like */}
          <div className="rounded-[16px] border overflow-hidden" style={{ borderColor: "#EEE9F6" }}>
            <div className="hidden md:grid" style={{ gridTemplateColumns: "40% 1fr", background: "#F8F5FC" }}>
              <div className="px-6 py-4 text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: "#9B96A6" }}>Challenge</div>
              <div className="px-6 py-4 text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: "#9B96A6" }}>What it often looks like</div>
            </div>
            {CHALLENGES.map((row, i) => (
              <div
                key={row.challenge}
                className="md:grid"
                style={{ gridTemplateColumns: "40% 1fr", borderTop: i === 0 ? undefined : "1px solid #F1EEF8" }}
              >
                <div className="px-6 pt-5 pb-1.5 md:py-5 text-[16px] font-bold" style={{ color: "#1E2A4A" }}>
                  {row.challenge}
                </div>
                <div className="px-6 pb-5 pt-0 md:py-5 text-[15px] leading-relaxed" style={{ color: "#636B7C" }}>
                  {row.looksLike}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 3. THE EXECUTION EQUATION — dark ───────── */}
      <section className="relative overflow-hidden" style={{ background: "#1C1334", paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
        <div className="relative mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-12" style={{ maxWidth: 660, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow>The Execution Equation</Eyebrow>
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.12 }}>
              The factors that drive team effectiveness
            </h2>
            <p className="mt-4" style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              Team effectiveness doesn&apos;t happen by accident. It&apos;s driven by a handful of factors that determine how work gets done.
            </p>
          </div>

          <div className="rounded-[20px] border px-6 py-10 md:py-12" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)" }}>
            <EquationBlock variant="dark" result="Team Effectiveness" showCapacity={false} />
            <p className="text-center mx-auto mt-7" style={{ maxWidth: 600, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>
              Capacity matters too. AI can increase a team&apos;s capacity, but capacity alone doesn&apos;t create results. Teams still need clarity, alignment, and coordination to translate potential into performance.
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
              eventName="te_cta"
              eventParams={{ cta: "start_diagnostic", location: "hub_equation" }}
              className="text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px]"
              style={{ background: "#E055CB" }}
            >
              Get your team effectiveness score →
            </TrackedLink>
            <TrackedLink
              href="/team-effectiveness/the-model"
              eventName="te_link"
              eventParams={{ label: "explore_model", location: "hub_equation" }}
              className="text-white text-[14px] font-semibold px-7 py-4 rounded-[10px] border transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              Explore the model
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ───────── 4. THE SPRINT — light ───────── */}
      <section id="included" className="scroll-mt-20" style={{ background: "#F8F5FC", paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <div className="text-center mb-12" style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#6E3FCC">The Team Effectiveness Sprint</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              From insight to action in three steps
            </h2>
            <p className="mt-4" style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "#636B7C", lineHeight: 1.6 }}>
              A simple, guided process to help teams identify the challenges slowing progress and start building momentum together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PARTS.map((p) => (
              <PartCard key={p.step} step={p.step} name={p.name} illo={p.illo} desc={p.desc} href={p.href} />
            ))}
          </div>
          <div className="text-center mt-10">
            <TrackedLink
              href={CALENDLY}
              external
              eventName="te_cta"
              eventParams={{ cta: "book_call", location: "hub_sprint" }}
              className="inline-block text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px]"
              style={{ background: "#6E3FCC" }}
            >
              Schedule a conversation →
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ───────── 5. RESULTS — white ───────── */}
      <section className="bg-white" style={{ paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-12" style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#B23B9F">The Results</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              Designed to improve how teams work together
            </h2>
            <p className="mt-4" style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "#636B7C", lineHeight: 1.6 }}>
              While every team is different, these are some of the most common outcomes teams experience after the sprint.
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
          <p className="text-[15px] font-semibold" style={{ color: "#9B96A6" }}>Starting at</p>
          <p className="font-extrabold" style={{ fontSize: "clamp(44px, 8vw, 68px)", color: "#1E2A4A", lineHeight: 1 }}>
            $5,000
          </p>
          <p className="mx-auto mt-5" style={{ maxWidth: 520, fontSize: "clamp(16px, 2vw, 18px)", color: "#636B7C", lineHeight: 1.6 }}>
            Pricing varies based on team size and scope. Every sprint includes the diagnostic, facilitated workshop, and a customized roadmap.
          </p>
          <div className="mt-8">
            <TrackedLink
              href={CALENDLY}
              external
              eventName="te_cta"
              eventParams={{ cta: "book_call", location: "hub_investment" }}
              className="inline-block text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px]"
              style={{ background: "#E055CB" }}
            >
              Talk to our team →
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ───────── 7. CLOSING CTA — dark ───────── */}
      <section className="relative overflow-hidden" style={{ background: "#1C1334", paddingTop: "clamp(72px, 10vw, 128px)", paddingBottom: "clamp(72px, 10vw, 128px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(/pink-topo-bg.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.18 }} />
        <div className="relative mx-auto text-center" style={{ maxWidth: 640 }}>
          <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(28px, 4.4vw, 44px)", lineHeight: 1.1 }}>
            Explore what&apos;s possible for your team
          </h2>
          <p className="mx-auto mt-5" style={{ maxWidth: 540, fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
            Let&apos;s talk about your team, the challenges you&apos;re facing, and whether the Team Effectiveness Sprint is the right fit.
          </p>
          <div className="mt-9">
            <TrackedLink
              href={CALENDLY}
              external
              eventName="te_cta"
              eventParams={{ cta: "book_call", location: "hub_closing" }}
              className="inline-block text-white text-[14px] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-[10px]"
              style={{ background: "#E055CB" }}
            >
              Schedule a conversation →
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
