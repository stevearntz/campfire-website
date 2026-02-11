import Link from "next/link";

function SolutionIllustration({ index }: { index: number }) {
  const illustrations = [
    // New Manager Readiness — person ascending steps
    <svg key="0" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="260" rx="16" fill="#F8F5FC" />
      {/* Steps */}
      <rect x="60" y="190" width="60" height="30" rx="4" fill="#6E3FCC" opacity="0.15" />
      <rect x="120" y="160" width="60" height="60" rx="4" fill="#6E3FCC" opacity="0.2" />
      <rect x="180" y="130" width="60" height="90" rx="4" fill="#6E3FCC" opacity="0.3" />
      {/* Person on top step */}
      <circle cx="210" cy="105" r="14" fill="#6E3FCC" opacity="0.7" />
      <rect x="204" y="119" width="12" height="8" rx="4" fill="#6E3FCC" opacity="0.5" />
      {/* Star / achievement */}
      <path d="M255 85 L258 93 L267 93 L260 99 L263 107 L255 102 L247 107 L250 99 L243 93 L252 93 Z" fill="#6E3FCC" opacity="0.4" />
      {/* Arrow going up */}
      <path d="M90 185 L90 155 M82 163 L90 155 L98 163" stroke="#6E3FCC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
    </svg>,

    // Leading Through Change — compass with shifting paths
    <svg key="1" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="260" rx="16" fill="#F8F5FC" />
      {/* Compass circle */}
      <circle cx="160" cy="125" r="55" stroke="#7E4FD0" strokeWidth="2" opacity="0.2" />
      <circle cx="160" cy="125" r="45" stroke="#7E4FD0" strokeWidth="1.5" opacity="0.15" />
      {/* Compass needle */}
      <path d="M160 80 L168 125 L160 135 L152 125 Z" fill="#7E4FD0" opacity="0.5" />
      <path d="M160 170 L168 125 L160 115 L152 125 Z" fill="#7E4FD0" opacity="0.2" />
      {/* Cardinal dots */}
      <circle cx="160" cy="70" r="3" fill="#7E4FD0" opacity="0.4" />
      <circle cx="160" cy="180" r="3" fill="#7E4FD0" opacity="0.4" />
      <circle cx="105" cy="125" r="3" fill="#7E4FD0" opacity="0.4" />
      <circle cx="215" cy="125" r="3" fill="#7E4FD0" opacity="0.4" />
      {/* Winding path below */}
      <path d="M80 210 Q120 195 160 210 Q200 225 240 210" stroke="#7E4FD0" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" fill="none" />
      <path d="M80 225 Q120 210 160 225 Q200 240 240 225" stroke="#7E4FD0" strokeWidth="2" strokeLinecap="round" opacity="0.15" fill="none" />
    </svg>,

    // Building Belonging — connected people in a circle
    <svg key="2" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="260" rx="16" fill="#F8F5FC" />
      {/* Center heart/shield */}
      <path d="M160 110 C160 95 145 85 135 95 C125 105 135 120 160 140 C185 120 195 105 185 95 C175 85 160 95 160 110 Z" fill="#8F65D9" opacity="0.3" />
      {/* People around in a circle */}
      <circle cx="160" cy="60" r="12" fill="#8F65D9" opacity="0.5" />
      <circle cx="210" cy="85" r="12" fill="#8F65D9" opacity="0.4" />
      <circle cx="225" cy="140" r="12" fill="#8F65D9" opacity="0.35" />
      <circle cx="200" cy="190" r="12" fill="#8F65D9" opacity="0.3" />
      <circle cx="120" cy="190" r="12" fill="#8F65D9" opacity="0.3" />
      <circle cx="95" cy="140" r="12" fill="#8F65D9" opacity="0.35" />
      <circle cx="110" cy="85" r="12" fill="#8F65D9" opacity="0.4" />
      {/* Connection lines */}
      <path d="M160 72 L210 85 L225 140 L200 190 L120 190 L95 140 L110 85 L160 72" stroke="#8F65D9" strokeWidth="1.5" opacity="0.2" fill="none" />
      {/* Inner connections */}
      <line x1="160" y1="72" x2="200" y2="190" stroke="#8F65D9" strokeWidth="1" opacity="0.1" />
      <line x1="160" y1="72" x2="120" y2="190" stroke="#8F65D9" strokeWidth="1" opacity="0.1" />
      <line x1="110" y1="85" x2="225" y2="140" stroke="#8F65D9" strokeWidth="1" opacity="0.1" />
      <line x1="210" y1="85" x2="95" y2="140" stroke="#8F65D9" strokeWidth="1" opacity="0.1" />
    </svg>,

    // Manager Effectiveness — dashboard/dials
    <svg key="3" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="260" rx="16" fill="#F8F5FC" />
      {/* Main gauge */}
      <path d="M110 170 A60 60 0 0 1 210 170" stroke="#6E3FCC" strokeWidth="8" strokeLinecap="round" opacity="0.15" fill="none" />
      <path d="M110 170 A60 60 0 0 1 195 120" stroke="#6E3FCC" strokeWidth="8" strokeLinecap="round" opacity="0.5" fill="none" />
      {/* Needle */}
      <line x1="160" y1="170" x2="188" y2="128" stroke="#6E3FCC" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <circle cx="160" cy="170" r="5" fill="#6E3FCC" opacity="0.5" />
      {/* Mini metrics */}
      <rect x="75" y="195" width="50" height="35" rx="6" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.2" fill="none" />
      <rect x="81" y="210" width="20" height="4" rx="2" fill="#6E3FCC" opacity="0.2" />
      <rect x="81" y="218" width="35" height="3" rx="1.5" fill="#6E3FCC" opacity="0.1" />
      <rect x="135" y="195" width="50" height="35" rx="6" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.2" fill="none" />
      <rect x="141" y="210" width="28" height="4" rx="2" fill="#6E3FCC" opacity="0.3" />
      <rect x="141" y="218" width="35" height="3" rx="1.5" fill="#6E3FCC" opacity="0.1" />
      <rect x="195" y="195" width="50" height="35" rx="6" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.2" fill="none" />
      <rect x="201" y="210" width="32" height="4" rx="2" fill="#6E3FCC" opacity="0.4" />
      <rect x="201" y="218" width="35" height="3" rx="1.5" fill="#6E3FCC" opacity="0.1" />
      {/* Target icon top right */}
      <circle cx="245" cy="80" r="18" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.15" fill="none" />
      <circle cx="245" cy="80" r="10" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.2" fill="none" />
      <circle cx="245" cy="80" r="3" fill="#6E3FCC" opacity="0.4" />
    </svg>,

    // Team Alignment — arrows converging
    <svg key="4" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="260" rx="16" fill="#F8F5FC" />
      {/* Converging arrows */}
      <path d="M80 80 L160 130" stroke="#5B34AB" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      <path d="M240 80 L160 130" stroke="#5B34AB" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      <path d="M80 180 L160 130" stroke="#5B34AB" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      <path d="M240 180 L160 130" stroke="#5B34AB" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      <path d="M160 60 L160 130" stroke="#5B34AB" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      {/* Center convergence point */}
      <circle cx="160" cy="130" r="16" fill="#5B34AB" opacity="0.2" />
      <circle cx="160" cy="130" r="8" fill="#5B34AB" opacity="0.4" />
      {/* People dots at arrow origins */}
      <circle cx="80" cy="80" r="10" fill="#5B34AB" opacity="0.25" />
      <circle cx="240" cy="80" r="10" fill="#5B34AB" opacity="0.25" />
      <circle cx="80" cy="180" r="10" fill="#5B34AB" opacity="0.25" />
      <circle cx="240" cy="180" r="10" fill="#5B34AB" opacity="0.25" />
      <circle cx="160" cy="60" r="10" fill="#5B34AB" opacity="0.25" />
      {/* Forward arrow from center */}
      <path d="M160 146 L160 210 M150 198 L160 210 L170 198" stroke="#5B34AB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>,
  ];

  return illustrations[index] || null;
}

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
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
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

              {/* Illustration */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-xs">
                  <SolutionIllustration index={i} />
                </div>
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
