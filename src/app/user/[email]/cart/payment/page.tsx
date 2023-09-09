'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '@/image/logo.svg'
import pix from '@/image/pix.svg'
import money from '@/image/money.svg'
import { useState } from 'react'

export default function Payment() {
  const amount = 0
  const router = useRouter()
  const [payment, setPayment] = useState<number>(0)

  return (
    <section className="w-full">
      <div className="flex m-4 items-center w-1/2 justify-between">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 bg-buttonBg border rounded-full text-white text-base flex justify-center items-center"
        >
          {'<-'}
        </button>
        <Image src={logo} width={35} height={35} alt="Logo lanchonete" />
      </div>
      <h2 className="flex w-full justify-center font-bold opacity-80 text-lg">
        Pagamento
      </h2>
      <div className="w-full flex flex-col items-center mt-6 border-b-2">
        <p className="font-bold text-font text-lg">Valor total</p>
        <p className="text-sm font-bold text-buttonBg mb-6">{` R$${amount},00`}</p>
      </div>
      <div className="w-full flex justify-around mt-6 mb-8">
        <div className="flex">
          <button
            onClick={() => setPayment(1)}
            className={`w-16 h-8 flex items-center justify-center gap-1 font-bold text-font ${
              payment === 1 && 'border-2 rounded-lg'
            }`}
          >
            <Image src={pix} alt={'Pix'} />
            Pix
          </button>
        </div>
        <div className="flex">
          <button
            onClick={() => setPayment(2)}
            className={`w-24 h-8 flex items-center justify-center gap-1 font-bold text-font ${
              payment === 2 && 'border-2 rounded-lg'
            }`}
          >
            <Image src={money} alt={'Dinheiro'} />
            Dinheiro
          </button>
        </div>
      </div>
      {payment === 1 && (
        <div className="w-full flex flex-col items-center justify-center">
          <p>Não sei oq colocar</p>
          <button className="flex mt-12 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center">
            Finalizar
          </button>
        </div>
      )}
      {payment === 2 && (
        <div className="w-full flex flex-col items-center justify-center">
          <button
            onClick={() => router.push('payment/sucess')}
            className="flex mt-12 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center"
          >
            Finalizar
          </button>
        </div>
      )}
    </section>
  )
}
