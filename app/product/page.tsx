import type { Metadata } from "next";
import Image from "next/image";
import TrackedLink from "../components/TrackedLink";
import ProductFeatures from "../components/ProductFeatures";
import ProductTestimonials from "../components/ProductTestimonials";

export const metadata: Metadata = {
  title: "Our Product \u2014 More Than a Meeting Platform | Campfire",
  description:
    "Campfire is purpose-built for leadership development \u2014 with reflection, structured breakouts, and integrated facilitation tools designed to drive deeper engagement.",
  openGraph: {
    title: "Our Product \u2014 More Than a Meeting Platform | Campfire",
    description:
      "Campfire is purpose-built for leadership development \u2014 with reflection, structured breakouts, and integrated facilitation tools designed to drive deeper engagement.",
  },
};

export default function ProductPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          minHeight: "475px",
          background:
            "linear-gradient(135deg, #0122B4 0%, #6A3DC5 56%, #A84AEB 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/clear-topo.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
          <p className="text-2xl font-semibold tracking-wider uppercase text-white/50 mb-6">
            Our Product
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight whitespace-nowrap">
            More Than a Meeting Platform
          </h1>
          <p className="mt-8 text-xl md:text-2xl font-normal text-white max-w-[1000px] mx-auto">
            Campfire is purpose-built for leadership development &mdash; with
            reflection, structured breakouts, and integrated facilitation tools
            designed to drive deeper engagement.
          </p>
        </div>
      </section>

      {/* Built for Conversations — Not Lectures */}
      <section className="py-24 bg-white">
        <div className="mx-auto px-6" style={{ maxWidth: "1350px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Illustration */}
            <div className="flex justify-center">
              <div className="w-full" style={{ maxWidth: "561px" }}>
                <Image
                  src="/product-hammock.webp"
                  alt="Built for conversations"
                  width={1122}
                  height={1122}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
                Built for Conversations
                <br />&mdash; Not Lectures
              </h2>
              <p className="font-medium text-[#6E3FCC] mb-6 text-xl md:text-[1.61rem] leading-snug">
                Most virtual platforms were built to share information. We built
                ours to shape conversation.
              </p>
              <p className="font-light text-gray-600 text-xl md:text-2xl leading-snug">
                Campfire exists to develop the skills that matter. That happens
                in moments of real connection &mdash; when people slow down,
                reflect, question assumptions, practice behaviors, and leave
                seeing something differently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A Custom Classroom + Testimonials + CTA — one continuous gradient */}
      <section
        style={{
          background: "linear-gradient(to bottom, #1C1334 42%, #53389A 100%)",
        }}
      >
        {/* A Custom Classroom */}
        <div className="py-20">
          <div className="mx-auto px-6" style={{ maxWidth: "1475px" }}>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                A Custom Classroom...
              </h2>
              <p className="mt-4 text-lg text-white/60 max-w-3xl mx-auto">
                We built the Campfire platform to be a space where real
                conversations can lead to real growth.
              </p>
              <p className="mt-3 text-lg text-white/60 max-w-3xl mx-auto">
                When people feel safe, have space to reflect, and aren&apos;t
                managing slides or logistics, they engage more fully. The Campfire
                platform is designed to make those conditions the default.
              </p>
            </div>
            <ProductFeatures />
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-20">
          <ProductTestimonials />
        </div>

        {/* CTA */}
        <div className="py-20">
          <div className="max-w-3xl mx-auto px-6">
            <div
              className="rounded-2xl p-10 md:p-14 text-center"
              style={{
                background: "linear-gradient(135deg, #6E3FCC, #A84AEB)",
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                You&apos;re 30 seconds away from your own Campfire experience
              </h2>
              <p className="text-white/70 mb-1">
                Sign up free, explore our full catalog, and try our
                industry-leading platform.
              </p>
              <p className="text-white/70 mb-8">No credit card required.</p>
              <TrackedLink
                href="https://meet.getcampfire.com/"
                external
                eventName="cta_click"
                eventParams={{
                  cta_text: "Try Campfire",
                  page: "product",
                  location: "final_cta",
                }}
                className="inline-block px-8 py-4 text-sm font-semibold leading-none text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wide"
              >
                Try Campfire
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
