import React from 'react';
import { Globe2, ChefHat, Droplet } from 'lucide-react';
import { Language } from '../App';
import bitterImage from '../src/assets/bitter.jpg';
import { Reveal } from './Reveal';

interface StoryProps {
  language: Language;
}

const Story: React.FC<StoryProps> = ({ language }) => {
  const t = {
    subtitle: language === 'GR' ? 'Η Ιστορία του Ιδρυτή' : 'The Founder\'s Story',
    title: language === 'GR' ? 'Από τον Κόσμο στη Θεσσαλονίκη' : 'From The World to Thessaloniki',
    p1: language === 'GR'
      ? 'Το Bombolo είναι το αποτέλεσμα μιας ζωής εξερεύνησης. Ο ιδρυτής μας, ένας πραγματικός πολίτης του κόσμου, ταξίδεψε εκτενώς στην Εμίλια-Ρομάνια και τη Σικελία, ξεκλειδώνοντας τα πανάρχαια μυστικά των Ιταλών "μαέστρων".'
      : 'Bombolo is the culmination of a life spent exploring. Our founder, a true citizen of the world, traveled extensively through Emilia–Romagna and Sicily, unlocking the age-old secrets of the Italian "maestros."',
    p2: language === 'GR'
      ? 'Έφερε αυτή τη γνώση πίσω στη Θεσσαλονίκη, τη γαστρονομική πρωτεύουσα της Ελλάδας. Εδώ, ενώνουμε παραδοσιακές ιταλικές τεχνικές με μια αδιάκοπη εμμονή για ποιότητα.'
      : 'He brought this knowledge back to Thessaloniki, the gastronomic capital of Greece. Here, we fuse traditional Italian techniques with a relentless obsession for quality.',
    sourceTitle: language === 'GR' ? 'Πρώτες Ύλες' : 'Premium Sourcing',
    sourceDesc: language === 'GR' ? 'Προμηθευόμαστε αυστηρά από τις καλύτερες περιοχές: Φιστίκια από το Bronte, Φουντούκια από το Πιεμόντε και Κακάο από την Κολομβία.' : 'We source strictly from the best regions: Pistachios from Bronte, Hazelnuts from Piedmont, and Cacao from Colombia.',
    prepTitle: language === 'GR' ? 'Καθημερινή Παρασκευή' : 'Prepared Daily',
    prepDesc: language === 'GR' ? 'Το εργαστήριό μας δεν σταματά ποτέ. Παράγουμε το gelato μας φρέσκο κάθε μέρα για να εξασφαλίσουμε την τέλεια πυκνή, βελούδινη υφή.' : 'Our lab never stops. We churn our gelato fresh every single day to ensure the perfect dense, velvety texture.',
    pureTitle: language === 'GR' ? 'Αγνά Συστατικά' : 'Pure Ingredients',
    pureDesc: language === 'GR' ? 'Φρέσκο γάλα, εποχιακά φρούτα και μηδενικές τεχνητές συντομεύσεις. Μόνο αγνή, αυθεντική γεύση.' : 'Fresh milk, seasonal fruits, and zero artificial shortcuts. Just pure, authentic flavor.',
  };

  return (
    <div className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pistachio/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image Composition */}
          <div className="relative">
            <Reveal width="100%">
              <div className="aspect-[4/5] md:aspect-square overflow-hidden rounded-sm shadow-2xl border-4 border-white">
                <img
                  src={bitterImage}
                  alt="Bitter Chocolate Gelato"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-10 -right-6 md:-right-10 bg-brand-dark p-8 shadow-xl max-w-xs hidden md:block">
                <div className="w-12 h-1 bg-brand-gold mb-4"></div>
                <p className="font-serif italic text-brand-cream text-lg">
                  "Excellence is not a luxury. It is our daily standard."
                </p>
              </div>
            </Reveal>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <Reveal width="100%" delay={200}>
              <div>
                <h3 className="text-brand-pistachio font-bold tracking-widest uppercase text-sm mb-2">{t.subtitle}</h3>
                <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">{t.title}</h2>
                <p className="text-brand-dark/80 leading-relaxed text-lg mb-4">
                  {t.p1}
                </p>
                <p className="text-brand-dark/80 leading-relaxed text-lg">
                  {t.p2}
                </p>
              </div>
            </Reveal>

            {/* Ingredient Highlights */}
            <div className="space-y-6 pt-4 border-t border-brand-dark/10">
              <Reveal width="100%" delay={300}>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-dark text-brand-gold p-3 rounded-full shrink-0">
                    <Globe2 size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-brand-dark font-bold">{t.sourceTitle}</h4>
                    <p className="text-brand-dark/70">{t.sourceDesc}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal width="100%" delay={400}>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-dark text-brand-gold p-3 rounded-full shrink-0">
                    <ChefHat size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-brand-dark font-bold">{t.prepTitle}</h4>
                    <p className="text-brand-dark/70">{t.prepDesc}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal width="100%" delay={500}>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-dark text-brand-gold p-3 rounded-full shrink-0">
                    <Droplet size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-brand-dark font-bold">{t.pureTitle}</h4>
                    <p className="text-brand-dark/70">{t.pureDesc}</p>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;