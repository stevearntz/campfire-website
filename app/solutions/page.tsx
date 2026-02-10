import Link from "next/link";

const solutions = [
  {
    title: "New Manager Readiness",
    tagline: "Set first-time leaders up to succeed from day one.",
    description:
      "The leap from individual contributor to manager is one of the hardest transitions in a career. Most companies leave new managers to figure it out alone. Campfire gives them the frameworks, confidence, and peer support to lead well from the start.",
    topics: [
      "Making the identity shift from doer to leader",
      "Having difficult conversations early and often",
      "Setting expectations and giving feedback",
      "Building trust with a new team",
      "Managing former peers",
    ],
    color: "bg-[#6E3FCC]",
  },
  {
    title: "Leading Through Change",
    tagline: "Help managers lead their teams when everything is shifting.",
    description:
      "Reorgs, layoffs, strategy pivots, rapid growth — your managers are expected to keep their teams steady through all of it. Campfire equips them with the skills and mindset to lead through ambiguity, not just survive it.",
    topics: [
      "Communicating when you don't have all the answers",
      "Managing your own anxiety while supporting your team",
      "Rebuilding trust after disruption",
      "Keeping people focused during uncertainty",
      "Leading through grief and loss",
    ],
    color: "bg-[#7E4FD0]",
  },
  {
    title: "Building Belonging & Psychological Safety",
    tagline: "Create the conditions where people do their best work.",
    description:
      "High-performing teams don't happen by accident. They're built by managers who know how to create environments where people feel safe to speak up, take risks, and be themselves. This is the most requested topic from our clients — and the most impactful.",
    topics: [
      "Understanding what psychological safety actually means",
      "Recognizing and interrupting exclusion",
      "Creating space for honest dialogue",
      "Building inclusive team norms",
      "Moving from awareness to action",
    ],
    color: "bg-[#8F65D9]",
  },
  {
    title: "Manager Effectiveness",
    tagline: "Sharpen the core skills every manager needs.",
    description:
      "Great management isn't a personality trait — it's a set of learnable skills. Campfire's manager effectiveness workshops cover the fundamentals that separate good managers from great ones, delivered in a format that respects how busy they are.",
    topics: [
      "Running effective 1:1s that people actually value",
      "Delegation without micromanagement",
      "Coaching vs. directing — knowing when to use each",
      "Performance conversations that drive growth",
      "Managing energy, not just time",
    ],
    color: "bg-[#6E3FCC]",
  },
  {
    title: "Team Alignment",
    tagline: "Get everyone rowing in the same direction.",
    description:
      "Misalignment is the silent killer of momentum. When teams aren't clear on priorities, roles, or how decisions get made, everything slows down. Campfire helps managers create clarity and build the habits that keep teams aligned as they grow.",
    topics: [
      "Defining team purpose and priorities",
      "Clarifying roles, responsibilities, and decision rights",
      "Running productive team meetings",
      "Creating shared accountability",
      "Navigating cross-functional collaboration",
    ],
    color: "bg-[#5B34AB]",
  },
];

export default function SolutionsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#6E3FCC] topo-pattern py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              What We Help With
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Real challenges that your managers face every day — and practical
              development that actually helps them lead better.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {solutions.map((solution, i) => (
            <div
              key={solution.title}
              className={`flex flex-col ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } gap-10 items-start`}
            >
              {/* Content */}
              <div className="flex-1">
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${solution.color} mb-4`}
                >
                  Solution
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {solution.title}
                </h2>
                <p className="text-[#6E3FCC] font-medium mb-4">
                  {solution.tagline}
                </p>
                <p className="text-gray-500 leading-relaxed mb-6">
                  {solution.description}
                </p>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  What we cover:
                </h4>
                <ul className="space-y-2">
                  {solution.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-[#6E3FCC] mt-0.5">&#10003;</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual accent */}
              <div className="flex-1 flex items-center justify-center">
                <div
                  className={`w-full h-64 rounded-2xl ${solution.color} opacity-10`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Campfire */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Campfire vs. the alternatives?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[
              {
                vs: "vs. E-Learning Platforms",
                point:
                  "People don't change behavior by watching videos. Our live, facilitated workshops create real dialogue and peer learning that sticks.",
              },
              {
                vs: "vs. Executive Coaching",
                point:
                  "Coaching is powerful — but expensive and hard to scale. Campfire gives every manager access to quality development, not just the top 5%.",
              },
              {
                vs: "vs. Building In-House",
                point:
                  "You could build your own program. But it takes months, requires dedicated staff, and constant maintenance. Campfire is ready now.",
              },
            ].map((item) => (
              <div
                key={item.vs}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-left"
              >
                <h3 className="text-sm font-bold text-[#6E3FCC] mb-3">
                  {item.vs}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.point}
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
            Not sure where to start?
          </h2>
          <p className="mt-4 text-gray-500">
            Book a call and we&apos;ll help you figure out what your managers
            need most right now.
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
