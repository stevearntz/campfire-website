import Image from "next/image";
import Link from "next/link";
import TestimonialCarousel from "./components/TestimonialCarousel";
import ProductShowcase from "./components/ProductShowcase";
import SessionWalkthrough from "./components/SessionWalkthrough";
import PlatformIllustration from "./components/PlatformIllustration";
import MarshaEgg from "./components/MarshaEgg";
import AirplaneEgg from "./components/AirplaneEgg";
import RhythmEgg from "./components/RhythmEgg";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://getcampfire.com/#organization",
      name: "Campfire",
      url: "https://getcampfire.com",
      logo: "https://getcampfire.com/campfire-logo.webp",
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@getcampfire.com",
        contactType: "sales",
      },
      sameAs: ["https://www.linkedin.com/company/getcampfire"],
    },
    {
      "@type": "WebSite",
      "@id": "https://getcampfire.com/#website",
      url: "https://getcampfire.com",
      name: "Campfire",
      publisher: { "@id": "https://getcampfire.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Campfire",
      applicationCategory: "BusinessApplication",
      description:
        "Leadership development platform with 50+ live workshops, scalable facilitation, and program support for growing companies.",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        category: "Leadership Development",
      },
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ==================== HERO ==================== */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/hero-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-[70px] pb-12 md:pb-16">
          {/* Stacked hero: text centered on top */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight">
              Build Better Leaders
              <br />
              &mdash;Your Way
            </h1>
            <p
              className="mt-6 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto"
              style={{ color: "#FFC28A" }}
            >
              Everything you expect from leadership development
              &mdash; made flexible to fit your brand, your frameworks, and your culture.
              Designed for modern teams.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/solutions"
                className="px-7 py-3.5 text-sm font-semibold leading-none text-white rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide"
                style={{ backgroundColor: "#E055CB" }}
              >
                Explore Solutions
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 text-sm font-semibold leading-none text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wide"
              >
                Talk to Us
              </Link>
            </div>
          </div>

          {/* Platform illustration — full width below */}
          <div className="mt-12 md:mt-16 mx-auto" style={{ maxWidth: "1310px" }}>
            <PlatformIllustration />
          </div>
        </div>

        {/* Logo bar — inside hero so bg image continues behind */}
        <div className="relative z-10">
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(58, 2, 168, 0.25)" }} />
          <div className="relative z-10 mx-auto px-2 pt-6 pb-10" style={{ maxWidth: "1200px" }}>
            <p className="text-center text-xs font-bold text-white tracking-wider uppercase mb-5">
              Trusted by distributed, high-growth teams like...
            </p>
            <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-between gap-y-8 gap-x-6 md:gap-x-0">
              {[
                { src: "/cotopaxi-logo.webp", alt: "Cotopaxi", w: 2696, h: 887, cls: "h-8 md:h-10" },
                { src: "/dermalogica-logo.webp", alt: "Dermalogica", w: 2207, h: 241, cls: "h-5 md:h-6" },
                { src: "/cricut-logo.webp", alt: "Cricut", w: 896, h: 247, cls: "h-5 md:h-6" },
                { src: "/nuvei-logo.webp", alt: "Nuvei", w: 1428, h: 475, cls: "h-6 md:h-7", mobileHidden: true },
                { src: "/pdq-logo.webp", alt: "PDQ", w: 510, h: 198, cls: "h-4 md:h-5", mobileHidden: true },
                { src: "/plusgrade-logo.webp", alt: "Plusgrade", w: 1882, h: 277, cls: "h-5 md:h-6" },
                { src: "/enveda-logo.webp", alt: "Enveda Biosciences", w: 1537, h: 507, cls: "h-8 md:h-9", mobileHidden: true },
              ].map((logo) => (
                <div key={logo.alt} className={`flex items-center justify-center ${'mobileHidden' in logo && logo.mobileHidden ? 'hidden md:flex' : ''}`}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.w}
                    height={logo.h}
                    className={`${logo.cls} w-auto brightness-0 invert`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OUTCOMES-DRIVEN CULTURE ==================== */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 whitespace-nowrap">
              Leadership development must <span className="text-[#6E3FCC]">fit your reality</span>
            </h2>
            <p className="mt-5 text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
              No two organizations share the same culture, leadership challenges, or moments of growth.
              Development only works when it adapts to how your people actually work&mdash;not the other way around.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              {
                title: "Different teams need different support",
                desc: "New and experienced leaders face different challenges at different times.",
                gradient: "linear-gradient(to right, #EE80DD, #DD66E5)",
                dashColor: "#EE80DD",
              },
              {
                title: "Culture shapes how leadership shows up",
                desc: "Behaviors are shaped by your company\u2019s values and dynamics.",
                gradient: "linear-gradient(to right, #DC65E6, #C054EA)",
                dashColor: "#DC65E6",
              },
              {
                title: "Timing matters as much as content",
                desc: "Leaders need support when challenges appear\u2014not months later.",
                gradient: "linear-gradient(to right, #BE53EA, #A04CE9)",
                dashColor: "#BE53EA",
              },
              {
                title: "Development has to live inside real work",
                desc: "Growth sticks when it happens in everyday conversations and decisions.",
                gradient: "linear-gradient(to right, #9E4CE8, #8252E1)",
                dashColor: "#9E4CE8",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative bg-[#F7F6F7] rounded-2xl text-center border border-gray-100 overflow-hidden flex flex-col items-center px-6 pt-10 pb-8"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ background: item.gradient }}
                />
                <h3 className="text-base font-bold text-[#1E2A4A] mb-4 leading-snug">
                  {item.title}
                </h3>
                <div className="w-6 h-0.5 mb-4" style={{ backgroundColor: item.dashColor }} />
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== LEADERSHIP DEVELOPMENT ==================== */}
      <section className="py-20" style={{ backgroundColor: "#F7F6F7" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              A flexible system, <span className="text-[#6E3FCC]">built around your needs</span>
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Customize what you teach, how you deliver it, and how programs
              run&mdash;so development fits your organization seamlessly.
            </p>
          </div>

          <style>{`
            @keyframes wiggle{0%,100%{transform:rotate(0deg)}25%{transform:rotate(-8deg)}75%{transform:rotate(8deg)}}
            @keyframes flap{0%,100%{transform:translateY(0) scaleY(1)}50%{transform:translateY(-6px) scaleY(1.05)}}
            @keyframes sway{0%,100%{transform:rotate(0deg) scaleY(1)}33%{transform:rotate(-5deg) scaleY(1.03)}66%{transform:rotate(5deg) scaleY(1.03)}}
            .icon-wiggle:hover img{animation:wiggle 0.5s ease-in-out infinite}
            .icon-flap:hover img{animation:flap 0.4s ease-in-out infinite}
            .icon-sway:hover img{animation:sway 0.8s ease-in-out infinite;transform-origin:bottom center}
          `}</style>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {[
              {
                title: "Adaptable content",
                desc: "Choose and shape sessions around the leadership challenges your teams are facing right now.",
                icon: "/kite.webp",
                iconAlt: "Kite icon representing adaptable content",
                hoverClass: "icon-wiggle",
              },
              {
                title: "Flexible facilitation",
                desc: "Deliver sessions with our facilitators or your own leaders\u2014whatever works best for your teams.",
                icon: "/phoenix.webp",
                iconAlt: "Phoenix icon representing flexible facilitation",
                hoverClass: "icon-flap",
              },
              {
                title: "Program support",
                desc: "We handle the logistics behind the scenes so programs fit into your workflow without extra lift.",
                icon: "/plant.webp",
                iconAlt: "Plant icon representing program support",
                hoverClass: "icon-sway",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-8 border border-gray-100"
              >
                <div className={`mb-5 ${card.hoverClass}`}>
                  <Image
                    src={card.icon}
                    alt={card.iconAlt}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-lg leading-snug">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Built For */}
          <p className="text-center mt-10 text-lg text-gray-500">
            <span className="font-bold text-gray-800">Built for:</span>{" "}
            HR leaders scaling leadership development{" "}
            + L&amp;D teams with lean headcount{" "}
            + Talent leaders building and shaping culture
          </p>

          <div className="text-center mt-8">
            <Link
              href="/solutions"
              className="inline-block px-7 py-3.5 text-sm font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
            >
              Explore Solutions
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
            <p className="mt-3 text-base text-white/80">
              Sign up free, explore our full catalog, and try our
              industry-leading platform.<br />No credit card required.
            </p>
            <a
              href="https://meet.getcampfire.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block px-7 py-3.5 text-sm font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
            >
              Try Campfire
  </a>
          </div>
        </div>

        {/* Desktop: image drives height, pink box overlays from left */}
        <div className="hidden md:block relative">
          {/* Image — right side, drives the section height */}
          <MarshaEgg />

          {/* Pink topo — fixed min-width, slides over image as viewport shrinks */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 min-w-[650px] text-center rounded-r-2xl"
            style={{
              width: "max(60%, calc(100% - 800px))",
              backgroundImage: "url('/pink-topo-bg.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "clamp(2.5rem, 3vw, 4rem) clamp(2rem, 4vw, 4rem)",
            }}
          >
            <h2
              className="font-bold text-white max-w-[840px] mx-auto whitespace-nowrap"
              style={{ fontSize: "clamp(1.1rem, 2vw, 2.25rem)" }}
            >
              You&apos;re 30 seconds away from experiencing Campfire
            </h2>
            <p
              className="text-white/80 max-w-[840px] mx-auto"
              style={{
                fontSize: "clamp(1.125rem, 1.4vw, 1.45rem)",
                marginTop: "clamp(0.75rem, 1.2vw, 1.25rem)",
              }}
            >
              Sign up free, explore our full catalog, and try our
              industry-leading platform.<br />No credit card required.
            </p>
            <a
              href="https://meet.getcampfire.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
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
            <h2 className="text-3xl md:text-4xl font-bold text-white max-w-5xl mx-auto">
              Built to fit the <RhythmEgg /> of real work <span className="text-[#6E3FCC]">&mdash; and drive lasting change</span>
            </h2>
            <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
              Campfire brings leadership development into everyday work through a
              simple, repeatable flow that scales across your organization.
            </p>
          </div>

          {/* Gradient-bordered cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-[90%] mx-auto">
            {[
              {
                step: "01",
                label: "Content",
                title: "Identify topics your leaders need most",
                desc: "You choose the sessions your leaders need most and adapt them to fit your culture and context.",
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
                desc: "Leaders use tools and practice new behaviors in meetings, 1-on-1s, and decision-making.",
                borderColor: "#D65CE9",
              },
              {
                step: "04",
                label: "Reinforcement",
                title: "Reinforce behavior change over time",
                titleJsx: <>Reinforce behavior change over time</>,
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
                  className="text-lg font-bold mb-7"
                  style={{ color: item.borderColor }}
                >
                  {item.step}: {item.label}
                </p>
                <h3 className="text-xl font-semibold text-white mb-3 leading-tight">
                  {item.titleJsx || item.title}
                </h3>
                <p className="text-base text-white/80 leading-snug">
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
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <p className="text-base font-bold text-white/50 text-center mb-10 uppercase tracking-widest">
              Results you can trust
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "6,000+", label: "Sessions delivered" },
                { number: "25+", label: "Years of experience" },
                { number: "250+", label: "Companies serviced" },
                { number: "10,000+", label: "Leaders supported" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-6xl md:text-7xl font-bold text-white">
                    {stat.number}
                  </div>
                  <p className="mt-2 text-base font-semibold text-white/70 lowercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PULL QUOTE ==================== */}
      <section className="bg-white">
        <div className="py-30">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <blockquote className="font-semibold text-[#1E2A4A] leading-[1.3] max-w-[1140px] mx-auto" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.75rem)" }}>
              &ldquo;Our biggest priority right now is improving our
              {" "}front-line managers because that&apos;s the
              {" "}<span className="text-[#6E3FCC]">single biggest lever</span> we have in improving our&nbsp;results.&rdquo;
            </blockquote>
            <p className="mt-8 text-2xl text-gray-500">
              &mdash; CEO, 1,200-employee company
            </p>
          </div>
        </div>
      </section>

      {/* ==================== OUTCOMES ==================== */}
      <section className="pt-20 pb-28 bg-[#F8F5FC]">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-[7.5rem] items-center">
            {/* Left heading */}
            <div className="lg:w-[465px] shrink-0">
              <h2 className="text-4xl md:text-5xl font-normal text-[#1E2A4A] leading-[1.2] whitespace-nowrap">
                Impact you can feel,
                <br />
                <span className="text-[#6E3FCC]">company-wide</span>
              </h2>
            </div>

            {/* Right rows */}
            <div className="flex-1 space-y-4 ml-7 md:ml-0">
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
                  title: "Consistent leadership behaviors",
                  desc: "Leadership expectations don\u2019t live in a slide deck. They show up in meetings, 1:1s, and everyday decisions across the organization.",
                },
                {
                  title: "Improved performance + results",
                  desc: "Clearer priorities, better execution, and stronger follow-through lead to measurable improvements in how teams perform.",
                },
              ].map((impact, i) => {
                const circleColors = ["#521DB5", "#7A4CD9", "#A84AEB", "#D65CE9", "#EE81DD"];
                return (
                <div
                  key={impact.title}
                  className="relative bg-white rounded-xl grid grid-cols-1 md:grid-cols-[1fr_1px_2fr] items-center gap-5 md:gap-4 pl-14 md:pl-12 pr-8 py-6"
                >
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full text-white text-lg font-bold flex items-center justify-center z-10"
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
            <div className="rounded-xl px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg" style={{ background: "linear-gradient(to right, #6A3DC5, #896DF0)" }}>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Flexible formats that meet leaders <span className="text-[#6E3FCC]">where they are</span>
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-4xl mx-auto leading-relaxed">
              Campfire offers flexible format options that work across different teams, timelines, and goals.
              Organizations can start small or go broad, choosing the right mix for their people.
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
            ].map((format) => {
              const card = (
                <div
                  key={format.title}
                  className="bg-[#F7F6F7] rounded-2xl p-8 border border-gray-200"
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
              );
              if (format.title === "Offsites and gatherings") {
                return <AirplaneEgg key={format.title}>{card}</AirplaneEgg>;
              }
              return card;
            })}
          </div>
        </div>
      </section>

      {/* ==================== SESSION WALKTHROUGH ==================== */}
      <SessionWalkthrough />

      {/* ==================== WHY CAMPFIRE FEELS DIFFERENT ==================== */}
      <section className="pt-8 pb-20 bg-[#F8F5FC]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
            Why Campfire <span className="text-[#6E3FCC]">feels different</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto" style={{ maxWidth: "1146px" }}>
            {[
              "Learning is driven by real, in-the-moment challenges.",
              "Participants reflect before speaking, so every voice is heard.",
              "Ideas emerge from real conversations\u2014not slide decks.",
              "Growth begins in the session and extends into everyday work.",
              "Every session ends with action \u2014 not just ideas.",
              "Leaders learn with peers facing the same realities.",
              "Sessions are designed for engagement\u2014not consumption.",
              "Experiences are shaped around your culture and context.",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 bg-white rounded-xl px-6"
                style={{ width: "561px", maxWidth: "100%", height: "56px" }}
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#BF5DE9" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12.5L9.5 18L20 6" />
                </svg>
                <p className="text-gray-600" style={{ fontSize: "0.945rem" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              className="px-8 py-4 text-sm font-semibold leading-none text-white rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide"
              style={{ backgroundColor: "#E055CB" }}
            >
              Book a Call
            </Link>
            <a
              href="https://tools.getcampfire.com/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-sm font-semibold leading-none text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wide"
            >
              Explore Workshops
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
