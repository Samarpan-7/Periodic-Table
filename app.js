'use strict';

/* ═══════════════════════════════════════════════════════════════════
   PERIODIC TABLE — Full Application Script
   Contains: all 118 element objects, rendering, search/filter,
             modal, tabs, legend, keyboard nav
   ═══════════════════════════════════════════════════════════════════ */

/* ───────────────────────────────────────
   1. CATEGORY DEFINITIONS
─────────────────────────────────────── */
const CATEGORIES = {
  'alkali-metal':      { label: 'Alkali Metals',          color: '#ef4444', rgb: '239,68,68'   },
  'alkaline-earth':    { label: 'Alkaline Earth Metals',  color: '#f97316', rgb: '249,115,22'  },
  'transition-metal':  { label: 'Transition Metals',      color: '#eab308', rgb: '234,179,8'   },
  'lanthanide':        { label: 'Lanthanides',            color: '#a855f7', rgb: '168,85,247'  },
  'actinide':          { label: 'Actinides',              color: '#ec4899', rgb: '236,72,153'  },
  'post-transition':   { label: 'Post-transition Metals', color: '#22c55e', rgb: '34,197,94'   },
  'metalloid':         { label: 'Metalloids',             color: '#14b8a6', rgb: '20,184,166'  },
  'reactive-nonmetal': { label: 'Reactive Non-metals',    color: '#3b82f6', rgb: '59,130,246'  },
  'halogen':           { label: 'Halogens',               color: '#06b6d4', rgb: '6,182,212'   },
  'noble-gas':         { label: 'Noble Gases',            color: '#6366f1', rgb: '99,102,241'  },
};

/* ───────────────────────────────────────
   2. ELEMENT DATA — All 118 elements
   row/col = CSS grid position
   row 8   = spacer
   row 9   = lanthanides
   row 10  = actinides
─────────────────────────────────────── */
const ELEMENTS = [
  /* ─── Period 1 ─── */
  {
    number: 1, symbol: 'H', name: 'Hydrogen', mass: '1.008',
    category: 'reactive-nonmetal', row: 1, col: 1,
    period: 1, group: 1, block: 's', state: 'gas',
    meltingPoint: '−259.16 °C', boilingPoint: '−252.879 °C',
    density: '0.0000899 g/cm³', appearance: 'Colourless, odourless diatomic gas',
    electronegativity: '2.20', electronConfig: '1s¹',
    valency: '1', oxidationStates: ['+1', '−1'],
    ionizationEnergy: '1312 kJ/mol',
    atomicRadius: '53 pm', covalentRadius: '31 pm',
    electronAffinity: '−72.8 kJ/mol',
    abundance: 'Hydrogen is the most abundant element in the universe, making up about 75% of all normal matter by mass and over 90% by number of atoms. On Earth it is mostly found combined with oxygen in water, and in organic compounds. The atmosphere contains only trace amounts of molecular hydrogen (H₂).',
    uses: 'Used in the Haber process to produce ammonia for fertilisers; in petroleum refining (hydrocracking, desulphurisation); as rocket propellant in cryogenic engines; in fuel cells for clean electricity generation; and as a reducing agent in metallurgy. Biologically, it is a key component of water and all organic molecules.'
  },
  {
    number: 2, symbol: 'He', name: 'Helium', mass: '4.0026',
    category: 'noble-gas', row: 1, col: 18,
    period: 1, group: 18, block: 's', state: 'gas',
    meltingPoint: '−272.2 °C (25 atm)', boilingPoint: '−268.93 °C',
    density: '0.0001786 g/cm³', appearance: 'Colourless, odourless monatomic gas',
    electronegativity: 'N/A', electronConfig: '1s²',
    valency: '0', oxidationStates: ['0'],
    ionizationEnergy: '2372.3 kJ/mol',
    atomicRadius: '31 pm', covalentRadius: '28 pm',
    electronAffinity: '−48 kJ/mol (estimated)',
    abundance: 'Helium is the second most abundant element in the universe (~24% by mass). On Earth it is rare in the atmosphere (5.2 ppm by volume) but is found in natural gas deposits, formed by alpha-particle decay of radioactive minerals in the crust.',
    uses: 'Cryogenic coolant for MRI magnets and superconducting magnets; pressurising and purging fuel tanks in rocket systems; shielding gas in arc welding; carrier gas in gas chromatography; filling balloons and airships; leak detection; and in helium-neon lasers.'
  },

  /* ─── Period 2 ─── */
  {
    number: 3, symbol: 'Li', name: 'Lithium', mass: '6.941',
    category: 'alkali-metal', row: 2, col: 1,
    period: 2, group: 1, block: 's', state: 'solid',
    meltingPoint: '180.54 °C', boilingPoint: '1342 °C',
    density: '0.534 g/cm³', appearance: 'Silvery-white, soft metal',
    electronegativity: '0.98', electronConfig: '[He] 2s¹',
    valency: '1', oxidationStates: ['+1'],
    ionizationEnergy: '520.2 kJ/mol',
    atomicRadius: '167 pm', covalentRadius: '128 pm',
    electronAffinity: '−59.6 kJ/mol',
    abundance: 'Lithium does not occur freely in nature; it is found in small amounts in igneous rocks and in the waters of mineral springs. Significant deposits occur as spodumene and lepidolite minerals. Chile, Australia, and Argentina contain the world\'s largest lithium reserves.',
    uses: 'Dominant use is in lithium-ion batteries for electric vehicles and consumer electronics. Also used in ceramics and glass to lower melting points; as lithium stearate in greases; in air treatment to absorb CO₂; and medically as lithium carbonate for bipolar disorder treatment.'
  },
  {
    number: 4, symbol: 'Be', name: 'Beryllium', mass: '9.0122',
    category: 'alkaline-earth', row: 2, col: 2,
    period: 2, group: 2, block: 's', state: 'solid',
    meltingPoint: '1287 °C', boilingPoint: '2469 °C',
    density: '1.85 g/cm³', appearance: 'Steel-grey, strong, lightweight metal',
    electronegativity: '1.57', electronConfig: '[He] 2s²',
    valency: '2', oxidationStates: ['+2'],
    ionizationEnergy: '899.5 kJ/mol',
    atomicRadius: '112 pm', covalentRadius: '96 pm',
    electronAffinity: '−48 kJ/mol',
    abundance: 'Beryllium is a rare element in both the cosmos and Earth\'s crust (~2.8 ppm). Its cosmic scarcity is due to the fact that it is not produced in stellar nucleosynthesis. Commercially sourced from bertrandite and beryl minerals.',
    uses: 'Used in aerospace alloys (Cu-Be alloys) for springs, electrical contacts, spot-welding electrodes; as a neutron moderator in nuclear reactors; as X-ray windows due to its transparency; in gyroscopes, computer parts, and precision instruments. Highly toxic — inhalation causes berylliosis.'
  },
  {
    number: 5, symbol: 'B', name: 'Boron', mass: '10.81',
    category: 'metalloid', row: 2, col: 13,
    period: 2, group: 13, block: 'p', state: 'solid',
    meltingPoint: '2077 °C', boilingPoint: '4000 °C',
    density: '2.34 g/cm³', appearance: 'Black-brown amorphous or lustrous crystalline',
    electronegativity: '2.04', electronConfig: '[He] 2s² 2p¹',
    valency: '3', oxidationStates: ['+3'],
    ionizationEnergy: '800.6 kJ/mol',
    atomicRadius: '87 pm', covalentRadius: '84 pm',
    electronAffinity: '−26.7 kJ/mol',
    abundance: 'Boron occurs in nature as borates and borosilicates. Major mineral sources include kernite, borax, and ulexite. Turkey and the United States contain major reserves. Cosmic abundance is very low as it is primarily produced by cosmic-ray spallation rather than stellar nucleosynthesis.',
    uses: 'Borax is used in laundry detergents and cleaning products; borosilicate glass (Pyrex) in laboratory and cookware; boron carbide and nitride as hard abrasives and materials; boric acid as an antiseptic and insecticide; and boron-10 in nuclear reactor control rods due to its high neutron-capture cross-section.'
  },
  {
    number: 6, symbol: 'C', name: 'Carbon', mass: '12.011',
    category: 'reactive-nonmetal', row: 2, col: 14,
    period: 2, group: 14, block: 'p', state: 'solid',
    meltingPoint: '3642 °C (sublimes)', boilingPoint: '4827 °C',
    density: '2.267 g/cm³ (graphite); 3.513 g/cm³ (diamond)',
    appearance: 'Black (graphite); colourless (diamond)',
    electronegativity: '2.55', electronConfig: '[He] 2s² 2p²',
    valency: '4', oxidationStates: ['+4', '+2', '−4'],
    ionizationEnergy: '1086.5 kJ/mol',
    atomicRadius: '67 pm', covalentRadius: '77 pm (sp³)',
    electronAffinity: '−122 kJ/mol',
    abundance: 'Carbon is the fourth most abundant element in the universe by mass, and forms more compounds than any other element — the entire field of organic chemistry is based upon it. On Earth it occurs as diamond, graphite, coal, petroleum, natural gas, and dissolved as CO₂ in the ocean.',
    uses: 'Carbon is fundamental to all known life. Industrially: diamonds as abrasives and cutting tools; graphite as electrodes and lubricants; carbon fibre in lightweight composites; activated carbon for filtration; coke in steel-making; carbon black as pigment and rubber reinforcement; and CO₂ in refrigeration and carbonated beverages.'
  },
  {
    number: 7, symbol: 'N', name: 'Nitrogen', mass: '14.007',
    category: 'reactive-nonmetal', row: 2, col: 15,
    period: 2, group: 15, block: 'p', state: 'gas',
    meltingPoint: '−210.0 °C', boilingPoint: '−195.79 °C',
    density: '0.001251 g/cm³', appearance: 'Colourless, odourless diatomic gas',
    electronegativity: '3.04', electronConfig: '[He] 2s² 2p³',
    valency: '3', oxidationStates: ['+5', '+4', '+3', '+2', '+1', '−1', '−2', '−3'],
    ionizationEnergy: '1402.3 kJ/mol',
    atomicRadius: '56 pm', covalentRadius: '71 pm',
    electronAffinity: '−7 kJ/mol',
    abundance: 'Nitrogen makes up 78.1% of Earth\'s atmosphere by volume (as N₂). Large amounts occur in organic matter, soil minerals, and dissolved in oceans. The triple bond in N₂ makes it very inert. The nitrogen cycle moves nitrogen through the biosphere, atmosphere, and geosphere.',
    uses: 'Haber–Bosch process to produce ammonia for fertilisers; liquid nitrogen for cryopreservation, freeze-drying, and food freezing; inert atmosphere in food packaging to prevent oxidation; as a fire suppressant; in manufacture of nitric acid, nylon, and explosives; biologically essential in amino acids, DNA, and RNA.'
  },
  {
    number: 8, symbol: 'O', name: 'Oxygen', mass: '15.999',
    category: 'reactive-nonmetal', row: 2, col: 16,
    period: 2, group: 16, block: 'p', state: 'gas',
    meltingPoint: '−218.79 °C', boilingPoint: '−182.96 °C',
    density: '0.001429 g/cm³', appearance: 'Colourless, odourless diatomic gas',
    electronegativity: '3.44', electronConfig: '[He] 2s² 2p⁴',
    valency: '2', oxidationStates: ['−2', '−1'],
    ionizationEnergy: '1313.9 kJ/mol',
    atomicRadius: '48 pm', covalentRadius: '66 pm',
    electronAffinity: '−141 kJ/mol',
    abundance: 'Oxygen is the most abundant element in Earth\'s crust (~46% by mass) and the third most abundant in the universe. It constitutes 21% of the atmosphere. It is ubiquitous in minerals, silicates, water, and living matter. The ozone layer (O₃) protects life from UV radiation.',
    uses: 'Essential for aerobic respiration in all animals; medical supplemental oxygen for patients with respiratory conditions; oxy-fuel combustion in steel-making (BOF process) and cutting; production of ethylene oxide, methanol, and other chemicals; rocket oxidiser; and water treatment via ozone.'
  },
  {
    number: 9, symbol: 'F', name: 'Fluorine', mass: '18.998',
    category: 'halogen', row: 2, col: 17,
    period: 2, group: 17, block: 'p', state: 'gas',
    meltingPoint: '−219.67 °C', boilingPoint: '−188.11 °C',
    density: '0.001696 g/cm³', appearance: 'Pale yellow diatomic gas',
    electronegativity: '3.98', electronConfig: '[He] 2s² 2p⁵',
    valency: '1', oxidationStates: ['−1'],
    ionizationEnergy: '1681 kJ/mol',
    atomicRadius: '42 pm', covalentRadius: '57 pm',
    electronAffinity: '−328 kJ/mol',
    abundance: 'Fluorine is the 13th most abundant element in Earth\'s crust (~585 ppm). Found as fluorite (CaF₂), cryolite (Na₃AlF₆), and fluorapatite. It does not occur as the free element in nature due to its extreme reactivity.',
    uses: 'Production of uranium hexafluoride for nuclear fuel enrichment; fluorocarbon refrigerants (though many now phased out due to ozone depletion); PTFE (Teflon) non-stick coatings; fluoride in toothpaste and water fluoridation for dental health; etching of glass and silicon wafers in semiconductor manufacture.'
  },
  {
    number: 10, symbol: 'Ne', name: 'Neon', mass: '20.180',
    category: 'noble-gas', row: 2, col: 18,
    period: 2, group: 18, block: 'p', state: 'gas',
    meltingPoint: '−248.59 °C', boilingPoint: '−246.08 °C',
    density: '0.0008999 g/cm³', appearance: 'Colourless, odourless monatomic gas',
    electronegativity: 'N/A', electronConfig: '[He] 2s² 2p⁶',
    valency: '0', oxidationStates: ['0'],
    ionizationEnergy: '2080.7 kJ/mol',
    atomicRadius: '38 pm', covalentRadius: '58 pm',
    electronAffinity: 'N/A',
    abundance: 'Neon is the fifth most abundant element in the universe but extremely rare on Earth (<0.0018% of the atmosphere). It is obtained commercially by fractional distillation of liquid air. Neon does not combine with any other element or molecule.',
    uses: 'Neon signs (distinctive orange-red glow); high-voltage indicators; lightning arrestors; wave meter tubes; television tubes; cryogenic refrigerant; and used with helium-neon lasers. Liquid neon is an important commercial cryogenic refrigerant.'
  },

  /* ─── Period 3 ─── */
  {
    number: 11, symbol: 'Na', name: 'Sodium', mass: '22.990',
    category: 'alkali-metal', row: 3, col: 1,
    period: 3, group: 1, block: 's', state: 'solid',
    meltingPoint: '97.72 °C', boilingPoint: '883 °C',
    density: '0.968 g/cm³', appearance: 'Silvery-white, soft, waxy metal',
    electronegativity: '0.93', electronConfig: '[Ne] 3s¹',
    valency: '1', oxidationStates: ['+1'],
    ionizationEnergy: '495.8 kJ/mol',
    atomicRadius: '190 pm', covalentRadius: '166 pm',
    electronAffinity: '−52.8 kJ/mol',
    abundance: 'Sodium is the sixth most abundant element in Earth\'s crust (~2.8%). Found in numerous minerals including halite (NaCl), trona (Na₂CO₃·NaHCO₃·2H₂O), and silicate minerals. Seawater contains about 1.08% sodium by mass.',
    uses: 'Sodium chloride (table salt) is essential for food preservation and human physiology. Metallic sodium is used in the manufacture of sodium peroxide, sodium cyanide, and tetraethyl lead; as a coolant in fast breeder nuclear reactors; sodium vapour lamps for street lighting; and as a chemical reducing agent.'
  },
  {
    number: 12, symbol: 'Mg', name: 'Magnesium', mass: '24.305',
    category: 'alkaline-earth', row: 3, col: 2,
    period: 3, group: 2, block: 's', state: 'solid',
    meltingPoint: '650 °C', boilingPoint: '1091 °C',
    density: '1.738 g/cm³', appearance: 'Shiny grey solid',
    electronegativity: '1.31', electronConfig: '[Ne] 3s²',
    valency: '2', oxidationStates: ['+2'],
    ionizationEnergy: '737.7 kJ/mol',
    atomicRadius: '145 pm', covalentRadius: '141 pm',
    electronAffinity: '−21 kJ/mol (estimated)',
    abundance: 'Magnesium is the eighth most abundant element in Earth\'s crust (~2.1%) and the third most abundant element dissolved in seawater. Principal minerals: magnesite (MgCO₃), dolomite (CaMg(CO₃)₂), brucite (Mg(OH)₂). Seawater is the primary commercial source.',
    uses: 'Lightweight structural alloys for aerospace and automotive applications; die casting; sacrificial anodes to prevent corrosion of ships and pipelines; magnesium oxide in refractory furnace linings; in pyrotechnics (brilliant white flame); Epsom salt (MgSO₄) for therapeutic baths; and chlorophyll contains a central Mg²⁺ ion.'
  },
  {
    number: 13, symbol: 'Al', name: 'Aluminium', mass: '26.982',
    category: 'post-transition', row: 3, col: 13,
    period: 3, group: 13, block: 'p', state: 'solid',
    meltingPoint: '660.32 °C', boilingPoint: '2519 °C',
    density: '2.70 g/cm³', appearance: 'Silvery-grey, ductile metal',
    electronegativity: '1.61', electronConfig: '[Ne] 3s² 3p¹',
    valency: '3', oxidationStates: ['+3'],
    ionizationEnergy: '577.5 kJ/mol',
    atomicRadius: '118 pm', covalentRadius: '121 pm',
    electronAffinity: '−42.5 kJ/mol',
    abundance: 'Aluminium is the most abundant metal and the third most abundant element in Earth\'s crust (~8.2%). It occurs in minerals bauxite (primary ore), feldspar, cryolite, and many others but never in the native metallic form. It is the most abundant metal in the biosphere.',
    uses: 'Beverage cans, foil packaging, and cookware; aircraft, vehicle, and ship construction due to high strength-to-weight ratio; power transmission lines; building facades; aluminium oxide (alumina) in abrasives and refractories; alum in water purification; antacids; and as a substrate in lithographic printing.'
  },
  {
    number: 14, symbol: 'Si', name: 'Silicon', mass: '28.085',
    category: 'metalloid', row: 3, col: 14,
    period: 3, group: 14, block: 'p', state: 'solid',
    meltingPoint: '1414 °C', boilingPoint: '3265 °C',
    density: '2.33 g/cm³', appearance: 'Blue-grey, lustrous metalloid',
    electronegativity: '1.90', electronConfig: '[Ne] 3s² 3p²',
    valency: '4', oxidationStates: ['+4', '+2', '−4'],
    ionizationEnergy: '786.5 kJ/mol',
    atomicRadius: '111 pm', covalentRadius: '111 pm',
    electronAffinity: '−134 kJ/mol',
    abundance: 'Silicon is the second most abundant element in Earth\'s crust (~27.7% by mass), occurring mainly as silicon dioxide (quartz, sand, flint) and silicate minerals. It does not occur freely in nature. Sand and clay are the most widespread forms.',
    uses: 'Backbone of the semiconductor and solar energy industries — purified silicon is essential in transistors, integrated circuits, and photovoltaic cells; silicone polymers in lubricants, sealants, and breast implants; glass, ceramics, and construction materials; silicon carbide as an abrasive; and silicon dioxide in optical fibres.'
  },
  {
    number: 15, symbol: 'P', name: 'Phosphorus', mass: '30.974',
    category: 'reactive-nonmetal', row: 3, col: 15,
    period: 3, group: 15, block: 'p', state: 'solid',
    meltingPoint: '44.15 °C (white P)', boilingPoint: '280.5 °C (white P)',
    density: '1.823 g/cm³ (white)', appearance: 'Waxy white / red / black allotropes',
    electronegativity: '2.19', electronConfig: '[Ne] 3s² 3p³',
    valency: '3, 5', oxidationStates: ['+5', '+3', '+1', '−1', '−3'],
    ionizationEnergy: '1011.8 kJ/mol',
    atomicRadius: '98 pm', covalentRadius: '107 pm',
    electronAffinity: '−72 kJ/mol',
    abundance: 'Phosphorus does not occur freely in nature. Main mineral source is phosphate rock (apatite group). Occurs in all living cells as phosphate groups in DNA, RNA, ATP, and phospholipids. Morocco and Western Sahara hold the majority of the world\'s reserves.',
    uses: 'Fertiliser production (phosphate); detergents; matches and incendiary devices; steel and phosphor-bronze manufacture; phosphoric acid in food/beverages; water treatment; biological: fundamental component of DNA, RNA, ATP, and cell membranes; biopesticides; and flame retardants.'
  },
  {
    number: 16, symbol: 'S', name: 'Sulfur', mass: '32.06',
    category: 'reactive-nonmetal', row: 3, col: 16,
    period: 3, group: 16, block: 'p', state: 'solid',
    meltingPoint: '112.8 °C (rhombic)', boilingPoint: '444.61 °C',
    density: '2.07 g/cm³', appearance: 'Bright yellow crystalline solid',
    electronegativity: '2.58', electronConfig: '[Ne] 3s² 3p⁴',
    valency: '2, 4, 6', oxidationStates: ['+6', '+4', '+2', '−2'],
    ionizationEnergy: '999.6 kJ/mol',
    atomicRadius: '88 pm', covalentRadius: '105 pm',
    electronAffinity: '−200 kJ/mol',
    abundance: 'Sulfur occurs widely in nature both free and combined. Major natural sources: volcanic deposits, sulfide minerals (pyrite, galena), sulfate minerals (gypsum, anhydrite), and dissolved in oceans as sulfate. Recovered as a by-product of petroleum refining (hydrodesulphurisation).',
    uses: 'Sulfuric acid production (most manufactured industrial chemical); vulcanisation of rubber; gunpowder and explosives; fungicides and pesticides; pharmaceuticals (sulfonamides); paper bleaching; matches; and biologically: essential component of amino acids cysteine and methionine, vitamins B1 and biotin.'
  },
  {
    number: 17, symbol: 'Cl', name: 'Chlorine', mass: '35.45',
    category: 'halogen', row: 3, col: 17,
    period: 3, group: 17, block: 'p', state: 'gas',
    meltingPoint: '−101.5 °C', boilingPoint: '−34.04 °C',
    density: '0.003214 g/cm³', appearance: 'Pale yellow-green diatomic gas',
    electronegativity: '3.16', electronConfig: '[Ne] 3s² 3p⁵',
    valency: '1', oxidationStates: ['+7', '+5', '+3', '+1', '−1'],
    ionizationEnergy: '1251.2 kJ/mol',
    atomicRadius: '79 pm', covalentRadius: '102 pm',
    electronAffinity: '−349 kJ/mol',
    abundance: 'Chlorine is a widespread element on Earth. Most abundant as chloride ions dissolved in seawater and saline lakes. Major minerals include halite (NaCl), sylvite (KCl), and carnallite. Not found in the elemental state due to high reactivity.',
    uses: 'Water disinfection and purification; PVC plastic production; manufacture of chlorinated solvents, pesticides, and pharmaceuticals; bleaching agent in paper and textile industries; sodium hypochlorite (bleach) for sanitisation; swimming pool treatment; hydrochloric acid production; and biologically essential as chloride ion in nerve function.'
  },
  {
    number: 18, symbol: 'Ar', name: 'Argon', mass: '39.948',
    category: 'noble-gas', row: 3, col: 18,
    period: 3, group: 18, block: 'p', state: 'gas',
    meltingPoint: '−189.35 °C', boilingPoint: '−185.85 °C',
    density: '0.001784 g/cm³', appearance: 'Colourless, odourless monatomic gas',
    electronegativity: 'N/A', electronConfig: '[Ne] 3s² 3p⁶',
    valency: '0', oxidationStates: ['0'],
    ionizationEnergy: '1520.6 kJ/mol',
    atomicRadius: '71 pm', covalentRadius: '106 pm',
    electronAffinity: 'N/A',
    abundance: 'Argon is the third most abundant gas in Earth\'s atmosphere at 0.934% by volume. It is produced in the atmosphere by radioactive decay of potassium-40. Obtained commercially by fractional distillation of liquid air. Completely chemically inert under all practical conditions.',
    uses: 'Shielding gas in arc welding and metal cutting to prevent oxidation; filling incandescent and fluorescent light bulbs; inert atmosphere in production of reactive metals (titanium, silicon); blanket gas over liquid steel; in geoscience as a tracer for groundwater age dating; and argon-ion lasers for scientific use.'
  },

  /* ─── Period 4 ─── */
  {
    number: 19, symbol: 'K', name: 'Potassium', mass: '39.098',
    category: 'alkali-metal', row: 4, col: 1,
    period: 4, group: 1, block: 's', state: 'solid',
    meltingPoint: '63.5 °C', boilingPoint: '759 °C',
    density: '0.862 g/cm³', appearance: 'Silvery-white, soft metal',
    electronegativity: '0.82', electronConfig: '[Ar] 4s¹',
    valency: '1', oxidationStates: ['+1'],
    ionizationEnergy: '418.8 kJ/mol',
    atomicRadius: '243 pm', covalentRadius: '203 pm',
    electronAffinity: '−48.4 kJ/mol',
    abundance: 'Potassium is the seventh most abundant element in Earth\'s crust (~2.1%). Found in minerals sylvite (KCl), carnallite, and feldspars. Seawater contains ~380 mg/L. Produced commercially from potash deposits formed by evaporite deposits.',
    uses: 'Potassium is an essential macronutrient for all living organisms — critical for nerve impulse transmission, muscle contraction, and osmotic balance. Major use as fertiliser (potash). Also used in potassium hydroxide for soap making, potassium nitrate in fertilisers and gunpowder, potassium permanganate as an oxidising agent, and potassium iodide in thyroid medicine.'
  },
  {
    number: 20, symbol: 'Ca', name: 'Calcium', mass: '40.078',
    category: 'alkaline-earth', row: 4, col: 2,
    period: 4, group: 2, block: 's', state: 'solid',
    meltingPoint: '842 °C', boilingPoint: '1484 °C',
    density: '1.55 g/cm³', appearance: 'Dull grey, silver surface when freshly cut',
    electronegativity: '1.00', electronConfig: '[Ar] 4s²',
    valency: '2', oxidationStates: ['+2'],
    ionizationEnergy: '589.8 kJ/mol',
    atomicRadius: '194 pm', covalentRadius: '176 pm',
    electronAffinity: '−2.37 kJ/mol',
    abundance: 'Calcium is the fifth most abundant element in Earth\'s crust (~3.6%). Found widely as limestone (CaCO₃), marble, chalk, dolomite (CaMg(CO₃)₂), gypsum (CaSO₄·2H₂O), and fluorite. It is the most abundant cation in human blood plasma.',
    uses: 'Calcium is essential for bone and tooth formation, blood clotting, muscle contraction, and nerve signalling. Lime (CaO) and cement are the basis of the construction industry; calcium chloride used as a de-icer; calcium compounds as antacids, dietary supplements; calcium metal as a reducing agent in metal extraction; chalk in writing and rubber.'
  },
  { number: 21, symbol: 'Sc', name: 'Scandium',  mass: '44.956',  category: 'transition-metal', row: 4, col: 3,  period: 4, group: 3,  block: 'd', state: 'solid', meltingPoint: '1541 °C', boilingPoint: '2836 °C', density: '2.985 g/cm³',   appearance: 'Silvery-white metal', electronegativity: '1.36', electronConfig: '[Ar] 3d¹ 4s²',  valency: '3', oxidationStates: ['+3'],        ionizationEnergy: '633.1 kJ/mol',  atomicRadius: '184 pm', covalentRadius: '170 pm', electronAffinity: '−18.1 kJ/mol',  abundance: 'Scandium is rare in Earth\'s crust (~22 ppm), found in small amounts in many minerals including wolframite and thortveitite. Produced as a by-product of uranium processing.', uses: 'Scandium–aluminium alloys for aerospace and sports equipment; scandium iodide in stadium lighting (produces daylight-like colour); solid oxide fuel cells.' },
  { number: 22, symbol: 'Ti', name: 'Titanium',  mass: '47.867',  category: 'transition-metal', row: 4, col: 4,  period: 4, group: 4,  block: 'd', state: 'solid', meltingPoint: '1668 °C', boilingPoint: '3287 °C', density: '4.506 g/cm³',   appearance: 'Silvery metallic',    electronegativity: '1.54', electronConfig: '[Ar] 3d² 4s²',  valency: '4', oxidationStates: ['+4','+3','+2'], ionizationEnergy: '658.8 kJ/mol',  atomicRadius: '176 pm', covalentRadius: '160 pm', electronAffinity: '−7.6 kJ/mol',  abundance: 'Titanium is the ninth most abundant element in Earth\'s crust (~5900 ppm). Primary ores are ilmenite (FeTiO₃) and rutile (TiO₂). Found on all continents.', uses: 'Aerospace alloys; medical implants and prosthetics (biocompatible); titanium dioxide as white paint pigment, sunscreen UV filter; jewellery; and desalination plants.' },
  { number: 23, symbol: 'V',  name: 'Vanadium',  mass: '50.942',  category: 'transition-metal', row: 4, col: 5,  period: 4, group: 5,  block: 'd', state: 'solid', meltingPoint: '1910 °C', boilingPoint: '3407 °C', density: '6.11 g/cm³',    appearance: 'Blue-silver-grey',    electronegativity: '1.63', electronConfig: '[Ar] 3d³ 4s²',  valency: '5', oxidationStates: ['+5','+4','+3','+2'], ionizationEnergy: '650.9 kJ/mol', atomicRadius: '171 pm', covalentRadius: '153 pm', electronAffinity: '−50.6 kJ/mol', abundance: 'Vanadium (~150 ppm in crust) is found in magnetite, vanadinite, and carnotite. China and Russia are major producers.', uses: 'Ferrovanadium for high-strength steel (tools, springs, armour); vanadium pentoxide as catalysts in sulfuric acid synthesis; vanadium redox batteries for grid energy storage.' },
  { number: 24, symbol: 'Cr', name: 'Chromium',  mass: '51.996',  category: 'transition-metal', row: 4, col: 6,  period: 4, group: 6,  block: 'd', state: 'solid', meltingPoint: '1907 °C', boilingPoint: '2671 °C', density: '7.19 g/cm³',    appearance: 'Silvery, lustrous, hard', electronegativity: '1.66', electronConfig: '[Ar] 3d⁵ 4s¹',  valency: '3,6', oxidationStates: ['+6','+3','+2'], ionizationEnergy: '652.9 kJ/mol', atomicRadius: '166 pm', covalentRadius: '139 pm', electronAffinity: '−64.3 kJ/mol', abundance: 'Chromium (~100 ppm in crust). Principal ore is chromite (FeCr₂O₄). South Africa and Kazakhstan hold major reserves.', uses: 'Stainless steel (corrosion resistance); chrome plating for decorative and protective finishes; chromium compounds as pigments; tanning leather; chrome hardening in metallurgy.' },
  { number: 25, symbol: 'Mn', name: 'Manganese', mass: '54.938',  category: 'transition-metal', row: 4, col: 7,  period: 4, group: 7,  block: 'd', state: 'solid', meltingPoint: '1246 °C', boilingPoint: '2061 °C', density: '7.21 g/cm³',    appearance: 'Silvery metallic, grey tinged', electronegativity: '1.55', electronConfig: '[Ar] 3d⁵ 4s²', valency: '2,4,7', oxidationStates: ['+7','+4','+3','+2','+1','-1'], ionizationEnergy: '717.3 kJ/mol', atomicRadius: '161 pm', covalentRadius: '139 pm', electronAffinity: 'N/A',        abundance: 'Manganese (~950 ppm in crust). Ore: pyrolusite (MnO₂). Significant deep-sea nodule deposits exist. South Africa and Australia are major producers.', uses: 'Steel alloy (increases strength and hardness); dry-cell batteries (MnO₂ cathode); potassium permanganate as oxidising/disinfecting agent; pigments; biologically essential trace element (enzyme cofactor).' },
  {
    number: 26, symbol: 'Fe', name: 'Iron', mass: '55.845',
    category: 'transition-metal', row: 4, col: 8,
    period: 4, group: 8, block: 'd', state: 'solid',
    meltingPoint: '1538 °C', boilingPoint: '2861 °C',
    density: '7.874 g/cm³', appearance: 'Lustrous, metallic, greyish tinge',
    electronegativity: '1.83', electronConfig: '[Ar] 3d⁶ 4s²',
    valency: '2, 3', oxidationStates: ['+3', '+2', '+6'],
    ionizationEnergy: '762.5 kJ/mol',
    atomicRadius: '156 pm', covalentRadius: '132 pm',
    electronAffinity: '−15.7 kJ/mol',
    abundance: 'Iron is the most abundant element on Earth by mass (32% of the total mass, forming the majority of Earth\'s core). It is the fourth most abundant element in Earth\'s crust (~5.6%). Principal ores are haematite (Fe₂O₃), magnetite (Fe₃O₄), and goethite.',
    uses: 'The most widely used metal — foundation of the global steel industry. Used in construction, machinery, vehicles, ships, tools, appliances, and infrastructure. Cast iron for cookware and engine blocks; wrought iron for ornamental work; iron compounds in pigments, magnets, and catalysts; haemoglobin in blood transports oxygen.'
  },
  { number: 27, symbol: 'Co', name: 'Cobalt',    mass: '58.933',  category: 'transition-metal', row: 4, col: 9,  period: 4, group: 9,  block: 'd', state: 'solid', meltingPoint: '1495 °C', boilingPoint: '2927 °C', density: '8.90 g/cm³',    appearance: 'Hard, lustrous, silver-grey',  electronegativity: '1.88', electronConfig: '[Ar] 3d⁷ 4s²', valency: '2,3', oxidationStates: ['+3','+2'],       ionizationEnergy: '760.4 kJ/mol',  atomicRadius: '152 pm', covalentRadius: '126 pm', electronAffinity: '−63.7 kJ/mol', abundance: 'Cobalt is rare (~25 ppm in crust). Mined mainly from the DRC as a by-product of copper/nickel extraction. Found in cobaltite and erythrite minerals.', uses: 'Lithium-ion battery cathodes; superalloys for jet engines; cobalt blue pigment; magnetic alloys (Alnico); cobalt-60 as radioactive tracer; vitamin B12 contains cobalt.' },
  { number: 28, symbol: 'Ni', name: 'Nickel',    mass: '58.693',  category: 'transition-metal', row: 4, col: 10, period: 4, group: 10, block: 'd', state: 'solid', meltingPoint: '1455 °C', boilingPoint: '2913 °C', density: '8.908 g/cm³',   appearance: 'Lustrous, metallic, silver-tinted', electronegativity: '1.91', electronConfig: '[Ar] 3d⁸ 4s²', valency: '2', oxidationStates: ['+2','+3'],       ionizationEnergy: '737.1 kJ/mol',  atomicRadius: '149 pm', covalentRadius: '124 pm', electronAffinity: '−112 kJ/mol',  abundance: 'Nickel (~80 ppm in crust) is primarily mined from pentlandite and laterite ores. Major producers: Indonesia, Philippines, Russia. Earth\'s core is believed to be iron-nickel alloy.', uses: 'Stainless steel and other corrosion-resistant alloys; batteries (Ni-MH, Ni-Cd); electroplating; coins; catalysts in hydrogenation reactions; shape-memory Nitinol alloy.' },
  {
    number: 29, symbol: 'Cu', name: 'Copper', mass: '63.546',
    category: 'transition-metal', row: 4, col: 11,
    period: 4, group: 11, block: 'd', state: 'solid',
    meltingPoint: '1084.62 °C', boilingPoint: '2562 °C',
    density: '8.96 g/cm³', appearance: 'Reddish-orange, lustrous metal',
    electronegativity: '1.90', electronConfig: '[Ar] 3d¹⁰ 4s¹',
    valency: '2, 1', oxidationStates: ['+2', '+1'],
    ionizationEnergy: '745.5 kJ/mol',
    atomicRadius: '145 pm', covalentRadius: '132 pm',
    electronAffinity: '−118.4 kJ/mol',
    abundance: 'Copper (~60 ppm in crust) occurs as the native metal and in minerals including chalcopyrite (CuFeS₂), malachite, and azurite. Chile is the world\'s largest producer, accounting for ~28% of global output.',
    uses: 'Electrical wiring (>60% of global copper use) due to excellent conductivity; plumbing and heat exchangers; coins and decorative art; alloys: brass (Cu-Zn) and bronze (Cu-Sn); fungicides; copper phthalocyanine as a pigment; biologically: essential trace element — cofactor in enzymes including cytochrome c oxidase.'
  },
  { number: 30, symbol: 'Zn', name: 'Zinc',      mass: '65.38',   category: 'transition-metal', row: 4, col: 12, period: 4, group: 12, block: 'd', state: 'solid', meltingPoint: '419.53 °C', boilingPoint: '907 °C',  density: '7.134 g/cm³',   appearance: 'Bluish-white, lustrous metal',  electronegativity: '1.65', electronConfig: '[Ar] 3d¹⁰ 4s²', valency: '2', oxidationStates: ['+2'],         ionizationEnergy: '906.4 kJ/mol',  atomicRadius: '142 pm', covalentRadius: '122 pm', electronAffinity: '−58 kJ/mol',   abundance: 'Zinc (~70 ppm in crust). Principal ore: sphalerite (ZnS). China, Peru, and Australia are major producers.', uses: 'Galvanising steel to prevent rust; die-casting alloys; brass manufacture; zinc oxide in sunscreens, rubber, and paints; zinc supplement for immune function; biologically essential trace element (>300 enzyme cofactor).' },
  { number: 31, symbol: 'Ga', name: 'Gallium',   mass: '69.723',  category: 'post-transition',  row: 4, col: 13, period: 4, group: 13, block: 'p', state: 'solid', meltingPoint: '29.76 °C',  boilingPoint: '2229 °C', density: '5.91 g/cm³',    appearance: 'Silvery, melts slightly above RT', electronegativity: '1.81', electronConfig: '[Ar] 3d¹⁰ 4s² 4p¹', valency: '3', oxidationStates: ['+3'], ionizationEnergy: '578.8 kJ/mol',  atomicRadius: '136 pm', covalentRadius: '122 pm', electronAffinity: '−29 kJ/mol',   abundance: 'Gallium is rare (~19 ppm in crust) and has no primary mineral ores — recovered as a by-product of zinc and bauxite processing.', uses: 'GaAs and GaN semiconductors for LEDs (blue/violet light), laser diodes, solar cells, and RF electronics; gallium alloys as liquid-metal thermal compounds; MRI contrast agents.' },
  { number: 32, symbol: 'Ge', name: 'Germanium', mass: '72.630',  category: 'metalloid',        row: 4, col: 14, period: 4, group: 14, block: 'p', state: 'solid', meltingPoint: '938.25 °C', boilingPoint: '2833 °C', density: '5.323 g/cm³',   appearance: 'Greyish-white metalloid',     electronegativity: '2.01', electronConfig: '[Ar] 3d¹⁰ 4s² 4p²', valency: '4', oxidationStates: ['+4','+2'], ionizationEnergy: '762 kJ/mol',    atomicRadius: '125 pm', covalentRadius: '122 pm', electronAffinity: '−119 kJ/mol',  abundance: 'Germanium is rare (~1.5 ppm in crust). By-product of zinc ore smelting and coal combustion. Sphalerite is the primary source mineral.', uses: 'Fibre-optic systems; infrared optics; semiconductors (early transistors); solar cell substrates; PET plastic catalyst; Germanium-68 in PET imaging.' },
  { number: 33, symbol: 'As', name: 'Arsenic',   mass: '74.922',  category: 'metalloid',        row: 4, col: 15, period: 4, group: 15, block: 'p', state: 'solid', meltingPoint: '816.9 °C (sublimes)', boilingPoint: '887 °C (sublimes)', density: '5.727 g/cm³', appearance: 'Metallic grey or yellow allotrope', electronegativity: '2.18', electronConfig: '[Ar] 3d¹⁰ 4s² 4p³', valency: '3,5', oxidationStates: ['+5','+3','-3'], ionizationEnergy: '947 kJ/mol', atomicRadius: '114 pm', covalentRadius: '119 pm', electronAffinity: '−78 kJ/mol', abundance: 'Arsenic (~1.5 ppm in crust). Primary mineral: arsenopyrite (FeAsS). By-product of metal smelting. Present in groundwater in Bangladesh and other regions.', uses: 'Gallium arsenide semiconductors; lead-acid battery plates; wood preservative (historical, now restricted); arsenic trioxide in cancer treatment (acute promyelocytic leukaemia).' },
  { number: 34, symbol: 'Se', name: 'Selenium',  mass: '78.971',  category: 'reactive-nonmetal', row: 4, col: 16, period: 4, group: 16, block: 'p', state: 'solid', meltingPoint: '220.8 °C',  boilingPoint: '685 °C',  density: '4.809 g/cm³',   appearance: 'Red or grey allotropes',      electronegativity: '2.55', electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁴', valency: '2,4,6', oxidationStates: ['+6','+4','-2'], ionizationEnergy: '941 kJ/mol', atomicRadius: '103 pm', covalentRadius: '120 pm', electronAffinity: '−195 kJ/mol', abundance: 'Selenium (~0.05 ppm in crust). By-product of copper refining. Found in metal sulfide ores. Essential trace element in selenoproteins.', uses: 'Photovoltaic cells; xerography; glass decolourisation; pigments (red); alloy additive; selenium sulfide in anti-dandruff shampoo; essential trace element in humans (glutathione peroxidase).' },
  { number: 35, symbol: 'Br', name: 'Bromine',   mass: '79.904',  category: 'halogen',          row: 4, col: 17, period: 4, group: 17, block: 'p', state: 'liquid', meltingPoint: '−7.2 °C',   boilingPoint: '58.8 °C', density: '3.1028 g/cm³',  appearance: 'Reddish-brown fuming liquid',  electronegativity: '2.96', electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁵', valency: '1', oxidationStates: ['+5','+1','-1'], ionizationEnergy: '1139.9 kJ/mol', atomicRadius: '94 pm', covalentRadius: '120 pm', electronAffinity: '−325 kJ/mol', abundance: 'Bromine (~2.4 ppm in crust) occurs as bromide ions in seawater and brine wells. Israel and China are major producers.', uses: 'Flame retardants in electronics and textiles; methyl bromide fumigant; photographic film (silver bromide); water purification; brominated pharmaceuticals; dyes.' },
  { number: 36, symbol: 'Kr', name: 'Krypton',   mass: '83.798',  category: 'noble-gas',        row: 4, col: 18, period: 4, group: 18, block: 'p', state: 'gas',   meltingPoint: '−157.37 °C', boilingPoint: '−153.22 °C', density: '0.003733 g/cm³', appearance: 'Colourless, odourless gas', electronegativity: 'N/A', electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁶', valency: '0', oxidationStates: ['0','2'], ionizationEnergy: '1350.8 kJ/mol', atomicRadius: '88 pm', covalentRadius: '116 pm', electronAffinity: 'N/A', abundance: 'Krypton is present in Earth\'s atmosphere at about 1.14 ppm by volume. Obtained by fractional distillation of liquid air.', uses: 'High-performance lighting (krypton-filled incandescent bulbs); krypton fluoride lasers for UV lithography; photographic flash lamps; and krypton-85 as a radioactive tracer.' },

  /* ─── Period 5 ─── */
  { number: 37, symbol: 'Rb', name: 'Rubidium',  mass: '85.468',  category: 'alkali-metal',     row: 5, col: 1,  period: 5, group: 1,  block: 's', state: 'solid', meltingPoint: '39.31 °C',  boilingPoint: '688 °C',  density: '1.532 g/cm³',   appearance: 'Grey-white, soft metal',      electronegativity: '0.82', electronConfig: '[Kr] 5s¹', valency: '1', oxidationStates: ['+1'], ionizationEnergy: '403 kJ/mol', atomicRadius: '265 pm', covalentRadius: '220 pm', electronAffinity: '−46.9 kJ/mol', abundance: 'Rubidium (~90 ppm in crust). No dedicated ore; recovered from lepidolite and pollucite as a by-product. Highly reactive with air and water.', uses: 'Atomic clocks (rubidium frequency standard); biomedical imaging; night-vision devices; photocells; specialty glass and ceramics; used in physics research.' },
  { number: 38, symbol: 'Sr', name: 'Strontium', mass: '87.62',   category: 'alkaline-earth',   row: 5, col: 2,  period: 5, group: 2,  block: 's', state: 'solid', meltingPoint: '777 °C',    boilingPoint: '1382 °C', density: '2.64 g/cm³',    appearance: 'Silvery-white, soft, pliable', electronegativity: '0.95', electronConfig: '[Kr] 5s²', valency: '2', oxidationStates: ['+2'], ionizationEnergy: '549.5 kJ/mol', atomicRadius: '219 pm', covalentRadius: '195 pm', electronAffinity: '−5.03 kJ/mol', abundance: 'Strontium (~360 ppm in crust). Mined as celestite (SrSO₄) and strontianite (SrCO₃). China and Spain are major producers.', uses: 'Strontium carbonate in colour CRT TV glass; fireworks and flares (crimson red colour); magnets; strontium-90 in RTGs and cancer therapy; water purification; toothpaste for sensitive teeth (SrCl₂).' },
  { number: 39, symbol: 'Y',  name: 'Yttrium',   mass: '88.906',  category: 'transition-metal', row: 5, col: 3,  period: 5, group: 3,  block: 'd', state: 'solid', meltingPoint: '1522 °C',   boilingPoint: '3345 °C', density: '4.472 g/cm³',   appearance: 'Silvery-white metal',         electronegativity: '1.22', electronConfig: '[Kr] 4d¹ 5s²', valency: '3', oxidationStates: ['+3'], ionizationEnergy: '600 kJ/mol', atomicRadius: '212 pm', covalentRadius: '190 pm', electronAffinity: '−29.6 kJ/mol', abundance: 'Yttrium (~33 ppm in crust). Found in monazite, bastnäsite, and xenotime minerals. China dominates production.', uses: 'YAG lasers; yttrium orthovanadate in phosphors for CRT screens; yttria-stabilised zirconia for solid oxide fuel cells and dental crowns; superconductors (YBCO); high-temperature alloys.' },
  { number: 40, symbol: 'Zr', name: 'Zirconium', mass: '91.224',  category: 'transition-metal', row: 5, col: 4,  period: 5, group: 4,  block: 'd', state: 'solid', meltingPoint: '1855 °C',   boilingPoint: '4409 °C', density: '6.52 g/cm³',    appearance: 'Silvery-white, lustrous',     electronegativity: '1.33', electronConfig: '[Kr] 4d² 5s²', valency: '4', oxidationStates: ['+4','+3','+2'], ionizationEnergy: '640.1 kJ/mol', atomicRadius: '206 pm', covalentRadius: '175 pm', electronAffinity: '−41.1 kJ/mol', abundance: 'Zirconium (~165 ppm in crust). Primary ore: zircon (ZrSiO₄). Also baddeleyite (ZrO₂). Ores concentrate in beach sands.', uses: 'Nuclear reactor fuel cladding tubes (low neutron absorption); zirconia in ceramics, cutting tools, dental prosthetics; high-purity alloys; hafnium-free zirconium in spacecraft.' },
  { number: 41, symbol: 'Nb', name: 'Niobium',   mass: '92.906',  category: 'transition-metal', row: 5, col: 5,  period: 5, group: 5,  block: 'd', state: 'solid', meltingPoint: '2477 °C',   boilingPoint: '4744 °C', density: '8.57 g/cm³',    appearance: 'Grey, crystalline',           electronegativity: '1.60', electronConfig: '[Kr] 4d⁴ 5s¹', valency: '5', oxidationStates: ['+5','+3','+2'], ionizationEnergy: '652.1 kJ/mol', atomicRadius: '198 pm', covalentRadius: '164 pm', electronAffinity: '−86.1 kJ/mol', abundance: 'Niobium (~20 ppm in crust). Brazil holds ~90% of world reserves (pyrochlore mineral). Often associated with tantalum.', uses: 'HSLA steel for pipelines and structural steel; superconducting magnets (Nb-Ti alloy); MRI machines; jet engine alloys; Nb-Sn superconductors for particle accelerators.' },
  { number: 42, symbol: 'Mo', name: 'Molybdenum',mass: '95.96',   category: 'transition-metal', row: 5, col: 6,  period: 5, group: 6,  block: 'd', state: 'solid', meltingPoint: '2623 °C',   boilingPoint: '4639 °C', density: '10.28 g/cm³',   appearance: 'Silvery metal',               electronegativity: '2.16', electronConfig: '[Kr] 4d⁵ 5s¹', valency: '6', oxidationStates: ['+6','+4','+2'], ionizationEnergy: '684.3 kJ/mol', atomicRadius: '190 pm', covalentRadius: '154 pm', electronAffinity: '−72 kJ/mol', abundance: 'Molybdenum (~1.2 ppm in crust). Primary ore: molybdenite (MoS₂). Chile and China are major producers.', uses: 'High-temperature alloy steels and superalloys; lubricant (MoS₂); molybdenum blue pigment; catalysts for desulphurisation of petroleum; essential trace element for nitrogen fixation enzymes (nitrogenase).' },
  { number: 43, symbol: 'Tc', name: 'Technetium', mass: '(98)',    category: 'transition-metal', row: 5, col: 7,  period: 5, group: 7,  block: 'd', state: 'solid', meltingPoint: '2157 °C',   boilingPoint: '4265 °C', density: '11.0 g/cm³',    appearance: 'Shiny grey metal',            electronegativity: '1.90', electronConfig: '[Kr] 4d⁵ 5s²', valency: '7', oxidationStates: ['+7','+4'],     ionizationEnergy: '702 kJ/mol',    atomicRadius: '183 pm', covalentRadius: '147 pm', electronAffinity: '−53 kJ/mol', abundance: 'Technetium has no stable isotopes and does not occur naturally in significant quantities on Earth. Trace amounts exist as fission products in uranium ores. Produced artificially in nuclear reactors.', uses: 'Technetium-99m is the most widely used medical radioisotope for nuclear medicine diagnostic imaging (bone scans, heart imaging, cancer detection). Also used as a corrosion inhibitor in steel.' },
  { number: 44, symbol: 'Ru', name: 'Ruthenium', mass: '101.07',  category: 'transition-metal', row: 5, col: 8,  period: 5, group: 8,  block: 'd', state: 'solid', meltingPoint: '2334 °C',   boilingPoint: '4150 °C', density: '12.45 g/cm³',   appearance: 'Silvery-white, hard metal',   electronegativity: '2.20', electronConfig: '[Kr] 4d⁷ 5s¹', valency: '8', oxidationStates: ['+8','+6','+4','+3','+2'], ionizationEnergy: '710.2 kJ/mol', atomicRadius: '178 pm', covalentRadius: '146 pm', electronAffinity: '−101 kJ/mol', abundance: 'Ruthenium is one of the rarest elements on Earth (~0.001 ppm in crust). Found in platinum-group mineral deposits in South Africa and Russia.', uses: 'Electrical contacts and thick-film resistors; hard alloys for fountain pen nibs and instrument pivots; catalysis (Grubbs catalyst precursors); dye-sensitised solar cells; data storage magnetic alloys; ruthenium tetroxide as an oxidiser.' },
  { number: 45, symbol: 'Rh', name: 'Rhodium',   mass: '102.91',  category: 'transition-metal', row: 5, col: 9,  period: 5, group: 9,  block: 'd', state: 'solid', meltingPoint: '1964 °C',   boilingPoint: '3695 °C', density: '12.41 g/cm³',   appearance: 'Silvery-white, hard',         electronegativity: '2.28', electronConfig: '[Kr] 4d⁸ 5s¹', valency: '3', oxidationStates: ['+3','+4','+6'], ionizationEnergy: '719.7 kJ/mol', atomicRadius: '173 pm', covalentRadius: '142 pm', electronAffinity: '−109.7 kJ/mol', abundance: 'Rhodium is extremely rare (~0.001 ppm in crust, one of the rarest metals). Recovered as a by-product from platinum and nickel mining in South Africa.', uses: 'Catalytic converters in vehicles (reduces NOₓ, CO, hydrocarbons); industrial catalysts for production of acetic acid and nitric acid; optical mirror coatings; jewellery plating; thermocouples.' },
  { number: 46, symbol: 'Pd', name: 'Palladium', mass: '106.42',  category: 'transition-metal', row: 5, col: 10, period: 5, group: 10, block: 'd', state: 'solid', meltingPoint: '1554.9 °C', boilingPoint: '2963 °C', density: '12.023 g/cm³',  appearance: 'Silvery-white metal',         electronegativity: '2.20', electronConfig: '[Kr] 4d¹⁰', valency: '2,4', oxidationStates: ['+4','+2'],  ionizationEnergy: '804.4 kJ/mol', atomicRadius: '169 pm', covalentRadius: '139 pm', electronAffinity: '−53.7 kJ/mol', abundance: 'Palladium is rare (~0.015 ppm in crust). Mined primarily from nickel and copper deposits in Russia and South Africa. Also recovered from spent catalytic converters.', uses: 'Catalytic converters (largest use); hydrogen storage and purification; electronics (multilayer ceramic capacitors); dentistry; jewellery (white gold alloys); cross-coupling reactions in pharmaceuticals (Pd-catalysed synthesis).' },
  {
    number: 47, symbol: 'Ag', name: 'Silver', mass: '107.87',
    category: 'transition-metal', row: 5, col: 11,
    period: 5, group: 11, block: 'd', state: 'solid',
    meltingPoint: '961.78 °C', boilingPoint: '2162 °C',
    density: '10.49 g/cm³', appearance: 'Lustrous, white, metallic',
    electronegativity: '1.93', electronConfig: '[Kr] 4d¹⁰ 5s¹',
    valency: '1', oxidationStates: ['+1', '+2'],
    ionizationEnergy: '731 kJ/mol',
    atomicRadius: '165 pm', covalentRadius: '145 pm',
    electronAffinity: '−125.6 kJ/mol',
    abundance: 'Silver occurs as the native metal and in minerals argentite (Ag₂S) and horn silver (AgCl). Major producers: Mexico, Peru, China, Russia. Silver is often a by-product of lead, zinc, and copper mining.',
    uses: 'Photography (silver halide films, though largely replaced digitally); electrical contacts and conductors (highest electrical conductivity of all metals); jewellery and silverware; mirrors (silver coating); antibacterial agent (silver nanoparticles) in wound dressings; brazing alloys; solar panels; and silver oxide batteries.'
  },
  { number: 48, symbol: 'Cd', name: 'Cadmium',   mass: '112.41',  category: 'transition-metal', row: 5, col: 12, period: 5, group: 12, block: 'd', state: 'solid', meltingPoint: '321.07 °C', boilingPoint: '767 °C',  density: '8.65 g/cm³',    appearance: 'Bluish-silver, soft metal',   electronegativity: '1.69', electronConfig: '[Kr] 4d¹⁰ 5s²', valency: '2', oxidationStates: ['+2'],        ionizationEnergy: '867.8 kJ/mol', atomicRadius: '161 pm', covalentRadius: '144 pm', electronAffinity: '−26 kJ/mol', abundance: 'Cadmium (~0.15 ppm in crust). By-product of zinc refining. Highly toxic — bioaccumulates in organisms. The Itai-itai disease in Japan was caused by cadmium contamination.', uses: 'Nickel-cadmium rechargeable batteries (though being phased out); cadmium sulfide/selenide as yellow/red pigments; cadmium telluride in photovoltaic solar cells; nuclear reactor control rods; electroplating.' },
  { number: 49, symbol: 'In', name: 'Indium',    mass: '114.82',  category: 'post-transition',  row: 5, col: 13, period: 5, group: 13, block: 'p', state: 'solid', meltingPoint: '156.60 °C', boilingPoint: '2072 °C', density: '7.31 g/cm³',    appearance: 'Silvery-white, soft metal',   electronegativity: '1.78', electronConfig: '[Kr] 4d¹⁰ 5s² 5p¹', valency: '3', oxidationStates: ['+3','+1'], ionizationEnergy: '558.3 kJ/mol', atomicRadius: '167 pm', covalentRadius: '142 pm', electronAffinity: '−28.9 kJ/mol', abundance: 'Indium is rare (~0.25 ppm in crust). By-product of zinc ore smelting. China produces ~60% of the world\'s indium.', uses: 'Indium tin oxide (ITO) transparent conductor in LCD screens, touchscreens, solar cells; low-melting alloys; solders; bearings; InP semiconductors for LEDs and laser diodes.' },
  { number: 50, symbol: 'Sn', name: 'Tin',       mass: '118.71',  category: 'post-transition',  row: 5, col: 14, period: 5, group: 14, block: 'p', state: 'solid', meltingPoint: '231.93 °C', boilingPoint: '2602 °C', density: '7.265 g/cm³',   appearance: 'Silvery-white, malleable',    electronegativity: '1.96', electronConfig: '[Kr] 4d¹⁰ 5s² 5p²', valency: '4,2', oxidationStates: ['+4','+2'], ionizationEnergy: '708.6 kJ/mol', atomicRadius: '145 pm', covalentRadius: '139 pm', electronAffinity: '−107.3 kJ/mol', abundance: 'Tin (~2.3 ppm in crust). Primary ore: cassiterite (SnO₂). Major producers: China, Indonesia, Myanmar.', uses: 'Tin plating of steel for food cans; solder (Sn-Pb, now Sn-Cu alloys); bronze (Cu-Sn); pewter; organotin compounds as stabilisers in PVC; glass coating; stannous fluoride in toothpaste.' },
  { number: 51, symbol: 'Sb', name: 'Antimony',  mass: '121.76',  category: 'metalloid',        row: 5, col: 15, period: 5, group: 15, block: 'p', state: 'solid', meltingPoint: '630.63 °C', boilingPoint: '1587 °C', density: '6.697 g/cm³',   appearance: 'Silvery-grey lustrous metalloid', electronegativity: '2.05', electronConfig: '[Kr] 4d¹⁰ 5s² 5p³', valency: '3,5', oxidationStates: ['+5','+3','-3'], ionizationEnergy: '834 kJ/mol', atomicRadius: '133 pm', covalentRadius: '139 pm', electronAffinity: '−103.2 kJ/mol', abundance: 'Antimony (~0.2 ppm in crust). Primary ore: stibnite (Sb₂S₃). China holds ~75% of global reserves.', uses: 'Lead-acid battery plates (hardening); flame retardants in plastics and textiles; semiconductor devices (InSb); lead-tin solder; antimony trioxide in paints; traditional medicine (historical).' },
  { number: 52, symbol: 'Te', name: 'Tellurium', mass: '127.60',  category: 'metalloid',        row: 5, col: 16, period: 5, group: 16, block: 'p', state: 'solid', meltingPoint: '449.51 °C', boilingPoint: '988 °C',  density: '6.24 g/cm³',    appearance: 'Silvery-white, lustrous metalloid', electronegativity: '2.10', electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁴', valency: '2,4,6', oxidationStates: ['+6','+4','-2'], ionizationEnergy: '869.3 kJ/mol', atomicRadius: '123 pm', covalentRadius: '138 pm', electronAffinity: '−190.2 kJ/mol', abundance: 'Tellurium is very rare (~0.001 ppm in crust). By-product of copper refining. More abundant in the universe than on Earth.', uses: 'CdTe thin-film solar cells; thermoelectric devices; bismuth telluride for cooling; alloy additive for improved machinability of steel and copper; rewritable DVDs (phase-change material); rubber vulcanisation.' },
  { number: 53, symbol: 'I',  name: 'Iodine',    mass: '126.90',  category: 'halogen',          row: 5, col: 17, period: 5, group: 17, block: 'p', state: 'solid', meltingPoint: '113.7 °C',  boilingPoint: '184.3 °C', density: '4.933 g/cm³',   appearance: 'Lustrous, purple-black solid, violet gas', electronegativity: '2.66', electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁵', valency: '1', oxidationStates: ['+7','+5','+1','-1'], ionizationEnergy: '1008.4 kJ/mol', atomicRadius: '115 pm', covalentRadius: '139 pm', electronAffinity: '−295.2 kJ/mol', abundance: 'Iodine (~0.46 ppm in crust). Concentrated in brines, seaweed, and mineral deposits. Chile and Japan are major producers.', uses: 'Iodised table salt (prevents iodine deficiency/goitre); antiseptic (povidone-iodine); thyroid hormone synthesis (thyroxine); silver iodide in photography; radioactive iodine-131 for thyroid cancer treatment; LCD displays (iodine in polarisers); analytical chemistry (iodometry).' },
  { number: 54, symbol: 'Xe', name: 'Xenon',     mass: '131.29',  category: 'noble-gas',        row: 5, col: 18, period: 5, group: 18, block: 'p', state: 'gas',   meltingPoint: '−111.75 °C', boilingPoint: '−108.12 °C', density: '0.005887 g/cm³', appearance: 'Colourless, dense, odourless gas', electronegativity: '2.60', electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁶', valency: '0', oxidationStates: ['0','+2','+4','+6','+8'], ionizationEnergy: '1170.4 kJ/mol', atomicRadius: '108 pm', covalentRadius: '140 pm', electronAffinity: 'N/A', abundance: 'Xenon is present in Earth\'s atmosphere at 0.087 ppm by volume. Obtained by fractional distillation of liquid air. Xenon forms stable compounds unlike the lighter noble gases.', uses: 'High-intensity arc lamps (cinema projectors, car headlights); ion thrusters for spacecraft propulsion; general anaesthetic at high pressure; xenon difluoride for silicon etching; NMR spectroscopy; particle physics detectors.' },

  /* ─── Period 6 ─── */
  { number: 55, symbol: 'Cs', name: 'Caesium',   mass: '132.91',  category: 'alkali-metal',     row: 6, col: 1,  period: 6, group: 1,  block: 's', state: 'solid', meltingPoint: '28.44 °C',  boilingPoint: '671 °C',  density: '1.873 g/cm³',   appearance: 'Gold-coloured, soft metal',   electronegativity: '0.79', electronConfig: '[Xe] 6s¹', valency: '1', oxidationStates: ['+1'], ionizationEnergy: '375.7 kJ/mol', atomicRadius: '298 pm', covalentRadius: '244 pm', electronAffinity: '−45.5 kJ/mol', abundance: 'Caesium is rare (~3 ppm in crust). Main mineral: pollucite (CsAlSi₂O₆). Canada holds the world\'s largest reserve (Bernic Lake mine).', uses: 'Caesium atomic clocks define the SI second — the world\'s most accurate timekeepers; photovoltaic cells; drilling fluids (caesium formate); magnetometers; ion propulsion systems.' },
  { number: 56, symbol: 'Ba', name: 'Barium',    mass: '137.33',  category: 'alkaline-earth',   row: 6, col: 2,  period: 6, group: 2,  block: 's', state: 'solid', meltingPoint: '727 °C',    boilingPoint: '1845 °C', density: '3.594 g/cm³',   appearance: 'Silvery-grey metal',          electronegativity: '0.89', electronConfig: '[Xe] 6s²', valency: '2', oxidationStates: ['+2'], ionizationEnergy: '502.9 kJ/mol', atomicRadius: '253 pm', covalentRadius: '215 pm', electronAffinity: '−13.95 kJ/mol', abundance: 'Barium (~425 ppm in crust). Principal ores: barite (BaSO₄) and witherite (BaCO₃). Widely distributed. China, India, and USA are major producers.', uses: 'Barium sulfate as a radiocontrast agent (barium meal/enema) for GI tract imaging; drilling mud additive; white pigment in paints; getter in vacuum tubes; barium titanate in piezoelectric transducers; rat poison (barium carbonate).' },

  /* ─── Lanthanides (row 9) ─── */
  { number: 57, symbol: 'La', name: 'Lanthanum',  mass: '138.91',  category: 'lanthanide', row: 9, col: 3,  period: 6, group: 3,  block: 'f', state: 'solid', meltingPoint: '920 °C',    boilingPoint: '3464 °C', density: '6.162 g/cm³',   appearance: 'Silvery-white metal', electronegativity: '1.10', electronConfig: '[Xe] 5d¹ 6s²', valency: '3', oxidationStates: ['+3'], ionizationEnergy: '538.1 kJ/mol', atomicRadius: '187 pm', covalentRadius: '207 pm', electronAffinity: '−48 kJ/mol', abundance: 'Lanthanum (~39 ppm in crust). Found in bastnasite and monazite minerals. China dominates global rare earth production.', uses: 'Hybrid car batteries (La-Ni hydride); high-refractive-index glass for cameras; hydrogen storage alloys; carbon-arc lights; catalytic cracking catalysts; glass polishing.' },
  { number: 58, symbol: 'Ce', name: 'Cerium',     mass: '140.12',  category: 'lanthanide', row: 9, col: 4,  period: 6, group: 4,  block: 'f', state: 'solid', meltingPoint: '799 °C',    boilingPoint: '3443 °C', density: '6.770 g/cm³',   appearance: 'Silvery metal', electronegativity: '1.12', electronConfig: '[Xe] 4f¹ 5d¹ 6s²', valency: '4,3', oxidationStates: ['+4','+3'], ionizationEnergy: '534.4 kJ/mol', atomicRadius: '182 pm', covalentRadius: '204 pm', electronAffinity: '−50 kJ/mol', abundance: 'Cerium is the most abundant rare earth element (~68 ppm in crust). Not actually rare. Found in bastnasite and monazite.', uses: 'Catalytic converters (CeO₂ as oxygen buffer); glass polishing compound; yellow glass colourant; cerium oxide in self-cleaning ovens; flint for lighters (ferrocerium); UV-absorbing glass.' },
  { number: 59, symbol: 'Pr', name: 'Praseodymium', mass: '140.91', category: 'lanthanide', row: 9, col: 5, period: 6, group: 5, block: 'f', state: 'solid', meltingPoint: '931 °C', boilingPoint: '3520 °C', density: '6.77 g/cm³', appearance: 'Silvery, soft metal', electronegativity: '1.13', electronConfig: '[Xe] 4f³ 6s²', valency: '3', oxidationStates: ['+3'], ionizationEnergy: '527 kJ/mol', atomicRadius: '182 pm', covalentRadius: '203 pm', electronAffinity: '−50 kJ/mol', abundance: 'Praseodymium (~9.5 ppm in crust). Found in bastnasite and monazite. Named from Greek for "green twin".', uses: 'High-strength magnets (Nd-Fe-B alloys); praseodymium yellow pigment in ceramics; fibre amplifiers (Er-doped with Pr); goggles for welders (didymium glass with Nd); carbon arc lights.' },
  { number: 60, symbol: 'Nd', name: 'Neodymium',  mass: '144.24',  category: 'lanthanide', row: 9, col: 6,  period: 6, group: 6,  block: 'f', state: 'solid', meltingPoint: '1024 °C',   boilingPoint: '3074 °C', density: '7.01 g/cm³',    appearance: 'Silvery, bright metal', electronegativity: '1.14', electronConfig: '[Xe] 4f⁴ 6s²', valency: '3', oxidationStates: ['+3'], ionizationEnergy: '533.1 kJ/mol', atomicRadius: '181 pm', covalentRadius: '201 pm', electronAffinity: '−50 kJ/mol', abundance: 'Neodymium (~38 ppm in crust). Main sources: bastnasite, monazite, and ion-adsorption clays in China.', uses: 'NdFeB permanent magnets (strongest known magnets) in hard drives, EV motors, wind turbines, MRI, headphones; Nd:YAG lasers for surgery and material processing; violet/blue glass colourant; capacitors.' },
  { number: 61, symbol: 'Pm', name: 'Promethium', mass: '(145)',   category: 'lanthanide', row: 9, col: 7,  period: 6, group: 7,  block: 'f', state: 'solid', meltingPoint: '1042 °C',   boilingPoint: '3000 °C', density: '7.26 g/cm³',    appearance: 'Silvery, radioactive metal', electronegativity: '1.13', electronConfig: '[Xe] 4f⁵ 6s²', valency: '3', oxidationStates: ['+3'], ionizationEnergy: '540 kJ/mol', atomicRadius: '183 pm', covalentRadius: '199 pm', electronAffinity: 'N/A', abundance: 'Promethium has no stable isotopes. Only trace amounts exist in uranium ores (from fission). All practical amounts are synthetically produced. Named after Prometheus in Greek mythology.', uses: 'Nuclear-powered pacemakers (historical); luminescent paint for thickness gauges; Pm-147 beta sources in radiation measurement devices. Very limited commercial use due to radioactivity and short half-life.' },
  { number: 62, symbol: 'Sm', name: 'Samarium',   mass: '150.36',  category: 'lanthanide', row: 9, col: 8,  period: 6, group: 8,  block: 'f', state: 'solid', meltingPoint: '1074 °C',   boilingPoint: '1794 °C', density: '7.52 g/cm³',    appearance: 'Silvery-white metal', electronegativity: '1.17', electronConfig: '[Xe] 4f⁶ 6s²', valency: '3,2', oxidationStates: ['+3','+2'], ionizationEnergy: '544.5 kJ/mol', atomicRadius: '180 pm', covalentRadius: '198 pm', electronAffinity: '−50 kJ/mol', abundance: 'Samarium (~8 ppm in crust). Found in bastnasite and monazite. Named after the mineral samarskite.', uses: 'SmCo permanent magnets for high-temperature applications (aerospace, military); samarium-153 in cancer bone metastasis therapy; neutron absorption in reactor control; optical glass.' },
  { number: 63, symbol: 'Eu', name: 'Europium',   mass: '151.96',  category: 'lanthanide', row: 9, col: 9,  period: 6, group: 9,  block: 'f', state: 'solid', meltingPoint: '826 °C',    boilingPoint: '1529 °C', density: '5.264 g/cm³',   appearance: 'Pale grey, soft metal', electronegativity: '1.20', electronConfig: '[Xe] 4f⁷ 6s²', valency: '3,2', oxidationStates: ['+3','+2'], ionizationEnergy: '547.1 kJ/mol', atomicRadius: '180 pm', covalentRadius: '198 pm', electronAffinity: '−50 kJ/mol', abundance: 'Europium is the most reactive lanthanide (~2 ppm in crust). Found in bastnasite and monazite. Named after Europe.', uses: 'Red and blue phosphors in TV screens and LED lamps; fluorescent security ink in euro banknotes; laser materials; superconductors research; europium oxide in red lasers.' },
  { number: 64, symbol: 'Gd', name: 'Gadolinium', mass: '157.25',  category: 'lanthanide', row: 9, col: 10, period: 6, group: 10, block: 'f', state: 'solid', meltingPoint: '1313 °C',   boilingPoint: '3273 °C', density: '7.90 g/cm³',    appearance: 'Silvery-white, lustrous metal', electronegativity: '1.20', electronConfig: '[Xe] 4f⁷ 5d¹ 6s²', valency: '3', oxidationStates: ['+3'], ionizationEnergy: '593.4 kJ/mol', atomicRadius: '180 pm', covalentRadius: '196 pm', electronAffinity: '−50 kJ/mol', abundance: 'Gadolinium (~8 ppm in crust). Found in monazite and bastnasite minerals.', uses: 'MRI contrast agents (gadolinium chelates enhance image clarity); neutron capture in nuclear reactors; phosphors in X-ray screens; Gd-Ga garnet in microwave components; magnetocaloric refrigeration.' },
  { number: 65, symbol: 'Tb', name: 'Terbium',    mass: '158.93',  category: 'lanthanide', row: 9, col: 11, period: 6, group: 11, block: 'f', state: 'solid', meltingPoint: '1356 °C',   boilingPoint: '3230 °C', density: '8.23 g/cm³',    appearance: 'Silvery-white, fairly soft', electronegativity: '1.10', electronConfig: '[Xe] 4f⁹ 6s²', valency: '3,4', oxidationStates: ['+4','+3'], ionizationEnergy: '565.8 kJ/mol', atomicRadius: '177 pm', covalentRadius: '194 pm', electronAffinity: '−50 kJ/mol', abundance: 'Terbium is rare (~1.2 ppm in crust). Found in monazite, xenotime, and euxenite minerals. China is the primary producer.', uses: 'Green phosphors in LCD backlight (terbium-activated green component); magnetostrictive alloys (Terfenol-D) for sensors and actuators; solid oxide fuel cell electrolytes; laser crystals.' },
  { number: 66, symbol: 'Dy', name: 'Dysprosium', mass: '162.50',  category: 'lanthanide', row: 9, col: 12, period: 6, group: 12, block: 'f', state: 'solid', meltingPoint: '1412 °C',   boilingPoint: '2567 °C', density: '8.55 g/cm³',    appearance: 'Silvery metal',       electronegativity: '1.22', electronConfig: '[Xe] 4f¹⁰ 6s²', valency: '3', oxidationStates: ['+3','+2'], ionizationEnergy: '573 kJ/mol', atomicRadius: '178 pm', covalentRadius: '192 pm', electronAffinity: '−50 kJ/mol', abundance: 'Dysprosium (~5.2 ppm in crust). Found in xenotime and monazite. Name from Greek "dysprositos" (hard to get).', uses: 'Critical additive in NdFeB magnets (improves high-temperature performance); nuclear reactor control rods; Dy-doped vanadium garnet lasers; hard disk drives; electric vehicle motors.' },
  { number: 67, symbol: 'Ho', name: 'Holmium',    mass: '164.93',  category: 'lanthanide', row: 9, col: 13, period: 6, group: 13, block: 'f', state: 'solid', meltingPoint: '1474 °C',   boilingPoint: '2700 °C', density: '8.79 g/cm³',    appearance: 'Silvery-white, soft metal', electronegativity: '1.23', electronConfig: '[Xe] 4f¹¹ 6s²', valency: '3', oxidationStates: ['+3'], ionizationEnergy: '581 kJ/mol', atomicRadius: '176 pm', covalentRadius: '192 pm', electronAffinity: '−50 kJ/mol', abundance: 'Holmium (~1.4 ppm in crust). Found in monazite and gadolinite. Named after Stockholm (Latin: Holmia).', uses: 'Ho:YAG solid-state lasers for surgery (especially kidney stones, prostate); permanent magnets; neutron absorption; yellow-orange glass colourant; magnetic pole pieces.' },
  { number: 68, symbol: 'Er', name: 'Erbium',     mass: '167.26',  category: 'lanthanide', row: 9, col: 14, period: 6, group: 14, block: 'f', state: 'solid', meltingPoint: '1529 °C',   boilingPoint: '2868 °C', density: '9.066 g/cm³',   appearance: 'Silvery-white metal', electronegativity: '1.24', electronConfig: '[Xe] 4f¹² 6s²', valency: '3', oxidationStates: ['+3'], ionizationEnergy: '589.3 kJ/mol', atomicRadius: '176 pm', covalentRadius: '189 pm', electronAffinity: '−50 kJ/mol', abundance: 'Erbium (~3 ppm in crust). Found in euxenite, xenotime, and monazite. Named after Ytterby, Sweden.', uses: 'Er-doped fibre amplifiers (EDFA) — critical for long-distance optical fibre telecommunications; Er:YAG dental lasers; pink pigment in glass and ceramics; nuclear technology.' },
  { number: 69, symbol: 'Tm', name: 'Thulium',    mass: '168.93',  category: 'lanthanide', row: 9, col: 15, period: 6, group: 15, block: 'f', state: 'solid', meltingPoint: '1545 °C',   boilingPoint: '1950 °C', density: '9.32 g/cm³',    appearance: 'Silvery-grey, soft metal', electronegativity: '1.25', electronConfig: '[Xe] 4f¹³ 6s²', valency: '3,2', oxidationStates: ['+3','+2'], ionizationEnergy: '596.7 kJ/mol', atomicRadius: '176 pm', covalentRadius: '190 pm', electronAffinity: '−50 kJ/mol', abundance: 'Thulium is the least abundant lanthanide (~0.52 ppm in crust). Found in monazite and euxenite minerals. Named after Thule (mythical far north).', uses: 'Portable X-ray devices (Tm-170 source); Tm:YAG lasers for medical applications; high-performance magnets research; doping fibre amplifiers; blue-green phosphor for lighting.' },
  { number: 70, symbol: 'Yb', name: 'Ytterbium',  mass: '173.04',  category: 'lanthanide', row: 9, col: 16, period: 6, group: 16, block: 'f', state: 'solid', meltingPoint: '824 °C',    boilingPoint: '1196 °C', density: '6.90 g/cm³',    appearance: 'Silvery-white, soft metal', electronegativity: '1.10', electronConfig: '[Xe] 4f¹⁴ 6s²', valency: '3,2', oxidationStates: ['+3','+2'], ionizationEnergy: '603.4 kJ/mol', atomicRadius: '176 pm', covalentRadius: '187 pm', electronAffinity: '−50 kJ/mol', abundance: 'Ytterbium (~3.3 ppm in crust). Found in monazite, xenotime, and euxenite minerals. Named after Ytterby village in Sweden.', uses: 'Yb-doped fibre lasers (high power, efficient); Yb atomic clocks (most accurate in world); stainless steel additive; Yb-169 as portable gamma-ray source; pressure-measuring gauges (piezochromic); dental alloys.' },
  { number: 71, symbol: 'Lu', name: 'Lutetium',   mass: '174.97',  category: 'lanthanide', row: 9, col: 17, period: 6, group: 17, block: 'f', state: 'solid', meltingPoint: '1663 °C',   boilingPoint: '3402 °C', density: '9.841 g/cm³',   appearance: 'Silvery-white, hard metal', electronegativity: '1.27', electronConfig: '[Xe] 4f¹⁴ 5d¹ 6s²', valency: '3', oxidationStates: ['+3'], ionizationEnergy: '523.5 kJ/mol', atomicRadius: '174 pm', covalentRadius: '187 pm', electronAffinity: '−50 kJ/mol', abundance: 'Lutetium is the last and heaviest lanthanide (~0.8 ppm in crust). Found in xenotime and monazite. Most expensive rare earth metal to produce.', uses: 'Lu-DOTA-TATE targeted radiotherapy for neuroendocrine tumours; lutetium aluminium garnet (LuAG) scintillators for PET scanners; catalysts in petroleum refining; Lu-177 radioimmunotherapy.' },

  /* ─── Period 6 continued (after La gap) ─── */
  { number: 72, symbol: 'Hf', name: 'Hafnium',    mass: '178.49',  category: 'transition-metal', row: 6, col: 4,  period: 6, group: 4,  block: 'd', state: 'solid', meltingPoint: '2233 °C',   boilingPoint: '4603 °C', density: '13.31 g/cm³',   appearance: 'Silvery, ductile metal',    electronegativity: '1.30', electronConfig: '[Xe] 4f¹⁴ 5d² 6s²', valency: '4', oxidationStates: ['+4','+3','+2'], ionizationEnergy: '658.5 kJ/mol', atomicRadius: '159 pm', covalentRadius: '175 pm', electronAffinity: '−17 kJ/mol', abundance: 'Hafnium (~3 ppm in crust). Always found associated with zirconium. Separated by its higher neutron capture cross-section.', uses: 'Nuclear reactor control rods (high neutron capture); high-k gate dielectrics in CMOS transistors (HfO₂); superalloys for jet turbine blades; hafnium carbide in cutting tools; hafnium electrodes in plasma torches.' },
  { number: 73, symbol: 'Ta', name: 'Tantalum',   mass: '180.95',  category: 'transition-metal', row: 6, col: 5,  period: 6, group: 5,  block: 'd', state: 'solid', meltingPoint: '3017 °C',   boilingPoint: '5458 °C', density: '16.654 g/cm³',  appearance: 'Blue-grey, lustrous', electronegativity: '1.50', electronConfig: '[Xe] 4f¹⁴ 5d³ 6s²', valency: '5', oxidationStates: ['+5','+3'], ionizationEnergy: '761 kJ/mol', atomicRadius: '146 pm', covalentRadius: '170 pm', electronAffinity: '−31 kJ/mol', abundance: 'Tantalum (~2 ppm in crust). Found in coltan (columbite-tantalite) — mined controversially in the DRC. Australia and Rwanda are major producers.', uses: 'Electrolytic capacitors in mobile phones, laptops, and electronics; biocompatible surgical implants; superalloys for jet engines; tantalum carbide in cutting tools; chemical plant equipment (highly corrosion-resistant).' },
  { number: 74, symbol: 'W',  name: 'Tungsten',   mass: '183.84',  category: 'transition-metal', row: 6, col: 6,  period: 6, group: 6,  block: 'd', state: 'solid', meltingPoint: '3422 °C',   boilingPoint: '5555 °C', density: '19.25 g/cm³',   appearance: 'Greyish-white, lustrous',   electronegativity: '2.36', electronConfig: '[Xe] 4f¹⁴ 5d⁴ 6s²', valency: '6', oxidationStates: ['+6','+4','+2'], ionizationEnergy: '770 kJ/mol', atomicRadius: '139 pm', covalentRadius: '162 pm', electronAffinity: '−78.6 kJ/mol', abundance: 'Tungsten (~1.3 ppm in crust). Has the highest melting point of all metals. Ores: scheelite (CaWO₄) and wolframite ((Fe,Mn)WO₄). China produces ~85% of global supply.', uses: 'Incandescent bulb filaments and halogen lamp electrodes; tungsten carbide cutting tools, drill bits, and armour-piercing ammunition; X-ray targets; superalloy additive; catalysts; heavy metal substitute in golf clubs and fishing weights.' },
  { number: 75, symbol: 'Re', name: 'Rhenium',    mass: '186.21',  category: 'transition-metal', row: 6, col: 7,  period: 6, group: 7,  block: 'd', state: 'solid', meltingPoint: '3186 °C',   boilingPoint: '5596 °C', density: '21.02 g/cm³',   appearance: 'Silvery-grey, dense metal', electronegativity: '1.90', electronConfig: '[Xe] 4f¹⁴ 5d⁵ 6s²', valency: '7', oxidationStates: ['+7','+6','+4','+2'], ionizationEnergy: '760 kJ/mol', atomicRadius: '137 pm', covalentRadius: '151 pm', electronAffinity: '−14.5 kJ/mol', abundance: 'Rhenium is one of the rarest elements in Earth\'s crust (~0.0007 ppm). Recovered as a by-product of molybdenum mining. Chile is the largest producer.', uses: 'High-temperature superalloys for jet engine turbine blades (Ni-Re alloys); Re-Pt catalysts for petroleum reforming (unleaded gasoline); mass spectrometer filaments; thermocouples for very high temperatures.' },
  { number: 76, symbol: 'Os', name: 'Osmium',     mass: '190.23',  category: 'transition-metal', row: 6, col: 8,  period: 6, group: 8,  block: 'd', state: 'solid', meltingPoint: '3033 °C',   boilingPoint: '5012 °C', density: '22.587 g/cm³',  appearance: 'Blue-grey, lustrous, hard', electronegativity: '2.20', electronConfig: '[Xe] 4f¹⁴ 5d⁶ 6s²', valency: '8', oxidationStates: ['+8','+6','+4','+3','+2'], ionizationEnergy: '840 kJ/mol', atomicRadius: '135 pm', covalentRadius: '144 pm', electronAffinity: '−106.1 kJ/mol', abundance: 'Osmium is the densest naturally occurring element and one of the rarest (~0.001 ppm in crust). Found in platinum group mineral deposits.', uses: 'Hard alloy tips for fountain pen nibs and electrical contacts; OsO₄ staining agent in electron microscopy; catalyst in Beckmann rearrangement; Os-Ir alloys for compass needles and clock bearings.' },
  { number: 77, symbol: 'Ir', name: 'Iridium',    mass: '192.22',  category: 'transition-metal', row: 6, col: 9,  period: 6, group: 9,  block: 'd', state: 'solid', meltingPoint: '2446 °C',   boilingPoint: '4428 °C', density: '22.562 g/cm³',  appearance: 'Silvery-white, extremely hard', electronegativity: '2.20', electronConfig: '[Xe] 4f¹⁴ 5d⁷ 6s²', valency: '4,3', oxidationStates: ['+4','+3','+6'], ionizationEnergy: '880 kJ/mol', atomicRadius: '136 pm', covalentRadius: '141 pm', electronAffinity: '−151 kJ/mol', abundance: 'Iridium is the second densest element and extremely corrosion-resistant. The Cretaceous-Palaeogene boundary clay layer is enriched in iridium from a meteorite impact. Rare in crust (~0.001 ppm).', uses: 'Spark plug electrodes; crucibles for high-temperature processes; electrical contacts; satellite thrusters; iridium-192 in radiographic testing (gamma-ray source); catalysts; hardening platinum alloys.' },
  { number: 78, symbol: 'Pt', name: 'Platinum',   mass: '195.08',  category: 'transition-metal', row: 6, col: 10, period: 6, group: 10, block: 'd', state: 'solid', meltingPoint: '1768.3 °C', boilingPoint: '3825 °C', density: '21.45 g/cm³',   appearance: 'Silvery-white, dense',      electronegativity: '2.28', electronConfig: '[Xe] 4f¹⁴ 5d⁹ 6s¹', valency: '4,2', oxidationStates: ['+4','+2','+6'], ionizationEnergy: '870 kJ/mol', atomicRadius: '139 pm', covalentRadius: '136 pm', electronAffinity: '−205.3 kJ/mol', abundance: 'Platinum is rare (~0.005 ppm in crust). The Bushveld Complex in South Africa supplies >70% of the world\'s platinum. Also found in Norilsk, Russia.', uses: 'Catalytic converters (largest use); jewellery; electrodes in fuel cells; chemotherapy drugs (cisplatin, carboplatin); laboratory crucibles and instruments; petroleum refining catalysts; spark plugs; dental alloys.' },
  {
    number: 79, symbol: 'Au', name: 'Gold', mass: '196.97',
    category: 'transition-metal', row: 6, col: 11,
    period: 6, group: 11, block: 'd', state: 'solid',
    meltingPoint: '1064.18 °C', boilingPoint: '2856 °C',
    density: '19.30 g/cm³', appearance: 'Lustrous yellow metal',
    electronegativity: '2.54', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹',
    valency: '3, 1', oxidationStates: ['+3', '+1'],
    ionizationEnergy: '890.1 kJ/mol',
    atomicRadius: '144 pm', covalentRadius: '136 pm',
    electronAffinity: '−222.8 kJ/mol',
    abundance: 'Gold is extremely rare in Earth\'s crust (~0.004 ppm). Most gold on Earth is believed to be in the core. It is found as the native metal in alluvial deposits, quartz veins, and combined with tellurium. South Africa, China, and Australia are the largest producers. Gold was likely delivered to Earth\'s surface by meteorite bombardment 4 billion years ago.',
    uses: 'Monetary standard and store of value; jewellery (~50% of global demand); electronics — highly reliable electrical contacts and connectors in semiconductors, computers, and mobile phones; gold leaf for decoration and gilding; colloidal gold in diagnostic tests (pregnancy tests, HIV rapid tests); gold nanoparticles in targeted cancer therapy and drug delivery; dental alloys; and as an infrared reflector in spacecraft thermal control.'
  },
  { number: 80, symbol: 'Hg', name: 'Mercury',    mass: '200.59',  category: 'post-transition',  row: 6, col: 12, period: 6, group: 12, block: 'd', state: 'liquid', meltingPoint: '−38.829 °C', boilingPoint: '356.73 °C', density: '13.534 g/cm³',  appearance: 'Silvery-white liquid metal',   electronegativity: '2.00', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', valency: '2,1', oxidationStates: ['+2','+1'], ionizationEnergy: '1007.1 kJ/mol', atomicRadius: '151 pm', covalentRadius: '132 pm', electronAffinity: '−18.0 kJ/mol', abundance: 'Mercury (~0.085 ppm in crust). Primary ore: cinnabar (HgS). Spain, China, and Kyrgyzstan hold major deposits. The only metal liquid at room temperature.', uses: 'Fluorescent lamps and CFLs; dental amalgam fillings; thermometers and barometers (historical); electrical switches; mercury-vapour lamps; gold and silver amalgamation in mining; scientific research; highly toxic — bioaccumulates.' },
  { number: 81, symbol: 'Tl', name: 'Thallium',   mass: '204.38',  category: 'post-transition',  row: 6, col: 13, period: 6, group: 13, block: 'p', state: 'solid', meltingPoint: '304 °C',    boilingPoint: '1473 °C', density: '11.85 g/cm³',   appearance: 'Silvery-white metal',         electronegativity: '1.62', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', valency: '3,1', oxidationStates: ['+3','+1'], ionizationEnergy: '589.4 kJ/mol', atomicRadius: '156 pm', covalentRadius: '145 pm', electronAffinity: '−19.2 kJ/mol', abundance: 'Thallium (~0.85 ppm in crust). By-product of zinc and lead smelting. Found in crookesite and lorándite minerals.', uses: 'Thallium sulfate was used as a rat/ant poison (now banned); infrared detectors (TlBrI crystals); thallium-201 in cardiac stress imaging (radiopharmaceutical); low-melting glass; superconducting alloys research.' },
  { number: 82, symbol: 'Pb', name: 'Lead',       mass: '207.2',   category: 'post-transition',  row: 6, col: 14, period: 6, group: 14, block: 'p', state: 'solid', meltingPoint: '327.46 °C', boilingPoint: '1749 °C', density: '11.34 g/cm³',   appearance: 'Metallic grey, dull',         electronegativity: '2.33', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', valency: '4,2', oxidationStates: ['+4','+2'], ionizationEnergy: '715.6 kJ/mol', atomicRadius: '154 pm', covalentRadius: '146 pm', electronAffinity: '−35.1 kJ/mol', abundance: 'Lead (~14 ppm in crust). Primary ore: galena (PbS). Also cerussite, anglesite, and minium. Australia, China, and USA are major producers. Highly toxic with long legacy of contamination.', uses: 'Lead-acid batteries (largest use — 85% of production); radiation shielding in X-ray equipment and nuclear facilities; building construction (flashing, pipes, historical); solder (Pb-Sn alloys, being replaced); crystal glass; organo-lead fuel additives (now banned); lead shot and bullets.' },
  { number: 83, symbol: 'Bi', name: 'Bismuth',    mass: '208.98',  category: 'post-transition',  row: 6, col: 15, period: 6, group: 15, block: 'p', state: 'solid', meltingPoint: '271.5 °C',  boilingPoint: '1564 °C', density: '9.807 g/cm³',   appearance: 'Pinkish-white, iridescent oxide',   electronegativity: '2.02', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', valency: '3', oxidationStates: ['+5','+3'], ionizationEnergy: '703 kJ/mol', atomicRadius: '143 pm', covalentRadius: '148 pm', electronAffinity: '−91.2 kJ/mol', abundance: 'Bismuth (~0.025 ppm in crust). Found in bismuthinite (Bi₂S₃) and native bismuth. Primarily a by-product of lead, copper, and tin smelting.', uses: 'Bismuth subsalicylate (Pepto-Bismol) for gastrointestinal treatment; low-melting alloys for fuses and fire detection sprinkler heads; lead-free solders and shot; cosmetics (bismuth oxychloride gives pearlescent sheen); pharmaceutical compounds; replacement for lead in many applications.' },
  { number: 84, symbol: 'Po', name: 'Polonium',   mass: '(209)',   category: 'post-transition',  row: 6, col: 16, period: 6, group: 16, block: 'p', state: 'solid', meltingPoint: '254 °C',    boilingPoint: '962 °C',  density: '9.32 g/cm³',    appearance: 'Silvery, radioactive metal',  electronegativity: '2.00', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', valency: '2,4', oxidationStates: ['+4','+2'], ionizationEnergy: '812.1 kJ/mol', atomicRadius: '135 pm', covalentRadius: '140 pm', electronAffinity: '−183.3 kJ/mol', abundance: 'Polonium has no stable isotopes. Trace amounts occur in uranium ores (~0.1 µg per tonne of uraninite). Discovered by Marie Curie; named after Poland. Produced by neutron irradiation of Bi-209 in nuclear reactors.', uses: 'Po-210 alpha particle source as antistatic device in printing, textile, and nuclear industries; neutron initiators in nuclear weapons; satellite thermoelectric generators; eliminated static in photographic film; highly toxic — used in assassination of Alexander Litvinenko (2006).' },
  { number: 85, symbol: 'At', name: 'Astatine',   mass: '(210)',   category: 'metalloid',        row: 6, col: 17, period: 6, group: 17, block: 'p', state: 'solid', meltingPoint: '302 °C',    boilingPoint: '337 °C (estimated)', density: '~7 g/cm³ (est.)', appearance: 'Unknown; possibly dark crystalline solid', electronegativity: '2.20', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', valency: '1', oxidationStates: ['+7','+5','+3','+1','-1'], ionizationEnergy: '920 kJ/mol (estimated)', atomicRadius: '127 pm', covalentRadius: '150 pm', electronAffinity: '−270 kJ/mol (estimated)', abundance: 'Astatine is the rarest naturally occurring element on Earth. At any given time, less than 1 gram exists in Earth\'s crust. It is produced by the radioactive decay of bismuth. All isotopes are radioactive with short half-lives.', uses: 'At-211 is a promising alpha-particle-emitting radioisotope for targeted radiotherapy of cancer (astatinated antibodies). Very limited due to extreme rarity and short half-life (~7 hours for At-211).' },
  { number: 86, symbol: 'Rn', name: 'Radon',      mass: '(222)',   category: 'noble-gas',        row: 6, col: 18, period: 6, group: 18, block: 'p', state: 'gas',   meltingPoint: '−71 °C',    boilingPoint: '−61.7 °C', density: '0.00973 g/cm³', appearance: 'Colourless, radioactive gas', electronegativity: 'N/A', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', valency: '0', oxidationStates: ['0','+2'], ionizationEnergy: '1037 kJ/mol', atomicRadius: '120 pm', covalentRadius: '150 pm', electronAffinity: 'N/A', abundance: 'Radon is produced by radioactive decay of radium-226. It seeps from soil and building materials into enclosed spaces. At natural concentrations it is invisible and odourless; it is the second leading cause of lung cancer after smoking.', uses: 'Radon-222 historically used in cancer treatment (intracavitary therapy); short-lived daughter products in some industrial applications; used as a tracer to study gas flow in soils; earthquake prediction research; atmospheric tracer for air mass movements.' },

  /* ─── Period 7 ─── */
  { number: 87, symbol: 'Fr', name: 'Francium',   mass: '(223)',   category: 'alkali-metal',     row: 7, col: 1,  period: 7, group: 1,  block: 's', state: 'solid', meltingPoint: '27 °C (estimated)', boilingPoint: '677 °C (estimated)', density: '1.87 g/cm³ (estimated)', appearance: 'Unknown; possibly silvery metallic', electronegativity: '0.70', electronConfig: '[Rn] 7s¹', valency: '1', oxidationStates: ['+1'], ionizationEnergy: '380 kJ/mol', atomicRadius: '348 pm (estimated)', covalentRadius: '260 pm', electronAffinity: '−44.4 kJ/mol', abundance: 'Francium is the second rarest naturally occurring element (after astatine). Produced by alpha decay of actinium. At any time, there is at most 30–50 grams in Earth\'s crust. It has no commercial production.', uses: 'No significant commercial uses due to extreme rarity and short half-life (22 minutes). Used in physics research for spectroscopic studies of atomic structure and in experiments testing quantum electrodynamics.' },
  { number: 88, symbol: 'Ra', name: 'Radium',     mass: '(226)',   category: 'alkaline-earth',   row: 7, col: 2,  period: 7, group: 2,  block: 's', state: 'solid', meltingPoint: '696 °C',    boilingPoint: '1737 °C', density: '5.5 g/cm³',     appearance: 'Silvery-white, radioactive metal', electronegativity: '0.90', electronConfig: '[Rn] 7s²', valency: '2', oxidationStates: ['+2'], ionizationEnergy: '509.3 kJ/mol', atomicRadius: '283 pm', covalentRadius: '221 pm', electronAffinity: '−9.6 kJ/mol', abundance: 'Radium occurs in trace amounts in uranium and thorium ores (1 mg per ~1 tonne of pitchblende). Discovered by Marie and Pierre Curie in 1898. All isotopes are radioactive.', uses: 'Historically used in self-luminous paints for watches and instrument dials (now banned due to radiation poisoning); Ra-226 in brachytherapy cancer treatment (now replaced by other isotopes); neutron sources (Ra-Be); research into radioactivity.' },

  /* ─── Actinides (row 10) ─── */
  { number: 89, symbol: 'Ac', name: 'Actinium',   mass: '(227)',   category: 'actinide', row: 10, col: 3,  period: 7, group: 3,  block: 'f', state: 'solid', meltingPoint: '1050 °C',   boilingPoint: '3198 °C', density: '10.07 g/cm³',   appearance: 'Silvery, radioactive', electronegativity: '1.10', electronConfig: '[Rn] 6d¹ 7s²', valency: '3', oxidationStates: ['+3'], ionizationEnergy: '499 kJ/mol', atomicRadius: '195 pm', covalentRadius: '215 pm', electronAffinity: 'N/A', abundance: 'Actinium is extremely rare in Earth\'s crust (~5.5×10⁻¹⁰ ppm). Found in trace amounts in uranium and thorium ore deposits as a decay product. Named from the Greek "aktis" meaning ray/beam.', uses: 'Ac-225 for targeted alpha-particle therapy in cancer treatment (growing clinical use); neutron source (Ac-Be systems); thermoelectric generators in research probes; primary use is scientific research.' },
  { number: 90, symbol: 'Th', name: 'Thorium',    mass: '232.04',  category: 'actinide', row: 10, col: 4,  period: 7, group: 4,  block: 'f', state: 'solid', meltingPoint: '1750 °C',   boilingPoint: '4788 °C', density: '11.72 g/cm³',   appearance: 'Silvery, tarnishes to grey-black', electronegativity: '1.30', electronConfig: '[Rn] 6d² 7s²', valency: '4', oxidationStates: ['+4'], ionizationEnergy: '587 kJ/mol', atomicRadius: '179 pm', covalentRadius: '206 pm', electronAffinity: 'N/A', abundance: 'Thorium (~9.6 ppm in crust). Significantly more abundant than uranium. Found in monazite and thorite minerals. India, Brazil, and Australia hold large reserves.', uses: 'Proposed nuclear fuel for thorium reactors (fertile material → U-233); historical use in gas mantle lanterns (ThO₂); thoriated tungsten electrodes in TIG welding; high-refractive index lens glass; magnesium alloys for aerospace.' },
  { number: 91, symbol: 'Pa', name: 'Protactinium',mass: '231.04', category: 'actinide', row: 10, col: 5,  period: 7, group: 5,  block: 'f', state: 'solid', meltingPoint: '1568 °C',   boilingPoint: '4027 °C', density: '15.37 g/cm³',   appearance: 'Bright, silvery, radioactive', electronegativity: '1.50', electronConfig: '[Rn] 5f² 6d¹ 7s²', valency: '5,4', oxidationStates: ['+5','+4'], ionizationEnergy: '568 kJ/mol', atomicRadius: '163 pm', covalentRadius: '200 pm', electronAffinity: 'N/A', abundance: 'Protactinium is extremely rare (~1.4×10⁻⁶ ppm in crust). Occurs as a decay product of U-235. Named "proto-actinium" (before actinium).', uses: 'No significant industrial or commercial applications due to rarity and radioactivity. Pa-231 used in research for dating marine sediments and ocean circulation studies (ocean palaeoceanography). Primarily scientific interest.' },
  {
    number: 92, symbol: 'U', name: 'Uranium', mass: '238.03',
    category: 'actinide', row: 10, col: 6,
    period: 7, group: 6, block: 'f', state: 'solid',
    meltingPoint: '1132.2 °C', boilingPoint: '4131 °C',
    density: '19.1 g/cm³', appearance: 'Silvery-grey metallic',
    electronegativity: '1.38', electronConfig: '[Rn] 5f³ 6d¹ 7s²',
    valency: '6, 4', oxidationStates: ['+6', '+5', '+4', '+3'],
    ionizationEnergy: '597.6 kJ/mol',
    atomicRadius: '138 pm', covalentRadius: '196 pm',
    electronAffinity: 'N/A',
    abundance: 'Uranium is weakly radioactive (~2.7 ppm in Earth\'s crust), more abundant than silver or gold. Found in uraninite (UO₂), carnotite, autunite, and phosphate rock. Kazakhstan, Canada, and Australia are the world\'s largest producers. The natural mix is 99.3% U-238 and 0.7% U-235.',
    uses: 'Nuclear fuel for power reactors (fission of U-235 produces ~3% of world electricity); depleted uranium (DU) in armour-piercing ammunition and radiation shielding; historical use in yellow/green uranium glass ("vaseline glass"); uranium-lead and uranium-thorium dating in geology and archaeology; uranium compounds as catalysts in organic chemistry.'
  },
  { number: 93, symbol: 'Np', name: 'Neptunium',  mass: '(237)',   category: 'actinide', row: 10, col: 7,  period: 7, group: 7,  block: 'f', state: 'solid', meltingPoint: '644 °C',    boilingPoint: '4000 °C (estimated)', density: '20.25 g/cm³',  appearance: 'Silvery metallic, tarnishes', electronegativity: '1.36', electronConfig: '[Rn] 5f⁴ 6d¹ 7s²', valency: '5', oxidationStates: ['+5','+4','+3','+6'], ionizationEnergy: '604.5 kJ/mol', atomicRadius: '130 pm', covalentRadius: '190 pm', electronAffinity: 'N/A', abundance: 'Neptunium is the first transuranic element. Tiny amounts occur naturally in uranium ores. Produced in nuclear reactors by neutron capture by U-238. Named after planet Neptune.', uses: 'Np-237 as a neutron detection component in nuclear devices; scientific research into actinide chemistry; precursor to Pu-238 production (for RTGs in spacecraft). Very limited commercial use.' },
  { number: 94, symbol: 'Pu', name: 'Plutonium',  mass: '(244)',   category: 'actinide', row: 10, col: 8,  period: 7, group: 8,  block: 'f', state: 'solid', meltingPoint: '639.4 °C',  boilingPoint: '3228 °C', density: '19.84 g/cm³',   appearance: 'Silvery, tarnishes olive-grey', electronegativity: '1.28', electronConfig: '[Rn] 5f⁶ 7s²', valency: '4', oxidationStates: ['+6','+5','+4','+3'], ionizationEnergy: '584.7 kJ/mol', atomicRadius: '151 pm', covalentRadius: '187 pm', electronAffinity: 'N/A', abundance: 'Plutonium has no stable isotopes. Trace amounts of Pu-244 exist in nature. All practical quantities are produced in nuclear reactors. Named after planet Pluto.', uses: 'Nuclear weapons (Pu-239 fissile material); nuclear power reactors (MOX fuel); Pu-238 in radioisotope thermoelectric generators (RTGs) for deep-space probes (Voyager, Cassini, Curiosity rover); research into nuclear physics.' },
  { number: 95, symbol: 'Am', name: 'Americium',  mass: '(243)',   category: 'actinide', row: 10, col: 9,  period: 7, group: 9,  block: 'f', state: 'solid', meltingPoint: '1176 °C',   boilingPoint: '2011 °C', density: '13.67 g/cm³',   appearance: 'Silvery-white, radioactive', electronegativity: '1.30', electronConfig: '[Rn] 5f⁷ 7s²', valency: '3', oxidationStates: ['+3','+4','+5','+6'], ionizationEnergy: '578.2 kJ/mol', atomicRadius: '173 pm', covalentRadius: '180 pm', electronAffinity: 'N/A', abundance: 'Americium does not occur naturally; it is produced in nuclear reactors by successive neutron capture by Pu-239. Named after the Americas. Produced in gram quantities annually.', uses: 'Am-241 in ionisation-type smoke detectors (alpha emitter ionises air in detector chamber — the most widespread use of a synthetic element in daily life); portable X-ray fluorescence devices; neutron sources; oil well logging tools; Am-241 is a candidate for RTGs.' },
  { number: 96, symbol: 'Cm', name: 'Curium',     mass: '(247)',   category: 'actinide', row: 10, col: 10, period: 7, group: 10, block: 'f', state: 'solid', meltingPoint: '1345 °C',   boilingPoint: '3110 °C', density: '13.51 g/cm³',   appearance: 'Silvery, hard, dense, radioactive', electronegativity: '1.30', electronConfig: '[Rn] 5f⁷ 6d¹ 7s²', valency: '3', oxidationStates: ['+3','+4'], ionizationEnergy: '581 kJ/mol', atomicRadius: '174 pm', covalentRadius: '169 pm', electronAffinity: 'N/A', abundance: 'Curium is produced by neutron irradiation of plutonium in nuclear reactors. Named after Pierre and Marie Curie. Only microgram to milligram quantities have been produced.', uses: 'Alpha particle source in APXS spectrometers on Mars rovers (Sojourner, Spirit, Opportunity); Cm-244 as a neutron source; scientific research into heavy element chemistry. Extremely limited availability.' },
  { number: 97, symbol: 'Bk', name: 'Berkelium',  mass: '(247)',   category: 'actinide', row: 10, col: 11, period: 7, group: 11, block: 'f', state: 'solid', meltingPoint: '986 °C',    boilingPoint: 'Unknown', density: '14.79 g/cm³',   appearance: 'Unknown; predicted silvery', electronegativity: '1.30', electronConfig: '[Rn] 5f⁹ 7s²', valency: '3,4', oxidationStates: ['+3','+4'], ionizationEnergy: '601 kJ/mol', atomicRadius: '170 pm', covalentRadius: '168 pm', electronAffinity: 'N/A', abundance: 'Berkelium does not occur in nature. Produced in extremely small quantities (nanograms to micrograms) by neutron bombardment of Cm-244 in the HFIR reactor at Oak Ridge National Laboratory. Named after Berkeley, California.', uses: 'Bk-249 is used as a target material to synthesise heavier transactinide elements (tennessine was synthesised using Bk-249 targets). Used purely for scientific research with no practical applications.' },
  { number: 98, symbol: 'Cf', name: 'Californium',mass: '(251)',   category: 'actinide', row: 10, col: 12, period: 7, group: 12, block: 'f', state: 'solid', meltingPoint: '900 °C',    boilingPoint: 'Unknown', density: '15.10 g/cm³',   appearance: 'Silvery metallic (predicted)', electronegativity: '1.30', electronConfig: '[Rn] 5f¹⁰ 7s²', valency: '3', oxidationStates: ['+3','+2','+4'], ionizationEnergy: '608 kJ/mol', atomicRadius: '186 pm', covalentRadius: '168 pm', electronAffinity: 'N/A', abundance: 'Californium is not found in nature. Produced by intense neutron irradiation of curium in nuclear reactors. Named after California. Only about 0.25 grams are produced per year globally.', uses: 'Cf-252 as a portable neutron source for nuclear reactors startup, gold and silver assaying, cancer treatment (brachytherapy), airport luggage scanners for explosives detection, and oil well logging instruments.' },
  { number: 99, symbol: 'Es', name: 'Einsteinium', mass: '(252)',  category: 'actinide', row: 10, col: 13, period: 7, group: 13, block: 'f', state: 'solid', meltingPoint: '860 °C',    boilingPoint: 'Unknown', density: '8.84 g/cm³',    appearance: 'Silvery metallic (predicted)', electronegativity: '1.30', electronConfig: '[Rn] 5f¹¹ 7s²', valency: '3', oxidationStates: ['+3'], ionizationEnergy: '619 kJ/mol', atomicRadius: '186 pm', covalentRadius: '165 pm', electronAffinity: 'N/A', abundance: 'Einsteinium was first identified in the debris of the first hydrogen bomb test (1952, Ivy Mike). Named after Albert Einstein. Produced in nuclear reactors in microgram amounts — the heaviest element produced in macroscopic quantities.', uses: 'No practical applications. Used purely in scientific research — notably Es-254 was used as a target to first synthesise mendelevium. Research into heavy element chemistry and physics.' },
  { number: 100, symbol: 'Fm', name: 'Fermium',   mass: '(257)',   category: 'actinide', row: 10, col: 14, period: 7, group: 14, block: 'f', state: 'solid', meltingPoint: '1527 °C',   boilingPoint: 'Unknown', density: 'Unknown',        appearance: 'Unknown; predicted silvery',  electronegativity: '1.30', electronConfig: '[Rn] 5f¹² 7s²', valency: '3', oxidationStates: ['+3','+2'], ionizationEnergy: '627 kJ/mol', atomicRadius: '186 pm', covalentRadius: '167 pm', electronAffinity: 'N/A', abundance: 'Also first identified in Ivy Mike thermonuclear bomb debris. Named after Enrico Fermi. Produced in picogram quantities. No stable isotopes.', uses: 'Purely scientific research. Fermium-255 has been used in chemistry experiments. No practical applications exist due to the extremely small quantities available and high radioactivity.' },
  { number: 101, symbol: 'Md', name: 'Mendelevium',mass: '(258)',  category: 'actinide', row: 10, col: 15, period: 7, group: 15, block: 'f', state: 'solid', meltingPoint: '827 °C',    boilingPoint: 'Unknown', density: 'Unknown',        appearance: 'Unknown; predicted silvery',  electronegativity: '1.30', electronConfig: '[Rn] 5f¹³ 7s²', valency: '3,2', oxidationStates: ['+3','+2'], ionizationEnergy: '635 kJ/mol', atomicRadius: '186 pm', covalentRadius: '173 pm', electronAffinity: 'N/A', abundance: 'Mendelevium does not occur in nature. First synthesised in 1955 by Ghiorso et al. by bombarding Es-253 with alpha particles. Named after Dmitri Mendeleev. Only a few atoms have ever been produced.', uses: 'No practical uses. Produced only for scientific study of superheavy element chemistry and nuclear physics.' },
  { number: 102, symbol: 'No', name: 'Nobelium',  mass: '(259)',   category: 'actinide', row: 10, col: 16, period: 7, group: 16, block: 'f', state: 'solid', meltingPoint: '827 °C',    boilingPoint: 'Unknown', density: 'Unknown',        appearance: 'Unknown; predicted silvery',  electronegativity: '1.30', electronConfig: '[Rn] 5f¹⁴ 7s²', valency: '2,3', oxidationStates: ['+2','+3'], ionizationEnergy: '641.6 kJ/mol', atomicRadius: '186 pm', covalentRadius: '176 pm', electronAffinity: 'N/A', abundance: 'Nobelium does not occur in nature. First reliably synthesised in 1966 at Dubna (Russia). Named after Alfred Nobel. Only a few atoms produced at a time.', uses: 'No practical applications. Used solely in scientific research into the chemistry of the heaviest elements. Nobelium-255 has a half-life of ~3 minutes.' },
  { number: 103, symbol: 'Lr', name: 'Lawrencium', mass: '(266)',  category: 'actinide', row: 10, col: 17, period: 7, group: 17, block: 'f', state: 'solid', meltingPoint: '1627 °C',   boilingPoint: 'Unknown', density: 'Unknown',        appearance: 'Unknown; predicted silvery',  electronegativity: '1.30', electronConfig: '[Rn] 5f¹⁴ 7s² 7p¹', valency: '3', oxidationStates: ['+3'], ionizationEnergy: '478.6 kJ/mol', atomicRadius: '186 pm', covalentRadius: '161 pm', electronAffinity: 'N/A', abundance: 'Lawrencium is the last actinide. Does not occur in nature. First synthesised in 1961 at LBNL by bombardment of californium with boron ions. Named after Ernest O. Lawrence.', uses: 'No practical applications. Produced in atom-at-a-time quantities purely for scientific research.' },

  /* ─── Period 7 continued (transactinides) ─── */
  { number: 104, symbol: 'Rf', name: 'Rutherfordium', mass: '(267)', category: 'transition-metal', row: 7, col: 4,  period: 7, group: 4,  block: 'd', state: 'solid', meltingPoint: 'Unknown',   boilingPoint: 'Unknown', density: '23.2 g/cm³ (predicted)', appearance: 'Unknown; predicted silvery', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d² 7s²', valency: '4', oxidationStates: ['+4'], ionizationEnergy: '580 kJ/mol (est.)', atomicRadius: 'Unknown', covalentRadius: '157 pm (est.)', electronAffinity: 'N/A', abundance: 'Rutherfordium is a synthetic element not found in nature. Produced in extremely small quantities. Named after Ernest Rutherford. Half-life of most stable isotope Rf-267: ~1.3 hours.', uses: 'No practical uses. Studied only in nuclear physics and chemistry research.' },
  { number: 105, symbol: 'Db', name: 'Dubnium',      mass: '(268)', category: 'transition-metal', row: 7, col: 5,  period: 7, group: 5,  block: 'd', state: 'solid', meltingPoint: 'Unknown',   boilingPoint: 'Unknown', density: '29.3 g/cm³ (predicted)', appearance: 'Unknown', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d³ 7s²', valency: '5', oxidationStates: ['+5','+4','+3'], ionizationEnergy: 'Unknown', atomicRadius: 'Unknown', covalentRadius: '149 pm (est.)', electronAffinity: 'N/A', abundance: 'Synthetic element, not found in nature. Named after Dubna, Russia. Half-life of most stable isotope: ~16 hours (Db-268).', uses: 'No practical applications. Research only.' },
  { number: 106, symbol: 'Sg', name: 'Seaborgium',   mass: '(269)', category: 'transition-metal', row: 7, col: 6,  period: 7, group: 6,  block: 'd', state: 'solid', meltingPoint: 'Unknown',   boilingPoint: 'Unknown', density: '35 g/cm³ (predicted)',   appearance: 'Unknown', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d⁴ 7s²', valency: '6', oxidationStates: ['+6'], ionizationEnergy: 'Unknown', atomicRadius: 'Unknown', covalentRadius: '143 pm (est.)', electronAffinity: 'N/A', abundance: 'Synthetic element. Named after Glenn T. Seaborg. Most stable isotope Sg-269 has a half-life of ~14 minutes.', uses: 'No practical applications.' },
  { number: 107, symbol: 'Bh', name: 'Bohrium',      mass: '(270)', category: 'transition-metal', row: 7, col: 7,  period: 7, group: 7,  block: 'd', state: 'solid', meltingPoint: 'Unknown',   boilingPoint: 'Unknown', density: '37 g/cm³ (predicted)',   appearance: 'Unknown', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d⁵ 7s²', valency: '7', oxidationStates: ['+7'], ionizationEnergy: 'Unknown', atomicRadius: 'Unknown', covalentRadius: '141 pm (est.)', electronAffinity: 'N/A', abundance: 'Synthetic element. Named after Niels Bohr. Most stable isotope Bh-270 has a half-life of ~61 seconds.', uses: 'No practical applications.' },
  { number: 108, symbol: 'Hs', name: 'Hassium',      mass: '(269)', category: 'transition-metal', row: 7, col: 8,  period: 7, group: 8,  block: 'd', state: 'solid', meltingPoint: 'Unknown',   boilingPoint: 'Unknown', density: '40.7 g/cm³ (predicted)', appearance: 'Unknown', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d⁶ 7s²', valency: '8', oxidationStates: ['+8'], ionizationEnergy: 'Unknown', atomicRadius: 'Unknown', covalentRadius: '134 pm (est.)', electronAffinity: 'N/A', abundance: 'Synthetic element. Named after Hesse, Germany. Most stable isotope Hs-269 has a half-life of ~16 seconds.', uses: 'No practical applications. Hs-269 formed OsO₄-like compound in chemistry experiments.' },
  { number: 109, symbol: 'Mt', name: 'Meitnerium',   mass: '(278)', category: 'transition-metal', row: 7, col: 9,  period: 7, group: 9,  block: 'd', state: 'solid', meltingPoint: 'Unknown',   boilingPoint: 'Unknown', density: '37.4 g/cm³ (predicted)', appearance: 'Unknown', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d⁷ 7s²', valency: '6,3', oxidationStates: ['+6','+3'], ionizationEnergy: 'Unknown', atomicRadius: 'Unknown', covalentRadius: '129 pm (est.)', electronAffinity: 'N/A', abundance: 'Synthetic element. Named after Lise Meitner. Half-life of Mt-278: ~4.5 seconds.', uses: 'No practical applications.' },
  { number: 110, symbol: 'Ds', name: 'Darmstadtium', mass: '(281)', category: 'transition-metal', row: 7, col: 10, period: 7, group: 10, block: 'd', state: 'solid', meltingPoint: 'Unknown',   boilingPoint: 'Unknown', density: '34.8 g/cm³ (predicted)', appearance: 'Unknown', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d⁸ 7s² (predicted)', valency: '6,4', oxidationStates: ['+6','+4'], ionizationEnergy: 'Unknown', atomicRadius: 'Unknown', covalentRadius: '128 pm (est.)', electronAffinity: 'N/A', abundance: 'Synthetic element. Named after Darmstadt, Germany. Most stable isotope Ds-281 has a half-life of ~9.6 seconds.', uses: 'No practical applications.' },
  { number: 111, symbol: 'Rg', name: 'Roentgenium',  mass: '(282)', category: 'transition-metal', row: 7, col: 11, period: 7, group: 11, block: 'd', state: 'solid', meltingPoint: 'Unknown',   boilingPoint: 'Unknown', density: '28.7 g/cm³ (predicted)', appearance: 'Unknown', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d⁹ 7s² (predicted)', valency: '5,3', oxidationStates: ['+5','+3','+1'], ionizationEnergy: 'Unknown', atomicRadius: 'Unknown', covalentRadius: '121 pm (est.)', electronAffinity: 'N/A', abundance: 'Synthetic element. Named after Wilhelm Röntgen. Half-life of most stable isotope Rg-282: ~100 seconds.', uses: 'No practical applications.' },
  { number: 112, symbol: 'Cn', name: 'Copernicium',  mass: '(285)', category: 'transition-metal', row: 7, col: 12, period: 7, group: 12, block: 'd', state: 'gas',   meltingPoint: 'Unknown',   boilingPoint: '84 °C (predicted)', density: '23.7 g/cm³ (predicted)', appearance: 'Predicted to be a gas at room temperature', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', valency: '2', oxidationStates: ['+2','+4'], ionizationEnergy: 'Unknown', atomicRadius: 'Unknown', covalentRadius: '122 pm (est.)', electronAffinity: 'N/A', abundance: 'Synthetic element. Named after Nicolaus Copernicus. Most stable isotope Cn-285 has a half-life of ~28 seconds. Predicted to behave like a noble gas rather than a metal due to relativistic effects.', uses: 'No practical applications.' },
  { number: 113, symbol: 'Nh', name: 'Nihonium',     mass: '(286)', category: 'post-transition',  row: 7, col: 13, period: 7, group: 13, block: 'p', state: 'solid', meltingPoint: '430 °C (predicted)', boilingPoint: '1130 °C (predicted)', density: '16 g/cm³ (predicted)', appearance: 'Unknown', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', valency: '1,3', oxidationStates: ['+1','+3'], ionizationEnergy: 'Unknown', atomicRadius: 'Unknown', covalentRadius: '136 pm (est.)', electronAffinity: 'N/A', abundance: 'Synthetic element. First discovered by RIKEN (Japan); named after Japan (Nihon). Half-life of Nh-286: ~9.5 seconds.', uses: 'No practical applications.' },
  { number: 114, symbol: 'Fl', name: 'Flerovium',    mass: '(289)', category: 'post-transition',  row: 7, col: 14, period: 7, group: 14, block: 'p', state: 'solid', meltingPoint: 'Unknown',   boilingPoint: '210 °C (predicted)', density: '14 g/cm³ (predicted)', appearance: 'Unknown; may be a gas due to relativistic effects', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', valency: '0,2,4', oxidationStates: ['0','+2','+4'], ionizationEnergy: 'Unknown', atomicRadius: 'Unknown', covalentRadius: '143 pm (est.)', electronAffinity: 'N/A', abundance: 'Synthetic element. Named after Flerov Laboratory of Nuclear Reactions (Dubna). Most stable isotope Fl-289 has a half-life of ~2.6 seconds.', uses: 'No practical applications.' },
  { number: 115, symbol: 'Mc', name: 'Moscovium',    mass: '(290)', category: 'post-transition',  row: 7, col: 15, period: 7, group: 15, block: 'p', state: 'solid', meltingPoint: '400 °C (predicted)', boilingPoint: '1100 °C (predicted)', density: '13.5 g/cm³ (predicted)', appearance: 'Unknown', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', valency: '1,3', oxidationStates: ['+1','+3'], ionizationEnergy: 'Unknown', atomicRadius: 'Unknown', covalentRadius: '162 pm (est.)', electronAffinity: 'N/A', abundance: 'Synthetic element. Named after Moscow Oblast, Russia. Half-life of most stable isotope Mc-290: ~0.65 seconds.', uses: 'No practical applications.' },
  { number: 116, symbol: 'Lv', name: 'Livermorium',  mass: '(293)', category: 'post-transition',  row: 7, col: 16, period: 7, group: 16, block: 'p', state: 'solid', meltingPoint: '364-507 °C (predicted)', boilingPoint: '762-862 °C (predicted)', density: '12.9 g/cm³ (predicted)', appearance: 'Unknown', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', valency: '2,4', oxidationStates: ['+2','+4'], ionizationEnergy: 'Unknown', atomicRadius: 'Unknown', covalentRadius: '175 pm (est.)', electronAffinity: 'N/A', abundance: 'Synthetic element. Named after Lawrence Livermore National Laboratory. Half-life of Lv-293: ~60 milliseconds.', uses: 'No practical applications.' },
  { number: 117, symbol: 'Ts', name: 'Tennessine',   mass: '(294)', category: 'halogen',          row: 7, col: 17, period: 7, group: 17, block: 'p', state: 'solid', meltingPoint: '350-550 °C (predicted)', boilingPoint: '610 °C (predicted)', density: '7.17 g/cm³ (predicted)', appearance: 'Unknown', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', valency: '1,3', oxidationStates: ['+1','+3','-1'], ionizationEnergy: 'Unknown', atomicRadius: 'Unknown', covalentRadius: '165 pm (est.)', electronAffinity: 'N/A', abundance: 'Synthetic element. Named after Tennessee. Synthesised in 2010 using Bk-249 target with Ca-48 beam. Half-life: ~51 milliseconds.', uses: 'No practical applications.' },
  { number: 118, symbol: 'Og', name: 'Oganesson',    mass: '(294)', category: 'noble-gas',        row: 7, col: 18, period: 7, group: 18, block: 'p', state: 'solid', meltingPoint: '−47 to 25 °C (predicted)', boilingPoint: '~177 °C (predicted)', density: '4.95–5.15 g/cm³ (predicted)', appearance: 'Unknown; relativistic effects may make it a solid at room temperature', electronegativity: 'Unknown', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', valency: '0,2,4,6', oxidationStates: ['0','+2','+4','+6'], ionizationEnergy: '~860 kJ/mol (predicted)', atomicRadius: 'Unknown', covalentRadius: '157 pm (est.)', electronAffinity: 'N/A', abundance: 'The heaviest and last confirmed element. Synthetic, not found in nature. Synthesised in 2002 at JINR (Dubna) and LLNL. Named after Yuri Oganessian. Half-life: ~0.89 milliseconds. Only 5 atoms have ever been detected.', uses: 'No practical applications. The heaviest element currently known.' },
];

/* ═══════════════════════════════════════════════════════════════════
   3. APP STATE
   ═══════════════════════════════════════════════════════════════════ */
let state = {
  search: '',
  category: '',
  legendHighlight: null,   // category key highlighted via legend
  activeElement: null,     // element object currently in modal
  activeTab: 'physical',
};

/* ═══════════════════════════════════════════════════════════════════
   4. DOM REFERENCES
   ═══════════════════════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const dom = {
  grid:          () => $('periodicGrid'),
  legend:        () => $('legend'),
  searchInput:   () => $('searchInput'),
  clearSearchBtn:() => $('clearSearchBtn'),
  categoryFilter:() => $('categoryFilter'),
  resetBtn:      () => $('resetBtn'),
  visibleCount:  () => $('visibleCount'),
  modalOverlay:  () => $('modalOverlay'),
  modalBackdrop: () => $('modalBackdrop'),
  modalContainer:() => $('modalContainer'),
  modalCloseBtn: () => $('modalCloseBtn'),
  modalHero:     () => $('modalHero'),
  tabNav:        () => $('tabNav'),
  tabPanel:      () => $('tabPanel'),
};

/* ═══════════════════════════════════════════════════════════════════
   5. HELPER UTILITIES
   ═══════════════════════════════════════════════════════════════════ */
function escHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getCategoryDef(key) {
  return CATEGORIES[key] || { label: 'Unknown', color: '#94a3b8', rgb: '148,163,184' };
}

/* ═══════════════════════════════════════════════════════════════════
   6. LEGEND
   ═══════════════════════════════════════════════════════════════════ */
function renderLegend() {
  const container = dom.legend();
  container.innerHTML = '';
  Object.entries(CATEGORIES).forEach(([key, def]) => {
    const item = document.createElement('button');
    item.className = 'legend-item';
    item.setAttribute('role', 'listitem');
    item.setAttribute('aria-pressed', 'false');
    item.dataset.cat = key;
    item.style.setProperty('--item-color', def.color);
    item.style.setProperty('--item-rgb', def.rgb);
    item.innerHTML = `
      <span class="legend-dot" style="background:${def.color};box-shadow:0 0 6px ${def.color}55"></span>
      <span>${escHtml(def.label)}</span>
    `;
    item.addEventListener('click', () => toggleLegendHighlight(key, item));
    container.appendChild(item);
  });
}

function toggleLegendHighlight(catKey, btn) {
  const wasActive = state.legendHighlight === catKey;
  state.legendHighlight = wasActive ? null : catKey;

  // Update button states
  dom.legend().querySelectorAll('.legend-item').forEach(el => {
    const active = el.dataset.cat === state.legendHighlight;
    el.classList.toggle('active', active);
    el.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  applyFilters();
}

/* ═══════════════════════════════════════════════════════════════════
   7. GRID RENDERING
   ═══════════════════════════════════════════════════════════════════ */
function renderGrid() {
  const grid = dom.grid();
  grid.innerHTML = '';

  // Spacer for row 8 (visual gap between main table and f-block)
  const spacer = document.createElement('div');
  spacer.className = 'grid-spacer';
  spacer.style.gridRow = '8';
  spacer.style.gridColumn = '1 / -1';
  grid.appendChild(spacer);

  // Placeholder label at period 6, col 3 (Lanthanides)
  grid.appendChild(makePlaceholder(6, 3, '57–71', 'Lanthanides', 'lanthanide'));
  // Placeholder label at period 7, col 3 (Actinides)
  grid.appendChild(makePlaceholder(7, 3, '89–103', 'Actinides', 'actinide'));

  // Render all element cards
  ELEMENTS.forEach((el, idx) => {
    const card = makeCard(el, idx);
    grid.appendChild(card);
  });
}

function makePlaceholder(row, col, range, label, cat) {
  const def = getCategoryDef(cat);
  const el = document.createElement('div');
  el.className = 'placeholder-card';
  el.style.gridRow = row;
  el.style.gridColumn = col;
  el.style.borderColor = `${def.color}55`;
  el.innerHTML = `
    <span style="color:${def.color}">${range}</span>
    <span>${label}</span>
  `;
  return el;
}

function makeCard(el, idx) {
  const card = document.createElement('div');
  card.className = 'element-card';
  card.setAttribute('role', 'gridcell');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${el.name}, atomic number ${el.number}`);
  card.dataset.number = el.number;
  card.dataset.cat = el.category;
  card.dataset.name = el.name.toLowerCase();
  card.dataset.symbol = el.symbol.toLowerCase();
  card.style.gridRow = el.row;
  card.style.gridColumn = el.col;
  card.style.setProperty('--anim-order', idx);

  // State indicator
  const stateClass = el.state && ['solid','liquid','gas'].includes(el.state) ? el.state : 'solid';

  card.innerHTML = `
    <span class="card-number">${el.number}</span>
    <span class="card-state ${stateClass}" title="State at room temp: ${el.state}"></span>
    <span class="card-symbol">${escHtml(el.symbol)}</span>
    <span class="card-name">${escHtml(el.name)}</span>
    <span class="card-mass">${escHtml(el.mass)}</span>
  `;

  // Click → open modal
  card.addEventListener('click', () => openModal(el));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(el);
    }
  });

  return card;
}

/* ═══════════════════════════════════════════════════════════════════
   8. FILTERING & SEARCH
   ═══════════════════════════════════════════════════════════════════ */
function applyFilters() {
  const q = state.search.trim().toLowerCase();
  const cat = state.category;
  const legend = state.legendHighlight;

  let visibleCount = 0;
  const cards = dom.grid().querySelectorAll('.element-card');

  cards.forEach(card => {
    const elName   = card.dataset.name;
    const elSymbol = card.dataset.symbol;
    const elNum    = card.dataset.number;
    const elCat    = card.dataset.cat;

    // Search match
    const matchesSearch = !q
      || elName.includes(q)
      || elSymbol.includes(q)
      || elNum.includes(q);

    // Category dropdown match
    const matchesCat = !cat || elCat === cat;

    // Legend highlight match
    const matchesLegend = !legend || elCat === legend;

    const visible = matchesSearch && matchesCat && matchesLegend;
    card.classList.toggle('dimmed', !visible);
    card.classList.toggle('highlighted', !!(legend && elCat === legend && !q && !cat));
    if (visible) visibleCount++;
  });

  // Update visible badge
  const vcEl = dom.visibleCount();
  if (vcEl) vcEl.textContent = visibleCount;

  // Show/hide clear button
  dom.clearSearchBtn().hidden = !q;
}

/* ═══════════════════════════════════════════════════════════════════
   9. MODAL — OPEN & HERO RENDER
   ═══════════════════════════════════════════════════════════════════ */
function openModal(el) {
  state.activeElement = el;
  state.activeTab = 'physical';

  const overlay = dom.modalOverlay();
  const container = dom.modalContainer();
  const def = getCategoryDef(el.category);

  // Set modal colour theme
  container.style.setProperty('--modal-color', def.color);
  container.style.setProperty('--modal-rgb', def.rgb);

  // Render hero block
  dom.modalHero().innerHTML = buildHeroHTML(el, def);

  // Render tab nav (reset active)
  dom.tabNav().querySelectorAll('.tab-btn').forEach(btn => {
    const isActive = btn.dataset.tab === 'physical';
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Render initial tab content
  renderTabContent(el, 'physical');

  // Open overlay
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');

  // Focus close button
  setTimeout(() => dom.modalCloseBtn().focus(), 50);

  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function buildHeroHTML(el, def) {
  const stateColour = { solid: 'rgba(255,255,255,0.5)', liquid: '#38bdf8', gas: 'rgba(255,255,255,0.25)' };
  const stateLabel  = el.state ? (el.state.charAt(0).toUpperCase() + el.state.slice(1)) : 'Unknown';
  const dot = stateColour[el.state] || 'rgba(255,255,255,0.3)';

  return `
    <div class="hero-bg-symbol" aria-hidden="true">${escHtml(el.symbol)}</div>
    <div class="hero-number">№ ${el.number}</div>
    <div class="hero-symbol" id="modalElementName">${escHtml(el.symbol)}</div>
    <div class="hero-name">${escHtml(el.name)}</div>
    <div class="hero-mass">${escHtml(el.mass)} u</div>
    <div class="hero-badge">${escHtml(def.label)}</div>
    <div class="hero-state-row">
      <span class="hero-state-dot" style="background:${dot}"></span>
      <span>${stateLabel} at room temp</span>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════════════
   10. MODAL — TAB CONTENT
   ═══════════════════════════════════════════════════════════════════ */
function renderTabContent(el, tab) {
  const panel = dom.tabPanel();
  panel.innerHTML = '';

  switch (tab) {
    case 'physical':   panel.innerHTML = buildPhysicalTab(el); break;
    case 'chemical':   panel.innerHTML = buildChemicalTab(el); break;
    case 'periodic':   panel.innerHTML = buildPeriodicTab(el); break;
    case 'occurrence': panel.innerHTML = buildOccurrenceTab(el); break;
  }
}

function prop(label, value, cls = '') {
  const isEmpty = !value || value === 'N/A' || value === 'Unknown' || value === '';
  const valClass = isEmpty ? 'prop-value na' : `prop-value${cls ? ' ' + cls : ''}`;
  const displayVal = isEmpty ? 'N/A' : escHtml(value);
  return `
    <div class="prop-item">
      <div class="prop-label">${escHtml(label)}</div>
      <div class="${valClass}">${displayVal}</div>
    </div>
  `;
}

function buildPhysicalTab(el) {
  return `
    <div class="props-grid">
      ${prop('State at Room Temp.', el.state ? (el.state.charAt(0).toUpperCase() + el.state.slice(1)) : 'N/A')}
      ${prop('Melting Point', el.meltingPoint)}
      ${prop('Boiling Point', el.boilingPoint)}
      ${prop('Density', el.density)}
    </div>
    <div class="props-grid single">
      ${prop('Appearance', el.appearance)}
    </div>
  `;
}

function buildChemicalTab(el) {
  const oxStates = Array.isArray(el.oxidationStates) && el.oxidationStates.length
    ? `<div class="oxidation-states">${el.oxidationStates.map(s => `<span class="oxidation-pill">${escHtml(s)}</span>`).join('')}</div>`
    : `<div class="prop-value na">N/A</div>`;

  return `
    <div class="props-grid">
      ${prop('Electronegativity', el.electronegativity ? `${el.electronegativity} (Pauling)` : 'N/A')}
      ${prop('Ionisation Energy', el.ionizationEnergy)}
    </div>
    <div class="props-grid single">
      ${prop('Electron Configuration', el.electronConfig, 'mono')}
    </div>
    <div class="props-grid">
      ${prop('Valency', el.valency)}
      <div class="prop-item">
        <div class="prop-label">Oxidation States</div>
        ${oxStates}
      </div>
    </div>
  `;
}

function buildPeriodicTab(el) {
  const blockLabel = { s: 's-block', p: 'p-block', d: 'd-block', f: 'f-block' }[el.block] || el.block;
  return `
    <div class="props-grid">
      ${prop('Group', el.group !== undefined ? `Group ${el.group}` : 'N/A')}
      ${prop('Period', el.period !== undefined ? `Period ${el.period}` : 'N/A')}
      ${prop('Block', blockLabel || 'N/A')}
      ${prop('Electron Affinity', el.electronAffinity)}
    </div>
    <div class="props-grid">
      ${prop('Atomic Radius', el.atomicRadius)}
      ${prop('Covalent Radius', el.covalentRadius)}
    </div>
  `;
}

function buildOccurrenceTab(el) {
  const ab = el.abundance || 'No abundance data available.';
  const us = el.uses || 'No uses data available.';
  return `
    <div class="section-title">Natural Abundance</div>
    <div class="occurrence-text">${escHtml(ab)}</div>
    <div class="section-title">Commercial & Industrial Uses</div>
    <div class="uses-text">${escHtml(us)}</div>
  `;
}

/* ═══════════════════════════════════════════════════════════════════
   11. MODAL — CLOSE
   ═══════════════════════════════════════════════════════════════════ */
function closeModal() {
  const overlay = dom.modalOverlay();
  overlay.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('open');
  state.activeElement = null;
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════════════════════════════
   12. EVENT LISTENERS
   ═══════════════════════════════════════════════════════════════════ */
function setupEventListeners() {
  // Search input
  dom.searchInput().addEventListener('input', e => {
    state.search = e.target.value;
    applyFilters();
    dom.clearSearchBtn().hidden = !state.search;
  });

  // Clear search
  dom.clearSearchBtn().addEventListener('click', () => {
    state.search = '';
    dom.searchInput().value = '';
    dom.clearSearchBtn().hidden = true;
    applyFilters();
    dom.searchInput().focus();
  });

  // Category dropdown
  dom.categoryFilter().addEventListener('change', e => {
    state.category = e.target.value;
    // Clear legend highlight when using dropdown
    state.legendHighlight = null;
    dom.legend().querySelectorAll('.legend-item').forEach(el => {
      el.classList.remove('active');
      el.setAttribute('aria-pressed', 'false');
    });
    applyFilters();
  });

  // Reset button
  dom.resetBtn().addEventListener('click', () => {
    state.search = '';
    state.category = '';
    state.legendHighlight = null;
    dom.searchInput().value = '';
    dom.clearSearchBtn().hidden = true;
    dom.categoryFilter().value = '';
    dom.legend().querySelectorAll('.legend-item').forEach(el => {
      el.classList.remove('active');
      el.setAttribute('aria-pressed', 'false');
    });
    applyFilters();
  });

  // Modal: close button
  dom.modalCloseBtn().addEventListener('click', closeModal);

  // Modal: backdrop click
  dom.modalBackdrop().addEventListener('click', closeModal);

  // Modal: tab switching
  dom.tabNav().addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn');
    if (!btn || !state.activeElement) return;
    const tab = btn.dataset.tab;
    state.activeTab = tab;

    dom.tabNav().querySelectorAll('.tab-btn').forEach(b => {
      const active = b.dataset.tab === tab;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    renderTabContent(state.activeElement, tab);
  });

  // Keyboard: Escape to close modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && state.activeElement) {
      closeModal();
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   13. INIT
   ═══════════════════════════════════════════════════════════════════ */
function init() {
  renderLegend();
  renderGrid();
  applyFilters();
  setupEventListeners();

  // Set initial visible count
  const vcEl = dom.visibleCount();
  if (vcEl) vcEl.textContent = ELEMENTS.length;
}

document.addEventListener('DOMContentLoaded', init);
