import React, { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
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
import InstagramFeed from './components/InstagramFeed';
import DeliveryModal from './components/DeliveryModal';
import MobileQuickMenu from './components/MobileQuickMenu';
import CookieConsent from './components/CookieConsent';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';


export type Language = 'GR' | 'EN';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string | null>(null);

  // Default Language is Greek as requested
  const [language, setLanguage] = useState<Language>('GR');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Initialize Google Analytics
    if (import.meta.env.VITE_GA_MEASUREMENT_ID && import.meta.env.VITE_GA_MEASUREMENT_ID.startsWith('G-')) {
      ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleOpenContact = (subject?: string) => {
    setContactSubject(subject || null);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden w-full">
      <Preloader />
      <CustomCursor />
      <Navbar
        scrolled={scrolled}
        onOpenContact={() => handleOpenContact()}
        onOpenDelivery={() => setIsDeliveryOpen(true)}
        language={language}
        setLanguage={setLanguage}
      />
      <StickySocials />
      <MobileQuickMenu language={language} onOpenDelivery={() => setIsDeliveryOpen(true)} />
      <CookieConsent language={language} />

      {/* Modals */}
      <ContactForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        language={language}
        initialSubject={contactSubject}
      />

      <DeliveryModal
        isOpen={isDeliveryOpen}
        onClose={() => setIsDeliveryOpen(false)}
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

        {/* Instagram Feed */}
        <section id="social">
          <InstagramFeed language={language} />
        </section>

      </main>
      <Footer language={language} onOpenContact={handleOpenContact} />
    </div>
  );
}