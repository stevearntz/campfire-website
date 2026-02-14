import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

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
  content?: {
    free?: {
      web?: string;
    };
  };
}

async function getPost(slug: string): Promise<BeehiivPost | null> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !pubId) return null;

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/posts?status=confirmed&order_by=publish_date&direction=desc&limit=100&expand[]=free_web_content&slugs[]=${slug}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const posts = json.data || [];
    return posts.find((p: BeehiivPost) => p.slug === slug) || null;
  } catch {
    return null;
  }
}

async function getRecentPosts(excludeSlug: string): Promise<BeehiivPost[]> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !pubId) return [];

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/posts?status=confirmed&order_by=publish_date&direction=desc&limit=4`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || []).filter((p: BeehiivPost) => p.slug !== excludeSlug).slice(0, 3);
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

function extractBodyContent(html: string): string {
  // Extract just the body content from the full HTML document
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const bodyContent = post.content?.free?.web
    ? extractBodyContent(post.content.free.web)
    : null;

  const recentPosts = await getRecentPosts(slug);

  return (
    <main>
      {/* Hero header */}
      <section className="bg-gradient-to-r from-[#6E3FCC] via-[#7E4FD0] to-[#6E3FCC] topo-pattern">
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Blog
          </Link>
          <div className="flex items-center gap-3 text-sm text-white/60 mb-4">
            {post.authors?.[0] && (
              <>
                <span className="font-medium text-white/80">{post.authors[0]}</span>
                <span>&middot;</span>
              </>
            )}
            <span>{formatDate(post.publish_date)}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {post.meta_default_title || post.title}
          </h1>
          {(post.meta_default_description || post.subtitle) && (
            <p className="mt-4 text-lg text-white/70 max-w-3xl">
              {post.meta_default_description || post.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Thumbnail */}
      {post.thumbnail_url && (
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-6 -mt-2">
            <div className="relative aspect-[2/1] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={post.thumbnail_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Article content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          {bodyContent ? (
            <div
              className="beehiiv-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: bodyContent }}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-6">
                Read the full post on our newsletter:
              </p>
              <a
                href={post.web_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-3.5 text-sm font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
              >
                Read on Beehiiv
              </a>
            </div>
          )}
        </div>
      </section>

      {/* More posts */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-[#F5F4F1]">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              More from By the Campfire
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group">
                  <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 h-full flex flex-col">
                    {p.thumbnail_url ? (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={p.thumbnail_url}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/10] bg-gradient-to-br from-[#6E3FCC]/20 to-[#A84AEB]/20" />
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 group-hover:text-[#6E3FCC] transition-colors mb-2 leading-snug">
                        {p.meta_default_title || p.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3 flex-1">
                        {p.meta_default_description || p.preview_text}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(p.publish_date)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subscribe CTA */}
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
          <a
            href="https://bythecampfire.beehiiv.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block px-8 py-4 text-sm font-semibold leading-none text-white rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide shadow-lg"
            style={{ backgroundColor: "#E055CB" }}
          >
            Subscribe
          </a>
        </div>
      </section>
    </main>
  );
}
