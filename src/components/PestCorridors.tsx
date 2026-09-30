import React, { useState } from 'react';
import { LanguageCode, PestCorridor } from '../types';
import { PEST_CORRIDORS, UI_TRANSLATIONS } from '../data/agriData';
import { safeShareToWhatsApp } from '../utils/share';
import { 
  Radar, AlertTriangle, Wind, Compass, ShieldCheck, 
  Share2, ArrowRight, Zap, Copy, Check
} from 'lucide-react';

interface PestCorridorsProps {
  currentLanguage: LanguageCode;
  state: string;
  district: string;
}

export const PestCorridors: React.FC<PestCorridorsProps> = ({ currentLanguage, state, district }) => {
  const ui = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.English;
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>(PEST_CORRIDORS[0].id);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const selectedCorridor = PEST_CORRIDORS.find(c => c.id === selectedCorridorId) || PEST_CORRIDORS[0];

  const shareCorridorWarning = (corridor: PestCorridor) => {
    const text = `🚨 *AgriN-Connect Inter-State Pest Vector Radar Alert*\nCorridor: ${corridor.name}\nThreat Level: ${corridor.threatLevel}\nVector: ${corridor.vector}\nDrift Speed: ${corridor.speed}\nWind Vector: ${corridor.windDrift}\n\n*Immediate Farmer Action:* ${corridor.immediateAction}\n\n*Savings Avoidance:* ${corridor.costAvoidance} by deploying organic bio-shields in advance!\n\nVerified Pan-India DPG Surveillance via AgriN-Connect (Team Nexyra).`;
    safeShareToWhatsApp(text);
  };

  const copyBecknSchema = () => {
    const payload = {
      "@context": "https://becknprotocol.io/schemas/v1/agriculture",
      "action": "on_search",
      "message": {
        "intent": {
          "category": "InterStatePestBioSurveillance",
          "corridor": selectedCorridor.name,
          "threatLevel": selectedCorridor.threatLevel,
          "vectorPathogen": selectedCorridor.vector,
          "driftVelocity": selectedCorridor.speed,
          "recommendedBioShield": selectedCorridor.immediateAction
        }
      }
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="stack-agrigrid" className="scroll-mt-6 mb-10">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 mb-4 border rounded-2xl bg-gradient-to-r from-amber-950/70 to-[#041710] border-amber-500/30 border-l-4 border-l-amber-500 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 text-xl rounded-xl bg-amber-500/20 text-amber-300">
            🚨
          </div>
          <div>
            <div className="text-[10px] font-extrabold tracking-wider uppercase text-amber-400">
              {ui.nav_f3_badge}
            </div>
            <h2 className="text-lg md:text-xl font-black text-white">{ui.nav_f3_title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-bold border rounded-full bg-amber-500/10 border-amber-500/30 text-amber-300 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400 radar-ping-dot"></span>
            24/7 Pan-India Surveillance (All 28 States & UTs)
          </span>
        </div>
      </div>

      {/* Why This is Critical Banner */}
      <div className="p-4 border rounded-2xl bg-[#082117] border-emerald-500/30 mb-4 shadow-sm">
        <div className="text-xs font-extrabold text-[#d4f938] uppercase tracking-wide mb-2 flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Pan-India Bio-Surveillance Significance (Why This Protects Smallholders):</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-emerald-200/90 leading-relaxed">
          <div className="p-3 rounded-xl bg-[#041710] border border-emerald-500/20">
            <b className="text-white block mb-0.5">⏳ 3-7 Days Advance Early Warning:</b>
            Detects airborne fungal spores and migratory pest swarms moving across inter-state river basins days before border crossing.
          </div>
          <div className="p-3 rounded-xl bg-[#041710] border border-emerald-500/20">
            <b className="text-[#d4f938] block mb-0.5">💰 ₹30,000 - ₹42,500/Acre Cost Avoidance:</b>
            Protects smallholders from emergency chemical spending by deploying zero-cost organic bio-remedies (Neem, Hing-buttermilk, Pheromone traps) in advance.
          </div>
          <div className="p-3 rounded-xl bg-[#041710] border border-emerald-500/20">
            <b className="text-white block mb-0.5">🤝 Inter-State University Accord:</b>
            15+ agricultural universities (TNAU, KAU, ANGRAU, PAU) synchronize real-time biosecurity telemetry under AgriStack standards.
          </div>
        </div>
      </div>

      {/* Corridor Selector & Interactive Threat Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Corridor List */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          <div className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
            Select Active Surveillance Corridor:
          </div>
          {PEST_CORRIDORS.map((corridor) => (
            <button
              key={corridor.id}
              onClick={() => setSelectedCorridorId(corridor.id)}
              className={`p-3.5 text-left border rounded-xl transition cursor-pointer ${
                selectedCorridorId === corridor.id
                  ? 'bg-gradient-to-r from-amber-950/60 to-[#082117] border-amber-400 shadow-md'
                  : 'bg-[#082117] border-emerald-500/30 hover:border-emerald-400/60'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-bold text-white truncate">{corridor.name}</span>
                <span
                  className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                    corridor.threatLevel === 'CRITICAL'
                      ? 'bg-red-600 text-white'
                      : 'bg-amber-500 text-black'
                  }`}
                >
                  {corridor.threatLevel}
                </span>
              </div>
              <div className="text-[11px] text-amber-200/80 font-mono truncate">{corridor.vector}</div>
              <div className="text-[10px] text-emerald-400/80 mt-1">{corridor.states}</div>
            </button>
          ))}
        </div>

        {/* Right: Active Corridor Radar Dossier */}
        <div className="lg:col-span-8">
          <div className="p-5 border-2 rounded-2xl bg-[#082117] border-amber-500/40 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-500/20">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 font-mono">
                  ACTIVE CORRIDOR RADAR
                </div>
                <h3 className="text-lg md:text-xl font-black text-white">{selectedCorridor.name}</h3>
                <div className="text-xs text-emerald-300">{selectedCorridor.states}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyBecknSchema}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition border rounded-xl bg-[#041710] border-emerald-500/30 text-emerald-300 hover:border-emerald-400"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Beckn Copied!' : 'Beckn Schema'}</span>
                </button>

                <button
                  onClick={() => shareCorridorWarning(selectedCorridor)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:opacity-95 shadow-sm cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Warning</span>
                </button>
              </div>
            </div>

            {/* Radar Telemetry Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 my-4">
              <div className="p-3 rounded-xl bg-[#041710] border border-emerald-500/20">
                <div className="text-[10px] font-bold uppercase text-emerald-400">Target Crop</div>
                <div className="text-xs font-bold text-white mt-0.5">{selectedCorridor.crop}</div>
              </div>

              <div className="p-3 rounded-xl bg-[#041710] border border-emerald-500/20">
                <div className="text-[10px] font-bold uppercase text-emerald-400">Drift Speed</div>
                <div className="text-xs font-bold text-amber-300 mt-0.5 font-mono">{selectedCorridor.speed}</div>
              </div>

              <div className="p-3 rounded-xl bg-[#041710] border border-emerald-500/20">
                <div className="text-[10px] font-bold uppercase text-emerald-400">Wind Vector</div>
                <div className="text-xs font-bold text-sky-300 mt-0.5 font-mono">{selectedCorridor.windDrift}</div>
              </div>

              <div className="p-3 rounded-xl bg-[#041710] border border-emerald-500/20">
                <div className="text-[10px] font-bold uppercase text-emerald-400">Savings / Acre</div>
                <div className="text-xs font-bold text-[#d4f938] mt-0.5 font-mono">{selectedCorridor.costAvoidance}</div>
              </div>
            </div>

            {/* Affected Border Districts */}
            <div className="p-3.5 rounded-xl bg-[#041710] border border-emerald-500/20 mb-3.5">
              <div className="text-[11px] font-bold text-amber-300 uppercase mb-1.5">
                📍 Inter-State Border Districts on High Alert:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCorridor.affectedDistricts.map((d, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs rounded-lg bg-red-950/50 border border-red-500/40 text-red-200 font-mono"
                  >
                    ⚠️ {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Immediate Action Mandate */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-[#041710] border border-emerald-500/35">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#d4f938] mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Immediate Farmer Action Mandate (Zero Synthetic Pesticides):</span>
              </div>
              <p className="text-xs text-emerald-200/95 leading-relaxed pl-6">
                {selectedCorridor.immediateAction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
