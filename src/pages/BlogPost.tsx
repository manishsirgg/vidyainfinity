import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Frontmatter {
  title?: string;
  date?: string;
  excerpt?: string;
  image?: string;
  featuredImage?: string;
  metaDescription?: string;
  slug?: string;
}

const modules = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

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

      const cleanedKey = key.trim() as keyof Frontmatter;

      data[cleanedKey] = value
        .join(":")
        .trim()
        .replace(/^"(.*)"$/, "$1");
    });

    content = file.replace(frontmatterRegex, "").trim();
  }

  return { data, content };
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const file =
    slug && modules[`../content/blog/${slug}.md`]
      ? (modules[`../content/blog/${slug}.md`] as string)
      : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!file) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          404 — Post Not Found
        </h1>
        <p className="text-slate-600 mb-6">
          The article you’re looking for does not exist.
        </p>
        <Link
          to="/blog"
          className="text-blue-700 font-semibold hover:text-blue-600"
        >
          ← Back to Blog
        </Link>
      </section>
    );
  }

  const { data, content } = parseMarkdown(file);

  /* =========================
     SEO TITLE + META
  ========================= */

  useEffect(() => {
    if (data?.title) {
      document.title = `${data.title} | Vidya Infinity`;
    }

    if (data?.metaDescription) {
      let meta = document.querySelector(
        "meta[name='description']"
      ) as HTMLMetaElement | null;

      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }

      meta.content = data.metaDescription;
    }
  }, [data]);

  const bannerImage = data.featuredImage || data.image;

  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6">

        {/* Back Link */}
        <div className="mb-10">
          <Link
            to="/blog"
            className="text-sm text-blue-700 font-medium hover:text-blue-600"
          >
            ← Back to All Articles
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
          {data.title}
        </h1>

        {/* Date */}
        <p className="text-sm text-slate-500 mb-8">
          {data.date}
        </p>

        {/* Featured Banner */}
        {bannerImage && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-lg">
            <img
              src={bannerImage}
              alt={data.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg max-w-none prose-headings:text-blue-900 prose-a:text-blue-700 prose-strong:text-slate-900">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </article>

      </div>
    </section>
  );
};

export default BlogPost;
