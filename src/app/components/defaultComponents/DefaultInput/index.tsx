import { ChangeEvent } from 'react'

export default function DefaultInput({
  type,
  name,
  id,
  placeholder,
  required,
  onchange,
  value,
  className,
}: {
  type: string
  name: string
  id: string
  placeholder: string
  required?: boolean
  value?: string
  onchange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      required={!!required}
      className={`${className} border rounded-full bg-inputBg p-2`}
      onChange={onchange}
      value={value}
    />
  )
}
