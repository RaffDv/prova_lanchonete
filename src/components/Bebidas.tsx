'use client'
import api from '@/api'
import { useEffect, useState } from 'react'
import { drinkType } from '@/schemas/global'
import { Triangle } from 'react-loader-spinner'
import Drink from '@/components/Drink'
export default function Bebidas() {
  const [drinkInfo, setDrinkInfo] = useState<drinkType[]>([])
  const get = async () => {
    const r = await api.drink.get()
    if (r.success) {
      setDrinkInfo(r.data.data)
    }
  }
  useEffect(() => {
    if (drinkInfo.length < 1) {
      get()
    }
  }, [])

  return (
    <main className="flex w-full h-full flex-col items-center">
      {drinkInfo.length > 0 ? (
        <div className="flex flex-col w-full mt-6">
          {drinkInfo.map((drink) => (
            <Drink
              key={crypto.randomUUID()}
              description={drink.description}
              name={drink.name}
              id={drink.id}
              image={drink.image}
              value={drink.value}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Triangle height={80} width={80} visible color={'#0089D7'} />
        </div>
      )}
    </main>
  )
}
