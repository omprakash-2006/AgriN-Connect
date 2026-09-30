import React, { useState } from 'react';
import { LanguageCode } from './types';
import { Header } from './components/Header';
import { PlantDoctor } from './components/PlantDoctor';
import { ClimateRadar } from './components/ClimateRadar';
import { PestCorridors } from './components/PestCorridors';
import { MandiShield } from './components/MandiShield';
import { LocationModal } from './components/LocationModal';
import { IcarDirectoryModal } from './components/IcarDirectoryModal';
import { KisanVaniHelpline } from './components/KisanVaniHelpline';

export const App: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('English');
  const [selectedState, setSelectedState] = useState<string>('Tamil Nadu (தமிழ்நாடு)');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Thanjavur (Cauvery Delta Rice Bowl)');
  const [activeTab, setActiveTab] = useState<string>('plant-doctor');

  // Modal visibility states
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isIcarModalOpen, setIsIcarModalOpen] = useState<boolean>(false);
  const [isHelplineOpen, setIsHelplineOpen] = useState<boolean>(false);

  const handleSelectLocation = (state: string, district: string) => {
    setSelectedState(state);
    setSelectedDistrict(district);
  };

  return (
    <div className="min-h-screen bg-[#03120a] text-[#e2f8eb] relative pb-16">
      {/* Background Accent Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-emerald-500/10 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Navigation & Hero Header with Streamlit-Style Tabs */}
        <Header
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          state={selectedState}
          district={selectedDistrict}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
          onOpenHelpline={() => setIsHelplineOpen(true)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content Display */}
        <main className="transition-all duration-300">
          {(activeTab === 'plant-doctor' || activeTab === 'all') && (
            <div className={activeTab === 'all' ? 'mb-12' : ''}>
              <PlantDoctor
                currentLanguage={currentLanguage}
                state={selectedState}
                district={selectedDistrict}
                onOpenIcarDirectory={() => setIsIcarModalOpen(true)}
              />
            </div>
          )}

          {(activeTab === 'climate-radar' || activeTab === 'all') && (
            <div className={activeTab === 'all' ? 'mb-12' : ''}>
              <ClimateRadar
                currentLanguage={currentLanguage}
                state={selectedState}
                district={selectedDistrict}
              />
            </div>
          )}

          {(activeTab === 'pest-corridors' || activeTab === 'all') && (
            <div className={activeTab === 'all' ? 'mb-12' : ''}>
              <PestCorridors
                currentLanguage={currentLanguage}
                state={selectedState}
                district={selectedDistrict}
              />
            </div>
          )}

          {(activeTab === 'mandi-shield' || activeTab === 'all') && (
            <div className={activeTab === 'all' ? 'mb-12' : ''}>
              <MandiShield
                currentLanguage={currentLanguage}
                state={selectedState}
                district={selectedDistrict}
              />
            </div>
          )}
        </main>

        {/* Unified Botanical Footer */}
        <footer className="mt-12 pt-8 border-t border-emerald-500/20 text-center text-xs text-emerald-300/70 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-3 font-semibold text-emerald-200">
            <span>🌾 AgriN-Connect (KisanSetu AI)</span>
            <span>•</span>
            <span className="text-amber-300">⚡ Team Nexyra</span>
            <span>•</span>
            <span>Digital Public Good (DPG)</span>
            <span>•</span>
            <span>AgriStack & Beckn Protocol Ready</span>
          </div>
          <p className="text-[11px] text-emerald-400/60 max-w-2xl mx-auto">
            Empowering Indian smallholders across all 28 States & UTs with Zero-Budget Natural Farming (ZBNF), multimodal foliar vision AI, hyper-local satellite telemetry, and inter-state collaborative surveillance.
          </p>
        </footer>
      </div>

      {/* Modals & Dialogs */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentState={selectedState}
        currentDistrict={selectedDistrict}
        onSelectLocation={handleSelectLocation}
      />

      <IcarDirectoryModal
        isOpen={isIcarModalOpen}
        onClose={() => setIsIcarModalOpen(false)}
      />

      <KisanVaniHelpline
        isOpen={isHelplineOpen}
        onClose={() => setIsHelplineOpen(false)}
        currentLanguage={currentLanguage}
        state={selectedState}
        district={selectedDistrict}
      />
    </div>
  );
};
