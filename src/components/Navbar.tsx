
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Logo, NAV_LINKS, CONTACT_INFO } from '../constants';
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <Link to="/">
  <Logo />
</Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a 
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg transition-all hover:-translate-y-1"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute w-full bg-white shadow-2xl transition-all duration-300 ${isOpen ? 'top-full opacity-100 visible' : 'top-[120%] opacity-0 invisible'}`}>
        <div className="flex flex-col p-6 gap-4">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a 
            href={`tel:${CONTACT_INFO.phone}`}
            className="flex items-center gap-3 text-blue-700 font-bold text-lg mt-2"
          >
            <Phone size={20} />
            {CONTACT_INFO.phone}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
