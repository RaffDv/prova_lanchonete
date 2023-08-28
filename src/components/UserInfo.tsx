import { useState } from 'react'

interface MyProps {
  title: string
  value: string
}
export default function UserInfo({ title, value }: MyProps) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="flex flex-col justify-center items-center border-b-2 w-full">
      <h2 className="mt-4 font-bold text-sm">{title}</h2>
      <button
        onClick={() => setOpen(true)}
        className="w-60 h-8 bg-cyan-figma border rounded-full mt-2 flex justify-center items-center mb-4"
      >
        {value}
      </button>
      {open === true && (
        <div className="w-64 h-64 absolute bg-white shadow-2xl border rounded-2xl flex flex-col justify-center items-center">
          <h2 className="mt-4 font-bold text-sm">{title}</h2>
          <input
            placeholder="Edite aqui"
            className="bg-cyan-figma border rounded-full text-sm h-6 p-2"
            type="text"
          />
          <button
            onClick={() => setOpen(false)}
            className="flex relative mt-12 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  )
}
