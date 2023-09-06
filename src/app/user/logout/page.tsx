'use client'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Triangle } from 'react-loader-spinner'

export default function Page() {
  const {
    actions: { logout },
  } = useAuthStore()
  const { push } = useRouter()
  useEffect(() => {
    logout()
    push('/')
  }, [])
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <Triangle height={100} width={100} visible color="#0089D7" />
    </div>
  )
}
