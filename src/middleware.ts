import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (path.endsWith('/test')) {
    return NextResponse.redirect(new URL('/user/register', request.url))
  }
  if (request.url.endsWith('/register')) {
    console.log('register capturado pelo middle')

    return NextResponse.next({
      headers: {
        'Set-Cookie': `route=/; Path=/API/user/; HttpOnly; max-age=60;`,
      },
    })
  }
}
export const config = {
  matcher: ['/API/user/:path*', '/user/:path*'],
}
