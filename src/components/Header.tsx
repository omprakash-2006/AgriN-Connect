import React from 'react';
import { LanguageCode } from '../types';
import { UI_TRANSLATIONS } from '../data/agriData';
import { Globe, MapPin, Sparkles, MessageSquareHeart, Layers } from 'lucide-react';

interface HeaderProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  state: string;
  district: string;
  onOpenLocationModal: () => void;
  onOpenHelpline: () => void;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  state,
  district,
  onOpenLocationModal,
  onOpenHelpline,
  activeTab,
  onTabChange
}) => {
  const ui = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.English;
  const cleanDistrict = district.split('(')[0].trim();
  const cleanState = state.split('(')[0].trim();

  const languages: LanguageCode[] = [
    'English',
    'Tamil (தமிழ்)',
    'Hindi (हिन्दी)',
    'Telugu (తెలుగు)',
    'Kannada (ಕನ್ನಡ)',
    'Malayalam (മലയാളം)'
  ];

  const tabList = [
    { id: 'plant-doctor', label: '🍃 Tab 1: Agri-Vani Plant Doctor', shortLabel: '🍃 Plant Doctor' },
    { id: 'climate-radar', label: '🌦️ Tab 2: Live Weather & Satellite', shortLabel: '🌦️ Climate Radar' },
    { id: 'pest-corridors', label: '🚨 Tab 3: Pest Attack Alerts', shortLabel: '🚨 Pest Alerts' },
    { id: 'mandi-shield', label: '💰 Tab 4: Mandi Fair Price Shield', shortLabel: '💰 Fair Price' },
    { id: 'all', label: '📑 View All Modules', shortLabel: '📑 View All' }
  ];

  return (
    <header className="mb-6">
      {/* Top Banner Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-500/20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 overflow-hidden rounded-xl border border-amber-400/40 bg-gradient-to-br from-emerald-600/40 to-emerald-900/60 shadow-lg shadow-emerald-950/40 shrink-0">
            <img
              src="/nexyra_logo.jpg"
              alt="Nexyra Logo"
              className="object-cover w-full h-full"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#041710] shadow-[0_0_8px_#34d399]"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-extrabold tracking-wider uppercase rounded-full text-amber-300 bg-amber-400/10 border border-amber-400/30">
                ⚡ TEAM NEXYRA
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full text-emerald-300 bg-emerald-500/10 border border-emerald-500/20">
                DPG AgriStack Ready
              </span>
            </div>
            <div className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
              <span>AgriN-Connect</span>
              <span className="text-xs font-semibold text-emerald-400 font-mono">(KisanSetu AI)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Active Location Button */}
          <button
            onClick={onOpenLocationModal}
            title="Click to change State & District"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition border rounded-xl bg-emerald-950/60 border-emerald-500/30 text-emerald-200 hover:border-emerald-400 hover:bg-emerald-900/50 shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate max-w-[170px] sm:max-w-none">
              <b>{cleanDistrict}</b>, {cleanState}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono shrink-0">
              Live Synced
            </span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs border rounded-xl bg-emerald-950/60 border-emerald-500/30 text-emerald-200">
            <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
              className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className="bg-[#082117] text-white">
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Kisan-Vani Helpline Trigger */}
          <button
            onClick={onOpenHelpline}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition border rounded-xl bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border-amber-400/40 text-amber-200 hover:border-amber-300 hover:bg-amber-500/30 shadow-sm"
          >
            <MessageSquareHeart className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>🎙️ Kisan-Vani AI</span>
          </button>
        </div>
      </div>

      {/* Hero Headline Section */}
      <div className="py-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
          <span className="font-serif italic font-normal text-[#d4f938] drop-shadow-[0_2px_15px_rgba(212,249,56,0.35)]">
            {ui.hero_title}
          </span>{' '}
          {ui.hero_intel}
        </h1>
        <p className="mt-1.5 text-xs md:text-sm font-medium text-emerald-200/80">
          {ui.hero_tags}
        </p>
      </div>

      {/* 4 Feature Fast Navigation Interactive Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-2">
        <button
          onClick={() => onTabChange('plant-doctor')}
          className={`text-left flex items-center gap-2.5 p-2.5 transition rounded-xl border ${
            activeTab === 'plant-doctor'
              ? 'border-emerald-400 bg-gradient-to-br from-emerald-900/80 to-[#041710] shadow-[0_0_20px_rgba(52,211,153,0.35)] ring-1 ring-emerald-400/50'
              : 'border-emerald-500/30 bg-gradient-to-br from-emerald-950/60 to-[#041710] hover:border-emerald-400/70 hover:translate-y-[-1px]'
          } shadow-sm`}
        >
          <div className="flex items-center justify-center w-8 h-8 text-base rounded-lg bg-emerald-500/20 text-emerald-300 shrink-0">
            🍃
          </div>
          <div className="overflow-hidden">
            <div className="text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider">
              {ui.nav_f1_badge}
            </div>
            <div className="text-xs font-bold text-white truncate">{ui.nav_f1_title}</div>
          </div>
        </button>

        <button
          onClick={() => onTabChange('climate-radar')}
          className={`text-left flex items-center gap-2.5 p-2.5 transition rounded-xl border ${
            activeTab === 'climate-radar'
              ? 'border-sky-400 bg-gradient-to-br from-sky-900/80 to-[#041710] shadow-[0_0_20px_rgba(56,189,248,0.35)] ring-1 ring-sky-400/50'
              : 'border-sky-500/30 bg-gradient-to-br from-sky-950/40 to-[#041710] hover:border-sky-400/70 hover:translate-y-[-1px]'
          } shadow-sm`}
        >
          <div className="flex items-center justify-center w-8 h-8 text-base rounded-lg bg-sky-500/20 text-sky-300 shrink-0">
            🌦️
          </div>
          <div className="overflow-hidden">
            <div className="text-[10px] font-extrabold uppercase text-sky-300 tracking-wider">
              {ui.nav_f2_badge}
            </div>
            <div className="text-xs font-bold text-white truncate">{ui.nav_f2_title}</div>
          </div>
        </button>

        <button
          onClick={() => onTabChange('pest-corridors')}
          className={`text-left flex items-center gap-2.5 p-2.5 transition rounded-xl border ${
            activeTab === 'pest-corridors'
              ? 'border-amber-400 bg-gradient-to-br from-amber-900/80 to-[#041710] shadow-[0_0_20px_rgba(251,191,36,0.35)] ring-1 ring-amber-400/50'
              : 'border-amber-500/30 bg-gradient-to-br from-amber-950/40 to-[#041710] hover:border-amber-400/70 hover:translate-y-[-1px]'
          } shadow-sm`}
        >
          <div className="flex items-center justify-center w-8 h-8 text-base rounded-lg bg-amber-500/20 text-amber-300 shrink-0">
            🚨
          </div>
          <div className="overflow-hidden">
            <div className="text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">
              {ui.nav_f3_badge}
            </div>
            <div className="text-xs font-bold text-white truncate">{ui.nav_f3_title}</div>
          </div>
        </button>

        <button
          onClick={() => onTabChange('mandi-shield')}
          className={`text-left flex items-center gap-2.5 p-2.5 transition rounded-xl border ${
            activeTab === 'mandi-shield'
              ? 'border-purple-400 bg-gradient-to-br from-purple-900/80 to-[#041710] shadow-[0_0_20px_rgba(192,132,252,0.35)] ring-1 ring-purple-400/50'
              : 'border-purple-500/30 bg-gradient-to-br from-purple-950/40 to-[#041710] hover:border-purple-400/70 hover:translate-y-[-1px]'
          } shadow-sm`}
        >
          <div className="flex items-center justify-center w-8 h-8 text-base rounded-lg bg-purple-500/20 text-purple-300 shrink-0">
            💰
          </div>
          <div className="overflow-hidden">
            <div className="text-[10px] font-extrabold uppercase text-purple-300 tracking-wider">
              {ui.nav_f4_badge}
            </div>
            <div className="text-xs font-bold text-white truncate">{ui.nav_f4_title}</div>
          </div>
        </button>
      </div>

      {/* Streamlit-Style Main Tab Strip */}
      <div className="flex items-center gap-1 overflow-x-auto p-1.5 rounded-2xl bg-[#041710]/90 border border-emerald-500/30 backdrop-blur-md mt-4 shadow-lg">
        {tabList.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-[0_2px_12px_rgba(16,185,129,0.45)]'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="inline sm:hidden">{tab.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
