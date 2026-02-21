"use client";

import { useEffect } from "react";

export default function AsteroidsEgg() {
  useEffect(() => {
    let pos = 0;
    const word = "game";
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === word[pos]) {
        pos++;
        if (pos === word.length) { startGame(); pos = 0; }
      } else {
        pos = e.key === word[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}

/* ------------------------------------------------------------------ */

interface Falling {
  el: HTMLElement;
  y: number; w: number; h: number; x: number;
  baseSpeed: number;
  offset: number;
  hp: number; maxHp: number;
  origStyle: string | null;
  alive: boolean;
}

interface Bullet { el: HTMLDivElement; x: number; y: number }

/* ------------------------------------------------------------------ */

const FLAME_SVG = `<svg class="flame" width="28" height="22" viewBox="0 0 28 22" style="display:block;transition:opacity 0.6s">
  <defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFD700"/><stop offset="100%" stop-color="#FF4500"/></linearGradient></defs>
  <path d="M14 1 C10 6,4 10,6 16 C7 19,10 21,14 21 C18 21,21 19,22 16 C24 10,18 6,14 1Z" fill="url(#fg)"/>
  <path d="M14 7 C12 10,8 13,10 17 C11 19,13 20,14 20 C15 20,17 19,18 17 C20 13,16 10,14 7Z" fill="#FFD700" opacity="0.8"/>
</svg>`;

const LOGS_SVG = `<svg width="28" height="12" viewBox="0 0 28 12" style="display:block">
  <rect x="3" y="6" width="22" height="5" rx="2.5" fill="#6B3A1F"/>
  <rect x="5" y="2" width="18" height="5" rx="2.5" fill="#8B4513"/>
  <ellipse cx="8" cy="4.5" rx="1" ry="1.5" fill="#6B3A1F" opacity="0.5"/>
  <ellipse cx="20" cy="4.5" rx="1" ry="1.5" fill="#6B3A1F" opacity="0.5"/>
</svg>`;

function showToast(text: string) {
  const t = document.createElement("div");
  t.textContent = text;
  Object.assign(t.style, {
    position: "fixed", top: "24px", left: "50%",
    transform: "translateX(-50%)", padding: "12px 24px",
    borderRadius: "8px", fontWeight: "bold", fontSize: "16px",
    color: "#fff", background: "#6E3FCC", zIndex: "99999",
    opacity: "0", transition: "opacity 0.3s", pointerEvents: "none",
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = "1"; });
  setTimeout(() => { t.style.opacity = "0"; setTimeout(() => t.remove(), 400); }, 2500);
}

/* ================================================================== */

function startGame() {
  if (document.querySelector("[data-asteroids-game]")) return;

  const W = window.innerWidth;
  const H = window.innerHeight;
  const MARSHA_W = 56;
  const MARSHA_H = 56;
  const SHIP_BOTTOM = 14;
  const SHIP_Y = H - SHIP_BOTTOM - MARSHA_H; // top of Marsha
  const BULLET_SPEED = 9;

  /* ================================================================ */
  /*  Dark overlay with stars                                          */
  /* ================================================================ */
  const overlay = document.createElement("div");
  overlay.setAttribute("data-asteroids-game", "");
  Object.assign(overlay.style, {
    position: "fixed", inset: "0", zIndex: "99979",
    background: "#1C1334", opacity: "0", transition: "opacity 0.4s",
  });
  for (let i = 0; i < 70; i++) {
    const s = document.createElement("div");
    const sz = 1 + Math.random() * 2;
    Object.assign(s.style, {
      position: "absolute",
      left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
      width: `${sz}px`, height: `${sz}px`, borderRadius: "50%",
      background: `rgba(157,136,237,${0.15 + Math.random() * 0.45})`,
    });
    overlay.appendChild(s);
  }
  document.body.appendChild(overlay);
  requestAnimationFrame(() => { overlay.style.opacity = "1"; });

  /* ================================================================ */
  /*  Marsha (the ship)                                                */
  /* ================================================================ */
  const shipEl = document.createElement("div");
  const marshaImg = document.createElement("img");
  marshaImg.src = "/marsha.webp";
  marshaImg.alt = "Marsha";
  Object.assign(marshaImg.style, {
    width: `${MARSHA_W}px`, height: `${MARSHA_H}px`,
    objectFit: "contain", display: "block",
  });
  shipEl.appendChild(marshaImg);
  let shipX = W / 2;
  Object.assign(shipEl.style, {
    position: "fixed", bottom: `${SHIP_BOTTOM}px`,
    left: `${shipX - MARSHA_W / 2}px`,
    zIndex: "99985", pointerEvents: "none",
    filter: "drop-shadow(0 0 12px rgba(238,129,221,0.5))",
  });
  document.body.appendChild(shipEl);

  /* ================================================================ */
  /*  HUD                                                              */
  /* ================================================================ */
  const hudEl = document.createElement("div");
  Object.assign(hudEl.style, {
    position: "fixed", top: "20px", left: "20px", zIndex: "99990",
    color: "#9D88ED", fontFamily: "monospace", fontSize: "18px",
    fontWeight: "bold", pointerEvents: "none",
  });
  document.body.appendChild(hudEl);

  /* --- Campfire lives --- */
  const livesEl = document.createElement("div");
  Object.assign(livesEl.style, {
    position: "fixed", top: "12px", right: "16px", zIndex: "99990",
    display: "flex", gap: "10px", pointerEvents: "none",
  });
  document.body.appendChild(livesEl);

  const campfires: { container: HTMLDivElement; flame: HTMLElement }[] = [];
  for (let i = 0; i < 3; i++) {
    const c = document.createElement("div");
    Object.assign(c.style, { display: "flex", flexDirection: "column", alignItems: "center" });
    const flameDiv = document.createElement("div");
    flameDiv.innerHTML = FLAME_SVG;
    const logsDiv = document.createElement("div");
    logsDiv.innerHTML = LOGS_SVG;
    c.appendChild(flameDiv);
    c.appendChild(logsDiv);
    livesEl.appendChild(c);
    campfires.push({ container: c, flame: flameDiv });
  }

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "\u2715";
  Object.assign(closeBtn.style, {
    position: "fixed", top: "52px", right: "20px",
    width: "32px", height: "32px", borderRadius: "50%",
    border: "none", background: "rgba(255,255,255,0.12)",
    color: "#fff", fontSize: "14px", cursor: "pointer",
    zIndex: "99991", display: "flex",
    alignItems: "center", justifyContent: "center", lineHeight: "1",
  });
  document.body.appendChild(closeBtn);

  let gameOverEl: HTMLDivElement | null = null;

  /* ================================================================ */
  /*  Hide nav + footer                                                */
  /* ================================================================ */
  const nav = document.querySelector("nav") as HTMLElement | null;
  const footer = document.querySelector("footer") as HTMLElement | null;
  const navOrig = nav?.style.display ?? "";
  const footerOrig = footer?.style.display ?? "";
  if (nav) nav.style.display = "none";
  if (footer) footer.style.display = "none";

  const origOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  /* ================================================================ */
  /*  Capture DOM elements                                             */
  /* ================================================================ */
  const raw = Array.from(document.querySelectorAll(
    "main h1, main h2, main h3, main blockquote, main [class*='rounded-2xl'], main [class*='rounded-xl']"
  )) as HTMLElement[];

  // Keep only outermost elements
  const topEls = raw.filter(el => !raw.some(o => o !== el && o.contains(el)));

  const falling: Falling[] = [];
  let belowIdx = 0;

  for (const el of topEls) {
    const rect = el.getBoundingClientRect();
    // Skip tiny elements
    if (rect.width < 60 || rect.height < 40) continue;

    // Skip invisible elements — must have a visible background, border, or text
    const cs = window.getComputedStyle(el);
    const hasBg = cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent";
    const hasBorder = cs.borderColor !== "rgba(0, 0, 0, 0)" && cs.borderWidth !== "0px";
    const hasBgImage = cs.backgroundImage !== "none";
    const hasText = (el.textContent || "").trim().length > 0;
    const isVisible = cs.opacity !== "0" && cs.visibility !== "hidden" && cs.display !== "none";
    if (!isVisible || (!hasBg && !hasBorder && !hasBgImage && !hasText)) continue;

    const origStyle = el.getAttribute("style");
    let startY = rect.top;
    if (startY > H) {
      startY = -rect.height - 100 - belowIdx * 180;
      belowIdx++;
    }

    Object.assign(el.style, {
      position: "fixed",
      left: `${rect.left}px`, top: `${startY}px`,
      width: `${rect.width}px`, height: `${rect.height}px`,
      zIndex: "99980", margin: "0",
      pointerEvents: "none", transition: "none",
      transform: "translateY(0)",
    });

    const area = rect.width * rect.height;
    const hp = Math.max(1, Math.min(5, Math.round(area / 40000)));

    falling.push({
      el, x: rect.left, y: startY, w: rect.width, h: rect.height,
      baseSpeed: 0.15 + Math.random() * 3.5,
      offset: 0, hp, maxHp: hp, origStyle, alive: true,
    });
  }

  /* ================================================================ */
  /*  State                                                            */
  /* ================================================================ */
  const bullets: Bullet[] = [];
  let score = 0, lives = 3;
  let running = true, gameOver = false;
  let fireCool = 0, frame = 0;
  const keys: Record<string, boolean> = {};

  updateHUD();
  showToast("GAME ON");

  /* ================================================================ */
  /*  Input                                                            */
  /* ================================================================ */
  function moveShip() {
    shipEl.style.left = `${shipX - MARSHA_W / 2}px`;
  }
  function onMouseMove(e: MouseEvent) {
    shipX = Math.max(MARSHA_W / 2, Math.min(W - MARSHA_W / 2, e.clientX));
    moveShip();
  }
  function onMouseDown(e: MouseEvent) { e.preventDefault(); fire(); }
  function onKeyDown(e: KeyboardEvent) {
    if (["ArrowLeft","ArrowRight"," "].includes(e.key)) e.preventDefault();
    keys[e.key] = true;
    if (e.key === " ") fire();
    if (e.key === "Escape") cleanup();
  }
  function onKeyUp(e: KeyboardEvent) { keys[e.key] = false; }

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  /* ================================================================ */
  /*  Fire                                                             */
  /* ================================================================ */
  function fire() {
    if (fireCool > 0 || gameOver) return;
    fireCool = 10;
    const b = document.createElement("div");
    Object.assign(b.style, {
      position: "fixed",
      left: `${shipX - 3}px`, top: `${SHIP_Y - 4}px`,
      width: "6px", height: "6px", borderRadius: "50%",
      background: "#EE81DD",
      boxShadow: "0 0 6px #EE81DD, 0 0 14px rgba(238,129,221,0.4)",
      zIndex: "99982", pointerEvents: "none",
    });
    document.body.appendChild(b);
    bullets.push({ el: b, x: shipX, y: SHIP_Y - 4 });
  }

  /* ================================================================ */
  /*  Explosions                                                       */
  /* ================================================================ */
  function explodeAt(cx: number, cy: number, count = 14) {
    const colors = ["#EE81DD", "#9D88ED", "#6E3FCC", "#FFD700", "#FF6B6B"];
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      const angle = (i / Math.max(count, 1)) * Math.PI * 2;
      const dist = 25 + Math.random() * 70;
      const size = 3 + Math.random() * 5;
      Object.assign(p.style, {
        position: "fixed", left: `${cx}px`, top: `${cy}px`,
        width: `${size}px`, height: `${size}px`, borderRadius: "50%",
        background: colors[Math.floor(Math.random() * colors.length)],
        zIndex: "99983", pointerEvents: "none",
        transition: "all 0.55s ease-out",
        transform: "translate(0,0) scale(1)", opacity: "1",
      });
      document.body.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist}px) scale(0)`;
        p.style.opacity = "0";
      });
      setTimeout(() => p.remove(), 650);
    }
  }

  /* ================================================================ */
  /*  HUD                                                              */
  /* ================================================================ */
  function updateHUD() {
    hudEl.textContent = `SCORE ${score}`;
  }

  function extinguishLife() {
    // lives was already decremented — extinguish the campfire at index [lives]
    const cf = campfires[lives];
    if (cf) {
      const svg = cf.flame.querySelector(".flame") as SVGElement | null;
      if (svg) svg.style.opacity = "0";
    }
  }

  function showEndScreen(text: string) {
    gameOverEl = document.createElement("div");
    Object.assign(gameOverEl.style, {
      position: "fixed", inset: "0",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: "99988", pointerEvents: "none",
      background: "rgba(0,0,0,0.45)",
      opacity: "0", transition: "opacity 0.4s",
    });
    gameOverEl.innerHTML = `
      <div style="color:#fff;font-size:${Math.round(H * 0.07)}px;font-weight:bold;font-family:system-ui,sans-serif">${text}</div>
      <div style="color:#9D88ED;font-size:${Math.round(H * 0.035)}px;font-weight:bold;font-family:monospace;margin-top:16px">SCORE: ${score}</div>
      <div style="color:rgba(255,255,255,0.35);font-size:14px;font-family:system-ui;margin-top:12px">closing\u2026</div>
    `;
    document.body.appendChild(gameOverEl);
    requestAnimationFrame(() => { gameOverEl!.style.opacity = "1"; });
  }

  /* ================================================================ */
  /*  Cleanup                                                          */
  /* ================================================================ */
  function cleanup() {
    running = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);

    for (const f of falling) {
      if (f.origStyle !== null) f.el.setAttribute("style", f.origStyle);
      else f.el.removeAttribute("style");
    }
    for (const b of bullets) b.el.remove();

    overlay.remove();
    shipEl.remove();
    hudEl.remove();
    livesEl.remove();
    closeBtn.remove();
    if (gameOverEl) gameOverEl.remove();

    if (nav) nav.style.display = navOrig;
    if (footer) footer.style.display = footerOrig;
    document.body.style.overflow = origOverflow;
  }
  closeBtn.addEventListener("click", cleanup);

  /* ================================================================ */
  /*  Lose a life                                                      */
  /* ================================================================ */
  function loseLife(f: Falling) {
    f.alive = false;
    f.el.style.display = "none";
    lives--;
    extinguishLife();
    updateHUD();
    if (lives <= 0) {
      gameOver = true;
      showEndScreen("GAME OVER");
      setTimeout(cleanup, 4000);
    }
  }

  /* ================================================================ */
  /*  Game loop                                                        */
  /* ================================================================ */
  function loop() {
    if (!running) return;
    frame++;

    // Speed ramps up over time: 1× → ~4× over ~60 seconds
    const speedMult = 1 + (frame / 60) * 0.05;

    // Keyboard ship movement
    if (keys["ArrowLeft"] || keys["a"]) shipX = Math.max(MARSHA_W / 2, shipX - 6);
    if (keys["ArrowRight"] || keys["d"]) shipX = Math.min(W - MARSHA_W / 2, shipX + 6);
    if (keys["ArrowLeft"] || keys["ArrowRight"] || keys["a"] || keys["d"]) moveShip();
    if (fireCool > 0) fireCool--;

    if (!gameOver) {
      // --- Falling elements ---
      let anyAlive = false;
      for (const f of falling) {
        if (!f.alive) continue;
        anyAlive = true;
        f.offset += f.baseSpeed * speedMult;
        f.el.style.transform = `translateY(${f.offset}px)`;

        const fy = f.y + f.offset;
        const elBottom = fy + f.h;

        // Check: element touches Marsha (ship collision)
        const shipLeft = shipX - MARSHA_W / 2;
        const shipRight = shipX + MARSHA_W / 2;
        const elRight = f.x + f.w;
        if (elBottom >= SHIP_Y && fy <= SHIP_Y + MARSHA_H &&
            elRight > shipLeft && f.x < shipRight) {
          loseLife(f);
          if (gameOver) break;
          continue;
        }

        // Check: any part of element passes bottom of screen
        if (elBottom > H) {
          loseLife(f);
          if (gameOver) break;
        }
      }

      // --- Bullets ---
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.y -= BULLET_SPEED;
        b.el.style.top = `${b.y}px`;

        if (b.y < -20) {
          b.el.remove();
          bullets.splice(i, 1);
          continue;
        }

        let hit = false;
        for (const f of falling) {
          if (!f.alive) continue;
          const fy = f.y + f.offset;
          if (b.x >= f.x && b.x <= f.x + f.w && b.y >= fy && b.y <= fy + f.h) {
            f.hp--;
            b.el.remove();
            bullets.splice(i, 1);

            if (f.hp <= 0) {
              f.alive = false;
              score += f.maxHp * 50;
              explodeAt(f.x + f.w / 2, fy + f.h / 2);
              f.el.style.transition = "transform 0.35s ease-in, opacity 0.35s ease-in";
              f.el.style.transform = `translateY(${f.offset}px) scale(0.1)`;
              f.el.style.opacity = "0";
              const captured = f.el;
              setTimeout(() => { captured.style.display = "none"; }, 400);
            } else {
              score += 25;
              explodeAt(b.x, b.y, 6);
              const pct = f.hp / f.maxHp;
              f.el.style.opacity = `${0.4 + pct * 0.6}`;
              f.el.style.filter = `brightness(${1 + (1 - pct) * 0.8})`;
              f.el.style.transition = "filter 0.15s, opacity 0.15s";
            }

            updateHUD();
            hit = true;
            break;
          }
        }
        if (hit) continue;
      }

      // --- Win check ---
      if (!anyAlive && !gameOver && falling.every(f => !f.alive)) {
        gameOver = true;
        showEndScreen("YOU WIN!");
        setTimeout(cleanup, 4000);
      }
    }

    requestAnimationFrame(loop);
  }

  setTimeout(() => requestAnimationFrame(loop), 600);
}
