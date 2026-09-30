import React from 'react';
import { LANGUAGES } from '../data/agriData';

interface HeaderProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  selectedState: string;
  selectedDistrict: string;
  onStateChange: (state: string) => void;
  onDistrictChange: (dist: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  selectedState,
  selectedDistrict,
}) => {
  return (
    <header className="border-b border-emerald-500/20 bg-[#061c14]/90 backdrop-blur sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <img 
            src="/public/nexyra_logo.jpg" 
            alt="Team Nexyra" 
            className="w-10 h-10 rounded-full border border-emerald-400/40 object-cover shadow-lg shadow-emerald-900/30"
            onError={(e) => {
              // Fallback if image not rendered
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-white tracking-tight">AgriN-Connect</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Team Nexyra
              </span>
            </div>
            <p className="text-xs text-emerald-400/80 font-medium">Smart Agriculture Intelligence Platform</p>
          </div>
        </div>

        {/* Location badge & Language Selector */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-950/80 border border-emerald-500/30 rounded-full px-3 py-1 text-xs text-emerald-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>📍 {selectedDistrict}, {selectedState}</span>
          </div>

          <div className="relative">
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-[#09261a] border border-emerald-500/40 text-emerald-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-400"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native} ({l.name})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
