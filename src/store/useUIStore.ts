import { create } from 'zustand'

interface UIState {
  /** show PM rationale callouts across the app */
  annotationsOn: boolean
  toggleAnnotations: () => void
  /** render mobile lenses inside a phone device frame (desktop only) */
  deviceFrame: boolean
  toggleDeviceFrame: () => void
  /** guided tour step; null = tour not running */
  tourStep: number | null
  startTour: () => void
  nextTourStep: () => void
  endTour: () => void
}

export const useUIStore = create<UIState>((set) => ({
  annotationsOn: false,
  toggleAnnotations: () => set((s) => ({ annotationsOn: !s.annotationsOn })),
  deviceFrame: true,
  toggleDeviceFrame: () => set((s) => ({ deviceFrame: !s.deviceFrame })),
  tourStep: null,
  startTour: () => set({ tourStep: 0 }),
  nextTourStep: () => set((s) => ({ tourStep: (s.tourStep ?? 0) + 1 })),
  endTour: () => set({ tourStep: null }),
}))
