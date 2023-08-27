'use client'
import Image from 'next/image'
import CloudText from '@/image/nuvemtext.svg'
import { useState } from 'react'
import Link from 'next/link'
export default function PageAdd() {
  const [quantidade, setQuantidade] = useState<number>(1)
  const [tamanho, setTamanho] = useState<number>(0)
  const valor = [0, 30, 40] // Valor Null, Valor médio, Valor grande

  return (
    <main className="flex flex-col h-full w-full">
      <div className="flex w-full h-44 bg-slate-600 justify-start items-start">
        <Link
          href={`.`}
          style={{ borderRadius: '100%' }}
          className="w-6 h-6 bg-slate-300 flex items-center justify-center m-2 font-bold"
        >{`<-`}</Link>
      </div>
      <div className="flex flex-col m-3 mt-6">
        <p className="text-font font-bold">Chivito</p>
        <p className="text-font text-xs">
          Pão, carne bovina, mussarela, presunto cozido, bacon, alface, tomate,
          palmito, ovo, cebola, pimentão, maionese, azeitonas verdes
        </p>
      </div>
      <div className="flex m-3 flex-col justify-center mt-6">
        <div className="flex items-center">
          <Image src={CloudText} alt="teste" width={22} />
          <p className="ml-2 text-xs font-bold">Observações:</p>
        </div>
        {/* Observações */}
        <textarea
          style={{ borderRadius: '30px' }}
          className="bg-cyan-figma text-xs resize-none p-2"
          name=""
          id=""
          rows={5}
        ></textarea>
        {/* Fim Observações */}
        {/* Inicio tamanho */}
        <div className="flex flex-col text-xs font-bold text-font m-3 gap-2 mt-10 mb-12">
          <p>Tamanho:</p>
          <div className="flex text-xs">
            <input
              onClick={() => {
                setTamanho(1)
              }}
              type="radio"
              name="tamanho"
              id="getTamanho"
            />
            <p className="ml-1">M - R$ VALOR</p>
          </div>
          <div className="flex text-xs">
            <input
              onClick={() => {
                setTamanho(2)
              }}
              type="radio"
              name="tamanho"
              id="getTamanho"
            />
            <p className="ml-1">G - R$ VALOR</p>
          </div>
        </div>
        {/* Fim tamanho */}
        {/* Inicio botões */}
        <div className="flex justify-between m-4 mt-6">
          <div className="flex flex-row font-bold items-center gap-1">
            <p className="text-sm text-font">Adicionar:</p>
            <input
              onClick={() => setQuantidade(quantidade - 1)}
              className="text-main ml-2"
              type="button"
              value="-"
            />
            <p className="text-main">
              {`${quantidade >= 1 ? quantidade : setQuantidade(1)}`}
            </p>
            <input
              onClick={() => setQuantidade(quantidade + 1)}
              className="text-main"
              type="button"
              value="+"
            />
          </div>
          <div>
            <input
              className="bg-cyan-figma w-32 h-6 flex justify-center items-center text-xs font-bold"
              style={{ borderRadius: '20px' }}
              type="button"
              value={`R$: ${
                quantidade > 1 ? quantidade * valor[tamanho] : valor[tamanho]
              },00`}
            />
          </div>
        </div>
        {/* Fim botões */}
      </div>
    </main>
  )
}
