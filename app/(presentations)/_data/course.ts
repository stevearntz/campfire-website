/**
 * Mocked course content for "Tell It So It Moves" — ported verbatim from the
 * design prototype (Storytelling Course.dc.html). This is the single source of
 * placeholder data while the front-end is validated; the real data model
 * (Neon + the schema in the handoff) replaces it in a later phase.
 *
 * Ramp/beat accent hexes that don't map to a cf-* token live here on purpose —
 * this file is the tokens home for data-driven accents.
 */

export type ModuleStatus = "Complete" | "In progress" | "Next" | "Locked";

export interface CourseModule {
  n: string;
  slug: string;
  title: string;
  status: ModuleStatus;
  blurb: string;
  tags: string[];
  deliverable: string;
  time: string;
}

/** Left-accent ramp across the ten modules: purple → pink → warm. */
export const MODULE_ACCENTS = [
  "#6E3FCC",
  "#7A4CD9",
  "#8252E1",
  "#9E4CE8",
  "#BE53EA",
  "#C054EA",
  "#DD66E5",
  "#E055CB",
  "#EE80DD",
  "#F59E2C",
];

export const MODULES: CourseModule[] = [
  {
    n: "01",
    slug: "01",
    title: "Start with the end — do, think, feel",
    status: "Complete",
    blurb:
      "Before a single slide: what should they do, what belief is in the way, and what should the room feel? Then name your mode — sell, teach, persuade, promote, align, or decide.",
    tags: ["Intent", "Modes", "Audience outcome"],
    deliverable: "A one-sentence intent statement",
    time: "Watch 6 · Read 8 · Build 20",
  },
  {
    n: "02",
    slug: "02",
    title: "Read the room — stakes, skeptics, and prior beliefs",
    status: "In progress",
    blurb:
      "Map the four people who matter, what each already thinks, and what each stands to lose. Find the objection that will actually kill your ask.",
    tags: ["Stakeholder map", "Objections", "Pre-wiring"],
    deliverable: "An audience map with one named risk",
    time: "Watch 7 · Read 9 · Build 20",
  },
  {
    n: "03",
    slug: "03",
    title: "Pick your spine — narrative shapes that fit business",
    status: "Next",
    blurb:
      "Hero's journey, SCQA, What / So what / Now what, and the Minto pyramid. Which shape your content wants, and why a decision deck should almost never build suspense.",
    tags: ["SCQA", "Pyramid", "Hero's journey"],
    deliverable: "A chosen spine with beats named",
    time: "Watch 9 · Read 11 · Build 25",
  },
  {
    n: "04",
    slug: "04",
    title: "Prove it — evidence, and the honest number",
    status: "Locked",
    blurb:
      "Cut a pile of data down to the two or three numbers that argue with the belief you're moving. What counts as proof to a skeptic, and where your evidence is thin.",
    tags: ["Evidence", "Sourcing", "Counter-argument"],
    deliverable: "Three numbers with sources",
    time: "Watch 6 · Read 10 · Build 25",
  },
  {
    n: "05",
    slug: "05",
    title: "Make every slide argue — vertical logic & action titles",
    status: "Locked",
    blurb:
      "From Storytelling Charts: the 5-step universal frame, and titles that state the claim. Read only your titles top to bottom and you should hear the whole argument.",
    tags: ["Action titles", "Vertical logic", "5SUF"],
    deliverable: "Every title rewritten as a claim",
    time: "Watch 8 · Read 12 · Build 35",
  },
  {
    n: "06",
    slug: "06",
    title: "Chart it right — choosing the form the message needs",
    status: "Locked",
    blurb:
      "The TVMA formula for picking a chart: what your message is, then the chart that carries it. Waterfall, mekko, barbell, waffle — and when a number in big type beats any chart.",
    tags: ["TVMA", "Chart types", "Data honesty"],
    deliverable: "Charts rebuilt to match claims",
    time: "Watch 10 · Read 12 · Build 30",
  },
  {
    n: "07",
    slug: "07",
    title: "Strip it down — hierarchy, restraint, and one idea per slide",
    status: "Locked",
    blurb:
      "What to delete. Where the eye lands first. How to make a slide readable in three seconds by someone who arrived late.",
    tags: ["Hierarchy", "Deletion", "Legibility"],
    deliverable: "A deck 30% shorter",
    time: "Watch 6 · Read 8 · Build 30",
  },
  {
    n: "08",
    slug: "08",
    title: "Say it out loud — voice, pace, and the pause",
    status: "Locked",
    blurb:
      "Your first solo takes. Where filler comes from, why you speed up before the ask, and how a two-second silence does more than a slide.",
    tags: ["Pace", "Filler", "Presence"],
    deliverable: "Two recorded takes + readout",
    time: "Watch 7 · Read 7 · Rehearse 40",
  },
  {
    n: "09",
    slug: "09",
    title: "Hold the room — questions, objections, and the close",
    status: "Locked",
    blurb:
      "Answer the question actually being asked. Handle the hostile one without flinching. Close on the ask instead of trailing off into thank-yous.",
    tags: ["Q&A", "Objections", "Closing"],
    deliverable: "A Q&A prep sheet",
    time: "Watch 8 · Read 9 · Build 25",
  },
  {
    n: "10",
    slug: "10",
    title: "Deliver & debrief — the run that counts",
    status: "Locked",
    blurb:
      "A live dry run with your coach, then the real thing. Afterwards we debrief what the room did, not how the slides looked.",
    tags: ["Dry run", "Live delivery", "Debrief"],
    deliverable: "A delivered presentation",
    time: "Rehearse 60 · Session 45",
  },
];

/** Status pill colors, mapped to cf-* utility class fragments. */
export const STATUS_STYLE: Record<
  ModuleStatus,
  { bg: string; fg: string }
> = {
  Complete: { bg: "bg-cf-meadow-100", fg: "text-cf-meadow-800" },
  "In progress": { bg: "bg-cf-warm-050", fg: "text-cf-warm-700" },
  Next: { bg: "bg-cf-purple-100", fg: "text-cf-purple-700" },
  Locked: { bg: "bg-cf-gray-100", fg: "text-cf-gray-400" },
};

export interface Slide {
  n: string;
  beat: string;
  title: string;
  note: string;
  support: string;
}

export const SLIDES: Slide[] = [
  {
    n: "01",
    beat: "Title",
    title: "The manager gap is quietly costing us our best people",
    note: "Open with the room's own words. Don't apologize for the topic.",
    support: "Leadership team · Aug 14",
  },
  {
    n: "02",
    beat: "Situation",
    title: "We added 34 managers in 18 months — faster than we ever have",
    note: "Agreed reality first. Nobody argues with this slide.",
    support: "Source: People ops headcount, Jun 2026",
  },
  {
    n: "03",
    beat: "Situation",
    title: "And we did it by promoting our strongest individual contributors",
    note: "This was the right call. Say so — it buys you the next slide.",
    support: "28 of 34 were internal promotions",
  },
  {
    n: "04",
    beat: "Complication",
    title: "Half of them have never managed before",
    note: "Slow down. This is the hinge of the whole argument.",
    support: "17 of 34 first-time managers",
  },
  {
    n: "05",
    beat: "Complication",
    title: "Their teams are turning over at nearly twice the company rate",
    note: "Give the number, then stop talking for two seconds.",
    support: "22% vs 12% annualized, trailing 12 mo",
  },
  {
    n: "06",
    beat: "Question",
    title: "So: do we keep absorbing that, or do we fix the management layer?",
    note: "Ask it as a real question. Let it sit.",
    support: "Cost of replacement ≈ 1.4× salary",
  },
  {
    n: "07",
    beat: "Answer",
    title: "A six-month coaching pilot for the 17, starting in Q3",
    note: "Recommendation, singular. Options come in Q&A, not here.",
    support: "$120K · 6 months · 17 managers",
  },
  {
    n: "08",
    beat: "The ask",
    title: "We're asking for sign-off on Aug 14 so cohort one starts Sept 8",
    note: "Name the decision, the date, and the person. Then be quiet.",
    support: "Owner: Celeste · Decision: Aug 14",
  },
];

/** Beat label colors, mapped to cf-* text utility fragments. */
export const BEAT_COLOR: Record<string, string> = {
  Title: "text-cf-gray-400",
  Situation: "text-cf-purple-600",
  Complication: "text-cf-pink-500",
  Question: "text-cf-pink-400",
  Answer: "text-cf-meadow-600",
  "The ask": "text-cf-warm-500",
};

export const MODES = ["Persuade", "Sell", "Teach", "Promote", "Align", "Decide"];

export interface QuizQuestion {
  prompt: string;
  options: string[];
  correct: number;
  feedback: string;
}

export const QUIZ: QuizQuestion[] = [
  {
    prompt:
      "A VP says “great deck” and then nothing happens. Which part of your intent did you most likely miss?",
    options: [
      "THINK — you didn't move a belief",
      "FEEL — the room wasn't engaged",
      "DO — you never named a decision anyone could make",
      "Nothing; some rooms are just slow",
    ],
    correct: 2,
    feedback:
      "Right. “Great deck” is what people say when nothing was asked of them. A DO has a verb, an owner, and a date.",
  },
  {
    prompt: "Which of these is an actual DO?",
    options: [
      "Understand our retention challenge",
      "Approve the $120K coaching pilot at the Aug 14 meeting",
      "Feel urgency about first-time managers",
      "Learn how our program works",
    ],
    correct: 1,
    feedback:
      "Yes — you can watch it happen, and you know by Aug 15 whether it did. The others are internal states or wishes.",
  },
  {
    prompt:
      "You need budget from a finance-minded audience that thinks training never sticks. Your primary mode is…",
    options: [
      "Teach — explain the research on manager development",
      "Promote — build excitement for the program",
      "Persuade — move a specific belief toward a specific decision",
      "Inform — give them the full picture and let them decide",
    ],
    correct: 2,
    feedback:
      "Persuade. Teaching is what you'd do if the belief were neutral. Here there's a specific sentence in the way, and your evidence exists to argue with it.",
  },
];

export interface Resource {
  icon: string;
  title: string;
  desc: string;
  action: string;
}

export const RESOURCES: Resource[] = [
  {
    icon: "description",
    title: "Intent one-pager",
    desc: "DO / THINK / FEEL, printable. One per presentation.",
    action: "Download PDF",
  },
  {
    icon: "account_tree",
    title: "Spine templates",
    desc: "SCQA, pyramid, and hero's journey as slide skeletons.",
    action: "Open in builder",
  },
  {
    icon: "bar_chart",
    title: "TVMA chart picker",
    desc: "Message → chart, with the 14 forms from Storytelling Charts.",
    action: "Download PDF",
  },
  {
    icon: "record_voice_over",
    title: "Rehearsal script sheet",
    desc: "Teleprompter layout with pause marks and beat budgets.",
    action: "Download DOCX",
  },
  {
    icon: "forum",
    title: "Q&A prep grid",
    desc: "Likely questions, real answers, and what not to say.",
    action: "Download PDF",
  },
  {
    icon: "fact_check",
    title: "Story rubric",
    desc: "The five lines your coach and peers score you against.",
    action: "View rubric",
  },
];

export interface JournalEntry {
  label: string;
  date: string;
  body: string;
}

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    label: "Module 01 · reflection",
    date: "Jul 24",
    body: "The QBR last spring. I covered everything and nobody asked a single question. I think I was presenting to prove I'd done the work, not to get a decision.",
  },
  {
    label: "Kickoff · note to self",
    date: "Jul 21",
    body: "Dana asked what I want to be true after this course. I want to stop over-preparing and start deciding what to leave out.",
  },
];

export const LEARNER_NAME = "Celeste Merrill";
