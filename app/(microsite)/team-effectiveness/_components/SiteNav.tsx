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

  // Hide the header CTA on the diagnostic itself — it's the prominent CTA on
  // the intro (page 0) and redundant once you're inside the flow.
  const hideCta = pathname.startsWith(CALCULATOR_HREF);

  return (
    <>
      {/* Utility strip */}
      <div style={{ background: "#F4F2F8", padding: "7px clamp(20px, 5vw, 56px)" }}>
        <TrackedLink
          href={MAIN_SITE_HREF}
          eventName="te_link"
          eventParams={{ label: "back_to_main", location: "utility_strip" }}
          className="te-navlink transition-colors hover:text-[#6E3FCC]"
          style={{ fontSize: 12, fontWeight: 600, color: "#8A8499", letterSpacing: "0.01em" }}
        >
          ← getcampfire.com
        </TrackedLink>
      </div>

      {/* Sticky nav */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          borderColor: "#F1EEF8",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ padding: "16px clamp(20px, 5vw, 56px)" }}
        >
          {/* Left: logo */}
          <TrackedLink
            href="/team-effectiveness"
            eventName="te_link"
            eventParams={{ label: "logo", location: "site_nav" }}
            className="flex items-center"
          >
            <Image src="/campfire-logo.webp" alt="Campfire" width={1862} height={396} className="h-7 w-auto" priority />
          </TrackedLink>

          {/* Center: desktop links */}
          <div className="hidden lg:flex items-center" style={{ gap: 34 }}>
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  eventName="te_link"
                  eventParams={{ label: link.label, location: "site_nav" }}
                  className="te-navlink relative transition-colors"
                  style={{
                    fontSize: 14,
                    fontWeight: active ? 700 : 600,
                    color: active ? "#6E3FCC" : "#636B7C",
                  }}
                >
                  {link.label}
                </TrackedLink>
              );
            })}
          </div>

          {/* Right: pink pill CTA (desktop) — hidden on the diagnostic route */}
          {hideCta ? (
            <span className="hidden lg:block" aria-hidden />
          ) : (
            <TrackedLink
              href={CALCULATOR_HREF}
              eventName="te_cta"
              eventParams={{ cta: "start_diagnostic", location: "site_nav" }}
              className="te-btn hidden lg:inline-block uppercase whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#fff", background: "#E055CB", padding: "12px 22px", borderRadius: 8 }}
            >
              Start the diagnostic
            </TrackedLink>
          )}

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            style={{ color: "#262F56" }}
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
              {!hideCta && (
                <TrackedLink
                  href={CALCULATOR_HREF}
                  eventName="te_cta"
                  eventParams={{ cta: "start_diagnostic", location: "site_nav_mobile" }}
                  className="mt-3 text-center text-white text-[12px] font-bold tracking-[0.1em] uppercase px-5 py-4 rounded-[8px]"
                  style={{ background: "#E055CB" }}
                >
                  <span onClick={() => setOpen(false)}>Start the diagnostic</span>
                </TrackedLink>
              )}
              <div className="my-4 h-px" style={{ background: "#F1EEF8" }} />
              <TrackedLink
                href={MAIN_SITE_HREF}
                eventName="te_link"
                eventParams={{ label: "back_to_main", location: "site_nav_mobile" }}
                className="py-2 text-[15px] font-medium"
                style={{ color: "#8A8499" }}
              >
                <span onClick={() => setOpen(false)}>← Back to getcampfire.com</span>
              </TrackedLink>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
