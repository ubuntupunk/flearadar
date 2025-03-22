// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '../types/database'
import { type AuthChangeEvent, } from '@supabase/supabase-js'

import { cookieHelpers } from './cookieHelpers'
import { 
  SessionStatus, 
  SessionWarning, 
  CookieDebugInfo,
  SESSION_CONSTANTS 
} from './types/session'

export function createClientSupabaseClient() {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Enhanced session monitoring
  supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
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

      // Warning if session expires in less than WARNING_THRESHOLD
      if (timeUntilExpiry < SESSION_CONSTANTS.WARNING_THRESHOLD) {
        const warning: SessionWarning = {
          expiresIn: Math.floor(timeUntilExpiry / 1000),
          expiresAt: expiresAt.toISOString()
        }
        console.warn('Session expiring soon:', warning)
      }

      // Update user's last seen timestamp
      if (session.user) {
        void updateLastSeen(session.user.id)
      }
    }
  })

  // Session check function
  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Session check error:', error)
        return null
      }

      if (session) {
        const expiresAt = new Date(session.expires_at! * 1000)
        const sessionInfo = {
          userId: session.user?.id,
          expiresAt: expiresAt.toISOString()
        }
        console.log('Active session found:', sessionInfo)
        return sessionInfo
      }
      
      console.log('No active session')
      return null
    } catch (error) {
      console.error('Unexpected error during session check:', error)
      return null
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
      return debugInfo
    } catch (error) {
      console.error('Error debugging cookies:', error)
      return null
    }
  }

  // Helper function to update last seen timestamp
  const updateLastSeen = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('id', userId)

      if (error) {
        console.error('Error updating last seen:', error)
      }
    } catch (error) {
      console.error('Unexpected error updating last seen:', error)
    }
  }

  // Initialize monitoring
  void checkSession()
  void debugCookieState()

  return supabase
}

// Export cookie helpers for use in other parts of the application
export { cookieHelpers }
