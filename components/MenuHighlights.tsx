import React, { useState } from 'react';
import { IceCream, Coffee, Cake, UtensilsCrossed, Star, Box, Snowflake, Flame, Cloud, Heart, Droplet, ChevronDown, Info, X } from 'lucide-react';
import { Language } from '../App';
import { Reveal } from './Reveal';
import caffeAffogato from '../src/assets/CAFFE AFFOGATO.JPG';
import waffleImage from '../src/assets/waffle.jpg';
import bitterImage from '../src/assets/bitter.jpg';

type Category = 'gelato' | 'waffles' | 'coffee' | 'sweets';
type FlavorCategory = 'crema' | 'chocolate' | 'sorbet' | 'nosugar';

interface MenuHighlightsProps {
   language: Language;
}

const MenuHighlights: React.FC<MenuHighlightsProps> = ({ language }) => {
   const [activeCategory, setActiveCategory] = useState<Category>('gelato');
   const [activeFlavorCategory, setActiveFlavorCategory] = useState<FlavorCategory | null>(null);
   const [showNoSugarInfo, setShowNoSugarInfo] = useState(false);

   // Translation Helper
   const t = {
      heading: language === 'GR' ? 'Ταξίδι Αισθήσεων' : 'Sensory Journey',
      title: language === 'GR' ? 'Το Μενού μας' : 'Our Menu',
      subtitle: language === 'GR' ? 'Επιλέξτε μια κατηγορία για να εξερευνήσετε την καθημερινή μας παραγωγή.' : 'Select a category to explore our daily artisanal production.',
      gelato: language === 'GR' ? 'Χειροποίητο Gelato' : 'Gelato Artesanal',
      gelatoDesc: language === 'GR' ? 'Καθημερινή παραγωγή, Αυθεντικές γεύσεις & Vegan Sorbet.' : 'Daily prepared, Authentic Italian flavors & Vegan Sorbets.',
      waffles: language === 'GR' ? 'Βελγικές Βάφλες' : 'Belgian Waffles',
      wafflesDesc: language === 'GR' ? 'Αυθεντική συνταγή της γιαγιάς. Τραγανές & αφράτες.' : 'Authentic grandma\'s recipe. Crunchy & fluffy.',
      coffee: language === 'GR' ? 'Καφετέρια' : 'Cafeteria',
      coffeeDesc: language === 'GR' ? 'Η τέλεια συνοδεία για την εμπειρία του gelato.' : 'The perfect companion for the gelato experience.',
      sweets: language === 'GR' ? 'Γλυκά & Επιδόρπια' : 'Sweets & Desserts',
      sweetsDesc: language === 'GR' ? 'Προφιτερόλ, Σικάγο, Τιραμισού & Τούρτες.' : 'Profiteroles, Chicago, Tiramisu & Cakes.',

      // Gelato Section
      dailyFresh: language === 'GR' ? 'Καθημερινή Φρεσκάδα' : 'Daily Freshness',
      serviceOptions: language === 'GR' ? 'Επιλογές Σερβιρίσματος' : 'Service Options',
      cones: language === 'GR' ? 'Χωνάκια' : 'Cones',
      conesDesc: language === 'GR' ? 'Κλασικές και Special επιλογές.' : 'Standard and Special options.',
      cups: language === 'GR' ? 'Κυπελλάκια' : 'Cups',
      cupsDesc: language === 'GR' ? 'Απολαύστε το gelato σας σε κυπελλάκι.' : 'Enjoy your gelato in a cup.',
      togo: language === 'GR' ? 'Οικογενειακές Συσκευασίες' : 'Gelato To Go',
      togoDesc: language === 'GR' ? 'Για το σπίτι.' : 'Family Packs.',
      extraTopping: language === 'GR' ? '+ Διαθέσιμο Έξτρα Topping' : '+ Extra Topping Available',
      flavorsTitle: language === 'GR' ? 'Περισσότερες από 40 Γεύσεις' : 'Over 40 Flavors',
      exploreFlavors: language === 'GR' ? 'Εξερευνήστε τις Γεύσεις' : 'Explore Flavors',

      // Flavor Categories
      catCrema: language === 'GR' ? 'Κρέμες' : 'Crema',
      catChoco: language === 'GR' ? 'Σοκολάτες' : 'Chocolate',
      catSorbet: language === 'GR' ? 'Sorbet Φρούτων' : 'Fruit Sorbet',
      catNoSugar: language === 'GR' ? 'Χωρίς Ζάχαρη' : 'No Sugar',

      // Flavors limits
      upTo2: language === 'GR' ? 'έως 2 γεύσεις' : 'Up to 2 flavors',
      upTo3: language === 'GR' ? 'έως 3 γεύσεις' : 'Up to 3 flavors',
      upTo4: language === 'GR' ? 'έως 4 γεύσεις' : 'Up to 4 flavors',

      // Waffle Section
      heritage: language === 'GR' ? 'Βελγική Κληρονομιά' : 'Belgian Heritage',
      grandma: language === 'GR' ? 'Συνταγή της Γιαγιάς' : 'Grandma\'s Recipe',
      grandmaDesc: language === 'GR' ? '"Οι βάφλες μας φτιάχνονται με αυθεντική βελγική συνταγή. Τραγανές απέξω, απίστευτα αφράτες από μέσα."' : '"Our waffles are made using an authentic Belgian recipe. Crunchy on the outside, impossibly fluffy on the inside."',
      create: language === 'GR' ? 'Φτιάξτε τη Βάφλα σας' : 'Create Your Waffle',
      base: language === 'GR' ? 'Η Βάση' : 'The Base',
      baseDesc: language === 'GR' ? 'Αυθεντική Βελγική Βάφλα με πλούσια Πραλίνα.' : 'Authentic Belgian Waffle with rich Praline.',
      addGelato: language === 'GR' ? 'Προσθήκη Gelato' : 'Add Gelato',
      addGelatoDesc: language === 'GR' ? 'Συνδυάστε με οποιαδήποτε γεύση.' : 'Combine with any flavor.',

      // Coffee Section
      coffeeColl: language === 'GR' ? 'Η Συλλογή Καφέ' : 'The Coffee Collection',
      tip: language === 'GR' ? 'Συμβουλή: Προσθέστε +1 μπάλα Gelato' : 'Tip: Add +1 Scoop of Gelato',

      // Sweets Section
      desserts: language === 'GR' ? 'Επιδόρπια & Συνδυασμοί' : 'Desserts & Combinations',
   };

   // FLAVOR DATA
   const flavorData = {
      crema: [
         { name: 'Pistacchio', desc: language === 'GR' ? 'Κρέμα φυστικιού βιολογικής καλλιέργειας από το Bronte της Σικελίας.' : 'Organic Pistachio cream from Bronte, Sicily.' },
         { name: 'Nocciolla', desc: language === 'GR' ? 'Καθαρό φουντούκι από το Πιεμόντε, Ιταλία.' : 'Pure Hazelnut originating from Piedmont, Italy.' },
         { name: 'Tiramisu', desc: language === 'GR' ? 'Ιταλικό γλυκό με τυρί Μασκαρπόνε και λικέρ καφέ.' : 'Italian dessert with Mascarpone cheese and coffee liqueur.' },
         { name: 'Mokka', desc: language === 'GR' ? 'Κρέμα με καφέ Espresso και Nescafe.' : 'Cream with Espresso coffee and Nescafe.' },
         { name: 'Stracciatella', desc: language === 'GR' ? 'Κρέμα με κομμάτια σοκολάτας.' : 'Cream with chocolate pieces.' },
         { name: 'Kaimaki', desc: language === 'GR' ? 'Κρέμα με σαλέπι και άρωμα μαστίχας.' : 'Cream with salepi and mastic aroma.' },
         { name: 'Fior di Latte', desc: language === 'GR' ? 'ΑΝΘΟΓΑΛΑ.' : 'ANTHOGALA.' },
         { name: 'Malaga', desc: language === 'GR' ? 'Κρέμα με Ρούμι και σταφίδες.' : 'Cream with Rum and raisins.' },
         { name: 'Crema di Nona', desc: language === 'GR' ? 'Κρέμα με αυγά, πατισερί λεμονιού και μπισκότο κανέλας.' : 'Cream with eggs, lemon patisserie, and cinnamon cookie.' },
         { name: 'Pavlova', desc: language === 'GR' ? 'Γλυκό μαρέγκας με σάλτσα φράουλας.' : 'Meringue sweet with Strawberry Sauce.' },
         { name: 'Belem', desc: language === 'GR' ? 'Αλατισμένη Καραμέλα.' : 'Salted Caramel.' },
         { name: 'Banoffee', desc: language === 'GR' ? 'Καραμέλα Toffee και Μπανάνα.' : 'Toffee Caramel and Banana.' },
         { name: 'Vanilla', desc: language === 'GR' ? 'Κρέμα με εκχύλισμα Βανίλιας Μαδαγασκάρης.' : 'Cream with Madagascar Vanilla extract.' },
      ],
      chocolate: [
         { name: 'Cioccolato / Ciocco', desc: language === 'GR' ? 'Σοκολάτα.' : 'Chocolate.' },
         { name: 'Gianduja', desc: language === 'GR' ? 'Πραλίνα σοκολάτας με φουντούκι.' : 'Chocolate praline with hazelnut.' },
         { name: 'Ferrero', desc: language === 'GR' ? 'Κρέμα με γεύση Ferrero.' : 'Ferrero flavor cream.' },
         { name: 'Nutella', desc: language === 'GR' ? 'Απαλή σοκολάτα με κρέμα φουντουκιού.' : 'Smooth chocolate with hazelnut cream.' },
         { name: 'Bounty', desc: language === 'GR' ? 'Παγωτό καρύδας με σάλτσα σοκολάτας.' : 'Coconut ice cream with chocolate sauce.' },
         { name: 'Snickers', desc: language === 'GR' ? 'Κρέμα με φυστίκι, καραμέλα και επικάλυψη σοκολάτας.' : 'Cream with peanut, caramel and chocolate coating.' },
         { name: 'Bitter', desc: language === 'GR' ? 'Sorbet Σοκολάτας 62% (Χωρίς Γάλα).' : '62% Chocolate Sorbet (Dairy Free).' },
      ],
      sorbet: [
         { name: 'Banana', desc: language === 'GR' ? 'Sorbet φρούτου.' : 'Fruit based sorbet.' },
         { name: 'Mango', desc: language === 'GR' ? 'Sorbet φρούτου.' : 'Fruit based sorbet.' },
         { name: 'Fragola', desc: language === 'GR' ? 'Sorbet φράουλας.' : 'Strawberry fruit based sorbet.' },
         { name: 'Limone', desc: language === 'GR' ? 'Sorbet λεμονιού.' : 'Lemon fruit based sorbet.' },
         { name: 'Framboise', desc: language === 'GR' ? 'Sorbet βατόμουρου.' : 'Raspberry fruit based sorbet.' },
         { name: 'Passion Fruit', desc: language === 'GR' ? 'Sorbet φρούτου.' : 'Fruit based sorbet.' },
      ],
      nosugar: [
         { name: 'Pistacchio 0%', desc: 'Κρέμα φυστικιού χωρίς ζάχαρη.' },
         { name: 'Cioccolato 0%', desc: 'Σοκολάτα χωρίς ζάχαρη.' },
         { name: 'Fior di Latte 0%', desc: 'ΑΝΘΟΓΑΛΑ χωρίς ζάχαρη.' },
         { name: 'Fragola 0%', desc: 'Φράουλα χωρίς ζάχαρη.' },
      ],
   };

   const coffees = [
      { name: 'Cappuccino', icon: Cloud, desc: language === 'GR' ? 'Espresso, αφρόγαλα και γάλα στον ατμό.' : 'Espresso coffee, steamed milk and milk foam.' },
      { name: 'Mocca', icon: Droplet, desc: language === 'GR' ? 'Κρέμα με καφέ Espresso και Nescafe.' : 'Cream with Espresso Coffee and Nescafe.' },
      { name: 'Espresso', icon: Coffee, desc: language === 'GR' ? 'Ο κλασικός ιταλικός καφές.' : 'The classic Italian coffee drink.' },
      { name: 'Espresso Freddo', icon: Snowflake, desc: language === 'GR' ? 'Παγωμένος Espresso.' : 'Iced Espresso.' },
      { name: 'Latte', icon: Droplet, desc: language === 'GR' ? 'Espresso με πολύ γάλα στον ατμό.' : 'Espresso with plenty of steamed milk.' },
      { name: 'Frappe', icon: Snowflake, desc: language === 'GR' ? 'Χτυπημένος στιγμιαίος καφές με πάγο.' : 'Iced instant coffee whipped.' },
      { name: 'Greek Coffee', icon: Flame, desc: language === 'GR' ? 'Παραδοσιακός αφιλτράριστος καφές.' : 'Traditional unfiltered coffee.' },
      { name: 'Cioccolato', icon: Heart, desc: language === 'GR' ? 'Ζεστή Σοκολάτα.' : 'Hot Chocolate.' },
   ];

   const toggleFlavorCategory = (cat: FlavorCategory) => {
      if (activeFlavorCategory === cat) {
         setActiveFlavorCategory(null);
      } else {
         setActiveFlavorCategory(cat);
      }
   };

   return (
      <div className="py-12 md:py-24 bg-brand-cream relative min-h-screen" id="menu-content">
         <div className="container mx-auto px-4 md:px-12">
            <div className="text-center mb-12 md:mb-16">
               <Reveal width="100%">
                  <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 text-center">{t.heading}</h2>
               </Reveal>
               <Reveal width="100%" delay={200}>
                  <h3 className="font-serif text-4xl md:text-6xl text-brand-dark text-center">{t.title}</h3>
               </Reveal>
               <Reveal width="100%" delay={400}>
                  <p className="mt-4 text-gray-600 max-w-2xl mx-auto italic font-serif text-lg text-center">
                     {t.subtitle}
                  </p>
               </Reveal>
            </div>

            {/* INTERACTIVE CATEGORY BOXES */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-16">

               {/* Box 1: Gelato */}
               <Reveal width="100%" delay={100} className="h-full">
                  <button
                     onClick={() => setActiveCategory('gelato')}
                     className={`relative p-6 md:p-8 rounded-lg text-left transition-all duration-300 group overflow-hidden border-2 w-full h-full ${activeCategory === 'gelato'
                        ? 'bg-brand-dark border-brand-dark text-brand-cream shadow-2xl scale-105 z-10'
                        : 'bg-white border-transparent hover:border-brand-pistachio text-brand-dark hover:shadow-xl'
                        }`}
                  >
                     <div className="flex items-center justify-between mb-4">
                        <IceCream size={32} strokeWidth={1.5} className={activeCategory === 'gelato' ? 'text-brand-gold' : 'text-brand-pistachio'} />
                     </div>
                     <h4 className="font-serif text-xl md:text-2xl font-bold mb-2">{t.gelato}</h4>
                     <p className={`text-xs md:text-sm leading-relaxed ${activeCategory === 'gelato' ? 'text-white/70' : 'text-gray-500'}`}>
                        {t.gelatoDesc}
                     </p>
                  </button>
               </Reveal>

               {/* Box 2: Waffles (Premium) */}
               <Reveal width="100%" delay={200} className="h-full">
                  <button
                     onClick={() => setActiveCategory('waffles')}
                     className={`relative p-6 md:p-8 rounded-lg text-left transition-all duration-300 group overflow-hidden border-2 w-full h-full ${activeCategory === 'waffles'
                        ? 'bg-brand-dark border-brand-dark text-brand-cream shadow-2xl scale-105 z-10'
                        : 'bg-white border-transparent hover:border-brand-gold text-brand-dark hover:shadow-xl'
                        }`}
                  >
                     <div className="flex items-center justify-between mb-4">
                        <UtensilsCrossed size={32} strokeWidth={1.5} className={activeCategory === 'waffles' ? 'text-brand-gold' : 'text-brand-dark'} />
                        <div className="bg-brand-gold text-brand-dark text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Premium</div>
                     </div>
                     <h4 className="font-serif text-xl md:text-2xl font-bold mb-2">{t.waffles}</h4>
                     <p className={`text-xs md:text-sm leading-relaxed ${activeCategory === 'waffles' ? 'text-white/70' : 'text-gray-500'}`}>
                        {t.wafflesDesc}
                     </p>
                  </button>
               </Reveal>

               {/* Box 3: Cafeteria */}
               <Reveal width="100%" delay={300} className="h-full">
                  <button
                     onClick={() => setActiveCategory('coffee')}
                     className={`relative p-6 md:p-8 rounded-lg text-left transition-all duration-300 group overflow-hidden border-2 w-full h-full ${activeCategory === 'coffee'
                        ? 'bg-brand-dark border-brand-dark text-brand-cream shadow-2xl scale-105 z-10'
                        : 'bg-white border-transparent hover:border-brand-dark text-brand-dark hover:shadow-xl'
                        }`}
                  >
                     <div className="flex items-center justify-between mb-4">
                        <Coffee size={32} strokeWidth={1.5} className={activeCategory === 'coffee' ? 'text-brand-gold' : 'text-brand-dark'} />
                     </div>
                     <h4 className="font-serif text-xl md:text-2xl font-bold mb-2">{t.coffee}</h4>
                     <p className={`text-xs md:text-sm leading-relaxed ${activeCategory === 'coffee' ? 'text-white/70' : 'text-gray-500'}`}>
                        {t.coffeeDesc}
                     </p>
                  </button>
               </Reveal>

               {/* Box 4: Sweets */}
               <Reveal width="100%" delay={400} className="h-full">
                  <button
                     onClick={() => setActiveCategory('sweets')}
                     className={`relative p-6 md:p-8 rounded-lg text-left transition-all duration-300 group overflow-hidden border-2 w-full h-full ${activeCategory === 'sweets'
                        ? 'bg-brand-dark border-brand-dark text-brand-cream shadow-2xl scale-105 z-10'
                        : 'bg-white border-transparent hover:border-brand-berry text-brand-dark hover:shadow-xl'
                        }`}
                  >
                     <div className="flex items-center justify-between mb-4">
                        <Cake size={32} strokeWidth={1.5} className={activeCategory === 'sweets' ? 'text-brand-gold' : 'text-brand-dark'} />
                     </div>
                     <h4 className="font-serif text-xl md:text-2xl font-bold mb-2">{t.sweets}</h4>
                     <p className={`text-xs md:text-sm leading-relaxed ${activeCategory === 'sweets' ? 'text-white/70' : 'text-gray-500'}`}>
                        {t.sweetsDesc}
                     </p>
                  </button>
               </Reveal>

            </div>

            {/* CONTENT DISPLAY AREA */}
            <Reveal width="100%" delay={600}>
               <div className="bg-white rounded-xl shadow-2xl min-h-[400px] md:min-h-[600px] transition-all duration-500 animate-fade-in overflow-hidden border-t-4 border-brand-gold">

                  {/* ================= GELATO CONTENT ================= */}
                  {activeCategory === 'gelato' && (
                     <div>
                        {/* Header Image */}
                        <div className="h-48 md:h-64 w-full relative">
                           <img
                              src={bitterImage}
                              alt="Artisan Gelato Scoops"
                              className="w-full h-full object-cover"
                              loading="lazy"
                           />
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <h2 className="font-serif text-4xl md:text-5xl text-white drop-shadow-lg">{t.dailyFresh}</h2>
                           </div>
                        </div>

                        <div className="p-6 md:p-12">

                           {/* FLAVOR EXPLORER (New Design) */}
                           <div className="mb-16">
                              <div className="text-center mb-8">
                                 <h3 className="font-serif text-3xl text-brand-dark mb-2">{t.flavorsTitle}</h3>
                                 <p className="text-gray-500 text-sm uppercase tracking-widest">{t.exploreFlavors}</p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                 {/* Crema Category */}
                                 <div className="flex flex-col">
                                    <button
                                       onClick={() => toggleFlavorCategory('crema')}
                                       className={`p-4 rounded-lg flex items-center justify-between transition-all duration-300 ${activeFlavorCategory === 'crema' ? 'bg-brand-dark text-brand-gold shadow-lg' : 'bg-brand-cream/50 text-brand-dark hover:bg-brand-cream'}`}
                                    >
                                       <span className="font-bold font-serif text-lg">{t.catCrema}</span>
                                       <ChevronDown size={20} className={`transition-transform duration-300 ${activeFlavorCategory === 'crema' ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFlavorCategory === 'crema' ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                       <ul className="space-y-2 p-2">
                                          {flavorData.crema.map((f, idx) => (
                                             <li key={idx} className="bg-white p-3 rounded border-l-4 border-brand-gold shadow-sm">
                                                <span className="font-bold text-brand-dark block text-sm">{f.name}</span>
                                                <span className="text-xs text-gray-500 block mt-1">{f.desc}</span>
                                             </li>
                                          ))}
                                       </ul>
                                    </div>
                                 </div>

                                 {/* Chocolate Category */}
                                 <div className="flex flex-col">
                                    <button
                                       onClick={() => toggleFlavorCategory('chocolate')}
                                       className={`p-4 rounded-lg flex items-center justify-between transition-all duration-300 ${activeFlavorCategory === 'chocolate' ? 'bg-brand-dark text-brand-gold shadow-lg' : 'bg-brand-cream/50 text-brand-dark hover:bg-brand-cream'}`}
                                    >
                                       <span className="font-bold font-serif text-lg">{t.catChoco}</span>
                                       <ChevronDown size={20} className={`transition-transform duration-300 ${activeFlavorCategory === 'chocolate' ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFlavorCategory === 'chocolate' ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                       <ul className="space-y-2 p-2">
                                          {flavorData.chocolate.map((f, idx) => (
                                             <li key={idx} className="bg-white p-3 rounded border-l-4 border-brand-dark shadow-sm">
                                                <span className="font-bold text-brand-dark block text-sm">{f.name}</span>
                                                <span className="text-xs text-gray-500 block mt-1">{f.desc}</span>
                                             </li>
                                          ))}
                                       </ul>
                                    </div>
                                 </div>

                                 {/* Sorbet Category */}
                                 <div className="flex flex-col">
                                    <button
                                       onClick={() => toggleFlavorCategory('sorbet')}
                                       className={`p-4 rounded-lg flex items-center justify-between transition-all duration-300 ${activeFlavorCategory === 'sorbet' ? 'bg-brand-dark text-brand-gold shadow-lg' : 'bg-brand-cream/50 text-brand-dark hover:bg-brand-cream'}`}
                                    >
                                       <span className="font-bold font-serif text-lg">{t.catSorbet}</span>
                                       <ChevronDown size={20} className={`transition-transform duration-300 ${activeFlavorCategory === 'sorbet' ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFlavorCategory === 'sorbet' ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                       <ul className="space-y-2 p-2">
                                          {flavorData.sorbet.map((f, idx) => (
                                             <li key={idx} className="bg-white p-3 rounded border-l-4 border-brand-pistachio shadow-sm">
                                                <span className="font-bold text-brand-dark block text-sm">{f.name}</span>
                                                <span className="text-xs text-gray-500 block mt-1">{f.desc}</span>
                                             </li>
                                          ))}
                                       </ul>
                                    </div>
                                 </div>

                                 {/* No Sugar Category */}
                                 <div className="flex flex-col relative">
                                    <button
                                       onClick={() => toggleFlavorCategory('nosugar')}
                                       className={`p-4 rounded-lg flex items-center justify-between transition-all duration-300 ${activeFlavorCategory === 'nosugar' ? 'bg-brand-dark text-brand-gold shadow-lg' : 'bg-brand-cream/50 text-brand-dark hover:bg-brand-cream'}`}
                                    >
                                       <span className="font-bold font-serif text-lg">{t.catNoSugar}</span>
                                       <ChevronDown size={20} className={`transition-transform duration-300 ${activeFlavorCategory === 'nosugar' ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFlavorCategory === 'nosugar' ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>

                                       {/* Tagline & Info Icon */}
                                       <div className="flex items-center justify-between mb-3 bg-brand-cream/50 p-3 rounded-lg border border-brand-gold/20">
                                          <p className="font-serif text-brand-dark italic text-sm leading-tight">«Ίδια γεύση Bombolo, χωρίς προσθήκη ζάχαρης.»</p>
                                          <button
                                             onClick={(e) => { e.stopPropagation(); setShowNoSugarInfo(true); }}
                                             className="text-brand-dark hover:text-brand-gold transition-colors p-1"
                                             aria-label="Info"
                                          >
                                             <Info size={20} />
                                          </button>
                                       </div>

                                       <ul className="space-y-2 p-2">
                                          {flavorData.nosugar.map((f, idx) => (
                                             <li key={idx} className="bg-white p-3 rounded border-l-4 border-gray-400 shadow-sm">
                                                <span className="font-bold text-brand-dark block text-sm">{f.name}</span>
                                                <span className="text-xs text-gray-500 block mt-1">{f.desc}</span>
                                             </li>
                                          ))}
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Section A: Service Options (INFOGRAPHIC STYLE) */}
                           <div className="bg-brand-cream/50 rounded-xl p-8 border border-brand-gold/20 mb-16 shadow-inner">
                              <h3 className="font-serif text-3xl text-brand-dark mb-12 text-center border-b border-brand-gold/20 pb-4 inline-block w-full">{t.serviceOptions}</h3>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                                 {/* Vertical Dividers for Desktop */}
                                 <div className="hidden md:block absolute top-4 bottom-4 left-1/3 w-px bg-brand-dark/10"></div>
                                 <div className="hidden md:block absolute top-4 bottom-4 right-1/3 w-px bg-brand-dark/10"></div>

                                 {/* Column 1: Cones */}
                                 <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-brand-dark text-brand-gold rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white">
                                       <IceCream size={36} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="font-bold text-xl mb-3 text-brand-dark uppercase tracking-widest">{t.cones}</h4>
                                    <div className="h-1 w-8 bg-brand-gold rounded-full mb-6"></div>
                                    <ul className="space-y-4 w-full max-w-xs">
                                       <li className="flex flex-col items-center p-3 bg-white rounded shadow-sm border border-brand-dark/5">
                                          <span className="font-serif font-bold text-brand-dark text-lg">Gelato Cone</span>
                                          <span className="text-xs text-gray-500 uppercase tracking-wide">1, 2, 3 scoops</span>
                                       </li>
                                       <li className="flex flex-col items-center p-3 bg-white rounded shadow-sm border border-brand-pistachio/20">
                                          <span className="font-serif font-bold text-brand-pistachio text-lg">Special Cone</span>
                                       </li>
                                    </ul>
                                 </div>

                                 {/* Column 2: Cups */}
                                 <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-brand-dark text-brand-gold rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white">
                                       <Box size={36} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="font-bold text-xl mb-3 text-brand-dark uppercase tracking-widest">{t.cups}</h4>
                                    <div className="h-1 w-8 bg-brand-gold rounded-full mb-6"></div>

                                    <div className="space-y-3 w-full max-w-xs">
                                       <div className="flex items-center justify-between p-3 bg-white rounded shadow-sm border-l-4 border-brand-dark/20">
                                          <span className="font-serif font-bold text-brand-dark">Small</span>
                                          <span className="text-xs font-bold text-brand-pistachio uppercase">{t.upTo2}</span>
                                       </div>
                                       <div className="flex items-center justify-between p-3 bg-white rounded shadow-sm border-l-4 border-brand-dark/40">
                                          <span className="font-serif font-bold text-brand-dark">Medium</span>
                                          <span className="text-xs font-bold text-brand-pistachio uppercase">{t.upTo3}</span>
                                       </div>
                                       <div className="flex items-center justify-between p-3 bg-white rounded shadow-sm border-l-4 border-brand-dark/60">
                                          <span className="font-serif font-bold text-brand-dark">Large</span>
                                          <span className="text-xs font-bold text-brand-pistachio uppercase">{t.upTo4}</span>
                                       </div>
                                       <div className="flex items-center justify-between p-3 bg-white rounded shadow-sm border-l-4 border-brand-gold">
                                          <span className="font-serif font-bold text-brand-gold">XLarge</span>
                                          <span className="text-xs font-bold text-brand-pistachio uppercase">{t.upTo4}</span>
                                       </div>
                                    </div>
                                 </div>

                                 {/* Column 3: To Go */}
                                 <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-brand-dark text-brand-gold rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white">
                                       <Box size={36} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="font-bold text-xl mb-3 text-brand-dark uppercase tracking-widest">{t.togo}</h4>
                                    <div className="h-1 w-8 bg-brand-gold rounded-full mb-6"></div>

                                    <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-4">
                                       <span className="py-2 bg-white border border-brand-dark/10 rounded font-serif font-bold text-brand-dark">350g</span>
                                       <span className="py-2 bg-white border border-brand-dark/10 rounded font-serif font-bold text-brand-dark">500g</span>
                                       <span className="py-2 bg-white border border-brand-dark/10 rounded font-serif font-bold text-brand-dark">750g</span>
                                       <span className="py-2 bg-white border border-brand-dark/10 rounded font-serif font-bold text-brand-dark">1kg</span>
                                       <span className="col-span-2 py-2 bg-brand-pistachio/10 border border-brand-pistachio text-brand-pistachio rounded font-serif font-bold">1.5kg</span>
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-dark px-3 py-1 rounded-full">{t.extraTopping}</p>
                                 </div>
                              </div>
                           </div>

                        </div>
                     </div>
                  )}

                  {/* ================= WAFFLE CONTENT ================= */}
                  {activeCategory === 'waffles' && (
                     <div className="flex flex-col lg:flex-row h-full">
                        <div className="lg:w-1/2 relative min-h-[300px] lg:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${waffleImage})` }}>

                           <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-end p-8">
                              <div className="text-brand-gold uppercase tracking-widest text-sm font-bold mb-2">Exclusive Recipe</div>
                              <h2 className="text-white font-serif text-4xl lg:text-5xl">{t.heritage}</h2>
                           </div>
                        </div>
                        <div className="lg:w-1/2 p-8 md:p-16 bg-brand-cream/30">
                           <div className="space-y-8">
                              <div>
                                 <h3 className="font-serif text-3xl text-brand-dark mb-4">{t.grandma}</h3>
                                 <p className="text-gray-700 leading-relaxed italic border-l-4 border-brand-gold pl-4">
                                    {t.grandmaDesc}
                                 </p>
                              </div>

                              <div className="bg-white p-8 rounded-lg shadow-sm border border-brand-dark/5">
                                 <h4 className="font-bold text-brand-dark uppercase tracking-widest mb-6">{t.create}</h4>

                                 <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                       <div className="bg-brand-dark text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-serif font-bold">1</div>
                                       <div>
                                          <span className="block font-bold text-lg text-brand-dark">{t.base}</span>
                                          <span className="text-gray-600 text-sm">{t.baseDesc}</span>
                                       </div>
                                    </div>

                                    <div className="w-px h-8 bg-gray-300 ml-4"></div>

                                    <div className="flex items-start gap-4">
                                       <div className="bg-brand-gold text-brand-dark w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-serif font-bold">2</div>
                                       <div>
                                          <span className="block font-bold text-lg text-brand-dark">{t.addGelato}</span>
                                          <span className="text-gray-600 text-sm">{t.addGelatoDesc}</span>
                                          <div className="flex gap-2 mt-2">
                                             <span className="px-2 py-1 bg-brand-cream text-xs border border-brand-dark/20 rounded">+ 1 Scoop</span>
                                             <span className="px-2 py-1 bg-brand-cream text-xs border border-brand-dark/20 rounded">+ 2 Scoops</span>
                                             <span className="px-2 py-1 bg-brand-cream text-xs border border-brand-dark/20 rounded">+ 3 Scoops</span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* ================= COFFEE CONTENT ================= */}
                  {activeCategory === 'coffee' && (
                     <div className="p-8 md:p-16 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                        <div className="max-w-5xl mx-auto">
                           <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                              <div>
                                 <h3 className="font-serif text-4xl text-brand-dark">{t.coffeeColl}</h3>
                                 <p className="text-brand-gold uppercase tracking-widest text-sm mt-2">Strictly Classic</p>
                              </div>
                              <div className="bg-brand-dark text-brand-gold px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest shadow-lg flex items-center gap-2">
                                 <IceCream size={16} /> {t.tip}
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {coffees.map((c, idx) => (
                                 <div key={idx} className="group bg-white/50 hover:bg-white p-6 rounded-lg transition-all duration-300 border border-transparent hover:border-brand-gold/30 hover:shadow-lg">
                                    <div className="flex items-center gap-4 mb-3">
                                       <div className="p-3 bg-brand-dark/5 rounded-full text-brand-dark group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors">
                                          <c.icon size={24} strokeWidth={1.5} />
                                       </div>
                                       <h4 className="font-serif text-xl font-bold text-brand-dark group-hover:text-brand-gold transition-colors">{c.name}</h4>
                                    </div>
                                    <div className="h-px w-12 bg-brand-gold/50 mb-3"></div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  )}

                  {/* ================= SWEETS CONTENT ================= */}
                  {activeCategory === 'sweets' && (
                     <div className="p-8 md:p-12">
                        <div className="text-center mb-12">
                           <h3 className="font-serif text-4xl text-brand-dark">{t.desserts}</h3>
                           <p className="text-gray-500 mt-2">Classic desserts.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                           {/* Card 1 */}
                           <div className="bg-brand-cream/30 p-8 rounded-xl border border-brand-dark/5 flex gap-6 items-start hover:bg-brand-cream transition-colors">
                              <div className="bg-brand-dark text-brand-gold p-3 rounded-full shrink-0">
                                 <Star size={24} fill="currentColor" />
                              </div>
                              <div>
                                 <h4 className="font-serif text-2xl font-bold text-brand-dark mb-2">Profiterole</h4>
                                 <p className="text-gray-600 leading-relaxed text-sm">
                                    {language === 'GR'
                                       ? 'Αφράτα σου γεμιστά με πλούσια κρέμα (ή παγωτό), σερβιρισμένα με απαλή σάλτσα από εκλεκτή σοκολάτα Λατινικής Αμερικής.'
                                       : 'Airy choux pastry filled with rich cream (or gelato), served with a smooth sauce made from fine chocolate from Latin America.'}
                                 </p>
                              </div>
                           </div>

                           {/* Card 2 */}
                           <div className="bg-brand-cream/30 p-8 rounded-xl border border-brand-dark/5 flex gap-6 items-start hover:bg-brand-cream transition-colors">
                              <div className="bg-brand-dark text-brand-gold p-3 rounded-full shrink-0">
                                 <Star size={24} fill="currentColor" />
                              </div>
                              <div>
                                 <h4 className="font-serif text-2xl font-bold text-brand-dark mb-2">Gelato Chicago</h4>
                                 <p className="text-gray-600 leading-relaxed text-sm">
                                    {language === 'GR'
                                       ? 'Σοκολάτα gelato με έντονη γεύση, συνοδευόμενη από σάλτσα προφιτερόλ και σαντιγί.'
                                       : 'Chocolate gelato with intense flavor, accompanied by profiterole sauce and finished with whipped cream.'}
                                 </p>
                              </div>
                           </div>

                           {/* Card 3 */}
                           <div className="bg-brand-cream/30 p-8 rounded-xl border border-brand-dark/5 flex gap-6 items-start hover:bg-brand-cream transition-colors">
                              <div className="bg-brand-dark text-brand-gold p-3 rounded-full shrink-0">
                                 <Cake size={24} />
                              </div>
                              <div>
                                 <h4 className="font-serif text-2xl font-bold text-brand-dark mb-2">Tiramisu</h4>
                                 <p className="text-gray-600 leading-relaxed text-sm">
                                    {language === 'GR'
                                       ? 'Φρέσκο τιραμισού με πλούσιο μασκαρπόνε και λικέρ αμαρέτο.'
                                       : 'Fresh tiramisu with rich mascarpone and amaretto liqueur.'}
                                 </p>
                              </div>
                           </div>

                           {/* Card 4 */}
                           <div className="bg-brand-cream/30 p-8 rounded-xl border border-brand-dark/5 flex gap-6 items-start hover:bg-brand-cream transition-colors">
                              <div className="bg-brand-dark text-brand-gold p-3 rounded-full shrink-0">
                                 <Cake size={24} />
                              </div>
                              <div>
                                 <h4 className="font-serif text-2xl font-bold text-brand-dark mb-2">Zuppa Inglese</h4>
                                 <p className="text-gray-600 leading-relaxed text-sm">
                                    {language === 'GR'
                                       ? 'Παραδοσιακό ιταλικό γλυκό με στρώσεις παντεσπάνι εμποτισμένο σε λικέρ Alkermes, με επικάλυψη πλούσιας σοκολάτας.'
                                       : 'Traditional Italian treat with layers of sponge base soaked in Alkermes liqueur, topped with rich chocolate.'}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}


               </div>
            </Reveal>

            {/* CTA BUTTON */}
            <Reveal width="100%" delay={800}>
               <div className="mt-12 text-center">
                  <p className="font-serif text-2xl text-brand-dark mb-6 italic">
                     {language === 'GR' ? 'Έτοιμοι για δοκιμή;' : 'Ready to taste?'}
                  </p>
                  <a
                     href="#locations"
                     className="inline-block px-12 py-4 bg-brand-dark text-brand-gold font-bold tracking-widest uppercase hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 rounded-sm shadow-xl hover:shadow-2xl hover:-translate-y-1"
                  >
                     {language === 'GR' ? 'Επισκεφθειτε μας' : 'Visit Us'}
                  </a>
               </div>
            </Reveal>
         </div>

         {/* NO SUGAR INFO POPUP */}
         {showNoSugarInfo && (
            <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
               <div className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl p-6 shadow-2xl relative animate-slide-up">
                  <button
                     onClick={() => setShowNoSugarInfo(false)}
                     className="absolute top-4 right-4 text-gray-400 hover:text-brand-dark transition-colors"
                  >
                     <X size={24} />
                  </button>
                  <h4 className="font-serif text-xl font-bold text-brand-dark mb-3">No Sugar Gelato</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                     Χωρίς προσθήκη ζάχαρης – γλυκαίνεται με μαλτιτόλη & σορβιτόλη (πολυόλες). Η υπερβολική κατανάλωση μπορεί να έχει ήπια υπακτική δράση.
                  </p>
                  <button
                     onClick={() => setShowNoSugarInfo(false)}
                     className="w-full py-3 bg-brand-dark text-brand-gold font-bold rounded-lg uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
                  >
                     OK
                  </button>
               </div>
            </div>
         )}

      </div>
   );
};

export default MenuHighlights;