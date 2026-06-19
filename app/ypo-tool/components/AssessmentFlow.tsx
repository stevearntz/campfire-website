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
}: {
  onComplete: (responses: Responses) => void;
}) {
  const [responses, setResponses] = useState<Responses>(loadResponses);
  const [step, setStep] = useState<FlowStep>(() => resumeStep(loadResponses()));
  const topRef = useRef<HTMLDivElement>(null);

  // Persist to localStorage on change
  useEffect(() => {
    saveResponses(responses);
  }, [responses]);

  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const handleAnswer = useCallback(
    (itemKey: string, value: number) => {
      setResponses((prev) => ({ ...prev, [itemKey]: value }));
    },
    [],
  );

  const handleBeginSection = useCallback(
    (circleIdx: number) => {
      setStep({ phase: "questions", circleIdx });
      scrollToTop();
    },
    [scrollToTop],
  );

  const handleContinue = useCallback(
    (circleIdx: number) => {
      const nextIdx = circleIdx + 1;
      if (nextIdx >= CIRCLES.length) {
        // All done — check all answered
        const allAnswered = ALL_ITEM_KEYS.every((k) => responses[k] != null);
        if (allAnswered) {
          setStep({ phase: "complete" });
          onComplete(responses);
        }
      } else {
        setStep({ phase: "intro", circleIdx: nextIdx });
        scrollToTop();
      }
    },
    [responses, onComplete, scrollToTop],
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
          onAnswer={handleAnswer}
          onContinue={() => handleContinue(step.circleIdx)}
          onBack={() => handleBack(step.circleIdx)}
          isLastSection={step.circleIdx === CIRCLES.length - 1}
        />
      )}
    </div>
  );
}
