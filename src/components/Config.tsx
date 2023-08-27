import Image from 'next/image'
import config from '@/image/config.svg'
import Link from 'next/link'
export default function Config() {
  const id = 90
  return (
    <Link href={`user/${id}/edit`} className="flex h-8 justify-center ">
      <Image src={config} width={33} height={33} alt="Carro de compras" />
    </Link>
  )
}
