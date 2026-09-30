import React, { useState } from 'react';
import { Header } from './components/Header';
import { PlantDoctor } from './components/PlantDoctor';
import { ClimateRadar } from './components/ClimateRadar';
import { PestCorridors } from './components/PestCorridors';
import { MandiShield } from './components/MandiShield';

export default function App() {
  const [currentLang, setCurrentLang] = useState('ta');
  const [selectedState, setSelectedState] = useState('Tamil Nadu');
  const [selectedDistrict, setSelectedDistrict] = useState('Thanjavur');

  return (
    <div className="min-h-screen bg-[#041710] text-[#ecfdf5]">
      {/* Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        selectedState={selectedState}
        selectedDistrict={selectedDistrict}
        onStateChange={setSelectedState}
        onDistrictChange={setSelectedDistrict}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 p-8 mb-8 shadow-2xl bg-gradient-to-r from-[#03150d] to-[#072418]">
          <div className="max-w-3xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Digital Public Good • AgriStack & Beckn Ready
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 leading-tight tracking-tight">
              AgriN-Connect: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Intelligent Farmer Defense</span>
            </h1>
            <p className="text-sm md:text-base text-emerald-200/90 mt-3 leading-relaxed">
              Empowering smallholder farmers across India with Gemini Vision foliar pathology, hyper-local WMO satellite climate tracking, cross-state pest vector alerts, and fair price MSP protection.
            </p>

            {/* Quick Feature Jump Navigation */}
            <div className="flex flex-wrap gap-2 mt-6">
              <a href="#plant-doctor" className="text-xs font-bold bg-emerald-500/20 border border-emerald-400 text-emerald-200 px-3.5 py-1.5 rounded-full hover:bg-emerald-500 hover:text-black transition-all">
                🍃 1. Plant Doctor
              </a>
              <a href="#climate-radar" className="text-xs font-bold bg-emerald-500/20 border border-emerald-400 text-emerald-200 px-3.5 py-1.5 rounded-full hover:bg-emerald-500 hover:text-black transition-all">
                🛰️ 2. Climate & Soil HUD
              </a>
              <a href="#pest-corridors" className="text-xs font-bold bg-emerald-500/20 border border-emerald-400 text-emerald-200 px-3.5 py-1.5 rounded-full hover:bg-emerald-500 hover:text-black transition-all">
                🐛 3. Regional Pest Alerts
              </a>
              <a href="#mandi-shield" className="text-xs font-bold bg-emerald-500/20 border border-emerald-400 text-emerald-200 px-3.5 py-1.5 rounded-full hover:bg-emerald-500 hover:text-black transition-all">
                ⚖️ 4. Mandi MSP Shield
              </a>
            </div>
          </div>
        </div>

        {/* 4 Core Features */}
        <PlantDoctor currentLang={currentLang} />
        <ClimateRadar district={selectedDistrict} state={selectedState} currentLang={currentLang} />
        <PestCorridors currentLang={currentLang} />
        <MandiShield district={selectedDistrict} />

        {/* Footer */}
        <footer className="border-t border-emerald-500/20 pt-6 pb-12 text-center text-xs text-emerald-400/70">
          <p>© 2026 AgriN-Connect (Team Nexyra) • Built with Google Gemini AI for Communities 2.0</p>
          <p className="mt-1">Empowering 140M+ Indian Farmers with Zero Chemical Cost & Fair Economic Defense</p>
        </footer>
      </main>
    </div>
  );
}
