import Link from "next/link";
import { Icon } from "../../_components/Icon";
import { MODULES, MODULE_ACCENTS, STATUS_STYLE } from "../../_data/course";

const CAPSTONE_GRADIENT = "linear-gradient(120deg,#6A3DC5,#E055CB)";

const STAT_CARDS = [
  { label: "Format", value: "Self-paced + coaching" },
  { label: "Effort", value: "~2.5 hrs / week" },
  { label: "Artifact", value: "One real deck" },
  { label: "Ends with", value: "Live delivery" },
];

const OUTCOMES: React.ReactNode[] = [
  <>
    Name what you want people to <strong>do, think, and feel</strong> — before
    you open a deck.
  </>,
  <>Choose a narrative spine on purpose, and defend why it fits.</>,
  <>
    Turn a pile of data into the two or three numbers that carry the argument.
  </>,
  <>Write action titles so the deck reads as an argument top to bottom.</>,
  <>Pick the right chart for the message instead of the habitual one.</>,
  <>Deliver it with pace and presence — and hold the room in Q&amp;A.</>,
];

const ASSESSMENT_ROWS = [
  { label: "Worksheets & knowledge checks", value: "Pass / revise" },
  { label: "Deck against the story rubric", value: "Coach scored" },
  { label: "Delivery — pace, filler, presence", value: "3 takes minimum" },
  { label: "Peer review given & received", value: "2 each" },
];

const PREREQS: { icon: string; body: React.ReactNode }[] = [
  {
    icon: "work",
    body: (
      <>
        A real presentation on your calendar in the next 8 weeks — or take our
        case study.
      </>
    ),
  },
  {
    icon: "table_chart",
    body: <>Whatever data you have, however messy. We&apos;ll cut it down together.</>,
  },
  {
    icon: "videocam",
    body: <>A working webcam and mic. You will watch yourself. It gets easier.</>,
  },
  {
    icon: "menu_book",
    body: (
      <>
        <em>Storytelling Charts</em> — chapters 2–4 before module 05.
      </>
    ),
  },
];

export default function SyllabusPage() {
  return (
    <div className="max-w-[1080px] px-12 pt-11 pb-[70px]">
      <div className="text-[12px] font-bold tracking-[0.18em] text-cf-purple-600 uppercase">
        Course plan
      </div>
      <h1 className="mt-3 max-w-[800px] text-[44px] leading-[1.1] font-bold tracking-[-0.015em] text-balance text-cf-indigo-700">
        Tell it so it moves —{" "}
        <span className="text-cf-purple-600">
          a presentation you build as you learn
        </span>
      </h1>
      <p className="mt-4 max-w-[680px] text-[19px] leading-[1.6] text-balance text-cf-gray-500">
        Ten modules over six weeks, self-paced, with four coaching sessions. You
        bring a real presentation on day one — or borrow our case — and it
        becomes the thing every lesson works on. You finish with a deck
        you&apos;ve delivered out loud at least three times.
      </p>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        {STAT_CARDS.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-cf-gray-100 bg-white px-5 py-[18px]"
          >
            <div className="text-[11px] font-bold tracking-[0.16em] text-cf-gray-500 uppercase">
              {s.label}
            </div>
            <div className="mt-[7px] text-[15px] font-semibold text-cf-indigo-700">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* By the end, you can */}
      <div className="mt-11 rounded-2xl border border-cf-gray-100 bg-white px-8 py-[30px]">
        <h3 className="text-[24px] font-bold text-cf-indigo-700">
          By the end, you can
        </h3>
        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4">
          {OUTCOMES.map((o, i) => (
            <div key={i} className="flex gap-[11px]">
              <Icon
                name="check"
                className="mt-[2px] text-[19px] text-cf-purple-600"
              />
              <div className="text-[16px] leading-[1.55] text-cf-gray-600">
                {o}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The ten modules */}
      <div className="mt-12 flex items-baseline justify-between">
        <h3 className="text-[28px] font-bold text-cf-indigo-700">
          The ten modules
        </h3>
        <div className="text-[13px] text-cf-gray-500">
          Each ends with something in your deck
        </div>
      </div>

      <div className="mt-[22px] flex flex-col gap-3">
        {MODULES.map((m, i) => {
          const accent = MODULE_ACCENTS[i];
          const status = STATUS_STYLE[m.status];
          const locked = m.status === "Locked";

          const inner = (
            <>
              <div
                className="text-[26px] font-extrabold tracking-[-0.02em]"
                style={{ color: accent }}
              >
                {m.n}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-[10px]">
                  <div className="text-[19px] leading-[1.35] font-bold text-cf-indigo-700">
                    {m.title}
                  </div>
                  <span
                    className={`rounded-full px-[9px] py-1 text-[10px] font-bold tracking-[0.12em] uppercase ${status.bg} ${status.fg}`}
                  >
                    {m.status}
                  </span>
                </div>
                <div className="mt-[7px] max-w-[560px] text-[15px] leading-[1.6] text-balance text-cf-gray-500">
                  {m.blurb}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-cf-gray-200 bg-cf-gray-50 px-[10px] py-1 text-[11px] font-semibold text-cf-gray-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-l border-cf-gray-100 pl-5">
                <div className="text-[11px] font-bold tracking-[0.14em] text-cf-gray-400 uppercase">
                  You leave with
                </div>
                <div className="mt-[6px] text-[14px] leading-[1.5] font-semibold text-cf-indigo-700">
                  {m.deliverable}
                </div>
                <div className="mt-[10px] text-[12px] text-cf-gray-500">
                  {m.time}
                </div>
              </div>
            </>
          );

          const rowClass =
            "grid grid-cols-[56px_1fr_200px] items-start gap-[22px] rounded-xl border border-cf-gray-100 bg-white px-[26px] py-[22px]";

          if (locked) {
            return (
              <div
                key={m.slug}
                className={`${rowClass} cursor-default border-l-4`}
                style={{ borderLeftColor: accent }}
              >
                {inner}
              </div>
            );
          }

          return (
            <Link
              key={m.slug}
              href={`/presentations/modules/${m.slug}`}
              className={`${rowClass} border-l-4`}
              style={{ borderLeftColor: accent }}
            >
              {inner}
            </Link>
          );
        })}
      </div>

      {/* Capstone banner */}
      <div
        className="topo-pattern relative mt-10 overflow-hidden rounded-2xl px-9 py-[34px]"
        style={{ backgroundImage: CAPSTONE_GRADIENT }}
      >
        <div className="relative z-[1] flex items-center justify-between gap-10">
          <div>
            <div className="text-[12px] font-bold tracking-[0.18em] text-white/80 uppercase">
              Capstone
            </div>
            <h3 className="mt-[10px] text-[28px] leading-[1.25] font-bold text-white">
              Deliver it for real — then debrief what happened
            </h3>
            <p className="mt-[10px] max-w-[560px] text-[16px] leading-[1.6] text-white/85">
              Three graded runs: a solo take with AI readout, an async peer
              review, and a live session with your coach. Then you present to
              your actual audience and we debrief the room&apos;s reaction, not
              the slides.
            </p>
          </div>
          <Link
            href="/presentations/rehearse"
            className="flex-none rounded-lg bg-white px-[26px] py-[15px] text-[14px] font-bold tracking-[0.12em] text-cf-purple-600 uppercase"
          >
            Rehearsal studio
          </Link>
        </div>
      </div>

      {/* Closing cards */}
      <div className="mt-11 grid grid-cols-2 gap-6">
        <div className="rounded-2xl border border-cf-gray-100 bg-white p-7">
          <h4 className="text-[20px] font-bold text-cf-indigo-700">
            How you&apos;ll be assessed
          </h4>
          <div className="mt-[18px] flex flex-col gap-[14px]">
            {ASSESSMENT_ROWS.map((r, i) => (
              <div
                key={r.label}
                className={`flex justify-between text-[15px] ${
                  i < ASSESSMENT_ROWS.length - 1
                    ? "border-b border-cf-gray-100 pb-[14px]"
                    : ""
                }`}
              >
                <span className="text-cf-gray-600">{r.label}</span>
                <span className="font-bold text-cf-indigo-700">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-cf-gray-100 bg-white p-7">
          <h4 className="text-[20px] font-bold text-cf-indigo-700">
            What you need before module 01
          </h4>
          <div className="mt-[18px] flex flex-col gap-[13px]">
            {PREREQS.map((p) => (
              <div
                key={p.icon}
                className="flex gap-[11px] text-[15px] leading-[1.55] text-cf-gray-600"
              >
                <Icon
                  name={p.icon}
                  className="mt-[2px] text-[18px] text-cf-purple-600"
                />
                <div>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
