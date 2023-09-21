type TextFieldProps = {
  title?: string
  text?: string
}

export const TextField = ({ title = '', text = '' }: TextFieldProps) => {
  return (
    <div className="flex flex-col m-4">
      <label className="flex w-full justify-center text-buttonBg font-bold opacity-80 text-sm mb-2">
        {title}
      </label>
      <h2 className="w-60 flex justify-center items-center bg-cyan-figma h-8 rounded-full placeholder:text-black placeholder:opacity-80 p-4">
        {text}
      </h2>
    </div>
  )
}
