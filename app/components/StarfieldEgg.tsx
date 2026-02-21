"use client";

export default function StarfieldEgg({ children }: { children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Inject keyframes once
    if (!document.getElementById("starfield-keyframes")) {
      const s = document.createElement("style");
      s.id = "starfield-keyframes";
      s.textContent = `
        @keyframes star-twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          20% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; transform: scale(1); }
        }
        @keyframes star-streak {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 1; }
          100% { transform: translateX(var(--dx)) translateY(var(--dy)) scale(0.2); opacity: 0; }
        }
        @keyframes shooting-star {
          0% { transform: translateX(0) translateY(0); opacity: 1; }
          100% { transform: translateX(var(--sx)) translateY(var(--sy)); opacity: 0; }
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
      background: "rgba(8,2,25,0.92)",
      opacity: "0",
      transition: "opacity 0.8s ease-in",
    });
    document.body.appendChild(container);
    requestAnimationFrame(() => { container.style.opacity = "1"; });

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Twinkling stars
    const starCount = 60;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      const size = 1.5 + Math.random() * 3;
      const x = Math.random() * vw;
      const y = Math.random() * vh;
      const delay = Math.random() * 2;
      const dur = 1.5 + Math.random() * 2;
      const hue = Math.random() < 0.3 ? `hsl(${240 + Math.random() * 40}, 80%, 90%)` : "#fff";
      Object.assign(star.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: hue,
        boxShadow: `0 0 ${size * 2}px ${hue}`,
        animation: `star-twinkle ${dur}s ${delay}s ease-in-out`,
        opacity: "0",
      });
      container.appendChild(star);
    }

    // A few bigger "sparkle" stars with cross shape
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement("div");
      const x = Math.random() * vw;
      const y = Math.random() * vh;
      const size = 8 + Math.random() * 12;
      const delay = 0.5 + Math.random() * 1.5;
      sparkle.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="white">
        <path d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5Z" opacity="0.9"/>
      </svg>`;
      Object.assign(sparkle.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        animation: `star-twinkle 2s ${delay}s ease-in-out`,
        opacity: "0",
        filter: `drop-shadow(0 0 ${size / 2}px rgba(180,160,255,0.8))`,
      });
      container.appendChild(sparkle);
    }

    // Shooting stars
    for (let i = 0; i < 3; i++) {
      const shooter = document.createElement("div");
      const startX = Math.random() * vw * 0.6 + vw * 0.2;
      const startY = Math.random() * vh * 0.3;
      const sx = 200 + Math.random() * 300;
      const sy = 150 + Math.random() * 200;
      const delay = 1 + i * 0.8 + Math.random() * 0.5;
      const len = 30 + Math.random() * 20;

      Object.assign(shooter.style, {
        position: "absolute",
        left: `${startX}px`,
        top: `${startY}px`,
        width: `${len}px`,
        height: "2px",
        background: "linear-gradient(to right, transparent, white)",
        borderRadius: "1px",
        transform: `rotate(${30 + Math.random() * 15}deg)`,
        "--sx": `${sx}px`,
        "--sy": `${sy}px`,
        animation: `shooting-star 0.8s ${delay}s ease-out forwards`,
        opacity: "0",
        filter: "drop-shadow(0 0 3px rgba(255,255,255,0.8))",
      } as Record<string, string>);
      container.appendChild(shooter);
    }

    // Fade out and remove
    setTimeout(() => {
      container.style.transition = "opacity 1.5s ease-out";
      container.style.opacity = "0";
    }, 3500);
    setTimeout(() => container.remove(), 5500);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
}
