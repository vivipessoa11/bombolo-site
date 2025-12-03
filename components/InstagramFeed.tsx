import React from 'react';
import { Instagram } from 'lucide-react';
import { Reveal } from './Reveal';
import { Language } from '../App';

// Import existing assets to simulate feed
import pistachio from '../src/assets/pistachio.jpg';
import chocolate from '../src/assets/chocolate.jpg';
import fragola from '../src/assets/fragola.jpg';
import waffle from '../src/assets/waffle.jpg';
import bitter from '../src/assets/bitter.jpg';
import caffe from '../src/assets/CAFFE AFFOGATO.JPG';

interface InstagramFeedProps {
    language: Language;
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ language }) => {
    const t = {
        follow: language === 'GR' ? 'Ακολουθήστε μας' : 'Follow us',
        subtitle: language === 'GR' ? 'Μοιραστείτε τις στιγμές σας' : 'Share your moments',
    };

    const posts = [
        { src: pistachio, alt: 'Pistachio Gelato' },
        { src: chocolate, alt: 'Chocolate Gelato' },
        { src: waffle, alt: 'Belgian Waffles' },
        { src: fragola, alt: 'Strawberry Sorbet' },
        { src: caffe, alt: 'Affogato' },
        { src: bitter, alt: 'Bitter Chocolate' },
    ];

    return (
        <div className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <Reveal width="100%">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-brand-dark hover:text-brand-gold transition-colors duration-300 group"
                        >
                            <Instagram size={24} />
                            <h3 className="font-serif text-3xl md:text-4xl font-bold">@bombologelato</h3>
                        </a>
                    </Reveal>
                    <Reveal width="100%" delay={200}>
                        <p className="text-gray-500 mt-2 uppercase tracking-widest text-sm">{t.follow}</p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
                    {posts.map((post, idx) => (
                        <Reveal key={idx} width="100%" delay={idx * 100}>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block relative group overflow-hidden aspect-square rounded-lg"
                            >
                                <img
                                    src={post.src}
                                    alt={post.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                    <Instagram className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" size={32} />
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InstagramFeed;
