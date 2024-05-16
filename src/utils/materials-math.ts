import type { RequirementItem, ResourceItem } from '../types'

const chunks = [20, 16, 12, 8, 4, 2, 1] as const

export const materials = [
  ['Ceramics', 'ceramics'],
  ['Chemicals', 'chemicals'],
  ['Chiral Crystals', 'chiral_crystals'],
  ['Metals', 'metals'],
  ['Resins', 'resins'],
  ['Special Alloys', 'special_alloys'],
] as const

export type Material = (typeof materials)[number][1]

export interface Structure {
  name: string
  resources: [Material, number][]
  repairMaterials: Material[]
  level: number
}

export function calculateRequirements(
  amount: number,
  type: Material,
): ResourceItem[] {
  if (amount === 0) {
    return []
  }

  if (type === 'chiral_crystals') {
    return [[1, amount]]
  }

  let divider = 1
  const arr: ResourceItem[] = []

  switch (type) {
    case 'chemicals': {
      divider = 30
      break
    }
    case 'ceramics':
    case 'resins': {
      divider = 40
      break
    }
    case 'metals': {
      divider = 50
      break
    }
    case 'special_alloys': {
      divider = 60
      break
    }
  }

  // count required number of chunks
  let remaining = amount
  remaining = Math.ceil(remaining / divider)
  for (const chunk of chunks) {
    const units = Math.floor(remaining / chunk)
    if (units > 0) {
      arr.push([chunk * divider, units])
      remaining -= units * chunk
    }
  }

  return arr.reverse()
}

export function formatResult([size, count]: ResourceItem): string | number {
  if (size === 1) {
    return count
  }
  return count > 1 ? `${size}x${count}` : size
}

export function isApproximate(
  arr: ResourceItem[],
  total: number,
): string | number {
  const sum = arr.reduce(
    (totalSum, [size, count]) => totalSum + size * count,
    0,
  )
  return total === sum ? total : `${total}* (${sum})`
}

export function calculateTotals(memory: RequirementItem[]): RequirementItem[] {
  const result: Record<
    string,
    {
      total: number
      resources: Record<number, number>
      notes: string[]
    }
  > = {}

  for (const { material, total, resources, note } of memory) {
    if (result[material] === undefined) {
      result[material] = {
        total: 0,
        resources: {},
        notes: [],
      }
    }

    result[material].total += total
    if (note.length > 0) {
      result[material].notes.push(note)
    }
    for (const [size, count] of resources) {
      if (result[material].resources[size] === undefined) {
        result[material].resources[size] = 0
      }

      result[material].resources[size] += count
    }
  }

  return Object.entries(result).map(
    ([material, { total, resources, notes }]) => {
      const res = Object.entries(resources).map(
        ([a, b]) => [Number(a), b] satisfies ResourceItem,
      )

      return {
        id: crypto.randomUUID(),
        material,
        total,
        resources: res,
        note: notes.join(', '),
      }
    },
  )
}
