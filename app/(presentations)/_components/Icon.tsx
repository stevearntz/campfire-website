/** A single Material Symbols Rounded (filled) glyph. */
export function Icon({
  name,
  className = "",
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`ms ${className}`} style={style} aria-hidden>
      {name}
    </span>
  );
}
