import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Language } from '../App';
import woltLogo from '../src/assets/wolt.png';
import efoodLogo from '../src/assets/efood.png';

interface DeliveryModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: Language;
}

const DeliveryModal: React.FC<DeliveryModalProps> = ({ isOpen, onClose, language }) => {

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const t = {
        title: language === 'GR' ? 'Παραγγείλετε Online' : 'Order Online',
        subtitle: language === 'GR'
            ? 'Απολαύστε το Bombolo στο σπίτι σας.'
            : 'Enjoy Bombolo at the comfort of your home.',
        choose: language === 'GR' ? 'Επιλέξτε πλατφόρμα:' : 'Choose your platform:',
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                >
                    <X size={20} className="text-brand-dark" />
                </button>

                <div className="p-8 md:p-10 text-center">
                    <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-3">{t.title}</h3>
                    <p className="text-gray-500 mb-8">{t.subtitle}</p>

                    <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-6">{t.choose}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Wolt */}
                        <a
                            href="https://wolt.com/el/grc/thessaloniki/restaurant/bombolo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-xl hover:border-[#009DE0] hover:bg-[#009DE0]/5 transition-all duration-300"
                        >
                            <div className="h-16 flex items-center justify-center mb-4">
                                <img src={woltLogo} alt="Wolt" className="h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <span className="font-bold text-gray-700 group-hover:text-[#009DE0] transition-colors">Wolt</span>
                        </a>

                        {/* E-food */}
                        <a
                            href="https://www.e-food.gr/delivery/menu/bombolo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-xl hover:border-[#ED1C24] hover:bg-[#ED1C24]/5 transition-all duration-300"
                        >
                            <div className="h-16 flex items-center justify-center mb-4">
                                <img src={efoodLogo} alt="e-food" className="h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <span className="font-bold text-gray-700 group-hover:text-[#ED1C24] transition-colors">e-food</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryModal;
