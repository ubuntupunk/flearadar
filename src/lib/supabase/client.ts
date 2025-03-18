// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import { Database } from './types'

export function createClientSupabaseClient() {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Add cookie options to the browser client
     cookies: {
       get(key: string): string | undefined {
         try {
           const cookies = document.cookie.split(';')
             .map(cookie => cookie.trim())
             .reduce((acc: { [key: string]: string }, current) => {
               const [cookieName, ...rest] = current.split('=')
               const cookieValue = rest.join('=')
               acc[cookieName.trim()] = cookieValue
               return acc
             }, {})
           
           const value = cookies[key]
           if (!value) return undefined
           
           return decodeURIComponent(value)
         } catch (error) {
           console.error('Error reading cookie:', { key, error })
           return undefined
         }
       },
     
       set(key: string, value: string, options?: {
         domain?: string
         path?: string
         maxAge?: number
         secure?: boolean
         sameSite?: 'strict' | 'lax' | 'none'
       }): void {
         try {
           let cookieValue = encodeURIComponent(value)
           const cookieParts = [`${key}=${cookieValue}`]
           
           if (options?.path) cookieParts.push(`path=${options.path}`)
           if (options?.maxAge) cookieParts.push(`max-age=${options.maxAge}`)
           if (options?.domain) cookieParts.push(`domain=${options.domain}`)
           if (options?.secure) cookieParts.push('secure')
           if (options?.sameSite) cookieParts.push(`samesite=${options.sameSite}`)
           
           document.cookie = cookieParts.join('; ')
         } catch (error) {
           console.error('Error setting cookie:', { key, error })
         }
       },
     
       remove(key: string, options?: {
         domain?: string
         path?: string
         secure?: boolean
         sameSite?: 'strict' | 'lax' | 'none'
       }): void {
         try {
           const cookieParts = [
             `${key}=`,
             'expires=Thu, 01 Jan 1970 00:00:01 GMT'
           ]
     
           if (options?.path) cookieParts.push(`path=${options.path}`)
           if (options?.domain) cookieParts.push(`domain=${options.domain}`)
           if (options?.secure) cookieParts.push('secure')
           if (options?.sameSite) cookieParts.push(`samesite=${options.sameSite}`)
     
           document.cookie = cookieParts.join('; ')
         } catch (error) {
           console.error('Error removing cookie:', { key, error })
         }
       }
     } as const
      
    }  
  )

  // Improved session monitoring and debugging
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event)
    if (session) {
      console.log('Session exists:', {
        userId: session.user?.id,
        expiresAt: new Date(session.expires_at! * 1000).toISOString()
      })
    }
  })

  // More structured session check
  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Session check error:', error)
        return
      }

      if (session) {
        // Log session details but not sensitive data
        console.log('Active session found:', {
          userId: session.user?.id,
          expiresAt: new Date(session.expires_at! * 1000).toISOString(),
          lastActivityAt: new Date(session.last_activity_at! * 1000).toISOString()
        })

        // Check if session is about to expire (e.g., within 5 minutes)
        const expiresAt = new Date(session.expires_at! * 1000)
        const fiveMinutesFromNow = new Date(Date.now() + 5 * 60 * 1000)
        
        if (expiresAt < fiveMinutesFromNow) {
          console.warn('Session is about to expire:', {
            expiresAt: expiresAt.toISOString(),
            timeUntilExpiry: (expiresAt.getTime() - Date.now()) / 1000
          })
        }
      } else {
        console.log('No active session found')
      }
    } catch (error) {
      console.error('Unexpected error during session check:', error)
    }
  }

  // Run initial session check
  checkSession()

  // Debug cookie state periodically
  const debugCookies = () => {
    try {
      const cookies = document.cookie.split(';')
        .map(cookie => cookie.trim())
        .reduce((acc: { [key: string]: string }, current) => {
          const [name, value] = current.split('=')
          acc[name] = value
          return acc
        }, {})

      console.debug('Current cookies:', {
        cookieCount: Object.keys(cookies).length,
        cookieNames: Object.keys(cookies),
        hasSbAuth: 'sb-auth-token' in cookies
      })
    } catch (error) {
      console.error('Error parsing cookies:', error)
    }
  }

  // Log initial cookie state
  debugCookies()

  return supabase
}
