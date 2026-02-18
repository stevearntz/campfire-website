import Image from "next/image";

const steps = [
  {
    num: "1",
    title: "Reflect \u2014 Identify the Real Challenge",
    sarah: "Admits to herself she\u2019s been softening feedback to avoid discomfort.",
    outcome: "The challenge is specific and real \u2014 not hypothetical.",
  },
  {
    num: "2",
    title: "Breakout \u2014 Get Insight & Support",
    sarah: "Realizes she\u2019s been protecting herself more than helping her employee.",
    outcome: "Perspective shifts before any framework is introduced.",
  },
  {
    num: "3",
    title: "Discuss \u2014 Notice the Patterns",
    sarah: "Sees her hesitation is common \u2014 and solvable.",
    outcome: "The tension is normalized. The room is engaged.",
  },
  {
    num: "4",
    title: "Teach \u2014 Introduce the Framework",
    sarah: "Sees exactly where her past conversations broke down.",
    outcome: "The framework feels usable \u2014 because it\u2019s connected to real situations.",
  },
  {
    num: "5",
    title: "Challenge \u2014 Adapt the Thinking",
    sarah: "Rewrites her opening line.",
    outcome: "Insight becomes behavior.",
  },
  {
    num: "6",
    title: "Reflect & Apply \u2014 Make It Concrete",
    sarah: "Commits to Thursday\u2019s 1:1.",
    outcome: "Application is immediate.",
  },
  {
    num: "7",
    title: "Breakout \u2014 Anticipate Obstacles",
    sarah: "Plans how she\u2019ll respond if Jordan gets defensive.",
    outcome: "Confidence increases before the conversation happens.",
  },
  {
    num: "8",
    title: "Commit & Share \u2014 Lock It In",
    sarah: "Leaves with a plan \u2014 not notes.",
    outcome: "Action is defined before the hour ends.",
  },
];

export default function SessionWalkthrough() {
  return (
    <section className="py-20 bg-[#F8F5FC]">
      <div className="mx-auto px-6" style={{ maxWidth: "1000px" }}>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Sessions that drive <span className="text-[#6E3FCC]">behavior change</span>
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            What it actually feels like when your managers show up to Campfire.
          </p>
        </div>

        {/* Meet Sarah — full-width top card */}
        <div className="bg-[#E8E2F9] rounded-2xl px-8 md:px-12 py-10">
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
              <p className="text-base font-semibold text-[#6E3FCC] mb-3">
                Engineering Director at a 300-person company
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Six months into being a new leader, Sarah finds herself
                struggling to address some performance concerns with a member
                of her team. She signs up for Campfire&apos;s Candid
                Communication session, hoping to get some help.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative" style={{ marginTop: "32px" }}>
          {/* Dashed vertical line */}
          <div
            className="absolute hidden sm:block"
            style={{
              left: "48px",
              top: "-16px",
              bottom: "-16px",
              width: "3px",
              backgroundImage:
                "repeating-linear-gradient(to bottom, #9D88ED 0, #9D88ED 6px, transparent 6px, transparent 12px)",
            }}
          />

          {/* Mobile: full-width cards, no line */}
          <div
            className="flex flex-col sm:hidden"
            style={{ gap: "20px" }}
          >
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-xl px-6 py-6"
              >
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  <span className="text-[#9D88ED] mr-1">{step.num}.</span> {step.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  <span className="font-semibold">Sarah:</span> {step.sarah}
                </p>
                <p className="text-sm text-[#6E3FCC] font-medium mt-2 italic">
                  {step.outcome}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop: offset cards with timeline */}
          <div
            className="hidden sm:flex flex-col"
            style={{ gap: "20px", marginLeft: "122px", maxWidth: "1060px" }}
          >
            {steps.map((step) => (
              <div
                key={step.num}
                className="relative bg-white rounded-xl px-8 md:px-10 py-8"
              >
                {/* Circle on the dashed line */}
                <div
                  className="absolute rounded-full bg-[#F8F5FC]"
                  style={{
                    width: "27px",
                    height: "27px",
                    left: "-87px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "3px solid #9D88ED",
                  }}
                />

                <h3 className="text-base font-bold text-gray-900 mb-2">
                  <span className="text-[#9D88ED] mr-1">{step.num}.</span> {step.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  <span className="font-semibold">Sarah:</span> {step.sarah}
                </p>
                <p className="text-sm text-[#6E3FCC] font-medium mt-2 italic">
                  {step.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The following week — full-width bottom card */}
        <div
          className="mt-8 rounded-2xl px-8 md:px-12 py-10"
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
              <p className="text-lg text-white/90 leading-relaxed">
                Sarah has the conversation. It&apos;s not perfect. It&apos;s clearer.
                It moves forward. At the next session, she shares what worked &mdash;
                and what she&apos;d refine. That&apos;s how behavior change spreads.
                Not through lectures. Through reflection, rehearsal, and accountability.
              </p>
            </div>
          </div>
        </div>

        {/* Why Campfire Feels Different */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Campfire Feels Different</h3>
          <ul className="inline-block text-left text-base text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#9D88ED] mt-0.5">&#10003;</span>
              Managers reflect before speaking.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9D88ED] mt-0.5">&#10003;</span>
              Real challenges drive the learning.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9D88ED] mt-0.5">&#10003;</span>
              Frameworks are introduced <em>after</em> tension is surfaced.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9D88ED] mt-0.5">&#10003;</span>
              Practice happens live.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9D88ED] mt-0.5">&#10003;</span>
              Obstacles are anticipated.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9D88ED] mt-0.5">&#10003;</span>
              Action is defined before the hour ends.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9D88ED] mt-0.5">&#10003;</span>
              Progress is revisited next session.
            </li>
          </ul>
          <h3 className="mt-10 text-2xl md:text-3xl font-bold text-gray-900">
            This isn&apos;t content delivery. It&apos;s structured{" "}
            <span className="text-[#6E3FCC]">behavior change</span>.
          </h3>
        </div>
      </div>
    </section>
  );
}
