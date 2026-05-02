"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ─── constants ─── */

const PASSWORD = "ypocampfire";

const CONDITIONS = [
  {
    title: "Psychological Safety",
    body: "People felt safe enough to be honest about what\u2019s working and what isn\u2019t.",
  },
  {
    title: "Presence",
    body: "Distractions were named and set aside. The team arrived in the room \u2014 fully.",
  },
  {
    title: "Connection",
    body: "Before being colleagues with a strategy problem, they were humans who needed to see each other.",
  },
];

const STRATEGIC_SEQUENCE = [
  {
    step: 1,
    title: "Listen to partners",
    description:
      "Run a listening tour. Understand real needs \u2014 not assumed ones.",
    color: "#C084FC",
  },
  {
    step: 2,
    title: "Unify around purpose + mission",
    description:
      "Get internal clarity before asking for external credibility.",
    color: "#A855F7",
  },
  {
    step: 3,
    title: "Define key behaviors",
    description:
      "Name what you actually do differently \u2014 not just what you believe.",
    color: "#8B5CF6",
  },
  {
    step: 4,
    title: "Align work + processes",
    description:
      "Match behavior to execution. Close the gap between intention and action.",
    color: "#7C3AED",
  },
  {
    step: 5,
    title: "Evangelize the new team",
    description:
      "Rebuild the brand. Show up differently \u2014 in every room, every interaction.",
    color: "#6D28D9",
  },
];

const BEHAVIORS = [
  {
    name: "Joy",
    tagline: "We create an environment people want to be in.",
    items: [
      "Optimism, hope, and enjoying the journey",
      "Psychological safety as a non-negotiable",
      "Balance and boundaries that sustain performance",
    ],
    color: "#C084FC",
  },
  {
    name: "Trust",
    tagline: "We do what we say and show up fully.",
    items: [
      "Accountability, delivery, and ownership",
      "Engage and contribute in every room",
      "Listen without judgment",
    ],
    color: "#A855F7",
  },
  {
    name: "Power",
    tagline: "We don\u2019t wait. We lead.",
    items: [
      "Ownership and proactivity",
      "Expertise and solutions orientation",
      "Comfort in discomfort \u2014 resilience and adaptability",
    ],
    color: "#8B5CF6",
  },
  {
    name: "Partnership",
    tagline: "We elevate the system, not just solve tasks.",
    items: [
      "Advocacy and inclusion",
      "Problem over person",
      "Operate strategically, not just tactically",
    ],
    color: "#7C3AED",
  },
];

const CIRCLES = [
  {
    label: "Control",
    description:
      "What we can directly change \u2014 our actions, our standards, our preparation.",
    color: "#C084FC",
  },
  {
    label: "Influence",
    description:
      "What we can shape through consistent action \u2014 relationships, perceptions, processes.",
    color: "#A855F7",
  },
  {
    label: "Concern",
    description:
      "What we notice but can\u2019t control \u2014 market forces, organizational politics, external constraints.",
    color: "#8B5CF6",
  },
];

const BEFORE_AFTER = {
  before: [
    { label: "Tactical", detail: "Responding to requests as they come" },
    { label: "Reactive", detail: "Waiting to be asked" },
    { label: "Under-leveraged", detail: "Capability exceeded opportunity" },
  ],
  after: [
    { label: "Strategic", detail: "Connecting work to business outcomes" },
    { label: "Aligned", detail: "Unified around mission and behaviors" },
    {
      label: "Behavior-driven",
      detail: "Values translated into daily action",
    },
    { label: "Partner-oriented", detail: "Earning a seat at the table" },
  ],
};

const OUTCOMES = [
  "A high-performing, unified team",
  "Trusted as subject matter experts",
  "Seen as invaluable strategic partners",
  "Better member experience",
  "Clear, measurable proof of value",
  "Aligned in trust and purpose",
];

/* ─── component ─── */

export default function YpoPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("ypo-auth");
    if (saved === "true") setAuthenticated(true);
    setLoaded(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem("ypo-auth", "true");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  /* ── password gate ── */
  if (!loaded) return null;

  if (!authenticated) {
    return (
      <main className="bg-white">
        <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(165deg, #1C1334 0%, #4E0DA9 35%, #6E3FCC 60%, #9D88ED 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url(/clear-topo.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.15,
            }}
          />
          <div className="relative z-10 w-full max-w-[420px] mx-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-2xl">
              <div className="text-center mb-8">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#6E3FCC]/50 mb-3">
                  Campfire
                </p>
                <h1 className="text-2xl font-bold text-[#1C1334] mb-2">
                  This page is protected
                </h1>
                <p className="text-sm text-[#6B7370]">
                  Enter the password to continue.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E0DA] text-[#1C1334] placeholder:text-[#8A9590] focus:outline-none focus:ring-2 focus:ring-[#6E3FCC]/30 focus:border-[#6E3FCC] mb-4"
                  autoFocus
                />
                {error && (
                  <p className="text-sm text-red-500 mb-3">
                    Incorrect password. Try again.
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#6E3FCC] hover:bg-[#5A32A8] text-white font-bold py-3 rounded-xl transition-colors duration-200"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ── page content ── */
  return (
    <main className="bg-white">
      {/* ════════ HERO ════════ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, #1C1334 0%, #4E0DA9 35%, #6E3FCC 60%, #9D88ED 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/clear-topo.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 py-32 md:py-44">
          <p className="text-sm font-semibold tracking-[0.14em] uppercase text-white/50 mb-6">
            Leadership Offsite &middot; 2026
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
            From Reactive
            <br />
            to Strategic
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed max-w-[600px] mb-10">
            How a team redefined their identity &mdash; and built a system for
            becoming trusted, strategic partners.
          </p>
          <div className="flex items-center gap-4 text-white/40 text-sm">
            <span>Facilitated by</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Campfire</span>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div
            className="w-[2px] h-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ════════ THE SESSION ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Session</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-6">
            This wasn&apos;t a workshop
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-5">
            It was a shift. The kind that happens when a team slows down long
            enough to ask the hard questions &mdash; and is honest enough to
            answer them.
          </p>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-5">
            Over the course of a single offsite, this team moved from reactive
            support function to aligned, strategic partner. Not through theory.
            Through the work.
          </p>
          <p className="text-[1.05rem] text-[#4A4A4A] leading-relaxed max-w-[700px] font-medium">
            The arc was clear: create the conditions, anchor in purpose, define
            a mission, build a strategy, and turn values into behaviors that
            actually stick.
          </p>
        </div>
      </section>

      {/* ════════ CREATING THE CONDITIONS ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Starting Point</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            It started with people, not strategy
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            The session opened with an emotional check-in. Not icebreakers. Not
            agenda review. A real one &mdash; naming distractions, creating
            space, getting present.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mb-14">
            {CONDITIONS.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-2xl p-6 border border-[#E5E0DA]"
              >
                <div className="w-2 h-2 rounded-full bg-[#6E3FCC] mb-4" />
                <h3 className="text-base font-bold text-[#1C1334] mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-[#6B7370] leading-relaxed">
                  {c.body}
                </p>
              </div>
            ))}
          </div>

          <Blockquote
            quote="You can't build strategy on top of disconnection. This created the conditions for everything that followed."
            attribution="Session design principle"
          />
        </div>
      </section>

      {/* ════════ QUOTE: DISCONNECTION ════════ */}
      <QuoteSection
        line1="You can&apos;t build strategy on top of disconnection."
        line2="Everything that followed depended on this moment."
      />

      {/* ════════ THE MISSION ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Breakthrough</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            One question changed everything
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-5">
            Before talking about what to do, the team answered a harder
            question:{" "}
            <span className="text-[#1C1334] font-semibold">
              Why do we exist?
            </span>
          </p>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Then translated that into something actionable:{" "}
            <span className="text-[#1C1334] font-semibold">
              What mission are we on?
            </span>
          </p>

          {/* mission statement card */}
          <div
            className="rounded-2xl p-8 md:p-12 mb-10"
            style={{
              background:
                "linear-gradient(135deg, #F3EFFE 0%, #E8DFFB 100%)",
            }}
          >
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#6E3FCC]/60 mb-4">
              The Mission
            </p>
            <p className="text-2xl md:text-3xl font-bold text-[#1C1334] leading-snug">
              &ldquo;We are on a mission to become trusted, strategic, and
              valuable partners.&rdquo;
            </p>
          </div>

          <p className="text-[1.05rem] text-[#4A4A4A] leading-relaxed max-w-[700px] mb-4">
            This is the most important output of the entire session.
          </p>
          <p className="text-[1.05rem] text-[#6B7370] leading-relaxed max-w-[700px]">
            Because it reframes everything &mdash; how the team sees themselves,
            how others should experience them, and what success actually means.
            It moves the team from a support function to a strategic force.
          </p>
        </div>
      </section>

      {/* ════════ THE PLAYING FIELD ════════ */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute inset-0"
          style={{ background: "#1C1334" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/clear-topo.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.08,
          }}
        />
        <div className="relative z-10 max-w-[900px] mx-auto px-6">
          <SectionLabel light>The Shift</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4">
            We control more than we think
          </h2>
          <p className="text-lg text-white/50 leading-relaxed max-w-[700px] mb-12">
            Using three circles &mdash; Control, Influence, and Concern &mdash;
            the team mapped where they actually have power. The realization
            wasn&apos;t about accepting limitations. It was about recognizing
            agency.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {CIRCLES.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1.5px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="px-5 py-3"
                  style={{ background: c.color }}
                >
                  <p className="text-white font-extrabold text-sm uppercase tracking-wider">
                    {c.label}
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-white/70 text-[0.9rem] leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1.5px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-white/60 text-[0.95rem] leading-relaxed mb-3">
              The key insight:{" "}
              <span className="text-white font-semibold">
                if you influence the right things, the system changes.
              </span>
            </p>
            <p className="text-white/40 text-sm">
              The team moved from passive to proactive, from reactive to
              intentional.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ THE STRATEGIC SEQUENCE ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The System</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            A system for change &mdash; not just ideas
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Most teams stop at step two. This team built a complete strategic
            sequence &mdash; a clear path from listening to transformation.
          </p>

          <div className="space-y-4 mb-14">
            {STRATEGIC_SEQUENCE.map((s, i) => (
              <div
                key={s.step}
                className="rounded-2xl border border-[#E5E0DA] bg-white overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div
                    className="sm:w-[200px] flex-shrink-0 flex items-center gap-4 px-6 py-4 sm:py-6"
                    style={{ background: s.color }}
                  >
                    <span className="text-white/50 text-3xl font-extrabold">
                      {s.step}
                    </span>
                    <p className="text-white font-bold text-[0.95rem] leading-snug">
                      {s.title}
                    </p>
                  </div>
                  <div className="px-6 py-5 sm:py-6 flex items-center">
                    <p className="text-[#4A4A4A] text-[0.95rem] leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>
                {i < STRATEGIC_SEQUENCE.length - 1 && (
                  <div className="flex justify-center -mb-4 relative z-10">
                    <div className="w-[2px] h-4 bg-[#E5E0DA]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <Blockquote
            quote="Most teams stop at step two. This team now has a system for the whole journey."
            attribution="Offsite debrief"
          />
        </div>
      </section>

      {/* ════════ QUOTE: LEAD ════════ */}
      <QuoteSection
        line1="We don&apos;t wait to be asked."
        line2="We lead."
      />

      {/* ════════ BEHAVIORS ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Behaviors</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-2">
            Values without behaviors are just words
          </h2>
          <p className="text-xl md:text-2xl font-light text-[#6E3FCC] leading-snug mb-6">
            The team turned four anchors into behavioral standards.
          </p>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            This is where most offsites fail. Teams agree on values, put them on
            a slide, and go back to the same patterns. This team made them
            actionable.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {BEHAVIORS.map((b) => (
              <div
                key={b.name}
                className="bg-white rounded-2xl overflow-hidden border border-[#E5E0DA]"
              >
                <div
                  className="px-6 py-4"
                  style={{ background: b.color }}
                >
                  <p className="text-white font-extrabold text-lg uppercase tracking-wide">
                    {b.name}
                  </p>
                  <p className="text-white/70 text-sm font-light">
                    {b.tagline}
                  </p>
                </div>
                <div className="px-6 py-5">
                  <ul className="space-y-2.5">
                    {b.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[0.9rem] text-[#4A4A4A] leading-relaxed"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ background: b.color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ THE TRANSFORMATION ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Result</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-12">
            What changed
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-14">
            {/* Before */}
            <div>
              <p className="text-sm font-semibold tracking-[0.12em] uppercase text-[#8A9590] mb-4">
                Before
              </p>
              <div className="space-y-3">
                {BEFORE_AFTER.before.map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#F8F5FC] rounded-xl p-5 border border-[#E5E0DA]"
                  >
                    <p className="font-bold text-[#6B7370] mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-[#8A9590]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* After */}
            <div>
              <p className="text-sm font-semibold tracking-[0.12em] uppercase text-[#6E3FCC] mb-4">
                After
              </p>
              <div className="space-y-3">
                {BEFORE_AFTER.after.map((item) => (
                  <div
                    key={item.label}
                    className="bg-white rounded-xl p-5 border-2 border-[#6E3FCC]/20"
                  >
                    <p className="font-bold text-[#6E3FCC] mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-[#4A4A4A]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Blockquote
            quote="This team aligned around a clear mission, defined the behaviors to support it, and committed to becoming a trusted, strategic partner \u2014 not just a support function."
            attribution="Session summary"
          />
        </div>
      </section>

      {/* ════════ OUTCOMES ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>What Success Looks Like</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            The team defined their own measures
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Not abstract goals. Real outcomes that bridge internal identity with
            external impact.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OUTCOMES.map((outcome, i) => (
              <div
                key={outcome}
                className="bg-white rounded-2xl p-6 border border-[#E5E0DA] flex items-start gap-4"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5"
                  style={{ background: "#6E3FCC" }}
                >
                  {i + 1}
                </div>
                <p className="text-[0.95rem] text-[#4A4A4A] leading-relaxed font-medium">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #6E3FCC 0%, #9D88ED 50%, #C084FC 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/clear-topo.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
          }}
        />
        <div className="relative z-10 max-w-[620px] mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-5">
            Ready to bring this
            <br />
            to your team?
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mb-10">
            Campfire builds interactive sessions that turn strategy into
            behavior and behavior into results. This offsite is one example of
            what&apos;s possible when teams do the real work together.
          </p>
          <Link
            href="https://calendly.com/getcampfire/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E055CB] hover:bg-[#c94ab5] text-white font-bold px-8 py-4 rounded-full text-lg transition-colors duration-200"
          >
            Book a Conversation
          </Link>
        </div>
      </section>

      {/* inline keyframes */}
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 0.8; transform: scaleY(1); }
        }
      `}</style>
    </main>
  );
}

/* ─── shared components ─── */

function SectionLabel({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span
        className={`text-xs font-semibold tracking-[0.12em] uppercase ${
          light ? "text-white/50" : "text-[#6E3FCC]"
        }`}
      >
        {children}
      </span>
      <div
        className="flex-1 h-[1.5px]"
        style={{
          background: light ? "rgba(255,255,255,0.12)" : "#E5E0DA",
        }}
      />
    </div>
  );
}

function Blockquote({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <div className="border-l-[3px] border-[#9D88ED] pl-6 py-2">
      <p className="text-[1.1rem] text-[#4A4A4A] leading-relaxed italic mb-2">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="text-sm text-[#8A9590]">&mdash; {attribution}</p>
    </div>
  );
}

function QuoteSection({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #6E3FCC 0%, #9D88ED 60%, #C084FC 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/clear-topo.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
        }}
      />
      <div className="relative z-10 max-w-[620px] mx-auto px-6 text-center">
        <p className="text-white/40 text-6xl font-light leading-none mb-4">
          &ldquo;
        </p>
        <p
          className="text-xl md:text-2xl font-light text-white/80 leading-relaxed mb-2"
          dangerouslySetInnerHTML={{ __html: line1 }}
        />
        <p
          className="text-xl md:text-2xl font-bold text-white leading-relaxed"
          dangerouslySetInnerHTML={{ __html: line2 }}
        />
      </div>
    </section>
  );
}
