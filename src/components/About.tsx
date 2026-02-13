import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image Section */}
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-blue-100 rounded-full blur-2xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
  src="/about.png"
  alt="About Vidya Infinity"
  className="rounded-3xl shadow-2xl relative z-10 w-full h-[500px] object-cover"
/>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <h2 className="text-sm font-black tracking-widest text-blue-700 uppercase">
              Our Mission
            </h2>

            <h3 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Empowering Your Educational{' '}
              <span className="text-blue-700 italic">
                Evolution
              </span>
            </h3>

            <p className="text-slate-600 text-lg leading-relaxed">
              Vidya Infinity is dedicated exclusively to academic excellence and global student mobility. 
              As “Global Education Architects,” we design comprehensive pathways for students to reach 
              the world’s most prestigious universities.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed">
              Our approach is deeply personalized, focusing on individual career planning, 
              rigorous test preparation, and meticulous visa documentation. 
              We bridge the gap between local ambition and global opportunity.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-blue-900">Global Vision</h4>
                <p className="text-sm text-slate-500">
                  Unlocking elite international opportunities.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-blue-900">Expert Guidance</h4>
                <p className="text-sm text-slate-500">
                  Certified mentors for every step.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
