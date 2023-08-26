'use client'

import api from '@/api'
import { useEffect } from 'react'

export default function Lanches() {
  const get = async () => {
    const r = await api.food.get()
  }
  useEffect(() => {
    get()
  }, [])
  return <main>Teste Lanche</main>
}
