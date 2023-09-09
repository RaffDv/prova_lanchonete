import { InputHTMLAttributes, forwardRef, useId } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = 'text', name = '', label = '', helperText = '', ...props },
    ref,
  ) => {
    const inputId = useId()
    return (
      <div className="flex flex-col m-4">
        <label
          htmlFor={inputId}
          className="flex w-full justify-center text-buttonBg font-bold opacity-80 text-sm mb-2"
        >
          {label}
        </label>
        <input
          className="bg-cyan-figma h-8 rounded-full placeholder:text-black placeholder:opacity-80 p-4"
          id={inputId}
          type={type}
          name={name}
          ref={ref}
          {...props}
        />
        {helperText.length > 0 && (
          <p className="text-red-600 flex justify-center text-sm mt-6">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)
