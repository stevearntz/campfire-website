"use client";

export default function RocketStepEgg({
  step,
  children,
}: {
  step: string;
  children: React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent) => {
    const circle = e.currentTarget.querySelector(
      "[data-rocket-circle]"
    ) as HTMLElement | null;
    if (!circle) return;

    const rect = circle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Clone the circle as a rocket
    const rocket = document.createElement("div");
    Object.assign(rocket.style, {
      position: "fixed",
      left: `${centerX - rect.width / 2}px`,
      top: `${centerY - rect.height / 2}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      borderRadius: "50%",
      background: "#6E3FCC",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "49",
      pointerEvents: "none",
      transition: "all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
      boxShadow: "0 0 20px rgba(110,63,204,0.6)",
    });
    rocket.textContent = step;
    document.body.appendChild(rocket);

    // Trail container
    const trailContainer = document.createElement("div");
    Object.assign(trailContainer.style, {
      position: "fixed",
      inset: "0",
      pointerEvents: "none",
      zIndex: "48",
      overflow: "hidden",
    });
    document.body.appendChild(trailContainer);

    // Spawn trail particles
    const trailInterval = setInterval(() => {
      const rocketRect = rocket.getBoundingClientRect();
      const rx = rocketRect.left + rocketRect.width / 2;
      const ry = rocketRect.top + rocketRect.height;

      for (let j = 0; j < 3; j++) {
        const particle = document.createElement("div");
        const size = 3 + Math.random() * 5;
        const hue = 15 + Math.random() * 30;
        const drift = (Math.random() - 0.5) * 20;
        Object.assign(particle.style, {
          position: "fixed",
          left: `${rx + drift}px`,
          top: `${ry}px`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          background: `hsl(${hue}, 100%, ${55 + Math.random() * 20}%)`,
          opacity: "0.9",
          transition: `all ${0.5 + Math.random() * 0.5}s ease-out`,
          transform: "translateY(0)",
          zIndex: "48",
          pointerEvents: "none",
        });
        trailContainer.appendChild(particle);
        requestAnimationFrame(() => {
          particle.style.transform = `translateY(${40 + Math.random() * 60}px) translateX(${(Math.random() - 0.5) * 30}px)`;
          particle.style.opacity = "0";
        });
      }
    }, 40);

    // Launch!
    requestAnimationFrame(() => {
      rocket.style.top = "-60px";
      rocket.style.transform = "scale(0.6)";
      rocket.style.boxShadow = "0 0 40px rgba(255,140,40,0.8), 0 0 80px rgba(110,63,204,0.4)";
    });

    setTimeout(() => clearInterval(trailInterval), 1200);
    setTimeout(() => {
      rocket.remove();
      trailContainer.remove();
    }, 2000);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer text-center">
      {children}
    </div>
  );
}
