import NewItemButton from '@/components/defaultComponents/NewItemButton'
import ListMain from '@/components/listMain'
import { JwtSchema } from '@/schemas/global'
import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'
import { z } from 'zod'

export type jwtType = z.infer<typeof JwtSchema>
export default function Home() {
  const isLogged = cookies().has('token')

  const token = cookies().get('token')?.value

  let isAdmin: jwtType = {} as jwtType
  if (isLogged) {
    isAdmin = jwtDecode(atob(token as string))
  }

  return (
    <>
      <ListMain />
      {isLogged && isAdmin.privileges === 10 && <NewItemButton />}
    </>
  )
}
