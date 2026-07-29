import type { Metadata } from "next";
import brandKit from "@/public/design-system/campfire-brand-kit.json";

/* =========================================================================
   Campfire → Arcade brand kit — the single URL arcade.software scrapes.
   Server-rendered. Every hex, font name, and asset URL is real text / real
   <img src> in the initial payload (no screenshots, no client-only JS).
   All swatches, specimens, and lists are driven from campfire-brand-kit.json
   so the visible page and the machine payload can never drift apart.
   ========================================================================= */

const SITE = "https://www.getcampfire.com";

// Literal font stack — "League Spartan" must appear verbatim in computed
// styles so Arcade's Google-Fonts-backed picker resolves it (Spartan MB is
// the licensed cut, loaded via /design-system/fonts.css for fidelity).
const FONT_SANS =
  '"League Spartan", "Spartan MB", "Spartan", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
const FONT_SERIF = '"DM Serif Display", "New Spirit", Georgia, serif';

export const metadata: Metadata = {
  title: "Brand kit",
  description:
    "The Campfire brand kit — logos, colors, fonts, backgrounds, illustration, motion, and voice. The single source machine-ingested by arcade.software and a human-readable reference.",
  alternates: { canonical: `${SITE}/design-system` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE}/design-system`,
    title: "The Campfire brand kit",
    description:
      "Logos, colors, fonts, backgrounds, illustration, motion, and voice — the single source of truth for Campfire's brand.",
    images: [
      {
        url: `${SITE}/design-system/assets/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Campfire brand kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Campfire brand kit",
    description:
      "Logos, colors, fonts, backgrounds, illustration, motion, and voice — Campfire's brand, machine-readable.",
    images: [`${SITE}/design-system/assets/og-image.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Campfire",
  url: SITE,
  logo: `${SITE}/design-system/assets/campfire-logo.png`,
  slogan: brandKit.tagline,
  description: brandKit.positioning,
  brand: {
    "@type": "Brand",
    name: "Campfire",
    slogan: brandKit.tagline,
    logo: `${SITE}/design-system/assets/campfire-logo-black.svg`,
  },
};

// CSS-var fill with the real hex as a graceful fallback (token stays the
// source of truth; the fallback only paints if the token stylesheet is late).
const fill = (token: string | null, hex: string) =>
  token ? `var(${token}, ${hex})` : hex;

const NAV = [
  ["Logos", "logos"],
  ["Colors", "colors"],
  ["Type", "type"],
  ["Backgrounds", "backgrounds"],
  ["Illustration", "illustration"],
  ["Icons", "icons"],
  ["Photography", "photography"],
  ["Motion", "motion"],
  ["Voice", "voice"],
  ["Downloads", "downloads"],
] as const;

const C = {
  purple: "var(--c-purple-600, #6E3FCC)",
  lavender: "var(--c-purple-300, #9D88ED)",
  navy: "var(--c-indigo-700, #1E2A4A)",
  midnight: "var(--c-indigo-1100, #1C1334)",
  deep: "var(--c-indigo-900, #262F56)",
  soft: "var(--c-purple-050, #F8F5FC)",
  card: "var(--c-card, #F7F6F7)",
  slate: "var(--c-gray-500, #636B7C)",
  warm: "var(--c-warm-300, #FFC28A)",
  border: "var(--c-gray-100, #F3F4F6)",
};

function Eyebrow({
  children,
  color = C.purple,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <p
      className="text-[12px] font-bold uppercase"
      style={{ color, letterSpacing: "0.18em" }}
    >
      {children}
    </p>
  );
}

function Section({
  id,
  bg,
  children,
}: {
  id: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 px-6" style={{ background: bg }}>
      <div className="mx-auto max-w-7xl py-20 md:py-24">{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main style={{ fontFamily: FONT_SANS }}>
      {/* Self-hosted Spartan MB + League Spartan/DM Serif imports + all --c-* tokens */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href="/design-system/styles.css" />
      {/* Material Symbols (Filled / Rounded) for the utility-icon system */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0&display=swap"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/json"
        id="brand-kit"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandKit) }}
      />

      {/* ============================ HERO ============================ */}
      <section
        className="topo relative overflow-hidden px-6"
        style={{ background: C.midnight }}
      >
        <div className="relative z-10 mx-auto max-w-7xl py-24 md:py-32">
          <Eyebrow color={C.warm}>Campfire brand kit</Eyebrow>
          <h1
            className="mt-5 max-w-4xl text-[44px] font-bold leading-[1.05] md:text-[72px]"
            style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
          >
            The Campfire{" "}
            <span style={{ color: C.lavender }}>brand kit</span>
          </h1>
          <p
            className="mt-6 max-w-2xl text-[18px] leading-[1.6] md:text-[20px]"
            style={{ color: C.warm }}
          >
            Everything a machine — or a human — needs to build on-brand:
            logos, colors, fonts, backgrounds, illustration, motion, and voice.
          </p>
          <p
            className="mt-4 max-w-2xl text-[15px] leading-[1.7]"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            This page is the single source of truth scraped by arcade.software
            to auto-generate product walkthroughs. Every value below is real,
            rendered HTML — no screenshots, no PDF. The declared brand
            background is{" "}
            <code
              className="rounded px-1.5 py-0.5 text-[13px]"
              style={{ background: "rgba(255,255,255,0.1)", color: "#FFFFFF" }}
            >
              #1C1334
            </code>
            .
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a className="btn btn--cta" href="#downloads">
              Download tokens
            </a>
            <a
              className="btn btn--on-dark"
              href="/design-system/campfire-brand-kit.json"
            >
              Brand kit JSON
            </a>
          </div>
        </div>
      </section>

      {/* ======================= STICKY IN-PAGE NAV ======================= */}
      <nav
        className="sticky top-16 z-40 border-b px-6 backdrop-blur-sm"
        style={{
          background: "rgba(255,255,255,0.95)",
          borderColor: C.border,
        }}
        aria-label="Brand kit sections"
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto py-3">
          {NAV.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors hover:bg-[var(--c-purple-050)]"
              style={{ color: C.slate }}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ============================ LOGOS ============================ */}
      <Section id="logos" bg="#FFFFFF">
        <Eyebrow>Logos</Eyebrow>
        <h2
          className="mt-3 text-[32px] font-bold leading-[1.15] md:text-[40px]"
          style={{ color: C.navy, letterSpacing: "-0.015em" }}
        >
          One mark, three <span style={{ color: C.purple }}>lockups</span>
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-[1.6]" style={{ color: C.slate }}>
          Pick the variant by scene background. Light surfaces get the primary
          dark mark; dark surfaces get the reversed white mark. The full-color
          lockup keeps the flame orange {""}
          <code>#F59E2C</code>.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {brandKit.logos.map((logo) => {
            const dark = logo.background === "dark";
            return (
              <figure
                key={logo.url}
                className="overflow-hidden rounded-2xl border"
                style={{ borderColor: C.border }}
              >
                <div
                  className="flex h-48 items-center justify-center p-8"
                  style={{ background: dark ? C.midnight : C.soft }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.url}
                    alt={`Campfire ${logo.variant} logo — ${logo.use}`}
                    loading="eager"
                    decoding="sync"
                    className="max-h-20 w-auto max-w-[70%] object-contain"
                  />
                </div>
                <figcaption className="bg-white p-5">
                  <div className="text-[15px] font-bold" style={{ color: C.navy }}>
                    {logo.variant.replace(/-/g, " ")}
                  </div>
                  <p className="mt-1 text-[14px]" style={{ color: C.slate }}>
                    {logo.use}
                  </p>
                  <p className="mt-2 text-[12px]" style={{ color: C.slate }}>
                    Use on{" "}
                    {dark ? (
                      <>dark surfaces (#1C1334, #262F56)</>
                    ) : (
                      <>light surfaces (#FFFFFF, #F8F5FC)</>
                    )}{" "}
                    · <code>{logo.format.toUpperCase()}</code>
                  </p>
                  <a
                    href={logo.url}
                    download
                    className="mt-3 inline-block text-[13px] font-semibold underline underline-offset-2"
                    style={{ color: C.purple }}
                  >
                    Download
                  </a>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div
            className="rounded-2xl border p-6"
            style={{ borderColor: C.border, background: C.card }}
          >
            <div className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: C.navy }}>
              Clearspace &amp; minimum size
            </div>
            <ul className="mt-3 space-y-1.5 text-[14px]" style={{ color: C.slate }}>
              <li>· {brandKit.logoRules.clearspace}</li>
              <li>· Minimum width {brandKit.logoRules.minWidth}</li>
            </ul>
          </div>
          <div
            className="rounded-2xl border p-6"
            style={{ borderColor: C.border, background: C.card }}
          >
            <div className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: "#C73D30" }}>
              Never
            </div>
            <ul className="mt-3 space-y-1.5 text-[14px]" style={{ color: C.slate }}>
              {brandKit.logoRules.never.map((n) => (
                <li key={n}>✕ {n}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ============================ COLORS ============================ */}
      <Section id="colors" bg={C.soft}>
        <Eyebrow>Colors</Eyebrow>
        <h2
          className="mt-3 text-[32px] font-bold leading-[1.15] md:text-[40px]"
          style={{ color: C.navy, letterSpacing: "-0.015em" }}
        >
          The video <span style={{ color: C.purple }}>palette</span>
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-[1.6]" style={{ color: C.slate }}>
          Tight and roled. <strong style={{ color: C.navy }}>#1C1334 is the
          default scene background</strong>; <strong style={{ color: C.navy }}>#F8F5FC
          is the light alternate</strong>. Each swatch carries its role so
          color and type stay paired.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {brandKit.colors.map((c) => (
            <div
              key={c.hex + c.name}
              className="overflow-hidden rounded-xl border bg-white"
              style={{ borderColor: C.border }}
            >
              <div
                className="h-24 border-b"
                style={{ background: fill(c.token, c.hex), borderColor: C.border }}
              />
              <div className="p-4">
                <div className="text-[15px] font-bold" style={{ color: C.navy }}>
                  {c.name}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <code className="text-[13px] font-semibold" style={{ color: C.navy }}>
                    {c.hex}
                  </code>
                </div>
                <div className="mt-0.5 text-[12px]" style={{ color: C.slate }}>
                  <code>{c.token ?? "—"}</code>
                </div>
                <p className="mt-2 text-[13px] leading-[1.5]" style={{ color: C.slate }}>
                  {c.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Color ↔ type pairings */}
        <h3 className="mt-14 text-[22px] font-bold" style={{ color: C.navy }}>
          Color × type pairings
        </h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {brandKit.colorFontPairings.map((p) => {
            const onDark = p.background === "#1C1334";
            return (
              <div
                key={p.background}
                className="rounded-2xl border p-7"
                style={{
                  background: p.background,
                  borderColor: onDark ? "rgba(255,255,255,0.12)" : C.border,
                }}
              >
                <div
                  className="text-[24px] font-bold leading-tight"
                  style={{ color: p.headline }}
                >
                  Real work,{" "}
                  <span style={{ color: p.headlineEmphasis }}>real change</span>
                </div>
                {"subhead" in p && p.subhead ? (
                  <div className="mt-2 text-[14px] font-semibold" style={{ color: p.subhead }}>
                    A warm sub-headline
                  </div>
                ) : null}
                <p className="mt-3 text-[14px] leading-[1.6]" style={{ color: p.body }}>
                  Body copy sits at {p.body} on {p.background}.
                </p>
                <div
                  className="mt-4 text-[11px] uppercase tracking-[0.12em]"
                  style={{ color: p.headlineEmphasis }}
                >
                  {p.background} · {p.font}
                </div>
              </div>
            );
          })}
        </div>

        {/* Gradients */}
        <h3 className="mt-14 text-[22px] font-bold" style={{ color: C.navy }}>
          Gradients
        </h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {brandKit.gradients.map((g) => (
            <div
              key={g.name}
              className="overflow-hidden rounded-2xl border bg-white"
              style={{ borderColor: C.border }}
            >
              <div className="h-24" style={{ backgroundImage: g.css }} />
              <div className="p-4">
                <div className="text-[15px] font-bold" style={{ color: C.navy }}>
                  {g.name}
                </div>
                <code className="mt-1 block text-[12px] leading-[1.5]" style={{ color: C.slate }}>
                  {g.css}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Not for video */}
        <div
          className="mt-12 rounded-2xl border-l-4 p-6"
          style={{ background: "#FFFFFF", borderColor: C.purple }}
        >
          <div className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: C.navy }}>
            Not for video — decks &amp; charts only
          </div>
          <p className="mt-2 max-w-3xl text-[14px] leading-[1.6]" style={{ color: C.slate }}>
            {brandKit.doNotUse.extendedPalette} {brandKit.doNotUse.coachRose}
          </p>
        </div>
      </Section>

      {/* ============================ TYPE ============================ */}
      <Section id="type" bg="#FFFFFF">
        <Eyebrow>Type</Eyebrow>
        <h2
          className="mt-3 text-[32px] font-bold leading-[1.15] md:text-[40px]"
          style={{ color: C.navy, letterSpacing: "-0.015em" }}
        >
          League Spartan, <span style={{ color: C.purple }}>everywhere</span>
        </h2>
        <div className="mt-4 grid gap-2 text-[15px] md:grid-cols-3" style={{ color: C.slate }}>
          <p>
            <strong style={{ color: C.navy }}>League Spartan</strong> → headlines
            + body + buttons. Loaded from Google Fonts, weights 300–900.
          </p>
          <p>
            <strong style={{ color: C.navy }}>Spartan MB</strong> → the licensed
            production cut of the same design, self-hosted (100–900).
          </p>
          <p>
            <strong style={{ color: C.navy }}>DM Serif Display</strong> →
            occasional editorial accent only. Never body or UI.
          </p>
        </div>

        {/* Live specimens */}
        <div className="mt-10 space-y-8 rounded-2xl border p-8" style={{ borderColor: C.border }}>
          <div>
            <div className="text-[11px] uppercase tracking-[0.12em]" style={{ color: C.slate }}>
              Hero · 72 / 700 / -0.02em · League Spartan
            </div>
            <div
              className="mt-2 leading-[1.08]"
              style={{ color: C.navy, fontSize: "clamp(40px,7vw,72px)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Built to fit the{" "}
              <span style={{ color: C.purple }}>rhythm</span> of real work
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em]" style={{ color: C.slate }}>
                H1 · 40 / 700
              </div>
              <div className="mt-1 text-[40px] font-bold leading-[1.15]" style={{ color: C.navy }}>
                Leadership that fits
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em]" style={{ color: C.slate }}>
                H2 · 32 / 700
              </div>
              <div className="mt-1 text-[32px] font-bold leading-[1.2]" style={{ color: C.navy }}>
                Designed for modern teams
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em]" style={{ color: C.slate }}>
                H3 · 24 / 700
              </div>
              <div className="mt-1 text-[24px] font-bold leading-[1.3]" style={{ color: C.navy }}>
                Every session ends with action
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em]" style={{ color: C.slate }}>
                Body · 18 / 400
              </div>
              <p className="mt-1 text-[18px] leading-[1.6]" style={{ color: C.slate }}>
                Leaders communicate more clearly, coach more consistently, and
                turn ideas into action — inside the flow of real work.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-8 border-t pt-6" style={{ borderColor: C.border }}>
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em]" style={{ color: C.slate }}>
                Button · 14 / 600 / 0.08em
              </div>
              <div className="mt-1 text-[14px] font-semibold uppercase" style={{ color: C.purple, letterSpacing: "0.08em" }}>
                Explore solutions
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em]" style={{ color: C.slate }}>
                Eyebrow · 12 / 700 / 0.18em
              </div>
              <div className="mt-1 text-[12px] font-bold uppercase" style={{ color: C.slate, letterSpacing: "0.18em" }}>
                Results you can trust
              </div>
            </div>
          </div>
        </div>

        {/* Font cuts */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border p-6" style={{ borderColor: C.border }}>
            <div className="text-[52px] leading-none" style={{ color: C.navy, fontFamily: FONT_SANS, fontWeight: 700 }}>
              Aa Gg
            </div>
            <div className="mt-3 text-[14px] font-semibold" style={{ color: C.navy }}>League Spartan</div>
            <div className="text-[12px]" style={{ color: C.slate }}>Google Fonts · 300–900</div>
          </div>
          <div className="rounded-2xl border p-6" style={{ borderColor: C.border }}>
            <div className="text-[52px] leading-none" style={{ color: C.navy, fontFamily: '"Spartan MB", "League Spartan", sans-serif', fontWeight: 700 }}>
              Aa Gg
            </div>
            <div className="mt-3 text-[14px] font-semibold" style={{ color: C.navy }}>Spartan MB</div>
            <div className="text-[12px]" style={{ color: C.slate }}>Self-hosted · 100–900</div>
          </div>
          <div className="rounded-2xl border p-6" style={{ borderColor: C.border }}>
            <div className="text-[52px] leading-none" style={{ color: C.navy, fontFamily: FONT_SERIF }}>
              Aa Gg
            </div>
            <div className="mt-3 text-[14px] font-semibold" style={{ color: C.navy }}>DM Serif Display</div>
            <div className="text-[12px]" style={{ color: C.slate }}>Google Fonts · accent only</div>
          </div>
        </div>
      </Section>

      {/* ========================= BACKGROUNDS ========================= */}
      <Section id="backgrounds" bg={C.soft}>
        <Eyebrow>Backgrounds</Eyebrow>
        <h2
          className="mt-3 text-[32px] font-bold leading-[1.15] md:text-[40px]"
          style={{ color: C.navy, letterSpacing: "-0.015em" }}
        >
          The topographic pattern <span style={{ color: C.purple }}>is the brand</span>
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-[1.6]" style={{ color: C.slate }}>
          Hand-drawn, low-opacity contour lines — white over purple/navy —
          layered on a gradient. {brandKit.backgroundRules[0]}{" "}
          <strong style={{ color: C.navy }}>{brandKit.backgroundRules[1]}</strong>
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brandKit.backgrounds.map((b) => (
            <figure
              key={b.url}
              className="overflow-hidden rounded-2xl border bg-white"
              style={{ borderColor: C.border }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.url}
                alt={`Campfire background — ${b.role}`}
                loading="eager"
                decoding="sync"
                className="h-44 w-full object-cover"
              />
              <figcaption className="p-4">
                <code className="text-[12px]" style={{ color: C.navy }}>
                  {b.url.split("/").pop()}
                </code>
                <p className="mt-1 text-[13px] leading-[1.5]" style={{ color: C.slate }}>
                  {b.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ======================== ILLUSTRATION ======================== */}
      <Section id="illustration" bg="#FFFFFF">
        <Eyebrow>Illustration</Eyebrow>
        <h2
          className="mt-3 text-[32px] font-bold leading-[1.15] md:text-[40px]"
          style={{ color: C.navy, letterSpacing: "-0.015em" }}
        >
          Hand-drawn hero <span style={{ color: C.purple }}>illustrations</span>
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-[1.6]" style={{ color: C.slate }}>
          {brandKit.imagery.illustrationStyle}
        </p>

        <div className="mt-10 grid grid-cols-3 gap-5 sm:grid-cols-6">
          {brandKit.imagery.illustrations.map((src) => (
            <figure
              key={src}
              className="flex flex-col items-center rounded-2xl border p-5"
              style={{ borderColor: C.border, background: C.card }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Campfire hero illustration — ${src.split("/").pop()?.replace(".webp", "")}`}
                loading="eager"
                decoding="sync"
                className="h-20 w-20 object-contain"
              />
              <figcaption className="mt-3 text-center text-[12px]" style={{ color: C.slate }}>
                {src.split("/").pop()?.replace(".webp", "")}
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          className="mt-8 rounded-2xl border-l-4 p-6"
          style={{ background: C.soft, borderColor: "#E055CB" }}
        >
          <div className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: C.navy }}>
            For Arcade — a fixed set
          </div>
          <p className="mt-2 max-w-3xl text-[14px] leading-[1.6]" style={{ color: C.slate }}>
            {brandKit.imagery.illustrationRule}
          </p>
        </div>
      </Section>

      {/* ============================ ICONS ============================ */}
      <Section id="icons" bg={C.soft}>
        <Eyebrow>Icons</Eyebrow>
        <h2
          className="mt-3 text-[32px] font-bold leading-[1.15] md:text-[40px]"
          style={{ color: C.navy, letterSpacing: "-0.015em" }}
        >
          Material Symbols for <span style={{ color: C.purple }}>utility</span>
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-[1.6]" style={{ color: C.slate }}>
          {brandKit.imagery.utilityIcons.family}, {brandKit.imagery.utilityIcons.style}.
          24px default, 36px as a card accent. Filled and rounded.{" "}
          <strong style={{ color: C.navy }}>No emoji, ever.</strong>
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {[
            "groups",
            "forum",
            "timer",
            "event",
            "check_circle",
            "lightbulb",
            "trending_up",
            "flag",
            "bolt",
            "rocket_launch",
            "local_florist",
            "fitness_center",
          ].map((name) => (
            <div
              key={name}
              className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-xl border bg-white"
              style={{ borderColor: C.border }}
            >
              <span
                className="material-symbols-rounded"
                style={{ fontSize: 36, color: "#374151", fontVariationSettings: '"FILL" 1' }}
                aria-hidden
              >
                {name}
              </span>
              <span className="text-[10px]" style={{ color: C.slate }}>
                {name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ color: C.slate }}>
            As shipped (36px webp, gray-700):
          </span>
          {["groups-icon", "timer", "flight_takeoff", "reduce_capacity"].map((f) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={f}
              src={`/design-system/assets/${f}.webp`}
              alt={`Utility icon — ${f}`}
              loading="eager"
              decoding="sync"
              className="h-9 w-9 object-contain"
            />
          ))}
        </div>
      </Section>

      {/* ========================= PHOTOGRAPHY ========================= */}
      <Section id="photography" bg="#FFFFFF">
        <Eyebrow>Photography</Eyebrow>
        <h2
          className="mt-3 text-[32px] font-bold leading-[1.15] md:text-[40px]"
          style={{ color: C.navy, letterSpacing: "-0.015em" }}
        >
          Warm, natural, <span style={{ color: C.purple }}>real people</span>
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-[1.6]" style={{ color: C.slate }}>
          {brandKit.imagery.photography}
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              src: "/design-system/assets/people/steve.webp",
              alt: "Warm outdoor portrait in natural light — real person, on-brand",
              tag: "On brand",
              ok: true,
            },
            {
              src: "/design-system/assets/people/fdo-steve-speaking.webp",
              alt: "Real Campfire event — speaker on stage in warm venue light",
              tag: "On brand",
              ok: true,
            },
            {
              src: "/design-system/assets/people/camara.webp",
              alt: "Black-and-white headshot — off-brand example, do not use",
              tag: "Never — black & white",
              ok: false,
            },
          ].map((p) => (
            <figure
              key={p.src}
              className="overflow-hidden rounded-2xl border bg-white"
              style={{ borderColor: p.ok ? C.border : "#C73D30" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                loading="eager"
                decoding="sync"
                className="h-56 w-full object-cover"
              />
              <figcaption
                className="px-4 py-3 text-[13px] font-semibold"
                style={{ color: p.ok ? C.purple : "#C73D30" }}
              >
                {p.ok ? "✓ " : "✕ "}
                {p.tag}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ======================= MOTION & SHAPE ======================= */}
      <Section id="motion" bg={C.soft}>
        <Eyebrow>Motion &amp; shape</Eyebrow>
        <h2
          className="mt-3 text-[32px] font-bold leading-[1.15] md:text-[40px]"
          style={{ color: C.navy, letterSpacing: "-0.015em" }}
        >
          Flat, calm, <span style={{ color: C.purple }}>conservative</span>
        </h2>

        {/* Radii */}
        <h3 className="mt-10 text-[18px] font-bold" style={{ color: C.navy }}>
          Radii
        </h3>
        <div className="mt-4 flex flex-wrap gap-5">
          {[
            ["Button", 8],
            ["Small card", 12],
            ["Large card", 16],
            ["XL card", 24],
            ["Pill / avatar", 999],
          ].map(([label, r]) => (
            <div key={label as string} className="flex flex-col items-center gap-2">
              <div
                className="h-20 w-20 border-2 bg-white"
                style={{ borderColor: C.purple, borderRadius: r as number }}
              />
              <div className="text-center text-[12px]" style={{ color: C.slate }}>
                {label}
                <br />
                {r === 999 ? "999px" : `${r}px`}
              </div>
            </div>
          ))}
        </div>

        {/* Flat cards + motion rules */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6" style={{ borderColor: C.border }}>
            <div className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: C.navy }}>
              Flat system
            </div>
            <p className="mt-2 text-[14px] leading-[1.6]" style={{ color: C.slate }}>
              {brandKit.elevation.cards}. Shadow only on floating overlays.
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-6" style={{ borderColor: C.border }}>
            <div className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: C.navy }}>
              Transitions
            </div>
            <p className="mt-2 text-[14px] leading-[1.6]" style={{ color: C.slate }}>
              {brandKit.motion.transition}. Fade-in = {brandKit.motion.fadeIn}.
              Ambient: {brandKit.motion.ambient}.
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-6" style={{ borderColor: "#C73D30" }}>
            <div className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: "#C73D30" }}>
              Banned motion
            </div>
            <p className="mt-2 text-[14px] leading-[1.6]" style={{ color: C.slate }}>
              No {brandKit.motion.never.join(", no ")}.
            </p>
          </div>
        </div>
      </Section>

      {/* ============================ VOICE ============================ */}
      <Section id="voice" bg="#FFFFFF">
        <Eyebrow>Voice &amp; tone</Eyebrow>
        <h2
          className="mt-3 text-[32px] font-bold leading-[1.15] md:text-[40px]"
          style={{ color: C.navy, letterSpacing: "-0.015em" }}
        >
          Direct, warm, <span style={{ color: C.purple }}>plain-spoken</span>
        </h2>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-[16px] leading-[1.7]" style={{ color: C.slate }}>
            <p>
              Campfire sells leadership development that fits inside real work —{" "}
              <em style={{ color: C.navy }}>“{brandKit.tagline}”</em> {brandKit.voice.register}
            </p>
            <p>{brandKit.voice.person}</p>
            <p>
              <strong style={{ color: C.navy }}>Casing.</strong> {brandKit.voice.casing}
            </p>
            <p>
              <strong style={{ color: C.navy }}>Punctuation.</strong> {brandKit.voice.punctuation}
            </p>
            <p>
              <strong style={{ color: C.navy }}>The signature device.</strong>{" "}
              {brandKit.voice.headlineDevice}
            </p>
          </div>

          {/* Two-tone live examples */}
          <div className="space-y-4">
            <div className="rounded-2xl border p-7" style={{ borderColor: C.border, background: "#FFFFFF" }}>
              <div className="text-[11px] uppercase tracking-[0.12em]" style={{ color: C.slate }}>
                On light
              </div>
              <div className="mt-2 text-[28px] font-bold leading-[1.2]" style={{ color: C.navy }}>
                Leadership development must{" "}
                <span style={{ color: C.purple }}>fit your reality</span>
              </div>
            </div>
            <div className="topo relative overflow-hidden rounded-2xl p-7" style={{ background: C.midnight }}>
              <div className="relative z-10">
                <div className="text-[11px] uppercase tracking-[0.12em]" style={{ color: C.warm }}>
                  On dark
                </div>
                <div className="mt-2 text-[28px] font-bold leading-[1.2]" style={{ color: "#FFFFFF" }}>
                  Built to fit the{" "}
                  <span style={{ color: C.lavender }}>rhythm</span> of real work
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sample captions + CTAs */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-[18px] font-bold" style={{ color: C.navy }}>
              Sample captions Arcade can imitate
            </h3>
            <ul className="mt-4 space-y-2">
              {brandKit.voice.samples.map((s) => (
                <li
                  key={s}
                  className="rounded-xl border px-4 py-3 text-[16px]"
                  style={{ borderColor: C.border, background: C.card, color: C.navy }}
                >
                  “{s}”
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              {brandKit.voice.ctas.map((cta) => (
                <span
                  key={cta}
                  className="rounded-lg px-5 py-3 text-[14px] font-semibold uppercase"
                  style={{ background: C.purple, color: "#FFFFFF", letterSpacing: "0.08em" }}
                >
                  {cta}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[18px] font-bold" style={{ color: "#C73D30" }}>
              Never write like this
            </h3>
            <ul className="mt-4 space-y-2">
              {brandKit.voice.never.map((n) => (
                <li
                  key={n}
                  className="rounded-xl border px-4 py-3 text-[16px] line-through"
                  style={{ borderColor: "#F7C3BE", background: "#FBEDEB", color: "#8F251A" }}
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ========================== DOWNLOADS ========================== */}
      <section
        id="downloads"
        className="topo relative scroll-mt-28 overflow-hidden px-6"
        style={{ background: C.midnight }}
      >
        <div className="relative z-10 mx-auto max-w-7xl py-20 md:py-24">
          <Eyebrow color={C.warm}>Downloads</Eyebrow>
          <h2 className="mt-3 text-[32px] font-bold leading-[1.15] md:text-[40px]" style={{ color: "#FFFFFF", letterSpacing: "-0.015em" }}>
            Take the <span style={{ color: C.lavender }}>tokens</span>
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.8)" }}>
            The machine-readable kit, the token CSS, the fonts, and every logo —
            served from stable URLs under <code>/design-system/</code>.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Brand kit JSON", "/design-system/campfire-brand-kit.json", "Full machine-readable kit"],
              ["colors_and_type.css", "/design-system/colors_and_type.css", "All tokens + type ramp"],
              ["styles.css", "/design-system/styles.css", "Entry point (fonts + tokens)"],
              ["fonts.css", "/design-system/fonts.css", "Spartan MB @font-face"],
              ["Primary logo (SVG)", "/design-system/assets/campfire-logo-black.svg", "For light surfaces"],
              ["Reversed logo (PNG)", "/design-system/assets/campfire-logo-white.png", "For dark surfaces"],
              ["Full-color logo (PNG)", "/design-system/assets/campfire-logo.png", "Includes flame orange"],
              ["OG image (PNG)", "/design-system/assets/og-image.png", "1200 × 630"],
              ["Variable font (TTF)", "/design-system/fonts/SpartanMB-VF.ttf", "Spartan MB 100–900"],
            ].map(([label, href, desc]) => (
              <a
                key={href}
                href={href}
                download
                className="group rounded-2xl border p-5 transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-bold" style={{ color: "#FFFFFF" }}>
                    {label}
                  </span>
                  <span className="material-symbols-rounded" style={{ color: C.lavender, fontSize: 22 }} aria-hidden>
                    download
                  </span>
                </div>
                <div className="mt-1 text-[13px]" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {desc}
                </div>
                <code className="mt-2 block truncate text-[11px]" style={{ color: C.lavender }}>
                  {href}
                </code>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
