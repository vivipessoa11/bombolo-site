import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { Language } from '../App';

interface CookieConsentProps {
    language: Language;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ language }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Show after a small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    const t = {
        text: language === 'GR'
            ? 'Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας.'
            : 'We use cookies to enhance your experience.',
        accept: language === 'GR' ? 'Αποδοχή' : 'Accept',
    };

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-[70] animate-slide-up">
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-lg shadow-2xl border-l-4 border-brand-gold flex flex-col gap-4">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-brand-cream rounded-full text-brand-dark shrink-0">
                        <Cookie size={20} />
                    </div>
                    <p className="text-brand-dark text-sm leading-relaxed font-medium">
                        {t.text}
                    </p>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2 bg-brand-dark text-brand-gold text-xs font-bold uppercase tracking-widest rounded hover:bg-brand-gold hover:text-brand-dark transition-colors shadow-lg"
                    >
                        {t.accept}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
