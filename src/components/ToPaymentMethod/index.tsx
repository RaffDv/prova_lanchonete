'use client'
import PaymentHeader from '@/components/PaymentHeader'
import { useState } from 'react'
import Pix from '../Pix'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import confirmed from '@/image/confirmed.svg'
export default function ToPayment() {
  const [page, setPage] = useState<number>(1)
  const [show, setShow] = useState<boolean>(false)
  const { push } = useRouter()
  return (
    <>
      {show && (
        <div className="absolute flex flex-col gap-2 z-10 w-full h-full items-center justify-center ">
          <div className="flex w-fit h-fit p-4 rounded-lg flex-col bg-white border shadow-md">
            <Image src={confirmed} alt="order confirmed" />
            <span className="text-xl font-semibold">Concluído</span>
          </div>
        </div>
      )}
      <section className="w-full h-full flex flex-col  ">
        <PaymentHeader />
        <div className="w-full my-2 flex justify-center items-center">
          <span className="font-medium text-lg border-b-2 border-b-gray-600">
            Pagamento
          </span>
        </div>

        {/* pages */}
        <div className="my-2 flex w-full justify-evenly">
          <span
            onClick={() => setPage(1)}
            className={`font-medium leading-relaxed ${
              page === 1 && 'border-b-2 border-b-gray-700'
            }`}
          >
            Pix
          </span>
          <span
            onClick={() => setPage(2)}
            className={`font-medium leading-relaxed ${
              page === 2 && 'border-b-2 border-b-gray-700'
            }`}
          >
            Dinheiro
          </span>
        </div>

        {page === 1 ? <Pix /> : null}
        <div className="bottom-4 flex w-full justify-center">
          <span
            onClick={() => {
              setShow(true)
              setTimeout(() => {
                setShow(false)
                push('/')
              }, 1000)
            }}
            className="font-medium rounded-full bg-buttonBg px-2"
          >
            Confirmar Pedido
          </span>
        </div>
      </section>
    </>
  )
}
