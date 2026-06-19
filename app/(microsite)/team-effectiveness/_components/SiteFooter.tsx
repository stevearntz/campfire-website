import Image from "next/image";
import TrackedLink from "@/app/components/TrackedLink";

const COLUMNS: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    heading: "The Sprint",
    links: [
      { label: "The Sprint", href: "/team-effectiveness" },
      { label: "The Diagnostic", href: "/team-effectiveness/diagnostic" },
      { label: "The Workshop", href: "/team-effectiveness/workshop" },
      { label: "The Roadmap", href: "/team-effectiveness/roadmap" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "The Model", href: "/team-effectiveness/the-model" },
      { label: "Case Studies", href: "/team-effectiveness/case-studies" },
    ],
  },
  {
    heading: "Talk to us",
    links: [
      { label: "Book a call", href: "https://calendly.com/getcampfire/", external: true },
      { label: "Start the diagnostic", href: "/execution" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#1C1334" }}>
      <div className="absolute inset-0 topo-pattern-dark opacity-40 pointer-events-none" />
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 1200,
          paddingLeft: "clamp(20px, 5vw, 48px)",
          paddingRight: "clamp(20px, 5vw, 48px)",
          paddingTop: "clamp(48px, 7vw, 80px)",
          paddingBottom: "clamp(32px, 4vw, 48px)",
        }}
      >
        {/* Row 1 — columns */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/campfire-logo-white.png"
              alt="Campfire"
              width={1862}
              height={396}
              className="h-7 w-auto mb-4"
            />
            <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Deeply human leadership development.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-[12px] font-bold tracking-[0.14em] uppercase mb-4" style={{ color: "#9D88ED" }}>
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <TrackedLink
                      href={link.href}
                      external={link.external}
                      eventName="te_footer_click"
                      eventParams={{ label: link.label }}
                      className="text-[15px] transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {link.label}
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Row 2 — bottom strip */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            © 2026 Campfire · Clarity &amp; Alignment · Facilitated by Campfire
          </p>
          <TrackedLink
            href="/"
            eventName="te_footer_click"
            eventParams={{ label: "back_to_main" }}
            className="text-[13px] transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            getcampfire.com
          </TrackedLink>
        </div>
      </div>
    </footer>
  );
}
