"use client";

import { useEffect } from "react";

export default function RacingEgg() {
  useEffect(() => {
    function onActivate() {
      startRacing();
    }
    window.addEventListener("racing-activate", onActivate);
    return () => window.removeEventListener("racing-activate", onActivate);
  }, []);

  return null;
}

function startRacing() {
  const target = document.querySelector("[data-pong-target]") as HTMLElement;
  if (!target || target.querySelector("[data-pong-game]")) return;

  // Scroll showcase into view since "drive" link is below it
  target.scrollIntoView({ behavior: "smooth", block: "center" });

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

  // Road geometry
  const ROAD_W = W * 0.6;
  const ROAD_X = (W - ROAD_W) / 2;
  const LANE_COUNT = 3;
  const LANE_W = ROAD_W / LANE_COUNT;

  // Dash animation offset
  let dashOffset = 0;

  // Player state
  let playerLane = 1; // 0, 1, 2 (center)
  let playerX = ROAD_X + LANE_W * playerLane + LANE_W / 2;
  const playerY = H * 0.8;
  const CAR_W = LANE_W * 0.5;
  const CAR_H = CAR_W * 1.8;

  // Smooth lane transition
  let targetX = playerX;
  const LANE_LERP = 0.15;

  // Game state
  let score = 0;
  let speed = 3 * (H / 500); // base scroll speed scaled to canvas
  let running = true;
  let over = false;
  let lastTime = 0;
  let spawnTimer = 0;
  let speedTimer = 0;
  let passed = 0; // cars passed counter for bonus

  // Enemy cars
  interface EnemyCar {
    x: number;
    y: number;
    lane: number;
    speed: number;
    color: string;
    width: number;
    height: number;
  }
  const enemies: EnemyCar[] = [];

  const ENEMY_COLORS = ["#EE81DD", "#9D88ED", "#B06ECC", "#CC6EA0"];

  function spawnEnemy() {
    const eW = LANE_W * 0.5;
    const eH = eW * 1.8;
    const MIN_GAP = CAR_H * 3.5; // vertical gap needed to be passable

    // Find which lanes are clear near the top of the screen
    const laneClear = [true, true, true];
    for (const e of enemies) {
      if (e.y < MIN_GAP) {
        laneClear[e.lane] = false;
      }
    }

    // Never spawn if it would block all lanes — always leave at least one open
    const openLanes = laneClear.filter(Boolean).length;
    if (openLanes <= 1) return;

    // Pick from available lanes only
    const available = [0, 1, 2].filter((l) => laneClear[l]);
    const lane = available[Math.floor(Math.random() * available.length)];

    enemies.push({
      x: ROAD_X + LANE_W * lane + LANE_W / 2,
      y: -eH,
      lane,
      speed: speed * (0.4 + Math.random() * 0.3),
      width: eW,
      height: eH,
      color: ENEMY_COLORS[Math.floor(Math.random() * ENEMY_COLORS.length)],
    });
  }

  // Controls
  function onKeyDown(e: KeyboardEvent) {
    if (over) return;
    if (
      e.key === "ArrowLeft" ||
      e.key === "a" ||
      e.key === "A"
    ) {
      e.preventDefault();
      if (playerLane > 0) {
        playerLane--;
        targetX = ROAD_X + LANE_W * playerLane + LANE_W / 2;
      }
    } else if (
      e.key === "ArrowRight" ||
      e.key === "d" ||
      e.key === "D"
    ) {
      e.preventDefault();
      if (playerLane < LANE_COUNT - 1) {
        playerLane++;
        targetX = ROAD_X + LANE_W * playerLane + LANE_W / 2;
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

  function update(timestamp: number) {
    if (!running) return;

    const dt = lastTime ? (timestamp - lastTime) / 16.67 : 1; // normalize to ~60fps
    lastTime = timestamp;

    if (!over) {
      // Smooth lane movement
      playerX += (targetX - playerX) * LANE_LERP * Math.min(dt * 2, 4);

      // Scroll dashes
      dashOffset += speed * dt;
      if (dashOffset > 40) dashOffset -= 40;

      // Score ticks
      score += Math.round(speed * dt * 0.5);

      // Speed increase every ~5 seconds (300 frames at 60fps)
      speedTimer += dt;
      if (speedTimer > 300) {
        speed += 0.5 * (H / 500);
        speedTimer = 0;
      }

      // Spawn enemies
      spawnTimer += dt;
      const spawnInterval = Math.max(50, 120 - score / 80); // spawn faster over time
      if (spawnTimer > spawnInterval) {
        spawnEnemy();
        spawnTimer = 0;
      }

      // Move enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        e.y += (speed - e.speed) * dt; // relative speed (road scrolls, cars are slower)

        // Check if player passed this car (bonus points)
        if (!over && e.y > playerY + CAR_H / 2 + 5) {
          passed++;
          score += 25; // passing bonus
          enemies.splice(i, 1);
          continue;
        }

        // Remove if off screen
        if (e.y > H + e.height) {
          enemies.splice(i, 1);
          continue;
        }

        // Collision detection
        const px = playerX;
        const py = playerY;
        const halfPW = CAR_W / 2;
        const halfPH = CAR_H / 2;
        const halfEW = e.width / 2;
        const halfEH = e.height / 2;

        if (
          Math.abs(px - e.x) < halfPW + halfEW - 6 &&
          Math.abs(py - e.y) < halfPH + halfEH - 6
        ) {
          over = true;
          setTimeout(cleanup, 3000);
        }
      }
    }

    draw();
    requestAnimationFrame(update);
  }

  function draw() {
    // Background (grass/shoulders)
    ctx.fillStyle = "#1C1334";
    ctx.fillRect(0, 0, W, H);

    // Shoulder texture
    ctx.fillStyle = "#1a1030";
    ctx.fillRect(ROAD_X - 8, 0, 8, H);
    ctx.fillRect(ROAD_X + ROAD_W, 0, 8, H);

    // Road
    ctx.fillStyle = "#2a2040";
    ctx.fillRect(ROAD_X, 0, ROAD_W, H);

    // Road edge lines
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ROAD_X, 0);
    ctx.lineTo(ROAD_X, H);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ROAD_X + ROAD_W, 0);
    ctx.lineTo(ROAD_X + ROAD_W, H);
    ctx.stroke();

    // Lane dashes
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 20]);
    ctx.lineDashOffset = -dashOffset;
    for (let i = 1; i < LANE_COUNT; i++) {
      const lx = ROAD_X + LANE_W * i;
      ctx.beginPath();
      ctx.moveTo(lx, 0);
      ctx.lineTo(lx, H);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;

    // Enemy cars
    for (const e of enemies) {
      drawCar(e.x, e.y, e.width, e.height, e.color, false);
    }

    // Player car
    if (!over) {
      drawCar(playerX, playerY, CAR_W, CAR_H, "#6E3FCC", true);
    }

    // HUD
    const hudSize = Math.round(H * 0.04);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = `bold ${hudSize}px system-ui, sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(`SCORE: ${score}`, 12, hudSize + 8);

    ctx.textAlign = "right";
    const speedDisplay = Math.round(speed * 20);
    ctx.fillText(`${speedDisplay} MPH`, W - 12, hudSize + 8);

    // Game over
    if (over) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.round(H * 0.1)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", W / 2, H / 2 - H * 0.03);

      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = `${Math.round(H * 0.05)}px system-ui, sans-serif`;
      ctx.fillText(`Score: ${score}`, W / 2, H / 2 + H * 0.06);

      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = `${Math.round(H * 0.035)}px system-ui, sans-serif`;
      ctx.fillText(`Cars passed: ${passed}`, W / 2, H / 2 + H * 0.12);

      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = `${Math.round(H * 0.04)}px system-ui, sans-serif`;
      ctx.fillText("closing...", W / 2, H * 0.65);
    }
  }

  function drawCar(
    cx: number,
    cy: number,
    w: number,
    h: number,
    color: string,
    isPlayer: boolean
  ) {
    const x = cx - w / 2;
    const y = cy - h / 2;

    // Car body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 4);
    ctx.fill();

    // Windshield
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    if (isPlayer) {
      // Player faces up — windshield near top
      ctx.beginPath();
      ctx.roundRect(x + w * 0.15, y + h * 0.12, w * 0.7, h * 0.2, 2);
      ctx.fill();
    } else {
      // Enemy faces down — windshield near bottom (from player's perspective)
      ctx.beginPath();
      ctx.roundRect(x + w * 0.15, y + h * 0.68, w * 0.7, h * 0.2, 2);
      ctx.fill();
    }

    // Taillights / headlights
    ctx.fillStyle = isPlayer
      ? "rgba(255, 100, 100, 0.8)"
      : "rgba(255, 255, 200, 0.7)";

    if (isPlayer) {
      // Red taillights at bottom
      ctx.fillRect(x + 2, y + h - 6, w * 0.2, 4);
      ctx.fillRect(x + w - 2 - w * 0.2, y + h - 6, w * 0.2, 4);
    } else {
      // Yellow headlights at front (bottom, facing down toward player)
      ctx.fillRect(x + 2, y + h - 6, w * 0.2, 4);
      ctx.fillRect(x + w - 2 - w * 0.2, y + h - 6, w * 0.2, 4);
    }
  }

  requestAnimationFrame(update);
}
