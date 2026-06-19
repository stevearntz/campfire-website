"use client";

import { useState } from "react";

/* ──────────────────────────────────────────────────────────
   SOW CSS — embedded via <style> so it doesn't leak into
   the rest of the site. All selectors are scoped under .sow-doc.
   ────────────────────────────────────────────────────────── */
const sowStyles = `
  /* ── tokens ── */
  .sow-doc {
    --c-purple-700: #5B34AB;
    --c-purple-600: #6E3FCC;
    --c-purple-300: #9D88ED;
    --c-purple-100: #E1D8F3;
    --c-purple-050: #F8F5FC;
    --c-pink-400:   #E055CB;
    --c-pink-300:   #EE80DD;
    --c-pink-100:   #FBE0E9;
    --c-indigo-1100:#1C1334;
    --c-indigo-900: #262F56;
    --c-indigo-700: #1E2A4A;
    --c-warm-300:   #FFC28A;
    --c-card:       #F7F6F7;
    --c-gray-100:   #F3F4F6;
    --c-gray-200:   #E5E7EB;
    --c-gray-300:   #D1D5DB;
    --c-gray-400:   #9CA3AF;
    --c-gray-500:   #636B7C;
    --c-gray-700:   #374151;
    --c-gray-900:   #111827;

    --accent:        var(--c-purple-600);
    --accent-soft:   var(--c-purple-050);
    --accent-tint:   var(--c-purple-100);
    --accent-strong: var(--c-purple-700);
    --accent-hi:     var(--c-purple-300);

    /* generous density */
    --pad-page:   1.0in;
    --gap-block:  36px;
    --gap-section:60px;
    --gap-line:   10px;

    --font-sans: var(--font-spartan), "League Spartan", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;

    font-family: var(--font-sans);
    color: var(--c-gray-700);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    padding: 32px 16px 80px;
  }

  .sow-doc *, .sow-doc *::before, .sow-doc *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* page chassis — Letter @ 96dpi */
  .sow-doc .page {
    position: relative;
    width: 8.5in;
    min-height: 11in;
    margin: 0 auto 24px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(20, 18, 50, 0.05), 0 18px 40px -20px rgba(20, 18, 50, 0.18);
    padding: var(--pad-page);
    overflow: hidden;
    color: var(--c-gray-700);
    font-size: 11pt;
    line-height: 1.55;
  }
  .sow-doc .page.dark {
    background: var(--c-indigo-1100);
    color: rgba(255,255,255,0.86);
    padding: 0;
  }

  /* page footer */
  .sow-doc .page-foot {
    position: absolute;
    left: var(--pad-page);
    right: var(--pad-page);
    bottom: 0.45in;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--c-gray-400);
    font-weight: 600;
  }
  .sow-doc .page-foot .logo-mark { height: 18px; opacity: 0.7; }
  .sow-doc .page.dark .page-foot { color: rgba(255,255,255,0.5); }
  .sow-doc .page.dark .page-foot .logo-mark { filter: brightness(0) invert(1); opacity: 0.9; }

  /* ── COVER ── */
  .sow-doc .cover-inner {
    position: relative;
    height: 11in;
    padding: 0.85in 0.85in 0.6in;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
  }
  .sow-doc .cover-bg {
    position: absolute; inset: 0;
    background: url("/sow-assets/purple-topo.webp") center / cover no-repeat;
    opacity: 0.65;
    z-index: 0;
  }
  .sow-doc .cover-tint {
    position: absolute; inset: 0;
    background: linear-gradient(150deg, rgba(28,19,52,0.92) 0%, rgba(58,2,168,0.65) 55%, rgba(110,63,204,0.5) 100%);
    z-index: 0;
  }
  .sow-doc .cover-top {
    position: relative; z-index: 1;
    display: flex; justify-content: space-between; align-items: flex-start;
  }
  .sow-doc .cover-top .logo { height: 30px; filter: brightness(0) invert(1); }
  .sow-doc .cover-top .doc-id {
    font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255,255,255,0.6); font-weight: 600; text-align: right; line-height: 1.6;
  }
  .sow-doc .cover-main { position: relative; z-index: 1; max-width: 6.6in; }
  .sow-doc .cover-eyebrow {
    font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--c-warm-300); font-weight: 700; margin-bottom: 28px;
  }
  .sow-doc .cover-title {
    font-size: 56pt; line-height: 1.04; letter-spacing: -0.02em;
    font-weight: 800; color: #fff;
  }
  .sow-doc .cover-title em { font-style: normal; color: var(--c-purple-300); }
  .sow-doc .cover-sub {
    margin-top: 26px; font-size: 15pt; line-height: 1.4;
    color: rgba(255,255,255,0.85); font-weight: 500; max-width: 5.6in;
  }
  .sow-doc .cover-parties {
    position: relative; z-index: 1;
    display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
    padding-top: 28px;
    border-top: 1px solid rgba(255,255,255,0.18);
  }
  .sow-doc .cover-parties .col { color: rgba(255,255,255,0.9); }
  .sow-doc .cover-parties .label-tiny {
    font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(255,255,255,0.55); font-weight: 700; margin-bottom: 10px;
  }
  .sow-doc .cover-parties .name { font-size: 14pt; font-weight: 700; color: #fff; letter-spacing: -0.01em; }
  .sow-doc .cover-parties .detail { margin-top: 4px; font-size: 10pt; color: rgba(255,255,255,0.72); line-height: 1.5; }
  .sow-doc .cover-illo {
    position: absolute; right: 0.85in; bottom: 2.6in;
    width: 1.6in; height: 1.6in; z-index: 1; opacity: 0.94;
  }

  /* ── SECTION CHROME ── */
  .sow-doc .section-header { margin-bottom: var(--gap-block); }
  .sow-doc .section-num {
    display: inline-block;
    font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase;
    color: var(--accent); font-weight: 700; margin-bottom: 14px;
  }
  .sow-doc .section-num::before {
    content: ""; display: inline-block; width: 22px; height: 1.5px;
    background: var(--accent); vertical-align: middle; margin-right: 10px;
    transform: translateY(-2px);
  }
  .sow-doc .section-title {
    font-size: 26pt; line-height: 1.12; letter-spacing: -0.018em;
    font-weight: 800; color: var(--c-indigo-700); max-width: 6.2in;
  }
  .sow-doc .section-title em { font-style: normal; color: var(--accent); }
  .sow-doc .section-lead {
    margin-top: 14px; font-size: 12pt; line-height: 1.55;
    color: var(--c-gray-500); max-width: 5.6in; font-weight: 400;
  }

  /* prose */
  .sow-doc p { font-size: 11pt; line-height: 1.6; color: var(--c-gray-700); }
  .sow-doc p + p { margin-top: var(--gap-line); }
  .sow-doc strong { color: var(--c-indigo-700); font-weight: 700; }

  .sow-doc .lede {
    font-size: 13pt; line-height: 1.5; color: var(--c-indigo-700);
    font-weight: 500; max-width: 6.2in; margin-bottom: var(--gap-block);
  }
  .sow-doc .lede em { font-style: normal; color: var(--accent); }
  .sow-doc .block { margin-top: var(--gap-block); }

  /* glance grid */
  .sow-doc .glance {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;
    border-top: 1.5px solid var(--c-indigo-700);
    border-bottom: 1.5px solid var(--c-indigo-700);
    margin-top: var(--gap-block);
  }
  .sow-doc .glance .cell {
    padding: 18px 22px 18px 0;
    border-right: 1px solid var(--c-gray-200);
  }
  .sow-doc .glance .cell:nth-child(3n) { border-right: 0; padding-right: 0; }
  .sow-doc .glance .cell:nth-child(n+4) { padding-top: 18px; border-top: 1px solid var(--c-gray-200); }
  .sow-doc .glance .cell:nth-child(-n+3) { padding-top: 22px; }
  .sow-doc .glance .cell:nth-child(n+4) { padding-left: 22px; }
  .sow-doc .glance .cell:nth-child(3n+1) { padding-left: 0; }
  .sow-doc .glance-k {
    font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--c-gray-500); font-weight: 700; margin-bottom: 6px;
  }
  .sow-doc .glance-v {
    font-size: 13pt; font-weight: 700; color: var(--c-indigo-700);
    letter-spacing: -0.01em; line-height: 1.25;
  }
  .sow-doc .glance-v small {
    font-size: 10pt; font-weight: 500; color: var(--c-gray-500);
    display: block; margin-top: 3px; letter-spacing: 0;
  }

  /* scope items */
  .sow-doc .scope-list { margin-top: var(--gap-block); display: flex; flex-direction: column; gap: 22px; }
  .sow-doc .scope-item {
    display: grid; grid-template-columns: 56px 1fr; gap: 22px;
    padding-bottom: 22px; border-bottom: 1px solid var(--c-gray-200);
  }
  .sow-doc .scope-item:last-child { border-bottom: 0; padding-bottom: 0; }
  .sow-doc .scope-num-big {
    font-size: 28pt; font-weight: 800; color: var(--accent);
    line-height: 0.95; letter-spacing: -0.04em;
    font-variant-numeric: tabular-nums;
  }
  .sow-doc .scope-h {
    font-size: 14pt; font-weight: 700; color: var(--c-indigo-700);
    letter-spacing: -0.01em; margin-bottom: 6px;
  }
  .sow-doc .scope-h em { font-style: normal; color: var(--accent); }
  .sow-doc .scope-p { font-size: 10.5pt; line-height: 1.6; color: var(--c-gray-700); max-width: 5.4in; }

  /* deliverables table */
  .sow-doc .delv {
    margin-top: var(--gap-block); width: 100%;
    border-collapse: collapse; font-size: 10.5pt;
  }
  .sow-doc .delv thead th {
    font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--c-gray-500); font-weight: 700;
    text-align: left; padding: 0 12px 10px 0;
    border-bottom: 1.5px solid var(--c-indigo-700);
  }
  .sow-doc .delv tbody td {
    padding: 14px 12px 14px 0;
    border-bottom: 1px solid var(--c-gray-200);
    vertical-align: top;
  }
  .sow-doc .delv tbody tr:last-child td { border-bottom: 1.5px solid var(--c-indigo-700); }
  .sow-doc .delv td.delv-name { color: var(--c-indigo-700); font-weight: 700; width: 2.4in; }
  .sow-doc .delv td.delv-format { color: var(--c-gray-500); width: 1.4in; font-weight: 500; }
  .sow-doc .delv td.delv-desc { color: var(--c-gray-700); }

  /* timeline / gantt */
  .sow-doc .timeline-wrap { margin-top: var(--gap-block); }
  .sow-doc .gantt {
    width: 100%; border: 1px solid var(--c-gray-200);
    border-radius: 8px; overflow: hidden; background: #fff;
  }
  .sow-doc .gantt-head {
    display: grid; grid-template-columns: 1.6in 1fr;
    background: var(--accent-soft);
    border-bottom: 1px solid var(--c-gray-200);
  }
  .sow-doc .gantt-head .h-l {
    padding: 10px 14px;
    font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--c-indigo-700); font-weight: 700;
    border-right: 1px solid var(--c-gray-200);
  }
  .sow-doc .gantt-head .h-r {
    padding: 10px 0;
    display: grid; grid-template-columns: repeat(5, 1fr);
  }
  .sow-doc .gantt-head .h-r span {
    font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--c-gray-500); font-weight: 700; text-align: center;
    border-left: 1px solid var(--c-gray-200);
  }
  .sow-doc .gantt-head .h-r span:first-child { border-left: 0; }
  .sow-doc .gantt-row {
    display: grid; grid-template-columns: 1.6in 1fr;
    border-bottom: 1px solid var(--c-gray-100);
  }
  .sow-doc .gantt-row:last-child { border-bottom: 0; }
  .sow-doc .gantt-row .r-l {
    padding: 14px 14px;
    border-right: 1px solid var(--c-gray-200);
  }
  .sow-doc .gantt-row .r-l b {
    display: block; font-size: 11pt; color: var(--c-indigo-700);
    font-weight: 700; letter-spacing: -0.01em;
  }
  .sow-doc .gantt-row .r-l small {
    display: block; font-size: 9pt; color: var(--c-gray-500);
    margin-top: 3px; font-weight: 500;
  }
  .sow-doc .gantt-row .r-r {
    position: relative; padding: 14px 0;
    background: repeating-linear-gradient(to right,
      transparent 0,
      transparent calc(100% / 5 - 1px),
      var(--c-gray-100) calc(100% / 5 - 1px),
      var(--c-gray-100) calc(100% / 5));
  }
  .sow-doc .gantt-bar {
    position: absolute; top: 50%; transform: translateY(-50%);
    height: 18px; background: var(--accent);
    border-radius: 4px;
    box-shadow: inset 0 -1px 0 rgba(0,0,0,0.12);
  }
  .sow-doc .gantt-bar.lite {
    background: var(--accent-tint); border: 1px solid var(--accent);
  }
  .sow-doc .gantt-bar .milestone {
    position: absolute; top: 50%; transform: translate(-50%, -50%);
    width: 10px; height: 10px;
    background: var(--c-warm-300);
    border: 1.5px solid var(--c-indigo-1100);
    border-radius: 50%;
  }
  .sow-doc .milestone-row {
    margin-top: 14px;
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 12px 24px;
  }
  .sow-doc .milestone-row .ms {
    display: grid; grid-template-columns: 14px 1fr; gap: 10px;
    font-size: 9.5pt; color: var(--c-gray-700); line-height: 1.4;
  }
  .sow-doc .milestone-row .ms-dot {
    width: 10px; height: 10px;
    background: var(--c-warm-300); border: 1.5px solid var(--c-indigo-1100);
    border-radius: 50%; margin-top: 4px;
  }
  .sow-doc .milestone-row .ms b {
    display: block; color: var(--c-indigo-700); font-weight: 700; font-size: 10pt;
  }

  /* pricing */
  .sow-doc .price-list { margin-top: var(--gap-block); }
  .sow-doc .price-list .row {
    display: grid; grid-template-columns: 1fr auto;
    padding: 16px 0; border-bottom: 1px solid var(--c-gray-200);
    align-items: baseline; gap: 18px;
  }
  .sow-doc .price-list .row:first-child { border-top: 1.5px solid var(--c-indigo-700); }
  .sow-doc .price-list .row .h {
    font-size: 12pt; font-weight: 700; color: var(--c-indigo-700); letter-spacing: -0.01em;
  }
  .sow-doc .price-list .row .desc {
    font-size: 10pt; color: var(--c-gray-500); margin-top: 3px; max-width: 5in; line-height: 1.5;
  }
  .sow-doc .price-list .row .rhs {
    font-size: 14pt; font-weight: 700; color: var(--c-indigo-700);
    font-variant-numeric: tabular-nums; letter-spacing: -0.01em; white-space: nowrap;
  }
  .sow-doc .price-list .row .rhs small {
    display: block; font-size: 9pt; font-weight: 500; color: var(--c-gray-500);
    margin-top: 2px; letter-spacing: 0; text-align: right;
  }
  .sow-doc .price-total {
    display: grid; grid-template-columns: 1fr auto;
    padding: 22px 0 0; border-top: 2px solid var(--c-indigo-700);
    margin-top: -1px; align-items: baseline; gap: 18px;
  }
  .sow-doc .price-total .label-l {
    font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase;
    color: var(--c-gray-500); font-weight: 700;
  }
  .sow-doc .price-total .val {
    font-size: 24pt; font-weight: 800; color: var(--c-indigo-700);
    letter-spacing: -0.02em; line-height: 1; font-variant-numeric: tabular-nums;
  }
  .sow-doc .price-total .val em { font-style: normal; color: var(--accent); }

  /* callout */
  .sow-doc .callout {
    margin-top: var(--gap-block);
    border-left: 3px solid var(--accent);
    background: var(--accent-soft);
    padding: 16px 20px;
    border-radius: 0 8px 8px 0;
  }
  .sow-doc .callout p { font-size: 10.5pt; color: var(--c-indigo-700); line-height: 1.55; }
  .sow-doc .callout .k {
    font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--accent); font-weight: 700; margin-bottom: 6px;
  }

  /* signatures */
  .sow-doc .sig-block {
    margin-top: var(--gap-section);
    display: grid; grid-template-columns: 1fr 1fr; gap: 36px;
  }
  .sow-doc .sig-col .label-tiny {
    font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--c-gray-500); font-weight: 700; margin-bottom: 14px;
  }
  .sow-doc .sig-col .company {
    font-size: 13pt; font-weight: 800; color: var(--c-indigo-700);
    letter-spacing: -0.01em;
  }
  .sow-doc .sig-col .who {
    margin-top: 4px; font-size: 10pt; color: var(--c-gray-500); line-height: 1.4;
  }
  .sow-doc .sig-line {
    margin-top: 64px;
    border-bottom: 1.5px solid var(--c-indigo-700);
    padding-bottom: 6px; min-height: 36px;
    font-family: var(--font-serif, "DM Serif Display"), Georgia, serif;
    font-size: 22pt; color: var(--c-gray-400); font-style: italic;
  }
  .sow-doc .sig-meta {
    margin-top: 10px;
    display: grid; grid-template-columns: 1.4fr 1fr; gap: 18px;
  }
  .sow-doc .sig-meta .field {
    font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--c-gray-500); font-weight: 700;
  }
  .sow-doc .sig-meta .underline {
    border-bottom: 1px solid var(--c-gray-300);
    padding: 6px 0 8px; min-height: 32px;
  }

  /* inline illustration */
  .sow-doc .inline-illo {
    width: 72px; height: 72px;
    float: right; margin: 0 0 16px 16px; opacity: 0.94;
  }

  /* ── responsive ── */
  @media (max-width: 900px) {
    .sow-doc .page {
      width: 100%;
      min-height: auto;
      padding: 40px 24px 60px;
    }
    .sow-doc .cover-inner {
      height: auto;
      min-height: 100vh;
      padding: 40px 24px 40px;
    }
    .sow-doc .cover-title { font-size: 32pt; }
    .sow-doc .cover-sub { font-size: 12pt; }
    .sow-doc .section-title { font-size: 20pt; }
    .sow-doc .cover-parties { grid-template-columns: 1fr; gap: 20px; }
    .sow-doc .sig-block { grid-template-columns: 1fr; }
    .sow-doc .glance { grid-template-columns: 1fr 1fr; }
    .sow-doc .gantt-head,
    .sow-doc .gantt-row { grid-template-columns: 1.2in 1fr; }
    .sow-doc .milestone-row { grid-template-columns: 1fr; }
    .sow-doc .cover-illo { display: none; }
    .sow-doc .page-foot { font-size: 8px; }
    .sow-doc .price-total .val { font-size: 18pt; }
  }
`;

/* ──────────────────────────────────────────────────────────
   PASSWORD GATE
   ────────────────────────────────────────────────────────── */
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === "ypocampfire") {
      onUnlock();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1C1334",
        fontFamily: "var(--font-spartan), 'League Spartan', sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "48px 40px",
          maxWidth: 400,
          width: "100%",
          margin: "0 16px",
          boxShadow: "0 24px 60px -20px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sow-assets/campfire-logo.webp"
          alt="Campfire"
          style={{ height: 28, marginBottom: 32 }}
        />
        <h1
          style={{
            fontSize: "20pt",
            fontWeight: 800,
            color: "#1E2A4A",
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          Statement of Work
        </h1>
        <p
          style={{
            fontSize: "11pt",
            color: "#636B7C",
            marginBottom: 28,
            lineHeight: 1.5,
          }}
        >
          Enter the password to view this document.
        </p>
        <input
          type="password"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          autoFocus
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "12pt",
            border: `1.5px solid ${error ? "#E055CB" : "#E5E7EB"}`,
            borderRadius: 8,
            outline: "none",
            fontFamily: "inherit",
            marginBottom: error ? 8 : 16,
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#6E3FCC";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? "#E055CB" : "#E5E7EB";
          }}
        />
        {error && (
          <p
            style={{
              fontSize: "10pt",
              color: "#E055CB",
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            Incorrect password. Please try again.
          </p>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "12pt",
            fontWeight: 700,
            color: "#fff",
            background: "#6E3FCC",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontFamily: "inherit",
            letterSpacing: "-0.01em",
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.background = "#5B34AB";
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.background = "#6E3FCC";
          }}
        >
          View Document
        </button>
      </form>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   PAGE FOOTER (reusable)
   ────────────────────────────────────────────────────────── */
function PageFoot({ num }: { num: number }) {
  return (
    <footer className="page-foot">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="logo-mark"
        src="/sow-assets/campfire-logo.webp"
        alt="Campfire"
      />
      <span>YPO Marcoms &times; Campfire &middot; SOW-2026-019</span>
      <span>Page {num} / 7</span>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────
   SOW DOCUMENT (all 7 pages)
   ────────────────────────────────────────────────────────── */
function SowDocument() {
  return (
    <div className="sow-doc" style={{ background: "#E9E6EE" }}>
      <style>{sowStyles}</style>

      {/* ═══ PAGE 1 - COVER ═══ */}
      <section className="page dark">
        <div className="cover-inner">
          <div className="cover-bg" aria-hidden="true" />
          <div className="cover-tint" aria-hidden="true" />

          <header className="cover-top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="logo"
              src="/sow-assets/campfire-logo.webp"
              alt="Campfire"
            />
            <div className="doc-id">
              Statement of Work
              <br />
              No. SOW-2026-019
              <br />
              Effective May 18, 2026
            </div>
          </header>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="cover-illo"
            src="/sow-assets/phoenix.webp"
            alt=""
            aria-hidden="true"
          />

          <div className="cover-main">
            <p className="cover-eyebrow">Statement of Work</p>
            <h1 className="cover-title">
              Turning Chicago
              <br />
              into <em>a habit.</em>
            </h1>
            <p className="cover-sub">
              A follow-up engagement to convert the YPO Marcoms retreat into a
              behavior framework, a custom assessment, and three virtual sessions
              &mdash; in time for the new fiscal year.
            </p>
          </div>

          <div className="cover-parties">
            <div className="col">
              <p className="label-tiny">Client</p>
              <p className="name">YPO, Inc. &mdash; Marcoms</p>
              <p className="detail">
                Attn: Sarah McBrearty &amp; La Trease Shaw
                <br />
                600 East Las Colinas Blvd., Suite 1200
                <br />
                Irving, TX 75039
              </p>
            </div>
            <div className="col">
              <p className="label-tiny">Provider</p>
              <p className="name">Campfire, Inc.</p>
              <p className="detail">
                Attn: Steve Arntz, CEO
                <br />
                2701 N Thanksgiving Way
                <br />
                Lehi, UT 84043
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PAGE 2 - OVERVIEW + AT A GLANCE ═══ */}
      <section className="page">
        <header className="section-header">
          <span className="section-num">01 &middot; Engagement at a glance</span>
          <h2 className="section-title">
            Building on <em>real momentum.</em>
          </h2>
          <p className="section-lead">
            This Statement of Work (&ldquo;SOW&rdquo;) governs the post-retreat
            engagement between YPO, Inc. (&ldquo;Client&rdquo;) and Campfire, Inc.
            (&ldquo;Campfire&rdquo;). It builds on the leadership work delivered at
            the Chicago retreat and carries it into the new fiscal year &mdash;
            through a refined behavior framework, a custom assessment, three
            virtual sessions, and advisory support.
          </p>
        </header>

        <div className="glance">
          <div className="cell">
            <p className="glance-k">Phase</p>
            <p className="glance-v">
              Post-retreat follow-up
              <small>Building on Chicago, May 2026</small>
            </p>
          </div>
          <div className="cell">
            <p className="glance-k">Audience</p>
            <p className="glance-v">
              Marcoms leadership
              <small>YPO Marketing &amp; Communications team</small>
            </p>
          </div>
          <div className="cell">
            <p className="glance-k">Format</p>
            <p className="glance-v">
              Virtual + advisory
              <small>Hosted on the Campfire platform</small>
            </p>
          </div>
          <div className="cell">
            <p className="glance-k">Sessions</p>
            <p className="glance-v">
              3 virtual workshops
              <small>60&ndash;90 minutes each</small>
            </p>
          </div>
          <div className="cell">
            <p className="glance-k">Investment</p>
            <p className="glance-v">
              $14,800
              <small>Fixed-fee, after concession</small>
            </p>
          </div>
          <div className="cell">
            <p className="glance-k">Facilitator &amp; contact</p>
            <p className="glance-v">
              Steve Arntz
              <small>steve@getcampfire.com</small>
            </p>
          </div>
        </div>

        <div className="block">
          <p className="lede">
            <em>We start with what you already have.</em> Chicago surfaced twelve
            leadership behaviors that matter to how Marcoms shows up for itself,
            for YPO, and for its members. The work ahead is making those behaviors
            observable, practiced, and shared &mdash; so they show up in next
            year&rsquo;s planning cycle, not just the next retreat.
          </p>

          <p>
            Everything that follows is in service of one outcome: by the time the
            new fiscal year begins, Marcoms leaders should have a shared behavioral
            vocabulary, a way to calibrate against it together, and a concrete way
            to track their own growth.
          </p>
        </div>

        <PageFoot num={2} />
      </section>

      {/* ═══ PAGE 3 - SCOPE 01-03 ═══ */}
      <section className="page">
        <header className="section-header">
          <span className="section-num">02 &middot; Scope of services</span>
          <h2 className="section-title">
            Five workstreams, <em>one arc.</em>
          </h2>
          <p className="section-lead">
            The five workstreams below describe the full arc of the engagement,
            including the Chicago retreat already delivered. Each is led by Steve
            Arntz on Campfire&rsquo;s side. Anything not listed here is out of
            scope unless added by a written Change Order &mdash; see &sect;06 for
            items explicitly excluded.
          </p>
        </header>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="inline-illo"
          src="/sow-assets/kite.webp"
          alt=""
          aria-hidden="true"
        />

        <div className="scope-list">
          <div className="scope-item">
            <span className="scope-num-big">01</span>
            <div>
              <h3 className="scope-h">
                Chicago leadership retreat <em>(delivered).</em>
              </h3>
              <p className="scope-p">
                Facilitated leadership retreat for the Marcoms team in Chicago,
                focused on strategic alignment, team dynamics, leadership
                behaviors, accountability, communication and collaboration, and
                observable behaviors and execution. Includes retreat design and
                preparation, stakeholder conversations and pre-work, on-site
                facilitation by Steve Arntz, custom retreat materials, strategic
                alignment framework development, and post-retreat synthesis and
                recommendations. Travel and related expenses are billed as a
                separate line item in &sect;05.
              </p>
            </div>
          </div>

          <div className="scope-item">
            <span className="scope-num-big">02</span>
            <div>
              <h3 className="scope-h">
                Leadership behavior <em>framework refinement.</em>
              </h3>
              <p className="scope-p">
                Campfire will refine the twelve leadership behaviors surfaced in
                Chicago into a clear, observable, and measurable framework:
                calibrated behavioral language, non-interpretive assessment
                statements, and finalized behavior definitions suitable for team
                development and future performance alignment. Delivered as the
                foundation for workstreams 03 and 04.
              </p>
            </div>
          </div>

          <div className="scope-item">
            <span className="scope-num-big">03</span>
            <div>
              <h3 className="scope-h">
                Custom <em>behavioral assessment tool.</em>
              </h3>
              <p className="scope-p">
                A lightweight, custom-built assessment experience for the Marcoms
                leadership team. Includes twelve behavior-based questions on a
                6-point Likert scale (no neutral option), self-assessment and peer
                feedback functionality, an individualized results experience, and
                guidance for selecting development priorities. Framed for
                development, ownership, and calibration &mdash; not formal HR
                evaluation or performance management in this initial rollout.
              </p>
            </div>
          </div>
        </div>

        <PageFoot num={3} />
      </section>

      {/* ═══ PAGE 4 - SCOPE 04-05 + DELIVERABLES ═══ */}
      <section className="page">
        <div className="scope-list" style={{ marginTop: 0 }}>
          <div className="scope-item">
            <span className="scope-num-big">04</span>
            <div>
              <h3 className="scope-h">
                Virtual leadership <em>development sessions.</em>
              </h3>
              <p className="scope-p">
                Three (3) 60&ndash;90 minute virtual sessions facilitated by Steve
                Arntz on the Campfire platform. Potential topics include: owning
                your own behavioral development; strategic alignment &amp;
                execution; peer feedback &amp; accountability; behavioral
                calibration; and team communication &amp; leadership dynamics.
                Includes session design and facilitation; final topic sequence is
                locked after Session 1.
              </p>
            </div>
          </div>

          <div className="scope-item">
            <span className="scope-num-big">05</span>
            <div>
              <h3 className="scope-h">
                Leadership rollout &amp; <em>advisory support.</em>
              </h3>
              <p className="scope-p">
                Strategic advisory through the fiscal-year planning window to help
                Marcoms integrate the behavioral framework into its rollout and
                communication process. Includes rollout guidance, messaging
                support, leadership alignment conversations, feedback on
                implementation approach, and working sessions with Sarah McBrearty,
                La Trease Shaw, and other key stakeholders as needed.
              </p>
            </div>
          </div>
        </div>

        <header className="section-header" style={{ marginTop: "var(--gap-section)" }}>
          <span className="section-num">03 &middot; Deliverables</span>
          <h2 className="section-title">
            What you&rsquo;ll <em>have in hand.</em>
          </h2>
          <p className="section-lead">
            Each deliverable below is considered complete on the date listed in
            &sect;04. Acceptance is deemed to have occurred ten (10) business days
            after delivery unless Client provides written notice of specific
            concerns.
          </p>
        </header>

        <table className="delv">
          <thead>
            <tr>
              <th>Deliverable</th>
              <th>Format</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="delv-name">Chicago retreat synthesis</td>
              <td className="delv-format">Working doc + recommendations</td>
              <td className="delv-desc">
                Post-retreat synthesis of themes, behaviors, and recommendations
                &mdash; delivered following the Chicago retreat.
              </td>
            </tr>
            <tr>
              <td className="delv-name">12-behavior framework</td>
              <td className="delv-format">Finalized definitions</td>
              <td className="delv-desc">
                Refined definitions and calibrated language for the twelve
                leadership behaviors, ready for team use.
              </td>
            </tr>
            <tr>
              <td className="delv-name">Behavioral assessment statements</td>
              <td className="delv-format">Question set + scale</td>
              <td className="delv-desc">
                Twelve observable, non-interpretive assessment statements on a
                6-point Likert scale, with no neutral option.
              </td>
            </tr>
            <tr>
              <td className="delv-name">Custom assessment tool</td>
              <td className="delv-format">Hosted experience</td>
              <td className="delv-desc">
                Self-assessment and peer-feedback experience with individualized
                results and development-priority guidance.
              </td>
            </tr>
            <tr>
              <td className="delv-name">Three virtual sessions</td>
              <td className="delv-format">Live, on the Campfire platform</td>
              <td className="delv-desc">
                Session design and facilitation for three 60&ndash;90 minute
                leadership sessions, plus session recordings and follow-up notes.
              </td>
            </tr>
            <tr>
              <td className="delv-name">Advisory &amp; rollout materials</td>
              <td className="delv-format">
                Working sessions + light deliverables
              </td>
              <td className="delv-desc">
                Messaging support, rollout guidance, and short materials produced
                during stakeholder working sessions.
              </td>
            </tr>
          </tbody>
        </table>

        <PageFoot num={4} />
      </section>

      {/* ═══ PAGE 5 - TIMELINE + OUT OF SCOPE ═══ */}
      <section className="page">
        <header className="section-header">
          <span className="section-num">04 &middot; Timeline</span>
          <h2 className="section-title">
            Paced to <em>fiscal-year planning.</em>
          </h2>
          <p className="section-lead">
            Target timing below. Specific session dates and stakeholder
            availability are confirmed collaboratively between Sarah McBrearty, La
            Trease Shaw, and Steve Arntz. The framework and assessment are
            sequenced to land before the June leadership rollout.
          </p>
        </header>

        <div className="timeline-wrap">
          <div className="gantt">
            <div className="gantt-head">
              <div className="h-l">Phase</div>
              <div className="h-r">
                <span>Mar</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
              </div>
            </div>

            <div className="gantt-row">
              <div className="r-l">
                <b>Chicago retreat</b>
                <small>Delivered &middot; March 2026</small>
              </div>
              <div className="r-r">
                <div
                  className="gantt-bar"
                  style={{
                    left: "0%",
                    width: "calc(100% / 5 - 4px)",
                    opacity: 0.55,
                  }}
                />
              </div>
            </div>

            <div className="gantt-row">
              <div className="r-l">
                <b>Framework refinement</b>
                <small>12-behavior definitions</small>
              </div>
              <div className="r-r">
                <div
                  className="gantt-bar lite"
                  style={{
                    left: "calc(100% / 5)",
                    width: "calc(100% / 5 * 0.7)",
                  }}
                />
              </div>
            </div>

            <div className="gantt-row">
              <div className="r-l">
                <b>Assessment build</b>
                <small>Custom tool + statements</small>
              </div>
              <div className="r-r">
                <div
                  className="gantt-bar"
                  style={{
                    left: "calc(100% / 5 * 1.3)",
                    width: "calc(100% / 5 * 0.9)",
                  }}
                >
                  <span className="milestone" style={{ right: 0 }} />
                </div>
              </div>
            </div>

            <div className="gantt-row">
              <div className="r-l">
                <b>Virtual sessions</b>
                <small>3 sessions, biweekly</small>
              </div>
              <div className="r-r">
                <div
                  className="gantt-bar"
                  style={{
                    left: "calc(100% / 5 * 2.1)",
                    width: "calc(100% / 5 * 1.6)",
                  }}
                />
              </div>
            </div>

            <div className="gantt-row">
              <div className="r-l">
                <b>Rollout &amp; advisory</b>
                <small>Through fiscal-year planning</small>
              </div>
              <div className="r-r">
                <div
                  className="gantt-bar lite"
                  style={{
                    left: "calc(100% / 5 * 2)",
                    width: "calc(100% / 5 * 2.9)",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="milestone-row">
            <div className="ms">
              <div className="ms-dot" />
              <div>
                <b>M1 &middot; Framework finalized</b>
                Prior to June rollout &mdash; defines behavior set used in
                assessment.
              </div>
            </div>
            <div className="ms">
              <div className="ms-dot" />
              <div>
                <b>M2 &middot; Assessment live</b>
                Late May / early June &mdash; before first virtual session.
              </div>
            </div>
            <div className="ms">
              <div className="ms-dot" />
              <div>
                <b>M3 &middot; Session 1</b>
                Target: week of June 8, 2026.
              </div>
            </div>
            <div className="ms">
              <div className="ms-dot" />
              <div>
                <b>M4 &middot; Engagement wrap</b>
                Sessions 2 &amp; 3 plus rollout support scheduled collaboratively.
              </div>
            </div>
          </div>
        </div>

        <header
          className="section-header"
          style={{ marginTop: "var(--gap-section)" }}
        >
          <span className="section-num">06 &middot; Out of scope</span>
          <h2 className="section-title" style={{ fontSize: "18pt" }}>
            Explicitly <em>not included.</em>
          </h2>
        </header>
        <div className="callout">
          <p className="k">Out of scope &mdash; available separately</p>
          <p>
            January Puerto Rico facilitation; HR or Technology organization
            facilitation; Workday integration; enterprise software deployment;
            ongoing platform hosting or support beyond this engagement; formal
            performance management implementation; YPO member-facing programming.
            These may be scoped separately in a future SOW.
          </p>
        </div>

        <PageFoot num={5} />
      </section>

      {/* ═══ PAGE 6 - INVESTMENT ═══ */}
      <section className="page">
        <header className="section-header">
          <span className="section-num">
            05 &middot; Investment &amp; payment terms
          </span>
          <h2 className="section-title">
            A fixed-fee engagement &mdash; <em>plus a concession.</em>
          </h2>
          <p className="section-lead">
            Fees below are inclusive of Steve Arntz&rsquo;s facilitation, design
            and build work, hosted assessment, and use of the Campfire platform for
            the duration of the engagement. Retreat travel is itemized separately.
            Invoices are issued at milestones below; Net 30 from invoice date.
          </p>
        </header>

        <div className="price-list">
          <div className="row">
            <div className="lhs">
              <p className="h">Chicago leadership retreat facilitation</p>
              <p className="desc">
                Design, pre-work, on-site facilitation, and synthesis &mdash;
                delivered March 2026.
              </p>
            </div>
            <div className="rhs">
              $5,000<small>delivered</small>
            </div>
          </div>
          <div className="row">
            <div className="lhs">
              <p className="h">Retreat travel &amp; expenses</p>
              <p className="desc">
                Pass-through, billed at cost. Estimated; final invoiced amount
                reflects actuals.
              </p>
            </div>
            <div className="rhs">
              $1,000<small>estimate</small>
            </div>
          </div>
          <div className="row">
            <div className="lhs">
              <p className="h">Leadership behavior framework refinement</p>
              <p className="desc">
                Calibrated language and observable assessment statements for the
                twelve behaviors.
              </p>
            </div>
            <div className="rhs">
              $3,000<small>fixed</small>
            </div>
          </div>
          <div className="row">
            <div className="lhs">
              <p className="h">Custom behavioral assessment tool</p>
              <p className="desc">
                Hosted self- and peer-assessment experience with individualized
                results.
              </p>
            </div>
            <div className="rhs">
              $4,000<small>fixed</small>
            </div>
          </div>
          <div className="row">
            <div className="lhs">
              <p className="h">
                Three virtual leadership sessions{" "}
                <span
                  style={{
                    color: "var(--c-gray-500)",
                    fontWeight: 500,
                  }}
                >
                  &middot; 3 &times; $800
                </span>
              </p>
              <p className="desc">
                Session design and facilitation by Steve Arntz, on the Campfire
                platform.
              </p>
            </div>
            <div className="rhs">
              $2,400<small>fixed</small>
            </div>
          </div>
          <div className="row">
            <div className="lhs">
              <p className="h">Leadership rollout &amp; advisory support</p>
              <p className="desc">
                Working sessions and messaging support through the fiscal-year
                planning window.
              </p>
            </div>
            <div className="rhs">
              $1,900<small>fixed</small>
            </div>
          </div>
        </div>

        {/* Subtotal */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            padding: "16px 0 4px",
            alignItems: "baseline",
            gap: "18px",
            borderBottom: "1px solid var(--c-gray-200)",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "var(--c-gray-500)",
              fontWeight: 700,
            }}
          >
            Subtotal
          </div>
          <div
            style={{
              fontSize: "14pt",
              fontWeight: 700,
              color: "var(--c-indigo-700)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            $17,300
          </div>
        </div>

        {/* Concession */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            padding: "14px 0",
            alignItems: "baseline",
            gap: "18px",
            borderBottom: "1px solid var(--c-gray-200)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "11pt",
                fontWeight: 700,
                color: "var(--accent)",
                letterSpacing: "-0.01em",
              }}
            >
              Case study &amp; marketing collaboration concession
            </div>
            <div
              style={{
                fontSize: "9.5pt",
                color: "var(--c-gray-500)",
                marginTop: "3px",
                maxWidth: "5in",
                lineHeight: 1.5,
              }}
            >
              Applied in exchange for participation in a mutually agreed case study
              or marketing collaboration. See &sect;07.
            </div>
          </div>
          <div
            style={{
              fontSize: "14pt",
              fontWeight: 700,
              color: "var(--accent)",
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap" as const,
            }}
          >
            &minus;$2,500
          </div>
        </div>

        {/* Total */}
        <div className="price-total">
          <div className="label-l">Total investment</div>
          <div className="val">
            $<em>14,800</em>{" "}
            <span
              style={{
                fontSize: "10pt",
                color: "var(--c-gray-500)",
                fontWeight: 500,
                letterSpacing: 0,
              }}
            >
              USD, after concession
            </span>
          </div>
        </div>

        <div className="callout" style={{ marginTop: 28 }}>
          <p className="k">Payment terms</p>
          <p>
            Net 30 from invoice date. The retreat line items will be invoiced on
            signing; the framework, assessment, sessions, and advisory line items
            will be invoiced together upon completion of the assessment build. The
            concession is applied to the final invoice. Any over-cap travel actuals
            are invoiced separately.
          </p>
        </div>

        <PageFoot num={6} />
      </section>

      {/* ═══ PAGE 7 - COLLABORATION + SIGNATURES ═══ */}
      <section className="page">
        <header className="section-header">
          <span className="section-num">
            07 &middot; Collaboration &amp; case study
          </span>
          <h2 className="section-title">
            A small, mutual <em>story to tell.</em>
          </h2>
          <p className="section-lead">
            Campfire and YPO Marcoms may collaborate on a mutually beneficial case
            study, strategic alignment story, testimonial, or marketing
            collaboration highlighting the work completed together. The concession
            in &sect;05 is offered in exchange.
          </p>
        </header>

        <p>
          Potential collaboration may include use of approved quotes or feedback;
          participation in a written or video case study; collaborative
          storytelling around strategic alignment and leadership development; and
          permission to reference the engagement in future Campfire marketing
          materials.
        </p>
        <p>
          Any external use of YPO branding, participant feedback, or organizational
          references will require prior written approval from YPO leadership.
          Either party may decline a specific collaboration request without
          affecting the rest of this SOW.
        </p>

        {/* SIGNATURES */}
        <header
          className="section-header"
          style={{ marginTop: "var(--gap-section)" }}
        >
          <span className="section-num">08 &middot; Authorisation</span>
          <h2 className="section-title">
            Signed, with <em>warmth.</em>
          </h2>
          <p className="section-lead">
            By signing below, each party agrees to the terms set out in this
            Statement of Work. Counterparts and electronic signatures are valid and
            binding.
          </p>
        </header>

        <div className="sig-block">
          <div className="sig-col">
            <p className="label-tiny">For YPO, Inc.</p>
            <p className="company">YPO, Inc.</p>
            <p className="who">
              Sarah McBrearty
              <br />
              Marketing &amp; Communications, YPO
            </p>
            <div className="sig-line">&nbsp;</div>
            <div className="sig-meta">
              <div>
                <p className="field">Signature</p>
                <div className="underline">&nbsp;</div>
              </div>
              <div>
                <p className="field">Date</p>
                <div className="underline">&nbsp;</div>
              </div>
            </div>
          </div>

          <div className="sig-col">
            <p className="label-tiny">For Campfire, Inc.</p>
            <p className="company">Campfire, Inc.</p>
            <p className="who">
              Steve Arntz
              <br />
              Chief Executive Officer
            </p>
            <div className="sig-line">&nbsp;</div>
            <div className="sig-meta">
              <div>
                <p className="field">Signature</p>
                <div className="underline">&nbsp;</div>
              </div>
              <div>
                <p className="field">Date</p>
                <div className="underline">&nbsp;</div>
              </div>
            </div>
          </div>
        </div>

        <PageFoot num={7} />
      </section>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN EXPORT
   ────────────────────────────────────────────────────────── */
export default function YpoSowClient() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return <SowDocument />;
}
