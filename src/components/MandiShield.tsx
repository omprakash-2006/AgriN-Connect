import React, { useState } from 'react';
import { MSP_DATA, DPC_HELPLINES } from '../data/agriData';

interface MandiShieldProps {
  district: string;
}

export const MandiShield: React.FC<MandiShieldProps> = ({ district }) => {
  const [selectedCrop, setSelectedCrop] = useState(MSP_DATA[0].crop);
  const [quantityQtl, setQuantityQtl] = useState(45);
  const [moisturePercent, setMoisturePercent] = useState(17);

  const activeCropObj = MSP_DATA.find((c) => c.crop === selectedCrop) || MSP_DATA[0];
  const totalGovtMSP = quantityQtl * activeCropObj.msp;
  const privateTraderCut = Math.round(totalGovtMSP * 0.76); // 24% typical middleman loss
  const lossSaved = totalGovtMSP - privateTraderCut;

  return (
    <div className="bento-card p-6 mb-8" id="mandi-shield">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
            Feature 04: Anti-Middleman Defense
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">⚖️ Mandi & DPC Fair Price Shield</h2>
          <p className="text-xs text-emerald-300/80">Protect farmers from predatory moisture deductions, calculate official MSP, and dial verified DPC desks.</p>
        </div>
        <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          🏛️ 100% Legal MSP
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Calculator Inputs */}
        <div className="bg-[#03150d] border border-emerald-500/30 rounded-2xl p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-emerald-400 uppercase block mb-1">Select Kharif / Rabi Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-[#082619] border border-emerald-500/40 text-emerald-100 text-sm rounded-xl px-3 py-2.5"
            >
              {MSP_DATA.map((c) => (
                <option key={c.crop} value={c.crop}>
                  {c.crop} — ₹{c.msp.toLocaleString()} / Qtl
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-emerald-400 uppercase mb-1">
              <span>Harvest Harvested (Quintals)</span>
              <span className="text-white">{quantityQtl} Quintals</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              value={quantityQtl}
              onChange={(e) => setQuantityQtl(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-emerald-400 uppercase mb-1">
              <span>Grain Moisture Percentage</span>
              <span className={moisturePercent <= 17 ? "text-emerald-400" : "text-amber-400"}>
                {moisturePercent}% (Legal FCI Norm: ≤17%)
              </span>
            </div>
            <input
              type="range"
              min="12"
              max="25"
              value={moisturePercent}
              onChange={(e) => setMoisturePercent(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Real-time Economic Outcome */}
        <div className="bg-[#03150d] border border-emerald-500/30 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase">Government Guaranteed DPC Value</span>
            <div className="text-3xl font-extrabold text-white mt-1">₹{totalGovtMSP.toLocaleString()}</div>
            <p className="text-xs text-emerald-400/80 mt-1">Based on official Kharif procurement benchmark</p>

            <div className="mt-4 pt-4 border-t border-emerald-500/20">
              <span className="text-xs text-red-400 font-bold uppercase">Estimated Middleman / Private Mandi Cut</span>
              <div className="text-xl font-bold text-red-300 mt-1">~ ₹{privateTraderCut.toLocaleString()}</div>
            </div>
          </div>

          <div className="bg-emerald-500/20 border border-emerald-400 rounded-xl p-3 mt-4 text-center">
            <span className="text-xs font-extrabold text-emerald-200">
              🛡️ Direct Procurement Protects <span className="text-amber-300">₹{lossSaved.toLocaleString()}</span> in Farmer Income!
            </span>
          </div>
        </div>
      </div>

      {/* Verified DPC Directory */}
      <div className="bg-[#03150d] border border-emerald-500/30 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <span>📞 Verified Direct Procurement Centres (DPC) & Helplines: {district}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DPC_HELPLINES.map((d, idx) => (
            <div key={idx} className="bg-black/30 border border-emerald-500/20 rounded-xl p-3 flex justify-between items-center">
              <div>
                <div className="text-xs font-bold text-emerald-200">{d.name}</div>
                <div className="text-[10px] text-emerald-400/70">{d.status}</div>
              </div>
              <a
                href={`tel:${d.phone.replace(/[^0-9]/g, '')}`}
                className="bg-emerald-500 text-black font-extrabold text-xs px-3 py-1.5 rounded-lg hover:brightness-110 flex items-center gap-1.5"
              >
                <span>📞</span> {d.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
