import Link from "next/link";
import { Icon } from "../_components/Icon";
import { requireLearner, firstName } from "../_lib/learner";
import {
  getProgress,
  getPresentation,
  getWorksheets,
  getSlides,
} from "../_lib/db";
import { MODULES, MODULE_COUNT, COACHING_CURRICULUM } from "../_data/course";

const HERO_GRADIENT =
  "linear-gradient(120deg,#2A1B52 0%,#6A3DC5 60%,#8252E1 100%)";
const PROGRESS_GRADIENT = "linear-gradient(to right,#6A3DC5,#E055CB)";

const EFFORT_ICON: Record<string, string> = {
  Watch: "play_circle",
  Read: "menu_book",
  Build: "edit_note",
  Rehearse: "mic",
  Session: "event",
};

/** Parse a module's "Watch 6 · Read 8 · Build 20" string into effort chips. */
function effortChips(time: string) {
  return time.split("·").map((part) => {
    const [word, num] = part.trim().split(/\s+/);
    const isMinutes = word !== "Session";
    return {
      icon: EFFORT_ICON[word] ?? "schedule",
      label: `${word} ${num}${isMinutes ? " min" : ""}`,
    };
  });
}

export default async function DashboardPage() {
  const { user, enrollment } = await requireLearner();

  const [progress, presentation, worksheets] = await Promise.all([
    getProgress(enrollment.id),
    getPresentation(enrollment.id),
    getWorksheets(enrollment.id),
  ]);
  const slides = presentation ? await getSlides(presentation.id) : [];

  const doneModules = progress.filter((p) => p.state === "done").length;
  const upNext = MODULES.find((m) => {
    const row = progress.find((p) => p.lessonKey === m.slug);
    return !row || row.state !== "done";
  });
  const upNextModule = upNext ?? MODULES[0];
  const hasStarted = progress.length > 0 || presentation !== null;
  const takesCount = 0; // recordings land in a later slice

  const name = firstName(user);

  return (
    <div>
      {/* Hero */}
      <div
        className="topo-pattern relative overflow-hidden px-12 pt-11 pb-10"
        style={{ backgroundImage: HERO_GRADIENT }}
      >
        <div className="relative z-[1] max-w-[840px]">
          <div className="text-[12px] font-bold tracking-[0.18em] text-cf-warm-300 uppercase">
            {hasStarted ? "Welcome back" : "Welcome"}
          </div>
          <h1 className="mt-[10px] text-[44px] leading-[1.12] font-bold tracking-[-0.015em] text-balance text-white">
            {name ? `Hi ${name} — ` : ""}your deck is the coursework.
          </h1>
          <p className="mt-[14px] max-w-[620px] text-[18px] leading-[1.6] text-white/80">
            Ten modules, one real presentation. Every lesson ends with something
            built, and every build ends with someone reacting to it — a check,
            your coach, or a peer.
          </p>
          <div className="mt-[26px] flex gap-3">
            <Link
              href={`/presentations/modules/${upNextModule.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-cf-pink-400 px-6 py-[14px] text-sm font-bold tracking-[0.12em] text-white uppercase"
            >
              {hasStarted
                ? `Resume module ${upNextModule.n}`
                : `Start module ${upNextModule.n}`}
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
                {hasStarted ? "Up next" : "Start here"}
              </div>
              <div className="text-[13px] text-cf-gray-500">
                Module {upNextModule.n} of {MODULE_COUNT}
              </div>
            </div>
            <h3 className="mt-3 text-[24px] leading-[1.3] font-bold text-cf-indigo-700">
              {upNextModule.title}
            </h3>
            <p className="mt-2 max-w-[520px] text-[16px] leading-[1.6] text-cf-gray-500">
              {upNextModule.blurb}
            </p>
            <div className="mt-5 flex flex-wrap gap-[22px]">
              {effortChips(upNextModule.time).map((e) => (
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
              href={`/presentations/modules/${upNextModule.slug}`}
              className="mt-6 inline-block rounded-lg bg-cf-purple-600 px-[22px] py-[13px] text-[13px] font-bold tracking-[0.12em] text-white uppercase"
            >
              {hasStarted ? "Continue" : "Begin module 01"}
            </Link>
          </div>

          {/* Your presentation */}
          <div className="rounded-2xl border border-cf-gray-100 bg-white px-7 py-[26px]">
            <div className="flex items-center justify-between">
              <h4 className="text-[18px] font-bold text-cf-indigo-700">
                Your presentation
              </h4>
              {presentation ? (
                <span className="rounded-full bg-cf-purple-050 px-3 py-[6px] text-[12px] font-bold tracking-[0.1em] text-cf-purple-600 uppercase">
                  {presentation.source === "case_study" ? "Case study" : "Draft"}
                  {slides.length > 0 ? ` · ${slides.length} slides` : ""}
                </span>
              ) : (
                <span className="rounded-full bg-cf-gray-100 px-3 py-[6px] text-[12px] font-bold tracking-[0.1em] text-cf-gray-400 uppercase">
                  Not started
                </span>
              )}
            </div>

            {presentation ? (
              <>
                <div className="mt-4 rounded-xl bg-cf-purple-050 px-5 py-[18px]">
                  <div className="text-[11px] font-bold tracking-[0.16em] text-cf-gray-500 uppercase">
                    Working title
                  </div>
                  <div className="mt-[6px] text-[20px] leading-[1.35] font-bold text-cf-indigo-700">
                    {presentation.title ?? "Untitled presentation"}
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
              </>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-cf-gray-200 bg-cf-gray-50 px-6 py-8 text-center">
                <Icon
                  name="slideshow"
                  className="text-[32px] text-cf-purple-300"
                />
                <div className="mt-3 text-[16px] font-bold text-cf-indigo-700">
                  You haven&apos;t added your presentation yet
                </div>
                <p className="mx-auto mt-2 max-w-[380px] text-[14px] leading-[1.55] text-cf-gray-500">
                  Bring a real talk you have coming up — or start from our case
                  study. Every module builds on the same deck.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <Link
                    href="/presentations/deck"
                    className="rounded-lg bg-cf-purple-600 px-5 py-3 text-[13px] font-bold tracking-[0.12em] text-white uppercase"
                  >
                    Add your presentation
                  </Link>
                  <Link
                    href="/presentations/deck"
                    className="rounded-lg border border-cf-gray-300 bg-white px-5 py-3 text-[13px] font-bold tracking-[0.12em] text-cf-gray-700 uppercase"
                  >
                    Use the case study
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Feedback waiting */}
          <div className="rounded-2xl border border-cf-gray-100 bg-white px-7 py-[26px]">
            <h4 className="mb-[18px] text-[18px] font-bold text-cf-indigo-700">
              Feedback waiting on you
            </h4>
            <div className="flex items-start gap-[14px] rounded-xl bg-cf-gray-50 px-5 py-5">
              <Icon
                name="forum"
                className="mt-[2px] text-[22px] text-cf-gray-400"
              />
              <div className="text-[14px] leading-[1.6] text-cf-gray-500">
                Nothing yet. Submit a worksheet or share a rehearsal take, and
                your coach&apos;s notes and AI readouts land here.
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
              {doneModules} of {MODULE_COUNT} modules complete
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-cf-gray-100">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.round((doneModules / MODULE_COUNT) * 100)}%`,
                  backgroundImage: PROGRESS_GRADIENT,
                }}
              />
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {[
                { label: "Lessons", value: `${doneModules} / ${MODULE_COUNT}` },
                {
                  label: "Worksheets",
                  value: `${worksheets.length} / ${MODULE_COUNT}`,
                },
                { label: "Slides drafted", value: String(slides.length) },
                { label: "Rehearsal takes", value: String(takesCount) },
              ].map((r) => (
                <div key={r.label} className="flex justify-between text-[13px]">
                  <span className="text-cf-gray-500">{r.label}</span>
                  <span className="font-bold text-cf-indigo-700">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coaching track */}
          <div className="topo-pattern relative overflow-hidden rounded-2xl bg-cf-indigo-1100 p-6">
            <div className="relative z-[1]">
              <div className="flex items-baseline justify-between">
                <div className="text-[11px] font-bold tracking-[0.16em] text-cf-purple-300 uppercase">
                  Coaching track
                </div>
                {enrollment.coachName && (
                  <div className="text-[11px] text-white/50">
                    with {enrollment.coachName}
                  </div>
                )}
              </div>
              <div className="mt-4 flex flex-col gap-4">
                {COACHING_CURRICULUM.map((c) => (
                  <div key={c.key} className="flex gap-3">
                    <Icon
                      name="radio_button_unchecked"
                      className="mt-[1px] text-[18px] text-white/35"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white/85">
                        {c.title}
                      </div>
                      <div className="mt-[2px] text-[12px] text-white/45">
                        {c.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-white/12 pt-4 text-[12px] leading-[1.5] text-white/50">
                Your coach schedules these once you&apos;ve picked a
                presentation.
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
                <Icon
                  name="bar_chart"
                  className="text-[22px] text-cf-dusk-500"
                />
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
