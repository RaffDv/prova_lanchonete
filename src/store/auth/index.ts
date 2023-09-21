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
        user: {
          email: '',
          pass: '',
          privileges: 0,
          token: '',
        },
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
          console.log('execute logout function')

          set({
            state: {
              user: {
                email: '',
                pass: '',
                privileges: 0,
                token: '',
              },
            },
          })
        },
        reset: () => {
          const token = get().state.user?.token
          if (token) {
            const decoded = jwtDecode<jwtType>(atob(token))
            if (Date.now() > 1000 * decoded.exp) {
              set({
                state: {
                  user: {
                    email: '',
                    pass: '',
                    privileges: 0,
                    token: '',
                  },
                },
              })
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
        getToken: () => {
          const token = get().state.user?.token
          if (typeof token === 'string') {
            return token
          }
          return ''
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
