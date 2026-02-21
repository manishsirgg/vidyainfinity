import React from "react";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

const SAMPLE_BLOGS: Blog[] = [
  {
    id: 1,
    slug: "navigating-2024-global-admissions",
    title: "Navigating the 2024 Global Admissions Landscape",
    excerpt:
      "Discover the latest trends in international university admissions and how to position your application for success.",
    date: "May 15, 2024",
    author: "Manish Goswami",
    image:
      "https://images.unsplash.com/photo-1523050338692-7b835a07973f?q=80&w=2070&auto=format&fit=crop",
    category: "Admissions",
  },
  {
    id: 2,
    slug: "mastering-ielts-tips",
    title: "Mastering the IELTS: Tips from Certified Mentors",
    excerpt:
      "Our top strategies for achieving a Band 8+ in your first attempt. Focus on the sections that matter most.",
    date: "June 02, 2024",
    author: "Vidya Team",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    category: "Test Prep",
  },
  {
    id: 3,
    slug: "future-careers-ai-sustainability",
    title: "The Future of Careers in AI and Sustainability",
    excerpt:
      "Which degrees will be most valuable in the next decade? We analyze the shifting global job market.",
    date: "June 10, 2024",
    author: "Career Architects",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    category: "Career Planning",
  },
];

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

          {/* View All */}
          <Link
            to="/blog"
            className="flex items-center gap-2 text-slate-900 font-bold border-b-2 border-amber-500 pb-1 hover:text-blue-700 hover:border-blue-700 transition-all"
          >
            View All Articles <ArrowRight size={20} />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-3 gap-10">
          {SAMPLE_BLOGS.map((blog) => (
            <article
              key={blog.id}
              className="group cursor-pointer transition-all"
            >
              {/* Image Click */}
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

                {/* Title Click */}
                <Link to={`/blog/${blog.slug}`}>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                    {blog.title}
                  </h3>
                </Link>

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