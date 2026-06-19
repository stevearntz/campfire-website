import type { Metadata } from "next";
import Image from "next/image";
import TrackedLink from "@/app/components/TrackedLink";
import { CASES, INDEX_ORDER, FOOTER_LINE, CaseStudy } from "./_data/cases";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "How leadership teams get aligned with Campfire. Seven teams, one repeatable method: stories → behaviors → named drivers → commitments.",
};

const CALENDLY = "https://calendly.com/getcampfire/";
const CALC = "/team-effectiveness/calculator";
const SECTION_PX = "clamp(24px, 6vw, 80px)";

const STATS = [
  { big: "7", label: "leadership teams aligned through Campfire offsites" },
  { big: "4.8/5", label: "average session rating (YPO Marcoms)" },
  { big: "6", label: "industries — consumer, beauty, biotech, media, philanthropy" },
  { big: "2", label: "founders facilitating personally — Steve Arntz & Megan Galloway" },
];

const METHOD_STEPS = ["Stories", "Behaviors", "3–5 named drivers", "Commitments"];

function Eyebrow({ children, color = "#9D88ED" }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="text-[12px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color }}>
      {children}
    </p>
  );
}

/** Typographic wordmark for clients without a logo file. */
function Wordmark({ name, accent }: { name: string; accent: string }) {
  return (
    <span
      className="inline-block text-[15px] font-extrabold tracking-[-0.01em]"
      style={{ color: accent }}
    >
      {name}
    </span>
  );
}

function CaseCard({ c }: { c: CaseStudy }) {
  return (
    <div
      className="group relative flex flex-col rounded-[18px] border bg-white overflow-hidden transition-shadow hover:shadow-[0_16px_40px_rgba(28,19,52,0.1)]"
      style={{ borderColor: "#F1EEF8" }}
    >
      <span
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: c.accent }}
        aria-hidden
      />
      <div className="flex flex-col flex-1 p-7 pl-8">
        {/* engagement + draft chip */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span
            className="text-[11px] font-bold tracking-[0.14em] uppercase"
            style={{ color: c.accent }}
          >
            {c.engagement}
          </span>
          {c.draft && (
            <span
              className="text-[10px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full"
              style={{ background: "#F1EEF8", color: "#9B96A6" }}
            >
              Draft
            </span>
          )}
        </div>

        {/* client logo / wordmark */}
        <div className="mb-3 flex items-center" style={{ minHeight: 28 }}>
          {c.logo ? (
            <span
              className="inline-flex items-center justify-center rounded-md bg-white border px-3 py-1.5"
              style={{ borderColor: "#F1EEF8" }}
            >
              <Image
                src={c.logo}
                alt={`${c.client} logo`}
                width={120}
                height={28}
                className="h-5 w-auto object-contain"
              />
            </span>
          ) : (
            <Wordmark name={c.client} accent={c.accent} />
          )}
        </div>

        {/* hook */}
        <h3 className="text-[20px] font-extrabold leading-[1.18] mb-4" style={{ color: "#1E2A4A" }}>
          {c.hook}
        </h3>

        {/* stat */}
        <p className="text-[14px] font-semibold mb-5" style={{ color: c.accent }}>
          {c.cardStat}
        </p>

        {/* quote or draft note */}
        {c.draft && c.cardNote ? (
          <p className="text-[15px] leading-relaxed mb-6 flex-1" style={{ color: "#636B7C" }}>
            {c.cardNote}
          </p>
        ) : (
          <blockquote className="mb-6 flex-1">
            <p className="text-[15px] leading-relaxed italic" style={{ color: "#1E2A4A" }}>
              &ldquo;{c.cardQuote.text}&rdquo;
            </p>
            {c.cardQuote.attribution && (
              <footer className="mt-2 text-[13px] font-medium" style={{ color: "#9B96A6" }}>
                — {c.cardQuote.attribution}
              </footer>
            )}
          </blockquote>
        )}

        <TrackedLink
          href={`/team-effectiveness/case-studies/${c.slug}`}
          eventName="case_study_click"
          eventParams={{ slug: c.slug, location: "index_card" }}
          className="mt-auto text-[14px] font-bold inline-flex items-center gap-1 transition-all group-hover:gap-2"
          style={{ color: c.accent }}
        >
          Read the story →
        </TrackedLink>
      </div>
    </div>
  );
}

export default function CaseStudiesIndexPage() {
  const ordered = INDEX_ORDER.map((slug) => CASES.find((c) => c.slug === slug)!).filter(Boolean);

  return (
    <>
      {/* ───────── HERO — dark ───────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "#1C1334",
          paddingTop: "clamp(72px, 10vw, 120px)",
          paddingBottom: "clamp(56px, 8vw, 96px)",
          paddingLeft: SECTION_PX,
          paddingRight: SECTION_PX,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(110% 80% at 50% 0%, rgba(110,63,204,0.3), rgba(28,19,52,0) 62%)" }}
        />
        <div className="relative mx-auto text-center" style={{ maxWidth: 820 }}>
          <Eyebrow>Clarity &amp; Alignment</Eyebrow>
          <h1
            className="font-extrabold text-white"
            style={{ fontSize: "clamp(36px, 5.4vw, 58px)", lineHeight: 1.07, letterSpacing: "-0.02em" }}
          >
            How leadership teams get aligned with Campfire.
          </h1>
          <p
            className="mx-auto mt-6"
            style={{ maxWidth: 640, fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}
          >
            Steve Arntz and the Campfire team personally facilitate executive offsites that turn
            strategy into shared, observable behavior. Seven teams. One repeatable method:
            stories → behaviors → named drivers → commitments.
          </p>
          <div className="flex gap-3 justify-center flex-wrap mt-9">
            <TrackedLink
              href={CALENDLY}
              external
              eventName="case_study_cta"
              eventParams={{ cta: "book_a_call", location: "index_hero" }}
              className="text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px]"
              style={{ background: "#E055CB" }}
            >
              Bring this to your team
            </TrackedLink>
            <a
              href="#the-work"
              className="text-white text-[14px] font-semibold px-7 py-4 rounded-[10px] border transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              See the work ↓
            </a>
          </div>
        </div>
      </section>

      {/* ───────── STAT BAND — white ───────── */}
      <section
        className="bg-white border-b"
        style={{ borderColor: "#F1EEF8", paddingTop: "clamp(40px, 6vw, 64px)", paddingBottom: "clamp(40px, 6vw, 64px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}
      >
        <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10" style={{ maxWidth: 1100 }}>
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-extrabold leading-none mb-2" style={{ fontSize: "clamp(34px, 5vw, 48px)", color: "#6E3FCC" }}>
                {s.big}
              </p>
              <p className="text-[13px] leading-snug mx-auto" style={{ color: "#636B7C", maxWidth: 220 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── THE WORK — light ───────── */}
      <section
        id="the-work"
        className="scroll-mt-20"
        style={{ background: "#F8F5FC", paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}
      >
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <div className="text-center mb-12" style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            <Eyebrow color="#6E3FCC">The work</Eyebrow>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1E2A4A", lineHeight: 1.12 }}>
              Seven teams that turned alignment into behavior.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ordered.map((c) => (
              <CaseCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── THE REPEATABLE METHOD — dark ───────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#1C1334", paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
        <div className="relative mx-auto text-center" style={{ maxWidth: 900 }}>
          <Eyebrow>The repeatable method</Eyebrow>
          <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-4 mb-8">
            {METHOD_STEPS.map((step, i) => (
              <span key={step} className="flex items-center gap-3">
                <span
                  className="text-[15px] md:text-[18px] font-extrabold px-4 py-2.5 rounded-[10px]"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                >
                  {step}
                </span>
                {i < METHOD_STEPS.length - 1 && (
                  <span style={{ color: "#9D88ED", fontSize: 20 }} aria-hidden>
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="mx-auto" style={{ maxWidth: 680, fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.65, color: "rgba(255,255,255,0.72)" }}>
            Every engagement runs the same arc: surface the lived patterns, translate shared
            principles into observable behavior, converge on a small set of drivers the team will
            coach, reward, and correct — then build the accountability to keep it going.
          </p>
        </div>
      </section>

      {/* ───────── CLOSING CTA — light ───────── */}
      <section
        style={{ background: "#F8F5FC", paddingTop: "clamp(72px, 10vw, 128px)", paddingBottom: "clamp(72px, 10vw, 128px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}
      >
        <div className="mx-auto text-center" style={{ maxWidth: 640 }}>
          <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4.4vw, 44px)", color: "#1E2A4A", lineHeight: 1.1 }}>
            Bring this to your leadership team.
          </h2>
          <p className="mx-auto mt-5" style={{ maxWidth: 560, fontSize: "clamp(16px, 2vw, 19px)", color: "#636B7C", lineHeight: 1.6 }}>
            A focused offsite that turns your strategy into the behaviors your leaders live by — or
            start with a free read on where your team stands today.
          </p>
          <div className="flex gap-3 justify-center flex-wrap mt-9">
            <TrackedLink
              href={CALENDLY}
              external
              eventName="case_study_cta"
              eventParams={{ cta: "book_a_call", location: "index_closing" }}
              className="text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px]"
              style={{ background: "#E055CB" }}
            >
              Book a call
            </TrackedLink>
            <TrackedLink
              href={CALC}
              eventName="case_study_cta"
              eventParams={{ cta: "start_diagnostic", location: "index_closing" }}
              className="text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px] border transition-colors"
              style={{ color: "#6E3FCC", borderColor: "#6E3FCC" }}
            >
              Start the diagnostic →
            </TrackedLink>
          </div>
          <p className="mt-12 text-[13px]" style={{ color: "#9B96A6" }}>
            {FOOTER_LINE}
          </p>
        </div>
      </section>
    </>
  );
}
