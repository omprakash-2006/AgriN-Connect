# 🌾 AgriN-Connect (KisanSetu AI)
### An Interoperable Digital Agriculture Network & Digital Public Good for Smallholder Farmers

[![Build with AI: Code for Communities](https://img.shields.io/badge/Hackathon-Build_with_AI:_Code_for_Communities_2.0-2ea44f)](https://hack2skill.com)
[![Theme: Cooperation](https://img.shields.io/badge/Theme-Cooperation-blue)](https://hack2skill.com)
[![Digital Public Good](https://img.shields.io/badge/DPG-AgriStack_%26_Beckn_Ready-orange)](https://digitalpublicgoods.net)
[![AI Engine](https://img.shields.io/badge/Engine-Gemini_2.5_Flash-8e44ad)](https://ai.google.dev)

---

## 📖 Overview

Small and marginal farmers across India face acute climate unpredictability and crop failure due to lack of localized, data-driven agricultural guidance. Furthermore, the absence of shared digital infrastructure blocks cross-state collaboration on early pest outbreaks and sustainable food production.

**AgriN-Connect (KisanSetu AI)** solves this with a scalable, interoperable **Digital Public Good (DPG)** that integrates:
1. **Multimodal Visual Crop Pathology** with native vernacular voice guidance (Tamil, Hindi, Telugu, English).
2. **Geo-Satellite Vegetation Analytics (Sentinel-2 NDVI)** combined with hyper-local live weather forecasting (Open-Meteo).
3. **Zero-Budget Natural Farming (ZBNF) Bio-Recipe Engine** to eliminate dependency on toxic, high-cost synthetic agro-chemicals.
4. **KisanSetu Inter-State Outbreak Corridor Radar**: A cross-state early warning system enabling Indian states to exchange pathogen vectors and agro-climatic models under **AgriStack & Beckn protocols**.

---

## 🌟 Key Innovations

```
                                      AgriN-Connect Architecture
                                                   │
         ┌─────────────────────────────────────────┼─────────────────────────────────────────┐
         │                                         │                                         │
         ▼                                         ▼                                         ▼
┌─────────────────────────────────┐   ┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│ TAB 1: Agri-Vani Plant Doctor   │   │ TAB 2: Geo-Satellite Radar      │   │ TAB 3: KisanSetu DPG Network    │
│ • Visual Leaf Pathology (AI)    │   │ • Live Open-Meteo Microclimate  │   │ • Cross-State Border Pest Vector│
│ • Vernacular Audio (Tamil/Hindi)│   │ • Sentinel-2 NDVI & NDWI Gauges │   │ • Early Warning Outbreak Alerts │
│ • ZBNF Zero-Chemical Bio-Recipe │   │ • 48-hr Spore Germination Alert │   │ • Open AgriStack/Beckn DPG Feed │
│ • ₹ Savings & Carbon Calculator │   │ • Regenerative Rotation Engine  │   │ • Inter-State Model Sharing     │
└─────────────────────────────────┘   └─────────────────────────────────┘   └─────────────────────────────────┘
```

### 1. 🍃 Agri-Vani: Visual Pathology & Vernacular Voice AI
- Snap or upload a photo of a diseased leaf.
- Gemini 2.5 Flash analyzes foliar lesions and outputs clinical symptoms, severity score, and natural biological remedies (Neemastram, Sour Buttermilk, Trichoderma).
- **Vernacular Audio Output**: Generates instant spoken audio in **Tamil, English, Hindi, and Telugu** for low-literacy farmers.

### 2. 🛰️ Geo-Satellite & Microclimate Stress Radar
- Fetches real-time temperature, humidity, precipitation probability, and wind vectors via Open-Meteo.
- Derives **Sentinel-2 NDVI (Normalized Difference Vegetation Index)** canopy health.
- Alerts farmers to 48-hour disease vulnerability windows (e.g., Fungal Blast spore germination risk when humidity exceeds 75%).

### 3. 🇮🇳 KisanSetu Inter-State AgriGrid (Digital Public Good)
- **Surveillance Corridors**: Tracks pest vectors across state borders (e.g., Fall Armyworm moving from Rayalaseema, AP into North Arcot, TN; Whitefly moving across Malwa, PB to Sirsa, HR).
- **Beckn / AgriStack Open Schema**: Provides an exportable OpenAPI/JSON-LD payload compliant with Indian Digital Public Infrastructure standards.

### 4. 🌿 ZBNF Bio-Recipe Formulation & Farmer Economic Savings
- On-farm formulations for *Jeevamrutha* and *Neemastram*.
- Real-time calculator projecting ₹ input savings and soil carbon sequestration per cultivated acre.

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10 or higher
- Gemini API Key (get from [Google AI Studio](https://aistudio.google.com/app/apikey))

### 1. Installation
```bash
git clone https://github.com/Murugan-rk/AgriN-Connect.git
cd AgriN-Connect
pip install -r requirements.txt
```

### 2. Configuration (Optional)
Create a `.env` file in the root directory:
```bash
cp .env.example .env
# Edit .env and paste your GEMINI_API_KEY
```
*(Alternatively, enter your API key directly in the web app sidebar)*.

### 3. Launch the Application
```bash
streamlit run app.py
```
The app will launch in your browser at `http://localhost:8501`.

---

## 🛠️ Tech Stack
- **Frontend / Application**: Streamlit
- **Multimodal AI**: Google GenAI SDK (`gemini-2.5-flash`)
- **Speech Synthesis**: Google Text-to-Speech (`gTTS`)
- **Weather & Earth Observation**: Open-Meteo API & Sentinel-2 NDVI Index
- **DPG Protocol Alignment**: AgriStack & Beckn Protocol JSON-LD Schema
