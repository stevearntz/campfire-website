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
    micro: "Foundation",
    label: "Clarity",
    color: "#F59E2C",
    body: "Knowing what matters, why, and what good looks like. At zero, alignment and coordination are just organized confusion.",
  },
  {
    micro: "Multiplier",
    label: "Alignment",
    color: "#6E3FCC",
    body: "Shared understanding of priorities and how decisions get made. It turns individual effort into collective progress.",
  },
  {
    micro: "Drag",
    label: "Coordination Cost",
    color: "#E055CB",
    body: "The meetings, rework, handoffs and clarification required to move together. Better leadership reduces it.",
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
    claim: "Systems outperform when the parts work together — not just faster.",
    body: "Optimizing individual parts does not optimize the whole. The interactions between teams matter more than the output of any one.",
    attribution: "Ackoff · Senge · Meadows — Systems Thinking",
  },
  {
    claim: "Coordination cost grows as work becomes more interdependent.",
    body: "Adding capacity or contributors raises communication overhead nonlinearly — the cost of moving together rises faster than the benefit of moving faster alone.",
    attribution: "Malone · Brooks — Coordination Theory",
  },
  {
    claim: "Strategic alignment connects daily decisions to outcomes.",
    body: "Organizations perform better when goals, priorities, measures and behaviors connect. Alignment is not a feeling — it is an observable, buildable system.",
    attribution: "Kaplan & Norton · McKinsey OHI",
  },
  {
    claim: "Abundant information makes attention the scarce resource.",
    body: "As AI floods organizations with output, prioritization and shared meaning become the binding constraint on performance.",
    attribution: "Herbert Simon — Attention Economics",
  },
  {
    claim: "Organizations ship their communication structure.",
    body: "Products mirror the org that builds them. A misaligned organization produces a fragmented product — and AI amplifies the effect.",
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
  return (
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
      <span style={{ color: dark ? "#9D88ED" : "#9D88ED", ...SERIF }}>§{num}</span>{" "}
      {children}
    </h2>
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
            Why more capacity is making organizations less effective.
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
            AI is multiplying what every individual can produce. But organizational
            output was never the sum of individual capacities — and in the AI era,
            adding capacity to a misaligned system makes it drift faster, not deliver
            more.
          </p>

          <div className="mt-9 flex items-center gap-3 flex-wrap">
            <span
              className="text-[15px] md:text-[17px] font-semibold"
              style={{
                color: "rgba(255,255,255,0.45)",
                textDecoration: "line-through",
                textDecorationColor: "#E055CB",
                textDecorationThickness: 2,
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
            capacity to strategic coherence. In high-capacity organizations,
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
            Most organizations operate on an unstated assumption: that output scales
            with headcount. Hire more people, add more capacity, ship more work. It is
            intuitive, and it is wrong — or at least, dangerously incomplete.
          </P>
          <P>
            The systems theorist spent a career dismantling it. His central claim:
            Optimize each part independently and you can readily sub-optimize the
            whole. Six brilliant engineers solving six different problems do not add up
            to a great product. They add up to six products, none finished.
          </P>

          {/* Ackoff callout */}
          <div
            className="mt-8 rounded-[16px] border-l-4 px-6 py-5"
            style={{ background: "#F8F5FC", borderColor: "#6E3FCC" }}
          >
            <p
              style={{
                fontSize: "clamp(16px, 1.6vw, 18px)",
                lineHeight: 1.65,
                color: "#1E2A4A",
                fontWeight: 500,
              }}
            >
              Russell Ackoff: the performance of a system is not the sum of the
              performance of its parts — it is the product of their interactions.
            </p>
          </div>

          <P>
            That single shift — from additive to multiplicative — changes everything.
            If output is a product of terms, then any term approaching zero collapses
            the whole, no matter how large the others. Individual brilliance cannot
            rescue a system whose alignment is near zero.
          </P>

          {/* Blockquote */}
          <blockquote className="mt-9 border-l-4 pl-6" style={{ borderColor: "#9D88ED" }}>
            <p
              style={{
                ...SERIF,
                fontSize: "clamp(22px, 2.8vw, 28px)",
                lineHeight: 1.35,
                color: "#1E2A4A",
              }}
            >
              &ldquo;The performance of a system is not the sum of the performance of
              its parts.&rdquo;
            </p>
            <footer
              className="mt-3 text-[14px] font-semibold tracking-[0.06em] uppercase"
              style={{ color: "#9B96A6" }}
            >
              Russell Ackoff · Systems Thinking
            </footer>
          </blockquote>
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
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-10" style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#6E3FCC">The Equation</Eyebrow>
            <h2
              className="font-normal"
              style={{ ...SERIF, fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.15, color: "#1E2A4A" }}
            >
              What actually drives execution.
            </h2>
          </div>

          <div
            className="rounded-[20px] border px-6 py-10 md:py-12"
            style={{ background: "#FFFFFF", borderColor: "#F1EEF8" }}
          >
            <EquationBlock variant="light" showCapacity={false} />
            <p
              className="text-center mx-auto mt-7"
              style={{ maxWidth: 600, fontSize: 15, lineHeight: 1.6, color: "#636B7C" }}
            >
              All of it scaled by <strong style={{ color: "#1E2A4A" }}>capacity</strong> —
              your people multiplied by the AI leverage they wield. Capacity sets the
              ceiling; execution decides how much of it becomes output.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {TERMS.map((t) => (
              <div key={t.label}>
                <p
                  className="text-[11px] font-bold tracking-[0.16em] uppercase mb-1"
                  style={{ color: "#9B96A6" }}
                >
                  {t.micro}
                </p>
                <h3 className="text-[18px] font-bold mb-2" style={{ color: t.color }}>
                  {t.label}
                </h3>
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
          <SectionHeading num="02">Coordination cost grows faster than capacity.</SectionHeading>
          <P>
            Why does the denominator dominate? Because the cost of moving together
            rises <strong>nonlinearly</strong> as work becomes more interdependent — a
            result formalized in coordination theory at MIT, and felt by every leader
            who has watched a growing team slow down.
          </P>
          <P>
            <strong>Thomas Malone&apos;s</strong> coordination theory made it concrete;{" "}
            <strong>Fred Brooks</strong> in <em>The Mythical Man-Month</em>:
            communication channels grow with the square of headcount, at n(n−1)/2. Add
            people and the connective tissue explodes.
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
            At 300 people, that is 44,850 potential channels of miscommunication — and
            AI raises the throughput of every node, so the network destabilizes faster
            if coordination systems stay the same.
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
          <SectionHeading num="03">The AI-era inversion.</SectionHeading>
          <P>
            Here is the part most organizations have not priced in. AI increases
            execution speed — and <strong>execution speed is also divergence speed.</strong>{" "}
            When everyone can move faster, small misunderstandings compound faster,
            local optimization accelerates, and the organization fragments earlier.
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
              Six people, six different ideas of the customer. Effort is wasted and the
              product is incoherent — but the damage is bounded, because velocity is
              low.
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
              Give everyone 10× tooling. Each ships more, in more directions. Divergence
              accelerates, integration pain explodes, debt compounds. More output, less
              coherence — possibly worse outcomes.
            </p>
          </div>
        </div>

        <div className={PROSE} style={PROSE_W}>
          <P>
            <strong>Conway&apos;s Law</strong> sharpens the warning: organizations ship
            systems that mirror their communication structures. A fragmented org
            produces a fragmented product — and AI amplifies the effect.
          </P>
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
          <h2
            className="font-normal"
            style={{
              ...SERIF,
              fontSize: "clamp(28px, 4vw, 40px)",
              lineHeight: 1.15,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: "#9D88ED", ...SERIF }}>§04</span> The constraint has
            moved.
          </h2>
          <p
            className="mt-5"
            style={{ fontSize: "clamp(17px, 1.6vw, 19px)", lineHeight: 1.7, color: "rgba(255,255,255,0.78)" }}
          >
            Every era has a binding constraint — the thing in shortest supply that
            limits everything else. It has moved, and most operating habits have not
            caught up.
          </p>

          {/* three-era progression */}
          <div className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ERAS.map((e, i) => (
              <div
                key={e.era}
                className="rounded-[16px] border px-5 py-6 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor:
                    i === ERAS.length - 1 ? "rgba(157,136,237,0.5)" : "rgba(255,255,255,0.1)",
                }}
              >
                <p
                  className="text-[13px] font-semibold tracking-[0.06em] uppercase mb-3"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {e.era}
                </p>
                <p className="text-[15px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                  →
                </p>
                <p
                  className="text-[20px] font-bold mt-2"
                  style={{ color: i === ERAS.length - 1 ? "#9D88ED" : "#FFFFFF" }}
                >
                  {e.constraint}
                </p>
              </div>
            ))}
          </div>

          <p
            className="mt-9"
            style={{ fontSize: "clamp(17px, 1.6vw, 19px)", lineHeight: 1.7, color: "rgba(255,255,255,0.78)" }}
          >
            As AI drives production friction toward zero, <strong>Herbert Simon&apos;s</strong>{" "}
            warning becomes the operating reality: &ldquo;a wealth of information creates
            a poverty of attention.&rdquo; When information is abundant, clarity,
            prioritization and shared meaning become the scarce, economically valuable
            resources.
          </p>
          <p
            className="mt-5"
            style={{ fontSize: "clamp(17px, 1.6vw, 19px)", lineHeight: 1.7, color: "rgba(255,255,255,0.78)" }}
          >
            There is a hidden cost in all of this — call it organizational{" "}
            <strong>entropy</strong>: duplicated work, unclear priorities, meeting load,
            context-switching, conflicting incentives. AI can raise capacity{" "}
            <strong>and</strong> dramatically raise entropy at the same time. That is the
            paradox leaders are feeling right now:
          </p>

          <blockquote className="mt-9 border-l-4 pl-6" style={{ borderColor: "#9D88ED" }}>
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
              Not a theory. A convergence.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {RESEARCH.map((r, i) => (
              <div
                key={r.claim}
                className="rounded-[18px] border p-7"
                style={{ background: "#FCFBFE", borderColor: "#F1EEF8" }}
              >
                <p
                  className="text-[13px] font-extrabold mb-3"
                  style={{ color: "#9D88ED" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
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
            See where your equation stands.
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
            The diagnostic turns this model into your number — clarity, alignment,
            coordination cost, and the AI multiplier, in about two minutes.
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
