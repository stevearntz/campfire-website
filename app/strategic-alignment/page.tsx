import type { Metadata } from "next";
import Link from "next/link";
import StrategicAlignmentHero from "./StrategicAlignmentHero";

export const metadata: Metadata = {
  title:
    "Strategic Alignment That Drives Execution | Campfire",
  description:
    "Most organizations have a strategy. Few have a system to make it real. Campfire connects purpose to outcomes, and outcomes to the daily behaviors that drive execution.",
  openGraph: {
    title: "Strategic Alignment That Drives Execution | Campfire",
    description:
      "Connect purpose to outcomes, and outcomes to the daily behaviors that drive execution. A system for closing the gap between strategy and what people actually do.",
    type: "website",
  },
};

/* ─── data ─── */

const FRAMEWORK_LEVELS = [
  {
    label: "Purpose",
    description:
      "Why we exist. The reason your organization was created. It doesn't change with market conditions or leadership turnover. Everything else builds on this.",
    color: "#C084FC",
  },
  {
    label: "Mission",
    description:
      "What we're focused on now. Mission translates purpose into a current, time-bound objective. It answers: what are we focused on right now to bring our purpose to life?",
    color: "#A855F7",
  },
  {
    label: "Strategy",
    description:
      "How we'll get there. The set of choices about where to play and how to win. Strategy turns the mission into a plan of action with clear priorities.",
    color: "#8B5CF6",
  },
  {
    label: "Outcomes",
    description:
      "How we measure success. The measurable results that tell you whether strategy is working. Outcomes create accountability and make progress visible.",
    color: "#7C3AED",
  },
  {
    label: "Behaviors",
    description:
      "How we operate daily. The actions and norms that either accelerate or undermine your strategy. Culture lives here, not on a poster.",
    color: "#6D28D9",
  },
];

const PROBLEM_STATS = [
  {
    stat: "95%",
    body: "of employees are unaware of or do not understand their company's strategy.",
    source: "Harvard Business Review",
  },
  {
    stat: "67%",
    body: "of well-formulated strategies fail, not because the strategy was wrong, but because of poor execution.",
    source: "Harvard Business Review",
  },
  {
    stat: "70%",
    body: "of strategic transformations fail to achieve their objectives. Every organization is going through one right now.",
    source: "McKinsey & Company",
  },
];

const GAP_INSIGHTS = [
  {
    title: "The perception gap",
    body: 'Executives overestimate their organization\'s strategic alignment by two to three times. Leaders mistake "message sent" for "message received."',
    source: "Harvard Business Review, 2023",
  },
  {
    title: "The say-do gap",
    body: "89% of CEOs say CHROs should play a central role in profitable growth, but only 45% are creating the conditions to let them do so.",
    source: "Accenture",
  },
  {
    title: "Values on a wall",
    body: "There is zero correlation between a company's official stated values and how well employees say the company lives up to those values.",
    source: "MIT Sloan Management Review",
  },
  {
    title: "Content without behavior",
    body: "There's no shortage of information and content. Most organizations aren't struggling because they lack information. They struggle because behavior change doesn't happen consistently across teams.",
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
      "Facilitated sessions that create the conditions for honest conversation, then guide teams through purpose, mission, strategy, and behavior definition. Not a retreat. A turning point.",
    tags: [
      "Purpose alignment",
      "Mission definition",
      "Behavioral standards",
      "Strategic path",
    ],
    color: "#C084FC",
  },
  {
    title: "Behavioral Assessment",
    subtitle: "Own your own development.",
    description:
      "A custom 360-feedback tool built around your team's specific observable behaviors. No neutral scores, no hiding behind averages. Individuals own their results, choose who to ask, and decide what to work on. Development starts with honest feedback, not mandates from above.",
    tags: [
      "12 observable behaviors",
      "6-point scale, no neutrals",
      "Self-directed feedback",
      "Private results",
    ],
    color: "#A855F7",
  },
  {
    title: "Follow-On Sessions",
    subtitle: "Reinforce through peer conversation.",
    description:
      "Facilitated small-group sessions on the Campfire platform that keep alignment alive after the offsite. Teams discuss real behaviors, give peer coaching, and commit to action. Not a check-in. A system for ongoing behavioral development.",
    tags: [
      "Peer coaching",
      "Small-group breakouts",
      "Behavior practice",
      "Ongoing cadence",
    ],
    color: "#8B5CF6",
  },
  {
    title: "Performance Integration",
    subtitle: "From voluntary practice to organizational standard.",
    description:
      "After teams have had time to assess, get feedback, and develop on their own terms, behaviors integrate into your formal performance management process. By the time it becomes official, people are already living it.",
    tags: [
      "Phased rollout",
      "Workday-compatible",
      "Objective setting",
      "Accountability systems",
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
    detail: "12 observable behaviors defined and owned by the team",
  },
  {
    label: "Self-developing",
    detail: "Each person owns their behavioral development with a custom assessment tool and peer feedback",
  },
];

const CASE_STUDY_JOURNEY = [
  {
    step: 1,
    title: "Created the conditions",
    description:
      "Started with psychological safety, presence, and genuine connection. Before any strategy conversation.",
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
    title: "Built 12 observable behaviors",
    description:
      "Translated core values into specific, observable, concrete behaviors. Not aspirational statements. Daily commitments that the team could assess and develop around.",
    color: "#8B5CF6",
  },
  {
    step: 4,
    title: "Gave the team ownership",
    description:
      "Built a custom behavioral assessment tool. Each person chooses who to ask for feedback, owns their results privately, and picks the behavior they want to develop. No mandates. No punishment. Just honest self-directed growth.",
    color: "#7C3AED",
  },
  {
    step: 5,
    title: "Reinforced through follow-on sessions",
    description:
      "Facilitated virtual sessions where the team discussed behaviors in small groups, gave peer coaching, and committed to creating a cadence of ongoing feedback with the people they work with most.",
    color: "#6D28D9",
  },
  {
    step: 6,
    title: "Integrated into performance management",
    description:
      "After months of voluntary practice, the behavioral framework was adopted into the organization's formal objective-setting process for the new fiscal year. By the time it became official, people were already living it.",
    color: "#581C87",
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
    body: "more profitable: highly aligned organizations vs. their misaligned peers.",
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
    title: "Align",
    description:
      "A facilitated offsite that connects purpose, mission, strategy, and behaviors. Create shared understanding and define the observable behaviors that will drive execution.",
    color: "#C084FC",
  },
  {
    step: "02",
    title: "Assess",
    description:
      "A custom behavioral assessment tool built for your team. Each person owns their feedback, chooses their respondents, and gets private results. Development starts before anyone is watching.",
    color: "#A855F7",
  },
  {
    step: "03",
    title: "Reinforce",
    description:
      "Facilitated follow-on sessions where teams discuss behaviors in small groups, give peer coaching, and build a cadence of ongoing feedback with the people they work with most.",
    color: "#8B5CF6",
  },
  {
    step: "04",
    title: "Integrate",
    description:
      "Behaviors move from voluntary practice into your formal performance management and objective-setting processes. By the time it becomes official, your people are already living it.",
    color: "#7C3AED",
  },
];

const WHY_NOW_POINTS = [
  {
    title: "AI makes misalignment more expensive, not less",
    body: "People are moving 10 times faster with AI tools. If they're not strategically aligned, they go faster in different directions. More speed without shared direction means more meetings, more coordination, and more wasted effort. The alignment problem gets worse, not better.",
  },
  {
    title: "Budgets are moving to department heads",
    body: "HR budgets are decentralizing. Department heads are getting the money and making their own decisions about development. Their language isn't behavior change and outcomes. It's strategy and execution. The organizations that win will meet them where they are.",
  },
  {
    title: "Content isn't the bottleneck",
    body: "AI can generate content, courses, and coaching at scale. What it can't do is create genuine alignment across a team, facilitate the hard conversations, or build the trust needed for honest feedback. The human side of this work is what matters.",
  },
  {
    title: "Every organization is in transformation right now",
    body: "70% of strategic transformations fail. Every organization on the planet is going through one right now around AI. The ones that invest in alignment and execution systems will be the 30% that don't.",
  },
];

/* ─── component ─── */

export default function StrategicAlignmentPage() {
  return (
    <main className="bg-white">
      {/* ════════ HERO ════════ */}
      <StrategicAlignmentHero />

      {/* ════════ THE PROBLEM ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-6">
            The strategy-execution gap is the most expensive problem in
            business
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Organizations invest heavily in strategy, then watch it dissolve
            into busywork, misaligned priorities, and disconnected teams. The
            gap between what leadership intends and what people actually do is
            where most organizations lose.
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
            Five connected levels, from the reason you exist to the daily
            behaviors that make it real. When the chain holds, people move with
            clarity and confidence. When a link breaks, even great teams drift.
          </p>

          <div className="space-y-4 mb-14">
            {FRAMEWORK_LEVELS.map((level) => (
              <div
                key={level.label}
                className="rounded-2xl border border-[#E5E0DA] bg-white overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div
                    className="sm:w-[220px] flex-shrink-0 flex items-center justify-center px-6 py-5 sm:py-7"
                    style={{ background: level.color }}
                  >
                    <p className="text-white font-extrabold text-xl uppercase tracking-wide text-center sm:text-left w-full">
                      {level.label}
                    </p>
                  </div>
                  <div className="px-6 py-5 sm:py-6 flex items-center">
                    <p className="text-[#4A4A4A] text-[0.95rem] leading-relaxed">
                      {level.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Blockquote
            quote="Alignment is not a workshop outcome. It's an operating system. Campfire builds the system."
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
            things don&apos;t exist. It&apos;s that they don&apos;t connect,
            and nobody talks about the gaps.
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
              </strong>
              , ranked above talent shortages, technology limitations,
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
            ignored. That&apos;s where the real culture lives. And it&apos;s
            where strategy either accelerates or dies.
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
            more content. They need strategic alignment and consistent
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

      {/* ════════ THE OFFERING ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Offering</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-2">
            Strategic Alignment by Campfire
          </h2>
          <p className="text-xl md:text-2xl font-light text-[#6E3FCC] leading-snug mb-6">
            From strategy to manager behavior to team execution.
          </p>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            This is not a training program. It&apos;s organizational
            infrastructure: a system of facilitated conversations, behavioral
            frameworks, and operating rhythms that close the gap between what
            your strategy says and what your people actually do.
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
        line1="It&rsquo;s making me think and look at things differently."
        line2="It feels a little transformational on this side as well."
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
            stuck. Talented people, meaningful work, but operating reactively,
            individually, without shared direction. They weren&apos;t seen as
            strategic partners. They were seen as a support function.
          </p>
          <p className="text-[1.05rem] text-[#4A4A4A] leading-relaxed max-w-[700px] font-medium mb-5">
            Campfire helped them redefine who they are, align around a shared
            mission, build 12 observable behaviors, and create a system
            for ongoing development that the team owns.
          </p>
          <Blockquote
            quote="It was a transformational experience for our team. Unanimously, the feedback is that your session was incredibly valuable. Folks want more of that and more of your time."
            attribution="Senior Director, Global Organization"
          />
          <div className="h-8" />

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
            quote="You have exceeded my expectations. I can see a path now for how this is all coming together."
            attribution="Senior Director, Global Organization"
          />
        </div>
      </section>

      {/* ════════ QUOTE: OWNERSHIP ════════ */}
      <QuoteSection
        line1="You signed up for this. You raised your hand and said you&rsquo;re in."
        line2="Now own it."
      />

      {/* ════════ THE APPROACH ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Approach</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            Behavioral development that people actually want to do
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Most feedback systems start with surveillance and end with
            resentment. Campfire starts with ownership. People assess themselves,
            choose who to ask, get private results, and decide what to work on.
            By the time behaviors become part of formal performance management,
            the team is already practicing them.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {[
              {
                title: "Start without punishment",
                body: "Early feedback is private and voluntary. No one is looking over your shoulder. The goal is honest self-awareness, not compliance.",
              },
              {
                title: "Observable and concrete",
                body: "Every behavior is specific enough to see in action. Not \"be a better communicator.\" More like \"actively seeks input before making decisions that affect others.\"",
              },
              {
                title: "No neutral scores",
                body: "A six-point scale with no middle ground. You lean one way or the other. This creates clearer signal and more useful feedback.",
              },
              {
                title: "Phased integration",
                body: "Voluntary practice first. Peer coaching second. Formal integration into objectives and performance reviews only after people have had months to develop on their own terms.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-[#E5E0DA]"
              >
                <h3 className="text-base font-bold text-[#1C1334] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B7370] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <Blockquote
            quote="I would like for you to be able to assess regularly and without punishment. At first, the results are yours. We're not even going to look at them. You're going to use them to calibrate your own behavior."
            attribution="Steve Arntz, CEO of Campfire"
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
            measurable. Organizations that get this right don&apos;t just
            feel more aligned. They outperform.
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
              </strong>
              , making manager capability the single biggest lever for
              organizational performance. Engaged teams see{" "}
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
            Campfire creates alignment that lasts, through a repeatable
            process that meets your organization where it is.
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
            across hundreds of organizations. Strategic Alignment takes that same
            foundation (live facilitation, structured reflection, peer
            learning, applied discussion) and points it directly at the
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
              "Live, facilitated conversations, not self-paced content",
              "Structured reflection before speaking, so every voice is heard",
              "Applied discussion that connects to real work",
              "Behavioral practice, not just concept delivery",
              "Built for engagement, not consumption",
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
            Built for leaders dealing with real complexity
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Executive teams",
                body: "Aligning around purpose, mission, and strategic priorities, and translating them into behaviors the whole organization can follow.",
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
                body: "Going through restructuring, transformation, or rapid change where alignment is the difference between momentum and drift.",
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
            Campfire turns strategic intent into daily behavior
            through facilitated alignment, behavioral architecture, and
            systems that sustain the change.
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
    <div className="border-l-4 border-[#9D88ED] pl-8 py-4">
      <p className="text-2xl md:text-3xl text-[#1C1334] leading-snug italic mb-3">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="text-base text-[#8A9590]">&mdash; {attribution}</p>
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
