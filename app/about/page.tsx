import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "../components/TrackedLink";
import Image from "next/image";
import ScrollEmbers from "../components/ScrollEmbers";
import GrowingVines from "../components/GrowingVines";
import ImpactCards from "../components/ImpactCards";
import DancingCarlos from "../components/DancingCarlos";
import FacilitatorGrid from "../components/FacilitatorGrid";

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
      <link rel="preload" as="image" href="/clear-topo.webp" type="image/webp" />
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
                <GrowingVines>actually grow.</GrowingVines>
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
                { src: "/steve.webp", name: "Steve Arntz", title: "CEO & Co-founder", linkedin: "https://www.linkedin.com/in/stevearntz/" },
                { src: "/marinne.webp", name: "Marinne Pearson", title: "Growth & Co-founder", linkedin: "https://www.linkedin.com/in/marinnepearson/" },
                { src: "/camara.webp", name: "Camara Pender", title: "Product & Experience", linkedin: "https://www.linkedin.com/in/camara-pender-nabrotzky-4615738a/" },
                { src: "/ella.webp", name: "Ella Wright", title: "Customer Experience", linkedin: "https://www.linkedin.com/in/ellawright801/" },
                { src: "/marsha.webp", name: "Carlos Feliciano-Barba", title: "Engineering", marsha: true },
              ].map((person) => (
                <div key={person.name}>
                  {"marsha" in person && person.marsha ? (
                    <DancingCarlos />
                  ) : "linkedin" in person && person.linkedin ? (
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="block aspect-square rounded-xl overflow-hidden mb-3 bg-gray-200">
                      <Image
                        src={person.src}
                        alt={person.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  ) : (
                    <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-gray-200">
                      <Image
                        src={person.src}
                        alt={person.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <p className="font-bold text-gray-900 text-lg flex items-center gap-1.5">
                    {"linkedin" in person && person.linkedin ? (
                      <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline [&:visited]:text-inherit [&:hover]:text-inherit">{person.name}</a>
                    ) : (
                      person.name
                    )}
                    {"linkedin" in person && person.linkedin && (
                      <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn`}>
                        <svg className="w-4 h-4 text-[#0A66C2] relative top-[-1px]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </p>
                  <p className="text-base text-gray-500">{person.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Facilitators */}
          <div className="mt-20">
            <p className="text-sm font-bold tracking-wider uppercase mb-2" style={{ color: "#262F56" }}>
              Our Facilitators
            </p>
            <div className="w-full h-px bg-gray-200 mb-10" />
            <FacilitatorGrid />
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

          <ImpactCards />

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
              <TrackedLink
                href="/contact"
                eventName="cta_click"
                eventParams={{ cta_text: "Start a Conversation", page: "about", location: "final_cta" }}
                className="flex items-center justify-center px-7 h-11 text-sm font-semibold text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wide"
              >
                Start a Conversation
              </TrackedLink>
              <TrackedLink
                href="/solutions"
                eventName="cta_click"
                eventParams={{ cta_text: "See How It Fits", page: "about", location: "final_cta" }}
                className="flex items-center justify-center px-7 h-11 text-sm font-semibold text-white border-2 border-white/50 rounded-lg hover:bg-white/10 hover:border-white/70 transition-colors uppercase tracking-wide"
              >
                See How It Fits
              </TrackedLink>
            </div>
          </div>
          <p className="hidden-egg">You made it. Welcome to the inner circle.</p>
        </div>
      </section>
    </main>
  );
}
