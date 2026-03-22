import type { Structure } from './materials-math'

const PCC1DS1Structures: Structure[] = [
  // Bridge
  {
    name: 'Bridge (Lv. 1)',
    resources: [['metals', 800]],
    level: 1,
  },
  {
    name: 'Bridge (Lv. 2)',
    resources: [
      ['chiral_crystals', 96],
      ['metals', 1600],
    ],
    level: 2,
  },
  {
    name: 'Bridge (Lv. 3)',
    resources: [
      ['chiral_crystals', 500],
      ['metals', 2800],
    ],
    level: 3,
  },
  // Generator
  {
    name: 'Generator (Lv. 2)',
    resources: [['metals', 400]],
    level: 2,
  },
  {
    name: 'Generator (Lv. 3)',
    resources: [
      ['chiral_crystals', 100],
      ['metals', 400],
    ],
    level: 3,
  },
  // Postbox
  {
    name: 'Postbox (Lv. 2)',
    resources: [['metals', 200]],
    level: 2,
  },
  {
    name: 'Postbox (Lv. 3)',
    resources: [['metals', 600]],
    level: 3,
  },
  // Timefall Shelter
  {
    name: 'Timefall Shelter (Lv. 2)',
    resources: [
      ['chiral_crystals', 32],
      ['metals', 400],
    ],
    level: 2,
  },
  {
    name: 'Timefall Shelter (Lv. 3)',
    resources: [
      ['chiral_crystals', 300],
      ['metals', 1200],
    ],
    level: 3,
  },
  // Watchtower
  {
    name: 'Watchtower (Lv. 2)',
    resources: [
      ['chiral_crystals', 32],
      ['metals', 400],
    ],
    level: 2,
  },
  {
    name: 'Watchtower (Lv. 3)',
    resources: [
      ['chiral_crystals', 150],
      ['metals', 800],
    ],
    level: 3,
  },
]

const PCC2DS1Structures: Structure[] = [
  // Cargo Catapult
  {
    name: 'Cargo Catapult (Lv. 2)',
    resources: [
      ['chemicals', 240],
      ['resins', 320],
    ],
    level: 2,
  },
  {
    name: 'Cargo Catapult (Lv. 3)',
    resources: [
      ['chemicals', 720],
      ['resins', 960],
    ],
    level: 3,
  },
  // Chiral Bridge
  {
    name: 'Chiral Bridge (Lv. 2)',
    resources: [
      ['chiral_crystals', 720],
      ['special_alloys', 120],
    ],
    level: 2,
  },
  {
    name: 'Chiral Bridge (Lv. 3)',
    resources: [
      ['chiral_crystals', 1440],
      ['resins', 240],
      ['special_alloys', 240],
    ],
    level: 3,
  },
  // Jump Ramp
  {
    name: 'Jump Ramp (Lv. 2)',
    resources: [
      ['chiral_crystals', 480],
      ['special_alloys', 240],
    ],
    level: 2,
  },
  {
    name: 'Jump Ramp (Lv. 3)',
    resources: [
      ['chiral_crystals', 960],
      ['resins', 480],
      ['special_alloys', 480],
    ],
    level: 3,
  },
  // Safehouse
  {
    name: 'Safehouse (Lv. 1)',
    resources: [
      ['chiral_crystals', 300],
      ['special_alloys', 2400],
    ],
    level: 1,
  },
  {
    name: 'Safehouse (Lv. 2)',
    resources: [
      ['chiral_crystals', 500],
      ['special_alloys', 4560],
    ],
    level: 2,
  },
  {
    name: 'Safehouse (Lv. 3)',
    resources: [
      ['chiral_crystals', 1000],
      ['special_alloys', 6840],
    ],
    level: 3,
  },
  // Zip-line
  {
    name: 'Zip-line (Lv. 2)',
    resources: [
      ['chemicals', 240],
      ['special_alloys', 480],
    ],
    level: 2,
  },
  {
    name: 'Zip-line (Lv. 3)',
    resources: [
      ['chemicals', 1440],
      ['chiral_crystals', 300],
      ['special_alloys', 1440],
    ],
    level: 3,
  },
]

export const structuresDS1: { name: string; items: Structure[] }[] = [
  {
    name: 'PCC (Lv. 1)',
    items: PCC1DS1Structures,
  },
  {
    name: 'PCC (Lv. 2)',
    items: PCC2DS1Structures,
  },
]

const PCC1DS2Structures: Structure[] = [
  // Bridge [30m]
  {
    name: 'Bridge (Lv. 1) [30m]',
    resources: [['metals', 600]],
    level: 1,
  },
  {
    name: 'Bridge (Lv. 2) [30m]',
    resources: [
      ['chiral_crystals', 60],
      ['metals', 800],
    ],
    level: 2,
  },
  {
    name: 'Bridge (Lv. 3) [30m]',
    resources: [
      ['chiral_crystals', 300],
      ['metals', 1000],
    ],
    level: 3,
  },
  // Bridge [45m]
  {
    name: 'Bridge (Lv. 1) [45m]',
    resources: [['metals', 800]],
    level: 1,
  },
  {
    name: 'Bridge (Lv. 2) [45m]',
    resources: [
      ['chiral_crystals', 90],
      ['metals', 1200],
    ],
    level: 2,
  },
  {
    name: 'Bridge (Lv. 3) [45m]',
    resources: [
      ['chiral_crystals', 450],
      ['metals', 1600],
    ],
    level: 3,
  },
  // Bridge [80m]
  {
    name: 'Bridge (Lv. 1) [80m]',
    resources: [['metals', 1200]],
    level: 1,
  },
  {
    name: 'Bridge (Lv. 2) [80m]',
    resources: [
      ['chiral_crystals', 150],
      ['metals', 2000],
    ],
    level: 2,
  },
  {
    name: 'Bridge (Lv. 3) [80m]',
    resources: [
      ['chiral_crystals', 800],
      ['metals', 2800],
    ],
    level: 3,
  },
  // Generator
  {
    name: 'Generator (Lv. 2)',
    resources: [['metals', 400]],
    level: 2,
  },
  {
    name: 'Generator (Lv. 3)',
    resources: [
      ['chiral_crystals', 100],
      ['metals', 400],
    ],
    level: 3,
  },
  // Postbox
  {
    name: 'Postbox (Lv. 2)',
    resources: [['metals', 200]],
    level: 2,
  },
  {
    name: 'Postbox (Lv. 3)',
    resources: [['metals', 600]],
    level: 3,
  },
  // Timefall Shelter
  {
    name: 'Timefall Shelter (Lv. 2)',
    resources: [
      ['chiral_crystals', 32],
      ['metals', 400],
    ],
    level: 2,
  },
  {
    name: 'Timefall Shelter (Lv. 3)',
    resources: [
      ['chiral_crystals', 300],
      ['metals', 1200],
    ],
    level: 3,
  },
  // Watchtower
  {
    name: 'Watchtower (Lv. 2)',
    resources: [
      ['chiral_crystals', 32],
      ['metals', 400],
    ],
    level: 2,
  },
  {
    name: 'Watchtower (Lv. 3)',
    resources: [
      ['chiral_crystals', 150],
      ['metals', 800],
    ],
    level: 3,
  },
]

const PCC2DS2Structures: Structure[] = [
  // Cargo Catapult
  {
    name: 'Cargo Catapult (Lv. 2)',
    resources: [
      ['chemicals', 240],
      ['resins', 320],
    ],
    level: 2,
  },
  {
    name: 'Cargo Catapult (Lv. 3)',
    resources: [
      ['chemicals', 720],
      ['resins', 960],
    ],
    level: 3,
  },
  // Chiral Bridge
  {
    name: 'Chiral Bridge (Lv. 2)',
    resources: [
      ['chiral_crystals', 720],
      ['special_alloys', 120],
    ],
    level: 2,
  },
  {
    name: 'Chiral Bridge (Lv. 3)',
    resources: [
      ['chiral_crystals', 1440],
      ['resins', 240],
      ['special_alloys', 240],
    ],
    level: 3,
  },
  // Jump Ramp
  {
    name: 'Jump Ramp (Lv. 2)',
    resources: [
      ['chiral_crystals', 480],
      ['special_alloys', 240],
    ],
    level: 2,
  },
  {
    name: 'Jump Ramp (Lv. 3)',
    resources: [
      ['chiral_crystals', 960],
      ['resins', 480],
      ['special_alloys', 480],
    ],
    level: 3,
  },
  // Safehouse
  {
    name: 'Safehouse (Lv. 1)',
    resources: [
      ['chiral_crystals', 300],
      ['resins', 960],
      ['special_alloys', 960],
    ],
    level: 1,
  },
  {
    name: 'Safehouse (Lv. 2)',
    resources: [
      ['chiral_crystals', 500],
      ['resins', 1600],
      ['special_alloys', 1920],
    ],
    level: 2,
  },
  {
    name: 'Safehouse (Lv. 3)',
    resources: [
      ['chiral_crystals', 1000],
      ['resins', 2240],
      ['special_alloys', 2880],
    ],
    level: 3,
  },
  // Transponder
  {
    name: 'Transponder (Lv. 2)',
    resources: [
      ['chemicals', 240],
      ['resins', 320],
    ],
    level: 2,
  },
  {
    name: 'Transponder (Lv. 3)',
    resources: [
      ['chemicals', 720],
      ['resins', 960],
    ],
    level: 3,
  },
  // Zip-line
  {
    name: 'Zip-line (Lv. 2)',
    resources: [
      ['chemicals', 240],
      ['special_alloys', 480],
    ],
    level: 2,
  },
  {
    name: 'Zip-line (Lv. 3)',
    resources: [
      ['chemicals', 1440],
      ['chiral_crystals', 300],
      ['special_alloys', 1440],
    ],
    level: 3,
  },
]

export const structuresDS2: { name: string; items: Structure[] }[] = [
  {
    name: 'PCC (Lv. 1)',
    items: PCC1DS2Structures,
  },
  {
    name: 'PCC (Lv. 2)',
    items: PCC2DS2Structures,
  },
]

export const durabilityPerLevel = [360_000, 540_000, 900_000] as const
