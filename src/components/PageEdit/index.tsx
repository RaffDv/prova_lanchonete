'use client'
import api from '@/api'
import { foodType } from '@/schemas/global'
import { ArrowLeft } from '@phosphor-icons/react'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageEdit({ id }: { id: string }) {
  const [data, setData] = useState<foodType>({} as foodType)

  const { push, back } = useRouter()
  const getData = async () => {
    const r = await api.food.unique(Number(id))
    if (r.success) {
      setData(r.data.data)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <main className="flex flex-col h-full w-full">
      <div className="flex w-full h-44 bg-slate-600 justify-start items-start">
        <button
          onClick={() => back()}
          className="w-6 h-6 bg-slate-300 flex items-center justify-center m-2 font-bold z-10"
        >
          {' '}
          <ArrowLeft size={20} weight="bold" />{' '}
        </button>
      </div>
      <div className="flex flex-col m-3 mt-6">
        <p className="text-font font-bold">{data.name}</p>
        <p className="text-font text-xs">{data.ingredients}</p>
      </div>
      <div className="flex m-3 flex-col justify-center mt-6">
        <div className="flex items-center">
          <p className="ml-2 text-xs font-bold">Observações:</p>
        </div>
        {/* Observações */}
        <textarea
          className="bg-cyan-figma rounded-md text-xs resize-none p-2"
          name=""
          id=""
          rows={5}
        ></textarea>
        {/* Fim Observações */}
        {/* Inicio tamanho */}
        <div className="flex flex-col w-full text-xs font-bold text-font m-3 gap-2 mt-10 mb-12">
          <p>Tamanho:</p>
          {data.valueP && (
            <div className="flex text-xs">
              <input type="radio" name="tamanho" id="tamP" />
              <label htmlFor="tamP" className="ml-1">
                P - R$ {data.valueP},00
              </label>
            </div>
          )}
          {data.valueM && (
            <div className="flex text-xs">
              <input type="radio" name="tamanho" id="tamM" />
              <label htmlFor="tamM" className="ml-1">
                M - R$ {data.valueM},00
              </label>
            </div>
          )}
          {data.valueG && (
            <div className="flex text-xs">
              <input type="radio" name="tamanho" id="tamG" />
              <label htmlFor="tamG" className="ml-1">
                G - R$ {data.valueG},00
              </label>
            </div>
          )}

          <div className="flex text-xs">
            <input type="radio" name="tamanho" id="drinkV" />
            <label htmlFor="drinkV" className="ml-1">
              R$ value
            </label>
          </div>
        </div>
        {/* Fim tamanho */}
        {/* Inicio botões */}
        <div className="flex justify-end px-4 w-full m-4 mt-6">
          <button className="bg-buttonBg right-1 relative w-32 h-6 flex justify-center items-center text-xs font-bold rounded-lg">
            Salvar
          </button>
        </div>
        {/* Fim botões */}
      </div>
    </main>
  )
}
