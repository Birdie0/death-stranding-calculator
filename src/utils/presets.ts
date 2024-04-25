import type { Preset } from '.'

const PCC1Structures: Preset[] = [
  // Bridge
  {
    name: 'Bridge (Lv. 1)',
    resources: [['metals', 800]],
  },
  {
    name: 'Bridge (Lv. 2)',
    resources: [
      ['chiral_crystals', 96],
      ['metals', 1600],
    ],
  },
  {
    name: 'Bridge (Lv. 3)',
    resources: [
      ['chiral_crystals', 500],
      ['metals', 2800],
    ],
  },
  // Generator
  {
    name: 'Generator (Lv. 2)',
    resources: [['metals', 400]],
  },
  {
    name: 'Generator (Lv. 3)',
    resources: [
      ['chiral_crystals', 100],
      ['metals', 400],
    ],
  },
  // Postbox
  {
    name: 'Postbox (Lv. 2)',
    resources: [['metals', 200]],
  },
  {
    name: 'Postbox (Lv. 3)',
    resources: [['metals', 600]],
  },
  // Timefall Shelter
  {
    name: 'Timefall Shelter (Lv. 2)',
    resources: [
      ['chiral_crystals', 32],
      ['metals', 400],
    ],
  },
  {
    name: 'Timefall Shelter (Lv. 3)',
    resources: [
      ['chiral_crystals', 300],
      ['metals', 1200],
    ],
  },
  // Watchtower
  {
    name: 'Watchtower (Lv. 2)',
    resources: [
      ['chiral_crystals', 32],
      ['metals', 400],
    ],
  },
  {
    name: 'Watchtower (Lv. 3)',
    resources: [
      ['chiral_crystals', 150],
      ['metals', 800],
    ],
  },
]

const PCC2Structures: Preset[] = [
  // Cargo Catapult
  {
    name: 'Cargo Catapult (Lv. 2)',
    resources: [
      ['chemicals', 240],
      ['resins', 320],
    ],
  },
  {
    name: 'Cargo Catapult (Lv. 3)',
    resources: [
      ['chemicals', 720],
      ['resins', 960],
    ],
  },
  // Chiral Bridge
  {
    name: 'Chiral Bridge (Lv. 2)',
    resources: [
      ['chiral_crystals', 720],
      ['special_alloys', 120],
    ],
  },
  {
    name: 'Chiral Bridge (Lv. 3)',
    resources: [
      ['chiral_crystals', 1440],
      ['resins', 240],
      ['special_alloys', 240],
    ],
  },
  // Jump Ramp
  {
    name: 'Jump Ramp (Lv. 2)',
    resources: [
      ['chiral_crystals', 480],
      ['special_alloys', 240],
    ],
  },
  {
    name: 'Jump Ramp (Lv. 3)',
    resources: [
      ['chiral_crystals', 960],
      ['resins', 480],
      ['special_alloys', 480],
    ],
  },
  // Safehouse
  {
    name: 'Safehouse (Lv. 1)',
    resources: [
      ['chiral_crystals', 300],
      ['special_alloys', 2400],
    ],
  },
  {
    name: 'Safehouse (Lv. 2)',
    resources: [
      ['chiral_crystals', 500],
      ['special_alloys', 4560],
    ],
  },
  {
    name: 'Safehouse (Lv. 3)',
    resources: [
      ['chiral_crystals', 1000],
      ['special_alloys', 6840],
    ],
  },
  // Zip-line
  {
    name: 'Zip-line (Lv. 2)',
    resources: [
      ['chemicals', 240],
      ['special_alloys', 480],
    ],
  },
  {
    name: 'Zip-line (Lv. 3)',
    resources: [
      ['chemicals', 1440],
      ['chiral_crystals', 300],
      ['special_alloys', 1440],
    ],
  },
]

export const presets: { name: string; structures: Preset[] }[] = [
  {
    name: 'PCC (Lv. 1)',
    structures: PCC1Structures,
  },
  {
    name: 'PCC (Lv. 2)',
    structures: PCC2Structures,
  },
]
