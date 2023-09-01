'use client'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import Lanches from '@/components/Lanches'
import { ArrowLeft } from '@phosphor-icons/react'

export default function New() {
  const { back } = useRouter()

  return (
    <section className="w-full h-full flex flex-col items-center">
      <div className="flex m-4 items-center w-full">
        <button
          className="w-6 h-6 left-6 bg-buttonBg border rounded-full text-white"
          onClick={back}
        >
          <ArrowLeft size={20} weight="bold" />
        </button>
      </div>
      <h2 className="flex w-full justify-center font-bold opacity-80 text-lg">
        Adicionar comida
      </h2>
      <Lanches />
      <Link
        href={'/admin/drink/new'}
        className="text-sm leading-relaxed text-main underline cursor-pointer my-2"
      >
        Cadastrar bebida
      </Link>

      <Link
        href={'/admin/food/new/form'}
        className="bg-buttonBg border rounded-full w-fit h-fit p-1 px-2"
      >
        Cadastrar
      </Link>
      {/* <div className="flex m-4 mt-6 border-b-2 gap-4">
        <p>Image</p>
      </div> */}
    </section>
  )
}
