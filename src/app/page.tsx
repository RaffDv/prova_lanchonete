import ListMain from '@/components/listMain'
import { JwtSchema } from '@/schemas/global'
import { z } from 'zod'

export type jwtType = z.infer<typeof JwtSchema>
export default function Home() {
  return (
    <>
      <ListMain />
    </>
  )
}
