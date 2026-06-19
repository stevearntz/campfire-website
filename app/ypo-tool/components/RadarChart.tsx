"use client";

import { CIRCLES, circleSum, type Responses } from "../lib/behaviors";

const SIZE = 360;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = SIZE / 2 - 48; // max radius with room for labels

// Axis order: Joy (top), Trust (right), Power (bottom), Partnership (left)
const AXIS_ANGLES = [-90, 0, 90, 180]; // degrees, 0 = right

// Widened viewBox: 52px padding each side for axis labels
const SVG_WIDTH = SIZE + 104;
const SVG_HEIGHT = SIZE;
const VIEW_BOX = `-52 0 ${SVG_WIDTH} ${SVG_HEIGHT}`;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polarToXY(angle: number, radius: number): [number, number] {
  return [
    CX + radius * Math.cos(toRad(angle)),
    CY + radius * Math.sin(toRad(angle)),
  ];
}

function polygonPoints(values: number[]): string {
  return values
    .map((v, i) => {
      const [x, y] = polarToXY(AXIS_ANGLES[i], v * R);
      return `${x},${y}`;
    })
    .join(" ");
}

function gridPolygon(scale: number): string {
  return AXIS_ANGLES.map((a) => {
    const [x, y] = polarToXY(a, scale * R);
    return `${x},${y}`;
  }).join(" ");
}

// Label positions: R + 28 out from center along each axis
const LABEL_R = R + 28;

export default function RadarChart({ responses }: { responses: Responses }) {
  const sums = CIRCLES.map((c) => circleSum(c, responses));
  const normalized = sums.map((s) => s / 18); // 0..1

  return (
    <svg
      viewBox={VIEW_BOX}
      width={SVG_WIDTH}
      height={SVG_HEIGHT}
      className="w-full"
      style={{ maxWidth: SVG_WIDTH }}
    >
      {/* Grid polygons */}
      {[0.25, 0.5, 0.75, 1.0].map((scale) => (
        <polygon
          key={scale}
          points={gridPolygon(scale)}
          fill={scale === 1.0 ? "#FBFAFD" : "none"}
          stroke="#ECE8F4"
          strokeWidth={1}
        />
      ))}

      {/* Axis spokes */}
      {AXIS_ANGLES.map((angle, i) => {
        const [x, y] = polarToXY(angle, R);
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={x}
            y2={y}
            stroke="#ECE8F4"
            strokeWidth={1}
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={polygonPoints(normalized)}
        fill="rgba(110,63,204,0.15)"
        stroke="#6E3FCC"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* Vertex dots */}
      {normalized.map((v, i) => {
        const [x, y] = polarToXY(AXIS_ANGLES[i], v * R);
        return (
          <g key={i}>
            {/* White ring */}
            <circle cx={x} cy={y} r={7} fill="#fff" />
            {/* Color dot */}
            <circle cx={x} cy={y} r={5} fill={CIRCLES[i].color} />
          </g>
        );
      })}

      {/* Axis labels — positioned R+28 out, all text-anchor:middle */}
      {CIRCLES.map((circle, i) => {
        const [x, y] = polarToXY(AXIS_ANGLES[i], LABEL_R);
        return (
          <text
            key={circle.key}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={circle.colorDark}
            fontSize={13}
            fontWeight={700}
          >
            {circle.title}
          </text>
        );
      })}
    </svg>
  );
}
