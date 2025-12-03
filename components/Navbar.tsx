import React, { useState } from 'react';
import { Menu, X, Bike, Sparkles } from 'lucide-react';
import { Language } from '../App';
import logosvg from '../src/assets/logosvgsite.svg';

interface NavbarProps {
  scrolled: boolean;
  onOpenContact: () => void;

  language: Language;
  setLanguage: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, onOpenContact, language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const t = {
    story: language === 'GR' ? 'Η Ιστορία μας' : 'Our Story',
    difference: language === 'GR' ? 'Gelato vs Ice Cream' : 'Gelato vs Ice Cream',
    menu: language === 'GR' ? 'Μενού' : 'Menu',
    locations: language === 'GR' ? 'Τοποθεσίες' : 'Locations',
    contact: language === 'GR' ? 'Επικοινωνία' : 'Contact',
    visit: language === 'GR' ? 'Επισκεφθείτε μας' : 'Visit Us',
    delivery: language === 'GR' ? 'Delivery' : 'Delivery',
    thessaloniki: language === 'GR' ? 'Θεσσαλονίκη' : 'Thessaloniki',

  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-sm py-2 ${scrolled ? 'bg-white border-black/5 shadow-sm' : 'bg-transparent border-white/10'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Section - Real Asset logo2 */}
        {/* Logo Section - Text Logo */}
        <a href="#home" className="flex items-center gap-4 group z-50">
          <span className={`font-serif text-3xl font-bold tracking-tighter transition-colors duration-300 ${scrolled ? 'text-brand-green' : 'text-white'}`}>
            Bombolo.
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
          <a href="#about" className={`text-xs font-bold tracking-wider uppercase hover:text-brand-red transition-colors ${scrolled ? 'text-brand-green' : 'text-white'}`}>{t.story}</a>
          <a href="#difference" className={`text-xs font-bold tracking-wider uppercase hover:text-brand-red transition-colors ${scrolled ? 'text-brand-green' : 'text-white'}`}>{t.difference}</a>
          <a href="#menu" className={`text-xs font-bold tracking-wider uppercase hover:text-brand-red transition-colors ${scrolled ? 'text-brand-green' : 'text-white'}`}>{t.menu}</a>
          <a href="#locations" className={`text-xs font-bold tracking-wider uppercase hover:text-brand-red transition-colors ${scrolled ? 'text-brand-green' : 'text-white'}`}>{t.locations}</a>

          <button
            onClick={onOpenContact}
            className={`text-xs font-bold tracking-wider uppercase hover:text-brand-red transition-colors ${scrolled ? 'text-brand-green' : 'text-white'}`}
          >
            {t.contact}
          </button>

          {/* AI Assistant Button */}


          {/* Language Toggle */}
          <div className={`flex items-center border rounded-full px-2 py-1 backdrop-blur-sm ${scrolled ? 'border-brand-gold/50 bg-brand-gold/10' : 'border-white/30 bg-black/10'}`}>
            <button
              onClick={() => setLanguage('GR')}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${language === 'GR' ? 'bg-brand-gold text-brand-dark' : scrolled ? 'text-brand-dark/70 hover:text-brand-dark' : 'text-white/70 hover:text-white'}`}
            >
              GR
            </button>
            <button
              onClick={() => setLanguage('EN')}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${language === 'EN' ? 'bg-brand-gold text-brand-dark' : scrolled ? 'text-brand-dark/70 hover:text-brand-dark' : 'text-white/70 hover:text-white'}`}
            >
              EN
            </button>
          </div>

          {/* Delivery Button */}
          <a
            href="https://wolt.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors ${scrolled ? 'text-brand-pistachio hover:text-brand-dark' : 'text-brand-pistachio bg-white/90 px-3 py-1 rounded-full hover:bg-white'
              }`}
          >
            <Bike size={16} /> {t.delivery}
          </a>

          <a
            href="#locations"
            className={`px-6 py-2 text-xs font-bold tracking-widest uppercase border transition-all duration-300 rounded-full ${scrolled
              ? 'border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white'
              : 'border-white text-white hover:bg-white hover:text-brand-dark'}`}
          >
            {t.visit}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-8 h-8 text-brand-brown" />
          ) : (
            <Menu className={`w-8 h-8 ${scrolled ? 'text-brand-green' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden absolute top-0 left-0 w-full h-screen bg-brand-cream shadow-lg transition-all duration-300 ease-in-out flex flex-col justify-center items-center ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex flex-col py-4 px-6 space-y-8 text-center items-center w-full">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => setLanguage('GR')} className={`text-xl font-bold ${language === 'GR' ? 'text-brand-brown underline decoration-2 underline-offset-4' : 'text-brand-brown/40'}`}>GR</button>
            <button onClick={() => setLanguage('EN')} className={`text-xl font-bold ${language === 'EN' ? 'text-brand-brown underline decoration-2 underline-offset-4' : 'text-brand-brown/40'}`}>EN</button>
          </div>

          <a href="#about" className="text-brand-brown font-serif text-3xl font-medium tracking-tight py-2 w-full" onClick={() => setIsOpen(false)}>{t.story}</a>
          <a href="#difference" className="text-brand-brown font-serif text-3xl font-medium tracking-tight py-2 w-full" onClick={() => setIsOpen(false)}>{t.difference}</a>
          <a href="#menu" className="text-brand-brown font-serif text-3xl font-medium tracking-tight py-2 w-full" onClick={() => setIsOpen(false)}>{t.menu}</a>
          <a href="#locations" className="text-brand-brown font-serif text-3xl font-medium tracking-tight py-2 w-full" onClick={() => setIsOpen(false)}>{t.locations}</a>

          <button
            className="text-brand-brown font-serif text-3xl font-medium tracking-tight py-2 w-full"
            onClick={() => {
              setIsOpen(false);
              onOpenContact();
            }}
          >
            {t.contact}
          </button>

          <a
            href="https://wolt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-brown/80 font-sans text-lg font-bold tracking-wide flex items-center justify-center gap-2 mt-4 py-2"
            onClick={() => setIsOpen(false)}
          >
            <Bike size={20} /> {t.delivery}
          </a>

          <a
            href="#locations"
            className="inline-block px-8 py-3 mt-6 border border-brand-brown text-brand-brown font-bold tracking-widest uppercase hover:bg-brand-brown hover:text-white transition-colors rounded-full"
            onClick={() => setIsOpen(false)}
          >
            {t.visit}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;