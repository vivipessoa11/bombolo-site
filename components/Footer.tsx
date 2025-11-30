import React from 'react';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';
import { Language } from '../App';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="bg-black text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h4 className="font-serif text-3xl font-bold mb-2">Bombolo</h4>
            <p className="text-gray-400 text-sm tracking-wide">
              {language === 'GR' ? 'Αυθεντικό Χειροποίητο Gelato' : 'Authentic Artisanal Gelato'}
            </p>
          </div>

          <div className="flex space-x-8 mb-8 md:mb-0">
             <a href="https://instagram.com" className="hover:text-brand-gold transition-colors"><Instagram size={24} /></a>
             <a href="https://facebook.com" className="hover:text-brand-gold transition-colors"><Facebook size={24} /></a>
             <a href="https://youtube.com" className="hover:text-brand-gold transition-colors"><Youtube size={24} /></a>
          </div>

          <div className="text-center md:text-right">
            <a href="mailto:info@bombologelato.com" className="flex items-center gap-2 justify-center md:justify-end hover:text-brand-gold transition-colors mb-2">
                <Mail size={16} />
                <span>info@bombologelato.com</span>
            </a>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Bombolo Gelato. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;