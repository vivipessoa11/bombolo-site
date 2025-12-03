import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, ExternalLink, Loader2, Navigation } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Reveal } from './Reveal';
import { Language } from '../App';

interface LocationsProps {
  language: Language;
}

const Locations: React.FC<LocationsProps> = ({ language }) => {
  const [locationData, setLocationData] = useState({
    mitropoleos: { hours: 'Loading...', link: null as string | null },
    toumpa: { hours: 'Loading...', link: null as string | null }
  });

  const t = {
    visit: language === 'GR' ? 'Επισκεφθείτε μας' : 'Visit Us',
    locations: language === 'GR' ? 'Τα Καταστήματα' : 'Our Locations',
    center: language === 'GR' ? 'Κέντρο' : 'City Center',
    address: language === 'GR' ? 'Διεύθυνση' : 'Address',
    hours: language === 'GR' ? 'Ώρες Λειτουργίας' : 'Opening Hours',
    contact: language === 'GR' ? 'Επικοινωνία' : 'Contact',
  };

  useEffect(() => {
    const fetchRealTimeHours = async () => {
      try {
        const hasKey = (window as any).aistudio
          ? await (window as any).aistudio.hasSelectedApiKey()
          : !!process.env.API_KEY;

        if (!hasKey) {
          throw new Error("No API Key selected");
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = "gemini-2.5-flash";

        const p1 = ai.models.generateContent({
          model,
          contents: "What are the opening hours for Bombolo Gelato at Mitropoleos 88 Thessaloniki today? Be concise, just state the hours.",
          config: { tools: [{ googleMaps: {} }] },
        });

        const p2 = ai.models.generateContent({
          model,
          contents: "What are the opening hours for Bombolo Gelato at Grigoriou Lampraki 150 Thessaloniki today? Be concise, just state the hours.",
          config: { tools: [{ googleMaps: {} }] },
        });

        const [resp1, resp2] = await Promise.all([p1, p2]);

        const text1 = resp1.text || "Check Google Maps for hours";
        const chunks1 = resp1.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const link1 = chunks1?.find((c: any) => c.web?.uri || c.maps?.uri);
        const uri1 = link1?.web?.uri || link1?.maps?.uri;

        const text2 = resp2.text || "Check Google Maps for hours";
        const chunks2 = resp2.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const link2 = chunks2?.find((c: any) => c.web?.uri || c.maps?.uri);
        const uri2 = link2?.web?.uri || link2?.maps?.uri;

        setLocationData({
          mitropoleos: { hours: text1, link: uri1 || "https://maps.google.com/?q=Bombolo+Gelato+Mitropoleos+88+Thessaloniki" },
          toumpa: { hours: text2, link: uri2 || "https://maps.google.com/?q=Bombolo+Gelato+Grigoriou+Lampraki+150+Thessaloniki" }
        });

      } catch (error) {
        setLocationData({
          mitropoleos: { hours: 'Mon-Sun: 12:00 PM - 12:00 AM (Est.)', link: "https://maps.google.com/?q=Bombolo+Gelato+Mitropoleos+88+Thessaloniki" },
          toumpa: { hours: 'Mon-Sun: 12:00 PM - 12:00 AM (Est.)', link: "https://maps.google.com/?q=Bombolo+Gelato+Grigoriou+Lampraki+150+Thessaloniki" }
        });
      }
    };

    fetchRealTimeHours();
  }, []);

  return (
    <div className="py-24 bg-brand-dark text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal width="100%">
            <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 text-center">{t.visit}</h2>
          </Reveal>
          <Reveal width="100%" delay={200}>
            <h3 className="font-serif text-4xl md:text-5xl text-white text-center">{t.locations}</h3>
          </Reveal>
        </div>

        <div className="flex lg:grid lg:grid-cols-2 gap-6 lg:gap-12 overflow-x-auto snap-x snap-mandatory pb-8 lg:pb-0 scrollbar-hide">
          {/* Location 1: Mitropoleos */}
          <Reveal width="100%" className="min-w-[85vw] lg:min-w-0 snap-center">
            <div className="flex flex-col bg-white/5 rounded-lg border border-white/10 hover:border-brand-gold/50 transition-colors overflow-hidden h-full">
              <div className="w-full h-64 relative bg-gray-800">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://maps.google.com/maps?q=Bombolo+Gelato+Mitropoleos+88+Thessaloniki&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  title="Bombolo Mitropoleos Map"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pointer-events-none">
                  <span className="bg-brand-dark px-3 py-1 text-xs uppercase tracking-widest font-bold text-brand-gold">{t.center}</span>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <h4 className="font-serif text-3xl text-brand-gold">Mitropoleos</h4>
                  <a
                    href={locationData.mitropoleos.link || "https://maps.google.com/?q=Bombolo+Gelato+Mitropoleos+88+Thessaloniki"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-brand-gold text-brand-dark rounded-full hover:bg-white transition-colors"
                    title="Get Directions"
                  >
                    <Navigation size={20} />
                  </a>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 text-gray-300 group">
                    <div className="p-2 bg-white/5 rounded-full group-hover:text-brand-gold transition-colors">
                      <MapPin className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase tracking-wide text-sm mb-1">{t.address}</p>
                      <p className="font-serif text-lg leading-relaxed">Mitropoleos 88<br />Thessaloniki 546 22</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-gray-300 group">
                    <div className="p-2 bg-white/5 rounded-full group-hover:text-brand-gold transition-colors">
                      <Clock className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase tracking-wide text-sm mb-1">{t.hours}</p>
                      <div className="font-serif text-lg">
                        {locationData.mitropoleos.hours === 'Loading...' ? (
                          <span className="flex items-center gap-2 italic text-base text-gray-400"><Loader2 className="animate-spin w-4 h-4" /> Live checking...</span>
                        ) : (
                          <p>{locationData.mitropoleos.hours}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-gray-300 group">
                    <div className="p-2 bg-white/5 rounded-full group-hover:text-brand-gold transition-colors">
                      <Phone className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase tracking-wide text-sm mb-1">{t.contact}</p>
                      <p className="font-serif text-lg">+30 231 022 9398</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Location 2: Toumpa */}
          <Reveal width="100%" delay={200} className="min-w-[85vw] lg:min-w-0 snap-center">
            <div className="flex flex-col bg-white/5 rounded-lg border border-white/10 hover:border-brand-gold/50 transition-colors overflow-hidden h-full">
              <div className="w-full h-64 relative bg-gray-800">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://maps.google.com/maps?q=Bombolo+Gelato+Grigoriou+Lampraki+150+Thessaloniki&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  title="Bombolo Toumpa Map"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pointer-events-none">
                  <span className="bg-brand-dark px-3 py-1 text-xs uppercase tracking-widest font-bold text-brand-gold">Toumpa</span>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <h4 className="font-serif text-3xl text-brand-gold">Grigoriou Lampraki</h4>
                  <a
                    href={locationData.toumpa.link || "https://maps.google.com/?q=Bombolo+Gelato+Grigoriou+Lampraki+150+Thessaloniki"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-brand-gold text-brand-dark rounded-full hover:bg-white transition-colors"
                    title="Get Directions"
                  >
                    <Navigation size={20} />
                  </a>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 text-gray-300 group">
                    <div className="p-2 bg-white/5 rounded-full group-hover:text-brand-gold transition-colors">
                      <MapPin className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase tracking-wide text-sm mb-1">{t.address}</p>
                      <p className="font-serif text-lg leading-relaxed">Grigoriou Lampraki 150<br />Thessaloniki 543 51</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-gray-300 group">
                    <div className="p-2 bg-white/5 rounded-full group-hover:text-brand-gold transition-colors">
                      <Clock className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase tracking-wide text-sm mb-1">{t.hours}</p>
                      <div className="font-serif text-lg">
                        {locationData.toumpa.hours === 'Loading...' ? (
                          <span className="flex items-center gap-2 italic text-base text-gray-400"><Loader2 className="animate-spin w-4 h-4" /> Live checking...</span>
                        ) : (
                          <p>{locationData.toumpa.hours}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-gray-300 group">
                    <div className="p-2 bg-white/5 rounded-full group-hover:text-brand-gold transition-colors">
                      <Phone className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase tracking-wide text-sm mb-1">{t.contact}</p>
                      <p className="font-serif text-lg">+30 231 022 9398</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Locations;