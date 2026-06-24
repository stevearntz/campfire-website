"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TrackedLink from "@/app/components/TrackedLink";

const NAV_LINKS = [
  { label: "The Sprint", href: "/team-effectiveness" },
  { label: "The Model", href: "/team-effectiveness/the-model" },
  { label: "Case Studies", href: "/team-effectiveness/case-studies" },
];

const CALCULATOR_HREF = "/team-effectiveness/calculator";
const MAIN_SITE_HREF = "/";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/team-effectiveness"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        borderColor: "#F1EEF8",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ padding: "14px clamp(20px, 5vw, 56px)" }}
      >
        {/* Left: return link + logo */}
        <div className="flex items-center gap-5">
          <TrackedLink
            href={MAIN_SITE_HREF}
            eventName="te_link"
            eventParams={{ label: "back_to_main", location: "site_nav" }}
            className="hidden sm:inline text-[13px] font-medium transition-colors text-[#9B96A6] hover:text-[#6E3FCC]"
          >
            ← getcampfire.com
          </TrackedLink>
          <TrackedLink
            href="/team-effectiveness"
            eventName="te_link"
            eventParams={{ label: "logo", location: "site_nav" }}
            className="flex items-center"
          >
            <Image src="/campfire-logo.webp" alt="Campfire" width={1862} height={396} className="h-7 w-auto" priority />
          </TrackedLink>
        </div>

        {/* Desktop links + CTA */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <TrackedLink
                key={link.href}
                href={link.href}
                eventName="te_link"
                eventParams={{ label: link.label, location: "site_nav" }}
                className={`relative text-[14px] transition-colors ${active ? "text-[#6E3FCC] font-bold" : "text-[#636B7C] font-semibold hover:text-[#6E3FCC]"}`}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute left-0 -bottom-2 h-[2px] w-full rounded-full pointer-events-none"
                    style={{ background: "#6E3FCC" }}
                  />
                )}
              </TrackedLink>
            );
          })}
          <TrackedLink
            href={CALCULATOR_HREF}
            eventName="te_cta"
            eventParams={{ cta: "start_diagnostic", location: "site_nav" }}
            className="text-white text-[12px] font-bold tracking-[0.1em] uppercase rounded-[8px] whitespace-nowrap transition-colors bg-[#6E3FCC] hover:bg-[#5B34AB]"
            style={{ padding: "11px 20px" }}
          >
            Start the diagnostic
          </TrackedLink>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{ color: "#1E2A4A" }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-[57px] z-40" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/20" />
          <nav
            className="relative bg-white px-6 py-6 flex flex-col gap-1 border-b shadow-lg"
            style={{ borderColor: "#F1EEF8" }}
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_LINKS.map((link) => (
              <TrackedLink
                key={link.href}
                href={link.href}
                eventName="te_link"
                eventParams={{ label: link.label, location: "site_nav_mobile" }}
                className="py-3 text-[17px] font-semibold"
                style={{ color: isActive(link.href) ? "#6E3FCC" : "#636B7C" }}
              >
                <span onClick={() => setOpen(false)}>{link.label}</span>
              </TrackedLink>
            ))}
            <TrackedLink
              href={CALCULATOR_HREF}
              eventName="te_cta"
              eventParams={{ cta: "start_diagnostic", location: "site_nav_mobile" }}
              className="mt-3 text-center text-white text-[12px] font-bold tracking-[0.1em] uppercase px-5 py-4 rounded-[8px] bg-[#6E3FCC] hover:bg-[#5B34AB]"
            >
              <span onClick={() => setOpen(false)}>Start the diagnostic</span>
            </TrackedLink>
            <div className="my-4 h-px" style={{ background: "#F1EEF8" }} />
            <TrackedLink
              href={MAIN_SITE_HREF}
              eventName="te_link"
              eventParams={{ label: "back_to_main", location: "site_nav_mobile" }}
              className="py-2 text-[15px] font-medium"
              style={{ color: "#9B96A6" }}
            >
              <span onClick={() => setOpen(false)}>← Back to getcampfire.com</span>
            </TrackedLink>
          </nav>
        </div>
      )}
    </header>
  );
}
