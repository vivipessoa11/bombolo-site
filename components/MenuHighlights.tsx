import React, { useState } from 'react';
import { IceCream, Coffee, Cake, UtensilsCrossed, Star, Box, Snowflake, Flame, Cloud, Heart, Droplet } from 'lucide-react';
import { Language } from '../App';


type Category = 'gelato' | 'waffles' | 'coffee' | 'sweets';

interface MenuHighlightsProps {
   language: Language;
}

const MenuHighlights: React.FC<MenuHighlightsProps> = ({ language }) => {
   const [activeCategory, setActiveCategory] = useState<Category>('gelato');

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
      flavors: language === 'GR' ? 'Οι Γεύσεις μας' : 'Our Flavors',

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

   // STRICTLY FACTUAL DESCRIPTIONS (Translated)
   const flavors = [
      { name: 'Pistacchio', desc: language === 'GR' ? 'Κρέμα φυστικιού βιολογικής καλλιέργειας από το Bronte της Σικελίας.' : 'Organic Pistachio cream from Bronte, Sicily.' },
      { name: 'Nocciolla', desc: language === 'GR' ? 'Καθαρό φουντούκι από το Πιεμόντε, Ιταλία.' : 'Pure Hazelnut originating from Piedmont, Italy.' },
      { name: 'Tiramisu', desc: language === 'GR' ? 'Ιταλικό γλυκό με τυρί Μασκαρπόνε και λικέρ καφέ.' : 'Italian dessert with Mascarpone cheese and coffee liqueur.' },
      { name: 'Cioccolato / Ciocco', desc: language === 'GR' ? 'Σοκολάτα.' : 'Chocolate.' },
      { name: 'Gianduja', desc: language === 'GR' ? 'Πραλίνα σοκολάτας με φουντούκι.' : 'Chocolate praline with hazelnut.' },
      { name: 'Ferrero', desc: language === 'GR' ? 'Κρέμα με γεύση Ferrero.' : 'Ferrero flavor cream.' },
      { name: 'Nutella', desc: language === 'GR' ? 'Απαλή σοκολάτα με κρέμα φουντουκιού.' : 'Smooth chocolate with hazelnut cream.' },
      { name: 'Mokka', desc: language === 'GR' ? 'Κρέμα με καφέ Espresso και Nescafe.' : 'Cream with Espresso coffee and Nescafe.' },
      { name: 'Stracciatella', desc: language === 'GR' ? 'Κρέμα με κομμάτια σοκολάτας.' : 'Cream with chocolate pieces.' },
      { name: 'Kaimaki', desc: language === 'GR' ? 'Κρέμα με σαλέπι και άρωμα μαστίχας.' : 'Cream with salepi and mastic aroma.' },
      { name: 'Fior di Latte', desc: language === 'GR' ? 'ΑΝΘΟΓΑΛΑ.' : 'ANTHOGALA.' },
      { name: 'Malaga', desc: language === 'GR' ? 'Κρέμα με Ρούμι και σταφίδες.' : 'Cream with Rum and raisins.' },
      { name: 'Crema di Nona', desc: language === 'GR' ? 'Κρέμα με αυγά, πατισερί λεμονιού και μπισκότο κανέλας.' : 'Cream with eggs, lemon patisserie, and cinnamon cookie.' },
      { name: 'Pavlova', desc: language === 'GR' ? 'Γλυκό μαρέγκας με σάλτσα φράουλας.' : 'Meringue sweet with Strawberry Sauce.' },
      { name: 'Belem', desc: language === 'GR' ? 'Αλατισμένη Καραμέλα.' : 'Salted Caramel.' },
      { name: 'Banoffee', desc: language === 'GR' ? 'Καραμέλα Toffee και Μπανάνα.' : 'Toffee Caramel and Banana.' },
      { name: 'Bounty', desc: language === 'GR' ? 'Παγωτό καρύδας με σάλτσα σοκολάτας.' : 'Coconut ice cream with chocolate sauce.' },
      { name: 'Snickers', desc: language === 'GR' ? 'Κρέμα με φυστίκι, καραμέλα και επικάλυψη σοκολάτας.' : 'Cream with peanut, caramel and chocolate coating.' },
      { name: 'Vanilla', desc: language === 'GR' ? 'Κρέμα με εκχύλισμα Βανίλιας Μαδαγασκάρης.' : 'Cream with Madagascar Vanilla extract.' },

      // Sugar Free Options
      { name: 'Pistacchio 0% (Stevia)', desc: language === 'GR' ? 'Κρέμα φυστικιού χωρίς ζάχαρη.' : 'Sugar-free Pistachio cream.' },
      { name: 'Cioccolato 0% (Stevia)', desc: language === 'GR' ? 'Σοκολάτα χωρίς ζάχαρη.' : 'Sugar-free Chocolate.' },
      { name: 'Fior di Latte 0% (Stevia)', desc: language === 'GR' ? 'ΑΝΘΟΓΑΛΑ χωρίς ζάχαρη.' : 'Sugar-free ANTHOGALA.' },
      { name: 'Fragola 0% (Stevia)', desc: language === 'GR' ? 'Φράουλα χωρίς ζάχαρη.' : 'Sugar-free Strawberry.' },
   ];

   const sorbets = [
      { name: 'Bitter', desc: language === 'GR' ? 'Sorbet Σοκολάτας 62% (Χωρίς Γάλα).' : '62% Chocolate Sorbet (Dairy Free).' },
      { name: 'Banana', desc: language === 'GR' ? 'Sorbet φρούτου.' : 'Fruit based sorbet.' },
      { name: 'Mango', desc: language === 'GR' ? 'Sorbet φρούτου.' : 'Fruit based sorbet.' },
      { name: 'Fragola', desc: language === 'GR' ? 'Sorbet φράουλας.' : 'Strawberry fruit based sorbet.' },
      { name: 'Limone', desc: language === 'GR' ? 'Sorbet λεμονιού.' : 'Lemon fruit based sorbet.' },
      { name: 'Framboise', desc: language === 'GR' ? 'Sorbet βατόμουρου.' : 'Raspberry fruit based sorbet.' },
      { name: 'Passion Fruit', desc: language === 'GR' ? 'Sorbet φρούτου.' : 'Fruit based sorbet.' },
   ];

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

   return (
      <div className="py-12 md:py-24 bg-brand-cream relative min-h-screen" id="menu-content">
         <div className="container mx-auto px-4 md:px-12">
            <div className="text-center mb-12 md:mb-16">
               <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3">{t.heading}</h2>
               <h3 className="font-serif text-4xl md:text-6xl text-brand-dark">{t.title}</h3>
               <p className="mt-4 text-gray-600 max-w-2xl mx-auto italic font-serif text-lg">
                  {t.subtitle}
               </p>
            </div>

            {/* INTERACTIVE CATEGORY BOXES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">

               {/* Box 1: Gelato */}
               <button
                  onClick={() => setActiveCategory('gelato')}
                  className={`relative p-6 md:p-8 rounded-lg text-left transition-all duration-300 group overflow-hidden border-2 ${activeCategory === 'gelato'
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

               {/* Box 2: Waffles (Premium) */}
               <button
                  onClick={() => setActiveCategory('waffles')}
                  className={`relative p-6 md:p-8 rounded-lg text-left transition-all duration-300 group overflow-hidden border-2 ${activeCategory === 'waffles'
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

               {/* Box 3: Cafeteria */}
               <button
                  onClick={() => setActiveCategory('coffee')}
                  className={`relative p-6 md:p-8 rounded-lg text-left transition-all duration-300 group overflow-hidden border-2 ${activeCategory === 'coffee'
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

               {/* Box 4: Sweets */}
               <button
                  onClick={() => setActiveCategory('sweets')}
                  className={`relative p-6 md:p-8 rounded-lg text-left transition-all duration-300 group overflow-hidden border-2 ${activeCategory === 'sweets'
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

            </div>

            {/* CONTENT DISPLAY AREA */}
            <div className="bg-white rounded-xl shadow-2xl min-h-[600px] transition-all duration-500 animate-fade-in overflow-hidden border-t-4 border-brand-gold">

               {/* ================= GELATO CONTENT ================= */}
               {activeCategory === 'gelato' && (
                  <div>
                     {/* Header Image */}
                     <div className="h-48 md:h-64 w-full relative">
                        <img
                           src="https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=2574&auto=format&fit=crop"
                           alt="Artisan Gelato Scoops"
                           className="w-full h-full object-cover"
                           loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                           <h2 className="font-serif text-4xl md:text-5xl text-white drop-shadow-lg">{t.dailyFresh}</h2>
                        </div>
                     </div>

                     <div className="p-8 md:p-12">

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
                                       {/* Removed (with biscuit) as requested */}
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

                        {/* Section B: Flavor Descriptions */}
                        <div>
                           <h3 className="font-serif text-3xl text-brand-dark mb-8 border-b border-brand-gold/30 pb-2 inline-block">{t.flavors}</h3>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
                              {flavors.map((f, idx) => (
                                 <div key={idx} className="flex flex-col border-b border-dashed border-gray-200 pb-4">
                                    <span className="font-serif text-xl font-bold text-brand-dark">{f.name}</span>
                                    <span className="text-gray-600 text-sm mt-1">{f.desc}</span>
                                 </div>
                              ))}
                           </div>

                           <h4 className="font-serif text-2xl text-brand-pistachio mb-6 flex items-center gap-3">
                              <span className="w-3 h-3 rounded-full bg-brand-pistachio"></span>
                              Sorbets (Fruity / Dairy Free)
                           </h4>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {sorbets.map((s, idx) => (
                                 <div key={idx} className="bg-brand-cream/50 p-4 rounded border border-transparent hover:border-brand-pistachio/30 transition-colors">
                                    <span className="font-bold block text-brand-dark">{s.name}</span>
                                    <span className="text-sm text-gray-600">{s.desc}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* ================= WAFFLE CONTENT ================= */}
               {activeCategory === 'waffles' && (
                  <div className="flex flex-col lg:flex-row h-full">
                     <div className="lg:w-1/2 relative min-h-[300px] lg:h-auto bg-brand-dark">

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
         </div>
      </div>
   );
};

export default MenuHighlights;