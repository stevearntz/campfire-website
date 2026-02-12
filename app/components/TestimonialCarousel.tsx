"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    name: "Liz Berry",
    title: "Sr. Manager, Talent Development",
    photo: "/liz berry.png",
    logo: "/cotopaxi.png",
    logoAlt: "Cotopaxi",
    quote:
      "Campfire has been a game-changer for our small team of two, helping us deliver meaningful content across the entire organization. Acting as a true extension of our team, they don\u2019t just facilitate trainings\u2014they collaborate with us as thought partners and co-creators to build materials tailored to our specific needs and goals. Thanks to Campfire\u2019s people and platform, we\u2019ve been able to create an engaging, collaborative learning and development program that reaches employees at every level.",
  },
  {
    name: "Ashley Logan",
    title: "Sr. Director, Talent Development",
    photo: "/ashley.png",
    logo: "/nuvei.png",
    logoAlt: "Nuvei",
    quote:
      "As a team of one, I needed a partner that could amplify our leadership development efforts without adding to my workload. Campfire has been that partner\u2014providing the tools and resources to scale impactful programs across our global teams. What would have required months of work and significant budget to create internally, we now achieve with ease and efficiency. Campfire truly feels like an extension of my team, empowering me to support our leaders in a way I couldn\u2019t do alone.",
  },
];

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#F8F5FC] rounded-2xl p-10 md:p-14">
          {/* Grid overlap: all testimonials occupy the same cell, tallest sets height */}
          <div className="grid">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="col-start-1 row-start-1 transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: i === active ? 1 : 0,
                  pointerEvents: i === active ? "auto" : "none",
                }}
                aria-hidden={i !== active}
              >
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  {/* Photo + attribution */}
                  <div className="flex flex-col items-center md:items-start shrink-0 mx-auto md:mx-0">
                    <Image
                      src={t.photo}
                      alt={t.name}
                      width={200}
                      height={200}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="mt-4 text-center md:text-left">
                      <p className="font-semibold text-gray-900 text-sm">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500 leading-snug mt-0.5">
                        {t.title}
                      </p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="flex-1">
                    <svg
                      className="w-8 h-6 text-[#6E3FCC] opacity-20 mb-3"
                      viewBox="0 0 32 24"
                      fill="currentColor"
                    >
                      <path d="M0 24V14.4C0 6.08 4.48 1.12 13.44 0l1.28 3.52C9.28 4.8 7.04 8 6.72 12H12v12H0Zm18.56 0V14.4c0-8.32 4.48-13.28 13.44-14.4l1.28 3.52C27.84 4.8 25.6 8 25.28 12H30.56v12H18.56Z" />
                    </svg>
                    <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed">
                      {t.quote}
                    </blockquote>
                    <div className="mt-8 flex items-end justify-between">
                      <Link
                        href="/customers"
                        className="inline-block px-7 py-3.5 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors"
                      >
                        Explore Case Studies
                      </Link>
                      <Image
                        src={t.logo}
                        alt={t.logoAlt}
                        width={140}
                        height={50}
                        className="hidden md:block h-8 w-auto object-contain opacity-30 grayscale"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots + arrows */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() =>
                setActive(
                  (active - 1 + testimonials.length) % testimonials.length
                )
              }
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#6E3FCC] hover:border-[#6E3FCC]/30 transition-colors"
              aria-label="Previous testimonial"
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
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === active
                      ? "bg-[#6E3FCC] scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setActive((active + 1) % testimonials.length)
              }
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#6E3FCC] hover:border-[#6E3FCC]/30 transition-colors"
              aria-label="Next testimonial"
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
    </section>
  );
}
