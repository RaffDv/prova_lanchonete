'use client'
import { createContext, useState } from 'react'
import { AuthUserType } from '../../../schemas/global'
import api from '@/api'
import { useRouter } from 'next/navigation'

type AuthContextProps = {
  user: AuthUserType | null
  login: (user: AuthUserType) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<AuthUserType>({
    email: '',
    pass: '',
  })

  const login = async (user: AuthUserType) => {
    setUser(user)
    let token = ''
    const r = await api.user.login({ ...user })
    if (r.success) {
      token = r.auth.split(' ')[1]

      router.push(`/API/user/login?token=${token}`)
    }
  }

  const logout = () => {
    console.log('logout')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>{children}</>
    </AuthContext.Provider>
  )
}
export { AuthProvider, AuthContext }
