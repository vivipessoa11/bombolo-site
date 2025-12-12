import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Bike, IceCream, X, Plus, Navigation } from 'lucide-react';
import ReactGA from 'react-ga4';
import { Language } from '../App';

interface MobileQuickMenuProps {
    language: Language;
    onOpenDelivery: () => void;
}

const MobileQuickMenu: React.FC<MobileQuickMenuProps> = ({ language, onOpenDelivery }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCallModal, setShowCallModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Show button only after scrolling a bit
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const t = {
        delivery: language === 'GR' ? 'Delivery' : 'Delivery',
        locations: language === 'GR' ? 'Τοποθεσίες' : 'Locations',
        call: language === 'GR' ? 'Τηλέφωνο' : 'Call Us',
        menu: language === 'GR' ? 'Μενού' : 'Menu',
        close: language === 'GR' ? 'Κλείσιμο' : 'Close',
        select_store: language === 'GR' ? 'Επιλέξτε Κατάστημα' : 'Select Store',
        center: language === 'GR' ? 'Κέντρο' : 'City Center',
        toumpa: language === 'GR' ? 'Τούμπα' : 'Toumpa',
    };

    const toggleMenu = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (newState) {
            ReactGA.event({ category: 'MobileMenu', action: 'Open Menu' });
        }
        if (showCallModal) setShowCallModal(false);
    };

    const scrollToSection = (id: string, label: string) => {
        ReactGA.event({ category: 'MobileMenu', action: `Click ${label}` });
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    const handleCallClick = () => {
        ReactGA.event({ category: 'MobileMenu', action: 'Open Call Modal' });
        setShowCallModal(true);
    };

    const handleStoreCall = (store: string) => {
        ReactGA.event({ category: 'Conversion', action: 'Call', label: store });
    };

    const handleDeliveryClick = () => {
        ReactGA.event({ category: 'Conversion', action: 'Click Delivery' });
        onOpenDelivery();
        setIsOpen(false);
    };

    // If invisible, don't render or render hidden to avoid clicks
    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen || showCallModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => { setIsOpen(false); setShowCallModal(false); }}
            />

            {/* CALL MODAL */}
            <div className={`fixed inset-x-4 bottom-24 z-50 bg-white rounded-xl shadow-2xl p-6 transition-all duration-300 transform ${showCallModal ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-serif text-xl text-brand-dark font-bold">{t.select_store}</h3>
                    <button onClick={() => setShowCallModal(false)} className="p-1 bg-gray-100 rounded-full">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <a onClick={() => handleStoreCall('Center')} href="tel:+302310229398" className="flex items-center gap-4 p-4 border border-brand-dark/10 rounded-lg active:bg-brand-cream transition-colors">
                        <div className="bg-brand-dark text-brand-gold p-3 rounded-full">
                            <Phone size={20} />
                        </div>
                        <div>
                            <span className="block font-bold text-brand-dark">{t.center}</span>
                            <span className="text-xs text-gray-500">Mitropoleos 88</span>
                        </div>
                    </a>
                    <a onClick={() => handleStoreCall('Toumpa')} href="tel:+302310229398" className="flex items-center gap-4 p-4 border border-brand-dark/10 rounded-lg active:bg-brand-cream transition-colors">
                        <div className="bg-brand-dark text-brand-gold p-3 rounded-full">
                            <Phone size={20} />
                        </div>
                        <div>
                            <span className="block font-bold text-brand-dark">{t.toumpa}</span>
                            <span className="text-xs text-gray-500">Grigoriou Lampraki 150</span>
                        </div>
                    </a>
                </div>
            </div>

            {/* FLOATING MENU ITEMS */}
            <div className={`fixed bottom-24 right-6 z-40 flex flex-col items-end gap-4 transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>

                {/* Menu Item: Delivery */}
                <button onClick={handleDeliveryClick} className="flex items-center gap-3 group">
                    <span className="bg-white text-brand-dark text-xs font-bold py-1 px-3 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{t.delivery}</span>
                    <div className="w-12 h-12 bg-white text-brand-dark rounded-full shadow-lg flex items-center justify-center border border-brand-gold/50 hover:bg-brand-gold hover:text-brand-dark transition-colors">
                        <Bike size={20} />
                    </div>
                </button>

                {/* Menu Item: Locations */}
                <button onClick={() => scrollToSection('locations', 'Locations')} className="flex items-center gap-3 group">
                    <span className="bg-white text-brand-dark text-xs font-bold py-1 px-3 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{t.locations}</span>
                    <div className="w-12 h-12 bg-white text-brand-dark rounded-full shadow-lg flex items-center justify-center border border-brand-gold/50 hover:bg-brand-gold hover:text-brand-dark transition-colors">
                        <MapPin size={20} />
                    </div>
                </button>

                {/* Menu Item: Menu */}
                <button onClick={() => scrollToSection('menu', 'Menu')} className="flex items-center gap-3 group">
                    <span className="bg-white text-brand-dark text-xs font-bold py-1 px-3 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{t.menu}</span>
                    <div className="w-12 h-12 bg-white text-brand-dark rounded-full shadow-lg flex items-center justify-center border border-brand-gold/50 hover:bg-brand-gold hover:text-brand-dark transition-colors">
                        <IceCream size={20} />
                    </div>
                </button>

                {/* Menu Item: Call */}
                <button onClick={handleCallClick} className="flex items-center gap-3 group">
                    <span className="bg-white text-brand-dark text-xs font-bold py-1 px-3 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{t.call}</span>
                    <div className="w-12 h-12 bg-white text-brand-dark rounded-full shadow-lg flex items-center justify-center border border-brand-gold/50 hover:bg-brand-gold hover:text-brand-dark transition-colors">
                        <Phone size={20} />
                    </div>
                </button>

            </div>

            {/* MAIN FAB BUTTON */}
            <button
                onClick={toggleMenu}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'bg-white text-brand-dark rotate-45' : 'bg-brand-dark text-brand-gold rotate-0'}`}
                aria-label="Quick Actions"
            >
                <Plus size={32} strokeWidth={2} />
            </button>
        </>
    );
};

export default MobileQuickMenu;
