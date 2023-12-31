import Image from 'next/image'
import lupa from '@/image/lupa.svg'

export default function BarraPesquisa() {
  return (
    <div className="flex w-full flex-col items-center">
      {/* Barra de pesquisa */}
      <div className="relative flex w-full mt-8 items-center justify-center">
        <input
          className="bg-cyan-figma w-60 h-7 border-none absolute rounded-3xl font-bold text-sm"
          style={{
            backgroundSize: '15px 15px',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            padding: '5px 30px 5px 10px',
          }}
          type="text"
          placeholder="Pesquisa"
          name=""
          id=""
        />
        <Image
          className="relative"
          style={{ marginLeft: '200px' }}
          src={lupa}
          alt="lupa"
        />
      </div>
    </div>
  )
}
