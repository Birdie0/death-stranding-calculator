// import { create } from 'zustand'
// import { devtools, persist } from 'zustand/middleware'

// interface MaterialsState {
//   memory: {}[]
//   increase: (by: number) => void
// }

// export const useMaterialsStore = create<MaterialsState>()(
//   devtools(
//     persist(
//       (set) => ({
//         bears: 0,
//         increase: (by) => set((state) => ({ bears: state.bears + by })),
//       }),
//       { name: 'bearStore' },
//     ),
//   ),
// )
