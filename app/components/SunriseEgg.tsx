"use client";

export default function SunriseEgg({ children }: { children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!document.getElementById("sunrise-keyframes")) {
      const s = document.createElement("style");
      s.id = "sunrise-keyframes";
      s.textContent = `
        @keyframes sun-rise {
          0% { transform: translateY(100px) scale(0.8); opacity: 0; }
          40% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes ray-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sky-warm {
          0% { opacity: 0; }
          30% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
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

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Sky gradient — warm sunrise colors
    const sky = document.createElement("div");
    Object.assign(sky.style, {
      position: "absolute",
      inset: "0",
      background: "linear-gradient(to top, rgba(255,140,50,0.4) 0%, rgba(255,180,80,0.25) 25%, rgba(255,220,150,0.15) 45%, rgba(120,80,200,0.1) 70%, transparent 100%)",
      animation: "sky-warm 4.5s ease-in-out forwards",
    });
    container.appendChild(sky);

    // Sun
    const sunContainer = document.createElement("div");
    const sunSize = Math.min(vw, vh) * 0.15;
    Object.assign(sunContainer.style, {
      position: "absolute",
      left: `${vw / 2 - sunSize / 2}px`,
      bottom: `${vh * 0.15}px`,
      width: `${sunSize}px`,
      height: `${sunSize}px`,
      animation: "sun-rise 2.5s ease-out forwards",
      opacity: "0",
    });

    // Sun glow
    const glow = document.createElement("div");
    Object.assign(glow.style, {
      position: "absolute",
      inset: `-${sunSize * 0.5}px`,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,200,60,0.4) 0%, rgba(255,160,40,0.15) 50%, transparent 70%)",
    });
    sunContainer.appendChild(glow);

    // Sun disc
    const disc = document.createElement("div");
    Object.assign(disc.style, {
      position: "absolute",
      inset: "0",
      borderRadius: "50%",
      background: "radial-gradient(circle, #FFE484 0%, #FFBA42 60%, #FF8C20 100%)",
      boxShadow: "0 0 60px rgba(255,180,60,0.6), 0 0 120px rgba(255,140,40,0.3)",
    });
    sunContainer.appendChild(disc);

    // Spinning rays
    const rayContainer = document.createElement("div");
    Object.assign(rayContainer.style, {
      position: "absolute",
      inset: `-${sunSize * 0.8}px`,
      animation: "ray-spin 20s linear infinite",
    });

    const rayCount = 12;
    for (let i = 0; i < rayCount; i++) {
      const ray = document.createElement("div");
      const angle = (360 / rayCount) * i;
      const width = 2 + Math.random() * 2;
      const length = sunSize * (0.6 + Math.random() * 0.5);
      Object.assign(ray.style, {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: `${width}px`,
        height: `${length}px`,
        background: "linear-gradient(to top, rgba(255,220,100,0.5), transparent)",
        transformOrigin: "bottom center",
        transform: `translateX(-50%) rotate(${angle}deg) translateY(-${sunSize / 2}px)`,
        borderRadius: "2px",
      });
      rayContainer.appendChild(ray);
    }
    sunContainer.appendChild(rayContainer);
    container.appendChild(sunContainer);

    // Lens flare dots
    for (let i = 0; i < 6; i++) {
      const flare = document.createElement("div");
      const size = 4 + Math.random() * 10;
      const x = vw / 2 + (Math.random() - 0.5) * vw * 0.4;
      const y = vh * 0.3 + Math.random() * vh * 0.3;
      const delay = 1 + Math.random() * 1.5;
      Object.assign(flare.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,240,180,0.8), transparent)",
        animation: `star-twinkle 2s ${delay}s ease-in-out`,
        opacity: "0",
      });
      container.appendChild(flare);
    }

    // Fade out and remove
    setTimeout(() => {
      container.style.transition = "opacity 1.5s ease-out";
      container.style.opacity = "0";
    }, 4000);
    setTimeout(() => container.remove(), 6000);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
}
