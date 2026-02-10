import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-white min-h-[65vh] flex items-start">
        {/* Full-width topographic wave background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 900"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Deep purple wave gradient */}
              <linearGradient id="wave1" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6E3FCC" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#7E52D6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#9A7ADE" stopOpacity="0.5" />
              </linearGradient>
              {/* Mid purple wave gradient */}
              <linearGradient id="wave2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7E52D6" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#9A7ADE" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#BCA8E8" stopOpacity="0.3" />
              </linearGradient>
              {/* Light purple wave gradient */}
              <linearGradient id="wave3" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9A7ADE" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#BCA8E8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#D6CDF0" stopOpacity="0.2" />
              </linearGradient>
              {/* Lightest wave gradient */}
              <linearGradient id="wave4" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#BCA8E8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#EBE6F6" stopOpacity="0.15" />
              </linearGradient>
              {/* Magenta accent gradient */}
              <linearGradient id="wave5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7E52D6" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#8F65D9" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#D946EF" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Layer 1: Deepest / back — sweeps from bottom-left to upper-right */}
            <path
              className="wave-layer-1"
              d="M-100,900 L-100,750 C100,680 300,620 500,650 C700,680 850,580 1050,520 C1250,460 1350,380 1540,350 L1540,900 Z"
              fill="url(#wave1)"
            />

            {/* Layer 2: Mid-deep */}
            <path
              className="wave-layer-2"
              d="M-100,900 L-100,800 C150,740 350,700 550,720 C750,740 900,640 1100,590 C1300,540 1400,470 1540,430 L1540,900 Z"
              fill="url(#wave2)"
            />

            {/* Layer 3: Mid-light */}
            <path
              className="wave-layer-3"
              d="M-100,900 L-100,830 C200,790 380,770 580,790 C780,810 950,710 1150,660 C1350,610 1420,550 1540,520 L1540,900 Z"
              fill="url(#wave3)"
            />

            {/* Layer 4: Light wash */}
            <path
              className="wave-layer-4"
              d="M-100,900 L-100,860 C250,830 450,830 650,845 C850,860 1000,780 1200,740 C1400,700 1460,650 1540,620 L1540,900 Z"
              fill="url(#wave4)"
            />

            {/* Layer 5: Magenta accent ridge */}
            <path
              className="wave-layer-5"
              d="M-100,900 L-100,820 C50,790 200,760 400,770 C600,780 750,700 950,660 C1150,620 1300,540 1540,490 L1540,900 Z"
              fill="url(#wave5)"
              opacity="0.15"
            />

            {/* Topographic contour lines */}
            <path
              className="topo-line-1"
              d="M-50,780 C150,720 350,690 550,710 C750,730 900,640 1100,590 C1300,540 1450,480 1500,460"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
            />
            <path
              className="topo-line-2"
              d="M-50,750 C180,690 380,660 560,680 C740,700 920,610 1120,560 C1320,510 1460,450 1500,430"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.2"
            />
            <path
              className="topo-line-3"
              d="M-50,720 C200,660 400,640 580,655 C760,670 940,580 1140,535 C1340,490 1470,430 1500,410"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
            <path
              className="topo-line-4"
              d="M-50,690 C220,630 420,615 600,628 C780,641 960,555 1160,510 C1360,465 1480,410 1500,390"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            <path
              className="topo-line-5"
              d="M-50,660 C240,605 440,590 620,600 C800,610 980,530 1180,488 C1380,446 1490,395 1500,375"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.8"
            />

            {/* Additional topo lines higher up — more subtle */}
            <path
              className="topo-line-3"
              d="M400,620 C550,590 700,560 850,540 C1000,520 1150,470 1300,430 C1400,405 1500,380 1540,370"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            <path
              className="topo-line-1"
              d="M500,580 C650,555 780,530 920,510 C1060,490 1200,445 1350,410 C1430,393 1500,370 1540,355"
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="0.8"
            />

            {/* Small dot accents at ridge peaks */}
            <circle cx="1180" cy="530" r="5" fill="rgba(255,255,255,0.3)" />
            <circle cx="1180" cy="530" r="2" fill="rgba(255,255,255,0.6)" />
            <circle cx="920" cy="620" r="4" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-24 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Build Better Leaders
              <br />
              <span className="text-[#6E3FCC]">&mdash;Your Way, at Scale</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg">
              Flexible leadership development designed for modern, growing
              teams. Workshops and tools that actually stick.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#how-it-works"
                className="px-7 py-3.5 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors"
              >
                See How It Works
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 text-sm font-semibold text-[#6E3FCC] border-2 border-[#6E3FCC] rounded-lg hover:bg-[#6E3FCC]/5 transition-colors"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHAT CAMPFIRE IS ==================== */}
      <section className="bg-[#F5F4F1] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Leadership development that&apos;s{" "}
            <span className="text-[#6E3FCC]">deeply human</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Campfire gives lean HR and talent teams everything they need to grow
            leaders at every level &mdash; without building a program from
            scratch. Scalable workshops, real conversations, and tools that drive
            lasting behavior change.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Built for Lean Teams",
                desc: "No massive L&D department needed. Campfire is turnkey — launch leadership programs in days, not months.",
              },
              {
                icon: "🌍",
                title: "Designed for Distributed",
                desc: "Live, virtual workshops that connect your people wherever they are. No travel budgets required.",
              },
              {
                icon: "📈",
                title: "Scales With You",
                desc: "From 10 managers to 1,000. Our platform flexes to match your growth, your culture, and your goals.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How Campfire Works
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              A learning model designed to make development stick &mdash; not
              just check a box.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Content",
                desc: "Research-backed frameworks delivered in short, digestible formats that leaders can immediately understand.",
                color: "bg-[#6E3FCC]",
              },
              {
                step: "02",
                title: "Conversation",
                desc: "Live, facilitated sessions where leaders learn from each other — sharing real challenges, not hypotheticals.",
                color: "bg-[#7E4FD0]",
              },
              {
                step: "03",
                title: "Application",
                desc: "Practical tools and exercises that leaders apply to their actual work within days, not someday.",
                color: "bg-[#8F65D9]",
              },
              {
                step: "04",
                title: "Reinforcement",
                desc: "Follow-up nudges, peer accountability, and manager check-ins that turn one-time learning into lasting habits.",
                color: "bg-[#A88AE0]",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div
                  className={`${item.color} text-white rounded-2xl p-8 h-full`}
                >
                  <span className="text-sm font-bold opacity-60">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHO IT'S FOR ==================== */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Built for teams like yours
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              Campfire is designed for the companies doing big things with small,
              mighty teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Lean HR & Talent Teams",
                desc: "You're wearing 10 hats. You don't have time to build a leadership program from scratch. Campfire gives you a turnkey solution that looks and feels custom.",
              },
              {
                title: "Distributed & Hybrid Companies",
                desc: "Your team is spread across cities, time zones, maybe continents. Our live virtual format brings people together without the logistics headache.",
              },
              {
                title: "Mid-Market & Growing Companies",
                desc: "You've outgrown ad-hoc development but aren't ready for a massive enterprise platform. Campfire is the sweet spot.",
              },
              {
                title: "People-First Cultures",
                desc: "You believe investing in your managers isn't a nice-to-have — it's how you retain talent, drive performance, and build culture.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
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

      {/* ==================== SOCIAL PROOF ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Logos */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
              {["Company A", "Company B", "Company C", "Company D", "Company E"].map(
                (name) => (
                  <div
                    key={name}
                    className="text-xl font-bold text-gray-900"
                  >
                    {name}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#F5F4F1] rounded-2xl p-8 border border-gray-100">
              <p className="text-gray-600 leading-relaxed italic">
                &ldquo;Campfire gave our managers a shared language and real
                tools they actually use. The sessions sparked conversations we
                never would have had otherwise.&rdquo;
              </p>
              <div className="mt-6">
                <p className="font-semibold text-gray-900 text-sm">
                  VP of People
                </p>
                <p className="text-gray-400 text-sm">
                  Series B SaaS Company, 200 employees
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F1] rounded-2xl p-8 border border-gray-100">
              <p className="text-gray-600 leading-relaxed italic">
                &ldquo;We went from zero leadership development to a fully
                running program in two weeks. Our managers are more confident
                and our retention has improved measurably.&rdquo;
              </p>
              <div className="mt-6">
                <p className="font-semibold text-gray-900 text-sm">
                  Head of Talent
                </p>
                <p className="text-gray-400 text-sm">
                  Distributed Tech Company, 500 employees
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#5B34AB] topo-pattern py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to build a culture that performs?
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Book a 30-minute call and we&apos;ll show you how Campfire can
              work for your team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 text-sm font-semibold text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors"
              >
                Book a Call
              </Link>
              <Link
                href="/solutions"
                className="px-8 py-4 text-sm font-semibold text-white border-2 border-white/30 rounded-lg hover:border-white/60 transition-colors"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
