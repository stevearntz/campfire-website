"use client";

import { useRouter } from "next/navigation";

/** Sticky sub-header shown on the intro / results / invite / compare routes. */
export default function AppHeader({ email }: { email?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/ypo-tool/auth/logout", { method: "POST" });
    } catch {
      // DB not connected — clear client state regardless
    }
    router.replace("/ypo-tool");
  };

  return (
    <div className="sticky top-[64px] z-40 bg-white border-b border-[#EEE9F6]">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="font-bold uppercase"
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "#6E3FCC",
            }}
          >
            Activating Behaviors
          </span>
          <span style={{ fontSize: 13, color: "#A8A2B3" }}>{email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs transition-colors"
          style={{ color: "#A8A2B3" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#636B7C")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#A8A2B3")}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
