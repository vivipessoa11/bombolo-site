import React, { useEffect, useState, useCallback } from 'react';
import { X, Plane, Trophy } from 'lucide-react';
import { Language } from '../App';
import coneGelato from '../src/assets/conegelato.webp';

interface VotingPopupProps {
    language: Language;
}

const VOTING_URL = 'https://bestofthessaloniki.com/voting-top-100-awards/';
// Voting closes Monday 18 January 2027, 12:59 Greek time (UTC+2)
const VOTING_DEADLINE = new Date('2027-01-18T12:59:00+02:00');
const STORAGE_KEY = 'votingPopupDismissedAt';
// After closing, show again only after 3 days
const HIDE_FOR_MS = 3 * 24 * 60 * 60 * 1000;
// Wait for the preloader (2.5s + 1s exit) before showing
const SHOW_DELAY_MS = 4500;

const VotingPopup: React.FC<VotingPopupProps> = ({ language }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (new Date() > VOTING_DEADLINE) return;

        try {
            const dismissedAt = Number(localStorage.getItem(STORAGE_KEY) || 0);
            if (dismissedAt && Date.now() - dismissedAt < HIDE_FOR_MS) return;
        } catch {
            // storage unavailable: just show the popup
        }

        const timer = setTimeout(() => setIsOpen(true), SHOW_DELAY_MS);
        return () => clearTimeout(timer);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        try {
            localStorage.setItem(STORAGE_KEY, String(Date.now()));
        } catch {
            // ignore
        }
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = 'hidden';
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, close]);

    if (!isOpen) return null;

    const t = language === 'GR'
        ? {
            badge: 'TOP 100 Food & Drink Awards 2026',
            title: 'Ψήφισε Bombolo & κέρδισε ταξίδι!',
            text: 'Είμαστε υποψήφιοι στην κατηγορία',
            category: 'Ice Cream',
            prize: 'Με την ψήφο σου μπαίνεις αυτόματα στην κλήρωση για ταξίδι στην Αίγυπτο για 2 άτομα.',
            how: 'Διαλέγεις ένα αγαπημένο σε κάθε κατηγορία. Το Ice Cream είναι προς το τέλος της λίστας 😉',
            cta: 'Ψήφισε τώρα',
            later: 'Ίσως αργότερα',
            deadline: 'Η ψηφοφορία λήγει 18/01/2027',
        }
        : {
            badge: 'TOP 100 Food & Drink Awards 2026',
            title: 'Vote Bombolo & win a trip!',
            text: 'We are nominated in the category',
            category: 'Ice Cream',
            prize: 'By voting, you are automatically entered into the draw for a trip to Egypt for 2 people.',
            how: 'Pick one favourite in each category. Ice Cream is near the end of the list 😉',
            cta: 'Vote now',
            later: 'Maybe later',
            deadline: 'Voting closes 18/01/2027',
        };

    return (
        <div
            className="fixed inset-0 z-[75] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="voting-popup-title"
        >
            <div
                className="absolute inset-0 bg-brand-dark/85 backdrop-blur-sm"
                onClick={close}
            ></div>

            <div className="relative bg-brand-cream w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up max-h-[92vh] overflow-y-auto">
                <button
                    onClick={close}
                    aria-label={language === 'GR' ? 'Κλείσιμο' : 'Close'}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors z-10 shadow"
                >
                    <X size={20} className="text-brand-dark" />
                </button>

                <div className="relative h-40 sm:h-48 bg-brand-dark">
                    <img
                        src={coneGelato}
                        alt="Bombolo gelato"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent"></div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold text-brand-dark text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                            <Trophy size={14} />
                            {t.badge}
                        </span>
                    </div>
                </div>

                <div className="p-6 sm:p-8 text-center">
                    <h3
                        id="voting-popup-title"
                        className="font-serif text-2xl sm:text-3xl text-brand-dark mb-3 leading-tight"
                    >
                        {t.title}
                    </h3>

                    <p className="text-brand-text mb-5">
                        {t.text}{' '}
                        <strong className="text-brand-red">🍨 {t.category}</strong>
                    </p>

                    <div className="flex items-start gap-3 text-left bg-white rounded-xl p-4 mb-4 border border-brand-gold/30">
                        <div className="p-2 bg-brand-gold/15 rounded-full text-brand-gold shrink-0">
                            <Plane size={20} />
                        </div>
                        <p className="text-sm text-brand-text leading-relaxed">{t.prize}</p>
                    </div>

                    <p className="text-xs text-gray-500 mb-6 leading-relaxed">{t.how}</p>

                    <a
                        href={VOTING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={close}
                        className="block w-full py-4 bg-brand-dark text-brand-gold font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-brand-gold hover:text-brand-dark transition-colors shadow-lg"
                    >
                        {t.cta} 🤎
                    </a>

                    <button
                        onClick={close}
                        className="mt-3 text-xs text-gray-500 hover:text-brand-dark underline underline-offset-2"
                    >
                        {t.later}
                    </button>

                    <p className="mt-4 text-[11px] uppercase tracking-widest text-brand-gold font-bold">
                        {t.deadline}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VotingPopup;
