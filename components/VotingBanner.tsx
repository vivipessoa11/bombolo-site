import React, { useEffect } from 'react';
import { Language } from '../App';
import { VOTING_URL, VOTING_DEADLINE } from './VotingPopup';

interface VotingBannerProps {
    language: Language;
}

const VotingBanner: React.FC<VotingBannerProps> = ({ language }) => {
    const active = new Date() <= VOTING_DEADLINE;

    // Offset the fixed Navbar by the banner height
    useEffect(() => {
        if (!active) return;
        document.documentElement.style.setProperty('--banner-h', '2.75rem');
        return () => {
            document.documentElement.style.removeProperty('--banner-h');
        };
    }, [active]);

    if (!active) return null;

    const t = language === 'GR'
        ? { text: 'Ψήφισε Bombolo στα TOP 100 Food & Drink Awards!', cta: 'Ψήφισε τώρα' }
        : { text: 'Vote Bombolo in the TOP 100 Food & Drink Awards!', cta: 'Vote now' };

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-11 bg-brand-dark text-brand-gold flex items-center justify-center gap-3 px-3">
            <p className="text-[11px] sm:text-sm font-medium leading-tight text-center line-clamp-2">{t.text}</p>
            <a
                href={VOTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3 py-1 bg-brand-gold text-brand-dark text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white transition-colors"
            >
                {t.cta}
            </a>
        </div>
    );
};

export default VotingBanner;
