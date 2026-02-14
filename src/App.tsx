import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';


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
      <About />
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
