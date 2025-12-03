import React from 'react';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';
import { Language } from '../App';

interface FooterProps {
  language: Language;
  onOpenContact: (subject?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ language, onOpenContact }) => {
  return (
    <footer className="bg-brand-cream text-brand-brown py-10 border-t border-brand-brown/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          {/* Column 1: Brand */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-2xl font-bold text-brand-brown mb-2">Bombolo.</h4>
            <p className="text-brand-brown/70 text-xs tracking-wide max-w-xs mx-auto md:mx-0">
              {language === 'GR' ? 'Αυθεντικό Gelato.' : 'Authentic Gelato.'}
            </p>
          </div>

          {/* Column 2: Locations */}
          <div className="text-center">
            <ul className="space-y-1 text-xs text-brand-brown/80 font-medium">
              <li>Mitropoleos 88</li>
              <li>Grigoriou Lampraki 150</li>
            </ul>
            <button
              onClick={() => onOpenContact('Franchise')}
              className="mt-4 text-[10px] uppercase tracking-widest font-bold text-brand-gold hover:text-brand-dark transition-colors border-b border-brand-gold/50 pb-0.5"
            >
              {language === 'GR' ? 'Franchise & Συνεργασιες' : 'Franchise & B2B'}
            </button>
          </div>

          {/* Column 3: Contact & Social */}
          <div className="text-center md:text-right flex flex-col items-center md:items-end gap-4">
            <a href="mailto:info@bombologelato.com" className="flex items-center gap-2 hover:text-brand-gold transition-colors group">
              <Mail size={16} />
              <span className="font-medium text-sm">info@bombologelato.com</span>
            </a>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="hover:text-brand-gold transition-colors"><Instagram size={18} /></a>
              <a href="https://facebook.com" className="hover:text-brand-gold transition-colors"><Facebook size={18} /></a>
              <a href="https://youtube.com" className="hover:text-brand-gold transition-colors"><Youtube size={18} /></a>
            </div>
            <p className="text-brand-brown/40 text-[10px]">
              © {new Date().getFullYear()} Bombolo Gelato.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;