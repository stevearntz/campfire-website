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
              <linearGradient id="wave1" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6E3FCC" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#7E52D6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#9A7ADE" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="wave2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7E52D6" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#9A7ADE" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#BCA8E8" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="wave3" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9A7ADE" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#BCA8E8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#D6CDF0" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="wave4" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#BCA8E8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#EBE6F6" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="wave5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7E52D6" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#8F65D9" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#D946EF" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path className="wave-layer-1" d="M-100,900 L-100,750 C100,680 300,620 500,650 C700,680 850,580 1050,520 C1250,460 1350,380 1540,350 L1540,900 Z" fill="url(#wave1)" />
            <path className="wave-layer-2" d="M-100,900 L-100,800 C150,740 350,700 550,720 C750,740 900,640 1100,590 C1300,540 1400,470 1540,430 L1540,900 Z" fill="url(#wave2)" />
            <path className="wave-layer-3" d="M-100,900 L-100,830 C200,790 380,770 580,790 C780,810 950,710 1150,660 C1350,610 1420,550 1540,520 L1540,900 Z" fill="url(#wave3)" />
            <path className="wave-layer-4" d="M-100,900 L-100,860 C250,830 450,830 650,845 C850,860 1000,780 1200,740 C1400,700 1460,650 1540,620 L1540,900 Z" fill="url(#wave4)" />
            <path className="wave-layer-5" d="M-100,900 L-100,820 C50,790 200,760 400,770 C600,780 750,700 950,660 C1150,620 1300,540 1540,490 L1540,900 Z" fill="url(#wave5)" opacity="0.15" />
            <path className="topo-line-1" d="M-50,780 C150,720 350,690 550,710 C750,730 900,640 1100,590 C1300,540 1450,480 1500,460" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <path className="topo-line-2" d="M-50,750 C180,690 380,660 560,680 C740,700 920,610 1120,560 C1320,510 1460,450 1500,430" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
            <path className="topo-line-3" d="M-50,720 C200,660 400,640 580,655 C760,670 940,580 1140,535 C1340,490 1470,430 1500,410" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <path className="topo-line-4" d="M-50,690 C220,630 420,615 600,628 C780,641 960,555 1160,510 C1360,465 1480,410 1500,390" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <path className="topo-line-5" d="M-50,660 C240,605 440,590 620,600 C800,610 980,530 1180,488 C1380,446 1490,395 1500,375" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            <path className="topo-line-3" d="M400,620 C550,590 700,560 850,540 C1000,520 1150,470 1300,430 C1400,405 1500,380 1540,370" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <path className="topo-line-1" d="M500,580 C650,555 780,530 920,510 C1060,490 1200,445 1350,410 C1430,393 1500,370 1540,355" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
            <circle cx="1180" cy="530" r="5" fill="rgba(255,255,255,0.3)" />
            <circle cx="1180" cy="530" r="2" fill="rgba(255,255,255,0.6)" />
            <circle cx="920" cy="620" r="4" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-24 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Build better leaders
              <br />
              <span className="text-[#6E3FCC]">&mdash;your way, at scale</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg">
              Flexible leadership development for modern, growing teams.
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

      {/* ==================== BELIEF SECTION ==================== */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Leadership is the lever
            </h2>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
              Leaders sit at the center of culture and performance. How they
              communicate, make decisions, and show up every day shapes how teams
              work and deliver results.
            </p>
            <p className="mt-6 text-lg text-gray-700 font-medium">
              Leadership development only works when it:
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Fits into the flow of real work",
                "Adapts to your culture and challenges",
                "Shows up consistently over time",
                "Scales across the organization",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-gray-600"
                >
                  <span className="w-2 h-2 rounded-full bg-[#6E3FCC] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-block px-7 py-3.5 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHAT IT IS ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything you need to scale an{" "}
              <span className="text-[#6E3FCC]">outcomes driven culture</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Campfire helps organizations develop leaders at every level with
              flexible content, scalable facilitation, and program support that
              adapts to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Flexible Content",
                desc: "A curated library of live leadership workshops and practical tools focused on real leadership challenges like trust, communication, and change. Mix, match, and customize to fit your context and priorities.",
              },
              {
                title: "Scalable Facilitation",
                desc: "Live, interactive workshops led by our expert facilitators or your own trained leaders. Deliver consistent, high-quality experiences across teams and geographies while keeping conversations human, engaging, and relevant.",
              },
              {
                title: "Program Support",
                desc: "End-to-end support to make leadership development easy to run. We handle scheduling, coordination, tracking, and logistics so small talent teams can scale programs without added headcount.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-[#F5F4F1] rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
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

      {/* ==================== PROOF / CTA ==================== */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#5B34AB] topo-pattern py-16">
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
              Results you can trust
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "6,000+", label: "Sessions delivered" },
                { number: "25+", label: "Years of experience" },
                { number: "250+", label: "Companies served" },
                { number: "10k+", label: "Leaders supported" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl md:text-5xl font-bold text-white">
                    {stat.number}
                  </div>
                  <p className="mt-2 text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Built to fit the way you work
              <span className="text-[#6E3FCC]">&mdash;and drive lasting change</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Campfire brings leadership development into everyday work through a
              simple, repeatable flow that scales across your organization.
            </p>
          </div>

          {/* Flow label */}
          <div className="flex items-center justify-center gap-3 mb-10 text-sm font-semibold text-[#6E3FCC]">
            <span>Content</span>
            <span className="text-gray-300">&rarr;</span>
            <span>Conversation</span>
            <span className="text-gray-300">&rarr;</span>
            <span>Application</span>
            <span className="text-gray-300">&rarr;</span>
            <span>Reinforcement</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Start with relevant content",
                desc: "Build the programs your people need most by blending our time-tested sessions with the most important principles and pieces from your organization.",
                color: "bg-[#6E3FCC]",
              },
              {
                step: "02",
                title: "Bring it to life through conversation",
                desc: "Live, facilitated discussions create space for reflection, peer learning, and meaningful connection\u2014building shared language and perspective.",
                color: "bg-[#7E4FD0]",
              },
              {
                step: "03",
                title: "Apply it in real work",
                desc: "Leaders put tools to use and practice new behaviors in meetings, one-on-ones, and day-to-day decisions\u2014where leadership actually shows up.",
                color: "bg-[#8F65D9]",
              },
              {
                step: "04",
                title: "Reinforce over time",
                desc: "Skills are revisited and strengthened through ongoing experiences and resources to dive deeper, helping leadership behaviors stick and compound.",
                color: "bg-[#A88AE0]",
              },
            ].map((item) => (
              <div key={item.step}>
                <div
                  className={`${item.color} text-white rounded-2xl p-8 h-full`}
                >
                  <span className="text-sm font-bold opacity-60">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-bold mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-12 bg-[#F5F4F1]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-lg text-gray-600">
            Want to see how it would work with your organization?
          </p>
          <Link
            href="/contact"
            className="inline-block mt-4 px-7 py-3.5 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors"
          >
            Book a Call
          </Link>
        </div>
      </section>

      {/* ==================== HOW IT SHOWS UP ==================== */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Flexible formats that meet leaders{" "}
              <span className="text-[#6E3FCC]">where they are</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Campfire offers flexible format options that work across different
              teams, timelines, and goals. Organizations can start small or go
              broad, choosing the right mix for their people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Live virtual workshops",
                desc: "Interactive sessions focused on real leadership challenges, designed to build shared language, reflection, and practical skills leaders can use right away.",
              },
              {
                title: "Time-bound programs",
                desc: "Short series or focused initiatives that create structure and momentum, while still reinforcing skills beyond a defined start and end.",
              },
              {
                title: "Group experiences",
                desc: "Small-group experiences that connect leaders facing similar challenges, creating space for peer learning, accountability, and deeper conversation.",
              },
              {
                title: "Offsites and gatherings",
                desc: "High-impact moments for alignment, connection, and culture-building\u2014designed to create momentum that carries into everyday work.",
              },
            ].map((format) => (
              <div
                key={format.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {format.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {format.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY IT WORKS ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Designed for how leadership{" "}
              <span className="text-[#6E3FCC]">actually changes</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Leadership development works when it reflects the realities leaders
              face every day. Campfire is built around a few core principles that
              make development stick&mdash;and scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Built for real work",
                desc: "Leadership development fits into meetings, one-on-ones, and everyday conversations\u2014so growth happens alongside work, not separate from it.",
              },
              {
                title: "Grounded in practical leadership",
                desc: "Well-researched models and core competencies are translated into simple, usable skills leaders can apply immediately in real situations.",
              },
              {
                title: "Reinforced over time",
                desc: "Leadership behaviors are strengthened through repetition. Skills are revisited and built on, so development compounds instead of fading after a single experience.",
              },
              {
                title: "Relevant to leaders today",
                desc: "Everything is designed around the real challenges managers are facing right now\u2014so learning feels useful, not theoretical.",
              },
            ].map((principle) => (
              <div
                key={principle.title}
                className="bg-[#F5F4F1] rounded-2xl p-8 border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {principle.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== IMPACT ==================== */}
      <section className="py-20 bg-[#F8F5FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What changes when leadership development{" "}
              <span className="text-[#6E3FCC]">actually sticks</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              When leadership development fits real work and shows up
              consistently, the impact is visible&mdash;not abstract.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Better conversations",
                desc: "Leaders communicate more clearly, listen more effectively, and navigate difficult conversations with confidence and care.",
              },
              {
                title: "Stronger alignment",
                desc: "Teams operate with shared language, clearer expectations, and better decision-making\u2014reducing friction and confusion.",
              },
              {
                title: "Healthier team dynamics",
                desc: "Trust increases, feedback improves, and people feel more supported, engaged, and accountable.",
              },
              {
                title: "More consistent leadership behaviors",
                desc: "Leadership expectations don\u2019t live in a slide deck. They show up in meetings, 1:1s, and everyday decisions across the organization.",
              },
              {
                title: "Improved performance and results",
                desc: "Clearer priorities, better execution, and stronger follow-through lead to measurable improvements in how teams perform.",
              },
            ].map((impact) => (
              <div
                key={impact.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {impact.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {impact.desc}
                </p>
              </div>
            ))}

            {/* CTA card */}
            <div className="bg-[#6E3FCC] rounded-2xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  See it for yourself
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Learn how Campfire can help your leaders build these habits
                  and drive real results.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-block mt-6 px-6 py-3 text-sm font-semibold text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                Book a Call &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#5B34AB] topo-pattern py-20">
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to build a culture that performs?
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
              Book a 30-minute call and we&apos;ll show you how Campfire can
              work for your team. No pressure, just a real conversation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 text-sm font-semibold text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Book a Call &rarr;
              </Link>
              <Link
                href="/solutions"
                className="px-8 py-4 text-sm font-semibold text-white/80 border-2 border-white/30 rounded-lg hover:border-white/60 hover:text-white transition-colors"
              >
                Explore Solutions
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/50">
              30 minutes &middot; No commitment &middot; Tailored to your team
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
