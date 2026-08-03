"use client";

import { useRouter } from "next/navigation";

/**
 * Sticky sub-header shown on the home / results / invite / compare routes.
 * The brand doubles as a breadcrumb: "Activating Behaviors" always links back
 * to the home dashboard, and `crumb` names the current screen so members can
 * see where they are and get back in one click.
 */
export default function AppHeader({
  email,
  crumb,
}: {
  email?: string;
  crumb?: string;
}) {
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
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-3">
        {/* Breadcrumb — brand links home */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => router.push("/ypo-tool")}
            className="flex items-center gap-1.5 font-bold uppercase transition-colors flex-shrink-0"
            style={{ fontSize: 11, letterSpacing: "0.14em", color: "#6E3FCC" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#5B34AB")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6E3FCC")}
            title="Back to your dashboard"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5 12 3l9 6.5" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"
              />
            </svg>
            <span className="hidden sm:inline">Activating Behaviors</span>
            <span className="sm:hidden">Home</span>
          </button>

          {crumb && (
            <>
              <span
                aria-hidden
                className="flex-shrink-0"
                style={{ fontSize: 14, color: "#C9C4D4" }}
              >
                /
              </span>
              <span
                className="truncate"
                style={{ fontSize: 12.5, fontWeight: 600, color: "#636B7C" }}
              >
                {crumb}
              </span>
            </>
          )}
        </nav>

        {/* Right — identity + sign out */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {email && (
            <span
              className="hidden sm:inline"
              style={{ fontSize: 13, color: "#A8A2B3" }}
            >
              {email}
            </span>
          )}
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
    </div>
  );
}
