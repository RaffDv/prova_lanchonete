'use client'

import { useState, InputHTMLAttributes, forwardRef } from 'react'
type inputProps = InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode
  req?: boolean
  inpValue: string
}

export const SelectIng = forwardRef<HTMLInputElement, inputProps>(
  ({ children, inpValue, req, ...props }, ref) => {
    const [reqState, setRetState] = useState(!!req)
    const ident = crypto.randomUUID()

    return (
      <div className="flex ">
        <input
          {...props}
          type="checkbox"
          id={ident}
          className="peer hidden"
          defaultChecked={reqState}
          onClick={() => setRetState(!reqState)}
          value={inpValue}
          ref={ref}
        />
        <label
          htmlFor={ident}
          className="peer-checked:bg-[#BFDBFE] text-sm leading-relaxed peer-checked:border-[#72B1FD] border bg-[#DCCBF6]/50 backdrop-blur-md border-[#BEACD8] transition-colors duration-200 rounded w-24 inline-block justify-start pl-1 truncate relative"
        >
          {children}
        </label>
      </div>
    )
  },
)
