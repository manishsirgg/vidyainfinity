import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MessageCircle } from "lucide-react";
import OneSignal from "react-onesignal";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import CareerHub from "./components/CareerHub";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Blogs from "./components/Blogs";
import ScrollToHash from "./components/ScrollToHash";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";

import { CONTACT_INFO } from "./constants";


// ✅ Scroll To Top On Route Change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


// ✅ 404 Page
const NotFound: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center text-center px-6">
    <div>
      <h1 className="text-4xl font-bold text-blue-900 mb-4">
        404 — Page Not Found
      </h1>
      <p className="text-slate-600">
        The page you are looking for does not exist.
      </p>
    </div>
  </div>
);


// ✅ Home Page Component
const HomePage: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".scroll-animate")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <CareerHub />
      <Blogs />
      <Contact />
    </>
  );
};


// ✅ MAIN APP
const App: React.FC = () => {

  // ⭐ Push Enable Handler (SAFE — SDK already initialized in index.tsx)
  const enablePushNotifications = async () => {
    try {
      await OneSignal.showSlidedownPrompt();
    } catch (error) {
      console.log("Push permission error", error);
    }
  };

  return (
    <Router>
      <ScrollToTop />

      {/* ✅ Global Toast System */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#0f172a",
            color: "#ffffff",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
          },
        }}
      />

      <div className="min-h-screen bg-white">
        <Navbar />
        <ScrollToHash />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* ⭐ PASS PUSH FUNCTION TO FOOTER */}
        <Footer onEnablePush={enablePushNotifications} />

        {/* Floating WhatsApp CTA */}
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={32} />
        </a>
      </div>
    </Router>
  );
};

export default App;
