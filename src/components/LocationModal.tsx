import React, { useState } from 'react';
import { STATE_DISTRICTS } from '../data/agriData';
import { MapPin, Check, X } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentState: string;
  currentDistrict: string;
  onSelectLocation: (state: string, district: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentState,
  currentDistrict,
  onSelectLocation
}) => {
  const [selectedState, setSelectedState] = useState(currentState);
  const [selectedDistrict, setSelectedDistrict] = useState(currentDistrict);

  if (!isOpen) return null;

  const states = Object.keys(STATE_DISTRICTS);
  const districts = selectedState && STATE_DISTRICTS[selectedState]
    ? Object.keys(STATE_DISTRICTS[selectedState])
    : [];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);
    const newDistricts = Object.keys(STATE_DISTRICTS[newState] || {});
    if (newDistricts.length > 0) {
      setSelectedDistrict(newDistricts[0]);
    }
  };

  const handleSave = () => {
    onSelectLocation(selectedState, selectedDistrict);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-lg p-6 border rounded-2xl bg-[#082117] border-emerald-500/40 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
          <div className="flex items-center gap-2 text-emerald-400">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Select Field Agro-Zone Location</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-emerald-300 hover:text-white rounded-lg hover:bg-emerald-950/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-3 text-xs text-emerald-200/80 leading-relaxed">
          AI crop pathology vision models, live Sentinel-2 satellite indices, and ICAR soil engines calibrate their diagnosis directly to your local agro-climatic conditions.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-emerald-300 uppercase tracking-wide">
              🏛️ State / Union Territory
            </label>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#041710] border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-400"
            >
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-emerald-300 uppercase tracking-wide">
              🌾 District / Agro-Climatic Zone
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#041710] border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-400"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {selectedState && selectedDistrict && STATE_DISTRICTS[selectedState]?.[selectedDistrict] && (
            <div className="p-3 border rounded-xl bg-emerald-950/30 border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white">Primary Regional Crops: </span>
                <span>{STATE_DISTRICTS[selectedState][selectedDistrict].crop}</span>
              </div>
              <div className="text-[11px] font-mono text-emerald-400/90">
                {STATE_DISTRICTS[selectedState][selectedDistrict].lat.toFixed(2)}°N, {STATE_DISTRICTS[selectedState][selectedDistrict].lon.toFixed(2)}°E
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2.5 mt-6 pt-4 border-t border-emerald-500/20">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-emerald-300 border border-emerald-500/30 rounded-xl hover:bg-emerald-900/30"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-md shadow-emerald-900/40"
          >
            <Check className="w-4 h-4" /> Calibrate & Sync Field Zone
          </button>
        </div>
      </div>
    </div>
  );
};
