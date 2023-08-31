'use client'
import Image from 'next/image'
import Link from 'next/link'
import { drinkType } from '@/schemas/global'
import { usePathname } from 'next/navigation'

export default function Drink({
  description,
  id,
  image,
  name,
  value,
}: drinkType) {
  const path = usePathname()

  return (
    <main className=" flex flex-row justify-center items-center w-full border-b-2">
      {/* Inicio Lista de lanches */}
      <div className=" flex flex-row my-4 justify-center mx-2 w-full items-center">
        <Image src={image} alt="demostração lanche" width={60} height={60} />
        <div className="flex justify-center ">
          {/* Inicio textos */}
          <div className="flex flex-col justify-center ml-6 items-start gap-2">
            <p className="font-bold leading-relaxed text-sm ">{name}</p>
            <p className="text-xs text-font ">{description}</p>
            <p className="font-bold text-sm ">Valor R$ {value}</p>
          </div>
          {/* Final textos */}
          {/* Inicio botão */}
          {path.includes('admin') ? null : (
            <div className="relative flex items-end mb-2 right-0">
              <Link
                href={`/drink/${id}`}
                className="flex font-bold items-center justify-center border rounded-full w-fit h-fit px-2 text-xs bg-buttonBg"
              >
                Adicionar
              </Link>
            </div>
          )}
          {/* Final botão */}
        </div>
      </div>
      {/* Fim Lista de lanches */}
    </main>
  )
}
