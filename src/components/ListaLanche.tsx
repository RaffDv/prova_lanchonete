'use client'
import Image from 'next/image'
import lanche from '@/image/burguer.svg'
import Link from 'next/link'

export default function Lista() {
  const id = 90
  return (
    <main className=" flex flex-row justify-center items-center w-full border-b-2">
      {/* Inicio Lista de lanches */}
      <div className=" flex flex-row mb-4 mt-4 justify-center mr-12 w-full items-center">
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
            <p
              className="opacity-80"
              style={{ fontSize: '9px', color: '#514E66' }}
            >
              Descrição lanche
            </p>
            <p className="font-bold" style={{ fontSize: '12px' }}>
              Valor R$
            </p>
          </div>
          {/* Final textos */}
          {/* Inicio botão */}
          <div className="relative ml-20 flex items-end mb-2">
            <Link
              href={`/food/${id}/add`}
              className="flex font-bold items-center justify-center border rounded-full"
              style={{
                width: '46px',
                height: '14px',
                backgroundColor: '#6BB7FE',
                fontSize: '8px',
                color: '#514E66',
              }}
            >
              Adicionar
            </Link>
          </div>
          {/* Final botão */}
        </div>
      </div>
      {/* Fim Lista de lanches */}
    </main>
  )
}
