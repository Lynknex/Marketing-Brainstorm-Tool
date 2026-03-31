import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  const isAuthRoute = request.nextUrl.pathname.startsWith('/api/auth')
  if (isAuthRoute) return NextResponse.next()

  const isProtected =
    request.nextUrl.pathname.startsWith('/campaigns') ||
    request.nextUrl.pathname.startsWith('/api/campaigns') ||
    request.nextUrl.pathname.startsWith('/api/brainstorm')

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/campaigns/:path*', '/api/campaigns/:path*', '/api/brainstorm/:path*'],
}
