import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import Education from './components/Education';
import MenuHighlights from './components/MenuHighlights';
import SocialProof from './components/SocialProof';
import Locations from './components/Locations';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import StickySocials from './components/StickySocials';


export type Language = 'GR' | 'EN';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Default Language is Greek as requested
  const [language, setLanguage] = useState<Language>('GR');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar
        scrolled={scrolled}
        onOpenContact={() => setIsContactOpen(true)}

        language={language}
        setLanguage={setLanguage}
      />
      <StickySocials />



      {/* Contact Modal (Overlay) */}
      <ContactForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        language={language}
      />

      <main className="flex-grow">
        {/* Home/Hero Section */}
        <section id="home">
          <Hero language={language} />
        </section>

        {/* Infographic / Educational Section */}
        <section id="difference">
          <Education language={language} />
        </section>

        {/* Our Story Section */}
        <section id="about">
          <Story language={language} />
        </section>

        {/* Menu Section - ID matches Navbar link */}
        <section id="menu">
          <MenuHighlights language={language} />
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="bg-white">
          <SocialProof language={language} />
        </section>

        {/* Locations Section - ID matches Navbar link */}
        <section id="locations">
          <Locations language={language} />
        </section>

      </main>
      <Footer language={language} />
    </div>
  );
}