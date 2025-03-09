import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth0.getSession(request);
    if (!session?.user && !request.nextUrl.pathname.startsWith('/api/auth')) {
      return (await auth0.handleLogin(request, {
        returnTo: request.nextUrl.pathname,
      })) as NextResponse;
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