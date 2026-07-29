"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "../../_components/Icon";
import { MODES } from "../../_data/course";

const SPINES = [
  "SCQA",
  "Minto pyramid",
  "Hero's journey",
  "What / So what / Now what",
];

export default function AddPresentation() {
  const router = useRouter();
  const [busy, setBusy] = useState<null | "own" | "case">(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState(MODES[0]);
  const [spine, setSpine] = useState(SPINES[0]);
  const [audience, setAudience] = useState("");
  const [duration, setDuration] = useState("");

  async function create(payload: Record<string, unknown>, kind: "own" | "case") {
    setError("");
    setBusy(kind);
    try {
      const res = await fetch("/api/presentations/presentation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(null);
    }
  }

  const fieldClass =
    "mt-[6px] w-full rounded-[10px] border border-cf-gray-200 px-[14px] py-[10px] text-[15px] text-cf-indigo-700 outline-none focus:border-cf-purple-400";
  const labelClass =
    "text-[11px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase";

  return (
    <div className="mx-auto max-w-[640px] px-8 py-12">
      <div className="text-center">
        <Icon name="slideshow" className="text-[40px] text-cf-purple-300" />
        <h1 className="mt-3 text-[28px] font-bold text-cf-indigo-700">
          Add your presentation
        </h1>
        <p className="mx-auto mt-2 max-w-[460px] text-[16px] leading-[1.6] text-cf-gray-500">
          Bring a real talk you have coming up — every module builds on this one
          deck. Rough is fine; you&apos;ll refine it as you go.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-cf-gray-100 bg-white p-7">
        <div>
          <label className={labelClass}>Working title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="The manager gap is costing us our best people"
            className={fieldClass}
          />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className={fieldClass}
            >
              {MODES.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Narrative spine</label>
            <select
              value={spine}
              onChange={(e) => setSpine(e.target.value)}
              className={fieldClass}
            >
              {SPINES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Audience</label>
            <input
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Leadership team"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Length (min)</label>
            <input
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value.replace(/[^0-9]/g, ""))
              }
              inputMode="numeric"
              placeholder="20"
              className={fieldClass}
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 text-[13px] text-cf-ladybug-600">{error}</div>
        )}

        <button
          type="button"
          disabled={busy !== null || title.trim() === ""}
          onClick={() =>
            create(
              {
                source: "own",
                title,
                mode,
                spine,
                audience,
                durationMin: duration ? Number(duration) : null,
              },
              "own",
            )
          }
          className="mt-6 w-full rounded-lg bg-cf-purple-600 px-5 py-[13px] text-[13px] font-bold tracking-[0.12em] text-white uppercase disabled:opacity-50"
        >
          {busy === "own" ? "Creating…" : "Create presentation"}
        </button>
      </div>

      <div className="mt-6 flex items-center gap-4 text-[13px] text-cf-gray-400">
        <div className="h-px flex-1 bg-cf-gray-200" />
        or
        <div className="h-px flex-1 bg-cf-gray-200" />
      </div>

      <button
        type="button"
        disabled={busy !== null}
        onClick={() => create({ source: "case_study" }, "case")}
        className="mt-6 w-full rounded-2xl border border-cf-gray-200 bg-white px-6 py-5 text-left transition-colors hover:border-cf-purple-300 disabled:opacity-50"
      >
        <div className="flex items-center gap-3">
          <Icon name="menu_book" className="text-[24px] text-cf-purple-600" />
          <div>
            <div className="text-[15px] font-bold text-cf-indigo-700">
              {busy === "case" ? "Loading the case study…" : "Use the case study"}
            </div>
            <div className="mt-[2px] text-[13px] text-cf-gray-500">
              Start from our worked example — an 8-slide deck asking for budget to
              fix a management gap.
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
