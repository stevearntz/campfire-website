import Image from "next/image";
import TrackedLink from "@/app/components/TrackedLink";

const FOOTER_CSS = `
.te-foot-cols { display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px 24px; }
@media (min-width: 720px) {
  .te-foot-cols { grid-template-columns: repeat(3, auto); gap: 64px; }
}
.te-navlink { transition: color 160ms ease; }
.te-navlink:hover { color: #6E3FCC; }
`;

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
      { label: "Start the diagnostic", href: "/team-effectiveness/calculator" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer style={{ background: "#1C1334", padding: "clamp(56px, 7vw, 80px) clamp(24px, 6vw, 80px) 0" }}>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_CSS }} />
      <div
        className="mx-auto flex flex-wrap items-start justify-between"
        style={{ maxWidth: 1160, gap: 48, paddingBottom: "clamp(48px, 6vw, 64px)" }}
      >
        <div style={{ maxWidth: 300 }}>
          <Image
            src="/campfire-logo-white.png"
            alt="Campfire"
            width={1862}
            height={396}
            className="w-auto"
            style={{ height: 26, marginBottom: 16 }}
          />
          <p style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.55)", margin: 0 }}>
            Deeply human leadership development.
          </p>
        </div>

        <div className="te-foot-cols">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <div
                className="uppercase"
                style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)", marginBottom: 18 }}
              >
                {col.heading}
              </div>
              <div className="flex flex-col" style={{ gap: 12 }}>
                {col.links.map((link) => (
                  <TrackedLink
                    key={link.label}
                    href={link.href}
                    external={link.external}
                    eventName="te_link"
                    eventParams={{ label: link.label, location: "site_footer" }}
                    className="te-navlink transition-colors hover:text-[#6E3FCC]"
                    style={{ fontSize: 15, color: "rgba(255,255,255,0.78)" }}
                  >
                    {link.label}
                  </TrackedLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mx-auto flex flex-wrap justify-between border-t"
        style={{ maxWidth: 1160, gap: 12, padding: "24px 0", borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.42)" }}>
          © 2026 Campfire · Clarity &amp; Alignment · Facilitated by Campfire
        </div>
        <TrackedLink
          href="/"
          eventName="te_link"
          eventParams={{ label: "back_to_main", location: "site_footer" }}
          className="te-navlink transition-colors hover:text-[#6E3FCC]"
          style={{ fontSize: 13, color: "rgba(255,255,255,0.42)" }}
        >
          getcampfire.com
        </TrackedLink>
      </div>
    </footer>
  );
}
