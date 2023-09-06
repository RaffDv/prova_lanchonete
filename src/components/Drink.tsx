'use client'
import Image from 'next/image'
import Link from 'next/link'
import { drinkType } from '@/schemas/global'
import { useAuthStore } from '@/store/auth'

export default function Drink({
  description,
  id,
  image,
  name,
  value,
}: drinkType) {
  const {
    actions: { isAdmin },
  } = useAuthStore()

  return (
    <main className=" flex justify-center items-center w-full border-b-2">
      {/* Inicio Lista de lanches */}
      <div className=" flex my-4 w-full items-center justify-evenly">
        <Image src={image} alt="demostração lanche" width={60} height={60} />
        <div className="flex justify-center ">
          {/* Inicio textos */}
          <div className="flex flex-col justify-center ml-6 items-start gap-2 ">
            <p className="font-bold leading-relaxed text-sm ">{name}</p>
            <p className="text-xs text-font max-w-[130px]">{description}</p>
            <p className="font-bold text-sm ">R$ {value.replace('.', ',')}</p>
          </div>
          {/* Final textos */}
          {/* Inicio botão */}
          {isAdmin() ? (
            <div className="relative flex items-end mb-2 right-0">
              <Link
                href={`/admin/drink/${id}/edit`}
                className="flex font-medium text-center border rounded-full w-fit h-fit px-2 text-xs bg-buttonBg"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div className="relative flex items-end mb-2 right-0">
              <Link
                href={`/drink/${id}`}
                className="flex font-medium text-center border rounded-full w-fit h-fit px-2 text-xs bg-buttonBg"
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
