import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Campfire Signal — Strategic Alignment That Drives Execution | Campfire",
  description:
    "Most organizations have a strategy. Few have a system to make it real. Campfire Signal connects purpose to outcomes — and outcomes to the daily behaviors that drive execution.",
  openGraph: {
    title: "Campfire Signal — Strategic Alignment That Drives Execution",
    description:
      "Connect purpose to outcomes — and outcomes to the daily behaviors that drive execution. A system for closing the gap between strategy and what people actually do.",
    type: "website",
  },
};

/* ─── data ─── */

const FRAMEWORK_LEVELS = [
  {
    label: "Purpose",
    definition: "Why we exist.",
    description:
      "The enduring reason your organization was created. It doesn\u2019t change with market conditions or leadership turnover. Everything else builds on this.",
    color: "#C084FC",
  },
  {
    label: "Mission",
    definition: "What we\u2019re focused on now.",
    description:
      "Mission translates purpose into a current, time-bound objective. It answers: what are we focused on right now to bring our purpose to life?",
    color: "#A855F7",
  },
  {
    label: "Strategy",
    definition: "How we\u2019ll get there.",
    description:
      "Strategy is the set of choices about where to play and how to win. It turns the mission into a plan of action with clear priorities.",
    color: "#8B5CF6",
  },
  {
    label: "Outcomes",
    definition: "How we measure success.",
    description:
      "Outcomes are the measurable results that tell you whether strategy is working. They create accountability and make progress visible.",
    color: "#7C3AED",
  },
  {
    label: "Behaviors",
    definition: "How we operate daily.",
    description:
      "Behaviors are the daily actions and norms that either accelerate or undermine your strategy. Culture lives here \u2014 not on a poster.",
    color: "#6D28D9",
  },
];

const PROBLEM_STATS = [
  {
    stat: "28%",
    body: "of executives and middle managers can list three of their company\u2019s strategic priorities.",
    source: "MIT Sloan Management Review",
  },
  {
    stat: "67%",
    body: "of well-formulated strategies fail \u2014 not because the strategy was wrong, but because of poor execution.",
    source: "Harvard Business Review",
  },
  {
    stat: "12%",
    body: "of employees transfer new skills learned in training programs back to their actual jobs.",
    source: "Training Industry",
  },
];

const GAP_INSIGHTS = [
  {
    title: "The perception gap",
    body: "Executives overestimate their organization\u2019s strategic alignment by two to three times. Leaders mistake \u201cmessage sent\u201d for \u201cmessage received.\u201d",
    source: "Harvard Business Review, 2023",
  },
  {
    title: "The say-do gap",
    body: "89% of CEOs say CHROs should play a central role in profitable growth \u2014 but only 45% are creating the conditions to let them do so.",
    source: "Accenture",
  },
  {
    title: "Values on a wall",
    body: "There is zero correlation between a company\u2019s official stated values and how well employees say the company lives up to those values.",
    source: "MIT Sloan Management Review",
  },
  {
    title: "Content without behavior",
    body: "The market is saturated with information and content. Most organizations aren\u2019t struggling because they lack information \u2014 but because behavior change doesn\u2019t happen consistently.",
    source: "Campfire POV",
  },
];

const BEHAVIOR_QUESTIONS = [
  {
    question: "What gets rewarded?",
    examples:
      "Saying yes to everything, working long hours, being visible vs. driving outcomes",
  },
  {
    question: "What gets punished?",
    examples:
      "Pushing back on leadership, missing deadlines, taking calculated risks that fail",
  },
  {
    question: "What gets people promoted?",
    examples:
      "Executive visibility, managing large teams, hitting short-term targets vs. building capability",
  },
  {
    question: "What gets ignored?",
    examples:
      "Burnout signals, cross-team collaboration, long-term capacity building",
  },
];

const OFFERING_PILLARS = [
  {
    title: "Strategic Offsites",
    subtitle: "Align the team around what matters.",
    description:
      "Facilitated sessions that create the conditions for honest conversation, then guide teams through purpose, mission, strategy, and behavior definition. Not a retreat \u2014 a strategic inflection point.",
    tags: [
      "Purpose alignment",
      "Mission definition",
      "Behavioral standards",
      "Strategic path",
    ],
    color: "#C084FC",
  },
  {
    title: "Alignment Programs",
    subtitle: "Reinforce priorities through ongoing conversation.",
    description:
      "Structured, facilitated conversations that keep strategic priorities alive across the organization. Not training \u2014 a communication and reinforcement system that scales.",
    tags: [
      "Recurring cadence",
      "Cross-functional",
      "Manager-led",
      "Outcome-tied",
    ],
    color: "#A855F7",
  },
  {
    title: "Behavior Architecture",
    subtitle: "Turn values into daily action.",
    description:
      "Work with teams to surface the behaviors your system actually reinforces, then design the behavioral shifts needed to support your strategy. Values mean nothing without behaviors to back them up.",
    tags: [
      "Behavior audits",
      "Reward alignment",
      "Culture diagnostics",
      "Accountability systems",
    ],
    color: "#8B5CF6",
  },
  {
    title: "Manager Enablement",
    subtitle: "Equip the people who shape execution.",
    description:
      "Managers are the translation layer between strategy and daily work. Signal equips them with the language, frameworks, and facilitation skills to drive alignment at the team level.",
    tags: [
      "Strategic communication",
      "Team alignment",
      "Coaching for execution",
      "Decision frameworks",
    ],
    color: "#7C3AED",
  },
];

const CASE_STUDY_BEFORE = [
  { label: "Reactive", detail: "Responding to requests as they came" },
  { label: "Tactical", detail: "Executing tasks without strategic context" },
  {
    label: "Individually driven",
    detail: "Siloed work without shared direction",
  },
  { label: "Under-leveraged", detail: "Capability far exceeded opportunity" },
];

const CASE_STUDY_AFTER = [
  {
    label: "Strategic",
    detail: "Connecting every initiative to business outcomes",
  },
  {
    label: "Aligned",
    detail: "Unified around a shared mission and behavioral standards",
  },
  {
    label: "Behavior-driven",
    detail: "Values translated into specific daily actions",
  },
  {
    label: "Partner-oriented",
    detail: "Seen as trusted, strategic partners across the organization",
  },
];

const CASE_STUDY_JOURNEY = [
  {
    step: 1,
    title: "Created the conditions",
    description:
      "Started with psychological safety, presence, and genuine connection \u2014 before any strategy conversation.",
    color: "#C084FC",
  },
  {
    step: 2,
    title: "Defined purpose and mission",
    description:
      "Answered the hardest questions: Why do we exist? What mission are we on? The team aligned on becoming trusted, strategic partners.",
    color: "#A855F7",
  },
  {
    step: 3,
    title: "Built behavioral standards",
    description:
      "Translated four core values into specific, observable behaviors \u2014 not aspirational statements, but daily commitments.",
    color: "#8B5CF6",
  },
  {
    step: 4,
    title: "Designed a strategic path",
    description:
      "Created a five-step execution sequence: listen, unify, define behaviors, align processes, and evangelize the new team.",
    color: "#7C3AED",
  },
  {
    step: 5,
    title: "Defined success on their terms",
    description:
      "Identified specific outcomes: high-performing team, unified trust, recognized expertise, clear demonstration of value.",
    color: "#6D28D9",
  },
];

const EVIDENCE_STATS = [
  {
    stat: "3x",
    body: "total returns to shareholders for organizations in the top quartile of organizational health.",
    source: "McKinsey & Company",
  },
  {
    stat: "72%",
    body: "more profitable \u2014 highly aligned organizations vs. their misaligned peers.",
    source: "LSA Global",
  },
  {
    stat: "18%",
    body: "EBITDA increase within one year for organizations that improved their alignment and health.",
    source: "McKinsey & Company",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Diagnose",
    description:
      "Map your alignment chain. Surface the gaps between what your strategy says and what your people experience. Identify where the connection breaks.",
    color: "#C084FC",
  },
  {
    step: "02",
    title: "Align",
    description:
      "Facilitated sessions that connect purpose, mission, strategy, outcomes, and behaviors. Create shared understanding \u2014 not just shared slides.",
    color: "#A855F7",
  },
  {
    step: "03",
    title: "Embed",
    description:
      "Ongoing, structured conversations that reinforce strategic priorities through practice. Equip managers to be the translation layer.",
    color: "#8B5CF6",
  },
  {
    step: "04",
    title: "Sustain",
    description:
      "Systems and rhythms that make alignment the operating default \u2014 not a one-time event. Behavior change that compounds.",
    color: "#7C3AED",
  },
];

const WHY_NOW_POINTS = [
  {
    title: "AI is changing how organizations operate",
    body: "Teams are getting smaller. Expectations are rising. Managers are overseeing broader scopes with more complexity. The human side of work is becoming more fragile \u2014 and more important.",
  },
  {
    title: "Managers are becoming force multipliers",
    body: "A single manager\u2019s ability to create clarity, drive accountability, and reinforce priorities has compounding impact. 70% of the variance in team engagement is attributable to the manager.",
  },
  {
    title: "Content isn\u2019t the bottleneck",
    body: "Most organizations already know what good leadership looks like. The real challenge is embedding behaviors into day-to-day work \u2014 consistently, across teams, over time.",
  },
  {
    title: "Budgets are tied to outcomes, not programs",
    body: "Leadership development framed as discretionary spending is getting cut. Organizations will continue to invest in strategic alignment, organizational effectiveness, and execution systems.",
  },
];

/* ─── component ─── */

export default function StrategicAlignmentPage() {
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
            Campfire Signal
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
            Turn Strategy
            <br />
            Into Behavior
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed max-w-[600px] mb-10">
            Most organizations have a strategy. Few have a system to make it
            real. Campfire Signal connects purpose to outcomes &mdash; and
            outcomes to the daily behaviors that drive execution.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="https://calendly.com/getcampfire/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#E055CB] hover:bg-[#c94ab5] text-white font-bold px-8 py-4 rounded-full text-lg transition-colors duration-200"
            >
              Book a Conversation
            </Link>
            <Link
              href="#how-it-works"
              className="inline-block border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors duration-200"
            >
              See How It Works
            </Link>
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

      {/* ════════ THE PROBLEM ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-6">
            The strategy-execution gap is the most expensive problem in
            business
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Organizations invest heavily in strategy &mdash; then watch it
            dissolve into busywork, misaligned priorities, and disconnected
            teams. The gap between what leadership intends and what people
            actually do is where most organizations lose.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mb-14">
            {PROBLEM_STATS.map((s) => (
              <StatCard key={s.stat} {...s} />
            ))}
          </div>

          <Blockquote
            quote="The problem isn't that people don't care about strategy. It's that most people have never been shown how their work connects to it."
            attribution="Steve Arntz, CEO of Campfire"
          />
        </div>
      </section>

      {/* ════════ THE FRAMEWORK ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Framework</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            Strategic Alignment Is a Chain, Not a Checklist
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Five connected levels &mdash; from the enduring reason you exist to
            the daily behaviors that make it real. When the chain holds, people
            move with clarity and confidence. When a link breaks, even great
            teams drift.
          </p>

          <div className="space-y-4 mb-14">
            {FRAMEWORK_LEVELS.map((level, i) => (
              <div
                key={level.label}
                className="rounded-2xl border border-[#E5E0DA] bg-white overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div
                    className="sm:w-[200px] flex-shrink-0 flex items-center justify-center px-6 py-4 sm:py-6"
                    style={{ background: level.color }}
                  >
                    <div className="text-center sm:text-left w-full">
                      <p className="text-white font-extrabold text-lg uppercase tracking-wide">
                        {level.label}
                      </p>
                      <p className="text-white/70 text-sm font-light">
                        {level.definition}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-5 sm:py-6 flex items-center">
                    <p className="text-[#4A4A4A] text-[0.95rem] leading-relaxed">
                      {level.description}
                    </p>
                  </div>
                </div>
                {i < FRAMEWORK_LEVELS.length - 1 && (
                  <div className="flex justify-center -mb-4 relative z-10">
                    <div className="w-[2px] h-4 bg-[#E5E0DA]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <Blockquote
            quote="Alignment is not a workshop outcome. It's an operating system. Campfire Signal builds the system."
            attribution="Campfire"
          />
        </div>
      </section>

      {/* ════════ QUOTE: GAP ════════ */}
      <QuoteSection
        line1="Misalignment doesn&rsquo;t happen because people don&rsquo;t care."
        line2="It happens because the connection breaks somewhere in the chain."
      />

      {/* ════════ WHERE ALIGNMENT BREAKS ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Gap</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            Where Alignment Breaks Down
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Most organizations have some version of purpose, mission, and
            strategy written down somewhere. The problem isn&apos;t that these
            things don&apos;t exist. It&apos;s that they don&apos;t connect
            &mdash; and nobody talks about the gaps.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {GAP_INSIGHTS.map((g) => (
              <InsightCard key={g.title} {...g} />
            ))}
          </div>

          <div className="bg-[#F8F5FC] rounded-2xl p-8 border border-[#E5E0DA]">
            <p className="text-[0.95rem] text-[#4A4A4A] leading-relaxed">
              The #1 barrier to business reinvention?{" "}
              <strong>
                The disconnect between planning and execution
              </strong>{" "}
              &mdash; ranked above talent shortages, technology limitations,
              and budget constraints. In a world where 93% of executives say
              they must reinvent their business model every 2&ndash;5 years,
              this gap is existential.
            </p>
            <p className="text-xs text-[#8A9590] mt-3">
              Source: PMI, 2025
            </p>
          </div>
        </div>
      </section>

      {/* ════════ CULTURE = BEHAVIOR ════════ */}
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
          <SectionLabel light>Culture</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-2">
            Your culture is not your values.
          </h2>
          <p className="text-xl md:text-2xl font-light text-[#9D88ED] leading-snug mb-6">
            It&apos;s the behaviors your system reinforces.
          </p>
          <p className="text-lg text-white/50 leading-relaxed max-w-[700px] mb-12">
            Most organizations can recite their values. Few can honestly
            describe what actually gets rewarded, punished, promoted, or
            ignored. This is where the real culture lives &mdash; and where
            strategy either accelerates or dies.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {BEHAVIOR_QUESTIONS.map((q) => (
              <div
                key={q.question}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1.5px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  {q.question}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed italic">
                  e.g. {q.examples}
                </p>
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
              The question isn&apos;t whether your behaviors align with your
              values.
            </p>
            <p className="text-white font-semibold text-[0.95rem] leading-relaxed">
              It&apos;s whether your behaviors support your strategy or
              fight it.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ QUOTE: CULTURE ════════ */}
      <QuoteSection
        line1="If your reward systems fight your strategy,"
        line2="your strategy will lose every time."
      />

      {/* ════════ WHY NOW ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>Why Now</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            Human systems matter more in an AI-driven world
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            As organizations become more AI-enabled, the human side of work
            becomes more fragile and more important. Companies don&apos;t need
            more content &mdash; they need strategic alignment and consistent
            execution.
          </p>

          <div className="space-y-5 mb-14">
            {WHY_NOW_POINTS.map((point) => (
              <div
                key={point.title}
                className="bg-[#F8F5FC] rounded-2xl p-7 border border-[#E5E0DA]"
              >
                <h3 className="text-lg font-bold text-[#1C1334] mb-2">
                  {point.title}
                </h3>
                <p className="text-[0.95rem] text-[#6B7370] leading-relaxed">
                  {point.body}
                </p>
              </div>
            ))}
          </div>

          <Blockquote
            quote="The winning platform won't be the one with the best content. It will be the one that best drives consistent execution and adoption."
            attribution="Campfire POV"
          />
        </div>
      </section>

      {/* ════════ WHAT SIGNAL DOES ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Offering</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-2">
            Campfire Signal
          </h2>
          <p className="text-xl md:text-2xl font-light text-[#6E3FCC] leading-snug mb-6">
            From strategy to manager behavior to team execution.
          </p>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Signal is not a training program. It&apos;s organizational
            infrastructure &mdash; a system of facilitated conversations,
            behavioral frameworks, and operating rhythms that close the gap
            between what your strategy says and what your people actually do.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {OFFERING_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-2xl overflow-hidden border border-[#E5E0DA]"
              >
                <div
                  className="px-6 py-4"
                  style={{ background: pillar.color }}
                >
                  <p className="text-white font-extrabold text-lg">
                    {pillar.title}
                  </p>
                  <p className="text-white/70 text-sm font-light">
                    {pillar.subtitle}
                  </p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-[0.9rem] text-[#4A4A4A] leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-[#6E3FCC]/10 text-[#6E3FCC]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ QUOTE: INFRASTRUCTURE ════════ */}
      <QuoteSection
        line1="Not content. Not coursework. Not training."
        line2="Facilitated clarity. Strategic alignment. Execution support."
      />

      {/* ════════ CASE STUDY ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>In Practice</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            How a senior leadership team went from reactive to strategic
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-5">
            A senior marketing leadership team at a global organization was
            stuck. Talented people, meaningful work &mdash; but operating
            reactively, individually, without shared direction. They
            weren&apos;t seen as strategic partners. They were seen as a
            support function.
          </p>
          <p className="text-[1.05rem] text-[#4A4A4A] leading-relaxed max-w-[700px] font-medium mb-12">
            In a single facilitated offsite, Campfire helped them redefine who
            they are, align around a shared mission, and build the behavioral
            system to make it stick.
          </p>

          {/* Before / After */}
          <div className="grid md:grid-cols-2 gap-8 mb-14">
            <div>
              <p className="text-sm font-semibold tracking-[0.12em] uppercase text-[#8A9590] mb-4">
                Before
              </p>
              <div className="space-y-3">
                {CASE_STUDY_BEFORE.map((item) => (
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
            <div>
              <p className="text-sm font-semibold tracking-[0.12em] uppercase text-[#6E3FCC] mb-4">
                After
              </p>
              <div className="space-y-3">
                {CASE_STUDY_AFTER.map((item) => (
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

          {/* The journey */}
          <h3 className="text-xl font-bold text-[#1C1334] mb-6">
            The journey
          </h3>
          <div className="space-y-4 mb-14">
            {CASE_STUDY_JOURNEY.map((s, i) => (
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
                {i < CASE_STUDY_JOURNEY.length - 1 && (
                  <div className="flex justify-center -mb-4 relative z-10">
                    <div className="w-[2px] h-4 bg-[#E5E0DA]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <Blockquote
            quote="The team aligned around a clear mission, defined the behaviors to support it, and committed to becoming a trusted, strategic force \u2014 not just a support function."
            attribution="Offsite summary"
          />
        </div>
      </section>

      {/* ════════ THE EVIDENCE ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Evidence</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            Alignment Drives Results
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            When purpose, strategy, and behavior connect, the impact is
            measurable. Organizations that get this right don&apos;t just feel
            more aligned &mdash; they outperform.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mb-14">
            {EVIDENCE_STATS.map((s) => (
              <StatCard key={s.stat} {...s} />
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#E5E0DA] mb-8">
            <p className="text-[0.95rem] text-[#4A4A4A] leading-relaxed mb-3">
              Managers account for{" "}
              <strong>
                70% of the variance in team engagement
              </strong>{" "}
              &mdash; making manager capability the single largest
              controllable lever for organizational performance. Engaged teams
              drive{" "}
              <strong>23% higher profitability</strong> and{" "}
              <strong>78% less absenteeism</strong>.
            </p>
            <p className="text-xs text-[#8A9590]">Source: Gallup</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#E5E0DA]">
            <p className="text-[0.95rem] text-[#4A4A4A] leading-relaxed mb-3">
              An EY and Harvard Business School study found that{" "}
              <strong>
                85% of purpose-driven companies saw revenue growth
              </strong>
              , while 42% of companies that had not prioritized purpose saw
              revenue decline or stagnate. 53% of executives at
              purpose-driven companies reported success at innovation and
              transformation, versus just 19% at companies that hadn&apos;t.
            </p>
            <p className="text-xs text-[#8A9590]">
              Source: EY / Harvard Business School Beacon Institute
            </p>
          </div>
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section id="how-it-works" className="relative overflow-hidden py-20 md:py-28">
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
          <SectionLabel light>How It Works</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4">
            A system, not a one-time event
          </h2>
          <p className="text-lg text-white/50 leading-relaxed max-w-[700px] mb-12">
            Campfire Signal is designed to create alignment that lasts &mdash;
            through a repeatable process that meets your organization where it
            is.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1.5px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="px-6 py-3 flex items-center gap-3"
                  style={{ background: item.color }}
                >
                  <span className="text-white/50 text-xl font-extrabold">
                    {item.step}
                  </span>
                  <p className="text-white font-extrabold text-lg">
                    {item.title}
                  </p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-white/70 text-[0.9rem] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CAMPFIRE CONNECTION ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Campfire Difference</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-6">
            Built on everything we already know
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Campfire has facilitated thousands of leadership conversations
            across hundreds of organizations. Signal takes that foundation
            &mdash; live facilitation, structured reflection, peer learning,
            applied discussion &mdash; and points it directly at the
            strategy-execution gap.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {[
              {
                stat: "6,000+",
                label: "Sessions delivered",
              },
              {
                stat: "250+",
                label: "Companies served",
              },
              {
                stat: "10,000+",
                label: "Leaders supported",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#F8F5FC] rounded-2xl p-6 border border-[#E5E0DA] text-center"
              >
                <p className="text-3xl md:text-4xl font-extrabold text-[#6E3FCC] mb-2">
                  {s.stat}
                </p>
                <p className="text-sm text-[#6B7370]">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              "Live, facilitated conversations \u2014 not self-paced content",
              "Structured reflection before speaking, so every voice is heard",
              "Applied discussion that connects to real work",
              "Behavioral practice, not just concept delivery",
              "Designed for engagement, not consumption",
              "Scales from a single team to the entire organization",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 bg-[#F8F5FC] rounded-xl px-6 py-4"
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6E3FCC"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12.5L9.5 18L20 6" />
                </svg>
                <p className="text-[0.9rem] text-[#4A4A4A]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ WHO IT'S FOR ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>Who It&apos;s For</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-12">
            Signal is built for leaders navigating real complexity
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Executive teams",
                body: "Aligning around purpose, mission, and strategic priorities \u2014 and translating them into behaviors the whole organization can follow.",
              },
              {
                title: "HR & People leaders",
                body: "Shifting from reactive support to strategic partnership. Demonstrating clear business impact tied to measurable outcomes.",
              },
              {
                title: "Functional leadership teams",
                body: "Building shared identity, mission clarity, and behavioral standards that change how the team operates and how the organization perceives them.",
              },
              {
                title: "Organizations in transition",
                body: "Navigating restructuring, transformation, or rapid change where alignment is the difference between momentum and drift.",
              },
            ].map((audience) => (
              <div
                key={audience.title}
                className="bg-white rounded-2xl p-6 border border-[#E5E0DA]"
              >
                <div className="w-2 h-2 rounded-full bg-[#6E3FCC] mb-4" />
                <h3 className="text-base font-bold text-[#1C1334] mb-2">
                  {audience.title}
                </h3>
                <p className="text-sm text-[#6B7370] leading-relaxed">
                  {audience.body}
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
            Ready to close the gap between
            <br />
            strategy and execution?
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mb-4">
            Campfire Signal helps organizations turn strategic intent into
            daily behavior &mdash; through facilitated alignment, behavioral
            architecture, and systems that sustain the change.
          </p>
          <p className="text-lg text-white/60 leading-relaxed mb-10">
            Let&apos;s start with a conversation about where your chain
            breaks.
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

function StatCard({
  stat,
  body,
  source,
}: {
  stat: string;
  body: string;
  source: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E5E0DA]">
      <p className="text-4xl md:text-5xl font-extrabold text-[#6E3FCC] mb-3">
        {stat}
      </p>
      <p className="text-[0.9rem] text-[#4A4A4A] leading-relaxed mb-3">
        {body}
      </p>
      <p className="text-xs text-[#8A9590]">{source}</p>
    </div>
  );
}

function InsightCard({
  title,
  body,
  source,
}: {
  title: string;
  body: string;
  source: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E5E0DA]">
      <h3 className="text-base font-bold text-[#1C1334] mb-2">{title}</h3>
      <p className="text-[0.9rem] text-[#4A4A4A] leading-relaxed mb-3">
        {body}
      </p>
      <p className="text-xs text-[#8A9590]">{source}</p>
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
