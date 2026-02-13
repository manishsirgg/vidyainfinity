import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import aboutImage from './assets/about.png';

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

import { CONTACT_INFO } from './constants';
import { MessageCircle } from 'lucide-react';
import aboutImage from './assets/about.png';


// ✅ Home Page Component
const HomePage: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate')
      .forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative scroll-animate opacity-0">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full z-0"></div>

              <img
  src={aboutImage}
  alt="About Vidya Infinity"
  className="rounded-3xl shadow-2xl relative z-10 w-full h-[500px] object-cover"
/>


              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white p-8 rounded-2xl shadow-xl z-20">
                <p className="text-4xl font-bold font-serif leading-none">500+</p>
                <p className="text-sm font-bold uppercase tracking-widest mt-1">
                  Success Stories
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-blue-700 font-bold uppercase tracking-widest text-sm">
                Our Mission
              </span>

              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                Empowering Your <br />
                Educational <span className="text-blue-700 italic">Evolution</span>
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed">
                Vidya Infinity is dedicated exclusively to academic excellence and global student mobility.
                As "Global Education Architects," we design comprehensive pathways for students to reach
                the world's most prestigious universities.
              </p>

              <p className="text-slate-600 text-lg leading-relaxed">
                Our approach is deeply personalized, focusing on individual career planning,
                rigorous test preparation, and meticulous visa documentation.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Services />
      <Contact />
    </>
  );
};


// ✅ Main App
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">

        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>

        <Footer />

        {/* Floating WhatsApp CTA */}
        <a 
          href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
          className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={32} />
        </a>

      </div>
    </Router>
  );
};

export default App;
