import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          {/* Left — copy */}
          <div className="flex-1 z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Build Better Leaders
              <br />
              <span className="text-[#7C3AED]">&mdash;Your Way, at Scale</span>
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg">
              Flexible leadership development designed for modern, growing
              teams. Workshops and tools that actually stick.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#how-it-works"
                className="px-7 py-3.5 text-sm font-semibold text-white bg-[#7C3AED] rounded-lg hover:bg-[#6D28D9] transition-colors"
              >
                See How It Works
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 text-sm font-semibold text-[#7C3AED] border-2 border-[#7C3AED] rounded-lg hover:bg-[#7C3AED]/5 transition-colors"
              >
                Talk to Us
              </Link>
            </div>
          </div>

          {/* Right — decorative wave */}
          <div className="flex-1 relative h-[400px] w-full">
            <svg
              viewBox="0 0 500 400"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path d="M0,300 Q125,200 250,250 T500,200 L500,400 L0,400 Z" fill="url(#waveGrad)" />
              <path d="M0,320 Q125,250 250,280 T500,230 L500,400 L0,400 Z" fill="rgba(124,58,237,0.08)" />
              <path d="M0,350 Q125,300 250,320 T500,270 L500,400 L0,400 Z" fill="rgba(124,58,237,0.05)" />
              {/* Topo lines */}
              <path d="M50,150 Q175,100 300,150 T550,120" fill="none" stroke="rgba(124,58,237,0.1)" strokeWidth="1.5" />
              <path d="M30,180 Q155,130 280,180 T530,150" fill="none" stroke="rgba(124,58,237,0.07)" strokeWidth="1.5" />
              <path d="M70,210 Q195,160 320,210 T570,180" fill="none" stroke="rgba(124,58,237,0.05)" strokeWidth="1.5" />
              {/* Dot accents */}
              <circle cx="400" cy="100" r="4" fill="rgba(124,58,237,0.15)" />
              <circle cx="350" cy="160" r="6" fill="rgba(124,58,237,0.1)" />
              <circle cx="420" cy="180" r="3" fill="rgba(124,58,237,0.2)" />
            </svg>
          </div>
        </div>
      </section>

      {/* ==================== WHAT CAMPFIRE IS ==================== */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Leadership development that&apos;s{" "}
            <span className="text-[#7C3AED]">deeply human</span>
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
                color: "bg-[#7C3AED]",
              },
              {
                step: "02",
                title: "Conversation",
                desc: "Live, facilitated sessions where leaders learn from each other — sharing real challenges, not hypotheticals.",
                color: "bg-[#9333EA]",
              },
              {
                step: "03",
                title: "Application",
                desc: "Practical tools and exercises that leaders apply to their actual work within days, not someday.",
                color: "bg-[#A855F7]",
              },
              {
                step: "04",
                title: "Reinforcement",
                desc: "Follow-up nudges, peer accountability, and manager check-ins that turn one-time learning into lasting habits.",
                color: "bg-[#C084FC]",
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
      <section className="py-20 bg-gray-50">
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
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
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

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
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
        <div className="bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#6D28D9] topo-pattern py-20">
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
                className="px-8 py-4 text-sm font-semibold text-[#7C3AED] bg-white rounded-lg hover:bg-gray-100 transition-colors"
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
