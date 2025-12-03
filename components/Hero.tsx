import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Language } from '../App';
import pistachioHero from '../src/assets/pistachio.jpg';
import chocolateHero from '../src/assets/chocolate.jpg';
import fragolaHero from '../src/assets/fragola.jpg';
import waffleHero from '../src/assets/waffle.jpg';
import cafeHero from '../src/assets/CAFFE AFFOGATO.JPG';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const images = [pistachioHero, chocolateHero, fragolaHero, waffleHero, cafeHero];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-brand-dark">

      {/* Background Image Slideshow */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <img
            src={img}
            alt="Bombolo Gelato"
            className="w-full h-full object-cover object-center hero-zoom"
            loading={index === 0 ? "eager" : "lazy"}
            {...({ fetchPriority: index === 0 ? "high" : "auto" } as React.ImgHTMLAttributes<HTMLImageElement>)}
          />
          {/* Lighter Overlay */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center h-full mt-0">

        {/* Main Headline - Specific Greek Text */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl text-brand-cream font-medium leading-tight mb-2 drop-shadow-2xl animate-slide-up">
            {language === 'GR' ? 'Βελούδινη Υφή. Κρεμώδες.' : 'Velvety Texture. Creamy.'}
          </h1>
          <h2 className="font-serif text-3xl md:text-6xl lg:text-7xl text-white font-medium leading-tight mb-8 drop-shadow-2xl italic animate-slide-up delay-200">
            {language === 'GR' ? 'Αυθεντικό.' : 'Authentic.'}
          </h2>
        </div>

        {/* Minimal CTA */}
        <div className="animate-fade-in delay-500">
          <a
            href="#menu"
            className="group relative px-8 py-3 bg-brand-red text-white font-sans text-xs md:text-sm tracking-[0.25em] uppercase transition-all duration-300 hover:bg-brand-red/90 hover:scale-105 shadow-lg"
          >
            <span className="relative z-10">{language === 'GR' ? 'Ανακαλυψτε' : 'Discover'}</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
        <a href="#difference" className="text-brand-cream hover:text-[#D4C4A8] transition-colors duration-300" aria-label="Scroll Down">
          <ArrowDown size={28} strokeWidth={1} />
        </a>
      </div>
    </div>
  );
};

export default Hero;