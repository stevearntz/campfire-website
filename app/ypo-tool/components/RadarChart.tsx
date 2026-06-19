"use client";

import { CIRCLES, circleMean, type Responses } from "../lib/behaviors";

const SIZE = 360;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = SIZE / 2 - 40; // max radius with room for labels

// Axis order: Joy (top), Trust (right), Power (bottom), Partnership (left)
const AXIS_ANGLES = [-90, 0, 90, 180]; // degrees, 0 = right

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

// Label offsets to avoid overlapping the polygon
const LABEL_OFFSETS: [number, number][] = [
  [0, -20],  // Joy (top)
  [20, 0],   // Trust (right)
  [0, 22],   // Power (bottom)
  [-20, 0],  // Partnership (left)
];

const LABEL_ANCHORS: ("middle" | "start" | "end")[] = [
  "middle", // top
  "start",  // right
  "middle", // bottom
  "end",    // left
];

export default function RadarChart({ responses }: { responses: Responses }) {
  const means = CIRCLES.map((c) => circleMean(c, responses));
  const normalized = means.map((m) => m / 6); // 0..1

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width={SIZE}
      height={SIZE}
      className="w-full max-w-[360px]"
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

      {/* Axis labels */}
      {CIRCLES.map((circle, i) => {
        const [x, y] = polarToXY(AXIS_ANGLES[i], R);
        return (
          <text
            key={circle.key}
            x={x + LABEL_OFFSETS[i][0]}
            y={y + LABEL_OFFSETS[i][1]}
            textAnchor={LABEL_ANCHORS[i]}
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
