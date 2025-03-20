// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { rateLimit, getRateLimitConfig } from "@/lib/utils/rate-limit";

export async function middleware(request: NextRequest) {
  // Initialize response with headers
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Apply rate limiting first
  const rateLimitResult = await rateLimit(request, getRateLimitConfig(request));
  if (rateLimitResult?.status === 429) {
    return rateLimitResult;
  }

  // Add security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    response.headers.set(
      "Access-Control-Allow-Origin",
      process.env.NEXT_PUBLIC_APP_URL || "*"
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }

  const supabase = await createServerSupabaseClient();
  const { data: authUser, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.error('Error fetching user in middleware:', authError);
    // In case of error, do not redirect, allow the request to proceed
    return response;
  }

  const user = authUser.user;

  // Protected routes pattern
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/listings/manage") ||
    request.nextUrl.pathname.startsWith("/user-dash") ||
    request.nextUrl.pathname.startsWith("/vendor-dash") ||
    request.nextUrl.pathname.startsWith("/market-dash") ||
    request.nextUrl.pathname.startsWith("/admin-dash");
 
    const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");
    // Add onboarding route check
    const isOnboardingRoute = request.nextUrl.pathname.startsWith("/onboarding");
  
  
  // Redirect authenticated users from auth to dashboard
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  const { data: userProfile, error: userProfileError } = await supabase
    .from('user_profiles')
    .select('onboarding_completed')
    .eq('user_id', user?.id)
    .single();
    
  if (user && !userProfile?.onboarding_completed && !isOnboardingRoute) {
  return NextResponse.redirect(new URL("/onboarding", request.url));
  }
    // Redirect unauthenticated users from protected routes to auth
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (user) {
    const supabaseMiddlewareClient = await createServerSupabaseClient();
    const { data: userWithProfile, error: userProfileError } = await supabaseMiddlewareClient
      .from('users')
      .select('user_type')
      .eq('id', user.id)
      .single();

    if (userProfileError) {
      console.error('Error fetching user profile in middleware:', userProfileError);
      // Do not redirect on profile fetch error, allow access
    } else if (!userWithProfile?.user_type) {
      // Redirect to onboarding if user_type is missing and not already on auth or onboarding
      if (!isAuthRoute && !request.nextUrl.pathname.startsWith('/onboarding')) {
        return NextResponse.redirect(new URL('/onboarding', request.nextUrl.origin));
      }
    } else {
      // User has user_type, redirect to dashboard if not on auth, onboarding, or root
      if (!isAuthRoute && !request.nextUrl.pathname.startsWith('/onboarding') && request.nextUrl.pathname !== '/') {
        const userType = userWithProfile.user_type;
        let redirectPath = '';

        switch (userType) {
          case 'user':
            redirectPath = '/user-dash';
            break;
          case 'vendor':
            redirectPath = '/vendor-dash';
            break;
          case 'market':
            redirectPath = '/market-dash';
            break;
          case 'admin':
              redirectPath = '/admin-dash'; // Added AdminDash case
              break;
          default:
            redirectPath = '/dashboard'; // Default to dashboard if user_type is unexpected
            console.warn(`Unexpected user_type: ${userType}, redirecting to dashboard in middleware`);
        }
        if (redirectPath) {
          return NextResponse.redirect(new URL(redirectPath, request.nextUrl.origin));
        }
      }
    }
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
