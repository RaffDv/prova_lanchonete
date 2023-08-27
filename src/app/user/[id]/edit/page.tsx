'use client'
import Image from 'next/image'
import logo from '@/image/logo.svg'
import { useState } from 'react'
import Perfil from '@/components/Perfil'
import Endereco from '@/components/Endereco'

export default function Edit() {
  const [page, setPage] = useState<number>(1)
  const userName = ['Klebim', 'Alves']
  return (
    <section className="w-full h-full flex flex-col">
      <div className="flex m-4 items-center w-1/2 justify-between">
        <button className="w-8 h-8 bg-buttonBg border rounded-full text-white text-base">
          {'<-'}
        </button>
        <Image src={logo} width={35} height={35} alt="Logo lanchonete" />
      </div>
      <h2 className="flex w-full justify-center font-bold opacity-80 text-lg">
        {userName[0]}
      </h2>
      <div className="flex font-bold w-full justify-center mt-4 text-gray-1">
        <button
          onClick={() => setPage(1)}
          className={`flex w-36 justify-center ${
            page === 1 && 'border-b-black border-b-4'
          }`}
        >
          Perfil
        </button>
        <button
          onClick={() => setPage(2)}
          className={`flex w-36 justify-center ${
            page === 2 && 'hover:transition-opacity border-b-black border-b-4'
          }`}
        >
          Endereço
        </button>
      </div>
      {page === 1 ? <Perfil /> : <Endereco />}
    </section>
  )
}
