'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from '@/image/logo.svg'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { OrderType } from '@/schemas/global'
import api from '@/api'
import Lanche from '@/components/Lanche'
import Drink from '@/components/Drink'

export default function CartMain({ email }: { email: string }) {
  const [order, setOrder] = useState<OrderType>({} as OrderType)
  const [total, setTotal] = useState<number>(0)

  const getOrders = async () => {
    console.log('order')

    const r = await api.order.get({ email })
    if (r.success) {
      console.log(r.data.data)
      setOrder(r.data.data)
      r.data.data.foods.forEach((item) => {
        setTotal((pre) => pre + item.value)
      })
      r.data.data.drinks.forEach((item) => {
        setTotal((pre) => pre + item.value)
      })
    }
  }
  useEffect(() => {
    getOrders()
  }, [])
  const router = useRouter()
  return (
    <>
      {order && (
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
          <div className="w-full flex flex-col items-center mt-8 max-h-56  h-fit overflow-y-auto">
            {order.foods &&
              order.foods.map((item) => (
                <Lanche
                  key={crypto.randomUUID()}
                  food={{ ...item.food, valueP: item.value.toFixed(2) }}
                  orderID={item.orderID}
                />
              ))}

            {order.drinks &&
              order.drinks.map((drink) => (
                <Drink
                  key={crypto.randomUUID()}
                  drink={{ ...drink.drink, value: drink.value.toFixed(2) }}
                  orderID={drink.orderID}
                />
              ))}
          </div>
          <div className="relative w-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-around h-full items-end text-sm mt-10">
              <p>Total:</p>
              <p>R${total.toFixed(2)}</p>
            </div>
            <Link
              href={'/payment'}
              className="flex mt-12 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center"
            >
              Continuar
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
