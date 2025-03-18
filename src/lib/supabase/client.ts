// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import { Database } from './types'
import { cookieHelpers } from './cookieHelpers'
import { 
  SessionStatus, 
  SessionWarning, 
  CookieDebugInfo,
  AuthStateEvent,
  SESSION_CONSTANTS 
} from './types/session'

export function createClientSupabaseClient() {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Enhanced session monitoring
  supabase.auth.onAuthStateChange((event: AuthStateEvent, session) => {
    console.log('Auth state changed:', event)
    if (session) {
      const expiresAt = new Date(session.expires_at! * 1000)
      const now = new Date()
      const timeUntilExpiry = expiresAt.getTime() - now.getTime()
      
      const sessionStatus: SessionStatus = {
        userId: session.user?.id,
        expiresAt: expiresAt.toISOString(),
        timeUntilExpiry: Math.floor(timeUntilExpiry / 1000),
        event
      }
      console.log('Session status:', sessionStatus)

      // Warning if session expires in less than 5 minutes
      if (timeUntilExpiry < SESSION_CONSTANTS.WARNING_THRESHOLD) {
        const warning: SessionWarning = {
          expiresIn: Math.floor(timeUntilExpiry / 1000),
          expiresAt: expiresAt.toISOString()
        }
        console.warn('Session expiring soon:', warning)
      }
    }
  })

  // Session check function
  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Session check error:', error)
        return
      }

      if (session) {
        const expiresAt = new Date(session.expires_at! * 1000)
        console.log('Active session found:', {
          userId: session.user?.id,
          expiresAt: expiresAt.toISOString()
        })
      } else {
        console.log('No active session')
      }
    } catch (error) {
      console.error('Unexpected error during session check:', error)
    }
  }

  // Debug cookie state
  const debugCookieState = () => {
    try {
      const cookies = document.cookie.split(';')
        .map(cookie => cookie.trim())
        .filter(cookie => cookie.length > 0)
      
      const debugInfo: CookieDebugInfo = {
        cookieCount: cookies.length,
        cookieNames: cookies.map(cookie => cookie.split('=')[0]),
        hasAuthToken: cookieHelpers.get(SESSION_CONSTANTS.AUTH_COOKIE_NAME) !== undefined
      }
      
      console.debug('Cookie state:', debugInfo)
    } catch (error) {
      console.error('Error debugging cookies:', error)
    }
  }

  // Initialize monitoring
  checkSession()
  debugCookieState()

  return supabase
}

export { cookieHelpers }
