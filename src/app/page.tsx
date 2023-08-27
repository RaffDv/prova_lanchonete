import NewItemButton from '@/components/defaultComponents/NewItemButton'
import ListMain from '@/components/listMain'
import { JwtSchema } from '@/schemas/global'
import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'
import { z } from 'zod'

export default function Home() {
  const isLogged = cookies().has('token')

  type jwtType = z.infer<typeof JwtSchema>
  const token = cookies().get('token')?.value
  const isAdmin: jwtType = jwtDecode(atob(token as string))
  console.log(JSON.stringify(isAdmin, null, 4))

  return (
    <>
      <ListMain />
      {isLogged && isAdmin.privileges === 10 && <NewItemButton />}
    </>
  )
}
