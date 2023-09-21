'use client'
import Image from 'next/image'
import Link from 'next/link'
import { drinkType } from '@/schemas/global'
import { useAuthStore } from '@/store/auth'
import { usePathname } from 'next/navigation'
import api from '@/api'
import { Trash } from '@phosphor-icons/react'

export default function Drink({
  drink,
  orderID,
}: {
  drink: drinkType
  orderID?: number
}) {
  const {
    actions: { isAdmin },
  } = useAuthStore()
  const pathname = usePathname()
  return (
    <main className=" flex justify-center items-center w-full border-b-2">
      {/* Inicio Lista de lanches */}
      <div className=" flex my-4 w-full items-center justify-evenly">
        <Image
          src={drink.image}
          alt="demostração lanche"
          width={60}
          height={60}
        />
        <div className="flex justify-center ">
          {/* Inicio textos */}
          <div className="flex flex-col justify-center ml-6 items-start gap-2 ">
            <p className="font-bold leading-relaxed text-sm ">{drink.name}</p>
            <p className="text-xs text-font max-w-[130px]">
              {drink.description}
            </p>
            <p className="font-bold text-sm ">
              R$ {drink.value.replace('.', ',')}
            </p>
          </div>
          {/* Final textos */}
          {/* Inicio botão */}
          {isAdmin() ? (
            <div className="relative flex items-end mb-2 right-0">
              <Link
                href={`/admin/drink/${drink.id}/edit`}
                className="flex font-medium text-center border rounded-full w-fit h-fit px-2 text-xs bg-buttonBg"
              >
                Editar
              </Link>
            </div>
          ) : (
            <>
              {pathname.includes('cart') ? (
                <button
                  onClick={async () => {
                    const r = await api.order.remove(Number(orderID))
                    if (r.success) {
                      console.log('refresh')
                      window.location.reload()
                    }
                  }}
                  className="flex font-medium items-center justify-center w-fit h-fit px-2 text-xs  flex-grow-1 max-w-[130px] overflow-ellipsis"
                >
                  <Trash size={16} color="#f42a2a" weight="thin" />
                </button>
              ) : (
                <Link
                  href={`/drink/${drink.id}`}
                  className="flex font-medium items-center justify-center border rounded-full w-fit h-fit px-2 text-xs bg-buttonBg flex-grow-1 max-w-[130px] overflow-ellipsis"
                >
                  Adicionar
                </Link>
              )}
            </>
          )}

          {/* Final botão */}
        </div>
      </div>
      {/* Fim Lista de lanches */}
    </main>
  )
}
