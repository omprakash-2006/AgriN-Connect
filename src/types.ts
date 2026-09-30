export type LanguageCode = 'English' | 'Tamil (தமிழ்)' | 'Hindi (हिन्दी)' | 'Telugu (తెలుగు)' | 'Kannada (ಕನ್ನಡ)' | 'Malayalam (മലയാളം)';

export interface DistrictLocation {
  lat: number;
  lon: number;
  crop: string;
  state?: string;
}

export interface StateDistrictMap {
  [state: string]: {
    [district: string]: DistrictLocation;
  };
}

export interface BioRemedy {
  title: string;
  desc: string;
  icon: string;
  badge: string;
}

export interface PlantDiagnosis {
  crop: string;
  disease: string;
  pathogen: string;
  confidence: string;
  severity: string;
  indicators: string[];
  remedies: BioRemedy[];
  prevention: string[];
  speech?: {
    [key: string]: string;
  };
  speechText?: string;
  isAiGenerated?: boolean;
}

export interface DiseaseDirectoryEntry {
  crop: string;
  name: string;
  pathogen: string;
  indicators: string;
  remedy: string;
  climate: string;
}

export interface PestCorridor {
  id: string;
  name: string;
  states: string;
  vector: string;
  crop: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
  speed: string;
  windDrift: string;
  affectedDistricts: string[];
  immediateAction: string;
  costAvoidance: string;
}

export interface MandiCrop {
  name: string;
  msp: number; // ₹ per quintal
  unit: string;
  moistureLimit: number; // percentage
  dpcCenters: string[];
}
