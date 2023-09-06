import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.redirect(new URL('/user/logout' as string, request.url), {
    headers: {
      'Set-Cookie': `token=; HttpOnly ;Max-Age=0;Path=/`,
    },
  })
}
