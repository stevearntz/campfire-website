import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import TrackedLink from "@/app/components/TrackedLink";
import { CASES, getCase, FOOTER_LINE, CaseStudy } from "../_data/cases";
import SignatureBlock from "../_components/SignatureBlock";

const CALENDLY = "https://calendly.com/getcampfire/";
const CALC = "/team-effectiveness/calculator";
const INDEX = "/team-effectiveness/case-studies";
const SECTION_PX = "clamp(24px, 6vw, 80px)";
const PROSE = 760;
const WIDE = 1000;

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "Case Study" };
  return {
    title: `${c.client} — Case Study`,
    description: c.intro,
  };
}

function BackLink({ location }: { location: string }) {
  return (
    <TrackedLink
      href={INDEX}
      eventName="case_study_click"
      eventParams={{ slug: "index", location }}
      className="text-[14px] font-semibold inline-flex items-center gap-1 transition-all hover:gap-2"
      style={{ color: "#6E3FCC" }}
    >
      ← All case studies
    </TrackedLink>
  );
}

function SectionHeading({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h2 className="font-extrabold mb-6" style={{ fontSize: "clamp(24px, 3.4vw, 34px)", color: "#1E2A4A", lineHeight: 1.15 }}>
      <span style={{ color: accent }}>·</span> {children}
    </h2>
  );
}

function PullQuote({ text, attribution, accent }: { text: string; attribution?: string; accent: string }) {
  return (
    <blockquote className="my-8 pl-5 border-l-[3px]" style={{ borderColor: accent }}>
      <p className="text-[19px] md:text-[21px] font-semibold leading-[1.4]" style={{ color: "#1E2A4A" }}>
        &ldquo;{text}&rdquo;
      </p>
      {attribution && (
        <footer className="mt-3 text-[14px] font-medium" style={{ color: "#9B96A6" }}>
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}

function Paragraphs({ body }: { body: string[] }) {
  return (
    <>
      {body.map((p, i) => (
        <p key={i} className="text-[17px] leading-[1.7] mb-5" style={{ color: "#636B7C" }}>
          {p}
        </p>
      ))}
    </>
  );
}

function Agenda({ steps, accent }: { steps: CaseStudy["agenda"]; accent: string }) {
  if (!steps || steps.length === 0) return null;
  return (
    <ol className="space-y-4 mt-2">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-4">
          <span
            className="shrink-0 flex items-center justify-center rounded-full text-[14px] font-extrabold text-white mt-0.5"
            style={{ width: 30, height: 30, background: accent }}
          >
            {i + 1}
          </span>
          <div>
            <p className="text-[17px] font-bold" style={{ color: "#1E2A4A" }}>
              {step.title}
            </p>
            {step.body && (
              <p className="text-[16px] leading-relaxed mt-1" style={{ color: "#636B7C" }}>
                {step.body}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Wordmark({ name, accent }: { name: string; accent: string }) {
  return (
    <span className="text-[22px] font-extrabold tracking-[-0.01em]" style={{ color: accent }}>
      {name}
    </span>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const { accent, accentSoft } = c;

  return (
    <>
      {/* ───────── HEADER — white ───────── */}
      <section
        className="bg-white"
        style={{ paddingTop: "clamp(36px, 5vw, 56px)", paddingBottom: "clamp(40px, 6vw, 64px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}
      >
        <div className="mx-auto" style={{ maxWidth: WIDE }}>
          <div className="mb-8">
            <BackLink location="study_header" />
          </div>

          {/* logo / wordmark + draft chip */}
          <div className="flex items-center gap-3 flex-wrap mb-5">
            {c.logo ? (
              <span className="inline-flex items-center justify-center rounded-md bg-white border px-4 py-2" style={{ borderColor: "#F1EEF8" }}>
                <Image src={c.logo} alt={`${c.client} logo`} width={150} height={36} className="h-7 w-auto object-contain" />
              </span>
            ) : (
              <Wordmark name={c.client} accent={accent} />
            )}
            {c.draft && (
              <span
                className="text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
                style={{ background: "#F1EEF8", color: "#9B96A6" }}
              >
                Draft — quote pending sign-off
              </span>
            )}
          </div>

          <p className="text-[12px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: accent }}>
            {c.eyebrow}
          </p>
          <h1 className="font-extrabold" style={{ fontSize: "clamp(32px, 5vw, 52px)", color: "#1E2A4A", lineHeight: 1.08, letterSpacing: "-0.02em", maxWidth: 880 }}>
            {c.headline}
          </h1>
          <p className="mt-6 text-[18px] md:text-[20px] leading-[1.55]" style={{ color: "#636B7C", maxWidth: 760 }}>
            {c.intro}
          </p>

          {/* meta row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6 mt-10 pt-8 border-t" style={{ borderColor: "#F1EEF8" }}>
            {c.meta.map((m) => (
              <div key={m.label}>
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase mb-1.5" style={{ color: "#9B96A6" }}>
                  {m.label}
                </p>
                <p className="text-[14px] font-semibold leading-snug" style={{ color: "#1E2A4A" }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── THE CHALLENGE — light ───────── */}
      <section style={{ background: "#F8F5FC", paddingTop: "clamp(56px, 8vw, 96px)", paddingBottom: "clamp(56px, 8vw, 96px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: PROSE }}>
          <p className="text-[12px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: accent }}>
            The challenge
          </p>
          <SectionHeading accent={accent}>{c.challengeHeading}</SectionHeading>
          <Paragraphs body={c.challengeBody} />
          {c.challengePullQuote && (
            <PullQuote text={c.challengePullQuote.text} attribution={c.challengePullQuote.attribution} accent={accent} />
          )}
        </div>
      </section>

      {/* ───────── WHAT CAMPFIRE DID — white ───────── */}
      <section className="bg-white" style={{ paddingTop: "clamp(56px, 8vw, 96px)", paddingBottom: "clamp(56px, 8vw, 96px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: PROSE }}>
          <p className="text-[12px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: accent }}>
            What Campfire did
          </p>
          <SectionHeading accent={accent}>{c.approachHeading}</SectionHeading>
          <Paragraphs body={c.approachBody} />
          {c.approachPullQuote && (
            <PullQuote text={c.approachPullQuote.text} attribution={c.approachPullQuote.attribution} accent={accent} />
          )}
          {/* inline approach steps (Cricut) */}
          {c.approachSteps && c.approachSteps.length > 0 && <Agenda steps={c.approachSteps} accent={accent} />}
          {/* Cricut renders its 5-session sequence as its signature — list lives there.
              For Cricut, the 5 sessions are the signature; the pivot paragraph follows. */}
          {c.slug === "cricut" && c.signature && (
            <div className="mt-8">
              <SignatureBlock signature={c.signature} accent={accent} accentSoft={accentSoft} />
            </div>
          )}
          {c.approachAfterSteps && (
            <p className="text-[17px] leading-[1.7] mt-7" style={{ color: "#636B7C" }}>
              {c.approachAfterSteps}
            </p>
          )}
        </div>
      </section>

      {/* ───────── INSIDE THE SESSION — light (when agenda present) ───────── */}
      {c.agendaHeading && c.agenda && c.agenda.length > 0 && (
        <section style={{ background: "#F8F5FC", paddingTop: "clamp(56px, 8vw, 96px)", paddingBottom: "clamp(56px, 8vw, 96px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
          <div className="mx-auto" style={{ maxWidth: PROSE }}>
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: accent }}>
              Inside the session
            </p>
            <SectionHeading accent={accent}>{c.agendaHeading}</SectionHeading>
            <Agenda steps={c.agenda} accent={accent} />
          </div>
        </section>
      )}

      {/* ───────── SIGNATURE BLOCK — white (except Cricut, rendered above) ───────── */}
      {c.signature && c.slug !== "cricut" && (
        <section className="bg-white" style={{ paddingTop: "clamp(48px, 7vw, 88px)", paddingBottom: "clamp(48px, 7vw, 88px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
          <div className="mx-auto" style={{ maxWidth: c.signature.kind === "utahVideo" ? WIDE : WIDE }}>
            {c.agendaHeading && c.agenda && c.agenda.length === 0 && (
              <>
                <p className="text-[12px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: accent }}>
                  Inside the session
                </p>
                <SectionHeading accent={accent}>{c.agendaHeading}</SectionHeading>
              </>
            )}
            {c.signature.kind === "utahVideo" && (
              <p className="text-[12px] font-bold tracking-[0.16em] uppercase mb-6" style={{ color: accent }}>
                The testimonial
              </p>
            )}
            <SignatureBlock signature={c.signature} accent={accent} accentSoft={accentSoft} />
          </div>
        </section>
      )}

      {/* ───────── THE OUTCOME — light ───────── */}
      <section style={{ background: "#F8F5FC", paddingTop: "clamp(56px, 8vw, 96px)", paddingBottom: "clamp(56px, 8vw, 96px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}>
        <div className="mx-auto" style={{ maxWidth: WIDE }}>
          <p className="text-[12px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: accent }}>
            The outcome
          </p>
          <SectionHeading accent={accent}>{c.outcomeHeading}</SectionHeading>

          {c.outcomeBody.length > 0 && (
            <div style={{ maxWidth: PROSE }}>
              <Paragraphs body={c.outcomeBody} />
            </div>
          )}

          {/* stat row */}
          {c.outcomeStats && c.outcomeStats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {c.outcomeStats.map((s) => (
                <div key={s.big} className="rounded-[14px] border bg-white p-6" style={{ borderColor: "#F1EEF8" }}>
                  <p className="font-extrabold leading-none mb-2" style={{ fontSize: "clamp(24px, 3.4vw, 32px)", color: accent }}>
                    {s.big}
                  </p>
                  <p className="text-[14px] leading-snug" style={{ color: "#636B7C" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* outcome quotes */}
          {c.outcomeQuotes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              {c.outcomeQuotes.map((q, i) => (
                <blockquote
                  key={i}
                  className="rounded-[14px] border bg-white p-7"
                  style={{ borderColor: "#F1EEF8" }}
                >
                  <p className="text-[16px] leading-relaxed italic" style={{ color: "#1E2A4A" }}>
                    &ldquo;{q.text}&rdquo;
                  </p>
                  {q.attribution && (
                    <footer className="mt-3 text-[13px] font-medium" style={{ color: "#9B96A6" }}>
                      — {q.attribution}
                    </footer>
                  )}
                </blockquote>
              ))}
            </div>
          )}

          {/* Utah "What Steve was able to do" list */}
          {c.outcomeList && (
            <div className="rounded-[16px] border bg-white p-7 mt-8" style={{ borderColor: "#F1EEF8", maxWidth: PROSE }}>
              <p className="text-[12px] font-bold tracking-[0.14em] uppercase mb-4" style={{ color: accent }}>
                {c.outcomeList.heading}
              </p>
              <ul className="space-y-3">
                {c.outcomeList.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[16px]" style={{ color: "#1E2A4A" }}>
                    <span className="shrink-0 flex items-center justify-center rounded-full mt-0.5" style={{ width: 20, height: 20, background: accentSoft }}>
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5l3.5 3.5L13 5" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* draft pending-sign-off note */}
          {c.pendingNote && (
            <div
              className="flex items-start gap-3 rounded-[14px] border p-6 mt-8"
              style={{ borderColor: accent, background: accentSoft, maxWidth: PROSE }}
            >
              <span className="text-[18px] leading-none mt-0.5" style={{ color: accent }} aria-hidden>
                ⚑
              </span>
              <p className="text-[15px] font-semibold" style={{ color: "#1E2A4A" }}>
                {c.pendingNote}
              </p>
            </div>
          )}

          {/* single trailing stat (drafts) */}
          {c.outcomeStat && (
            <p className="mt-8 text-[18px] font-bold" style={{ color: accent, maxWidth: PROSE }}>
              {c.outcomeStat}
            </p>
          )}
        </div>
      </section>

      {/* ───────── CLOSING CTA — dark ───────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#1C1334", paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)", paddingLeft: SECTION_PX, paddingRight: SECTION_PX }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(/purple-topo.webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
        <div className="relative mx-auto text-center" style={{ maxWidth: 640 }}>
          <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(28px, 4.4vw, 44px)", lineHeight: 1.1 }}>
            {c.ctaHeading}
          </h2>
          <p className="mx-auto mt-5" style={{ maxWidth: 560, fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.72)", lineHeight: 1.6 }}>
            {c.ctaBody}
          </p>
          <div className="flex gap-3 justify-center flex-wrap mt-9">
            <TrackedLink
              href={CALENDLY}
              external
              eventName="case_study_cta"
              eventParams={{ cta: "book_a_call", slug: c.slug, location: "study_closing" }}
              className="text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px]"
              style={{ background: "#E055CB" }}
            >
              Book a call
            </TrackedLink>
            <TrackedLink
              href={CALC}
              eventName="case_study_cta"
              eventParams={{ cta: "start_diagnostic", slug: c.slug, location: "study_closing" }}
              className="text-white text-[14px] font-bold tracking-[0.08em] uppercase px-7 py-4 rounded-[10px] border transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              Start the diagnostic →
            </TrackedLink>
          </div>
          <div className="mt-8">
            <TrackedLink
              href={INDEX}
              eventName="case_study_click"
              eventParams={{ slug: "index", location: "study_closing" }}
              className="text-[14px] font-semibold inline-flex items-center gap-1 transition-all hover:gap-2"
              style={{ color: "#9D88ED" }}
            >
              ← All case studies
            </TrackedLink>
          </div>
          <p className="mt-12 text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
            {FOOTER_LINE}
          </p>
        </div>
      </section>
    </>
  );
}
