"use client";

import { useState } from "react";
import Image from "next/image";

const analyticsSvg = (
  <svg
    viewBox="0 0 1200 600"
    className="w-full h-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="1200" height="600" fill="white" />
    {/* Header bar */}
    <rect x="0" y="0" width="1200" height="50" fill="#6E3FCC" opacity="0.06" />
    <circle cx="30" cy="25" r="8" fill="#6E3FCC" opacity="0.15" />
    <rect x="50" y="18" width="80" height="14" rx="4" fill="#6E3FCC" opacity="0.12" />
    <rect x="150" y="18" width="60" height="14" rx="4" fill="#6E3FCC" opacity="0.06" />
    <rect x="230" y="18" width="70" height="14" rx="4" fill="#6E3FCC" opacity="0.06" />
    <text x="600" y="30" fontSize="14" fill="#6E3FCC" opacity="0.25" fontFamily="sans-serif" fontWeight="600" textAnchor="middle">ANALYTICS &amp; REPORTING</text>

    {/* Sidebar */}
    <rect x="0" y="50" width="200" height="550" fill="#6E3FCC" opacity="0.03" />
    <line x1="200" y1="50" x2="200" y2="600" stroke="#6E3FCC" strokeWidth="1" opacity="0.08" />
    <rect x="20" y="75" width="120" height="10" rx="3" fill="#6E3FCC" opacity="0.12" />
    <rect x="20" y="100" width="100" height="10" rx="3" fill="#6E3FCC" opacity="0.06" />
    <rect x="20" y="125" width="110" height="10" rx="3" fill="#6E3FCC" opacity="0.06" />
    <rect x="20" y="150" width="90" height="10" rx="3" fill="#6E3FCC" opacity="0.06" />
    <rect x="20" y="175" width="105" height="10" rx="3" fill="#6E3FCC" opacity="0.06" />
    <rect x="15" y="210" width="170" height="1" fill="#6E3FCC" opacity="0.08" />
    <rect x="20" y="230" width="80" height="8" rx="3" fill="#6E3FCC" opacity="0.1" />
    <rect x="20" y="252" width="140" height="10" rx="3" fill="#6E3FCC" opacity="0.06" />
    <rect x="20" y="277" width="120" height="10" rx="3" fill="#6E3FCC" opacity="0.06" />

    {/* KPI Cards Row */}
    <rect x="230" y="70" width="220" height="100" rx="10" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.15" />
    <text x="260" y="100" fontSize="11" fill="#6E3FCC" opacity="0.3" fontFamily="sans-serif" fontWeight="600">SESSIONS COMPLETED</text>
    <text x="260" y="140" fontSize="32" fill="#6E3FCC" opacity="0.5" fontFamily="sans-serif" fontWeight="700">247</text>
    <rect x="370" y="130" width="60" height="20" rx="6" fill="#6E3FCC" opacity="0.08" />
    <text x="386" y="144" fontSize="10" fill="#6E3FCC" opacity="0.3" fontFamily="sans-serif">+18%</text>

    <rect x="475" y="70" width="220" height="100" rx="10" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.15" />
    <text x="505" y="100" fontSize="11" fill="#6E3FCC" opacity="0.3" fontFamily="sans-serif" fontWeight="600">LEADERS ACTIVE</text>
    <text x="505" y="140" fontSize="32" fill="#6E3FCC" opacity="0.5" fontFamily="sans-serif" fontWeight="700">142</text>
    <rect x="615" y="130" width="60" height="20" rx="6" fill="#6E3FCC" opacity="0.08" />
    <text x="631" y="144" fontSize="10" fill="#6E3FCC" opacity="0.3" fontFamily="sans-serif">+24%</text>

    <rect x="720" y="70" width="220" height="100" rx="10" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.15" />
    <text x="750" y="100" fontSize="11" fill="#6E3FCC" opacity="0.3" fontFamily="sans-serif" fontWeight="600">AVG. SATISFACTION</text>
    <text x="750" y="140" fontSize="32" fill="#6E3FCC" opacity="0.5" fontFamily="sans-serif" fontWeight="700">4.8/5</text>

    <rect x="965" y="70" width="210" height="100" rx="10" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.15" />
    <text x="995" y="100" fontSize="11" fill="#6E3FCC" opacity="0.3" fontFamily="sans-serif" fontWeight="600">COMPLETION RATE</text>
    <text x="995" y="140" fontSize="32" fill="#6E3FCC" opacity="0.5" fontFamily="sans-serif" fontWeight="700">94%</text>

    {/* Main chart area */}
    <rect x="230" y="195" width="500" height="280" rx="10" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.12" />
    <text x="260" y="225" fontSize="12" fill="#6E3FCC" opacity="0.3" fontFamily="sans-serif" fontWeight="600">ENGAGEMENT OVER TIME</text>
    {/* Y-axis labels */}
    <text x="250" y="270" fontSize="9" fill="#6E3FCC" opacity="0.2" fontFamily="sans-serif">100</text>
    <text x="255" y="330" fontSize="9" fill="#6E3FCC" opacity="0.2" fontFamily="sans-serif">50</text>
    <text x="260" y="390" fontSize="9" fill="#6E3FCC" opacity="0.2" fontFamily="sans-serif">0</text>
    {/* Grid lines */}
    <line x1="275" y1="265" x2="710" y2="265" stroke="#6E3FCC" strokeWidth="0.5" opacity="0.06" />
    <line x1="275" y1="325" x2="710" y2="325" stroke="#6E3FCC" strokeWidth="0.5" opacity="0.06" />
    <line x1="275" y1="385" x2="710" y2="385" stroke="#6E3FCC" strokeWidth="0.5" opacity="0.06" />
    {/* Chart line */}
    <path d="M280 370 C320 360 350 340 390 310 C430 280 460 290 500 260 C540 230 570 250 610 240 C650 230 680 245 700 235" stroke="#6E3FCC" strokeWidth="2.5" opacity="0.4" fill="none" strokeLinecap="round" />
    <path d="M280 370 C320 360 350 340 390 310 C430 280 460 290 500 260 C540 230 570 250 610 240 C650 230 680 245 700 235 L700 390 L280 390 Z" fill="#6E3FCC" opacity="0.04" />
    {/* Data points */}
    <circle cx="390" cy="310" r="4" fill="#6E3FCC" opacity="0.3" />
    <circle cx="500" cy="260" r="4" fill="#6E3FCC" opacity="0.3" />
    <circle cx="610" cy="240" r="4" fill="#6E3FCC" opacity="0.3" />
    <circle cx="700" cy="235" r="4" fill="#6E3FCC" opacity="0.5" />
    {/* X-axis labels */}
    <text x="300" y="420" fontSize="9" fill="#6E3FCC" opacity="0.2" fontFamily="sans-serif">Jan</text>
    <text x="400" y="420" fontSize="9" fill="#6E3FCC" opacity="0.2" fontFamily="sans-serif">Mar</text>
    <text x="500" y="420" fontSize="9" fill="#6E3FCC" opacity="0.2" fontFamily="sans-serif">May</text>
    <text x="600" y="420" fontSize="9" fill="#6E3FCC" opacity="0.2" fontFamily="sans-serif">Jul</text>
    <text x="690" y="420" fontSize="9" fill="#6E3FCC" opacity="0.2" fontFamily="sans-serif">Sep</text>
    {/* Legend */}
    <rect x="260" y="440" width="8" height="8" rx="2" fill="#6E3FCC" opacity="0.3" />
    <text x="275" y="448" fontSize="10" fill="#6E3FCC" opacity="0.25" fontFamily="sans-serif">Engagement Score</text>

    {/* Right side: Leaderboard / top topics */}
    <rect x="755" y="195" width="420" height="130" rx="10" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.12" />
    <text x="785" y="225" fontSize="12" fill="#6E3FCC" opacity="0.3" fontFamily="sans-serif" fontWeight="600">TOP SESSIONS</text>
    <rect x="785" y="240" width="180" height="10" rx="3" fill="#6E3FCC" opacity="0.2" />
    <rect x="785" y="260" width="140" height="10" rx="3" fill="#6E3FCC" opacity="0.15" />
    <rect x="785" y="280" width="110" height="10" rx="3" fill="#6E3FCC" opacity="0.1" />
    <rect x="785" y="300" width="80" height="10" rx="3" fill="#6E3FCC" opacity="0.07" />
    <text x="1000" y="250" fontSize="10" fill="#6E3FCC" opacity="0.25" fontFamily="sans-serif">Difficult Conversations</text>
    <text x="1000" y="270" fontSize="10" fill="#6E3FCC" opacity="0.25" fontFamily="sans-serif">Giving Feedback</text>
    <text x="1000" y="290" fontSize="10" fill="#6E3FCC" opacity="0.25" fontFamily="sans-serif">Leading Change</text>
    <text x="1000" y="310" fontSize="10" fill="#6E3FCC" opacity="0.25" fontFamily="sans-serif">Team Alignment</text>

    {/* Bottom right: Donut chart */}
    <rect x="755" y="345" width="420" height="130" rx="10" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.12" />
    <text x="785" y="375" fontSize="12" fill="#6E3FCC" opacity="0.3" fontFamily="sans-serif" fontWeight="600">PARTICIPATION BY LEVEL</text>
    <circle cx="860" cy="420" r="35" stroke="#6E3FCC" strokeWidth="8" opacity="0.15" fill="none" />
    <circle cx="860" cy="420" r="35" stroke="#6E3FCC" strokeWidth="8" opacity="0.4" fill="none" strokeDasharray="80 140" strokeDashoffset="0" />
    <circle cx="860" cy="420" r="35" stroke="#6E3FCC" strokeWidth="8" opacity="0.25" fill="none" strokeDasharray="45 175" strokeDashoffset="-80" />
    <rect x="930" y="398" width="8" height="8" rx="2" fill="#6E3FCC" opacity="0.4" />
    <text x="945" y="406" fontSize="10" fill="#6E3FCC" opacity="0.25" fontFamily="sans-serif">Managers (56%)</text>
    <rect x="930" y="418" width="8" height="8" rx="2" fill="#6E3FCC" opacity="0.25" />
    <text x="945" y="426" fontSize="10" fill="#6E3FCC" opacity="0.25" fontFamily="sans-serif">Directors (27%)</text>
    <rect x="930" y="438" width="8" height="8" rx="2" fill="#6E3FCC" opacity="0.15" />
    <text x="945" y="446" fontSize="10" fill="#6E3FCC" opacity="0.25" fontFamily="sans-serif">VPs & Above (17%)</text>

    {/* Bottom bar */}
    <rect x="230" y="500" width="945" height="70" rx="10" stroke="#6E3FCC" strokeWidth="1" opacity="0.08" />
    <text x="260" y="530" fontSize="11" fill="#6E3FCC" opacity="0.25" fontFamily="sans-serif" fontWeight="600">RECENT ACTIVITY</text>
    <rect x="260" y="545" width="300" height="8" rx="3" fill="#6E3FCC" opacity="0.06" />
    <rect x="600" y="545" width="250" height="8" rx="3" fill="#6E3FCC" opacity="0.06" />
    <rect x="900" y="545" width="200" height="8" rx="3" fill="#6E3FCC" opacity="0.06" />
  </svg>
);

const slides = [
  {
    image: "/content.png",
    alt: "Campfire content library showing 40+ leadership workshop topics",
    label: "The Content",
    headline: "40+ ready-to-run sessions across every leadership challenge",
    description:
      "From giving feedback to strategic thinking to managing change\u2014our library covers the topics your leaders face every day. Mix and match, or let us build something custom.",
    isImage: true,
  },
  {
    image: "/campfire visual.png",
    alt: "Campfire live session platform showing participants in a workshop",
    label: "The Experience",
    headline: "Live, interactive sessions on a purpose-built platform",
    description:
      "Every Campfire workshop is delivered live with expert facilitation, breakout discussions, journaling, and real-time collaboration\u2014designed to keep every participant engaged and connected.",
    isImage: true,
  },
  {
    image: "",
    alt: "Campfire analytics and reporting dashboard",
    label: "The Insights",
    headline: "Analytics and reporting that prove impact",
    description:
      "Track participation, engagement, and satisfaction across your organization. See which sessions resonate most, monitor completion rates, and share results with leadership\u2014all in one dashboard.",
    isImage: false,
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const s = slides[active];

  return (
    <section className="py-20 bg-[#F5F4F1]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            See what{" "}
            <span className="text-[#6E3FCC]">Campfire looks like</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            A purpose-built platform and curated content library designed for
            live leadership development.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          {/* Image area */}
          <div className="relative bg-white">
            <div className="grid">
              {slides.map((slide, i) => (
                <div
                  key={slide.label}
                  className="col-start-1 row-start-1 transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: i === active ? 1 : 0,
                    pointerEvents: i === active ? "auto" : "none",
                  }}
                  aria-hidden={i !== active}
                >
                  {slide.isImage ? (
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      width={1200}
                      height={600}
                      className="w-full h-auto object-contain"
                      priority={i === 0}
                    />
                  ) : (
                    <div className="p-4 md:p-8">{analyticsSvg}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Caption area */}
          <div className="p-8 md:p-10 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#6E3FCC] tracking-wider uppercase mb-2">
                  {s.label}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                  {s.headline}
                </h3>
                <p className="mt-3 text-gray-500 text-sm leading-relaxed max-w-xl">
                  {s.description}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4 md:pt-2 shrink-0">
                <button
                  onClick={() =>
                    setActive(
                      (active - 1 + slides.length) % slides.length
                    )
                  }
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#6E3FCC] hover:border-[#6E3FCC]/30 transition-colors"
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
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === active
                          ? "bg-[#6E3FCC] scale-110"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setActive((active + 1) % slides.length)
                  }
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#6E3FCC] hover:border-[#6E3FCC]/30 transition-colors"
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
          </div>
        </div>
      </div>
    </section>
  );
}
