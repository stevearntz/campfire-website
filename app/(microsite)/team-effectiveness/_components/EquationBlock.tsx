/**
 * The execution equation, rendered as a real fraction:
 *   Execution = (Clarity × Alignment) / Coordination Cost  × Capacity
 * Reused on the hub, The Model, and the Diagnostic page — keep the three identical.
 */
export default function EquationBlock({
  variant = "light",
  result = "Execution",
  showCapacity = true,
  resultColor,
  stackResult = false,
}: {
  variant?: "light" | "dark";
  result?: string;
  showCapacity?: boolean;
  resultColor?: string;
  stackResult?: boolean;
}) {
  const dark = variant === "dark";
  const ink = dark ? "rgba(255,255,255,0.92)" : "#1E2A4A";
  const muted = dark ? "rgba(255,255,255,0.5)" : "#9CA3AF";
  const rule = dark ? "rgba(255,255,255,0.55)" : "#1E2A4A";
  const clarity = "#F59E2C";
  const alignment = dark ? "#9D88ED" : "#6E3FCC";
  const coordination = "#E055CB";

  const big = "clamp(20px, 3.4vw, 30px)";
  const frac = "clamp(15px, 2.6vw, 26px)";

  const fractionEl = (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 md:gap-3 px-2" style={{ fontSize: frac }}>
        <span style={{ color: clarity }}>Clarity</span>
        <span style={{ color: muted }}>×</span>
        <span style={{ color: alignment }}>Alignment</span>
      </div>
      <div className="w-full my-1.5" style={{ height: 2, background: rule, borderRadius: 2 }} />
      <div className="px-2" style={{ fontSize: frac, color: coordination }}>
        Coordination Cost
      </div>
    </div>
  );

  const capacityEl = showCapacity ? (
    <>
      <span style={{ color: muted, fontSize: big }}>×</span>
      <span style={{ color: ink, fontSize: big }}>Capacity</span>
    </>
  ) : null;

  // Stacked: result centered on its own line, the "= fraction" centered below.
  if (stackResult) {
    return (
      <div className="flex flex-col items-center gap-3 md:gap-4" style={{ fontWeight: 800, lineHeight: 1.1 }}>
        <span style={{ color: resultColor ?? ink, fontSize: big }}>{result}</span>
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <span style={{ color: muted, fontSize: big }}>=</span>
          {fractionEl}
          {capacityEl}
        </div>
      </div>
    );
  }

  // Inline: result = fraction × Capacity on one centered (wrapping) row.
  return (
    <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap" style={{ fontWeight: 800, lineHeight: 1.1 }}>
      <span style={{ color: resultColor ?? ink, fontSize: big }}>{result}</span>
      <span style={{ color: muted, fontSize: big }}>=</span>
      {fractionEl}
      {capacityEl}
    </div>
  );
}
