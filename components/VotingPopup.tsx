import React, { useEffect, useState, useCallback } from 'react';
import { X, Plane, Trophy } from 'lucide-react';
import { Language } from '../App';

interface VotingPopupProps {
    language: Language;
}

export const VOTING_URL = 'https://bestofthessaloniki.com/voting-top-100-awards/';
// Voting closes Monday 18 January 2027, 13:00 Greek time (UTC+2)
export const VOTING_DEADLINE = new Date('2027-01-18T13:00:00+02:00');
const TERMS_URL = 'https://bestofthessaloniki.com/%CE%BF%CF%81%CE%BF%CE%B9-%CF%83%CF%85%CE%BC%CE%BC%CE%B5%CF%84%CE%BF%CF%87%CE%B7%CF%83-%CE%B4%CE%B9%CE%B1%CE%B3%CF%89%CE%BD%CE%B9%CF%83%CE%BC%CE%BF%CF%85-best-of-thessaloniki-top-100-food-drink-award/';
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
            title: 'Ψήφισε Bombolo & μπες στην κλήρωση!',
            text: 'Είμαστε υποψήφιοι στην κατηγορία',
            category: 'Ice Cream',
            prize: 'Ψήφισε και μπες στην κλήρωση για ταξίδι στην Αίγυπτο για δύο.',
            steps: [
                'Επίλεξε Bombolo στην κατηγορία «Ice Cream»',
                'Διάλεξε μία επιλογή και στις 17 κατηγορίες — απαιτείται για την υποβολή',
                'Υπόβαλε με όνομα και email — μία ψήφος ανά email',
            ],
            terms: '18+, κάτοικοι Ελλάδας· ισχύουν όροι',
            photoAlt: 'Γυναίκα δοκιμάζει gelato Bombolo μπροστά στις πυραμίδες της Αιγύπτου',
            cta: 'Ψήφισε τώρα',
            later: 'Ίσως αργότερα',
            deadline: 'Λήξη ψηφοφορίας: 18/01/2027',
        }
        : {
            badge: 'TOP 100 Food & Drink Awards 2026',
            title: 'Vote Bombolo & enter the draw!',
            text: 'We are nominated in the category',
            category: 'Ice Cream',
            prize: 'Vote and enter the draw for a trip to Egypt for two.',
            steps: [
                'Choose Bombolo in "Ice Cream"',
                'Select one option in all 17 categories (required to submit)',
                'Submit with your name and email — one vote per email',
            ],
            terms: '18+, residents of Greece; terms apply',
            photoAlt: 'Woman tasting Bombolo gelato in front of the Egyptian pyramids',
            cta: 'Vote now',
            later: 'Maybe later',
            deadline: 'Voting ends 18/01/2027',
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

            <div className="relative bg-brand-cream w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up max-h-[calc(100dvh-1.5rem)] overflow-y-auto">
                <button
                    onClick={close}
                    aria-label={language === 'GR' ? 'Κλείσιμο' : 'Close'}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors z-10 shadow"
                >
                    <X size={20} className="text-brand-dark" />
                </button>

                <div className="relative aspect-video bg-brand-dark">
                    <img
                        src="/voting-egypt.webp"
                        alt={t.photoAlt}
                        width={1152}
                        height={648}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover object-center rounded-t-2xl"
                    />
                    <div className="absolute top-3 left-3 max-w-[11.75rem]">
                        <span className="inline-flex max-w-full items-start gap-1.5 px-2.5 py-1 bg-brand-gold text-brand-dark text-[10px] sm:text-[11px] font-bold uppercase tracking-wide rounded-2xl shadow-lg">
                            <Trophy size={14} className="shrink-0 mt-0.5" />
                            <span className="leading-tight text-left">{t.badge}</span>
                        </span>
                    </div>
                </div>

                <div className="px-4 py-3 sm:p-6 text-center">
                    <h3
                        id="voting-popup-title"
                        className="font-serif text-xl sm:text-3xl text-brand-dark mb-2 sm:mb-3 leading-tight"
                    >
                        {t.title}
                    </h3>

                    <p className="text-sm sm:text-base text-brand-text mb-3 sm:mb-5">
                        {t.text}{' '}
                        <strong className="text-brand-red">🍨 {t.category}</strong>
                    </p>

                    <div className="flex items-start gap-3 text-left bg-white rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-brand-gold/30">
                        <div className="p-2 bg-brand-gold/15 rounded-full text-brand-gold shrink-0">
                            <Plane size={20} />
                        </div>
                        <p className="text-sm text-brand-text leading-relaxed">{t.prize}</p>
                    </div>

                    <ol className="text-left text-xs text-gray-600 mb-3 sm:mb-4 space-y-1.5">
                        {t.steps.map((step, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="shrink-0 w-5 h-5 rounded-full bg-brand-gold text-brand-dark font-bold flex items-center justify-center text-[11px]">{i + 1}</span>
                                <span className="leading-snug">{step}</span>
                            </li>
                        ))}
                    </ol>

                    <a
                        href={VOTING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={close}
                        className="block w-full py-3 sm:py-4 bg-brand-dark text-brand-gold font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-brand-gold hover:text-brand-dark transition-colors shadow-lg"
                    >
                        {t.cta} 🤎
                    </a>

                    <button
                        onClick={close}
                        className="mt-2 sm:mt-3 text-xs text-gray-500 hover:text-brand-dark underline underline-offset-2"
                    >
                        {t.later}
                    </button>

                    <p className="mt-2 sm:mt-3 text-[11px] uppercase tracking-widest text-brand-gold font-bold">
                        {t.deadline}
                    </p>
                    <a
                        href={TERMS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-[11px] text-gray-500 hover:text-brand-dark underline underline-offset-2"
                    >
                        {t.terms}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VotingPopup;
