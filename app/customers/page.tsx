import Link from "next/link";
import Image from "next/image";

const caseStudies = [
  {
    company: "Series B SaaS Company",
    industry: "Technology",
    size: "200 employees",
    challenge:
      "Promoted 12 engineers to management in 6 months with zero leadership training. New managers were struggling with 1:1s, feedback, and team dynamics.",
    solution:
      "Rolled out Campfire's New Manager Foundations bundle — 6 workshops over 8 weeks, with peer cohorts of 8-10 managers.",
    results: [
      "Manager confidence scores up 40% in post-program surveys",
      "1:1 satisfaction ratings from direct reports improved significantly",
      "2 managers identified as high-potential and fast-tracked to senior leadership",
    ],
    quote:
      "Our new managers finally had a space to be honest about what they didn't know. That vulnerability turned into real growth.",
    quotePerson: "VP of People",
  },
  {
    company: "Distributed Healthcare Tech",
    industry: "Healthcare Technology",
    size: "500 employees across 3 time zones",
    challenge:
      "Rapid growth during 2023-2024 left managers overwhelmed. High turnover in middle management and declining engagement scores.",
    solution:
      "Implemented a quarterly Campfire rhythm — ongoing workshops on change leadership, psychological safety, and manager effectiveness.",
    results: [
      "Manager turnover dropped 25% year-over-year",
      "Engagement scores in manager-led teams improved by 15 points",
      "HR team saved an estimated 200+ hours by not building training in-house",
    ],
    quote:
      "Campfire became our leadership development program. We went from nothing to a system our managers actually look forward to.",
    quotePerson: "Head of Talent",
  },
  {
    company: "Growing Professional Services Firm",
    industry: "Professional Services",
    size: "150 employees, fully remote",
    challenge:
      "Team leads were strong technically but lacked people management skills. Client escalations were often traced back to internal team misalignment.",
    solution:
      "Custom Campfire program focused on team alignment, delegation, and difficult conversations. Delivered monthly over 6 months.",
    results: [
      "Client satisfaction scores improved as internal team dynamics got stronger",
      "Team leads reported feeling significantly more prepared for difficult conversations",
      "Internal promotion rate increased as leaders developed coaching skills",
    ],
    quote:
      "The workshops didn't feel like corporate training. They felt like real conversations about real problems. That's why people showed up.",
    quotePerson: "COO",
  },
];

export default function CustomersPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="py-20" style={{ backgroundImage: "url('/purple-topo.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              Customer Stories
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Trusted by Teams That Care
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              See how companies like yours are using Campfire to develop
              stronger leaders, healthier teams, and a culture where people
              actually talk to each other about the things that matter.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Bar */}
      <section className="py-10 bg-[#262F56]">
        <div className="mx-auto px-2" style={{ maxWidth: "1200px" }}>
          <p className="text-center text-xs font-bold text-white/50 tracking-wider uppercase mb-8">
            Companies building better leaders with Campfire
          </p>
          <div className="flex flex-wrap items-center justify-between gap-y-8">
            {[
              { src: "/cotopaxi-logo.webp", alt: "Cotopaxi", w: 2696, h: 887 },
              { src: "/dermalogica-logo.webp", alt: "Dermalogica", w: 2207, h: 241 },
              { src: "/cricut-logo.webp", alt: "Cricut", w: 896, h: 247 },
              { src: "/nuvei-logo.webp", alt: "Nuvei", w: 1428, h: 475 },
              { src: "/pdq-logo.webp", alt: "PDQ", w: 510, h: 198 },
              { src: "/plusgrade-logo.webp", alt: "Plusgrade", w: 1882, h: 277 },
              { src: "/enveda-logo.webp", alt: "Enveda Biosciences", w: 1537, h: 507 },
            ].map((logo) => (
              <div key={logo.alt}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  className="h-4 md:h-5 w-auto brightness-0 invert opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {caseStudies.map((study, i) => (
            <div
              key={study.company}
              className="bg-[#F5F4F1] rounded-2xl border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="px-8 py-6" style={{ backgroundImage: "url('/purple-topo.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="flex flex-wrap items-center gap-4">
                  <h3 className="text-xl font-bold text-white">
                    {study.company}
                  </h3>
                  <span className="text-xs font-medium text-white/60 bg-white/10 px-3 py-1 rounded-full">
                    {study.industry}
                  </span>
                  <span className="text-xs font-medium text-white/60 bg-white/10 px-3 py-1 rounded-full">
                    {study.size}
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Challenge */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    The Challenge
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    What We Did
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {study.solution}
                  </p>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Results
                  </h4>
                  <ul className="space-y-2">
                    {study.results.map((result) => (
                      <li
                        key={result}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="text-[#6E3FCC] mt-0.5">
                          &#10003;
                        </span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                <div className="bg-white rounded-xl p-6 border border-gray-100 mt-4">
                  <p className="text-gray-600 italic leading-relaxed">
                    &ldquo;{study.quote}&rdquo;
                  </p>
                  <p className="mt-3 text-sm font-semibold text-gray-900">
                    — {study.quotePerson}, {study.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pull Quotes */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What people are saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "I've done leadership training before and it always felt forced. Campfire was the first time I actually wanted to come back for the next session.",
                person: "Engineering Manager",
                company: "Series C Startup",
              },
              {
                quote:
                  "As an HR team of two, we needed something we could launch fast and trust to be good. Campfire delivered on both counts — and our managers loved it.",
                person: "People Partner",
                company: "Remote-First Company",
              },
              {
                quote:
                  "My managers started having better conversations with their teams within a week. That's not something I can say about any other program we've tried.",
                person: "Chief People Officer",
                company: "Mid-Market SaaS",
              },
            ].map((item) => (
              <div
                key={item.person}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
              >
                <p className="text-gray-600 text-sm italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-gray-900 text-sm">
                    {item.person}
                  </p>
                  <p className="text-gray-400 text-sm">{item.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="py-20" style={{ backgroundImage: "url('/purple-topo-tall.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Your team is next
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Let&apos;s talk about what Campfire can do for your managers.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block px-8 py-4 text-sm font-semibold leading-none text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wide"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
