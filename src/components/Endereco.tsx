import { useState } from 'react'
import UserInfo from '@/components/UserInfo'

export default function Endereco() {
  const [teste, setTeste] = useState<number>(0)
  return (
    <section className="flex flex-col w-full mt-6 justify-center items-center">
      <UserInfo title="País" value="Brasil" />

      <UserInfo title="Estado" value="RS" />

      <UserInfo title="Cidade" value="Feliz" />

      <UserInfo title="Bairro" value="Mãe do Leo" />

      <UserInfo title="Rua" value="Princesa Izabel" />

      <UserInfo title="Número" value="123" />

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
