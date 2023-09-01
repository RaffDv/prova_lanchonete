'use client'

import { useState } from 'react'

import Modal from '@/components/Modal/page'
import { useRouter } from 'next/navigation'

export default function Edit() {
  const [page, setPage] = useState<number>(1)
  const { back } = useRouter()

  return (
    <Modal>
      {page === 1 && (
        <section className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-sm font-bold">Nome</p>
          <input
            className="bg-cyan-figma border rounded-full p-2 mt-2 mb-2"
            type="text"
            placeholder="Nome"
          />
          <p className="text-sm font-bold">Email</p>
          <input
            className="bg-cyan-figma border rounded-full p-2 mt-2 mb-2"
            type="text"
            placeholder="Email"
          />
          <p className="text-sm font-bold">Senha</p>
          <input
            className="bg-cyan-figma border rounded-full p-2 mt-2 mb-2"
            id="password"
            type="password"
            placeholder="Senha"
          />

          <button
            onClick={() => setPage(2)}
            className="flex mt-12 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center"
          >
            Proximo
          </button>
        </section>
      )}

      {page === 2 && (
        <section className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-sm font-bold">País</p>
          <input
            className="bg-cyan-figma border rounded-full p-2 mt-2 mb-2"
            type="text"
            placeholder="País"
          />
          <p className="text-sm font-bold">Estado</p>
          <input
            className="bg-cyan-figma border rounded-full p-2 mt-2 mb-2"
            type="text"
            placeholder="Estado"
          />
          <p className="text-sm font-bold">Cidade</p>
          <input
            className="bg-cyan-figma border rounded-full p-2 mt-2 mb-2"
            type="text"
            placeholder="Cidade"
          />
          <p className="text-sm font-bold">Bairro</p>
          <input
            className="bg-cyan-figma border rounded-full p-2 mt-2 mb-2"
            type="text"
            placeholder="Bairro"
          />
          <p className="text-sm font-bold">Rua</p>
          <input
            className="bg-cyan-figma border rounded-full p-2 mt-2 mb-2"
            type="text"
            placeholder="Rua"
          />
          <p className="text-sm font-bold">Número</p>
          <input
            className="bg-cyan-figma border rounded-full p-2 mt-2 mb-2"
            type="number"
            placeholder="Número"
          />

          <button
            onClick={() => back()}
            className="flex mt-12 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center"
          >
            Salvar
          </button>
        </section>
      )}
    </Modal>
  )
}
