'use client'

import api from '@/api'
import PageAdd from '@/components/PageAdd'
import { foodType } from '@/schemas/global'
import { useEffect, useState } from 'react'
import { Triangle } from 'react-loader-spinner'

export default function Pedido({ params }: { params: { id: number } }) {
  const [foodInfo, setFoodInfo] = useState<foodType | null>(null)
  const unique = async () => {
    console.log(params.id)

    const r = await api.food.unique(params.id)
    if (r.success) {
      setFoodInfo(r.data.data)
    }
  }

  useEffect(() => {
    unique()
  }, [])

  return foodInfo === null ? (
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
    <PageAdd data={foodInfo} />
  )
}
