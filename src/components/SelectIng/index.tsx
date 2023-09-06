'use client'

import { useState } from 'react'

export default function SelectIng({
  children,
  ident,
  req,
  inpValue,
  register,
  name,
}: {
  children: React.ReactNode
  ident: string
  req?: boolean
  inpValue: string
  register: any
  name: string
}) {
  const [reqState, setRetState] = useState(!!req)
  return (
    <div className="flex ">
      <input
        type="checkbox"
        id={ident}
        className="peer hidden"
        checked={reqState}
        onClick={() => setRetState(!reqState)}
        value={inpValue}
        {...register(name)}
      />
      <label
        htmlFor={ident}
        className="peer-checked:bg-[#BFDBFE] text-sm leading-relaxed peer-checked:border-[#72B1FD] border bg-[#DCCBF6]/50 backdrop-blur-md border-[#BEACD8] transition-colors duration-300 rounded w-24 inline-block justify-start pl-1 truncate relative"
      >
        {children}
      </label>
    </div>
  )
}
