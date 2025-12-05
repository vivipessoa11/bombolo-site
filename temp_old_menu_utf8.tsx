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
      heading: language === 'GR' ? '╬ñ╬▒╬¥╬»╬┤╬╣ ╬æ╬╣¤â╬©╬«¤â╬Á¤ë╬¢' : 'Sensory Journey',
      title: language === 'GR' ? '╬ñ╬┐ ╬£╬Á╬¢╬┐¤ì ╬╝╬▒¤é' : 'Our Menu',
      subtitle: language === 'GR' ? '╬ò¤Ç╬╣╬╗╬¡╬¥¤ä╬Á ╬╝╬╣╬▒ ╬║╬▒¤ä╬À╬│╬┐¤ü╬»╬▒ ╬│╬╣╬▒ ╬¢╬▒ ╬Á╬¥╬Á¤ü╬Á¤à╬¢╬«¤â╬Á¤ä╬Á ¤ä╬À╬¢ ╬║╬▒╬©╬À╬╝╬Á¤ü╬╣╬¢╬« ╬╝╬▒¤é ¤Ç╬▒¤ü╬▒╬│¤ë╬│╬«.' : 'Select a category to explore our daily artisanal production.',
      gelato: language === 'GR' ? '╬º╬Á╬╣¤ü╬┐¤Ç╬┐╬»╬À¤ä╬┐ Gelato' : 'Gelato Artesanal',
      gelatoDesc: language === 'GR' ? '╬Ü╬▒╬©╬À╬╝╬Á¤ü╬╣╬¢╬« ¤Ç╬▒¤ü╬▒╬│¤ë╬│╬«, ╬æ¤à╬©╬Á╬¢¤ä╬╣╬║╬¡¤é ╬│╬Á¤ì¤â╬Á╬╣¤é & Vegan Sorbet.' : 'Daily prepared, Authentic Italian flavors & Vegan Sorbets.',
      waffles: language === 'GR' ? '╬Æ╬Á╬╗╬│╬╣╬║╬¡¤é ╬Æ╬¼¤å╬╗╬Á¤é' : 'Belgian Waffles',
      wafflesDesc: language === 'GR' ? '╬æ¤à╬©╬Á╬¢¤ä╬╣╬║╬« ¤â¤à╬¢¤ä╬▒╬│╬« ¤ä╬À¤é ╬│╬╣╬▒╬│╬╣╬¼¤é. ╬ñ¤ü╬▒╬│╬▒╬¢╬¡¤é & ╬▒¤å¤ü╬¼¤ä╬Á¤é.' : 'Authentic grandma\'s recipe. Crunchy & fluffy.',
      coffee: language === 'GR' ? '╬Ü╬▒¤å╬Á¤ä╬¡¤ü╬╣╬▒' : 'Cafeteria',
      coffeeDesc: language === 'GR' ? '╬ù ¤ä╬¡╬╗╬Á╬╣╬▒ ¤â¤à╬¢╬┐╬┤╬Á╬»╬▒ ╬│╬╣╬▒ ¤ä╬À╬¢ ╬Á╬╝¤Ç╬Á╬╣¤ü╬»╬▒ ¤ä╬┐¤à gelato.' : 'The perfect companion for the gelato experience.',
      sweets: language === 'GR' ? '╬ô╬╗¤à╬║╬¼ & ╬ò¤Ç╬╣╬┤¤î¤ü¤Ç╬╣╬▒' : 'Sweets & Desserts',
      sweetsDesc: language === 'GR' ? '╬á¤ü╬┐¤å╬╣¤ä╬Á¤ü¤î╬╗, ╬ú╬╣╬║╬¼╬│╬┐, ╬ñ╬╣¤ü╬▒╬╝╬╣¤â╬┐¤ì & ╬ñ╬┐¤ì¤ü¤ä╬Á¤é.' : 'Profiteroles, Chicago, Tiramisu & Cakes.',

      // Gelato Section
      dailyFresh: language === 'GR' ? '╬Ü╬▒╬©╬À╬╝╬Á¤ü╬╣╬¢╬« ╬ª¤ü╬Á¤â╬║╬¼╬┤╬▒' : 'Daily Freshness',
      serviceOptions: language === 'GR' ? '╬ò¤Ç╬╣╬╗╬┐╬│╬¡¤é ╬ú╬Á¤ü╬▓╬╣¤ü╬»¤â╬╝╬▒¤ä╬┐¤é' : 'Service Options',
      cones: language === 'GR' ? '╬º¤ë╬¢╬¼╬║╬╣╬▒' : 'Cones',
      conesDesc: language === 'GR' ? '╬Ü╬╗╬▒¤â╬╣╬║╬¡¤é ╬║╬▒╬╣ Special ╬Á¤Ç╬╣╬╗╬┐╬│╬¡¤é.' : 'Standard and Special options.',
      cups: language === 'GR' ? '╬Ü¤à¤Ç╬Á╬╗╬╗╬¼╬║╬╣╬▒' : 'Cups',
      cupsDesc: language === 'GR' ? '╬æ¤Ç╬┐╬╗╬▒¤ì¤â¤ä╬Á ¤ä╬┐ gelato ¤â╬▒¤é ¤â╬Á ╬║¤à¤Ç╬Á╬╗╬╗╬¼╬║╬╣.' : 'Enjoy your gelato in a cup.',
      togo: language === 'GR' ? '╬ƒ╬╣╬║╬┐╬│╬Á╬¢╬Á╬╣╬▒╬║╬¡¤é ╬ú¤à¤â╬║╬Á¤à╬▒¤â╬»╬Á¤é' : 'Gelato To Go',
      togoDesc: language === 'GR' ? '╬ô╬╣╬▒ ¤ä╬┐ ¤â¤Ç╬»¤ä╬╣.' : 'Family Packs.',
      extraTopping: language === 'GR' ? '+ ╬ö╬╣╬▒╬©╬¡¤â╬╣╬╝╬┐ ╬ê╬¥¤ä¤ü╬▒ Topping' : '+ Extra Topping Available',
      flavorsTitle: language === 'GR' ? '╬á╬Á¤ü╬╣¤â¤â¤î¤ä╬Á¤ü╬Á¤é ╬▒¤Ç¤î 40 ╬ô╬Á¤ì¤â╬Á╬╣¤é' : 'Over 40 Flavors',
      exploreFlavors: language === 'GR' ? '╬ò╬¥╬Á¤ü╬Á¤à╬¢╬«¤â¤ä╬Á ¤ä╬╣¤é ╬ô╬Á¤ì¤â╬Á╬╣¤é' : 'Explore Flavors',

      // Flavor Categories
      catCrema: language === 'GR' ? '╬Ü¤ü╬¡╬╝╬Á¤é' : 'Crema',
      catChoco: language === 'GR' ? '╬ú╬┐╬║╬┐╬╗╬¼¤ä╬Á¤é' : 'Chocolate',
      catSorbet: language === 'GR' ? 'Sorbet ╬ª¤ü╬┐¤ì¤ä¤ë╬¢' : 'Fruit Sorbet',
      catNoSugar: language === 'GR' ? '╬º¤ë¤ü╬»¤é ╬û╬¼¤ç╬▒¤ü╬À' : 'No Sugar',

      // Flavors limits
      upTo2: language === 'GR' ? '╬¡¤ë¤é 2 ╬│╬Á¤ì¤â╬Á╬╣¤é' : 'Up to 2 flavors',
      upTo3: language === 'GR' ? '╬¡¤ë¤é 3 ╬│╬Á¤ì¤â╬Á╬╣¤é' : 'Up to 3 flavors',
      upTo4: language === 'GR' ? '╬¡¤ë¤é 4 ╬│╬Á¤ì¤â╬Á╬╣¤é' : 'Up to 4 flavors',

      // Waffle Section
      heritage: language === 'GR' ? 'HOME MADE BELGIAN WAFFLE' : 'Belgian Heritage',
      grandma: language === 'GR' ? '╬ù ╬ú¤à╬¢¤ä╬▒╬│╬«' : 'Grandma\'s Recipe',
      grandmaDesc: language === 'GR' ? '"╬ù ╬║¤à¤ü╬»╬▒ Claudine ╬▒¤Ç¤î ¤ä╬À╬¢ ╬ø╬╣╬¡╬│╬À, ╬▒¤å╬┐¤ì ╬▓╬Á╬▓╬▒╬╣¤Ä╬©╬À╬║╬Á ¤Ç¤ë¤é ╬©╬▒ ¤â╬Á╬▓╬▒¤â¤ä╬┐¤ì╬╝╬Á ¤ä╬À╬¢ ¤Ç╬▒¤ü╬▒╬┤╬┐¤â╬╣╬▒╬║╬« ╬╝¤à¤â¤ä╬╣╬║╬« ¤ä╬À¤é ¤â¤à╬¢¤ä╬▒╬│╬« ¤Ç╬┐¤à ╬Á╬»¤ç╬Á ╬║╬╗╬À¤ü╬┐╬¢╬┐╬╝╬«¤â╬Á╬╣ ╬▒¤Ç¤î ¤ä╬À╬¢ ╬╝╬▒╬╝╬¼ ¤ä╬À¤é Mercotte ╬│╬╣╬▒ ¤ä╬À╬¢ ¤Ç╬╣╬┐ ¤ä¤ü╬▒╬│╬▒╬¢╬«, ╬▒¤å¤ü╬¼¤ä╬À, ╬Á¤à¤ë╬┤╬╣╬▒¤â¤ä╬« ╬║╬▒╬╣ ╬¢¤î¤â¤ä╬╣╬╝╬À ╬Æ╬¡╬╗╬│╬╣╬║╬À ╬▓╬¼¤å╬╗╬▒ ╬╝╬▒¤é ¤ä╬À╬¢ ╬Á╬╝¤Ç╬╣¤â¤ä╬Á¤ì¤ä╬À╬║╬Á !!! ╬ò╬╝╬Á╬»¤é ╬▒¤Ç╬╗╬¼ ¤Ç¤ü╬┐¤â╬©╬¡¤ä╬┐¤à╬╝╬Á ¤â¤ä╬┐ ╬╝¤à¤â¤ä╬╣╬║¤î ¤ä╬À¤é, ¤å¤ü╬¡¤â╬║╬┐ ╬│╬¼╬╗╬▒, ╬▓╬┐¤ì¤ä¤à¤ü╬┐, ╬▒¤à╬│╬¼, ¤ä╬╣¤é ╬¢╬┐¤â¤ä╬╣╬╝¤î¤ä╬Á¤ü╬Á¤é ╬Æ╬Á╬╗╬│╬╣╬║╬¡¤é ¤Ç¤ü╬▒╬╗╬»╬¢╬Á¤é ╬║╬▒╬╣ ╬ô╬▒╬╗╬╗╬╣╬║╬¡¤é ¤â╬┐╬║╬┐╬╗╬¼¤ä╬Á¤é ¤ä╬À╬¢ ╬▒╬│╬¼¤Ç╬À ╬╝╬▒¤é ╬║╬▒╬╣ ¤ä╬À╬¢ ¤å¤ü╬┐╬¢¤ä╬»╬┤╬▒ ╬│╬╣╬▒ ╬¢╬▒ ╬┤╬╣╬║╬▒╬╣¤Ä¤â╬┐¤à╬╝╬Á ¤ä╬À╬¢ ╬║¤à¤ü╬»╬▒ Claudine ╬║╬▒╬╣ ╬¢╬▒ ╬¡¤ç╬┐¤à╬╝╬Á ¤ä╬┐ ¤ä╬Á╬╗╬Á╬╣¤î¤ä╬Á¤ü╬┐ ╬▒¤Ç╬┐¤ä╬¡╬╗╬Á¤â╬╝╬▒!!!"' : '"Our waffles are made using an authentic Belgian recipe. Crunchy on the outside, impossibly fluffy on the inside."',
      create: language === 'GR' ? '╬ª¤ä╬╣╬¼╬¥¤ä╬Á ¤ä╬À ╬Æ╬¼¤å╬╗╬▒ ¤â╬▒¤é' : 'Create Your Waffle',
      base: language === 'GR' ? '╬ù ╬Æ╬¼¤â╬À' : 'The Base',
      baseDesc: language === 'GR' ? '╬æ¤à╬©╬Á╬¢¤ä╬╣╬║╬« ╬Æ╬Á╬╗╬│╬╣╬║╬« ╬Æ╬¼¤å╬╗╬▒ ╬╝╬Á ¤Ç╬╗╬┐¤ì¤â╬╣╬▒ ╬á¤ü╬▒╬╗╬»╬¢╬▒.' : 'Authentic Belgian Waffle with rich Praline.',
      addGelato: language === 'GR' ? '╬á¤ü╬┐¤â╬©╬«╬║╬À Gelato' : 'Add Gelato',
      addGelatoDesc: language === 'GR' ? '╬ú¤à╬¢╬┤¤à╬¼¤â¤ä╬Á ╬╝╬Á ╬┐¤Ç╬┐╬╣╬▒╬┤╬«¤Ç╬┐¤ä╬Á ╬│╬Á¤ì¤â╬À.' : 'Combine with any flavor.',

      // Coffee Section
      coffeeColl: language === 'GR' ? '╬ù ╬ú¤à╬╗╬╗╬┐╬│╬« ╬Ü╬▒¤å╬¡' : 'The Coffee Collection',
      tip: language === 'GR' ? '╬ú¤à╬╝╬▓╬┐¤à╬╗╬«: ╬á¤ü╬┐¤â╬©╬¡¤â¤ä╬Á +1 ╬╝¤Ç╬¼╬╗╬▒ Gelato' : 'Tip: Add +1 Scoop of Gelato',

      // Sweets Section
      desserts: language === 'GR' ? '╬ò¤Ç╬╣╬┤¤î¤ü¤Ç╬╣╬▒ & ╬ú¤à╬¢╬┤¤à╬▒¤â╬╝╬┐╬»' : 'Desserts & Combinations',
   };

   // FLAVOR DATA
   const flavorData = {
      crema: [
         { name: 'Pistacchio', desc: language === 'GR' ? '╬Ü¤ü╬¡╬╝╬▒ ¤å¤à¤â¤ä╬╣╬║╬╣╬┐¤ì ╬▓╬╣╬┐╬╗╬┐╬│╬╣╬║╬«¤é ╬║╬▒╬╗╬╗╬╣╬¡¤ü╬│╬Á╬╣╬▒¤é ╬▒¤Ç¤î ¤ä╬┐ Bronte ¤ä╬À¤é ╬ú╬╣╬║╬Á╬╗╬»╬▒¤é.' : 'Organic Pistachio cream from Bronte, Sicily.' },
         { name: 'Nocciolla', desc: language === 'GR' ? '╬Ü╬▒╬©╬▒¤ü¤î ¤å╬┐¤à╬¢¤ä╬┐¤ì╬║╬╣ ╬▒¤Ç¤î ¤ä╬┐ ╬á╬╣╬Á╬╝¤î╬¢¤ä╬Á, ╬Ö¤ä╬▒╬╗╬»╬▒.' : 'Pure Hazelnut originating from Piedmont, Italy.' },
         { name: 'Tiramisu', desc: language === 'GR' ? '╬Ö¤ä╬▒╬╗╬╣╬║¤î ╬│╬╗¤à╬║¤î ╬╝╬Á ¤ä¤à¤ü╬» ╬£╬▒¤â╬║╬▒¤ü¤Ç¤î╬¢╬Á ╬║╬▒╬╣ ╬╗╬╣╬║╬¡¤ü ╬║╬▒¤å╬¡.' : 'Italian dessert with Mascarpone cheese and coffee liqueur.' },
         { name: 'Mokka', desc: language === 'GR' ? '╬Ü¤ü╬¡╬╝╬▒ ╬╝╬Á ╬║╬▒¤å╬¡ Espresso ╬║╬▒╬╣ Nescafe.' : 'Cream with Espresso coffee and Nescafe.' },
         { name: 'Stracciatella', desc: language === 'GR' ? '╬Ü¤ü╬¡╬╝╬▒ ╬╝╬Á ╬║╬┐╬╝╬╝╬¼¤ä╬╣╬▒ ¤â╬┐╬║╬┐╬╗╬¼¤ä╬▒¤é.' : 'Cream with chocolate pieces.' },
         { name: 'Kaimaki', desc: language === 'GR' ? '╬Ü¤ü╬¡╬╝╬▒ ╬╝╬Á ¤â╬▒╬╗╬¡¤Ç╬╣ ╬║╬▒╬╣ ╬¼¤ü¤ë╬╝╬▒ ╬╝╬▒¤â¤ä╬»¤ç╬▒¤é.' : 'Cream with salepi and mastic aroma.' },
         { name: 'Fior di Latte', desc: language === 'GR' ? '╬æ╬Ø╬ÿ╬ƒ╬ô╬æ╬ø╬æ.' : 'ANTHOGALA.' },
         { name: 'Malaga', desc: language === 'GR' ? '╬Ü¤ü╬¡╬╝╬▒ ╬╝╬Á ╬í╬┐¤ì╬╝╬╣ ╬║╬▒╬╣ ¤â¤ä╬▒¤å╬»╬┤╬Á¤é.' : 'Cream with Rum and raisins.' },
         { name: 'Crema di Nona', desc: language === 'GR' ? '╬Ü¤ü╬¡╬╝╬▒ ╬╝╬Á ╬▒¤à╬│╬¼, ¤Ç╬▒¤ä╬╣¤â╬Á¤ü╬» ╬╗╬Á╬╝╬┐╬¢╬╣╬┐¤ì ╬║╬▒╬╣ ╬╝¤Ç╬╣¤â╬║¤î¤ä╬┐ ╬║╬▒╬¢╬¡╬╗╬▒¤é.' : 'Cream with eggs, lemon patisserie, and cinnamon cookie.' },
         { name: 'Pavlova', desc: language === 'GR' ? '╬ô╬╗¤à╬║¤î ╬╝╬▒¤ü╬¡╬│╬║╬▒¤é ╬╝╬Á ¤â╬¼╬╗¤ä¤â╬▒ ¤å¤ü╬¼╬┐¤à╬╗╬▒¤é.' : 'Meringue sweet with Strawberry Sauce.' },
         { name: 'Belem', desc: language === 'GR' ? '╬æ╬╗╬▒¤ä╬╣¤â╬╝╬¡╬¢╬À ╬Ü╬▒¤ü╬▒╬╝╬¡╬╗╬▒.' : 'Salted Caramel.' },
         { name: 'Banoffee', desc: language === 'GR' ? '╬Ü╬▒¤ü╬▒╬╝╬¡╬╗╬▒ Toffee ╬║╬▒╬╣ ╬£¤Ç╬▒╬¢╬¼╬¢╬▒.' : 'Toffee Caramel and Banana.' },
         { name: 'Vanilla', desc: language === 'GR' ? '╬Ü¤ü╬¡╬╝╬▒ ╬╝╬Á ╬Á╬║¤ç¤ì╬╗╬╣¤â╬╝╬▒ ╬Æ╬▒╬¢╬»╬╗╬╣╬▒¤é ╬£╬▒╬┤╬▒╬│╬▒¤â╬║╬¼¤ü╬À¤é.' : 'Cream with Madagascar Vanilla extract.' },
      ],
      chocolate: [
         { name: 'Cioccolato / Ciocco', desc: language === 'GR' ? '╬ú╬┐╬║╬┐╬╗╬¼¤ä╬▒.' : 'Chocolate.' },
         { name: 'Gianduja', desc: language === 'GR' ? '╬á¤ü╬▒╬╗╬»╬¢╬▒ ¤â╬┐╬║╬┐╬╗╬¼¤ä╬▒¤é ╬╝╬Á ¤å╬┐¤à╬¢¤ä╬┐¤ì╬║╬╣.' : 'Chocolate praline with hazelnut.' },
         { name: 'Ferrero', desc: language === 'GR' ? '╬Ü¤ü╬¡╬╝╬▒ ╬╝╬Á ╬│╬Á¤ì¤â╬À Ferrero.' : 'Ferrero flavor cream.' },
         { name: 'Nutella', desc: language === 'GR' ? '╬æ¤Ç╬▒╬╗╬« ¤â╬┐╬║╬┐╬╗╬¼¤ä╬▒ ╬╝╬Á ╬║¤ü╬¡╬╝╬▒ ¤å╬┐¤à╬¢¤ä╬┐¤à╬║╬╣╬┐¤ì.' : 'Smooth chocolate with hazelnut cream.' },
         { name: 'Bounty', desc: language === 'GR' ? '╬á╬▒╬│¤ë¤ä¤î ╬║╬▒¤ü¤ì╬┤╬▒¤é ╬╝╬Á ¤â╬¼╬╗¤ä¤â╬▒ ¤â╬┐╬║╬┐╬╗╬¼¤ä╬▒¤é.' : 'Coconut ice cream with chocolate sauce.' },
         { name: 'Snickers', desc: language === 'GR' ? '╬Ü¤ü╬¡╬╝╬▒ ╬╝╬Á ¤å¤à¤â¤ä╬»╬║╬╣, ╬║╬▒¤ü╬▒╬╝╬¡╬╗╬▒ ╬║╬▒╬╣ ╬Á¤Ç╬╣╬║╬¼╬╗¤à¤ê╬À ¤â╬┐╬║╬┐╬╗╬¼¤ä╬▒¤é.' : 'Cream with peanut, caramel and chocolate coating.' },
         { name: 'Bitter', desc: language === 'GR' ? 'Sorbet ╬ú╬┐╬║╬┐╬╗╬¼¤ä╬▒¤é 62% (╬º¤ë¤ü╬»¤é ╬ô╬¼╬╗╬▒).' : '62% Chocolate Sorbet (Dairy Free).' },
      ],
      sorbet: [
         { name: 'Banana', desc: language === 'GR' ? 'Sorbet ¤å¤ü╬┐¤ì¤ä╬┐¤à.' : 'Fruit based sorbet.' },
         { name: 'Mango', desc: language === 'GR' ? 'Sorbet ¤å¤ü╬┐¤ì¤ä╬┐¤à.' : 'Fruit based sorbet.' },
         { name: 'Fragola', desc: language === 'GR' ? 'Sorbet ¤å¤ü╬¼╬┐¤à╬╗╬▒¤é.' : 'Strawberry fruit based sorbet.' },
         { name: 'Limone', desc: language === 'GR' ? 'Sorbet ╬╗╬Á╬╝╬┐╬¢╬╣╬┐¤ì.' : 'Lemon fruit based sorbet.' },
         { name: 'Framboise', desc: language === 'GR' ? 'Sorbet ╬▓╬▒¤ä¤î╬╝╬┐¤à¤ü╬┐¤à.' : 'Raspberry fruit based sorbet.' },
         { name: 'Passion Fruit', desc: language === 'GR' ? 'Sorbet ¤å¤ü╬┐¤ì¤ä╬┐¤à.' : 'Fruit based sorbet.' },
      ],
      nosugar: [
         { name: 'Pistacchio 0%', desc: '╬Ü¤ü╬¡╬╝╬▒ ¤å¤à¤â¤ä╬╣╬║╬╣╬┐¤ì ¤ç¤ë¤ü╬»¤é ╬Â╬¼¤ç╬▒¤ü╬À.' },
         { name: 'Cioccolato 0%', desc: '╬ú╬┐╬║╬┐╬╗╬¼¤ä╬▒ ¤ç¤ë¤ü╬»¤é ╬Â╬¼¤ç╬▒¤ü╬À.' },
         { name: 'Fior di Latte 0%', desc: '╬æ╬Ø╬ÿ╬ƒ╬ô╬æ╬ø╬æ ¤ç¤ë¤ü╬»¤é ╬Â╬¼¤ç╬▒¤ü╬À.' },
         { name: 'Fragola 0%', desc: '╬ª¤ü╬¼╬┐¤à╬╗╬▒ ¤ç¤ë¤ü╬»¤é ╬Â╬¼¤ç╬▒¤ü╬À.' },
      ],
   };

   const coffees = [
      { name: 'Cappuccino', icon: Cloud, desc: language === 'GR' ? 'Espresso, ╬▒¤å¤ü¤î╬│╬▒╬╗╬▒ ╬║╬▒╬╣ ╬│╬¼╬╗╬▒ ¤â¤ä╬┐╬¢ ╬▒¤ä╬╝¤î.' : 'Espresso coffee, steamed milk and milk foam.' },
      { name: 'Mocca', icon: Droplet, desc: language === 'GR' ? '╬Ü¤ü╬¡╬╝╬▒ ╬╝╬Á ╬║╬▒¤å╬¡ Espresso ╬║╬▒╬╣ Nescafe.' : 'Cream with Espresso Coffee and Nescafe.' },
      { name: 'Espresso', icon: Coffee, desc: language === 'GR' ? '╬ƒ ╬║╬╗╬▒¤â╬╣╬║¤î¤é ╬╣¤ä╬▒╬╗╬╣╬║¤î¤é ╬║╬▒¤å╬¡¤é.' : 'The classic Italian coffee drink.' },
      { name: 'Espresso Freddo', icon: Snowflake, desc: language === 'GR' ? '╬á╬▒╬│¤ë╬╝╬¡╬¢╬┐¤é Espresso.' : 'Iced Espresso.' },
      { name: 'Latte', icon: Droplet, desc: language === 'GR' ? 'Espresso ╬╝╬Á ¤Ç╬┐╬╗¤ì ╬│╬¼╬╗╬▒ ¤â¤ä╬┐╬¢ ╬▒¤ä╬╝¤î.' : 'Espresso with plenty of steamed milk.' },
      { name: 'Frappe', icon: Snowflake, desc: language === 'GR' ? '╬º¤ä¤à¤Ç╬À╬╝╬¡╬¢╬┐¤é ¤â¤ä╬╣╬│╬╝╬╣╬▒╬»╬┐¤é ╬║╬▒¤å╬¡¤é ╬╝╬Á ¤Ç╬¼╬│╬┐.' : 'Iced instant coffee whipped.' },
      { name: 'Greek Coffee', icon: Flame, desc: language === 'GR' ? '╬á╬▒¤ü╬▒╬┤╬┐¤â╬╣╬▒╬║¤î¤é ╬▒¤å╬╣╬╗¤ä¤ü╬¼¤ü╬╣¤â¤ä╬┐¤é ╬║╬▒¤å╬¡¤é.' : 'Traditional unfiltered coffee.' },
      { name: 'Cioccolato', icon: Heart, desc: language === 'GR' ? '╬û╬Á¤â¤ä╬« ╬ú╬┐╬║╬┐╬╗╬¼¤ä╬▒.' : 'Hot Chocolate.' },
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

                           {/* FLAVOR EXPLORER (Refactored to Modals) */}
                           <div className="mb-16">
                              <div className="text-center mb-8">
                                 <h3 className="font-serif text-3xl text-brand-dark mb-2">{t.flavorsTitle}</h3>
                                 <p className="text-gray-500 text-sm uppercase tracking-widest">{t.exploreFlavors}</p>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                 {/* Crema Button */}
                                 <button
                                    onClick={() => setActiveFlavorCategory('crema')}
                                    className="p-6 rounded-xl bg-white border border-brand-dark/10 shadow-sm hover:shadow-md hover:border-brand-gold transition-all duration-300 flex flex-col items-center gap-3 group"
                                 >
                                    <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center text-brand-dark group-hover:bg-brand-dark group-hover:text-brand-gold transition-colors">
                                       <IceCream size={24} />
                                    </div>
                                    <span className="font-serif font-bold text-lg text-brand-dark">{t.catCrema}</span>
                                 </button>

                                 {/* Chocolate Button */}
                                 <button
                                    onClick={() => setActiveFlavorCategory('chocolate')}
                                    className="p-6 rounded-xl bg-white border border-brand-dark/10 shadow-sm hover:shadow-md hover:border-brand-gold transition-all duration-300 flex flex-col items-center gap-3 group"
                                 >
                                    <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center text-brand-dark group-hover:bg-brand-dark group-hover:text-brand-gold transition-colors">
                                       <Heart size={24} />
                                    </div>
                                    <span className="font-serif font-bold text-lg text-brand-dark">{t.catChoco}</span>
                                 </button>

                                 {/* Sorbet Button */}
                                 <button
                                    onClick={() => setActiveFlavorCategory('sorbet')}
                                    className="p-6 rounded-xl bg-white border border-brand-dark/10 shadow-sm hover:shadow-md hover:border-brand-gold transition-all duration-300 flex flex-col items-center gap-3 group"
                                 >
                                    <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center text-brand-dark group-hover:bg-brand-dark group-hover:text-brand-gold transition-colors">
                                       <Droplet size={24} />
                                    </div>
                                    <span className="font-serif font-bold text-lg text-brand-dark">{t.catSorbet}</span>
                                 </button>

                                 {/* No Sugar Button */}
                                 <button
                                    onClick={() => setActiveFlavorCategory('nosugar')}
                                    className="p-6 rounded-xl bg-white border border-brand-dark/10 shadow-sm hover:shadow-md hover:border-brand-gold transition-all duration-300 flex flex-col items-center gap-3 group"
                                 >
                                    <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center text-brand-dark group-hover:bg-brand-dark group-hover:text-brand-gold transition-colors">
                                       <Sparkles size={24} />
                                    </div>
                                    <span className="font-serif font-bold text-lg text-brand-dark">{t.catNoSugar}</span>
                                 </button>
                              </div>
                           </div>

                           {/* FLAVOR MODAL */}
                           {activeFlavorCategory && (
                              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setActiveFlavorCategory(null)}>
                                 <div
                                    className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-scale-in"
                                    onClick={(e) => e.stopPropagation()}
                                 >
                                    {/* Modal Header */}
                                    <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10">
                                       <div>
                                          <h3 className="font-serif text-2xl md:text-3xl text-brand-dark">
                                             {activeFlavorCategory === 'crema' && t.catCrema}
                                             {activeFlavorCategory === 'chocolate' && t.catChoco}
                                             {activeFlavorCategory === 'sorbet' && t.catSorbet}
                                             {activeFlavorCategory === 'nosugar' && t.catNoSugar}
                                          </h3>
                                          {activeFlavorCategory === 'nosugar' && (
                                             <p className="text-xs text-brand-pistachio font-bold uppercase tracking-wider mt-1">Sugar Free</p>
                                          )}
                                       </div>
                                       <button
                                          onClick={() => setActiveFlavorCategory(null)}
                                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                       >
                                          <X size={24} className="text-gray-500" />
                                       </button>
                                    </div>

                                    {/* Modal Content */}
                                    <div className="p-6">
                                       {activeFlavorCategory === 'nosugar' && (
                                          <div className="mb-6 bg-brand-cream/50 p-4 rounded-lg border border-brand-gold/20 flex gap-3">
                                             <Info className="text-brand-dark shrink-0" size={20} />
                                             <p className="text-sm text-gray-700 italic">
                                                ┬½╬è╬┤╬╣╬▒ ╬│╬Á¤ì¤â╬À Bombolo, ¤ç¤ë¤ü╬»¤é ¤Ç¤ü╬┐¤â╬©╬«╬║╬À ╬Â╬¼¤ç╬▒¤ü╬À¤é.┬╗ <br />
                                                <span className="text-xs not-italic text-gray-500 mt-1 block">╬ô╬╗¤à╬║╬▒╬»╬¢╬Á¤ä╬▒╬╣ ╬╝╬Á ╬╝╬▒╬╗¤ä╬╣¤ä¤î╬╗╬À & ¤â╬┐¤ü╬▓╬╣¤ä¤î╬╗╬À.</span>
                                             </p>
                                          </div>
                                       )}

                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          {flavorData[activeFlavorCategory].map((f, idx) => (
                                             <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-brand-gold/30 transition-colors">
                                                <h4 className="font-bold text-brand-dark text-lg mb-1">{f.name}</h4>
                                                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                                             </div>
                                          ))}
                                       </div>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                                       <button
                                          onClick={() => setActiveFlavorCategory(null)}
                                          className="text-sm font-bold text-brand-dark uppercase tracking-widest hover:text-brand-gold transition-colors"
                                       >
                                          Close Menu
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           )}

                           {/* Section A: Service Options (INFOGRAPHIC STYLE) */}
                           <div className="bg-brand-cream/50 rounded-xl p-8 border border-brand-gold/20 mb-16 shadow-inner">
                              <h3 className="font-serif text-3xl text-brand-dark mb-12 text-center border-b border-brand-gold/20 pb-4 inline-block w-full">{t.serviceOptions}</h3>

                              <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-12 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 hide-scrollbar">
                                 {/* Vertical Dividers for Desktop */}
                                 <div className="hidden md:block absolute top-4 bottom-4 left-1/3 w-px bg-brand-dark/10"></div>
                                 <div className="hidden md:block absolute top-4 bottom-4 right-1/3 w-px bg-brand-dark/10"></div>

                                 {/* Column 1: Cones */}
                                 <div className="flex-none w-[85%] md:w-auto snap-center flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-brand-dark text-brand-gold rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white">
                                       <IceCream size={36} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="font-bold text-xl mb-3 text-brand-dark uppercase tracking-widest">{t.cones}</h4>
                                    <div className="h-1 w-8 bg-brand-gold rounded-full mb-6"></div>
                                    <ul className="space-y-4 w-full max-w-xs mx-auto">
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
                                 <div className="flex-none w-[85%] md:w-auto snap-center flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-brand-dark text-brand-gold rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white">
                                       <Box size={36} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="font-bold text-xl mb-3 text-brand-dark uppercase tracking-widest">{t.cups}</h4>
                                    <div className="h-1 w-8 bg-brand-gold rounded-full mb-6"></div>

                                    <div className="space-y-3 w-full max-w-xs mx-auto">
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
                                 <div className="flex-none w-[85%] md:w-auto snap-center flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-brand-dark text-brand-gold rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white">
                                       <Box size={36} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="font-bold text-xl mb-3 text-brand-dark uppercase tracking-widest">{t.togo}</h4>
                                    <div className="h-1 w-8 bg-brand-gold rounded-full mb-6"></div>

                                    <div className="grid grid-cols-2 gap-3 w-full max-w-xs mx-auto mb-4">
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
                                 {language === 'GR' && (
                                    <p className="text-gray-600 mt-4 max-w-2xl text-sm leading-relaxed">
                                       ╬ƒ╬╣ ╬║╬▒╬╗¤ì¤ä╬Á¤ü╬Á¤é ¤Ç╬┐╬╣╬║╬╣╬╗╬»╬Á¤é ╬║╬▒¤å╬¡ ¤ä¤ë╬¢ ╬Ü╬┐╬╗╬┐╬╝╬▓╬╣╬▒╬¢¤Ä╬¢ ╬å╬¢╬┤╬Á¤ë╬¢ ╬║╬▒╬╣ ¤ä╬┐¤à Espirito Santo ¤ä╬À¤é ╬Æ¤ü╬▒╬Â╬╣╬╗╬»╬▒¤é ╬Á¤Ç╬╣╬╗╬¡¤ç╬©╬À╬║╬▒╬¢ ╬╝╬Á ¤ä╬Á¤ü╬¼¤â¤ä╬╣╬▒ ¤Ç¤ü╬┐¤â╬┐¤ç╬« ╬║╬▒╬╣ ╬║╬▒╬▓╬┐¤à¤ü╬¢¤ä╬»¤â¤ä╬À╬║╬▒╬¢ ╬╝╬Á ╬╝╬Á╬│╬¼╬╗╬À ¤å¤ü╬┐╬¢¤ä╬»╬┤╬▒ ╬▒╬╗╬╗╬¼ ╬║╬▒╬╣ ╬│╬¢¤Ä¤â╬À ╬▒¤Ç¤î ¤ä╬┐¤à¤é ╬╝╬Á╬│╬▒╬╗¤ì¤ä╬Á¤ü╬┐¤à¤é ╬│╬¢¤Ä¤â¤ä╬Á¤é ¤ä╬┐¤à ╬║╬▒¤å╬¡ ╬│╬╣╬▒ ╬¢╬▒ ╬┤╬À╬╝╬╣╬┐¤à¤ü╬│╬À╬©╬Á╬» ¤ä╬┐ ¤Ç╬╣╬┐ ╬Á¤à¤ë╬┤╬╣╬▒¤â¤ä¤î ╬║╬▒╬╣ ╬¢╬┐¤â¤ä╬╣╬╝¤î¤ä╬Á¤ü╬┐ ╬Ö¤ä╬▒╬╗╬╣╬║¤î blend. ╬ò╬╝╬Á╬»¤é ¤â¤ä╬┐ BOMBOLO ¤å¤ü╬┐╬¢¤ä╬»╬Â╬┐¤à╬╝╬Á ╬¢╬▒ ¤ä╬┐╬¢ ¤Ç╬▒¤ü╬▒¤â╬║╬Á¤à╬¼¤â╬┐¤à╬╝╬Á ╬╝╬Á ¤ä╬┐╬¢ ┬½╬Ö¤ä╬▒╬╗╬╣╬║¤î¤ä╬Á¤ü╬┐┬╗ ¤ä¤ü¤î¤Ç╬┐ ╬│╬╣╬▒ ╬¢╬▒ ¤â╬▒¤é ¤ä╬▒╬¥╬╣╬┤╬¡¤ê╬┐¤à╬╝╬Á ¤â¤ä╬À╬¢ Fontana di Trevi ╬║╬▒╬╣ ¤â¤ä╬À╬¢ Piazza San MarcoÔÇªÔÇª.
                                    </p>
                                 )}
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
                                       ? '╬æ¤å¤ü╬¼¤ä╬▒ ¤â╬┐¤à ╬│╬Á╬╝╬╣¤â¤ä╬¼ ╬╝╬Á ¤Ç╬╗╬┐¤ì¤â╬╣╬▒ ╬║¤ü╬¡╬╝╬▒ (╬« ¤Ç╬▒╬│¤ë¤ä¤î), ¤â╬Á¤ü╬▓╬╣¤ü╬╣¤â╬╝╬¡╬¢╬▒ ╬╝╬Á ╬▒¤Ç╬▒╬╗╬« ¤â╬¼╬╗¤ä¤â╬▒ ╬▒¤Ç¤î ╬Á╬║╬╗╬Á╬║¤ä╬« ¤â╬┐╬║╬┐╬╗╬¼¤ä╬▒ ╬ø╬▒¤ä╬╣╬¢╬╣╬║╬«¤é ╬æ╬╝╬Á¤ü╬╣╬║╬«¤é.'
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
                                       ? '╬ú╬┐╬║╬┐╬╗╬¼¤ä╬▒ gelato ╬╝╬Á ╬¡╬¢¤ä╬┐╬¢╬À ╬│╬Á¤ì¤â╬À, ¤â¤à╬¢╬┐╬┤╬Á¤à¤î╬╝╬Á╬¢╬À ╬▒¤Ç¤î ¤â╬¼╬╗¤ä¤â╬▒ ¤Ç¤ü╬┐¤å╬╣¤ä╬Á¤ü¤î╬╗ ╬║╬▒╬╣ ¤â╬▒╬¢¤ä╬╣╬│╬».'
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
                                       ? '╬ª¤ü╬¡¤â╬║╬┐ ¤ä╬╣¤ü╬▒╬╝╬╣¤â╬┐¤ì ╬╝╬Á ¤Ç╬╗╬┐¤ì¤â╬╣╬┐ ╬╝╬▒¤â╬║╬▒¤ü¤Ç¤î╬¢╬Á ╬║╬▒╬╣ ╬╗╬╣╬║╬¡¤ü ╬▒╬╝╬▒¤ü╬¡¤ä╬┐.'
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
                                       ? '╬á╬▒¤ü╬▒╬┤╬┐¤â╬╣╬▒╬║¤î ╬╣¤ä╬▒╬╗╬╣╬║¤î ╬│╬╗¤à╬║¤î ╬╝╬Á ¤â¤ä¤ü¤Ä¤â╬Á╬╣¤é ¤Ç╬▒╬¢¤ä╬Á¤â¤Ç╬¼╬¢╬╣ ╬Á╬╝¤Ç╬┐¤ä╬╣¤â╬╝╬¡╬¢╬┐ ¤â╬Á ╬╗╬╣╬║╬¡¤ü Alkermes, ╬╝╬Á ╬Á¤Ç╬╣╬║╬¼╬╗¤à¤ê╬À ¤Ç╬╗╬┐¤ì¤â╬╣╬▒¤é ¤â╬┐╬║╬┐╬╗╬¼¤ä╬▒¤é.'
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
                     {language === 'GR' ? '╬ê¤ä╬┐╬╣╬╝╬┐╬╣ ╬│╬╣╬▒ ╬┤╬┐╬║╬╣╬╝╬«;' : 'Ready to taste?'}
                  </p>
                  <a
                     href="#locations"
                     className="inline-block px-12 py-4 bg-brand-dark text-brand-gold font-bold tracking-widest uppercase hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 rounded-sm shadow-xl hover:shadow-2xl hover:-translate-y-1"
                  >
                     {language === 'GR' ? '╬ò¤Ç╬╣¤â╬║╬Á¤å╬©╬Á╬╣¤ä╬Á ╬╝╬▒¤é' : 'Visit Us'}
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
                     ╬º¤ë¤ü╬»¤é ¤Ç¤ü╬┐¤â╬©╬«╬║╬À ╬Â╬¼¤ç╬▒¤ü╬À¤é ÔÇô ╬│╬╗¤à╬║╬▒╬»╬¢╬Á¤ä╬▒╬╣ ╬╝╬Á ╬╝╬▒╬╗¤ä╬╣¤ä¤î╬╗╬À & ¤â╬┐¤ü╬▓╬╣¤ä¤î╬╗╬À (¤Ç╬┐╬╗¤à¤î╬╗╬Á¤é). ╬ù ¤à¤Ç╬Á¤ü╬▓╬┐╬╗╬╣╬║╬« ╬║╬▒¤ä╬▒╬¢╬¼╬╗¤ë¤â╬À ╬╝¤Ç╬┐¤ü╬Á╬» ╬¢╬▒ ╬¡¤ç╬Á╬╣ ╬«¤Ç╬╣╬▒ ¤à¤Ç╬▒╬║¤ä╬╣╬║╬« ╬┤¤ü╬¼¤â╬À.
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
