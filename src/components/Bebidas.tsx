'use client'
import api from '@/api'
import { useEffect, useState } from 'react'
import { drinkType } from '@/schemas/global'
import { Triangle } from 'react-loader-spinner'
import Drink from '@/components/Drink'
import NewItemButton from './defaultComponents/NewItemButton'
import { useAuthStore } from '@/store/auth'
export default function Bebidas() {
  const [drinkInfo, setDrinkInfo] = useState<drinkType[] | null>(null)
  const get = async () => {
    const r = await api.drink.get()
    if (r.success) {
      setDrinkInfo(r.data.data)
    }
  }
  const {
    actions: { isAdmin },
  } = useAuthStore()
  useEffect(() => {
    if (drinkInfo === null || (drinkInfo && drinkInfo.length < 1)) {
      get()
    }
  }, [])

  return (
    <main className="flex w-full h-full flex-col items-center">
      {isAdmin() && <NewItemButton path="/admin/drink/new" />}

      {drinkInfo && drinkInfo?.length > 0 ? (
        <div className="flex flex-col w-full mt-6">
          {drinkInfo.map((drink) => (
            <Drink key={crypto.randomUUID()} drink={drink} />
          ))}
        </div>
      ) : (
        <>
          {drinkInfo !== null ? (
            <div className="h-full flex items-center justify-center">
              <span className="text-font leading-relaxed text-center ">
                Sem Bebidas aqui ainda!
              </span>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Triangle height={80} width={80} visible color={'#0089D7'} />
            </div>
          )}
        </>
      )}
    </main>
  )
}
