import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="py-20" style={{ backgroundImage: "url('/purple-topo.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              About Us
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Leadership Development That Fits Your Company and Your Leaders
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Your managers carry your culture, navigate change, and hold your
              values in the moments that matter. Campfire gives them practical
              tools, real conversations, and ongoing support — without adding
              burden to your team.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== WHO WE ARE ==================== */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Who we are
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed mb-6">
                Campfire is a leadership development platform built for
                remote-first, growing companies with lean HR and
                talent teams.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                We help you build better managers — not through one-off
                training, but through a flexible, always-on system that
                integrates direction, culture, and skills into the way your
                company already works.
              </p>

              {/* Contrast block */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  We are not
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FCC]/40 shrink-0" />
                    <p className="text-lg font-bold text-gray-900">
                      A passive e-learning library
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FCC]/40 shrink-0" />
                    <p className="text-lg font-bold text-gray-900">
                      A one-time workshop vendor
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FCC]/40 shrink-0" />
                    <p className="text-lg font-bold text-gray-900">
                      Executive coaching for a select few
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-500 leading-relaxed">
                We are the partner small teams rely on to diagnose needs, design
                programs, and deliver leadership development at scale — without
                building everything from scratch.
              </p>
            </div>

            {/* Visual — abstract partnership illustration */}
            <div className="hidden md:flex justify-center items-center">
              <svg viewBox="0 0 360 400" fill="none" className="w-full max-w-sm">
                {/* Two interlocking circles representing partnership */}
                <circle cx="150" cy="180" r="90" stroke="#6E3FCC" strokeWidth="1.5" strokeOpacity="0.12" fill="none" />
                <circle cx="210" cy="180" r="90" stroke="#6E3FCC" strokeWidth="1.5" strokeOpacity="0.12" fill="none" />
                {/* Overlap fill */}
                <path d="M180 107 C200 130, 200 230, 180 253 C160 230, 160 130, 180 107Z" fill="#6E3FCC" fillOpacity="0.06" />
                {/* Your team label area */}
                <rect x="72" y="162" width="64" height="8" rx="4" fill="#6E3FCC" fillOpacity="0.08" />
                <rect x="80" y="176" width="48" height="6" rx="3" fill="#6E3FCC" fillOpacity="0.05" />
                {/* Campfire label area */}
                <rect x="224" y="162" width="64" height="8" rx="4" fill="#6E3FCC" fillOpacity="0.08" />
                <rect x="232" y="176" width="48" height="6" rx="3" fill="#6E3FCC" fillOpacity="0.05" />
                {/* Center spark */}
                <path d="M180 165 C178 172, 173 176, 175 182 C176 186, 179 188, 180 190 C181 188, 184 186, 185 182 C187 176, 182 172, 180 165Z" fill="#6E3FCC" fillOpacity="0.2" />
                {/* Outcome arrows flowing down */}
                <path d="M180 260 L180 320" stroke="#6E3FCC" strokeWidth="1.2" strokeOpacity="0.15" strokeDasharray="4 4" />
                <path d="M174 314 L180 324 L186 314" stroke="#6E3FCC" strokeWidth="1.2" strokeOpacity="0.2" fill="none" />
                {/* Outcome blocks */}
                <rect x="140" y="334" width="80" height="10" rx="5" fill="#6E3FCC" fillOpacity="0.1" />
                <rect x="150" y="350" width="60" height="8" rx="4" fill="#6E3FCC" fillOpacity="0.06" />
                <rect x="155" y="364" width="50" height="6" rx="3" fill="#6E3FCC" fillOpacity="0.04" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHAT WE DO ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What we actually provide
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Everything you need to run leadership development programs that
              actually work — without building it all yourself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Platform capabilities */}
            <div>
              <p className="text-xs font-bold text-[#6E3FCC] uppercase tracking-widest mb-6">
                The Platform
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                    ),
                    text: "A growing library of 50+ ready-to-go leadership sessions",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                      </svg>
                    ),
                    text: "Custom sessions aligned to your mission, values, and strategy",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    ),
                    text: "Flexible facilitation — our facilitators or yours",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    ),
                    text: "Simple scheduling and program design tools",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    ),
                    text: "Reporting and analytics to make impact visible",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                    ),
                    text: "Diagnostic tools to understand leader needs",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H20.58" />
                      </svg>
                    ),
                    text: "Practical manager tools that can be applied immediately",
                  },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="text-[#6E3FCC] shrink-0 mt-0.5">{item.icon}</div>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Session topics */}
            <div>
              <p className="text-xs font-bold text-[#6E3FCC] uppercase tracking-widest mb-6">
                Sessions Cover Real Challenges
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Supporting new managers",
                  "Navigating change",
                  "Preventing burnout",
                  "Building trust & belonging",
                  "Giving & receiving feedback",
                  "Setting clear expectations",
                  "Running effective 1:1s",
                  "Leading through uncertainty",
                  "Driving performance & accountability",
                ].map((topic) => (
                  <span
                    key={topic}
                    className="px-4 py-2.5 bg-[#F8F5FC] text-[#6E3FCC] text-sm font-medium rounded-full border border-[#6E3FCC]/10"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="mt-10 bg-[#F5F4F1] rounded-xl border border-gray-100 p-6">
                <p className="text-sm text-gray-500 leading-relaxed">
                  Everything is designed to be{" "}
                  <span className="font-semibold text-gray-900">social</span>,{" "}
                  <span className="font-semibold text-gray-900">applied</span>,
                  and{" "}
                  <span className="font-semibold text-gray-900">repeated</span>{" "}
                  — because behavior change requires systems, not events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHAT IT FEELS LIKE ==================== */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What it feels like
          </h2>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl">
            Great managers don&apos;t just sit back and watch.
          </p>

          {/* The experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              {
                num: "01",
                line1: "They don\u2019t just join sessions \u2014",
                line2: "they sit with peers facing the same hard realities.",
              },
              {
                num: "02",
                line1: "They slow down long enough",
                line2: "to name what\u2019s actually happening on their teams.",
              },
              {
                num: "03",
                line1: "They practice the conversations",
                line2: "they\u2019ve been avoiding \u2014 feedback, conflict, clarity.",
              },
              {
                num: "04",
                line1: "They leave with one specific shift",
                line2: "they can apply in their very next 1:1.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-white rounded-xl border border-gray-100 p-6 flex items-start gap-4"
              >
                <span className="text-sm font-bold text-[#6E3FCC]/40 font-mono mt-0.5">
                  {item.num}
                </span>
                <p className="text-gray-700 font-medium leading-relaxed">
                  {item.line1}
                  <br />
                  {item.line2}
                </p>
              </div>
            ))}
          </div>

          {/* The compound effect */}
          <div className="text-center">
            <p className="text-sm font-semibold text-[#6E3FCC] uppercase tracking-widest mb-8">
              Over time, those small shifts compound
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                {
                  text: "Teams communicate more openly and with less friction",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                  ),
                },
                {
                  text: "Leaders handle hard conversations with confidence",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                },
                {
                  text: "Burnout risk is spotted earlier and addressed effectively",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  ),
                },
                {
                  text: "Change becomes easier to weather and navigate together",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                  ),
                },
                {
                  text: "Culture becomes something people actually feel",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.5 6.5 0 0012 12.5a6.5 6.5 0 003.362-7.286z" />
                    </svg>
                  ),
                },
              ].map((outcome) => (
                <div
                  key={outcome.text}
                  className="bg-white rounded-lg border border-gray-100 p-4 text-center"
                >
                  <div className="text-[#6E3FCC] flex justify-center mb-2">
                    {outcome.icon}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {outcome.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY WE EXIST ==================== */}
      <section className="relative overflow-hidden">
        <div className="py-20" style={{ backgroundImage: "url('/purple-topo-tall.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why we exist
              </h2>
              <p className="text-xl text-white/70 max-w-xl mx-auto">
                Most leadership development solves a learning problem.
              </p>
              <p className="text-2xl font-bold text-white mt-2">
                We solve a business problem.
              </p>
            </div>

            <p className="text-center text-white/60 mb-10 max-w-2xl mx-auto">
              Leadership development only works when it improves what leaders
              care about:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12 max-w-3xl mx-auto">
              {[
                "Retention",
                "Outcomes",
                "Alignment",
                "Change",
                "Culture",
              ].map((metric) => (
                <div
                  key={metric}
                  className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/15 p-4 text-center"
                >
                  <p className="text-white font-semibold text-sm">{metric}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/15 p-8 text-center max-w-2xl mx-auto">
              <p className="text-white/80 leading-relaxed">
                Frontline and mid-level managers are the primary unit of change
                in an organization.
              </p>
              <p className="text-white font-semibold leading-relaxed mt-3">
                If managers and leaders don&apos;t learn and grow, nothing will
                scale.
              </p>
              <p className="mt-4 text-white/60 text-sm">
                We exist to make meaningful, practical, and engaging leadership
                development accessible to every manager. Support and growth
                should go beyond just executives and &ldquo;high-potentials&rdquo;.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BELIEFS ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-14">
            What we believe
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                belief: "Leadership is a practice, not a title",
                line1: "Leaders are built in the ordinary moments.",
                line2: "It\u2019s how you show up on a hard Tuesday.",
                accent: "bg-[#6E3FCC]",
              },
              {
                belief: "Managers are the leverage point",
                line1: "Culture, performance, and strategy all live",
                line2: "in the daily behavior of your managers.",
                accent: "bg-[#7E4FD0]",
              },
              {
                belief: "Culture lives in everyday moments",
                line1: "Not on the values slide.",
                line2: "In meetings and small decisions.",
                accent: "bg-[#8F65D9]",
              },
              {
                belief: "Behavior beats content",
                line1: "Frameworks help. Practice transforms.",
                line2: "Leaders change with conversations.",
                accent: "bg-[#6E3FCC]",
              },
              {
                belief: "Systems beat one-time events",
                line1: "Ongoing reinforcement and tools change",
                line2: "how teams actually operate.",
                accent: "bg-[#7E4FD0]",
              },
              {
                belief: "Simple beats complex",
                line1: "Tools need to fit into the flow of work",
                line2: "or they won\u2019t stick.",
                accent: "bg-[#8F65D9]",
              },
            ].map((item) => (
              <div
                key={item.belief}
                className="bg-[#F5F4F1] rounded-xl border border-gray-100 p-6 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-1 h-full ${item.accent} opacity-40`} />
                <h3 className="font-bold text-gray-900 mb-2 pl-3">
                  {item.belief}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed pl-3">
                  {item.line1}
                  <br />
                  {item.line2}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== OUR PEOPLE ==================== */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              The people behind Campfire
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              A team of practitioners, facilitators, and builders who care
              deeply about leadership development done right.
            </p>
          </div>

          {/* Founders */}
          <div className="mb-14">
            <p className="text-xs font-bold text-[#6E3FCC] uppercase tracking-widest mb-8 text-center">
              Founders
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                {
                  initials: "SA",
                  name: "Founder Name",
                  role: "Co-Founder & CEO",
                  bio: "Placeholder bio — passionate about making leadership development accessible and human. Background in talent strategy and organizational design.",
                  color: "bg-[#6E3FCC]",
                },
                {
                  initials: "JD",
                  name: "Founder Name",
                  role: "Co-Founder & COO",
                  bio: "Placeholder bio — focused on building systems that help lean teams run leadership programs at scale. Background in operations and people development.",
                  color: "bg-[#7E4FD0]",
                },
              ].map((founder) => (
                <div
                  key={founder.initials}
                  className="bg-white rounded-2xl border border-gray-100 p-8 text-center"
                >
                  <div
                    className={`w-24 h-24 ${founder.color} rounded-full mx-auto mb-5 flex items-center justify-center`}
                  >
                    <span className="text-2xl font-bold text-white">
                      {founder.initials}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {founder.name}
                  </h3>
                  <p className="text-sm font-medium text-[#6E3FCC] mb-3">
                    {founder.role}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-14">
            <p className="text-xs font-bold text-[#6E3FCC] uppercase tracking-widest mb-8 text-center">
              Team
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { initials: "MR", name: "Team Member", role: "Head of Content" },
                { initials: "KL", name: "Team Member", role: "Program Operations" },
                { initials: "TP", name: "Team Member", role: "Client Success" },
              ].map((member) => (
                <div key={member.initials} className="text-center w-36">
                  <div className="w-16 h-16 bg-[#8F65D9] rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {member.initials}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Facilitators & Content Developers */}
          <div>
            <p className="text-xs font-bold text-[#6E3FCC] uppercase tracking-widest mb-4 text-center">
              Facilitators &amp; Content Developers
            </p>
            <p className="text-sm text-gray-500 text-center mb-8 max-w-lg mx-auto">
              Our network of experienced facilitators and content creators bring
              real-world leadership expertise to every session.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { initials: "AL", color: "bg-[#6E3FCC]" },
                { initials: "BK", color: "bg-[#7E4FD0]" },
                { initials: "CM", color: "bg-[#8F65D9]" },
                { initials: "DR", color: "bg-[#A88AE0]" },
                { initials: "EW", color: "bg-[#6E3FCC]" },
                { initials: "FH", color: "bg-[#7E4FD0]" },
                { initials: "GS", color: "bg-[#8F65D9]" },
                { initials: "HN", color: "bg-[#A88AE0]" },
                { initials: "JT", color: "bg-[#6E3FCC]" },
                { initials: "KP", color: "bg-[#7E4FD0]" },
                { initials: "LB", color: "bg-[#8F65D9]" },
                { initials: "MC", color: "bg-[#A88AE0]" },
                { initials: "NV", color: "bg-[#6E3FCC]" },
                { initials: "PG", color: "bg-[#7E4FD0]" },
              ].map((person, i) => (
                <div key={person.initials + i} className="text-center">
                  <div
                    className={`w-12 h-12 ${person.color} rounded-full flex items-center justify-center`}
                  >
                    <span className="text-xs font-bold text-white">
                      {person.initials}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-sm text-gray-400">
              14 facilitators and content developers across North America
            </p>
          </div>
        </div>
      </section>

      {/* ==================== IMPACT ==================== */}
      <section className="py-20 bg-[#F8F5FC]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              The impact we see
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              When leadership development fits the flow of work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                text: "Talent teams save time and reduce administrative burden",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                ),
                text: "Programs scale without adding headcount",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                ),
                text: "Managers show up with greater clarity and confidence",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                ),
                text: "Difficult conversations happen earlier and more effectively",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                text: "Teams align around goals and accountability",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                ),
                text: "Performance improves without burning people out",
              },
            ].map((item) => (
              <div
                key={item.text}
                className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4"
              >
                <div className="text-[#6E3FCC] shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Transformational statement */}
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-[#6E3FCC] uppercase tracking-widest mb-6">
              This is what transformation looks like
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "Honest conversations",
                "Human-centered leadership",
                <>Aligned<br />decision-making</>,
                "Sustainable performance",
              ].map((phrase, i) => (
                <p
                  key={i}
                  className="text-lg font-bold text-gray-900 leading-snug"
                >
                  {phrase}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CLOSING CTA ==================== */}
      <section className="relative overflow-hidden">
        <div className="py-20" style={{ backgroundImage: "url('/purple-topo-tall.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to support your managers?
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
              If you&apos;re trying to support managers in a growing,
              distributed organization — and you need something flexible,
              scalable, and proven — we&apos;d love to learn about your team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-7 py-3.5 text-sm font-semibold leading-none text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wide"
              >
                Talk to Us
              </Link>
              <Link
                href="/solutions"
                className="px-7 py-3.5 text-sm font-semibold leading-none text-white border-2 border-white/50 rounded-lg hover:bg-white/10 hover:border-white/70 transition-colors uppercase tracking-wide"
              >
                See How It Fits
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
