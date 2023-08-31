'use client'
import { useState } from 'react'
import Link from 'next/link'
import { foodType } from '@/schemas/global'
import { ArrowLeft } from '@phosphor-icons/react'
import { useAuth } from '@/contexts/cart'
import { data } from 'autoprefixer'
export default function PageAdd({
  ingredients,
  image,
  name,
  description,
  valueG,
  valueM,
  valueP,
}: foodType) {
  const { foodUpdate, drinkUpdate } = useAuth()
  const [value, setValue] = useState<number>(0)
  const [qnt, setQnt] = useState<number>(0)
  // Valor Null, Valor médio, Valor grande

  return (
    <main className="flex flex-col h-full w-full">
      <div className="flex w-full h-44 bg-slate-600 justify-start items-start">
        <Link
          href={`/food`}
          style={{ borderRadius: '100%' }}
          className="w-6 h-6 bg-slate-300 flex items-center justify-center m-2 font-bold z-10"
        >
          {' '}
          <ArrowLeft size={20} weight="bold" />{' '}
        </Link>
      </div>
      <div className="flex flex-col m-3 mt-6">
        <p className="text-font font-bold">{name}</p>
        <p className="text-font text-xs">{ingredients}</p>
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
          {valueP && (
            <div className="flex text-xs">
              <input
                onClick={() => {
                  setValue(Number(valueP))
                  setQnt(1)
                }}
                type="radio"
                name="tamanho"
                id="tamP"
              />
              <label htmlFor="tamP" className="ml-1">
                P - R$ {valueP},00
              </label>
            </div>
          )}
          {valueM && (
            <div className="flex text-xs">
              <input
                onClick={() => {
                  setQnt(1)
                  setValue(Number(valueM))
                }}
                type="radio"
                name="tamanho"
                id="tamM"
              />
              <label htmlFor="tamM" className="ml-1">
                M - R$ {valueM},00
              </label>
            </div>
          )}
          {valueG && (
            <div className="flex text-xs">
              <input
                onClick={() => {
                  setQnt(1)
                  setValue(Number(valueG))
                }}
                type="radio"
                name="tamanho"
                id="tamG"
              />
              <label htmlFor="tamG" className="ml-1">
                G - R$ {valueG},00
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
                if (valueD) {
                  drinkUpdate({
                    name: `${name}`,
                    value,
                    amount: qnt,
                  })
                } else {
                  foodUpdate({
                    name: `${name}`,
                    value,
                    amount: qnt,
                  })
                }
              }}
              className="bg-cyan-figma w-32 h-6 flex justify-center items-center text-xs font-bold"
              style={{ borderRadius: '20px' }}
              type="button"
              value={`R$: ${qnt > 1 ? qnt * value : value},00`}
            />
          </div>
        </div>
        {/* Fim botões */}
      </div>
    </main>
  )
}
