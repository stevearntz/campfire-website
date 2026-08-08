"use client";

import { useMemo, useState } from "react";
import {
  BRAND,
  COPY,
  PRESETS,
  READING_BANDS,
  CALLOUTS,
  TIERS,
  type TierId,
} from "../_lib/config";
import {
  generateOrg,
  seedFromAnswers,
  seedFromPreset,
  getPreset,
  summarize,
  type SimResponse,
} from "../_lib/simulate";
import { scoreColor, scoreFraction, textOn } from "../_lib/scale-color";
import { Wordmark, Eyebrow } from "./ui";

function readingLabel(score: number) {
  return (
    READING_BANDS.find((b) => score >= b.min)?.label ??
    READING_BANDS[READING_BANDS.length - 1].label
  );
}

const tierName = (t: TierId) => TIERS.find((x) => x.id === t)?.name ?? t;

export default function Dashboard({
  anchor,
  onReset,
}: {
  anchor: SimResponse | null;
  onReset: () => void;
}) {
  // preset === null → the survey-anchored (or neutral) org. Otherwise a demo story.
  const [presetId, setPresetId] = useState<string | null>(null);
  const [salt, setSalt] = useState(0);

  const summary = useMemo(() => {
    const preset = getPreset(presetId);
    const seed = preset ? seedFromPreset(preset, salt) : seedFromAnswers(anchor, salt);
    return summarize(generateOrg(seed));
  }, [anchor, presetId, salt]);

  const anchoredNote = presetId
    ? PRESETS.find((p) => p.id === presetId)?.blurb
    : anchor
      ? "Extrapolated from your answers — read as one representative pulse."
      : "A neutral sample organization, shown without a survey taken.";

  return (
    <div className="mx-auto w-full max-w-[900px] px-5 py-12 sm:py-16">
      {/* header row */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Eyebrow>{COPY.dashboardEyebrow}</Eyebrow>
          <div className="mt-2">
            <Wordmark size="text-3xl sm:text-4xl" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSalt((s) => s + 1)}
            className="rounded-full border px-5 py-2.5 text-sm transition-colors duration-200 hover:border-[color:var(--h)]"
            style={
              {
                borderColor: BRAND.lineStrong,
                color: BRAND.inkSoft,
                "--h": BRAND.copper,
              } as React.CSSProperties
            }
          >
            {COPY.regenerate}
          </button>
          <button
            onClick={onReset}
            className="rounded-full px-5 py-2.5 text-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            style={{ backgroundColor: BRAND.green, color: BRAND.cream }}
          >
            {COPY.reset}
          </button>
        </div>
      </div>

      {/* headline: the org-wide "felt" reading — the deliberate forest inverse moment */}
      <section
        className="relative mb-8 overflow-hidden rounded-[28px] px-7 py-10 sm:px-11 sm:py-12"
        style={{ backgroundColor: BRAND.green, color: BRAND.cream }}
      >
        {/* the field motif — a quiet dot lattice */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${BRAND.cream} 1px, transparent 1px)`,
            backgroundSize: "22px 22px",
            opacity: 0.14,
          }}
        />
        <div className="relative flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <div className="max-w-sm">
            <div
              className="text-[0.75rem] uppercase tracking-[0.14em]"
              style={{ color: BRAND.gold }}
            >
              How cared for the organization feels
            </div>
            <div
              className="mt-3 text-4xl leading-[1.05] sm:text-5xl"
              style={{ fontFamily: BRAND.serif, fontWeight: 500 }}
            >
              {readingLabel(summary.northstar)}
            </div>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: BRAND.onForestMuted }}
            >
              {anchoredNote}
            </p>
          </div>
          <div className="flex gap-9">
            <Stat label="Cared for" value={summary.northstar} accent={BRAND.gold} />
            <Stat label="Overall" value={summary.overall} accent={BRAND.cream} />
            <Stat label="Respondents" value={summary.count} accent={BRAND.cream} raw />
          </div>
        </div>
      </section>

      {/* callouts */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        <Callout accent={BRAND.copper} text={CALLOUTS.levelGap(
          summary.biggestGap.highLabel,
          summary.biggestGap.lowLabel,
          summary.biggestGap.gap,
        )} />
        <Callout accent={BRAND.river} text={CALLOUTS.weakestTier(
          summary.weakestTier.name,
          summary.weakestTier.score,
        )} />
      </div>

      {/* the stack */}
      <Panel title="The stack" sub="Org-wide, by tier — which layer is weakest.">
        <div className="space-y-6">
          {summary.stack.map((s) => (
            <BarRow key={s.tier} label={s.name} score={s.score} />
          ))}
        </div>
      </Panel>

      {/* the gap: north-star by level */}
      <Panel
        title="The gap"
        sub={`“Cared for,” top to bottom — a ${summary.biggestGap.gap.toFixed(1)}-point spread across levels.`}
      >
        <div className="space-y-5">
          {summary.byLevel.map((l) => (
            <BarRow key={l.level} label={l.label} score={l.score} meta={`n=${l.n}`} />
          ))}
        </div>
      </Panel>

      {/* heatmap: tier × level */}
      <Panel title="Tier by level" sub="Where the care holds — and where it thins out.">
        <Heatmap summary={summary} />
      </Panel>

      {/* preset switcher — clearly separated from the default org */}
      <div className="mt-12 border-t pt-7" style={{ borderColor: BRAND.line }}>
        <Eyebrow>Demo presets</Eyebrow>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <PresetLink
            active={presetId === null}
            label={anchor ? "From my answers" : "Neutral default"}
            onClick={() => setPresetId(null)}
          />
          {PRESETS.map((p) => (
            <PresetLink
              key={p.id}
              active={presetId === p.id}
              label={p.label}
              title={p.blurb}
              onClick={() => setPresetId(p.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- small pieces ------------------------------------------------ */

function Stat({
  label,
  value,
  accent,
  raw,
}: {
  label: string;
  value: number;
  accent: string;
  raw?: boolean;
}) {
  return (
    <div className="text-right">
      <div
        className="text-4xl leading-none sm:text-5xl"
        style={{ fontFamily: BRAND.serif, fontWeight: 300, color: accent }}
      >
        {raw ? value : value.toFixed(1)}
        {!raw && <span className="text-xl opacity-50">/5</span>}
      </div>
      <div
        className="mt-2 text-[0.7rem] uppercase tracking-[0.14em]"
        style={{ color: BRAND.onForestMuted }}
      >
        {label}
      </div>
    </div>
  );
}

// Hairline card with a thin accent line ACROSS THE TOP (never a left stripe).
function Callout({ text, accent }: { text: string; accent: string }) {
  return (
    <div
      className="overflow-hidden rounded-[18px] border"
      style={{ borderColor: BRAND.line, backgroundColor: BRAND.surface }}
    >
      <div style={{ height: 3, backgroundColor: accent }} />
      <p className="px-5 py-4 text-sm leading-relaxed" style={{ color: BRAND.ink }}>
        {text}
      </p>
    </div>
  );
}

function Panel({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="mb-6 rounded-[18px] border px-6 py-7 sm:px-8"
      style={{
        borderColor: BRAND.line,
        backgroundColor: BRAND.surface,
        boxShadow: "0 2px 8px rgba(35,66,54,0.07)",
      }}
    >
      <div className="mb-6">
        <h2 className="text-2xl" style={{ fontFamily: BRAND.serif, fontWeight: 500, color: BRAND.green }}>
          {title}
        </h2>
        {sub && (
          <p className="mt-1.5 text-sm" style={{ color: BRAND.inkSoft }}>
            {sub}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function BarRow({ label, score, meta }: { label: string; score: number; meta?: string }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between text-sm">
        <span style={{ color: BRAND.ink }}>{label}</span>
        <span className="tabular-nums" style={{ color: BRAND.inkSoft }}>
          {meta && <span className="mr-2 opacity-70">{meta}</span>}
          <span
            style={{ fontFamily: BRAND.serif, fontWeight: 400, fontSize: "1.05rem", color: BRAND.green }}
          >
            {score.toFixed(1)}
          </span>
        </span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: BRAND.creamDeep }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${scoreFraction(score) * 100}%`,
            backgroundColor: scoreColor(score),
            transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
          }}
        />
      </div>
    </div>
  );
}

function Heatmap({ summary }: { summary: ReturnType<typeof summarize> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate" style={{ borderSpacing: "5px" }}>
        <thead>
          <tr>
            <th className="w-44" />
            {summary.heatmap[0].cells.map((c) => (
              <th
                key={c.tier}
                className="px-2 pb-2 text-left text-[0.7rem] font-medium uppercase tracking-[0.1em]"
                style={{ color: BRAND.inkSoft }}
              >
                {tierName(c.tier)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {summary.heatmap.map((row) => (
            <tr key={row.level}>
              <td className="pr-3 text-right text-sm" style={{ color: BRAND.ink }}>
                {row.label}
              </td>
              {row.cells.map((cell) => (
                <td key={cell.tier} className="p-0">
                  <div
                    className="flex h-12 items-center justify-center rounded-[10px] tabular-nums"
                    style={{
                      backgroundColor: scoreColor(cell.score),
                      color: textOn(cell.score),
                      fontFamily: BRAND.serif,
                      fontSize: "1.1rem",
                    }}
                  >
                    {cell.score.toFixed(1)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PresetLink({
  active,
  label,
  title,
  onClick,
}: {
  active: boolean;
  label: string;
  title?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="border-b-2 pb-0.5 transition-colors duration-200"
      style={{
        borderColor: active ? BRAND.copper : "transparent",
        color: active ? BRAND.green : BRAND.inkSoft,
        fontWeight: active ? 600 : 400,
      }}
    >
      {label}
    </button>
  );
}
