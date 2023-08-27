import Image from 'next/image'
import car from '@/image/carrinho.svg'
export default function Car() {
  return (
    <main className="flex h-8 justify-center ">
      <Image src={car} width={33} height={33} alt="Carro de compras" />
    </main>
  )
}
