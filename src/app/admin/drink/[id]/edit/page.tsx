import DrinkEdit from '@/components/DrinkEdit'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <DrinkEdit id={params.id} />
    </>
  )
}
