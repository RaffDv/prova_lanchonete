'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Form() {
  const { back } = useRouter()
  useEffect(() => {
    back()
  }, [])
  return null
}
