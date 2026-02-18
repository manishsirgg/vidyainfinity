import React from 'react';
import { ArrowRight, Globe, Award } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import heroImage from '../assets/hero.png';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
      
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/5 -skew-x-12 transform translate-x-1/4"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-900 text-white px-5 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase shadow-lg shadow-blue-900/20">
              <Globe size={14} className="animate-pulse" />
              Global Education Architects
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight">
              Design Your <br />
              <span className="text-blue-700 underline decoration-amber-500/30 italic">
                Global Destiny
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              VidyaInfinity helps ambitious students secure admissions in leading universities across India and abroad 
              through expert guidance, structured planning, and end-to-end application support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#education"
                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 text-lg font-bold shadow-xl transition-all hover:scale-105"
              >
                Explore Services
                <ArrowRight size={20} />
              </a>
              <a 
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                className="bg-white border-2 border-slate-200 hover:border-blue-900 text-slate-900 px-8 py-4 rounded-xl flex items-center justify-center gap-2 text-lg font-bold transition-all hover:bg-slate-50"
              >
                Book Consultation
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-200">
              <div>
                <span className="text-2xl font-bold text-blue-900">500+</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Students Placed
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold text-blue-900">20+</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Countries
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold text-blue-900">98%</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Visa Success
                </span>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-amber-500/20 rounded-3xl blur-2xl group-hover:bg-amber-500/30 transition-all duration-700"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              
              <img
                src={heroImage}
                alt="Global Education Architecture"
                className="w-full h-[600px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent flex flex-col justify-end p-8">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-inner">
                      <Award className="text-white" />
                    </div>
                    <div>
                      <span className="text-white font-bold text-xl block leading-tight">
                        Vidya Infinity
                      </span>
                      <span className="text-amber-400 text-[10px] uppercase font-black tracking-widest">
                        Global Education Architects
                      </span>
                    </div>
                  </div>
                  <p className="text-blue-50 text-sm leading-relaxed">
                    Strategic end-to-end planning for Ivy League and top global institutions.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
