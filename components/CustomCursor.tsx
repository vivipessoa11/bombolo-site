import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        // Only run on non-touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            setHidden(true);
            return;
        }

        const mMove = (el: MouseEvent) => {
            setPosition({ x: el.clientX, y: el.clientY });

            // Check if hovering over clickable element
            const target = el.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON'
            );
        };

        const mLeave = () => setHidden(true);
        const mEnter = () => setHidden(false);

        window.addEventListener('mousemove', mMove);
        document.addEventListener('mouseleave', mLeave);
        document.addEventListener('mouseenter', mEnter);

        return () => {
            window.removeEventListener('mousemove', mMove);
            document.removeEventListener('mouseleave', mLeave);
            document.removeEventListener('mouseenter', mEnter);
        };
    }, []);

    if (hidden) return null;

    return (
        <>
            {/* Main Dot */}
            <div
                className="fixed top-0 left-0 w-3 h-3 bg-brand-gold rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-100 ease-out will-change-transform"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${isPointer ? 2.5 : 1})`
                }}
            />
            {/* Trailing Ring */}
            <div
                className="fixed top-0 left-0 w-8 h-8 border border-brand-gold/50 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out will-change-transform"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${isPointer ? 1.5 : 1})`
                }}
            />
        </>
    );
};

export default CustomCursor;
