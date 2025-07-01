import type {
  RequirementItem,
  ResourceItem,
  TotalRequirementItem,
} from '../types'

const chunksDs1 = [20, 16, 12, 8, 4, 2, 1] as const
const chunksDs2 = [8, 4, 2, 1] as const

export const materials = [
  { label: 'Ceramics', slug: 'ceramics', hotkey: 'c' },
  { label: 'Chemicals', slug: 'chemicals', hotkey: 'h' },
  { label: 'Chiral Crystals', slug: 'chiral_crystals', hotkey: 'i' },
  { label: 'Metals', slug: 'metals', hotkey: 'm' },
  { label: 'Resins', slug: 'resins', hotkey: 'r' },
  { label: 'Special Alloys', slug: 'special_alloys', hotkey: 's' },
] as const

export type Material = (typeof materials)[number]['slug']

export interface Structure {
  name: string
  resources: [Material, number][]
  repairMaterials: Material[]
  level: number
}

export function calculateRequirements(
  amount: number,
  type: Material,
  gameVersion: number = 1,
): ResourceItem[] {
  if (amount === 0) {
    return []
  }

  if (type === 'chiral_crystals') {
    return [[1, amount]]
  }

  let divider: number
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
  const chunks = gameVersion === 1 ? chunksDs1 : chunksDs2
  for (const chunk of chunks) {
    if (remaining === 0) break

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
  return count > 1 ? `${size}×${count}` : size
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

export function calculateTotals(
  memory: RequirementItem[],
  gameVersion: number = 1,
): TotalRequirementItem[] {
  const result: Record<
    string,
    {
      total: number
      resources: Record<number, number>
      notes: string[]
    }
  > = {}

  for (const { material, total, resources, note } of memory) {
    result[material] ||= {
      total: 0,
      resources: {},
      notes: [],
    }

    result[material].total += total
    if (note.length > 0) {
      result[material].notes.push(note)
    }

    if (gameVersion === 2) continue

    for (const [size, count] of resources) {
      result[material].resources[size] ||= 0
      result[material].resources[size] += count
    }
  }

  if (gameVersion === 2) {
    for (const [materialLabel, { total }] of Object.entries(result)) {
      const material = materials.find(
        (item) => item.label === materialLabel,
      )?.slug
      if (!material) continue

      const resources = calculateRequirements(total, material, 2)
      for (const [size, count] of resources) {
        result[materialLabel].resources[size] ||= 0
        result[materialLabel].resources[size] += count
      }
    }
  }

  return Object.entries(result).map(
    ([material, { total, resources, notes }]) => {
      const res = Object.entries(resources).map(
        ([a, b]) => [Number(a), b] satisfies ResourceItem,
      )

      return {
        material,
        total,
        resources: res,
        note: notes.join(', '),
      }
    },
  )
}
