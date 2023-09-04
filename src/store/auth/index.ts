import api from '@/api'
import { jwtType } from '@/app/page'
import { AuthUserType, StoreProps } from '@/schemas/global'
import jwtDecode from 'jwt-decode'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthStore = create<StoreProps>()(
  persist(
    (set, get) => ({
      state: {
        user: null,
      },
      actions: {
        login: async (user) => {
          let token = ''
          const userData: AuthUserType = {
            email: user.email,
            pass: user.pass,
            privileges: 0,
            token: '',
          }

          const r = await api.user.login({ email: user.email, pass: user.pass })
          if (r.success) {
            token = r.auth.split(' ')[1]
            const tokenData: jwtType = jwtDecode(atob(token))
            userData.privileges = tokenData.privileges
            userData.token = token
            set({ state: { user: userData } })
          }
        },

        logout: () => {
          set(() => ({ state: { user: null } }), true)
        },
        reset: () => {
          const token = get().state.user?.token
          if (token) {
            const decoded = jwtDecode<jwtType>(atob(token))
            if (Date.now() > 1000 * decoded.exp) {
              set({ state: { user: null } })
            }
          }
        },
        isAdmin: () => {
          const priv = get().state.user?.privileges

          if (priv === 10) {
            return true
          }

          return false
        },
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ state }) => ({ state }),
    },
  ),
)
