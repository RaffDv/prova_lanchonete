import PageEditFood from '@/components/PageEditFood'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <PageEditFood id={params.id} />
    </div>
  )
}
