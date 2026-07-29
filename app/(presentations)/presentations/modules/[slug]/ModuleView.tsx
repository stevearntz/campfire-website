"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "../../../_components/Icon";
import { MODES, QUIZ, type CourseModule } from "../../../_data/course";

type TabKey = "watch" | "read" | "build" | "check" | "resources";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "watch", label: "Watch", icon: "play_circle" },
  { key: "read", label: "Read", icon: "menu_book" },
  { key: "build", label: "Worksheet", icon: "edit_note" },
  { key: "check", label: "Check & reflect", icon: "quiz" },
  { key: "resources", label: "Resources", icon: "folder_open" },
];

const CHAPTERS = [
  { t: "0:00", d: "Why “inform them” is not a goal" },
  { t: "1:24", d: "DO — the decision or behavior you're after" },
  { t: "2:58", d: "THINK — the belief that has to shift first" },
  { t: "4:10", d: "FEEL — the state that makes the DO possible" },
  {
    t: "5:20",
    d: "Naming your mode: sell, teach, persuade, promote, align, decide",
  },
];

export default function ModuleView({
  module,
  initialWorksheet = {},
  worksheetSubmitted = false,
  initialPicks = {},
  initialJournal = "",
}: {
  module: CourseModule;
  initialWorksheet?: Record<string, unknown>;
  worksheetSubmitted?: boolean;
  initialPicks?: Record<number, number>;
  initialJournal?: string;
}) {
  const [tab, setTab] = useState<TabKey>("watch");
  const [mode, setMode] = useState(
    typeof initialWorksheet.mode === "string"
      ? (initialWorksheet.mode as string)
      : "Persuade",
  );
  const [doVal, setDoVal] = useState(
    typeof initialWorksheet.do === "string"
      ? (initialWorksheet.do as string)
      : "",
  );
  const [thinkVal, setThinkVal] = useState(
    typeof initialWorksheet.think === "string"
      ? (initialWorksheet.think as string)
      : "",
  );
  const [feelVal, setFeelVal] = useState(
    typeof initialWorksheet.feel === "string"
      ? (initialWorksheet.feel as string)
      : "",
  );
  const [dataVal, setDataVal] = useState(
    typeof initialWorksheet.evidence === "string"
      ? (initialWorksheet.evidence as string)
      : "",
  );
  const [worksheetSent, setWorksheetSent] = useState(worksheetSubmitted);
  const [picks, setPicks] = useState<Record<number, number>>(initialPicks);
  const [journalVal, setJournalVal] = useState(initialJournal);
  const [journalSaved, setJournalSaved] = useState(false);

  // Fire-and-forget persistence helper. Saves fail quietly.
  const save = (url: string, payload: unknown) => {
    try {
      void fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } catch {
      // ignore
    }
  };

  // Worksheet autosave (debounced). Skips the initial hydration render so we
  // don't POST the just-loaded values straight back.
  const firstWorksheetRender = useRef(true);
  useEffect(() => {
    if (firstWorksheetRender.current) {
      firstWorksheetRender.current = false;
      return;
    }
    const id = setTimeout(() => {
      save("/api/presentations/worksheet", {
        moduleSlug: module.slug,
        data: {
          do: doVal,
          think: thinkVal,
          feel: feelVal,
          evidence: dataVal,
          mode,
        },
        submit: false,
      });
    }, 800);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doVal, thinkVal, feelVal, dataVal, mode]);

  const sendWorksheetToCoach = () => {
    save("/api/presentations/worksheet", {
      moduleSlug: module.slug,
      data: {
        do: doVal,
        think: thinkVal,
        feel: feelVal,
        evidence: dataVal,
        mode,
      },
      submit: true,
    });
    setWorksheetSent(true);
  };

  const pickAnswer = (qi: number, oi: number) => {
    setPicks((prev) => {
      const next = { ...prev, [qi]: oi };
      const score = Object.keys(next).filter(
        (k) => next[Number(k)] === QUIZ[Number(k)].correct,
      ).length;
      save("/api/presentations/quiz", {
        lessonKey: module.slug,
        answers: next,
        score,
      });
      return next;
    });
  };

  const saveJournal = () => {
    save("/api/presentations/journal", {
      moduleSlug: module.slug,
      body: journalVal,
    });
    setJournalSaved(true);
  };

  // live worksheet checks
  const hasVerb =
    /\b(approve|sign|fund|commit|start|choose|decide|allocate|hire|launch|adopt)\w*\b/i.test(
      doVal,
    );
  const hasDate =
    /\b(aug|sep|oct|nov|dec|jan|feb|mar|apr|may|jun|jul|q[1-4]|by \w+)\b/i.test(
      doVal,
    );
  const doOk = hasVerb && hasDate;
  const thinkOk = thinkVal.trim().length > 30;

  const answeredCount = Object.keys(picks).length;
  const rightCount = Object.keys(picks).filter(
    (k) => picks[Number(k)] === QUIZ[Number(k)].correct,
  ).length;

  const saveState = worksheetSent
    ? "Sent to Dana"
    : doVal || thinkVal
      ? "Draft saved"
      : "Not started";

  const textareaClass =
    "mt-[10px] w-full min-h-[76px] rounded-[10px] border border-cf-gray-200 px-4 py-[14px] text-[16px] leading-[1.6] text-cf-indigo-700 resize-y";

  return (
    <div>
      {/* Header */}
      <div className="border-b border-cf-gray-100 bg-white px-12 pt-[26px]">
        <div className="flex items-center gap-2 text-[13px] text-cf-gray-500">
          <Link
            href="/presentations/syllabus"
            className="font-semibold text-cf-purple-600"
          >
            Syllabus
          </Link>
          <span>/</span>
          <span>Module {module.n}</span>
        </div>
        <h1 className="mt-3 text-[34px] leading-[1.2] font-bold tracking-[-0.015em] text-cf-indigo-700">
          {module.title}
        </h1>
        <p className="mt-[10px] max-w-[660px] text-[17px] leading-[1.6] text-cf-gray-500">
          {module.blurb}
        </p>
        <div className="mt-6 flex gap-1">
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 border-b-[3px] px-5 py-[13px] text-[14px] font-bold ${
                  active
                    ? "border-cf-purple-600 text-cf-purple-600"
                    : "border-transparent text-cf-gray-500"
                }`}
              >
                <Icon name={t.icon} className="text-[18px]" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1000px] px-12 pt-9 pb-[70px]">
        {tab === "watch" && (
          <div>
            <div
              className="topo-pattern relative grid aspect-[16/9] place-items-center overflow-hidden rounded-2xl"
              style={{ backgroundImage: "linear-gradient(140deg,#1C1334,#3A02A8)" }}
            >
              <div className="relative z-[1] text-center">
                <div className="mx-auto grid h-[74px] w-[74px] cursor-pointer place-items-center rounded-full border border-white/40 bg-white/[0.16]">
                  <Icon name="play_arrow" className="text-[38px] text-white" />
                </div>
                <div className="mt-4 text-[19px] font-semibold text-white">
                  The only three questions that matter
                </div>
                <div className="mt-1 text-[13px] text-white/60">
                  6:12 · with Dana Reyes
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-[1.4fr_1fr] gap-6">
              <div className="rounded-2xl border border-cf-gray-100 bg-white p-[26px]">
                <h4 className="mb-[14px] text-[18px] font-bold text-cf-indigo-700">
                  In this video
                </h4>
                <div className="flex flex-col gap-3">
                  {CHAPTERS.map((c) => (
                    <div
                      key={c.t}
                      className="flex gap-[14px] text-[15px] text-cf-gray-600"
                    >
                      <span className="font-mono text-[13px] font-bold text-cf-purple-600">
                        {c.t}
                      </span>
                      <div>{c.d}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="topo-pattern relative overflow-hidden rounded-2xl bg-cf-indigo-1100 p-[26px]">
                <div className="relative z-[1]">
                  <div className="text-[11px] font-bold tracking-[0.16em] text-cf-purple-300 uppercase">
                    Take this with you
                  </div>
                  <div className="mt-[14px] text-[20px] leading-[1.4] font-bold text-white">
                    “If the audience does nothing differently, you didn&apos;t
                    present — you reported.”
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "read" && (
          <div className="max-w-[760px] rounded-2xl border border-cf-gray-100 bg-white px-[52px] py-[44px]">
            <div className="text-[12px] font-bold tracking-[0.18em] text-cf-gray-500 uppercase">
              Reading · 8 min
            </div>
            <h2 className="mt-3 text-[32px] leading-[1.2] font-bold text-cf-indigo-700">
              Three questions, in this order
            </h2>
            <p className="mt-[22px] text-[18px] leading-[1.7] text-pretty text-cf-gray-600">
              Most decks start in the wrong place: with what the presenter knows.
              You have the data, you have the context, and so you begin assembling
              it. Twenty slides later you have a thorough document that nobody acts
              on — because thoroughness was never the point.
            </p>
            <p className="mt-[18px] text-[18px] leading-[1.7] text-pretty text-cf-gray-600">
              Start at the other end. Picture the room after you&apos;ve
              finished. What is different?
            </p>
            <h3 className="mt-[34px] text-[22px] font-bold text-cf-indigo-700">
              DO — the behavior
            </h3>
            <p className="mt-3 text-[18px] leading-[1.7] text-pretty text-cf-gray-600">
              A real DO is something a named person can say yes to, or start doing,
              within a week. “Approve the $120K manager coaching pilot for Q3” is a
              DO. “Understand the importance of manager development” is not — you
              can&apos;t watch someone understand.
            </p>
            <div className="my-[26px] rounded-xl bg-cf-purple-050 px-[26px] py-[22px]">
              <div className="text-[11px] font-bold tracking-[0.16em] text-cf-purple-600 uppercase">
                Test it
              </div>
              <div className="mt-2 text-[17px] leading-[1.6] text-cf-indigo-700">
                If your DO doesn&apos;t have a verb, an owner, and a deadline,
                it&apos;s a wish.
              </div>
            </div>
            <h3 className="mt-[34px] text-[22px] font-bold text-cf-indigo-700">
              THINK — the belief in the way
            </h3>
            <p className="mt-3 text-[18px] leading-[1.7] text-pretty text-cf-gray-600">
              People don&apos;t act against what they believe. So find the one
              belief standing between them and your DO, and write it down as they
              would say it — not as a strawman. “We already tried leadership
              training and it didn&apos;t stick” is honest. Your presentation
              exists to move that sentence.
            </p>
            <p className="mt-[18px] text-[18px] leading-[1.7] text-pretty text-cf-gray-600">
              Notice that this constrains your evidence. You don&apos;t need every
              number you have; you need the numbers that argue with that one
              sentence.
            </p>
            <h3 className="mt-[34px] text-[22px] font-bold text-cf-indigo-700">
              FEEL — the state that permits action
            </h3>
            <p className="mt-3 text-[18px] leading-[1.7] text-pretty text-cf-gray-600">
              Feeling is not decoration. A room that feels blamed defends. A room
              that feels overwhelmed defers. A room that feels quietly urgent and
              capable decides. Name the feeling you&apos;re aiming for, then check
              whether your opening actually produces it — most openings produce
              mild anxiety about the length of the deck.
            </p>
            <h3 className="mt-[34px] text-[22px] font-bold text-cf-indigo-700">
              Then name your mode
            </h3>
            <p className="mt-3 text-[18px] leading-[1.7] text-pretty text-cf-gray-600">
              Selling, teaching, persuading, promoting, aligning, and deciding are
              different jobs with different shapes. A teaching deck can afford to
              build slowly. A deciding deck cannot — it leads with the
              recommendation and spends the rest of its time earning it. Pick one
              primary mode. Decks that try to do three do none.
            </p>
            <div className="mt-[34px] flex items-center justify-between gap-5 border-t border-cf-gray-100 pt-6">
              <div className="text-[15px] text-cf-gray-500">
                Next: write yours in the worksheet.
              </div>
              <button
                onClick={() => setTab("build")}
                className="rounded-lg bg-cf-purple-600 px-[22px] py-[13px] text-[13px] font-bold tracking-[0.12em] text-white uppercase"
              >
                Open worksheet
              </button>
            </div>
          </div>
        )}

        {tab === "build" && (
          <div className="grid grid-cols-[1.5fr_1fr] items-start gap-6">
            {/* Left: worksheet */}
            <div className="rounded-2xl border border-cf-gray-100 bg-white px-8 py-[30px]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[12px] font-bold tracking-[0.18em] text-cf-purple-600 uppercase">
                    Worksheet 01
                  </div>
                  <h3 className="mt-2 text-[26px] font-bold text-cf-indigo-700">
                    Your intent statement
                  </h3>
                </div>
                <span className="text-[12px] text-cf-gray-400">{saveState}</span>
              </div>
              <p className="mt-[10px] text-[15px] leading-[1.6] text-cf-gray-500">
                Write it rough. Dana will push on it before your spine review.
              </p>

              <div className="mt-[26px]">
                <div className="text-[11px] font-bold tracking-[0.16em] text-cf-gray-500 uppercase">
                  What&apos;s the mode?
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {MODES.map((m) => {
                    const active = mode === m;
                    return (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`rounded-full border px-4 py-[9px] text-[13px] font-semibold ${
                          active
                            ? "border-cf-purple-600 bg-cf-purple-600 text-white"
                            : "border-cf-gray-200 bg-white text-cf-gray-600"
                        }`}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-[30px] flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-[10px]">
                    <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-cf-purple-600 text-[12px] font-extrabold text-white">
                      1
                    </span>
                    <label className="text-[17px] font-bold text-cf-indigo-700">
                      They will DO…
                    </label>
                  </div>
                  <div className="mt-[6px] ml-9 text-[14px] text-cf-gray-500">
                    Verb, owner, deadline. One sentence.
                  </div>
                  <textarea
                    value={doVal}
                    onChange={(e) => setDoVal(e.target.value)}
                    placeholder="The leadership team approves…"
                    className={textareaClass}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-[10px]">
                    <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-cf-pink-400 text-[12px] font-extrabold text-white">
                      2
                    </span>
                    <label className="text-[17px] font-bold text-cf-indigo-700">
                      They currently THINK…
                    </label>
                  </div>
                  <div className="mt-[6px] ml-9 text-[14px] text-cf-gray-500">
                    In their words, generously. Then: what has to replace it?
                  </div>
                  <textarea
                    value={thinkVal}
                    onChange={(e) => setThinkVal(e.target.value)}
                    placeholder="“We already tried…”"
                    className={textareaClass}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-[10px]">
                    <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-cf-warm-500 text-[12px] font-extrabold text-white">
                      3
                    </span>
                    <label className="text-[17px] font-bold text-cf-indigo-700">
                      They should FEEL…
                    </label>
                  </div>
                  <div className="mt-[6px] ml-9 text-[14px] text-cf-gray-500">
                    One or two words. Then say what in your opening causes it.
                  </div>
                  <textarea
                    value={feelVal}
                    onChange={(e) => setFeelVal(e.target.value)}
                    placeholder="Urgent, but capable — because…"
                    className={textareaClass}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-[10px]">
                    <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-cf-river-600 text-[12px] font-extrabold text-white">
                      4
                    </span>
                    <label className="text-[17px] font-bold text-cf-indigo-700">
                      The evidence that argues with their THINK
                    </label>
                  </div>
                  <div className="mt-[6px] ml-9 text-[14px] text-cf-gray-500">
                    Two or three numbers, max. Note where each comes from.
                  </div>
                  <textarea
                    value={dataVal}
                    onChange={(e) => setDataVal(e.target.value)}
                    placeholder="1. …"
                    className={`${textareaClass} min-h-[90px]`}
                  />
                </div>
              </div>

              <div className="mt-7 flex gap-3 border-t border-cf-gray-100 pt-6">
                <button
                  onClick={sendWorksheetToCoach}
                  className="rounded-lg bg-cf-purple-600 px-[22px] py-[13px] text-[13px] font-bold tracking-[0.12em] text-white uppercase"
                >
                  Send to coach
                </button>
                <button
                  onClick={() => setTab("check")}
                  className="rounded-lg border border-cf-gray-300 bg-white px-[22px] py-[13px] text-[13px] font-bold tracking-[0.12em] text-cf-gray-700 uppercase"
                >
                  Knowledge check
                </button>
              </div>
            </div>

            {/* Right: live check + worked example + Dana's note */}
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-cf-purple-100 bg-cf-purple-050 p-6">
                <div className="flex items-center gap-[9px]">
                  <Icon
                    name="auto_awesome"
                    className="text-[19px] text-cf-purple-600"
                  />
                  <div className="text-[12px] font-bold tracking-[0.14em] text-cf-purple-700 uppercase">
                    Live check
                  </div>
                </div>
                <div className="mt-[14px] flex flex-col gap-3">
                  <div className="flex gap-[10px] text-[14px] leading-[1.55] text-cf-gray-600">
                    <Icon
                      name={doOk ? "check_circle" : "radio_button_unchecked"}
                      className={`mt-px text-[17px] ${
                        doOk ? "text-cf-meadow-600" : "text-cf-gray-300"
                      }`}
                    />
                    <div>
                      {doOk
                        ? "Your DO has a decision verb and a date. Good."
                        : "Your DO needs a decision verb and a date — “approve… by Aug 14.”"}
                    </div>
                  </div>
                  <div className="flex gap-[10px] text-[14px] leading-[1.55] text-cf-gray-600">
                    <Icon
                      name={thinkOk ? "check_circle" : "radio_button_unchecked"}
                      className={`mt-px text-[17px] ${
                        thinkOk ? "text-cf-meadow-600" : "text-cf-gray-300"
                      }`}
                    />
                    <div>
                      {thinkOk
                        ? "You've written the belief in their words. That's the hard part."
                        : "Write the belief as they'd say it, not as a strawman."}
                    </div>
                  </div>
                  <div className="flex gap-[10px] text-[14px] leading-[1.55] text-cf-gray-600">
                    <Icon
                      name="check_circle"
                      className="mt-px text-[17px] text-cf-meadow-600"
                    />
                    <div>
                      Mode set to {mode} — your deck should lead with the
                      recommendation.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-cf-gray-100 bg-white p-6">
                <div className="text-[12px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
                  Worked example
                </div>
                <div className="mt-[14px] text-[14px] leading-[1.6] text-cf-gray-600">
                  <div className="font-bold text-cf-indigo-700">DO</div>
                  <div className="mt-[3px]">
                    Sign off on the 6-month coaching pilot for 34 new managers, at
                    the Aug 14 leadership meeting.
                  </div>
                  <div className="mt-[14px] font-bold text-cf-indigo-700">
                    THINK
                  </div>
                  <div className="mt-[3px]">
                    From “training is a nice-to-have we can defer” to “our attrition
                    is a management problem, and it&apos;s fixable this year.”
                  </div>
                  <div className="mt-[14px] font-bold text-cf-indigo-700">
                    FEEL
                  </div>
                  <div className="mt-[3px]">
                    Uncomfortable but not blamed. Then relieved there&apos;s a
                    specific
                    plan.
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-cf-gray-100 bg-white p-6">
                <div className="flex items-center gap-[9px]">
                  <div className="grid h-[30px] w-[30px] place-items-center rounded-full bg-cf-coach-rose-500 text-[11px] font-extrabold text-white">
                    DR
                  </div>
                  <div className="text-[13px] font-bold text-cf-indigo-700">
                    Dana&apos;s note
                  </div>
                </div>
                <div className="mt-3 text-[14px] leading-[1.6] text-cf-gray-600">
                  “Bring me the THINK sentence first. If we get that right, the rest
                  of the deck almost writes itself.”
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "check" && (
          <div className="max-w-[720px]">
            <div className="rounded-2xl border border-cf-gray-100 bg-white px-[34px] py-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[12px] font-bold tracking-[0.18em] text-cf-purple-600 uppercase">
                    Knowledge check
                  </div>
                  <h3 className="mt-2 text-[26px] font-bold text-cf-indigo-700">
                    Three quick ones
                  </h3>
                </div>
                <div className="text-[14px] font-bold text-cf-indigo-700">
                  {answeredCount ? `${rightCount} of 3 correct` : "3 questions"}
                </div>
              </div>
              <div className="mt-7 flex flex-col gap-[30px]">
                {QUIZ.map((q, qi) => {
                  const picked = picks[qi];
                  const answered = picked !== undefined;
                  return (
                    <div key={qi}>
                      <div className="text-[17px] leading-[1.5] font-semibold text-cf-indigo-700">
                        {q.prompt}
                      </div>
                      <div className="mt-[14px] flex flex-col gap-2">
                        {q.options.map((label, oi) => {
                          const isPicked = picked === oi;
                          const isRight = oi === q.correct;
                          let cls =
                            "bg-white border-cf-gray-200 text-cf-gray-600";
                          let icon = "radio_button_unchecked";
                          let iconCls = "text-cf-gray-300";
                          if (answered && isRight) {
                            cls =
                              "bg-cf-meadow-50 border-cf-meadow-300 text-cf-gray-700";
                            icon = "check_circle";
                            iconCls = "text-cf-meadow-600";
                          }
                          if (answered && isPicked && !isRight) {
                            cls =
                              "bg-cf-ladybug-50 border-cf-ladybug-300 text-cf-gray-700";
                            icon = "cancel";
                            iconCls = "text-cf-ladybug-600";
                          }
                          return (
                            <button
                              key={oi}
                              onClick={() => pickAnswer(qi, oi)}
                              className={`flex items-start gap-[11px] rounded-[10px] border px-4 py-[14px] text-left text-[15px] leading-[1.5] ${cls}`}
                            >
                              <Icon
                                name={icon}
                                className={`text-[18px] ${iconCls}`}
                              />
                              <div>{label}</div>
                            </button>
                          );
                        })}
                      </div>
                      {answered && (
                        <div className="mt-3 rounded-[10px] bg-cf-purple-050 px-4 py-[14px] text-[15px] leading-[1.6] text-cf-indigo-700">
                          {picked === q.correct
                            ? q.feedback
                            : "Not quite — look again at what an audience can actually be seen doing."}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-cf-gray-100 bg-white px-[34px] py-[30px]">
              <div className="text-[12px] font-bold tracking-[0.18em] text-cf-gray-500 uppercase">
                Reflection · private
              </div>
              <h4 className="mt-2 text-[20px] font-bold text-cf-indigo-700">
                When has a presentation of yours changed nothing?
              </h4>
              <p className="mt-2 text-[15px] leading-[1.6] text-cf-gray-500">
                Only you and your coach see your journal, and only if you share the
                entry.
              </p>
              <textarea
                value={journalVal}
                onChange={(e) => {
                  setJournalVal(e.target.value);
                  setJournalSaved(false);
                }}
                placeholder="Write freely…"
                className="mt-[14px] w-full min-h-[120px] rounded-[10px] border border-cf-gray-200 px-4 py-[14px] text-[16px] leading-[1.65] text-cf-indigo-700 resize-y"
              />
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={saveJournal}
                  className="rounded-lg bg-cf-purple-600 px-5 py-3 text-[13px] font-bold tracking-[0.12em] text-white uppercase"
                >
                  Save entry
                </button>
                <span className="text-[13px] text-cf-gray-400">
                  {journalSaved ? "Saved to your journal" : ""}
                </span>
              </div>
            </div>
          </div>
        )}

        {tab === "resources" && (
          <div className="grid max-w-[820px] grid-cols-2 gap-5">
            <div className="rounded-2xl border border-cf-gray-100 bg-white p-[26px]">
              <Icon name="description" className="text-[26px] text-cf-purple-600" />
              <div className="mt-3 text-[17px] font-bold text-cf-indigo-700">
                Intent one-pager
              </div>
              <div className="mt-[6px] text-[14px] leading-[1.55] text-cf-gray-500">
                The DO / THINK / FEEL sheet, printable. Fill one per presentation.
              </div>
              <div className="mt-[14px] cursor-pointer text-[12px] font-bold tracking-[0.12em] text-cf-purple-600 uppercase">
                Download PDF
              </div>
            </div>
            <div className="rounded-2xl border border-cf-gray-100 bg-white p-[26px]">
              <Icon name="fact_check" className="text-[26px] text-cf-purple-600" />
              <div className="mt-3 text-[17px] font-bold text-cf-indigo-700">
                Mode cheat sheet
              </div>
              <div className="mt-[6px] text-[14px] leading-[1.55] text-cf-gray-500">
                Six modes and the deck shape each one wants.
              </div>
              <div className="mt-[14px] cursor-pointer text-[12px] font-bold tracking-[0.12em] text-cf-purple-600 uppercase">
                Download PDF
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
