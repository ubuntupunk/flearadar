// src/middleware.ts
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Route patterns for better maintainability
const ROUTE_PATTERNS = {
  protected: ['/profile', '/listings/manage'],
  auth: ['/auth'],
  onboarding: ['/onboarding'],
  public: ['/', '/about', '/contact'],
  api: ['/api']
} as const;

// User type dashboard mappings
const USER_DASHBOARDS = {
  user: '/user-dash',
  vendor: '/vendor-dash',
  market: '/market-dash',
  admin: '/admin-dash',
  default: '/dashboard'
} as const;

// Cache Supabase client
let supabaseClient: any = null;

function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createServerSupabaseClient();
  }
  return supabaseClient;
}

// Structured logging
const logMiddlewareEvent = (event: string, details: object) => {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    event,
    ...details
  }));
};

// Security headers configuration
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
} as const;

// CORS headers configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || "*",
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
} as const;

async function handleMiddleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Apply general security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Add specific cookie security attributes
  const existingCookie = response.headers.get('Set-Cookie');
  const cookieAttributes = [
    existingCookie,
    'HttpOnly',
    'Secure',
    'SameSite=Strict',
    'Path=/'
  ].filter(Boolean).join(';');
  
  response.headers.set('Set-Cookie', cookieAttributes);
  
  // Apply CORS headers for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  try {
    const supabase = await getSupabaseClient();
    const { data: authUser, error: authError } = await supabase.auth.getUser();

    if (authError) {
      logMiddlewareEvent('auth_error', { error: authError });
      return response;
    }

    const user = authUser.user;

    // Check protected routes
    const isProtectedRoute = ROUTE_PATTERNS.protected.some(path => 
      request.nextUrl.pathname.startsWith(path)
    );
    const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

    if (isProtectedRoute && !user) {
      logMiddlewareEvent('unauthorized_access', { 
        path: request.nextUrl.pathname 
      });
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    if (user) {
      const { data: userWithProfile, error: userProfileError } = await supabase
        .from('users')
        .select('user_type')
        .eq('id', user.id)
        .single();

      if (userProfileError) {
        logMiddlewareEvent('profile_fetch_error', { 
          error: userProfileError 
        });
      } else if (!userWithProfile?.user_type) {
        if (!isAuthRoute && !request.nextUrl.pathname.startsWith('/onboarding')) {
          logMiddlewareEvent('redirect_to_onboarding', { 
            userId: user.id 
          });
          return NextResponse.redirect(new URL('/onboarding', request.nextUrl.origin));
        }
      } else {
        if (!isAuthRoute && 
            !request.nextUrl.pathname.startsWith('/onboarding') && 
            request.nextUrl.pathname !== '/') {
          
          const userType = userWithProfile.user_type as keyof typeof USER_DASHBOARDS;
          const redirectPath = USER_DASHBOARDS[userType] ?? USER_DASHBOARDS.default;

          if (redirectPath) {
            logMiddlewareEvent('user_redirect', { 
              userType, 
              redirectPath 
            });
            return NextResponse.redirect(new URL(redirectPath, request.nextUrl.origin));
          }
        }
      }
    }

    return response;
  } catch (error) {
    logMiddlewareEvent('critical_error', { error });
    // Decide whether to fail open or closed based on your security requirements
    return response; // failing open
  }
}

export async function middleware(request: NextRequest) {
  const startTime = performance.now();
  
  // Basic request validation for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        return new NextResponse('Invalid Content-Type', { status: 415 });
      }
    }
  }

  const response = await handleMiddleware(request);
  
  const duration = performance.now() - startTime;
  logMiddlewareEvent('middleware_performance', { 
    duration,
    path: request.nextUrl.pathname 
  });
  
  return response;
}

export const config = {
  matcher: [
    "/api/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
};

