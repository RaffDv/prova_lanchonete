import Image from 'next/image'
import imageMain from './img/logo.svg'
import title from './img/title.svg'
export default function Base() {
  return (
    <main className="flex flex-column m-4 h-10 justify-around">
      <Image src={imageMain} width={35} height={35} alt="Logo lanchonete" />
      <Image src={title} width={100} height={27} alt="Titulo" />
    </main>
  )
}
