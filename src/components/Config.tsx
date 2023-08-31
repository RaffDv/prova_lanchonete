import Image from 'next/image'
import config from '@/image/config.svg'
export default function Config() {
  return <Image src={config} width={33} height={33} alt="Carro de compras" />
}
