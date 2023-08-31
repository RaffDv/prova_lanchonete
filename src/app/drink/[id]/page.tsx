'use client'

import api from '@/api'
import PageAdd from '@/components/PageAdd'
import { drinkType } from '@/schemas/global'
import { useEffect, useState } from 'react'
import { Triangle } from 'react-loader-spinner'

export default function Pedido({ params }: { params: { id: number } }) {
  const [drinkInfo, setDrinkInfo] = useState<drinkType | null>(null)
  const unique = async () => {
    console.log(params.id)

    const r = await api.drink.unique(params.id)
    if (r.success) {
      setDrinkInfo(r.data.data)
    }
  }

  useEffect(() => {
    unique()
  }, [])

  return drinkInfo === null ? (
    <div className="w-full h-full flex items-center justify-center">
      <Triangle
        height="80"
        width="80"
        color="#0089D7"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  ) : (
    <PageAdd
      description={drinkInfo.description}
      ingredients=""
      image={drinkInfo.image}
      name={drinkInfo.name}
      id={drinkInfo.id}
    />
  )
}
