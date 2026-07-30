"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

const NAV = [
  { href: "/presentations", label: "My course", icon: "home", exact: true },
  { href: "/presentations/syllabus", label: "Syllabus", icon: "list_alt" },
  { href: "/presentations/modules/01", label: "Lessons", icon: "play_lesson" },
  {
    href: "/presentations/deck",
    label: "Build the deck",
    icon: "dashboard_customize",
  },
  { href: "/presentations/rehearse", label: "Rehearsal studio", icon: "mic" },
  {
    href: "/presentations/library",
    label: "Templates & notes",
    icon: "folder_open",
  },
];

export function Sidebar({
  displayName,
  initialsText,
}: {
  displayName: string;
  initialsText: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="topo-pattern flex w-[260px] flex-none flex-col overflow-x-hidden overflow-y-auto bg-cf-indigo-1100">
      <div className="relative z-[1] px-6 pt-[26px] pb-5">
        <div className="flex items-center gap-[9px]">
          <Icon
            name="local_fire_department"
            className="text-[22px] text-cf-warm-500"
          />
          <span className="text-[17px] font-extrabold tracking-[-0.01em] text-white">
            Campfire
          </span>
        </div>
        <div className="mt-[22px] text-[11px] font-bold tracking-[0.18em] text-cf-purple-300 uppercase">
          Course
        </div>
        <div className="mt-[6px] text-[20px] leading-[1.25] font-bold text-white">
          Tell it so it moves
        </div>
        <div className="mt-1 text-[13px] text-white/55">
          Storytelling &amp; presentations
        </div>
      </div>

      <nav className="relative z-[1] flex flex-col gap-[2px] px-3 py-2">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href ||
              pathname.startsWith(item.href + "/") ||
              (item.href.includes("/modules/") &&
                pathname.startsWith("/presentations/modules"));
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-[11px] rounded-lg px-3 py-[11px] text-sm font-semibold transition-colors ${
                active
                  ? "bg-white/12 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white/90"
              }`}
            >
              <Icon name={item.icon} className="text-[19px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="relative z-[1] mt-auto p-5">
        <div className="border-t border-white/12 pt-[18px]">
          <div className="text-[11px] font-bold tracking-[0.16em] text-white/45 uppercase">
            Next coaching session
          </div>
          <div className="mt-2 text-sm font-semibold text-white/80">
            Not scheduled yet
          </div>
          <div className="mt-[2px] text-[13px] text-white/60">
            Your coach sets these up as you go.
          </div>
        </div>
        <div className="mt-[22px] flex items-center gap-[10px]">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-cf-purple-300 text-[13px] font-extrabold text-cf-indigo-1100">
            {initialsText}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold text-white">
              {displayName}
            </div>
            <div className="text-[11px] text-white/50">Cohort of one</div>
          </div>
          <button
            type="button"
            aria-label="Sign out"
            onClick={async () => {
              await fetch("/api/presentations/auth/logout", { method: "POST" });
              window.location.href = "/presentations/login";
            }}
            className="flex-none rounded-md p-1 text-white/45 hover:text-white/80"
          >
            <Icon name="logout" className="text-[18px]" />
          </button>
        </div>
      </div>
    </aside>
  );
}
