"use client";

import { useState } from "react";
import { Icon } from "../../_components/Icon";

const ERRORS: Record<string, string> = {
  expired: "That link has expired or was already used. Request a new one below.",
  not_allowed:
    "That email isn't on the invite list yet. Check with your Campfire contact.",
  invalid: "That sign-in link was invalid. Request a new one below.",
  failed: "Something went wrong signing you in. Please try again.",
};

export default function LoginForm({ error }: { error?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [message, setMessage] = useState(error ? ERRORS[error] ?? "" : "");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("sending");
    setMessage("");
    try {
      const res = await fetch("/api/presentations/auth/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setMessage(data.error || "Something went wrong. Please try again.");
        setState("idle");
        return;
      }
      setState("sent");
    } catch {
      setMessage("Something went wrong. Please try again.");
      setState("idle");
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="w-full max-w-[440px]">
        <div className="flex items-center justify-center gap-[9px]">
          <Icon
            name="local_fire_department"
            className="text-[24px] text-cf-warm-500"
          />
          <span className="text-[18px] font-extrabold tracking-[-0.01em] text-cf-indigo-700">
            Campfire
          </span>
        </div>

        <div className="mt-6 rounded-2xl border border-cf-gray-100 bg-white px-8 py-9">
          {state === "sent" ? (
            <div className="text-center">
              <Icon
                name="mark_email_read"
                className="text-[40px] text-cf-purple-600"
              />
              <h1 className="mt-3 text-[24px] font-bold text-cf-indigo-700">
                Check your email
              </h1>
              <p className="mx-auto mt-2 max-w-[340px] text-[15px] leading-[1.6] text-cf-gray-500">
                If <strong className="text-cf-indigo-700">{email}</strong> is on
                the invite list, a sign-in link is on its way. It expires in 15
                minutes.
              </p>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="mt-5 text-[13px] font-bold tracking-[0.12em] text-cf-purple-600 uppercase"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <>
              <div className="text-[12px] font-bold tracking-[0.18em] text-cf-purple-600 uppercase">
                Tell It So It Moves
              </div>
              <h1 className="mt-2 text-[26px] font-bold text-cf-indigo-700">
                Sign in to your course
              </h1>
              <p className="mt-2 text-[15px] leading-[1.6] text-cf-gray-500">
                Invite-only. Enter your email and we&apos;ll send you a sign-in
                link — no password.
              </p>

              <form onSubmit={submit} className="mt-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="w-full rounded-[10px] border border-cf-gray-200 px-[14px] py-[12px] text-[15px] text-cf-indigo-700 outline-none focus:border-cf-purple-400"
                />
                {message && (
                  <div className="mt-3 text-[13px] leading-[1.5] text-cf-ladybug-600">
                    {message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={state === "sending" || !email.trim()}
                  className="mt-4 w-full rounded-lg bg-cf-purple-600 px-5 py-[13px] text-[13px] font-bold tracking-[0.12em] text-white uppercase disabled:opacity-50"
                >
                  {state === "sending" ? "Sending…" : "Email me a link"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
