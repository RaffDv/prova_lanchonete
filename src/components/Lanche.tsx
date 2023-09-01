'use client'
import Image from 'next/image'
import Link from 'next/link'
import { foodType } from '@/schemas/global'
import { usePathname } from 'next/navigation'

export default function Lanche({
  id,
  description,
  ingredients,
  name,
  image,
  valueG,
  valueM,
  valueP,
}: foodType) {
  const pathname = usePathname()
  return (
    <main className=" flex flex-row justify-center items-center w-full border-b-2">
      {/* Inicio Lista de lanches */}
      <div className=" flex flex-row mb-4 mt-4 justify-center  w-full items-center">
        <Image src={image} alt="demostração lanche" width={80} height={80} />
        <div className="flex justify-center">
          {/* Inicio textos */}
          <div className="flex flex-col justify-center ml-6 items-start gap-2">
            <p className="font-bold">{name}</p>
            <span className="text-xs max-w-[130px] overflow-ellipsis ">
              {description}
            </span>

            <p className="font-bold" style={{ fontSize: '12px' }}>
              R$ {valueP || valueM || valueG}
            </p>
          </div>
          {/* Final textos */}
          {/* Inicio botão */}
          {pathname.includes('admin') ? null : (
            <div className="relative flex items-end mb-2 right-0">
              <Link
                href={`/food/${id}/add`}
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
