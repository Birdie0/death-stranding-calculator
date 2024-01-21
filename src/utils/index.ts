import type { ResourceItem } from '../types'

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

export function calculateRequirements(
  amount: number,
  type: Material,
): ResourceItem[] {
  if (amount === 0) {
    return []
  }

  if (type === 'chiral_crystals') {
    return [[amount, 1]]
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
  amount = Math.ceil(amount / divider)
  for (const chunk of chunks) {
    const boxes = Math.floor(amount / chunk)
    if (boxes > 0) {
      arr.push([chunk * divider, boxes])
      amount -= boxes * chunk
    }
  }

  return arr.reverse()
}

export function formatResult(t: ResourceItem): string {
  const [size, count] = t
  return count > 1 ? `${size}x${count}` : `${size}`
}

export function isApproximate(
  arr: ResourceItem[],
  total: number,
): string | number {
  const sum = arr.reduce((sum, [size, count]) => sum + size * count, 0)
  return total === sum ? total : `${total}* (${sum})`
}
