import Image from "next/image";
import Link from "next/link";
import TestimonialCarousel from "./components/TestimonialCarousel";
import ProductShowcase from "./components/ProductShowcase";
import SessionWalkthrough from "./components/SessionWalkthrough";

export default function Home() {
  return (
    <main>
      {/* ==================== HERO ==================== */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/hero-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-20 md:pb-24">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Text */}
            <div className="flex-1 max-w-xl">
              <p className="text-sm font-bold tracking-wider uppercase mb-4" style={{ color: "#ffffff" }}>
                For HR &amp; Talent Development Leaders
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                Build Better Leaders
                <br />
                &mdash;Your Way, at Scale
              </h1>
              <p
                className="mt-6 text-lg md:text-xl leading-relaxed max-w-lg font-medium"
                style={{ color: "#FFC28A" }}
              >
                Your managers need support. Your team is stretched thin.
                Campfire was built for both.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/solutions"
                  className="px-7 py-3.5 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide"
                  style={{ backgroundColor: "#E055CB" }}
                >
                  Explore Solutions
                </Link>
                <Link
                  href="/contact"
                  className="px-7 py-3.5 text-sm font-semibold text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wide"
                >
                  Talk to Us
                </Link>
              </div>
            </div>

            {/* Product screenshot */}
            <div className="flex-1 hidden md:block">
              <Image
                src="/product-screen.webp"
                alt="Campfire platform — live workshop with participants, activities, and facilitation tools"
                width={1983}
                height={1448}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Logo bar — inside hero so bg image continues behind */}
        <div className="relative z-10">
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(58, 2, 168, 0.25)" }} />
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
            <p className="text-center text-xs font-bold text-white/60 tracking-wider uppercase mb-8">
              Trusted by companies like...
            </p>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-y-8 gap-x-6 max-w-4xl mx-auto">
              {[
                { src: "/cotopaxi.png", alt: "Cotopaxi", w: 140, h: 50 },
                { src: "/cricut logo.png", alt: "Cricut", w: 120, h: 60 },
                { src: "/dermalogica.png", alt: "Dermalogica", w: 300, h: 40 },
                { src: "/plusgrade.png", alt: "Plusgrade", w: 200, h: 50 },
                { src: "/enveda.png", alt: "Enveda Biosciences", w: 180, h: 75 },
                { src: "/pdq.png", alt: "PDQ", w: 100, h: 65 },
              ].map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.w}
                    height={logo.h}
                    className="h-7 md:h-9 w-auto object-contain brightness-0 invert"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OUTCOMES-DRIVEN CULTURE ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Scale an{" "}
            <span className="text-[#6E3FCC]">Outcomes-Driven Culture</span>
          </h2>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            When people understand the mission, know what outcomes matter, and
            feel connected to the purpose behind their work, everything changes.
            Burnout drops because effort becomes sustainable and directed.
            Micromanagement fades because leaders can trust their people to make
            good decisions. Teams stop spinning their wheels and start moving
            together&mdash;with clarity, confidence, and accountability that
            doesn&apos;t require constant oversight.
          </p>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            Campfire helps you build that kind of culture&mdash;where leadership
            development isn&apos;t a checkbox, it&apos;s the engine that drives
            alignment, performance, and the kind of environment where people
            actually want to do their best work.
          </p>
        </div>
      </section>

      {/* ==================== LEADERSHIP DEVELOPMENT ==================== */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Leadership Development, Without the Overhead
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Flexible Content",
                desc: "A curated library of practical, live leadership workshops you can mix, match, and customize to your needs.",
                icon: "/kite-icon.webp",
                iconAlt: "Kite icon representing flexible, adaptable content",
              },
              {
                title: "Scalable Facilitation",
                desc: "Expert facilitators\u2014or your trained leaders\u2014for delivering consistent, high-quality experiences across teams and geographies.",
                icon: "/phoenix-icon.webp",
                iconAlt: "Phoenix icon representing scalable growth and transformation",
              },
              {
                title: "Program Support",
                desc: "End-to-end scheduling, coordination, tracking, and logistics to help lean talent teams run programs smoothly and scale with confidence.",
                icon: "/plant-icon.webp",
                iconAlt: "Plant icon representing nurturing program support",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-8 border border-gray-100"
              >
                <div className="mb-5">
                  <Image
                    src={card.icon}
                    alt={card.iconAlt}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Built For — plain text */}
          <p className="text-center mt-10 text-sm text-gray-500">
            <span className="font-bold text-gray-700">Built For:</span>{" "}
            HR leaders scaling leadership development{" "}
            + L&amp;D teams with lean headcount{" "}
            + Talent leaders building and shaping culture
          </p>

          <div className="text-center mt-8">
            <Link
              href="/solutions"
              className="inline-block px-7 py-3.5 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT SHOWCASE ==================== */}
      <ProductShowcase />

      {/* ==================== FREE TRIAL RIBBON ==================== */}
      <section className="bg-[#1C1334] py-16 overflow-hidden">
        {/* Mobile: pink topo only, no image */}
        <div className="md:hidden px-6">
          <div
            className="px-8 py-10 text-center"
            style={{
              backgroundImage: "url('/pink-topo-bg.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="text-xl font-bold text-white">
              You&apos;re 30 seconds away from experiencing Campfire
            </h2>
            <p className="mt-3 text-sm text-white/80">
              Sign up free, explore our full catalog, and try our
              industry-leading platform. No credit card required.
            </p>
            <a
              href="https://tools.getcampfire.com/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block px-7 py-3.5 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
            >
              Try Campfire
  </a>
          </div>
        </div>

        {/* Desktop: image drives height, pink box overlays from left */}
        <div className="hidden md:block relative">
          {/* Image — right side, drives the section height */}
          <div className="ml-auto w-[50%] max-w-[900px]">
            <Image
              src="/campfire.webp"
              alt="Campfire session with participants collaborating"
              width={800}
              height={600}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>

          {/* Pink topo — fixed min-width, slides over image as viewport shrinks */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 min-w-[650px] text-center"
            style={{
              width: "max(60%, calc(100% - 800px))",
              backgroundImage: "url('/pink-topo-bg.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "clamp(2.5rem, 3vw, 4rem) clamp(2rem, 4vw, 4rem)",
            }}
          >
            <h2
              className="font-bold text-white max-w-[840px] mx-auto"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              You&apos;re 30 seconds away from experiencing Campfire
            </h2>
            <p
              className="text-white/80 max-w-[840px] mx-auto"
              style={{
                fontSize: "clamp(0.875rem, 1.1vw, 1.125rem)",
                marginTop: "clamp(0.75rem, 1.2vw, 1.25rem)",
              }}
            >
              Sign up free, explore our full catalog, and try our
              industry-leading platform. No credit card required.
            </p>
            <a
              href="https://tools.getcampfire.com/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
              style={{
                fontSize: "clamp(0.875rem, 1vw, 1rem)",
                padding: "clamp(0.75rem, 1vw, 1rem) clamp(1.5rem, 2vw, 2rem)",
                marginTop: "clamp(1.5rem, 2vw, 2.5rem)",
              }}
            >
              Try Campfire
            </a>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="py-20 bg-[#1C1334]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Built to fit the rhythm of real work{" "}
              <span className="text-[#A84AEB]">&mdash; and drive lasting change</span>
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Campfire brings leadership development into everyday work through a
              simple, repeatable flow that scales across your organization.
            </p>
          </div>

          {/* Gradient-bordered cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              {
                step: "01",
                label: "Content",
                title: "Identify topics your leaders need most",
                desc: "You design your program by choosing the sessions your people need most.",
                borderColor: "#8252E1",
              },
              {
                step: "02",
                label: "Conversations",
                title: "Provide guided conversations",
                desc: "Live, facilitated discussions create space for reflection, peer learning, and meaningful connection.",
                borderColor: "#A84AEB",
              },
              {
                step: "03",
                label: "Application",
                title: "Apply insights to your real work",
                desc: "Leaders put tools to use and practice new behaviors in meetings, one-on-ones, and day-to-day decisions.",
                borderColor: "#D65CE9",
              },
              {
                step: "04",
                label: "Reinforcement",
                title: "Reinforce behavior change over time",
                desc: "Skills are revisited and strengthened through ongoing experiences and resources.",
                borderColor: "#EE81DD",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl p-6 md:p-8"
                style={{ border: `2px solid ${item.borderColor}` }}
              >
                <p
                  className="text-sm font-bold mb-4"
                  style={{ color: item.borderColor }}
                >
                  {item.step}: {item.label}
                </p>
                <h3 className="text-base font-bold text-white mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIAL ==================== */}
      <TestimonialCarousel />

      {/* ==================== PROOF ==================== */}
      <section className="relative overflow-hidden">
        <div className="py-16" style={{ backgroundImage: "url('/purple-topo.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
              Results You Can Trust
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "6,000+", label: "Sessions delivered" },
                { number: "25+", label: "Years of experience" },
                { number: "250+", label: "Companies serviced" },
                { number: "10,000+", label: "Leaders supported" },
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

      {/* ==================== PULL QUOTE ==================== */}
      <section className="bg-white">
        <div className="h-[3px] bg-gradient-to-r from-[#6E3FCC] to-[#3B82F6]" />
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <blockquote className="text-3xl md:text-[2.75rem] font-medium text-[#1E2A4A] leading-[1.3]">
              &ldquo;Our biggest priority right now is improving our
              front-line managers because that&apos;s the{" "}
              <span className="text-[#6E3FCC]">single biggest
              lever we have</span> in improving our results.&rdquo;
            </blockquote>
            <p className="mt-8 text-lg text-gray-500">
              &mdash; CEO, 1,200-employee company
            </p>
          </div>
        </div>
      </section>

      {/* ==================== OUTCOMES ==================== */}
      <section className="pt-20 pb-28 bg-[#F8F5FC]">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            {/* Left heading */}
            <div className="lg:w-[420px] shrink-0">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1E2A4A] leading-[1.2] whitespace-nowrap">
                Impact you can feel
                <br />
                <span className="text-[#6E3FCC]">&mdash;Company-wide</span>
              </h2>
            </div>

            {/* Right rows */}
            <div className="flex-1 space-y-4">
              {[
                {
                  title: "Better Conversations",
                  desc: "Leaders communicate more clearly, listen more effectively, and navigate difficult conversations with confidence and care.",
                },
                {
                  title: "Stronger Alignment",
                  desc: "Teams operate with shared language, clearer expectations, and better decision-making\u2014reducing friction and confusion.",
                },
                {
                  title: "Healthier Team Dynamics",
                  desc: "Trust increases, feedback improves, and people feel more supported, engaged, and accountable.",
                },
                {
                  title: "Consistent Leadership Behaviors",
                  desc: "Leadership expectations don\u2019t live in a slide deck. They show up in meetings, 1:1s, and everyday decisions across the organization.",
                },
                {
                  title: "Improved Performance + Results",
                  desc: "Clearer priorities, better execution, and stronger follow-through lead to measurable improvements in how teams perform.",
                },
              ].map((impact, i) => {
                const circleColors = ["#521DB5", "#896DF0", "#A84AEB", "#D65CE9", "#EE81DD"];
                return (
                <div
                  key={impact.title}
                  className="relative bg-white rounded-xl grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] items-center gap-5 md:gap-4 pl-12 pr-8 py-6"
                >
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full text-white text-sm font-bold flex items-center justify-center z-10"
                    style={{ backgroundColor: circleColors[i] }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#1E2A4A]">
                    {impact.title}
                  </h3>
                  <div className="hidden md:block w-px h-full bg-gray-200" />
                  <p className="text-gray-500 text-base leading-relaxed">
                    {impact.desc}
                  </p>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT SHOWS UP ==================== */}
      <section className="relative pb-20 bg-white" style={{ paddingTop: "178px" }}>
        {/* Purple CTA banner — bridges between sections */}
        <div className="absolute left-0 right-0 -top-9 z-10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-[#6E3FCC] rounded-xl px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
              <p className="text-white text-sm md:text-base text-center md:text-left">
                <span className="font-bold">See it for yourself:</span>{" "}
                Learn how Campfire can help your leaders build these habits and drive real results.
              </p>
              <Link
                href="/contact"
                className="shrink-0 px-6 py-2.5 text-xs font-semibold text-[#6E3FCC] bg-white rounded-md hover:bg-gray-100 transition-colors uppercase tracking-wider"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
              Flexible formats that meet leaders where they are
            </h2>
            <p className="mt-5 text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Campfire offers flexible format options that work across different
              teams, timelines, and goals.
              <br />
              Organizations can start small or go
              broad, choosing the right mix for their people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Live virtual workshops",
                desc: "Interactive sessions focused on real leadership challenges, designed to build shared language, reflection, and practical skills leaders can use right away.",
                icon: "/groups-icon.webp",
                iconAlt: "Groups icon",
              },
              {
                title: "Time-bound programs",
                desc: "Short series or focused initiatives that create structure and momentum, while still reinforcing skills beyond a defined start and end.",
                icon: "/timer.webp",
                iconAlt: "Timer icon",
              },
              {
                title: "Cohorts",
                desc: "Small-group experiences that connect leaders facing similar challenges, creating space for peer learning, accountability, and deeper conversation.",
                icon: "/reduce_capacity.webp",
                iconAlt: "Cohorts icon",
              },
              {
                title: "Offsites and gatherings",
                desc: "High-impact moments for alignment, connection, and culture-building\u2014designed to create momentum that carries into everyday work.",
                icon: "/flight_takeoff.webp",
                iconAlt: "Takeoff icon",
              },
            ].map((format) => (
              <div
                key={format.title}
                className="bg-[#F5F4F1] rounded-2xl p-8 border border-gray-200"
              >
                <div className="flex justify-end mb-8">
                  <Image
                    src={format.icon}
                    alt={format.iconAlt}
                    width={36}
                    height={36}
                    className="w-9 h-9 object-contain"
                  />
                </div>
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

      {/* ==================== SESSION WALKTHROUGH ==================== */}
      <SessionWalkthrough />

      {/* ==================== FINAL CTA ==================== */}
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
            Ready to transform your people and culture?
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
            Schedule a conversation with us. You bring your goals and
            challenges, and we&apos;ll think with you about practical next
            steps.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg uppercase tracking-wide"
              style={{ backgroundColor: "#E055CB" }}
            >
              Book a Call
            </Link>
            <a
              href="https://tools.getcampfire.com/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-sm font-semibold text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wide"
            >
              Explore Workshops
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
