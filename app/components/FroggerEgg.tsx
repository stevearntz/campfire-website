"use client";

import { useEffect } from "react";

export default function FroggerEgg() {
  useEffect(() => {
    let pos = 0;
    const word = "frog";

    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === word[pos]) {
        pos++;
        if (pos === word.length) {
          startFrogger();
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

function startFrogger() {
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

  // Grid: 11 rows total (goal, 4 water, safe, 4 traffic, start)
  const TOTAL_ROWS = 11;
  const CELL_H = H / TOTAL_ROWS;
  const CELL_W = CELL_H; // Square cells for frog movement
  const COLS = Math.floor(W / CELL_W);

  // Row indices (0 = top)
  const GOAL_ROW = 0;
  const WATER_ROWS = [1, 2, 3, 4];
  const SAFE_MID_ROW = 5;
  const TRAFFIC_ROWS = [6, 7, 8, 9];
  const START_ROW = 10;

  // Goal slots — 5 evenly spaced
  const GOAL_SLOTS = 5;
  const goalSlotPositions: number[] = [];
  const slotSpacing = COLS / (GOAL_SLOTS + 1);
  for (let i = 1; i <= GOAL_SLOTS; i++) {
    goalSlotPositions.push(Math.floor(slotSpacing * i));
  }
  const goalsReached: boolean[] = new Array(GOAL_SLOTS).fill(false);

  // Frog state
  let frogCol = Math.floor(COLS / 2);
  let frogRow = START_ROW;
  let score = 0;
  let lives = 3;
  let running = true;
  let over = false;
  let endText = "";
  let ridingLog: { speed: number } | null = null;
  let frogX = frogCol * CELL_W; // Pixel X for smooth log riding
  let highestRow = START_ROW;
  let speedMult = 1; // increases 5% per goal reached

  // Lane objects
  interface LaneObj {
    x: number;
    width: number;
    speed: number;
    color: string;
  }

  // Traffic lanes (rows 6-9)
  const trafficLanes: LaneObj[][] = TRAFFIC_ROWS.map((_, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    const speed = (1.0 + i * 0.3) * dir * (W / 600);
    const count = 2 + Math.floor(Math.random() * 2);
    const objWidth = CELL_W * (1.2 + Math.random() * 0.8);
    const spacing = W / count;
    const color = i % 2 === 0 ? "#6E3FCC" : "#EE81DD";
    const lane: LaneObj[] = [];
    for (let j = 0; j < count; j++) {
      lane.push({
        x: j * spacing,
        width: objWidth,
        speed,
        color,
      });
    }
    return lane;
  });

  // Water/log lanes (rows 1-4)
  const logLanes: LaneObj[][] = WATER_ROWS.map((_, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    const speed = (0.7 + i * 0.2) * dir * (W / 600);
    const count = 2 + Math.floor(Math.random() * 2);
    const logWidth = CELL_W * (3 + Math.random() * 2);
    const spacing = W / count;
    const lane: LaneObj[] = [];
    for (let j = 0; j < count; j++) {
      lane.push({
        x: j * spacing + Math.random() * spacing * 0.3,
        width: logWidth,
        speed,
        color: "#8B4513",
      });
    }
    return lane;
  });

  // Controls
  function onKeyDown(e: KeyboardEvent) {
    if (over) return;
    const moves: Record<string, { dc: number; dr: number }> = {
      ArrowUp: { dc: 0, dr: -1 },
      ArrowDown: { dc: 0, dr: 1 },
      ArrowLeft: { dc: -1, dr: 0 },
      ArrowRight: { dc: 1, dr: 0 },
    };
    const move = moves[e.key];
    if (move) {
      e.preventDefault();
      const newRow = frogRow + move.dr;
      const newCol = Math.round(frogX / CELL_W) + move.dc;
      if (newCol >= 0 && newCol < COLS && newRow >= 0 && newRow <= START_ROW) {
        frogRow = newRow;
        frogCol = newCol;
        frogX = frogCol * CELL_W;
        ridingLog = null;

        // Score for moving forward
        if (frogRow < highestRow) {
          score += 10 * (highestRow - frogRow);
          highestRow = frogRow;
        }
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

  function resetFrog() {
    frogCol = Math.floor(COLS / 2);
    frogRow = START_ROW;
    frogX = frogCol * CELL_W;
    ridingLog = null;
    highestRow = START_ROW;
  }

  function die() {
    lives--;
    if (lives <= 0) {
      over = true;
      endText = "GAME OVER";
      setTimeout(cleanup, 3000);
    } else {
      resetFrog();
    }
  }

  function update() {
    if (!running) return;

    if (!over) {
      // Move traffic
      for (const lane of trafficLanes) {
        for (const obj of lane) {
          obj.x += obj.speed * speedMult;
          if (obj.x > W + obj.width) obj.x = -obj.width;
          if (obj.x < -obj.width) obj.x = W + obj.width;
        }
      }

      // Move logs
      for (const lane of logLanes) {
        for (const log of lane) {
          log.x += log.speed * speedMult;
          if (log.x > W + log.width) log.x = -log.width;
          if (log.x < -log.width) log.x = W + log.width;
        }
      }

      // Frog riding log
      if (ridingLog) {
        frogX += ridingLog.speed * speedMult;
        frogCol = Math.round(frogX / CELL_W);
        // Carried off screen
        if (frogX < -CELL_W || frogX > W) {
          die();
        }
      }

      // Collision: traffic
      const trafficIdx = TRAFFIC_ROWS.indexOf(frogRow);
      if (trafficIdx >= 0) {
        const frogLeft = frogX + 2;
        const frogRight = frogX + CELL_W - 2;
        const frogTop = frogRow * CELL_H + 2;
        const frogBot = frogRow * CELL_H + CELL_H - 2;
        for (const obj of trafficLanes[trafficIdx]) {
          if (
            frogRight > obj.x &&
            frogLeft < obj.x + obj.width &&
            frogBot > frogRow * CELL_H &&
            frogTop < frogRow * CELL_H + CELL_H
          ) {
            die();
            break;
          }
        }
      }

      // Collision: water — must be on a log
      const waterIdx = WATER_ROWS.indexOf(frogRow);
      if (waterIdx >= 0) {
        let onLog = false;
        const frogCenterX = frogX + CELL_W / 2;
        for (const log of logLanes[waterIdx]) {
          if (frogCenterX > log.x && frogCenterX < log.x + log.width) {
            onLog = true;
            ridingLog = log;
            break;
          }
        }
        if (!onLog) {
          die();
        }
      } else {
        ridingLog = null;
      }

      // Goal check
      if (frogRow === GOAL_ROW) {
        let landed = false;
        for (let i = 0; i < GOAL_SLOTS; i++) {
          if (
            !goalsReached[i] &&
            Math.abs(frogCol - goalSlotPositions[i]) <= 1
          ) {
            goalsReached[i] = true;
            score += 50;
            speedMult += 0.05;
            landed = true;
            break;
          }
        }
        if (!landed) {
          die();
        } else {
          resetFrog();
          // Win check
          if (goalsReached.every(Boolean)) {
            score += 500;
            over = true;
            endText = "YOU WIN!";
            setTimeout(cleanup, 3000);
          }
        }
      }
    }

    draw();
    requestAnimationFrame(update);
  }

  function draw() {
    // Background
    ctx.fillStyle = "#1C1334";
    ctx.fillRect(0, 0, W, H);

    // Row backgrounds
    for (let r = 0; r < TOTAL_ROWS; r++) {
      const y = r * CELL_H;
      if (WATER_ROWS.includes(r)) {
        ctx.fillStyle = "#1e3a5f";
        ctx.fillRect(0, y, W, CELL_H);
      } else if (r === SAFE_MID_ROW || r === START_ROW) {
        ctx.fillStyle = "#1C1334";
        ctx.fillRect(0, y, W, CELL_H);
        // Subtle safe zone indicator
        ctx.fillStyle = "rgba(157,136,237,0.08)";
        ctx.fillRect(0, y, W, CELL_H);
      } else if (r === GOAL_ROW) {
        ctx.fillStyle = "#1e3a5f";
        ctx.fillRect(0, y, W, CELL_H);
      }
    }

    // Goal slots (lily pads)
    for (let i = 0; i < GOAL_SLOTS; i++) {
      const gx = goalSlotPositions[i] * CELL_W;
      const gy = GOAL_ROW * CELL_H;
      if (goalsReached[i]) {
        ctx.fillStyle = "#4ADE80";
      } else {
        ctx.fillStyle = "rgba(74, 222, 128, 0.3)";
      }
      ctx.beginPath();
      ctx.arc(gx + CELL_W / 2, gy + CELL_H / 2, CELL_W * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Logs
    for (const lane of logLanes) {
      for (const log of lane) {
        ctx.fillStyle = log.color;
        ctx.beginPath();
        ctx.roundRect(log.x, WATER_ROWS[logLanes.indexOf(lane)] * CELL_H + 2, log.width, CELL_H - 4, 4);
        ctx.fill();
        // Log texture lines
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 1;
        for (let lx = log.x + CELL_W * 0.8; lx < log.x + log.width - 5; lx += CELL_W * 0.8) {
          ctx.beginPath();
          ctx.moveTo(lx, WATER_ROWS[logLanes.indexOf(lane)] * CELL_H + 4);
          ctx.lineTo(lx, WATER_ROWS[logLanes.indexOf(lane)] * CELL_H + CELL_H - 4);
          ctx.stroke();
        }
      }
    }

    // Traffic
    for (let i = 0; i < trafficLanes.length; i++) {
      for (const obj of trafficLanes[i]) {
        ctx.fillStyle = obj.color;
        ctx.beginPath();
        ctx.roundRect(obj.x, TRAFFIC_ROWS[i] * CELL_H + 3, obj.width, CELL_H - 6, 4);
        ctx.fill();
        // Headlights
        ctx.fillStyle = "rgba(255,255,200,0.7)";
        const front = obj.speed > 0 ? obj.x + obj.width - 4 : obj.x + 2;
        ctx.fillRect(front, TRAFFIC_ROWS[i] * CELL_H + CELL_H * 0.25, 3, 4);
        ctx.fillRect(front, TRAFFIC_ROWS[i] * CELL_H + CELL_H * 0.6, 3, 4);
      }
    }

    // Frog
    if (!over || endText === "YOU WIN!") {
      const fx = frogX + 2;
      const fy = frogRow * CELL_H + 2;
      const fw = CELL_W - 4;
      const fh = CELL_H - 4;

      // Body
      ctx.fillStyle = "#4ADE80";
      ctx.beginPath();
      ctx.roundRect(fx, fy, fw, fh, 4);
      ctx.fill();

      // Eyes
      ctx.fillStyle = "#166534";
      const eyeR = fw * 0.12;
      ctx.beginPath();
      ctx.arc(fx + fw * 0.3, fy + fh * 0.3, eyeR, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(fx + fw * 0.7, fy + fh * 0.3, eyeR, 0, Math.PI * 2);
      ctx.fill();
    }

    // Score
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = `bold ${Math.round(H * 0.04)}px system-ui, sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${score}`, 12, H - 10);

    // Lives
    for (let i = 0; i < lives; i++) {
      ctx.fillStyle = "#4ADE80";
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
