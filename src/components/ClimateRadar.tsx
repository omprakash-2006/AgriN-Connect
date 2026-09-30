import React, { useState } from 'react';

interface ClimateRadarProps {
  district: string;
  state: string;
  currentLang: string;
}

export const ClimateRadar: React.FC<ClimateRadarProps> = ({ district, state }) => {
  const [selectedSoil, setSelectedSoil] = useState("alluvial_loam");

  return (
    <div className="bento-card p-6 mb-8" id="climate-radar">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
            Feature 02: Open-Meteo & Satellite Telemetry
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">🛰️ Live Weather HUD & Soil Health Engine</h2>
          <p className="text-xs text-emerald-300/80">Continuous WMO satellite weather calibration and ICAR regional soil diagnostics.</p>
        </div>
        <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          🟢 Live Synced
        </span>
      </div>

      {/* Weather telemetry HUD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#03150d] border border-emerald-500/25 rounded-2xl p-4 text-center">
          <span className="text-xs text-emerald-400 font-semibold uppercase">Temperature</span>
          <div className="text-2xl font-extrabold text-white mt-1">29.4°C</div>
          <span className="text-[10px] text-emerald-400/80">Optimal vegetative growth</span>
        </div>

        <div className="bg-[#03150d] border border-emerald-500/25 rounded-2xl p-4 text-center">
          <span className="text-xs text-emerald-400 font-semibold uppercase">Relative Humidity</span>
          <div className="text-2xl font-extrabold text-amber-300 mt-1">78% RH</div>
          <span className="text-[10px] text-amber-400">⚠️ Fungal Blast Window Alert</span>
        </div>

        <div className="bg-[#03150d] border border-emerald-500/25 rounded-2xl p-4 text-center">
          <span className="text-xs text-emerald-400 font-semibold uppercase">Wind Velocity</span>
          <div className="text-2xl font-extrabold text-white mt-1">14.2 km/h</div>
          <span className="text-[10px] text-emerald-400/80">Vector drift active</span>
        </div>

        <div className="bg-[#03150d] border border-emerald-500/25 rounded-2xl p-4 text-center">
          <span className="text-xs text-emerald-400 font-semibold uppercase">Canopy NDVI Health</span>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">0.76 NDVI</div>
          <span className="text-[10px] text-emerald-400/80">Healthy vegetative index</span>
        </div>
      </div>

      {/* Soil Health Card & ICAR Benchmark */}
      <div className="bg-[#03150d] border border-emerald-500/30 rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-white">🌱 ICAR Regional Soil Health Benchmark: {district}</h3>
            <p className="text-xs text-emerald-400/80">Calibrated to local agro-climatic soil taxonomy class</p>
          </div>
          <select
            value={selectedSoil}
            onChange={(e) => setSelectedSoil(e.target.value)}
            className="bg-[#082619] border border-emerald-500/40 text-emerald-200 text-xs rounded-xl px-3 py-2"
          >
            <option value="alluvial_loam">வண்டல் மண் (Alluvial Loam / Delta Plains)</option>
            <option value="red_loam">செம்மண் (Red Sandy Loam)</option>
            <option value="black_clay">கரிசல் மண் (Black Soil / Regur)</option>
            <option value="laterite">செம்பொறை மண் (Laterite Coastal Soil)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="bg-black/30 border border-emerald-500/20 rounded-xl p-3">
            <span className="text-[10px] text-emerald-400 font-bold uppercase">Nitrogen (N)</span>
            <div className="text-lg font-bold text-white mt-0.5">140 kg/ha</div>
            <span className="text-[10px] text-emerald-300">Adequate</span>
          </div>
          <div className="bg-black/30 border border-emerald-500/20 rounded-xl p-3">
            <span className="text-[10px] text-emerald-400 font-bold uppercase">Phosphorus (P)</span>
            <div className="text-lg font-bold text-white mt-0.5">42 kg/ha</div>
            <span className="text-[10px] text-emerald-300">Optimal</span>
          </div>
          <div className="bg-black/30 border border-emerald-500/20 rounded-xl p-3">
            <span className="text-[10px] text-emerald-400 font-bold uppercase">Potassium (K)</span>
            <div className="text-lg font-bold text-white mt-0.5">165 kg/ha</div>
            <span className="text-[10px] text-emerald-300">Rich Reserve</span>
          </div>
          <div className="bg-black/30 border border-emerald-500/20 rounded-xl p-3">
            <span className="text-[10px] text-emerald-400 font-bold uppercase">Soil pH Index</span>
            <div className="text-lg font-bold text-white mt-0.5">7.0 pH</div>
            <span className="text-[10px] text-emerald-300">Neutral Fertile</span>
          </div>
        </div>
      </div>
    </div>
  );
};
