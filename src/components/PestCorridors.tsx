import React, { useState } from 'react';

interface PestCorridorsProps {
  currentLang: string;
}

export const PestCorridors: React.FC<PestCorridorsProps> = () => {
  const [selectedCorridor, setSelectedCorridor] = useState("kerala_tn");

  const corridorsData: Record<string, any> = {
    kerala_tn: {
      pest: "Nilaparvata lugens (Brown Plant Hopper / புகையான்)",
      origin: "Palakkad Wetlands, Kerala",
      target: "Thanjavur & Delta Farmlands, Tamil Nadu",
      distance: 135,
      windSpeed: 14.5,
      etaDays: 9.3,
      etaHours: 223,
      threatTier: "🚨 CRITICAL TIER-1",
      savedValue: "₹42,500 Protected",
      shieldAction: "Drain standing water for 48 hrs (AWD) to disrupt hopper nymph development; foliar spray sour buttermilk (5L) + hing (100g) barrier."
    },
    ap_tn: {
      pest: "Spodoptera frugiperda (Fall Armyworm / படைப்புழு)",
      origin: "Chittoor & Anantapur, Andhra Pradesh",
      target: "Vellore & North Arcot, Tamil Nadu",
      distance: 110,
      windSpeed: 16.0,
      etaDays: 6.8,
      etaHours: 163,
      threatTier: "⚠️ ELEVATED TIER-2",
      savedValue: "₹36,500 Protected",
      shieldAction: "Install 12 pheromone lures/acre along river basin; release Trichogramma chilonis egg parasitoids."
    }
  };

  const active = corridorsData[selectedCorridor] || corridorsData.kerala_tn;

  return (
    <div className="bento-card p-6 mb-8" id="pest-corridors">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
            Feature 03: Pan-India Biosecurity Radar
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">🐛 Regional Pest Attack Alerts & Corridor Radar</h2>
          <p className="text-xs text-emerald-300/80">Cross-border pest spore cloud tracking, live aerodynamic drift speed, and early intervention ETA.</p>
        </div>
        <span className="text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30 px-3 py-1.5 rounded-xl">
          📡 Live Telemetry Radar
        </span>
      </div>

      {/* Corridor buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCorridor("kerala_tn")}
          className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
            selectedCorridor === "kerala_tn"
              ? "bg-emerald-500/20 text-emerald-200 border-emerald-400"
              : "bg-black/30 text-emerald-400/70 border-emerald-500/20 hover:border-emerald-500/40"
          }`}
        >
          🌾 Kerala ➔ TN (Brown Plant Hopper)
        </button>
        <button
          onClick={() => setSelectedCorridor("ap_tn")}
          className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
            selectedCorridor === "ap_tn"
              ? "bg-emerald-500/20 text-emerald-200 border-emerald-400"
              : "bg-black/30 text-emerald-400/70 border-emerald-500/20 hover:border-emerald-500/40"
          }`}
        >
          🌽 AP ➔ TN (Fall Armyworm)
        </button>
      </div>

      {/* Corridor Threat Card */}
      <div className="bg-[#03150d] border border-emerald-500/30 rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/20 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold bg-red-500/20 text-red-300 border border-red-500/40 px-3 py-1 rounded-full">
              {active.threatTier}
            </span>
            <span className="text-base font-extrabold text-white">🐛 {active.pest}</span>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold text-red-300">
            ⏳ ETA TO BORDER: {active.etaDays} DAYS ({active.etaHours} HRS)
          </div>
        </div>

        <div className="bg-black/40 border border-emerald-500/20 rounded-xl p-3 flex flex-wrap items-center justify-between text-xs gap-3 mb-4">
          <div><span className="text-red-400 font-bold">🔴 Origin:</span> {active.origin}</div>
          <div className="text-emerald-400 font-bold">━━━━ 💨 {active.windSpeed} km/h Live Vector ({active.distance} km) ━━━━►</div>
          <div><span className="text-emerald-300 font-bold">🟢 Target:</span> {active.target}</div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-xl p-4 flex items-start gap-3">
          <span className="text-2xl">🛡️</span>
          <div>
            <div className="text-xs font-bold uppercase text-emerald-300 tracking-wider">Early Action Mandate</div>
            <div className="text-sm font-medium text-emerald-100 mt-1 leading-relaxed">
              {active.shieldAction}
            </div>
            <div className="text-xs font-bold text-amber-300 mt-2">💰 {active.savedValue}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
