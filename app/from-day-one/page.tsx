import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "From Purpose to Outcomes | Campfire",
  description:
    "A practical path to more strategic leadership. Recap and deeper exploration from the From Day One Seattle workshop by Steve Arntz, CEO of Campfire.",
  openGraph: {
    title: "From Purpose to Outcomes | Campfire",
    description:
      "A practical path to more strategic leadership. Connecting Purpose to Mission to Strategy to Outcomes to Behaviors.",
    type: "article",
  },
};

/* ─── data ─── */

const FRAMEWORK_LEVELS = [
  {
    label: "Purpose",
    definition: "Why we exist.",
    color: "#C084FC",
    description:
      "Purpose is the reason your organization was created. It doesn't change with market conditions or leadership turnover. It's the foundation everything else builds on.",
  },
  {
    label: "Mission",
    definition: "What we're trying to accomplish now.",
    color: "#A855F7",
    description:
      "Mission translates purpose into a current, time-bound objective. It answers: what are we focused on right now to bring our purpose to life?",
  },
  {
    label: "Strategy",
    definition: "How we'll do it.",
    color: "#8B5CF6",
    description:
      "Strategy is the set of choices about where to play and how to win. It turns the mission into a plan of action with clear priorities.",
  },
  {
    label: "Outcomes",
    definition: "How we measure success.",
    color: "#7C3AED",
    description:
      "Outcomes are the measurable results that tell you whether strategy is working. They create accountability and make progress visible.",
  },
  {
    label: "Behaviors",
    definition: "How we operate to achieve it.",
    color: "#6D28D9",
    description:
      "Behaviors are the daily actions and norms that either accelerate or undermine your strategy. Culture lives here — not on a poster.",
  },
];

const NASA_EXAMPLE = [
  {
    level: "Purpose",
    detail: "Why they exist.",
    content: "Explore the unknown in air and space. Inspire through discovery.",
    color: "#C084FC",
  },
  {
    level: "Mission",
    detail: "What they're trying to accomplish now.",
    content: "Land astronauts on the moon through the Apollo program.",
    color: "#A855F7",
  },
  {
    level: "Strategy",
    detail: "How they'll do it.",
    content:
      "Build the Saturn V Rocket. Develop Life-Support. Train Astronauts. Test Systems. Launch Apollo 11.",
    color: "#8B5CF6",
  },
  {
    level: "Outcomes",
    detail: "How they measure success.",
    content: "Number of people who slingshot around the moon.",
    color: "#7C3AED",
  },
  {
    level: "Behaviors",
    detail: "How they operate to achieve it.",
    content:
      "Safety: See a problem? Speak up. Teamwork: We work across teams, together. Learning: Test consistently, fix mistakes, improve.",
    color: "#6D28D9",
  },
];

const BEHAVIOR_QUESTIONS = [
  {
    question: "What behaviors get rewarded?",
    examples: "Saying yes to everything, working long hours, being visible",
    icon: "🏆",
  },
  {
    question: "What gets punished?",
    examples:
      "Pushing back on leadership, missing deadlines, taking risks that fail",
    icon: "⚠️",
  },
  {
    question: "What gets people promoted?",
    examples:
      "Visibility with executives, managing large teams, hitting short-term targets",
    icon: "📈",
  },
  {
    question: "What do people ignore?",
    examples:
      "Burnout signals, cross-team collaboration, long-term capability building",
    icon: "🔇",
  },
];

const TOOLS = [
  {
    name: "Reflect",
    description:
      "Map your organization's purpose, mission, strategy, and outcomes. A guided exercise to see where you have clarity — and where you don't.",
    href: "https://tools.getcampfire.com/from-day-one/reflect",
    icon: "📝",
    color: "#C084FC",
  },
  {
    name: "Assess",
    description:
      "Rate your own strategic alignment across four dimensions. Get your archetype: Drifter, Seeker, Connector, or Strategist.",
    href: "https://tools.getcampfire.com/from-day-one/assess",
    icon: "📊",
    color: "#A855F7",
  },
  {
    name: "Behavior",
    description:
      "Surface the behaviors your organization actually rewards, punishes, promotes, and ignores. See where culture and strategy collide.",
    href: "https://tools.getcampfire.com/from-day-one/behavior",
    icon: "🔍",
    color: "#8B5CF6",
  },
  {
    name: "Apply",
    description:
      "Connect one piece of work you own to a business outcome and identify the behavior change needed to support it.",
    href: "https://tools.getcampfire.com/from-day-one/apply",
    icon: "🎯",
    color: "#7C3AED",
  },
];

const TAKEAWAYS = [
  {
    title: "Alignment is a chain, not a checklist",
    body: "Purpose, mission, strategy, outcomes, and behaviors form a connected chain. When any link breaks, the whole system drifts. The job isn't to perfect each piece in isolation — it's to maintain the connections between them.",
  },
  {
    title: "Clarity creates confidence",
    body: "When people can clearly articulate how their work connects to organizational strategy, they make better decisions, move faster, and feel more ownership over results. Ambiguity is the enemy of strategic execution.",
  },
  {
    title: "Culture is behavior, not values",
    body: "What gets rewarded, punished, promoted, and ignored shapes culture far more than any values statement. If your reward systems fight your strategy, your strategy will lose every time.",
  },
  {
    title: "Start with one piece of work",
    body: "You don't need to overhaul everything. Pick one project you own, connect it to a business outcome, and identify one behavior that needs to change. Strategic alignment scales from a single honest conversation.",
  },
];

/* ─── component ─── */

export default function FromDayOnePage() {
  return (
    <main className="bg-white">
      {/* ════════ HERO ════════ */}
      <section className="relative overflow-hidden">
        {/* gradient bg */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, #1C1334 0%, #4E0DA9 35%, #6E3FCC 60%, #9D88ED 100%)",
          }}
        />
        {/* topo texture */}
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
            From Day One Seattle &middot; April 2026
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
            From Purpose
            <br />
            to Outcomes
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed max-w-[600px] mb-10">
            A Practical Path to More Strategic Leadership
          </p>
          <div className="flex items-center gap-4 text-white/40 text-sm">
            <span>Steve Arntz, CEO</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Campfire</span>
          </div>
        </div>
        {/* scroll indicator */}
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
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1C1334] leading-tight mb-5">
                An interactive breakout on strategic alignment
              </h2>
              <p className="text-[1.05rem] text-[#6B7370] leading-relaxed mb-5">
                Too often, HR leaders are asked to be strategic but lack a clear
                path to get there. The result is work that feels reactive,
                disconnected, and difficult to tie to real business impact.
              </p>
              <p className="text-[1.05rem] text-[#6B7370] leading-relaxed">
                This session introduced a simple framework that connects
                Purpose to Mission to Strategy to Outcomes to Behaviors — giving
                leaders a clear line of sight from the work they lead to the
                results their business needs.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#E5E0DA] shadow-sm">
              <Image
                src="/fdo-steve-speaking.webp"
                alt="Steve Arntz presenting the Strategic Alignment Framework at From Day One Seattle"
                width={3967}
                height={4277}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ THE PROBLEM ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-6">
            Most strategic work isn&apos;t strategic
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Organizations invest heavily in strategy — then watch it dissolve
            into busywork, misaligned priorities, and disconnected teams.
            The gap between intention and execution is where most leadership
            development fails.
          </p>

          {/* stats grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            <StatCard
              stat="95%"
              body="of employees are unaware of, or do not understand, their company's strategy."
              source="Kaplan & Norton, Harvard Business Review"
            />
            <StatCard
              stat="60%"
              body="of knowledge workers' time is spent on 'work about work' — only 13% goes to strategic planning."
              source="Asana, Anatomy of Work Index"
            />
            <StatCard
              stat="70%"
              body="of strategic transformations fail to achieve their objectives."
              source="McKinsey & Company"
            />
          </div>

          <Blockquote
            quote="The problem isn't that people don't care about strategy. It's that most people have never been shown how their work connects to it."
            attribution="Steve Arntz"
          />
        </div>
      </section>

      {/* ════════ THE FRAMEWORK ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Framework</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            Strategic Alignment: A Simple Chain
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Five connected levels — from the enduring reason you exist to the
            daily behaviors that make it real. When the chain holds, people
            move with clarity and confidence. When a link breaks, even great
            teams drift.
          </p>

          {/* framework visual */}
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
                {/* connector */}
                {i < FRAMEWORK_LEVELS.length - 1 && (
                  <div className="flex justify-center -mb-4 relative z-10">
                    <div className="w-[2px] h-4 bg-[#E5E0DA]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <Blockquote
            quote="Leadership development only works when it is clearly tied to outcomes that matter most."
            attribution="From Day One session description"
          />
        </div>
      </section>

      {/* ════════ NASA EXAMPLE ════════ */}
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
          <SectionLabel light>In Practice</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4">
            How NASA Used This Framework
          </h2>
          <p className="text-lg text-white/50 leading-relaxed max-w-[700px] mb-12">
            The Apollo program is one of history&apos;s clearest examples of
            strategic alignment. Every level connected — from an enduring
            purpose down to specific daily behaviors.
          </p>

          <div className="space-y-4">
            {NASA_EXAMPLE.map((item) => (
              <div
                key={item.level}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1.5px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex flex-col sm:flex-row">
                  <div
                    className="sm:w-[180px] flex-shrink-0 flex items-center px-5 py-3 sm:py-5"
                    style={{ background: item.color }}
                  >
                    <div>
                      <p className="text-white font-extrabold text-sm uppercase tracking-wider">
                        {item.level}
                      </p>
                      <p className="text-white/60 text-xs font-light">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-4 sm:py-5 flex items-center">
                    <p className="text-white/80 text-[0.95rem] leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ QUOTE: MISALIGNMENT ════════ */}
      <QuoteSection
        line1="Misalignment doesn't happen because people don't care."
        line2="It happens because the connection breaks somewhere in the chain."
      />

      {/* ════════ THE ALIGNMENT GAP ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Gap</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            Where Alignment Breaks Down
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Most organizations have some version of purpose, mission, and
            strategy written down somewhere. The problem isn&apos;t that
            these things don&apos;t exist. It&apos;s that they don&apos;t
            connect — and nobody talks about the gaps.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            <InsightCard
              title="The say-do gap at the top"
              body="89% of CEOs say CHROs should play a central role in long-term profitable growth — but only 45% are creating the conditions to let them do so."
              source="Accenture, 2023"
            />
            <InsightCard
              title="HR trapped in admin"
              body="HR staff spend 57% of their time on administrative tasks, leaving a minority of time for the strategic initiatives organizations say they need most."
              source="Deloitte"
            />
            <InsightCard
              title="Values on a wall"
              body="There is zero correlation between a company's official stated values and how well employees say the company lives up to those values."
              source="MIT Sloan Management Review, Donald Sull"
            />
            <InsightCard
              title="Belief without behavior"
              body="Only 27% of employees strongly agree they believe in their organization's values. Just 23% can apply those values to their work every day."
              source="Gallup"
            />
          </div>

          <Blockquote
            quote="The correlation between how heavily a company weighted a set of values and how well employees said they did on those specific values hovered around zero. Four of the correlations were actually negative."
            attribution="Donald Sull, MIT Sloan Management Review"
          />
        </div>
      </section>

      {/* ════════ CULTURE & BEHAVIORS ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>Culture</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-2">
            Your culture is not your values.
          </h2>
          <p className="text-xl md:text-2xl font-light text-[#6E3FCC] leading-snug mb-6">
            It&apos;s the behaviors your system reinforces.
          </p>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            Most organizations can recite their values. Few can honestly
            describe what actually gets rewarded, punished, promoted, or
            ignored. This is where the real culture lives — and where
            strategy either accelerates or dies.
          </p>

          {/* behavior questions */}
          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {BEHAVIOR_QUESTIONS.map((q) => (
              <div
                key={q.question}
                className="bg-white rounded-2xl p-6 border border-[#E5E0DA]"
              >
                <p className="text-2xl mb-3">{q.icon}</p>
                <h3 className="text-lg font-bold text-[#1C1334] mb-2">
                  {q.question}
                </h3>
                <p className="text-sm text-[#8A9590] leading-relaxed italic">
                  e.g. {q.examples}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#E5E0DA]">
            <p className="text-[0.95rem] text-[#4A4A4A] leading-relaxed mb-4">
              During the session, participants mapped these questions against
              their own organizations. The pattern was consistent: stated
              values said one thing — rewarded behaviors said another.
            </p>
            <p className="text-[0.95rem] text-[#4A4A4A] leading-relaxed">
              The question isn&apos;t whether your behaviors align with your
              values. It&apos;s whether your behaviors{" "}
              <strong>support your strategy or fight it</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ QUOTE: CULTURE ════════ */}
      <QuoteSection
        line1="Your culture is not your values."
        line2="It's the behaviors your system reinforces."
      />

      {/* ════════ THE BUSINESS CASE ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>The Evidence</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            Alignment Drives Results
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            When purpose, strategy, and behavior connect, the impact is
            measurable. Organizations that get this right don&apos;t just feel
            more aligned — they outperform.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mb-14">
            <StatCard
              stat="72%"
              body="more profitable — highly aligned organizations vs. misaligned peers."
              source="LSA Global"
            />
            <StatCard
              stat="58%"
              body="faster revenue growth in organizations with high strategic alignment."
              source="LSA Global"
            />
            <StatCard
              stat="30%"
              body="higher innovation in purpose-driven companies, plus 40% higher workforce retention."
              source="Deloitte, 2020"
            />
          </div>

          <div className="bg-[#F8F5FC] rounded-2xl p-8 border border-[#E5E0DA]">
            <p className="text-[0.95rem] text-[#4A4A4A] leading-relaxed mb-4">
              An EY and Harvard Business School study found that{" "}
              <strong>85% of purpose-driven companies saw revenue growth</strong>,
              while 42% of companies that had not prioritized purpose saw revenue
              decline or stagnate. The same study found that 53% of executives at
              purpose-driven companies said they were successful at innovation and
              transformation, versus just 19% at companies that hadn&apos;t.
            </p>
            <p className="text-xs text-[#8A9590]">
              Source: EY / Harvard Business School Beacon Institute, &ldquo;The
              Business Case for Purpose&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ════════ KEY TAKEAWAYS ════════ */}
      <section className="bg-[#F8F5FC] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>Takeaways</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-12">
            What to Remember
          </h2>

          <div className="space-y-5">
            {TAKEAWAYS.map((t, i) => (
              <div
                key={t.title}
                className="bg-white rounded-2xl p-7 border border-[#E5E0DA] flex gap-5"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold mt-0.5"
                  style={{ background: "#6E3FCC" }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1C1334] mb-2">
                    {t.title}
                  </h3>
                  <p className="text-[0.95rem] text-[#6B7370] leading-relaxed">
                    {t.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TOOLS ════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionLabel>Keep Going</SectionLabel>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1C1334] leading-tight mb-4">
            Continue the Work
          </h2>
          <p className="text-lg text-[#6B7370] leading-relaxed max-w-[700px] mb-12">
            The workshop tools are still live. Use them to revisit the
            exercises, go deeper with your team, or share them with someone
            who wasn&apos;t in the room.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {TOOLS.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-6 border border-[#E5E0DA] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: `${tool.color}18` }}
                  >
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1334] group-hover:text-[#6E3FCC] transition-colors">
                    {tool.name}
                  </h3>
                </div>
                <p className="text-sm text-[#6B7370] leading-relaxed">
                  {tool.description}
                </p>
              </a>
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
            Campfire builds interactive workshops that connect leadership
            development to real business outcomes. This session is one of
            many we facilitate for teams at every level.
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
          background: light
            ? "rgba(255,255,255,0.12)"
            : "#E5E0DA",
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
      <p className="text-sm text-[#8A9590]">— {attribution}</p>
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
        <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed mb-2">
          {line1}
        </p>
        <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
          {line2}
        </p>
      </div>
    </section>
  );
}
