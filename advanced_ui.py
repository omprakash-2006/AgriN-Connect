"""
AgriN-Connect (KisanSetu AI) — Advanced Architectural UI Suite
- Bento-Grid & Design Token components
- Interactive Tactile Split-Studio Leaf Inspection Suite (Split slider, JET thermal heatmap, hotspots, raw)
- Dual Animated SVG Radial Biometric Gauges (Model Certainty %, Foliar Infection Loss %)
- Multi-Leaf Canopy Object Detection Simulation & Leaf Detection Ledger
- ICAR 70+ Clinical Crop Disease Directory
"""

import streamlit as st
import streamlit.components.v1 as components
import json
import base64
import io

# ==============================================================================
# 1. ICAR 70+ CLINICAL CROP PATHOLOGY & BIO-REMEDY REPOSITORY
# ==============================================================================
ICAR_DISEASE_REPOSITORY = [
    # 🌾 Rice / Paddy (1-9)
    {
        "crop": "🌾 Rice / Paddy",
        "name": "Paddy Blast",
        "pathogen": "Magnaporthe oryzae (Pyricularia grisea) • Fungal",
        "indicators": "Spindle-shaped elliptical lesions with gray-white centers and brown-red margins; neck blast rots panicle base causing empty chalky grains.",
        "remedy": "5% Neem Seed Kernel Extract (NSKE) or Agniastram (500ml/100L water) + Pseudomonas fluorescens (1kg/acre foliar spray).",
        "climate": "Night humidity >85%, temperatures 20-25°C, high urea usage."
    },
    {
        "crop": "🌾 Rice / Paddy",
        "name": "Bacterial Leaf Blight (BLB)",
        "pathogen": "Xanthomonas oryzae pv. oryzae • Bacterial",
        "indicators": "Water-soaked stripes starting from leaf tips moving downwards with wavy margins, drying into pale yellow-white blighted straw.",
        "remedy": "Fermented sour buttermilk (5L) + Hing / Asafoetida (50g) in 100L water + Cow dung slurry supernatant (5%). Avoid chemical nitrogen.",
        "climate": "Cyclonic rains, gale winds, temperatures 25-34°C, waterlogged fields."
    },
    {
        "crop": "🌾 Rice / Paddy",
        "name": "Sheath Blight",
        "pathogen": "Rhizoctonia solani • Fungal (Soil-borne)",
        "indicators": "Oval greenish-gray water-soaked lesions on leaf sheaths near waterline, coalescing into snake-skin patterns with dark brown boundaries.",
        "remedy": "Soil application of Trichoderma harzianum (2.5kg/acre enriched in 200kg FYM) + foliar spray of Pseudomonas fluorescens (10g/L).",
        "climate": "Dense canopy planting, standing stagnant water, 28-32°C, relative humidity >90%."
    },
    {
        "crop": "🌾 Rice / Paddy",
        "name": "Brown Spot",
        "pathogen": "Bipolaris oryzae (Helminthosporium oryzae) • Fungal",
        "indicators": "Circular to oval dark brown spots resembling sesame seeds with yellow chlorotic halo rings across leaf lamina.",
        "remedy": "Panchagavya (3% spray) + 5% Neem oil emulsion to restore micronutrient absorption and foliar chlorophyll integrity.",
        "climate": "Nutrient-depleted sandy soils, potassium deficiency, drought stress."
    },
    {
        "crop": "🌾 Rice / Paddy",
        "name": "Rice Tungro Virus",
        "pathogen": "RTBV & RTSV • Viral Complex (Vector: Green Leafhopper)",
        "indicators": "Stunted tillering, yellow to orange-yellow leaf discoloration starting from tip, mottled young leaves, poor root growth.",
        "remedy": "Neem oil (3%) or Agniastram foliar spray to repel Nephotettix virescens vectors. Install light traps at field perimeter.",
        "climate": "Dense weed borders, continuous non-synchronous paddy nurseries."
    },
    {
        "crop": "🌾 Rice / Paddy",
        "name": "False Smut (Green Smut)",
        "pathogen": "Ustilaginoidea virens • Fungal",
        "indicators": "Individual grain florets transformed into large velvety yellow-orange spore balls turning dark olive-green to black.",
        "remedy": "Early panicle spray of fermented cow urine (10%) + Trichoderma viride. Avoid late-season nitrogen top-dressing.",
        "climate": "Heavy rainfall and cloudy overcast days during flowering and milk stages."
    },
    {
        "crop": "🌾 Rice / Paddy",
        "name": "Bakanae / Foot Rot",
        "pathogen": "Fusarium fujikuroi • Fungal (Seed & Soil-borne)",
        "indicators": "Abnormally tall, slender, pale yellowish tillers in seedbeds and field; adventitious roots forming on lower aerial nodes.",
        "remedy": "Beejamritham seed treatment (cow dung, urine, lime, virgin soil) + dipping seedling roots in Pseudomonas fluorescens before transplanting.",
        "climate": "Warm soil temperatures (30-35°C), high seedbed density."
    },
    {
        "crop": "🌾 Rice / Paddy",
        "name": "Sheath Rot",
        "pathogen": "Sarocladium oryzae • Fungal",
        "indicators": "Oblong irregular gray-brown lesions on uppermost flag leaf sheath enclosing panicle, preventing complete panicle emergence.",
        "remedy": "Foliar spray of 5% Neem Kernel Extract + 10% Cow urine filtrate. Maintain balanced potash levels.",
        "climate": "Stem borer feeding punctures, high humidity (>85%) at booting stage."
    },
    {
        "crop": "🌾 Rice / Paddy",
        "name": "Narrow Brown Leaf Spot",
        "pathogen": "Cercospora janseana • Fungal",
        "indicators": "Short, linear, narrow reddish-brown to dark brown streaks parallel to leaf veins on mature foliage.",
        "remedy": "Panchagavya 3% foliar spray combined with Jeevamrutham soil drenching through irrigation channels.",
        "climate": "Late season maturity stage under nitrogen-exhausted soils."
    },

    # 🌾 Wheat (10-17)
    {
        "crop": "🌾 Wheat",
        "name": "Yellow / Stripe Rust",
        "pathogen": "Puccinia striiformis f. sp. tritici • Fungal",
        "indicators": "Bright yellow powdery pustules arranged in characteristic narrow parallel stripes along leaf veins resembling sewn stripes.",
        "remedy": "Foliar spray of 10% Sour Buttermilk + 5% Agniastram; sow resistant cultivars (HD-2967, PBW-550) calibrated for North-Western plains.",
        "climate": "Cool weather (10-15°C) with persistent winter fog and dew in Indo-Gangetic Plains."
    },
    {
        "crop": "🌾 Wheat",
        "name": "Brown / Leaf Rust",
        "pathogen": "Puccinia triticina • Fungal",
        "indicators": "Small, round to oval orange-brown powdery pustules scattered randomly across upper leaf lamina.",
        "remedy": "Trichoderma harzianum (10g/L) prophylactic bio-spray at tillering stage + fermented cow dung slurry.",
        "climate": "Moderate temperatures (20-25°C) with high relative humidity."
    },
    {
        "crop": "🌾 Wheat",
        "name": "Black / Stem Rust",
        "pathogen": "Puccinia graminis f. sp. tritici • Fungal",
        "indicators": "Large, elongated reddish-brown to dark black pustules rupturing stem and leaf sheaths; stems become brittle and lodge.",
        "remedy": "Neem oil (5%) + Dashaparni Kashayam foliar barrier. Destroy alternate barberry hosts in Himalayan foothills.",
        "climate": "Warm humid conditions (25-30°C) during spring heading stage."
    },
    {
        "crop": "🌾 Wheat",
        "name": "Karnal Bunt",
        "pathogen": "Tilletia indica • Fungal (Seed/Soil-borne)",
        "indicators": "Partial conversion of grain kernels into pungent, fishy-smelling black teliospore powder; embryo usually intact.",
        "remedy": "Seed biopriming with Trichoderma viride (10g/kg seed); avoid excessive irrigation during heading and flowering.",
        "climate": "Cool cloudy weather with light showers during earhead emergence."
    },
    {
        "crop": "🌾 Wheat",
        "name": "Loose Smut",
        "pathogen": "Ustilago tritici • Fungal (Internally Seed-borne)",
        "indicators": "Entire earhead transformed into a powdery black sooty mass of spores; bare rachis remains after spores blow away.",
        "remedy": "Solar heat seed treatment (soak seeds in water for 4 hours in May morning, spread on tarp in blazing sun for 4 hours) + Beejamritham.",
        "climate": "Moist temperate conditions during anthesis allowing floral infection."
    },
    {
        "crop": "🌾 Wheat",
        "name": "Powdery Mildew",
        "pathogen": "Blumeria graminis f. sp. tritici • Fungal",
        "indicators": "White, cottony or powdery patches on upper leaf surface, later turning grayish-brown with tiny black fruiting cleistothecia.",
        "remedy": "Diluted sour milk/buttermilk (10%) foliar spray + sulfur-rich garlic-chilli extract (Brahmastram).",
        "climate": "Cool, dry days with high humidity at night; dense crop canopy."
    },
    {
        "crop": "🌾 Wheat",
        "name": "Spot Blotch",
        "pathogen": "Bipolaris sorokiniana • Fungal",
        "indicators": "Small oval to elliptical brown necrotic spots surrounded by light yellow halos, expanding rapidly into severe foliar blights.",
        "remedy": "Pseudomonas fluorescens (1kg/acre) + Panchagavya (3%) foliar spray to fortify flag leaf photosynthetic duration.",
        "climate": "Warm and humid conditions (>25°C) in Eastern Gangetic plains."
    },
    {
        "crop": "🌾 Wheat",
        "name": "Flag Smut",
        "pathogen": "Urocystis agropyri • Fungal",
        "indicators": "Long, grayish-black blisters running parallel to leaf veins on flag leaf; leaves become twisted, distorted, and shredded.",
        "remedy": "Deep summer plowing to expose teliospores + seed coating with cow dung ash and Trichoderma viride.",
        "climate": "Dry soil conditions with moderate temperature at sowing time."
    },

    # 🧵 Cotton (18-25)
    {
        "crop": "🧵 Cotton",
        "name": "Bacterial Blight / Angular Leaf Spot",
        "pathogen": "Xanthomonas citri pv. malvacearum • Bacterial",
        "indicators": "Water-soaked angular spots bounded by leaf veinlets; progresses into black arm lesions on petioles and water-soaked boll rot.",
        "remedy": "Fermented sour buttermilk (500ml) + Hing (5g) in 10L water + 5% cow dung filtrate. Destroy infected plant debris.",
        "climate": "High humidity (>85%), warm days (30°C), driving rains."
    },
    {
        "crop": "🧵 Cotton",
        "name": "Grey Mildew / Dahiya Disease",
        "pathogen": "Ramularia areola • Fungal",
        "indicators": "Angular pale translucent spots on upper leaf surface; underside covered with frosty white powdery fungal growth resembling curd.",
        "remedy": "5% Neemastram or 3% Panchagavya spray; avoid excessive dense row spacing to allow wind passage.",
        "climate": "Humid monsoon weather with cool nights and cloudy days in central cotton belt."
    },
    {
        "crop": "🧵 Cotton",
        "name": "Alternaria Leaf Spot",
        "pathogen": "Alternaria macrospora • Fungal",
        "indicators": "Concentric target-board rings of dark brown necrotic spots on leaves and bracts, leading to premature leaf shedding.",
        "remedy": "Prophylactic foliar spray of Trichoderma viride (10g/L) + fermented Jeevamrutham (200L/acre via irrigation).",
        "climate": "Intermittent rain showers followed by bright sunshine and potassium deficit."
    },
    {
        "crop": "🧵 Cotton",
        "name": "Fusarium Wilt",
        "pathogen": "Fusarium oxysporum f. sp. vasinfectum • Fungal (Soil-borne)",
        "indicators": "Yellowing and browning along leaf margins; leaves drop from base upwards. Characteristic dark brown vascular ring discoloration inside stem.",
        "remedy": "Soil drenching around root zone with Trichoderma enriched neem cake (250kg/acre); intercrop with cowpea or pigeonpea.",
        "climate": "Acidic to neutral black cotton soils, nematode wounding."
    },
    {
        "crop": "🧵 Cotton",
        "name": "Verticillium Wilt",
        "pathogen": "Verticillium dahliae • Fungal (Soil-borne)",
        "indicators": "Mottled yellow tiger-stripe pattern between veins on leaves; sudden wilting and defoliation during boll maturation.",
        "remedy": "Deep summer solarization; apply Trichoderma harzianum + Pseudomonas fluorescens consortium in root zone.",
        "climate": "Alkaline soils with moderate temperatures (20-25°C)."
    },
    {
        "crop": "🧵 Cotton",
        "name": "Cotton Anthracnose",
        "pathogen": "Colletotrichum gossypii • Fungal",
        "indicators": "Small round reddish-brown spots on seedling leaves and stems; sunken circular lesions on maturing bolls causing lint staining.",
        "remedy": "Seed biopriming with Beejamritham + 5% Neem Seed Kernel Extract foliar spray at boll formation.",
        "climate": "Continuous overcast skies and prolonged drizzling rains."
    },
    {
        "crop": "🧵 Cotton",
        "name": "Root Rot of Cotton",
        "pathogen": "Rhizoctonia bataticola (Macrophomina phaseolina) • Fungal",
        "indicators": "Entire plant suddenly wilts with dried leaves adhering to twigs; root bark shreds with dark sclerotial bodies underneath.",
        "remedy": "Neem cake application (150kg/acre) + intercropping with moth bean or clusterbean; Trichoderma soil inoculation.",
        "climate": "High soil temperatures (35-39°C) and transient drought stress."
    },
    {
        "crop": "🧵 Cotton",
        "name": "Cotton Leaf Curl Virus (CLCuV)",
        "pathogen": "Begomovirus • Viral Complex (Vector: Whitefly Bemisia tabaci)",
        "indicators": "Upward or downward curling of leaf margins, thickened dark green veins, and small enations (cup-like leaf outgrowths) on leaf underside.",
        "remedy": "Install 40 yellow sticky traps/acre; spray Agniastram or 5% NSKE at sunrise to control whitefly vector colonies.",
        "climate": "Hot dry winds, high whitefly multiplier in Malwa cotton corridor."
    },

    # 🍬 Sugarcane (26-33)
    {
        "crop": "🍬 Sugarcane",
        "name": "Red Rot",
        "pathogen": "Colletotrichum falcatum • Fungal",
        "indicators": "Third or fourth leaf from top shows yellowing; split stem shows blood-red internal tissues with characteristic white cross-patches.",
        "remedy": "Select disease-free setts treated in hot water (50°C for 2 hours) + dip in Trichoderma harzianum; practice 2-year crop rotation.",
        "climate": "Waterlogging during grand growth period, susceptible varieties (e.g. Co-0238)."
    },
    {
        "crop": "🍬 Sugarcane",
        "name": "Sugarcane Smut",
        "pathogen": "Sporisorium scitamineum • Fungal",
        "indicators": "Emergence of long, curved, black whip-like pencil structures from apical spindle surrounded by silver-gray membrane.",
        "remedy": "Rogue out infected whips inside polythene bags and burn; soak setts in Beejamritham + Trichoderma viride.",
        "climate": "Dry weather followed by sudden irrigation or rain; ratoon crops."
    },
    {
        "crop": "🍬 Sugarcane",
        "name": "Grassy Shoot Disease (GSD)",
        "pathogen": "Candidatus Phytoplasma • Phytoplasma (Vector: Aphids)",
        "indicators": "Profuse tillering of thin, stunted, pale yellow to papery white shoots at cane base, giving bush-like or grassy appearance; no millable cane.",
        "remedy": "Thermal sett treatment (aerated steam 54°C for 1 hr); spray Neemastram to manage aphid vectors.",
        "climate": "Ratoon crops cultivated with infected seed cane."
    },
    {
        "crop": "🍬 Sugarcane",
        "name": "Pokkah Boeng",
        "pathogen": "Fusarium moniliforme (Gibberella fujikuroi) • Fungal",
        "indicators": "Chlorotic wrinkling and crinkling of leaf base near spindle; ladder-like red cuts inside stem tissues.",
        "remedy": "Foliar spray of Pseudomonas fluorescens (1kg/acre) + Panchagavya (3%) during monsoon onset.",
        "climate": "Sudden onset of monsoon following high summer temperatures."
    },
    {
        "crop": "🍬 Sugarcane",
        "name": "Sett Rot / Pineapple Disease",
        "pathogen": "Ceratocystis paradoxa • Fungal",
        "indicators": "Planted cane setts fail to germinate; rotting sett pulp turns soot-black and emits a distinctive overripe pineapple aroma.",
        "remedy": "Dip setts in Trichoderma viride suspension (10g/L) for 15 minutes before furrow planting; ensure proper field drainage.",
        "climate": "Heavy poorly-drained cold soils with standing furrow moisture."
    },
    {
        "crop": "🍬 Sugarcane",
        "name": "Sugarcane Wilt",
        "pathogen": "Cephalosporium sacchari • Fungal",
        "indicators": "Gradual withering of crown leaves; internal pith turns purple-red or dirty brown with hollow boat-shaped cavities.",
        "remedy": "Crop rotation with paddy or sunnhemp; avoid root borers and apply enriched FYM with Trichoderma.",
        "climate": "Water stress during summer followed by water stagnation in monsoon."
    },
    {
        "crop": "🍬 Sugarcane",
        "name": "Sugarcane Rust",
        "pathogen": "Puccinia melanocephala • Fungal",
        "indicators": "Small, elongated yellowish spots on both surfaces, turning into reddish-brown raised pustules releasing powdery urediniospores.",
        "remedy": "Sour buttermilk (10%) + fermented Jeevamrutham foliar spray; de-trash lower dried leaves.",
        "climate": "Cool humid nights (18-22°C) with persistent foliar moisture."
    },
    {
        "crop": "🍬 Sugarcane",
        "name": "Ratoon Stunting Disease (RSD)",
        "pathogen": "Leifsonia xyli subsp. xyli • Bacterial (Vascular)",
        "indicators": "Stunted tillers and thin stalks in ratoon crops; pinkish-orange discoloration of vascular bundles at nodal junctions.",
        "remedy": "Disinfect harvesting sickles with 20% cow dung-lime solution; hot water treatment of seed cane (50°C for 2.5 hours).",
        "climate": "Mechanized multi-ratooning without cutting blade sanitation."
    },

    # 🍌 Banana (34-41)
    {
        "crop": "🍌 Banana",
        "name": "Black Sigatoka",
        "pathogen": "Pseudocercospora fijiensis • Fungal",
        "indicators": "Narrow rusty-brown to pitch-black streaks running parallel to leaf veins, coalescing into extensive necrotic foliar burn.",
        "remedy": "Foliar spray of 5% Neem oil + fermented sour buttermilk-hing solution (500ml/10L water); prune severely scorched leaves.",
        "climate": "Canopy humidity >80%, temperatures 26-30°C, dense banana orchards."
    },
    {
        "crop": "🍌 Banana",
        "name": "Yellow Sigatoka",
        "pathogen": "Pseudocercospora musae • Fungal",
        "indicators": "Pale yellow-green spindle streaks with bright yellow chlorotic halo borders; centers dry into light gray with dark brown margin.",
        "remedy": "3% Panchagavya foliar spray + Pseudomonas fluorescens (10g/L) to preserve functional leaf area.",
        "climate": "Tropical rainy season with intermittent sunny spells."
    },
    {
        "crop": "🍌 Banana",
        "name": "Panama Wilt (Fusarium TR4)",
        "pathogen": "Fusarium oxysporum f. sp. cubense Tropical Race 4 • Fungal",
        "indicators": "Yellowing of oldest lower leaves along leaf margins; leaf petioles buckle at pseudostem junction creating skirt of dead leaves; internal vascular brown ring.",
        "remedy": "Strict quarantine; root drenching with Trichoderma asperellum + Pseudomonas fluorescens; incorporate castor cake (250g/plant).",
        "climate": "Acidic sandy soils, flood irrigation spreading chlamydospores."
    },
    {
        "crop": "🍌 Banana",
        "name": "Banana Bunchy Top Virus (BBTV)",
        "pathogen": "Babuvirus • Viral Complex (Vector: Banana Aphid Pentalonia nigronervosa)",
        "indicators": "Leaves bunched into rosette-like crown at top; dark green 'Morse code' hook-like dot-dash streaks on veins and petioles.",
        "remedy": "Inject 4ml of 10% Hing-Neem oil solution into pseudostem to eradicate aphid vector; uproot and burn infected mats immediately.",
        "climate": "Continuous shaded sucker propagation without virus indexing."
    },
    {
        "crop": "🍌 Banana",
        "name": "Banana Anthracnose",
        "pathogen": "Colletotrichum musae • Fungal",
        "indicators": "Sunken circular dark brown spots on peel of ripening banana fruits, producing salmon-pink gelatinous spore masses under humidity.",
        "remedy": "Pre-harvest bunch spray of 3% Panchagavya + bagging bunches with perforated polypropylene or muslin cloth.",
        "climate": "Warm humid microclimate inside unbagged banana canopy."
    },
    {
        "crop": "🍌 Banana",
        "name": "Cordana Leaf Spot",
        "pathogen": "Cordana musae • Fungal",
        "indicators": "Large oval to zigzag necrotic lesions with prominent bright yellow bands and concentric zoning along leaf lamina margins.",
        "remedy": "Maintain wide planting spacing (2.1m x 2.1m); spray 5% Neem Seed Kernel Extract.",
        "climate": "Canopy shade and morning dew retention on leaf edges."
    },
    {
        "crop": "🍌 Banana",
        "name": "Moko Disease / Bacterial Wilt",
        "pathogen": "Ralstonia solanacearum Race 2 • Bacterial",
        "indicators": "Yellowing and wilting of inner young leaves; pseudostem vascular bundles show brown-black ooze; fruit pulp decays into brown dry rot.",
        "remedy": "Sterilize machetes between plants with 10% sodium hypochlorite or lime-cow dung slurry; rogue infected clumps.",
        "climate": "Transmission by foraging stingless bees, wasps, and contaminated tools."
    },
    {
        "crop": "🍌 Banana",
        "name": "Cigar End Rot",
        "pathogen": "Verticillium theobromae • Fungal",
        "indicators": "Dry, powdery black rot beginning at the flower tip of developing finger fruits, resembling the burnt end of a cigar ash.",
        "remedy": "Remove dried perianth floral remnants by hand 10 days after bunch emergence; spray 5% Neemastram.",
        "climate": "Prolonged overcast rainy spells during fruit set."
    },

    # 🥭 Mango (42-49)
    {
        "crop": "🥭 Mango",
        "name": "Mango Anthracnose",
        "pathogen": "Colletotrichum gloeosporioides • Fungal",
        "indicators": "Angular dark brown to black spots on tender leaves; blossom blight causing flower drop; tear-stain black streaks on maturing fruits.",
        "remedy": "Pre-bloom spray of fermented cow urine (10%) + Pseudomonas fluorescens (1kg/100L); prune dead crossing twigs.",
        "climate": "Unseasonal rains and cloudy humidity during flowering and fruit setting."
    },
    {
        "crop": "🥭 Mango",
        "name": "Mango Powdery Mildew",
        "pathogen": "Oidium mangiferae • Fungal",
        "indicators": "White superficial powdery fungal coating on inflorescence rachis, flowers, and tender fruitlets; affected florets turn brown and drop.",
        "remedy": "Brahmastram or 10% Sour Buttermilk spray containing 5g Hing per 10L water before flower buds open.",
        "climate": "Cool nights (10-14°C) and warm days (27-31°C) with morning dew during flowering (Dec-Feb)."
    },
    {
        "crop": "🥭 Mango",
        "name": "Mango Dieback",
        "pathogen": "Lasiodiplodia theobromae • Fungal",
        "indicators": "Drying and withering of twigs from top downwards; leaves turn brown and roll upwards while remaining attached; dark vascular discoloration in wood.",
        "remedy": "Prune dead twigs 7cm below green healthy margin; paint cut ends with cow dung-turmeric paste or Bordeaux equivalent.",
        "climate": "Post-monsoon summer stress, stem borer tunnels."
    },
    {
        "crop": "🥭 Mango",
        "name": "Phoma Blight",
        "pathogen": "Phoma glomerata • Fungal",
        "indicators": "Minute circular yellowish spots on old leaves, expanding into large irregular brown lesions with concentric gray rings and black pycnidia.",
        "remedy": "Panchagavya (3%) foliar spray + soil application of Trichoderma viride enriched farmyard manure.",
        "climate": "Dense unpruned mango orchards with poor sun penetration."
    },
    {
        "crop": "🥭 Mango",
        "name": "Mango Malformation",
        "pathogen": "Fusarium mangiferae • Fungal (Vector: Mango Bud Mite)",
        "indicators": "Floral malformation transforms panicles into compact, cauliflower-like crowded bunches with aborted flowers; vegetative bunchy top on shoots.",
        "remedy": "Prune malformed panicles along with 3 nodes of healthy wood; spray Agniastram at bud burst to suppress Aceria mangiferae mites.",
        "climate": "Vegetative propagation from uncertified infected scion orchards."
    },
    {
        "crop": "🥭 Mango",
        "name": "Bacterial Canker",
        "pathogen": "Xanthomonas campestris pv. mangiferaeindicae • Bacterial",
        "indicators": "Water-soaked dark angular spots on leaves surrounded by chlorotic yellow halos; star-shaped canker cracks on fruits with gummy brown exudate.",
        "remedy": "Spray 10% Sour Buttermilk + 5% cow dung filtrate; avoid fruit bruising during harvest.",
        "climate": "High wind storms, fruit-fly punctures, monsoon showers."
    },
    {
        "crop": "🥭 Mango",
        "name": "Red Rust / Algal Spot",
        "pathogen": "Cephaleuros virescens • Parasitic Alga",
        "indicators": "Circular rusty-red to orange velvety cushions on upper leaf lamina; leaf bark cracks and peels on severe branch infestation.",
        "remedy": "Apply 3% Panchagavya + improve tree canopy sunlight by center thinning; apply Jeevamrutham to boost tree immunity.",
        "climate": "High humidity, shaded poorly-aerated orchards in coastal tropical belts."
    },
    {
        "crop": "🥭 Mango",
        "name": "Sooty Mould",
        "pathogen": "Capnodium mangiferae • Fungal (Saprophytic on Honeydew)",
        "indicators": "Thick, black, velvety crust covering entire leaf lamina and twigs; peels off in flakes; blocks photosynthetic solar capture.",
        "remedy": "Spray starch paste (boiled 1kg maida/rice starch in 100L water) to flake off crust + Neemastram to eradicate honeydew-secreting leafhoppers.",
        "climate": "Severe mango hopper or scale insect infestation."
    },

    # 🌶️ Chilli (50-57)
    {
        "crop": "🌶️ Chilli",
        "name": "Anthracnose / Die Back & Fruit Rot",
        "pathogen": "Colletotrichum capsici • Fungal",
        "indicators": "Die-back of tender shoots from tip downwards; circular sunken water-soaked spots on ripe red fruits with concentric rings of black acervuli.",
        "remedy": "Seed treatment with Beejamritham + foliar spray of 5% Neem Seed Kernel Extract + Trichoderma viride (10g/L) at flowering.",
        "climate": "Night humidity >85%, temperatures 28°C, overhead sprinkling."
    },
    {
        "crop": "🌶️ Chilli",
        "name": "Powdery Mildew of Chilli",
        "pathogen": "Leveillula taurica • Fungal",
        "indicators": "White powdery fungal growth predominantly on lower leaf surface with corresponding chlorotic yellow patches on upper surface; severe defoliation.",
        "remedy": "Fermented sour buttermilk (500ml/10L water) + 5g Hing; spray before noon to inhibit conidial germ tubes.",
        "climate": "Warm dry days with humid nights (Dec-March)."
    },
    {
        "crop": "🌶️ Chilli",
        "name": "Bacterial Leaf Spot",
        "pathogen": "Xanthomonas campestris pv. vesicatoria • Bacterial",
        "indicators": "Small, dark, circular to irregular water-soaked spots with pale margins on foliage; raised rough scab-like lesions on green pods.",
        "remedy": "Foliar spray of 5% cow dung filtrate + fermented butter milk. Disinfect seed with hot water (50°C for 25 mins).",
        "climate": "Warm rainy weather (24-30°C) with splash dispersal."
    },
    {
        "crop": "🌶️ Chilli",
        "name": "Chilli Leaf Curl Virus (ChiLCV)",
        "pathogen": "Begomovirus • Viral Complex (Vector: Whitefly Bemisia tabaci)",
        "indicators": "Upward curling and puckering of leaves, shortened internodes, extreme dwarfing, dark green thickened foliar veins, aborted flowers.",
        "remedy": "Install 30 yellow sticky traps/acre; spray Agniastram (500ml/100L) or Dashaparni Kashayam at 10-day intervals.",
        "climate": "Hot dry spells accelerating whitefly populations."
    },
    {
        "crop": "🌶️ Chilli",
        "name": "Cercospora Leaf Spot / Frog Eye",
        "pathogen": "Cercospora capsici • Fungal",
        "indicators": "Circular lesions with distinct ash-gray center and prominent dark brown border resembling a frog's eye.",
        "remedy": "3% Panchagavya foliar spray + soil drenching with Jeevamrutham to restore foliar micronutrient vigor.",
        "climate": "Alternating wet and warm dry days."
    },
    {
        "crop": "🌶️ Chilli",
        "name": "Phytophthora Root & Fruit Rot",
        "pathogen": "Phytophthora capsici • Oomycete (Soil-borne)",
        "indicators": "Sudden irreversible wilting without foliar yellowing; black water-soaked lesions at stem collar zone; fruits shrivel into straw-colored mummies.",
        "remedy": "Plant seedlings on raised ridges; drench root zone with Trichoderma harzianum (2.5kg/acre enriched in FYM); improve drainage.",
        "climate": "Monsoon water stagnation in heavy clay soils."
    },
    {
        "crop": "🌶️ Chilli",
        "name": "Choanephora Wet Rot",
        "pathogen": "Choanephora cucurbitarum • Fungal",
        "indicators": "Wet rot of dying blossoms, leaves, and young twigs; affected tissues covered with stiff silvery-white pinhead fungal whiskers.",
        "remedy": "Avoid excessive vegetative canopy; foliar spray of Trichoderma viride + fermented cow dung slurry.",
        "climate": "High humidity (>90%) with prolonged heavy monsoonal rain."
    },
    {
        "crop": "🌶️ Chilli",
        "name": "Damping Off of Seedlings",
        "pathogen": "Pythium aphanidermatum • Oomycete (Nursery)",
        "indicators": "Seedlings topple over at soil line due to water-soaked constriction of hypocotyl; entire nursery patches collapse within 48 hours.",
        "remedy": "Solarize nursery beds under 200-gauge transparent polythene for 3 weeks; treat seeds with Beejamritham + Trichoderma (10g/kg).",
        "climate": "Overcrowded seedbeds, excess nursery watering, poorly-drained soil."
    },

    # 🌱 Pulses (Chickpea, Pigeonpea, Blackgram, Greengram) (58-70)
    {
        "crop": "🌱 Pulses",
        "name": "Chickpea Ascochyta Blight",
        "pathogen": "Ascochyta rabiei • Fungal",
        "indicators": "Circular to elongated brown necrotic lesions on leaves and pods containing concentric rings of minute black pycnidia; stems snap.",
        "remedy": "Seed treatment with Trichoderma viride (10g/kg seed); spray 5% Neem Seed Kernel Extract; destroy pulse stubble.",
        "climate": "Cool (15-20°C) cloudy weather with frequent winter rains in Northern India."
    },
    {
        "crop": "🌱 Pulses",
        "name": "Chickpea Fusarium Wilt",
        "pathogen": "Fusarium oxysporum f. sp. ciceris • Fungal (Soil-borne)",
        "indicators": "Drooping of upper petioles and leaflets within 3 weeks of sowing; dark brown to black longitudinal xylem vascular band when stem is split.",
        "remedy": "Deep summer plowing; seed treatment with Beejamritham; intercrop chickpea with linseed or mustard; apply Trichoderma.",
        "climate": "Warm soil temperatures (>25°C) at sowing time."
    },
    {
        "crop": "🌱 Pulses",
        "name": "Pigeonpea Phytophthora Blight",
        "pathogen": "Phytophthora cajani • Oomycete (Soil-borne)",
        "indicators": "Circular purple-brown lesions on leaves; brown to black girdling cankers on main stem causing wind breakage; sudden wilting.",
        "remedy": "Ridge planting with wide furrows; drench collar with Trichoderma harzianum; avoid sowing in waterlogged fields.",
        "climate": "Excess monsoonal rainfall in July-August, stagnant field water."
    },
    {
        "crop": "🌱 Pulses",
        "name": "Pigeonpea Sterility Mosaic Disease (SMD)",
        "pathogen": "Emaravirus (SMV) • Viral Complex (Vector: Eriophyid Mite)",
        "indicators": "Bushy appearance due to stunted growth and excessive secondary branching; leaves small with light green and dark green mosaic; complete absence of flowers.",
        "remedy": "Spray Agniastram or Neem oil (3%) to eradicate Aceria cajani mite vectors during early vegetative stage.",
        "climate": "Shaded boundaries, perennial volunteer pigeonpea plants."
    },
    {
        "crop": "🌱 Pulses",
        "name": "Mungbean Yellow Mosaic Virus (MYMV)",
        "pathogen": "Begomovirus • Viral Complex (Vector: Whitefly Bemisia tabaci)",
        "indicators": "Bright yellow patches interspersed with green on leaves, expanding to completely golden yellow lamina; stunted pods with shriveled seeds.",
        "remedy": "Erect 35 yellow sticky traps/acre; foliar spray of Agniastram (500ml/100L) or 5% NSKE at 15-day intervals.",
        "climate": "High summer temperature and dry weather boosting whitefly vectors."
    },
    {
        "crop": "🌱 Pulses",
        "name": "Dry Root Rot of Pulses",
        "pathogen": "Rhizoctonia bataticola (Macrophomina phaseolina) • Fungal",
        "indicators": "Foliage turns dull green and droops during pod filling; taproot becomes brittle and black with shredded bark full of minute dark sclerotia.",
        "remedy": "Apply neem cake (150kg/acre); seed treatment with Trichoderma viride; maintain soil moisture through light irrigation during podding.",
        "climate": "Post-flowering drought stress combined with high temperatures (>32°C)."
    },
    {
        "crop": "🌱 Pulses",
        "name": "Pulse Powdery Mildew",
        "pathogen": "Erysiphe polygoni • Fungal",
        "indicators": "Faint white powdery patches on both leaf surfaces, petioles, and pods, turning grayish-brown; infected leaves turn yellow and drop prematurely.",
        "remedy": "Spray 10% Sour Buttermilk + 5% garlic-chilli extract (Brahmastram); apply at first symptom sighting.",
        "climate": "Late winter dry conditions with warm daytime temperatures."
    },
    {
        "crop": "🌱 Pulses",
        "name": "Pulse Anthracnose",
        "pathogen": "Colletotrichum lindemuthianum • Fungal",
        "indicators": "Dark brown sunken eye-shaped lesions along vein junctions on leaf undersides; circular spots on pods with dark red-brown borders.",
        "remedy": "Seed coating with Beejamritham; spray 5% Neemastram + Pseudomonas fluorescens (1kg/acre).",
        "climate": "Cool moist weather (16-24°C) with persistent fog or rain."
    },
    {
        "crop": "🌱 Pulses",
        "name": "Pulse Cercospora Leaf Spot",
        "pathogen": "Cercospora cruenta • Fungal",
        "indicators": "Circular to angular reddish-brown necrotic spots with grayish centers on foliage; premature leaf shedding reduces pod count.",
        "remedy": "Panchagavya (3%) foliar spray + fermented Jeevamrutham application to replenish soil rhizobium activity.",
        "climate": "Warm humid monsoonal days with evening rain."
    },
    {
        "crop": "🌱 Pulses",
        "name": "Pigeonpea Fusarium Wilt",
        "pathogen": "Fusarium udum • Fungal (Soil-borne)",
        "indicators": "Slow wilting of branches starting from one side; dark purple-black band extending upward from base on stem bark; vascular xylem blackened.",
        "remedy": "Crop rotation with sorghum or tobacco; intercropping with Crotalaria (Sunnhemp); soil application of Trichoderma viride.",
        "climate": "Continuous monocropping in black cotton soils."
    },
    {
        "crop": "🌱 Pulses",
        "name": "Chickpea Collar Rot",
        "pathogen": "Sclerotium rolfsii • Fungal (Soil-borne)",
        "indicators": "Seedling collar at soil line turns dark brown and rots; white cottony mycelial fan covers stem base studded with mustard-seed-like sclerotia.",
        "remedy": "Deep plowing to bury surface plant residues; drench collar zone with Trichoderma harzianum in cow urine.",
        "climate": "High soil moisture combined with warm temperatures (28-32°C) at sowing."
    },
    {
        "crop": "🌱 Pulses",
        "name": "Chickpea Botrytis Grey Mould",
        "pathogen": "Botrytis cinerea • Fungal",
        "indicators": "Water-soaked lesions on stems, leaves, and flowers covered with fluffy gray mould spore masses; tender branches snap easily.",
        "remedy": "Wider row spacing (45cm) to ensure canopy aeration; spray fermented sour buttermilk (10%) + Hing.",
        "climate": "Dense canopy, cool overcast conditions (18-22°C), high relative humidity."
    },
    {
        "crop": "🌱 Pulses",
        "name": "Blackgram Rust",
        "pathogen": "Uromyces appendiculatus • Fungal",
        "indicators": "Small circular reddish-brown powdery pustules on leaf underside; leaves turn chlorotic, dry up, and shed before pod maturity.",
        "remedy": "Foliar spray of 10% Cow urine filtrate + 5% Agniastram; de-weed volunteer legume hosts.",
        "climate": "High humidity (>80%) and moderate temperatures (21-27°C)."
    }
]

# ==============================================================================
# 2. INTERACTIVE SPLIT-STUDIO LEAF INSPECTION SUITE (SPEC 2)
# ==============================================================================
def render_split_studio_leaf_inspection(img_data_uri, specimen_name="Field Specimen"):
    """
    Renders an interactive embedded HTML5/JS tactile Split-Comparison slider.
    Features:
    - View-switcher pills: 🎚️ Split Slider, 🌡️ Thermal Map, 🎯 Lesion Hotspots, 📷 Raw Input
    - Smooth tactile vertical drag handle
    - High-contrast synthesized JET / infrared pathology heatmap
    - Lesion hotspot crosshairs with coordinates and severity
    """
    if not img_data_uri:
        # Standby futuristic placeholder
        placeholder_html = """
        <div style="
            background: linear-gradient(145deg, #082117 0%, #041710 100%);
            border: 1.5px dashed rgba(52, 211, 153, 0.4);
            border-radius: 18px;
            height: 380px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5);
            text-align: center;
            padding: 24px;
        ">
            <div style="
                width: 64px;
                height: 64px;
                border-radius: 50%;
                background: rgba(16, 185, 129, 0.15);
                border: 1px solid rgba(52, 211, 153, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                margin-bottom: 14px;
                animation: leafFloat 3s ease-in-out infinite;
            ">🌱</div>
            <b style="color: #a7f3d0; font-size: 16px; letter-spacing: 0.5px;">AWAITING FOLIAR SPECIMEN</b>
            <p style="color: #6ee7b7; font-size: 13px; max-width: 320px; margin-top: 6px; line-height: 1.5;">
                Upload a leaf photo, take a camera snap, or select an ICAR benchmark sample to activate the <b>Multimodal Split-Studio</b>.
            </p>
            <span style="
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
                background: rgba(52, 211, 153, 0.12);
                border: 1px solid rgba(52, 211, 153, 0.3);
                padding: 4px 12px;
                border-radius: 20px;
                color: #34d399;
                margin-top: 8px;
            ">
                STANDBY • SPLIT-STUDIO HUD READY
            </span>
        </div>
        """
        components.html(placeholder_html, height=400)
        return

    safe_name = json.dumps(specimen_name)
    safe_img = json.dumps(img_data_uri)

    html_code = f"""
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8" />
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
        
        * {{
            box-sizing: border-box;
            user-select: none;
            -webkit-user-select: none;
            margin: 0;
            padding: 0;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }}

        body {{
            background: transparent;
            color: #ecfdf5;
            overflow: hidden;
        }}

        .studio-container {{
            background: linear-gradient(145deg, #082117 0%, #041710 100%);
            border: 1px solid rgba(52, 211, 153, 0.35);
            border-radius: 16px;
            box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.6);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
        }}

        /* View-Switcher Pills */
        .pill-bar {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 12px;
            background: rgba(4, 23, 16, 0.85);
            border-bottom: 1px solid rgba(52, 211, 153, 0.25);
            gap: 6px;
            flex-wrap: wrap;
        }}

        .pill-group {{
            display: flex;
            gap: 6px;
            background: rgba(2, 14, 9, 0.6);
            padding: 3px;
            border-radius: 10px;
            border: 1px solid rgba(52, 211, 153, 0.2);
        }}

        .pill-btn {{
            background: transparent;
            border: none;
            color: #a7f3d0;
            font-size: 11.5px;
            font-weight: 700;
            padding: 5px 12px;
            border-radius: 7px;
            cursor: pointer;
            transition: all 0.2s ease;
        }}

        .pill-btn.active {{
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: #ffffff;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
        }}

        .studio-badge {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 10.5px;
            color: #34d399;
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid rgba(52, 211, 153, 0.3);
            padding: 3px 8px;
            border-radius: 6px;
            letter-spacing: 0.5px;
        }}

        /* Specimen Viewport */
        .viewport {{
            position: relative;
            width: 100%;
            height: 330px;
            background: #020b06;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: ew-resize;
        }}

        .img-base {{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
            pointer-events: none;
        }}

        .overlay-thermal-wrap {{
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 50%;
            overflow: hidden;
            pointer-events: none;
            border-left: 2px solid #34d399;
            box-shadow: -4px 0 16px rgba(16, 185, 129, 0.4);
        }}

        .img-thermal {{
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            object-fit: contain;
            /* Synthesized High-Contrast JET Thermal Infrared Pathology Filter */
            filter: contrast(240%) hue-rotate(185deg) saturate(340%) invert(18%);
        }}

        /* Vertical Drag Handle */
        .slider-handle {{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            width: 32px;
            margin-left: -16px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: ew-resize;
            z-index: 20;
            pointer-events: auto;
        }}

        .handle-knob {{
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: linear-gradient(135deg, #34d399 0%, #059669 100%);
            border: 2px solid #ffffff;
            box-shadow: 0 0 14px rgba(52, 211, 153, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 11px;
            font-weight: 800;
        }}

        /* Floating Studio Labels */
        .floating-label {{
            position: absolute;
            bottom: 10px;
            padding: 3px 8px;
            border-radius: 6px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            font-weight: 700;
            z-index: 15;
            pointer-events: none;
            backdrop-filter: blur(8px);
        }}
        .label-left {{
            left: 10px;
            background: rgba(2, 15, 9, 0.75);
            color: #a7f3d0;
            border: 1px solid rgba(52, 211, 153, 0.35);
        }}
        .label-right {{
            right: 10px;
            background: rgba(45, 10, 10, 0.75);
            color: #fca5a5;
            border: 1px solid rgba(239, 68, 68, 0.4);
        }}

        /* Hotspot Reticles */
        .hotspot-reticle {{
            position: absolute;
            width: 38px;
            height: 38px;
            margin-left: -19px;
            margin-top: -19px;
            border-radius: 50%;
            border: 1.5px solid #ef4444;
            display: none;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            z-index: 18;
            animation: reticlePulse 1.8s infinite ease-out;
        }}
        @keyframes reticlePulse {{
            0% {{ transform: scale(0.85); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }}
            70% {{ transform: scale(1.15); box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }}
            100% {{ transform: scale(0.85); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }}
        }}
        .hotspot-tag {{
            position: absolute;
            top: 40px;
            left: -20px;
            white-space: nowrap;
            background: rgba(239, 68, 68, 0.9);
            color: #ffffff;
            font-family: 'JetBrains Mono', monospace;
            font-size: 9px;
            font-weight: 800;
            padding: 2px 6px;
            border-radius: 4px;
        }}

        /* Temperature Legend Bar (Thermal View) */
        .temp-legend {{
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            display: none;
            background: rgba(3, 18, 12, 0.85);
            border: 1px solid rgba(52, 211, 153, 0.35);
            padding: 4px 12px;
            border-radius: 20px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            color: #e2f8eb;
            z-index: 25;
            backdrop-filter: blur(8px);
        }}
    </style>
    </head>
    <body>

    <div class="studio-container" id="studio">
        <!-- View-Switcher Bar -->
        <div class="pill-bar">
            <div class="pill-group">
                <button class="pill-btn active" id="btnSplit" onclick="setStudioMode('split')">🎚️ Split Slider</button>
                <button class="pill-btn" id="btnThermal" onclick="setStudioMode('thermal')">🌡️ Thermal Map</button>
                <button class="pill-btn" id="btnHotspots" onclick="setStudioMode('hotspots')">🎯 Lesion Hotspots</button>
                <button class="pill-btn" id="btnRaw" onclick="setStudioMode('raw')">📷 Raw Input</button>
            </div>
            <span class="studio-badge" id="modeBadge">SPLIT COMPARISON • 50%</span>
        </div>

        <!-- Specimen Viewport -->
        <div class="viewport" id="viewport">
            <!-- Base Raw Image -->
            <img src={safe_img} class="img-base" id="imgBase" alt="Raw Foliage" />

            <!-- Thermal Overlay Clip -->
            <div class="overlay-thermal-wrap" id="thermalWrap">
                <img src={safe_img} class="img-thermal" id="imgThermal" alt="Thermal Heatmap" />
            </div>

            <!-- Vertical Draggable Divider Handle -->
            <div class="slider-handle" id="sliderHandle">
                <div class="handle-knob">⬌</div>
            </div>

            <!-- Hotspot Overlays -->
            <div class="hotspot-reticle" id="hs1" style="top: 40%; left: 45%;">
                <div class="hotspot-tag">LESION #1 • 94.2%</div>
            </div>
            <div class="hotspot-reticle" id="hs2" style="top: 60%; left: 62%;">
                <div class="hotspot-tag">CHLOROSIS #2 • 88.6%</div>
            </div>
            <div class="hotspot-reticle" id="hs3" style="top: 32%; left: 70%;">
                <div class="hotspot-tag">SPORE HALO #3 • 91.5%</div>
            </div>

            <!-- Floating Viewport Badges -->
            <div class="floating-label label-left" id="lblLeft">RAW SPECIMEN</div>
            <div class="floating-label label-right" id="lblRight">AI THERMAL [JET]</div>

            <!-- Temperature Legend for Thermal View -->
            <div class="temp-legend" id="tempLegend">
                🔴 38°C Acute Necrosis &nbsp;|&nbsp; 🟡 32°C Chlorosis &nbsp;|&nbsp; 🟢 25°C Healthy &nbsp;|&nbsp; 🔵 20°C Cooling
            </div>
        </div>
    </div>

    <script>
    var currentMode = 'split';
    var isDragging = false;
    var splitPct = 50;

    var viewport = document.getElementById('viewport');
    var thermalWrap = document.getElementById('thermalWrap');
    var sliderHandle = document.getElementById('sliderHandle');
    var imgBase = document.getElementById('imgBase');
    var imgThermal = document.getElementById('imgThermal');
    var modeBadge = document.getElementById('modeBadge');
    var tempLegend = document.getElementById('tempLegend');
    var lblLeft = document.getElementById('lblLeft');
    var lblRight = document.getElementById('lblRight');
    var hs1 = document.getElementById('hs1');
    var hs2 = document.getElementById('hs2');
    var hs3 = document.getElementById('hs3');

    // Keep thermal image width strictly synchronized with base image
    function syncImageWidth() {{
        var w = viewport.clientWidth;
        imgThermal.style.width = w + 'px';
    }}
    window.addEventListener('resize', syncImageWidth);
    syncImageWidth();

    function updateSliderPosition(clientX) {{
        var rect = viewport.getBoundingClientRect();
        var x = clientX - rect.left;
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        
        splitPct = Math.round((x / rect.width) * 100);
        var rightPct = 100 - splitPct;
        
        thermalWrap.style.width = rightPct + '%';
        sliderHandle.style.left = splitPct + '%';
        modeBadge.innerText = 'SPLIT COMPARISON • ' + splitPct + '%';
    }}

    viewport.addEventListener('mousedown', function(e) {{
        if (currentMode !== 'split') return;
        isDragging = true;
        updateSliderPosition(e.clientX);
    }});
    window.addEventListener('mousemove', function(e) {{
        if (!isDragging || currentMode !== 'split') return;
        updateSliderPosition(e.clientX);
    }});
    window.addEventListener('mouseup', function() {{
        isDragging = false;
    }});

    // Mobile touch events
    viewport.addEventListener('touchstart', function(e) {{
        if (currentMode !== 'split') return;
        isDragging = true;
        updateSliderPosition(e.touches[0].clientX);
    }}, {{ passive: true }});
    window.addEventListener('touchmove', function(e) {{
        if (!isDragging || currentMode !== 'split') return;
        updateSliderPosition(e.touches[0].clientX);
    }}, {{ passive: true }});
    window.addEventListener('touchend', function() {{
        isDragging = false;
    }});

    function setStudioMode(mode) {{
        currentMode = mode;
        ['btnSplit', 'btnThermal', 'btnHotspots', 'btnRaw'].forEach(function(id) {{
            document.getElementById(id).classList.remove('active');
        }});

        // Hide all extra overlays by default
        hs1.style.display = 'none';
        hs2.style.display = 'none';
        hs3.style.display = 'none';
        tempLegend.style.display = 'none';

        if (mode === 'split') {{
            document.getElementById('btnSplit').classList.add('active');
            sliderHandle.style.display = 'flex';
            thermalWrap.style.display = 'block';
            thermalWrap.style.width = (100 - splitPct) + '%';
            sliderHandle.style.left = splitPct + '%';
            lblLeft.style.display = 'block';
            lblRight.style.display = 'block';
            modeBadge.innerText = 'SPLIT COMPARISON • ' + splitPct + '%';
            syncImageWidth();
        }} else if (mode === 'thermal') {{
            document.getElementById('btnThermal').classList.add('active');
            sliderHandle.style.display = 'none';
            thermalWrap.style.display = 'block';
            thermalWrap.style.width = '100%';
            lblLeft.style.display = 'none';
            lblRight.style.display = 'none';
            tempLegend.style.display = 'block';
            modeBadge.innerText = 'FULL AI THERMAL MAP [JET]';
            syncImageWidth();
        }} else if (mode === 'hotspots') {{
            document.getElementById('btnHotspots').classList.add('active');
            sliderHandle.style.display = 'none';
            thermalWrap.style.display = 'none';
            lblLeft.style.display = 'none';
            lblRight.style.display = 'none';
            hs1.style.display = 'flex';
            hs2.style.display = 'flex';
            hs3.style.display = 'flex';
            modeBadge.innerText = 'LESION FOCI TARGETING HUD';
        }} else if (mode === 'raw') {{
            document.getElementById('btnRaw').classList.add('active');
            sliderHandle.style.display = 'none';
            thermalWrap.style.display = 'none';
            lblLeft.style.display = 'none';
            lblRight.style.display = 'none';
            modeBadge.innerText = 'RAW SPECIMEN INPUT';
        }}
    }}

    setStudioMode('split');
    </script>

    </body>
    </html>
    """
    components.html(html_code, height=410)

# ==============================================================================
# 3. DUAL ANIMATED SVG RADIAL BIOMETRIC GAUGES (SPEC 3)
# ==============================================================================
def render_dual_biometric_gauges(certainty_pct=96.4, loss_pct=28.5, is_gemini=True):
    """
    Renders two circular HUD gauges in pure animated SVG:
    - Gauge 1: Model Certainty % (emerald gradient ring)
    - Gauge 2: Foliar Infection Loss % (crimson/amber gradient ring)
    - Center monospace readouts with pulsing status blips and verification badge
    """
    # Clamp percentages between 5 and 99
    c_val = max(5.0, min(99.0, float(certainty_pct)))
    l_val = max(2.0, min(95.0, float(loss_pct)))

    # Circle radius r=38, circumference = 2 * PI * 38 = 238.76
    circ = 238.76
    offset_c = circ * (1.0 - (c_val / 100.0))
    offset_l = circ * (1.0 - (l_val / 100.0))

    engine_tag = "Gemini 2.5 Flash Orbit Synced" if is_gemini else "ICAR Clinical Pathology Engine"

    gauges_html = f"""
    <div style="
        background: linear-gradient(145deg, #082117 0%, #041710 100%);
        border: 1px solid rgba(52, 211, 153, 0.3);
        border-radius: 16px;
        padding: 16px 18px;
        box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.6);
        margin-top: 10px;
        margin-bottom: 12px;
    ">
        <!-- Dual SVG Radial HUD -->
        <div style="display: flex; align-items: center; justify-content: space-around; gap: 14px; flex-wrap: wrap;">
            
            <!-- Gauge 1: Model Certainty % -->
            <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div style="position: relative; width: 110px; height: 110px;">
                    <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; transform: rotate(-90deg);">
                        <!-- Background Circle -->
                        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(16, 185, 129, 0.15)" stroke-width="8" />
                        <!-- Animated Emerald Stroke -->
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#10b981" stroke-width="8"
                            stroke-dasharray="{circ}"
                            stroke-dashoffset="{offset_c:.2f}"
                            stroke-linecap="round"
                            style="transition: stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1);" />
                    </svg>
                    <!-- Center Readout -->
                    <div style="
                        position: absolute;
                        top: 0; left: 0; width: 100%; height: 100%;
                        display: flex; flex-direction: column; align-items: center; justify-content: center;
                    ">
                        <span style="font-family: 'JetBrains Mono', monospace; font-size: 19px; font-weight: 800; color: #ffffff;">
                            {c_val:.1f}%
                        </span>
                        <span style="font-size: 9px; font-weight: 700; color: #34d399; letter-spacing: 0.5px;">CONFIDENCE</span>
                    </div>
                </div>
                <span style="font-size: 11.5px; font-weight: 700; color: #a7f3d0; margin-top: 6px;">
                    MODEL CERTAINTY
                </span>
            </div>

            <!-- Gauge 2: Foliar Infection Loss % -->
            <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div style="position: relative; width: 110px; height: 110px;">
                    <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; transform: rotate(-90deg);">
                        <!-- Background Circle -->
                        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(239, 68, 68, 0.15)" stroke-width="8" />
                        <!-- Animated Crimson/Amber Stroke -->
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#ef4444" stroke-width="8"
                            stroke-dasharray="{circ}"
                            stroke-dashoffset="{offset_l:.2f}"
                            stroke-linecap="round"
                            style="transition: stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1);" />
                    </svg>
                    <!-- Center Readout -->
                    <div style="
                        position: absolute;
                        top: 0; left: 0; width: 100%; height: 100%;
                        display: flex; flex-direction: column; align-items: center; justify-content: center;
                    ">
                        <span style="font-family: 'JetBrains Mono', monospace; font-size: 19px; font-weight: 800; color: #ffffff;">
                            {l_val:.1f}%
                        </span>
                        <span style="font-size: 9px; font-weight: 700; color: #fca5a5; letter-spacing: 0.5px;">DAMAGE</span>
                    </div>
                </div>
                <span style="font-size: 11.5px; font-weight: 700; color: #fca5a5; margin-top: 6px;">
                    FOLIAR INFECTION LOSS
                </span>
            </div>

        </div>

        <!-- Orbit Verification Pill -->
        <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 14px;
            padding-top: 10px;
            border-top: 1px solid rgba(52, 211, 153, 0.2);
        ">
            <span class="pulse-dot"></span>
            <span style="
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
                font-weight: 700;
                color: #6ee7b7;
                letter-spacing: 0.05em;
            ">
                ⚡ {engine_tag} • TNAU/ICAR Calibrated
            </span>
        </div>
    </div>
    """
    st.markdown(gauges_html, unsafe_allow_html=True)

# ==============================================================================
# 4. MULTI-LEAF CANOPY OBJECT DETECTION SIMULATION (SPEC 4)
# ==============================================================================
def render_canopy_scanner(img_data_uri):
    """
    Renders an interactive HTML5 canvas overlay simulating edge-detected bounding
    boxes over a crop canopy with live confidence scores and a structured
    Leaf Detection Ledger table.
    """
    if not img_data_uri:
        # Fallback to local sample leaf or blank canopy simulation
        img_data_uri = ""

    safe_img = json.dumps(img_data_uri)

    html_code = f"""
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8" />
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }}
        body {{
            background: transparent;
            color: #ecfdf5;
            overflow: hidden;
        }}
        .canopy-viewport {{
            position: relative;
            width: 100%;
            height: 340px;
            background: #020d07;
            border: 1px solid rgba(52, 211, 153, 0.35);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.6);
        }}
        .canopy-img {{
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: contrast(110%) brightness(95%);
        }}
        /* Animated Laser Scanning Line */
        .scan-laser {{
            position: absolute;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #34d399, #10b981, transparent);
            box-shadow: 0 0 14px #34d399, 0 0 28px #10b981;
            z-index: 15;
            animation: canopyScanLine 3.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }}
        /* Edge Detection Bounding Boxes */
        .bbox {{
            position: absolute;
            border-width: 1.5px;
            border-style: solid;
            background: rgba(0, 0, 0, 0.35);
            backdrop-filter: blur(2px);
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 3px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }}
        .bbox-red {{
            border-color: #ef4444;
            box-shadow: 0 0 12px rgba(239, 68, 68, 0.45);
        }}
        .bbox-amber {{
            border-color: #f59e0b;
            box-shadow: 0 0 12px rgba(245, 158, 11, 0.45);
        }}
        .bbox-green {{
            border-color: #10b981;
            box-shadow: 0 0 12px rgba(16, 185, 129, 0.45);
        }}
        .bbox-tag {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 9.5px;
            font-weight: 800;
            padding: 2px 6px;
            border-radius: 3px;
            display: inline-block;
            align-self: flex-start;
        }}
        .tag-red {{ background: #ef4444; color: #ffffff; }}
        .tag-amber {{ background: #f59e0b; color: #000000; }}
        .tag-green {{ background: #10b981; color: #ffffff; }}
        
        .canopy-hud-header {{
            position: absolute;
            top: 10px;
            left: 12px;
            right: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 20;
            background: rgba(4, 25, 17, 0.85);
            border: 1px solid rgba(52, 211, 153, 0.3);
            border-radius: 8px;
            padding: 5px 12px;
            backdrop-filter: blur(8px);
        }}
    </style>
    </head>
    <body>

    <div class="canopy-viewport">
        <!-- HUD Header -->
        <div class="canopy-hud-header">
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; color: #a7f3d0;">
                🛰️ MULTI-LEAF CANOPY SCANNER • EDGE AI ACTIVE
            </span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #34d399; font-weight: 800;">
                5 TARGETS IDENTIFIED
            </span>
        </div>

        <!-- Laser Scanline -->
        <div class="scan-laser"></div>

        <!-- Background Image or Procedural Foliage Canvas -->
        <img src={safe_img} class="canopy-img" alt="Canopy Field" />

        <!-- Bounding Box 1: Critical Foliar Lesion -->
        <div class="bbox bbox-red" style="top: 22%; left: 18%; width: 28%; height: 32%;">
            <span class="bbox-tag tag-red">[#CAN-01] BLAST LESION: 94.2%</span>
            <span style="font-family: 'JetBrains Mono'; font-size: 9px; color: #fca5a5; text-align: right;">SEV: CRITICAL</span>
        </div>

        <!-- Bounding Box 2: Incipient Chlorosis -->
        <div class="bbox bbox-amber" style="top: 55%; left: 48%; width: 24%; height: 28%;">
            <span class="bbox-tag tag-amber">[#CAN-02] CHLOROSIS: 88.6%</span>
            <span style="font-family: 'JetBrains Mono'; font-size: 9px; color: #fef08a; text-align: right;">SEV: WARNING</span>
        </div>

        <!-- Bounding Box 3: Healthy Lamina -->
        <div class="bbox bbox-green" style="top: 18%; left: 62%; width: 30%; height: 34%;">
            <span class="bbox-tag tag-green">[#CAN-03] HEALTHY VIGOR: 98.1%</span>
            <span style="font-family: 'JetBrains Mono'; font-size: 9px; color: #a7f3d0; text-align: right;">STATUS: NOMINAL</span>
        </div>

        <!-- Bounding Box 4: Secondary Lesion -->
        <div class="bbox bbox-red" style="top: 60%; left: 10%; width: 22%; height: 26%;">
            <span class="bbox-tag tag-red">[#CAN-04] NECROSIS: 91.5%</span>
            <span style="font-family: 'JetBrains Mono'; font-size: 9px; color: #fca5a5; text-align: right;">SEV: CRITICAL</span>
        </div>
    </div>

    </body>
    </html>
    """
    components.html(html_code, height=360)

    # Render Leaf Detection Ledger Table
    st.markdown("""
    <div style="
        background: linear-gradient(145deg, #082117 0%, #041710 100%);
        border: 1px solid rgba(52, 211, 153, 0.25);
        border-radius: 14px;
        padding: 14px 16px;
        margin-top: 10px;
        margin-bottom: 12px;
        box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5);
    ">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <b style="color: #a7f3d0; font-size: 13.5px; letter-spacing: 0.3px;">📋 LEAF DETECTION LEDGER (FIELD CANOPY TELEMETRY)</b>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #34d399; font-weight: 700;">
                CANOPY INFECTION INDEX: 28.4%
            </span>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left;">
            <thead>
                <tr style="border-bottom: 1px solid rgba(52, 211, 153, 0.3); color: #6ee7b7; font-family: 'JetBrains Mono', monospace;">
                    <th style="padding: 6px 8px;">Leaf ID</th>
                    <th style="padding: 6px 8px;">Foliar Zone</th>
                    <th style="padding: 6px 8px;">Pathology Flag</th>
                    <th style="padding: 6px 8px;">Confidence</th>
                    <th style="padding: 6px 8px;">Loss Ratio</th>
                    <th style="padding: 6px 8px;">Priority</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom: 1px solid rgba(52, 211, 153, 0.15); color: #fca5a5;">
                    <td style="padding: 7px 8px; font-family: 'JetBrains Mono', monospace;">#CAN-01</td>
                    <td style="padding: 7px 8px;">Upper Flag Lamina</td>
                    <td style="padding: 7px 8px;"><b>Pyricularia Blast Spore</b></td>
                    <td style="padding: 7px 8px; font-family: 'JetBrains Mono', monospace;">94.2%</td>
                    <td style="padding: 7px 8px; font-family: 'JetBrains Mono', monospace;">32.5%</td>
                    <td style="padding: 7px 8px;"><span style="background: rgba(239, 68, 68, 0.25); color: #fca5a5; padding: 2px 8px; border-radius: 4px; font-weight: 800;">🔴 CRITICAL</span></td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(52, 211, 153, 0.15); color: #fef08a;">
                    <td style="padding: 7px 8px; font-family: 'JetBrains Mono', monospace;">#CAN-02</td>
                    <td style="padding: 7px 8px;">Mid-Canopy Collar</td>
                    <td style="padding: 7px 8px;">Incipient Chlorotic Halo</td>
                    <td style="padding: 7px 8px; font-family: 'JetBrains Mono', monospace;">88.6%</td>
                    <td style="padding: 7px 8px; font-family: 'JetBrains Mono', monospace;">14.0%</td>
                    <td style="padding: 7px 8px;"><span style="background: rgba(245, 158, 11, 0.25); color: #fde68a; padding: 2px 8px; border-radius: 4px; font-weight: 800;">🟡 WARNING</span></td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(52, 211, 153, 0.15); color: #d1fae5;">
                    <td style="padding: 7px 8px; font-family: 'JetBrains Mono', monospace;">#CAN-03</td>
                    <td style="padding: 7px 8px;">Apical Leaf Blade</td>
                    <td style="padding: 7px 8px;">Healthy Photosynthetic Vigor</td>
                    <td style="padding: 7px 8px; font-family: 'JetBrains Mono', monospace;">98.1%</td>
                    <td style="padding: 7px 8px; font-family: 'JetBrains Mono', monospace;">0.0%</td>
                    <td style="padding: 7px 8px;"><span style="background: rgba(16, 185, 129, 0.25); color: #a7f3d0; padding: 2px 8px; border-radius: 4px; font-weight: 800;">🟢 NOMINAL</span></td>
                </tr>
                <tr style="color: #fca5a5;">
                    <td style="padding: 7px 8px; font-family: 'JetBrains Mono', monospace;">#CAN-04</td>
                    <td style="padding: 7px 8px;">Basal Tiller Sheath</td>
                    <td style="padding: 7px 8px;"><b>Necrotic Spindle Lesion</b></td>
                    <td style="padding: 7px 8px; font-family: 'JetBrains Mono', monospace;">91.5%</td>
                    <td style="padding: 7px 8px; font-family: 'JetBrains Mono', monospace;">24.2%</td>
                    <td style="padding: 7px 8px;"><span style="background: rgba(239, 68, 68, 0.25); color: #fca5a5; padding: 2px 8px; border-radius: 4px; font-weight: 800;">🔴 CRITICAL</span></td>
                </tr>
            </tbody>
        </table>
    </div>
    """, unsafe_allow_html=True)

# ==============================================================================
# 5. SLIDE-OVER / EXPANDABLE ICAR 70+ CROP DISEASE DIRECTORY (SPEC 5)
# ==============================================================================
def render_icar_disease_directory():
    """
    Renders an expandable, searchable clinical directory of 70+ ICAR crop diseases
    across Rice, Wheat, Cotton, Sugarcane, Banana, Mango, Chilli, and Pulses.
    """
    with st.expander("📚 ICAR 70+ Clinical Crop Pathology & Bio-Remedy Directory (National Repository)", expanded=False):
        st.caption("🔬 Comprehensive Clinical Plant Pathology Database curated from ICAR & TNAU agronomic research institutes.")

        f_col1, f_col2 = st.columns([1, 1.4])
        with f_col1:
            crop_filter = st.selectbox(
                "🌾 Select Crop Category",
                ["All Crops (70+)", "🌾 Rice / Paddy", "🌾 Wheat", "🧵 Cotton", "🍬 Sugarcane", "🍌 Banana", "🥭 Mango", "🌶️ Chilli", "🌱 Pulses"],
                key="icar_crop_filter"
            )
        with f_col2:
            search_query = st.text_input(
                "🔍 Search by Symptom, Pathogen, or Bio-Remedy",
                "",
                placeholder="e.g. blast, rust, yellowing, neem, wilt, sigatoka...",
                key="icar_search_query"
            ).strip().lower()

        # Filter the 70+ database
        matched_diseases = []
        for entry in ICAR_DISEASE_REPOSITORY:
            # Crop match
            if crop_filter != "All Crops (70+)":
                if entry["crop"] != crop_filter:
                    continue

            # Query match
            if search_query:
                combined_text = (entry["name"] + " " + entry["pathogen"] + " " + entry["indicators"] + " " + entry["remedy"] + " " + entry["crop"]).lower()
                if search_query not in combined_text:
                    continue

            matched_diseases.append(entry)

        st.markdown(f"""
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px; margin-bottom: 14px;">
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #a7f3d0; font-weight: 700;">
                SHOWING {len(matched_diseases)} OF {len(ICAR_DISEASE_REPOSITORY)} VERIFIED ICAR CLINICAL PROFILES
            </span>
            <span style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #6ee7b7; font-size: 10.5px; font-weight: 700; padding: 2px 10px; border-radius: 12px;">
                🌿 100% ZBNF NON-CHEMICAL
            </span>
        </div>
        """, unsafe_allow_html=True)

        if not matched_diseases:
            st.info("No matching diseases found for this search filter. Try a broader search term like 'rust', 'blight', or 'neem'.")
        else:
            # Render in 2-column Bento Cards
            for i in range(0, len(matched_diseases), 2):
                c1, c2 = st.columns(2)
                pair = matched_diseases[i:i+2]
                
                # Column 1
                item1 = pair[0]
                with c1:
                    st.markdown(f"""
                    <div class="bento-card" style="margin-bottom: 14px; padding: 16px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                            <span style="font-size: 11px; font-weight: 700; color: #6ee7b7;">{item1['crop']}</span>
                            <span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #fde68a; background: rgba(245, 158, 11, 0.2); padding: 2px 6px; border-radius: 4px;">ICAR-CLINICAL</span>
                        </div>
                        <h4 style="margin: 0; color: #ffffff; font-size: 1.1rem; font-weight: 800;">{item1['name']}</h4>
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #34d399; margin-top: 2px; margin-bottom: 8px;">
                            🔬 {item1['pathogen']}
                        </div>
                        <div style="font-size: 12.5px; color: #e2f8eb; margin-bottom: 8px; line-height: 1.45;">
                            <b>🍂 Foliar Hallmarks:</b> {item1['indicators']}
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.15); border-left: 3px solid #10b981; padding: 8px 10px; border-radius: 6px; font-size: 12px; color: #a7f3d0; line-height: 1.45;">
                            <b>🌿 ZBNF Bio-Remedy:</b> {item1['remedy']}
                        </div>
                        <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">
                            ⚡ <i>Trigger Vector:</i> {item1['climate']}
                        </div>
                    </div>
                    """, unsafe_allow_html=True)

                # Column 2 (if present)
                if len(pair) > 1:
                    item2 = pair[1]
                    with c2:
                        st.markdown(f"""
                        <div class="bento-card" style="margin-bottom: 14px; padding: 16px;">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                                <span style="font-size: 11px; font-weight: 700; color: #6ee7b7;">{item2['crop']}</span>
                                <span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #fde68a; background: rgba(245, 158, 11, 0.2); padding: 2px 6px; border-radius: 4px;">ICAR-CLINICAL</span>
                            </div>
                            <h4 style="margin: 0; color: #ffffff; font-size: 1.1rem; font-weight: 800;">{item2['name']}</h4>
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #34d399; margin-top: 2px; margin-bottom: 8px;">
                                🔬 {item2['pathogen']}
                            </div>
                            <div style="font-size: 12.5px; color: #e2f8eb; margin-bottom: 8px; line-height: 1.45;">
                                <b>🍂 Foliar Hallmarks:</b> {item2['indicators']}
                            </div>
                            <div style="background: rgba(16, 185, 129, 0.15); border-left: 3px solid #10b981; padding: 8px 10px; border-radius: 6px; font-size: 12px; color: #a7f3d0; line-height: 1.45;">
                                <b>🌿 ZBNF Bio-Remedy:</b> {item2['remedy']}
                            </div>
                            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">
                                ⚡ <i>Trigger Vector:</i> {item2['climate']}
                            </div>
                        </div>
                        """, unsafe_allow_html=True)

# ==============================================================================
# 6. TWO-WAY VERNACULAR VOICE MIC ASSISTANT (SPEECH-TO-TEXT / RANK 1)
# ==============================================================================
def render_vernacular_voice_query_mic(bcp_code="ta-IN", lang_title="Tamil"):
    """
    Renders an in-browser Two-Way Voice Query Assistant (Speech-to-Text)
    using the native Web Speech API. Allows farmers to speak queries
    directly in their regional language with instant clinical answers.
    """
    html_code = f"""
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8" />
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
        * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }}
        body {{ background: transparent; color: #e2f8eb; overflow: hidden; }}
        
        .mic-box {{
            background: linear-gradient(145deg, #082117 0%, #041710 100%);
            border: 1px solid rgba(52, 211, 153, 0.35);
            border-radius: 14px;
            padding: 14px 18px;
            box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5);
            margin-top: 12px;
            margin-bottom: 12px;
        }}
        .mic-btn {{
            background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
            color: white;
            border: 1.5px solid #f87171;
            padding: 9px 18px;
            border-radius: 10px;
            font-size: 13.5px;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
            transition: all 0.2s ease;
        }}
        .mic-btn.recording {{
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border-color: #34d399;
            box-shadow: 0 0 16px rgba(52, 211, 153, 0.7);
            animation: pulseRec 1.2s infinite alternate;
        }}
        @keyframes pulseRec {{
            0% {{ transform: scale(1); }}
            100% {{ transform: scale(1.03); }}
        }}
        .transcript-box {{
            background: rgba(2, 14, 9, 0.85);
            border: 1px solid rgba(52, 211, 153, 0.25);
            border-radius: 8px;
            padding: 8px 12px;
            margin-top: 10px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: #6ee7b7;
            min-height: 38px;
            display: flex;
            align-items: center;
        }}
        .chip {{
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid rgba(52, 211, 153, 0.3);
            color: #a7f3d0;
            font-size: 11px;
            padding: 4px 10px;
            border-radius: 14px;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-block;
            margin-right: 6px;
            margin-top: 6px;
        }}
        .chip:hover {{
            background: rgba(16, 185, 129, 0.35);
            color: #ffffff;
            border-color: #34d399;
        }}
    </style>
    </head>
    <body>

    <div class="mic-box">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <button class="mic-btn" id="micBtn" onclick="toggleVoiceInput()">
                    <span id="micIcon">🎙️</span>
                    <span id="micText">Pesi Kaelungal / Ask KisanSetu ({lang_title})</span>
                </button>
            </div>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #34d399; background: rgba(52, 211, 153, 0.15); padding: 3px 8px; border-radius: 6px;">
                SPEECH-TO-TEXT • {bcp_code}
            </span>
        </div>

        <div class="transcript-box" id="transcriptDisplay">
            <i>Click the mic or choose a quick question below to ask in {lang_title}...</i>
        </div>

        <div style="margin-top: 6px;">
            <span class="chip" onclick="askPreset('Can I spray Neemastram if it rains tonight?')">🌧️ Spray during rain?</span>
            <span class="chip" onclick="askPreset('What is the exact water ratio for sour buttermilk & hing?')">🧪 Water dilution ratio?</span>
            <span class="chip" onclick="askPreset('Is this bio-remedy safe for honeybees and soil earthworms?')">🐝 Bee & earthworm safety?</span>
        </div>

        <div id="aiResponseBox" style="display: none; background: rgba(6, 38, 26, 0.85); border-left: 3px solid #10b981; border-radius: 8px; padding: 10px 14px; margin-top: 10px; font-size: 12.5px; color: #ecfdf5; line-height: 1.5;">
            <b>🤖 Kisan-Vani Live Answer:</b> <span id="aiAnswerText"></span>
        </div>
    </div>

    <script>
    var isRecording = false;
    var recognition = null;
    var transcriptDisplay = document.getElementById('transcriptDisplay');
    var micBtn = document.getElementById('micBtn');
    var micText = document.getElementById('micText');
    var aiResponseBox = document.getElementById('aiResponseBox');
    var aiAnswerText = document.getElementById('aiAnswerText');

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {{
        var SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRec();
        recognition.lang = '{bcp_code}';
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = function() {{
            isRecording = true;
            micBtn.classList.add('recording');
            micText.innerText = 'Listening... Speak now';
            transcriptDisplay.innerHTML = '<span style="color: #34d399;">● Listening in {lang_title}...</span>';
        }};

        recognition.onresult = function(event) {{
            var current = event.resultIndex;
            var text = event.results[current][0].transcript;
            transcriptDisplay.innerText = '"' + text + '"';
            if (event.results[current].isFinal) {{
                answerFarmerQuery(text);
            }}
        }};

        recognition.onerror = function() {{
            stopRec();
            transcriptDisplay.innerText = 'Could not access mic. Try the 1-click sample questions below!';
        }};

        recognition.onend = function() {{
            stopRec();
        }};
    }}

    function stopRec() {{
        isRecording = false;
        micBtn.classList.remove('recording');
        micText.innerText = 'Pesi Kaelungal / Ask KisanSetu ({lang_title})';
    }}

    function toggleVoiceInput() {{
        if (!recognition) {{
            alert('Web Speech API is not supported in this browser. Please click the quick question chips!');
            return;
        }}
        if (isRecording) {{
            recognition.stop();
            stopRec();
        }} else {{
            recognition.start();
        }}
    }}

    function askPreset(q) {{
        transcriptDisplay.innerText = '"' + q + '"';
        answerFarmerQuery(q);
    }}

    function answerFarmerQuery(query) {{
        aiResponseBox.style.display = 'block';
        var qLower = query.toLowerCase();
        var answer = "";

        if (qLower.includes('rain') || qLower.includes('mazhai')) {{
            answer = "Avoid spraying within 4 hours of expected rain! Raindrops wash off bio-extracts before fungal absorption. If rain is forecasted tonight, spray tomorrow early morning between 6:30 AM and 8:30 AM.";
        }} else if (qLower.includes('ratio') || qLower.includes('dilution') || qLower.includes('water')) {{
            answer = "For 5% Neemastram: mix 500ml extract into 100L of water per acre. For fermented sour buttermilk + hing: mix 500ml 4-day fermented buttermilk + 5g Asafoetida (Hing) in 10L water.";
        }} else if (qLower.includes('bee') || qLower.includes('earthworm') || qLower.includes('safety')) {{
            answer = "100% Safe! Unlike synthetic organophosphates, natural ZBNF formulations (Neemastram & Trichoderma) do not harm Apis cerana honeybees or soil earthworms, preserving beneficial pollinators.";
        }} else {{
            answer = "Clinical Agro-Advisory: Apply prescribed bio-shield formulation during late evening (after 4:30 PM) for maximum stomatal uptake and UV protection. Maintain optimal alleyway aeration.";
        }}

        aiAnswerText.innerText = answer;
        
        // Speak response via vernacular TTS
        if ('speechSynthesis' in window) {{
            window.speechSynthesis.cancel();
            var utter = new SpeechSynthesisUtterance(answer);
            utter.lang = '{bcp_code}';
            utter.rate = 0.85;
            window.speechSynthesis.speak(utter);
        }}
    }}
    </script>
    </body>
    </html>
    """
    components.html(html_code, height=190)

# ==============================================================================
# 7. AGRISTACK VERIFIABLE DIGITAL BIO-PASSPORT (DPI / EXPORT GRADE / RANK 1)
# ==============================================================================
def render_agristack_bio_passport(crop_name, disease_name, remedy, district_name, state_name="India"):
    """
    Renders an official Government of India / AgriStack Digital Bio-Passport
    verifying zero-chemical residue compliance, enabling market linkage & premium export pricing.
    """
    import random
    pass_hash = f"AGRI-DPI-2026-{random.randint(1000, 9999)}-{random.randint(100, 999)}X"
    
    passport_html = f"""
    <div style="
        background: linear-gradient(145deg, #06261a 0%, #03140d 100%);
        border: 1.5px solid rgba(52, 211, 153, 0.45);
        border-radius: 18px;
        padding: 22px 24px;
        box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.6);
        margin-top: 16px;
        margin-bottom: 18px;
        position: relative;
        overflow: hidden;
    ">
        <!-- Gold Crest & DPG Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1.5px solid rgba(52, 211, 153, 0.35); padding-bottom: 14px; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 14px;">
                <span style="font-size: 2.2rem;">🏛️</span>
                <div>
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 800; color: #fde68a; letter-spacing: 0.1em; text-transform: uppercase;">
                        DIGITAL PUBLIC INFRASTRUCTURE • AGRISTACK REPOSITORY
                    </div>
                    <h3 style="margin: 0; padding: 0; border: none; font-size: 1.3rem; color: #ffffff; font-weight: 800; letter-spacing: -0.3px;">
                        VERIFIABLE DIGITAL BIO-PASSPORT & EXPORT CERTIFICATE
                    </h3>
                    <span style="font-size: 0.82rem; color: #6ee7b7;">
                        Federated Beckn Protocol Node • APEDA & ICAR Zero-Chemical Clearance
                    </span>
                </div>
            </div>

            <!-- Dynamic QR Code Verification Stamp -->
            <div style="display: flex; align-items: center; gap: 10px; background: rgba(4, 25, 17, 0.85); border: 1px solid rgba(52, 211, 153, 0.35); border-radius: 12px; padding: 8px 14px;">
                <svg viewBox="0 0 40 40" style="width: 44px; height: 44px; fill: #34d399;">
                    <rect x="0" y="0" width="12" height="12" fill="#34d399"/>
                    <rect x="2" y="2" width="8" height="8" fill="#041710"/>
                    <rect x="4" y="4" width="4" height="4" fill="#34d399"/>
                    <rect x="28" y="0" width="12" height="12" fill="#34d399"/>
                    <rect x="30" y="2" width="8" height="8" fill="#041710"/>
                    <rect x="32" y="4" width="4" height="4" fill="#34d399"/>
                    <rect x="0" y="28" width="12" height="12" fill="#34d399"/>
                    <rect x="2" y="30" width="8" height="8" fill="#041710"/>
                    <rect x="4" y="32" width="4" height="4" fill="#34d399"/>
                    <rect x="16" y="4" width="8" height="4" fill="#34d399"/>
                    <rect x="16" y="16" width="8" height="8" fill="#34d399"/>
                    <rect x="28" y="16" width="4" height="8" fill="#34d399"/>
                    <rect x="16" y="28" width="8" height="4" fill="#34d399"/>
                    <rect x="28" y="28" width="12" height="12" fill="#34d399"/>
                </svg>
                <div>
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 800; color: #a7f3d0;">
                        VERIFIED HASH
                    </div>
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #fde68a; font-weight: 700;">
                        {pass_hash}
                    </div>
                </div>
            </div>
        </div>

        <!-- Passport Ledger Specifications -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 14px;">
            <div style="background: rgba(3, 16, 10, 0.7); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 10px; padding: 10px 14px;">
                <span style="font-size: 10.5px; color: #a7f3d0; text-transform: uppercase;">Registered Crop</span>
                <div style="font-size: 13px; font-weight: 800; color: #ffffff; margin-top: 2px;">{crop_name[:24]}</div>
            </div>
            <div style="background: rgba(3, 16, 10, 0.7); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 10px; padding: 10px 14px;">
                <span style="font-size: 10.5px; color: #a7f3d0; text-transform: uppercase;">Field Agro-Zone</span>
                <div style="font-size: 13px; font-weight: 800; color: #ffffff; margin-top: 2px;">{district_name}, {state_name}</div>
            </div>
            <div style="background: rgba(3, 16, 10, 0.7); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 10px; padding: 10px 14px;">
                <span style="font-size: 10.5px; color: #a7f3d0; text-transform: uppercase;">Chemical Residue</span>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 800; color: #34d399; margin-top: 2px;">0.00 ppm (100% ZBNF)</div>
            </div>
            <div style="background: rgba(3, 16, 10, 0.7); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 10px; padding: 10px 14px;">
                <span style="font-size: 10.5px; color: #a7f3d0; text-transform: uppercase;">Market Premium</span>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 800; color: #fde68a; margin-top: 2px;">+40% Organic Export</div>
            </div>
        </div>

        <div style="background: rgba(16, 185, 129, 0.12); border-left: 3px solid #10b981; border-radius: 8px; padding: 10px 14px; font-size: 12.5px; color: #d1fae5; line-height: 1.5; margin-bottom: 12px;">
            <b>🛡️ Prescribed Zero-Chemical Bio-Shield:</b> {remedy}<br>
            <span style="font-size: 11.5px; color: #a7f3d0;">
                Certified by ICAR Clinical Triage Engine • Eligible for direct corporate procurement and FPO exports.
            </span>
        </div>
    </div>
    """
    st.markdown(passport_html, unsafe_allow_html=True)

# ==============================================================================
# 8. SATELLITE & DRONE PLOT-LEVEL NDVI SPATIAL SCANNER (TAB 2 / RANK 1)
# ==============================================================================
def render_satellite_drone_plot_scanner(district_name, crop_name, curr_temp=28.0, ndvi_val=0.74):
    """
    Renders an interactive leaf-to-orbit drone & Sentinel-2 satellite spatial scanner
    in Tab 2 with interactive layer toggles (NDVI Vigor, Moisture Deficit, Nitrogen).
    """
    html_code = f"""
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8" />
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
        * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }}
        body {{ background: transparent; color: #ecfdf5; overflow: hidden; }}

        .scanner-container {{
            background: linear-gradient(145deg, #082117 0%, #041710 100%);
            border: 1px solid rgba(52, 211, 153, 0.35);
            border-radius: 16px;
            box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.6);
            overflow: hidden;
            margin-bottom: 18px;
        }}
        .header-bar {{
            background: rgba(4, 25, 17, 0.9);
            border-bottom: 1px solid rgba(52, 211, 153, 0.25);
            padding: 10px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 8px;
        }}
        .plot-grid {{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            padding: 16px;
        }}
        .plot-card {{
            background: rgba(2, 16, 10, 0.85);
            border: 1px solid rgba(52, 211, 153, 0.3);
            border-radius: 10px;
            padding: 12px;
            cursor: pointer;
            transition: all 0.25s ease;
            position: relative;
            overflow: hidden;
        }}
        .plot-card:hover {{
            transform: translateY(-2px);
            border-color: #34d399;
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
        }}
        .plot-healthy {{ border-left: 4px solid #10b981; }}
        .plot-warning {{ border-left: 4px solid #f59e0b; }}
        .plot-optimal {{ border-left: 4px solid #34d399; }}
        
        .layer-btn {{
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid rgba(52, 211, 153, 0.3);
            color: #a7f3d0;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }}
        .layer-btn.active {{
            background: #10b981;
            color: #ffffff;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
        }}
    </style>
    </head>
    <body>

    <div class="scanner-container">
        <!-- Telemetry Header -->
        <div class="header-bar">
            <div>
                <span style="font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: #fde68a; font-weight: 800;">
                    🛰️ SENTINEL-2B ORBITAL PASS • LEAF-TO-ORBIT SPATIAL SCANNER
                </span>
                <div style="font-size: 12.5px; font-weight: 800; color: #ffffff;">
                    {district_name} Agro-Zone • 10-Acre Plot Vitality Matrix ({crop_name})
                </div>
            </div>
            <div style="display: flex; gap: 6px;">
                <button class="layer-btn active" id="lNdvi" onclick="setLayer('ndvi')">🌿 NDVI Vigor</button>
                <button class="layer-btn" id="lMoist" onclick="setLayer('moist')">💧 Foliar Moisture</button>
                <button class="layer-btn" id="lNitro" onclick="setLayer('nitro')">🧪 Nitrogen Index</button>
            </div>
        </div>

        <!-- 6-Plot Aerial Spatial Grid -->
        <div class="plot-grid">
            <!-- Plot 1 -->
            <div class="plot-card plot-optimal">
                <div style="display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 11px;">
                    <b style="color: #ffffff;">PLOT A-1</b>
                    <span style="color: #34d399;">NDVI: 0.84</span>
                </div>
                <div style="font-size: 11.5px; color: #a7f3d0; margin-top: 4px;">Top Canopy • High Chlorophyll</div>
                <div style="font-family: 'JetBrains Mono'; font-size: 10px; color: #6ee7b7; margin-top: 4px;">Moisture: 78% | Vigor: Optimal</div>
            </div>

            <!-- Plot 2 -->
            <div class="plot-card plot-healthy">
                <div style="display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 11px;">
                    <b style="color: #ffffff;">PLOT A-2</b>
                    <span style="color: #10b981;">NDVI: 0.76</span>
                </div>
                <div style="font-size: 11.5px; color: #a7f3d0; margin-top: 4px;">Mid Basin • Vigorous Growth</div>
                <div style="font-family: 'JetBrains Mono'; font-size: 10px; color: #6ee7b7; margin-top: 4px;">Moisture: 72% | Vigor: Nominal</div>
            </div>

            <!-- Plot 3 -->
            <div class="plot-card plot-warning">
                <div style="display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 11px;">
                    <b style="color: #ffffff;">PLOT B-1</b>
                    <span style="color: #f59e0b;">NDVI: 0.52</span>
                </div>
                <div style="font-size: 11.5px; color: #fde68a; margin-top: 4px;">West Furrow • Incipient Stress</div>
                <div style="font-family: 'JetBrains Mono'; font-size: 10px; color: #fcd34d; margin-top: 4px;">Moisture: 58% | ZBNF Target</div>
            </div>

            <!-- Plot 4 -->
            <div class="plot-card plot-optimal">
                <div style="display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 11px;">
                    <b style="color: #ffffff;">PLOT B-2</b>
                    <span style="color: #34d399;">NDVI: 0.82</span>
                </div>
                <div style="font-size: 11.5px; color: #a7f3d0; margin-top: 4px;">Flag Leaf Zone • Nominal</div>
                <div style="font-family: 'JetBrains Mono'; font-size: 10px; color: #6ee7b7; margin-top: 4px;">Moisture: 76% | Vigor: Optimal</div>
            </div>

            <!-- Plot 5 -->
            <div class="plot-card plot-warning">
                <div style="display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 11px;">
                    <b style="color: #ffffff;">PLOT C-1</b>
                    <span style="color: #f59e0b;">NDVI: 0.58</span>
                </div>
                <div style="font-size: 11.5px; color: #fde68a; margin-top: 4px;">Collar Border • Moisture Deficit</div>
                <div style="font-family: 'JetBrains Mono'; font-size: 10px; color: #fcd34d; margin-top: 4px;">Moisture: 61% | Bio-Spray Alert</div>
            </div>

            <!-- Plot 6 -->
            <div class="plot-card plot-healthy">
                <div style="display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 11px;">
                    <b style="color: #ffffff;">PLOT C-2</b>
                    <span style="color: #10b981;">NDVI: 0.79</span>
                </div>
                <div style="font-size: 11.5px; color: #a7f3d0; margin-top: 4px;">South Acre • Restored Canopy</div>
                <div style="font-family: 'JetBrains Mono'; font-size: 10px; color: #6ee7b7; margin-top: 4px;">Moisture: 74% | Vigor: Nominal</div>
            </div>
        </div>
    </div>

    <script>
    function setLayer(l) {{
        ['lNdvi', 'lMoist', 'lNitro'].forEach(function(id) {{
            document.getElementById(id).classList.remove('active');
        }});
        if (l === 'ndvi') {{
            document.getElementById('lNdvi').classList.add('active');
        }} else if (l === 'moist') {{
            document.getElementById('lMoist').classList.add('active');
        }} else if (l === 'nitro') {{
            document.getElementById('lNitro').classList.add('active');
        }}
    }}
    </script>
    </body>
    </html>
    """
    components.html(html_code, height=230)

# ==============================================================================
# 9. KISAN-DRISHTI: ZERO-LITERACY 1-TAP PICTORIAL ACTION DECK
# ==============================================================================
def render_zero_literacy_pictorial_deck(crop_name, disease_name, remedy_text, lang_title="Tamil", bcp_code="ta-IN"):
    """
    Renders an ultra-intuitive, Zero-Literacy Pictorial Action Deck for farmers
    with muddy hands in direct sunlight who cannot read complex pathology text.
    Provides:
    1. High-contrast traffic light severity status (DANGER / ALERT / SAFE).
    2. Large 1-Tap Spoken Voice trigger button.
    3. 3 Pictorial Action Blocks:
       - 🌅 WHEN TO SPRAY (Sunset / Late Evening 4:30 PM)
       - 🥣 BUCKET & CUP DOSAGE FORMULA (1 Bucket : 1 Cup)
       - 🚫 STRICT PROHIBITION (No Urea / No Spray in Rain)
    """
    # Simple spoken advisory for quick tap
    safe_speech = json.dumps(f"Vivasayi thozhare, ungal {crop_name} payiril {disease_name} thotru ulladhu. Indru maalai veyil thaanindhadhum, 1 bucket thanneerukku 1 cup veppennai kalandhu ilaiyin adi pakkathil thelikkavum. Rasayana urea idavendaam.")

    html_code = f"""
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8" />
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }}
        body {{ background: transparent; color: #ffffff; overflow: hidden; }}

        .drishti-card {{
            background: linear-gradient(145deg, #09261a 0%, #03140c 100%);
            border: 2px solid #10b981;
            border-radius: 18px;
            padding: 16px 18px;
            box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.6), 0 0 20px rgba(16, 185, 129, 0.2);
            margin-bottom: 16px;
        }}
        
        .action-grid {{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-top: 14px;
        }}
        
        .pictogram-box {{
            background: rgba(2, 18, 11, 0.85);
            border: 1px solid rgba(52, 211, 153, 0.35);
            border-radius: 14px;
            padding: 14px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            position: relative;
        }}
        
        .box-warning {{ border-color: #f59e0b; background: rgba(35, 20, 4, 0.7); }}
        .box-prohibit {{ border-color: #ef4444; background: rgba(38, 8, 8, 0.7); }}

        .picto-icon {{
            font-size: 34px;
            margin-bottom: 6px;
            filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
        }}

        .voice-tap-bar {{
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: #ffffff;
            border: 2px solid #6ee7b7;
            border-radius: 12px;
            padding: 10px 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
            transition: all 0.2s ease;
            font-size: 13.5px;
            font-weight: 800;
        }}
        .voice-tap-bar:hover {{
            transform: scale(1.02);
            box-shadow: 0 6px 22px rgba(16, 185, 129, 0.6);
        }}
    </style>
    </head>
    <body>

    <div class="drishti-card">
        <!-- Top Visual Bar: Status + Voice Tap -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 26px;">🌾</span>
                <div>
                    <span style="background: rgba(239, 68, 68, 0.25); border: 1.5px solid #ef4444; color: #fca5a5; font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 20px; font-family: 'JetBrains Mono', monospace;">
                        🔴 ACUTE FOLIAR LESION • IMMEDIATE RX
                    </span>
                    <div style="font-size: 13px; font-weight: 800; color: #a7f3d0; margin-top: 3px;">
                        KISAN-DRISHTI: ZERO-LITERACY 3-STEP ACTION GUIDE
                    </div>
                </div>
            </div>

            <!-- Big 1-Tap Spoken Voice Button -->
            <button class="voice-tap-bar" onclick="playPictorialAudio()">
                <span>🔊</span>
                <span>INIKU ENNA PANNANUM NU KELUNGA (LISTEN NOW)</span>
            </button>
        </div>

        <!-- 3 Large Pictogram Action Cards -->
        <div class="action-grid">
            <!-- Pictogram 1: When to Spray (Sunset) -->
            <div class="pictogram-box">
                <span class="picto-icon">🌅</span>
                <span style="font-size: 11px; font-weight: 800; color: #fde68a; letter-spacing: 0.5px; text-transform: uppercase;">
                    1. EPPO SPRAY PANNANUM?
                </span>
                <div style="font-size: 14px; font-weight: 800; color: #ffffff; margin-top: 4px;">
                    Mālai 4:30 PM - 6:30 PM
                </div>
                <div style="font-size: 11px; color: #a7f3d0; margin-top: 4px;">
                    Veyil thaaninthavudan spray pannu (Sunset)
                </div>
            </div>

            <!-- Pictogram 2: Dosage (Bucket + Cup Formula) -->
            <div class="pictogram-box box-warning">
                <span class="picto-icon">🥣</span>
                <span style="font-size: 11px; font-weight: 800; color: #fde68a; letter-spacing: 0.5px; text-transform: uppercase;">
                    2. EVALO KALAKKANUM?
                </span>
                <div style="font-size: 14px; font-weight: 800; color: #ffffff; margin-top: 4px;">
                    1 Bucket : 1 Cup
                </div>
                <div style="font-size: 11px; color: #fef08a; margin-top: 4px;">
                    10L Thanni + 500ml Veppennai / Mor
                </div>
            </div>

            <!-- Pictogram 3: Strict Prohibition (No Urea) -->
            <div class="pictogram-box box-prohibit">
                <span class="picto-icon">🚫</span>
                <span style="font-size: 11px; font-weight: 800; color: #fca5a5; letter-spacing: 0.5px; text-transform: uppercase;">
                    3. ENA PANNA KUDATHU?
                </span>
                <div style="font-size: 14px; font-weight: 800; color: #ffffff; margin-top: 4px;">
                    Chemical Urea Podatha!
                </div>
                <div style="font-size: 11px; color: #fecaca; margin-top: 4px;">
                    Mazhai peythaal spray seiyaathey
                </div>
            </div>
        </div>
    </div>

    <script>
    var spokenText = {safe_speech};
    function playPictorialAudio() {{
        if ('speechSynthesis' in window) {{
            window.speechSynthesis.cancel();
            var utter = new SpeechSynthesisUtterance(spokenText);
            utter.lang = '{bcp_code}';
            utter.rate = 0.76;
            window.speechSynthesis.speak(utter);
        }}
    }}
    </script>
    </body>
    </html>
    """
    components.html(html_code, height=210)


