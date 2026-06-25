/**
 * Case-study data — source of truth: `Website Copy.md` §9–§15 (verbatim).
 * One typed object per study; the shared `[slug]` template renders these fields.
 *
 * Order on the index (Website Copy.md §8): utah-business, ypo, cotopaxi,
 * dermalogica, cricut, huntsman, enveda.
 */

export interface MetaItem {
  label: string;
  value: string;
}

export interface Quote {
  text: string;
  attribution?: string; // "Name · Role, Company"
}

export interface Stat {
  big: string;
  label: string;
}

export interface AgendaStep {
  title: string;
  body?: string;
}

/** Per-study signature block — the one bespoke visual. */
export type Signature =
  | { kind: "utahVideo"; src: string; poster: string; quotes: Quote[]; cultureExercise: { prompt: string; tags: string[]; pullQuote: string } }
  | { kind: "ypoValues"; values: { name: string; behaviors: string[] }[]; stat: string }
  | { kind: "cotopaxiTest"; questions: string[] }
  | { kind: "dermalogicaPaths"; paths: { eyebrow: string; title: string; body: string }[] }
  | { kind: "cricutSequence"; sessions: string[]; capstoneIndex: number; guideStat: string; guideBody: string }
  | { kind: "huntsmanDiagram"; left: string; right: string; result: string }
  | { kind: "envedaPyramid"; levels: string[]; targetIndex: number };

export interface CaseStudy {
  slug: string;
  client: string;
  orgSize?: string; // employee-count / size band — shown as a lighter sub-line
  /** typographic wordmark when no logo file exists */
  logo?: string; // /public path on a white chip
  draft?: boolean;
  accent: string; // study accent — eyebrow, signature block, small accents
  accentSoft: string; // tinted bg for the accent

  // index-card fields
  engagement: string; // engagement type shown on the card + eyebrow
  hook: string; // one-line hook
  cardStat: string;
  cardQuote: Quote;
  cardNote?: string; // shown instead of quote for drafts

  // header
  eyebrow: string;
  headline: string;
  intro: string; // dek / intro body (may contain **bold** segments rendered plain)

  // meta row
  meta: MetaItem[];

  // the challenge
  challengeHeading: string;
  challengeBody: string[];
  challengePullQuote?: Quote;

  // what campfire did
  approachHeading: string;
  approachBody: string[];
  approachPullQuote?: Quote;
  /** some studies list the "what campfire did" steps inline (the technology company) */
  approachSteps?: AgendaStep[];
  approachAfterSteps?: string; // paragraph after inline steps (the technology company pivot)

  // inside the session (optional)
  agendaHeading?: string;
  agenda?: AgendaStep[];

  signature?: Signature;

  // the outcome
  outcomeHeading: string;
  outcomeBody: string[];
  outcomeStats?: Stat[];
  outcomeQuotes: Quote[];
  /** drafts: pending-sign-off flag note */
  pendingNote?: string;
  outcomeStat?: string; // a single trailing stat line (drafts)
  /** Utah's "What Steve was able to do" / "What Campfire did" bullet list */
  outcomeList?: { heading: string; items: string[] };

  // closing CTA
  ctaHeading: string;
  ctaBody: string;
}

export const FOOTER_LINE = "Clarity & Alignment · Facilitated by Campfire · getcampfire.com";

export const CASES: CaseStudy[] = [
  /* ───────── Award-winning media outlet (flagship) ───────── */
  {
    slug: "utah-business",
    client: "Award-winning media outlet",
    orgSize: "small team (~50 employees)",
    accent: "#E055CB",
    accentSoft: "#FCEBF8",
    engagement: "Team Offsite",
    hook: "Strategic alignment around profitability",
    cardStat: "½-day working session → a full-team 2026 rally",
    cardQuote: {
      text: "He brings out the best in people while helping them aspire to more.",
      attribution: "Executive Editor",
    },

    eyebrow: "Clarity & Alignment · Team Offsite · Award-winning media outlet",
    headline: "From 20-minute check-ins to a shared purpose — in a single morning.",
    intro:
      "A 12-person media team — sales and editorial — came together for a half-day working session on purpose, mission, and the cultural pillars they'd hold each other to heading into 2026.",

    meta: [
      { label: "Format", value: "Half-day team offsite" },
      { label: "Audience", value: "12-person team, sales & editorial" },
      { label: "When & where", value: "Sep 26, 2025, Salt Lake City, UT" },
      { label: "Facilitator", value: "Steve Arntz" },
      { label: "Goal", value: "Grow the audience — together" },
    ],

    challengeHeading: "A team that met for 20 minutes a week — and didn't fully understand itself.",
    challengeBody: [
      "Full-team meetings ran just 20–30 minutes a week. Sales and editorial sat in the same company but didn't fully understand each other's worlds, and some roles lacked clear metrics for what good looked like.",
      "The team wanted to understand individual strengths and working styles — and rally around one clear goal: grow the audience. They needed a shared language and a reason to meet that was bigger than logistics.",
    ],

    approachHeading: "A half-day working session that built shared purpose — and the accountability to keep it.",
    approachBody: [
      "Steve led the team through purpose, mission, and vision at the individual, team, and organizational levels — then translated that into named cultural pillars and the behaviors behind them, sharpened the team's strategic focus and competitive positioning, and built an accountability framework to carry it forward.",
    ],

    agendaHeading: "The moves, in order.",
    agenda: [
      { title: "Why we exist", body: "Re-grounded the team in purpose, mission, and vision — at the individual, team, and organizational levels." },
      { title: "Cultural pillars & behaviors", body: "Named the pillars that define the culture — and the observable behaviors that prove each one is real." },
      { title: "Focus & positioning", body: "Sharpened strategic focus and competitive positioning around the goal of growing the audience." },
      { title: "Accountability framework", body: "Built the cadence and 3–5 bold next steps to bring back to the broader team." },
    ],

    signature: {
      kind: "utahVideo",
      src: "/utah-business-testimonial.mp4",
      poster: "/utah-business-testimonial-poster.jpg",
      quotes: [
        { text: "How could someone from outside come in and instantly understand what we were about — and lead us to the points?", attribution: "Media outlet team member, on camera" },
        { text: "He was the perfect person to come in and ask questions — that is very rarely done. He didn't push his own opinions. It was ours." },
      ],
      cultureExercise: {
        prompt: 'What should "fast-paced" mean at its best?',
        tags: ["Organized", "Proactive", "Customer-focused", "Aligned goals"],
        pullQuote: "I end the work day without being fearful of the next one.",
      },
    },

    outcomeHeading: "A team that left with language, pillars, and a cadence.",
    outcomeBody: [],
    outcomeStats: [
      { big: "P / M / V", label: "Alignment on purpose, mission & vision across sales and editorial" },
      { big: "Pillars", label: "Named cultural pillars and the behaviors that make them real" },
      { big: "3–5", label: "Bold next steps and an accountability cadence to rally into 2026" },
    ],
    outcomeQuotes: [
      {
        text: "I am a huge fan of Steve as a leader and as a human being. He brings out the best in other people while helping them aspire to more — his emotional IQ is almost palpable.",
        attribution: "Catherine Bennett · Executive Editor",
      },
    ],
    outcomeList: {
      heading: "What Steve was able to do",
      items: [
        "Extracted the most important points and found common language",
        "Re-engaged the team in why they love their work",
        "Made everyone open to potential change",
        "Focused the team on what really matters through thoughtful questions",
        "Empowered them to take action through accountability",
      ],
    },

    ctaHeading: "Rally your team the same way.",
    ctaBody:
      "A half-day that turns weekly logistics into shared purpose, named behaviors, and a cadence that sticks.",
  },

  /* ───────── Global network for chief executives ───────── */
  {
    slug: "ypo",
    client: "Global network for chief executives",
    orgSize: "~450 employees",
    accent: "#6E3FCC",
    accentSoft: "#F3EFFE",
    engagement: "Leadership Retreat",
    hook: "Mission-driven principles drive leadership competency",
    cardStat: '4.8/5 session rating — "extremely valuable"',
    cardQuote: {
      text: "It came in at a 4.8 out of 5, with everyone rating it as very or extremely valuable.",
      attribution: "Director of Marketing Ops",
    },

    eyebrow: "Clarity & Alignment · Leadership Retreat · Global network for chief executives",
    headline: "Guiding principles, translated into 12 behaviors the team coaches by.",
    intro:
      "The executive network's Marcoms leadership team — 13 leaders — turned shared principles into observable behavior in a retreat that scored 4.8 / 5, with everyone rating it very or extremely valuable.",

    meta: [
      { label: "Format", value: "In-person retreat + 3 virtual follow-ups" },
      { label: "Audience", value: "Marcoms leadership, 13 leaders" },
      { label: "When & where", value: "May 1, 2026, Chicago, IL" },
      { label: "Facilitator", value: "Steve Arntz" },
      { label: "Result", value: "4.8 / 5 session rating" },
    ],

    challengeHeading: "Strong principles on paper. Unclear behavior in the room.",
    challengeBody: [
      "The executive network's Marketing & Communications leadership team needed to strengthen trust at the leadership level and translate their Guiding Principles into observable behaviors — with clear accountability for living them.",
      "Survey and 1:1 data, gathered with consultant Oscar Marroquin, surfaced gaps in behavioral clarity and operating norms, unclear roles, decisions and ownership, and a need to manage conflict and tension more openly.",
    ],

    approachHeading: "A 3-hour working session that turned principles into behavior.",
    approachBody: [
      'Steve facilitated a session designed, in the executive network\'s own framing, "to strengthen trust at the leadership level by surfacing lived patterns, translating shared principles into observable leadership behaviors, and establishing clear commitments for how we work together." The team identified four core values — joy, trust, power, and partnership — and defined 12 specific behaviors for accountability. An accountability-partner system and the Campfire platform carried the work across three follow-up sessions.',
    ],

    agendaHeading: "Four values. Twelve behaviors.",
    agenda: [], // rendered via signature grid

    signature: {
      kind: "ypoValues",
      values: [
        { name: "Joy", behaviors: ["Practice optimism", "Create psychological safety", "Keep healthy boundaries", "Enjoy the journey"] },
        { name: "Trust", behaviors: ["Accountability & follow-through", "Active contribution", "Listen without judgment"] },
        { name: "Power", behaviors: ["Take ownership", "Bring expertise and solutions", "Stay resilient in uncertainty"] },
        { name: "Partnership", behaviors: ["Advocate & include across teams", "Focus on problems, not people", "Connect proactively"] },
      ],
      stat: "12 observable behaviors the leadership team now coaches by — not values on a wall, but actions in the room.",
    },

    outcomeHeading: "Momentum that kept compounding after the room cleared.",
    outcomeBody: [],
    outcomeStats: [
      { big: "Commitments", label: "Agreed leadership commitments with an accountability-partner cadence" },
      { big: "6-mo pilot", label: "A customized Campfire platform pilot under discussion" },
      { big: "Invited back", label: "Steve invited to the executive network's January 2027 team meeting in Puerto Rico" },
    ],
    outcomeQuotes: [
      {
        text: "Steve's session at our Marcoms leadership retreat really landed. The post-session feedback came in at a 4.8 out of 5 — with everyone rating it as very or extremely valuable.",
        attribution: "Sarah McBrearty · Director of Marketing Operations",
      },
      {
        text: "Wonderful job! I heard initial feedback from other leaders, and they were all positive and refreshing. I can't thank you enough for your energy, perspectives, flexibility, creativity, and unique approach.",
        attribution: "La Trease Shaw · Interim Head of Marketing & Communications",
      },
      {
        text: "It's wonderful to see the momentum from the May offsite continuing and translating into concrete actions and ongoing conversations.",
        attribution: "Tatiana Garcia · Leadership Development Program Manager",
      },
    ],

    ctaHeading: "Turn your principles into behavior.",
    ctaBody:
      "A facilitated session that translates values on the wall into the behaviors your leaders coach, reward, and correct.",
  },

  /* ───────── Outdoor consumer brand ───────── */
  {
    slug: "cotopaxi",
    client: "Outdoor consumer brand",
    orgSize: "mid-size (~300 employees)",
    accent: "#3B4CCA",
    accentSoft: "#EAEDFB",
    engagement: "Executive Offsite",
    hook: "Aligning executives around key drivers for performance",
    cardStat: "9 execs aligned on behaviors they'll coach",
    cardQuote: {
      text: "What made it effective was the combination of clarity and accountability.",
      attribution: "Head of Brand",
    },

    eyebrow: "Clarity & Alignment · Executive Offsite",
    headline: "When values drifted from behavior, the exec team named the drivers for 2026.",
    intro:
      "A 9-person executive team wrote the stories of when the outdoor brand performed at its best — then converged on the 3–5 Drivers of Performance they'll coach, reward, and correct.",

    meta: [
      { label: "Format", value: "2-hour exec session + pre-work" },
      { label: "Audience", value: "9-person Executive Leadership Team" },
      { label: "When", value: "January 8, 2026" },
      { label: "Facilitator", value: "Steve Arntz" },
      { label: "Relationship", value: "Customer since 2022" },
    ],

    challengeHeading: "The biggest survey drop was employees' connection to values.",
    challengeBody: [
      "The outdoor brand's most recent engagement survey showed its biggest decline in how connected employees felt to the company's values. Leadership saw a real gap between the founding values — People, Innovation, Adventure — and the behaviors showing up day to day.",
      "Decisions were being read as \"anti-team\" even when well-intended. And the company was navigating a critical season: balancing its mission and impact with performance and financial sustainability.",
    ],

    approachHeading: "Not a values rewrite. A behavior-first alignment session.",
    approachBody: [
      "Rather than redraft values in a single sitting, Steve ran a behavior-first session. Execs did pre-work — writing stories of when the company performed at its best versus when it broke down — then mined those stories for the behaviors that actually made the difference.",
    ],
    approachPullQuote: {
      text: "Today we are not solving the outdoor brand's values for the next decade. We are defining the behaviors we will coach, reward, and correct in 2026 and beyond.",
      attribution: "The session's opening frame",
    },

    agendaHeading: "The agenda, in order.",
    agenda: [
      { title: "Set the container", body: "Working agreements that made the room safe for honest conversation." },
      { title: "2026 reality check", body: '"If 2026 is a win, what must be true about how we operate?"' },
      { title: '"Do Well ↔ Do Good"', body: "A sustainability reframe — holding mission and performance together, not in tension." },
      { title: "Stories of Performance", body: "Mined the pre-work stories for the behaviors behind the best and worst moments." },
      { title: "Converge to 3–5 drivers", body: "Ran each candidate behavior through the Leadership Test (below) to find the few that mattered." },
      { title: "Driver cards, bridge & commitments", body: "Defined each driver, bridged to values & brand, and closed with personal commitments." },
    ],

    signature: {
      kind: "cotopaxiTest",
      questions: [
        "Would we coach it?",
        "Pay or promote for it?",
        "Correct its absence?",
        "Does it matter for 2026?",
      ],
    },

    outcomeHeading: '"Good energy and great discussion on behaviors."',
    outcomeBody: [
      "A smaller working group — including the founder and a board member — formed to carry the values work forward with continued Campfire facilitation. Performance drivers under discussion: Learning · Collaboration · Ownership · Engagement",
    ],
    outcomeStats: [
      { big: "48–72h", label: "Delivered: 3–5 draft Drivers of Performance, a leadership narrative, and a rollout roadmap" },
    ],
    outcomeQuotes: [
      {
        text: "One moment when the outdoor brand was operating at its best was when performance priorities were clarified and leadership alignment tightened. What made it effective was the combination of clarity and accountability.",
        attribution: "Veronica Gontier · Interim Head of Brand Strategy",
      },
      {
        text: "The team aligned early on strategy, key assumptions, and constraints, which allowed decisions to be made quickly and tradeoffs to be discussed in real time.",
        attribution: "Charles Puff · VP of Finance",
      },
    ],

    ctaHeading: "Name the behaviors that define your year.",
    ctaBody:
      "A behavior-first session that turns drifting values into the 3–5 drivers your leaders coach, reward, and correct.",
  },

  /* ───────── Professional skincare brand ───────── */
  {
    slug: "dermalogica",
    client: "Professional skincare brand",
    orgSize: "global (1,000+ employees)",
    accent: "#D9803B",
    accentSoft: "#FBF0E6",
    engagement: "Facilitator Enablement",
    hook: "Honest conversations the leadership team was avoiding",
    cardStat: "Platform usage expanded by ~1,300%",
    cardQuote: {
      text: "Vulnerable and honest moments this team really needed.",
      attribution: "Talent Partner",
    },

    eyebrow: "Clarity & Alignment · Offsite + Enablement",
    headline: "The vulnerable, honest moments this team really needed.",
    intro:
      'Campfire-built content and facilitator training powered a leadership offsite the client called a "huge success" — inside a relationship that grew from a $5K start toward a six-figure footprint.',

    meta: [
      { label: "Engagement", value: "Leadership offsite + facilitator training" },
      { label: "Audience", value: "HR / talent leadership and managers" },
      { label: "When", value: "Offsite Oct 2025, Training Dec 2024" },
      { label: "Model", value: "Your facilitators or ours" },
      { label: "Relationship", value: "Signed 2025–2026 services agreement" },
    ],

    challengeHeading: "Busy, but increasingly disconnected.",
    challengeBody: [
      "Strategy was being interpreted inconsistently across teams, with little visibility into how it flowed from executive offsites into daily work. As the company scaled, communication frayed.",
      "Teams felt busy but increasingly disconnected, and managers struggled to translate priorities into action.",
    ],

    approachHeading: "Built the content. Trained their people to run it.",
    approachBody: [
      "Campfire delivered the full offsite design — session flow, speaker notes, slides, and an HR worksheet — then trained the skincare brand's own facilitators on running high-trust sessions internally. So the team can run it both ways:",
    ],

    signature: {
      kind: "dermalogicaPaths",
      paths: [
        {
          eyebrow: "Your facilitators",
          title: "Run it in-house",
          body: "Campfire trains your leaders — on Honest Conversations & Conflict Management — so high-trust sessions become a capability your team owns.",
        },
        {
          eyebrow: "Our facilitators",
          title: "Bring in Campfire",
          body: "When the moment calls for a neutral outside voice, Campfire facilitates the room directly — using the same content your team already knows.",
        },
      ],
    },

    outcomeHeading: "A huge success — and an expanding partnership.",
    outcomeBody: [
      "The leadership offsite surfaced the candid, vulnerable conversations the team needed — and the platform footprint kept growing.",
    ],
    outcomeStats: [
      { big: "$5K", label: "Initial engagement" },
      { big: "14→200", label: "User expansion" },
      { big: "2025–26", label: "Services agreement signed" },
    ],
    outcomeQuotes: [
      {
        text: "The session was a huge success, and we had some vulnerable and honest moments that this team really needed. Thank you for all your hard work, ideas, collaboration and support — you are a great partner!",
        attribution: "Lola Russek · Talent Acquisition Business Partner",
      },
    ],

    ctaHeading: "Run high-trust sessions — your people or ours.",
    ctaBody:
      "Campfire builds the content and trains your facilitators, so candid conversations become a capability your team owns.",
  },

  /* ───────── Consumer crafting technology company ───────── */
  {
    slug: "cricut",
    client: "Consumer crafting technology company",
    orgSize: "public (1,000+ employees)",
    accent: "#0E9F6E",
    accentSoft: "#E7F6EF",
    engagement: "Leadership Pilot",
    hook: "A decision-making field guide for high-pressure calls",
    cardStat: "12 principles for making critical decisions",
    cardQuote: {
      text: "These sessions have created significant value for our leaders.",
      attribution: "Chief Revenue Officer",
    },

    eyebrow: "Clarity & Alignment · Leadership Pilot",
    headline: "Slow down to speed up.",
    intro:
      "A senior-leadership pilot — run under a 15% budget-cut mandate — drove organizational clarity and alignment, moving leaders from directing teams to involving them in decisions.",

    meta: [
      { label: "Engagement", value: "Multi-session leadership pilot + facilitator training" },
      { label: "Audience", value: "Department leaders and people leaders" },
      { label: "When", value: "Sessions Apr–Jun 2026, Training Feb 2026" },
      { label: "Deliverable", value: "Decision-Making Field Guide" },
      { label: "Context", value: "Under a 15% budget-cut mandate" },
    ],

    challengeHeading: "Pressure to execute — without alignment between leadership levels.",
    challengeBody: [
      "Junior leaders felt pressure to execute fast but wanted to slow down to speed up — to involve their teams in decisions rather than just directing them.",
      "And with a 15% budget-cut mandate hanging over the pilot, Campfire had to prove differentiated value from the first session.",
    ],
    challengePullQuote: {
      text: "There's just a lot of pressure to execute and get things done without a ton of alignment between the leadership levels.",
      attribution: "Ella Wright · Campfire facilitator",
    },

    approachHeading: "A sequenced pilot — five sessions, building on each other.",
    approachBody: [],
    approachAfterSteps:
      "The pivot — mid-pilot: Campfire split the room by leader level. Senior and junior leaders were separated so conversations could be tailored — and everyone felt safe to speak. Campfire also trained the technology company's internal facilitators to keep it running.",

    signature: {
      kind: "cricutSequence",
      sessions: [
        "Setting & Achieving Goals",
        "Leading Others Through Change",
        "Strategic Thinking",
        "Candid Communication",
        "Decision Making",
      ],
      capstoneIndex: 4,
      guideStat: "12 principles for sound decisions under pressure",
      guideBody:
        "Twelve principles for making sound calls under pressure — the tangible artifact leaders walked away with, and kept using after the pilot ended.",
    },

    outcomeHeading: "The Decision-Making Field Guide — and conversations by leader level.",
    outcomeBody: [
      "From the Campfire pilot update: Steve led a strategy session that was truly emergent, following the needs of the room.",
    ],
    outcomeQuotes: [
      {
        text: "Today's session went really well. I like conversations by leader level — the next couple of topics will also be more impactful by leader level.",
        attribution: "Josh Mecham · Department Leader",
      },
    ],

    ctaHeading: "Help your leaders slow down to speed up.",
    ctaBody:
      "A sequenced pilot that moves leaders from directing to involving — with a field guide they keep using.",
  },

  /* ───────── Family philanthropic foundation (DRAFT) ───────── */
  {
    slug: "huntsman",
    client: "Family philanthropic foundation",
    orgSize: "small (~50 staff)",
    draft: true,
    accent: "#B23B9F",
    accentSoft: "#FAEAF5",
    engagement: "Foundation Offsite",
    hook: "Two foundations and their friction into one shared mission.",
    cardStat: "2 bold missions into one shared purpose",
    cardQuote: { text: "", attribution: "Chief Operating Officer" },
    cardNote:
      "A purpose-driven offsite designed to align diverse teams.",

    eyebrow: "Clarity & Alignment · Purpose-Driven Offsite · Family philanthropic foundation",
    headline: "One mission, two missions, one direction.",
    intro:
      "A half-day offsite to heal friction between entities and align a foundation's teams — integrating its cancer and mental-health missions into one shared purpose.",

    meta: [
      { label: "Engagement", value: "Half-day offsite, facilitation + design" },
      { label: "Audience", value: "Foundation team & leadership" },
      { label: "When", value: "Offsite week of Jan 28, 2025" },
      { label: "Facilitator", value: "Steve Arntz, Campfire" },
      { label: "Partner", value: "Celeste Merrill, Managing Director" },
    ],

    challengeHeading: "Wounds between entities — and two missions pulling in different directions.",
    challengeBody: [
      "The foundation needed to heal wounds between its entities and build a more purpose-driven, collaborative culture across a diverse group of attendees.",
      "Two distinct missions — cancer and mental health — needed to feel like one direction, with stronger communication, shared goals, and accountability to donors.",
    ],
    challengePullQuote: {
      text: "Heal the wounds between the entities — and align everyone around a unified mission.",
      attribution: "The brief · Family philanthropic foundation",
    },

    approachHeading: "An offsite designed around connection and shared purpose.",
    approachBody: [
      "Steve Arntz partnered with Celeste Merrill to design and facilitate an agenda built to foster openness and authenticity across teams — and to integrate the foundation's two missions into one direction.",
    ],

    agendaHeading: "The arc of the day.",
    agenda: [
      { title: "Connection first", body: "Open the room with authenticity — people before agenda." },
      { title: "Name the friction", body: "Surface the wounds between entities in a space safe enough to speak." },
      { title: "Find shared purpose", body: "Integrate the cancer and mental-health missions into one direction." },
    ],

    signature: {
      kind: "huntsmanDiagram",
      left: "Cancer mission",
      right: "Mental-health mission",
      result: "One unified purpose",
    },

    outcomeHeading: "The clearest signal of value: they kept coming back.",
    outcomeBody: [
      "The offsite built a foundation of openness and authenticity across teams that had been holding friction at a distance.",
      "The strongest proof point isn't a metric — it's the relationship. Celeste Merrill went on to become a recurring Campfire collaborator, returning for further work.",
    ],
    outcomeQuotes: [],
    pendingNote: "Formal recap & quote pending sign-off from Celeste Merrill",
    outcomeStat: "A one-time offsite became an ongoing partnership",

    ctaHeading: "Align your teams around one shared purpose.",
    ctaBody:
      "A purpose-driven offsite that heals friction and turns separate missions into one direction.",
  },

  /* ───────── Drug discovery biotech (DRAFT) ───────── */
  {
    slug: "enveda",
    client: "Drug discovery biotech",
    draft: true,
    accent: "#0E9488",
    accentSoft: "#E4F4F2",
    engagement: "Executive Offsite",
    hook: "Execs learn to disagree openly and fully commit",
    cardStat: "Trust → productive conflict",
    cardQuote: { text: "", attribution: "" },
    cardNote:
      "A half-day on trust and Strengths for a fast-scaling biotech leadership team.",

    eyebrow: "Clarity & Alignment · Executive Trust Offsite · Drug discovery biotech",
    headline: "Trust first. Then disagree well.",
    intro:
      "An executive-team offsite for a fast-scaling biotech — using strengths profiling and the Five Dysfunctions framework to build trust and productive conflict.",

    meta: [
      { label: "Engagement", value: "Executive offsite, Trust + Strengths" },
      { label: "Audience", value: 'The biotech executive "S-team"' },
      { label: "When", value: "June 24–25, 2023, Boulder, CO" },
      { label: "Facilitator", value: "Megan Galloway, Campfire co-founder" },
      { label: "Sponsor", value: "Robert Buckley, Head of HR" },
    ],

    challengeHeading: "A leadership team scaling fast — without the trust to disagree openly.",
    challengeBody: [
      'Robert Buckley invited Campfire to run a working session for the executive team focused on trust — the ability to disagree openly and still "disagree and commit."',
      "As the company scaled fast, the team needed higher trust, better listening, and a shared way to balance speed with alignment.",
    ],
    challengePullQuote: {
      text: "How do we build the trust to disagree — and still commit as a team?",
      attribution: "Robert Buckley · Head of HR",
    },

    approachHeading: "Anchored the offsite on the Five Dysfunctions — starting with trust.",
    approachBody: [
      "The target: get to Level 2 — productive conflict, built on a foundation of trust.",
    ],

    agendaHeading: "Inside the session.",
    agenda: [
      { title: "Strengths profiling", body: '"What happens when we all bring different strengths to a team?"' },
      { title: "Who do we want to be?", body: "Defining the team's identity and operating norms together." },
      { title: "The disagreement spectrum", body: '"How do we balance speed with alignment?" — choosing how to disagree.' },
    ],

    signature: {
      kind: "envedaPyramid",
      levels: ["Trust — the foundation", "Productive conflict", "Commitment", "Accountability", "Results"],
      targetIndex: 1,
    },

    outcomeHeading: "Honest conversation opened up — and stayed open for years.",
    outcomeBody: [
      "The executive team was thankful for the facilitation — the session opened up honest conversation about how the team makes decisions and handles disagreement.",
      "The biotech went on to become a multi-year Campfire customer, continuing the relationship through 2026.",
    ],
    outcomeQuotes: [],
    pendingNote: "Formal quote pending sign-off from Robert Buckley",
    outcomeStat: "3+ years as a Campfire customer, and counting",

    ctaHeading: "Build the trust to disagree well.",
    ctaBody:
      "An executive offsite that turns trust into productive conflict — and helps fast-scaling teams decide together.",
  },
];

/** Index-card display order (Website Copy.md §8). */
export const INDEX_ORDER = [
  "utah-business",
  "ypo",
  "cotopaxi",
  "dermalogica",
  "cricut",
  "huntsman",
  "enveda",
] as const;

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

export const ALL_SLUGS = CASES.map((c) => c.slug);
