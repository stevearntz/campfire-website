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

function CapacityIcon() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-16 h-16">
      <defs>
        <radialGradient id="cap-g" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor={C.warmHot} stopOpacity="1" />
          <stop offset="70%" stopColor={C.warm} stopOpacity="0.4" />
          <stop offset="100%" stopColor={C.warm} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="44" r="28" fill="url(#cap-g)" />
      <circle cx="40" cy="44" r="10" fill={C.warmHot} opacity="0.9" />
      {/* Rising spark lines */}
      <g stroke={C.warm} strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        <line x1="40" y1="28" x2="40" y2="14" />
        <line x1="30" y1="30" x2="24" y2="18" />
        <line x1="50" y1="30" x2="56" y2="18" />
      </g>
      <g fill={C.warmHot} opacity="0.7">
        <circle cx="40" cy="12" r="2" />
        <circle cx="23" cy="16" r="1.5" />
        <circle cx="57" cy="16" r="1.5" />
      </g>
    </svg>
  );
}

function AlignmentIcon() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-16 h-16">
      {/* Parallel logs / arrows pointing same direction */}
      <g stroke={C.purple600} strokeWidth="2.5" strokeLinecap="round" fill="none">
        <line x1="16" y1="26" x2="56" y2="26" />
        <polyline points="51,21 57,26 51,31" />
        <line x1="16" y1="40" x2="56" y2="40" />
        <polyline points="51,35 57,40 51,45" />
        <line x1="16" y1="54" x2="56" y2="54" />
        <polyline points="51,49 57,54 51,59" />
      </g>
      {/* Shared direction indicator */}
      <circle cx="64" cy="40" r="6" fill={C.purple600} opacity="0.15" />
      <circle cx="64" cy="40" r="2.5" fill={C.purple600} opacity="0.5" />
    </svg>
  );
}

function CoordinationCostIcon() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-16 h-16">
      {/* Tangled / friction lines */}
      <g stroke={C.gray400} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M 15 25 Q 30 35 25 45 Q 20 55 35 55" />
        <path d="M 20 20 Q 40 28 35 40 Q 30 52 50 48" />
        <path d="M 25 60 Q 45 50 40 35 Q 35 22 55 25" />
        <path d="M 45 60 Q 55 45 50 30 Q 48 22 65 28" />
      </g>
      {/* Friction nodes */}
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
      {/* Radiating light */}
      <circle cx="40" cy="40" r="32" fill="url(#eff-g)" />
      <circle cx="40" cy="40" r="12" fill={C.warm} opacity="0.9" />
      {/* Light rays */}
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
  { id: "equation", label: "The equation" },
  { id: "why-now", label: "Why now" },
  { id: "what", label: "What we do" },
  { id: "how", label: "How it helps" },
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

export default function EffectiveOrgClient() {
  // Scrollspy
  const [active, setActive] = useState("top");

  useEffect(() => {
    const ids = ["equation", "why-now", "what", "how", "research"];
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
    parts.push("[Source: Effective Org page]");

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
            Leadership development for the AI era of work
          </p>
          <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight text-white mb-4">
            Your capacity is increasing.
            <br />
            <span className="text-[#E055CB]">Make it count.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            AI and new tools are helping people move faster. But speed only creates value when teams are aligned, coordinated, and led well. Campfire helps growing companies build the leadership habits that turn capacity into outcomes.
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
              onClick={() => scrollTo("how")}
              className="inline-flex items-center px-6 py-4 text-base font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors"
            >
              See how Campfire works
            </button>
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
              What actually drives <em className="not-italic text-[#6E3FCC]">organizational effectiveness.</em>
            </h2>
          </div>

          {/* Equation visual */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-16">
            <div className="bg-[#F8F5FC] rounded-2xl px-6 py-5 text-center">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/50 mb-1">Result</p>
              <p className="text-lg md:text-xl font-extrabold text-[#1C1334]">Effectiveness</p>
            </div>
            <span className="text-2xl font-bold text-gray-300">=</span>
            <div className="bg-[#FFF8F0] rounded-2xl px-6 py-5 text-center border border-orange-100">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#F59E2C]/70 mb-1">Growing</p>
              <p className="text-lg md:text-xl font-extrabold text-[#1C1334]">Capacity</p>
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
                <CapacityIcon />
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-2">Capacity</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The skills, tools, energy, and speed each person brings to the work. AI and better tools are increasing this every quarter.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <AlignmentIcon />
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-2">Alignment</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The shared understanding of what matters, where we're going, and how decisions get made. This is the multiplier.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <CoordinationCostIcon />
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-2">Coordination Cost</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The meetings, rework, confusion, handoffs, and friction required to move together. This is the drag.
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center bg-[#F8F5FC] rounded-2xl p-8">
            <p className="text-base md:text-lg text-[#1C1334] leading-relaxed font-medium">
              When capacity increases but alignment stays flat, coordination costs rise. Campfire helps leaders make the new capacity count.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHY NOW ─── */}
      <section id="why-now" className="py-20 md:py-28 bg-[#F8F5FC]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              Why now
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-5">
              Work is getting faster. That does not automatically make organizations <em className="not-italic text-[#6E3FCC]">more effective.</em>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              AI can help individuals write, build, analyze, and decide faster. But organizations win through shared direction, clear priorities, strong managers, and coordinated execution. Without those, speed creates more noise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-[#FFF8F0] flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={C.warmHot} strokeWidth="2" strokeLinecap="round">
                  <path d="M13 3l4 9h-8l4-9z" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-2">More capacity</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                People can produce, analyze, and decide faster than ever. Individual output is at an all-time high.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-[#F8F5FC] flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={C.purple600} strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l-3 7 3 7" />
                  <path d="M12 5l3 7-3 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-2">More drift</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Faster individuals moving in slightly different directions creates rework, misalignment, and meetings that solve nothing.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-[#FCF0F9] flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={C.pink} strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-2">More need for leadership</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The faster work moves, the more organizations depend on leaders who can clarify, coordinate, and keep people connected to what matters.
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-base md:text-lg text-[#1C1334] leading-relaxed font-medium">
              Campfire helps teams build the alignment and leadership behaviors that keep speed connected to strategy.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHAT CAMPFIRE DOES ─── */}
      <section id="what" className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6E3FCC] mb-4">
              What Campfire does
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-[#1C1334] mb-5">
              Leadership development that helps faster teams <em className="not-italic text-[#6E3FCC]">move in the same direction.</em>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Campfire helps organizations solve three business problems through practical, scalable leadership development that fits inside real work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-[#F8F5FC] rounded-2xl p-8 border-t-4 border-[#6E3FCC]">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/50 mb-3">A</p>
              <h3 className="text-xl font-bold text-[#1C1334] mb-3">Increase alignment</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Sessions and programs that help leaders clarify direction, set expectations, communicate priorities, and connect work to outcomes.
              </p>
              <ul className="space-y-2">
                {["Strategic clarity", "Priority setting", "Expectations and accountability", "Connecting work to outcomes"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FCC]/40 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="bg-[#F8F5FC] rounded-2xl p-8 border-t-4 border-[#9D88ED]">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/50 mb-3">B</p>
              <h3 className="text-xl font-bold text-[#1C1334] mb-3">Reduce coordination cost</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Leadership habits that improve meetings, delegation, decision-making, feedback, coaching, and cross-functional collaboration.
              </p>
              <ul className="space-y-2">
                {["Better meetings and decisions", "Delegation and ownership", "Feedback and coaching", "Cross-functional collaboration"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D88ED]/50 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="bg-[#F8F5FC] rounded-2xl p-8 border-t-4 border-[#E055CB]">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#6E3FCC]/50 mb-3">C</p>
              <h3 className="text-xl font-bold text-[#1C1334] mb-3">Build manager capability</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Practical development that helps managers lead change, strengthen trust, support performance, and make better day-to-day decisions.
              </p>
              <ul className="space-y-2">
                {["Leading through change", "Building and repairing trust", "Performance conversations", "Day-to-day decision-making"].map((item) => (
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

      {/* ─── HOW CAMPFIRE HELPS ─── */}
      <section id="how" className="py-20 md:py-28 bg-[#1C1334]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#9D88ED] mb-4">
              How Campfire helps
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-white mb-5">
              Practical leadership habits that <em className="not-italic text-[#E055CB]">turn capacity into outcomes.</em>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Content, conversations, and reinforcement. Not a one-off workshop. A system that fits inside how your teams already work.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { h: "Clarify what matters", p: "Help leaders and managers define priorities so everyone reads them the same way." },
              { h: "Communicate direction", p: "Give managers the tools to translate strategy into conversations their teams can act on." },
              { h: "Coordinate work", p: "Reduce the friction between teams with better handoffs, decisions, and shared commitments." },
              { h: "Build trust", p: "Create the psychological safety that makes honest conversation and fast execution possible." },
              { h: "Coach people through change", p: "Help managers support their teams when priorities shift, roles evolve, and uncertainty rises." },
              { h: "Turn conversations into action", p: "Every session ends in a commitment. Reinforcement makes the behavior stick." },
            ].map((item) => (
              <div key={item.h} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-base font-bold text-white mb-2">{item.h}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.p}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <div className="flex items-center gap-3 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFC28A]" />
                <span>Content</span>
              </div>
              <span className="text-white/20">+</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9D88ED]" />
                <span>Conversations</span>
              </div>
              <span className="text-white/20">+</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E055CB]" />
                <span>Reinforcement</span>
              </div>
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
              <p className="text-xs text-gray-400 mt-4 font-medium">Systems thinking</p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <div className="w-10 h-10 rounded-full bg-[#F8F5FC] flex items-center justify-center mb-5">
                <span className="text-sm font-bold text-[#6E3FCC]">02</span>
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-3">Coordination costs grow as work becomes more interdependent</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Adding capacity or contributors can increase communication overhead. The cost of moving together rises faster than the benefit of moving faster alone.
              </p>
              <p className="text-xs text-gray-400 mt-4 font-medium">Coordination theory</p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <div className="w-10 h-10 rounded-full bg-[#F8F5FC] flex items-center justify-center mb-5">
                <span className="text-sm font-bold text-[#6E3FCC]">03</span>
              </div>
              <h3 className="text-lg font-bold text-[#1C1334] mb-3">Strategic alignment connects daily decisions to business outcomes</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Organizations perform better when goals, priorities, measures, and behaviors connect. Alignment is not a feeling. It is an observable, buildable system.
              </p>
              <p className="text-xs text-gray-400 mt-4 font-medium">Strategic alignment research</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PULL QUOTE ─── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl font-extrabold text-[#1C1334] leading-snug mb-4">
            Capacity is increasing. <span className="text-[#6E3FCC]">Alignment has to keep up.</span>
          </p>
          <p className="text-base text-gray-500">
            The future of work is faster. The best organizations will be clearer.
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
                      <strong className="text-white/90">30-minute call.</strong> You share where capacity is growing and where coordination is dragging. We listen.
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
                          <option value="alignment">Teams are misaligned on priorities</option>
                          <option value="coordination">Too much coordination overhead</option>
                          <option value="managers">Managers need better tools</option>
                          <option value="change">Leading through rapid change</option>
                          <option value="ai">Navigating AI adoption</option>
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
