// src/components/ErrorBoundary.tsx
'use client'

import { useEffect } from 'react'

export function ErrorBoundary({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Auth Error:', error)
      // Add error reporting service here if needed
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  return <>{children}</>
}
