import { useState } from 'react'

export default function Endereco() {
  const [teste, setTeste] = useState<number>(0)
  return (
    <section className="flex flex-col w-full mt-6 justify-center items-center">
      <div className="flex flex-col justify-center items-center border-b-2 w-full">
        <h2 className="mt-4 font-bold text-sm">País</h2>
        <button
          onClick={() => setTeste(1)}
          className="w-60 h-8 bg-cyan-figma border rounded-full mt-2 flex justify-center items-center mb-4"
        >
          Brasil
        </button>
      </div>
      <div className="flex flex-col justify-center items-center border-b-2 w-full">
        <h2 className="mt-4 font-bold text-sm">Estado</h2>
        <button
          onClick={() => setTeste(1)}
          className="w-60 h-8 bg-cyan-figma border rounded-full mt-2 flex justify-center items-center mb-4"
        >
          RS
        </button>
      </div>
      <div className="flex flex-col justify-center items-center border-b-2 w-full">
        <h2 className="mt-4 font-bold text-sm">Cidade</h2>
        <button
          onClick={() => setTeste(1)}
          className="w-60 h-8 bg-cyan-figma border rounded-full mt-2 flex justify-center items-center mb-4"
        >
          Feliz
        </button>
      </div>
      <div className="flex flex-col justify-center items-center border-b-2 w-full">
        <h2 className="mt-4 font-bold text-sm">Bairro</h2>
        <button
          onClick={() => setTeste(1)}
          className="w-60 h-8 bg-cyan-figma border rounded-full mt-2 flex justify-center items-center mb-4"
        >
          TalBairro
        </button>
      </div>
      <div className="flex flex-col justify-center items-center border-b-2 w-full">
        <h2 className="mt-4 font-bold text-sm">Rua</h2>
        <button
          onClick={() => setTeste(1)}
          className="w-60 h-8 bg-cyan-figma border rounded-full mt-2 flex justify-center items-center mb-4"
        >
          Princesa Isabel
        </button>
      </div>
      <div className="flex flex-col justify-center items-center border-b-2 w-full">
        <h2 className="mt-4 font-bold text-sm">Número</h2>
        <button
          onClick={() => setTeste(1)}
          className="w-60 h-8 bg-cyan-figma border rounded-full mt-2 flex justify-center items-center mb-4"
        >
          123
        </button>
      </div>
      <button className="flex relative mt-12 mb-6 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center">
        Salvar
      </button>
      {teste === 1 && (
        <div className="w-64 h-64 absolute bg-white shadow-2xl border rounded-2xl flex flex-col justify-center items-center">
          <input
            placeholder="Edite aqui"
            className="bg-cyan-figma border rounded-full text-sm h-6 p-2"
            type="text"
          />
          <button
            onClick={() => setTeste(0)}
            className="flex relative mt-12 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center"
          >
            Editar
          </button>
        </div>
      )}
    </section>
  )
}
