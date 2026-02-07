"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#7C3AED] topo-pattern py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Let&apos;s Talk
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Whether you&apos;re ready to get started or just exploring,
              we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left — info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Book a call
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                The best way to see if Campfire is right for your team is a
                quick conversation. We&apos;ll ask about your goals, your
                challenges, and your people — and share how we might help.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    What to expect
                  </h3>
                  <p className="text-gray-500 text-sm">
                    A 30-minute, no-pressure conversation. We&apos;ll learn
                    about your team and share relevant examples of how Campfire
                    has helped similar organizations.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Email us directly
                  </h3>
                  <a
                    href="mailto:hello@getcampfire.com"
                    className="text-[#7C3AED] text-sm font-medium hover:underline"
                  >
                    hello@getcampfire.com
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Follow us
                  </h3>
                  <a
                    href="https://www.linkedin.com/company/getcampfire"
                    target="_blank"
                    className="text-[#7C3AED] text-sm font-medium hover:underline"
                  >
                    LinkedIn
                  </a>
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
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company size
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] text-gray-500"
                    >
                      <option value="">Select...</option>
                      <option>1-50 employees</option>
                      <option>51-200 employees</option>
                      <option>201-500 employees</option>
                      <option>501-1000 employees</option>
                      <option>1000+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      What are you looking for?
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
                      placeholder="Tell us a bit about your team and what you're hoping to achieve..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-sm font-semibold text-white bg-[#7C3AED] rounded-lg hover:bg-[#6D28D9] transition-colors"
                  >
                    Send Message
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
