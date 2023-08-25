import Image from 'next/image'
import bebida from '@/image/bebida.svg'

export default function ListaBebida() {
  return (
    <main className="flex flex-row w-full border-b-2">
      {/* Inicio Lista de lanches */}
      <div className=" flex w-full flex-row mb-4 mt-4 items-center ml-12">
        <Image src={bebida} alt="demostração lanche" width={60} height={60} />
        <div className="flex w-3/5 justify-center">
          {/* Inicio textos */}
          <div className="flex flex-col justify-center items-start gap-2">
            <p
              className="font-bold"
              style={{ fontSize: '12px', color: '#514E66' }}
            >
              Nome bebida
            </p>
            <p
              className="opacity-80"
              style={{ fontSize: '9px', color: '#514E66' }}
            >
              Descrição bebida
            </p>
            <p className="font-bold" style={{ fontSize: '12px' }}>
              Valor R$
            </p>
          </div>
          {/* Final textos */}
          {/* Inicio botão */}
          <div className="relative w-4/12 flex items-end mb-2">
            <button
              className="flex font-bold items-center justify-center ml-16"
              style={{
                width: '46px',
                height: '14px',
                backgroundColor: '#6BB7FE',
                fontSize: '8px',
                borderRadius: '20px',
                color: '#514E66',
              }}
            >
              Adicionar
            </button>
          </div>
          {/* Final botão */}
        </div>
      </div>
      {/* Fim Lista de lanches */}
    </main>
  )
}
