import PageEdit from '@/components/PageEdit'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <PageEdit id={params.id} />
    </div>
  )
}
