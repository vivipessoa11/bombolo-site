import React, { useState, useEffect } from 'react';
import { Menu, X, Bike } from 'lucide-react';
import { Language } from '../App';

interface NavbarProps {
  scrolled: boolean;
  onOpenContact: () => void;
  onOpenDelivery: () => void;

  language: Language;
  setLanguage: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, onOpenContact, onOpenDelivery, language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const t = {
    story: language === 'GR' ? 'Η Ιστορία μας' : 'Our Story',
    difference: language === 'GR' ? 'Gelato vs Ice Cream' : 'Gelato vs Ice Cream',
    menu: language === 'GR' ? 'Μενού' : 'Menu',
    locations: language === 'GR' ? 'Τοποθεσίες' : 'Locations',
    contact: language === 'GR' ? 'Επικοινωνία' : 'Contact',
    visit: language === 'GR' ? 'Επισκεφθείτε μας' : 'Visit Us',
    delivery: language === 'GR' ? 'Delivery' : 'Delivery',
  };

  const navLinks = [
    { href: '#about', label: t.story },
    { href: '#difference', label: t.difference },
    { href: '#menu', label: t.menu },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b backdrop-blur-md py-4 ${scrolled ? 'bg-white/90 border-brand-dark/5 shadow-sm' : 'bg-transparent border-white/10'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">

          {/* Logo */}
          <a href="#home" className="relative z-50 group">
            <span className={`font-serif text-3xl font-bold tracking-tighter transition-colors duration-300 ${isOpen ? 'text-brand-dark' : scrolled ? 'text-brand-dark' : 'text-white'}`}>
              Bombolo.
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-bold tracking-widest uppercase hover:text-brand-gold transition-colors duration-300 ${scrolled ? 'text-brand-dark' : 'text-white'}`}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={onOpenContact}
              className={`text-xs font-bold tracking-widest uppercase hover:text-brand-gold transition-colors duration-300 ${scrolled ? 'text-brand-dark' : 'text-white'}`}
            >
              {t.contact}
            </button>

            {/* Language Toggle */}
            <div className={`flex items-center border rounded-full px-1 py-1 backdrop-blur-sm transition-colors duration-300 ${scrolled ? 'border-brand-dark/20 bg-brand-dark/5' : 'border-white/30 bg-white/10'}`}>
              <button
                onClick={() => setLanguage('GR')}
                className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${language === 'GR' ? 'bg-brand-gold text-brand-dark shadow-sm' : scrolled ? 'text-brand-dark/60 hover:text-brand-dark' : 'text-white/70 hover:text-white'}`}
              >
                GR
              </button>
              <button
                onClick={() => setLanguage('EN')}
                className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${language === 'EN' ? 'bg-brand-gold text-brand-dark shadow-sm' : scrolled ? 'text-brand-dark/60 hover:text-brand-dark' : 'text-white/70 hover:text-white'}`}
              >
                EN
              </button>
            </div>

            {/* Delivery Button */}
            <button
              onClick={onOpenDelivery}
              className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 ${scrolled ? 'text-brand-dark hover:text-brand-gold' : 'text-white hover:text-brand-gold'}`}
            >
              <Bike size={18} strokeWidth={1.5} /> {t.delivery}
            </button>

            {/* Visit Us Button */}
            <a
              href="#locations"
              className={`px-6 py-2 text-xs font-bold tracking-widest uppercase border transition-all duration-300 rounded-sm hover:-translate-y-0.5 hover:shadow-lg ${scrolled
                ? 'border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-gold'
                : 'border-white text-white hover:bg-white hover:text-brand-dark'}`}
            >
              {t.visit}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden focus:outline-none z-50 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <div className={`relative w-6 h-5 transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : ''}`}>
              {isOpen ? (
                <X className="w-8 h-8 text-brand-dark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={1.5} />
              ) : (
                <Menu className={`w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${scrolled ? 'text-brand-dark' : 'text-white'}`} strokeWidth={1.5} />
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none delay-200'
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-brand-cream/80 backdrop-blur-xl transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col justify-center px-10 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Language Switcher Mobile */}
          <div className="absolute top-8 left-8 flex gap-4">
            <button onClick={() => setLanguage('GR')} className={`text-sm font-bold tracking-widest transition-colors ${language === 'GR' ? 'text-brand-dark border-b-2 border-brand-gold' : 'text-gray-400'}`}>GR</button>
            <button onClick={() => setLanguage('EN')} className={`text-sm font-bold tracking-widest transition-colors ${language === 'EN' ? 'text-brand-dark border-b-2 border-brand-gold' : 'text-gray-400'}`}>EN</button>
          </div>

          <div className="flex flex-col space-y-6">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-serif text-4xl md:text-5xl text-brand-dark hover:text-brand-gold transition-all duration-500 transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  }`}
                style={{ transitionDelay: `${100 + idx * 100}ms` }}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenContact();
              }}
              className={`text-left font-serif text-4xl md:text-5xl text-brand-dark hover:text-brand-gold transition-all duration-500 transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
              style={{ transitionDelay: `${100 + navLinks.length * 100}ms` }}
            >
              {t.contact}
            </button>
          </div>

          <div
            className={`mt-12 pt-12 border-t border-gray-100 flex flex-col gap-6 transition-all duration-700 delay-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
          >
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenDelivery();
              }}
              className="flex items-center gap-3 text-brand-dark hover:text-brand-gold transition-colors group"
            >
              <div className="p-3 bg-gray-50 rounded-full group-hover:bg-brand-gold/10 transition-colors">
                <Bike size={24} strokeWidth={1.5} />
              </div>
              <span className="font-bold tracking-widest uppercase text-sm">{t.delivery}</span>
            </button>

            <a
              href="#locations"
              onClick={() => setIsOpen(false)}
              className="inline-block text-center w-full py-4 bg-brand-dark text-brand-gold font-bold tracking-widest uppercase text-sm rounded-sm hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 shadow-lg"
            >
              {t.visit}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;