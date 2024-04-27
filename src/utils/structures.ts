import type { Structure } from './materials-math'

const PCC1Structures: Structure[] = [
  // Bridge
  {
    name: 'Bridge (Lv. 1)',
    resources: [['metals', 800]],
    repairMaterials: ['chiral_crystals', 'metals'],
    level: 1,
  },
  {
    name: 'Bridge (Lv. 2)',
    resources: [
      ['chiral_crystals', 96],
      ['metals', 1600],
    ],
    repairMaterials: ['chiral_crystals', 'metals'],
    level: 2,
  },
  {
    name: 'Bridge (Lv. 3)',
    resources: [
      ['chiral_crystals', 500],
      ['metals', 2800],
    ],
    repairMaterials: ['chiral_crystals', 'metals'],
    level: 3,
  },
  // Generator
  {
    name: 'Generator (Lv. 2)',
    resources: [['metals', 400]],
    repairMaterials: ['chiral_crystals', 'metals'],
    level: 2,
  },
  {
    name: 'Generator (Lv. 3)',
    resources: [
      ['chiral_crystals', 100],
      ['metals', 400],
    ],
    repairMaterials: ['chiral_crystals', 'metals'],
    level: 3,
  },
  // Postbox
  {
    name: 'Postbox (Lv. 2)',
    resources: [['metals', 200]],
    repairMaterials: ['chiral_crystals', 'metals'],
    level: 2,
  },
  {
    name: 'Postbox (Lv. 3)',
    resources: [['metals', 600]],
    repairMaterials: ['chiral_crystals', 'metals'],
    level: 3,
  },
  // Timefall Shelter
  {
    name: 'Timefall Shelter (Lv. 2)',
    resources: [
      ['chiral_crystals', 32],
      ['metals', 400],
    ],
    repairMaterials: ['chiral_crystals', 'metals'],
    level: 2,
  },
  {
    name: 'Timefall Shelter (Lv. 3)',
    resources: [
      ['chiral_crystals', 300],
      ['metals', 1200],
    ],
    repairMaterials: ['chiral_crystals', 'metals'],
    level: 3,
  },
  // Watchtower
  {
    name: 'Watchtower (Lv. 2)',
    resources: [
      ['chiral_crystals', 32],
      ['metals', 400],
    ],
    repairMaterials: ['chiral_crystals', 'metals'],
    level: 2,
  },
  {
    name: 'Watchtower (Lv. 3)',
    resources: [
      ['chiral_crystals', 150],
      ['metals', 800],
    ],
    repairMaterials: ['chiral_crystals', 'metals'],
    level: 3,
  },
]

const PCC2Structures: Structure[] = [
  // Cargo Catapult
  {
    name: 'Cargo Catapult (Lv. 2)',
    resources: [
      ['chemicals', 240],
      ['resins', 320],
    ],
    repairMaterials: ['chiral_crystals', 'chemicals', 'resins'],
    level: 2,
  },
  {
    name: 'Cargo Catapult (Lv. 3)',
    resources: [
      ['chemicals', 720],
      ['resins', 960],
    ],
    repairMaterials: ['chiral_crystals', 'chemicals', 'resins'],
    level: 3,
  },
  // Chiral Bridge
  {
    name: 'Chiral Bridge (Lv. 2)',
    resources: [
      ['chiral_crystals', 720],
      ['special_alloys', 120],
    ],
    repairMaterials: ['chiral_crystals', 'resins', 'special_alloys'],
    level: 2,
  },
  {
    name: 'Chiral Bridge (Lv. 3)',
    resources: [
      ['chiral_crystals', 1440],
      ['resins', 240],
      ['special_alloys', 240],
    ],
    repairMaterials: ['chiral_crystals', 'resins', 'special_alloys'],
    level: 3,
  },
  // Jump Ramp
  {
    name: 'Jump Ramp (Lv. 2)',
    resources: [
      ['chiral_crystals', 480],
      ['special_alloys', 240],
    ],
    repairMaterials: ['chiral_crystals', 'resins', 'special_alloys'],
    level: 2,
  },
  {
    name: 'Jump Ramp (Lv. 3)',
    resources: [
      ['chiral_crystals', 960],
      ['resins', 480],
      ['special_alloys', 480],
    ],
    repairMaterials: ['chiral_crystals', 'resins', 'special_alloys'],
    level: 3,
  },
  // Safehouse
  {
    name: 'Safehouse (Lv. 1)',
    resources: [
      ['chiral_crystals', 300],
      ['special_alloys', 2400],
    ],
    repairMaterials: ['chiral_crystals', 'special_alloys'],
    level: 1,
  },
  {
    name: 'Safehouse (Lv. 2)',
    resources: [
      ['chiral_crystals', 500],
      ['special_alloys', 4560],
    ],
    repairMaterials: ['chiral_crystals', 'special_alloys'],

    level: 2,
  },
  {
    name: 'Safehouse (Lv. 3)',
    resources: [
      ['chiral_crystals', 1000],
      ['special_alloys', 6840],
    ],
    repairMaterials: ['chiral_crystals', 'special_alloys'],

    level: 3,
  },
  // Zip-line
  {
    name: 'Zip-line (Lv. 2)',
    resources: [
      ['chemicals', 240],
      ['special_alloys', 480],
    ],
    repairMaterials: ['chemicals', 'chiral_crystals', 'special_alloys'],

    level: 2,
  },
  {
    name: 'Zip-line (Lv. 3)',
    resources: [
      ['chemicals', 1440],
      ['chiral_crystals', 300],
      ['special_alloys', 1440],
    ],
    repairMaterials: ['chemicals', 'chiral_crystals', 'special_alloys'],
    level: 3,
  },
]

export const structures: { name: string; items: Structure[] }[] = [
  {
    name: 'PCC (Lv. 1)',
    items: PCC1Structures,
  },
  {
    name: 'PCC (Lv. 2)',
    items: PCC2Structures,
  },
]

export const durabilityPerLevel = [360_000, 540_000, 900_000] as const
