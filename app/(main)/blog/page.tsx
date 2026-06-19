import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SubscribeForm from "@/app/components/SubscribeForm";
import ClickableHeading from "@/app/components/ClickableHeading";

export const metadata: Metadata = {
  title: "Blog — By the Campfire",
  description:
    "Ideas, insights, and practical advice on leadership development, team culture, and building better managers.",
  openGraph: {
    title: "Blog — By the Campfire",
    description:
      "Ideas, insights, and practical advice on leadership development, team culture, and building better managers.",
  },
};

interface BeehiivPost {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  thumbnail_url: string | null;
  web_url: string;
  publish_date: number;
  displayed_date: number | null;
  authors: string[];
  content_tags: { id: string; name: string }[];
  preview_text: string | null;
  meta_default_description: string | null;
  meta_default_title: string | null;
  status: string;
}

async function getPosts(): Promise<BeehiivPost[]> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !pubId) return [];

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/posts?status=confirmed&order_by=publish_date&direction=desc&limit=20`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Blog — By the Campfire",
        description: "Leadership development ideas, stories, and practical advice from the Campfire team.",
        url: "https://getcampfire.com/blog",
        publisher: {
          "@type": "Organization",
          name: "Campfire",
          url: "https://getcampfire.com",
        },
      }) }} />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="py-20 md:py-24" style={{ backgroundImage: "url('/purple-topo.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              Blog
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              <ClickableHeading clicks={3}>By the Campfire</ClickableHeading>
            </h1>
            <p className="mt-4 text-lg text-white/70">
              Ideas, insights, and practical advice on leadership development,
              team culture, and building better managers.
            </p>
            <p className="mt-8 text-sm text-white/50">
              Get new posts delivered to your inbox
            </p>
            <div className="mt-3">
              <SubscribeForm />
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500 mb-6">
                Our blog is on its way. In the meantime, check out our
                newsletter:
              </p>
              <a
                href="https://bythecampfire.beehiiv.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-3.5 text-sm font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
              >
                Visit Our Newsletter
              </a>
            </div>
          ) : (
            <>
              {/* Featured post */}
              <Link href={`/blog/${posts[0].slug}`} className="block group mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {posts[0].thumbnail_url && (
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F8F5FC]">
                      <Image
                        src={posts[0].thumbnail_url}
                        alt={posts[0].title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-[#6E3FCC] tracking-wider uppercase mb-3">
                      Latest Post
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-[#6E3FCC] transition-colors mb-3">
                      {posts[0].meta_default_title || posts[0].title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-4">
                      {posts[0].meta_default_description || posts[0].preview_text || posts[0].subtitle}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      {posts[0].authors?.[0] && (
                        <>
                          <span className="font-medium text-gray-600">{posts[0].authors[0]}</span>
                          <span>&middot;</span>
                        </>
                      )}
                      <span>{formatDate(posts[0].publish_date)}</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Remaining posts */}
              {posts.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {posts.slice(1).map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group"
                    >
                      <div className="rounded-2xl overflow-hidden bg-[#F8F5FC] border border-gray-100 h-full flex flex-col">
                        {post.thumbnail_url ? (
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                              src={post.thumbnail_url}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[16/10] bg-gradient-to-br from-[#6E3FCC]/20 to-[#A84AEB]/20 flex items-center justify-center">
                            <svg className="w-10 h-10 text-[#6E3FCC]/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-bold text-gray-900 group-hover:text-[#6E3FCC] transition-colors mb-2 leading-snug">
                            {post.meta_default_title || post.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                            {post.meta_default_description || post.preview_text || post.subtitle}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            {post.authors?.[0] && (
                              <>
                                <span className="font-medium text-gray-600">{post.authors[0]}</span>
                                <span>&middot;</span>
                              </>
                            )}
                            <span>{formatDate(post.publish_date)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Keep exploring */}
      <section className="py-16 bg-[#F8F5FC]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Keep exploring</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/solutions" className="px-5 py-2.5 text-sm font-semibold text-[#6E3FCC] bg-white rounded-lg border border-gray-200 hover:border-[#6E3FCC] transition-colors">
              Our Solutions
            </Link>
            <Link href="/content" className="px-5 py-2.5 text-sm font-semibold text-[#6E3FCC] bg-white rounded-lg border border-gray-200 hover:border-[#6E3FCC] transition-colors">
              Content Library
            </Link>
            <Link href="/customers" className="px-5 py-2.5 text-sm font-semibold text-[#6E3FCC] bg-white rounded-lg border border-gray-200 hover:border-[#6E3FCC] transition-colors">
              Customer Stories
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden py-20"
        style={{
          backgroundImage: "url('/purple-topo-tall.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Want these insights in your inbox?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Subscribe to By the Campfire for leadership development ideas
            delivered every week.
          </p>
          <div className="mt-8">
            <SubscribeForm />
          </div>
        </div>
      </section>
      <span
        dangerouslySetInnerHTML={{
          __html:
            "<!-- If you're reading this, you're our kind of person. getcampfire.com/contact -->",
        }}
      />
    </main>
  );
}
