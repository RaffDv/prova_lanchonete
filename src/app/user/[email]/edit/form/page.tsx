'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Form() {
  const { back } = useRouter()
  useEffect(() => {
    back()
  }, [])
  return (
    <div className="flex h-full w-full justify-center items-center">
      <p>Carregando</p>
    </div>
  )
}
