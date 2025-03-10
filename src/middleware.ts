import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSession, loginWithRedirect } from "@/lib/auth0";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getSession();
    if (!session?.user && !request.nextUrl.pathname.startsWith('/api/auth')) {
      const url = new URL(`/api/auth/login`, request.url)
      return NextResponse.redirect(url)
    }
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
