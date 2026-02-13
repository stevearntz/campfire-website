import Link from "next/link";

export default function SolutionsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#6E3FCC] topo-pattern py-20">
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Practical Support for Real Challenges
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Campfire supports the leadership moments your managers face every
              day, with solutions that adapt to your culture and scale to your
              entire organization.
            </p>
          </div>
        </div>
      </section>

      {/* Our Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Solutions
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Whether you&apos;re supporting new managers or navigating change,
              Campfire helps you design and deliver leadership development to fit
              your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Equip New & Growing Managers",
                desc: "Support new and recently promoted managers as they step into leadership with clarity and confidence. Help them move from individual contributor to trusted leader without losing momentum.",
                tags: ["Identity shift", "Lead former peers", "Set expectations early"],
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
              },
              {
                title: "Lead Through Change & Uncertainty",
                desc: "Empower leaders to guide their teams through ambiguity with steadiness and credibility. Strengthen their ability to communicate clearly and maintain trust during transition.",
                tags: ["Communicate vision", "Rebuild trust", "Sustain focus"],
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ),
              },
              {
                title: "Strengthen Team Culture & Alignment",
                desc: "Build a shared foundation that reduces friction and improves how teams work together. Align expectations, decision-making, and accountability across the organization.",
                tags: ["Psychological safety", "Clear priorities", "Shared accountability"],
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                ),
              },
              {
                title: "Build Everyday Manager Skills",
                desc: "Strengthen the core habits that shape how managers show up each day. Turn routine leadership moments into opportunities for growth and performance.",
                tags: ["Effective 1:1s", "Coaching for development", "Performance feedback"],
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ),
              },
            ].map((solution) => (
              <div
                key={solution.title}
                className="bg-[#F5F4F1] rounded-2xl p-8 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-[#6E3FCC]/10 flex items-center justify-center text-[#6E3FCC] mb-5">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {solution.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {solution.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#6E3FCC]/10 text-[#6E3FCC]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campfire vs. Traditional Solutions */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Campfire vs. Traditional Solutions
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Campfire is a complete system for leadership growth that provides
              the structure, reinforcement, and support needed to build
              leadership capability company-wide.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              {
                title: "Self-paced or E-learning",
                problem:
                  "People don't change behavior by watching videos. Without real conversation, reflection, and reinforcement, most learning fades quickly and never shows up in daily leadership moments.",
                solution:
                  "Campfire pairs practical content with live, facilitated conversation and reinforcement over time — so skills are discussed, practiced, and applied in real leadership moments.",
              },
              {
                title: "Executive Coaching",
                problem:
                  "Coaching is powerful — but expensive and limited to a small group. It rarely creates shared language or consistent leadership habits across an organization.",
                solution:
                  "Campfire builds capability across teams, not just individuals, creating consistent leadership practices that scale beyond a few senior leaders.",
              },
              {
                title: "Building In-House",
                problem:
                  "Building programs internally takes time, coordination, and expertise most lean teams don't have. Efforts often stall, lose momentum, or become inconsistent.",
                solution:
                  "Campfire provides the structure, facilitation, and support needed to run leadership development smoothly — without adding headcount or operational burden.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Problem side */}
                  <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.problem}
                    </p>
                  </div>

                  {/* Campfire side */}
                  <div className="p-8 bg-[#F8F5FC]">
                    <h4 className="text-sm font-bold text-[#6E3FCC] mb-3">
                      How Campfire is Different
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/content"
              className="inline-flex items-center gap-2 text-[#6E3FCC] font-semibold text-sm hover:underline"
            >
              Learn more about programs you can run inside Campfire
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How to Get Started
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Getting started with Campfire is straightforward and designed to
              fit your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Identify Your Priority",
                desc: "Choose the leadership challenge that matters most right now.",
              },
              {
                step: "2",
                title: "Design Your Approach",
                desc: "Select the sessions and format that fit your goals, culture, and timeline.",
              },
              {
                step: "3",
                title: "Launch and Reinforce",
                desc: "Deliver live experiences and reinforce skills over time so growth compounds.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#6E3FCC] text-white text-lg font-bold flex items-center justify-center mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#5B34AB] topo-pattern py-20">
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Not sure where to start?
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Schedule a conversation with us, and we&apos;ll help you figure
              out what your managers need most right now.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block px-8 py-4 text-sm font-semibold text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
