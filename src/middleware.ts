// src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { type CookieOptions, CookieOptionsWithName } from '@supabase/ssr'
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { rateLimit, getRateLimitConfig } from "@/lib/utils/rate-limit"

export async function middleware(request: NextRequest) {
  // Initialize response with headers
  const response = NextResponse.next()

  // Apply rate limiting first
  const rateLimitResult = await rateLimit(request, getRateLimitConfig(request))
  if (rateLimitResult?.status === 429) {
    return rateLimitResult
  }

  // Create Supabase client with cookie handling
  const supabase = createMiddlewareClient(
    { req: request, res: response },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      cookieOptions: {
        name: 'sb-auth-token',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        domain: process.env.NEXT_PUBLIC_DOMAIN,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
      } as CookieOptionsWithName
    }
  )

  try {
    // Get session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      console.error('Error fetching session in middleware:', sessionError)
      return response
    }

    // Add security headers
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-XSS-Protection", "1; mode=block")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()"
    )

    // Add CORS headers for API routes
    if (request.nextUrl.pathname.startsWith("/api/")) {
      response.headers.set(
        "Access-Control-Allow-Origin",
        process.env.NEXT_PUBLIC_APP_URL || "*"
      )
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      )
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      )
    }

    // Define protected routes pattern
    const isProtectedRoute =
      request.nextUrl.pathname.startsWith("/profile") ||
      request.nextUrl.pathname.startsWith("/listings/manage") ||
      request.nextUrl.pathname.startsWith("/user-dash") ||
      request.nextUrl.pathname.startsWith("/vendor-dash") ||
      request.nextUrl.pathname.startsWith("/market-dash") ||
      request.nextUrl.pathname.startsWith("/admin-dash")

    const isAuthRoute = request.nextUrl.pathname.startsWith("/auth")
    const isOnboardingRoute = request.nextUrl.pathname.startsWith("/onboarding")

    // Redirect authenticated users from auth to dashboard
    if (isAuthRoute && session?.user) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Handle authenticated user flows
    if (session?.user) {
      // Check user profile and onboarding status
      const { data: userProfile, error: userProfileError } = await supabase
        .from('user_profiles')
        .select('onboarding_completed')
        .eq('user_id', session.user.id)
        .single()

      if (userProfileError) {
        console.error('Error fetching user profile in middleware:', userProfileError)
      }

      // Redirect to onboarding if not completed and not already there
      if (!userProfile?.onboarding_completed && !isOnboardingRoute) {
        return NextResponse.redirect(new URL("/onboarding", request.url))
      }

      // Handle user type specific redirects
      const { data: userWithProfile, error: userTypeError } = await supabase
        .from('users')
        .select('user_type')
        .eq('id', session.user.id)
        .single()

      if (userTypeError) {
        console.error('Error fetching user type in middleware:', userTypeError)
      } else if (!userWithProfile?.user_type) {
        // Redirect to onboarding if user_type is missing
        if (!isAuthRoute && !isOnboardingRoute) {
          return NextResponse.redirect(new URL('/onboarding', request.url))
        }
      } else {
        // User has user_type, handle specific redirects
        const pathMap = {
          user: '/user-dash',
          vendor: '/vendor-dash',
          market: '/market-dash',
          admin: '/admin-dash',
          default: '/dashboard'
        }

        const userType = userWithProfile.user_type as keyof typeof pathMap
        const redirectPath = pathMap[userType] || pathMap.default

        if (!isAuthRoute && !isOnboardingRoute && request.nextUrl.pathname !== '/') {
          return NextResponse.redirect(new URL(redirectPath, request.nextUrl.origin))
        }
      }
    }

    // Redirect unauthenticated users from protected routes to auth
    if (isProtectedRoute && !session?.user) {
      const redirectUrl = new URL("/auth", request.url)
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    return response

  } catch (error) {
    console.error('Middleware error:', error)
    return response
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
