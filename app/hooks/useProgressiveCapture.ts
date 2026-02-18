"use client";

import { useEffect, useRef, useCallback } from "react";

interface Fields {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const INACTIVITY_MS = 30_000;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function useProgressiveCapture(fields: Fields, submitted: boolean) {
  const lastSentRef = useRef<string>("");
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sendPartial = useCallback(
    (useSendBeacon = false) => {
      if (submitted) return;
      if (!isValidEmail(fields.email)) return;

      const payload = JSON.stringify({
        ...fields,
        partial: true,
      });

      // Deduplicate — don't re-send identical data
      if (payload === lastSentRef.current) return;
      lastSentRef.current = payload;

      if (useSendBeacon) {
        navigator.sendBeacon(
          "/api/contact",
          new Blob([payload], { type: "application/json" }),
        );
      } else {
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {
          // Silently ignore — partial capture is best-effort
        });
      }
    },
    [fields, submitted],
  );

  // Page leave: visibilitychange + beforeunload
  useEffect(() => {
    if (submitted) return;

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        sendPartial(true);
      }
    }

    function handleBeforeUnload() {
      sendPartial(true);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sendPartial, submitted]);

  // Inactivity: 30s after last field change
  useEffect(() => {
    if (submitted) return;
    if (!isValidEmail(fields.email)) return;

    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    inactivityTimer.current = setTimeout(() => {
      sendPartial(false);
    }, INACTIVITY_MS);

    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [fields, sendPartial, submitted]);
}
