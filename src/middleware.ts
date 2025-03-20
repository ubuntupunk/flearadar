// src/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { rateLimit, getRateLimitConfig } from "@/lib/utils/rate-limit"

export async function middleware(request: NextRequest) {
  // Initialize response with headers
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Apply rate limiting first
  const rateLimitResult = await rateLimit(request, getRateLimitConfig(request))
  if (rateLimitResult?.status === 429) {
    return rateLimitResult
  }

  // Create Supabase client with explicit cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Get user session
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError) {
    console.error('Error fetching user in middleware:', authError)
    // In case of error, do not redirect, allow the request to proceed
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
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Check user profile and onboarding status
  if (user) {
    const { data: userProfile, error: userProfileError } = await supabase
      .from('user_profiles')
      .select('onboarding_completed')
      .eq('user_id', user.id)
      .single()

    if (userProfileError) {
      console.error('Error fetching user profile in middleware:', userProfileError)
    }

    // Redirect to onboarding if not completed and not already there
    if (user && !userProfile?.onboarding_completed && !isOnboardingRoute) {
      return NextResponse.redirect(new URL("/onboarding", request.url))
    }

    // Handle user type specific redirects
    const { data: userWithProfile, error: userTypeError } = await supabase
      .from('users')
      .select('user_type')
      .eq('id', user.id)
      .single()

    if (userTypeError) {
      console.error('Error fetching user type in middleware:', userTypeError)
    } else if (!userWithProfile?.user_type) {
      // Redirect to onboarding if user_type is missing
      if (!isAuthRoute && !request.nextUrl.pathname.startsWith('/onboarding')) {
        return NextResponse.redirect(new URL('/onboarding', request.nextUrl.origin))
      }
    } else {
      // User has user_type, handle specific redirects
      if (!isAuthRoute && !request.nextUrl.pathname.startsWith('/onboarding') && request.nextUrl.pathname !== '/') {
        const userType = userWithProfile.user_type
        let redirectPath = ''

        switch (userType) {
          case 'user':
            redirectPath = '/user-dash'
            break
          case 'vendor':
            redirectPath = '/vendor-dash'
            break
          case 'market':
            redirectPath = '/market-dash'
            break
          case 'admin':
            redirectPath = '/admin-dash'
            break
          default:
            redirectPath = '/dashboard'
            console.warn(`Unexpected user_type: ${userType}, redirecting to dashboard in middleware`)
        }

        if (redirectPath) {
          return NextResponse.redirect(new URL(redirectPath, request.nextUrl.origin))
        }
      }
    }
  }

  // Redirect unauthenticated users from protected routes to auth
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL("/auth", request.url)
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
