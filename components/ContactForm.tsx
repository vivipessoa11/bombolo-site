import React, { useState, useEffect } from 'react';
import { Send, Check, X } from 'lucide-react';
import { Language } from '../App';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialSubject?: string | null;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose, language, initialSubject }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: language === 'GR' ? 'Συνεργασία' : 'Partnership',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = {
    getIntouch: language === 'GR' ? 'Επικοινωνηστε' : 'Get in Touch',
    contactUs: language === 'GR' ? 'Επικοινωνία' : 'Contact Us',
    thanks: language === 'GR' ? 'Ευχαριστούμε!' : 'Thank You!',
    success: language === 'GR'
      ? 'Σας ευχαριστούμε πολύ! Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.'
      : 'Thank you very much! We will get back to you as soon as possible.',
    interested: language === 'GR' ? 'Ενδιαφέρομαι για...' : 'I am interested in...',
    name: language === 'GR' ? 'Όνομα' : 'Name',
    phone: language === 'GR' ? 'Τηλέφωνο' : 'Phone',
    email: language === 'GR' ? 'Email' : 'Email',
    message: language === 'GR' ? 'Μήνυμα' : 'Message',
    placeholderMsg: language === 'GR' ? 'Πώς μπορούμε να βοηθήσουμε;' : 'How can we help?',
    send: language === 'GR' ? 'Αποστολη' : 'Send Message',
  };

  const subjects = language === 'GR'
    ? ['Ιδέα', 'Βελτιώσεις', 'Franchise', 'Συνεργασία', 'Άλλο']
    : ['Idea', 'Improvements', 'Franchise', 'Partnership', 'Other'];

  // Lock body scroll when modal is open and set initial subject
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialSubject) {
        setFormData(prev => ({ ...prev, subject: initialSubject }));
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialSubject]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct mailto link
    const subject = `New Contact Form Submission: ${formData.subject}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0ASubject: ${formData.subject}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    const mailtoLink = `mailto:info@bombologelato.com?subject=${encodeURIComponent(subject)}&body=${body}`; // No encodeURIComponent for body to keep newlines working in some clients, but usually better to encode. Let's try simple first or encode properly.
    // Actually, it is safer to encode everything.
    const safeMailtoLink = `mailto:info@bombologelato.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`)}`;

    window.location.href = safeMailtoLink;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: subjects[3], message: '' });
      onClose();
    }, 5000); // Increased timeout to let them read the longer message
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-brand-cream w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-10"
        >
          <X size={24} className="text-brand-dark" />
        </button>

        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2">{t.getIntouch}</h2>
            <h3 className="font-serif text-3xl md:text-4xl text-brand-dark">{t.contactUs}</h3>
            <p className="text-gray-600 mt-2 text-sm">info@bombologelato.com | +30 231 022 9398</p>
          </div>

          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-serif text-2xl text-brand-dark mb-2">{t.thanks}</h4>
              <p className="text-gray-600">{t.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Subject Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                  {t.interested}
                </label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subj) => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, subject: subj }))}
                      className={`px-4 py-2 rounded-full border text-xs font-bold transition-all duration-200 ${formData.subject === subj
                        ? 'bg-brand-dark border-brand-dark text-white shadow-md'
                        : 'bg-white border-gray-200 text-gray-500 hover:border-brand-gold hover:text-brand-gold'
                        }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:border-brand-gold focus:outline-none transition-colors placeholder-gray-300 font-serif"
                    placeholder="Giovanni Rossi"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:border-brand-gold focus:outline-none transition-colors placeholder-gray-300 font-serif"
                    placeholder="+30 69..."
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                  {t.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:border-brand-gold focus:outline-none transition-colors placeholder-gray-300 font-serif"
                  placeholder="giovanni@example.com"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                  {t.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-200 bg-white rounded-sm py-2 px-3 focus:border-brand-gold focus:outline-none transition-all placeholder-gray-300 resize-none"
                  placeholder={t.placeholderMsg}
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-brand-dark text-white font-bold tracking-widest uppercase hover:bg-brand-gold transition-colors text-sm"
                >
                  {t.send}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;