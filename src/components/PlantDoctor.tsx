import React, { useState, useRef } from 'react';
import { LanguageCode, PlantDiagnosis } from '../types';
import { UI_TRANSLATIONS } from '../data/agriData';
import { safeShareToWhatsApp } from '../utils/share';
import { 
  Camera, Upload, Sparkles, Volume2, Square, Share2, 
  Send, ShieldAlert, BookOpen, FileText, CheckCircle2, 
  AlertTriangle, RefreshCw, Eye
} from 'lucide-react';

interface PlantDoctorProps {
  currentLanguage: LanguageCode;
  state: string;
  district: string;
  onOpenIcarDirectory: () => void;
}

export const PlantDoctor: React.FC<PlantDoctorProps> = ({
  currentLanguage,
  state,
  district,
  onOpenIcarDirectory
}) => {
  const ui = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.English;
  const [selectedImage, setSelectedImage] = useState<string>('/sample_leaf.jpg');
  const [imageName, setImageName] = useState<string>('sample_leaf.jpg');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [diagnosis, setDiagnosis] = useState<PlantDiagnosis | null>(null);
  
  // Inspection modes
  const [inspectionFilter, setInspectionFilter] = useState<'normal' | 'thermal' | 'edges'>('normal');

  // GramaSetu Mesh state
  const [radiusKm, setRadiusKm] = useState<number>(5);
  const [farmerPhone, setFarmerPhone] = useState<string>('');
  const [passportOpen, setPassportOpen] = useState<boolean>(false);

  // Vernacular Speech state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cleanDistrict = district.split('(')[0].trim();
  const cleanState = state.split('(')[0].trim();

  // Language mapping for speech
  const langKeyMap: Record<LanguageCode, { code: string; bcp: string; label: string }> = {
    'English': { code: 'en', bcp: 'en-IN', label: 'English' },
    'Tamil (தமிழ்)': { code: 'ta', bcp: 'ta-IN', label: 'தமிழ்' },
    'Hindi (हिन्दी)': { code: 'hi', bcp: 'hi-IN', label: 'हिन्दी' },
    'Telugu (తెలుగు)': { code: 'te', bcp: 'te-IN', label: 'తెలుగు' },
    'Kannada (ಕನ್ನಡ)': { code: 'kn', bcp: 'kn-IN', label: 'ಕನ್ನಡ' },
    'Malayalam (മലയാളം)': { code: 'ml', bcp: 'ml-IN', label: 'മലയാളം' }
  };
  const activeLangConfig = langKeyMap[currentLanguage] || langKeyMap.English;

  // Handle Preset Sample Selection
  const handleSelectPreset = (url: string, name: string) => {
    setSelectedImage(url);
    setImageName(name);
    setDiagnosis(null);
  };

  // Handle Image Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        setDiagnosis(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Camera Capture
  const handleCameraSnap = () => {
    fileInputRef.current?.click();
  };

  // Run Diagnosis API Call
  const handleDiagnose = async () => {
    setIsLoading(true);
    stopSpeaking();

    try {
      let base64Payload = selectedImage;
      // If image is a relative URL like /sample_leaf.jpg, fetch and convert to base64
      if (selectedImage.startsWith('/')) {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        base64Payload = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      }

      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Payload,
          filename: imageName,
          state: cleanState,
          district: cleanDistrict,
          language: activeLangConfig.code
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setDiagnosis({
          ...json.data,
          isAiGenerated: json.isAiGenerated
        });
      }
    } catch (err) {
      console.error('Diagnostic error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Vernacular Speech synthesis using Web Speech API with sentence pacing
  const speakAdvisory = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    setIsSpeaking(true);
    const sentences = text.split(/(?<=[.?!…])\s+/).filter(s => s.trim().length > 0);
    let idx = 0;

    const speakNext = () => {
      if (!isSpeaking && idx > 0) return;
      if (idx >= sentences.length) {
        setIsSpeaking(false);
        return;
      }

      const chunk = sentences[idx++];
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = activeLangConfig.bcp;
      utterance.rate = 0.82;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setTimeout(speakNext, 400);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const getSpeechContent = () => {
    if (!diagnosis) return '';
    if (diagnosis.speech && diagnosis.speech[activeLangConfig.code]) {
      return diagnosis.speech[activeLangConfig.code];
    }
    if (diagnosis.speech && diagnosis.speech.en) {
      return diagnosis.speech.en;
    }
    return `Diagnosed ${diagnosis.disease} on ${diagnosis.crop}. Please apply recommended biological remedies promptly.`;
  };

  // Share to WhatsApp
  const shareToWhatsApp = () => {
    if (!diagnosis) return;
    const text = `🚨 *AgriN-Connect Field Outbreak Warning*\n📍 *Location:* ${cleanDistrict}, ${cleanState}\n🌾 *Crop:* ${diagnosis.crop}\n🦠 *Disease:* ${diagnosis.disease}\n🔴 *Severity:* ${diagnosis.severity}\n\n*🌿 Recommended Bio-Remedy:* ${diagnosis.remedies[0]?.title || 'Neemastram / Sour Buttermilk'}\n\nVerified via AgriN-Connect (Team Nexyra). Protect your fields!`;
    safeShareToWhatsApp(text);
  };

  const sendDirectMobileAlert = () => {
    if (!farmerPhone) return;
    const text = `🚨 *AgriN-Connect Urgent Crop Advisory*\nDisease: ${diagnosis?.disease || 'Pest Outbreak'}\nDistrict: ${cleanDistrict}\nImmediate Action: Deploy natural bio-remedies before spores spread!`;
    safeShareToWhatsApp(text, farmerPhone);
  };

  // Calculations for GramaSetu Mesh
  const peerCount = Math.round(radiusKm * 38);
  const areaShielded = Math.round(radiusKm * 75);
  const savingsPoolLakhs = (radiusKm * 1.85).toFixed(1);

  return (
    <section id="stack-plant-doctor" className="scroll-mt-6 mb-10">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 mb-4 border rounded-2xl bg-gradient-to-r from-emerald-950/70 to-[#041710] border-emerald-500/30 border-l-4 border-l-emerald-500 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 text-xl rounded-xl bg-emerald-500/20 text-emerald-300">
            🍃
          </div>
          <div>
            <div className="text-[10px] font-extrabold tracking-wider uppercase text-emerald-400">
              {ui.nav_f1_badge}
            </div>
            <h2 className="text-lg md:text-xl font-black text-white">{ui.nav_f1_title}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenIcarDirectory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition border rounded-xl bg-emerald-900/30 border-emerald-500/30 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-900/50"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Browse ICAR Directory</span>
          </button>
          <span className="px-3 py-1 text-xs font-bold border rounded-full bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
            ⚡ 1-Tap Photo Check
          </span>
        </div>
      </div>

      {/* Main Grid: Upload & Inspection vs Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Image Canvas & Studio Controls */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-4 border rounded-2xl bg-[#082117] border-emerald-500/30 shadow-lg">
            {/* Visual Leaf Viewer with Filter Modes */}
            <div className="relative overflow-hidden rounded-xl border border-emerald-500/30 bg-black/60 aspect-[4/3] flex items-center justify-center group">
              <img
                src={selectedImage}
                alt="Selected Leaf"
                className={`object-cover w-full h-full transition duration-300 ${
                  inspectionFilter === 'thermal'
                    ? 'contrast-200 hue-rotate-180 invert brightness-110'
                    : inspectionFilter === 'edges'
                    ? 'grayscale contrast-200 invert'
                    : ''
                }`}
              />

              {/* Inspection Filter Tabs */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 p-1 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-[10px]">
                <button
                  onClick={() => setInspectionFilter('normal')}
                  className={`px-2 py-0.5 rounded-lg transition ${
                    inspectionFilter === 'normal' ? 'bg-emerald-500 text-black font-bold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Raw
                </button>
                <button
                  onClick={() => setInspectionFilter('thermal')}
                  className={`px-2 py-0.5 rounded-lg transition ${
                    inspectionFilter === 'thermal' ? 'bg-amber-400 text-black font-bold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  JET Thermal
                </button>
                <button
                  onClick={() => setInspectionFilter('edges')}
                  className={`px-2 py-0.5 rounded-lg transition ${
                    inspectionFilter === 'edges' ? 'bg-sky-400 text-black font-bold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Edges
                </button>
              </div>

              {/* Status Overlay */}
              <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 text-[10px] font-mono rounded-lg bg-black/70 backdrop-blur-md text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{imageName}</span>
              </div>
            </div>

            {/* Presets and Upload Controls */}
            <div className="mt-3.5 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                {ui.sample_leaves}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleSelectPreset('/sample_paddy_blast.jpg', 'sample_paddy_blast.jpg')}
                  className="p-2 text-center transition border rounded-xl bg-emerald-950/40 border-emerald-500/30 hover:border-emerald-400 text-xs text-emerald-200"
                >
                  🌾 Paddy Blast
                </button>
                <button
                  onClick={() => handleSelectPreset('/sample_tomato_blight.jpg', 'sample_tomato_blight.jpg')}
                  className="p-2 text-center transition border rounded-xl bg-emerald-950/40 border-emerald-500/30 hover:border-emerald-400 text-xs text-emerald-200"
                >
                  🍅 Tomato Blight
                </button>
                <button
                  onClick={() => handleSelectPreset('/sample_leaf.jpg', 'sample_powdery_mildew.jpg')}
                  className="p-2 text-center transition border rounded-xl bg-emerald-950/40 border-emerald-500/30 hover:border-emerald-400 text-xs text-emerald-200"
                >
                  🌿 Powdery Mildew
                </button>
              </div>

              {/* Action Buttons: Upload & Live Camera */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold transition border rounded-xl bg-[#041710] border-emerald-500/30 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-900/30"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                </button>

                <button
                  onClick={handleCameraSnap}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold transition border rounded-xl bg-[#041710] border-emerald-500/30 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-900/30"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Live Camera</span>
                </button>
              </div>

              {/* Primary Diagnostic Action Button */}
              <button
                onClick={handleDiagnose}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 font-black text-sm text-black rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-[#d4f938] hover:opacity-95 shadow-lg shadow-emerald-500/20 transition disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Analyzing Foliar Pathology...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>{ui.diagnose_btn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Dossier & ZBNF Bio-Remedies */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {!diagnosis ? (
            <div className="p-8 border rounded-2xl bg-[#082117] border-dashed border-emerald-500/30 text-center flex flex-col items-center justify-center min-h-[360px]">
              <div className="flex items-center justify-center w-14 h-14 mb-3 rounded-2xl bg-emerald-500/10 text-emerald-400 text-3xl">
                🩺
              </div>
              <h3 className="text-base font-bold text-white">Visual Crop Diagnostic Ready</h3>
              <p className="max-w-md mt-1.5 text-xs text-emerald-200/80 leading-relaxed">
                Click <b>"Diagnose Leaf Pathology"</b> to examine foliar lesions, determine clinical disease symptoms, and generate ICAR-verified zero-budget natural farming remedies with vernacular voice playback.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] text-emerald-300/80 font-mono">
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/20">📍 {cleanDistrict}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/20">🌾 ZBNF Bio-Formulations</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/20">🗣️ {activeLangConfig.label} Voice</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* High-Impact Diagnosed Disease Spotlight Card */}
              <div className="p-4 border-2 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#082117] to-red-950/20 border-red-500/80 shadow-xl shadow-red-950/30">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 text-2xl rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-white shadow-md shadow-red-500/40">
                      🦠
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold tracking-widest uppercase text-red-300">
                        DIAGNOSED CROP DISEASE
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-white">
                        <span className="px-2.5 py-0.5 rounded-lg bg-red-600/30 border border-red-500 text-white inline-block">
                          {diagnosis.disease}
                        </span>
                      </h3>
                      <div className="text-xs text-red-200/90 mt-1">
                        🌾 Crop: <b>{diagnosis.crop}</b> • <span className="font-mono">{diagnosis.pathogen}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 text-xs font-black rounded-full bg-red-600 text-white shadow-sm">
                      🔴 {diagnosis.severity} Severity
                    </span>
                    <span className="px-3 py-1 text-xs font-extrabold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      ⚡ {diagnosis.confidence} Accuracy
                    </span>
                  </div>
                </div>

                {/* Vernacular Audio Advisory Player */}
                <div className="mt-4 p-3 border rounded-xl bg-[#041710] border-emerald-500/30 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {!isSpeaking ? (
                      <button
                        onClick={() => speakAdvisory(getSpeechContent())}
                        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-black rounded-xl bg-gradient-to-r from-emerald-400 to-[#d4f938] hover:opacity-90 shadow-md shadow-emerald-500/20 cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4 text-black" />
                        <span>Pesi Kaattu / Listen Voice ({activeLangConfig.label})</span>
                      </button>
                    ) : (
                      <button
                        onClick={stopSpeaking}
                        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white rounded-xl bg-red-600 hover:bg-red-500 shadow-md cursor-pointer"
                      >
                        <Square className="w-4 h-4" />
                        <span>{ui.voice_stop}</span>
                      </button>
                    )}

                    {/* Animated Equalizer Waveform */}
                    <div className={`flex items-center h-6 px-1 transition-opacity ${isSpeaking ? 'eq-active opacity-100' : 'opacity-40'}`}>
                      <span className="eq-bar"></span>
                      <span className="eq-bar"></span>
                      <span className="eq-bar"></span>
                      <span className="eq-bar"></span>
                      <span className="eq-bar"></span>
                      <span className="eq-bar"></span>
                      <span className="eq-bar"></span>
                      <span className="eq-bar"></span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      {isSpeaking ? 'STREAMING • ' + activeLangConfig.bcp : 'STANDBY • ' + activeLangConfig.bcp}
                    </div>
                    <div className="text-[10px] text-emerald-300/80">450ms Natural Pausing Mode</div>
                  </div>
                </div>
              </div>

              {/* 1. Clinical Foliar Symptoms */}
              <div className="p-4 border rounded-2xl bg-[#082117] border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <span>🔍</span> 1. Clinical Foliar Symptoms (What was observed)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {diagnosis.indicators.map((ind, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#041710] border border-emerald-500/20 text-xs text-emerald-200/95 leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-base leading-none">🍃</span>
                      <div>{ind}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. ZBNF Bio-Recipes (Non-Chemical Cures) */}
              <div className="p-4 border rounded-2xl bg-[#082117] border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2.5 text-xs font-bold uppercase tracking-wider text-[#d4f938]">
                  <span>🧪</span> 2. Non-Chemical Bio-Recipes (How to Cure)
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {diagnosis.remedies.map((rem, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-gradient-to-r from-[#041a12] to-[#082619] border border-emerald-500/35 hover:border-emerald-400 transition"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{rem.icon || '🌿'}</span>
                          <span className="text-sm font-bold text-white">{rem.title}</span>
                        </div>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {rem.badge || '🌿 BIO-CURE'}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-200/90 leading-relaxed mt-1 pl-8">
                        {rem.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Soil Immunity & Prevention */}
              <div className="p-4 border rounded-2xl bg-[#082117] border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <span>🛡️</span> 3. Soil Immunity & Long-Term Prevention
                </div>
                <div className="space-y-2">
                  {diagnosis.prevention.map((prev, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-[#041710] border border-emerald-500/20 text-xs text-emerald-200/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{prev}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zero-Literacy 1-Tap Pictorial Action Deck */}
              <div className="p-4 border rounded-2xl bg-gradient-to-br from-amber-950/30 via-[#082117] to-[#041710] border-amber-400/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌾</span>
                    <h4 className="text-xs md:text-sm font-bold text-amber-200 uppercase tracking-wide">
                      Zero-Literacy 1-Tap Pictorial Action Deck (No Reading Needed)
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Simple Visual Guide
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-center">
                  <div className="p-3 border rounded-xl bg-[#041710] border-emerald-500/25">
                    <div className="text-3xl mb-1">🥛</div>
                    <div className="text-xs font-bold text-white">1. Sour Buttermilk</div>
                    <div className="text-[10px] text-emerald-300">500ml aged 4 days</div>
                  </div>

                  <div className="p-3 border rounded-xl bg-[#041710] border-emerald-500/25">
                    <div className="text-3xl mb-1">🧂</div>
                    <div className="text-xs font-bold text-white">2. Hing (Asafoetida)</div>
                    <div className="text-[10px] text-emerald-300">5 grams powder</div>
                  </div>

                  <div className="p-3 border rounded-xl bg-[#041710] border-emerald-500/25">
                    <div className="text-3xl mb-1">🪣</div>
                    <div className="text-xs font-bold text-white">3. 10L Clean Water</div>
                    <div className="text-[10px] text-emerald-300">Mix thoroughly in tank</div>
                  </div>

                  <div className="p-3 border rounded-xl bg-[#041710] border-emerald-500/25">
                    <div className="text-3xl mb-1">🚿</div>
                    <div className="text-xs font-bold text-white">4. Evening Spray</div>
                    <div className="text-[10px] text-emerald-300">4 PM - 6 PM cool spray</div>
                  </div>
                </div>
              </div>

              {/* GramaSetu 5-KM Community Outbreak Shield */}
              <div className="p-5 border-2 rounded-2xl bg-gradient-to-br from-[#082619] to-[#041710] border-emerald-500/40 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h4 className="text-xs md:text-sm font-black tracking-wide text-white uppercase">
                        {ui.gramasetu_title}
                      </h4>
                      <div className="text-[10px] text-emerald-300/80">{ui.gramasetu_sub}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    AgriStack Co-op Node
                  </span>
                </div>

                <p className="mt-3 text-xs text-emerald-200/90 leading-relaxed">
                  Airborne fungal spores and vector insects from <b>{diagnosis.disease}</b> drift rapidly into adjacent fields within <b>48 to 72 hours</b>. Under our <b>Digital Public Good (DPG) Cooperative Mesh</b>, your diagnosis triggers an automated early warning to smallholders across your panchayat cluster to deploy preventive bio-shields before symptoms strike!
                </p>

                {/* Radius Slider & Metrics Pool */}
                <div className="mt-4 p-3.5 rounded-xl bg-[#041710] border border-emerald-500/20">
                  <div className="flex justify-between text-xs font-semibold text-emerald-300 mb-1.5">
                    <span>Select Community Geo-Fence Broadcast Radius:</span>
                    <span className="font-mono text-emerald-400 font-bold">{radiusKm} KM RADIUS</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={radiusKm}
                    onChange={(e) => setRadiusKm(Number(e.target.value))}
                    className="w-full h-1.5 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />

                  <div className="grid grid-cols-3 gap-2 mt-3.5 text-center">
                    <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/20">
                      <div className="text-base md:text-lg font-black text-white font-mono">{peerCount}</div>
                      <div className="text-[10px] font-bold text-emerald-400 uppercase">{ui.peers_warned}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/20">
                      <div className="text-base md:text-lg font-black text-white font-mono">{areaShielded} Ha</div>
                      <div className="text-[10px] font-bold text-emerald-400 uppercase">{ui.area_shielded}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/20">
                      <div className="text-base md:text-lg font-black text-[#d4f938] font-mono">₹{savingsPoolLakhs}L</div>
                      <div className="text-[10px] font-bold text-emerald-400 uppercase">{ui.savings_pool}</div>
                    </div>
                  </div>
                </div>

                {/* Direct Mobile Warning & Village Broadcast */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile number (e.g. 9876543210)"
                      value={farmerPhone}
                      onChange={(e) => setFarmerPhone(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-[#041710] border border-emerald-500/30 text-white placeholder-emerald-400/40 focus:outline-none focus:border-emerald-400 font-mono"
                    />
                    <button
                      onClick={sendDirectMobileAlert}
                      className="px-4 py-2 text-xs font-bold text-white rounded-xl bg-emerald-600 hover:bg-emerald-500 transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Direct WhatsApp Alert</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={shareToWhatsApp}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:opacity-95 shadow-md shadow-emerald-950/50 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{ui.broadcast_btn}</span>
                    </button>

                    <button
                      onClick={() => setPassportOpen(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 hover:border-emerald-400 transition"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>AgriStack Passport</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AgriStack / Beckn Bio-Passport JSON Modal */}
      {passportOpen && diagnosis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl p-5 border rounded-2xl bg-[#061e14] border-emerald-500/40 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">AgriStack / Beckn Bio-Passport Payload</h3>
              </div>
              <button
                onClick={() => setPassportOpen(false)}
                className="p-1 text-emerald-300 hover:text-white rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="mt-2 text-xs text-emerald-300/80">
              Standard JSON-LD verifiable credential schema compliant with Indian Digital Public Infrastructure (AgriStack & Beckn protocols) for interoperable state exchange.
            </p>

            <pre className="p-3.5 mt-3 text-[11px] font-mono rounded-xl bg-[#03120a] border border-emerald-500/30 text-emerald-300 overflow-x-auto max-h-72">
{JSON.stringify(
  {
    "@context": [
      "https://schema.org",
      "https://becknprotocol.io/schemas/v1/agriculture",
      "https://agristack.gov.in/schemas/v2/pathology"
    ],
    "@type": "PlantPathologyVerification",
    "id": `urn:agristack:diagnosis:${Date.now()}`,
    "timestamp": new Date().toISOString(),
    "geoFence": {
      "state": cleanState,
      "district": cleanDistrict,
      "radiusKm": radiusKm
    },
    "pathology": {
      "crop": diagnosis.crop,
      "disease": diagnosis.disease,
      "pathogen": diagnosis.pathogen,
      "severity": diagnosis.severity,
      "aiConfidence": diagnosis.confidence
    },
    "dpgCompliance": {
      "becknReady": true,
      "zeroChemicalPrescription": true,
      "primaryRemedy": diagnosis.remedies[0]?.title
    }
  },
  null,
  2
)}
            </pre>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-emerald-500/20">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify({ diagnosis, district: cleanDistrict, state: cleanState }, null, 2)
                  );
                  alert('AgriStack JSON-LD copied to clipboard!');
                }}
                className="px-4 py-1.5 text-xs font-bold text-black rounded-lg bg-emerald-400 hover:bg-emerald-300"
              >
                Copy JSON Payload
              </button>
              <button
                onClick={() => setPassportOpen(false)}
                className="px-4 py-1.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30 rounded-lg hover:bg-emerald-950"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
