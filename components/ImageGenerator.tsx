import React, { useState } from 'react';
import { Image as ImageIcon, Wand2, Download, Loader2, Layers } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const handlePreset = (type: string) => {
    switch (type) {
      case 'hero':
        setPrompt("Cinematic extreme close-up of Pistachio gelato texture. Dense, creamy, velvety surface with visible crushed Bronte pistachios. Ivory and soft green color palette. High-end food photography, 8k, studio lighting.");
        break;
      case 'story':
        setPrompt("Portrait of an artisan gelato maker's hands carefully serving gelato. Warm lighting, rustic Italian kitchen background, focus on craftsmanship and tradition. Authentic atmosphere.");
        break;
      case 'waffle':
        setPrompt("Golden Belgian waffle on a white ceramic plate, topped with chocolate praline and a perfect scoop of vanilla gelato. Natural sunlight (golden hour), appetizing steam, high contrast, sharp focus.");
        break;
      case 'interior':
        setPrompt("Wide shot of a boutique gelateria interior in Thessaloniki. Minimalist luxury design, marble counters, gold brass accents, warm beige and cream tones. Architectural Digest style, photorealistic.");
        break;
    }
  };

  const generateImage = async () => {
    if (!prompt) return;

    try {
      setLoading(true);
      setStatus('Checking API Key...');

      // API Key Selection
      if (!(window as any).aistudio) {
        throw new Error("AI Studio environment not found");
      }
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
      }

      setStatus('Initializing Gemini 3 Pro Image...');
      // Create new instance with current key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      setStatus(`Generating ${size} Image...`);
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            imageSize: size,
            aspectRatio: "16:9" // Defaulting to landscape for website assets
          }
        }
      });

      setStatus('Processing response...');
      
      // Extract image from response parts
      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64 = part.inlineData.data;
            setGeneratedImage(`data:image/png;base64,${base64}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        throw new Error("No image data found in response");
      }
      
      setStatus('Complete!');

    } catch (error: any) {
      console.error("Generation error:", error);
      if (error.message && error.message.includes("Requested entity was not found")) {
          setStatus('Session expired. Please re-select API Key.');
          if ((window as any).aistudio) {
            await (window as any).aistudio.openSelectKey();
          }
      } else {
          setStatus(`Error: ${error.message || "Failed to generate"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 bg-brand-dark text-brand-cream relative overflow-hidden" id="ai-studio">
       {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-pistachio/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3">Admin Tools</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">AI Photo Lab</h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Generate high-fidelity assets for your website using Gemini 3 Pro. Create stunning food photography or interior concepts in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Controls Panel */}
          <div className="space-y-8 bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-sm">
            
            {/* Quick Presets */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                <Wand2 size={14} /> Website Assets
              </label>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => handlePreset('hero')}
                  className="px-4 py-2 bg-brand-pistachio/20 hover:bg-brand-pistachio/40 text-brand-pistachio border border-brand-pistachio/30 rounded-full text-sm font-medium transition-colors"
                >
                  Hero Texture
                </button>
                <button 
                  onClick={() => handlePreset('story')}
                  className="px-4 py-2 bg-brand-gold/20 hover:bg-brand-gold/40 text-brand-gold border border-brand-gold/30 rounded-full text-sm font-medium transition-colors"
                >
                  Story Image
                </button>
                 <button 
                  onClick={() => handlePreset('waffle')}
                  className="px-4 py-2 bg-brand-berry/20 hover:bg-brand-berry/40 text-brand-berry border border-brand-berry/30 rounded-full text-sm font-medium transition-colors"
                >
                  Waffles
                </button>
                <button 
                  onClick={() => handlePreset('interior')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full text-sm font-medium transition-colors"
                >
                  Store Interior
                </button>
              </div>
            </div>

            {/* Prompt Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Image Description
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate in detail..."
                className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none resize-none font-sans"
              />
            </div>

            {/* Settings */}
            <div>
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                <Layers size={14} /> Image Resolution
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['1K', '2K', '4K'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s as any)}
                    className={`py-3 border rounded-lg text-sm font-bold transition-all ${
                      size === s 
                        ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-lg' 
                        : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateImage}
              disabled={loading || !prompt}
              className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${
                loading || !prompt
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-brand-dark hover:bg-brand-gold hover:text-white shadow-lg hover:shadow-brand-gold/20'
              }`}
            >
              {loading ? <><Loader2 className="animate-spin" /> {status}</> : 'Generate Image'}
            </button>

             <p className="text-xs text-center text-gray-500 mt-2">Powered by Gemini 3 Pro Image Preview</p>
          </div>

          {/* Preview Panel */}
          <div className="bg-black/40 rounded-xl border border-white/10 overflow-hidden flex flex-col items-center justify-center min-h-[400px] relative group">
            {generatedImage ? (
              <>
                <img 
                  src={generatedImage} 
                  alt="Generated Asset" 
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a 
                    href={generatedImage} 
                    download={`bombolo-${prompt.slice(0,10).replace(/\s/g,'-')}.png`}
                    className="px-6 py-3 bg-white text-brand-dark rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-gold transition-colors flex items-center gap-2"
                  >
                    <Download size={16} /> Download Asset
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon size={32} className="opacity-50" />
                </div>
                <p className="font-serif text-xl">Your image will appear here</p>
                <p className="text-sm opacity-50 mt-2">Select a preset or type a prompt to begin</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;