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
      title: language === 'GR' ? 'GELATO' : 'BOMBOLO: THE ESSENCE OF QUALITY',
      subtitle: language === 'GR'
         ? 'Μοναδικό Χειροποίητο Ιταλικό Gelato Bombolo το οποίο παράγουμε καθημερινά στο κατάστημα από φρέσκο γάλα και υψηλής ποιότητας Ιταλικές πρώτες ύλες με μοναδική κρεμώδη υφή και λίγα λιπαρά όπως ακριβώς πρέπει να είναι το ΑΥΘΕΝΤΙΚΟ και ΠΟΙΟΤΙΚΟ ΙΤΑΛΙΚΟ GELATO !!! Ολόφρεσκο, Χωρίς σκόνες, συντηρητικά και χρωστικές ουσίες. Φτιαγμένο με τα αγνότερα υλικά, ολόφρεσκα φρούτα και τις καλύτερες Ιταλικές συνταγές. Γεύσεις απίστευτες που τις δημιούργησε η γνώση και η αγάπη για το Gelato και που η κάθε μια από αυτές έχει την δική της ταυτότητα !!!'
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

            {/* Comparison Header */}
            <div className="text-center mb-8 md:mb-12">
               <span className="inline-block py-1 px-3 rounded-full bg-brand-pistachio/10 text-brand-pistachio font-bold text-xs tracking-widest uppercase mb-2">
                  {language === 'GR' ? 'Η Διαφορά' : 'The Difference'}
               </span>
               <h3 className="font-serif text-2xl md:text-3xl text-brand-dark">
                  Gelato vs Ice Cream
               </h3>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

               {/* Cards Grid / Carousel */}
               <div className="lg:w-1/2 w-full">
                  <div className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                     {t.cards.map((card, idx) => (
                        <Reveal key={idx} width="100%" delay={idx * 150} className="min-w-[280px] md:min-w-0 snap-center h-full">
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
                           className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000 animate-pulse-slow"
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