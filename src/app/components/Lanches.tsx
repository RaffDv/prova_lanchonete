'use client'
import BarraPesquisa from './BarraPesquisa'
import Lista from './ListaLanche'

// import api from '@/api'
// import { useEffect } from 'react'

export default function Lanches() {
  // const get = async () => {
  //   const r = await api.food.get()
  // }
  // useEffect(() => {
  //   get()
  // }, [])
  return (
    <main className="flex w-full h-full flex-col items-center">
      <BarraPesquisa />
      <div className="flex flex-col w-full mt-6">
        <Lista />
        <Lista />
        <Lista />
        <Lista />
      </div>
    </main>
  )
}
