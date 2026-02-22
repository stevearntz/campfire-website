"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

const QUESTIONS = [
  "What are you most proud of right now?",
  "What's one thing you'd do differently this week?",
  "What does your team need most from you right now?",
  "When did you last feel truly energized at work?",
  "What's the biggest challenge you're facing as a leader?",
];

function showToast(text: string) {
  const toast = document.createElement("div");
  toast.textContent = text;
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "32px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "14px 28px",
    borderRadius: "12px",
    fontFamily: "var(--font-spartan), sans-serif",
    fontWeight: "600",
    fontSize: "15px",
    color: "#fff",
    background: "linear-gradient(135deg, #6E3FCC, #9D88ED)",
    zIndex: "100001",
    opacity: "0",
    transition: "opacity 0.3s",
    pointerEvents: "none",
    whiteSpace: "nowrap",
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

export default function ReflectEgg() {
  const [active, setActive] = useState(false);
  const [question, setQuestion] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [response, setResponse] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => {
    const el = fadeRef.current;
    if (el) {
      el.style.transition = "opacity 0.6s ease-out";
      el.style.opacity = "0";
      setTimeout(() => setActive(false), 600);
    } else {
      setActive(false);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Listen for the custom event
  useEffect(() => {
    function onActivate() {
      setQuestion(QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);
      setTimeLeft(60);
      setResponse("");
      setActive(true);
    }
    window.addEventListener("reflect-activate", onActivate);
    return () => window.removeEventListener("reflect-activate", onActivate);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!active) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          dismiss();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, dismiss]);

  // ESC key to dismiss
  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, dismiss]);

  // Pre-compute ember properties once per activation so typing doesn't re-roll them
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const embers = useMemo(() => {
    return Array.from({ length: 40 }).map(() => {
      const size = 3 + Math.random() * 5;
      let x: number;
      const edgeRoll = Math.random();
      if (edgeRoll < 0.35) {
        x = Math.random() * 15;
      } else if (edgeRoll < 0.70) {
        x = 85 + Math.random() * 15;
      } else {
        x = 20 + Math.random() * 60;
      }
      const duration = 4 + Math.random() * 6;
      const delay = Math.random() * 5;
      const drift = (Math.random() - 0.5) * 40;
      const rise = -(100 + Math.random() * 300);
      const peak = 0.3 + Math.random() * 0.5;
      const hue = 15 + Math.random() * 30;
      const sat = 80 + Math.random() * 20;
      const light = 50 + Math.random() * 20;
      const color = `hsl(${hue}, ${sat}%, ${light}%)`;
      const bottom = 10 + Math.random() * 20;
      return { size, x, duration, delay, drift, rise, peak, color, bottom };
    });
  }, [active]);

  if (!active) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  function handleSave() {
    showToast("Response saved — just kidding, this is a demo!");
    dismiss();
  }

  return (
    <div
      ref={fadeRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: "reflect-fade-in 0.6s ease-out",
      }}
    >
      {/* Inject keyframes + ember animations */}
      <style>{`
        @keyframes reflect-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes reflect-ember {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: var(--ember-peak); }
          70% { opacity: var(--ember-peak); }
          100% { transform: translateY(var(--rise)) translateX(var(--drift)) scale(0.3); opacity: 0; }
        }
        @keyframes reflect-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Dark background with floating embers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(8,2,25,0.95)",
          overflow: "hidden",
        }}
      >
        {/* Fire embers — weighted toward left/right edges */}
        {embers.map((e, i) => (
          <div
            key={`ember-${i}`}
            style={{
              position: "absolute",
              left: `${e.x}%`,
              bottom: `-${e.bottom}px`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              borderRadius: "50%",
              background: e.color,
              boxShadow: `0 0 ${e.size * 2}px ${e.color}`,
              "--rise": `${e.rise}px`,
              "--drift": `${e.drift}px`,
              "--ember-peak": `${e.peak}`,
              animation: `reflect-ember ${e.duration}s ${e.delay}s ease-out infinite`,
              opacity: 0,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Top bar: timer + badge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 32px",
          zIndex: 2,
        }}
      >
        {/* Timer */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-spartan), sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              color: "#F59E0B",
              animation: "reflect-pulse 2s ease-in-out infinite",
            }}
          >
            {timeStr}
          </span>
        </div>

        {/* REFLECT badge + close button */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              background: "rgba(245,158,11,0.15)",
              border: "1px solid rgba(245,158,11,0.4)",
              borderRadius: "8px",
              padding: "6px 16px",
              fontFamily: "var(--font-spartan), sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: "#F59E0B",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Reflect
          </div>
          <button
            onClick={dismiss}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.7)",
              fontSize: "18px",
              fontWeight: 300,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            aria-label="Close reflection"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main content — two columns on desktop, stacked on mobile */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          gap: "32px",
          maxWidth: "960px",
          width: "100%",
          padding: "0 24px",
          flexDirection: "row",
          alignItems: "stretch",
        }}
        className="reflect-content"
      >
        <style>{`
          @media (max-width: 768px) {
            .reflect-content {
              flex-direction: column !important;
              gap: 20px !important;
              max-height: calc(100vh - 120px);
              overflow-y: auto;
            }
          }
        `}</style>

        {/* Left: response area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-spartan), sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "#F59E0B",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Private and only visible to you.
          </div>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Start typing your reflection..."
            style={{
              flex: 1,
              minHeight: "200px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "16px",
              padding: "20px",
              fontFamily: "var(--font-spartan), sans-serif",
              fontSize: "16px",
              lineHeight: 1.6,
              color: "#fff",
              resize: "none",
              outline: "none",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "rgba(157,136,237,0.5)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
            }
          />
          <button
            onClick={handleSave}
            style={{
              background: "linear-gradient(135deg, #6E3FCC, #9D88ED)",
              border: "none",
              borderRadius: "12px",
              padding: "14px 24px",
              fontFamily: "var(--font-spartan), sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Save Response to Journal
          </button>
        </div>

        {/* Right: question card */}
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-spartan), sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: "#F59E0B",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Reflect Privately
            </div>
            <p
              style={{
                fontFamily: "var(--font-spartan), sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              {question}
            </p>
          </div>

          {/* Warm gradient footer */}
          <div
            style={{
              height: "80px",
              background:
                "linear-gradient(to top, rgba(245,158,11,0.25), rgba(139,92,246,0.15), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
