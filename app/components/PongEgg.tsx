"use client";

import { useEffect } from "react";

export default function PongEgg() {
  useEffect(() => {
    let pos = 0;
    const word = "pong";

    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === word[pos]) {
        pos++;
        if (pos === word.length) {
          startPong();
          pos = 0;
        }
      } else {
        pos = e.key === word[0] ? 1 : 0;
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}

function startPong() {
  const target = document.querySelector("[data-pong-target]") as HTMLElement;
  if (!target || target.querySelector("[data-pong-game]")) return;

  const rect = target.getBoundingClientRect();
  const W = Math.round(rect.width);
  const H = Math.round(rect.height);
  if (W < 100 || H < 100) return;

  // Wrapper overlays the image area
  const wrapper = document.createElement("div");
  wrapper.setAttribute("data-pong-game", "");
  Object.assign(wrapper.style, {
    position: "absolute",
    inset: "0",
    zIndex: "30",
    borderRadius: "8px",
    overflow: "hidden",
  });

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  Object.assign(canvas.style, {
    width: "100%",
    height: "100%",
    display: "block",
    cursor: "none",
  });
  wrapper.appendChild(canvas);

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "\u2715";
  Object.assign(closeBtn.style, {
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    zIndex: "31",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1",
  });
  wrapper.appendChild(closeBtn);

  target.appendChild(wrapper);

  const ctx = canvas.getContext("2d")!;

  // Dimensions
  const PADDLE_W = Math.max(8, W * 0.015);
  const PADDLE_H = H * 0.2;
  const BALL_R = Math.max(5, W * 0.01);
  const MARGIN = W * 0.04;
  const WIN_SCORE = 7;
  const BASE_SPEED = W * 0.005;

  // State
  let pY = H / 2 - PADDLE_H / 2;
  let aiY = H / 2 - PADDLE_H / 2;
  let bx = W / 2, by = H / 2;
  let vx = BASE_SPEED * (Math.random() > 0.5 ? 1 : -1);
  let vy = H * 0.003 * (Math.random() > 0.5 ? 1 : -1);
  let pScore = 0, aiScore = 0;
  let running = true;
  let over = false;
  let winText = "";

  // Mouse control
  function onMove(e: MouseEvent) {
    const r = canvas.getBoundingClientRect();
    const scale = H / r.height;
    pY = Math.max(0, Math.min(H - PADDLE_H, (e.clientY - r.top) * scale - PADDLE_H / 2));
  }
  canvas.addEventListener("mousemove", onMove);

  // Keyboard control
  const keys: Record<string, boolean> = {};
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      keys[e.key] = true;
    }
    if (e.key === "Escape") cleanup();
  }
  function onKeyUp(e: KeyboardEvent) { keys[e.key] = false; }
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  function cleanup() {
    running = false;
    canvas.removeEventListener("mousemove", onMove);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    wrapper.remove();
  }
  closeBtn.addEventListener("click", cleanup);

  function resetBall(dir: number) {
    bx = W / 2;
    by = H / 2;
    vx = BASE_SPEED * dir;
    vy = H * 0.003 * (Math.random() > 0.5 ? 1 : -1);
  }

  function update() {
    if (!running) return;

    // Keyboard paddle movement
    const kSpeed = H * 0.01;
    if (keys["ArrowUp"]) pY = Math.max(0, pY - kSpeed);
    if (keys["ArrowDown"]) pY = Math.min(H - PADDLE_H, pY + kSpeed);

    if (!over) {
      bx += vx;
      by += vy;

      // Top/bottom walls
      if (by - BALL_R <= 0) { vy = Math.abs(vy); by = BALL_R; }
      if (by + BALL_R >= H) { vy = -Math.abs(vy); by = H - BALL_R; }

      // Player paddle (left)
      const px = MARGIN;
      if (bx - BALL_R <= px + PADDLE_W && bx + BALL_R >= px &&
          by >= pY && by <= pY + PADDLE_H && vx < 0) {
        vx = Math.abs(vx) * 1.06;
        vy += ((by - (pY + PADDLE_H / 2)) / (PADDLE_H / 2)) * H * 0.004;
        bx = px + PADDLE_W + BALL_R;
      }

      // AI paddle (right)
      const ax = W - MARGIN - PADDLE_W;
      if (bx + BALL_R >= ax && bx - BALL_R <= ax + PADDLE_W &&
          by >= aiY && by <= aiY + PADDLE_H && vx > 0) {
        vx = -Math.abs(vx) * 1.06;
        vy += ((by - (aiY + PADDLE_H / 2)) / (PADDLE_H / 2)) * H * 0.004;
        bx = ax - BALL_R;
      }

      // AI movement
      const aiCenter = aiY + PADDLE_H / 2;
      const aiSpeed = H * 0.0055;
      if (by > aiCenter + 8) aiY = Math.min(H - PADDLE_H, aiY + aiSpeed);
      else if (by < aiCenter - 8) aiY = Math.max(0, aiY - aiSpeed);

      // Scoring
      if (bx < -BALL_R) { aiScore++; resetBall(-1); }
      else if (bx > W + BALL_R) { pScore++; resetBall(1); }

      // Clamp ball speed
      const maxV = W * 0.015;
      if (Math.abs(vx) > maxV) vx = maxV * Math.sign(vx);
      if (Math.abs(vy) > maxV) vy = maxV * Math.sign(vy);

      if (pScore >= WIN_SCORE || aiScore >= WIN_SCORE) {
        over = true;
        winText = pScore >= WIN_SCORE ? "You win!" : "AI wins!";
        setTimeout(cleanup, 3000);
      }
    }

    draw();
    requestAnimationFrame(update);
  }

  function draw() {
    // Background
    ctx.fillStyle = "#1C1334";
    ctx.fillRect(0, 0, W, H);

    // Center line
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = "rgba(157, 136, 237, 0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.stroke();
    ctx.setLineDash([]);

    // Paddles
    ctx.fillStyle = "#9D88ED";
    ctx.beginPath();
    ctx.roundRect(MARGIN, pY, PADDLE_W, PADDLE_H, 3);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(W - MARGIN - PADDLE_W, aiY, PADDLE_W, PADDLE_H, 3);
    ctx.fill();

    // Ball with glow
    ctx.save();
    ctx.shadowColor = "#EE81DD";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#EE81DD";
    ctx.beginPath();
    ctx.arc(bx, by, BALL_R, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Score
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = `bold ${Math.round(H * 0.08)}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(`${pScore}`, W * 0.35, H * 0.14);
    ctx.fillText(`${aiScore}`, W * 0.65, H * 0.14);

    // Game over
    if (over) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.round(H * 0.1)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(winText, W / 2, H / 2);
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = `${Math.round(H * 0.04)}px system-ui, sans-serif`;
      ctx.fillText("closing...", W / 2, H * 0.6);
    }
  }

  requestAnimationFrame(update);
}
