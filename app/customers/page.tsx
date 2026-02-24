import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Customer Stories — Leadership Development, Your Way",
  description:
    "See how companies like Cotopaxi, Dermalogica, Enveda, and Plusgrade are using Campfire to build leadership development around how they already operate.",
  openGraph: {
    title: "Customer Stories — Leadership Development, Your Way | Campfire",
    description:
      "Every organization hired Campfire for a different reason. The common thread? Leadership development — built their way.",
  },
};

const stories = [
  {
    company: "Cotopaxi",
    logo: "/cotopaxi-logo.webp",
    logoW: 2696,
    logoH: 887,
    logoCls: "h-8 md:h-10",
    tagline: "Building a Culture That Drives Outcomes",
    hired:
      "Cotopaxi partnered with Campfire during a period of organizational change. They wanted leadership development that reinforced their values and translated culture into daily behaviors.",
    did: "We created a leadership program using content from the Campfire library, shaped by Cotopaxi\u2019s leadership principles and values. After the first year, we continued running the aspiring leaders cohort while creating an elevated program with peer coaching and senior leadership sponsors for experienced leaders. We also partnered on quarterly culture initiatives centered around belonging and diversity.",
    today:
      "Today we run hybrid programs \u2014 their content and ours, their facilitators and ours. We\u2019ve partnered with their executive team to define what their values are, what behaviors embody them, and how to train to those behaviors across their learning programs.",
    results: [
      "Multi-level leadership pathways across emerging and experienced leaders",
      "Clear alignment between company values and leadership behaviors",
      "Executive partnership in defining and training to core behaviors",
      "A hybrid facilitation model \u2014 internal facilitators + Campfire",
      "Sustained program participation across multiple years",
    ],
  },
  {
    company: "Dermalogica",
    logo: "/dermalogica-logo.webp",
    logoW: 2207,
    logoH: 241,
    logoCls: "h-5 md:h-7",
    tagline: "Creating Space for Leaders to Grow",
    hired:
      "Dermalogica wanted to strengthen their culture of learning and create space for leaders to come together around real challenges. They weren\u2019t looking for a one-time event \u2014 they wanted a system they could run and evolve.",
    did: "We trained internal facilitators to lead a year-long calendar of sessions aligned to company priorities. As the business shifted, the program adapted \u2014 sessions were customized based on feedback, current initiatives, and emerging leadership needs.",
    today:
      "The demand for Campfire is growing. We\u2019ve enabled several facilitators across departments and regions. A recent highlight was creating a custom session based on our Adapting to Change framework and having it facilitated at two leadership offsites, one for an audience of 40+ leaders. We continue to offer sessions based on feedback and are developing an employee career development program.",
    results: [
      "Internal facilitators enabled across departments and regions",
      "Custom sessions delivered at leadership offsites for 40+ leaders",
      "Increased voluntary participation and repeat attendance",
      "Ongoing engagement analysis to refine programming",
      "Expanded into career development initiatives",
    ],
  },
  {
    company: "Enveda",
    logo: "/enveda-logo.webp",
    logoW: 1537,
    logoH: 507,
    logoCls: "h-8 md:h-10",
    tagline: "Strengthening the Leadership Bench",
    hired:
      "Enveda already had leadership development in motion. They needed a partner to strengthen it, fill strategic gaps, and reduce operational lift. They didn\u2019t want to start over \u2014 they wanted to build on what was working.",
    did: "We layered Campfire into their existing leadership efforts \u2014 supporting scheduling, facilitation, and custom content aligned to current initiatives. We complemented their work instead of replacing it.",
    today:
      "We now have two different cohorts, both with waitlists to join. We run hybrid offerings with their content, our content, custom content, and facilitators from both Campfire and Enveda. We\u2019re a partner in learning and thinking through the best way to engage leaders and develop them.",
    results: [
      "Two active cohorts with consistent waitlists",
      "Strong participation across new and experienced leaders",
      "Reduced administrative burden for internal teams",
      "Increased manager engagement and leadership momentum",
      "Ongoing partnership in shaping long-term leadership strategy",
    ],
  },
  {
    company: "Plusgrade",
    logo: "/plusgrade-logo.webp",
    logoW: 1882,
    logoH: 277,
    logoCls: "h-5 md:h-7",
    tagline: "Scaling Leadership Development",
    hired:
      "Plusgrade wanted leadership development that felt fully theirs \u2014 not outsourced. They also needed support scaling it across a growing organization without increasing internal lift.",
    did: "We co-created a fully branded leadership development experience in Plusgrade\u2019s language and identity. To participants, it felt built from scratch. Behind the scenes, Campfire handled structure, facilitation, and administration. In year one alone, we facilitated 50+ sessions.",
    today:
      "We\u2019re building custom programs for departments to address specific skill needs and enabling Plusgrade facilitators to lead peer coaching sessions. The existing custom program continues to expand as demand grows across the organization.",
    results: [
      "50+ facilitated sessions in year one",
      "High engagement and positive participant feedback",
      "Increased demand across departments",
      "Internal facilitation capability built over time",
      "A scalable leadership system aligned to Plusgrade\u2019s voice",
    ],
  },
];

export default function CustomersPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="py-20"
          style={{
            backgroundImage: "url('/purple-topo.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              Customer Stories
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Leadership Development &mdash; Your Way
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              We don&rsquo;t deliver a rigid program. We build leadership
              development around how your company already operates. Every
              organization below hired Campfire for a different reason. The
              common thread? Leadership development &mdash; built their way.
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
              { src: "/cotopaxi-logo.webp", alt: "Cotopaxi", w: 2696, h: 887, cls: "h-7 md:h-9" },
              { src: "/dermalogica-logo.webp", alt: "Dermalogica", w: 2207, h: 241, cls: "h-4 md:h-5" },
              { src: "/cricut-logo.webp", alt: "Cricut", w: 896, h: 247, cls: "h-4 md:h-5" },
              { src: "/nuvei-logo.webp", alt: "Nuvei", w: 1428, h: 475, cls: "h-5 md:h-6" },
              { src: "/pdq-logo.webp", alt: "PDQ", w: 510, h: 198, cls: "h-3 md:h-4" },
              { src: "/plusgrade-logo.webp", alt: "Plusgrade", w: 1882, h: 277, cls: "h-4 md:h-5" },
              { src: "/enveda-logo.webp", alt: "Enveda Biosciences", w: 1537, h: 507, cls: "h-7 md:h-8" },
            ].map((logo) => (
              <div key={logo.alt}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  className={`${logo.cls} w-auto brightness-0 invert opacity-90`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      {stories.map((story, i) => (
        <section
          key={story.company}
          className={`py-20 ${i % 2 === 0 ? "bg-white" : "bg-[#F8F5FC]"}`}
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="relative rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm">
              {/* Gradient left border */}
              <div
                className="absolute left-0 top-0 w-1 h-full"
                style={{
                  background: "linear-gradient(to bottom, #EE81DD, #6E3FCC)",
                }}
              />

              {/* Header with logo and tagline */}
              <div
                className="px-8 py-8"
                style={{
                  backgroundImage: "url('/purple-topo.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Image
                  src={story.logo}
                  alt={story.company}
                  width={story.logoW}
                  height={story.logoH}
                  className={`${story.logoCls} w-auto brightness-0 invert mb-3`}
                />
                <p className="text-xl md:text-2xl font-bold text-white">
                  &ldquo;{story.tagline}&rdquo;
                </p>
              </div>

              <div className="p-8 space-y-8">
                {/* Three narrative sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-sm font-bold text-[#6E3FCC] uppercase tracking-wider mb-3">
                      Hired us to
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {story.hired}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#6E3FCC] uppercase tracking-wider mb-3">
                      What we did
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {story.did}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#6E3FCC] uppercase tracking-wider mb-3">
                      Where we are today
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {story.today}
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                    Results
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {story.results.map((result) => (
                      <li
                        key={result}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="text-[#6E3FCC] mt-0.5">&#10003;</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Summary */}
      <section className="py-20 bg-[#F8F5FC]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Same Core. Different Outcomes.
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-6">
            Culture alignment. Leadership bench strength. Internal enablement.
            Scalable growth. Different organizations, different outcomes &mdash;
            but the core stays the same.
          </p>
          <p className="text-lg font-semibold text-[#6E3FCC]">
            Cohort-based. Conversation-driven. Built for behavior change.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div
          className="py-20"
          style={{
            backgroundImage: "url('/purple-topo-tall.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Your team is next
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Let&apos;s talk about what Campfire can do for your managers.
            </p>
            <a
              href="https://calendly.com/getcampfire/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block px-8 py-4 text-sm font-semibold leading-none text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wide"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
