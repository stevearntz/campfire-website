import Link from "next/link";
import { Icon } from "../_components/Icon";

const HERO_GRADIENT =
  "linear-gradient(120deg,#2A1B52 0%,#6A3DC5 60%,#8252E1 100%)";
const PROGRESS_GRADIENT = "linear-gradient(to right,#6A3DC5,#E055CB)";

const EFFORT = [
  { icon: "play_circle", label: "Watch 7 min" },
  { icon: "menu_book", label: "Read 9 min" },
  { icon: "edit_note", label: "Build 20 min" },
  { icon: "quiz", label: "4 checks" },
];

const PROGRESS_ROWS = [
  { label: "Lessons", value: "3 / 10" },
  { label: "Worksheets", value: "2 / 10" },
  { label: "Slides drafted", value: "8 / 12" },
  { label: "Rehearsal takes", value: "2" },
];

const COACHING = [
  {
    icon: "check_circle",
    iconClass: "text-cf-meadow-400",
    title: "Kickoff — what are you actually presenting?",
    meta: "Jul 21 · notes posted",
    dim: false,
  },
  {
    icon: "schedule",
    iconClass: "text-cf-warm-300",
    title: "Spine review",
    meta: "Aug 6 · bring modules 01–04",
    dim: false,
  },
  {
    icon: "radio_button_unchecked",
    iconClass: "text-white/35",
    title: "Dry run & feedback",
    meta: "Aug 20",
    dim: true,
  },
  {
    icon: "radio_button_unchecked",
    iconClass: "text-white/35",
    title: "Final delivery & debrief",
    meta: "Sep 3",
    dim: true,
  },
];

export default function DashboardPage() {
  return (
    <div>
      {/* Hero */}
      <div
        className="topo-pattern relative overflow-hidden px-12 pt-11 pb-10"
        style={{ backgroundImage: HERO_GRADIENT }}
      >
        <div className="relative z-[1] max-w-[840px]">
          <div className="text-[12px] font-bold tracking-[0.18em] text-cf-warm-300 uppercase">
            Welcome back
          </div>
          <h1 className="mt-[10px] text-[44px] leading-[1.12] font-bold tracking-[-0.015em] text-balance text-white">
            Hi Celeste — your deck is the coursework.
          </h1>
          <p className="mt-[14px] max-w-[620px] text-[18px] leading-[1.6] text-white/80">
            Ten modules, one real presentation. Every lesson ends with something
            built, and every build ends with someone reacting to it — a check,
            your coach, or a peer.
          </p>
          <div className="mt-[26px] flex gap-3">
            <Link
              href="/presentations/modules/02"
              className="inline-flex items-center gap-2 rounded-lg bg-cf-pink-400 px-6 py-[14px] text-sm font-bold tracking-[0.12em] text-white uppercase"
            >
              Resume module 02
            </Link>
            <Link
              href="/presentations/syllabus"
              className="inline-flex items-center gap-2 rounded-lg border border-white/35 bg-white/12 px-6 py-[14px] text-sm font-bold tracking-[0.12em] text-white uppercase"
            >
              See the plan
            </Link>
          </div>
        </div>
      </div>

      {/* Body grid */}
      <div className="grid grid-cols-1 items-start gap-6 px-12 pt-9 pb-[60px] lg:grid-cols-[1.55fr_1fr]">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Up next */}
          <div className="rounded-2xl border border-cf-gray-100 bg-white px-7 py-[26px]">
            <div className="flex items-baseline justify-between">
              <div className="text-[12px] font-bold tracking-[0.16em] text-cf-gray-500 uppercase">
                Up next
              </div>
              <div className="text-[13px] text-cf-gray-500">
                Module 02 of 10
              </div>
            </div>
            <h3 className="mt-3 text-[24px] leading-[1.3] font-bold text-cf-indigo-700">
              Read the room — stakes, skeptics, and what they already believe
            </h3>
            <p className="mt-2 max-w-[520px] text-[16px] leading-[1.6] text-cf-gray-500">
              You wrote your DO / THINK / FEEL. Now pressure-test it against the
              four people who will actually be in that room.
            </p>
            <div className="mt-5 flex flex-wrap gap-[22px]">
              {EFFORT.map((e) => (
                <div
                  key={e.label}
                  className="flex items-center gap-[7px] text-[13px] font-semibold text-cf-gray-600"
                >
                  <Icon
                    name={e.icon}
                    className="text-[18px] text-cf-purple-600"
                  />
                  {e.label}
                </div>
              ))}
            </div>
            <Link
              href="/presentations/modules/02"
              className="mt-6 inline-block rounded-lg bg-cf-purple-600 px-[22px] py-[13px] text-[13px] font-bold tracking-[0.12em] text-white uppercase"
            >
              Continue
            </Link>
          </div>

          {/* Your presentation */}
          <div className="rounded-2xl border border-cf-gray-100 bg-white px-7 py-[26px]">
            <div className="flex items-center justify-between">
              <h4 className="text-[18px] font-bold text-cf-indigo-700">
                Your presentation
              </h4>
              <span className="rounded-full bg-cf-purple-050 px-3 py-[6px] text-[12px] font-bold tracking-[0.1em] text-cf-purple-600 uppercase">
                Draft · 8 slides
              </span>
            </div>
            <div className="mt-4 rounded-xl bg-cf-purple-050 px-5 py-[18px]">
              <div className="text-[11px] font-bold tracking-[0.16em] text-cf-gray-500 uppercase">
                Working title
              </div>
              <div className="mt-[6px] text-[20px] leading-[1.35] font-bold text-cf-indigo-700">
                The manager gap is quietly costing us our best people
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Persuade", "Leadership team · 20 min", "Spine: SCQA"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-cf-purple-100 bg-white px-[11px] py-[5px] text-[12px] font-semibold text-cf-purple-700"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <Link
                href="/presentations/deck"
                className="rounded-lg bg-cf-purple-600 px-5 py-3 text-[13px] font-bold tracking-[0.12em] text-white uppercase"
              >
                Open builder
              </Link>
              <Link
                href="/presentations/rehearse"
                className="rounded-lg border border-cf-gray-300 bg-white px-5 py-3 text-[13px] font-bold tracking-[0.12em] text-cf-gray-700 uppercase"
              >
                Rehearse
              </Link>
            </div>
          </div>

          {/* Feedback waiting */}
          <div className="rounded-2xl border border-cf-gray-100 bg-white px-7 py-[26px]">
            <h4 className="mb-[18px] text-[18px] font-bold text-cf-indigo-700">
              Feedback waiting on you
            </h4>
            <div className="flex flex-col gap-[14px]">
              <div className="flex items-start gap-[14px] border-b border-cf-gray-100 pb-[14px]">
                <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full bg-cf-coach-rose-500 text-[12px] font-extrabold text-white">
                  DR
                </div>
                <div>
                  <div className="text-sm text-cf-indigo-700">
                    <strong>Dana</strong> left 3 notes on your intent worksheet
                  </div>
                  <div className="mt-[3px] text-[13px] text-cf-gray-500">
                    “Your DO is still a feeling. Make it a decision they can say
                    yes to.”
                  </div>
                </div>
                <span className="ml-auto flex-none text-[12px] text-cf-gray-400">
                  2d
                </span>
              </div>
              <div className="flex items-start gap-[14px]">
                <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full bg-cf-purple-400 text-[12px] font-extrabold text-white">
                  AI
                </div>
                <div>
                  <div className="text-sm text-cf-indigo-700">
                    Readout ready for <strong>Take 2</strong>
                  </div>
                  <div className="mt-[3px] text-[13px] text-cf-gray-500">
                    Pace steady at 148 wpm · 11 filler words · you rushed the ask
                  </div>
                </div>
                <span className="ml-auto flex-none text-[12px] text-cf-gray-400">
                  5d
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Progress */}
          <div className="rounded-2xl border border-cf-gray-100 bg-white p-6">
            <h4 className="mb-1 text-[18px] font-bold text-cf-indigo-700">
              Progress
            </h4>
            <div className="text-[13px] text-cf-gray-500">
              1 of 10 modules complete
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-cf-gray-100">
              <div
                className="h-full w-[16%] rounded-full"
                style={{ backgroundImage: PROGRESS_GRADIENT }}
              />
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {PROGRESS_ROWS.map((r) => (
                <div
                  key={r.label}
                  className="flex justify-between text-[13px]"
                >
                  <span className="text-cf-gray-500">{r.label}</span>
                  <span className="font-bold text-cf-indigo-700">
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coaching track */}
          <div className="topo-pattern relative overflow-hidden rounded-2xl bg-cf-indigo-1100 p-6">
            <div className="relative z-[1]">
              <div className="text-[11px] font-bold tracking-[0.16em] text-cf-purple-300 uppercase">
                Coaching track
              </div>
              <div className="mt-4 flex flex-col gap-4">
                {COACHING.map((c) => (
                  <div key={c.title} className="flex gap-3">
                    <Icon
                      name={c.icon}
                      className={`mt-[1px] text-[18px] ${c.iconClass}`}
                    />
                    <div>
                      <div
                        className={`text-sm font-semibold ${
                          c.dim ? "text-white/75" : "text-white"
                        }`}
                      >
                        {c.title}
                      </div>
                      <div
                        className={`mt-[2px] text-[12px] ${
                          c.dim ? "text-white/45" : "text-white/50"
                        }`}
                      >
                        {c.meta}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course text */}
          <div className="rounded-2xl border border-cf-gray-100 bg-white p-6">
            <h4 className="mb-[14px] text-[18px] font-bold text-cf-indigo-700">
              Course text
            </h4>
            <div className="flex gap-[14px]">
              <div className="grid h-[70px] w-[52px] flex-none place-items-center rounded border border-cf-gray-200 bg-cf-dusk-100">
                <Icon name="bar_chart" className="text-[22px] text-cf-dusk-500" />
              </div>
              <div>
                <div className="text-sm leading-[1.35] font-bold text-cf-indigo-700">
                  Storytelling Charts
                </div>
                <div className="mt-[3px] text-[12px] text-cf-gray-500">
                  Sam Schreim
                </div>
                <div className="mt-2 text-[12px] leading-[1.5] text-cf-gray-500">
                  Vertical logic, the 5-step slide frame, and TVMA chart choice
                  anchor modules 05–07.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
