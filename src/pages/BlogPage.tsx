import React from "react";
import { Link } from "react-router-dom";

interface Post {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

const modules = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
import: "default"
});

function parseFrontmatter(file: string) {
  const match = file.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    return { data: {}, content: file };
  }

  const frontmatter = match[1];
  const content = file.replace(match[0], "").trim();

  const data: Record<string, string> = {};

  frontmatter.split("\n").forEach((line) => {
    const [key, ...value] = line.split(":");
    if (!key) return;

    data[key.trim()] = value
      .join(":")
      .trim()
      .replace(/^"(.*)"$/, "$1");
  });

  return { data, content };
}

const BlogPage: React.FC = () => {
  const posts: Post[] = Object.entries(modules)
    .map(([path, file]: any) => {
      const { data } = parseFrontmatter(file);

      const slug = path.split("/").pop()?.replace(".md", "") || "";

      return {
        title: data?.title || "Untitled",
        excerpt: data?.excerpt || "",
        date: data?.date || "",
        slug,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <section className="bg-gray-50 min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Blogs & Insights
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Expert global education insights, admission frameworks,
            and strategic career positioning guidance.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between group"
            >
              <div>
                <p className="text-xs text-blue-700 font-semibold uppercase tracking-wide mb-3">
                  {post.date}
                </p>

                <h2 className="text-xl font-semibold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors">
                  {post.title}
                </h2>

                <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="inline-block text-blue-800 font-semibold hover:text-blue-600 transition"
              >
                Read Article →
              </Link>
            </article>
          ))}
        </div>

        {/* Optional Back to Home */}
        <div className="text-center mt-16">
          <Link
            to="/"
            className="text-slate-600 hover:text-blue-700 font-medium transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;