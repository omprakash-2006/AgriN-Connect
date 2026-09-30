export interface LanguageOption {
  code: string;
  name: string;
  native: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
];

export const STATES_DISTRICTS: Record<string, string[]> = {
  "Tamil Nadu": ["Thanjavur", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Dindigul", "Thiruvarur", "Nagapattinam", "Cuddalore"],
  "Andhra Pradesh": ["Chittoor", "Anantapur", "Guntur", "Krishna", "Kurnool", "Prakasam", "Nellore"],
  "Karnataka": ["Bengaluru Rural", "Mysuru", "Belagavi", "Ballari", "Shivamogga", "Dharwad", "Mandya"],
  "Kerala": ["Palakkad", "Wayanad", "Alappuzha", "Idukki", "Thrissur", "Kollam", "Kottayam"],
  "Maharashtra": ["Nagpur", "Yavatmal", "Pune", "Nashik", "Aurangabad", "Amravati", "Solapur"],
  "Punjab": ["Bathinda", "Mansa", "Ludhiana", "Amritsar", "Patiala", "Sangrur", "Jalandhar"],
  "Haryana": ["Sirsa", "Fatehabad", "Hisar", "Karnal", "Ambala", "Rohtak"],
  "Gujarat": ["Rajkot", "Junagadh", "Surat", "Vadodara", "Bhavnagar", "Jamnagar"],
  "Uttar Pradesh": ["Varanasi", "Gorakhpur", "Lucknow", "Prayagraj", "Kanpur", "Bareilly"],
  "Bihar": ["Patna", "Muzaffarpur", "Gaya", "Bhagalpur", "Darbhanga", "Purnia"]
};

export const MSP_DATA = [
  { crop: "Paddy (Common / சாம்பா நெல்)", msp: 2300, unit: "₹ / Quintal" },
  { crop: "Paddy (Grade A)", msp: 2320, unit: "₹ / Quintal" },
  { crop: "Cotton (Medium Staple)", msp: 7121, unit: "₹ / Quintal" },
  { crop: "Maize (மக்காச்சோளம்)", msp: 2225, unit: "₹ / Quintal" },
  { crop: "Groundnut (நிலக்கடலை)", msp: 6783, unit: "₹ / Quintal" },
  { crop: "Soybean (சோயாபீன்)", msp: 4892, unit: "₹ / Quintal" }
];

export const DPC_HELPLINES = [
  { name: "TNCSC State Control Room (Civil Supplies)", phone: "04362-230121", status: "24/7 Official Desk" },
  { name: "National Kisan Call Center (MoA&FW)", phone: "1800-180-1551", status: "Toll-Free Govt Desk" },
  { name: "Thanjavur District Procurement Lead Desk", phone: "04362-235021", status: "Delta Direct Zone" },
  { name: "Kaveri Basin Grievance & Fair Moisture Cell", phone: "04362-278110", status: "Legal Moisture Redressal" }
];
