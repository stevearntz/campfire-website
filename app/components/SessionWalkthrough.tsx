import Image from "next/image";

const steps = [
  {
    time: "0–5 min",
    title: "Spark & Connection",
    detail:
      "The facilitator opens with a prompt: Priya reflects on a recent moment when she held back instead of being direct. Others share similar patterns \u2014 cushioning feedback, avoiding discomfort, waiting for \u201Cbetter timing.\u201D\nOutcome: She realizes hesitation is common \u2014 and that she\u2019s not the only one navigating this tension.",
  },
  {
    time: "5–20 min",
    title: "Framework",
    detail:
      "The facilitator introduces a practical model for navigating difficult conversations \u2014 not theory from a textbook, but a simple structure Sarah can use in her next meeting.",
  },
  {
    time: "20–40 min",
    title: "Breakout discussion",
    detail:
      "In a small group of four, Sarah practices applying the framework to her real situation. Her peers ask questions she hadn\u2019t considered. She starts to see her 1:1 differently.",
  },
  {
    time: "40–55 min",
    title: "Group debrief",
    detail:
      "The full group reconvenes. A few managers share breakthroughs from their breakouts. The facilitator connects patterns and reinforces the key concepts.",
  },
  {
    time: "55–60 min",
    title: "Commitment",
    detail:
      "Sarah writes one specific thing she\u2019ll do differently before the next session. She picks: \u201CI\u2019ll use the framework in my 1:1 with Jordan on Thursday.\u201D She leaves with a plan, not just notes.",
  },
];

export default function SessionWalkthrough() {
  return (
    <section className="py-20 bg-[#F8F5FC]">
      <div className="mx-auto px-6" style={{ maxWidth: "1329px" }}>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Sessions that drive behavior change
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            What it actually feels like when your managers show up to a Campfire
            workshop.
          </p>
        </div>

        {/* Meet Sarah — full-width top card */}
        <div className="bg-[#F8F5FC] rounded-2xl px-8 md:px-12 py-10">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Image
              src="/sarah-110.webp"
              alt="Sarah, an engineering director"
              width={110}
              height={110}
              className="rounded-full object-cover shrink-0"
              style={{ width: "110px", height: "110px" }}
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Meet Sarah
              </h3>
              <p className="text-sm font-semibold text-[#6E3FCC] mb-3">
                Engineering Director at a 300-person company
              </p>
              <p className="text-gray-600 leading-relaxed">
                Six months into being a new leader, Sarah finds herself
                struggling to address some performance concerns with a member
                of her team. She signs up for Campfire&apos;s Candid
                Communication session, hoping to get some help.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline — gray page background shows through */}
        <div className="relative" style={{ padding: "20px 0" }}>
          {/* Dashed vertical line on the gray background */}
          <div
            className="absolute hidden sm:block"
            style={{
              left: "48px",
              top: "0",
              bottom: "0",
              width: "2px",
              backgroundImage:
                "repeating-linear-gradient(to bottom, #6E3FCC40 0, #6E3FCC40 6px, transparent 6px, transparent 12px)",
            }}
          />

          {/* Step cards — 1060px wide, offset right of the dashed line */}
          <div
            className="flex flex-col sm:hidden"
            style={{ gap: "20px" }}
          >
            {/* Mobile: full-width cards, no line */}
            {steps.map((step) => (
              <div
                key={step.title}
                className="bg-white rounded-xl px-6 py-6"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-base font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <span className="text-sm text-gray-400 shrink-0 ml-4">
                    {step.time}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>

          <div
            className="hidden sm:flex flex-col"
            style={{ gap: "20px", marginLeft: "122px", maxWidth: "1060px" }}
          >
            {steps.map((step) => (
              <div
                key={step.title}
                className="relative bg-white rounded-xl px-8 md:px-10 py-8"
              >
                {/* 27px circle centered on the dashed line, vertically centered with card */}
                <div
                  className="absolute rounded-full border-2 border-[#6E3FCC]/40 bg-[#F8F5FC]"
                  style={{
                    width: "27px",
                    height: "27px",
                    left: "-87px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />

                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-base font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <span className="text-sm text-gray-400 shrink-0 ml-4">
                    {step.time}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The following week — full-width bottom card */}
        <div
          className="rounded-2xl px-8 md:px-12 py-10"
          style={{
            backgroundImage: "url('/pink-topo-session.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex items-start gap-5">
            <Image
              src="/offline_bolt.webp"
              alt="Lightning bolt"
              width={40}
              height={40}
              className="w-[40px] h-[40px] shrink-0 object-contain brightness-0 invert"
            />
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                The following week
              </h3>
              <p className="text-white/90 leading-relaxed">
                Sarah used the framework in her 1:1 with Jordan. The
                conversation wasn&apos;t easy, but it was clearer and more
                productive than anything she&apos;d tried before. At the next
                Campfire session, she shared what happened &mdash; and two
                other managers asked to learn the same approach. That&apos;s
                how behavior change spreads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
