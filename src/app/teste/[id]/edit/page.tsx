export default function EditFood({
  params,
}: {
  params: { id: string; edit: string }
}) {
  return (
    <div>
      <p>edit food page</p>
      <span>EDIT FOOD ID :{params.id} </span>
    </div>
  )
}
