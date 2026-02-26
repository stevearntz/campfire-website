import type { Metadata } from "next";
import Image from "next/image";
import SubscribeForm from "../components/SubscribeForm";

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

// Placeholder data — will be replaced by Luma API
interface CampfireEvent {
  id: string;
  title: string;
  date: string;
  shortDate: string;
  description: string;
  image: string;
  registered?: boolean;
  lumaUrl?: string;
}

const upcomingEvents: CampfireEvent[] = [
  {
    id: "1",
    title: "Campfire Conversations",
    date: "Wednesday, November 19 from 1:00pm - 2:00pm MST",
    shortDate: "Wednesday, November 19",
    description:
      "We integrate proven approaches to feedback, coaching, and adaptive leadership to help managers communicate clearly and lead with confidence.",
    image: "/fire.webp",
    registered: false,
  },
  {
    id: "2",
    title: "Campfire Conversations",
    date: "Wednesday, November 19 from 1:00pm - 2:00pm MST",
    shortDate: "Wednesday, November 19",
    description:
      "We integrate proven approaches to feedback, coaching, and adaptive leadership to help managers communicate clearly and lead with confidence.",
    image: "/raft.webp",
    registered: true,
  },
  {
    id: "3",
    title: "Campfire Conversations",
    date: "Wednesday, November 19 from 1:00pm - 2:00pm MST",
    shortDate: "Wednesday, November 19",
    description:
      "We integrate proven approaches to feedback, coaching, and adaptive leadership to help managers communicate clearly and lead with confidence.",
    image: "/bike.webp",
    registered: false,
  },
];

const previousEvents: CampfireEvent[] = [
  {
    id: "4",
    title: "Communication & Feedback",
    date: "",
    shortDate: "Wednesday, November 19",
    description:
      "We integrate proven approaches to feedback, coaching, and adaptive leadership to help managers communicate clearly and lead...",
    image: "/lantern.webp",
  },
  {
    id: "5",
    title: "Communication & Feedback",
    date: "",
    shortDate: "Wednesday, November 19",
    description:
      "We integrate proven approaches to feedback, coaching, and adaptive leadership to help managers communicate clearly and lead...",
    image: "/hammock.webp",
  },
  {
    id: "6",
    title: "Communication & Feedback",
    date: "",
    shortDate: "Wednesday, November 19",
    description:
      "We integrate proven approaches to feedback, coaching, and adaptive leadership to help managers communicate clearly and lead...",
    image: "/binoculars.webp",
  },
];

export default function EventsPage() {
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

      {/* Upcoming Events */}
      <section className="py-16 bg-[#F8F5FC]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-8">
            Upcoming Events
          </p>

          <div className="space-y-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0">
                  {/* Event image */}
                  <div className="aspect-[16/10] md:aspect-auto">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Event details */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <svg
                        className="w-4 h-4 text-[#6E3FCC] shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                      </svg>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-1">
                      {event.description}
                      <span className="text-[#6E3FCC] font-semibold cursor-pointer ml-1 hover:underline">
                        SEE MORE
                      </span>
                    </p>
                    <div className="mt-5">
                      {event.registered ? (
                        <button className="flex items-center justify-center px-6 h-10 text-sm font-semibold text-[#6E3FCC] border-2 border-[#6E3FCC] rounded-lg hover:bg-[#6E3FCC]/5 transition-colors uppercase tracking-wide">
                          Unregister
                        </button>
                      ) : (
                        <button className="flex items-center justify-center px-6 h-10 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide">
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Previous Events */}
      <section className="py-16 bg-[#F8F5FC]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-8">
            Previous Events
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousEvents.map((event) => (
              <div key={event.id} className="group cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Event image */}
                <div className="aspect-[16/10]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={260}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Event details */}
                <div className="p-5">
                  <h4 className="text-base font-bold text-gray-900 mb-2">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className="w-3.5 h-3.5 text-[#6E3FCC] shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                    <p className="text-xs text-gray-500">{event.shortDate}</p>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
