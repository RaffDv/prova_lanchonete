'use client'
import Endereco from '@/components/Endereco'
import Perfil from '@/components/Perfil'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import logo from '@/image/logo.svg'
import Image from 'next/image'
import { useState } from 'react'

export default function Page() {
  const [page, setPage] = useState<number>(1)
  const userName = ['Klebim', 'Alves']
  const pathname = usePathname()
  const { back } = useRouter()
  console.log(pathname)

  return (
    <section className="w-full h-full flex flex-col">
      <div className="flex m-4 items-center w-1/2 justify-between">
        <button
          onClick={back}
          className="w-8 h-8 bg-buttonBg border rounded-full text-white text-base flex justify-center items-center"
        >
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
      <div className="flex justify-center items-center">
        <Link
          href={`${pathname}/form`}
          className="flex mt-12 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center"
        >
          Editar
        </Link>
      </div>
    </section>
  )
}
