'use client'
import { useState } from 'react'
import { NewOrderType, foodType } from '@/schemas/global'
import { ArrowLeft } from '@phosphor-icons/react'

import { useRouter } from 'next/navigation'
import { SelectIng } from './SelectIng'
import { useAuthStore } from '@/store/auth'
import { useAuth } from '@/hooks/useGetFromAuth'
import api from '@/api'

export default function PageAdd({
  data,
  valueB,
  id,
}: {
  data: foodType
  valueB?: string
  id: number
}) {
  const [value, setValue] = useState<number>(0)
  const [qnt, setQnt] = useState<number>(0)
  const [ingredients, setIngredients] = useState<number[]>(() =>
    data.ingredients ? data.ingredients?.map((item) => Number(item.id)) : [],
  )
  const [order, setOrder] = useState<NewOrderType>({} as NewOrderType)

  const user = useAuth(useAuthStore, (state) => state.state.user)

  const { push, back } = useRouter()

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
        <div>
          <span className="text-xs text-font font-light leading-relaxed">
            Clique nos ingredientes que você deseja retirar deste prato
          </span>
          <div className="flex justify-around flex-wrap gap-y-1.5 gap-x-1 border border-gray-300 p-1.5 rounded-md max-h-32 overflow-y-auto">
            {/* ingredients */}
            {data.ingredients?.map((ing) => {
              return (
                <SelectIng
                  key={crypto.randomUUID()}
                  inpValue={ing.id}
                  req={ingredients?.includes(Number(ing.id))}
                  onChange={() => {
                    setIngredients((prev) => {
                      if (prev?.includes(Number(ing.id))) {
                        const ns = prev?.filter(
                          (item) => item !== Number(ing.id),
                        )
                        return ns
                      } else {
                        const ns = [...prev, Number(ing.id)]
                        return ns
                      }
                    })
                  }}
                >
                  {ing.name}
                </SelectIng>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col w-full text-xs font-bold text-font m-3 gap-2 mt-10 mb-12">
          <p>Tamanho:</p>
          {data.valueP && (
            <div className="flex text-xs">
              <input
                onClick={() => {
                  setValue(Number(data.valueP))
                  setQnt(1)
                  setOrder({ ...order, value: Number(data.valueP) })
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
                  setOrder({ ...order, value: Number(data.valueM) })
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
                  setOrder({ ...order, value: Number(data.valueG) })
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
                  setOrder({ ...order, value: Number(valueB) })
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
                  setOrder({ ...order, value: value * (prev - 1) })
                  return prev - 1
                })
              }
              className="text-main ml-2"
              type="button"
              value="-"
            />
            <p className="text-main">{qnt}</p>
            <input
              onClick={() =>
                setQnt((prev) => {
                  setOrder({ ...order, value: value * (prev + 1) })

                  return prev + 1
                })
              }
              className="text-main"
              type="button"
              value="+"
            />
          </div>
          <div>
            <input
              onClick={async () => {
                const r = await api.order.new({
                  ...order,
                  user_email: user?.email as string,
                  id_drink: valueB ? Number(id) : undefined,
                  id_food: valueB ? undefined : Number(id),
                })
                if (r.data.success) {
                  push('/')
                }
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
