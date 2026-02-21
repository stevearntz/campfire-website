"use client";

import { useEffect } from "react";

export default function SnakeEgg() {
  useEffect(() => {
    let pos = 0;
    const word = "snake";

    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === word[pos]) {
        pos++;
        if (pos === word.length) {
          startSnake();
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

function startSnake() {
  const target = document.querySelector("[data-pong-target]") as HTMLElement;
  if (!target || target.querySelector("[data-pong-game]")) return;

  const rect = target.getBoundingClientRect();
  const W = Math.round(rect.width);
  const H = Math.round(rect.height);
  if (W < 100 || H < 100) return;

  // Wrapper
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

  // Grid
  const COLS = 20;
  const CELL = Math.floor(W / COLS);
  const ROWS = Math.floor(H / CELL);
  const GRID_W = COLS * CELL;
  const GRID_H = ROWS * CELL;
  const OFFSET_X = Math.floor((W - GRID_W) / 2);
  const OFFSET_Y = Math.floor((H - GRID_H) / 2);

  // State
  const startX = Math.floor(COLS / 2);
  const startY = Math.floor(ROWS / 2);
  let snake = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
  ];
  let dir = { x: 1, y: 0 };
  let nextDir = { x: 1, y: 0 };
  let food = spawnFood();
  let score = 0;
  let running = true;
  let over = false;
  let endText = "";
  let interval = 150;
  let lastTime = 0;

  function spawnFood(): { x: number; y: number } {
    let fx: number, fy: number;
    do {
      fx = Math.floor(Math.random() * COLS);
      fy = Math.floor(Math.random() * ROWS);
    } while (snake.some((s) => s.x === fx && s.y === fy));
    return { x: fx, y: fy };
  }

  // Controls
  function onKeyDown(e: KeyboardEvent) {
    const keyMap: Record<string, { x: number; y: number }> = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      w: { x: 0, y: -1 },
      s: { x: 0, y: 1 },
      a: { x: -1, y: 0 },
      d: { x: 1, y: 0 },
    };
    const newDir = keyMap[e.key];
    if (newDir) {
      e.preventDefault();
      // Prevent reversing
      if (newDir.x !== -dir.x || newDir.y !== -dir.y) {
        nextDir = newDir;
      }
    }
    if (e.key === "Escape") cleanup();
  }
  window.addEventListener("keydown", onKeyDown);

  function cleanup() {
    running = false;
    window.removeEventListener("keydown", onKeyDown);
    wrapper.remove();
  }
  closeBtn.addEventListener("click", cleanup);

  function step() {
    dir = nextDir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    // Wall collision
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      over = true;
      endText = "GAME OVER";
      setTimeout(cleanup, 3000);
      return;
    }

    // Self collision
    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      over = true;
      endText = "GAME OVER";
      setTimeout(cleanup, 3000);
      return;
    }

    snake.unshift(head);

    // Food
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      food = spawnFood();
      interval = Math.max(60, interval - 2);
    } else {
      snake.pop();
    }
  }

  function loop(time: number) {
    if (!running) return;

    if (time - lastTime >= interval && !over) {
      step();
      lastTime = time;
    }

    draw();
    requestAnimationFrame(loop);
  }

  function draw() {
    // Background
    ctx.fillStyle = "#1C1334";
    ctx.fillRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = "rgba(157,136,237,0.1)";
    ctx.lineWidth = 1;
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(OFFSET_X + c * CELL, OFFSET_Y);
      ctx.lineTo(OFFSET_X + c * CELL, OFFSET_Y + GRID_H);
      ctx.stroke();
    }
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(OFFSET_X, OFFSET_Y + r * CELL);
      ctx.lineTo(OFFSET_X + GRID_W, OFFSET_Y + r * CELL);
      ctx.stroke();
    }

    // Snake
    for (let i = 0; i < snake.length; i++) {
      const s = snake[i];
      const pad = 1;
      ctx.fillStyle = i === 0 ? "#7B5FD6" : "#9D88ED";
      ctx.beginPath();
      ctx.roundRect(
        OFFSET_X + s.x * CELL + pad,
        OFFSET_Y + s.y * CELL + pad,
        CELL - pad * 2,
        CELL - pad * 2,
        3
      );
      ctx.fill();
    }

    // Food with glow
    ctx.save();
    ctx.shadowColor = "#EE81DD";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#EE81DD";
    ctx.beginPath();
    ctx.arc(
      OFFSET_X + food.x * CELL + CELL / 2,
      OFFSET_Y + food.y * CELL + CELL / 2,
      CELL * 0.35,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.restore();

    // Score
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = `bold ${Math.round(H * 0.05)}px system-ui, sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${score}`, 12, H - 12);

    // Length
    ctx.textAlign = "right";
    ctx.fillText(`Length: ${snake.length}`, W - 12, H - 12);

    // Game over
    if (over) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.round(H * 0.1)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(endText, W / 2, H / 2 - H * 0.05);
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = `${Math.round(H * 0.05)}px system-ui, sans-serif`;
      ctx.fillText(`Score: ${score}  |  Length: ${snake.length}`, W / 2, H / 2 + H * 0.05);
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = `${Math.round(H * 0.04)}px system-ui, sans-serif`;
      ctx.fillText("closing...", W / 2, H * 0.65);
    }
  }

  requestAnimationFrame(loop);
}
