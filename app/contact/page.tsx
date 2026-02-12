"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#6E3FCC] topo-pattern py-20">
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Let&apos;s Chat Leadership
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Whether you know the program you want to build or you just want to
              start exploring, we&apos;d love to geek out on all things talent
              development.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left — info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Schedule a conversation
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                The best way to see if Campfire can help is to meet with someone
                on our team about the things you&apos;re trying to do in your
                organization. We&apos;ll talk about your goals, your challenges,
                and your people. We&apos;d love to find ways to work together to
                solve your leadership development challenges.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    What to expect
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    A 30-minute, low-pressure conversation. We&apos;ll learn
                    about your company culture, your talent development goals,
                    and share relevant examples of how Campfire has helped
                    organizations like yours.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Email us directly
                  </h3>
                  <a
                    href="mailto:hello@getcampfire.com"
                    className="text-[#6E3FCC] text-sm font-medium hover:underline"
                  >
                    hello@getcampfire.com
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Connect with us
                  </h3>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.linkedin.com/company/getcampfire"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-[#6E3FCC] text-sm font-medium hover:underline"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                    <span className="text-gray-300">|</span>
                    <a
                      href="https://getcampfire.substack.com"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-[#6E3FCC] text-sm font-medium hover:underline"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                      Newsletter
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                  <div className="text-4xl mb-4">&#10003;</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Thanks for reaching out!
                  </h3>
                  <p className="text-gray-500">
                    We&apos;ll be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6E3FCC]/20 focus:border-[#6E3FCC]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6E3FCC]/20 focus:border-[#6E3FCC]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Work email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6E3FCC]/20 focus:border-[#6E3FCC]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6E3FCC]/20 focus:border-[#6E3FCC]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      What are you looking for?
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6E3FCC]/20 focus:border-[#6E3FCC] resize-none"
                      placeholder="Tell us a bit about your team and what you're hoping to achieve..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors"
                  >
                    Connect With Us
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    We&apos;ll respond within one business day. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
