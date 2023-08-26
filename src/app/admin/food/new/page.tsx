import Image from 'next/image'
import logo from '@/image/logo.svg'

export default function New() {
  return (
    <section className="w-full h-full flex flex-col">
      <div className="flex m-4 items-center w-1/2 justify-between">
        <button className="w-8 h-8 bg-buttonBg border rounded-full text-white text-base">
          {'<-'}
        </button>
        <Image src={logo} width={35} height={35} alt="Logo lanchonete" />
      </div>
      <h2 className="flex w-full justify-center font-bold opacity-80 text-lg">
        Adicionar
      </h2>
      {/* <div className="flex m-4 mt-6 border-b-2 gap-4">
        <p>Image</p>
      </div> */}
    </section>
  )
}
