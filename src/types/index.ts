export type ResourceItem = [number, number]
export type RequirementItem = [string, number, ResourceItem[], string]

// export type Material =
//   | 'ceramics'
//   | 'chemicals'
//   | 'chiral_crystals'
//   | 'metals'
//   | 'resins'
//   | 'special_alloys'

// export interface Requirement {
//   type: Material
//   total: number
//   chunks: [number, number, number, number, number, number, number]
// }

// export type TotalRequirements = {
//   [key in Material]: Requirement['chunks']
// }

// const chunks = [20, 16, 12, 8, 4, 2, 1] as const

// export const materials = [
//   ['Ceramics', 'ceramics'],
//   ['Chemicals', 'chemicals'],
//   ['Chiral Crystals', 'chiral_crystals'],
//   ['Metals', 'metals'],
//   ['Resins', 'resins'],
//   ['Special Alloys', 'special_alloys'],
// ] as const
