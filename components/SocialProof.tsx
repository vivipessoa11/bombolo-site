import React from 'react';
import { Star } from 'lucide-react';
import { Language } from '../App';

interface SocialProofProps {
  language: Language;
}

const SocialProof: React.FC<SocialProofProps> = ({ language }) => {
  const reviews = [
    {
      text: language === 'GR' ? '"Το καλύτερο gelato που έχω δοκιμάσει εκτός Ιταλίας. Το φυστίκι είναι απίστευτα αυθεντικό - όχι πολύ γλυκό, απλά καθαρή γεύση ξηρού καρπού."' : '"The best gelato I\'ve had outside of Italy. The Pistachio is incredibly authentic - not too sweet, just pure nutty flavor."',
      author: 'Maria K.'
    },
    {
      text: language === 'GR' ? '"Το vegan sorbet Μάνγκο είναι μαγεία. Τόσο κρεμώδες που έπρεπε να ρωτήσω δύο φορές αν όντως δεν έχει γάλα. Απλά εκπληκτικό."' : '"The vegan Mango sorbet is witchcraft. It\'s so creamy I had to ask twice if it really had no dairy. Absolutely stunning."',
      author: 'Thomas W.'
    },
    {
      text: language === 'GR' ? '"Ένα αριστούργημα αισθήσεων. Η υφή είναι πυκνή και απαλή. Μπορείς να γευτείς την ποιότητα των υλικών σε κάθε κουταλιά."' : '"A sensory masterpiece. The texture is dense and smooth. You can taste the quality of the ingredients in every spoon."',
      author: 'Eleni P.'
    }
  ];

  return (
    <div className="py-20 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-16">
            <div className="flex items-center gap-4">
                <div className="text-5xl font-serif text-brand-dark font-bold">4.6</div>
                <div className="flex flex-col">
                    <div className="flex text-brand-gold">
                        {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
                    </div>
                    <span className="text-gray-500 text-sm font-bold uppercase tracking-wider mt-1">On Google</span>
                </div>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-200"></div>
            <div className="flex items-center gap-4">
                <div className="text-5xl font-serif text-brand-dark font-bold">4.5</div>
                <div className="flex flex-col">
                    <div className="flex text-brand-gold">
                         {[...Array(5)].map((_, i) => (
                            <Star key={i} fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" className={i === 4 ? "text-brand-gold" : ""} size={20} />
                         ))}
                    </div>
                    <span className="text-gray-500 text-sm font-bold uppercase tracking-wider mt-1">On TripAdvisor</span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-lg relative">
                  <div className="text-brand-gold text-6xl font-serif absolute top-4 left-4 opacity-20">"</div>
                  <p className="text-gray-700 italic relative z-10 mb-4">
                      {review.text}
                  </p>
                  <p className="font-bold text-brand-dark text-sm uppercase tracking-wide">- {review.author}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProof;