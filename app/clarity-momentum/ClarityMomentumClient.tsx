"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   COLORS
   ═══════════════════════════════════════════════════════════════════ */

const C = {
  navy: "#1C1334",
  purple600: "#6E3FCC",
  purple300: "#9D88ED",
  purple050: "#F8F5FC",
  pink: "#E055CB",
  warm: "#FFC28A",
  warmHot: "#F59E2C",
  gray400: "#9CA3AF",
};

/* ═══════════════════════════════════════════════════════════════════
   SECTION NAV
   ═══════════════════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { id: "problem", label: "Problem" },
  { id: "cost", label: "Cost" },
  { id: "equation", label: "Equation" },
  { id: "solution", label: "Solution" },
  { id: "how", label: "How it works" },
  { id: "changes", label: "What changes" },
  { id: "who", label: "Who it's for" },
];

function SectionNav({
  active,
  onScrollTo,
}: {
  active: string;
  onScrollTo: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const navScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const container = navScrollRef.current;
    if (!container) return;
    const index = NAV_ITEMS.findIndex((item) => item.id === active);
    if (index < 0) return;
    if (index === 0) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    const tab = container.children[index] as HTMLElement | null;
    if (!tab) return;
    container.scrollTo({
      left: tab.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav
      className={`fixed top-[64px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/60 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center h-[44px]">
        <div
          ref={navScrollRef}
          className="flex items-center gap-5 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onScrollTo(item.id)}
              className={`text-[13px] font-semibold whitespace-nowrap transition-colors shrink-0 ${
                active === item.id
                  ? "text-[#6E3FCC]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="hidden lg:block shrink-0 pr-5 pl-4">
          <a
            href="https://calendly.com/getcampfire/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold text-white bg-[#E055CB] hover:bg-[#d040b8] px-4 py-1.5 rounded-md transition-colors whitespace-nowrap"
          >
            Talk to us
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */

export default function ClarityMomentumClient() {
  // Scrollspy
  const [active, setActive] = useState("top");

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top =
      id === "top"
        ? 0
        : el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <>
      <SectionNav active={active} onScrollTo={scrollTo} />

      {/* ─── HERO ─── */}
      <section id="top" className="relative bg-[#1C1334] overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "url(/purple-topo.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 pt-28 md:pt-36 lg:pt-44 pb-20 md:pb-28 text-center">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-6">
            Strategic alignment &amp; execution
          </p>
          <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight text-white mb-6">
            Create clarity and momentum
            <br />
            <span className="text-[#E055CB]">as work speeds up.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-[720px] mx-auto mb-6 leading-relaxed">
            Organizations are moving faster than their people can stay aligned. AI, shifting priorities, and growing complexity are making it harder for teams to stay coordinated, focused, and moving in the same direction.
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-[720px] mx-auto mb-10 leading-relaxed font-medium">
            Campfire helps leaders create clarity, align around priorities, and reduce execution drift during periods of change.
          </p>
          <a
            href="https://calendly.com/getcampfire/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#E055CB] hover:bg-[#d040b8] rounded-lg transition-colors"
          >
            Talk to us
            <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section id="problem" className="py-20 md:py-28 bg-[#F8F5FC]">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
            The problem
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-6">
            Organizations are moving faster than their people can{" "}
            <em className="not-italic text-[#6E3FCC]">stay aligned.</em>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Strategy gets set at the top. Then it gets quietly re-interpreted in every team meeting, Slack thread, and 1:1 &mdash; until execution looks nothing like the plan.
          </p>
          <ul className="space-y-4">
            {[
              "Managers struggle to translate priorities into action",
              "Teams feel busy but increasingly disconnected",
              "Strategy gets interpreted differently across teams",
              "Communication becomes inconsistent as organizations scale",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-lg text-[#1C1334]">
                <span className="w-2 h-2 rounded-full bg-[#6E3FCC]/40 mt-2.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── THE COST ─── */}
      <section id="cost" className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              The hidden cost
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334]">
              The hidden cost of{" "}
              <em className="not-italic text-[#6E3FCC]">execution drift</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: "28%",
                color: C.warmHot,
                desc: "of executives say their company's strategy is being well executed.",
                source: "Source: McKinsey / Strategy& Surveys",
              },
              {
                stat: "95%",
                color: C.purple600,
                desc: "of employees aren't aware of or don't fully understand their organization's strategy.",
                source: "Source: Kaplan & Norton, HBR",
              },
              {
                stat: "5.6h",
                color: C.pink,
                desc: "per employee, per week, spent in meetings aligning priorities and coordinating work.",
                source: "Source: Microsoft Work Trend Index",
              },
            ].map((item) => (
              <div key={item.stat} className="text-center md:text-left">
                <p
                  className="text-[4rem] md:text-[5rem] font-extrabold leading-none mb-4"
                  style={{ color: item.color }}
                >
                  {item.stat}
                </p>
                <p className="text-base text-gray-600 leading-relaxed mb-3">
                  {item.desc}
                </p>
                <p className="text-xs font-bold tracking-[0.1em] uppercase text-gray-400">
                  {item.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE EQUATION ─── */}
      <section id="equation" className="py-20 md:py-28 bg-[#F8F5FC]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              The pattern
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#6E3FCC]">
              The execution equation.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mt-5">
              Every organization is silently solving for this. Most aren&apos;t naming it.
            </p>
          </div>

          {/* Equation visual */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-16">
            <div className="bg-white rounded-2xl px-6 py-5 text-center">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/50 mb-1">Result</p>
              <p className="text-lg md:text-xl font-extrabold text-[#1C1334]">Execution</p>
            </div>
            <span className="text-2xl font-bold text-gray-300">=</span>
            <div className="bg-white rounded-2xl px-6 py-5 text-center border border-orange-100">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#F59E2C]/70 mb-1">Foundation</p>
              <p className="text-lg md:text-xl font-extrabold text-[#1C1334]">Clarity</p>
            </div>
            <span className="text-2xl font-bold text-gray-300">&times;</span>
            <div className="bg-white rounded-2xl px-6 py-5 text-center border border-[#6E3FCC]/10">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/50 mb-1">Multiplier</p>
              <p className="text-lg md:text-xl font-extrabold text-[#1C1334]">Alignment</p>
            </div>
            <span className="text-2xl font-bold text-gray-300">/</span>
            <div className="bg-white rounded-2xl px-6 py-5 text-center border border-gray-100">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400 mb-1">Drag</p>
              <p className="text-lg md:text-xl font-extrabold text-[#1C1334]">Coordination Cost</p>
            </div>
          </div>

          {/* Variable definitions */}
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-full h-[3px] rounded-full mb-5" style={{ background: C.warmHot }} />
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-2" style={{ color: C.warmHot }}>
                Clarity
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Shared understanding of what we&apos;re solving, for whom, and why now &mdash; at every level of the org.
              </p>
            </div>
            <div>
              <div className="w-full h-[3px] rounded-full mb-5" style={{ background: C.purple600 }} />
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-2" style={{ color: C.purple600 }}>
                Alignment
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every team&apos;s plan adds up to the same plan. Priorities, trade-offs and behaviors agree.
              </p>
            </div>
            <div>
              <div className="w-full h-[3px] rounded-full mb-5" style={{ background: C.pink }} />
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-2" style={{ color: C.pink }}>
                Coordination Cost
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The drag of meetings, rework, re-clarification and politics required to move work forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOLUTION ─── */}
      <section id="solution" className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              The solution
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-5">
              Improve the variables that drive{" "}
              <em className="not-italic text-[#6E3FCC]">execution.</em>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Most organizations try to improve execution by adding more meetings, communication, and oversight. We take a different approach.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed font-medium">
              Campfire helps organizations create clarity, build alignment, and reduce coordination costs so teams can move faster together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-[#F8F5FC] rounded-2xl p-8 border-t-4 border-[#F59E2C]">
              <h3 className="text-xl font-bold text-[#1C1334] mb-3">Create Clarity</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Align leaders around priorities, decisions, expectations, and behaviors.
              </p>
            </article>

            <article className="bg-[#F8F5FC] rounded-2xl p-8 border-t-4 border-[#6E3FCC]">
              <h3 className="text-xl font-bold text-[#1C1334] mb-3">Build Alignment</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Help managers consistently translate strategy into day-to-day action.
              </p>
            </article>

            <article className="bg-[#F8F5FC] rounded-2xl p-8 border-t-4 border-[#E055CB]">
              <h3 className="text-xl font-bold text-[#1C1334] mb-3">Improve Coordination</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Reduce rework, confusion, and repeated clarification through reinforcement and operating rhythms.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" className="py-20 md:py-28 bg-[#1C1334]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-4">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-white mb-5">
              A practical system for turning strategy into{" "}
              <em className="not-italic text-[#E055CB]">momentum.</em>
            </h2>
          </div>

          {/* Sequential steps */}
          <div className="space-y-0">
            {/* Step 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FFC28A]/15 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#FFC28A]">01</span>
                </div>
                <h3 className="text-xl font-bold text-white">Leadership Alignment Session</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                A facilitated session &mdash; delivered in-person or virtually &mdash; that helps leaders align around priorities, expectations, and behaviors, paired with a strategic alignment summary that captures decisions, priorities, and leadership expectations.
              </p>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-3">
              <svg className="w-6 h-8" viewBox="0 0 24 32" fill="none">
                <path d="M12 4v20M7 19l5 5 5-5" stroke={C.purple300} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#9D88ED]/15 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#9D88ED]">02</span>
                </div>
                <h3 className="text-xl font-bold text-white">Manager Alignment Rollout</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Facilitated conversations that help managers understand the strategy, translate it for their teams, and create consistency across the organization.
              </p>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-3">
              <svg className="w-6 h-8" viewBox="0 0 24 32" fill="none">
                <path d="M12 4v20M7 19l5 5 5-5" stroke={C.purple300} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E055CB]/15 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#E055CB]">03</span>
                </div>
                <h3 className="text-xl font-bold text-white">Reinforcement Roadmap</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                A practical plan that connects priorities, behaviors, conversations, and future development efforts to maintain momentum over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT CHANGES ─── */}
      <section id="changes" className="py-20 md:py-28 bg-[#F8F5FC]">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
            What changes
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-10">
            What organizations{" "}
            <em className="not-italic text-[#6E3FCC]">achieve.</em>
          </h2>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5">
            {[
              "Shared understanding across leaders and teams",
              "Clear priorities and behavioral expectations",
              "Consistent communication through managers",
              "Reduced friction and coordination overhead",
              "Faster adoption of strategic initiatives",
              "Reduced execution drift during change",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill={C.purple600} opacity="0.1" />
                  <path d="M6 10.5l2.5 2.5L14 8" stroke={C.purple600} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-base text-[#1C1334] leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ─── */}
      <section id="who" className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              Who it&apos;s for
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-5">
              Designed for organizations{" "}
              <em className="not-italic text-[#6E3FCC]">navigating change.</em>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Campfire helps leaders create clarity and momentum through any org-wide change.
            </p>
          </div>

          {/* Floating tiles */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              "Growth and scaling",
              "AI transformation",
              "Strategic shifts",
              "Reorganizations",
              "Mergers and acquisitions",
              "Cross-functional complexity",
            ].map((tile) => (
              <span
                key={tile}
                className="px-5 py-3 bg-[#F8F5FC] text-[#1C1334] text-sm font-semibold rounded-xl border border-[#6E3FCC]/10"
              >
                {tile}
              </span>
            ))}
          </div>

          <p className="text-base text-gray-500 leading-relaxed text-center max-w-2xl mx-auto">
            We typically work with department leaders, business leaders, and HR leaders responsible for translating strategy into action across teams and functions.
          </p>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section id="cta" className="py-20 md:py-28 bg-[#1C1334]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-4">
            Get started
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-white mb-5">
            Connect with us.
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            We&apos;re actively working with organizations exploring how to create clarity, alignment, and momentum during periods of rapid change.
          </p>
          <a
            href="https://calendly.com/getcampfire/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#E055CB] hover:bg-[#d040b8] rounded-lg transition-colors"
          >
            Schedule a Conversation
            <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
