"use client";

import { CIRCLES, circleMean, type Responses } from "../lib/behaviors";
import RadarChart from "./RadarChart";

export default function Results({
  responses,
  onRestart,
}: {
  responses: Responses;
  onRestart: () => void;
}) {
  const means = CIRCLES.map((c) => circleMean(c, responses));

  // Strength = highest, Growth = lowest
  let strengthIdx = 0;
  let growthIdx = 0;
  means.forEach((m, i) => {
    if (m > means[strengthIdx]) strengthIdx = i;
    if (m < means[growthIdx]) growthIdx = i;
  });

  const strengthCircle = CIRCLES[strengthIdx];
  const growthCircle = CIRCLES[growthIdx];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <p
              className="font-bold uppercase"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "#6E3FCC",
              }}
            >
              Your Self-View
            </p>
            <span
              className="inline-block rounded-full px-3 py-1"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#9D88ED",
                background: "#F3EFFA",
              }}
            >
              + peer overlay next
            </span>
          </div>

          <h1
            className="font-extrabold mb-3"
            style={{
              fontSize: "clamp(28px, 4vw, 38px)",
              lineHeight: 1.1,
              color: "#1E2A4A",
            }}
          >
            How you show up
          </h1>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "#636B7C",
              maxWidth: 640,
            }}
          >
            Your self-assessment across the four circles. Next, invite peers —
            their aggregated read drops onto this same radar, so you can spot
            blind spots and hidden strengths.
          </p>
        </div>

        {/* Radar + Cards layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-12">
          {/* Radar */}
          <div className="flex-shrink-0 flex items-start justify-center">
            <RadarChart responses={responses} />
          </div>

          {/* Right side: Strength, Growth, Breakdown */}
          <div className="flex-1 space-y-6">
            {/* Strength card */}
            <div
              className="relative rounded-xl p-6 bg-white"
              style={{ border: "1px solid #EEE9F6" }}
            >
              <div
                className="absolute left-0 top-4 bottom-4 w-1 rounded-full"
                style={{ background: strengthCircle.color }}
              />
              <div className="pl-4">
                <p
                  className="font-bold uppercase mb-1"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "#1F8A5B",
                  }}
                >
                  Your Strength
                </p>
                <div className="flex items-baseline justify-between">
                  <h3
                    className="font-bold"
                    style={{ fontSize: 20, color: "#1E2A4A" }}
                  >
                    {strengthCircle.title}
                  </h3>
                  <span
                    className="font-bold"
                    style={{ fontSize: 20, color: strengthCircle.colorDark }}
                  >
                    {means[strengthIdx].toFixed(1)}{" "}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#A8A2B3",
                      }}
                    >
                      / 6
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Growth card */}
            <div
              className="relative rounded-xl p-6 bg-white"
              style={{ border: "1px solid #EEE9F6" }}
            >
              <div
                className="absolute left-0 top-4 bottom-4 w-1 rounded-full"
                style={{ background: growthCircle.color }}
              />
              <div className="pl-4">
                <p
                  className="font-bold uppercase mb-1"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "#B23B9F",
                  }}
                >
                  Your Growth Area
                </p>
                <div className="flex items-baseline justify-between">
                  <h3
                    className="font-bold"
                    style={{ fontSize: 20, color: "#1E2A4A" }}
                  >
                    {growthCircle.title}
                  </h3>
                  <span
                    className="font-bold"
                    style={{ fontSize: 20, color: growthCircle.colorDark }}
                  >
                    {means[growthIdx].toFixed(1)}{" "}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#A8A2B3",
                      }}
                    >
                      / 6
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* All 4 bars */}
            <div className="space-y-3 pt-2">
              {CIRCLES.map((circle, i) => {
                const pct = (means[i] / 6) * 100;
                return (
                  <div key={circle.key} className="flex items-center gap-3">
                    <span
                      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: circle.color }}
                    />
                    <span
                      className="font-bold flex-shrink-0"
                      style={{
                        fontSize: 13,
                        color: "#1E2A4A",
                        width: 90,
                      }}
                    >
                      {circle.title}
                    </span>
                    <div
                      className="flex-1 h-2 rounded-full overflow-hidden"
                      style={{ background: "#F6F4FA" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          background: circle.color,
                        }}
                      />
                    </div>
                    <span
                      className="font-bold flex-shrink-0"
                      style={{
                        fontSize: 13,
                        color: circle.colorDark,
                        width: 50,
                        textAlign: "right",
                      }}
                    >
                      {means[i].toFixed(1)}{" "}
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 400,
                          color: "#A8A2B3",
                        }}
                      >
                        / 6
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-[#EEE9F6]">
          <button
            onClick={() => {
              // Stub for next increment
              alert("Peer invite is coming in the next update.");
            }}
            className="font-bold uppercase transition-opacity hover:opacity-90"
            style={{
              height: 54,
              borderRadius: 14,
              background: "#6E3FCC",
              color: "#fff",
              fontSize: 14,
              letterSpacing: "0.08em",
              padding: "0 32px",
            }}
          >
            Invite peers &rarr;
          </button>

          <button
            onClick={onRestart}
            className="font-bold uppercase transition-colors"
            style={{
              height: 54,
              borderRadius: 14,
              background: "transparent",
              border: "1px solid #E7E3EE",
              color: "#636B7C",
              fontSize: 14,
              letterSpacing: "0.08em",
              padding: "0 28px",
            }}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
