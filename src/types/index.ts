export type ResourceItem = [number, number]
export interface RequirementItem {
  id: ReturnType<typeof crypto.randomUUID>
  material: string
  total: number
  resources: ResourceItem[]
  note: string
}
export type TotalRequirementItem = Omit<RequirementItem, 'id'>
