import { awardByNo, colorForAward, DEFAULT_PREAMBLE } from "../_data/awards";

export const AWARDED_DATE = "7 AUGUST 2026";

/**
 * A single Campfire Superlative certificate, recreating the look of the source
 * deck: cream field, accent double-border with corner ticks, the flame mark,
 * italic lead-in, big award title, "Campfire" wordmark, and the VOTED OFFICIAL
 * stamp. When `winner` is set, their name becomes the hero of the card.
 */
export function Certificate({
  no,
  winner,
  className = "",
}: {
  no: number;
  winner?: string | null;
  className?: string;
}) {
  const award = awardByNo(no);
  const color = colorForAward(no);
  if (!award) return null;
  const preamble = award.preamble || DEFAULT_PREAMBLE;

  return (
    <div
      className={`relative w-full aspect-[16/9] overflow-hidden rounded-xl ${className}`}
      style={{ backgroundColor: "#F5F1EA", containerType: "inline-size" }}
    >
      {/* accent double border */}
      <div
        className="absolute inset-[2.5%] rounded-md"
        style={{ border: `2px solid ${color.accent}` }}
      />
      {/* corner ticks */}
      {[
        "left-[2.5%] top-[2.5%]",
        "right-[2.5%] top-[2.5%]",
        "left-[2.5%] bottom-[2.5%]",
        "right-[2.5%] bottom-[2.5%]",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} h-[3.2%] w-[1.8%] -translate-x-1/2 -translate-y-1/2`}
          style={{
            backgroundColor: color.accent,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <div className="absolute inset-0 flex flex-col items-center px-[8%] py-[6%] text-center">
        <p
          className="text-[1.6cqw] font-semibold tracking-[0.28em]"
          style={{ color: "#8A8496" }}
        >
          CERTIFICATE OF ACHIEVEMENT
        </p>
        <p
          className="mt-[0.4cqw] text-[1.6cqw] font-bold tracking-[0.28em]"
          style={{ color: color.accent }}
        >
          AWARD NO. {String(no).padStart(2, "0")}
        </p>

        {/* flame mark */}
        <svg
          viewBox="0 0 24 24"
          className="mt-[1.6cqw] h-[4.4cqw] w-[4.4cqw]"
          fill="none"
          aria-hidden
        >
          <path
            d="M12 3c.6 2.4-.8 3.6-1.9 4.7C8.7 9.1 8 10.3 8 12a4 4 0 108 0c0-1.2-.5-2.2-1.2-3 .1.9-.3 1.7-1 2 .5-1.6-.2-3.4-1.3-4.6C11.9 5.6 12.4 4.2 12 3z"
            fill={color.accent}
          />
        </svg>

        <div
          className="mt-[1.4cqw] h-px w-[8%]"
          style={{ backgroundColor: "#C9C3B8" }}
        />

        <p
          className="mt-[1.6cqw] text-[1.7cqw] italic"
          style={{ color: "#6B6577", fontFamily: "Georgia, serif" }}
        >
          {preamble}
        </p>

        <h2
          className="mt-[0.8cqw] max-w-[85%] text-[3.4cqw] font-bold leading-[1.12]"
          style={{ color: "#1C1334" }}
        >
          {award.title}
        </h2>

        {winner ? (
          <p
            className="mt-[1.4cqw] text-[3.8cqw] leading-none"
            style={{ color: color.accent, fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            {winner}
          </p>
        ) : (
          <p
            className="mt-[1.4cqw] text-[1.6cqw] font-semibold tracking-[0.2em]"
            style={{ color: "#B8B2A6", fontFamily: "Georgia, serif" }}
          >
            Campfire
          </p>
        )}

        {/* stamp */}
        <div
          className="mt-auto flex h-[8cqw] w-[8cqw] flex-col items-center justify-center rounded-full text-[1.2cqw] font-bold leading-tight tracking-[0.14em]"
          style={{ border: `1.5px solid ${color.accent}`, color: color.accent }}
        >
          VOTED
          <br />
          OFFICIAL
        </div>
      </div>

      {/* footer */}
      <div className="absolute inset-x-[8%] bottom-[6%] flex items-end justify-between text-[1.3cqw] tracking-[0.16em]" style={{ color: "#9A94A2" }}>
        <span>BY VOTE OF THE TEAM</span>
        <span>AWARDED {AWARDED_DATE}</span>
      </div>
    </div>
  );
}
