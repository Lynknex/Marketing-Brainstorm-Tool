export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/campaigns/:path*', '/api/campaigns/:path*', '/api/brainstorm/:path*'],
}
