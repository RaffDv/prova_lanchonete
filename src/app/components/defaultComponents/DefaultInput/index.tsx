import { ChangeEvent } from 'react'

export default function DefaultInput({
  type,
  name,
  id,
  placeholder,
  required,
  onchange,
  value,
}: {
  type: string
  name: string
  id: string
  placeholder: string
  required?: boolean
  value: string
  onchange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      required={!!required}
      className="border rounded-full bg-inputBg p-2"
      onChange={onchange}
      value={value}
    />
  )
}
