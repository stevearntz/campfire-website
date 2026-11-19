"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordGate() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!password.trim() || submitting) return;
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/ypo-tool/reports/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        setError(true);
        setSubmitting(false);
      }
    } catch {
      setError(true);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white flex items-center justify-center px-6">
      <div style={{ width: "100%", maxWidth: 400 }}>
        <p
          className="font-bold uppercase mb-4"
          style={{ fontSize: 11, letterSpacing: "0.14em", color: "#6E3FCC" }}
        >
          Activating Behaviors
        </p>
        <h1
          className="font-extrabold mb-2"
          style={{ fontSize: 30, lineHeight: 1.1, color: "#1E2A4A" }}
        >
          Team reports
        </h1>
        <p className="mb-7" style={{ fontSize: 15.5, color: "#636B7C", lineHeight: 1.55 }}>
          This dashboard is password protected. Enter the password to continue.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          autoFocus
          placeholder="Password"
          className="w-full outline-none mb-3"
          style={{
            height: 50,
            borderRadius: 12,
            background: "#fff",
            border: `1px solid ${error ? "#E0555B" : "#E7E3EE"}`,
            color: "#1E2A4A",
            fontSize: 16,
            padding: "0 16px",
          }}
        />
        {error && (
          <p className="mb-3" style={{ fontSize: 13.5, color: "#E0555B" }}>
            Incorrect password. Try again.
          </p>
        )}
        <button
          onClick={submit}
          disabled={submitting}
          className="w-full font-bold uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{
            height: 50,
            borderRadius: 12,
            background: "#6E3FCC",
            color: "#fff",
            fontSize: 13.5,
            letterSpacing: "0.07em",
          }}
        >
          {submitting ? "Checking…" : "View reports"}
        </button>
      </div>
    </div>
  );
}
