import Image from "next/image";
import Link from "next/link";
import TestimonialCarousel from "./components/TestimonialCarousel";
import ProductShowcase from "./components/ProductShowcase";
import SessionWalkthrough from "./components/SessionWalkthrough";

export default function Home() {
  return (
    <main>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-white">
        {/* Full-width topographic wave background */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <svg
            viewBox="0 0 1440 900"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="wave1" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6E3FCC" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#7E52D6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#9A7ADE" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="wave2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7E52D6" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#9A7ADE" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#BCA8E8" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="wave3" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9A7ADE" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#BCA8E8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#D6CDF0" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="wave4" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#BCA8E8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#EBE6F6" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="wave5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7E52D6" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#8F65D9" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#D946EF" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path className="wave-layer-1" d="M-100,900 L-100,750 C100,680 300,620 500,650 C700,680 850,580 1050,520 C1250,460 1350,380 1540,350 L1540,900 Z" fill="url(#wave1)" />
            <path className="wave-layer-2" d="M-100,900 L-100,800 C150,740 350,700 550,720 C750,740 900,640 1100,590 C1300,540 1400,470 1540,430 L1540,900 Z" fill="url(#wave2)" />
            <path className="wave-layer-3" d="M-100,900 L-100,830 C200,790 380,770 580,790 C780,810 950,710 1150,660 C1350,610 1420,550 1540,520 L1540,900 Z" fill="url(#wave3)" />
            <path className="wave-layer-4" d="M-100,900 L-100,860 C250,830 450,830 650,845 C850,860 1000,780 1200,740 C1400,700 1460,650 1540,620 L1540,900 Z" fill="url(#wave4)" />
            <path className="wave-layer-5" d="M-100,900 L-100,820 C50,790 200,760 400,770 C600,780 750,700 950,660 C1150,620 1300,540 1540,490 L1540,900 Z" fill="url(#wave5)" opacity="0.15" />
            <path className="topo-line-1" d="M-50,780 C150,720 350,690 550,710 C750,730 900,640 1100,590 C1300,540 1450,480 1500,460" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <path className="topo-line-2" d="M-50,750 C180,690 380,660 560,680 C740,700 920,610 1120,560 C1320,510 1460,450 1500,430" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
            <path className="topo-line-3" d="M-50,720 C200,660 400,640 580,655 C760,670 940,580 1140,535 C1340,490 1470,430 1500,410" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <path className="topo-line-4" d="M-50,690 C220,630 420,615 600,628 C780,641 960,555 1160,510 C1360,465 1480,410 1500,390" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <path className="topo-line-5" d="M-50,660 C240,605 440,590 620,600 C800,610 980,530 1180,488 C1380,446 1490,395 1500,375" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            <path className="topo-line-3" d="M400,620 C550,590 700,560 850,540 C1000,520 1150,470 1300,430 C1400,405 1500,380 1540,370" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <path className="topo-line-1" d="M500,580 C650,555 780,530 920,510 C1060,490 1200,445 1350,410 C1430,393 1500,370 1540,355" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
            <circle cx="1180" cy="530" r="5" fill="rgba(255,255,255,0.3)" />
            <circle cx="1180" cy="530" r="2" fill="rgba(255,255,255,0.6)" />
            <circle cx="920" cy="620" r="4" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-28 pb-16 w-full">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Text */}
            <div className="flex-1 max-w-xl">
              <p className="text-sm font-semibold text-[#6E3FCC] tracking-wide uppercase mb-4">
                For HR and Talent Development Leaders
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Build Better Leaders
                <br />
                <span className="text-[#6E3FCC]">&mdash;Your Way, at Scale</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg">
                Your managers need support. Your team is stretched thin.
                Campfire was built for both.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/solutions"
                  className="px-7 py-3.5 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors"
                >
                  Explore Solutions
                </Link>
                <Link
                  href="/contact"
                  className="px-7 py-3.5 text-sm font-semibold text-[#6E3FCC] border-2 border-[#6E3FCC] rounded-lg hover:bg-[#6E3FCC]/5 transition-colors"
                >
                  Talk to Us
                </Link>
              </div>
            </div>

            {/* Hero illustration — Heroku-style wireframe */}
            <div className="flex-1 hidden md:block max-w-lg">
              <svg viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                {/* ---- BACK LAYER: Admin Dashboard ---- */}
                <g transform="translate(80, 0)">
                  <rect x="0" y="0" width="340" height="240" rx="8" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.3" />
                  <line x1="0" y1="28" x2="340" y2="28" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                  <circle cx="16" cy="14" r="4" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.3" />
                  <circle cx="30" cy="14" r="4" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.3" />
                  <circle cx="44" cy="14" r="4" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.3" />
                  <rect x="70" y="8" width="50" height="12" rx="3" fill="#6E3FCC" opacity="0.12" />
                  <rect x="128" y="8" width="50" height="12" rx="3" fill="#6E3FCC" opacity="0.06" />
                  <rect x="0" y="28" width="80" height="212" fill="#6E3FCC" opacity="0.04" />
                  <line x1="80" y1="28" x2="80" y2="240" stroke="#6E3FCC" strokeWidth="1" opacity="0.1" />
                  <rect x="12" y="44" width="56" height="8" rx="3" fill="#6E3FCC" opacity="0.15" />
                  <rect x="12" y="62" width="48" height="8" rx="3" fill="#6E3FCC" opacity="0.08" />
                  <rect x="12" y="80" width="52" height="8" rx="3" fill="#6E3FCC" opacity="0.08" />
                  <rect x="12" y="98" width="40" height="8" rx="3" fill="#6E3FCC" opacity="0.08" />
                  <text x="96" y="48" fontSize="7" fill="#6E3FCC" opacity="0.3" fontFamily="sans-serif" fontWeight="600">PROGRAM SCHEDULE</text>
                  <rect x="96" y="58" width="228" height="28" rx="4" stroke="#6E3FCC" strokeWidth="1" opacity="0.12" />
                  <circle cx="112" cy="72" r="6" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                  <rect x="124" y="66" width="70" height="5" rx="2" fill="#6E3FCC" opacity="0.12" />
                  <rect x="124" y="75" width="45" height="4" rx="2" fill="#6E3FCC" opacity="0.06" />
                  <rect x="270" y="66" width="40" height="12" rx="4" fill="#6E3FCC" opacity="0.1" />
                  <rect x="96" y="92" width="228" height="28" rx="4" stroke="#6E3FCC" strokeWidth="1" opacity="0.12" />
                  <circle cx="112" cy="106" r="6" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                  <rect x="124" y="100" width="80" height="5" rx="2" fill="#6E3FCC" opacity="0.12" />
                  <rect x="124" y="109" width="55" height="4" rx="2" fill="#6E3FCC" opacity="0.06" />
                  <rect x="270" y="100" width="40" height="12" rx="4" fill="#6E3FCC" opacity="0.15" />
                  <rect x="96" y="126" width="228" height="28" rx="4" stroke="#6E3FCC" strokeWidth="1" opacity="0.12" />
                  <circle cx="112" cy="140" r="6" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                  <rect x="124" y="134" width="65" height="5" rx="2" fill="#6E3FCC" opacity="0.12" />
                  <rect x="124" y="143" width="50" height="4" rx="2" fill="#6E3FCC" opacity="0.06" />
                  <rect x="270" y="134" width="40" height="12" rx="4" fill="#6E3FCC" opacity="0.1" />
                  <rect x="96" y="170" width="68" height="52" rx="6" stroke="#6E3FCC" strokeWidth="1" opacity="0.1" />
                  <rect x="106" y="182" width="30" height="6" rx="2" fill="#6E3FCC" opacity="0.2" />
                  <rect x="106" y="196" width="48" height="4" rx="2" fill="#6E3FCC" opacity="0.06" />
                  <rect x="106" y="206" width="36" height="4" rx="2" fill="#6E3FCC" opacity="0.06" />
                  <rect x="176" y="170" width="68" height="52" rx="6" stroke="#6E3FCC" strokeWidth="1" opacity="0.1" />
                  <rect x="186" y="182" width="24" height="6" rx="2" fill="#6E3FCC" opacity="0.15" />
                  <rect x="186" y="196" width="48" height="4" rx="2" fill="#6E3FCC" opacity="0.06" />
                  <rect x="186" y="206" width="40" height="4" rx="2" fill="#6E3FCC" opacity="0.06" />
                  <rect x="256" y="170" width="68" height="52" rx="6" stroke="#6E3FCC" strokeWidth="1" opacity="0.1" />
                  <rect x="266" y="182" width="36" height="6" rx="2" fill="#6E3FCC" opacity="0.25" />
                  <rect x="266" y="196" width="48" height="4" rx="2" fill="#6E3FCC" opacity="0.06" />
                  <rect x="266" y="206" width="32" height="4" rx="2" fill="#6E3FCC" opacity="0.06" />
                </g>
                {/* ---- MIDDLE LAYER: Live Workshop / Video ---- */}
                <g transform="translate(0, 130)">
                  <rect x="0" y="0" width="260" height="185" rx="8" fill="white" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.5" />
                  <rect x="0" y="0" width="260" height="185" rx="8" fill="white" />
                  <rect x="0" y="0" width="260" height="185" rx="8" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.4" />
                  <rect x="0" y="0" width="260" height="24" rx="8" fill="#6E3FCC" opacity="0.08" />
                  <rect x="0" y="12" width="260" height="12" fill="#6E3FCC" opacity="0.08" />
                  <circle cx="16" cy="12" r="4" fill="#6E3FCC" opacity="0.5" />
                  <rect x="26" y="8" width="28" height="8" rx="3" fill="#6E3FCC" opacity="0.15" />
                  <rect x="70" y="8" width="100" height="7" rx="2" fill="#6E3FCC" opacity="0.15" />
                  <rect x="12" y="32" width="148" height="100" rx="6" fill="#6E3FCC" opacity="0.06" />
                  <circle cx="86" cy="68" r="16" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.25" />
                  <path d="M66 100 Q76 88 86 85 Q96 88 106 100" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.2" fill="none" />
                  <rect x="24" y="108" width="50" height="16" rx="3" stroke="#6E3FCC" strokeWidth="0.8" opacity="0.15" />
                  <rect x="28" y="112" width="30" height="3" rx="1" fill="#6E3FCC" opacity="0.1" />
                  <rect x="28" y="118" width="40" height="3" rx="1" fill="#6E3FCC" opacity="0.06" />
                  <rect x="170" y="32" width="78" height="46" rx="4" fill="#6E3FCC" opacity="0.05" />
                  <circle cx="193" cy="48" r="8" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                  <rect x="185" y="60" width="16" height="3" rx="1" fill="#6E3FCC" opacity="0.1" />
                  <circle cx="233" cy="48" r="8" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                  <rect x="225" y="60" width="16" height="3" rx="1" fill="#6E3FCC" opacity="0.1" />
                  <rect x="170" y="84" width="78" height="46" rx="4" fill="#6E3FCC" opacity="0.05" />
                  <circle cx="193" cy="100" r="8" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                  <rect x="185" y="112" width="16" height="3" rx="1" fill="#6E3FCC" opacity="0.1" />
                  <circle cx="233" cy="100" r="8" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                  <rect x="225" y="112" width="16" height="3" rx="1" fill="#6E3FCC" opacity="0.1" />
                  <line x1="12" y1="142" x2="248" y2="142" stroke="#6E3FCC" strokeWidth="0.8" opacity="0.1" />
                  <rect x="100" y="150" width="16" height="22" rx="8" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                  <rect x="124" y="153" width="18" height="14" rx="3" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                  <circle cx="133" cy="160" r="4" stroke="#6E3FCC" strokeWidth="0.8" opacity="0.15" />
                  <rect x="150" y="152" width="16" height="14" rx="3" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                  <rect x="154" y="156" width="8" height="2" rx="1" fill="#6E3FCC" opacity="0.1" />
                  <rect x="154" y="160" width="6" height="2" rx="1" fill="#6E3FCC" opacity="0.1" />
                </g>
                {/* ---- FRONT LAYER: Content Library Cards ---- */}
                <g transform="translate(280, 200)">
                  <rect x="0" y="0" width="220" height="200" rx="8" fill="white" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.5" />
                  <rect x="0" y="0" width="220" height="200" rx="8" fill="white" />
                  <rect x="0" y="0" width="220" height="200" rx="8" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.4" />
                  <text x="16" y="24" fontSize="7" fill="#6E3FCC" opacity="0.35" fontFamily="sans-serif" fontWeight="600">CONTENT LIBRARY</text>
                  <rect x="160" y="12" width="44" height="16" rx="4" stroke="#6E3FCC" strokeWidth="1" opacity="0.15" />
                  <rect x="168" y="18" width="28" height="4" rx="2" fill="#6E3FCC" opacity="0.1" />
                  <rect x="14" y="38" width="192" height="44" rx="6" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                  <rect x="24" y="46" width="10" height="10" rx="2" fill="#6E3FCC" opacity="0.2" />
                  <path d="M27 49 L27 54 L32 51.5 Z" fill="#6E3FCC" opacity="0.3" />
                  <rect x="42" y="46" width="90" height="5" rx="2" fill="#6E3FCC" opacity="0.15" />
                  <rect x="42" y="55" width="60" height="4" rx="2" fill="#6E3FCC" opacity="0.07" />
                  <rect x="42" y="63" width="50" height="10" rx="3" fill="#6E3FCC" opacity="0.08" />
                  <rect x="96" y="63" width="40" height="10" rx="3" fill="#6E3FCC" opacity="0.06" />
                  <rect x="168" y="48" width="28" height="14" rx="4" fill="#6E3FCC" opacity="0.12" />
                  <rect x="14" y="90" width="192" height="44" rx="6" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                  <rect x="24" y="98" width="10" height="10" rx="2" fill="#6E3FCC" opacity="0.2" />
                  <path d="M27 101 L27 106 L32 103.5 Z" fill="#6E3FCC" opacity="0.3" />
                  <rect x="42" y="98" width="80" height="5" rx="2" fill="#6E3FCC" opacity="0.15" />
                  <rect x="42" y="107" width="70" height="4" rx="2" fill="#6E3FCC" opacity="0.07" />
                  <rect x="42" y="115" width="44" height="10" rx="3" fill="#6E3FCC" opacity="0.08" />
                  <rect x="90" y="115" width="52" height="10" rx="3" fill="#6E3FCC" opacity="0.06" />
                  <rect x="168" y="100" width="28" height="14" rx="4" fill="#6E3FCC" opacity="0.12" />
                  <rect x="14" y="142" width="192" height="44" rx="6" stroke="#6E3FCC" strokeWidth="1" opacity="0.15" />
                  <rect x="24" y="150" width="10" height="10" rx="2" fill="#6E3FCC" opacity="0.15" />
                  <path d="M27 153 L27 158 L32 155.5 Z" fill="#6E3FCC" opacity="0.2" />
                  <rect x="42" y="150" width="95" height="5" rx="2" fill="#6E3FCC" opacity="0.12" />
                  <rect x="42" y="159" width="55" height="4" rx="2" fill="#6E3FCC" opacity="0.06" />
                  <rect x="42" y="167" width="56" height="10" rx="3" fill="#6E3FCC" opacity="0.06" />
                  <rect x="168" y="152" width="28" height="14" rx="4" fill="#6E3FCC" opacity="0.1" />
                </g>
                {/* ---- Decorative connection lines ---- */}
                <path d="M80 200 Q40 180 60 160" stroke="#6E3FCC" strokeWidth="1" opacity="0.12" fill="none" strokeDasharray="4 3" />
                <path d="M420 240 Q440 220 430 200" stroke="#6E3FCC" strokeWidth="1" opacity="0.12" fill="none" strokeDasharray="4 3" />
                <circle cx="270" cy="160" r="3" fill="#6E3FCC" opacity="0.15" />
                <circle cx="50" cy="110" r="2" fill="#6E3FCC" opacity="0.1" />
                <circle cx="510" cy="190" r="2.5" fill="#6E3FCC" opacity="0.12" />
              </svg>
            </div>
          </div>
        </div>

        {/* Logo bar — inside hero so waves flow behind it */}
        <div className="relative z-10 pb-10 pt-4 w-full">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-center text-xs font-bold text-white/80 tracking-wider uppercase mb-8">
              Trusted by teams at
            </p>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-y-8 gap-x-6 max-w-4xl mx-auto">
              {[
                { src: "/cotopaxi.png", alt: "Cotopaxi", w: 140, h: 50 },
                { src: "/cricut logo.png", alt: "Cricut", w: 120, h: 60 },
                { src: "/dermalogica.png", alt: "Dermalogica", w: 300, h: 40 },
                { src: "/plusgrade.png", alt: "Plusgrade", w: 200, h: 50 },
                { src: "/enveda.png", alt: "Enveda Biosciences", w: 180, h: 75 },
                { src: "/pdq.png", alt: "PDQ", w: 100, h: 65 },
              ].map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.w}
                    height={logo.h}
                    className="h-7 md:h-9 w-auto object-contain brightness-0 invert opacity-90"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DIFFERENTIATOR ==================== */}
      <section className="pt-16 pb-4 bg-white">
        <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider px-6">
          Not a content library. Not executive coaching. Live development that changes behavior.
        </p>
      </section>

      {/* ==================== WHAT IT IS ==================== */}
      <section className="pt-8 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Scale an{" "}
              <span className="text-[#6E3FCC]">Outcomes-Driven Culture</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Flexible content, scalable facilitation, and program
              support&mdash;designed to develop leaders at every level and adapt
              to your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Flexible Content",
                desc: "A curated library of practical, live leadership workshops you can mix, match, and customize to your needs.",
                icon: (
                  <svg className="w-10 h-10 mb-4" viewBox="0 0 40 40" fill="none">
                    <rect x="2" y="14" width="20" height="15" rx="3" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.2" />
                    <rect x="8" y="8" width="20" height="15" rx="3" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.4" />
                    <rect x="14" y="2" width="20" height="15" rx="3" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.7" fill="#6E3FCC" fillOpacity="0.05" />
                    <line x1="18" y1="6" x2="28" y2="6" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
                    <line x1="18" y1="10" x2="25" y2="10" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.25" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: "Scalable Facilitation",
                desc: "Expert facilitators\u2014or your trained leaders\u2014for delivering consistent, high-quality experiences across teams and geographies.",
                icon: (
                  <svg className="w-10 h-10 mb-4" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="12" r="5" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.6" />
                    <path d="M13 30 C13 22 16 18 20 18 C24 18 27 22 27 30" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.35" fill="none" />
                    <circle cx="7" cy="22" r="3.5" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.3" />
                    <circle cx="33" cy="22" r="3.5" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.3" />
                    <line x1="15" y1="15" x2="10" y2="19" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" strokeDasharray="2 2" />
                    <line x1="25" y1="15" x2="30" y2="19" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" strokeDasharray="2 2" />
                  </svg>
                ),
              },
              {
                title: "Program Support",
                desc: "End-to-end scheduling, coordination, tracking, and logistics to help lean talent teams run programs smoothly and scale with confidence.",
                icon: (
                  <svg className="w-10 h-10 mb-4" viewBox="0 0 40 40" fill="none">
                    <rect x="6" y="2" width="28" height="36" rx="4" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.4" />
                    <rect x="14" y="0" width="12" height="5" rx="2" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.6" fill="white" />
                    <path d="M13 15 L16 18 L22 12" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="13" y1="24" x2="27" y2="24" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.25" strokeLinecap="round" />
                    <line x1="13" y1="30" x2="23" y2="30" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-[#F5F4F1] rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow"
              >
                {card.icon}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center mt-10 text-sm text-gray-400">
            <span className="font-semibold text-gray-500">Built for:</span>{" "}
            HR leaders scaling leadership development{" "}
            <span className="text-gray-300 mx-1">&middot;</span>{" "}
            L&amp;D teams with lean headcount{" "}
            <span className="text-gray-300 mx-1">&middot;</span>{" "}
            Talent leaders building and shaping culture
          </p>

          <div className="text-center mt-6">
            <Link
              href="/solutions"
              className="inline-block px-7 py-3.5 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="py-20 bg-[#F5F4F1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Built to fit the rhythm of real work{" "}
              <span className="text-[#6E3FCC]">&mdash; and drive lasting change</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Campfire brings leadership development into everyday work through a
              simple, repeatable flow that scales across your organization.
            </p>
          </div>

          {/* Flow label */}
          <div className="flex items-center justify-center gap-3 mb-10 text-sm font-semibold text-[#6E3FCC]">
            <span>Content</span>
            <span className="text-gray-300">&rarr;</span>
            <span>Conversation</span>
            <span className="text-gray-300">&rarr;</span>
            <span>Application</span>
            <span className="text-gray-300">&rarr;</span>
            <span>Reinforcement</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Start with relevant content",
                desc: "You design your program by choosing the sessions your people need most.",
                color: "bg-[#A88AE0]",
              },
              {
                step: "02",
                title: "Bring it to life through conversation",
                desc: "Live, facilitated discussions create space for reflection, peer learning, and meaningful connection\u2014building shared language and perspective.",
                color: "bg-[#8F65D9]",
              },
              {
                step: "03",
                title: "Apply it in real work",
                desc: "Leaders put tools to use and practice new behaviors in meetings, one-on-ones, and day-to-day decisions\u2014where leadership actually shows up.",
                color: "bg-[#7E4FD0]",
              },
              {
                step: "04",
                title: "Reinforce over time",
                desc: "Skills are revisited and strengthened through ongoing experiences and resources to dive deeper, helping leadership behaviors stick and compound.",
                color: "bg-[#6E3FCC]",
              },
            ].map((item) => (
              <div key={item.step}>
                <div
                  className={`${item.color} text-white rounded-2xl p-8 h-full`}
                >
                  <span className="text-sm font-bold opacity-60">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-bold mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT SHOWCASE ==================== */}
      <ProductShowcase />

      {/* ==================== SESSION WALKTHROUGH ==================== */}
      <SessionWalkthrough />

      {/* ==================== PROOF ==================== */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#5B34AB] topo-pattern py-16">
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
              Results You Can Trust
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "6,000+", label: "Sessions delivered" },
                { number: "25+", label: "Years of experience" },
                { number: "250+", label: "Companies serviced" },
                { number: "10,000+", label: "Leaders supported" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl md:text-5xl font-bold text-white">
                    {stat.number}
                  </div>
                  <p className="mt-2 text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PULL QUOTE ==================== */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
            &ldquo;Our biggest priority right now is improving our front-line
            managers because that&apos;s the{" "}
            <span className="text-[#6E3FCC]">single biggest lever</span> we have in
            improving our results.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-gray-400">
            &mdash; CEO, 1,200-employee company
          </p>
        </div>
      </section>

      {/* ==================== TESTIMONIAL ==================== */}
      <TestimonialCarousel />

      {/* ==================== OUTCOMES ==================== */}
      <section className="py-20 bg-[#F8F5FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Impact You Can Feel
              <span className="text-[#6E3FCC]">&mdash;Company-Wide</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              When leaders make small shifts in everyday conversations,
              decisions, and behaviors, your entire organization benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Better conversations",
                desc: "Leaders communicate more clearly, listen more effectively, and navigate difficult conversations with confidence and care.",
              },
              {
                title: "Stronger alignment",
                desc: "Teams operate with shared language, clearer expectations, and better decision-making\u2014reducing friction and confusion.",
              },
              {
                title: "Healthier team dynamics",
                desc: "Trust increases, feedback improves, and people feel more supported, engaged, and accountable.",
              },
              {
                title: "More consistent leadership behaviors",
                desc: "Leadership expectations don\u2019t live in a slide deck. They show up in meetings, 1:1s, and everyday decisions across the organization.",
              },
              {
                title: "Improved performance and results",
                desc: "Clearer priorities, better execution, and stronger follow-through lead to measurable improvements in how teams perform.",
              },
            ].map((impact) => (
              <div
                key={impact.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {impact.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {impact.desc}
                </p>
              </div>
            ))}
            {/* Purple CTA card */}
            <div className="bg-[#6E3FCC] rounded-2xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  See it for yourself
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Learn how Campfire can help your leaders build these habits and
                  drive real results.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-block mt-6 px-6 py-3 text-sm font-semibold text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                Book a Call &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#5B34AB] topo-pattern py-20">
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to transform your people and culture?
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
              Schedule a conversation with us. You bring your goals and
              challenges, and we&apos;ll think with you about practical next
              steps.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 text-sm font-semibold text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Book a Call &rarr;
              </Link>
              <a
                href="https://tools.getcampfire.com/courses"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-sm font-semibold text-white/80 border-2 border-white/30 rounded-lg hover:border-white/60 hover:text-white transition-colors"
              >
                Explore Workshops
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section className="py-14 bg-[#F8F5FC]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <svg className="w-8 h-8 mx-auto mb-4" viewBox="0 0 32 32" fill="none">
            <path d="M16 4 C14 8 10 12 10 18 C10 22.4 12.7 26 16 26 C19.3 26 22 22.4 22 18 C22 12 18 8 16 4Z" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.5" fill="#6E3FCC" fillOpacity="0.06" />
            <path d="M16 10 C15 13 13 15 13 18.5 C13 20.7 14.3 22.5 16 22.5 C17.7 22.5 19 20.7 19 18.5 C19 15 17 13 16 10Z" fill="#6E3FCC" opacity="0.15" />
            <path d="M16 15 C15.4 16.5 14.5 17.5 14.5 19 C14.5 20.4 15.2 21.5 16 21.5 C16.8 21.5 17.5 20.4 17.5 19 C17.5 17.5 16.6 16.5 16 15Z" fill="#6E3FCC" opacity="0.3" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900">
            Leadership insights, delivered weekly
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Practical ideas for developing better leaders&mdash;straight to
            your inbox.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your work email"
              className="flex-1 px-4 py-3 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6E3FCC]/30 focus:border-[#6E3FCC]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-400">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ==================== HOW IT SHOWS UP ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Flexible formats that meet leaders{" "}
              <span className="text-[#6E3FCC]">where they are</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Campfire offers flexible format options that work across different
              teams, timelines, and goals. Organizations can start small or go
              broad, choosing the right mix for their people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Live virtual workshops",
                desc: "Interactive sessions focused on real leadership challenges, designed to build shared language, reflection, and practical skills leaders can use right away.",
                icon: (
                  <svg className="w-10 h-10 mb-4" viewBox="0 0 40 40" fill="none">
                    <rect x="4" y="6" width="32" height="22" rx="3" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.4" />
                    <line x1="4" y1="28" x2="36" y2="28" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.3" />
                    <rect x="15" y="28" width="10" height="4" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                    <circle cx="14" cy="16" r="3" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.5" />
                    <circle cx="26" cy="16" r="3" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.5" />
                    <circle cx="20" cy="22" r="1.5" fill="#6E3FCC" opacity="0.3" />
                    <line x1="16" y1="19" x2="18" y2="21" stroke="#6E3FCC" strokeWidth="0.8" opacity="0.25" strokeDasharray="1.5 1.5" />
                    <line x1="24" y1="19" x2="22" y2="21" stroke="#6E3FCC" strokeWidth="0.8" opacity="0.25" strokeDasharray="1.5 1.5" />
                  </svg>
                ),
              },
              {
                title: "Time-bound programs",
                desc: "Short series or focused initiatives that create structure and momentum, while still reinforcing skills beyond a defined start and end.",
                icon: (
                  <svg className="w-10 h-10 mb-4" viewBox="0 0 40 40" fill="none">
                    <line x1="6" y1="20" x2="34" y2="20" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.2" />
                    <circle cx="10" cy="20" r="3.5" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.35" />
                    <circle cx="20" cy="20" r="3.5" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.5" />
                    <circle cx="30" cy="20" r="3.5" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.65" fill="#6E3FCC" fillOpacity="0.08" />
                    <path d="M10 15 L10 12" stroke="#6E3FCC" strokeWidth="1" opacity="0.25" strokeLinecap="round" />
                    <rect x="6" y="8" width="8" height="4" rx="1.5" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                    <path d="M30 15 L30 12" stroke="#6E3FCC" strokeWidth="1" opacity="0.35" strokeLinecap="round" />
                    <rect x="26" y="8" width="8" height="4" rx="1.5" stroke="#6E3FCC" strokeWidth="1" opacity="0.3" />
                    <path d="M30 21.5 L31 20 L29 20 Z" fill="#6E3FCC" opacity="0.5" />
                  </svg>
                ),
              },
              {
                title: "Cohorts",
                desc: "Small-group experiences that connect leaders facing similar challenges, creating space for peer learning, accountability, and deeper conversation.",
                icon: (
                  <svg className="w-10 h-10 mb-4" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="10" r="3" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.45" />
                    <circle cx="10" cy="24" r="3" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.45" />
                    <circle cx="30" cy="24" r="3" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.45" />
                    <circle cx="14" cy="34" r="3" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.45" />
                    <circle cx="26" cy="34" r="3" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.45" />
                    <line x1="17" y1="12" x2="12" y2="22" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                    <line x1="23" y1="12" x2="28" y2="22" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                    <line x1="12" y1="27" x2="14" y2="31" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                    <line x1="28" y1="27" x2="26" y2="31" stroke="#6E3FCC" strokeWidth="1" opacity="0.2" />
                    <line x1="13" y1="24" x2="27" y2="24" stroke="#6E3FCC" strokeWidth="1" opacity="0.15" strokeDasharray="2 2" />
                  </svg>
                ),
              },
              {
                title: "Offsites and gatherings",
                desc: "High-impact moments for alignment, connection, and culture-building\u2014designed to create momentum that carries into everyday work.",
                icon: (
                  <svg className="w-10 h-10 mb-4" viewBox="0 0 40 40" fill="none">
                    <path d="M8 32 L20 10 L32 32 Z" stroke="#6E3FCC" strokeWidth="1.5" opacity="0.3" fill="none" />
                    <path d="M14 32 L20 16 L26 32" stroke="#6E3FCC" strokeWidth="1" opacity="0.15" fill="none" />
                    <circle cx="12" cy="28" r="2.5" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.4" />
                    <circle cx="20" cy="26" r="2.5" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.4" />
                    <circle cx="28" cy="28" r="2.5" stroke="#6E3FCC" strokeWidth="1.2" opacity="0.4" />
                    <path d="M19 22 C19.3 20.5 20 19.5 20 18" stroke="#6E3FCC" strokeWidth="1" opacity="0.25" strokeLinecap="round" />
                    <path d="M21 22 C20.7 20.5 20 19.5 20 18" stroke="#6E3FCC" strokeWidth="1" opacity="0.25" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map((format) => (
              <div
                key={format.title}
                className="bg-[#F5F4F1] rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow"
              >
                {format.icon}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {format.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {format.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CLOSING CTA ==================== */}
      <section className="py-14 bg-[#F5F4F1]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-lg text-gray-500">
            Not sure where to start?
          </p>
          <Link
            href="/contact"
            className="inline-block mt-4 px-7 py-3.5 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors"
          >
            Find Your Fit
          </Link>
        </div>
      </section>
    </main>
  );
}
