import React from "react";
import { GraduationCap } from "lucide-react";


/* ==============================
   CONTACT INFORMATION
============================== */

export const CONTACT_INFO = {
  phone: "+91 7828199500",
  whatsapp: "917828199500", // No +, no spaces (correct format for wa.me)
  email: "info@vidyainfinity.com",
  address:
    "First Floor, E53/54, Sector 3, Noida, Uttar Pradesh, 201301, India",
};


/* ==============================
   SOCIAL MEDIA LINKS
============================== */

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/profile.php?id=61588041837546",
  instagram: "https://instagram.com/vidya.infinity",
  linkedin: "https://linkedin.com/company/vidya-infinity",
  // Add X link later when ready
};


/* ==============================
   CAREER HUB EXTERNAL LINKS
============================== */

export const CAREER_HUB_LINKS = [
  {
    label: "University Explorer",
    href: "https://manishgoswami.edumilestones.com",
    description: "Explore top universities worldwide.",
  },
  {
    label: "Psychometric Tests",
    href: "https://manishgoswami.infigonfutures.in",
    description: "Discover your true potential.",
  },
  {
    label: "Preparation Corner",
    href: "https://prepcorner.vidyainfinity.com",
    description: "Ace your exams with expert prep.",
  },
  {
    label: "Practice Test Series",
    href: "https://testzone.manishgoswami.com",
    description: "Test your knowledge before the big day.",
  },
];


/* ==============================
   SERVICES
============================== */

export const SERVICES = {
  education: {
    title: "Education Consultancy",
    icon: <GraduationCap className="w-8 h-8 text-blue-700" />,
    items: [
      "Career planning & stream selection",
      "University shortlisting (India & Abroad)",
      "Admission applications & SOP guidance",
      "Visa documentation & approval assistance",
      "Spoken English, French & German training",
      "IELTS, TOEFL, GRE, GMAT, SAT, PTE, DUOLINGO & CELPIP preparation",
    ],
  },
};


/* ==============================
   NAVIGATION LINKS
============================== */

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Education Services", href: "/#education" },
  { label: "Career Hub", href: "/#career-hub" },
  { label: "Blogs", href: "/#blogs" },
  { label: "Contact", href: "/#contact" },
];


/* ==============================
   LOGO COMPONENT
============================== */

export const Logo = () => (
  <div className="flex items-center gap-2 group">
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-blue-900 rounded-full scale-110 group-hover:rotate-12 transition-transform duration-300"></div>

      <GraduationCap className="relative text-white w-6 h-6 z-10" />

      <div className="absolute -bottom-1 -right-1 bg-amber-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
        <span className="text-[10px] text-white font-bold">∞</span>
      </div>
    </div>

    <div className="flex flex-col -space-y-1">
      <span className="font-serif text-xl font-bold text-blue-900 leading-tight">
        VIDYA INFINITY
      </span>
      <span className="text-[10px] uppercase tracking-widest text-blue-700 font-semibold">
        Global Education Architects
      </span>
    </div>
  </div>
);
