import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollEmbers from "../components/ScrollEmbers";

export const metadata: Metadata = {
  title: "About Campfire — The Human Side of Leadership Development",
  description:
    "We started Campfire with a simple belief: leadership development should feel human — practical, honest, and built around the realities leaders face every day.",
  openGraph: {
    title: "About Campfire — The Human Side of Leadership Development",
    description:
      "We started Campfire with a simple belief: leadership development should feel human — practical, honest, and built around the realities leaders face every day.",
  },
};

export default function AboutPage() {
  return (
    <main>
      <ScrollEmbers />
      <style>{`.hidden-egg{color:transparent;font-size:0.7rem;user-select:all;text-align:center;padding-top:1rem}.hidden-egg::selection{color:#6E3FCC;background:#F8F5FC}`}</style>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="py-20" style={{ backgroundImage: "url('/clear-topo.webp'), linear-gradient(to left, #A84AEB 19%, #7F28CC 55%, #4E0DA9 100%)", backgroundSize: "100% auto, cover", backgroundPosition: "center, center" }}>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              About Us
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              The Human Side of Leadership Development
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              We started Campfire with a simple belief: leadership development
              should feel human &mdash; practical, honest, and built around the
              realities leaders face every day.
            </p>
          </div>
          <p className="hidden-egg">You found the seam. Keep pulling.</p>
        </div>
      </section>
      {/* ==================== WHY WE BUILT CAMPFIRE ==================== */}
      <section className="py-28 bg-white">
        <div className="mx-auto px-6" style={{ maxWidth: "1320px" }}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Why we built Campfire
          </h2>
          <p className="text-center text-gray-500 mb-14">
            Campfire didn&rsquo;t begin with a product idea &mdash; it began
            with a pattern we couldn&rsquo;t ignore.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/carry-load.webp"
                alt="Hikers carrying gear together"
                width={548}
                height={452}
                className="w-full h-auto max-w-md mx-auto"
              />
            </div>
            <div>
              <p className="text-lg text-gray-500 leading-relaxed mb-6">
                Typical leadership development creates moments of inspiration
                but rarely leads to lasting change. Leaders leave energized,
                only to return to full calendars and challenges they
                can&rsquo;t actually solve. Despite best efforts, development
                is still built around events instead of everyday work.
              </p>
              <p className="text-lg font-bold leading-relaxed" style={{ color: "#1C1334" }}>
                We built Campfire from the belief that leadership growth needs
                to live inside real conversations and decisions.
              </p>
            </div>
          </div>
          <p className="hidden-egg">Most people stop reading here.</p>
        </div>
      </section>
      {/* ==================== BELIEFS ==================== */}
      <section className="py-28 bg-[#F7F6F7]">
        <div className="mx-auto px-6" style={{ maxWidth: "1275px" }}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-14">
            Our beliefs about leadership
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — statement */}
            <div>
              <p className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#1C1334" }}>
                Our approach is grounded in a few simple beliefs about how
                leaders{" "}
                <span style={{ color: "#6E3FCC" }}>actually grow.</span>
              </p>
            </div>

            {/* Right — belief cards */}
            <div className="space-y-4" style={{ maxWidth: "742px" }}>
              {[
                {
                  title: "Leadership grows through conversation, not consumption.",
                  desc: "Real growth happens when leaders reflect, practice, and learn from one another \u2014 not when they passively absorb content.",
                  gradient: "linear-gradient(to bottom, #8252E1, #9F4DE8)",
                },
                {
                  title: "Development should live inside work, not outside it.",
                  desc: "The moments that shape leadership happen in meetings, decisions, and difficult conversations, not separate programs.",
                  gradient: "linear-gradient(to bottom, #A04CE9, #BF53EA)",
                },
                {
                  title: "One size rarely fits anyone.",
                  desc: "Every organization has its own culture, challenges, and pace of growth \u2014 development should adapt accordingly.",
                  gradient: "linear-gradient(to bottom, #BF53EA, #DC65E6)",
                },
                {
                  title: "Consistency matters more than intensity.",
                  desc: "Lasting change comes from ongoing practice and reinforcement, not one-time experiences.",
                  gradient: "linear-gradient(to bottom, #DC65E6, #EE81DD)",
                },
              ].map((belief) => (
                <div
                  key={belief.title}
                  className="relative bg-white rounded-xl p-6 pl-9 overflow-hidden shadow-sm"
                >
                  <div
                    className="absolute left-0 top-0 w-1 h-full"
                    style={{ background: belief.gradient }}
                  />
                  <h3 className="font-bold text-gray-900 mb-1">
                    {belief.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {belief.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="hidden-egg">Fun fact: this page has seven hidden messages.</p>
        </div>
      </section>

      {/* ==================== WHAT IT FEELS LIKE TO WORK WITH US ==================== */}
      <section className="py-28 bg-white">
        <div className="mx-auto px-6" style={{ maxWidth: "1250px" }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What it feels like to work with us
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              These principles show up in how we design sessions, partner with
              organizations, and support leaders day to day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 mx-auto" style={{ maxWidth: "1350px", columnGap: "185px" }}>
            {[
              {
                icon: "/with-you-icon.webp",
                iconW: 24,
                iconH: 28,
                title: "Built with you, not for you",
                desc: "We collaborate closely with each organization so development reflects real challenges, culture, and priorities.",
              },
              {
                icon: "/human-icon.webp",
                iconW: 26,
                iconH: 23,
                title: "Human at every step",
                desc: "Facilitation creates space for honest dialogue, reflection, and shared learning.",
              },
              {
                icon: "/practical-icon.webp",
                iconW: 23,
                iconH: 29,
                title: "Practical over theoretical",
                desc: "Sessions focus on conversations and decisions leaders are facing right now \u2014 not abstract scenarios.",
              },
              {
                icon: "/voice-icon.webp",
                iconW: 32,
                iconH: 25,
                title: "Everyone has a voice",
                desc: "Sessions are designed so leaders reflect, contribute, and learn from one another \u2014 not just listen.",
              },
              {
                icon: "/structured-icon.webp",
                iconW: 27,
                iconH: 30,
                title: "Structured but flexible",
                desc: "Programs provide consistency while adapting to different teams, timelines, and moments of growth.",
              },
              {
                icon: "/house-icon.webp",
                iconW: 29,
                iconH: 24,
                title: "Designed to last",
                desc: "Growth is reinforced over time so leadership development becomes part of how work happens, not a one-time event.",
              },
            ].map((item) => (
              <div key={item.title}>
                <Image
                  src={item.icon}
                  alt=""
                  width={item.iconW}
                  height={item.iconH}
                  className="mb-3"
                  style={{ height: "30px", width: "auto" }}
                />
                <h3 className="font-bold text-gray-900 mb-2" style={{ fontSize: "1.2rem" }}>
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed" style={{ fontSize: "1.05rem" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="hidden-egg">Okay, you&apos;re definitely not a bot.</p>
        </div>
      </section>
      {/* ==================== OUR PURPOSE ==================== */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/purpose-topo.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-sm font-bold tracking-wider uppercase text-white/70 mb-6">
            Our Purpose
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Campfire exists to help every organization create a culture where
            people do meaningful work &mdash; and go home feeling{" "}
            <span style={{ color: "#EE81DD" }}>
              better than when they started.
            </span>
          </h2>
          <p className="hidden-egg">You&apos;re thorough. We like that.</p>
        </div>
      </section>

      {/* ==================== THE HUMANS BEHIND CAMPFIRE ==================== */}
      <section className="py-28 bg-white">
        <div className="mx-auto px-6" style={{ maxWidth: "1350px" }}>
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              The humans behind Campfire
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Behind Campfire is a team that cares deeply about creating
              meaningful learning experiences and supporting leaders through real
              challenges.
            </p>
          </div>

          {/* Our Team */}
          <div className="mt-14">
            <p className="text-sm font-bold tracking-wider uppercase mb-8" style={{ color: "#262F56" }}>
              Our Team
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {[
                { src: "/steve.webp", name: "Steve Arntz", title: "CEO & Co-founder" },
                { src: "/marinne.webp", name: "Marinne Pearson", title: "Growth & Co-founder" },
                { src: "/camara.webp", name: "Camara Pender", title: "Product & Experience" },
                { src: "/carlos.webp", name: "Carlos Feliciano-Barba", title: "Engineering" },
                { src: "/ella.webp", name: "Ella Wright", title: "Customer Experience" },
              ].map((person) => (
                <div key={person.name}>
                  <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-gray-200">
                    <Image
                      src={person.src}
                      alt={person.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-bold text-gray-900 text-sm">{person.name}</p>
                  <p className="text-sm text-gray-500">{person.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Facilitators — coming soon */}
          <div className="mt-20">
            <p className="text-sm font-bold tracking-wider uppercase mb-8" style={{ color: "#262F56" }}>
              Our Facilitators
            </p>
            <div className="relative rounded-2xl overflow-hidden border border-gray-100" style={{ backgroundImage: "url('/clear-topo.webp'), linear-gradient(to right, #6E3FCC 0%, #9D88ED 100%)", backgroundSize: "100% auto, cover", backgroundPosition: "center, center" }}>
              <div className="px-8 py-14 md:py-16 text-center">
                <p className="text-white/80 text-sm font-bold tracking-wider uppercase mb-3">
                  Coming Soon
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Meet the people who bring Campfire to life
                </h3>
                <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
                  Our facilitators are experienced leaders, coaches, and practitioners
                  who create space for honest conversations and real growth. We&apos;re
                  putting the finishing touches on their profiles &mdash; check back
                  soon.
                </p>
                <div className="mt-8 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-end justify-center overflow-hidden"
                      style={{ marginLeft: i > 0 ? "-8px" : "0" }}
                    >
                      <svg viewBox="0 0 60 60" className="w-10 h-10 md:w-12 md:h-12 opacity-40" fill="white">
                        <circle cx="30" cy="20" r="9" />
                        <ellipse cx="30" cy="52" rx="16" ry="14" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== IMPACT ==================== */}
      <section className="py-28 bg-[#F8F5FC]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              The impact we see
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Over time, we&apos;ve seen the same shifts happen again and
              again &mdash; in how leaders show up and how teams experience work.
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

          <p className="hidden-egg">Still here? We respect the hustle.</p>
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
          <p className="hidden-egg">You made it. Welcome to the inner circle.</p>
        </div>
      </section>
    </main>
  );
}
