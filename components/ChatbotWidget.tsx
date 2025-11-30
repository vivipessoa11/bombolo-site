import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Send, Loader2, User, Bot } from 'lucide-react';
import { Language } from '../App';
import { GoogleGenAI } from "@google/genai";

interface ChatbotWidgetProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void; // We keep onClose for explicit close actions
  onOpen: () => void; // We add onOpen for the FAB
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ language, isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = {
    title: language === 'GR' ? 'AI Bombolo' : 'AI Bombolo',
    subtitle: language === 'GR' ? 'Ο ψηφιακός σας βοηθός' : 'Your digital assistant',
    placeholder: language === 'GR' ? 'Ρωτήστε με για τις γεύσεις...' : 'Ask me about flavors...',
    welcome: language === 'GR' 
      ? 'Γεια σας! Είμαι η AI Bombolo. Μπορώ να σας προτείνω γεύσεις, να σας πω για τα γλυκά μας ή να σας βοηθήσω με το μενού. Μπορείτε να μου μιλήσετε σε όποια γλώσσα θέλετε!' 
      : 'Hello! I am AI Bombolo. I can recommend flavors, tell you about our desserts, or help with the menu. You can speak to me in any language!',
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'model', text: t.welcome }]);
    }
  }, [language]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const hasKey = (window as any).aistudio 
        ? await (window as any).aistudio.hasSelectedApiKey() 
        : !!process.env.API_KEY;

      if (!hasKey) {
         if ((window as any).aistudio) await (window as any).aistudio.openSelectKey();
         throw new Error("Please select an API Key to chat.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemPrompt = `
        You are the AI assistant for Bombolo Gelato in Thessaloniki, Greece.
        Your tone is friendly, welcoming, and passionate about authentic Italian gelato.
        
        IMPORTANT: The user may speak in any language (Greek, English, Portuguese, Spanish, etc.).
        ALWAYS respond in the SAME LANGUAGE that the user writes to you.
        If the user writes in Greek, respond in Greek.
        If the user writes in English, respond in English.
        
        Key Information:
        - Locations: Mitropoleos 88 and Grigoriou Lampraki 150.
        - Hours: approx 12:00 PM to 12:00 AM daily.
        - Contact: +30 231 022 9398.
        - Philosophy: Authentic Italian recipes, premium ingredients.
        
        Menu Highlights:
        - Gelato Flavors: Pistacchio (Bronte), Nocciolla (Piedmont), Tiramisu, Cioccolato, Ferrero, Buerno, Kaimaki, Salted Caramel, etc.
        - Sugar-Free Options (Stevia): Pistacchio, Chocolate, Fior di Latte, Fragola.
        - Vegan Sorbets: Mango, Strawberry, Lemon, Dark Chocolate (Bitter).
        - Service: Cups (S/M/L/XL), Cones (Gelato & Special), Takeaway (350g to 1.5kg).
        - Sweets: Waffles (Belgian recipe), Profiterole, Gelato Chicago, Tiramisu cake.
        
        Keep answers concise, helpful, and appetizing.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + "\n\nUser: " + userMessage }] }
        ]
      });

      const aiText = response.text || (language === 'GR' ? 'Συγγνώμη, δεν κατάλαβα.' : 'I am sorry, I did not understand.');
      
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);

    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: `Error: ${error.message || 'Something went wrong.'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={`bg-white rounded-xl shadow-2xl border border-brand-gold/20 w-80 sm:w-96 mb-4 transition-all duration-300 origin-bottom-right overflow-hidden pointer-events-auto flex flex-col ${
          isOpen ? 'opacity-100 scale-100 h-[500px]' : 'opacity-0 scale-90 h-0 mb-0'
        }`}
      >
        {/* Header */}
        <div className="bg-brand-dark p-4 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-3">
              <div className="bg-brand-gold/20 p-2 rounded-full text-brand-gold border border-brand-gold/30">
                  <Sparkles size={18} />
              </div>
              <div>
                  <h4 className="text-white font-bold text-sm leading-none mb-1">{t.title}</h4>
                  <span className="text-gray-400 text-[10px] uppercase tracking-wider">{t.subtitle}</span>
              </div>
           </div>
           <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
             <X size={20} />
           </button>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-4 bg-brand-cream/30 space-y-4">
           {messages.map((msg, idx) => (
             <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                   <div className={`p-2 rounded-full shrink-0 ${msg.role === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-brand-dark text-brand-gold'}`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                   </div>
                   <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                     msg.role === 'user' 
                       ? 'bg-white text-gray-800 rounded-br-none shadow-sm border border-gray-100' 
                       : 'bg-brand-dark text-white rounded-bl-none shadow-md'
                   }`}>
                      {msg.text}
                   </div>
                </div>
             </div>
           ))}
           {isLoading && (
             <div className="flex justify-start">
                <div className="flex items-center gap-2 bg-brand-dark/5 p-3 rounded-2xl rounded-bl-none">
                   <Loader2 size={16} className="animate-spin text-brand-dark" />
                   <span className="text-xs text-gray-500">Thinking...</span>
                </div>
             </div>
           )}
           <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
           <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:border-brand-gold/50 focus-within:bg-white transition-colors">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t.placeholder}
                className="flex-grow bg-transparent outline-none text-sm text-brand-dark placeholder-gray-400"
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage} 
                disabled={isLoading || !inputValue.trim()}
                className={`p-2 rounded-full transition-all ${
                  inputValue.trim() ? 'text-brand-dark hover:bg-brand-gold/20' : 'text-gray-300'
                }`}
              >
                 <Send size={18} />
              </button>
           </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={isOpen ? onClose : onOpen}
        className="bg-brand-dark text-brand-gold p-4 rounded-full shadow-2xl hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 border-2 border-brand-gold/20 hover:scale-105 group pointer-events-auto"
        aria-label="Open Chatbot"
      >
        {isOpen ? (
           <X size={28} strokeWidth={1.5} />
        ) : (
           <MessageCircle size={28} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform" />
        )}
      </button>
    </div>
  );
};

export default ChatbotWidget;