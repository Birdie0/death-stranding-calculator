import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface RepairItem {
  id: string
}

interface RepairPlanState {
  repairPlan: RepairItem[]
  addItem: (value: RepairItem) => void
  removeItem: (id: RepairItem['id']) => void
  clearRepairPlan: () => void
}

export const useRepairPlanStore = create<RepairPlanState>()(
  devtools(
    persist(
      (set) => ({
        repairPlan: [],
        clearRepairPlan: () => set(() => ({ repairPlan: [] })),
        addItem: (value) =>
          set((state) => ({ repairPlan: [...state.repairPlan, value] })),
        removeItem: (id) =>
          set((state) => ({
            repairPlan: state.repairPlan.filter((item) => item.id !== id),
          })),
      }),
      { name: 'repairPlanStore' },
    ),
    { name: 'repairPlanStore' },
  ),
)
