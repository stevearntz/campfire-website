"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   COLORS
   ═══════════════════════════════════════════════════════════════════ */

const C = {
  navy: "#1C1334",
  indigo: "#1E2A4A",
  purple600: "#6E3FCC",
  purple300: "#9D88ED",
  purple050: "#F8F5FC",
  pink: "#E055CB",
  warm: "#FFC28A",
  warmHot: "#F59E2C",
  gray400: "#9CA3AF",
  gray500: "#636B7C",
};

/* ═══════════════════════════════════════════════════════════════════
   SVG DIAGRAMS
   ═══════════════════════════════════════════════════════════════════ */

function ClarityIcon() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-16 h-16">
      <circle cx="40" cy="40" r="24" fill="none" stroke={C.warmHot} strokeWidth="2" strokeOpacity="0.3" />
      <circle cx="40" cy="40" r="14" fill="none" stroke={C.warmHot} strokeWidth="2" strokeOpacity="0.5" />
      <circle cx="40" cy="40" r="5" fill={C.warmHot} opacity="0.9" />
      <g stroke={C.warmHot} strokeWidth="1.5" strokeLinecap="round" opacity="0.4">
        <line x1="40" y1="8" x2="40" y2="16" />
        <line x1="40" y1="64" x2="40" y2="72" />
        <line x1="8" y1="40" x2="16" y2="40" />
        <line x1="64" y1="40" x2="72" y2="40" />
      </g>
    </svg>
  );
}

function AlignmentIcon() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-16 h-16">
      <g stroke={C.purple600} strokeWidth="2.5" strokeLinecap="round" fill="none">
        <line x1="16" y1="26" x2="56" y2="26" />
        <polyline points="51,21 57,26 51,31" />
        <line x1="16" y1="40" x2="56" y2="40" />
        <polyline points="51,35 57,40 51,45" />
        <line x1="16" y1="54" x2="56" y2="54" />
        <polyline points="51,49 57,54 51,59" />
      </g>
      <circle cx="64" cy="40" r="6" fill={C.purple600} opacity="0.15" />
      <circle cx="64" cy="40" r="2.5" fill={C.purple600} opacity="0.5" />
    </svg>
  );
}

function CoordinationCostIcon() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-16 h-16">
      <g stroke={C.gray400} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M 15 25 Q 30 35 25 45 Q 20 55 35 55" />
        <path d="M 20 20 Q 40 28 35 40 Q 30 52 50 48" />
        <path d="M 25 60 Q 45 50 40 35 Q 35 22 55 25" />
        <path d="M 45 60 Q 55 45 50 30 Q 48 22 65 28" />
      </g>
      <g fill={C.gray400} opacity="0.5">
        <circle cx="30" cy="38" r="2.5" />
        <circle cx="42" cy="42" r="2" />
        <circle cx="38" cy="30" r="2" />
      </g>
    </svg>
  );
}

function EffectivenessIcon() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-16 h-16">
      <defs>
        <radialGradient id="eff-g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.warm} stopOpacity="1" />
          <stop offset="50%" stopColor={C.warmHot} stopOpacity="0.5" />
          <stop offset="100%" stopColor={C.purple600} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="32" fill="url(#eff-g)" />
      <circle cx="40" cy="40" r="12" fill={C.warm} opacity="0.9" />
      <g stroke={C.warmHot} strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        <line x1="40" y1="4" x2="40" y2="14" />
        <line x1="40" y1="66" x2="40" y2="76" />
        <line x1="4" y1="40" x2="14" y2="40" />
        <line x1="66" y1="40" x2="76" y2="40" />
        <line x1="14" y1="14" x2="21" y2="21" />
        <line x1="59" y1="59" x2="66" y2="66" />
        <line x1="66" y1="14" x2="59" y2="21" />
        <line x1="14" y1="66" x2="21" y2="59" />
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION NAV
   ═══════════════════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { id: "problem", label: "The problem" },
  { id: "equation", label: "The equation" },
  { id: "what", label: "What we do" },
  { id: "how", label: "How it works" },
  { id: "research", label: "The research" },
];

function SectionNav({
  active,
  onScrollTo,
  onOpenForm,
}: {
  active: string;
  onScrollTo: (id: string) => void;
  onOpenForm: () => void;
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
          <button
            onClick={onOpenForm}
            className="text-[13px] font-semibold text-white bg-[#E055CB] hover:bg-[#d040b8] px-4 py-1.5 rounded-md transition-colors whitespace-nowrap"
          >
            Build leadership that scales
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */

export default function EffectiveOrgV2Client() {
  // Scrollspy
  const [active, setActive] = useState("top");

  useEffect(() => {
    const ids = ["problem", "equation", "what", "how", "research"];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
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

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    challenge: "",
    note: "",
  });
  const [formState, setFormState] = useState<"idle" | "submitting" | "thanks">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formTimestamp = useRef(Date.now());

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required.";
    if (!form.email.trim()) e.email = "Required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = "Doesn't look quite right.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setFormState("submitting");

    const parts: string[] = [];
    if (form.role) parts.push(`Role: ${form.role}`);
    if (form.challenge) parts.push(`Challenge: ${form.challenge}`);
    if (form.note) parts.push(`Note: ${form.note}`);
    parts.push("[Source: Effective Org v2 page]");

    const nameParts = form.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: form.email,
          company: form.company,
          message: parts.join("\n"),
          _t: formTimestamp.current,
        }),
      });
    } catch {
      // Fail silently
    }

    setFormState("thanks");
    setTimeout(() => {
      const el = document.getElementById("booking");
      if (el)
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 30,
          behavior: "smooth",
        });
    }, 40);
  };

  const onReset = () => {
    setFormState("idle");
    setForm({ name: "", email: "", company: "", role: "", challenge: "", note: "" });
    setErrors({});
    formTimestamp.current = Date.now();
  };

  const onOpenForm = () => {
    scrollTo("booking");
    setTimeout(() => {
      const el = document.getElementById("r-name");
      if (el) el.focus({ preventScroll: true });
    }, 600);
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <SectionNav active={active} onScrollTo={scrollTo} onOpenForm={onOpenForm} />

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
            Organizational effectiveness for the AI era
          </p>
          <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight text-white mb-6">
            Turn strategy into
            <br />
            <span className="text-[#E055CB]">coordinated execution.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-[720px] mx-auto mb-10 leading-relaxed">
            Strategy gets interpreted differently. Managers can&apos;t translate fast enough. Teams feel busy but disconnected. Campfire helps leaders increase clarity, align strategically, and reduce coordination costs so strategy actually becomes execution.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <button
              onClick={onOpenForm}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#E055CB] hover:bg-[#d040b8] rounded-lg transition-colors"
            >
              Build leadership that scales
              <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo("problem")}
              className="inline-flex items-center px-6 py-4 text-base font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors"
            >
              See the problem we solve
            </button>
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section id="problem" className="py-20 md:py-28 bg-[#F8F5FC]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              The problem
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-5">
              Organizations are moving faster than their people can <em className="not-italic text-[#6E3FCC]">stay aligned.</em>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The result is fragmentation, inconsistent execution, and coordination breakdowns across teams. These are the symptoms leaders see every day.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5 mb-12">
            {[
              {
                pain: "Strategy gets interpreted differently across teams",
                detail: "Leaders announce priorities. By the time they reach the front line, every team has a different version of what matters.",
                pillar: "Alignment",
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M14 14l7 7M3 8V3h5M10 10L3 3" /></svg>,
              },
              {
                pain: "Managers struggle to translate priorities into action",
                detail: "They hear the strategy but lack the tools to make it concrete for their teams. The gap between intent and execution starts here.",
                pillar: "Clarity",
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
              },
              {
                pain: "AI and constant change are increasing speed and complexity",
                detail: "Individual capacity is growing every quarter. But faster individuals without shared direction just create more noise.",
                pillar: "Coordination",
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
              },
              {
                pain: "Communication becomes inconsistent as you scale",
                detail: "What worked at 50 people breaks at 200. Messages get diluted, context gets lost, and decisions get re-litigated.",
                pillar: "Coordination",
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
              },
              {
                pain: "Teams feel busy, but increasingly disconnected",
                detail: "Everyone is working hard. But effort is pulling in different directions, and the strategy stays on the slide deck.",
                pillar: "Alignment",
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
              },
            ].map((item) => (
              <div key={item.pain} className="bg-white rounded-2xl p-7 flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F8F5FC] text-[#6E3FCC] flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#1C1334] leading-snug">{item.pain}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{item.detail}</p>
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/40 mt-4">{item.pillar}</p>
              </div>
            ))}

            {/* CTA card */}
            <div className="bg-[#6E3FCC] rounded-2xl p-7 px-10 flex flex-col justify-center text-center">
              <p className="text-lg font-extrabold text-white leading-snug mb-3">
                Sound familiar?
              </p>
              <p className="text-sm text-white/60 mb-5">
                These five symptoms have the same root cause.
              </p>
              <button
                onClick={() => scrollTo("equation")}
                className="inline-flex items-center gap-2 mx-auto px-5 py-2.5 text-sm font-semibold text-[#6E3FCC] bg-white hover:bg-gray-50 rounded-lg transition-colors"
              >
                See the equation
                <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v8M3 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ─── THE EQUATION ─── */}
      <section id="equation" className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              The equation
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334]">
              What actually drives<br /><em className="not-italic text-[#6E3FCC]">organizational effectiveness.</em>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mt-5">
              Every symptom on the previous page traces back to three variables. Get these right, and strategy turns into execution. Get them wrong, and speed just creates more friction.
            </p>
          </div>

          {/* Equation visual */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-16">
            <div className="bg-[#F8F5FC] rounded-2xl px-6 py-5 text-center">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/50 mb-1">Result</p>
              <p className="text-lg md:text-xl font-extrabold text-[#1C1334]">Execution</p>
            </div>
            <span className="text-2xl font-bold text-gray-300">=</span>
            <div className="bg-[#FFF8F0] rounded-2xl px-6 py-5 text-center border border-orange-100">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#F59E2C]/70 mb-1">Foundation</p>
              <p className="text-lg md:text-xl font-extrabold text-[#1C1334]">Clarity</p>
            </div>
            <span className="text-2xl font-bold text-gray-300">&times;</span>
            <div className="bg-[#F8F5FC] rounded-2xl px-6 py-5 text-center border border-[#6E3FCC]/10">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/50 mb-1">Multiplier</p>
              <p className="text-lg md:text-xl font-extrabold text-[#1C1334]">Alignment</p>
            </div>
            <span className="text-2xl font-bold text-gray-300">/</span>
            <div className="bg-gray-50 rounded-2xl px-6 py-5 text-center border border-gray-100">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400 mb-1">Drag</p>
              <p className="text-lg md:text-xl font-extrabold text-[#1C1334]">Coordination Cost</p>
            </div>
          </div>

          {/* Variable explanations */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <ClarityIcon />
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-2">Clarity</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Knowing what matters, why it matters, and what good looks like. If clarity is zero, alignment and coordination are just organized confusion.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <AlignmentIcon />
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-2">Alignment</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Shared understanding of priorities, direction, and how decisions get made. Alignment is the multiplier that turns individual effort into collective progress.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <CoordinationCostIcon />
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-2">Coordination Cost</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The meetings, rework, confusion, handoffs, and friction required to move together. This is the drag. Better leadership reduces it.
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center bg-[#F8F5FC] rounded-2xl p-8">
            <p className="text-base md:text-lg text-[#1C1334] leading-relaxed font-medium">
              Campfire helps leaders increase clarity, strengthen alignment, and reduce coordination cost — so strategy actually turns into execution.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHAT CAMPFIRE DOES ─── */}
      <section id="what" className="py-20 md:py-28 bg-[#F8F5FC]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              What Campfire does
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-5">
              Three things that turn strategy into <em className="not-italic text-[#6E3FCC]">coordinated execution.</em>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Campfire is a strategic alignment and execution system that helps organizations translate strategy into coordinated execution during rapid change. Not a workshop. A system that fits inside real work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-white rounded-2xl p-8 border-t-4 border-[#F59E2C]">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#F59E2C]/60 mb-3">01</p>
              <h3 className="text-xl font-bold text-[#1C1334] mb-3">Increase clarity</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Help leaders define what matters, why it matters, and what good looks like so everyone reads the priority the same way.
              </p>
              <ul className="space-y-2">
                {["Defining priorities and outcomes", "Setting clear expectations", "Communicating the why", "Making strategy concrete"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E2C]/50 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="bg-white rounded-2xl p-8 border-t-4 border-[#6E3FCC]">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/50 mb-3">02</p>
              <h3 className="text-xl font-bold text-[#1C1334] mb-3">Align strategically</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Give managers the language and practice to translate priorities into their teams, so individual effort adds up instead of pulling apart.
              </p>
              <ul className="space-y-2">
                {["Connecting work to strategy", "Cross-functional alignment", "Manager translation of priorities", "Decision-making frameworks"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FCC]/40 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="bg-white rounded-2xl p-8 border-t-4 border-[#E055CB]">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/50 mb-3">03</p>
              <h3 className="text-xl font-bold text-[#1C1334] mb-3">Improve coordination</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Reduce the friction between strategy and execution — fewer meetings, less rework, clearer handoffs, better follow-through.
              </p>
              <ul className="space-y-2">
                {["Better meetings and delegation", "Feedback and coaching habits", "Accountability and follow-through", "Reducing rework and confusion"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E055CB]/40 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ─── USE CASES ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              Built for your priorities
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-5">
              Different teams. Different goals.<br />
              <em className="not-italic text-[#6E3FCC]">Same execution challenge.</em>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every organization is trying to accomplish something different. Campfire helps teams improve the clarity, alignment, and coordination needed to execute the priorities that matter most.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5 mb-10">
            {[
              {
                team: "Sales",
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 16l4-6 4 3 5-7" /></svg>,
                goal: "Grow revenue",
                challenge: "Managers interpret priorities differently across the team.",
                outcome: "More consistent pipeline execution",
              },
              {
                team: "Customer Success",
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
                goal: "Improve retention",
                challenge: "Teams coordinate inconsistently around customer needs.",
                outcome: "Tighter retention, stronger renewals",
              },
              {
                team: "Product",
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
                goal: "Increase adoption",
                challenge: "Roadmap priorities drift across functions.",
                outcome: "Sharper launches, faster adoption",
              },
              {
                team: "People / HR",
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 110 20 10 10 0 010-20z" /><path d="M12 8v4l3 3" /></svg>,
                goal: "Lead change well",
                challenge: "Managers communicate change inconsistently.",
                outcome: "Smoother change adoption across teams",
              },
              {
                team: "Operations",
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
                goal: "Scale efficiently",
                challenge: "Handoffs, meetings, and decisions create friction.",
                outcome: "Less rework and faster execution",
              },
            ].map((row) => (
              <div key={row.team} className="bg-[#F8F5FC] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-white text-[#6E3FCC] flex items-center justify-center shrink-0">
                      {row.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[#1C1334]">{row.team}</h3>
                  </div>
                  <p className="text-xs font-bold tracking-[0.12em] uppercase text-gray-400 mb-1">Goal: {row.goal}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{row.challenge}</p>
                </div>
                <div className="bg-[#1C1334] px-6 py-4">
                  <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#9D88ED]/60 mb-1">Outcome</p>
                  <p className="text-sm font-semibold text-white">{row.outcome}</p>
                </div>
              </div>
            ))}

            {/* CTA card */}
            <div className="bg-[#6E3FCC] rounded-2xl overflow-hidden flex flex-col justify-center p-8 text-center">
              <p className="text-lg md:text-xl font-extrabold text-white leading-snug mb-3">
                Whatever your priority, Campfire helps you execute on it.
              </p>
              <p className="text-sm text-white/60 mb-6">
                Tell us what you&apos;re working on. We&apos;ll show you what coordinated execution looks like.
              </p>
              <button
                onClick={onOpenForm}
                className="inline-flex items-center gap-2 mx-auto px-6 py-3 text-sm font-semibold text-[#6E3FCC] bg-white hover:bg-gray-50 rounded-lg transition-colors"
              >
                Talk through your priority
                <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" className="py-20 md:py-28 bg-[#1C1334]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-4xl mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-4">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-white mb-5">
              A system that makes <em className="not-italic text-[#E055CB]">the equation work.</em>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Three connected components that build clarity, create alignment, and reduce coordination cost over time. Not a one-off workshop. An ongoing system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-full bg-[#FFC28A]/15 flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#FFC28A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#FFC28A]/60 mb-2">01</p>
              <h3 className="text-xl font-bold text-white mb-3">Alignment sessions</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-5">
                Facilitated conversations that create shared understanding across leaders, managers, and teams. This is where clarity gets built and alignment gets real — not through a slide deck, but through structured dialogue that surfaces what actually matters.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC28A]/40 mt-1.5 shrink-0" />
                  Define what matters and why
                </li>
                <li className="flex items-start gap-2 text-sm text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC28A]/40 mt-1.5 shrink-0" />
                  Build trust and psychological safety
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-full bg-[#9D88ED]/15 flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#9D88ED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#9D88ED]/60 mb-2">02</p>
              <h3 className="text-xl font-bold text-white mb-3">Living documentation</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-5">
                Strategy translated into actionable priorities and behaviors that managers can carry into their teams. Not a slide deck that lives in a folder. A working reference that connects daily decisions to strategic outcomes and evolves as the organization does.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED]/40 mt-1.5 shrink-0" />
                  Connect daily work to outcomes
                </li>
                <li className="flex items-start gap-2 text-sm text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED]/40 mt-1.5 shrink-0" />
                  Give managers translation tools
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-full bg-[#E055CB]/15 flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#E055CB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#E055CB]/60 mb-2">03</p>
              <h3 className="text-xl font-bold text-white mb-3">Ongoing reinforcement</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-5">
                Conversations and operating rhythms that keep managers reinforcing strategy consistently across their teams — so alignment doesn&apos;t decay between offsites. Behavior change that sticks because it&apos;s practiced, not just taught.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E055CB]/40 mt-1.5 shrink-0" />
                  Improve coordination habits
                </li>
                <li className="flex items-start gap-2 text-sm text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E055CB]/40 mt-1.5 shrink-0" />
                  Turn conversations into commitments
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RESEARCH ─── */}
      <section id="research" className="py-20 md:py-28 bg-[#F8F5FC]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              Grounded in how organizations actually work
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-5">
              Not a theory. <em className="not-italic text-[#6E3FCC]">A pattern.</em>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Organizations do not become more effective just because individuals get faster. Research in systems thinking, coordination theory, and strategic alignment all point to the same truth: performance depends on how well people move together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8">
              <div className="w-10 h-10 rounded-full bg-[#F8F5FC] flex items-center justify-center mb-5">
                <span className="text-sm font-bold text-[#6E3FCC]">01</span>
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-3">Systems outperform when the parts work together</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Optimizing individual parts does not automatically optimize the whole. The interactions between teams matter more than the output of any single team.
              </p>
              <p className="text-xs text-gray-400 mt-4 font-medium">Supports: alignment</p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <div className="w-10 h-10 rounded-full bg-[#F8F5FC] flex items-center justify-center mb-5">
                <span className="text-sm font-bold text-[#6E3FCC]">02</span>
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-3">Coordination costs grow as work becomes more interdependent</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Adding capacity or contributors can increase communication overhead. The cost of moving together rises faster than the benefit of moving faster alone.
              </p>
              <p className="text-xs text-gray-400 mt-4 font-medium">Supports: coordination</p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <div className="w-10 h-10 rounded-full bg-[#F8F5FC] flex items-center justify-center mb-5">
                <span className="text-sm font-bold text-[#6E3FCC]">03</span>
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-3">Strategic alignment connects daily decisions to business outcomes</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Organizations perform better when goals, priorities, measures, and behaviors connect. Alignment is not a feeling. It is an observable, buildable system.
              </p>
              <p className="text-xs text-gray-400 mt-4 font-medium">Supports: clarity</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PULL QUOTE ─── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl font-extrabold text-[#1C1334] leading-snug mb-4">
            Clarity. Alignment. Coordination.<br /><span className="text-[#6E3FCC]">That&apos;s how strategy becomes execution.</span>
          </p>
          <p className="text-base text-gray-500">
            The organizations that win won&apos;t just move faster. They&apos;ll drift less — especially during change.
          </p>
        </div>
      </section>

      {/* ─── BOOKING FORM / THANK YOU ─── */}
      <section id="booking" className="py-20 md:py-28 bg-[#1C1334]">
        <div className="max-w-5xl mx-auto px-6">
          {formState === "thanks" ? (
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="flex-1">
                <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-4">
                  You&apos;re in
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-white mb-5">
                  Let&apos;s talk about what <em className="not-italic text-[#E055CB]">effectiveness looks like</em> for your team.
                </h2>
                <p className="text-lg text-white/60 leading-relaxed mb-8">
                  We&apos;ll reach out within one business day. No pitch deck. Just a real conversation about where your team is and what would help.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED] mt-2 shrink-0" />
                    <p className="text-white/70">
                      <strong className="text-white/90">30-minute call.</strong> You share where clarity is lacking, alignment is off, or coordination is dragging. We listen.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED] mt-2 shrink-0" />
                    <p className="text-white/70">
                      <strong className="text-white/90">Specific recommendation.</strong> Which leadership habits would move the needle, what it looks like, and what it costs.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED] mt-2 shrink-0" />
                    <p className="text-white/70">
                      <strong className="text-white/90">No pressure.</strong> If it&apos;s not the right fit, we&apos;ll say so.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
                <div className="bg-white rounded-2xl p-8 text-center">
                  <div className="mb-5">
                    <EffectivenessIcon />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1C1334] mb-3">
                    Thank you.<br />We&apos;ll be in <em className="not-italic text-[#6E3FCC]">touch.</em>
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Expect a note from the Campfire team within one business day.
                  </p>
                  <button
                    onClick={onReset}
                    className="text-sm font-medium text-[#6E3FCC] hover:text-[#5a2fb3] transition-colors"
                  >
                    &larr; Back to the page
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="flex-1">
                <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-4">
                  Start a conversation
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-white mb-5">
                  Build leadership that <em className="not-italic text-[#E055CB]">scales with your team.</em>
                </h2>
                <p className="text-lg text-white/60 leading-relaxed mb-8">
                  A short call. You share where your team is growing and what&apos;s creating friction. We share what Campfire looks like for teams like yours. You leave with a clear recommendation, not a follow-up sequence.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED] mt-2 shrink-0" />
                    <p className="text-white/70">
                      <strong className="text-white/90">30 minutes, no pitch.</strong> We listen first.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED] mt-2 shrink-0" />
                    <p className="text-white/70">
                      <strong className="text-white/90">Tailored plan in a week.</strong> What it looks like, what it costs, who runs it.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED] mt-2 shrink-0" />
                    <p className="text-white/70">
                      <strong className="text-white/90">No spam.</strong> What you share stays between us.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
                <div className="bg-white rounded-2xl p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#1C1334] mb-1">
                      Start a 30-minute conversation
                    </h3>
                    <p className="text-sm text-gray-500">
                      A few quick fields. We&apos;ll be back within one business day.
                    </p>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onSubmit();
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="r-name" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                          Name <span className="text-[#E055CB]">*</span>
                        </label>
                        <input
                          id="r-name"
                          value={form.name}
                          onChange={set("name")}
                          placeholder="Maya Ellsworth"
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-colors focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC]/20 ${
                            errors.name ? "border-red-400" : "border-gray-200"
                          }`}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="r-email" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                          Work email <span className="text-[#E055CB]">*</span>
                        </label>
                        <input
                          id="r-email"
                          type="email"
                          value={form.email}
                          onChange={set("email")}
                          placeholder="maya@yourcompany.com"
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-colors focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC]/20 ${
                            errors.email ? "border-red-400" : "border-gray-200"
                          }`}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="r-company" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                          Company
                        </label>
                        <input
                          id="r-company"
                          value={form.company}
                          onChange={set("company")}
                          placeholder="Acme Corp"
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none transition-colors focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC]/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="r-role" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                          Role
                        </label>
                        <input
                          id="r-role"
                          value={form.role}
                          onChange={set("role")}
                          placeholder="VP People"
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none transition-colors focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC]/20"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="r-challenge" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                          What&apos;s the biggest challenge right now?
                        </label>
                        <select
                          id="r-challenge"
                          value={form.challenge}
                          onChange={set("challenge")}
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none transition-colors focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC]/20 bg-white"
                        >
                          <option value="">Pick the one closest to your reality...</option>
                          <option value="clarity">We lack clarity on priorities</option>
                          <option value="alignment">Teams aren&apos;t aligned</option>
                          <option value="coordination">Coordination is costing us</option>
                          <option value="managers">Managers need better tools</option>
                          <option value="change">Leading through rapid change</option>
                          <option value="scaling">Scaling with leaner teams</option>
                          <option value="distributed">Distributed or hybrid coordination</option>
                          <option value="other">Something else</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="r-note" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                          Anything else?{" "}
                          <span className="normal-case tracking-normal font-medium text-gray-400">(optional)</span>
                        </label>
                        <textarea
                          id="r-note"
                          value={form.note}
                          onChange={set("note")}
                          placeholder="One or two sentences is plenty."
                          rows={3}
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none transition-colors focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC]/20 resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-[#E055CB] hover:bg-[#d040b8] rounded-lg transition-colors disabled:opacity-60"
                      >
                        {formState === "submitting" ? "Sending..." : "Start the conversation"}
                        <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      We never share your details. No marketing emails. No follow-up sequences.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
