import type { Metadata } from "next";
import Link from "next/link";
import SecretScale from "../components/SecretScale";
import TypeTrigger from "../components/TypeTrigger";

export const metadata: Metadata = {
  title: "Solutions — Scalable Leadership Programs",
  description:
    "Campfire supports the leadership moments your managers face every day, with solutions that adapt to your culture and scale to your entire organization.",
  openGraph: {
    title: "Solutions — Scalable Leadership Programs",
    description:
      "Practical support for real challenges. Solutions that adapt to your culture and scale to your entire organization.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Campfire Leadership Development",
  provider: {
    "@type": "Organization",
    name: "Campfire",
    url: "https://getcampfire.com",
  },
  serviceType: "Leadership Development",
  description:
    "Scalable leadership development programs including live workshops, cohort-based learning, and custom content for growing companies.",
  audience: {
    "@type": "Audience",
    audienceType: "HR leaders, L&D teams, Talent development professionals",
  },
};

export default function SolutionsPage() {
  return (
    <main>
      <TypeTrigger word="solve" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="py-20" style={{ backgroundImage: "url('/clear-topo.webp'), linear-gradient(to left, #EE81DD 13%, #BB4FDD 47%, #8B30D7 100%)", backgroundSize: "100% auto, cover", backgroundPosition: "center, center" }}>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              Solutions
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Practical support for real challenges
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Campfire supports the leadership moments your managers face every
              day, with solutions that adapt to your culture and <SecretScale /> to your
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
              Our solutions
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
                title: "Equip new & growing managers",
                desc: "Support new and recently promoted managers as they step into leadership with clarity and confidence. Help them move from individual contributor to trusted leader without losing momentum.",
                tags: ["Identity shift", "Lead former peers", "Set expectations early"],
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
              },
              {
                title: "Lead through change & uncertainty",
                desc: "Empower leaders to guide their teams through ambiguity with steadiness and credibility. Strengthen their ability to communicate clearly and maintain trust during transition.",
                tags: ["Communicate vision", "Rebuild trust", "Sustain focus"],
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ),
              },
              {
                title: "Strengthen team culture & alignment",
                desc: "Build a shared foundation that reduces friction and improves how teams work together. Align expectations, decision-making, and accountability across the organization.",
                tags: ["Psychological safety", "Clear priorities", "Shared accountability"],
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                ),
              },
              {
                title: "Build everyday manager skills",
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
                className="bg-[#F8F5FC] rounded-2xl p-8 border border-gray-100"
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
      <section className="py-20 bg-[#F8F5FC]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Campfire vs. traditional solutions
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Campfire is a complete system for leadership growth that provides
              the structure, reinforcement, and support needed to build
              leadership capability company-wide.
            </p>
          </div>

          {/* Column headers */}
          <div className="hidden md:grid grid-cols-2 gap-6 max-w-4xl mx-auto mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-8">
              The Common Approach
            </p>
            <p className="text-xs font-bold text-[#6E3FCC] uppercase tracking-wider px-8">
              The Campfire Difference
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              {
                title: "Self-paced or e-learning",
                campfireTitle: "Built for real conversation",
                problem:
                  "People don't change behavior by watching videos. Without real conversation, reflection, and reinforcement, most learning fades quickly and never shows up in daily leadership moments.",
                solution:
                  "Campfire pairs practical content with live, facilitated conversation and reinforcement over time — so skills are discussed, practiced, and applied in real leadership moments.",
              },
              {
                title: "Executive coaching",
                campfireTitle: "Leadership development that scales",
                problem:
                  "Coaching is powerful — but expensive and limited to a small group. It rarely creates shared language or consistent leadership habits across an organization.",
                solution:
                  "Campfire builds capability across teams, not just individuals, creating consistent leadership practices that scale beyond a few senior leaders.",
              },
              {
                title: "Building in-house",
                campfireTitle: "Ready to run, without the lift",
                problem:
                  "Building programs internally takes time, coordination, and expertise most lean teams don't have. Efforts often stall, lose momentum, or become inconsistent.",
                solution:
                  "Campfire provides the structure, facilitation, and support needed to run leadership development smoothly — without adding headcount or operational burden.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100">
                  {/* Problem side */}
                  <div className="p-8 bg-white md:rounded-l-2xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.problem}
                    </p>
                  </div>

                  {/* Campfire side */}
                  <div className="p-8 md:rounded-r-2xl" style={{ backgroundImage: "url('/purple-topo.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <h4 className="text-lg font-bold text-white mb-3">
                      {item.campfireTitle}
                    </h4>
                    <p className="text-white/90 text-sm leading-relaxed">
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
              className="inline-block px-7 py-3.5 text-sm font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
            >
              Explore Content
            </Link>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How to get started
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
                title: "Identify your priority",
                desc: "Choose the leadership challenge that matters most right now.",
              },
              {
                step: "2",
                title: "Design your approach",
                desc: "Select the sessions and format that fit your goals, culture, and timeline.",
              },
              {
                step: "3",
                title: "Launch and reinforce",
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
        <div className="py-20" style={{ backgroundImage: "url('/purple-topo-tall.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Not sure where to start?
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Schedule a conversation with us, and we&apos;ll help you figure out what your managers need most right&nbsp;now.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block px-8 py-4 text-sm font-semibold leading-none text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wide"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
