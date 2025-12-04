import React, { useState, useEffect } from 'react';
import { Facebook, Instagram } from 'lucide-react';

// Custom TikTok SVG since it is not in all Lucide versions
const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const StickySocials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      <div className="flex flex-col bg-brand-dark rounded-l-lg shadow-lg overflow-hidden border-l border-t border-b border-white/10">
        <a
          href="https://instagram.com/bomboloskg/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 text-brand-cream hover:bg-brand-gold hover:text-white transition-colors duration-300 flex justify-center items-center group"
          aria-label="Instagram"
        >
          <Instagram size={20} strokeWidth={1.5} />
        </a>
        <div className="h-px w-full bg-white/10"></div>
        <a
          href="https://www.facebook.com/bomboloskg"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 text-brand-cream hover:bg-brand-gold hover:text-white transition-colors duration-300 flex justify-center items-center group"
          aria-label="Facebook"
        >
          <Facebook size={20} strokeWidth={1.5} />
        </a>
        <div className="h-px w-full bg-white/10"></div>
        <a
          href="https://www.tiktok.com/@bombologelato"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 text-brand-cream hover:bg-brand-gold hover:text-white transition-colors duration-300 flex justify-center items-center group"
          aria-label="TikTok"
        >
          <TikTokIcon size={20} />
        </a>
      </div>
    </div>
  );
};

export default StickySocials;