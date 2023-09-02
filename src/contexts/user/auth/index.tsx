'use client'
import { createContext, useState } from 'react'
import { AuthUserType } from '../../../schemas/global'
import api from '@/api'
import { useRouter } from 'next/navigation'

type AuthContextProps = {
  userState: AuthUserType | null
  login: (user: AuthUserType) => void
  logout: () => void
  setPrivilegesLevel: (privileges: number) => void
  isAdmin: () => boolean
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [userState, setUserState] = useState<AuthUserType>({
    email: '',
    pass: '',
    privileges: 0,
  })

  const login = async (user: AuthUserType) => {
    setUserState(user)

    let token = ''
    const r = await api.user.login({ email: user.email, pass: user.pass })
    if (r.success) {
      console.log(r)
      token = r.auth.split(' ')[1]

      router.push(`/API/user/login?token=${token}`)
    }
  }
  const setPrivilegesLevel = (privileges: number) => {
    setUserState({ ...userState, privileges })
  }

  const logout = () => {
    console.log('logout')
  }

  const isAdmin = () => {
    if (userState.privileges && userState.privileges === 10) {
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider
      value={{ userState, login, logout, isAdmin, setPrivilegesLevel }}
    >
      <>{children}</>
    </AuthContext.Provider>
  )
}
export { AuthProvider, AuthContext }
