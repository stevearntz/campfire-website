import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ContentShowcase from "../components/ContentShowcase";

export const metadata: Metadata = {
  title: "Content Library — 40+ Leadership Topics",
  description:
    "Research-backed content for your leaders' unique challenges — designed to move beyond awareness and create lasting behavior change. 50+ live workshops available.",
  openGraph: {
    title: "Content Library — 40+ Leadership Topics",
    description:
      "Research-backed leadership development content designed to create lasting behavior change.",
  },
};

export default function ContentPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="py-20" style={{ backgroundImage: "url('/purple-topo.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
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
                topColor: "#0122B4",
              },
              {
                title: "Culture & Mindset",
                desc: "Our content is informed by research on trust, learning, and human potential to help teams create environments where people can do their best work.",
                tags: ["Psychological Safety", "Growth Mindset", "Strengths-Based Development"],
                topColor: "#6A3DC5",
              },
              {
                title: "Change & Team Performance",
                desc: "We apply established models of change and team dynamics to strengthen alignment, accountability, and execution across teams.",
                tags: ["Change Management", "Team Effectiveness"],
                topColor: "#A84AEB",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#F8F5FC] rounded-2xl px-8 pb-[52px] border border-gray-100 overflow-hidden relative"
                style={{ paddingTop: "70px" }}
              >
                {"topColor" in item && item.topColor && (
                  <div className="absolute top-0 left-0 right-0 h-4" style={{ backgroundColor: item.topColor }} />
                )}
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
                      className="px-3.5 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: (item.topColor || "#6E3FCC") + "4D",
                        color: item.topColor || "#6E3FCC",
                      }}
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
      <section className="py-20 bg-[#F8F5FC]">
        <div className="max-w-[1408px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
            {/* Left: heading + description */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Our approach to<br />behavior change
              </h2>
              <p className="mt-5 text-lg text-gray-500 leading-relaxed max-w-md">
                Our content draws from established leadership research and proven
                models&mdash;translated into practical development leaders can
                apply immediately.
              </p>
            </div>

            {/* Right: 2x2 card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  className="bg-white rounded-2xl p-7 overflow-hidden relative"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
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
            <div className="rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none p-8 text-white" style={{ backgroundImage: "url('/purple-topo.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
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
      <section className="pt-20 pb-0 bg-[#1C1334] overflow-visible">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              A complete leadership development library
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-3xl mx-auto">
              A growing collection of live, discussion-based workshops organized
              around the real challenges leaders face today.
            </p>
          </div>

          {/* Session showcase carousel */}
          <ContentShowcase />

          <div className="text-center mt-10">
            <a
              href="https://tools.getcampfire.com/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-3.5 text-sm font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
            >
              Explore Full Library
            </a>
          </div>

        </div>

        {/* Bite-sized programs — wider than carousel */}
        <div className="mt-20 max-w-[1600px] mx-auto px-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
              Bite-sized programs to target specific challenges
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
              {/* For All Employees */}
              <div className="rounded-2xl p-5" style={{ border: "1.5px solid #7A4DFF" }}>
                <p className="text-xs font-bold tracking-wider uppercase mb-5" style={{ color: "#7A4DFF" }}>
                  For All Employees:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { title: "Team Alignment", sessions: 5, color: "#EB6593", colorLight: "#F595B6", desc: "Help people understand how their work supports broader outcomes, building clarity, focus, and shared direction." },
                    { title: "Personal Wellness", sessions: 5, color: "#F0C321", colorLight: "#FFF564", desc: "Support individuals in navigating stress and burnout with practical ways to restore balance and sustain their energy." },
                    { title: "Growth Mindset", sessions: 5, color: "#F07435", colorLight: "#FCA376", desc: "Help people strengthen confidence, lean into challenges, and take meaningful ownership of their growth." },
                    { title: "Collaboration", sessions: 5, color: "#DB4839", colorLight: "#F08C81", desc: "Give teams the tools to communicate openly, stay aligned, and work through friction with ease." },
                    { title: "Change & Resilience", sessions: 6, color: "#88B830", colorLight: "#B4D170", desc: "Help individuals manage change fatigue, strengthen emotional resilience, and stay steady during periods of transition." },
                    { title: "Strategic Execution", sessions: 5, color: "#F09321", colorLight: "#FAAD65", desc: "Help teams sharpen their priorities, strengthen strategic thinking, and deliver work with greater consistency and focus." },
                    { title: "Values in Action", sessions: 5, color: "#30B859", colorLight: "#70D18E", desc: "Help people translate values into action so decisions, communication, and behaviors are aligned and intentional." },
                    { title: "Belonging & Inclusion", sessions: 5, color: "#30C7C7", colorLight: "#74DEDE", desc: "Develop teams that create inclusive spaces where everyone feels recognized, supported, and able to contribute fully." },
                  ].map((program) => (
                    <div
                      key={program.title}
                      className="bg-white rounded-xl p-4 overflow-hidden relative"
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{ background: `linear-gradient(to bottom, ${program.colorLight}, ${program.color})` }}
                      />
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-gray-900">{program.title}</h4>
                        <span
                          className="text-[11.5px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ml-2"
                          style={{ backgroundColor: program.colorLight + "B3", color: program.color }}
                        >
                          {program.sessions} sessions
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{program.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* For Leaders */}
              <div className="rounded-2xl p-5" style={{ border: "1.5px solid #B660E7" }}>
                <p className="text-xs font-bold tracking-wider uppercase mb-5" style={{ color: "#B660E7" }}>
                  For Leaders:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: "Leader Essentials", sessions: 7, color: "#30ABC7", colorLight: "#74CEDE", desc: "Equip new and emerging leaders with core skills, confidence, and support to lead effectively from day one." },
                    { title: "Leader Accelerator", sessions: 7, color: "#644BFC", colorLight: "#8B78FF", desc: "Help leaders strengthen their ability to coach others, develop talent, and handle challenging situations effectively." },
                    { title: "Leader Alignment", sessions: 5, color: "#328BDC", colorLight: "#5EB0FC", desc: "Help leaders translate strategy into clear priorities and consistent communication that keeps teams aligned and focused." },
                    { title: "Lead Through Change", sessions: 6, color: "#8C4BFC", colorLight: "#AE78FF", desc: "Develop leaders who can steady their teams, reduce resistance, and keep people focused through uncertainty." },
                  ].map((program) => (
                    <div
                      key={program.title}
                      className="bg-white rounded-xl p-4 overflow-hidden relative"
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{ background: `linear-gradient(to bottom, ${program.colorLight}, ${program.color})` }}
                      />
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-gray-900">{program.title}</h4>
                        <span
                          className="text-[11.5px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ml-2"
                          style={{ backgroundColor: program.colorLight + "B3", color: program.color }}
                        >
                          {program.sessions} sessions
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{program.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* See it for yourself — CTA banner, straddling the section edge */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 mt-16 translate-y-1/2">
            <div className="rounded-xl px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg" style={{ background: "linear-gradient(to right, #BE5CE9, #EE81DD)" }}>
              <p className="text-white text-sm md:text-base text-center md:text-left">
                <span className="font-bold">See it for yourself:</span>{" "}
                Learn how Campfire can help your leaders build these habits and drive real results.
              </p>
              <a
                href="https://calendly.com/getcampfire/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-6 py-2.5 text-xs font-semibold text-white bg-[#6E3FCC] rounded-md hover:bg-[#5B34AB] transition-colors uppercase tracking-wider"
              >
                Book a Call
              </a>
            </div>
          </div>
      </section>

      {/* Flexible Access to Fit Your Team */}
      <section className="pb-20 bg-white" style={{ paddingTop: "100px" }}>
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
                    ? "text-white border-transparent shadow-lg shadow-purple-200 md:scale-105 md:-my-2"
                    : "bg-[#F8F5FC] text-gray-900 border-gray-100"
                }`}
                style={option.featured ? { backgroundImage: "url('/purple-topo.webp')", backgroundSize: "cover", backgroundPosition: "center" } : undefined}
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
      <section className="py-20 bg-[#F8F5FC]">
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
