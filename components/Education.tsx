import React from 'react';
import { Scale, Wind, Thermometer, ChefHat, Leaf } from 'lucide-react';
import { Language } from '../App';

interface EducationProps {
  language: Language;
}

const Education: React.FC<EducationProps> = ({ language }) => {
  const t = {
    mainTitle: language === 'GR' ? 'BOMBOLO: Η ΟΥΣΙΑ ΤΗΣ ΠΟΙΟΤΗΤΑΣ' : 'BOMBOLO: THE ESSENCE OF ARTISAN QUALITY',
    subtitle: language === 'GR' ? 'Γεγονότα & Διαφορές' : 'Facts & Differences',
    colGelato: language === 'GR' ? 'GELATO ARTESANAL (Bombolo)' : 'ARTISAN GELATO (Bombolo)',
    colIceCream: language === 'GR' ? 'ΠΑΓΩΤΟ (ICE CREAM)' : 'ICE CREAM',
    
    // Headers
    fat: language === 'GR' ? 'Λιπαρά' : 'Fat Content',
    texture: language === 'GR' ? 'Υφή & Αέρας' : 'Texture & Air',
    temp: language === 'GR' ? 'Θερμοκρασία' : 'Temperature',
    prod: language === 'GR' ? 'Παραγωγή' : 'Production',

    // Content Gelato
    fatG: language === 'GR' ? '4% έως 8%. Χαμηλά λιπαρά, ισορροπημένη γεύση.' : '4% to 8%. Low fat, balanced flavor.',
    texG: language === 'GR' ? 'Αργή ανάδευση (Low Overrun). Πυκνό, κρεμώδες, σχεδόν ελαστικό.' : 'Slow churn (Low Overrun). Dense, creamy, almost elastic.',
    tempG: language === 'GR' ? '-11°C. Σερβίρεται πιο ζεστό, αναδεικνύοντας τη γεύση.' : '-11°C. Served warmer, enhancing flavor.',
    prodG: language === 'GR' ? 'Φτιαγμένο από το μηδέν, καθημερινά στο κατάστημα.' : 'Made from scratch, fresh daily in-store.',

    // Content Ice Cream
    fatI: language === 'GR' ? '14% ή περισσότερο. Υψηλά λιπαρά.' : '14% or more. High fat content.',
    texI: language === 'GR' ? 'Γρήγορη ανάδευση. Πολύς αέρας, ελαφρύ και ογκώδες.' : 'Fast churn. High air content, light and fluffy.',
    tempI: language === 'GR' ? '-18°C. Πολύ κρύο, "μουδιάζει" τη γεύση.' : '-18°C. Deep frozen, numbs the palate.',
    prodI: language === 'GR' ? 'Βιομηχανική παραγωγή. Συχνά χρησιμοποιεί έτοιμες βάσεις.' : 'Industrial scale. Often uses pre-made bases.',
  };

  const rows = [
    { icon: Scale, label: t.fat, gelato: t.fatG, icecream: t.fatI },
    { icon: Wind, label: t.texture, gelato: t.texG, icecream: t.texI },
    { icon: Thermometer, label: t.temp, gelato: t.tempG, icecream: t.tempI },
    { icon: ChefHat, label: t.prod, gelato: t.prodG, icecream: t.prodI },
  ];

  return (
    <div className="py-24 bg-brand-cream relative">
       <div className="container mx-auto px-4 md:px-12">
         
         {/* Header */}
         <div className="text-center mb-16">
            <h2 className="text-brand-pistachio font-bold tracking-[0.2em] uppercase text-sm mb-3">{t.subtitle}</h2>
            <h3 className="font-serif text-3xl md:text-5xl text-brand-dark uppercase">{t.mainTitle}</h3>
         </div>

         {/* Comparison Table */}
         <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-brand-gold/20">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-brand-dark text-white py-6 px-4 md:px-8 border-b-4 border-brand-gold">
               <div className="col-span-12 md:col-span-2 hidden md:flex items-center justify-center font-bold uppercase tracking-widest text-xs opacity-50">Feature</div>
               <div className="col-span-6 md:col-span-5 text-center font-serif text-lg md:text-xl text-brand-gold font-bold">{t.colGelato}</div>
               <div className="col-span-6 md:col-span-5 text-center font-serif text-lg md:text-xl text-gray-400 font-bold">{t.colIceCream}</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-100">
               {rows.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-12 py-6 px-4 md:px-8 hover:bg-brand-cream/30 transition-colors items-center group">
                     
                     {/* Label / Icon */}
                     <div className="col-span-12 md:col-span-2 flex md:flex-col items-center justify-center gap-3 mb-4 md:mb-0 text-brand-pistachio">
                        <div className="p-2 bg-brand-pistachio/10 rounded-full">
                           <row.icon size={24} />
                        </div>
                        <span className="font-bold text-xs uppercase tracking-widest text-gray-500">{row.label}</span>
                     </div>

                     {/* Gelato Side */}
                     <div className="col-span-6 md:col-span-5 text-center px-2 md:px-6 border-r border-dashed border-gray-200">
                        <p className="text-brand-dark font-medium md:text-lg leading-relaxed">{row.gelato}</p>
                     </div>

                     {/* Ice Cream Side */}
                     <div className="col-span-6 md:col-span-5 text-center px-2 md:px-6">
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{row.icecream}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

       </div>
    </div>
  );
};

export default Education;