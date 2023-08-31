'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from '@/image/logo.svg'
import CartFood from '@/components/cart/cartFood/page'

export default function CartMain() {
  const router = useRouter()
  return (
    <section className="w-full h-full flex flex-col">
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
        Carrinho
      </h2>
      <div className="w-full flex flex-col items-center border-t-4 border-t-cyan-figma mt-8"></div>
      <div className="relative w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-around h-full items-end text-sm mt-10">
          <p>Total com a entrega:</p>
          <p>R$</p>
        </div>
        <button
          onClick={() => router.push('cart/payment')}
          className="flex mt-12 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center"
        >
          Continuar
        </button>
      </div>
    </section>
  )
}
