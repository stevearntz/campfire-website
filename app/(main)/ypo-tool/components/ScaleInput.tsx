"use client";

const LABELS = ["Strongly", "Mostly", "Slightly", "Slightly", "Mostly", "Strongly"];

export default function ScaleInput({
  value,
  onChange,
  color,
}: {
  value: number | undefined;
  onChange: (v: number) => void;
  color: string;
}) {
  return (
    <div>
      {/* Anchor words */}
      <div className="flex justify-between mb-1.5">
        <span
          className="font-bold uppercase"
          style={{
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "#A8A2B3",
          }}
        >
          Disagree
        </span>
        <span
          className="font-bold uppercase"
          style={{
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "#A8A2B3",
          }}
        >
          Agree
        </span>
      </div>

      {/* Split spectrum */}
      <div className="flex">
        {/* Disagree group (1-3) */}
        <div className="flex flex-1">
          {[1, 2, 3].map((n) => {
            const selected = value === n;
            const isFirst = n === 1;
            const isLast = n === 3;
            return (
              <button
                key={n}
                onClick={() => onChange(n)}
                className="flex-1 flex flex-col items-center justify-center transition-all"
                style={{
                  height: 60,
                  background: selected ? color : "#F6F4FA",
                  border: selected
                    ? `1px solid ${color}`
                    : "1px solid #E7E3EE",
                  color: selected ? "#fff" : "#9B96A6",
                  fontSize: 12.5,
                  fontWeight: 700,
                  borderRadius: isFirst
                    ? "10px 0 0 10px"
                    : isLast
                      ? "0 10px 10px 0"
                      : 0,
                  marginLeft: isFirst ? 0 : -1,
                  position: "relative",
                  zIndex: selected ? 1 : 0,
                }}
              >
                {LABELS[n - 1]}
              </button>
            );
          })}
        </div>

        {/* Gap */}
        <div style={{ width: 16 }} />

        {/* Agree group (4-6) */}
        <div className="flex flex-1">
          {[4, 5, 6].map((n) => {
            const selected = value === n;
            const isFirst = n === 4;
            const isLast = n === 6;
            return (
              <button
                key={n}
                onClick={() => onChange(n)}
                className="flex-1 flex flex-col items-center justify-center transition-all"
                style={{
                  height: 60,
                  background: selected ? color : "#F6F4FA",
                  border: selected
                    ? `1px solid ${color}`
                    : "1px solid #E7E3EE",
                  color: selected ? "#fff" : "#9B96A6",
                  fontSize: 12.5,
                  fontWeight: 700,
                  borderRadius: isFirst
                    ? "10px 0 0 10px"
                    : isLast
                      ? "0 10px 10px 0"
                      : 0,
                  marginLeft: isFirst ? 0 : -1,
                  position: "relative",
                  zIndex: selected ? 1 : 0,
                }}
              >
                {LABELS[n - 1]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
