import { AuthUserType, StoreProps } from '@/schemas/global'
import { create } from 'zustand'

export const useAuthStore = create<StoreProps>((set) => ({
  state: {
    user: {} as AuthUserType,
  },
  actions: {
    setUser: (user) => set({ state: { user } }),
    // isAdmin: () => {
    //   if () {
    //     return true
    //   }
    //   return false
    // },
  },
}))
