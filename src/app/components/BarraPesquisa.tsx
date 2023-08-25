import Image from 'next/image'
import lupa from '@/image/lupa.svg'

export default function BarraPesquisa() {
  return (
    <main className="flex w-full flex-col items-center">
      {/* Barra de pesquisa */}
      <div className="relative flex w-full mt-8 items-center justify-center">
        <input
          className={`bg-cyan-figma w-4/5 h-7 border-none absolute`}
          style={{
            borderRadius: '20px',
            fontWeight: 'bold',
            fontSize: '14px',
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
          style={{ marginLeft: '15.5625em' }}
          src={lupa}
          alt="lupa"
        />
      </div>
      {/* Fim da Barra de pesquisa */}
    </main>
  )
}
