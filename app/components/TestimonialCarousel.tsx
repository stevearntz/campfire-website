"use client";

import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    logo: "/cotopaxi.png",
    logoAlt: "Cotopaxi",
    name: "Liz Berry",
    title: "Sr. Manager, Talent Development",
    quote:
      "Campfire has been a game-changer for our small team. They don\u2019t just facilitate\u2014they collaborate as thought partners to build materials tailored to our goals.",
  },
  {
    logo: "/nuvei.png",
    logoAlt: "Nuvei",
    name: "Ashley Logan",
    title: "Sr. Director, Talent Development",
    quote:
      "As a team of one, I needed a partner to amplify our efforts. What would have taken months to create internally, we now achieve with ease through Campfire.",
  },
  {
    logo: "/dermalogica.png",
    logoAlt: "Dermalogica",
    name: "People Team",
    title: "Dermalogica",
    quote:
      "Our managers started having better conversations within a week. That\u2019s not something we can say about any other program we\u2019ve tried.",
  },
  {
    logo: "/plusgrade.png",
    logoAlt: "Plusgrade",
    name: "HR Leader",
    title: "Plusgrade",
    quote:
      "Campfire gave us a complete leadership development system we could launch fast and trust to be excellent. Our managers actually look forward to sessions.",
  },
  {
    logo: "/enveda.png",
    logoAlt: "Enveda Biosciences",
    name: "Leadership Team",
    title: "Enveda Biosciences",
    quote:
      "The workshops didn\u2019t feel like corporate training. They felt like real conversations about real problems. That\u2019s why people showed up.",
  },
];

export default function TestimonialCarousel() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What our <span className="text-[#6E3FCC]">customers</span> say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <div
              key={t.logoAlt}
              className="bg-[#F8F5FC] rounded-2xl p-8 flex flex-col justify-between"
            >
              <div>
                <Image
                  src={t.logo}
                  alt={t.logoAlt}
                  width={140}
                  height={50}
                  className="h-6 w-auto object-contain opacity-40 grayscale mb-6"
                />
                <blockquote className="text-gray-600 text-sm leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200/60">
                <p className="font-semibold text-gray-900 text-sm">
                  {t.name}
                </p>
                <p className="text-xs text-gray-500">{t.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row — 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-[calc(66.666%+0.75rem)] mx-auto">
          {testimonials.slice(3).map((t) => (
            <div
              key={t.logoAlt}
              className="bg-[#F8F5FC] rounded-2xl p-8 flex flex-col justify-between"
            >
              <div>
                <Image
                  src={t.logo}
                  alt={t.logoAlt}
                  width={140}
                  height={50}
                  className="h-6 w-auto object-contain opacity-40 grayscale mb-6"
                />
                <blockquote className="text-gray-600 text-sm leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200/60">
                <p className="font-semibold text-gray-900 text-sm">
                  {t.name}
                </p>
                <p className="text-xs text-gray-500">{t.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/customers"
            className="inline-block px-7 py-3.5 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors"
          >
            Explore Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
