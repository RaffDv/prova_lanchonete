import Image from 'next/image'
import lanche from '@/image/lanche1.svg'
import { CartContext, CartType } from '@/contexts/cart'
import { foodType } from '@/schemas/global'
import { useContext } from 'react'
import Lanche from '@/components/Lanche'
import Drink from '@/components/Drink'

export default function CartFood() {
  const { drink, food } = useContext(CartContext)
  return (
    <section className="flex flex-row justify-center items-center w-full border-b-2 border-b-font">
      {/* Inicio Lista de lanches */}
      <div className=" flex flex-row mt-4 mb-4 justify-center mr-12 w-full items-center">
        <div className="flex flex-col justify-center">
          {/* Inicio textos */}
          {food.map((item) => (
            <Lanche
              key={crypto.randomUUID()}
              name={item.name}
              description=""
              id={514}
              image={item.image}
              valueG={String(item.value)}
              ingredients=""
            />
          ))}
          {drink.map((item) => (
            <Drink
              key={crypto.randomUUID()}
              name={item.name}
              description=""
              id={514}
              image={item.image}
              value={String(item.value)}
            />
          ))}
          {/* Final textos */}
          {/* Inicio botão */}
          <div className="relative ml-20 flex items-end mb-2"></div>
          {/* Final botão */}
        </div>
      </div>
      {/* Fim Lista de lanches */}
    </section>
  )
}
