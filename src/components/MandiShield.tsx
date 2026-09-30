import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { MANDI_CROPS, UI_TRANSLATIONS } from '../data/agriData';
import { safeShareToWhatsApp } from '../utils/share';
import { 
  BadgePercent, ShieldCheck, Sun, Coins, Building, 
  Share2, AlertCircle, ArrowUpRight, Scale
} from 'lucide-react';

interface MandiShieldProps {
  currentLanguage: LanguageCode;
  state: string;
  district: string;
}

export const MandiShield: React.FC<MandiShieldProps> = ({ currentLanguage, state, district }) => {
  const ui = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.English;
  const [selectedCropIndex, setSelectedCropIndex] = useState<number>(0);
  const [quantityQuintals, setQuantityQuintals] = useState<number>(50);
  const [middlemanOffer, setMiddlemanOffer] = useState<number>(1850);
  const [moisturePct, setMoisturePct] = useState<number>(18.5);

  const cleanDistrict = district.split('(')[0].trim();
  const crop = MANDI_CROPS[selectedCropIndex] || MANDI_CROPS[0];

  // Price calculations
  const govtTotalPayment = crop.msp * quantityQuintals;
  const middlemanTotalPayment = middlemanOffer * quantityQuintals;
  const extraMoneySaved = Math.max(0, govtTotalPayment - middlemanTotalPayment);
  const profitPercentage = middlemanTotalPayment > 0 
    ? Math.round((extraMoneySaved / middlemanTotalPayment) * 100) 
    : 0;

  // Moisture calculations
  const moistureDiff = Math.max(0, Number((moisturePct - crop.moistureLimit).toFixed(1)));
  const isMoistureExceeded = moistureDiff > 0;
  const dryingHoursNeeded = Math.ceil(moistureDiff * 2.5);

  const shareMandiWarning = () => {
    const text = `📢 *Kisan-Fair-Price Alert (Don't Sell Below Govt MSP!)*\n🌾 *Crop:* ${crop.name}\n🏛️ *Govt DPC / MSP Rate:* ₹${crop.msp}/Quintal (100% Guaranteed)\n🤝 *Middleman Exploitative Offer:* ₹${middlemanOffer}/Quintal (₹${crop.msp - middlemanOffer} below Govt rate!)\n💰 *Farmer Profit Saved:* ₹${extraMoneySaved.toLocaleString()} for ${quantityQuintals} Quintals!\n💧 *Moisture Guide:* Govt accepts up to ${crop.moistureLimit}% moisture without any price cut. If moisture is high, sun-dry for ${dryingHoursNeeded || 4} hours to get full payment!\n\n📍 Verified Direct Purchase Centers in ${cleanDistrict}: ${crop.dpcCenters.join(', ')}\n\nShared via AgriN-Connect (Team Nexyra).`;
    safeShareToWhatsApp(text);
  };

  return (
    <section id="stack-mandi-shield" className="scroll-mt-6 mb-12">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 mb-4 border rounded-2xl bg-gradient-to-r from-purple-950/70 to-[#041710] border-purple-500/30 border-l-4 border-l-purple-500 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 text-xl rounded-xl bg-purple-500/20 text-purple-300">
            💰
          </div>
          <div>
            <div className="text-[10px] font-extrabold tracking-wider uppercase text-purple-400">
              {ui.nav_f4_badge}
            </div>
            <h2 className="text-lg md:text-xl font-black text-white">{ui.nav_f4_title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-bold border rounded-full bg-purple-500/10 border-purple-500/30 text-purple-300">
            🛡️ Anti-Middleman Price Protection
          </span>
        </div>
      </div>

      {/* Why This Protects Farmers Banner */}
      <div className="p-4 border rounded-2xl bg-[#082117] border-emerald-500/30 mb-4 shadow-sm">
        <div className="text-xs font-extrabold text-[#d4f938] uppercase tracking-wide mb-2 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Why This Protects Farmers (Anti-Middleman Price Shield):</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-emerald-200/90 leading-relaxed">
          <div className="p-3 rounded-xl bg-[#041710] border border-emerald-500/20">
            <b className="text-white block mb-0.5">Stop Middleman Exploitation:</b>
            Village traders exploit smallholders unaware of market rates by quoting ₹400 to ₹500/quintal below MSP. This tool provides full transparency to official Government DPC & MSP rates.
          </div>
          <div className="p-3 rounded-xl bg-[#041710] border border-emerald-500/20">
            <b className="text-[#d4f938] block mb-0.5">Moisture Penalty Protection:</b>
            Up to 17% moisture is accepted by Government DPCs with ZERO deduction. If moisture is above 17%, simply sun-dry for 4 hours to receive 100% full payment instead of losing money to middleman deductions!
          </div>
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Input Controls */}
        <div className="lg:col-span-6 p-5 border rounded-2xl bg-[#082117] border-emerald-500/30 shadow-lg space-y-4">
          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase text-emerald-300">
              🌾 Select Harvest Crop:
            </label>
            <select
              value={selectedCropIndex}
              onChange={(e) => {
                const idx = Number(e.target.value);
                setSelectedCropIndex(idx);
                // Adjust default middleman offer to be ~₹400 below MSP
                setMiddlemanOffer(MANDI_CROPS[idx].msp - 420);
                setMoisturePct(MANDI_CROPS[idx].moistureLimit + 1.5);
              }}
              className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-[#041710] border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-400"
            >
              {MANDI_CROPS.map((c, i) => (
                <option key={i} value={i}>
                  {c.name} — Govt MSP: ₹{c.msp}/q
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-xs font-bold uppercase text-emerald-300">
                ⚖️ Quantity (Quintals):
              </label>
              <input
                type="number"
                min="1"
                max="5000"
                value={quantityQuintals}
                onChange={(e) => setQuantityQuintals(Math.max(1, Number(e.target.value)))}
                className="w-full px-3.5 py-2 text-xs font-mono font-bold rounded-xl bg-[#041710] border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-bold uppercase text-amber-300">
                🤝 Middleman Offer (₹/q):
              </label>
              <input
                type="number"
                min="500"
                max="15000"
                value={middlemanOffer}
                onChange={(e) => setMiddlemanOffer(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs font-mono font-bold rounded-xl bg-[#041710] border border-amber-500/40 text-amber-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Moisture Slider */}
          <div className="p-3.5 rounded-xl bg-[#041710] border border-emerald-500/25">
            <div className="flex justify-between text-xs font-semibold text-emerald-300 mb-1.5">
              <span>💧 Grain Moisture % (Govt Limit: {crop.moistureLimit}%):</span>
              <span className="font-mono text-emerald-400 font-bold">{moisturePct}%</span>
            </div>
            <input
              type="range"
              min="8"
              max="26"
              step="0.5"
              value={moisturePct}
              onChange={(e) => setMoisturePct(Number(e.target.value))}
              className="w-full h-1.5 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />

            <div className="mt-2.5">
              {!isMoistureExceeded ? (
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><b>✅ FAQ Quality Verified:</b> Zero Price Cut Permitted! Govt DPC will accept at 100% full MSP.</span>
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-amber-950/50 border border-amber-500/40 text-[11px] text-amber-200 flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <b>⚠️ Moisture {moisturePct}% (+{moistureDiff}% above limit):</b> Sun-dry for <b>{dryingHoursNeeded} hours</b>. Do NOT accept middleman penalty cut!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Price Shield Comparison HUD */}
        <div className="lg:col-span-6 flex flex-col justify-between p-5 border-2 rounded-2xl bg-gradient-to-br from-[#082619] via-[#041710] to-[#082117] border-purple-500/40 shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <span className="text-xs font-extrabold uppercase text-purple-300">
                FAIR PRICE VALUE COMPARISON
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-200">
                Official MSP Benchmarked
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="p-3 rounded-xl bg-[#041710] border border-emerald-500/30">
                <div className="text-[10px] font-bold text-emerald-400 uppercase">Govt DPC / MSP Total</div>
                <div className="text-xl md:text-2xl font-black text-white font-mono mt-0.5">
                  ₹{govtTotalPayment.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-300/80">100% Guaranteed Direct to Bank A/C</div>
              </div>

              <div className="p-3 rounded-xl bg-[#041710] border border-amber-500/30">
                <div className="text-[10px] font-bold text-amber-400 uppercase">Middleman Offer Total</div>
                <div className="text-xl md:text-2xl font-black text-amber-200 font-mono mt-0.5">
                  ₹{middlemanTotalPayment.toLocaleString()}
                </div>
                <div className="text-[10px] text-red-400">₹{(crop.msp - middlemanOffer)}/q below Govt rate</div>
              </div>
            </div>

            {/* Money Saved in Farmer's Pocket Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-[#041710] border-2 border-emerald-400 text-center">
              <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                💰 Extra Profit Saved in Farmer's Pocket:
              </div>
              <div className="text-3xl md:text-4xl font-black text-[#d4f938] font-mono my-1">
                +₹{extraMoneySaved.toLocaleString()}
              </div>
              <div className="text-xs font-bold text-emerald-200">
                (+{profitPercentage}% More Profit vs selling to village trader)
              </div>
            </div>

            {/* Verified DPC Procurement Centers */}
            <div className="mt-4 p-3 rounded-xl bg-[#041710] border border-emerald-500/20 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-1">
                <Building className="w-3.5 h-3.5" />
                <span>Verified Direct Purchase Centers (DPCs) in {cleanDistrict}:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {crop.dpcCenters.map((dpc, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[11px] rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-200"
                  >
                    📍 {dpc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={shareMandiWarning}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 font-bold text-xs md:text-sm text-white rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 shadow-md shadow-purple-950/40 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Alert Village WhatsApp Group: Don't Sell Below Govt MSP!</span>
          </button>
        </div>
      </div>
    </section>
  );
};
