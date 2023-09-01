import Link from 'next/link'

export default function Lanche() {
  return (
    <section className="h-full w-full mt-6">
      <div className="flex w-full h-full justify-center items-start p-4">
        <Link
          href={'food/new'}
          className="w-32 h-7 font-bold text-white bg-buttonBg border rounded-full flex justify-center items-center text-lg"
        >
          Adicionar
        </Link>
      </div>
    </section>
  )
}
