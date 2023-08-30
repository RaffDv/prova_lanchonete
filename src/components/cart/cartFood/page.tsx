import Image from 'next/image'
import lanche from '@/image/lanche1.svg'
import { useState } from 'react'

export default function CartFood() {
  const [value, setValue] = useState<number>(1)
  return (
    <section className="flex flex-row justify-center items-center w-full border-b-2 border-b-font">
      {/* Inicio Lista de lanches */}
      <div className=" flex flex-row mt-4 mb-4 justify-center mr-12 w-full items-center">
        <Image src={lanche} alt="demostração lanche" width={60} height={60} />
        <div className="flex justify-center">
          {/* Inicio textos */}
          <div className="flex flex-col justify-center ml-6 items-start gap-2">
            <p
              className="font-bold"
              style={{ fontSize: '12px', color: '#514E66' }}
            >
              Nome lanche
            </p>

            <p className="font-bold" style={{ fontSize: '12px' }}>
              Valor R$
            </p>
          </div>
          {/* Final textos */}
          {/* Inicio botão */}
          <div className="relative ml-20 flex items-end mb-2">
            <button
              onClick={() => setValue(value - 1)}
              className="w-4 h-4  border-2 flex justify-center items-center"
            >
              -
            </button>
            <p className="w-4 h-4  border-2 flex justify-center items-center border-r-0 border-l-0 text-xs">
              {`${value >= 1 ? value : setValue(1)}`}
            </p>
            <button
              onClick={() => setValue(value + 1)}
              className="w-4 h-4  border-2 flex justify-center items-center"
            >
              +
            </button>
          </div>
          {/* Final botão */}
        </div>
      </div>
      {/* Fim Lista de lanches */}
    </section>
  )
}
