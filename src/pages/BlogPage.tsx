import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Post {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  featuredImage?: string;
}

const POSTS_PER_PAGE = 6;

const modules = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseFrontmatter(file: string) {
  const match = file.match(/^---\s*([\s\S]*?)\s*---/);

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
  const [currentPage, setCurrentPage] = useState(1);

  const posts: Post[] = Object.entries(modules)
    .map(([path, file]: any) => {
      const { data } = parseFrontmatter(file);

      const slug = path.split("/").pop()?.replace(".md", "") || "";

      return {
        title: data?.title || "Untitled",
        excerpt: data?.excerpt || "",
        date: data?.date || "",
        slug,
        featuredImage: data?.featuredImage || data?.image || "",
      };
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
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
          {currentPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <p className="text-xs text-blue-700 font-semibold uppercase tracking-wide mb-3">
                    {post.date}
                  </p>

                  <h2 className="text-lg font-semibold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="text-blue-800 font-semibold hover:text-blue-600 transition"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-blue-50 text-blue-800"
              }`}
            >
              Previous
            </button>

            <span className="px-4 py-2 text-sm font-medium text-slate-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-blue-50 text-blue-800"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Back to Home */}
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
