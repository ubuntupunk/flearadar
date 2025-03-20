// src/app/(auth-pages)/layout.tsx
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Suspense } from "react"

const PUBLIC_AUTH_ROUTES = [
  '/callback',
  '/register-success',
  '/profile-selection'
] as const;

console.log(PUBLIC_AUTH_ROUTES)

function AuthHeader() {
  return (
    <header className="w-full py-6 border-b">
      <div className="container flex justify-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">Your App</span>
        </Link>
      </div>
    </header>
  )
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    const { data: profile } = await supabase
      .from('users')
      .select('user_type, onboarding_completed')
      .eq('id', session.user.id)
      .single()

    if (!profile?.user_type) {
      redirect("/(auth-pages)/profile-selection")
    }

    if (profile?.user_type) {
      redirect(`/${profile.user_type}-dash`)
    }

    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <ErrorBoundary>
            <Suspense fallback={<AuthLoading />}>
              <div className="bg-card rounded-lg shadow-lg p-6 space-y-6">
                {children}
              </div>
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
    </div>
  )
}

// Using your existing loading component
import AuthLoading from "./loading"

// Add error handling for the layout
export function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-lg font-semibold">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
