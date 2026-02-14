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
    <section className="py-20 bg-[#F5F4F1]">
      <div className="mx-auto px-6" style={{ maxWidth: "1329px" }}>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Sessions that{" "}
            <span className="text-[#6E3FCC]">drive behavior change</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            What it actually feels like when your managers show up to a Campfire
            workshop.
          </p>
        </div>

        {/* Main card container */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Meet Sarah */}
          <div className="bg-[#F8F5FC] px-8 md:px-12 py-10">
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

          {/* Timeline steps */}
          <div className="relative px-8 md:px-12 py-10">
            {/* Dashed vertical line */}
            <div
              className="absolute hidden sm:block"
              style={{
                left: "67px",
                top: "0",
                bottom: "0",
                width: "1px",
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #6E3FCC40 0, #6E3FCC40 6px, transparent 6px, transparent 12px)",
              }}
            />

            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={step.title} className="relative flex gap-8 sm:gap-10">
                  {/* Circle on the dashed line */}
                  <div className="relative shrink-0 hidden sm:flex items-start" style={{ width: "26px" }}>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full border-2 border-[#6E3FCC]/40 bg-white"
                      style={{ left: "-9px", marginLeft: "35px" }}
                    />
                  </div>

                  {/* Card content */}
                  <div
                    className={`flex-1 py-6 ${
                      i < steps.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
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
                </div>
              ))}
            </div>
          </div>

          {/* The following week — pink topo section */}
          <div
            className="px-8 md:px-12 py-10 rounded-b-2xl"
            style={{
              backgroundImage: "url('/pink-topo-session.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex items-start gap-5">
              <div
                className="shrink-0 rounded-full flex items-center justify-center overflow-hidden"
                style={{ width: "40px", height: "40px", backgroundColor: "rgba(255,255,255,0.25)" }}
              >
                <Image
                  src="/offline_bolt.webp"
                  alt="Lightning bolt"
                  width={40}
                  height={40}
                  className="w-[24px] h-[24px] object-contain brightness-0 invert"
                />
              </div>
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
      </div>
    </section>
  );
}
