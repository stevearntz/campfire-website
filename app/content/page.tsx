import Link from "next/link";

export default function ContentPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#6E3FCC] topo-pattern py-20">
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Content That Changes Behavior
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Not another library of videos people never watch. Campfire content
              is designed to be experienced, discussed, and applied.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our philosophy
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Leadership isn&apos;t learned in a course. It&apos;s learned in
              conversation, through reflection, and by doing. That belief shapes
              everything we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Human first, always",
                desc: "We don't believe in leadership by checklist. Our content starts with the messy, human reality of leading people — and builds from there.",
              },
              {
                title: "Peer learning is the engine",
                desc: "The most powerful learning happens between peers who share real challenges. Every Campfire session is designed to unlock that exchange.",
              },
              {
                title: "Practice over theory",
                desc: "Knowing a framework is nice. Using it on Monday morning is the point. Every session ends with a concrete commitment to action.",
              },
              {
                title: "Short, focused, repeatable",
                desc: "Your managers are busy. Our sessions are 60–90 minutes, focused on one skill, and designed to be part of an ongoing rhythm — not a one-time event.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#F5F4F1] rounded-2xl p-8 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
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

      {/* How we're different */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Not your typical e-learning
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-4xl mx-auto">
            {/* E-Learning Column */}
            <div className="bg-gray-200 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-8">
              <h3 className="font-bold text-gray-900 mb-6">
                Traditional E-Learning
              </h3>
              <ul className="space-y-4 text-sm text-gray-600">
                {[
                  "Pre-recorded videos watched alone",
                  "Generic content for any industry",
                  "Completion rate is the metric",
                  "One-and-done experience",
                  "Passive consumption",
                  "No accountability or follow-through",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">&#10007;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Campfire Column */}
            <div className="bg-[#6E3FCC] rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none p-8 text-white">
              <h3 className="font-bold mb-6">Campfire</h3>
              <ul className="space-y-4 text-sm text-white/90">
                {[
                  "Live, facilitated workshops with real dialogue",
                  "Tailored to your team's actual challenges",
                  "Behavior change is the metric",
                  "Ongoing rhythm of development",
                  "Active participation and peer learning",
                  "Built-in accountability and application",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-white mt-0.5">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frameworks that leaders actually use
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Our content is built on proven frameworks from organizational
              psychology, behavioral science, and decades of leadership
              research.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Situational Leadership",
              "Radical Candor",
              "Growth Mindset",
              "Psychological Safety",
              "Strengths-Based Dev",
              "Coaching Models",
              "Change Management",
              "Team Effectiveness",
            ].map((fw) => (
              <div
                key={fw}
                className="bg-[#F5F4F1] rounded-xl p-4 text-center border border-gray-100"
              >
                <p className="text-sm font-medium text-gray-700">{fw}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Options */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Choose what works for you
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Three ways to bring Campfire to your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Bundles",
                desc: "Pre-packaged series of workshops around a theme — like New Manager Foundations or Leading Through Change. 4–6 sessions, ready to launch.",
                tag: "Quick Start",
                featured: false,
              },
              {
                title: "Library",
                desc: "Access our full catalog of standalone workshops and pick the topics your team needs most. Mix and match to build your own rhythm.",
                tag: "Most Popular",
                featured: true,
              },
              {
                title: "Custom Sessions",
                desc: "Need something specific? We'll work with you to design workshops tailored to your culture, challenges, and goals.",
                tag: "Tailored",
                featured: false,
              },
            ].map((option) => (
              <div
                key={option.title}
                className={`rounded-2xl p-8 border ${
                  option.featured
                    ? "bg-[#6E3FCC] text-white border-[#6E3FCC] shadow-lg shadow-purple-200 md:scale-105 md:-my-2"
                    : "bg-white text-gray-900 border-gray-100 shadow-sm"
                }`}
              >
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    option.featured
                      ? "bg-white/20 text-white"
                      : "bg-purple-50 text-[#6E3FCC]"
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

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Want to see the full content library?
          </h2>
          <p className="mt-4 text-gray-500">
            Book a call and we&apos;ll walk you through our workshops, bundles,
            and how they map to your team&apos;s needs.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block px-8 py-4 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors"
          >
            Book a Call
          </Link>
        </div>
      </section>
    </main>
  );
}
