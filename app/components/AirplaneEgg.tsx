"use client";

export default function AirplaneEgg({ children }: { children: React.ReactNode }) {
  const handleClick = () => {
    // Inject keyframes once
    if (!document.getElementById("airplane-keyframes")) {
      const s = document.createElement("style");
      s.id = "airplane-keyframes";
      s.textContent = `
        @keyframes plane-dip {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(20px) rotate(3deg); }
          60% { transform: translateY(-15px) rotate(-2deg); }
        }
      `;
      document.head.appendChild(s);
    }

    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "fixed",
      inset: "0",
      pointerEvents: "none",
      zIndex: "49",
      overflow: "hidden",
    });
    document.body.appendChild(container);

    const count = 3 + Math.floor(Math.random() * 2); // 3-4 planes
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    for (let i = 0; i < count; i++) {
      const size = 28 + Math.random() * 20;
      const goingRight = Math.random() < 0.5;
      const dur = 7 + Math.random() * 4;
      const delay = i * 0.4 + Math.random() * 0.5;
      const y = 80 + Math.random() * (vh - 200);
      const dipSpeed = 1.5 + Math.random() * 1;
      const rotation = goingRight ? -15 - Math.random() * 20 : 15 + Math.random() * 20;

      const startX = goingRight ? -size - 30 : vw + 30;
      const endX = goingRight ? vw + 30 : -size - 30;

      // Outer: horizontal flight
      const outer = document.createElement("div");
      Object.assign(outer.style, {
        position: "absolute",
        left: `${startX}px`,
        top: `${y}px`,
        transition: `left ${dur}s ease-in-out ${delay}s`,
        opacity: "0",
      });

      // Inner: gentle dipping motion
      const inner = document.createElement("div");
      Object.assign(inner.style, {
        animation: `plane-dip ${dipSpeed}s ease-in-out infinite`,
      });

      // Paper airplane SVG
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("width", `${size}`);
      svg.setAttribute("height", `${size}`);
      svg.style.transform = `rotate(${rotation}deg)${goingRight ? "" : " scaleX(-1)"}`;
      svg.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.15))";

      const colors = ["#6E3FCC", "#9D88ED", "#A84AEB", "#7A4CD9", "#5B34AB", "#EE81DD"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z");
      path.setAttribute("fill", color);
      svg.appendChild(path);

      // Trail — a fading line behind the plane
      const trail = document.createElement("div");
      const trailLen = 40 + Math.random() * 60;
      Object.assign(trail.style, {
        position: "absolute",
        top: `${size / 2 - 1}px`,
        [goingRight ? "right" : "left"]: `${size - 4}px`,
        width: `${trailLen}px`,
        height: "2px",
        background: `linear-gradient(${goingRight ? "to left" : "to right"}, ${color}40, transparent)`,
        borderRadius: "1px",
      });

      inner.appendChild(svg);
      inner.appendChild(trail);
      outer.appendChild(inner);
      container.appendChild(outer);

      requestAnimationFrame(() => {
        outer.style.opacity = "0.9";
        outer.style.left = `${endX}px`;
      });
    }

    setTimeout(() => container.remove(), 10000);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer contents">
      {children}
    </div>
  );
}
