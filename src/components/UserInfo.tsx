interface MyProps {
  title: string
  value: string
}
export default function UserInfo({ title, value }: MyProps) {
  return (
    <div className="flex flex-col justify-center items-center border-b-2 w-full">
      <h2 className="mt-4 font-bold text-sm">{title}</h2>
      <p className="w-60 h-8 bg-cyan-figma border rounded-full mt-2 flex justify-center items-center mb-4">
        {value}
      </p>
    </div>
  )
}
