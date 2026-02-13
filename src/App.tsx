import aboutImage from './assets/about.png';
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { CONTACT_INFO } from './constants';
import { MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from "./constants";

const App: React.FC = () => {
  // Simple scroll animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
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
                <p className="text-sm font-bold uppercase tracking-widest mt-1">Success Stories</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <span className="text-blue-700 font-bold uppercase tracking-widest text-sm">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                Empowering Your <br />Educational <span className="text-blue-700 italic">Evolution</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Vidya Infinity is dedicated exclusively to academic excellence and global student mobility. As "Global Education Architects," we design comprehensive pathways for students to reach the world's most prestigious universities.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our approach is deeply personalized, focusing on individual career planning, rigorous test preparation, and meticulous visa documentation. We bridge the gap between local ambition and global opportunity.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-blue-900">
                  <h4 className="font-bold text-slate-900 mb-1">Global Vision</h4>
                  <p className="text-sm text-slate-500">Unlocking elite international opportunities.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-amber-500">
                  <h4 className="font-bold text-slate-900 mb-1">Expert Guidance</h4>
                  <p className="text-sm text-slate-500">Certified mentors for every step.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services />
      
      {/* Testimonial Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-900 italic underline decoration-amber-500/30">Trusted by Students Globally</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-8 rounded-2xl shadow-md max-w-sm hover:shadow-xl transition-shadow border border-slate-100">
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-slate-600 italic mb-6">
                  "The team at Vidya Infinity made my university application process seamless. Their guidance on SOPs and visa documentation was invaluable. I'm now studying at my dream university!"
                </p>
                <div className="flex items-center gap-4">
                  <img src={`https://picsum.photos/seed/student${item}/100/100`} className="rounded-full w-12 h-12 border-2 border-blue-100" />
                  <div>
                    <h5 className="font-bold text-slate-900">Sanya Sharma</h5>
                    <p className="text-xs text-slate-400">Masters Student, UK</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />

      {/* Floating WhatsApp CTA */}
      <a 
        href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          Questions? Chat with our Architects!
        </span>
      </a>

      {/* Basic Animation CSS */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
