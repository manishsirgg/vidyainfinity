import React from "react";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

/* =========================
   FRONTMATTER TYPE
========================= */

interface Frontmatter {
  title?: string;
  date?: string;
  excerpt?: string;
  featuredImage?: string;
  slug?: string;
  category?: string;
  author?: string;
}

/* =========================
   LOAD MARKDOWN FILES
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
   BUILD BLOG ARRAY
========================= */

const BLOGS = Object.entries(modules)
  .map(([path, file], index) => {
    const slug = path.split("/").pop()?.replace(".md", "") || "";
    const { data } = parseMarkdown(file as string);

    return {
      id: index + 1,
      slug,
      title: data.title || "Untitled Post",
      excerpt: data.excerpt || "",
      date: data.date || "",
      author: data.author || "Vidya Infinity",
      image: data.featuredImage || "/assets/blog/default.jpg",
      category: data.category || "Education",
    };
  })
  // Optional: newest first (based on date string)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/* =========================
   COMPONENT
========================= */

const Blogs: React.FC = () => {
  return (
    <section id="blogs" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-700 font-bold uppercase tracking-widest text-sm">
              Insights & Perspectives
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-4">
              Educational{" "}
              <span className="text-blue-700 italic">Journal</span>
            </h2>
          </div>

          <Link
            to="/blog"
            className="flex items-center gap-2 text-slate-900 font-bold border-b-2 border-amber-500 pb-1 hover:text-blue-700 hover:border-blue-700 transition-all"
          >
            View All Articles <ArrowRight size={20} />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-3 gap-10">
          {BLOGS.map((blog) => (
            <article
              key={blog.id}
              className="group cursor-pointer transition-all"
            >
              {/* Image */}
              <Link to={`/blog/${blog.slug}`}>
                <div className="relative overflow-hidden rounded-3xl mb-6 aspect-[16/10]">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="space-y-4">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> {blog.date}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <User size={14} /> {blog.author}
                  </span>
                </div>

                {/* Title */}
                <Link to={`/blog/${blog.slug}`}>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                    {blog.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-slate-600 line-clamp-2">
                  {blog.excerpt}
                </p>

                {/* Read More */}
                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-blue-700 font-bold group-hover:gap-4 transition-all pt-2"
                >
                  Read More <ArrowRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blogs;