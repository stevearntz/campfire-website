import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Easter Egg Hunt — 50+ Hidden Secrets",
  description:
    "There are 50+ hidden easter eggs scattered across getcampfire.com. Can you find them all? Here are 10 clues to get you started.",
  openGraph: {
    title: "Easter Egg Hunt — 50+ Hidden Secrets | Campfire",
    description:
      "There are 50+ hidden easter eggs scattered across getcampfire.com. Can you find them all? Here are 10 clues to get you started.",
    images: [{ url: "/eggs-og.png", width: 1200, height: 630, alt: "Campfire Easter Eggs — 50+ hidden secrets" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Easter Egg Hunt — 50+ Hidden Secrets | Campfire",
    description:
      "There are 50+ hidden easter eggs scattered across getcampfire.com. Can you find them all? Here are 10 clues to get you started.",
    images: ["/eggs-og.png"],
  },
};

const CLUES = [
  {
    number: 1,
    title: "Every Page Has Secrets",
    clue: "Yes, even the broken ones. Don\u2019t skip any page on the site \u2014 every single one is hiding something. Even the page you land on when something goes wrong has a surprise or two waiting for the persistent.",
  },
  {
    number: 2,
    title: "Type Words Into the Void",
    clue: "Some pages are listening. You won\u2019t see a text field or a cursor, but if you start typing the right word on the right page, something will happen. No clicking required \u2014 just start typing.",
  },
  {
    number: 3,
    title: "Retro Gamers Have an Unfair Advantage",
    clue: "If you grew up memorizing cheat codes, button combos, and secret inputs, you\u2019re going to feel right at home. The classics are respected here.",
  },
  {
    number: 4,
    title: "Click on Everything",
    clue: "Words, icons, images, empty spaces \u2014 if you can see it, try clicking it. Some of the best surprises are hiding behind things that don\u2019t look clickable at all.",
  },
  {
    number: 5,
    title: "Persistence Pays Off",
    clue: "Some easter eggs reveal themselves on the first try. Others take a bit more effort \u2014 repeated clicks, specific sequences, or just stubborn curiosity. Don\u2019t give up after one attempt.",
  },
  {
    number: 6,
    title: "Mind Your Scroll Speed",
    clue: "Scrolling slowly helps you notice the small details. But scrolling fast? That can trigger things too. Experiment with how you move through the pages.",
  },
  {
    number: 7,
    title: "Look Under the Hood",
    clue: "Some secrets aren\u2019t visible on the page at all. Developers and the curious will want to open their browser\u2019s DevTools, check the console, and view the page source. There\u2019s more than meets the eye.",
  },
  {
    number: 8,
    title: "Fast Fingers Get Rewarded",
    clue: "If you can type fast, there\u2019s one page that will notice. It\u2019s not a form and it\u2019s not a search bar \u2014 just start typing what you see and try to keep up.",
  },
  {
    number: 9,
    title: "Think Like a Kid",
    clue: "Somewhere between 10 and 15 years old is probably the right mindset. Poke things. Try random stuff. Break the rules. The easter eggs were built for people who play with websites instead of just reading them.",
  },
  {
    number: 10,
    title: "Stay On Brand",
    clue: "Many of the easter eggs are tied to what Campfire is all about. Think fire, think leadership, think connection. The theme runs through everything \u2014 even the hidden stuff. \uD83D\uDD25",
  },
];

export default function EggsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="py-20"
          style={{
            backgroundColor: "#06021B",
            backgroundImage: "url('/purple-topo.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <p className="text-6xl mb-6">🥚</p>
            <h1
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ color: "#E8E2F9" }}
            >
              The Easter Egg Hunt
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "#9D88ED", lineHeight: 1.6 }}
            >
              There are <strong className="text-white font-bold">50+</strong>{" "}
              hidden easter eggs scattered across this site — secret
              interactions, hidden games, surprise animations, and more. Here
              are 10 clues to help you find them all.
            </p>
          </div>
        </div>
      </section>

      {/* Clues Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CLUES.map((clue) => (
              <div
                key={clue.number}
                className="relative rounded-2xl bg-[#F8F5FC] p-8 border border-gray-100 overflow-hidden"
              >
                {/* Gradient left border */}
                <div
                  className="absolute left-0 top-0 w-1 h-full"
                  style={{
                    background:
                      "linear-gradient(to bottom, #EE81DD, #6E3FCC)",
                  }}
                />
                <div className="flex items-start gap-4">
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: "#6E3FCC" }}
                  >
                    {clue.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {clue.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {clue.clue}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#F8F5FC]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to start hunting?
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            The eggs are hiding on every page — the homepage, solutions,
            content, about, blog, and even the 404 page. Some require clicking,
            some require typing, and some just require curiosity.
          </p>
          <Link
            href="/"
            className="inline-block uppercase font-semibold tracking-widest text-white transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#6E3FCC",
              borderRadius: "5px",
              padding: "20px 30px",
              fontSize: "0.875rem",
            }}
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </main>
  );
}
