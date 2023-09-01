'use client'
import { useContext, useState } from 'react'
import { foodType } from '@/schemas/global'
import { ArrowLeft } from '@phosphor-icons/react'

import { CartContext } from '@/contexts/cart'

import { useRouter } from 'next/navigation'

export default function PageAdd({
  data,
  valueB,
}: {
  data: foodType
  valueB?: string
}) {
  const [value, setValue] = useState<number>(0)
  const [qnt, setQnt] = useState<number>(0)

  const { foodUpdate, drinkUpdate } = useContext(CartContext)

  const { push, back } = useRouter()
  // Valor Null, Valor médio, Valor grande

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
              <input
                onClick={() => {
                  setValue(Number(data.valueP))
                  setQnt(1)
                }}
                type="radio"
                name="tamanho"
                id="tamP"
              />
              <label htmlFor="tamP" className="ml-1">
                P - R$ {data.valueP},00
              </label>
            </div>
          )}
          {data.valueM && (
            <div className="flex text-xs">
              <input
                onClick={() => {
                  setQnt(1)
                  setValue(Number(data.valueM))
                }}
                type="radio"
                name="tamanho"
                id="tamM"
              />
              <label htmlFor="tamM" className="ml-1">
                M - R$ {data.valueM},00
              </label>
            </div>
          )}
          {data.valueG && (
            <div className="flex text-xs">
              <input
                onClick={() => {
                  setQnt(1)
                  setValue(Number(data.valueG))
                }}
                type="radio"
                name="tamanho"
                id="tamG"
              />
              <label htmlFor="tamG" className="ml-1">
                G - R$ {data.valueG},00
              </label>
            </div>
          )}

          {valueB && (
            <div className="flex text-xs">
              <input
                onClick={() => {
                  setQnt(1)

                  setValue(Number(valueB))
                }}
                type="radio"
                name="tamanho"
                id="drinkV"
              />
              <label htmlFor="drinkV" className="ml-1">
                R$ {valueB.replaceAll('.', ',')}
              </label>
            </div>
          )}
        </div>
        {/* Fim tamanho */}
        {/* Inicio botões */}
        <div className="flex justify-between w-full m-4 mt-6">
          <div className="flex flex-row font-bold items-center gap-1">
            <p className="text-sm text-font">Adicionar:</p>
            <input
              onClick={() =>
                setQnt((prev) => {
                  if (prev === 0) {
                    return prev
                  }

                  return prev - 1
                })
              }
              className="text-main ml-2"
              type="button"
              value="-"
            />
            <p className="text-main">{qnt}</p>
            <input
              onClick={() => setQnt((prev) => prev + 1)}
              className="text-main"
              type="button"
              value="+"
            />
          </div>
          <div>
            <input
              onClick={() => {
                if (valueB) {
                  drinkUpdate({
                    name: data.name,
                    value,
                    amount: qnt,
                    image: data.image,
                  })
                } else {
                  foodUpdate({
                    name: data.name,
                    value,
                    amount: qnt,
                    image: data.image,
                  })
                }

                push('/')
              }}
              className="bg-cyan-figma w-32 h-6 flex justify-center items-center text-xs font-bold"
              style={{ borderRadius: '20px' }}
              type="button"
              value={`R$: ${
                qnt > 1
                  ? (qnt * value).toFixed(2).replaceAll('.', ',')
                  : value.toFixed(2).replaceAll('.', ',')
              }`}
            />
          </div>
        </div>
        {/* Fim botões */}
      </div>
    </main>
  )
}
