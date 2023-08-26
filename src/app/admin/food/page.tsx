'use client'
import Base from '@/app/components/Base'
import Car from '@/app/components/Car'
import Config from '@/app/components/Config'
import Bebida from '@/app/components/RegisterFood/Bebida'
import Lanche from '@/app/components/RegisterFood/Lanche'
import { useState } from 'react'

export default function Register() {
  const [page, setPage] = useState<number>(1)
  return (
    <main className="flex w-full h-full flex-col justify-start items-center">
      {/* Inicio navbar */}
      <div className="relative flex w-full h-10  m-4 items-center justify-around">
        <div className="flex items-center justify-between w-full">
          <Base />
          <div className="flex m-4 gap-4">
            <a className="hover:scale-110" href="">
              <Car />
            </a>
            <a className="hover:scale-110" href="">
              <Config />
            </a>
          </div>
        </div>
      </div>
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
      {/* Fim navbar */}

      {page === 1 ? <Lanche /> : <Bebida />}
    </main>
  )
}
