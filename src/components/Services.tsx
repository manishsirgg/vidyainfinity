
import React from 'react';
import { CheckCircle2, Star } from 'lucide-react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-amber-600 font-bold uppercase tracking-widest text-sm">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-3 mb-6">World-Class Education Solutions</h2>
          <p className="text-slate-600 text-lg">
            As Global Education Architects, we provide the strategic blueprint for your academic success, ensuring a seamless journey from India to top global institutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Education Consultancy Card */}
          <div id="education" className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-900 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm h-full flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-50 rounded-2xl">
                  {SERVICES.education.icon}
                </div>
                <h3 className="text-3xl font-serif font-bold text-slate-900">{SERVICES.education.title}</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                {SERVICES.education.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium leading-tight">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://picsum.photos/seed/${i + 10}/100/100`} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                    ))}
                  </div>
                  <span className="text-blue-700 text-sm font-bold">500+ Successful Placements</span>
                </div>
                <a 
                  href="#contact"
                  className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-800 transition-all shadow-lg"
                >
                  Book Free Session <Star size={18} fill="currentColor" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
