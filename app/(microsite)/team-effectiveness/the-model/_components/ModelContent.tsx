import TrackedLink from "@/app/components/TrackedLink";
import EquationBlock from "../../_components/EquationBlock";

const CALC = "/team-effectiveness/calculator";
const HUB = "/team-effectiveness";
const SECTION_PX = "clamp(24px, 6vw, 80px)";
const SERIF = { fontFamily: "var(--font-serif)" } as const;

/* ── shared bits ───────────────────────────────────────────────────── */

function Eyebrow({
  children,
  color = "#9D88ED",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <p
      className="text-[12px] font-bold tracking-[0.18em] uppercase mb-4"
      style={{ color }}
    >
      {children}
    </p>
  );
}

/* ── data ──────────────────────────────────────────────────────────── */

const TERMS = [
  {
    label: "Clarity",
    color: "#C77DEC",
    body: "Shared understanding of what we're solving — at every level of the org.",
  },
  {
    label: "Alignment",
    color: "#EE80DD",
    body: "Every team's plan adds up to the same plan — with trade-offs agreed.",
  },
  {
    label: "Coordination Cost",
    color: "#F7A83D",
    body: "The drag of meetings, rework, and politics needed to move work forward.",
  },
  {
    label: "Capacity",
    color: "#6E3FCC",
    body: "The people, skills, and tools — now amplified by AI — available to do the work.",
  },
];

const CHANNELS = [
  { people: "3 people", channels: "3" },
  { people: "6 people", channels: "15" },
  { people: "12 people", channels: "66" },
  { people: "50 people", channels: "1,225" },
  { people: "300 people", channels: "44,850" },
];

const ERAS = [
  { era: "Industrial Era", constraint: "Labor capacity" },
  { era: "Knowledge Era", constraint: "Coordination" },
  { era: "AI Era", constraint: "Alignment" },
];

const RESEARCH = [
  {
    title: "Systems Thinking",
    claim: "Systems outperform when the parts work together, not when each part simply works faster.",
    body: "The interactions between teams matter more than the output of any one individual or team.",
    attribution: "Ackoff · Senge · Meadows — Systems Thinking",
  },
  {
    title: "Coordination Theory",
    claim: "Coordination costs grow as work becomes more interdependent, quietly overtaking the gains.",
    body: "Adding capacity raises communication costs nonlinearly. The cost of moving together rises faster than the benefit of moving faster alone.",
    attribution: "Malone · Brooks — Coordination Theory",
  },
  {
    title: "Organizational Health",
    claim: "Strategic alignment connects daily decisions to outcomes, or quietly disconnects them.",
    body: "Organizations perform better when goals, priorities, measures and behaviors connect. Alignment is not a feeling it is a system.",
    attribution: "Kaplan & Norton · McKinsey OHI",
  },
  {
    title: "Attention Economics",
    claim: "Abundant information makes attention the scarce resource that now decides performance.",
    body: "As AI floods organizations with output, prioritization and shared meaning become our greatest constraint.",
    attribution: "Herbert Simon — Attention Economics",
  },
  {
    title: "Team Topologies",
    claim: "Organizations ship their communication structure, for better or for worse, into the product.",
    body: "Products mirror the org that builds them. Fragmented organizations produce fragmented products. AI amplifies the effect.",
    attribution: "Conway's Law · Team Topologies",
  },
];

const FURTHER_READING = [
  { author: "Russell Ackoff", work: "systems thinking & idealized design", href: "https://en.wikipedia.org/wiki/Russell_L._Ackoff" },
  { author: "Peter Senge", work: "The Fifth Discipline", href: "https://en.wikipedia.org/wiki/The_Fifth_Discipline" },
  { author: "Donella Meadows", work: "Thinking in Systems", href: "https://en.wikipedia.org/wiki/Donella_Meadows" },
  { author: "Thomas Malone", work: "coordination theory (MIT)", href: "https://cci.mit.edu/" },
  { author: "Fred Brooks", work: "The Mythical Man-Month", href: "https://en.wikipedia.org/wiki/The_Mythical_Man-Month" },
  { author: "Herbert Simon", work: "attention & bounded rationality", href: "https://en.wikipedia.org/wiki/Herbert_A._Simon" },
  { author: "Melvin Conway", work: "Conway's Law", href: "https://en.wikipedia.org/wiki/Conway%27s_law" },
  { author: "Skelton & Pais", work: "Team Topologies", href: "https://teamtopologies.com/" },
  { author: "Kaplan & Norton", work: "The Balanced Scorecard", href: "https://en.wikipedia.org/wiki/Balanced_scorecard" },
  { author: "Dave Snowden", work: "the Cynefin framework", href: "https://en.wikipedia.org/wiki/Cynefin_framework" },
];

/* ── prose helpers ─────────────────────────────────────────────────── */

const PROSE = "mx-auto";
const PROSE_W = { maxWidth: 760 } as const;

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-5"
      style={{ fontSize: "clamp(17px, 1.6vw, 19px)", lineHeight: 1.7, color: "#3A3550" }}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  num,
  children,
  dark = false,
}: {
  num: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  const accent = dark ? "#B8A4F2" : "#9D88ED";
  return (
    <div>
      <span
        style={{
          ...SERIF,
          display: "block",
          fontSize: "clamp(34px, 4.6vw, 54px)",
          lineHeight: 1,
          letterSpacing: "0.02em",
          color: accent,
          marginBottom: 12,
        }}
      >
        <span style={{ opacity: 0.4 }}>{num.slice(0, 1)}</span>
        {num.slice(1)}
      </span>
      <h2
        className="font-normal"
        style={{
          ...SERIF,
          fontSize: "clamp(28px, 4vw, 40px)",
          lineHeight: 1.15,
          color: dark ? "#FFFFFF" : "#1E2A4A",
          letterSpacing: "-0.01em",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

/* ── page ──────────────────────────────────────────────────────────── */

export default function ModelContent() {
  return (
    <>
      {/* ───────── 1. TITLE — dark hero ───────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "#1C1334",
          paddingTop: "clamp(72px, 11vw, 128px)",
          paddingBottom: "clamp(72px, 11vw, 128px)",
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/purple-topo-tall.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(110% 80% at 50% 0%, rgba(110,63,204,0.30), rgba(28,19,52,0) 62%)",
          }}
        />
        <div className="relative mx-auto" style={{ maxWidth: 820 }}>
          <Eyebrow>The Model · a Campfire point of view</Eyebrow>
          <h1
            className="font-normal text-white"
            style={{
              ...SERIF,
              fontSize: "clamp(34px, 5.4vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            Why more capacity is making organizations{" "}
            <span style={{ color: "#E055CB" }}>less effective</span>.
          </h1>
          <p
            className="mt-7"
            style={{
              maxWidth: 680,
              fontSize: "clamp(17px, 2vw, 20px)",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.78)",
            }}
          >
            AI is multiplying what people can produce. But organizational output was
            never the sum of the individual parts. In the AI era, adding capacity to a
            misaligned system makes it drift faster and deliver even less.
          </p>

          <div className="mt-9 flex items-center gap-3 flex-wrap">
            <span
              className="text-[22px] md:text-[28px] font-semibold"
              style={{
                color: "rgba(255,255,255,0.92)",
                textDecoration: "line-through",
                textDecorationColor: "#E055CB",
                textDecorationThickness: 3,
              }}
            >
              more capacity = more output
            </span>
          </div>

          <div
            className="mt-9 rounded-[20px] border px-6 py-9 md:py-11"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.1)",
            }}
          >
            <EquationBlock variant="dark" showCapacity={false} size="lg" />
          </div>

          <p
            className="mt-8 text-[13px] font-semibold tracking-[0.08em] uppercase"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            8 min read · systems theory · coordination theory · AI
          </p>
        </div>
      </section>

      {/* ───────── 2. ABSTRACT / THESIS — paper ───────── */}
      <section
        style={{
          background: "#FBFAF7",
          paddingTop: "clamp(64px, 9vw, 104px)",
          paddingBottom: "clamp(64px, 9vw, 104px)",
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div className={PROSE} style={PROSE_W}>
          <Eyebrow color="#6E3FCC">The thesis</Eyebrow>
          <p
            style={{
              ...SERIF,
              fontSize: "clamp(22px, 3vw, 30px)",
              lineHeight: 1.4,
              color: "#1E2A4A",
            }}
          >
            AI has shifted the limiting factor of performance from production
            capacity to strategic clarity. In high-capacity organizations,
            alignment becomes the primary determinant of outcomes.
          </p>
        </div>
      </section>

      {/* ───────── 3. §01 — white ───────── */}
      <section
        className="bg-white"
        style={{
          paddingTop: "clamp(64px, 9vw, 104px)",
          paddingBottom: "clamp(64px, 9vw, 104px)",
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div className={PROSE} style={PROSE_W}>
          <SectionHeading num="01">Output was never the sum of its parts.</SectionHeading>
          <P>
            Most organizations operate with a simple assumption: output scales with
            headcount. If we hire more people and add more capacity we will ship more
            work. It feels intuitive, but it is wrong. At least it&rsquo;s dangerously
            incomplete.
          </P>
          <P>
            One systems theorist spent his career dismantling this assumption. His
            central claim was that if you optimize each part independently you can
            accidentally sub-optimize the whole. Basically, six brilliant engineers
            solving six different problems do not add up to a great product. They add up
            to six different products, none of which are finished.
          </P>

          {/* Ackoff blockquote */}
          <blockquote className="mt-8 border-l-4 pl-6" style={{ borderColor: "#9D88ED" }}>
            <p
              style={{
                ...SERIF,
                fontSize: "clamp(22px, 2.8vw, 28px)",
                lineHeight: 1.35,
                color: "#1E2A4A",
              }}
            >
              &ldquo;The performance of a system is not the sum of the performance of
              its parts, it is the product of their interactions.&rdquo;
            </p>
            <footer
              className="mt-3 text-[14px] font-semibold tracking-[0.06em] uppercase"
              style={{ color: "#9B96A6" }}
            >
              Russell Ackoff · Systems Thinking
            </footer>
          </blockquote>

          <P>
            The shift from additive to multiplicative changes everything. If output is
            a product of terms, then any term approaching zero collapses the whole, no
            matter how large the others get. Individual brilliance cannot rescue a
            system whose alignment is near zero.
          </P>
        </div>
      </section>

      {/* ───────── 4. THE EQUATION — paper / light equation moment ───────── */}
      <section
        style={{
          background: "#F8F5FC",
          paddingTop: "clamp(64px, 9vw, 104px)",
          paddingBottom: "clamp(64px, 9vw, 104px)",
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <div className="text-center mb-10" style={{ maxWidth: 660, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#6E3FCC">The Equation</Eyebrow>
            <h2
              className="font-normal"
              style={{ ...SERIF, fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.15, color: "#1E2A4A" }}
            >
              What actually drives execution?
            </h2>
          </div>

          <div
            className="rounded-[20px] border px-6 py-10 md:py-12"
            style={{ background: "#FFFFFF", borderColor: "#F1EEF8" }}
          >
            <EquationBlock variant="light" showCapacity={false} size="lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-left">
            {TERMS.map((t) => (
              <div key={t.label}>
                <div style={{ height: 3, borderRadius: 2, background: t.color, marginBottom: 16 }} />
                <div
                  className="uppercase text-[12px] font-bold tracking-[0.12em] mb-2.5"
                  style={{ color: t.color }}
                >
                  {t.label}
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: "#3A3550" }}>
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. §02 — white + channels table ───────── */}
      <section
        className="bg-white"
        style={{
          paddingTop: "clamp(64px, 9vw, 104px)",
          paddingBottom: "clamp(64px, 9vw, 104px)",
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div className={PROSE} style={PROSE_W}>
          <SectionHeading num="02">Coordination cost grows with capacity.</SectionHeading>
          <P>
            Why does the denominator dominate? Because the cost of moving together
            rises <strong>nonlinearly</strong> as work becomes more interdependent — a
            result formalized in coordination theory at MIT, and felt by every leader
            who has watched a growing team slow down.
          </P>
          <P>
            <strong>Thomas Malone&apos;s</strong> coordination theory made it concrete.{" "}
            <strong>Fred Brooks</strong> in <em>The Mythical Man-Month</em> found that
            communication channels grow with the square of headcount, at n(n−1)/2. Add
            people and the connective tissue gets overloaded.
          </P>

          {/* channels table */}
          <div
            className="mt-8 rounded-[16px] border overflow-hidden"
            style={{ borderColor: "#F1EEF8" }}
          >
            <div
              className="px-6 py-3 text-[12px] font-bold tracking-[0.12em] uppercase"
              style={{ background: "#F8F5FC", color: "#6E3FCC" }}
            >
              Communication channels = n(n−1)/2
            </div>
            {CHANNELS.map((row, i) => (
              <div
                key={row.people}
                className="flex items-center justify-between px-6 py-3.5"
                style={{
                  borderTop: i === 0 ? "none" : "1px solid #F1EEF8",
                  background: i === CHANNELS.length - 1 ? "#FCF6FB" : "#FFFFFF",
                }}
              >
                <span
                  className="text-[15px] md:text-[16px] font-medium"
                  style={{ color: "#1E2A4A" }}
                >
                  {row.people}
                </span>
                <span className="text-[15px]" style={{ color: "#9B96A6" }}>
                  →
                </span>
                <span
                  className="text-[18px] md:text-[20px] font-extrabold tabular-nums"
                  style={{
                    color: i === CHANNELS.length - 1 ? "#E055CB" : "#1E2A4A",
                  }}
                >
                  {row.channels}
                </span>
              </div>
            ))}
          </div>

          <P>
            At 300 people, that is 44,850 potential channels of miscommunication. AI not
            only raises the throughput of every node but it dramatically increases the
            number of nodes. Your network will destabilize much faster if your
            coordination systems stay the same.
          </P>
        </div>
      </section>

      {/* ───────── 6. §03 — paper + before/after cards ───────── */}
      <section
        style={{
          background: "#FBFAF7",
          paddingTop: "clamp(64px, 9vw, 104px)",
          paddingBottom: "clamp(64px, 9vw, 104px)",
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div className={PROSE} style={PROSE_W}>
          <SectionHeading num="03">The real impact of AI on effectiveness.</SectionHeading>
          <P>
            Here is the part most organizations have not figured out. AI increases the
            speed of execution for each individual and that{" "}
            <strong>execution speed also becomes the speed of divergence</strong>. When
            everyone can move faster, small misunderstandings compound faster,
            individual optimization accelerates, and the organization fragments sooner.
            Consider six engineers building one platform:
          </P>
        </div>

        {/* before / after cards */}
        <div className="mx-auto mt-9 grid grid-cols-1 md:grid-cols-2 gap-5" style={{ maxWidth: 880 }}>
          <div
            className="rounded-[18px] border p-7"
            style={{ background: "#FFFFFF", borderColor: "#F1EEF8" }}
          >
            <p
              className="text-[12px] font-bold tracking-[0.14em] uppercase mb-2"
              style={{ color: "#9B96A6" }}
            >
              Before AI
            </p>
            <h3 className="text-[18px] font-bold mb-3" style={{ color: "#1E2A4A" }}>
              Low capacity, low alignment
            </h3>
            <p className="text-[15px] leading-relaxed" style={{ color: "#3A3550" }}>
              Six people, six different ideas on strategy and direction. Effort is
              wasted and the product becomes incoherent, but the damage is limited,
              because overall velocity is low and misalignment can only spread so far,
              so fast.
            </p>
          </div>
          <div
            className="rounded-[18px] border p-7"
            style={{ background: "#FFFFFF", borderColor: "#F4D9F0", borderLeftWidth: 4, borderLeftColor: "#E055CB" }}
          >
            <p
              className="text-[12px] font-bold tracking-[0.14em] uppercase mb-2"
              style={{ color: "#E055CB" }}
            >
              After AI
            </p>
            <h3 className="text-[18px] font-bold mb-3" style={{ color: "#1E2A4A" }}>
              High capacity, same alignment
            </h3>
            <p className="text-[15px] leading-relaxed" style={{ color: "#3A3550" }}>
              Give everyone 10× tooling. Each person ships more, in more directions.
              Divergence accelerates, integration pain explodes, and debt compounds.
              More individual output, even less coherence, worse outcomes.
            </p>
          </div>
        </div>

        <div className={PROSE} style={{ ...PROSE_W, marginTop: "clamp(40px, 5vw, 64px)" }}>
          <blockquote className="border-l-4 pl-6" style={{ borderColor: "#9D88ED" }}>
            <p
              style={{
                ...SERIF,
                fontSize: "clamp(22px, 2.8vw, 28px)",
                lineHeight: 1.35,
                color: "#1E2A4A",
              }}
            >
              &ldquo;Organizations ship systems that mirror their communication
              structures. A fragmented organization produces a fragmented product.{" "}
              <span style={{ color: "#E055CB" }}>AI amplifies the effect.</span>&rdquo;
            </p>
            <footer
              className="mt-3 text-[14px] font-semibold tracking-[0.06em] uppercase"
              style={{ color: "#9B96A6" }}
            >
              Conway&apos;s Law
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ───────── 7. §04 — dark / constraint moment ───────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "#1C1334",
          paddingTop: "clamp(64px, 9vw, 112px)",
          paddingBottom: "clamp(64px, 9vw, 112px)",
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/purple-topo.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.08,
          }}
        />
        <div className="relative mx-auto" style={PROSE_W}>
          <SectionHeading num="04" dark>The constraint has moved.</SectionHeading>
          <p
            className="mt-5"
            style={{ fontSize: "clamp(17px, 1.6vw, 19px)", lineHeight: 1.7, color: "rgba(255,255,255,0.78)" }}
          >
            Every era has a universal limiting constraint. There is one thing in
            shortest supply that limits everything else. It has moved in the AI era, and
            most operating modes have not caught up.
          </p>

          {/* three-era progression */}
          <div className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
            {ERAS.map((e, i) => {
              const isAI = i === ERAS.length - 1;
              return (
                <div
                  key={e.era}
                  className="relative rounded-[16px] border px-5 py-6 text-center"
                  style={{
                    background: isAI ? "rgba(157,136,237,0.14)" : "rgba(255,255,255,0.03)",
                    borderColor: isAI ? "rgba(184,164,242,0.7)" : "rgba(255,255,255,0.1)",
                    boxShadow: isAI ? "0 18px 44px -18px rgba(157,136,237,0.6)" : "none",
                  }}
                >
                  {isAI && (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 -top-3 text-[10px] font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-full"
                      style={{ background: "#9D88ED", color: "#1C1334" }}
                    >
                      Now
                    </span>
                  )}
                  <p
                    className="text-[13px] font-semibold tracking-[0.06em] uppercase mb-3"
                    style={{ color: isAI ? "#B8A4F2" : "rgba(255,255,255,0.55)" }}
                  >
                    {e.era}
                  </p>
                  <p className="text-[15px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    →
                  </p>
                  <p
                    className={isAI ? "text-[24px] font-extrabold mt-2" : "text-[20px] font-bold mt-2"}
                    style={{ color: isAI ? "#B8A4F2" : "#FFFFFF" }}
                  >
                    {e.constraint}
                  </p>
                </div>
              );
            })}
          </div>

          <p
            className="mt-9"
            style={{ fontSize: "clamp(17px, 1.6vw, 19px)", lineHeight: 1.7, color: "rgba(255,255,255,0.78)" }}
          >
            As AI drives production friction toward zero, <strong>Herbert Simon&apos;s</strong>{" "}
            warning becomes the operating reality: &ldquo;a wealth of information creates
            a poverty of attention.&rdquo; When information is abundant, clarity,
            prioritization and shared meaning become scarce and economically valuable
            resources.
          </p>
          <p
            className="mt-5"
            style={{ fontSize: "clamp(17px, 1.6vw, 19px)", lineHeight: 1.7, color: "rgba(255,255,255,0.78)" }}
          >
            There is a hidden cost in all of this we will call organizational{" "}
            <strong>entropy</strong>. Entropy consists of duplicate work, unclear
            priorities, meeting load, context-switching, and conflicting incentives. AI
            can raise capacity <strong>and</strong> dramatically raise entropy at the
            same time. That is the paradox leaders are feeling right now:
          </p>

          <blockquote className="border-l-4 pl-6" style={{ marginTop: 56, borderColor: "#9D88ED" }}>
            <p
              style={{
                ...SERIF,
                fontSize: "clamp(24px, 3.2vw, 34px)",
                lineHeight: 1.3,
                color: "#FFFFFF",
              }}
            >
              &ldquo;Why do we feel busier, but less effective?&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* ───────── 8. RESEARCH FOUNDATIONS — light ───────── */}
      <section
        className="bg-white"
        style={{
          paddingTop: "clamp(64px, 9vw, 112px)",
          paddingBottom: "clamp(64px, 9vw, 112px)",
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-12" style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#6E3FCC">Research Foundations</Eyebrow>
            <h2
              className="font-normal"
              style={{ ...SERIF, fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.15, color: "#1E2A4A" }}
            >
              Five different fields.
              <br />
              Same conclusions.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {RESEARCH.map((r, i) => (
              <div
                key={r.claim}
                className="rounded-[18px] border p-7"
                style={{ background: "#FCFBFE", borderColor: "#F1EEF8" }}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span
                    style={{
                      ...SERIF,
                      fontSize: "clamp(30px, 3.4vw, 44px)",
                      lineHeight: 1,
                      color: "#9D88ED",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[17px] md:text-[18px] font-bold"
                    style={{ color: "#6E3FCC" }}
                  >
                    {r.title}
                  </span>
                </div>
                <h3
                  className="text-[18px] font-bold mb-3"
                  style={{ color: "#1E2A4A", lineHeight: 1.3 }}
                >
                  {r.claim}
                </h3>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#3A3550" }}>
                  {r.body}
                </p>
                <p
                  className="text-[12px] font-semibold tracking-[0.04em]"
                  style={{ color: "#9B96A6" }}
                >
                  {r.attribution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 9. FURTHER READING — paper ───────── */}
      <section
        style={{
          background: "#F8F5FC",
          paddingTop: "clamp(56px, 8vw, 88px)",
          paddingBottom: "clamp(56px, 8vw, 88px)",
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 760 }}>
          <Eyebrow color="#6E3FCC">Further reading</Eyebrow>
          <ul className="mt-2 divide-y" style={{ borderColor: "#F1EEF8" }}>
            {FURTHER_READING.map((f) => (
              <li key={f.author} style={{ borderColor: "#E7E1F4" }}>
                <TrackedLink
                  href={f.href}
                  external
                  eventName="te_link"
                  eventParams={{ label: "further_reading", source: f.author }}
                  className="flex items-baseline gap-2 py-3.5 group"
                >
                  <span
                    className="text-[16px] md:text-[17px] font-bold"
                    style={{ color: "#1E2A4A" }}
                  >
                    {f.author}
                  </span>
                  <span className="text-[15px]" style={{ color: "#636B7C" }}>
                    — {f.work}
                  </span>
                  <span className="text-[14px] ml-auto" style={{ color: "#6E3FCC" }}>
                    ↗
                  </span>
                </TrackedLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── 10. CLOSING CTA — dark ───────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "#1C1334",
          paddingTop: "clamp(72px, 10vw, 128px)",
          paddingBottom: "clamp(72px, 10vw, 128px)",
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/pink-topo-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
          }}
        />
        <div className="relative mx-auto text-center" style={{ maxWidth: 640 }}>
          <h2
            className="font-normal text-white"
            style={{ ...SERIF, fontSize: "clamp(28px, 4.4vw, 44px)", lineHeight: 1.12 }}
          >
            See where your organization stands.
          </h2>
          <p
            className="mx-auto mt-5"
            style={{
              maxWidth: 560,
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
            }}
          >
            The diagnostic gives you a way to apply this model to your organization. In
            just two minutes, you can turn your clarity, alignment, and coordination
            into a quick pulse on your organization&rsquo;s effectiveness.
          </p>
          <div className="mt-9 flex flex-col items-center gap-5">
            <TrackedLink
              href={CALC}
              eventName="te_cta"
              eventParams={{ cta: "start_diagnostic", location: "model_closing" }}
              className="inline-block text-white text-[14px] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-[10px]"
              style={{ background: "#E055CB" }}
            >
              Start the diagnostic →
            </TrackedLink>
            <TrackedLink
              href={HUB}
              eventName="te_link"
              eventParams={{ label: "back_to_hub", location: "model_closing" }}
              className="text-[14px] font-semibold transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              ← Back to the Team Effectiveness Sprint
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
