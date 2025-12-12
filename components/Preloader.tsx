import React, { useEffect, useState } from 'react';

const Preloader: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        // Disable scroll while loading
        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => {
            setLoading(false);
            // Wait for exit animation to finish before removing from DOM
            setTimeout(() => {
                setComplete(true);
                document.body.style.overflow = 'unset';
            }, 1000);
        }, 2500); // 2.5s display time

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (complete) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${loading ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <div className="relative flex flex-col items-center">
                {/* Animated Text */}
                <h1 className="font-serif text-5xl md:text-7xl text-brand-gold italic tracking-tighter animate-pulse">
                    Bombolo.
                </h1>
                <div className="mt-4 h-[2px] w-24 bg-brand-gold/30 overflow-hidden relative">
                    <div className="absolute inset-0 bg-brand-gold w-full animate-slide-right"></div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
