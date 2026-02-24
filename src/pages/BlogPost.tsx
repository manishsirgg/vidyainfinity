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

      data[key.trim() as keyof Frontmatter] = value
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
        <Link to="/blog" className="text-blue-700 font-semibold">
          ← Back to Blog
        </Link>
      </section>
    );
  }

  const { data, content } = parseMarkdown(file);

  const banner = data.featuredImage || "";
  const pageUrl = `https://vidyainfinity.com/blog/${slug}`;

  /* =========================
     SEO + OG + TWITTER + SCHEMA
  ========================= */

  useEffect(() => {
    if (data.title) {
      document.title = `${data.title} | Vidya Infinity`;
    }

    const setMeta = (property: string, content: string) => {
      let element =
        document.querySelector(`meta[property='${property}']`) ||
        document.querySelector(`meta[name='${property}']`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(
          property.startsWith("og:")
            ? "property"
            : property.startsWith("twitter:")
            ? "name"
            : "name",
          property
        );
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    if (data.metaDescription) {
      setMeta("description", data.metaDescription);
      setMeta("og:description", data.metaDescription);
      setMeta("twitter:description", data.metaDescription);
    }

    if (data.title) {
      setMeta("og:title", data.title);
      setMeta("twitter:title", data.title);
    }

    if (banner) {
      const fullImageUrl = `https://vidyainfinity.com${banner}`;
      setMeta("og:image", fullImageUrl);
      setMeta("twitter:image", fullImageUrl);
    }

    setMeta("og:type", "article");
    setMeta("og:url", pageUrl);
    setMeta("twitter:card", "summary_large_image");

    /* JSON-LD Article Schema */

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title,
      description: data.metaDescription,
      image: banner
        ? `https://vidyainfinity.com${banner}`
        : undefined,
      author: {
        "@type": "Organization",
        name: "Vidya Infinity",
      },
      publisher: {
        "@type": "Organization",
        name: "Vidya Infinity",
        logo: {
          "@type": "ImageObject",
          url: "https://vidyainfinity.com/logo.png",
        },
      },
      datePublished: data.date,
      mainEntityOfPage: pageUrl,
    };

    const existingScript = document.getElementById("blog-schema");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "blog-schema";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const cleanupScript = document.getElementById("blog-schema");
      if (cleanupScript) cleanupScript.remove();
    };
  }, [data, banner, pageUrl]);

  /* =========================
     YOUTUBE AUTO EMBED
  ========================= */

  const renderers = {
    a: ({ href, children }: any) => {
      if (!href) return null;

      if (href.includes("youtube.com") || href.includes("youtu.be")) {
        const videoIdMatch =
          href.match(/v=([^&]+)/) || href.match(/youtu\.be\/([^?]+)/);

        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        if (videoId) {
          return (
            <div className="my-10 aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                className="w-full h-full rounded-xl shadow-lg"
                allowFullScreen
              ></iframe>
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
  };

  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6">

        <Link
          to="/blog"
          className="text-sm text-blue-700 font-medium"
        >
          ← Back to All Articles
        </Link>

        <h1 className="text-4xl font-bold text-blue-900 mt-6 mb-4">
          {data.title}
        </h1>

        <p className="text-sm text-slate-500 mb-8">
          {data.date}
        </p>

        {banner && (
          <img
            src={banner}
            alt={data.title}
            className="w-full rounded-3xl mb-12 shadow-lg"
          />
        )}

        <article className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={renderers}
          >
            {content}
          </ReactMarkdown>
        </article>

      </div>
    </section>
  );
};

export default BlogPost;
