import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';

export const runtime = 'edge';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { pathname } = new URL(req.url);
  const auth0Route = pathname.split('/api/auth/')[1];

  try {
    switch (auth0Route) {
      case 'login':
        return (await auth0.handleLogin(req)) as NextResponse;
      case 'callback':
        return (await auth0.handleCallback(req)) as NextResponse;
      case 'logout':
        return (await auth0.handleLogout(req)) as NextResponse;
      case 'me':
        return (await auth0.handleProfile(req)) as NextResponse;
      default:
        return NextResponse.json({ error: 'Invalid Auth0 route' }, { status: 404 });
    }
  } catch (error) {
    console.error('Auth0 error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { pathname } = new URL(req.url);
  const auth0Route = pathname.split('/api/auth/')[1];

  try {
    switch (auth0Route) {
      case 'callback':
        return (await auth0.handleCallback(req)) as NextResponse;
      default:
        return NextResponse.json({ error: 'Invalid Auth0 route' }, { status: 404 });
    }
  } catch (error) {
    console.error('Auth0 error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}