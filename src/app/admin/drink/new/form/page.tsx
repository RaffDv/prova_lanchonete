'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function FormDrink() {
  const { back } = useRouter()
  useEffect(() => {
    back()
  }, [])
  return null
}
