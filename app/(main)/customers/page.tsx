import type { Metadata } from "next";
import CustomerStories from "@/app/components/CustomerStories";
import TrackedLink from "@/app/components/TrackedLink";

export const metadata: Metadata = {
  title: "Customer Stories — Leadership Development, Your Way",
  description:
    "See how companies like Cotopaxi, Dermalogica, Enveda, and Plusgrade are using Campfire to build leadership development around how they already operate.",
  openGraph: {
    title: "Customer Stories — Leadership Development, Your Way | Campfire",
    description:
      "Every organization hired Campfire for a different reason. The common thread? Leadership development — built their way.",
  },
};

export default function CustomersPage() {
  return (
    <main>
      <link rel="preload" as="image" href="/purple-topo.webp" type="image/webp" />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="py-20"
          style={{
            backgroundImage: "url('/purple-topo.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              Customer Stories
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Leadership Development &mdash; Your Way
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              We don&rsquo;t deliver a rigid program. We build leadership
              development around how your company already operates.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Stories — Accordion Cards */}
      <CustomerStories />

      {/* Summary */}
      <section className="py-20 bg-[#F8F5FC]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Same Core. Different Outcomes.
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-6">
            Culture alignment. Leadership bench strength. Internal enablement.
            Scalable growth. Different organizations, different outcomes &mdash;
            but the core stays the same.
          </p>
          <p className="text-lg font-semibold text-[#6E3FCC]">
            Cohort-based. Conversation-driven. Built for behavior change.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <TrackedLink
              href="/solutions"
              eventName="cta_click"
              eventParams={{ cta_text: "Explore Solutions", page: "customers", location: "summary" }}
              className="font-medium text-[#6E3FCC] hover:underline"
            >
              Explore our solutions &rarr;
            </TrackedLink>
            <TrackedLink
              href="/content"
              eventName="cta_click"
              eventParams={{ cta_text: "Browse Content", page: "customers", location: "summary" }}
              className="font-medium text-[#6E3FCC] hover:underline"
            >
              Browse the content library &rarr;
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div
          className="py-20"
          style={{
            backgroundImage: "url('/purple-topo-tall.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Your team is next
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Let&apos;s talk about what Campfire can do for your managers.
            </p>
            <TrackedLink
              href="https://calendly.com/getcampfire/"
              external
              eventName="calendly_click"
              eventParams={{ page: "customers", location: "final_cta" }}
              className="mt-8 inline-block px-8 py-4 text-sm font-semibold leading-none text-[#6E3FCC] bg-white rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wide"
            >
              Build Something Like This
            </TrackedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
