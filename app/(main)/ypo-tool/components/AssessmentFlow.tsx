"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { CIRCLES, ALL_ITEM_KEYS, type Responses } from "../lib/behaviors";
import SectionIntro from "./SectionIntro";
import QuestionScreen from "./QuestionScreen";

const STORAGE_KEY = "ypo_assessment_responses";

type FlowStep =
  | { phase: "intro"; circleIdx: number }
  | { phase: "questions"; circleIdx: number }
  | { phase: "complete" };

function loadResponses(): Responses {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveResponses(r: Responses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
  } catch {
    // localStorage full or unavailable
  }
}

/** Figure out where in the flow to resume */
function resumeStep(responses: Responses): FlowStep {
  for (let i = 0; i < CIRCLES.length; i++) {
    const circle = CIRCLES[i];
    const answered = circle.items.every((item) => responses[item.key] != null);
    if (!answered) {
      // Check if any in this section are answered → go to questions
      const anyAnswered = circle.items.some((item) => responses[item.key] != null);
      return anyAnswered
        ? { phase: "questions", circleIdx: i }
        : { phase: "intro", circleIdx: i };
    }
  }
  return { phase: "complete" };
}

export default function AssessmentFlow({
  onComplete,
  initialResponses,
  initialFeedback,
  assessmentId,
}: {
  onComplete: (responses: Responses) => void;
  initialResponses?: Responses;
  initialFeedback?: Record<string, string>;
  assessmentId?: number;
}) {
  const [responses, setResponses] = useState<Responses>(() => {
    // Prefer DB-loaded responses, fall back to localStorage
    if (initialResponses && Object.keys(initialResponses).length > 0) {
      return initialResponses;
    }
    return loadResponses();
  });
  const [feedback, setFeedback] = useState<Record<string, string>>(
    initialFeedback || {},
  );
  const [step, setStep] = useState<FlowStep>(() => resumeStep(
    initialResponses && Object.keys(initialResponses).length > 0
      ? initialResponses
      : loadResponses()
  ));
  const [dbAssessmentId] = useState<number | null>(assessmentId ?? null);
  const topRef = useRef<HTMLDivElement>(null);

  // Persist to localStorage on change
  useEffect(() => {
    saveResponses(responses);
  }, [responses]);

  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  }, []);

  const handleAnswer = useCallback(
    (itemKey: string, value: number) => {
      setResponses((prev) => ({ ...prev, [itemKey]: value }));

      // Save to DB
      if (dbAssessmentId && dbAssessmentId > 0) {
        fetch(`/api/ypo-tool/assessment/${dbAssessmentId}/response`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemKey, value }),
        }).catch(() => {
          // DB save failed — localStorage has it
        });
      }
    },
    [dbAssessmentId],
  );

  const saveFeedback = useCallback(
    (circleKey: string, text: string): Promise<unknown> => {
      if (dbAssessmentId && dbAssessmentId > 0) {
        return fetch(`/api/ypo-tool/assessment/${dbAssessmentId}/feedback`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ circleKey, text }),
        }).catch(() => {
          // Non-fatal — feedback stays in local state
        });
      }
      return Promise.resolve();
    },
    [dbAssessmentId],
  );

  const handleFeedbackChange = useCallback((circleKey: string, text: string) => {
    setFeedback((prev) => ({ ...prev, [circleKey]: text }));
  }, []);

  const handleBeginSection = useCallback(
    (circleIdx: number) => {
      setStep({ phase: "questions", circleIdx });
      scrollToTop();
    },
    [scrollToTop],
  );

  const handleContinue = useCallback(
    async (circleIdx: number) => {
      // Flush this section's open-ended note before advancing.
      const circleKey = CIRCLES[circleIdx].key;
      await saveFeedback(circleKey, feedback[circleKey] || "");

      const nextIdx = circleIdx + 1;
      if (nextIdx >= CIRCLES.length) {
        // All done — check all answered
        const allAnswered = ALL_ITEM_KEYS.every((k) => responses[k] != null);
        if (allAnswered) {
          // Mark complete in DB — await so the next route sees it complete.
          if (dbAssessmentId && dbAssessmentId > 0) {
            try {
              await fetch(`/api/ypo-tool/assessment/${dbAssessmentId}/complete`, {
                method: "POST",
              });
            } catch {
              // ignore — completion is best-effort
            }
          }
          setStep({ phase: "complete" });
          onComplete(responses);
        }
      } else {
        setStep({ phase: "intro", circleIdx: nextIdx });
        scrollToTop();
      }
    },
    [responses, onComplete, scrollToTop, dbAssessmentId, saveFeedback, feedback],
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

  if (step.phase === "complete") return null;

  return (
    <div ref={topRef}>
      {step.phase === "intro" && (
        <SectionIntro
          circle={CIRCLES[step.circleIdx]}
          sectionNumber={step.circleIdx + 1}
          onBegin={() => handleBeginSection(step.circleIdx)}
        />
      )}
      {step.phase === "questions" && (
        <QuestionScreen
          circle={CIRCLES[step.circleIdx]}
          circleIdx={step.circleIdx}
          responses={responses}
          answeredCount={answeredCount}
          feedbackValue={feedback[CIRCLES[step.circleIdx].key] || ""}
          onAnswer={handleAnswer}
          onFeedbackChange={handleFeedbackChange}
          onFeedbackBlur={saveFeedback}
          onContinue={() => handleContinue(step.circleIdx)}
          onBack={() => handleBack(step.circleIdx)}
          isLastSection={step.circleIdx === CIRCLES.length - 1}
        />
      )}
    </div>
  );
}
