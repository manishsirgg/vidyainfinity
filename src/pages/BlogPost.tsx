import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Frontmatter {
  title?: string;
  date?: string;
  excerpt?: string;
  featuredImage?: string;
  metaDescription?: string;
  slug?: string;
  category?: string;
}

/* =========================
   LOAD ALL MARKDOWN FILES
========================= */

const modules = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

/* =========================
   PARSE FRONTMATTER
========================= */

function parseMarkdown(file: string) {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = file.match(frontmatterRegex);

  let data: Frontmatter = {};
  let content = file;

  if (match) {
    const frontmatter = match[1];

    frontmatter.split("\n").forEach((line) => {
      const [key, ...value] = line.split(":");
      if (!key) return;

      data[key.trim() as keyof Frontmatter] = value
        .join(":")
        .trim()
        .replace(/^"(.*)"$/, "$1");
    });

    content = file.replace(frontmatterRegex, "").trim();
  }

  return { data, content };
}

/* =========================
   BUILD POSTS ARRAY
========================= */

const allPosts = Object.entries(modules).map(([path, file]) => {
  const slug = path.split("/").pop()?.replace(".md", "") || "";
  const { data, content } = parseMarkdown(file as string);

  return {
    slug,
    ...data,
    content,
  };
});

/* =========================
   COMPONENT
========================= */

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const post = currentIndex !== -1 ? allPosts[currentIndex] : null;

  const prevPost =
    currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const nextPost =
    currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

  const relatedPosts = post
    ? allPosts
        .filter(
          (p) =>
            p.slug !== post.slug &&
            p.category === post.category
        )
        .slice(0, 3)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          404 — Post Not Found
        </h1>
        <Link to="/blog" className="text-blue-700 font-semibold">
          ← Back to Blog
        </Link>
      </section>
    );
  }

  const banner = post.featuredImage || "";
  const pageUrl = `https://vidyainfinity.com/blog/${slug}`;

  /* =========================
     SEO META
  ========================= */

  useEffect(() => {
    if (post.title) {
      document.title = `${post.title} | Vidya Infinity`;
    }
  }, [post.title]);

  /* =========================
     MARKDOWN RENDERERS
  ========================= */

  const renderers = {
    a: ({ href, children }: any) => {
      if (!href) return null;

      if (href.includes("youtube.com") || href.includes("youtu.be")) {
        const videoIdMatch =
          href.match(/v=([^&]+)/) ||
          href.match(/youtu\.be\/([^?]+)/);

        const videoId = videoIdMatch
          ? videoIdMatch[1]
          : null;

        if (videoId) {
          return (
            <div className="my-12 aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                className="w-full h-full rounded-2xl shadow-lg"
                allowFullScreen
              />
            </div>
          );
        }
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 font-medium hover:underline"
        >
          {children}
        </a>
      );
    },

    hr: () => null,
  };

  /* =========================
     RETURN
  ========================= */

  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6">

        {/* Back Link */}
        <Link
          to="/blog"
          className="text-sm text-blue-700 font-medium"
        >
          ← Back to All Articles
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-900 mt-6 mb-4 leading-tight">
          {post.title}
        </h1>

        <p className="text-sm text-slate-500 mb-10">
          {post.date}
        </p>

        {/* Banner */}
        {banner && (
          <img
            src={banner}
            alt={post.title}
            className="w-full rounded-3xl mb-14 shadow-lg"
          />
        )}

        {/* Article */}
        <article
          className="
            prose
            prose-lg
            prose-headings:mt-14
            prose-headings:mb-6
            prose-p:mb-6
            prose-ul:mb-6
            prose-hr:my-14
            max-w-3xl
            mx-auto
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={renderers}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Navigation */}
        <div className="mt-20 border-t pt-12 grid md:grid-cols-2 gap-8">
          {prevPost ? (
            <Link to={`/blog/${prevPost.slug}`}>
              <p className="text-sm text-gray-500 mb-2">
                ← Previous Article
              </p>
              <h3 className="text-lg font-semibold text-blue-900 hover:underline">
                {prevPost.title}
              </h3>
            </Link>
          ) : <div />}

          {nextPost && (
            <Link
              to={`/blog/${nextPost.slug}`}
              className="text-right"
            >
              <p className="text-sm text-gray-500 mb-2">
                Next Article →
              </p>
              <h3 className="text-lg font-semibold text-blue-900 hover:underline">
                {nextPost.title}
              </h3>
            </Link>
          )}
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-blue-900 mb-10">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((item) => (
                <Link
                  key={item.slug}
                  to={`/blog/${item.slug}`}
                  className="border rounded-xl p-6 hover:shadow-lg transition"
                >
                  <p className="text-sm text-gray-500 mb-2">
                    {item.date}
                  </p>

                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default BlogPost;