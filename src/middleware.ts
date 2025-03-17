// src/middleware.ts
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes pattern
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/listings/manage");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (session) {
    const supabaseMiddlewareClient = await createServerSupabaseClient();
    const { data: userWithProfile, error: userProfileError } = await supabaseMiddlewareClient
      .from('users')
      .select('user_type')
      .eq('id', session?.user?.id)
      .single();

    if (userProfileError) {
      console.error('Error fetching user profile in middleware:', userProfileError);
      // Consider how to handle this error - for now, just continue without redirection
    } else if (!userWithProfile?.user_type) {
      // Redirect to onboarding if user_type is missing
      return NextResponse.redirect(new URL("/onboarding", request.nextUrl.origin));
    } else {
      // Redirect to appropriate dashboard based on user_type (similar logic as in login route)
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
        default:
          redirectPath = '/dashboard'; // Default to dashboard if user_type is unexpected - changed from user-dash
          console.warn(`Unexpected user_type: ${userType}, redirecting to dashboard in middleware`);
      }
      if (redirectPath) {
        return NextResponse.redirect(new URL(redirectPath, request.nextUrl.origin));
      }
    }
  }


  return response;
}

export const config = {
  matcher: ["/api/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
