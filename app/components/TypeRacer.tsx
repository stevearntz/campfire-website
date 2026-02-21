"use client";

import { useEffect, useRef } from "react";

/* ─── Score tiers ─── */
interface Tier {
  quotes: string[];
  confetti?: boolean;
  rain?: boolean;
}

function getTier(acc: number, time: number): Tier {
  // Rain: over 2 minutes
  if (time > 120) return {
    rain: true,
    quotes: [
      "I fell asleep on the stick waiting for you...",
      "I've been rotating over this fire so long I'm jerky now.",
      "Even the campfire burned out before you finished.",
      "The s'mores packed up and left. I'm alone out here.",
      "I melted, re-formed, and melted again. Twice.",
    ],
  };
  // Legendary: 90%+ under 45s → CONFETTI
  if (acc >= 90 && time < 45) return {
    confetti: true,
    quotes: [
      "Golden brown perfection! I'm throwing confetti!",
      "You toasted that like a master marshmallow roaster!",
      "I'm the marshmallow, but YOU'RE on fire!",
      "That was so clean I got goosebumps. Marshmallow bumps?",
      "Flawless roast! They should put you on the bag!",
    ],
  };
  // Speed demon: 80%+ under 50s
  if (acc >= 80 && time < 50) return {
    quotes: [
      "Whoa! You roasted through that like an open flame!",
      "My stick is shaking — that speed was INTENSE!",
      "You type faster than marshmallows melt! And trust me, we melt FAST.",
      "I barely had time to get gooey watching that!",
      "Someone get me a graham cracker, I just got ROASTED!",
    ],
  };
  // Excellent: 90%+ under 75s
  if (acc >= 90 && time < 75) return {
    quotes: [
      "Perfectly toasted on all sides! Not a single burn!",
      "You're the kind of person who gets the golden brown every time.",
      "Precision roasting! I'd let you hold my stick any day.",
      "That accuracy is chef's kiss... or should I say, roast's kiss?",
      "The full s'more — chocolate, graham, AND perfection.",
    ],
  };
  // Great: 80%+ under 75s
  if (acc >= 80 && time < 75) return {
    quotes: [
      "Nicely toasted! Just a tiny bit crispy on the edges.",
      "That's some solid campfire energy right there!",
      "You roasted me... in a good way!",
      "S'more of that, please! Get it? S'more? ...I'll stop.",
    ],
  };
  // Good: 80%+ over 75s
  if (acc >= 80) return {
    quotes: [
      "Slow roast, but golden brown! Patience pays off!",
      "You took your time, but every marshmallow was perfect.",
      "Low and slow — the mark of a true roaster!",
      "A campfire classic — steady hands, warm results!",
    ],
  };
  // Poor: under 50%
  if (acc < 50) return {
    quotes: [
      "You dropped me in the fire, didn't you?",
      "That was the marshmallow equivalent of burnt to a crisp.",
      "Were you roasting with oven mitts on?!",
      "Even I type better, and I don't have fingers!",
      "That marshmallow is NOT going on the s'more.",
    ],
  };
  // Fast but sloppy: 50-80% under 75s
  if (time < 75) return {
    quotes: [
      "Fast flame, but you charred a few marshmallows!",
      "Speed-roasted! A few caught fire though...",
      "You went full blowtorch — impressive, but messy!",
      "Half golden, half charcoal. The campfire special!",
    ],
  };
  // Meh: 50-80% over 75s
  return {
    quotes: [
      "You finished! The marshmallow survived... barely.",
      "Slow and a little burnt, but hey — still a s'more!",
      "You might want to practice s'more.",
      "Participation s'more! ...that's still delicious, right?",
    ],
  };
}

/* ─── Confetti ─── */
function spawnConfetti() {
  const colors = ["#6E3FCC", "#9D88ED", "#EE81DD", "#F0C321", "#22C55E", "#FF6B6B", "#30C7C7", "#FFD700"];

  const style = document.createElement("style");
  style.textContent = `
    @keyframes cf-fall{0%{transform:translateY(-10px) rotateZ(0deg) rotateX(0deg);opacity:1}100%{transform:translateY(100vh) rotateZ(720deg) rotateX(360deg);opacity:0.2}}
    @keyframes cf-drift{0%,100%{margin-left:0}50%{margin-left:var(--d,20px)}}
  `;
  document.body.appendChild(style);

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed", inset: "0", pointerEvents: "none", zIndex: "9999", overflow: "hidden",
  });

  for (let i = 0; i < 150; i++) {
    const piece = document.createElement("div");
    const w = 5 + Math.random() * 10;
    const drift = -25 + Math.random() * 50;
    Object.assign(piece.style, {
      position: "absolute",
      left: `${Math.random() * 100}%`,
      top: "-12px",
      width: `${w}px`,
      height: `${Math.random() > 0.5 ? w : w * 0.5}px`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      "--d": `${drift}px`,
      animation: `cf-fall ${2 + Math.random() * 3}s ease-in ${Math.random() * 2.5}s forwards, cf-drift ${1 + Math.random() * 2}s ease-in-out ${Math.random() * 2}s infinite`,
    } as Record<string, string>);
    container.appendChild(piece);
  }

  document.body.appendChild(container);
  setTimeout(() => { container.remove(); style.remove(); }, 8000);
}

/* ─── Rain ─── */
function spawnRain() {
  const style = document.createElement("style");
  style.textContent = `@keyframes rain-drop{0%{transform:translateY(-20px) scaleY(1);opacity:0}10%{opacity:0.6}100%{transform:translateY(100vh) scaleY(1.2);opacity:0.15}}`;
  document.body.appendChild(style);

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed", inset: "0", pointerEvents: "none", zIndex: "9999", overflow: "hidden",
  });

  for (let i = 0; i < 120; i++) {
    const drop = document.createElement("div");
    Object.assign(drop.style, {
      position: "absolute",
      left: `${Math.random() * 100}%`,
      top: "-20px",
      width: `${1.5 + Math.random()}px`,
      height: `${14 + Math.random() * 18}px`,
      background: "linear-gradient(to bottom, rgba(120,160,200,0.05), rgba(120,160,200,0.45))",
      borderRadius: "1px",
      animation: `rain-drop ${0.5 + Math.random() * 0.6}s linear ${Math.random() * 3}s infinite`,
    });
    container.appendChild(drop);
  }

  document.body.appendChild(container);
  setTimeout(() => {
    container.style.transition = "opacity 1.5s ease";
    container.style.opacity = "0";
    setTimeout(() => { container.remove(); style.remove(); }, 1500);
  }, 5000);
}

/* ─── Marsha celebration ─── */
function showMarsha(target: HTMLElement, quote: string) {
  target.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    @keyframes m-bounce{0%{transform:scale(0) rotate(-10deg);opacity:0}60%{transform:scale(1.15) rotate(3deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
    @keyframes m-sway{0%,100%{transform:translateX(0) rotate(-5deg)}50%{transform:translateX(6px) rotate(5deg)}}
    @keyframes m-bubble{0%{transform:scale(0);opacity:0}70%{transform:scale(1.06);opacity:1}100%{transform:scale(1);opacity:1}}
    @keyframes m-out{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(8px)}}
  `;

  const wrapper = document.createElement("div");
  Object.assign(wrapper.style, {
    display: "flex", alignItems: "center", gap: "8px", marginTop: "14px",
  });

  // Marsha
  const img = document.createElement("img");
  img.src = "/marsha.webp";
  Object.assign(img.style, {
    width: "52px", height: "52px", objectFit: "contain", flexShrink: "0",
    animationName: "m-bounce, m-sway",
    animationDuration: "0.5s, 1s",
    animationTimingFunction: "ease-out, ease-in-out",
    animationDelay: "0s, 0.5s",
    animationIterationCount: "1, infinite",
    animationFillMode: "forwards, none",
  });

  // Speech bubble
  const bubble = document.createElement("div");
  Object.assign(bubble.style, {
    position: "relative",
    background: "white",
    borderRadius: "10px",
    padding: "8px 12px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#1C1334",
    maxWidth: "270px",
    lineHeight: "1.4",
    boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
    animationName: "m-bubble",
    animationDuration: "0.4s",
    animationDelay: "0.4s",
    animationFillMode: "both",
    animationTimingFunction: "ease-out",
  });

  // Bubble tail
  const tail = document.createElement("div");
  Object.assign(tail.style, {
    position: "absolute", left: "-6px", top: "50%", transform: "translateY(-50%)",
    width: "0", height: "0",
    borderTop: "6px solid transparent",
    borderBottom: "6px solid transparent",
    borderRight: "6px solid white",
  });
  bubble.appendChild(tail);

  const text = document.createElement("span");
  text.textContent = `"${quote}"`;
  bubble.appendChild(text);

  wrapper.appendChild(img);
  wrapper.appendChild(bubble);
  target.appendChild(style);
  target.appendChild(wrapper);

  // Cleaned up by resetRace — stays as long as timer/accuracy
}

/* ─── Main component ─── */
export default function TypeRacer() {
  const timerRef = useRef<HTMLDivElement>(null);
  const accuracyRef = useRef<HTMLDivElement>(null);
  const marshaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-racer]"))
      .sort((a, b) => Number(a.getAttribute("data-racer")) - Number(b.getAttribute("data-racer")));

    if (elements.length === 0) return;

    const allChars: { span: HTMLSpanElement; dark: boolean; makeBold: boolean }[] = [];
    const raceText: string[] = [];
    const boundaries = new Set<number>();

    elements.forEach((el, elIdx) => {
      const isDark = el.hasAttribute("data-racer-dark");
      const isHeading = /^H[1-6]$/i.test(el.tagName);
      const text = (el.textContent || "").trim().replace(/\s+/g, " ");

      if (elIdx > 0) boundaries.add(allChars.length);

      el.textContent = "";

      for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        span.textContent = text[i];
        span.style.transition = "color 0.15s";
        el.appendChild(span);
        allChars.push({ span, dark: isDark, makeBold: !isHeading });
        raceText.push(text[i]);
      }
    });

    const total = allChars.length;
    const timer = timerRef.current;
    const accuracy = accuracyRef.current;
    const marshaEl = marshaRef.current;
    let pos = 0;
    let startTime: number | null = null;
    let interval: ReturnType<typeof setInterval> | null = null;
    let done = false;
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;
    let errors = 0;
    let dashPending = false;

    function updateTimer() {
      if (!startTime || !timer) return;
      const elapsed = (Date.now() - startTime) / 1000;
      timer.textContent = elapsed.toFixed(1) + "s";
    }

    function updateAccuracy() {
      if (!accuracy) return;
      if (pos === 0) { accuracy.textContent = ""; return; }
      const pct = Math.round(((pos - errors) / pos) * 100);
      accuracy.textContent = pct + "%";
      accuracy.style.color = pct >= 95 ? "#22C55E" : pct >= 80 ? "#6E3FCC" : "#FF4444";
    }

    function resetRace() {
      allChars.forEach(({ span }) => {
        span.style.color = "";
        span.style.textShadow = "";
        span.style.removeProperty("font-weight");
      });
      pos = 0;
      errors = 0;
      dashPending = false;
      startTime = null;
      done = false;
      if (interval) { clearInterval(interval); interval = null; }
      if (timer) {
        timer.style.opacity = "0";
        timer.textContent = "";
        timer.style.transform = "";
      }
      if (accuracy) {
        accuracy.style.opacity = "0";
        accuracy.textContent = "";
      }
      if (marshaEl) marshaEl.innerHTML = "";
    }

    function resetInactivity() {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(resetRace, 15000);
    }

    function matchChar(key: string, expected: string): boolean {
      if (key === expected) return true;
      if (key.toLowerCase() === expected.toLowerCase()) return true;
      if ((expected === "\u2018" || expected === "\u2019") && key === "'") return true;
      return false;
    }

    function colorChar(idx: number, correct: boolean) {
      const { span, dark, makeBold } = allChars[idx];
      if (correct) {
        span.style.color = dark ? "#EE81DD" : "#6E3FCC";
        if (dark) span.style.textShadow = "0 0 8px rgba(238,129,221,0.4)";
      } else {
        span.style.color = "#FF4444";
        span.style.textShadow = "none";
      }
      if (makeBold) span.style.setProperty("font-weight", "800", "important");
    }

    function advancePos(correct: boolean) {
      colorChar(pos, correct);
      if (!correct) errors++;
      pos++;
      resetInactivity();
      updateAccuracy();

      if (!startTime) {
        startTime = Date.now();
        if (timer) timer.style.opacity = "1";
        if (accuracy) accuracy.style.opacity = "1";
        interval = setInterval(updateTimer, 100);
      }

      if (pos >= total) {
        done = true;
        if (interval) clearInterval(interval);
        if (inactivityTimer) clearTimeout(inactivityTimer);
        updateTimer();
        updateAccuracy();

        // Celebrate
        const finalTime = (Date.now() - startTime!) / 1000;
        const finalAcc = Math.round(((total - errors) / total) * 100);
        const tier = getTier(finalAcc, finalTime);
        const quote = tier.quotes[Math.floor(Math.random() * tier.quotes.length)];

        if (timer) {
          timer.style.transition = "transform 0.3s ease";
          timer.style.transform = "scale(1.3)";
          setTimeout(() => { if (timer) timer.style.transform = "scale(1)"; }, 300);
        }

        if (marshaEl) showMarsha(marshaEl, quote);
        if (tier.confetti) spawnConfetti();
        if (tier.rain) spawnRain();

        setTimeout(resetRace, 30000);
      }
    }

    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (done) return;
      if (pos >= total) return;
      if (e.key.length !== 1 && e.key !== "Enter") return;

      // Prevent default once race is active
      if (startTime) e.preventDefault();

      // At element boundaries, silently absorb space or enter
      if (boundaries.has(pos) && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        return;
      }

      // Em dash — requires two dashes (--)
      if (raceText[pos] === "\u2014") {
        e.preventDefault();
        if (e.key === "-") {
          if (dashPending) {
            dashPending = false;
            advancePos(true);
          } else {
            dashPending = true;
          }
        } else {
          dashPending = false;
          advancePos(false);
          if (pos < total && matchChar(e.key, raceText[pos])) {
            advancePos(true);
          }
        }
        return;
      }

      dashPending = false;

      // First char must match to start the race
      if (!startTime && !matchChar(e.key, raceText[pos])) return;

      e.preventDefault();

      if (matchChar(e.key, raceText[pos])) {
        advancePos(true);
      } else {
        advancePos(false);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (interval) clearInterval(interval);
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, []);

  return (
    <div
      className="fixed left-6 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block"
      style={{ zIndex: 40 }}
    >
      <div
        ref={timerRef}
        className="font-extrabold"
        style={{ color: "#6E3FCC", fontSize: "2rem", opacity: 0, transition: "opacity 0.5s ease" }}
      />
      <div
        ref={accuracyRef}
        className="font-bold text-center"
        style={{ fontSize: "1rem", opacity: 0, transition: "opacity 0.5s ease", marginTop: "4px" }}
      />
      <div ref={marshaRef} style={{ position: "absolute", top: "100%", left: 0, marginTop: "8px", width: "340px" }} />
    </div>
  );
}
