import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#6E3FCC] topo-pattern py-20">
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              About Campfire
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Building leadership development that&apos;s deeply human and
              designed to scale.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Who we are
          </h2>
          <div className="prose prose-lg text-gray-500 space-y-6">
            <p className="leading-relaxed">
              Campfire is a leadership development company built for the way
              modern teams actually work. We create live, facilitated workshops
              and programs that help managers at every level grow into the
              leaders their teams need.
            </p>
            <p className="leading-relaxed">
              We&apos;re not a content library. We&apos;re not an e-learning
              platform. We&apos;re the partner that lean HR and talent teams
              rely on to run leadership development they can be proud of —
              without building everything from scratch.
            </p>
            <p className="leading-relaxed">
              Our workshops bring managers together for honest, facilitated
              conversations about the real challenges of leading people.
              We&apos;ve seen firsthand that when leaders have a space to be
              vulnerable, learn from each other, and practice new skills, they
              don&apos;t just become better managers — they build better teams,
              better cultures, and better companies.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why we exist
          </h2>
          <div className="space-y-6 text-gray-500">
            <p className="text-lg leading-relaxed">
              Most leadership development is broken. It&apos;s either too
              expensive (executive coaching for the top 1%), too passive
              (e-learning videos nobody finishes), or too generic (off-the-shelf
              content that doesn&apos;t connect to real work).
            </p>
            <p className="text-lg leading-relaxed">
              Meanwhile, the people who need development the most — frontline
              and mid-level managers — get the least. They&apos;re promoted
              because they were great individual contributors, handed a team,
              and expected to figure it out.
            </p>
            <p className="text-lg leading-relaxed">
              We started Campfire because we believe every manager deserves
              access to quality development. Not just the C-suite. Not just
              high-potentials. Everyone who has the responsibility of leading
              other humans should have the support to do it well.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#6E3FCC] rounded-2xl p-10 text-white">
              <h3 className="text-sm font-bold uppercase tracking-wider opacity-60 mb-4">
                Our Mission
              </h3>
              <p className="text-2xl font-bold leading-snug">
                To make deeply human leadership development accessible to every
                manager, at every level, in every kind of company.
              </p>
            </div>
            <div className="bg-[#F5F4F1] rounded-2xl p-10 border border-gray-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                Our Vision
              </h3>
              <p className="text-2xl font-bold text-gray-900 leading-snug">
                A world where every person who leads a team has the skills,
                self-awareness, and support to bring out the best in their
                people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 bg-[#F5F4F1]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What we believe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                belief: "Leadership is a practice, not a title",
                detail:
                  "You don't become a leader when you get promoted. You become a leader through the daily work of showing up for your people.",
              },
              {
                belief: "Vulnerability is a strength",
                detail:
                  "The best leaders are the ones willing to say 'I don't know' and 'I'm working on it.' We create spaces where that's safe.",
              },
              {
                belief: "Development should be ongoing, not one-time",
                detail:
                  "A single workshop doesn't change behavior. A rhythm of learning, practice, and reflection does.",
              },
              {
                belief: "Every manager matters",
                detail:
                  "Not just the high-potentials. Not just the executives. Every person responsible for leading others deserves to be developed.",
              },
              {
                belief: "Culture is built by managers",
                detail:
                  "Your company culture isn't what's on your website. It's what happens in every 1:1, every team meeting, every hard conversation.",
              },
              {
                belief: "Simple beats complex",
                detail:
                  "The best tools are the ones people actually use. We design for simplicity, clarity, and immediate applicability.",
              },
            ].map((item) => (
              <div
                key={item.belief}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.belief}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#5B34AB] topo-pattern py-20">
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Want to learn more?
            </h2>
            <p className="mt-4 text-lg text-white/70">
              We&apos;d love to hear about your team and explore how Campfire
              might help.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block px-8 py-4 text-sm font-semibold text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
