"use client";

export default function CampfireFireEgg() {
  const handleClick = (e: React.MouseEvent) => {
    const span = e.currentTarget as HTMLElement;

    // Inject keyframes once
    if (!document.getElementById("word-fire-keyframes")) {
      const s = document.createElement("style");
      s.id = "word-fire-keyframes";
      s.textContent = `
        @keyframes word-fire-glow {
          0% { text-shadow: 0 0 4px rgba(255,100,0,0.3); color: #1f2937; }
          15% { text-shadow: 0 0 12px rgba(255,80,0,0.6), 0 0 30px rgba(255,120,0,0.3); color: #FF6A00; }
          30% { text-shadow: 0 0 20px rgba(255,60,0,0.8), 0 0 50px rgba(255,100,0,0.4), 0 -5px 15px rgba(255,200,0,0.3); color: #FF4500; }
          50% { text-shadow: 0 0 25px rgba(255,40,0,0.9), 0 0 60px rgba(255,80,0,0.5), 0 -8px 20px rgba(255,220,0,0.4); color: #FF3300; }
          70% { text-shadow: 0 0 15px rgba(255,60,0,0.6), 0 0 40px rgba(255,100,0,0.3); color: #FF6A00; }
          100% { text-shadow: none; color: #1f2937; }
        }
      `;
      document.head.appendChild(s);
    }

    span.style.animation = "word-fire-glow 1.8s ease-in-out";
    span.addEventListener(
      "animationend",
      () => {
        span.style.animation = "";
      },
      { once: true }
    );

    // Spawn a few rising ember particles from the word
    const rect = span.getBoundingClientRect();
    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "fixed",
      inset: "0",
      pointerEvents: "none",
      zIndex: "49",
    });
    document.body.appendChild(container);

    for (let i = 0; i < 12; i++) {
      const ember = document.createElement("div");
      const size = 2 + Math.random() * 4;
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height * 0.5;
      const dur = 1 + Math.random() * 1.5;
      const drift = (Math.random() - 0.5) * 40;
      const hue = 15 + Math.random() * 30;
      Object.assign(ember.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `hsl(${hue}, 100%, ${50 + Math.random() * 20}%)`,
        opacity: "0.9",
        transition: `all ${dur}s ease-out`,
        transform: "translateY(0) translateX(0)",
      });
      container.appendChild(ember);
      requestAnimationFrame(() => {
        ember.style.transform = `translateY(${-60 - Math.random() * 80}px) translateX(${drift}px)`;
        ember.style.opacity = "0";
      });
    }

    setTimeout(() => container.remove(), 3000);
  };

  return (
    <span onClick={handleClick} className="cursor-pointer">
      Campfire
    </span>
  );
}
