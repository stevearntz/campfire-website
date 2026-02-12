"use client";

import Image from "next/image";

const steps = [
  {
    time: "0–5 min",
    title: "Check-in",
    detail:
      "The facilitator opens with a prompt: \"What's one leadership moment from this week that stuck with you?\" Sarah shares that she froze during a tough 1:1. Others nod — they've been there too.",
  },
  {
    time: "5–20 min",
    title: "Framework",
    detail:
      "The facilitator introduces a practical model for navigating difficult conversations — not theory from a textbook, but a simple structure Sarah can use in her next meeting.",
  },
  {
    time: "20–40 min",
    title: "Breakout discussion",
    detail:
      "In a small group of four, Sarah practices applying the framework to her real situation. Her peers ask questions she hadn't considered. She starts to see her 1:1 differently.",
  },
  {
    time: "40–55 min",
    title: "Group debrief",
    detail:
      "The full group reconvenes. A few managers share breakthroughs from their breakouts. The facilitator connects patterns and reinforces the key concepts.",
  },
  {
    time: "55–60 min",
    title: "Commitment",
    detail:
      "Sarah writes one specific thing she'll do differently before the next session. She picks: \"I'll use the framework in my 1:1 with Jordan on Thursday.\" She leaves with a plan, not just notes.",
  },
];

export default function SessionWalkthrough() {
  return (
    <section className="py-20 bg-[#F5F4F1]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Sessions that{" "}
            <span className="text-[#6E3FCC]">drive behavior change</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            What it actually feels like when your managers show up to a Campfire
            workshop.
          </p>
        </div>

        {/* Persona card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10 mb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Image
              src="/Ashley.png"
              alt="Sarah, an engineering director"
              width={200}
              height={200}
              className="w-20 h-20 rounded-full object-cover shrink-0"
            />
            <div>
              <p className="text-xs font-semibold text-[#6E3FCC] tracking-wider uppercase mb-1">
                Meet Sarah
              </p>
              <p className="text-gray-900 font-semibold">
                Engineering Director at a 300-person company
              </p>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Sarah was promoted six months ago and now leads three teams. She's
                strong technically but struggling with the people side — especially
                difficult conversations. Her VP suggested she join the next
                Campfire session on{" "}
                <span className="font-medium text-gray-700">
                  Navigating Difficult Conversations
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] md:left-[27px] top-4 bottom-4 w-px bg-[#6E3FCC]/15 hidden sm:block" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={step.title} className="flex gap-5 sm:gap-8">
                {/* Dot */}
                <div className="relative shrink-0 pt-1 hidden sm:block">
                  <div
                    className="w-[13px] h-[13px] rounded-full border-2 border-[#6E3FCC] bg-white"
                    style={{
                      opacity: 0.4 + i * 0.15,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex-1">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="text-xs font-mono font-semibold text-[#6E3FCC]/60">
                      {step.time}
                    </span>
                    <h3 className="text-base font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outcome */}
        <div className="mt-10 bg-[#6E3FCC] rounded-2xl p-8 md:p-10 text-white">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <svg
              className="w-10 h-10 shrink-0 opacity-60"
              viewBox="0 0 40 40"
              fill="none"
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M14 20L18 24L26 16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <h3 className="text-lg font-bold mb-2">The following week</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Sarah used the framework in her 1:1 with Jordan. The conversation
                wasn't easy, but it was clearer and more productive than anything
                she'd tried before. At the next Campfire session, she shared what
                happened — and two other managers asked to learn the same approach.
                That's how behavior change spreads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
