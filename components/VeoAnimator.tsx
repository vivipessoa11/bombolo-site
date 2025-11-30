import React, { useState, useRef } from 'react';
import { Upload, Play, Film, Loader2, Check, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/png;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

const VeoAnimator: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setVideoUrl(null);
    }
  };

  const handlePreset = (type: 'texture' | 'origin' | 'experience') => {
    switch (type) {
      case 'texture':
        setPrompt("Cinematic close-up of pistachio gelato, showing its dense, velvety texture. Slow motion ripples appearing on the surface. Luxurious ivory and green colors. High quality food photography.");
        break;
      case 'origin':
        setPrompt("Pistachio gelato in the center. Whole fresh Bronte pistachios falling in slow motion around it in an elegant spiral. Soft lighting, premium aesthetic.");
        break;
      case 'experience':
        setPrompt("A dynamic video starting with creamy pistachio gelato, transitioning quickly to a sunny pistachio field in Sicily, then back to the gelato. Vibrant and energetic.");
        break;
    }
  };

  const generateVideo = async () => {
    if (!imageFile) return;
    
    try {
      setLoading(true);
      setStatus('Checking API Key...');

      // API Key Selection Logic for Veo
      if (!(window as any).aistudio) {
          throw new Error("AI Studio environment not found");
      }
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
          await (window as any).aistudio.openSelectKey();
      }

      setStatus('Uploading image & Initializing Veo...');
      const base64Image = await fileToBase64(imageFile);
      
      // Initialize API with the selected key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Start Generation
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || "Animate this delicious gelato in a cinematic way.",
        image: {
          imageBytes: base64Image,
          mimeType: imageFile.type,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p', // Veo fast supports 720p
          aspectRatio: aspectRatio,
        }
      });

      setStatus('Generating video (this may take a moment)...');
      
      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        operation = await ai.operations.getVideosOperation({ operation: operation });
        setStatus('Rendering frames...');
      }

      if (operation.response?.generatedVideos?.[0]?.video?.uri) {
        const videoUri = operation.response.generatedVideos[0].video.uri;
        // Fetch the actual video bytes using the URI + API Key
        const fetchResponse = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
        const blob = await fetchResponse.blob();
        setVideoUrl(URL.createObjectURL(blob));
        setStatus('Complete!');
      } else {
        throw new Error('No video URI returned');
      }

    } catch (error: any) {
      console.error(error);
      if (error.message && error.message.includes("Requested entity was not found")) {
          setStatus('Session expired. Please select API Key again.');
          if ((window as any).aistudio) {
             await (window as any).aistudio.openSelectKey();
          }
      } else {
          setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 bg-brand-dark text-brand-cream relative overflow-hidden" id="ai-studio">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3">AI Creative Studio</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">Animate Your Gelato</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Upload a photo of your Bombolo gelato and use Google's Veo AI to bring the texture and flavor to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left: Controls */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
             
             {/* Upload Area */}
             <div 
                className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-brand-gold/50 transition-colors cursor-pointer bg-black/20 mb-8"
                onClick={() => fileInputRef.current?.click()}
             >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/png, image/jpeg, image/webp"
                />
                {imagePreview ? (
                  <div className="relative aspect-video mx-auto overflow-hidden rounded-lg shadow-lg max-h-48 object-contain">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-white font-bold flex items-center gap-2"><Upload size={16}/> Change Photo</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <ImageIcon size={48} className="mb-4 text-brand-gold opacity-50"/>
                    <p className="font-bold text-white">Click to upload photo</p>
                    <p className="text-sm mt-2">JPG, PNG or WebP</p>
                  </div>
                )}
             </div>

             {/* Presets */}
             <div className="space-y-4 mb-8">
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Select Animation Style</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button 
                    onClick={() => handlePreset('texture')}
                    className="p-3 bg-white/5 hover:bg-brand-gold/20 border border-white/10 rounded text-left transition-colors text-sm"
                  >
                    <span className="block font-bold text-brand-gold mb-1">Velvet Texture</span>
                    <span className="text-xs text-gray-400">Focus on density & creaminess.</span>
                  </button>
                  <button 
                    onClick={() => handlePreset('origin')}
                    className="p-3 bg-white/5 hover:bg-brand-gold/20 border border-white/10 rounded text-left transition-colors text-sm"
                  >
                    <span className="block font-bold text-brand-gold mb-1">Bronte Origin</span>
                    <span className="text-xs text-gray-400">Falling pistachios & ingredients.</span>
                  </button>
                   <button 
                    onClick={() => handlePreset('experience')}
                    className="p-3 bg-white/5 hover:bg-brand-gold/20 border border-white/10 rounded text-left transition-colors text-sm"
                  >
                    <span className="block font-bold text-brand-gold mb-1">Sensory Trip</span>
                    <span className="text-xs text-gray-400">Fast transition to Sicily.</span>
                  </button>
                </div>
             </div>

             {/* Custom Prompt & Ratio */}
             <div className="space-y-6">
               <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Or Describe Your Own</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe how you want the image to move..."
                    className="w-full bg-black/20 border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none min-h-[80px] resize-none"
                  />
               </div>
               
               <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="ratio" 
                      checked={aspectRatio === '16:9'} 
                      onChange={() => setAspectRatio('16:9')}
                      className="text-brand-gold focus:ring-brand-gold"
                    />
                    <span>Landscape (16:9)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="ratio" 
                      checked={aspectRatio === '9:16'} 
                      onChange={() => setAspectRatio('9:16')}
                      className="text-brand-gold focus:ring-brand-gold"
                    />
                    <span>Portrait (9:16)</span>
                  </label>
               </div>
             </div>

             <button
                onClick={generateVideo}
                disabled={loading || !imageFile}
                className={`w-full mt-8 py-4 font-bold tracking-widest uppercase flex items-center justify-center gap-3 transition-all ${
                  loading || !imageFile 
                  ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
                  : 'bg-brand-gold text-brand-dark hover:bg-white'
                }`}
             >
               {loading ? (
                 <>
                   <Loader2 className="animate-spin" /> {status}
                 </>
               ) : (
                 <>
                   <Film size={20} /> Generate Video
                 </>
               )}
             </button>
             
             <p className="text-xs text-center text-gray-500 mt-4">Powered by Google Veo 3.1. Video generation may take 1-2 minutes.</p>
          </div>

          {/* Right: Result */}
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-black/40 rounded-xl border border-white/10 p-4">
             {videoUrl ? (
               <div className="w-full h-full flex flex-col items-center">
                  <h4 className="text-brand-gold font-serif text-xl mb-4">Your Creation</h4>
                  <video 
                    src={videoUrl} 
                    controls 
                    autoPlay 
                    loop 
                    className={`w-full rounded-lg shadow-2xl border border-brand-gold/20 ${aspectRatio === '9:16' ? 'max-w-xs' : 'max-w-full'}`}
                  />
                  <a 
                    href={videoUrl} 
                    download="bombolo-veo.mp4"
                    className="mt-6 px-6 py-2 border border-white text-white hover:bg-white hover:text-brand-dark transition-colors uppercase text-sm font-bold tracking-wider rounded-full"
                  >
                    Download Video
                  </a>
               </div>
             ) : (
               <div className="text-center text-gray-500 opacity-50">
                  <Play size={64} className="mx-auto mb-4" />
                  <p className="text-xl font-serif">Video preview will appear here</p>
               </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default VeoAnimator;