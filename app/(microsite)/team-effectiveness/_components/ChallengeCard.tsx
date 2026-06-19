/** A "Sound familiar?" challenge card — accent left border + statement + 3 bullets. */
export default function ChallengeCard({
  accent,
  title,
  points,
}: {
  accent: string;
  title: string;
  points: string[];
}) {
  return (
    <div
      className="relative rounded-[16px] border overflow-hidden h-full"
      style={{ background: "#F8F5FC", borderColor: "#EEE9F6" }}
    >
      <div className="absolute left-0 top-0 bottom-0" style={{ width: 4, background: accent }} />
      <div style={{ padding: "24px clamp(18px, 3vw, 28px)" }}>
        <h3 className="text-[17px] font-bold leading-snug mb-4" style={{ color: "#1E2A4A" }}>
          {title}
        </h3>
        <ul className="space-y-2.5">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-[15px] leading-snug" style={{ color: "#636B7C" }}>
              <span
                className="shrink-0 rounded-full"
                style={{ width: 6, height: 6, marginTop: 7, background: accent }}
              />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
