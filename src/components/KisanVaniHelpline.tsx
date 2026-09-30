import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { MessageSquareHeart, Send, Volume2, Square, X, Sparkles, RefreshCw } from 'lucide-react';

interface KisanVaniHelplineProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  state: string;
  district: string;
}

export const KisanVaniHelpline: React.FC<KisanVaniHelplineProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  state,
  district
}) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  if (!isOpen) return null;

  const cleanDistrict = district.split('(')[0].trim();
  const cleanState = state.split('(')[0].trim();

  const langKeyMap: Record<LanguageCode, { code: string; bcp: string }> = {
    'English': { code: 'en', bcp: 'en-IN' },
    'Tamil (தமிழ்)': { code: 'ta', bcp: 'ta-IN' },
    'Hindi (हिन्दी)': { code: 'hi', bcp: 'hi-IN' },
    'Telugu (తెలుగు)': { code: 'te', bcp: 'te-IN' },
    'Kannada (ಕನ್ನಡ)': { code: 'kn', bcp: 'kn-IN' },
    'Malayalam (മലയാളം)': { code: 'ml', bcp: 'ml-IN' }
  };
  const activeLangConfig = langKeyMap[currentLanguage] || langKeyMap.English;

  const popularPills: Record<LanguageCode, string[]> = {
    'English': [
      "🌾 How to cure leaf yellowing naturally without urea?",
      "🐛 Best organic repellent for sucking pests & aphids?",
      "🧪 Correct dosage of Jeevamrutha per acre?",
      "🌧️ How to prevent fungal blast during monsoon rains?"
    ],
    'Tamil (தமிழ்)': [
      "🌾 யூரியா இல்லாமல் இலை மஞ்சளை இயற்கையாக சரிசெய்வது எப்படி?",
      "🐛 சாறு உறிஞ்சும் அசுவினி பூச்சிகளுக்கு சிறந்த இயற்கை விரட்டி எது?",
      "🧪 ஏக்கருக்கு ஜீவாமிர்தம் பயன்படுத்த வேண்டிய சரியான அளவு என்ன?",
      "🌧️ மழைக்காலத்தில் பூஞ்சான குலைநோய் வராமல் தடுப்பது எப்படி?"
    ],
    'Hindi (हिन्दी)': [
      "🌾 बिना यूरिया के पत्तियों का पीलापन प्राकृतिक रूप से कैसे ठीक करें?",
      "🐛 रस चूसक कीटों और माहू के लिए सबसे अच्छा जैविक कीटनाशक?",
      "🧪 प्रति एकड़ जीवामृत का सही उपयोग और मात्रा क्या है?",
      "🌧️ बारिश के मौसम में फफूंद और झुलसा रोग से कैसे बचें?"
    ],
    'Telugu (తెలుగు)': [
      "🌾 యూరియా లేకుండా ఆకుల పసుపు రంగును సహజంగా ఎలా నయం చేయాలి?",
      "🐛 రసం పీల్చే పురుగులకు ఉత్తమ సేంద్రీయ నివారిణి ఏది?",
      "🧪 ఎకరాకు జీవామృతం సరైన మోతాదు ఎంత?",
      "🌧️ వర్షాకాలంలో శిలీంధ్ర తెగుళ్లను ఎలా నివారించాలి?"
    ],
    'Kannada (ಕನ್ನಡ)': [
      "🌾 ಯೂರಿಯಾ ಇಲ್ಲದೆ ಎಲೆ ಹಳದಿಯಾಗುವುದನ್ನು ನೈಸರ್ಗಿಕವಾಗಿ ಸರಿಪಡಿಸುವುದು ಹೇಗೆ?",
      "🐛 ರಸ ಹೀರುವ ಕೀಟಗಳಿಗೆ ಉತ್ತಮ ಸಾವಯವ ನಿವಾರಕ ಯಾವುದು?",
      "🧪 ಪ್ರತಿ ಎಕರೆಗೆ ಜೀವಾಮೃತದ ಸರಿಯಾದ ಪ್ರಮಾಣ ಎಷ್ಟು?",
      "🌧️ ಮಳೆಗಾಲದಲ್ಲಿ ಶಿಲೀಂಧ್ರ ರೋಗ ಬರದಂತೆ ತಡೆಯುವುದು ಹೇಗೆ?"
    ],
    'Malayalam (മലയാളം)': [
      "🌾 യൂറിയ ഇല്ലാതെ ഇല മഞ്ഞളിപ്പ് പ്രകൃതിദത്തമായി എങ്ങനെ മാറ്റാം?",
      "🐛 നീരൂറ്റിക്കുടിക്കുന്ന കീടങ്ങൾക്ക് ഏറ്റവും മികച്ച ജൈവ കീടനാശിനി ഏത്?",
      "🧪 ഏക്കറിന് ജീവാമൃതത്തിന്റെ ശരിയായ അളവ് എത്ര?",
      "🌧️ മഴക്കാലത്ത് കുമിൾ രോഗങ്ങൾ വരാതിരിക്കാൻ എന്ത് ചെയ്യണം?"
    ]
  };

  const currentPills = popularPills[currentLanguage] || popularPills.English;

  const handleAsk = async (textToAsk: string) => {
    if (!textToAsk.trim()) return;
    setIsLoading(true);
    stopSpeaking();

    try {
      const res = await fetch('/api/ask-helpline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToAsk,
          language: currentLanguage,
          state: cleanState,
          district: cleanDistrict
        })
      });
      const json = await res.json();
      if (json.success && json.answer) {
        setResponse(json.answer);
      }
    } catch (err) {
      console.error('Helpline error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    setIsSpeaking(true);
    const clean = text.replace(/[*#_]/g, '');
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = activeLangConfig.bcp;
    utterance.rate = 0.85;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl border rounded-2xl bg-[#061e14] border-emerald-500/40 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-emerald-500/20 bg-emerald-950/40">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-400/20 text-amber-300 text-lg">🎙️</span>
            <div>
              <h2 className="text-base md:text-lg font-bold text-white">
                Kisan-Vani: 24/7 Vernacular Farmer AI Helpline
              </h2>
              <p className="text-xs text-emerald-300/80">
                Live extension scientist calibrated for {cleanDistrict}, {cleanState}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="p-1.5 text-emerald-300 rounded-lg hover:text-white hover:bg-emerald-900/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat / Content Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div>
            <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wide mb-2">
              Popular Questions (Click for instant answer):
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentPills.map((pill, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(pill);
                    handleAsk(pill);
                  }}
                  className="p-2.5 text-left border rounded-xl bg-[#041710] border-emerald-500/30 hover:border-emerald-400 text-xs text-emerald-200 transition cursor-pointer"
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>

          {/* Response Block */}
          {isLoading ? (
            <div className="p-6 text-center border rounded-xl bg-[#041710] border-emerald-500/20 flex flex-col items-center justify-center">
              <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin mb-2" />
              <div className="text-xs text-emerald-300">Consulting ICAR & ZBNF agronomist database...</div>
            </div>
          ) : response ? (
            <div className="p-4 border-2 rounded-xl bg-gradient-to-br from-[#082619] to-[#041710] border-emerald-500/40 shadow-md">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-500/20">
                <span className="text-xs font-bold text-[#d4f938] uppercase">
                  🌿 Kisan-Vani Agro-Advisory:
                </span>
                <div className="flex items-center gap-2">
                  {!isSpeaking ? (
                    <button
                      onClick={() => speakText(response)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen Spoken Audio</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopSpeaking}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-red-600 text-white"
                    >
                      <Square className="w-3.5 h-3.5" />
                      <span>Stop Audio</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="text-xs text-emerald-100 whitespace-pre-line leading-relaxed">
                {response}
              </div>
            </div>
          ) : null}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-emerald-500/20 bg-emerald-950/40 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your crop doubt / symptom (press Enter)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAsk(query);
            }}
            className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-[#041710] border border-emerald-500/30 text-white placeholder-emerald-400/40 focus:outline-none focus:border-emerald-400"
          />
          <button
            onClick={() => handleAsk(query)}
            disabled={isLoading || !query.trim()}
            className="px-4 py-2.5 font-bold text-xs text-black rounded-xl bg-gradient-to-r from-emerald-400 to-[#d4f938] hover:opacity-95 disabled:opacity-50 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask</span>
          </button>
        </div>
      </div>
    </div>
  );
};
