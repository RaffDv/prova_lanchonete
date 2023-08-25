import Link from 'next/link'

export default function PostID({ params }: { params: { id: string } }) {
  return (
    <div>
      <p>food ID {params.id}</p>
      <Link href={`/teste/${params.id}/edit`}>edit</Link>
    </div>
  )
}
