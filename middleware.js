import { NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the path requires authentication
  if (pathname.startsWith('/dashboards/')) {
    const token = getTokenFromRequest(request);
    const decoded = verifyToken(token);

    if (!decoded) {
      // Redirect to sign-in if not authenticated
      const signInUrl = new URL('/sign-in', request.url);
      return NextResponse.redirect(signInUrl);
    }

    // Role: ADMIN
    if (decoded.role === 'admin') {
      // Admins can ONLY access /dashboards/admin
      if (!pathname.startsWith('/dashboards/admin')) {
        return NextResponse.redirect(new URL('/dashboards/admin', request.url));
      }
      return NextResponse.next();
    }

    // Role: INVESTOR
    if (decoded.role === 'investor') {
      // Investors can only access /dashboards/investors/[their-id]
      if (pathname.startsWith('/dashboards/admin')) {
        return NextResponse.redirect(new URL(`/dashboards/investors/${decoded.id}`, request.url));
      }

      if (pathname.startsWith('/dashboards/investors/')) {
        const pathId = pathname.split('/dashboards/investors/')[1]?.split('/')[0];
        if (pathId !== decoded.id) {
          return NextResponse.redirect(new URL(`/dashboards/investors/${decoded.id}`, request.url));
        }
      }
      return NextResponse.next();
    }

    // Fallback for unknown roles
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboards/:path*'],
};