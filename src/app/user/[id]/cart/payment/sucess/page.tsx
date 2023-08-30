import Image from 'next/image'
import sucessIcon from '@/image/sucess-icon.svg'
export default function Sucess() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Image src={sucessIcon} alt="Sucesso Icon" width={104} />
      <h2 className="mt-4 font-bold text-font text-2xl">Concluído</h2>
    </div>
  )
}
