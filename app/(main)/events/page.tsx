import type { Metadata } from "next";
import SubscribeForm from "@/app/components/SubscribeForm";
import EventsClient from "@/app/components/EventsClient";
import { fetchUpcomingEvents, fetchPastEvents } from "@/app/lib/luma";

export const metadata: Metadata = {
  title: "Events — Not Another Webinar. A Leadership Room.",
  description:
    "Drop-in events open to all HR and People Ops Professionals. Join Campfire Conversations and connect with leaders who are building better teams.",
  openGraph: {
    title: "Events — Not Another Webinar | Campfire",
    description:
      "Drop-in events open to all HR and People Ops Professionals.",
  },
};

// Cycle through our custom images for events
const eventImages = [
  "/fire.webp",
  "/raft.webp",
  "/bike.webp",
  "/lantern.webp",
  "/hammock.webp",
  "/binoculars.webp",
];

function formatEventDate(startAt: string, endAt: string, timezone: string): string {
  const start = new Date(startAt);
  const end = new Date(endAt);

  const dateStr = start.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: timezone,
  });

  const startTime = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  });

  const endTime = end.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
    timeZoneName: "short",
  });

  return `${dateStr} from ${startTime} - ${endTime}`;
}

function formatShortDate(startAt: string, timezone: string): string {
  return new Date(startAt).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: timezone,
  });
}

export default async function EventsPage() {
  const [upcomingRaw, pastRaw] = await Promise.all([
    fetchUpcomingEvents(),
    fetchPastEvents(6),
  ]);

  // Transform to serializable shape for the client component
  const upcoming = upcomingRaw.map((entry, i) => ({
    apiId: entry.event.api_id,
    name: entry.event.name,
    description: entry.event.description ?? "",
    descriptionMd: entry.event.description_md ?? "",
    date: formatEventDate(entry.event.start_at, entry.event.end_at, entry.event.timezone),
    shortDate: formatShortDate(entry.event.start_at, entry.event.timezone),
    timezone: entry.event.timezone,
    image: i === 0
      ? (entry.event.cover_url || eventImages[i % eventImages.length])
      : eventImages[i % eventImages.length],
    lumaUrl: entry.event.url,
  }));

  const past = pastRaw.map((entry, i) => ({
    apiId: entry.event.api_id,
    name: entry.event.name,
    description: entry.event.description ?? "",
    descriptionMd: entry.event.description_md ?? "",
    date: formatEventDate(entry.event.start_at, entry.event.end_at, entry.event.timezone),
    shortDate: formatShortDate(entry.event.start_at, entry.event.timezone),
    timezone: entry.event.timezone,
    image: eventImages[(i + 3) % eventImages.length],
    lumaUrl: entry.event.url,
  }));

  return (
    <main>
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
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <p className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              Events
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Not Another Webinar. A Leadership Room.
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Drop-in events open to all HR and People Ops Professionals
            </p>
          </div>
        </div>
      </section>

      <EventsClient upcoming={upcoming} past={past} />

      {/* Newsletter CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="rounded-2xl py-14 px-8 text-center"
            style={{
              backgroundImage:
                "url('/purple-topo.webp'), linear-gradient(135deg, #6E3FCC 0%, #9D88ED 100%)",
              backgroundSize: "cover, cover",
              backgroundPosition: "center, center",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Want these insights in your inbox?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Subscribe to By the Campfire for leadership development ideas
              delivered every week.
            </p>
            <SubscribeForm />
          </div>
        </div>
      </section>
    </main>
  );
}
