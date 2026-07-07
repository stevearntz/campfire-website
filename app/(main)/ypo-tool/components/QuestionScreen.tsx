"use client";

import type { Circle, Responses } from "../lib/behaviors";
import ScaleInput from "./ScaleInput";
import ProgressRail from "./ProgressRail";

export default function QuestionScreen({
  circle,
  circleIdx,
  responses,
  answeredCount,
  feedbackValue,
  onAnswer,
  onFeedbackChange,
  onFeedbackBlur,
  onContinue,
  onBack,
  isLastSection,
}: {
  circle: Circle;
  circleIdx: number;
  responses: Responses;
  answeredCount: number;
  feedbackValue: string;
  onAnswer: (itemKey: string, value: number) => void;
  onFeedbackChange: (circleKey: string, text: string) => void;
  onFeedbackBlur: (circleKey: string, text: string) => void;
  onContinue: () => void;
  onBack: () => void;
  isLastSection: boolean;
}) {
  const sectionAnswered = circle.items.filter(
    (i) => responses[i.key] != null,
  ).length;
  const allSectionAnswered = sectionAnswered === 3;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-[#EEE9F6]">
        <div className="max-w-3xl mx-auto px-6 py-3">
          {/* Top row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ background: circle.color }}
              />
              <span
                className="font-bold"
                style={{ fontSize: 14, color: "#1E2A4A" }}
              >
                {circle.title}
              </span>
              <span style={{ fontSize: 13, color: "#A8A2B3" }}>
                {sectionAnswered} of 3 in this section
              </span>
            </div>
            <span style={{ fontSize: 13, color: "#A8A2B3" }}>
              {answeredCount} of 12 answered
            </span>
          </div>

          {/* Progress rail */}
          <ProgressRail responses={responses} />
        </div>
      </div>

      {/* Questions */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 pt-10 pb-36">
        <div className="space-y-10">
          {circle.items.map((item, idx) => (
            <div key={item.key}>
              <p
                className="mb-4"
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1E2A4A",
                  lineHeight: 1.4,
                }}
              >
                <span style={{ color: "#A8A2B3", marginRight: 8 }}>
                  {circleIdx * 3 + idx + 1}.
                </span>
                {item.text}
              </p>
              <ScaleInput
                value={responses[item.key]}
                onChange={(v) => onAnswer(item.key, v)}
                color={circle.color}
              />
            </div>
          ))}

          {/* Open-ended feedback for this section */}
          <div
            className="rounded-2xl p-5"
            style={{ background: circle.wash, border: `1px solid ${circle.color}22` }}
          >
            <label
              htmlFor={`self-fb-${circle.key}`}
              className="block mb-3"
              style={{ fontSize: 18, fontWeight: 700, color: "#1E2A4A", lineHeight: 1.4 }}
            >
              {circle.feedback.self}
              <span style={{ fontWeight: 400, color: "#A8A2B3", marginLeft: 6 }}>
                (optional)
              </span>
            </label>
            <textarea
              id={`self-fb-${circle.key}`}
              value={feedbackValue}
              onChange={(e) => onFeedbackChange(circle.key, e.target.value)}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#EEE9F6";
                e.currentTarget.style.boxShadow = "none";
                onFeedbackBlur(circle.key, e.target.value);
              }}
              rows={3}
              placeholder="Jot a specific example or intention…"
              className="w-full outline-none transition-all resize-y"
              style={{
                borderRadius: 12,
                background: "#fff",
                border: "1px solid #EEE9F6",
                color: "#1E2A4A",
                fontSize: 15,
                lineHeight: 1.5,
                padding: "12px 14px",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = circle.color;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${circle.color}22`;
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-[#EEE9F6]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            disabled={circleIdx === 0}
            className="font-bold uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
            Back
          </button>

          <button
            onClick={onContinue}
            disabled={!allSectionAnswered}
            className="font-bold uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              height: 54,
              borderRadius: 14,
              background: isLastSection && allSectionAnswered ? "#6E3FCC" : circle.color,
              color: "#fff",
              fontSize: 14,
              letterSpacing: "0.08em",
              padding: "0 32px",
              opacity: allSectionAnswered ? 1 : 0.4,
            }}
          >
            {isLastSection ? "See my results \u2192" : "Continue \u2192"}
          </button>
        </div>
      </div>
    </div>
  );
}
