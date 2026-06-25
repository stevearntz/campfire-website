import type { CSSProperties } from "react";
import Image from "next/image";
import TrackedLink from "@/app/components/TrackedLink";

const CALC = "/team-effectiveness/calculator";
const MODEL = "/team-effectiveness/the-model";
const CALENDLY = "https://calendly.com/getcampfire/";

const CHALLENGES = [
  {
    title: "Progress feels slower than it should",
    looksLike: "Too many priorities, lack of focus, difficulty turning plans into action.",
    leftTint: "#E7DFF7",
    rightTint: "#F0EBFA",
    border: "#6E3FCC",
  },
  {
    title: "Communication & coordination break down",
    looksLike: "Information gets stuck, teams work in silos, cross-functional work becomes harder.",
    leftTint: "#E9E2F8",
    rightTint: "#F2EDFB",
    border: "#9D88ED",
  },
  {
    title: "The same issues keep resurfacing",
    looksLike: "Decisions don't stick, accountability is unclear, the same conversations recur.",
    leftTint: "#FAE0EA",
    rightTint: "#FCEDF2",
    border: "#E055CB",
  },
  {
    title: "The team is being asked to adapt quickly",
    looksLike: "New priorities, growth, restructuring, new leaders, changing expectations.",
    leftTint: "#FCE9CA",
    rightTint: "#FDF4DF",
    border: "#F7A83D",
  },
];

const TERMS = [
  { label: "Clarity", color: "#C77DEC", body: "Shared understanding of what we're solving — at every level of the org." },
  { label: "Alignment", color: "#EE80DD", body: "Every team's plan adds up to the same plan — with trade-offs agreed." },
  { label: "Coordination Cost", color: "#F7A83D", body: "The drag of meetings, rework, and politics needed to move work forward." },
  { label: "Capacity", color: "#FFFFFF", body: "The people, skills, and tools — now amplified by AI — available to do the work." },
];

const STEPS = [
  {
    step: 1,
    icon: "/map-icon.png",
    title: "Identify the factors impacting performance",
    desc: "Use a short diagnostic to understand where clarity, alignment, and coordination may be breaking down.",
    href: "/team-effectiveness/diagnostic",
    pillText: "#8B3FD9",
    pillBg: "#F1EAFB",
    learnColor: "#6E3FCC",
  },
  {
    step: 2,
    icon: "/lighthouse-icon.png",
    title: "Align on priorities and opportunities",
    desc: "A virtual or in-person workshop to review findings, align on priorities, and address the team's most important challenges.",
    href: "/team-effectiveness/workshop",
    pillText: "#C8459E",
    pillBg: "#FBE9F4",
    learnColor: "#C8459E",
  },
  {
    step: 3,
    icon: "/campfires-icon.png",
    title: "Get a clear plan to move forward",
    desc: "Receive a practical roadmap with key findings, recommended focus areas, and clear next steps tailored to your team's needs.",
    href: "/team-effectiveness/roadmap",
    pillText: "#DD8327",
    pillBg: "#FBEFDF",
    learnColor: "#DD8327",
  },
];

const OUTCOMES = [
  "Greater clarity and focus",
  "Better communication",
  "Stronger accountability",
  "Faster decision-making",
  "Improved collaboration",
  "More consistent execution",
];

const PAGE_CSS = `
.te-chal-row { display: grid; grid-template-columns: 1fr; gap: 4px; }
@media (min-width: 720px) {
  .te-chal-row { grid-template-columns: 1fr 1fr; gap: 28px; align-items: center; }
}
.te-results { display: grid; grid-template-columns: 1fr; gap: 40px; }
@media (min-width: 860px) {
  .te-results { grid-template-columns: 0.85fr 1.15fr; gap: 56px; align-items: center; }
}
.te-inc-card { transition: border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease; }
.te-inc-card:hover { border-color: #C9B8F2 !important; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(110,63,204,0.13); }
.te-inc-card .te-learn { transition: opacity 160ms ease; }
.te-inc-card:hover .te-learn { opacity: 0.6; }
@keyframes te-bob {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(9px); }
}
.te-scroll-arrow { animation: te-bob 1.6s ease-in-out infinite; transition: opacity 160ms ease; }
.te-scroll-arrow:hover { opacity: 0.65; }

/* ── Mobile (≤640px) ── */
.te-btn-short { display: none; }
@media (max-width: 640px) {
  .te-hero-br { display: none; }
  .te-btn-full { display: none; }
  .te-btn-short { display: inline; }
  .te-chal-row { background: var(--c-strong) !important; }
  .te-chal-desc { padding-left: 0 !important; padding-top: 14px; }
  .te-eq-cols { grid-template-columns: 1fr !important; }
  .te-ribbon-btns { justify-content: center; width: 100%; }
}
`;

export default function HubClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      {/* ───────── 1. HERO ───────── */}
      <header
        id="top"
        className="relative overflow-hidden flex items-center justify-center text-center"
        style={{
          minHeight: 640,
          padding: "clamp(80px, 11vw, 132px) clamp(24px, 6vw, 80px)",
          backgroundImage: "url(/hero-lighthouse.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,13,40,0.55) 0%, rgba(20,13,40,0.18) 32%, rgba(20,13,40,0.42) 100%)",
          }}
        />
        <div className="relative mx-auto" style={{ maxWidth: 940 }}>
          <div
            className="uppercase"
            style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.2em", color: "#B8A4F2", marginBottom: 22 }}
          >
            Team Effectiveness Sprint
          </div>
          <h1
            className="text-white"
            style={{ fontSize: "clamp(40px, 6.4vw, 68px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.02em", margin: 0 }}
          >
            Turn team friction into
            <br className="te-hero-br" />{" "}
            <span style={{ color: "#B8A4F2" }}>forward momentum</span>
          </h1>
          <p
            className="mx-auto"
            style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.6, color: "rgba(255,255,255,0.9)", maxWidth: 560, margin: "26px auto 0" }}
          >
            As work speeds up and priorities shift, teams often lose clarity, alignment, and momentum. Campfire helps teams identify what&apos;s getting in the way and create a practical path forward.
          </p>
          <div className="flex flex-wrap justify-center" style={{ gap: 14, marginTop: 38 }}>
            <TrackedLink
              href={CALC}
              eventName="te_cta"
              eventParams={{ cta: "start_diagnostic", location: "hub_hero" }}
              className="te-btn inline-flex items-center justify-center uppercase whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ lineHeight: 1, fontSize: 13, fontWeight: 700, letterSpacing: "0.09em", color: "#fff", background: "#E055CB", padding: "18px 32px", borderRadius: 8 }}
            >
              <span className="te-btn-full">Get your team effectiveness score →</span>
              <span className="te-btn-short">Get your score →</span>
            </TrackedLink>
            <a
              href="#included"
              className="te-btn inline-flex items-center justify-center uppercase whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ lineHeight: 1, fontSize: 13, fontWeight: 700, letterSpacing: "0.09em", color: "#C9B8F5", background: "transparent", border: "1.5px solid rgba(157,136,237,0.55)", padding: "18px 32px", borderRadius: 8 }}
            >
              How it works
            </a>
          </div>
          <div style={{ fontSize: 21, fontWeight: 400, letterSpacing: "0.02em", color: "rgba(255,255,255,0.62)", marginTop: 22 }}>
            2-minute diagnostic · private to you · no sign-up to start
          </div>
        </div>
        <a
          href="#challenges"
          aria-label="Scroll to challenges"
          className="te-scroll-arrow absolute block"
          style={{ left: "50%", bottom: 26, transform: "translateX(-50%)" }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </header>

      {/* ───────── 2. CHALLENGES ───────── */}
      <section
        id="challenges"
        className="relative overflow-hidden bg-white scroll-mt-24"
        style={{ padding: "clamp(72px, 10vw, 116px) clamp(24px, 6vw, 80px)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "url(/topo-bg.webp) center / cover no-repeat" }}
        />
        <div className="relative mx-auto" style={{ maxWidth: 1100, zIndex: 1 }}>
          <div className="text-center mx-auto" style={{ maxWidth: 720, marginBottom: 52 }}>
            <div className="uppercase" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.16em", color: "#6E3FCC", marginBottom: 16 }}>
              Sound Familiar?
            </div>
            <h2 style={{ fontSize: "clamp(31px, 4.4vw, 46px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.015em", color: "#262F56", margin: 0 }}>
              The challenges <br />
              <span style={{ color: "#6E3FCC" }}>slowing teams down.</span>
            </h2>
            <p className="mx-auto" style={{ fontSize: 17, lineHeight: 1.6, color: "#636B7C", margin: "18px auto 0", maxWidth: 560 }}>
              If your team is experiencing one or more of these challenges, you&apos;re not alone. The good news? They&apos;re solvable.
            </p>
          </div>

          <div className="mx-auto flex flex-col" style={{ maxWidth: 1200, gap: 12 }}>
            {CHALLENGES.map((row) => (
              <div
                key={row.title}
                className="te-chal-row"
                style={{
                  background: `linear-gradient(to right, ${row.leftTint} 0%, ${row.leftTint} 50%, ${row.rightTint} 50%, ${row.rightTint} 100%)`,
                  borderLeft: `5px solid ${row.border}`,
                  borderRadius: 8,
                  padding: "26px 46px 26px 30px",
                  ["--c-strong" as string]: row.leftTint,
                } as CSSProperties}
              >
                <div style={{ fontSize: 25, fontWeight: 600, lineHeight: 1.25, color: "#262F56" }}>{row.title}</div>
                <div className="te-chal-desc" style={{ fontSize: "20.12px", lineHeight: 1.4, color: "#636B7C", paddingLeft: 25 }}>
                  <span style={{ fontWeight: 700, color: "#262F56" }}>This often looks like:</span> {row.looksLike}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 3. THE PATTERN (equation) ───────── */}
      <section
        className="relative"
        style={{ background: "#1C1334", padding: "clamp(64px, 9vw, 104px) clamp(24px, 6vw, 80px) 0" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.28 }}
        />
        <div className="relative mx-auto text-center" style={{ maxWidth: 1160 }}>
          <div className="uppercase" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.18em", color: "#B8A4F2", marginBottom: 16 }}>
            The Pattern
          </div>
          <h2 style={{ fontSize: "clamp(30px, 4.4vw, 48px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>
            The variables that drive execution.
          </h2>
          <p className="mx-auto" style={{ fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.55, color: "rgba(255,255,255,0.72)", margin: "14px auto 0", maxWidth: 620 }}>
            The strongest organizations improve the variables that drive execution.
          </p>

          {/* BIG EQUATION */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 18,
              padding: "clamp(34px, 5vw, 56px) clamp(20px, 4vw, 48px)",
              margin: "clamp(40px, 6vw, 64px) 0 clamp(34px, 5vw, 52px)",
            }}
          >
            <div
              className="flex flex-wrap items-center justify-center"
              style={{ gap: "clamp(12px, 1.8vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}
            >
              <span style={{ fontSize: "clamp(25px, 4.2vw, 43px)", color: "#fff", whiteSpace: "nowrap" }}>Execution</span>
              <span style={{ fontSize: "clamp(25px, 4.2vw, 43px)", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>=</span>
              <span className="inline-flex flex-col items-center" style={{ gap: "clamp(8px, 1.2vw, 15px)" }}>
                <span className="inline-flex items-baseline" style={{ gap: "clamp(10px, 1.5vw, 20px)", fontSize: "clamp(28px, 5.5vw, 53px)", whiteSpace: "nowrap" }}>
                  <span style={{ color: "#C77DEC" }}>Clarity</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: "0.7em" }}>×</span>
                  <span style={{ color: "#EE80DD" }}>Alignment</span>
                </span>
                <span style={{ width: "100%", height: 5, borderRadius: 2, background: "rgba(255,255,255,0.85)" }} />
                <span style={{ fontSize: "clamp(28px, 5.5vw, 53px)", color: "#F7A83D", whiteSpace: "nowrap" }}>Coordination Cost</span>
              </span>
            </div>
          </div>

          {/* FOUR COLUMNS */}
          <div
            className="grid mx-auto text-left te-eq-cols"
            style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(20px, 2.4vw, 36px)", maxWidth: 1160 }}
          >
            {TERMS.map((t) => (
              <div key={t.label}>
                <div style={{ height: 3, borderRadius: 2, background: t.color, marginBottom: 16 }} />
                <div className="uppercase" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: t.color, marginBottom: 10 }}>
                  {t.label}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.78)", margin: 0 }}>{t.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GRADIENT DIAGNOSTIC BANNER */}
        <div className="relative mx-auto" style={{ maxWidth: 1160, zIndex: 5, margin: "clamp(44px, 6vw, 64px) auto -34px" }}>
          <div
            className="flex flex-wrap items-center justify-between"
            style={{
              gap: 20,
              background: "linear-gradient(100deg, #8B3FD4 0%, #C04CC6 55%, #E055CB 100%)",
              borderRadius: 16,
              padding: "clamp(22px, 3vw, 30px) clamp(24px, 4vw, 40px)",
              boxShadow: "0 18px 44px -22px rgba(192,76,198,0.7)",
            }}
          >
            <div className="flex items-center" style={{ gap: 16, minWidth: 0 }}>
              <Image src="/insights.png" alt="" width={30} height={30} style={{ flex: "none" }} />
              <span style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>
                Discover the execution level at your organization in 2 minutes!
              </span>
            </div>
            <div className="flex flex-wrap te-ribbon-btns" style={{ gap: 12 }}>
              <TrackedLink
                href={CALC}
                eventName="te_cta"
                eventParams={{ cta: "start_diagnostic", location: "hub_banner" }}
                className="te-btn uppercase whitespace-nowrap transition-opacity hover:opacity-90"
                style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.09em", color: "#fff", background: "#6E3FCC", padding: "14px 24px", borderRadius: 8 }}
              >
                Take the diagnostic
              </TrackedLink>
              <TrackedLink
                href={MODEL}
                eventName="te_link"
                eventParams={{ label: "see_full_model", location: "hub_banner" }}
                className="te-btn uppercase whitespace-nowrap transition-opacity hover:opacity-90"
                style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.09em", color: "#fff", background: "transparent", border: "1px solid rgba(255,255,255,0.55)", padding: "13px 24px", borderRadius: 8 }}
              >
                See full model
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 4. WHAT'S INCLUDED ───────── */}
      <section
        id="included"
        className="relative scroll-mt-24"
        style={{
          zIndex: 1,
          padding: "clamp(110px, 13vw, 168px) clamp(24px, 6vw, 80px)",
          background: "#F2F0F4 url(/multicolour-mountain.webp) center bottom / cover no-repeat",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 1160 }}>
          <div className="text-center mx-auto" style={{ maxWidth: 1000, marginBottom: 56 }}>
            <div className="uppercase" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.16em", color: "#6E3FCC", marginBottom: 16 }}>
              The Execution Sprint
            </div>
            <h2 className="whitespace-normal md:whitespace-nowrap" style={{ fontSize: "clamp(31px, 4.4vw, 46px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.015em", color: "#262F56", margin: 0 }}>
              Three parts. One clear path forward.
            </h2>
            <p className="mx-auto" style={{ fontSize: 17, lineHeight: 1.6, color: "#636B7C", margin: "18px auto 0", maxWidth: 540 }}>
              A simple, guided process to help teams identify the challenges slowing progress and start building momentum together.
            </p>
          </div>
          <div className="grid items-stretch grid-cols-1 md:grid-cols-3" style={{ gap: 20 }}>
            {STEPS.map((s) => (
              <TrackedLink
                key={s.step}
                href={s.href}
                eventName="te_link"
                eventParams={{ label: "learn_more", location: `hub_step_${s.step}` }}
                className="te-inc-card relative flex flex-col"
                style={{ textDecoration: "none", background: "#fff", border: "1px solid #ECE8F2", borderRadius: 20, padding: "34px 30px" }}
              >
                <div
                  className="absolute uppercase"
                  style={{ top: 22, right: 22, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: s.pillText, background: s.pillBg, padding: "6px 12px", borderRadius: 999 }}
                >
                  • Step {s.step}
                </div>
                <Image src={s.icon} alt="" width={64} height={64} style={{ objectFit: "contain", marginBottom: 22 }} />
                <h3 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.15, color: "#262F56", margin: "0 0 12px" }}>{s.title}</h3>
                <p style={{ fontSize: "15.5px", lineHeight: 1.55, color: "#636B7C", margin: 0 }}>{s.desc}</p>
                <div style={{ marginTop: "auto", paddingTop: 26 }}>
                  <span
                    className="te-learn inline-flex items-center uppercase"
                    style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", color: s.learnColor }}
                  >
                    Learn more →
                  </span>
                </div>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. RESULTS ───────── */}
      <section
        id="outcomes"
        className="bg-white scroll-mt-24"
        style={{ padding: "clamp(72px, 10vw, 116px) clamp(24px, 6vw, 80px)" }}
      >
        <div className="te-results mx-auto" style={{ maxWidth: 1240 }}>
          <div>
            <div className="uppercase" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.16em", color: "#6E3FCC", marginBottom: 18 }}>
              The Results
            </div>
            <h2 style={{ fontSize: "clamp(30px, 3.6vw, 44px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.015em", color: "#262F56", margin: 0 }}>
              Designed to improve how teams work together
            </h2>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            {OUTCOMES.map((o) => (
              <div
                key={o}
                className="flex items-center"
                style={{ gap: 13, background: "#F8F5FC", border: "1px solid #EEE9F6", borderRadius: 12, padding: "17px 20px" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" style={{ flex: "none" }}>
                  <circle cx="12" cy="12" r="11" fill="#F0EAFB" stroke="#DECEF7" strokeWidth="1" />
                  <path d="M7.4 12.3l2.9 2.9L16.6 8.8" fill="none" stroke="#6E3FCC" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3, color: "#262F56" }}>{o}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 6. INVESTMENT ───────── */}
      <section
        id="investment"
        className="text-center scroll-mt-24"
        style={{ padding: "clamp(72px, 9vw, 110px) clamp(24px, 6vw, 80px)", background: "#F2F0F6" }}
      >
        <div className="mx-auto" style={{ maxWidth: 620 }}>
          <div className="uppercase" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.16em", color: "#6E3FCC", marginBottom: 20 }}>
            Investment
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#8A8499", marginBottom: 4 }}>Starting at:</div>
          <div style={{ fontSize: "clamp(54px, 8vw, 84px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#262F56", lineHeight: 1 }}>
            $5,000
          </div>
          <p className="mx-auto" style={{ fontSize: 17, lineHeight: 1.6, color: "#636B7C", margin: "22px auto 32px", maxWidth: 460 }}>
            Pricing varies based on team size and scope. Every sprint includes the diagnostic, facilitated workshop, and a customized roadmap.
          </p>
          <TrackedLink
            href={CALENDLY}
            external
            eventName="te_cta"
            eventParams={{ cta: "book_call", location: "hub_investment" }}
            className="te-btn inline-block uppercase whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.09em", color: "#fff", background: "#B763E7", padding: "17px 32px", borderRadius: 8 }}
          >
            Talk to our team →
          </TrackedLink>
        </div>
      </section>

      {/* ───────── 7. FINAL CTA ───────── */}
      <section
        className="relative overflow-hidden text-center"
        style={{ background: "linear-gradient(120deg, #4A23A0 0%, #6E3FCC 50%, #9A45CE 100%)", padding: "clamp(84px, 11vw, 130px) clamp(24px, 6vw, 80px)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "url(/topo-lines.webp)", backgroundSize: "cover", backgroundPosition: "center", mixBlendMode: "overlay", opacity: 0.22 }}
        />
        <div className="relative mx-auto" style={{ maxWidth: 680 }}>
          <h2 className="whitespace-normal md:whitespace-nowrap text-white" style={{ fontSize: "clamp(30px, 4.2vw, 46px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", margin: 0 }}>
            Explore what&apos;s possible for your team
          </h2>
          <p className="mx-auto" style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.85)", maxWidth: 540, margin: "22px auto 38px" }}>
            Let&apos;s talk about your team, the challenges you&apos;re facing, and whether the Team Effectiveness Sprint is the right fit.
          </p>
          <TrackedLink
            href={CALENDLY}
            external
            eventName="te_cta"
            eventParams={{ cta: "book_call", location: "hub_closing" }}
            className="te-btn inline-block uppercase whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.09em", color: "#fff", background: "#E055CB", padding: "18px 38px", borderRadius: 8, boxShadow: "0 16px 38px -18px rgba(224,85,203,0.8)" }}
          >
            Schedule a conversation →
          </TrackedLink>
        </div>
      </section>
    </>
  );
}
