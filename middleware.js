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

    // Check role-based access
    if (pathname.startsWith('/dashboards/admin') && decoded.role !== 'admin') {
      const investorUrl = new URL(`/dashboards/investors/${decoded.id}`, request.url);
      return NextResponse.redirect(investorUrl);
    }

    if (pathname.startsWith('/dashboards/investors/')) {
      if (decoded.role === 'admin') {
        // Admins can access any investor dashboard
        return NextResponse.next();
      } else if (decoded.role === 'investor') {
        // Investors can only access their own dashboard
        const investorId = pathname.split('/dashboards/investors/')[1].split('/')[0];
        if (investorId !== decoded.id) {
          const ownUrl = new URL(`/dashboards/investors/${decoded.id}`, request.url);
          return NextResponse.redirect(ownUrl);
        }
      } else {
        const adminUrl = new URL('/dashboards/admin', request.url);
        return NextResponse.redirect(adminUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboards/:path*'],
};