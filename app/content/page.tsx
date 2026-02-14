import Link from "next/link";
import Image from "next/image";

export default function ContentPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#6E3FCC] topo-pattern py-20">
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              Content &amp; Frameworks
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Content for Every Leadership Challenge
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Research-backed content for your leaders&apos; unique
              challenges&mdash;designed to move beyond awareness and create
              lasting behavior change.
            </p>
          </div>
        </div>
      </section>

      {/* Grounded in Proven Leadership Frameworks */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Grounded in Proven Leadership Frameworks
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Our content draws from established leadership research and proven
              models&mdash;translated into practical development leaders can
              apply immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Communication & Feedback",
                desc: "We integrate proven approaches to feedback, coaching, and adaptive leadership to help managers communicate clearly and lead with confidence.",
                tags: ["Radical Candor", "Coaching Models", "Situational Leadership"],
              },
              {
                title: "Culture & Mindset",
                desc: "Our content is informed by research on trust, learning, and human potential to help teams create environments where people can do their best work.",
                tags: ["Psychological Safety", "Growth Mindset", "Strengths-Based Development"],
              },
              {
                title: "Change & Team Performance",
                desc: "We apply established models of change and team dynamics to strengthen alignment, accountability, and execution across teams.",
                tags: ["Change Management", "Team Effectiveness"],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#F5F4F1] rounded-2xl p-8 border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
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

      {/* Our Approach to Behavior Change */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Approach to Behavior Change
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              We don&apos;t just share insights&mdash;we design experiences that
              turn proven frameworks into everyday leadership habits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Built for Conversation, Not Consumption",
                desc: "Learning happens through dialogue. Our content is designed to be discussed, reflected on, and applied together\u2014not passively consumed.",
              },
              {
                title: "Practical by Design",
                desc: "Every session translates proven frameworks into clear language, usable tools, and concrete leadership moments.",
              },
              {
                title: "Reinforced Over Time",
                desc: "Behavior change requires repetition. Skills are revisited and strengthened so growth compounds instead of fading.",
              },
              {
                title: "Relevant to Real Leadership",
                desc: "Content is built around the actual pressures leaders face\u2014so development feels useful, not theoretical.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
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

      {/* More Than Content. A Structured System. */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              More Than Content. A Structured System.
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Most leadership solutions deliver information. Campfire delivers a
              cohesive system designed to create consistent leadership behavior
              across teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-4xl mx-auto">
            {/* Traditional side */}
            <div className="bg-gray-200 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-8">
              <h3 className="font-bold text-gray-900 mb-6">
                Traditional Leadership Content
              </h3>
              <ul className="space-y-4 text-sm text-gray-600">
                {[
                  "Pre-recorded and consumed alone",
                  "Built for scale, not relevance",
                  "Measured by completion",
                  "One-time exposure",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-gray-400 mt-0.5 font-bold">&times;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Campfire side */}
            <div className="bg-[#6E3FCC] rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none p-8 text-white">
              <h3 className="font-bold mb-6">Campfire</h3>
              <ul className="space-y-4 text-sm text-white/90">
                {[
                  "Live, facilitated discussion",
                  "Built around your team\u2019s real challenges",
                  "Measured by behavior change",
                  "Reinforced over time",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-white mt-0.5 font-bold">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* A Complete Leadership Development Library */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              A Complete Leadership Development Library
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              A growing collection of live, discussion-based workshops organized
              around the real challenges leaders face today.
            </p>
          </div>

          {/* Library visualization */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                "Giving Feedback",
                "Leading 1:1s",
                "Managing Change",
                "Building Trust",
                "Coaching Skills",
                "Strategic Thinking",
                "Delegation",
                "Conflict Resolution",
                "New Manager",
                "Team Alignment",
                "Decision Making",
                "Accountability",
              ].map((topic) => (
                <div
                  key={topic}
                  className="bg-[#F8F5FC] rounded-lg px-3 py-4 text-center border border-[#6E3FCC]/10"
                >
                  <p className="text-xs font-medium text-[#6E3FCC]">{topic}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-100">
              <span className="text-sm font-semibold text-gray-700">50+ workshops</span>
              <span className="text-gray-300">&middot;</span>
              <span className="text-sm font-semibold text-gray-700">Modular sessions</span>
              <span className="text-gray-300">&middot;</span>
              <span className="text-sm font-semibold text-gray-700">Preset bundles</span>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="https://tools.getcampfire.com/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-3.5 text-sm font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
            >
              Explore the Full Library
            </a>
          </div>
        </div>
      </section>

      {/* Flexible Access to Fit Your Team */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Flexible Access to Fit Your Team
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Whether you need focused development or a comprehensive program,
              Campfire provides flexible options for your team&apos;s goals and
              timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tag: "Quick Start",
                title: "Individual Sessions",
                desc: "Run a single live workshop to address a specific leadership challenge when it matters most.",
                featured: false,
              },
              {
                tag: "Most Popular",
                title: "Full Library",
                desc: "Ongoing access to the complete catalog, allowing you to run sessions as needs arise across teams.",
                featured: true,
              },
              {
                tag: "Targeted",
                title: "Focused Bundles",
                desc: "A curated series focused on a specific leadership need, delivered over time to drive meaningful progress.",
                featured: false,
              },
            ].map((option) => (
              <div
                key={option.title}
                className={`rounded-2xl p-8 border ${
                  option.featured
                    ? "bg-[#6E3FCC] text-white border-[#6E3FCC] shadow-lg shadow-purple-200 md:scale-105 md:-my-2"
                    : "bg-[#F5F4F1] text-gray-900 border-gray-100"
                }`}
              >
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    option.featured
                      ? "bg-white/20 text-white"
                      : "bg-[#6E3FCC]/10 text-[#6E3FCC]"
                  }`}
                >
                  {option.tag}
                </span>
                <h3 className="text-xl font-bold mt-4 mb-3">{option.title}</h3>
                <p
                  className={`text-sm leading-relaxed ${
                    option.featured ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {option.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Options, Built for You */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Custom Options, Built for You
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              We work with you to tailor content so development reflects your
              culture, language, and priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                option: "Option 1",
                title: "Session Branding",
                desc: "Integrate your language, values, and internal frameworks into existing sessions\u2014with light content adjustments to reflect your context.",
              },
              {
                option: "Option 2",
                title: "Fully Custom",
                desc: "Partner with us to design and build entirely new sessions aligned to your priorities, initiatives, or internal strategy.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 border border-gray-100"
              >
                <p className="text-xs font-bold text-[#6E3FCC] tracking-wider uppercase mb-3">
                  {item.option}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
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
      <section
        className="relative overflow-hidden py-20"
        style={{
          backgroundImage: "url('/purple-topo-tall.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Explore What&apos;s Possible for Your Team
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Schedule a conversation to review the library, discuss your
            priorities, and design an approach that fits.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block px-8 py-4 text-sm font-semibold leading-none text-white rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide shadow-lg"
            style={{ backgroundColor: "#E055CB" }}
          >
            Book a Call
          </Link>
        </div>
      </section>
    </main>
  );
}
