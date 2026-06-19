"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  CIRCLES,
  ALL_ITEM_KEYS,
  peerItemText,
  type Responses,
} from "@/app/ypo-tool/lib/behaviors";
import ScaleInput from "@/app/ypo-tool/components/ScaleInput";
import ProgressRail from "@/app/ypo-tool/components/ProgressRail";

type View = "loading" | "error" | "intro" | "flow" | "done";
type FlowStep =
  | { phase: "section-intro"; circleIdx: number }
  | { phase: "questions"; circleIdx: number };

function resumeStep(responses: Responses): FlowStep {
  for (let i = 0; i < CIRCLES.length; i++) {
    const circle = CIRCLES[i];
    const anyAnswered = circle.items.some((item) => responses[item.key] != null);
    const allAnswered = circle.items.every((item) => responses[item.key] != null);
    if (!allAnswered) {
      return anyAnswered
        ? { phase: "questions", circleIdx: i }
        : { phase: "section-intro", circleIdx: i };
    }
  }
  // All answered — go to last section questions so they can submit
  return { phase: "questions", circleIdx: CIRCLES.length - 1 };
}

export default function PeerRatingClient({ token }: { token: string }) {
  const [view, setView] = useState<View>("loading");
  const [firstName, setFirstName] = useState("");
  const [raterName, setRaterName] = useState("");
  const [responses, setResponses] = useState<Responses>({});
  const [step, setStep] = useState<FlowStep>({ phase: "section-intro", circleIdx: 0 });
  const [responseStarted, setResponseStarted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Load invite info
  useEffect(() => {
    async function init() {
      try {
        const res = await fetch(`/api/ypo-tool/rate/${token}`);
        if (!res.ok) {
          setView("error");
          return;
        }
        const data = await res.json();
        setFirstName(data.rateeFirstName || "");

        // Check for existing in-progress response (cookie-based resume)
        const checkRes = await fetch(`/api/ypo-tool/rate/${token}/response`);
        if (checkRes.ok) {
          const checkData = await checkRes.json();
          if (checkData.exists) {
            if (checkData.status === "complete") {
              setView("done");
              return;
            }
            if (checkData.answers && Object.keys(checkData.answers).length > 0) {
              setResponses(checkData.answers);
              setResponseStarted(true);
              setStep(resumeStep(checkData.answers));
              setView("flow");
              return;
            }
          }
        }

        setView("intro");
      } catch {
        setView("error");
      }
    }
    init();
  }, [token]);

  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const handleStart = useCallback(async () => {
    // Create/resume peer response with optional name
    try {
      const res = await fetch(`/api/ypo-tool/rate/${token}/response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raterName: raterName.trim() || null }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.answers && Object.keys(data.answers).length > 0) {
          setResponses(data.answers);
          setStep(resumeStep(data.answers));
        }
        setResponseStarted(true);
      }
    } catch {
      // Continue anyway — responses will save via PUT
      setResponseStarted(true);
    }
    setView("flow");
    setStep({ phase: "section-intro", circleIdx: 0 });
  }, [token, raterName]);

  const handleAnswer = useCallback(
    async (itemKey: string, value: number) => {
      setResponses((prev) => ({ ...prev, [itemKey]: value }));

      // Persist to server
      try {
        await fetch(`/api/ypo-tool/rate/${token}/response`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemKey, value }),
        });
      } catch {
        // Server not available — answers are in local state
      }
    },
    [token],
  );

  const handleBeginSection = useCallback(
    (circleIdx: number) => {
      setStep({ phase: "questions", circleIdx });
      scrollToTop();
    },
    [scrollToTop],
  );

  const handleContinue = useCallback(
    async (circleIdx: number) => {
      const nextIdx = circleIdx + 1;
      if (nextIdx >= CIRCLES.length) {
        // Submit
        try {
          await fetch(`/api/ypo-tool/rate/${token}/complete`, {
            method: "POST",
          });
        } catch {
          // ignore
        }
        setView("done");
      } else {
        setStep({ phase: "section-intro", circleIdx: nextIdx });
        scrollToTop();
      }
    },
    [token, scrollToTop],
  );

  const handleBack = useCallback(
    (circleIdx: number) => {
      if (circleIdx === 0) return;
      setStep({ phase: "questions", circleIdx: circleIdx - 1 });
      scrollToTop();
    },
    [scrollToTop],
  );

  const answeredCount = ALL_ITEM_KEYS.filter((k) => responses[k] != null).length;

  // --- VIEWS ---

  if (view === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#9D88ED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (view === "error") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center" style={{ maxWidth: 480 }}>
          <h1
            className="font-extrabold mb-3"
            style={{ fontSize: 28, color: "#1E2A4A" }}
          >
            Link not found
          </h1>
          <p style={{ fontSize: 16, color: "#636B7C", lineHeight: 1.6 }}>
            This rating link is invalid or has expired. Please ask the person
            who invited you to share a new link.
          </p>
        </div>
      </div>
    );
  }

  if (view === "done") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center" style={{ maxWidth: 480 }}>
          <div
            className="mx-auto mb-6 flex items-center justify-center rounded-full"
            style={{
              width: 64,
              height: 64,
              background: "rgba(31,138,91,0.1)",
            }}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#1F8A5B"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1
            className="font-extrabold mb-3"
            style={{ fontSize: 28, color: "#1E2A4A" }}
          >
            Thank you — your perspective is in.
          </h1>
          <p style={{ fontSize: 16, color: "#636B7C", lineHeight: 1.6 }}>
            Your responses have been recorded. {firstName} will see a blended
            result across all peers — never who said what. You can close this
            page.
          </p>
        </div>
      </div>
    );
  }

  if (view === "intro") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div style={{ maxWidth: 520, width: "100%" }}>
          <p
            className="font-bold uppercase mb-6"
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "#6E3FCC",
            }}
          >
            Activating Behaviors
          </p>

          <h1
            className="font-extrabold mb-4"
            style={{
              fontSize: "clamp(26px, 4vw, 34px)",
              lineHeight: 1.15,
              color: "#1E2A4A",
            }}
          >
            You&apos;ve been asked to share your perspective on{" "}
            <span style={{ color: "#6E3FCC" }}>{firstName}</span>.
          </h1>

          <p
            className="mb-8"
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: "#636B7C",
            }}
          >
            12 quick statements, about 3 minutes. {firstName} sees the blended
            result — never who said what.
          </p>

          <div className="mb-6">
            <label
              htmlFor="rater-name"
              className="block mb-2 font-medium"
              style={{ fontSize: 14, color: "#636B7C" }}
            >
              Your name (optional)
            </label>
            <input
              id="rater-name"
              type="text"
              placeholder="First name"
              value={raterName}
              onChange={(e) => setRaterName(e.target.value)}
              className="w-full outline-none transition-all"
              style={{
                height: 48,
                borderRadius: 12,
                background: "#F8F6FB",
                border: "1px solid #EEE9F6",
                color: "#1E2A4A",
                fontSize: 16,
                padding: "0 16px",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#9D88ED";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(157,136,237,0.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#EEE9F6";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            onClick={handleStart}
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
            Start &rarr;
          </button>
        </div>
      </div>
    );
  }

  // --- FLOW VIEW ---
  if (view === "flow") {
    const circle = CIRCLES[step.circleIdx];

    if (step.phase === "section-intro") {
      return (
        <div ref={topRef}>
          <div
            className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row"
            style={{ background: circle.wash }}
          >
            {/* Left pane */}
            <div
              className="flex-shrink-0 flex flex-col justify-center px-8 py-12 lg:py-0"
              style={{ width: "clamp(280px, 42%, 480px)" }}
            >
              <div
                className="flex items-center justify-center rounded-2xl font-extrabold mb-6"
                style={{
                  width: 84,
                  height: 84,
                  background: circle.color,
                  color: "#fff",
                  fontSize: 36,
                }}
              >
                {circle.title[0]}
              </div>
            </div>

            {/* Right pane */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12">
              <p
                className="font-bold uppercase mb-3"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: circle.colorDark,
                }}
              >
                Section {step.circleIdx + 1} of 4
              </p>

              <h2
                className="font-extrabold mb-3"
                style={{
                  fontSize: "clamp(36px, 5vw, 62px)",
                  lineHeight: 1.05,
                  color: "#1E2A4A",
                }}
              >
                {circle.title}
              </h2>

              <p
                className="mb-4"
                style={{
                  fontSize: 19,
                  lineHeight: 1.5,
                  color: "#636B7C",
                  maxWidth: 460,
                }}
              >
                {circle.tagline}
              </p>

              <p
                className="mb-8"
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "#A8A2B3",
                  maxWidth: 420,
                }}
              >
                Rate how well this describes {firstName} on each of the next 3
                statements.
              </p>

              <button
                onClick={() => handleBeginSection(step.circleIdx)}
                className="self-start font-bold uppercase transition-opacity hover:opacity-90"
                style={{
                  height: 54,
                  borderRadius: 14,
                  background: circle.color,
                  color: "#fff",
                  fontSize: 14,
                  letterSpacing: "0.08em",
                  padding: "0 32px",
                }}
              >
                Begin {circle.title} &rarr;
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Questions phase
    const sectionAnswered = circle.items.filter(
      (i) => responses[i.key] != null,
    ).length;
    const allSectionAnswered = sectionAnswered === 3;
    const isLastSection = step.circleIdx === CIRCLES.length - 1;

    return (
      <div ref={topRef} className="min-h-[calc(100vh-64px)] flex flex-col">
        {/* Sticky header */}
        <div className="sticky top-[64px] z-40 bg-white border-b border-[#EEE9F6]">
          <div className="max-w-3xl mx-auto px-6 py-3">
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
            <ProgressRail responses={responses} />
          </div>
        </div>

        {/* Questions */}
        <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
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
                    {step.circleIdx * 3 + idx + 1}.
                  </span>
                  {peerItemText(item, firstName)}
                </p>
                <ScaleInput
                  value={responses[item.key]}
                  onChange={(v) => handleAnswer(item.key, v)}
                  color={circle.color}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#EEE9F6]">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => handleBack(step.circleIdx)}
              disabled={step.circleIdx === 0}
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
              onClick={() => handleContinue(step.circleIdx)}
              disabled={!allSectionAnswered}
              className="font-bold uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                height: 54,
                borderRadius: 14,
                background:
                  isLastSection && allSectionAnswered
                    ? "#6E3FCC"
                    : circle.color,
                color: "#fff",
                fontSize: 14,
                letterSpacing: "0.08em",
                padding: "0 32px",
                opacity: allSectionAnswered ? 1 : 0.4,
              }}
            >
              {isLastSection ? "Submit \u2192" : "Continue \u2192"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
