"use client";

import { useState } from "react";
import Image from "next/image";

function spawnParticles(
  originX: number,
  originY: number,
  type: "sand" | "embers" | "snow" | "leaves" | "light" | "seagulls"
) {
  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "99999",
    overflow: "hidden",
  });
  document.body.appendChild(container);

  const count = type === "sand" || type === "embers" ? 70 : type === "snow" || type === "leaves" ? 50 : 45;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    const size = type === "snow" ? 4 + Math.random() * 6 : 3 + Math.random() * 6;

    if (type === "sand") {
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 350;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      const dur = 0.6 + Math.random() * 0.8;
      const hue = 30 + Math.random() * 20;
      const light = 60 + Math.random() * 20;
      Object.assign(p.style, {
        position: "absolute",
        left: `${originX}px`,
        top: `${originY}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `hsl(${hue}, 70%, ${light}%)`,
        opacity: "1",
        transition: `all ${dur}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        transform: "translate(0, 0) scale(1)",
      });
      container.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translate(${dx}px, ${dy}px) scale(0.3)`;
        p.style.opacity = "0";
      });
    } else if (type === "embers") {
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 350;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 60;
      const dur = 0.8 + Math.random() * 1;
      const hue = 15 + Math.random() * 30;
      const light = 50 + Math.random() * 20;
      Object.assign(p.style, {
        position: "absolute",
        left: `${originX}px`,
        top: `${originY}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `hsl(${hue}, 100%, ${light}%)`,
        opacity: "0.9",
        transition: `all ${dur}s ease-out`,
        transform: "translate(0, 0) scale(1)",
      });
      container.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
        p.style.opacity = "0";
      });
    } else if (type === "light") {
      // Heavenly beams fanning out from a point slightly right of center
      const originXPx = window.innerWidth * 0.55;
      const beamCount = 8;
      if (i < beamCount) {
        const ray = p;
        const angle = 20 + (i / (beamCount - 1)) * 30; // fanned toward bottom-right corner
        const length = window.innerHeight * 1.2;
        const width = 20 + Math.random() * 30;
        const delay = i * 0.1;
        Object.assign(ray.style, {
          position: "absolute",
          left: `${originXPx}px`,
          top: "-20px",
          width: `${width}px`,
          height: `${length}px`,
          background: `linear-gradient(to bottom, rgba(255,248,220,0.5) 0%, rgba(255,235,170,0.2) 40%, transparent 100%)`,
          transformOrigin: "top center",
          transform: `rotate(${angle}deg)`,
          opacity: "0",
          transition: `opacity 2s ease-in-out ${delay}s`,
          filter: "blur(8px)",
        });
        container.appendChild(ray);
        requestAnimationFrame(() => { ray.style.opacity = "1"; });
        setTimeout(() => { ray.style.transition = "opacity 2.5s ease-out"; ray.style.opacity = "0"; }, 3000 + delay * 1000);
      } else {
        continue;
      }
    } else if (type === "seagulls") {
      const birdCount = 7;
      if (i < birdCount) {
        // Inject flap keyframes once
        if (!document.getElementById("seagull-keyframes")) {
          const s = document.createElement("style");
          s.id = "seagull-keyframes";
          s.textContent = `@keyframes flap-wings{0%,100%{d:path("M0 8 Q7 0 15 6 Q23 0 30 8")}50%{d:path("M0 4 Q7 8 15 6 Q23 8 30 4")}}@keyframes bird-fly{0%{transform:translateX(0)}100%{transform:translateX(${window.innerWidth + 400}px)}}@keyframes bird-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`;
          document.head.appendChild(s);
        }
        const bird = p;
        const y = originY + (Math.random() - 0.5) * 60 - 40;
        const startX = -60 - Math.random() * 200;
        const dur = 3.5 + Math.random() * 2;
        const delay = i * 0.5 + Math.random() * 0.3;
        const size = 18 + Math.random() * 14;
        const flapSpeed = 0.3 + Math.random() * 0.2;
        bird.innerHTML = `<svg viewBox="0 0 30 12" width="${size * 2}" height="${size}" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M0 8 Q7 0 15 6 Q23 0 30 8" style="animation:flap-wings ${flapSpeed}s ease-in-out infinite"/></svg>`;
        // Outer div handles horizontal travel, inner (bird) handles vertical bob
        const outer = document.createElement("div");
        Object.assign(outer.style, {
          position: "absolute",
          left: `${startX}px`,
          top: `${y}px`,
          animation: `bird-fly ${dur}s ease-in-out ${delay}s forwards`,
          opacity: "0",
        });
        Object.assign(bird.style, {
          animation: `bird-bob ${0.8 + Math.random() * 0.4}s ease-in-out infinite`,
        });
        outer.appendChild(bird);
        container.appendChild(outer);
        requestAnimationFrame(() => { outer.style.opacity = "0.9"; });
        setTimeout(() => { outer.style.transition = "opacity 0.5s"; outer.style.opacity = "0"; }, (delay + dur - 0.5) * 1000);
      } else {
        continue;
      }
    } else if (type === "leaves") {
      const leaves = ["🍂", "🍁", "🍃", "🍂", "🍁"];
      const x = Math.random() * window.innerWidth;
      const delay = Math.random() * 2;
      const dur = 4 + Math.random() * 3;
      const drift = -80 + Math.random() * 160;
      const spin = Math.random() * 720 - 360;
      p.textContent = leaves[Math.floor(Math.random() * leaves.length)];
      Object.assign(p.style, {
        position: "absolute",
        left: `${x}px`,
        top: "-30px",
        fontSize: `${14 + Math.random() * 14}px`,
        opacity: "0.9",
        transition: `all ${dur}s ease-in ${delay}s`,
        transform: "translateY(0) translateX(0) rotate(0deg)",
      });
      container.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translateY(${window.innerHeight + 30}px) translateX(${drift}px) rotate(${spin}deg)`;
        p.style.opacity = "0";
      });
    } else {
      const x = Math.random() * window.innerWidth;
      const delay = Math.random() * 2;
      const dur = 2.5 + Math.random() * 2;
      const drift = -30 + Math.random() * 60;
      Object.assign(p.style, {
        position: "absolute",
        left: `${x}px`,
        top: "-10px",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "#fff",
        opacity: "0.8",
        transition: `all ${dur}s linear ${delay}s`,
        transform: "translateY(0) translateX(0)",
      });
      container.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translateY(${window.innerHeight + 20}px) translateX(${drift}px)`;
        p.style.opacity = "0.3";
      });
    }
  }

  setTimeout(() => container.remove(), type === "snow" || type === "leaves" ? 8000 : type === "light" || type === "seagulls" ? 7000 : 3000);
}

const slides = [
  {
    image: "/content-catalog.webp",
    alt: "Campfire content catalog showing 50+ leadership workshop topics with illustrated cards",
    label: "Content",
    headline: "40+ ready-to-run sessions across every leadership challenge",
    description:
      "From giving feedback to strategic thinking to managing change\u2014our library covers the topics your leaders face every day. Mix and match, or let us build something custom.",
    cta: "See Full Library",
    ctaHref: "https://tools.getcampfire.com/courses",
  },
  {
    image: "/product-screen-shadow.webp",
    alt: "Campfire live session platform showing participants in a facilitated workshop",
    label: "Experience",
    headline: "Live, interactive sessions on a purpose-built platform",
    description:
      "Every Campfire workshop is delivered live with expert facilitation, breakout discussions, journaling, and real-time collaboration\u2014designed to keep every participant engaged and connected.",
    cta: "Explore Campfire",
    ctaHref: "https://meet.getcampfire.com/",
  },
  {
    image: "/analytics.webp",
    alt: "Campfire analytics and reporting dashboard showing participation and engagement data",
    label: "Insights",
    headline: "Analytics and reporting that prove impact",
    description:
      "Track participation, engagement, and satisfaction across your organization. See which sessions resonate most, monitor completion rates, and share results with leadership\u2014all in one dashboard.",
    cta: "Explore Campfire",
    ctaHref: "https://meet.getcampfire.com/",
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const s = slides[active];

  return (
    <section className="py-20 bg-[#1C1334]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            See the magic of <span className="text-[#6E3FCC]">Campfire</span>
          </h2>
          <p className="mt-4 text-xl text-white/80">
            A purpose-built platform and curated content library designed to
            support your leaders and amplify your impact.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2fr]">
            {/* Left: Text + navigation */}
            <div
              className="p-8 md:px-10 flex flex-col justify-between"
              style={{ backgroundColor: "#403955", paddingTop: "calc(3.5rem + 25px)", paddingBottom: "calc(3.5rem + 25px)" }}
            >
              <div>
                <p className="text-sm font-semibold tracking-wider uppercase mb-4 mt-6" style={{ color: "#9D88ED" }}>
                  {s.label}
                </p>
                <h3 className="text-3xl md:text-[2.2rem] font-bold text-white leading-[1.09]" style={{ maxWidth: "340px" }}>
                  {s.headline}
                </h3>
                <p className="mt-4 text-white/70 text-base leading-relaxed" style={{ maxWidth: "340px" }}>
                  {s.description}
                </p>
              </div>

              {/* Carousel navigation — centered */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() =>
                    setActive(
                      (active - 1 + slides.length) % slides.length
                    )
                  }
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
                  style={{ borderColor: "#9D88ED40", color: "#9D88ED" }}
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M10 3L5 8L10 13"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className="w-2.5 h-2.5 rounded-full transition-all"
                      style={{
                        backgroundColor: i === active ? "#9D88ED" : "rgba(157, 136, 237, 0.3)",
                      }}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setActive((active + 1) % slides.length)
                  }
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
                  style={{ borderColor: "#9D88ED40", color: "#9D88ED" }}
                  aria-label="Next slide"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M6 3L11 8L6 13"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: Image */}
            <div
              className="relative flex flex-col p-6 md:px-8"
              style={{ backgroundColor: "#2f2745", paddingTop: "calc(3rem + 25px)", paddingBottom: "calc(3rem + 25px)" }}
            >
              <div className="grid w-full flex-1">
                {slides.map((slide, i) => (
                  <div
                    key={slide.label}
                    className="col-start-1 row-start-1 transition-opacity duration-500 ease-in-out relative"
                    style={{
                      opacity: i === active ? 1 : 0,
                      pointerEvents: i === active ? "auto" : "none",
                    }}
                    aria-hidden={i !== active}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      width={1600}
                      height={900}
                      className="w-full h-auto object-contain rounded-lg"
                      priority={i === 0}
                    />
                    {i === 0 && (
                      <>
                        {/* Top-left → sand */}
                        <button
                          className="absolute cursor-pointer"
                          style={{ left: "0%", top: "0%", width: "25%", height: "25%", background: "transparent", border: "none" }}
                          aria-label="Hidden easter egg"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, "sand");
                          }}
                        />
                        {/* Col 2, row 2 → heavenly light */}
                        <button
                          className="absolute cursor-pointer"
                          style={{ left: "25%", top: "25%", width: "25%", height: "25%", background: "transparent", border: "none" }}
                          aria-label="Hidden easter egg"
                          onClick={() => {
                            spawnParticles(0, 0, "light");
                          }}
                        />
                        {/* Top row, third → autumn leaves */}
                        <button
                          className="absolute cursor-pointer"
                          style={{ left: "50%", top: "0%", width: "25%", height: "25%", background: "transparent", border: "none" }}
                          aria-label="Hidden easter egg"
                          onClick={() => {
                            spawnParticles(0, 0, "leaves");
                          }}
                        />
                        {/* Top row, fourth → seagulls */}
                        <button
                          className="absolute cursor-pointer"
                          style={{ left: "75%", top: "0%", width: "25%", height: "25%", background: "transparent", border: "none" }}
                          aria-label="Hidden easter egg"
                          onClick={(e) => {
                            // Position seagulls just above the player container
                            const playerContainer = e.currentTarget.closest("[class*='rounded-2xl']")?.parentElement?.closest("[class*='rounded-2xl']");
                            const y = playerContainer ? playerContainer.getBoundingClientRect().top - 10 : e.currentTarget.getBoundingClientRect().top - 40;
                            spawnParticles(0, y, "seagulls");
                          }}
                        />
                        {/* Right col, second row → embers */}
                        <button
                          className="absolute cursor-pointer"
                          style={{ left: "75%", top: "25%", width: "25%", height: "25%", background: "transparent", border: "none" }}
                          aria-label="Hidden easter egg"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, "embers");
                          }}
                        />
                        {/* Bottom-left → snow */}
                        <button
                          className="absolute cursor-pointer"
                          style={{ left: "0%", top: "75%", width: "25%", height: "25%", background: "transparent", border: "none" }}
                          aria-label="Hidden easter egg"
                          onClick={(e) => {
                            spawnParticles(0, 0, "snow");
                          }}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA inside the right panel */}
              <div className="text-center mt-6">
                <a
                  href={s.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-7 py-3.5 text-sm font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
                >
                  {s.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
