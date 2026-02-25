"use client";

import { useEffect } from "react";

export default function BlockBreakerEgg() {
  useEffect(() => {
    let pos = 0;
    const word = "blocks";

    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === word[pos]) {
        pos++;
        if (pos === word.length) {
          startBlockBreaker();
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

function startBlockBreaker() {
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

  // Layout
  const COLS = 9;
  const ROWS = 5;
  const BRICK_PAD = 3;
  const BRICK_TOP = H * 0.08;
  const BRICK_W = (W - BRICK_PAD * (COLS + 1)) / COLS;
  const BRICK_H = H * 0.04;
  const PADDLE_W = W * 0.15;
  const PADDLE_H = H * 0.025;
  const PADDLE_Y = H - H * 0.08;
  const BALL_R = Math.max(4, W * 0.008);
  const BASE_SPEED = H * 0.005;

  // Row colors gradient: purple → pink → gold
  const rowColors = ["#6E3FCC", "#9D88ED", "#EE81DD", "#F0A0D0", "#F5C542"];

  // Build bricks
  const bricks: { x: number; y: number; w: number; h: number; alive: boolean; color: string }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      bricks.push({
        x: BRICK_PAD + c * (BRICK_W + BRICK_PAD),
        y: BRICK_TOP + r * (BRICK_H + BRICK_PAD),
        w: BRICK_W,
        h: BRICK_H,
        alive: true,
        color: rowColors[r],
      });
    }
  }

  // State
  let paddleX = W / 2 - PADDLE_W / 2;
  let bx = W / 2;
  let by = PADDLE_Y - BALL_R - 1;
  let vx = BASE_SPEED * 0.7 * (Math.random() > 0.5 ? 1 : -1);
  let vy = -BASE_SPEED;
  let score = 0;
  let lives = 3;
  let running = true;
  let over = false;
  let endText = "";
  let speedMult = 1;

  // Mouse control
  function onMove(e: MouseEvent) {
    const r = canvas.getBoundingClientRect();
    const scale = W / r.width;
    paddleX = Math.max(0, Math.min(W - PADDLE_W, (e.clientX - r.left) * scale - PADDLE_W / 2));
  }
  canvas.addEventListener("mousemove", onMove);

  // Keyboard control with smooth acceleration
  const keys: Record<string, boolean> = {};
  let paddleVelocity = 0;
  const PADDLE_ACCEL = W * 0.0015;
  const PADDLE_MAX_SPEED = W * 0.014;
  const PADDLE_FRICTION = 0.85;
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
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

  function resetBall() {
    bx = W / 2;
    by = PADDLE_Y - BALL_R - 1;
    vx = BASE_SPEED * 0.7 * (Math.random() > 0.5 ? 1 : -1);
    vy = -BASE_SPEED;
    speedMult = 1;
  }

  function update() {
    if (!running) return;

    // Keyboard paddle movement with smooth acceleration
    if (keys["ArrowLeft"]) {
      paddleVelocity -= PADDLE_ACCEL;
    } else if (keys["ArrowRight"]) {
      paddleVelocity += PADDLE_ACCEL;
    } else {
      paddleVelocity *= PADDLE_FRICTION;
    }
    paddleVelocity = Math.max(-PADDLE_MAX_SPEED, Math.min(PADDLE_MAX_SPEED, paddleVelocity));
    if (Math.abs(paddleVelocity) < 0.1) paddleVelocity = 0;
    paddleX = Math.max(0, Math.min(W - PADDLE_W, paddleX + paddleVelocity));

    if (!over) {
      bx += vx * speedMult;
      by += vy * speedMult;

      // Wall bounces
      if (bx - BALL_R <= 0) { vx = Math.abs(vx); bx = BALL_R; }
      if (bx + BALL_R >= W) { vx = -Math.abs(vx); bx = W - BALL_R; }
      if (by - BALL_R <= 0) { vy = Math.abs(vy); by = BALL_R; }

      // Paddle collision
      if (
        by + BALL_R >= PADDLE_Y &&
        by - BALL_R <= PADDLE_Y + PADDLE_H &&
        bx >= paddleX &&
        bx <= paddleX + PADDLE_W &&
        vy > 0
      ) {
        vy = -Math.abs(vy);
        // Angle based on where ball hits paddle
        const hitPos = (bx - paddleX) / PADDLE_W; // 0 to 1
        vx = BASE_SPEED * 1.2 * (hitPos - 0.5) * 2;
        by = PADDLE_Y - BALL_R;
        speedMult = Math.min(2, speedMult + 0.03);
      }

      // Ball out of bounds
      if (by > H + BALL_R) {
        lives--;
        if (lives <= 0) {
          over = true;
          endText = "GAME OVER";
          setTimeout(cleanup, 3000);
        } else {
          resetBall();
        }
      }

      // Brick collisions
      let rowCleared = false;
      for (const brick of bricks) {
        if (!brick.alive) continue;
        if (
          bx + BALL_R > brick.x &&
          bx - BALL_R < brick.x + brick.w &&
          by + BALL_R > brick.y &&
          by - BALL_R < brick.y + brick.h
        ) {
          brick.alive = false;
          score += 10;

          // Check if entire row is cleared
          const row = Math.round((brick.y - BRICK_TOP) / (BRICK_H + BRICK_PAD));
          const rowBricks = bricks.filter(
            (b) => Math.round((b.y - BRICK_TOP) / (BRICK_H + BRICK_PAD)) === row
          );
          if (rowBricks.every((b) => !b.alive)) {
            score += 50;
            rowCleared = true;
          }

          // Bounce ball
          const overlapLeft = bx + BALL_R - brick.x;
          const overlapRight = brick.x + brick.w - (bx - BALL_R);
          const overlapTop = by + BALL_R - brick.y;
          const overlapBottom = brick.y + brick.h - (by - BALL_R);
          const minOverlapX = Math.min(overlapLeft, overlapRight);
          const minOverlapY = Math.min(overlapTop, overlapBottom);
          if (minOverlapX < minOverlapY) {
            vx = -vx;
          } else {
            vy = -vy;
          }
          break; // Only one brick per frame
        }
      }

      // Suppress unused warning
      void rowCleared;

      // Win check
      if (bricks.every((b) => !b.alive)) {
        over = true;
        endText = "YOU WIN!";
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

    // Bricks
    for (const brick of bricks) {
      if (!brick.alive) continue;
      ctx.fillStyle = brick.color;
      ctx.beginPath();
      ctx.roundRect(brick.x, brick.y, brick.w, brick.h, 3);
      ctx.fill();
    }

    // Paddle
    ctx.fillStyle = "#9D88ED";
    ctx.beginPath();
    ctx.roundRect(paddleX, PADDLE_Y, PADDLE_W, PADDLE_H, 4);
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
    ctx.font = `bold ${Math.round(H * 0.05)}px system-ui, sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${score}`, 12, H - 12);

    // Lives
    for (let i = 0; i < lives; i++) {
      ctx.fillStyle = "#EE81DD";
      ctx.beginPath();
      ctx.arc(W - 20 - i * 20, 20, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Game over / win
    if (over) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.round(H * 0.1)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(endText, W / 2, H / 2 - H * 0.03);
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = `${Math.round(H * 0.05)}px system-ui, sans-serif`;
      ctx.fillText(`Score: ${score}`, W / 2, H / 2 + H * 0.06);
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = `${Math.round(H * 0.04)}px system-ui, sans-serif`;
      ctx.fillText("closing...", W / 2, H * 0.65);
    }
  }

  requestAnimationFrame(update);
}
