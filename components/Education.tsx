import React from 'react';
import { Language } from '../App';
import differenceImage from '../src/assets/gelatovsicecream.svg';
import { Reveal } from './Reveal';

interface EducationProps {
   language: Language;
}

const Education: React.FC<EducationProps> = ({ language }) => {
   const t = {
      mainTitle: language === 'GR' ? 'BOMBOLO: Η ΟΥΣΙΑ ΤΗΣ ΠΟΙΟΤΗΤΑΣ' : 'BOMBOLO: THE ESSENCE OF ARTISAN QUALITY',
      subtitle: language === 'GR' ? 'Γεγονότα & Διαφορές' : 'Facts & Differences',
   };

   return (
      <div className="py-24 bg-brand-cream relative">
         <div className="container mx-auto px-4 md:px-12">

            {/* Header */}
            <div className="text-center mb-16 flex flex-col items-center">
               <Reveal width="100%">
                  <h2 className="text-brand-pistachio font-bold tracking-[0.2em] uppercase text-sm mb-3 text-center">{t.subtitle}</h2>
               </Reveal>
               <Reveal width="100%" delay={200}>
                  <h3 className="font-serif text-3xl md:text-5xl text-brand-dark uppercase text-center">{t.mainTitle}</h3>
               </Reveal>
            </div>

            {/* Comparison Image */}
            <Reveal width="100%" delay={400}>
               <div className="max-w-3xl mx-auto">
                  <img
                     src={differenceImage}
                     alt="Gelato vs Ice Cream Differences"
                     className="w-full h-auto object-contain"
                     loading="lazy"
                  />
               </div>
            </Reveal>

         </div>
      </div>
   );
};

export default Education;