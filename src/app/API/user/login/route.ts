import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')
  const redirectURL = cookies().get('route')
    ? cookies().get('route')?.value
    : '/'

  return NextResponse.redirect(new URL(redirectURL as string, request.url), {
    headers: {
      'Set-Cookie': `token=${token}; HttpOnly ;Max-Age=432000;Path=/`,
    },
  })
}
