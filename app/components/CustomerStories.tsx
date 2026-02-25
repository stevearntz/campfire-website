"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface CustomerStory {
  company: string;
  logo: string;
  logoW: number;
  logoH: number;
  logoCls: string;
  tagline: string;
  headerBg: string;
  personName: string;
  personTitle: string;
  personImage: string;
  quote: string;
  hired: string;
  together: string;
  results: string[];
}

// TODO: Replace placeholder personName, personTitle, personImage, quote, and headerBg
// with real data once the user provides assets and colors.
const stories: CustomerStory[] = [
  {
    company: "Cotopaxi",
    logo: "/cotopaxi-customers.webp",
    logoW: 155,
    logoH: 73,
    logoCls: "h-10 md:h-12",
    tagline: "\u201cBuilding a Culture That Drives Outcomes\u201d",
    headerBg: "linear-gradient(135deg, #F75327, #F96D3F)",
    personName: "Liz Berry",
    personTitle: "Sr. Manager, Talent Development",
    personImage: "/liz-customers.webp",
    quote:
      "Campfire has been a game-changer for our small team of two, helping us deliver meaningful content across the entire organization. Acting as a true extension of our team, they don\u2019t just facilitate trainings \u2014 they collaborate with us as thought partners and co-creators to build materials tailored to our specific needs and goals. Thanks to Campfire\u2019s people and platform, we\u2019ve been able to create an engaging, collaborative learning and development program that reaches employees at every level.",
    hired:
      "Cotopaxi partnered with Campfire during a period of organizational change. They wanted leadership development that reinforced their values and translated culture into daily behaviors.",
    together:
      "We created a leadership program using content from the Campfire library, shaped by Cotopaxi\u2019s leadership principles and values. After the first year, we continued running the aspiring leaders cohort while creating an elevated program with peer coaching and senior leadership sponsors for experienced leaders. We also partnered on quarterly culture initiatives centered around belonging and diversity.",
    results: [
      "Multi-level leadership pathways across emerging and experienced leaders",
      "Clear alignment between company values and leadership behaviors",
      "Executive partnership in defining and training to core behaviors",
      "A hybrid facilitation model \u2014 internal facilitators + Campfire",
      "Sustained program participation across multiple years",
    ],
  },
  {
    company: "Dermalogica",
    logo: "/dermalogica-customers.webp",
    logoW: 586,
    logoH: 84,
    logoCls: "h-6 md:h-7",
    tagline: "\u201cCreating Space for Leaders to Grow\u201d",
    headerBg: "linear-gradient(135deg, #5B676E, #6E7A82)",
    personName: "Lola Russek",
    personTitle: "People Team Leader",
    personImage: "/lola-customers.webp",
    quote:
      "Campfire has been a true breath of fresh air at Dermalogica. It\u2019s helping us intentionally build a culture of continuous learning and development while bringing leaders and teams together in meaningful, cross-functional ways.\n\nEach session creates space to pause, reflect, and connect \u2014 not just to ideas, but to each other. The shared language and practical frameworks we\u2019re building are showing up in real conversations and real business impact. People aren\u2019t just attending; they\u2019re engaging, contributing, and asking for more.\n\nCampfire is more than a session \u2014 it sparks connection, inspires growth, challenges thinking, and leaves us energized with tools we can immediately apply. It\u2019s exciting to see learning being used so intentionally to support both our people and our business.",
    hired:
      "Dermalogica wanted to strengthen their culture of learning and create space for leaders to come together around real challenges. They weren\u2019t looking for a one-time event \u2014 they wanted a system they could run and evolve.",
    together:
      "We trained internal facilitators to lead a year-long calendar of sessions aligned to company priorities. As the business shifted, the program adapted \u2014 sessions were customized based on feedback, current initiatives, and emerging leadership needs.",
    results: [
      "Internal facilitators enabled across departments and regions",
      "Custom sessions delivered at leadership offsites for 40+ leaders",
      "Increased voluntary participation and repeat attendance",
      "Ongoing engagement analysis to refine programming",
      "Expanded into career development initiatives",
    ],
  },
  {
    company: "Enveda",
    logo: "/enveda-customers.webp",
    logoW: 132,
    logoH: 41,
    logoCls: "h-7 md:h-9",
    tagline: "\u201cBuilding a Culture That Drives Outcomes\u201d",
    headerBg: "linear-gradient(135deg, #D11384, #DA2E96)",
    personName: "Robert Buckley",
    personTitle: "Chief People Architect",
    personImage: "/robert-customers.webp",
    quote:
      "Campfire is a cornerstone of how we build leaders at Enveda. They partnered with us to co-create a leadership model. They helped us translate big ideas into a clear curriculum \u2014 a scalable program our managers actually use! Sessions range from trust and self-awareness to coaching, candid communication, and leading the organization with vision and strategy. Their platform and guides make leadership development feel human and actionable. The result is a shared language for leadership, stronger manager confidence, and training that\u2019s consistent across leaders and teams without becoming rigid or generic. Campfire is a true partner.",
    hired:
      "Enveda already had leadership development in motion. They needed a partner to strengthen it, fill strategic gaps, and reduce operational lift. They didn\u2019t want to start over \u2014 they wanted to build on what was working.",
    together:
      "We layered Campfire into their existing leadership efforts \u2014 supporting scheduling, facilitation, and custom content aligned to current initiatives. We complemented their work instead of replacing it.",
    results: [
      "Two active cohorts with consistent waitlists",
      "Strong participation across new and experienced leaders",
      "Reduced administrative burden for internal teams",
      "Increased manager engagement and leadership momentum",
      "Ongoing partnership in shaping long-term leadership strategy",
    ],
  },
  {
    company: "Plusgrade",
    logo: "/plusgrade-customers.webp",
    logoW: 402,
    logoH: 67,
    logoCls: "h-7 md:h-9",
    tagline: "\u201cScaling Leadership Development\u201d",
    headerBg: "linear-gradient(135deg, #202020, #2E2E2E)",
    personName: "Sydney Hamilton",
    personTitle: "VP Talent Development",
    personImage: "/sydney-customers.webp",
    quote:
      "I would need to hire facilitators, content developers, and program managers to run the types of programs that Campfire runs for me and my teams. On top of that, the experiences are just so great!",
    hired:
      "Plusgrade wanted leadership development that felt fully theirs \u2014 not outsourced. They also needed support scaling it across a growing organization without increasing internal lift.",
    together:
      "We co-created a fully branded leadership development experience in Plusgrade\u2019s language and identity. To participants, it felt built from scratch. Behind the scenes, Campfire handled structure, facilitation, and administration. In year one alone, we facilitated 50+ sessions.",
    results: [
      "50+ facilitated sessions in year one",
      "High engagement and positive participant feedback",
      "Increased demand across departments",
      "Internal facilitation capability built over time",
      "A scalable leadership system aligned to Plusgrade\u2019s voice",
    ],
  },
];

export default function CustomerStories() {
  const [openCards, setOpenCards] = useState<Set<number>>(new Set([0]));
  const [expandedQuotes, setExpandedQuotes] = useState<Set<number>>(
    new Set()
  );
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleCard = useCallback((i: number) => {
    setOpenCards((prev) => {
      if (prev.has(i)) {
        // Closing this card
        setOverlayIndex((oi) => (oi === i ? null : oi));
        setExpandedQuotes((eq) => {
          const n = new Set(eq);
          n.delete(i);
          return n;
        });
        return new Set();
      } else {
        // Open this card, close all others
        setOverlayIndex(null);
        setExpandedQuotes(new Set());
        return new Set([i]);
      }
    });
  }, []);

  const handleReadMore = useCallback(
    (i: number) => {
      if (isMobile) {
        setExpandedQuotes((prev) => {
          const next = new Set(prev);
          if (next.has(i)) next.delete(i);
          else next.add(i);
          return next;
        });
      } else {
        setOverlayIndex(i);
      }
    },
    [isMobile]
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 space-y-6">
        {stories.map((story, i) => {
          const isOpen = openCards.has(i);
          const quoteExpanded = expandedQuotes.has(i);

          return (
            <div
              key={story.company}
              className="relative rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Gradient left border */}
              <div
                className="absolute left-0 top-0 w-1 h-full z-10"
                style={{
                  background:
                    "linear-gradient(to bottom, #EE81DD, #6E3FCC)",
                }}
              />

              {/* Header bar — always visible */}
              <button
                onClick={() => toggleCard(i)}
                className="w-full flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer transition-colors"
                style={{
                  background: story.headerBg,
                  borderRadius: isOpen
                    ? "0.75rem 0.75rem 0 0"
                    : "0.75rem",
                }}
              >
                <Image
                  src={story.logo}
                  alt={story.company}
                  width={story.logoW}
                  height={story.logoH}
                  className={`${story.logoCls} w-auto brightness-0 invert shrink-0`}
                />
                <p className="flex-1 text-left text-lg md:text-xl font-bold text-white">
                  {story.tagline}
                </p>
                {/* Chevron in circle */}
                <div
                  className={`shrink-0 w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center transition-transform duration-300 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-white"
                  >
                    <path
                      d="M4.5 2.5L8 6L4.5 9.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              {/* Expandable content panel */}
              <div
                className="grid transition-all duration-300 ease-in-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                }}
              >
                <div className="overflow-hidden">
                  <div className="p-8">
                    {overlayIndex === i ? (
                      /* Full-quote view — replaces normal content */
                      <div className="animate-fade-in">
                        <div className="flex justify-end mb-4">
                          <button
                            onClick={() => setOverlayIndex(null)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Close quote"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <path
                                d="M3 3L11 11M11 3L3 11"
                                stroke="#666"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="max-w-3xl mx-auto">
                          <div className="text-base md:text-lg text-gray-700 italic leading-relaxed mb-6 space-y-3">
                            {story.quote.split("\n\n").map((para, pi, arr) => (
                              <p key={pi}>
                                {pi === 0 && "\u201c"}
                                {para}
                                {pi === arr.length - 1 && "\u201d"}
                              </p>
                            ))}
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 shrink-0">
                              <Image
                                src={story.personImage}
                                alt={story.personName}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">
                                {story.personName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {story.personTitle}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Normal expanded content */
                      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_1fr] gap-8">
                        {/* Person column */}
                        <div>
                          <div className="flex items-center gap-3 mb-4 md:block">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-200 shrink-0 md:mb-3">
                              <Image
                                src={story.personImage}
                                alt={story.personName}
                                width={226}
                                height={226}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">
                                {story.personName}{" "}
                                <span className="font-normal text-gray-500">
                                  {story.personTitle}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div>
                            {quoteExpanded ? (
                              <div className="text-gray-600 italic text-sm leading-relaxed space-y-3">
                                {story.quote.split("\n\n").map((para, pi, arr) => (
                                  <p key={pi}>
                                    {pi === 0 && "\u201c"}
                                    {para}
                                    {pi === arr.length - 1 && "\u201d"}
                                  </p>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-600 italic text-sm leading-relaxed line-clamp-3 md:line-clamp-4">
                                &ldquo;{story.quote.replace(/\n\n/g, " ")}&rdquo;
                              </p>
                            )}
                            <button
                              onClick={() => handleReadMore(i)}
                              className="text-[#6E3FCC] text-sm font-semibold mt-2 hover:underline cursor-pointer"
                            >
                              {quoteExpanded && isMobile
                                ? "show less"
                                : "read more..."}
                            </button>
                          </div>
                        </div>

                        {/* Narrative column */}
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-sm font-bold text-[#6E3FCC] uppercase tracking-wider mb-2">
                              Hired us to...
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {story.hired}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#6E3FCC] uppercase tracking-wider mb-2">
                              Together we...
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {story.together}
                            </p>
                          </div>
                        </div>

                        {/* Results column */}
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                            Results
                          </h4>
                          <ul className="space-y-2">
                            {story.results.map((result) => (
                              <li
                                key={result}
                                className="flex items-start gap-2 text-sm text-gray-600"
                              >
                                <span className="text-[#6E3FCC] mt-0.5 shrink-0">
                                  &#10003;
                                </span>
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
