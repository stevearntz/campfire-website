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
      const clamped = Math.max(v, 0.015); // guard against 0 collapsing
      const [x, y] = polarToXY(AXIS_ANGLES[i], clamped * R);
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

export default function RadarChart({
  responses,
  peerScores,
}: {
  responses: Responses;
  peerScores?: Record<string, number>;
}) {
  const sums = CIRCLES.map((c) => circleSum(c, responses));
  const selfNormalized = sums.map((s) => s / 18); // 0..1

  const hasPeer = peerScores != null;
  const peerNormalized = hasPeer
    ? CIRCLES.map((c) => (peerScores[c.key] || 0) / 18)
    : null;

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

      {/* Peer polygon (drawn first, underneath) */}
      {peerNormalized && (
        <polygon
          points={polygonPoints(peerNormalized)}
          fill="rgba(224,85,203,0.10)"
          stroke="#E055CB"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeDasharray="5 4"
        />
      )}

      {/* Self polygon */}
      <polygon
        points={polygonPoints(selfNormalized)}
        fill="rgba(110,63,204,0.16)"
        stroke="#6E3FCC"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* Vertex dots — self */}
      {selfNormalized.map((v, i) => {
        const clamped = Math.max(v, 0.015);
        const [x, y] = polarToXY(AXIS_ANGLES[i], clamped * R);
        return (
          <g key={`self-${i}`}>
            <circle cx={x} cy={y} r={7} fill="#fff" />
            <circle cx={x} cy={y} r={5} fill={CIRCLES[i].color} />
          </g>
        );
      })}

      {/* Vertex dots — peer */}
      {peerNormalized &&
        peerNormalized.map((v, i) => {
          const clamped = Math.max(v, 0.015);
          const [x, y] = polarToXY(AXIS_ANGLES[i], clamped * R);
          return (
            <g key={`peer-${i}`}>
              <circle cx={x} cy={y} r={6} fill="#fff" />
              <circle cx={x} cy={y} r={4} fill="#E055CB" />
            </g>
          );
        })}

      {/* Axis labels */}
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
