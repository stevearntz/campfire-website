"use client";

import Image from "next/image";
import TrackedLink from "@/app/components/TrackedLink";
import StepShowcase, { type Slide } from "./StepShowcase";

const CALC = "/team-effectiveness/calculator";
const CALENDLY = "https://calendly.com/getcampfire/";
const HUB = "/team-effectiveness";
const DIAGNOSTIC = "/team-effectiveness/diagnostic";
const SECTION_PX = "clamp(24px, 6vw, 80px)";

// Framework accents
const CLARITY = "#F59E2C";
const ALIGNMENT = "#6E3FCC";
const COORDINATION = "#E055CB";

const MOVES = [
  {
    title: "Review the findings",
    body: "We walk the team through the diagnostic together — no surprises, shared language, everyone seeing the same picture.",
  },
  {
    title: "Align on priorities",
    body: "We make the trade-offs explicit and get real agreement on what matters most — and what doesn't.",
  },
  {
    title: "Address the challenges",
    body: "We work the biggest barriers live and leave with concrete commitments, not just a list of problems.",
  },
];

const METHODS = [
  {
    name: "For Clarity",
    accent: CLARITY,
    when: "When the room has too many opinions and no heading.",
    beats: ["Reflect", "Group", "Debate", "Decide"],
    meta: "Exec offsite · 3–4 hrs · ends with one shared direction",
    tag: "This workshop",
  },
  {
    name: "For Alignment",
    accent: ALIGNMENT,
    when: "When the heading is set, but the team isn't theirs yet.",
    beats: ["Reflect", "Connect", "Commit", "Follow Through"],
    meta: "Cascade or kickoff · 30–60 min · one commitment each",
    tag: null,
  },
  {
    name: "For Learning",
    accent: COORDINATION,
    when: "When the skill needs reps, not slides.",
    beats: ["Reflect", "Breakout", "Share", "Discuss"],
    meta: "Workshops · 45–90 min · one behavior",
    tag: null,
  },
];

const SHOWCASE_SLIDES: Slide[] = [
  {
    eyebrow: "The Session",
    title: "Strategic Alignment Workshop",
    paragraph:
      "A half-day working session that takes your team from scattered to aligned. Here's how the time is spent.",
    accent: ALIGNMENT,
  },
  {
    eyebrow: "Step 1 · Ground",
    title: "Where are we today?",
    paragraph:
      "Review the diagnostic together — clarity, alignment, and coordination cost. One shared picture, no surprises.",
    accent: CLARITY,
  },
  {
    eyebrow: "Step 2 · Clarify",
    title: "What are we actually solving?",
    paragraph:
      "Name the customer, the problem, and what success looks like — until everyone can say it the same way.",
    accent: CLARITY,
  },
  {
    eyebrow: "Step 3 · Align",
    title: "Whose plan is the plan?",
    paragraph:
      "Surface the competing priorities and make the trade-offs explicit. Agree on the few things that matter most.",
    accent: ALIGNMENT,
  },
  {
    eyebrow: "Step 4 · Coordinate",
    title: "How will we move together?",
    paragraph:
      "Redesign the meetings, handoffs, and decision rights creating drag — a lighter cadence with clearer ownership.",
    accent: COORDINATION,
  },
  {
    eyebrow: "Step 5 · Commit",
    title: "Who owns what, by when?",
    paragraph:
      "Turn agreements into concrete commitments with owners and dates — decisions built to stick.",
    accent: ALIGNMENT,
  },
  {
    eyebrow: "You leave with",
    title: "A 90-day path forward",
    paragraph:
      "A shared read on what's slowing you down, agreed priorities, and the first moves of your roadmap.",
    accent: COORDINATION,
  },
];

const LEAVE_WITH = [
  "A shared read on what's slowing you down",
  "Agreement on the top priorities",
  "Clear owners and next actions",
  "Momentum the team can feel",
];

function Eyebrow({ children, color = "#9D88ED" }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="text-[12px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color }}>
      {children}
    </p>
  );
}

export default function WorkshopClient() {
  return (
    <>
      {/* ───────── 1. HERO — dark ───────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "#1C1334",
          paddingTop: "clamp(56px, 8vw, 96px)",
          paddingBottom: "clamp(56px, 8vw, 96px)",
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(110% 80% at 50% 0%, rgba(110,63,204,0.3), rgba(28,19,52,0) 62%)" }}
        />
        <div className="relative mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center" style={{ maxWidth: 1100 }}>
          <div>
            <Eyebrow>Part 2 · The Workshop</Eyebrow>
            <h1
              className="font-extrabold text-white"
              style={{ fontSize: "clamp(36px, 5.4vw, 56px)", lineHeight: 1.07, letterSpacing: "-0.02em" }}
            >
              Turn the findings into <span style={{ color: "#9D88ED" }}>alignment.</span>
            </h1>
            <p
              className="mt-6"
              style={{ maxWidth: 560, fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}
            >
              A facilitated working session — virtual or in person — where your team reviews the diagnostic together, aligns on what matters most, and tackles the challenges holding execution back. Findings become decisions.
            </p>
            <div className="flex gap-3 flex-wrap mt-9">
              <TrackedLink
                href={CALENDLY}
                external
                eventName="workshop_cta"
                eventParams={{ cta: "book_sprint", location: "workshop_hero" }}
                className="text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px] transition-colors"
                style={{ background: "#E055CB" }}
              >
                Book the sprint →
              </TrackedLink>
              <TrackedLink
                href={CALC}
                eventName="calc_cta"
                eventParams={{ cta: "start_diagnostic", location: "workshop_hero" }}
                className="text-white text-[14px] font-semibold px-7 py-4 rounded-[10px] border transition-colors hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.25)" }}
              >
                Start with the diagnostic
              </TrackedLink>
            </div>
            <p className="mt-6 text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>
              Half-day · virtual or in person · facilitated by Campfire
            </p>
          </div>

          <div className="relative mx-auto w-full" style={{ maxWidth: 420 }}>
            <Image
              src="/carry-load.webp"
              alt="A team carrying the load together"
              width={840}
              height={840}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* ───────── 2. WHAT HAPPENS — white ───────── */}
      <section className="bg-white" style={{ paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-12" style={{ maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#6E3FCC">What Happens</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              Three moves, in one room.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MOVES.map((m, i) => (
              <div
                key={m.title}
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
                  {m.title}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "#636B7C" }}>
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 3. THE CAMPFIRE METHOD — dark (#403955) ───────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#403955", paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}
      >
        <div className="relative mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-10" style={{ maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow>The Campfire Method</Eyebrow>
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.12 }}>
              One rhythm. Every method opens with Reflect.
            </h2>
            <p className="mt-5 mx-auto" style={{ maxWidth: 620, fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
              Campfire isn&apos;t a catalog of workshops. It&apos;s one teaching rhythm — four beats long — run at three altitudes that build on each other instead of competing for the calendar.
            </p>
          </div>

          {/* The Campfire Principle callout */}
          <div
            className="rounded-[18px] border p-7 md:p-8 mx-auto mb-14"
            style={{ maxWidth: 740, background: "rgba(255,255,255,0.05)", borderColor: "rgba(157,136,237,0.35)" }}
          >
            <p className="text-[12px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: "#9D88ED" }}>
              The Campfire Principle
            </p>
            <p className="text-[16px] md:text-[17px] leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
              Reflection isn&apos;t a step — it&apos;s the doorway. Every conversation starts the same way: each person quiets down and writes for themselves, before anyone else colors the air. Skip it, and you don&apos;t have a Campfire session — you have a meeting.
            </p>
          </div>

          <div className="text-center mb-10" style={{ maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow>Three Methods, One Rhythm</Eyebrow>
            <h3 className="font-extrabold text-white" style={{ fontSize: "clamp(24px, 3.4vw, 34px)", lineHeight: 1.14 }}>
              Same four beats. Three altitudes.
            </h3>
            <p className="mt-4 mx-auto" style={{ maxWidth: 560, fontSize: "clamp(15px, 2vw, 17px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              Reflect always opens. The middle two beats change with the job to be done.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {METHODS.map((method) => (
              <div
                key={method.name}
                className="relative rounded-[16px] p-7 flex flex-col"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {method.tag && (
                  <span
                    className="absolute -top-3 left-7 text-[11px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full text-white"
                    style={{ background: method.accent }}
                  >
                    {method.tag}
                  </span>
                )}
                <h4 className="text-[19px] font-bold mb-2" style={{ color: method.accent === ALIGNMENT ? "#9D88ED" : method.accent }}>
                  {method.name}
                </h4>
                <p className="text-[14px] leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {method.when}
                </p>
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 mb-5">
                  {method.beats.map((beat, bi) => (
                    <span key={beat} className="flex items-center gap-1.5">
                      <span
                        className="text-[13px] font-semibold px-2.5 py-1 rounded-md"
                        style={{
                          color: bi === 0 ? "#fff" : "rgba(255,255,255,0.85)",
                          background: bi === 0 ? "rgba(157,136,237,0.3)" : "rgba(255,255,255,0.07)",
                        }}
                      >
                        {beat}
                      </span>
                      {bi < method.beats.length - 1 && (
                        <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>→</span>
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-[13px] leading-relaxed mt-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {method.meta}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center mt-10 text-[14px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            The Strategic Alignment Workshop below runs the method.
          </p>
        </div>
      </section>

      {/* ───────── 4. INSIDE THE SESSION — light ───────── */}
      <section style={{ background: "#F8F5FC", paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: 1080 }}>
          <div className="text-center mb-12" style={{ maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#6E3FCC">Alignment / Inside the Session</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              The Strategic Alignment Workshop
            </h2>
            <p className="mt-4 mx-auto" style={{ maxWidth: 600, fontSize: "clamp(16px, 2vw, 18px)", color: "#636B7C", lineHeight: 1.6 }}>
              A half-day, facilitated session that moves your team from scattered to aligned. Here&apos;s how it flows, step by step.
            </p>
          </div>

          <StepShowcase slides={SHOWCASE_SLIDES} autoMs={7000} />

          <div className="flex justify-center mt-12">
            <TrackedLink
              href={CALENDLY}
              external
              eventName="workshop_cta"
              eventParams={{ cta: "book_workshop", location: "workshop_showcase" }}
              className="inline-block text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px]"
              style={{ background: "#6E3FCC" }}
            >
              Book the workshop
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ───────── 5. WHAT YOU LEAVE WITH — white ───────── */}
      <section className="bg-white" style={{ paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-12" style={{ maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#B23B9F">What You Leave With</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              Decisions, not just discussion.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto" style={{ maxWidth: 760 }}>
            {LEAVE_WITH.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-[12px] border px-5 py-4" style={{ borderColor: "#F1EEF8", background: "#FCFBFE" }}>
                <span className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 24, height: 24, background: "#F3EFFE" }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5l3.5 3.5L13 5" stroke="#6E3FCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[16px] font-medium" style={{ color: "#1E2A4A" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 6. CLOSING CTA — dark ───────── */}
      <section className="relative overflow-hidden" style={{ background: "#1C1334", paddingTop: "clamp(72px, 10vw, 128px)", paddingBottom: "clamp(72px, 10vw, 128px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }} />
        <div className="relative mx-auto text-center" style={{ maxWidth: 640 }}>
          <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(28px, 4.4vw, 44px)", lineHeight: 1.1 }}>
            Ready to align the team?
          </h2>
          <p className="mx-auto mt-5" style={{ maxWidth: 520, fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
            Start with the diagnostic — the workshop builds on what it surfaces.
          </p>
          <div className="mt-9">
            <TrackedLink
              href={DIAGNOSTIC}
              eventName="workshop_cta"
              eventParams={{ cta: "see_diagnostic", location: "workshop_closing" }}
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
              eventParams={{ label: "back_to_hub", location: "workshop_closing" }}
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
