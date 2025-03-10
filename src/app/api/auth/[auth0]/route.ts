// pages/api/auth0/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
});

export async function POST(req: NextRequest) {
  try {
    await auth0.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth0/callback`,
      },
    });
    return NextResponse.redirect(new URL('/', req.url));
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Login failed' }), { status: 400 });
  }
}