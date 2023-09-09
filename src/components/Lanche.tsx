import Image from 'next/image'
import Link from 'next/link'
import { foodType } from '@/schemas/global'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import api from '@/api'
import { Trash } from '@phosphor-icons/react'

export default function Lanche({
  food,
  orderID,
}: {
  food: foodType
  orderID?: number
}) {
  const pathname = usePathname()
  const {
    actions: { isAdmin },
  } = useAuthStore()

  return (
    <div className=" flex justify-center items-center w-[375px] border-b-2">
      {/* Inicio Lista de lanches */}
      <div className=" flex mb-4 mt-4  w-full justify-center relative">
        <Image
          src={food.image}
          alt="demostração lanche"
          width={80}
          height={80}
          className="left-2"
        />
        <div className="flex justify-center">
          {/* Inicio textos */}
          <div className="flex flex-col justify-center ml-6 items-start gap-2  ">
            <p className="font-bold truncate w-[120px]">{food.name}</p>
            <span className="text-xs w-[130px] truncate ">
              {food.description}
            </span>

            <p className="font-bold" style={{ fontSize: '12px' }}>
              R$ {food.valueP || food.valueM || food.valueG}
            </p>
          </div>

          {/* Final textos */}
          {/* Inicio botão */}
          {pathname.includes('admin') ? null : (
            <div className="relative flex items-end mb-2 right-0">
              {isAdmin() ? (
                <Link
                  href={`/admin/food/${food.id}/edit`}
                  className="flex font-medium items-center justify-center border rounded-full w-fit h-fit px-2 text-xs bg-buttonBg flex-grow-1 max-w-[130px] overflow-ellipsis"
                >
                  Editar
                </Link>
              ) : (
                <>
                  {pathname.includes('cart') ? (
                    <button
                      onClick={async () => {
                        const r = await api.order.remove(orderID as number)
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
                      href={`/food/${food.id}/add`}
                      className="flex font-medium items-center justify-center border rounded-full w-fit h-fit px-2 text-xs bg-buttonBg flex-grow-1 max-w-[130px] overflow-ellipsis"
                    >
                      Adicionar
                    </Link>
                  )}
                </>
              )}
            </div>
          )}
          {/* Final botão */}
        </div>
      </div>
      {/* Fim Lista de lanches */}
    </div>
  )
}
