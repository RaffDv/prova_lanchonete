'use client'

import api from '@/api'
import { useEffect, useState } from 'react'
import Lanche from '@/components/Lanche'
import { foodType } from '@/schemas/global'
import { Triangle } from 'react-loader-spinner'

export default function Lanches() {
  const [lanches, setLanches] = useState<foodType[]>([])
  const get = async () => {
    const r = await api.food.get()
    if (r.success) {
      setLanches(r.data.data)
    }
  }
  useEffect(() => {
    if (lanches.length === 0) {
      get()
    }
  }, [])
  return (
    <div className="flex w-full h-full flex-col items-center justify-center mt-6">
      {lanches.length > 0 ? (
        <>
          {lanches.map((lanche) => (
            <Lanche
              key={crypto.randomUUID()}
              id={lanche.id}
              image={lanche.image}
              description={lanche.description}
              ingredients={lanche.ingredients}
              name={lanche.name}
              valueG={lanche.valueG}
              valueM={lanche.valueM}
              valueP={lanche.valueP}
            />
          ))}
        </>
      ) : (
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
      )}
    </div>
  )
}
