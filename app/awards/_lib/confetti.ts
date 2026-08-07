// Lightweight, dependency-free confetti burst for the winner reveal. Spawns a
// throwaway full-screen canvas, fires a party-popper burst from center, then
// cleans itself up. No-ops on the server.
export function fireConfetti(accent = "#E055CB") {
  if (typeof document === "undefined") return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }

  const colors = [accent, "#F59E2C", "#6E3FCC", "#E055CB", "#2E9E92", "#FFFFFF"];
  const DURATION = 2600;
  const cx = canvas.width / 2;
  const cy = canvas.height * 0.42;

  const parts = Array.from({ length: 150 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 11 + 4;
    return {
      x: cx + (Math.random() - 0.5) * 120,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6, // bias upward
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.35,
    };
  });

  const start = performance.now();
  function frame(now: number) {
    const t = now - start;
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of parts) {
      p.vy += 0.3; // gravity
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rot);
      ctx!.globalAlpha = Math.max(0, 1 - t / DURATION);
      ctx!.fillStyle = p.color;
      ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx!.restore();
    }
    if (t < DURATION) requestAnimationFrame(frame);
    else canvas.remove();
  }
  requestAnimationFrame(frame);
}
