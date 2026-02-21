"use client";

function drumPulse() {
  const html = document.documentElement;

  // Random drum pattern: 6-10 beats with varying intensity and timing
  const beatCount = 6 + Math.floor(Math.random() * 5);
  const beats: { delay: number; intensity: number }[] = [];

  let time = 0;
  for (let i = 0; i < beatCount; i++) {
    // Varying gaps — some quick double-hits, some pauses
    const gap = i === 0 ? 0 : 80 + Math.random() * 250;
    time += gap;
    const intensity = 0.5 + Math.random() * 0.5; // 0.5–1.0
    beats.push({ delay: time, intensity });
  }

  beats.forEach(({ delay, intensity }) => {
    setTimeout(() => {
      const scale = 1 + intensity * 0.015;
      html.style.transition = "transform 0.06s ease-out";
      html.style.transform = `scale(${scale})`;

      setTimeout(() => {
        html.style.transition = "transform 0.15s ease-in";
        html.style.transform = "scale(1)";
      }, 60);
    }, delay);
  });

  // Clean up
  setTimeout(() => {
    html.style.transition = "";
    html.style.transform = "";
  }, time + 400);
}

export default function RhythmEgg() {
  return (
    <button
      onClick={drumPulse}
      className="cursor-pointer hover:text-[#9D88ED] transition-colors"
      style={{ background: "none", border: "none", padding: 0, font: "inherit", color: "inherit" }}
    >
      rhythm
    </button>
  );
}
