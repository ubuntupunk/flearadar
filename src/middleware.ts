import type { NextRequest } from "next/server"

import { auth0 } from "../lib/auth0"

import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/home') {
    return;
  }
  try {
    const url = new URL(request.url);
    return await auth0.middleware(request);
  } catch (error) {
    console.error("Invalid URL:", request.url, error);
    return NextResponse.error();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
