import { NextResponse } from 'next/server'

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  return NextResponse.redirect(new URL('/', request.url), {
    headers: {
      'Set-Cookie': `token=${token}; HttpOnly ;Max-Age=432000;Path=/`,
    },
  })
}
