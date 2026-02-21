
import React from 'react';
import { ExternalLink, Compass, Brain, BookOpen, ClipboardCheck } from 'lucide-react';
import { CAREER_HUB_LINKS } from '../constants';

const iconMap = {
  "University Explorer": <Compass className="w-6 h-6" />,
  "Psychometric Tests": <Brain className="w-6 h-6" />,
  "Preparation Corner": <BookOpen className="w-6 h-6" />,
  "Practice Test Series": <ClipboardCheck className="w-6 h-6" />,
};

const CareerHub: React.FC = () => {
  return (
    <section id="career-hub" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <span className="text-amber-500 font-bold uppercase tracking-widest text-sm">Empowerment Tools</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">Career Success Hub</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Access our exclusive suite of digital tools designed to streamline your educational journey and career planning. From university exploration to rigorous test preparation, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAREER_HUB_LINKS.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {iconMap[link.label as keyof typeof iconMap] || <ExternalLink className="w-6 h-6" />}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{link.label}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-grow">{link.description}</p>
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-wider">
                Explore Now <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerHub;
