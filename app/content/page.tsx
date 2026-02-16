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
      <section className="py-20 bg-[#1C1334]">
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

          {/* Full session catalog */}
          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
              39 sessions and growing
            </h3>
            <p className="text-white/50 text-center text-sm mb-10 max-w-2xl mx-auto">
              Every session is live, facilitator-led, and designed for real conversation. Here&apos;s what&apos;s in the library today.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { name: "Activate Autonomy", desc: "Identify where you want more ownership and learn how to ask for it in a way that builds trust." },
                { name: "Adapting to Change", desc: "Develop your ability to adapt and thrive in change." },
                { name: "Adapt Your Strengths", desc: "Recognize your strengths and adapt them to meet the needs of a current situation." },
                { name: "Beat Imposter Syndrome", desc: "Rewrite one internal monologue that contributes most to feelings of imposter syndrome." },
                { name: "Build Trust on Your Team", desc: "Create an environment where trust flourishes and team members work together efficiently and effectively." },
                { name: "Candid Communication", desc: "Communicate with others in a straightforward, clear way, while also inviting the perspectives of the other person." },
                { name: "Career Mapping", desc: "Identify one meaningful step in your career that brings you closer to your overall vision of success." },
                { name: "Coaching Essentials", desc: "Develop the skills to become effective coaches: tools and techniques to guide meaningful and supportive conversations." },
                { name: "Constructive Conflict", desc: "Learn your natural response as a manager and how to help others control their default responses to conflict." },
                { name: "Cross-Cultural Collaboration", desc: "Recognize and adapt to cultural differences that affect collaboration, communication, and teamwork." },
                { name: "Cultivating Gratitude", desc: "Integrate small, meaningful practices of gratitude into your everyday life to foster a more joyful mindset." },
                { name: "Curiosity in Conversations", desc: "See a team member\u2019s whole self through actively applying curiosity to your conversations." },
                { name: "Decision Making", desc: "Strengthen your ability to make decisions in alignment with your people, purpose, and principles." },
                { name: "Deliberate Listening", desc: "Unlock the power of intentional listening by focusing your mind, space, and body on helping others feel seen." },
                { name: "Deliver Feedback", desc: "Deliver feedback in a way that strengthens relationships, builds trust, and drives growth." },
                { name: "Develop Your Leadership Brand", desc: "Identify the values and strengths that define you\u2014and use them to shape an authentic leadership style." },
                { name: "Develop Your Team", desc: "Make your team indispensable by identifying strengths, addressing gaps, and crafting a development plan." },
                { name: "Emotional Intelligence: Self-Regulation", desc: "Identify one strategy to strengthen your self-regulation in emotionally charged situations." },
                { name: "Executive Communication", desc: "Refine your communication to better resonate with senior stakeholders." },
                { name: "Finance for Better Decisions", desc: "Recognize the financial impact your decisions have on broader business objectives." },
                { name: "Foster Belonging", desc: "Create safety on your team by modelling the building blocks of belonging: value, connection, and support." },
                { name: "Habits for Resilience", desc: "Create habits to help withstand and recover from challenges quickly and combat stress, anxiety, and overwhelm." },
                { name: "Hopes, Fears, and Expectations", desc: "Clarify hopes, fears, and expectations to build a strong foundation for a successful working relationship." },
                { name: "Inclusive Leadership", desc: "Lead with inclusivity by engaging in deeper conversations and uncovering hidden assumptions." },
                { name: "Inspire with Vision", desc: "Establish a vision and align with your team to move towards it together." },
                { name: "Lead Effective Meetings", desc: "Plan and lead meetings that stay focused on the most important outcomes." },
                { name: "Leading Others Through Change", desc: "Support your team through change by creating space for concerns and guiding them toward the future." },
                { name: "Magnify Strengths in Others", desc: "Recognize strengths on your team and support them in using those strengths to create greater impact." },
                { name: "Make the Most of 1-on-1s", desc: "Guide and empower your team with 1-on-1s that build trust, clarity, and momentum." },
                { name: "Manage Your Time", desc: "Protect your time for what matters most by grounding your priorities in people and purpose." },
                { name: "Peer Coaching", desc: "Strengthen your coaching skills by practicing with peers while receiving insights on your own challenges." },
                { name: "Performance Discussions", desc: "Lead successful and constructive performance discussions." },
                { name: "Practicing Self-Awareness", desc: "Cultivate self-awareness to improve decision-making, strengthen relationships, and lead with empathy." },
                { name: "Preventing Burnout", desc: "Identify the risk factors that contribute to burnout and develop strategies to prevent them." },
                { name: "Setting and Achieving Goals", desc: "Take an existing goal and make it more achievable." },
                { name: "Setting Clear Expectations", desc: "Create a strong team culture by identifying key values and needs that everyone needs to succeed." },
                { name: "Strategic Thinking", desc: "Elevate your thinking to tackle complex problems and develop strategies that drive team success." },
                { name: "Successful Delegation", desc: "Sharpen your delegation skills and create space for your most essential work." },
                { name: "The Art of Recognition", desc: "Unlock your team\u2019s best work through tactful recognition." },
              ].map((session) => (
                <div
                  key={session.name}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] transition-colors"
                >
                  <h4 className="text-sm font-bold text-white mb-2">{session.name}</h4>
                  <p className="text-xs text-white/50 leading-relaxed">{session.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bite-sized programs */}
          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
              Bite-sized programs to target specific challenges
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* For All Employees */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <p className="text-xs font-bold tracking-wider uppercase text-white/60 shrink-0">
                    For All Employees:
                  </p>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { title: "Team Alignment", sessions: 5, color: "#F59E0B", desc: "Help people understand how their work supports broader outcomes, building clarity, focus, and shared direction." },
                    { title: "Personal Wellness", sessions: 5, color: "#F59E0B", desc: "Support individuals in navigating stress and burnout with practical ways to restore balance and sustain their energy." },
                    { title: "Growth Mindset", sessions: 5, color: "#F59E0B", desc: "Help people strengthen confidence, lean into challenges, and take meaningful ownership of their growth." },
                    { title: "Collaboration", sessions: 5, color: "#F59E0B", desc: "Give teams the tools to communicate openly, stay aligned, and work through friction with ease." },
                    { title: "Change & Resilience", sessions: 6, color: "#F59E0B", desc: "Help individuals manage change fatigue, strengthen emotional resilience, and stay steady during periods of transition." },
                    { title: "Strategic Execution", sessions: 5, color: "#EC4899", desc: "Help teams sharpen their priorities, strengthen strategic thinking, and deliver work with greater consistency and focus." },
                    { title: "Values in Action", sessions: 5, color: "#10B981", desc: "Help people translate values into action so decisions, communication, and behaviors are aligned and intentional." },
                    { title: "Belonging & Inclusion", sessions: 5, color: "#10B981", desc: "Develop teams that create inclusive spaces where everyone feels recognized, supported, and able to contribute fully." },
                  ].map((program) => (
                    <div
                      key={program.title}
                      className="bg-white/5 border border-white/10 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-white">{program.title}</h4>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2"
                          style={{ backgroundColor: program.color, color: "#fff" }}
                        >
                          {program.sessions} sessions
                        </span>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">
                        {program.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* For Leaders */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <p className="text-xs font-bold tracking-wider uppercase text-white/60 shrink-0">
                    For Leaders:
                  </p>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: "Leader Essentials", sessions: 7, color: "#10B981", desc: "Equip new and emerging leaders with core skills, confidence, and support to lead effectively from day one." },
                    { title: "Leader Accelerator", sessions: 7, color: "#10B981", desc: "Help leaders strengthen their ability to coach others, develop talent, and handle challenging situations effectively." },
                    { title: "Leader Alignment", sessions: 5, color: "#10B981", desc: "Help leaders translate strategy into clear priorities and consistent communication that keeps teams aligned and focused." },
                    { title: "Lead Through Change", sessions: 6, color: "#EC4899", desc: "Develop leaders who can steady their teams, reduce resistance, and keep people focused through uncertainty." },
                  ].map((program) => (
                    <div
                      key={program.title}
                      className="bg-white/5 border border-white/10 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-white">{program.title}</h4>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2"
                          style={{ backgroundColor: program.color, color: "#fff" }}
                        >
                          {program.sessions} sessions
                        </span>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">
                        {program.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* See it for yourself — CTA banner */}
      <section className="relative bg-white" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#6E3FCC] rounded-xl px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
            <p className="text-white text-sm md:text-base text-center md:text-left">
              <span className="font-bold">See it for yourself:</span>{" "}
              Learn how Campfire can help your leaders build these habits and drive real results.
            </p>
            <a
              href="https://calendly.com/getcampfire/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-2.5 text-xs font-semibold text-[#6E3FCC] bg-white rounded-md hover:bg-gray-100 transition-colors uppercase tracking-wider"
            >
              Book a Call
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
                    ? "text-white border-transparent shadow-lg shadow-purple-200 md:scale-105 md:-my-2"
                    : "bg-[#F5F4F1] text-gray-900 border-gray-100"
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
