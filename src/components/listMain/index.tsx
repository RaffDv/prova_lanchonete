'use client'
import Base from '@/components/Base'
import Lanches from '@/components/Lanches'
import Bebidas from '@/components/Bebidas'
import { useEffect, useState } from 'react'
import BarraPesquisa from '../BarraPesquisa'
import DropdownMenu from '../Dropdown'
import { useAuthStore } from '@/store/auth'
import { useAuth } from '@/hooks/useGetFromAuth'

export default function ListMain() {
  const [page, setPage] = useState<number>(1)
  const authStore = useAuthStore()
  const user = useAuth(useAuthStore, (state) => state.state.user)
  useEffect(() => {
    const intervalId = setInterval(
      () => {
        authStore.actions.reset()
      },
      1000 * 60 * 30,
    )

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        authStore.actions.reset()
      },
      1000 * 60 * 30,
    )

    return () => {
      clearInterval(intervalId)
    }
  }, [])
  return (
    <main className="flex w-screen h-screen flex-col justify-center items-center">
      {/* Inicio navbar */}
      <nav className="relative flex w-full h-10  m-4 items-center justify-around">
        <div className="flex items-center justify-between w-full">
          <Base />
          <div className="flex m-4 gap-4">
            <>
              <DropdownMenu params={{ email: user?.email as string }} />
            </>
          </div>
        </div>
      </nav>
      {/* Fim navbar */}
      <div className="flex font-bold w-full justify-around mt-4 text-gray-1">
        <button
          onClick={() => setPage(1)}
          className={`flex w-36 justify-center ${
            page === 1 && 'border-b-black border-b-4'
          }`}
        >
          Lanches
        </button>
        <button
          onClick={() => setPage(2)}
          className={`flex w-36 justify-center ${
            page === 2 && 'hover:transition-opacity border-b-black border-b-4'
          }`}
        >
          Bebidas
        </button>
      </div>
      <BarraPesquisa />
      {page === 1 ? <Lanches /> : <Bebidas />}
    </main>
  )
}
