import React from 'react';
import toast from "react-hot-toast";
import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT SIDE INFO */}
          <div className="space-y-8">
            <div>
              <span className="text-amber-500 font-bold uppercase tracking-widest text-sm">
                Contact Us
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
                Start Your Journey Today
              </h2>
              <p className="text-slate-400 text-lg max-w-md">
                Reach out for a personalized consultation. Our architects are ready to guide you toward global education success.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <Phone className="text-amber-500" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-xl font-bold">
                  {CONTACT_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-6">
                <Mail className="text-amber-500" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl font-bold">
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-6">
                <MapPin className="text-amber-500" />
                <p className="text-xl font-bold">{CONTACT_INFO.address}</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-white rounded-3xl p-8 md:p-12 text-slate-900 shadow-2xl">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <MessageSquare className="text-blue-600" />
              Admission Inquiry
            </h3>

            <form
  onSubmit={async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/api/mailchimp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Inquiry submitted successfully!", {
  duration: 4000,
});
      form.reset();
    } else {
      toast.error("Something went wrong. Please try again.", {
  duration: 4000,
});
    }
  }}
  className="space-y-6"
>
              {/* Hidden Subject for Better Email Labeling */}
              <input
                type="hidden"
                name="_subject"
                value="New Admission Enquiry - Vidya Infinity"
              />

              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-bold uppercase">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Service */}
              <div>
                <label className="text-sm font-bold uppercase">
                  Interested Service
                </label>
                <select
                  name="service"
                  required
                  className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select a Service</option>
                  <option>University Admissions</option>
                  <option>Visa Guidance</option>
                  <option>Test Preparation</option>
                  <option>Career Counseling</option>
                  <option>Language Training</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-bold uppercase">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95"
              >
                Book Free Consultation
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
