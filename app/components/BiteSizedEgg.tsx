"use client";

// SVG bite mark path — a cookie-cutter semicircle with teeth marks
const BITE_SVG = `<svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 0 C40 0, 42 18, 30 28 C24 33, 12 32, 8 38 C4 44, 10 52, 16 54 C22 56, 28 50, 34 54 C40 58, 38 70, 40 80 L0 80 L0 0 Z" fill="currentColor"/>
</svg>`;

function showToast(text: string) {
  const toast = document.createElement("div");
  toast.textContent = text;
  Object.assign(toast.style, {
    position: "fixed",
    top: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#fff",
    background: "#6E3FCC",
    zIndex: "99999",
    opacity: "0",
    transition: "opacity 0.3s",
    pointerEvents: "none",
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = "1"; });
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

function chomp() {
  showToast("nom nom nom 🍪");

  // Find the bite-sized section's cards
  const section = document.querySelector("[data-bite-section]");
  if (!section) return;

  const cards = section.querySelectorAll("[data-bite-card]");
  if (!cards.length) return;

  // Pick 4-6 random cards to chomp
  const indices = Array.from({ length: cards.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const chompCount = Math.min(4 + Math.floor(Math.random() * 3), cards.length);
  const chosen = indices.slice(0, chompCount);

  chosen.forEach((idx, i) => {
    const card = cards[idx] as HTMLElement;
    const delay = i * 150 + Math.random() * 100;

    setTimeout(() => {
      // Add bite mark overlay
      const bite = document.createElement("div");
      const corners = ["top-left", "top-right", "bottom-left", "bottom-right"];
      const corner = corners[Math.floor(Math.random() * corners.length)];

      let rotation = 0;
      let posStyle: Record<string, string> = {};
      if (corner === "top-left") { rotation = 0; posStyle = { top: "-8px", left: "-8px" }; }
      else if (corner === "top-right") { rotation = 90; posStyle = { top: "-8px", right: "-8px" }; }
      else if (corner === "bottom-right") { rotation = 180; posStyle = { bottom: "-8px", right: "-8px" }; }
      else { rotation = 270; posStyle = { bottom: "-8px", left: "-8px" }; }

      bite.innerHTML = BITE_SVG;
      Object.assign(bite.style, {
        position: "absolute",
        ...posStyle,
        width: "50px",
        height: "50px",
        color: "#1C1334",
        transform: `rotate(${rotation}deg)`,
        zIndex: "10",
        pointerEvents: "none",
        opacity: "0",
        transition: "opacity 0.2s ease-in",
      });
      bite.querySelector("svg")!.style.width = "100%";
      bite.querySelector("svg")!.style.height = "100%";

      // Make card position relative for the absolute bite
      const prevPos = card.style.position;
      card.style.position = "relative";
      card.style.overflow = "visible";
      card.appendChild(bite);

      // Chomp animation: card shakes then bite appears
      card.style.transition = "transform 0.1s ease-in-out";
      card.style.transform = "scale(0.97) rotate(-1deg)";
      setTimeout(() => {
        card.style.transform = "scale(1.01) rotate(0.5deg)";
        bite.style.opacity = "1";
      }, 100);
      setTimeout(() => {
        card.style.transform = "";
      }, 200);

      // Fade bite mark away and restore
      setTimeout(() => {
        bite.style.transition = "opacity 1s ease-out";
        bite.style.opacity = "0";
      }, 2000);
      setTimeout(() => {
        bite.remove();
        card.style.position = prevPos;
        card.style.overflow = "";
        card.style.transition = "";
      }, 3200);
    }, delay);
  });
}

export default function BiteSizedEgg() {
  return (
    <span onClick={chomp} className="cursor-pointer">
      Bite-sized
    </span>
  );
}
