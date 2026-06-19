import Image from "next/image";
import TrackedLink from "@/app/components/TrackedLink";

/** One of the "Three parts" cards (Diagnostic / Workshop / Roadmap). */
export default function PartCard({
  step,
  name,
  illo,
  desc,
  href,
}: {
  step: number;
  name: string;
  illo: string;
  desc: string;
  href: string;
}) {
  return (
    <div
      className="group rounded-[16px] border bg-white p-7 flex flex-col transition-shadow hover:shadow-[0_12px_32px_rgba(28,19,52,0.08)]"
      style={{ borderColor: "#F1EEF8" }}
    >
      <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: "#9D88ED" }}>
        Part {step}
      </p>
      <Image src={illo} alt="" width={200} height={200} className="w-20 h-20 object-contain mb-5" />
      <h3 className="text-[19px] font-extrabold mb-2" style={{ color: "#1E2A4A" }}>
        {name}
      </h3>
      <p className="text-[15px] leading-relaxed mb-5 flex-1" style={{ color: "#636B7C" }}>
        {desc}
      </p>
      <TrackedLink
        href={href}
        eventName="te_link"
        eventParams={{ label: "learn_more", part: `part_${step}` }}
        className="text-[14px] font-semibold inline-flex items-center gap-1 transition-colors group-hover:gap-2"
        style={{ color: "#6E3FCC" }}
      >
        Learn more →
      </TrackedLink>
    </div>
  );
}
