import React, { useState } from "react";
import { Logo, NAV_LINKS, SOCIAL_LINKS } from "../constants";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import PushNotifications from "./PushNotifications";

const Footer: React.FC = () => {

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterLoading(true);

    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newsletterEmail,
          service: "newsletter",
          source: "footer_newsletter",
        }),
      });

      if (res.ok) {
        alert("Subscribed successfully!");
        setNewsletterEmail("");
      } else {
        alert("Subscription failed.");
      }
    } catch {
      alert("Error occurred.");
    }

    setNewsletterLoading(false);
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-8">
      <div className="container mx-auto px-4 md:px-8">

        {/* Top Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6">
            <Logo />

            <p className="text-slate-500 leading-relaxed text-sm">
              Empowering dreams through expert education guidance.
              Your path to global academic success starts here.
            </p>

            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-100 text-blue-900 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-blue-900 hover:text-white hover:scale-105"
              >
                <Facebook size={18} />
              </a>

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-100 text-blue-900 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-blue-900 hover:text-white hover:scale-105"
              >
                <Instagram size={18} />
              </a>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-100 text-blue-900 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-blue-900 hover:text-white hover:scale-105"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-6">
              Navigation
            </h4>

            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-slate-500 hover:text-blue-900 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Focus */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-6">
              Our Focus
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/#education"
                  className="text-slate-500 hover:text-blue-900 transition-colors"
                >
                  Study Abroad
                </Link>
              </li>
              <li>
                <Link
                  to="/#education"
                  className="text-slate-500 hover:text-blue-900 transition-colors"
                >
                  Test Prep (IELTS/SAT)
                </Link>
              </li>
              <li>
                <Link
                  to="/#education"
                  className="text-slate-500 hover:text-blue-900 transition-colors"
                >
                  Visa Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/#education"
                  className="text-slate-500 hover:text-blue-900 transition-colors"
                >
                  Career Planning
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter + Push */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-6">
              Stay Updated
            </h4>

            <p className="text-slate-500 text-sm mb-4">
              Get the latest international education news and admission dates.
            </p>

            <form onSubmit={handleNewsletter} className="flex w-full">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Email Address"
                className="bg-white border border-slate-300 rounded-l-lg px-4 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-900"
              />

              <button
                type="submit"
                disabled={newsletterLoading}
                className="bg-blue-900 text-white px-5 py-2 rounded-r-lg hover:bg-blue-800 transition-all text-sm font-semibold"
              >
                {newsletterLoading ? "Joining..." : "Join"}
              </button>
            </form>

            <div className="mt-6">
              <PushNotifications />
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Vidya Infinity [Infinity Global Advisory]. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link
              to="/privacy-policy"
              className="text-slate-400 hover:text-blue-900 transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-of-service"
              className="text-slate-400 hover:text-blue-900 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
