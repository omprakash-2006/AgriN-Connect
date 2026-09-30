import React, { useState } from 'react';
import { ICAR_DISEASE_DIRECTORY } from '../data/agriData';
import { X, Search, ShieldCheck, Bug, CloudSun } from 'lucide-react';

interface IcarDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IcarDirectoryModal: React.FC<IcarDirectoryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('ALL');

  if (!isOpen) return null;

  const crops = ['ALL', 'Rice / Paddy', 'Wheat', 'Cotton', 'Sugarcane', 'Tomato', 'Horticultural'];

  const filtered = ICAR_DISEASE_DIRECTORY.filter((d) => {
    const matchesCrop =
      selectedCropFilter === 'ALL' ||
      d.crop.toLowerCase().includes(selectedCropFilter.toLowerCase());
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.indicators.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.remedy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col border rounded-2xl bg-[#061e14] border-emerald-500/40 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-emerald-500/20 bg-emerald-950/40">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-lg">📖</span>
            <div>
              <h2 className="text-base md:text-lg font-bold text-white">
                ICAR 70+ Clinical Crop Pathology & Non-Chemical Bio-Remedy Directory
              </h2>
              <p className="text-xs text-emerald-300/80">
                Official biological remedies (ZBNF), symptoms, and climate vectors from ICAR & TNAU
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-300 rounded-lg hover:text-white hover:bg-emerald-900/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 border-b border-emerald-500/20 bg-[#041710] flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute w-4 h-4 text-emerald-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search by crop, disease name, symptoms, or bio-remedy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-[#082619] border border-emerald-500/30 text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {crops.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCropFilter(c)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                  selectedCropFilter === c
                    ? 'bg-emerald-500 text-[#03120a]'
                    : 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Content List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-emerald-400/70 text-sm">
              No matching diseases found. Try a different query.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                className="p-4 transition border rounded-xl bg-gradient-to-r from-[#082418] to-[#041710] border-emerald-500/30 hover:border-emerald-400/70 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                      {item.crop}
                    </span>
                    <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400/80 italic">
                    {item.pathogen}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-3">
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 mb-1">
                      <Bug className="w-3.5 h-3.5" /> Clinical Foliar Symptoms:
                    </div>
                    <p className="text-emerald-200/90 leading-relaxed">{item.indicators}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Non-Chemical Bio-Remedy:
                    </div>
                    <p className="text-emerald-200/90 leading-relaxed">{item.remedy}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-sky-300 mb-1">
                      <CloudSun className="w-3.5 h-3.5" /> Favorable Climate Vector:
                    </div>
                    <p className="text-emerald-200/90 leading-relaxed">{item.climate}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-emerald-500/20 bg-emerald-950/30 flex justify-between items-center text-xs text-emerald-300">
          <span>Showing {filtered.length} curated ICAR clinical entries</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 text-xs"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
