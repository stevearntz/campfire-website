import { Signature, Quote } from "../_data/cases";

/**
 * Renders the one bespoke "signature" visual per study, switching on kind.
 * Server component — purely presentational. Accent colors the block.
 */
export default function SignatureBlock({
  signature,
  accent,
  accentSoft,
}: {
  signature: Signature;
  accent: string;
  accentSoft: string;
}) {
  switch (signature.kind) {
    case "utahVideo":
      return <UtahVideo s={signature} accent={accent} accentSoft={accentSoft} />;
    case "ypoValues":
      return <YpoValues s={signature} accent={accent} accentSoft={accentSoft} />;
    case "cotopaxiTest":
      return <CotopaxiTest s={signature} accent={accent} />;
    case "dermalogicaPaths":
      return <DermalogicaPaths s={signature} accent={accent} accentSoft={accentSoft} />;
    case "cricutSequence":
      return <CricutSequence s={signature} accent={accent} accentSoft={accentSoft} />;
    case "huntsmanDiagram":
      return <HuntsmanDiagram s={signature} accent={accent} accentSoft={accentSoft} />;
    case "envedaPyramid":
      return <EnvedaPyramid s={signature} accent={accent} accentSoft={accentSoft} />;
  }
}

function QuoteRow({ quotes }: { quotes: Quote[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
      {quotes.map((q, i) => (
        <blockquote key={i} className="rounded-[14px] border p-6" style={{ borderColor: "#F1EEF8", background: "#FCFBFE" }}>
          <p className="text-[15px] leading-relaxed italic" style={{ color: "#1E2A4A" }}>
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
  );
}

/* ───────── Utah Business — video testimonial + culture exercise ───────── */
function UtahVideo({
  s,
  accent,
  accentSoft,
}: {
  s: Extract<Signature, { kind: "utahVideo" }>;
  accent: string;
  accentSoft: string;
}) {
  return (
    <div>
      <div
        className="rounded-[18px] overflow-hidden border"
        style={{ borderColor: "#F1EEF8", background: "#000" }}
      >
        <video
          controls
          preload="metadata"
          poster={s.poster}
          className="w-full h-auto block"
          style={{ aspectRatio: "16 / 9", background: "#000" }}
        >
          <source src={s.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <QuoteRow quotes={s.quotes} />

      {/* culture exercise */}
      <div className="rounded-[16px] border p-7 mt-7" style={{ borderColor: accent, background: accentSoft }}>
        <p className="text-[12px] font-bold tracking-[0.14em] uppercase mb-3" style={{ color: accent }}>
          Culture exercise
        </p>
        <p className="text-[18px] font-extrabold mb-5" style={{ color: "#1E2A4A" }}>
          {s.cultureExercise.prompt}
        </p>
        <div className="flex flex-wrap gap-2.5 mb-6">
          {s.cultureExercise.tags.map((t) => (
            <span
              key={t}
              className="text-[13px] font-semibold px-3.5 py-2 rounded-full bg-white border"
              style={{ borderColor: accent, color: accent }}
            >
              {t}
            </span>
          ))}
        </div>
        <p className="text-[16px] leading-relaxed italic" style={{ color: "#1E2A4A" }}>
          &ldquo;{s.cultureExercise.pullQuote}&rdquo;
        </p>
      </div>
    </div>
  );
}

/* ───────── YPO — 4 values × 12 behaviors grid ───────── */
function YpoValues({
  s,
  accent,
  accentSoft,
}: {
  s: Extract<Signature, { kind: "ypoValues" }>;
  accent: string;
  accentSoft: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {s.values.map((v) => (
          <div key={v.name} className="rounded-[16px] border p-6 bg-white" style={{ borderColor: "#F1EEF8" }}>
            <p
              className="text-[18px] font-extrabold mb-4 pb-3 border-b"
              style={{ color: accent, borderColor: accentSoft }}
            >
              {v.name}
            </p>
            <ul className="space-y-2.5">
              {v.behaviors.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[15px]" style={{ color: "#1E2A4A" }}>
                  <span className="shrink-0 mt-2 rounded-full" style={{ width: 6, height: 6, background: accent }} aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[15px] font-semibold" style={{ color: accent }}>
        {s.stat}
      </p>
    </div>
  );
}

/* ───────── Cotopaxi — The Leadership Test (dark callout) ───────── */
function CotopaxiTest({ s, accent }: { s: Extract<Signature, { kind: "cotopaxiTest" }>; accent: string }) {
  return (
    <div className="rounded-[18px] p-8 md:p-10" style={{ background: "#161B33" }}>
      <p className="text-[12px] font-bold tracking-[0.14em] uppercase mb-2" style={{ color: "#9D88ED" }}>
        The Leadership Test
      </p>
      <p className="text-[16px] mb-7" style={{ color: "rgba(255,255,255,0.7)" }}>
        A behavior earned a spot only if it passed all four:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {s.questions.map((q, i) => (
          <div
            key={q}
            className="flex items-center gap-4 rounded-[12px] px-5 py-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span
              className="shrink-0 flex items-center justify-center rounded-full text-[14px] font-extrabold text-white"
              style={{ width: 30, height: 30, background: accent }}
            >
              {i + 1}
            </span>
            <span className="text-[16px] font-semibold text-white">{q}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── Dermalogica — two-path block ───────── */
function DermalogicaPaths({
  s,
  accent,
  accentSoft,
}: {
  s: Extract<Signature, { kind: "dermalogicaPaths" }>;
  accent: string;
  accentSoft: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {s.paths.map((p) => (
        <div key={p.title} className="rounded-[16px] border p-7" style={{ borderColor: accent, background: accentSoft }}>
          <p className="text-[12px] font-bold tracking-[0.14em] uppercase mb-2" style={{ color: accent }}>
            {p.eyebrow}
          </p>
          <h4 className="text-[20px] font-extrabold mb-3" style={{ color: "#1E2A4A" }}>
            {p.title}
          </h4>
          <p className="text-[15px] leading-relaxed" style={{ color: "#636B7C" }}>
            {p.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ───────── Cricut — 5-session sequence + Field Guide ───────── */
function CricutSequence({
  s,
  accent,
  accentSoft,
}: {
  s: Extract<Signature, { kind: "cricutSequence" }>;
  accent: string;
  accentSoft: string;
}) {
  return (
    <div>
      <div className="space-y-3">
        {s.sessions.map((session, i) => {
          const isCapstone = i === s.capstoneIndex;
          return (
            <div
              key={session}
              className="flex items-center gap-4 rounded-[12px] border p-4 md:p-5"
              style={
                isCapstone
                  ? { borderColor: accent, background: accentSoft }
                  : { borderColor: "#F1EEF8", background: "#FCFBFE" }
              }
            >
              <span
                className="shrink-0 flex items-center justify-center rounded-full text-[14px] font-extrabold"
                style={{ width: 32, height: 32, background: isCapstone ? accent : "#F1EEF8", color: isCapstone ? "#fff" : "#9B96A6" }}
              >
                {i + 1}
              </span>
              <span className="text-[16px] font-bold" style={{ color: "#1E2A4A" }}>
                {session}
              </span>
              {isCapstone && (
                <span
                  className="ml-auto text-[11px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full text-white"
                  style={{ background: accent }}
                >
                  Capstone
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Field Guide */}
      <div className="rounded-[16px] p-7 mt-7" style={{ background: accent }}>
        <p className="text-[12px] font-bold tracking-[0.14em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.85)" }}>
          The deliverable
        </p>
        <h4 className="text-[22px] font-extrabold text-white mb-3">Decision-Making Field Guide</h4>
        <p className="text-[15px] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>
          {s.guideBody}
        </p>
        <p className="text-[14px] font-bold text-white">{s.guideStat}</p>
      </div>
    </div>
  );
}

/* ───────── Huntsman — two missions → one direction ───────── */
function HuntsmanDiagram({
  s,
  accent,
  accentSoft,
}: {
  s: Extract<Signature, { kind: "huntsmanDiagram" }>;
  accent: string;
  accentSoft: string;
}) {
  return (
    <div className="rounded-[18px] border p-8 md:p-10" style={{ borderColor: "#F1EEF8", background: "#FCFBFE" }}>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="rounded-[12px] border bg-white px-5 py-4 text-center text-[15px] font-bold" style={{ borderColor: accentSoft, color: "#1E2A4A" }}>
            {s.left}
          </div>
          <div className="rounded-[12px] border bg-white px-5 py-4 text-center text-[15px] font-bold" style={{ borderColor: accentSoft, color: "#1E2A4A" }}>
            {s.right}
          </div>
        </div>
        <div className="flex items-center justify-center text-[28px] md:rotate-0 rotate-90" style={{ color: accent }} aria-hidden>
          →
        </div>
        <div
          className="flex-1 rounded-[14px] px-6 py-7 text-center text-[18px] font-extrabold text-white"
          style={{ background: accent }}
        >
          {s.result}
        </div>
      </div>
    </div>
  );
}

/* ───────── Enveda — Five Dysfunctions pyramid ───────── */
function EnvedaPyramid({
  s,
  accent,
  accentSoft,
}: {
  s: Extract<Signature, { kind: "envedaPyramid" }>;
  accent: string;
  accentSoft: string;
}) {
  // pyramid drawn bottom-up: levels[0] (Trust) is the base/widest
  const n = s.levels.length;
  return (
    <div className="rounded-[18px] border p-8 md:p-10" style={{ borderColor: "#F1EEF8", background: "#FCFBFE" }}>
      <div className="flex flex-col items-center gap-3">
        {s.levels.map((level, i) => {
          // base (i=0) widest, apex narrowest; render base last visually (column-reverse via order)
          const order = n - 1 - i; // so Trust (i=0) sits at bottom
          const widthPct = 55 + (i / (n - 1)) * 45; // apex narrow, base wide
          const isTarget = i === s.targetIndex;
          const isBase = i === 0;
          return (
            <div key={level} style={{ width: `${widthPct}%`, order }}>
              <div
                className="rounded-[10px] px-5 py-4 text-center text-[14px] md:text-[15px] font-bold"
                style={
                  isBase
                    ? { background: accent, color: "#fff" }
                    : isTarget
                    ? { background: accentSoft, color: accent, border: `2px solid ${accent}` }
                    : { background: "#fff", color: "#1E2A4A", border: "1px solid #F1EEF8" }
                }
              >
                {level}
                {isTarget && (
                  <span className="block text-[11px] font-bold tracking-[0.1em] uppercase mt-1" style={{ color: accent }}>
                    The target
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
