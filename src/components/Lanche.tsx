import Image from 'next/image'
import Link from 'next/link'
import { foodType } from '@/schemas/global'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { useAuth } from '@/hooks/useGetFromAuth'

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
  const {
    actions: { isAdmin },
  } = useAuthStore()

  return (
    <div className=" flex justify-center items-center w-[375px] border-b-2">
      {/* Inicio Lista de lanches */}
      <div className=" flex mb-4 mt-4  w-full items-center justify-evenly relative">
        <Image
          src={image}
          alt="demostração lanche"
          width={80}
          height={80}
          className="left-2"
        />
        <div className="flex justify-center">
          {/* Inicio textos */}
          <div className="flex flex-col justify-center ml-6 items-start gap-2  ">
            <p className="font-bold">{name}</p>
            <span className="text-xs w-[130px] truncate ">{description}</span>

            <p className="font-bold" style={{ fontSize: '12px' }}>
              R$ {valueP || valueM || valueG}
            </p>
          </div>

          {/* Final textos */}
          {/* Inicio botão */}
          {pathname.includes('admin') ? null : (
            <div className="relative flex items-end mb-2 right-0">
              {isAdmin() ? (
                <Link
                  href={`/admin/food/${id}/edit`}
                  className="flex font-medium items-center justify-center border rounded-full w-fit h-fit px-2 text-xs bg-buttonBg flex-grow-1 max-w-[130px] overflow-ellipsis"
                >
                  Editar
                </Link>
              ) : (
                <Link
                  href={`/food/${id}/add`}
                  className="flex font-medium items-center justify-center border rounded-full w-fit h-fit px-2 text-xs bg-buttonBg flex-grow-1 max-w-[130px] overflow-ellipsis"
                >
                  Adicionar
                </Link>
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
