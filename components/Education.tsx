import React from 'react';
import { Milk, Wind, ThermometerSun, Sparkles } from 'lucide-react';
import { Language } from '../App';
import { Reveal } from './Reveal';
import pistachioImage from '../src/assets/pistachio.jpg';

interface EducationProps {
   language: Language;
}

const Education: React.FC<EducationProps> = ({ language }) => {
   const t = {
      title: language === 'GR' ? 'BOMBOLO: Η ΟΥΣΙΑ ΤΗΣ ΠΟΙΟΤΗΤΑΣ' : 'BOMBOLO: THE ESSENCE OF QUALITY',
      subtitle: language === 'GR'
         ? 'Το Gelato δεν είναι απλώς παγωτό. Είναι μια εμπειρία γεύσης, υφής και θερμοκρασίας.'
         : 'Gelato is not just ice cream. It is an experience of taste, texture, and temperature.',
      cards: [
         {
            icon: Milk,
            title: language === 'GR' ? 'Αγνά Υλικά' : 'Pure Ingredients',
            desc: language === 'GR'
               ? 'Περισσότερο φρέσκο γάλα, λιγότερη κρέμα. Μια καθαρή βάση που αναδεικνύει την αληθινή γεύση.'
               : 'More fresh milk, less cream. A clean base that highlights the true flavor.',
         },
         {
            icon: Wind,
            title: language === 'GR' ? 'Λιγότερος Αέρας' : 'Less Air',
            desc: language === 'GR'
               ? 'Το Gelato αναδεύεται αργά. Αποτέλεσμα: πυκνή, βελούδινη υφή χωρίς κρυστάλλους.'
               : 'Gelato is churned slowly. Result: dense, velvety texture without crystals.',
         },
         {
            icon: ThermometerSun,
            title: language === 'GR' ? 'Θερμοκρασία' : 'Temperature',
            desc: language === 'GR'
               ? 'Σερβίρεται σε υψηλότερη θερμοκρασία (-13°C) για να μην "παγώνει" τη γεύση στο στόμα.'
               : 'Served at a higher temperature (-13°C) so it doesn\'t "freeze" the flavor in your mouth.',
         },
         {
            icon: Sparkles,
            title: language === 'GR' ? 'Το Αποτέλεσμα' : 'The Result',
            desc: language === 'GR'
               ? 'Μια έκρηξη γεύσης που διαρκεί. Λιγότερα λιπαρά, περισσότερη απόλαυση.'
               : 'An explosion of flavor that lasts. Less fat, more pleasure.',
         },
      ]
   };

   return (
      <div className="py-24 bg-brand-cream overflow-hidden">
         <div className="container mx-auto px-6">

            {/* Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
               <Reveal width="100%">
                  <h2 className="font-serif text-3xl md:text-5xl text-brand-dark mb-6 leading-tight">
                     {t.title}
                  </h2>
               </Reveal>
               <Reveal width="100%" delay={200}>
                  <p className="text-brand-brown/80 text-lg md:text-xl font-light leading-relaxed">
                     {t.subtitle}
                  </p>
               </Reveal>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

               {/* Cards Grid */}
               <div className="lg:w-1/2 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {t.cards.map((card, idx) => (
                        <Reveal key={idx} width="100%" delay={idx * 150}>
                           <div className="bg-white p-8 rounded-xl shadow-sm border border-brand-gold/20 hover:shadow-md transition-shadow duration-300 h-full flex flex-col items-start group">
                              <div className="p-3 bg-brand-cream rounded-full text-brand-dark mb-4 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                 <card.icon size={24} strokeWidth={1.5} />
                              </div>
                              <h3 className="font-serif text-xl font-bold text-brand-dark mb-3">
                                 {card.title}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                 {card.desc}
                              </p>
                           </div>
                        </Reveal>
                     ))}
                  </div>
               </div>

               {/* Real Photo */}
               <div className="lg:w-1/2 w-full relative">
                  <Reveal width="100%" delay={400}>
                     <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
                        <img
                           src={pistachioImage}
                           alt="Authentic Bombolo Gelato"
                           className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                           loading="lazy"
                        />
                        {/* Overlay Badge */}
                        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-lg shadow-lg border-l-4 border-brand-gold">
                           <p className="font-serif text-brand-dark text-lg font-bold">100% Artisan</p>
                           <p className="text-xs text-gray-500 uppercase tracking-wider">Made Daily</p>
                        </div>
                     </div>
                  </Reveal>
               </div>

            </div>
         </div>
      </div>
   );
};

export default Education;