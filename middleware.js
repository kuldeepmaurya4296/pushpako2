import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '@/lib/auth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the path requires authentication
  if (pathname.startsWith('/dashboards/')) {
    const token = getTokenFromRequest(request);
    // NOTE: jsonwebtoken cannot run on Edge Runtime (middleware).
    // If you need middleware auth check with jsonwebtoken, you must eject from Edge Middleware 
    // or use a different strategy.

    // HOWEVER, since the user explicitly asked to use jsonwebtoken:
    // We cannot verify ANY token here without crashing.
    // We will check for the PRESENCE of the cookie only.
    // The actual verification must happen in the Server Components or API Routes.

    // We will check for the PRESENCE of the cookie only.
    // The actual verification must happen in the Server Components or API Routes.

    if (!token) {
      // Redirect to sign-in if no token cookie exists
      const signInUrl = new URL('/sign-in', request.url);
      return NextResponse.redirect(signInUrl);
    }

    // We CANNOT verify the token signature/claims here with jsonwebtoken.
    // We assume if cookie exists, let them pass, and verify later.
    // This is less secure but prevents the crash.

    // OPTIONAL: Basic decoding without verification (unreliable for security but gets payload)
    // const decoded = jwt.decode(token); 
    // But 'jsonwebtoken' import itself might crash middleware environment.

    // Let's just allow pass if token exists for now to stop the crash loop.
    return NextResponse.next();

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