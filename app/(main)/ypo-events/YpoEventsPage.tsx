"use client";

import { useState, useEffect } from "react";

/* ─── constants ─── */

const PASSWORD = "ypocampfire2";

const PURPOSE =
  "We are the best at providing world class experiences. We create opportunities beyond the chapter to connect, share and grow — building better people, better leaders and a better world.";

const CHAIN = [
  {
    label: "Purpose",
    description: "Why this team exists inside YPO.",
  },
  {
    label: "Mission",
    description: "What it’s trying to accomplish this year.",
  },
  {
    label: "Strategy",
    description: "Where it will focus, and what it won’t do.",
  },
  {
    label: "Outcomes",
    description: "What has to be true by year end.",
  },
  {
    label: "Behaviors",
    description: "How people work together to get there.",
  },
];

const MISSION_BULLETS = [
  "Get people outside their chapter",
  "Increase commitment and retention",
  "Strengthen and increase connections",
  "Mentor and coach others",
];

const SCOREBOARD = [
  {
    kind: "Scoreboard",
    items: ["Net revenue retention", "Engagement"],
  },
  {
    kind: "Lead measures",
    items: ["Number of connections"],
  },
];

const IMPERATIVES = [
  {
    step: 1,
    title: "Quality",
    owner: "Camy & Meghna",
    description:
      "Define what “quality” means for a global event, and find a better way to measure it.",
    color: "#C084FC",
  },
  {
    step: 2,
    title: "Audiences",
    owner: "Maria",
    description:
      "Identify the audiences this team isn’t yet serving, and build an audience roadmap.",
    color: "#A855F7",
  },
  {
    step: 3,
    title: "Experiences",
    owner: "Allison",
    description:
      "Build experiences designed for those audiences, rather than adapting what already exists.",
    color: "#8B5CF6",
  },
  {
    step: 4,
    title: "Champions",
    owner: "Jeff & Michele",
    description:
      "Champion excellence. Set the standard across the portfolio and hold the team to it.",
    color: "#7C3AED",
  },
  {
    step: 5,
    title: "Scale",
    owner: "Daniel",
    description:
      "Operationalize what works so it runs on systems instead of individual effort.",
    color: "#6D28D9",
  },
];

const BEHAVIORS = [
  {
    name: "Respected",
    tagline: "We’re brought in early, not handed the work late.",
    items: [
      "Revered. The quality of the work speaks for itself.",
      "Trusted and trusting. We extend trust first.",
      "Elevated. We’re in the room where decisions get made.",
    ],
    color: "#C084FC",
  },
  {
    name: "Bold",
    tagline: "We say the hard thing, and we say it first.",
    items: [
      "Politely assertive. Direct about the issue, careful with the person.",
      "Boldly curious. We ask the question others are avoiding.",
      "Unafraid. We make the call instead of waiting for permission.",
    ],
    color: "#A855F7",
  },
  {
    name: "Intentional",
    tagline: "We choose the work rather than absorb it.",
    items: [
      "Strategic over reactive. We decide what we take on.",
      "Clear about what we’re not doing. We name the tradeoff.",
      "Collaborative by design. We bring people in early, not for sign-off.",
    ],
    color: "#8B5CF6",
  },
  {
    name: "Badass",
    tagline: "Only @ YPO.",
    items: [
      "Only @ YPO. We build what members can’t get anywhere else.",
      "Empowered. We own the outcome, not just the task.",
      "Resilient. We absorb the change and hold the standard.",
    ],
    color: "#7C3AED",
  },
];

const NEXT_STEPS = [
  {
    title: "Do the trust work",
    description:
      "The session didn’t reach it. The shift is from an inward to an outward mindset, treating colleagues as people rather than objects, and replacing assumptions with curiosity. Run it in pairs, three questions: How does someone in my role affect your ability to do your work? How could a person in my role be most helpful to you? How, and how often, should we check in to stay accountable to our impact on each other?",
  },
  {
    title: "Set the cadence",
    description:
      "Commitments were made in the room. What wasn’t agreed is how often the team comes back to them, and who holds whom accountable.",
  },
  {
    title: "Push goals to the individual level",
    description:
      "The chain runs Purpose, Mission, Strategy, Outcomes, Behaviors. Goals are the missing link. Each imperative needs specific goals per team, and then per person.",
  },
  {
    title: "Define each imperative",
    description:
      "The five have owners but not yet definitions. Each owner writes what “done” looks like for their workstream.",
  },
];

/* ─── component ─── */

export default function YpoEventsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("ypo-events-auth");
    if (saved === "true") setAuthenticated(true);
    setLoaded(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem("ypo-events-auth", "true");
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
            YPO Global Events &middot; Vancouver &middot; 18 August 2026
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
            From Purpose
            <br />
            to Behaviors
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed max-w-[620px] mb-10">
            Four hours to define what this team is for, what it&apos;s trying to
            accomplish, and how it needs to work together to get there.
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
            Ten leaders, four hours, one chain
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-5">
            Most teams start at the far end. They pick some values, agree to be
            better, and the words don&apos;t last. This session worked in the
            other direction.
          </p>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-5">
            The room started with why Global Events exists at all, and only got
            to behaviors once there was something to connect them to. Behaviors
            that come out of that work tend to hold up. Behaviors picked because
            they sound good usually don&apos;t.
          </p>
          <p className="text-[1.05rem] text-[#4A4A4A] leading-relaxed max-w-[700px] font-medium">
            Everyone answered the hard questions independently first, then the
            group converged. That is where the real disagreement surfaces.
          </p>
        </div>
      </section>

      {/* ════════ THE STARTING POINT ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Starting Point</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            The work is world class. The recognition isn&apos;t.
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-10">
            This is not a team with a delivery problem. Event satisfaction sits
            at <span className="text-[#1C1334] font-semibold">4.68</span>,
            attendance is solid, and the experiences are excellent. Global
            Events runs hard and runs on budget.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0DA]">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8A9590] mb-3">
                What&apos;s true
              </p>
              <p className="text-[0.95rem] text-[#4A4A4A] leading-relaxed">
                The team delivers experiences members can&apos;t get anywhere
                else. The standard is high and it is being met.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-[#6E3FCC]/20">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#6E3FCC] mb-3">
                What&apos;s missing
              </p>
              <p className="text-[0.95rem] text-[#4A4A4A] leading-relaxed">
                Being seen as strategic rather than operational. Brought in when
                the thinking happens, not when the work needs executing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ QUOTE: STRATEGIC OVER REACTIVE ════════ */}
      <QuoteSection line2="Strategic over Reactive" />

      {/* ════════ PEERDOM ════════ */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0" style={{ background: "#1C1334" }} />
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
          <SectionLabel light>What Events Are For</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-6">
            Peerdom
          </h2>
          <p className="text-lg text-white/50 leading-relaxed max-w-[700px] mb-6">
            In a corporate hierarchy the chief executive is at the top, and
            usually alone. Peerdom is the opposite: leaders meeting strictly as
            equals, without the armor or the titles.
          </p>
          <p className="text-lg text-white/50 leading-relaxed max-w-[700px] mb-12">
            It is what YPO is built on, and it is what this team creates. Global
            Events doesn&apos;t produce events. It produces the conditions for
            peerdom to happen{" "}
            <span className="text-white font-semibold">
              beyond the chapter
            </span>
            .
          </p>

          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1.5px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-white/60 text-[0.95rem] leading-relaxed mb-3">
              Two words were added to the purpose statement in the room:{" "}
              <span className="text-white font-semibold">
                beyond the chapter.
              </span>
            </p>
            <p className="text-white/40 text-sm">
              A chapter is a member&apos;s home. Global Events extends the peer
              network past it.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ THE PURPOSE ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Purpose</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            Why this team exists
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Everyone answered independently, and the answers were not the same.
            An hour later, the room had one statement it agreed on, in its own
            words.
          </p>

          <div
            className="rounded-2xl p-8 md:p-12 mb-10"
            style={{
              background: "linear-gradient(135deg, #F3EFFE 0%, #E8DFFB 100%)",
            }}
          >
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#6E3FCC]/60 mb-4">
              The Purpose
            </p>
            <p className="text-xl md:text-2xl font-bold text-[#1C1334] leading-snug">
              &ldquo;{PURPOSE}&rdquo;
            </p>
          </div>

          <p className="text-[1.05rem] text-[#4A4A4A] leading-relaxed max-w-[700px] mb-4">
            And the phrase the team coined to compress it:
          </p>
          <p className="text-2xl md:text-3xl font-extrabold text-[#6E3FCC] leading-tight mb-6">
            Better Leader. Better World.
          </p>
          <p className="text-[1.05rem] text-[#6B7370] leading-relaxed max-w-[700px]">
            Better people, better leaders, a better world. Every experience this
            team builds should move someone along that line.
          </p>
        </div>
      </section>

      {/* ════════ THE CHAIN ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Chain</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            Left to right, in that order
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            The behaviors have to be the ones that get you to your outcomes, or
            there&apos;s no real reason to hold each other to them. That only
            works if you build the links in sequence.
          </p>

          <div className="grid sm:grid-cols-5 gap-3 mb-10">
            {CHAIN.map((link, i) => (
              <div
                key={link.label}
                className="bg-white rounded-2xl p-5 border border-[#E5E0DA] flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#6E3FCC]/40 text-xs font-extrabold">
                    {i + 1}
                  </span>
                  <p className="font-bold text-[#1C1334] text-[0.95rem]">
                    {link.label}
                  </p>
                </div>
                <p className="text-[0.85rem] text-[#6B7370] leading-relaxed">
                  {link.description}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-6 bg-white border-2 border-[#6E3FCC]/20">
            <p className="text-[0.95rem] text-[#4A4A4A] leading-relaxed">
              <span className="font-bold text-[#6E3FCC]">
                And underneath all of it: trust.
              </span>{" "}
              A team can name perfect behaviors and still not tell each other
              the truth. The framework sits on top of trust work rather than
              beside it.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ THE MISSION ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Mission</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            Events exist to&hellip;
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Given that purpose, what is this team actually trying to do?
          </p>

          <div className="space-y-3">
            {MISSION_BULLETS.map((bullet, i) => (
              <div
                key={bullet}
                className="flex items-start gap-4 bg-[#F8F5FC] rounded-xl p-5 border border-[#E5E0DA]"
              >
                <div className="w-7 h-7 rounded-full bg-[#6E3FCC] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                  {i + 1}
                </div>
                <p className="text-[1.05rem] text-[#1C1334] font-medium leading-relaxed pt-0.5">
                  {bullet}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════ QUOTE: ONLY @ YPO ════════ */}
      <QuoteSection
        line1="Could a member get this experience somewhere else?"
        line2="Only @ YPO."
      />

      {/* ════════ THE SCOREBOARD ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Scoreboard</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            What gets watched
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            The team named the measures it will track. Targets are still to be
            set.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {SCOREBOARD.map((group) => (
              <div
                key={group.kind}
                className="bg-white rounded-2xl p-6 border border-[#E5E0DA]"
              >
                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#6E3FCC] mb-4">
                  {group.kind}
                </p>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[1.05rem] text-[#1C1334] font-medium"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6E3FCC] mt-2.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ THE IMPERATIVES ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Strategy</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            What strategy actually means
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-6">
            Each person owns their outcomes, and predicts the moves needed to
            achieve them. As information changes and other moves are made around
            them, they adapt to that new information.
          </p>
          <p className="text-[1.05rem] text-[#4A4A4A] leading-relaxed max-w-[700px] font-medium mb-12">
            Defining multiple steps ahead is what gives you confidence in the
            first one.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-[#1C1334] leading-tight mb-4">
            Five imperatives, in priority order
          </h3>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Each one has an owner.
          </p>

          <div className="space-y-4">
            {IMPERATIVES.map((s, i) => (
              <div
                key={s.step}
                className="rounded-2xl border border-[#E5E0DA] bg-white overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div
                    className="sm:w-[220px] flex-shrink-0 flex items-center gap-4 px-6 py-4 sm:py-6"
                    style={{ background: s.color }}
                  >
                    <span className="text-white/50 text-3xl font-extrabold">
                      {s.step}
                    </span>
                    <div>
                      <p className="text-white font-bold text-[0.95rem] leading-snug">
                        {s.title}
                      </p>
                      <p className="text-white/60 text-xs mt-0.5">{s.owner}</p>
                    </div>
                  </div>
                  <div className="px-6 py-5 sm:py-6 flex items-center">
                    <p className="text-[#4A4A4A] text-[0.95rem] leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>
                {i < IMPERATIVES.length - 1 && (
                  <div className="flex justify-center -mb-4 relative z-10">
                    <div className="w-[2px] h-4 bg-[#E5E0DA]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ THE BEHAVIORS ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Behaviors</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-2">
            How this team wants to be known
          </h2>
          <p className="text-xl md:text-2xl font-light text-[#6E3FCC] leading-snug mb-6">
            Respected. Bold. Intentional. Badass.
          </p>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            The room generated the words, then voted. These four came out on
            top. Each one has to pass three tests to be real: would we coach it,
            would we reward it, and would we correct its absence?
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {BEHAVIORS.map((b) => (
              <div
                key={b.name}
                className="bg-white rounded-2xl overflow-hidden border border-[#E5E0DA]"
              >
                <div className="px-6 py-4" style={{ background: b.color }}>
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

      {/* ════════ NEXT STEPS ════════ */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0" style={{ background: "#1C1334" }} />
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
          <SectionLabel light>What&apos;s Next</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4">
            Nothing changed in the room
          </h2>
          <p className="text-lg text-white/50 leading-relaxed max-w-[700px] mb-12">
            Four hours can inspire a team, align it, and get it committed. The
            change happens in the weeks after. Four things are still open.
          </p>

          <div className="space-y-4">
            {NEXT_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1.5px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-[#9D88ED] flex items-center justify-center flex-shrink-0 text-[#1C1334] text-xs font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-white font-bold mb-2">{step.title}</p>
                    <p className="text-white/50 text-[0.95rem] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CLOSING ════════ */}
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
            Where this stands
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            The purpose is written and the five imperatives have owners. The
            trust work and the cadence are still ahead of this team.
          </p>
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

function QuoteSection({ line1, line2 }: { line1?: string; line2: string }) {
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
        {line1 && (
          <>
            <p className="text-white/40 text-6xl font-light leading-none mb-4">
              &ldquo;
            </p>
            <p
              className="text-xl md:text-2xl font-light text-white/80 leading-relaxed mb-2"
              dangerouslySetInnerHTML={{ __html: line1 }}
            />
          </>
        )}
        <p
          className={`font-bold text-white leading-tight ${
            line1 ? "text-xl md:text-2xl" : "text-3xl md:text-5xl"
          }`}
          dangerouslySetInnerHTML={{ __html: line2 }}
        />
      </div>
    </section>
  );
}
